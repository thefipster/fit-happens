import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Exercise, Tag } from '../../models';
import { JournalService } from '../../services/journal.service';
import { AnyJournalMessage } from '@fit-journal';

@Component({
  selector: 'app-batch-exercise-tag-selecter',
  imports: [],
  templateUrl: './batch-exercise-tag-selecter.component.html',
  styleUrl: './batch-exercise-tag-selecter.component.css',
})
export class BatchExerciseTagSelecterComponent {
  private activeExercise?: Exercise;
  @Input() set exercise(value: string | null | undefined) {
    this.activeExercise = this.journal.exercises.find((item: Exercise) => item.id === value);
    this.updateTags();
  }

  get exercise(): string | undefined {
    return this.activeExercise?.id;
  }
  @Output() changed = new EventEmitter<string[]>();

  journal: JournalService;

  tags: Tag[] = [];
  selected: string[] = [];

  constructor(journal: JournalService) {
    this.journal = journal;
    this.journal.stream$.subscribe((msg: AnyJournalMessage) => {
      console.log(msg);
    });
  }

  onCheck(tag: Tag, event: any): void {
    if (event.target.checked) {
      if (this.selected.indexOf(tag.id) === -1) {
        this.selected.push(tag.id);
      }
    } else {
      const index = this.selected.indexOf(tag.id);
      if (index !== -1) {
        if (this.selected.length === 1) {
          this.selected = [];
        } else {
          this.selected.splice(index, 1);
        }
      }
    }

    this.changed.next(this.selected);
  }

  updateTags(): void {
    this.tags = [];

    if (!this.activeExercise) {
      return;
    }
     
    const exerciseId = this.activeExercise.id;
    const mentionedTags: string[] = [];
    const activeTags: string[] = [];

    // check user configured values
    for (const links of this.journal.exerciseTags) {
      // remember all configured tags
      if (mentionedTags.indexOf(links.tagId) === -1) {
        mentionedTags.push(links.tagId);
      }

      // if exercise matches add it to active
      if (
        links.exerciseId === exerciseId &&
        activeTags.indexOf(links.tagId) === -1
      ) {
        activeTags.push(links.tagId);
      }
    }

    // add all tags that are not configured at all -> not in mentionedTags
    for (const tag of this.journal.tags) {
      if (
        mentionedTags.indexOf(tag.id) === -1 &&
        activeTags.indexOf(tag.id) === -1
      ) {
        activeTags.push(tag.id);
      }
    }
    // load actual tags from ids
    for (const active of activeTags) {
      const activeTag = this.journal.tags.find(
        (item: Tag) => item.id === active && (item.parentId ?? null) === null
      );
      if (activeTag) {
        this.tags.push(activeTag);
      }
    }

    

  }
}

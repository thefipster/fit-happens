import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AnyJournalMessage } from '@fit-journal';
import { FormsModule } from '@angular/forms';
import { Tag } from '../../models';
import { JournalService } from '../../services/journal.service';
import { ExerciseSelecterComponent } from '../../elements/exercise-selecter/exercise-selecter.component';

@Component({
  selector: 'app-tags',
  imports: [FormsModule, ReactiveFormsModule, ExerciseSelecterComponent],
  templateUrl: './tags.component.html',
  styleUrl: './tags.component.css',
})
export class TagsComponent implements OnInit {
  tagForm = new FormGroup({
    name: new FormControl(''),
    parent: new FormControl(''),
  });

  journal: JournalService;
  tags: Tag[] = [];
  exerciseIds: string[] | undefined;

  constructor(journal: JournalService) {
    this.journal = journal;
    this.journal.stream$.subscribe(() => {
      this.setTags();
    });
  }

  ngOnInit(): void {
    this.setTags();
  }

  exercisesChanged(exerciseIds: string[]) {
    if (exerciseIds && exerciseIds.length > 0) {
      this.exerciseIds = exerciseIds;
    } else {
      this.exerciseIds = undefined;
    }

  }

  onSet(): void {
    const name = this.tagForm.controls.name.value;
    const parent = this.tagForm.controls.parent.value;
    if (!name) throw new Error('Form not complete');

    const msg = this.journal.getBuilder().createTag(name);
    if (parent)
      msg.parentId = parent;

    if (this.exerciseIds) {
      msg.exerciseIds = this.exerciseIds
    }

    this.journal.append(msg);
  }

  private setTags(): void {
    this.tags = this.journal.data.tags
      .filter((tag: Tag) => tag.parentId === null || tag.parentId === undefined)
      .sort((a: Tag, b: Tag) => a.name.localeCompare(b.name));
  }
}

import { Component, OnInit } from '@angular/core';
import { JournalService } from '../../services/journal.service';
import { Exercise, ExerciseTag, Tag } from '../../models';
import { TagSelecterComponent } from "../../elements/tag-selecter/tag-selecter.component";
import { ExerciseSelecterComponent } from "../../elements/exercise-selecter/exercise-selecter.component";

@Component({
  selector: 'app-tag-group',
  imports: [TagSelecterComponent, ExerciseSelecterComponent],
  templateUrl: './tag-group.component.html',
  styleUrl: './tag-group.component.css',
})
export class TagGroupComponent implements OnInit {
  journal: JournalService;
  tags: string[] = [];
  exercises: string[] = [];
  groups: ExerciseTag[] = [];

  constructor(journal: JournalService) {
    this.journal = journal;
    this.journal.stream$.subscribe(() => {
      this.groups = this.journal.data.exerciseTags;
    })
  }

  ngOnInit(): void {
    this.groups = this.journal.data.exerciseTags;
  }

  tagsChanged(tags: string[]): void {
    this.tags = tags;
  }

  exercisesChanged(exercises: string[]): void {
    this.exercises= exercises;
  }

  async onSet(): Promise<void> {
    if (
      this.exercises &&
      this.exercises.length > 0 &&
      this.tags &&
      this.tags.length > 0
    ) {
      const msg = this.journal.getBuilder().linkExercisesWithTags(this.exercises, this.tags);
      await this.journal.append(msg);
    }
  }
}

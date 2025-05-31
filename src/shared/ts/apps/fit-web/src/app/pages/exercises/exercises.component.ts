import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ExerciseMap, ExerciseTypes } from '@fit-journal';
import { Exercise } from '../../models';
import { JournalService } from '../../services/journal.service';
import { TagSelecterComponent } from '../../elements/tag-selecter/tag-selecter.component';

@Component({
  selector: 'app-exercises',
  imports: [ReactiveFormsModule, TagSelecterComponent],
  templateUrl: './exercises.component.html',
  styleUrl: './exercises.component.css',
})
export class ExercisesComponent implements OnInit {
  exerciseForm = new FormGroup({
    name: new FormControl(''),
    type: new FormControl(''),
  });

  journal: JournalService;
  exerciseTypes = ExerciseMap;
  repetitive: Exercise[] = [];
  timed: Exercise[] = [];
  selectedTags: string[] | undefined;

  constructor(journal: JournalService) {
    this.journal = journal;
    this.journal.stream$.subscribe(() => {
      this.setExercises();
    });
  }

  ngOnInit(): void {
    this.setExercises();
  }

  tagsChanged(tagIds: string[]) {
    if (tagIds && tagIds.length > 0) {
      this.selectedTags = tagIds;
    } else {
      this.selectedTags = undefined;
    }
  }

  async onSet(): Promise<void> {
    const name = this.exerciseForm.controls.name.value;
    const type = this.exerciseForm.controls.type.value;
    if (!name || !type) return;

    const exerciseMsg = this.journal.getBuilder().createExercise(name, type);
    await this.journal.append(exerciseMsg);

    if (this.selectedTags && this.selectedTags.length > 0) {
      const linkMsg = this.journal.getBuilder().linkExercisesWithTags([exerciseMsg.exerciseId], this.selectedTags);
      await this.journal.append(linkMsg);
    }
  }

  private setExercises(): void {
    this.repetitive = this.journal.data.exercises
      .filter((a: Exercise) => a.type == ExerciseTypes.Repeated)
      .sort((a: Exercise, b: Exercise) => a.name.localeCompare(b.name));

    this.timed = this.journal.data.exercises
      .filter((a: Exercise) => a.type == ExerciseTypes.Timed)
      .sort((a: Exercise, b: Exercise) => a.name.localeCompare(b.name));
  }
}

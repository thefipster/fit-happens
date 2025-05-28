import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ExerciseMap, ExerciseTypes, MessageBuilder } from '@fit-journal';
import { Exercise } from '../../models';
import { JournalService } from '../../services/journal.service';

@Component({
  selector: 'app-exercises',
  imports: [ReactiveFormsModule],
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

  constructor(journal: JournalService) {
    this.journal = journal;
    this.journal.stream$.subscribe(() => {
      this.setExercises();
    })
  }

  ngOnInit(): void {
    this.setExercises();
  }

  onSet(): void {
    const name = this.exerciseForm.controls.name.value;
    const type = this.exerciseForm.controls.type.value;
    if (!name || !type) return;

    const msg = MessageBuilder.createExerciseMsg(name, type);
    this.journal.append(msg);
  }

  private setExercises(): void {
    this.repetitive = this.journal.exercises
      .filter((a: Exercise) => a.type == ExerciseTypes.Repeated)
      .sort((a: Exercise, b: Exercise) => a.name.localeCompare(b.name));

    this.timed = this.journal.exercises
      .filter((a: Exercise) => a.type == ExerciseTypes.Timed)
      .sort((a: Exercise, b: Exercise) => a.name.localeCompare(b.name));
  }
}

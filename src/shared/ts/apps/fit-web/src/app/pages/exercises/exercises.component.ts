import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ViewStateService } from '../../services/view-state.service';
import { ExerciseMap, ExerciseTypes, MessageBuilder } from '@fit-journal';
import { Exercise } from '../../models';

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

  viewState: ViewStateService;
  exerciseTypes = ExerciseMap;
  repetitive: Exercise[] = [];
  timed: Exercise[] = [];

  constructor(viewState: ViewStateService) {
    this.viewState = viewState;
    this.viewState.signals$.subscribe(() => {
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
    this.viewState.append(msg);
  }

  private setExercises(): void {
    this.repetitive = this.viewState.exercises
      .filter((a: Exercise) => a.type == ExerciseTypes.Repeated)
      .sort((a: Exercise, b: Exercise) => a.name.localeCompare(b.name));

    this.timed = this.viewState.exercises
      .filter((a: Exercise) => a.type == ExerciseTypes.Timed)
      .sort((a: Exercise, b: Exercise) => a.name.localeCompare(b.name));
  }
}

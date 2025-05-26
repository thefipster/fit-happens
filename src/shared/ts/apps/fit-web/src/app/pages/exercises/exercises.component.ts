import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ViewStateService } from '../../services/view-state.service';
import { MessageBuilder } from '@fit-journal';
import { Exercise } from '../../models';

@Component({
  selector: 'app-exercises',
  imports: [ReactiveFormsModule],
  templateUrl: './exercises.component.html',
  styleUrl: './exercises.component.css',
})
export class ExercisesComponent {
  exerciseForm = new FormGroup({
    key: new FormControl(''),
    name: new FormControl(''),
  });

  viewState: ViewStateService;

  constructor(viewState: ViewStateService) {
    this.viewState = viewState;
  }

  onSet(): void {
    const name = this.exerciseForm.controls.name.value;
    if (!name)
      return; 

    const msg = MessageBuilder.createExerciseMsg(name);
    this.viewState.append(msg);
  }
}

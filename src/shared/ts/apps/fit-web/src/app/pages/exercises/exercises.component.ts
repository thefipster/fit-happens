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
export class ExercisesComponent implements OnInit {
  exerciseForm = new FormGroup({
    key: new FormControl(''),
    name: new FormControl(''),
  });
  exercises: Exercise[] = [];

  constructor(private viewstate: ViewStateService) {
  }

  async ngOnInit() {
    this.exercises = this.viewstate.getExercises();
  }

  onSet(): void {
    const name = this.exerciseForm.controls.name.value;
    if (!name)
      return; 

    const msg = MessageBuilder.createExerciseMsg(name);
    this.viewstate.append(msg);
  }
}

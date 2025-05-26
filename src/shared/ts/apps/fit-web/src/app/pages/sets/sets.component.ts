import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { ViewStateService } from '../../services/view-state.service';
import { Attempt, Exercise, Tag } from '../../models';

@Component({
  selector: 'app-sets',
  imports: [ReactiveFormsModule],
  templateUrl: './sets.component.html',
  styleUrl: './sets.component.css',
})
export class SetsComponent implements OnInit {
  sets: Attempt[] = [];
  tags: Tag[] = [];
  exercises: Exercise[] = [];

  setForm = new FormGroup({
    year: new FormControl(''),
    month: new FormControl(''),
    day: new FormControl(''),
    hour: new FormControl(''),
    minute: new FormControl(''),
    exercise: new FormControl(''),
    reps: new FormControl(''),
    weight: new FormControl(''),
  });

  constructor(private viewState: ViewStateService) {
  }

  async ngOnInit() {
    this.tags = this.viewState.getTags();
    this.exercises = this.viewState.getExercises();
    const sets = this.viewState.getAttempts();
    this.sets = sets.sort((a: Attempt, b: Attempt) => b.timestamp - a.timestamp);
  }
}
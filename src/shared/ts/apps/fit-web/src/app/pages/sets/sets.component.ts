import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { ViewStateService } from '../../services/view-state.service';
import { Batch, Exercise, Tag } from '../../models';

@Component({
  selector: 'app-sets',
  imports: [ReactiveFormsModule],
  templateUrl: './sets.component.html',
  styleUrl: './sets.component.css',
})
export class SetsComponent  {
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

  viewState: ViewStateService;

  constructor(viewState: ViewStateService) {
    this.viewState = viewState;
  }
}
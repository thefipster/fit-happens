import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ViewStateService } from '../../services/view-state.service';
import { Batch, Exercise, Tag } from '../../models';

@Component({
  selector: 'app-batches',
  imports: [ReactiveFormsModule],
  templateUrl: './batches.component.html',
  styleUrl: './batches.component.css',
})
export class BatchesComponent {
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
  last24h: Batch[] = [];
  before24h: Batch[] = [];
  exercises: Exercise[] = [];
  tags: Tag[] = [];

  constructor(viewState: ViewStateService) {
    this.viewState = viewState;
    this.viewState.signals$.subscribe(() => {
      this.setBatches();
    });
  }

  onTagCheck(item: Tag, event: any): void {
    console.log(item);
    console.log(event);
  }

  onSet(): void {
    console.log(this.setForm.value);
  }

  private setBatches() {
    const yesterday = Date.now() - 86400000;
    this.last24h = this.viewState.batches
      .filter((a: Batch) => a.timestamp >= yesterday)
      .sort((a, b) => b.timestamp - a.timestamp);

    this.before24h = this.viewState.batches
      .filter((a: Batch) => a.timestamp < yesterday)
      .sort((a, b) => b.timestamp - a.timestamp);

    this.exercises = this.viewState.exercises.sort((a: Exercise, b: Exercise) =>
      a.name.localeCompare(b.name)
    );

    
  }
}

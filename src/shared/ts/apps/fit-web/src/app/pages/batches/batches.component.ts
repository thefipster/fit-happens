import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Batch, Exercise, Tag } from '../../models';
import { JournalService } from '../../services/journal.service';

@Component({
  selector: 'app-batches',
  imports: [ReactiveFormsModule],
  templateUrl: './batches.component.html',
  styleUrl: './batches.component.css',
})
export class BatchesComponent implements OnInit {
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

  journal: JournalService;
  last24h: Batch[] = [];
  before24h: Batch[] = [];
  exercises: Exercise[] = [];
  tags: Tag[] = [];

  constructor(journal: JournalService) {
    this.journal = journal;
    this.journal.stream$.subscribe(() => {
      this.setBatches();
    });
  }

  ngOnInit(): void {
    this.setBatches();
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
    this.last24h = this.journal.batches
      .filter((a: Batch) => a.timestamp >= yesterday)
      .sort((a, b) => b.timestamp - a.timestamp);

    this.before24h = this.journal.batches
      .filter((a: Batch) => a.timestamp < yesterday)
      .sort((a, b) => b.timestamp - a.timestamp);

    this.exercises = this.journal.exercises.sort((a: Exercise, b: Exercise) =>
      a.name.localeCompare(b.name)
    );


  }
}

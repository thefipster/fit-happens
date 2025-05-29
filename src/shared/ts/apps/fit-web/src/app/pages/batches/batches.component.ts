import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Batch, Exercise } from '../../models';
import { JournalService } from '../../services/journal.service';
import { BatchExerciseTagSelecterComponent } from '../../elements/batch-exercise-tag-selecter/batch-exercise-tag-selecter.component';
import { ExerciseTypes } from '@fit-journal';

@Component({
  selector: 'app-batches',
  imports: [ReactiveFormsModule, BatchExerciseTagSelecterComponent],
  templateUrl: './batches.component.html',
  styleUrl: './batches.component.css',
})
export class BatchesComponent implements OnInit {
  batchForm = new FormGroup({
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

  selectedExercise?: Exercise;
  selectedTags?: string[];
  exerciseTypes = ExerciseTypes;

  constructor(journal: JournalService) {
    this.journal = journal;
    this.journal.stream$.subscribe(() => {
      this.setBatches();
    });
  }

  ngOnInit(): void {
    this.setBatches();
  }

  exerciseChanged(event: Event) {
    const target = event.target as HTMLInputElement;
    this.selectedExercise = this.exercises.find(
      (item: Exercise) => item.id === target.value
    );
  }

  tagsChanged(tagIds: string[]): void {
    this.selectedTags = tagIds;
  }

  async delete(batchId: string): Promise<void> {
    const msg = this.journal.getBuilder().deleteBatch(batchId);
    await this.journal.append(msg);
  }

  async onSet(): Promise<void> {
    const form = this.batchForm.value;

    const batchTime = this.getTimestamp(form);
    const exerciseId = this.selectedExercise?.id;
    const tagIds = this.selectedTags;
    const reps = Number(form.reps);
    let weight: number | undefined;
    if (form.weight) {
      weight = Number(form.weight);
      if (Number.isNaN(weight))
        weight = undefined;
    }

    if (exerciseId && !Number.isNaN(reps) && reps > 0) {
      const msg = this.journal.getBuilder().createBatch(exerciseId, reps, {
        tagIds: tagIds,
        weight: weight,
        timestamp: batchTime,
      });

      await this.journal.append(msg);
    }
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

  private getTimestamp(
    form: Partial<{
      year: string | null;
      month: string | null;
      day: string | null;
      hour: string | null;
      minute: string | null;
      exercise: string | null;
      reps: string | null;
      weight: string | null;
    }>
  ): number {
    let timestamp = Date.now();
    if (form.year && form.month && form.day && form.hour && form.minute) {
      const year = Number(form.year);
      const month = Number(form.month);
      const day = Number(form.day);
      const hour = Number(form.hour);
      const minute = Number(form.minute);
      if (
        !Number.isNaN(year) &&
        !Number.isNaN(month) &&
        !Number.isNaN(day) &&
        !Number.isNaN(hour) &&
        !Number.isNaN(minute)
      ) {
        timestamp = new Date(year, month, day, hour, minute).getTime();
      }
    }
    return timestamp;
  }
}

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { JournalService } from '../../services/journal.service';
import { Bodyweight } from '../../models';

@Component({
  selector: 'app-bodyweight',
  imports: [ReactiveFormsModule],
  templateUrl: './bodyweight.component.html',
  styleUrl: './bodyweight.component.css',
})
export class BodyweightComponent implements OnInit {
  bodyweightForm = new FormGroup({
    year: new FormControl(''),
    month: new FormControl(''),
    day: new FormControl(''),
    hour: new FormControl(''),
    minute: new FormControl(''),
    bodyweight: new FormControl(''),
  });

  journal: JournalService;
  bodyweights: Bodyweight[] = [];

  constructor(journal: JournalService) {
    this.journal = journal;
    this.journal.stream$.subscribe(() => {
      this.setBodyweights();
    });
  }

  ngOnInit(): void {
    this.setBodyweights();
  }

  async delete(weightTimestamp: number): Promise<void> {
    const msg = this.journal.getBuilder().deleteBodyweight(weightTimestamp);
    await this.journal.append(msg);
  }

  async onSet(): Promise<void> {
    const form = this.bodyweightForm.value;
    const timestamp = this.getTimestamp(form);
    let weight: number | undefined;
    if (form.bodyweight) {
      weight = Number(form.bodyweight);
      if (Number.isNaN(weight)) weight = undefined;
    }

    if (timestamp && weight) {
      const msg = this.journal.getBuilder().createBodyWeight(timestamp, weight);
      await this.journal.append(msg);
    }
  }

  private setBodyweights() {
    this.bodyweights = this.journal.data.bodyweights.sort((a: Bodyweight, b: Bodyweight) => b.timestamp - a.timestamp);
  }

  private getTimestamp(
    form: Partial<{
      year: string | null;
      month: string | null;
      day: string | null;
      hour: string | null;
      minute: string | null;
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

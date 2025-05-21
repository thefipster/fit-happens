import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { CreateSetMsg, JournalApi, JournalService } from 'domain-journal';
import { KeyholderService } from '../keyholder.service';

@Component({
  selector: 'app-sets',
  imports: [ReactiveFormsModule],
  templateUrl: './sets.component.html',
  styleUrl: './sets.component.css',
})
export class SetsComponent implements OnInit {
  journal: JournalService;
  api: JournalApi;
  sets: any[] = [];
  tags: any[] = [];
  exercises: any[] = [];

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

  constructor(private keyholder: KeyholderService) {
    this.journal = new JournalService();
    this.api = new JournalApi();
    this.journal.messages$.subscribe(async (msg: any) => {
      var key = this.keyholder.getKey();
      var url = this.keyholder.getUrl();

      this.api.sendMessage(url, key, msg);
      await this.refresh();
    });
  }

  async ngOnInit() {
    await this.refresh();
  }

  onSet(): void {
    const exercise = this.setForm.controls.exercise.value;
    const reps = this.setForm.controls.reps.value;
    const weight = this.setForm.controls.weight.value;
    const year: number = +this.setForm.controls.year.value!;
    const month: number = +this.setForm.controls.month.value!;
    const day: number = +this.setForm.controls.day.value!;
    const hour: number = +this.setForm.controls.hour.value!;
    const minute: number = +this.setForm.controls.minute.value!;

    const date = new Date(year, month, day, hour, minute, 0, 0);
    const timestamp = date.getUTCMilliseconds();
    let tags = [];
    for (let item of this.tags) {
      if (item.selected) {
        tags.push(item.id);
      }
    }

    let msg = new CreateSetMsg(timestamp, exercise, tags, reps, weight);
    console.log(msg);
    this.journal.append(msg);
  }

  onTagCheck(item: any, event: any) {
    item.selected = event.target.checked;
  }

  async refresh() {
    var key = this.keyholder.getKey();
    var url = this.keyholder.getUrl();

    if (key != '') {
      var result = await this.api.fetchJournal(url, key);
      if (result.status === 200) {
        var msgs = await result.json();
        this.tags = [];
        this.exercises = [];
        this.sets = [];
        msgs.forEach((item: any) => {
          if (item.type === 'create-tag') {
            this.tags.push({
              name: item.name,
              id: item.tagId,
              selected: false,
            });
          }
          if (item.type === 'create-exercise') {
            this.exercises.push({
              name: item.name,
              id: item.exerciseId,
              selected: false,
            });
          }
          if (item.type === 'create-set') {
            let exName = "";
            for (let ex of this.exercises) {
              if (item.exerciseId === ex.id) 
                exName = ex.name;
            }
            let tags = [];
            console.log(item);
            console.log(this.tags);
            for (let tag of item.tagIds) {
              for (let sTag of this.tags) {
                if (tag == sTag.id) {
                  tags.push(sTag.name);
                  break;
                }
              }
            }
            this.sets.push({
              exercise: exName,
              tags: tags,
              reps: item.reps,
              weight: item.weight
            });
          }
        });
      }
    }
  }
}

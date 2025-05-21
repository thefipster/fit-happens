import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CreateExerciseMsg, JournalService } from 'domain-journal';
import { JournalApi } from 'domain-journal/src/journal-api';
import { KeyholderService } from '../keyholder.service';

@Component({
  selector: 'app-exercises',
  imports: [ReactiveFormsModule],
  templateUrl: './exercises.component.html',
  styleUrl: './exercises.component.css',
})
export class ExercisesComponent implements OnInit {
  journal: JournalService;
  api: JournalApi;
  exercises: any[] = [];

  exerciseForm = new FormGroup({
    key: new FormControl(''),
    name: new FormControl(''),
  });

  constructor(http: HttpClient, private keyholder: KeyholderService) {
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
    const name = this.exerciseForm.controls.name.value;
    let msg = new CreateExerciseMsg(name);
    this.journal.append(msg);
  }

  async refresh() {
    var key = this.keyholder.getKey();
    var url = this.keyholder.getUrl();
    if (key != '') {
      var result = await this.api.fetchJournal(url, key);
      if (result.status === 200) {
        var msgs = await result.json();
        this.exercises = [];
        msgs.forEach((item: any) => {
          if (item.type === 'create-exercise') {
            this.exercises.push(item);
          }
        });
      }
    }
  }
}

import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CreateTagMsg, JournalApi, JournalService } from 'domain-journal';
import { KeyholderService } from '../keyholder.service';

@Component({
  selector: 'app-tags',
  imports: [ReactiveFormsModule],
  templateUrl: './tags.component.html',
  styleUrl: './tags.component.css',
})
export class TagsComponent {
  journal: JournalService;
  api: JournalApi;
  tags: any[] = [];

  tagForm = new FormGroup({
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
    const name = this.tagForm.controls.name.value;
    let msg = new CreateTagMsg(name);
    this.journal.append(msg);
  }

  async refresh() {
    var key = this.keyholder.getKey();
    if (key != '') {
      var url = this.keyholder.getUrl();

      var result = await this.api.fetchJournal(url, key);
      if (result.status === 200) {
        var msgs = await result.json();
        this.tags = [];
        msgs.forEach((item: any) => {
          if (item.type === 'create-tag') {
            this.tags.push(item);
          }
        });
      }
    }
  }
}

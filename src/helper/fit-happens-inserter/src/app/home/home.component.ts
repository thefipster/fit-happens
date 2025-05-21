import { Component } from '@angular/core';
import { JournalApi } from 'domain-journal';
import { KeyholderService } from '../keyholder.service';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  api: JournalApi;

  constructor(private keyholder: KeyholderService) {
    this.api = new JournalApi();
  }

  reset() {
    var key = this.keyholder.getKey();
    var url = this.keyholder.getUrl();
    this.api.resetJournal(url, key);
  }
}

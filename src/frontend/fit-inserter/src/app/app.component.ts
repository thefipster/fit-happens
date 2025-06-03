import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { JournalService } from './services/journal.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  keyForm = new FormGroup({
    key: new FormControl(''),
  });

  constructor(private journal: JournalService) {}

  setKey() {
    const key = this.keyForm.controls.key.value;
    if (key)
      this.journal.updateApiKey(key);
  }
}

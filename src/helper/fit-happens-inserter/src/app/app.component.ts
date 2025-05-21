import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { KeyholderService } from './keyholder.service';

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

  constructor(private keyholder: KeyholderService) {}

  setKey() {
    const key = this.keyForm.controls.key.value;
    this.keyholder.setKey(key!);
  }
}

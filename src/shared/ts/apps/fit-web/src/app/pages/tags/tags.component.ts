import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ViewStateService } from '../../services/view-state.service';

@Component({
  selector: 'app-tags',
  imports: [ReactiveFormsModule],
  templateUrl: './tags.component.html',
  styleUrl: './tags.component.css',
})
export class TagsComponent {
  tagForm = new FormGroup({
    key: new FormControl(''),
    name: new FormControl(''),
  });

  viewState: ViewStateService;

  constructor(viewState: ViewStateService) {
    this.viewState =viewState;
  }

  onSet(): void {
  //   const name = this.tagForm.controls.name.value;
  //   let msg = new CreateTagMsg(name);
  //   this.journal.append(msg);
  // }

  // async refresh() {
  //   var key = this.keyholder.getKey(); 
  //   if (key != '') {
  //     var url = this.keyholder.getUrl();

  //     var result = await this.api.fetchJournal(url, key);
  //     if (result.status === 200) {
  //       var msgs = await result.json();
  //       this.tags = [];
  //       msgs.forEach((item: any) => {
  //         if (item.type === 'create-tag') {
  //           this.tags.push(item);
  //         }
  //       });
  //     }
  //   }
  }
}

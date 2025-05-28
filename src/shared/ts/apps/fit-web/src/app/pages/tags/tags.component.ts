import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ViewStateService } from '../../services/view-state.service';
import { AnyJournalMessage, MessageBuilder } from '@fit-journal';
import { FormsModule } from '@angular/forms';
import { Tag } from '../../models';

@Component({
  selector: 'app-tags',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './tags.component.html',
  styleUrl: './tags.component.css',
})
export class TagsComponent implements OnInit {
  tagForm = new FormGroup({
    name: new FormControl(''),
    parent: new FormControl(''),
  });

  viewState: ViewStateService;
  tags: Tag[] = [];

  constructor(viewState: ViewStateService) {
    this.viewState = viewState;
    this.viewState.signals$.subscribe(() => {
      this.setTags();
    });
  }

  ngOnInit(): void {
      this.setTags();
  }

  onSet(): void {
    const name = this.tagForm.controls.name.value;
    const parent = this.tagForm.controls.parent.value;
    if (!name) throw new Error('Form not complete');

    let msg: AnyJournalMessage;
    if (parent) msg = MessageBuilder.createTagMsg(name, parent);
    else msg = MessageBuilder.createTagMsg(name);

    this.viewState.append(msg);
  }

  private setTags(): void {
    this.tags = this.viewState.tags
        .filter((tag: Tag) => tag.parentId === null)
        .sort((a: Tag, b: Tag) => a.name.localeCompare(b.name));
  }
}

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AnyJournalMessage, MessageBuilder } from '@fit-journal';
import { FormsModule } from '@angular/forms';
import { Tag } from '../../models';
import { JournalService } from '../../services/journal.service';

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

  journal: JournalService;
  tags: Tag[] = [];

  constructor(journal: JournalService) {
    this.journal = journal;
    this.journal.stream$.subscribe(() => {
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

    this.journal.append(msg);
  }

  private setTags(): void {
    this.tags = this.journal.tags
        .filter((tag: Tag) => tag.parentId === null || tag.parentId === undefined)
        .sort((a: Tag, b: Tag) => a.name.localeCompare(b.name));
  }
}

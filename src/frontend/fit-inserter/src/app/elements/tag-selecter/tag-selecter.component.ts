import { Component, EventEmitter, Output } from '@angular/core';
import { JournalService } from '../../services/journal.service';
import { Tag } from '../../models';

@Component({
  selector: 'app-tag-selecter',
  imports: [],
  templateUrl: './tag-selecter.component.html',
  styleUrl: './tag-selecter.component.css',
})
export class TagSelecterComponent {
  journal: JournalService;
  tags: Tag[] = [];
  selected: string[] = [];
  @Output() changed = new EventEmitter<string[]>();

  constructor(journal: JournalService) {
    this.journal = journal;
    this.journal.stream$.subscribe(() => {
      this.refresh();
    });
  }

  ngOnInit(): void {
    this.refresh();
  }

  refresh(): void {
    this.tags = this.journal.data.tags
      .filter((item: Tag) => (item.parentId ?? null) === null)
      .sort((a: Tag, b: Tag) => a.name.localeCompare(b.name));
  }

  onCheck(tag: Tag, event: any): void {
    if (event.target.checked) {
      if (this.selected.indexOf(tag.id) === -1) {
        this.selected.push(tag.id);
      }
    } else {
      const index = this.selected.indexOf(tag.id);
      if (index !== -1) {
        if (this.selected.length === 1) {
          this.selected = [];
        } else {
          this.selected.splice(index, 1);
        }
      }
    }

    this.changed.next(this.selected);
  }
}

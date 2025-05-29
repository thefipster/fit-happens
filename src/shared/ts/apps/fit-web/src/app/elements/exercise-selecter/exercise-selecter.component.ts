import { Component, EventEmitter, Output } from '@angular/core';
import { Exercise } from '../../models';
import { JournalService } from '../../services/journal.service';

@Component({
  selector: 'app-exercise-selecter',
  imports: [],
  templateUrl: './exercise-selecter.component.html',
  styleUrl: './exercise-selecter.component.css',
})
export class ExerciseSelecterComponent {
  journal: JournalService;
  exercises: any[] = [];
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
    this.exercises = this.journal.exercises.sort((a: Exercise, b: Exercise) =>
      a.name.localeCompare(b.name)
    );
  }

  onCheck(exercise: Exercise, event: any): void {
    if (event.target.checked) {
      if (this.selected.indexOf(exercise.id) === -1) {
        this.selected.push(exercise.id);
      }
    } else {
      const index = this.selected.indexOf(exercise.id);
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

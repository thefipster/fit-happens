import { Subject } from 'rxjs';

export class JournalService {
  constructor() {
    this._journalStream = new Subject();
  }

  get messages$() {
    return this._journalStream.asObservable();
  }

  append(message) {
    this._journalStream.next(message);
  }
}

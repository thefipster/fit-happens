import { Subject } from "rxjs";
import { CreateTagMsg } from "./models/tag-messages";

export class JournalService {
  constructor() {
    this._journalStream = new Subject();
    this.messages = [];
  }

  get messages$() {
    return this._journalStream.asObservable();
  }

  async append(message) {
    this.messages.push(message);
    this._journalStream.next(message);
  }
}

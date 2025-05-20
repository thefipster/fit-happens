export class JournalMessage {
  constructor() {
    this.journalId = crypto.randomUUID(); 
    this.timestamp = Date.now();
  }
}
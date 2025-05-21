import { JournalMessage } from './models/journal-message';
import { JournalPersister } from './journal-persister';

type JournalListener = (message: JournalMessage) => void;

export class FitJournal {
  private messages: JournalMessage[] = [];
  private listeners: JournalListener[] = [];
  private persister?: JournalPersister;

   constructor(persister?: JournalPersister) {
    this.persister = persister;
  }

  /**
   * Adds a message to the journal and notifies listeners.
   */
  public addMessage(msg: JournalMessage) {
    this.messages.push(msg);
    this.notifyListeners(msg);
  }

  /**
   * Returns all journal messages (e.g. for export).
   */
  public getMessages(): JournalMessage[] {
    return this.messages; // return a copy to avoid mutation
  }

  /**
   * Subscribe to new messages.
   */
  public onMessageAdded(listener: JournalListener) {
    this.listeners.push(listener);
  } 

  /**
   * Internal: Notifies all listeners.
   */
  private notifyListeners(msg: JournalMessage) {
    for (const listener of this.listeners) {
      listener(msg);
    }
  }
  
  /**
   * Flushes current messages into persistance.
   */
  public async flush() {
    if (!this.persister) {
      throw new Error("No persister configured");
    }

    await this.persister.persist(this.messages);
    this.reset();
  }

  /**
   * Clear all stored messages (optional).
   */
  public reset() {
    this.messages = [];
  }
}
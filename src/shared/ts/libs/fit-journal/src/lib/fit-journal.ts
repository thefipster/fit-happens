import { JournalPersister } from './journal-persister';
import { Subject } from 'rxjs';
import { AnyJournalMessage } from './models';
import { ApiSynchronizer } from './api-synchronizer';

export class FitJournal {
  private persister?: JournalPersister;
  private synchronizer?: ApiSynchronizer;
  
  private messages: AnyJournalMessage[] = [];
  private subject = new Subject<AnyJournalMessage>();
  private lastReceived = 0;

  stream$ = this.subject.asObservable();

  constructor(options?: {
    persister?: JournalPersister
    synchronizer?: ApiSynchronizer
  }) {
    this.persister = options?.persister;
    this.synchronizer = options?.synchronizer;
  }

  public append(msg: AnyJournalMessage) {
    this.messages.push(msg);
    this.subject.next(msg);
  }

  public async pushApi(): Promise<void> {
    if (!this.synchronizer)
      throw new Error("There is no synchronizer set.");

    let toSync = [];
    for (const msg of this.messages) {
      if (msg.timestamp > this.lastReceived) {
        toSync.push(msg);
      }
    }

    toSync = toSync.sort((a: AnyJournalMessage, b: AnyJournalMessage) => a.timestamp - b.timestamp);
    console.log("These would have been appended");
    console.log(toSync);

    //await this.synchronizer.push(this.messages);
  }

  public async pullApi(): Promise<void> {
    if (!this.synchronizer)
      throw new Error("There is no synchronizer set.");

    const messages = await this.synchronizer.pull();
    this.messages = [];
    for (const msg of messages) {
      this.append(msg);
      if (msg.timestamp > this.lastReceived) {
        this.lastReceived = msg.timestamp;
      }
    }
  }

  public setSynchronizer(synchronizer: ApiSynchronizer): void {
    this.synchronizer = synchronizer;
  }

  public setPersister(persister: JournalPersister): void {
    this.persister = persister;
  }
}

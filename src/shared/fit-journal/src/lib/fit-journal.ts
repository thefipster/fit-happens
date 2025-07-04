import { JournalPersister } from './journal-persister';
import { Subject } from 'rxjs';
import { AnyJournalMessage } from './models';
import { ApiSynchronizer } from './api-synchronizer';
import { MessageBuilder } from './message-builder';

export class FitJournal {
  private persister?: JournalPersister;
  private synchronizer?: ApiSynchronizer;

  private messages: AnyJournalMessage[] = [];
  private subject = new Subject<AnyJournalMessage>();
  private lastReceived = Math.max();
  private lastSent = Math.max();
  private autoSync = false;

  stream$ = this.subject.asObservable();
  builder = new MessageBuilder();

  constructor(options?: {
    persister?: JournalPersister;
    synchronizer?: ApiSynchronizer;
    autoSync?: boolean;
  }) {
    this.persister = options?.persister;
    this.synchronizer = options?.synchronizer;

    if (options?.autoSync) {
      this.autoSync = true;
    }
  }

  public async append(msg: AnyJournalMessage): Promise<void> {
    this.messages.push(msg);

    if (this.autoSync && this.synchronizer) {
      await this.synchronizer?.push([msg]);
      this.lastSent = msg.timestamp;
    }

    this.subject.next(msg);
  }

  public async pushApi(): Promise<void> {
    if (!this.synchronizer) throw new Error('There is no synchronizer set.');

    let toSync = [];
    for (const msg of this.messages) {
      if (msg.timestamp > this.lastReceived && msg.timestamp > this.lastSent) {
        toSync.push(msg);
      }
    }

    toSync = toSync.sort(
      (a: AnyJournalMessage, b: AnyJournalMessage) => a.timestamp - b.timestamp
    );
    await this.synchronizer.push(this.messages);
  }

  public async pullApi(): Promise<void> {
    if (!this.synchronizer) throw new Error('There is no synchronizer set.');

    let messages: AnyJournalMessage[] = [];
    if (this.persister) {
      messages = await this.persister.load();
    }

    const max = messages.reduce(function (prev, current) {
      return prev && prev.timestamp > current.timestamp ? prev : current;
    });

    const newMessages = await this.synchronizer.pull(max.timestamp);

    messages = [...messages, ...newMessages];

    if (this.persister && newMessages.length > 0) {
      this.persister.save(messages);
    }

    let maxTime = 0;
    this.messages = [];
    for (const msg of messages) {
      this.internalAppend(msg);
      if (msg.timestamp > maxTime) {
        maxTime = msg.timestamp;
      }
    }

    this.lastReceived = maxTime;
  }

  public setSynchronizer(synchronizer: ApiSynchronizer): void {
    this.synchronizer = synchronizer;
  }

  public setPersister(persister: JournalPersister): void {
    this.persister = persister;
  }

  private internalAppend(msg: AnyJournalMessage): void {
    this.messages.push(msg);
    this.subject.next(msg);
  }
}

import { Injectable } from '@angular/core';
import { AnyJournalMessage, ApiSynchronizer, FitJournal } from '@fit-journal';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class JournalService {
  private apiUrl = 'http://localhost:32769/api';
  private journal: FitJournal;
  private subject = new Subject<AnyJournalMessage>();
  private signals = new Subject<string>();

  signals$ = this.signals.asObservable();
  stream$ = this.subject.asObservable();

  constructor() {
    this.journal = new FitJournal({
      synchronizer: new ApiSynchronizer(this.apiUrl)
    })

    this.journal.stream$.subscribe((msg: AnyJournalMessage) => {
      this.subject.next(msg);
    });
  }

  append(msg: AnyJournalMessage): void {
    this.journal.append(msg);
  }

  async updateApiKey(apiKey: string): Promise<void> {
    this.journal.setSynchronizer(
      new ApiSynchronizer(this.apiUrl, { apiKey: apiKey })
    );

    this.signals.next("reset");
    await this.journal.pullApi();
  }
}

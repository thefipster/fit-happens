import { Injectable } from '@angular/core';
import {
  AnyJournalMessage,
  ApiSynchronizer,
  FitJournal,
  MessageBuilder,
  MessageTypes,
} from '@fit-journal';
import { Subject } from 'rxjs';
import { Batch, Exercise, Tag } from '../models';
import { TransformService } from './transform.service';

@Injectable({
  providedIn: 'root',
})
export class JournalService {
  private apiUrl = 'http://localhost:32769/api';
  private journal: FitJournal;
  
  private subject = new Subject<AnyJournalMessage>();
  stream$ = this.subject.asObservable();

  tags: Tag[] = [];
  exercises: Exercise[] = [];
  batches: Batch[] = [];

  constructor(private transformer: TransformService) {
    this.journal = new FitJournal({
      synchronizer: new ApiSynchronizer(this.apiUrl),
      autoSync: true,
    });

    this.journal.stream$.subscribe((msg: AnyJournalMessage) => {
      this.onJournalUpdate(msg);
    });
  }

  async append(msg: AnyJournalMessage): Promise<void> {
    await this.journal.append(msg);
  }

  async updateApiKey(apiKey: string): Promise<void> {
    this.journal.setSynchronizer(
      new ApiSynchronizer(this.apiUrl, { apiKey: apiKey })
    );

    this.reset();
    await this.journal.pullApi();
  }

  getBuilder(): MessageBuilder {
    return this.journal.builder;
  }

  private onJournalUpdate(msg: AnyJournalMessage) {
    this.updateStore(msg);
    this.subject.next(msg);
  }

  private updateStore(msg: AnyJournalMessage) {
    switch (msg.type) {

      case MessageTypes.CreateExercise: {
        const exercise = this.transformer.handleCreateExercise(msg);
        this.exercises.push(exercise);
        break;
      }

      case MessageTypes.CreateTag: {
        const tag = this.transformer.handleCreateTag(msg, this.tags);
        this.tags.push(tag);
        break;
      }

      case MessageTypes.CreateBatch: {
        const batch = this.transformer.handleCreateBatch(
          msg,
          this.exercises,
          this.tags
        );
        this.batches.push(batch);
        break;
      }
    }
  }

  private reset(): void {
    this.batches = [];
    this.exercises = [];
    this.tags = [];
  }
}

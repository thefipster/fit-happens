import { Injectable } from '@angular/core';
import {
  AnyJournalMessage,
  ApiSynchronizer,
  FitJournal,
  MessageBuilder,
  MessageTypes,
} from '@fit-journal';
import { Subject } from 'rxjs';
import { FitData } from '../models';
import { TransformService } from './transform.service';

@Injectable({
  providedIn: 'root',
})
export class JournalService {
  private apiUrl = 'https://localhost:32770/api';
  private journal: FitJournal;

  private subject = new Subject<AnyJournalMessage>();
  stream$ = this.subject.asObservable();

  data: FitData = {
    tags: [],
    exercises: [],
    batches: [],
    exerciseTags: [],
    bodyweights: [],
  } as FitData;

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
        this.data = this.transformer.handleCreateExercise(msg, this.data);
        break;
      }

      case MessageTypes.CreateTag: {
        this.data = this.transformer.handleCreateTag(msg, this.data);
        break;
      }

      case MessageTypes.CreateBatch: {
        this.data = this.transformer.handleCreateBatch(msg, this.data);
        break;
      }

      case MessageTypes.DeleteBatch: {
        this.data = this.transformer.handleDeleteBatch(msg, this.data);
        break;
      }

      case MessageTypes.LinkExerciseTags: {
        this.data = this.transformer.handleLinkExerciseTags(msg, this.data);
        break;
      }

      case MessageTypes.CreateBodyWeight: {
        this.data = this.transformer.handleCreateBodyweight(msg, this.data);
        break;
      }

      case MessageTypes.DeleteBodyWeight: {
        this.data = this.transformer.handleDeleteBodyweight(msg, this.data);
        break;
      }
    }
  }

  private reset(): void {
    this.data.batches = [];
    this.data.exercises = [];
    this.data.exerciseTags = [];
    this.data.tags = [];
  }
}

import { Injectable } from '@angular/core';
import { Batch, Exercise, Tag } from '../models';
import { JournalService } from './journal.service';
import {
  AnyJournalMessage,
  CreateExerciseMsg,
  CreateSetMsg,
  CreateTagMsg,
  MessageTypes,
} from '@fit-journal';
import { timeAgo } from "short-time-ago";
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ViewStateService {
  private signals = new Subject<string>();

  tags: Tag[] = [];
  exercises: Exercise[] = [];
  batches: Batch[] = [];
  signals$ = this.signals.asObservable();

  constructor(private journal: JournalService) {
    journal.signals$.subscribe((signal: string) => {
      if (signal === 'reset') {
        this.reset();
      }

      this.signals.next("reset");
    });

    journal.stream$.subscribe((msg: AnyJournalMessage) => {
      console.log(msg);
      if (msg.type === MessageTypes.CreateExercise) {
        this.handleCreateExercise(msg);
      }

      if (msg.type === MessageTypes.CreateTag) {
        this.handleCreateTag(msg);
      }

      if (msg.type === MessageTypes.CreateBatch) {
        this.handleCreateBatch(msg);
      }

      this.signals.next("update");
    });
  }

  async append(msg: AnyJournalMessage): Promise<void> {
    await this.journal.append(msg);
  }

  private handleCreateBatch(msg: AnyJournalMessage) {
    const setMsg = msg as CreateSetMsg;

    const exercise = this.exercises.find(
      (item) => item.id == setMsg.exerciseId
    );

    const tags = [];
    if (setMsg.tagIds && setMsg.tagIds.length > 0) {
      for (const tagId of setMsg.tagIds) {
        const tag = this.tags.find((item) => item.id == tagId);
        tags.push(tag);
      }
    }

    const timestamp = setMsg.setTimestamp ?? setMsg.timestamp;
    const date = new Date(timestamp);
    const ago = timeAgo(date);

    this.batches.push({
      id: setMsg.setId,
      exerciseId: setMsg.exerciseId,
      exercise: exercise,
      timestamp: timestamp,
      occuredAt: date,
      timeAgo: ago,
      reps: setMsg.reps,
      weight: setMsg.weight,
      tagIds: setMsg.tagIds,
      tags: tags,
    } as Batch);
  }

  private handleCreateTag(msg: AnyJournalMessage) {
    const tagMsg = msg as CreateTagMsg;
    const tag = { 
      id: tagMsg.tagId,
      name: tagMsg.name,
      parentId: tagMsg.parentId
     } as Tag;

     if (tagMsg.parentId) {
      const parent = this.tags.find((item: Tag) => item.id === tagMsg.parentId);
      if (parent) {
        tag.parent = parent;
        if (!parent.childs) {
          parent.childs = [];
        }
        parent.childs.push(tag);
      }
     }

     this.tags.push(tag);
  }

  private handleCreateExercise(msg: AnyJournalMessage) {
    const exMsg = msg as CreateExerciseMsg;
    this.exercises.push({
      id: exMsg.exerciseId,
      name: exMsg.name,
      type: exMsg.exerciseType
    } as Exercise);
  }

  private reset(): void {
    this.batches = [];
    this.exercises = [];
    this.tags = [];
  }
}

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

@Injectable({
  providedIn: 'root',
})
export class ViewStateService {
  tags: Tag[] = [];
  exercises: Exercise[] = [];
  attempts: Batch[] = [];

  constructor(private journal: JournalService) {
    journal.signals$.subscribe((signal: string) => {
      if (signal === 'reset') {
        this.reset();
      }
    });

    journal.stream$.subscribe((msg: AnyJournalMessage) => {
      if (msg.type === MessageTypes.CreateExercise) {
        this.handleCreateExercise(msg);
      }

      if (msg.type === MessageTypes.CreateTag) {
        this.handleCreateTag(msg);
      }

      if (msg.type === MessageTypes.CreateBatch) {
        this.handleCreateSet(msg);
      }
    });
  }

  append(msg: AnyJournalMessage): void {
    this.journal.append(msg);
  }

  private handleCreateSet(msg: AnyJournalMessage) {
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

    this.attempts.push({
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
    this.tags.push({
      id: tagMsg.tagId,
      name: tagMsg.name,
      parentId: tagMsg.parentId,
    } as Tag);
  }

  private handleCreateExercise(msg: AnyJournalMessage) {
    const exMsg = msg as CreateExerciseMsg;
    this.exercises.push({
      id: exMsg.exerciseId,
      name: exMsg.name,
    } as Exercise);
  }

  private reset(): void {
    this.attempts = [];
    this.exercises = [];
    this.tags = [];
  }
}

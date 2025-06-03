import {
  AnyJournalMessage,
  CreateBodyweightMsg,
  LinkExerciseTagsMsg,
  MessageTypes,
} from './models';
import { CreateExerciseMsg } from './models/exercise-msgs';
import {
  CreateBatchMsg,
  DeleteBatchMsg as DeleteBatchMsg,
} from './models/batch-msgs';
import { CreateTagMsg } from './models/tag-msgs';
import { CreateUserMsg, DeleteBodyweightMsg } from './models/user-msgs';

export class MessageBuilder {
  private lastTimestamp = 0;

  createExercise(name: string, type: string): CreateExerciseMsg {
    const msg = {
      type: MessageTypes.CreateExercise,
      journalId: crypto.randomUUID(),
      timestamp: Date.now(),
      exerciseId: crypto.randomUUID(),
      exerciseType: type,
      name: name,
    } as CreateExerciseMsg;

    return this.guardTime(msg) as CreateExerciseMsg;
  }

  createTag(
    name: string,
    options?: {
      parentId?: string;
    }
  ): CreateTagMsg {
    const msg = {
      type: MessageTypes.CreateTag,
      journalId: crypto.randomUUID(),
      timestamp: Date.now(),
      tagId: crypto.randomUUID(),
      name: name,
      parentId: options?.parentId,
    } as CreateTagMsg;

    return this.guardTime(msg) as CreateTagMsg;
  }

  createBatch(
    exerciseId: string,
    reps: number,
    options?: {
      tagIds?: string[];
      weight?: number;
      timestamp?: number;
    }
  ): CreateBatchMsg {
    const msg = {
      type: MessageTypes.CreateBatch,
      journalId: crypto.randomUUID(),
      timestamp: Date.now(),
      batchId: crypto.randomUUID(),
      batchTimestamp: options?.timestamp ?? Date.now(),
      exerciseId: exerciseId,
      tagIds: options?.tagIds,
      reps: reps,
      weight: options?.weight,
    } as CreateBatchMsg;

    return this.guardTime(msg) as CreateBatchMsg;
  }

  deleteBatch(batchId: string): DeleteBatchMsg {
    const msg = {
      type: MessageTypes.DeleteBatch,
      journalId: crypto.randomUUID(),
      timestamp: Date.now(),
      batchId: batchId,
    } as DeleteBatchMsg;

    return this.guardTime(msg) as DeleteBatchMsg;
  }

  createBodyWeight(timestamp: number, weight: number): CreateBodyweightMsg {
    const msg = {
      type: MessageTypes.CreateBodyWeight,
      journalId: crypto.randomUUID(),
      timestamp: Date.now(),
      weightTimestamp: timestamp,
      weight: weight,
    } as CreateBodyweightMsg;

    return this.guardTime(msg) as CreateBodyweightMsg;
  }

  deleteBodyweight(timestamp: number): DeleteBodyweightMsg {
    const msg = {
      type: MessageTypes.DeleteBodyWeight,
      journalId: crypto.randomUUID(),
      timestamp: Date.now(),
      weightTimestamp: timestamp,
    } as DeleteBodyweightMsg;

    return this.guardTime(msg) as DeleteBodyweightMsg;
  }

  linkExercisesWithTags(
    exerciseIds: string[],
    tagIds: string[]
  ): LinkExerciseTagsMsg {
    const msg = {
      type: MessageTypes.LinkExerciseTags,
      journalId: crypto.randomUUID(),
      timestamp: Date.now(),
      exerciseIds: exerciseIds,
      tagIds: tagIds,
    } as LinkExerciseTagsMsg;

    return this.guardTime(msg) as LinkExerciseTagsMsg;
  }

  createUser(firstName: string, lastName: string): CreateUserMsg {
    const msg = {
      type: MessageTypes.CreateUser,
      journalId: crypto.randomUUID(),
      timestamp: Date.now(),
      firstName: firstName,
      lastName: lastName,
    } as CreateUserMsg;

    return this.guardTime(msg) as CreateUserMsg;
  }

  private guardTime(msg: AnyJournalMessage): AnyJournalMessage {
    if (msg.timestamp === this.lastTimestamp) {
      msg.timestamp++;
      this.lastTimestamp++;
    } else {
      this.lastTimestamp = msg.timestamp;
    }

    return msg;
  }
}

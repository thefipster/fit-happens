import {
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
  createExercise(
    name: string,
    type: string
  ): CreateExerciseMsg {
    return {
      type: MessageTypes.CreateExercise,
      journalId: crypto.randomUUID(),
      timestamp: Date.now(),
      exerciseId: crypto.randomUUID(),
      exerciseType: type,
      name: name
    } as CreateExerciseMsg;
  }

  createTag(
    name: string,
    options?: {
      parentId?: string;
    }
  ): CreateTagMsg {
    return {
      type: MessageTypes.CreateTag,
      journalId: crypto.randomUUID(),
      timestamp: Date.now(),
      tagId: crypto.randomUUID(),
      name: name,
      parentId: options?.parentId
    } as CreateTagMsg;
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
    return {
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
  }

  deleteBatch(batchId: string): DeleteBatchMsg {
    return {
      type: MessageTypes.DeleteBatch,
      journalId: crypto.randomUUID(),
      timestamp: Date.now(),
      batchId: batchId,
    } as DeleteBatchMsg;
  }

  createBodyWeight(timestamp: number, weight: number): CreateBodyweightMsg {
    return {
      type: MessageTypes.CreateBodyWeight,
      journalId: crypto.randomUUID(),
      timestamp: Date.now(),
      weightTimestamp: timestamp,
      weight: weight,
    } as CreateBodyweightMsg;
  }

  deleteBodyweight(timestamp: number): DeleteBodyweightMsg {
    return {
      type: MessageTypes.DeleteBodyWeight,
      journalId: crypto.randomUUID(),
      timestamp: Date.now(),
      weightTimestamp: timestamp,
    } as DeleteBodyweightMsg;
  }

  linkExercisesWithTags(
    exerciseIds: string[],
    tagIds: string[]
  ): LinkExerciseTagsMsg {
    return {
      type: MessageTypes.LinkExerciseTags,
      journalId: crypto.randomUUID(),
      timestamp: Date.now(),
      exerciseIds: exerciseIds,
      tagIds: tagIds,
    } as LinkExerciseTagsMsg;
  }

  createUser(firstName: string, lastName: string) : CreateUserMsg {
    return {
      type: MessageTypes.CreateUser,
      journalId: crypto.randomUUID(),
      timestamp: Date.now(),
      firstName: firstName,
      lastName: lastName
    } as CreateUserMsg;
  }
}

import { CreateBodyweightMsg, LinkExerciseTagsMsg, MessageTypes } from './models';
import { CreateExerciseMsg } from './models/exercise-msgs';
import { CreateBatchMsg, DeleteBatchMsg as DeleteBatchMsg } from './models/batch-msgs';
import { CreateTagMsg } from './models/tag-msgs';

export class MessageBuilder {
  createExercise(name: string, type: string, options?: {
    tagIds?: string[];
  }): CreateExerciseMsg {
    return {
      type: MessageTypes.CreateExercise,
      journalId: crypto.randomUUID(),
      timestamp: Date.now(),
      exerciseId: crypto.randomUUID(),
      exerciseType: type,
      name: name,
      tagIds: options?.tagIds
    } as CreateExerciseMsg;
  }

  createTag(name: string, options?: {
    parentId?: string;
    exerciseIds?: string[];
  }): CreateTagMsg {
    return {
      type: MessageTypes.CreateTag,
      journalId: crypto.randomUUID(),
      timestamp: Date.now(),
      tagId: crypto.randomUUID(),
      name: name,
      parentId: options?.parentId,
      exerciseIds: options?.exerciseIds
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

  linkExercisesWithTags(exerciseIds: string[], tagIds: string[]): LinkExerciseTagsMsg {
    return  {
      type: MessageTypes.LinkExerciseTags,
      journalId: crypto.randomUUID(),
      timestamp: Date.now(),
      exerciseIds: exerciseIds,
      tagIds: tagIds
    } as LinkExerciseTagsMsg;
  }
}

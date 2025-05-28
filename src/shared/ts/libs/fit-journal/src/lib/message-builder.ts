import { MessageTypes } from './models';
import { CreateExerciseMsg } from './models/exercise-msgs';
import { CreateBatchMsg, DeleteBlatchMsg } from './models/set-msgs';
import { CreateTagMsg } from './models/tag-msgs';

export class MessageBuilder {
  static createExerciseMsg(name: string, type: string): CreateExerciseMsg {
    return {
      type: MessageTypes.CreateExercise,
      journalId: crypto.randomUUID(),
      timestamp: Date.now(),
      exerciseId: crypto.randomUUID(),
      exerciseType: type,
      name: name,
    };
  }

  static createTagMsg(name: string, parentId?: string): CreateTagMsg {
    return {
      type: MessageTypes.CreateTag,
      journalId: crypto.randomUUID(),
      tagId: crypto.randomUUID(),
      parentId: parentId,
      timestamp: Date.now(),
      name: name,
    };
  }

  static createBatchMsg(
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
      setId: crypto.randomUUID(),
      setTimestamp: options?.timestamp ?? Date.now(),
      exerciseId: exerciseId,
      tagIds: options?.tagIds,
      reps: reps,
      weight: options?.weight,
    };
  }

  static deleteBatchMsg(setId: string): DeleteBlatchMsg {
    return {
      type: MessageTypes.DeleteBatch,
      journalId: crypto.randomUUID(),
      timestamp: Date.now(),
      setId: setId,
    };
  }
}

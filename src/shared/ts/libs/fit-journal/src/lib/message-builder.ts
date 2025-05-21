import { CreateExerciseMsg } from './models/exercise-msgs';
import { CreateSetMsg, DeleteSetMsg } from './models/set-msgs';
import { CreateTagMsg } from './models/tag-msgs';

export class MessageBuilder {
  static createExerciseMsg(name: string): CreateExerciseMsg {
    return {
      type: 'create-exercise',
      journalId: crypto.randomUUID(),
      exerciseId: crypto.randomUUID(),
      timestamp: Date.now(),
      name,
    };
  }

  static createTagMsg(name: string): CreateTagMsg {
    return {
      type: 'create-tag',
      journalId: crypto.randomUUID(),
      tagId: crypto.randomUUID(),
      timestamp: Date.now(),
      name,
    };
  }

  static createSetMsg(
    exerciseId: string,
    reps: number,
    options?: {
      tagIds?: string[];
      weight?: number;
      timestamp?: number;
    }
  ): CreateSetMsg {
    return {
      type: 'create-set',
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

  static deleteSetMsg(setId: string): DeleteSetMsg {
    return {
      type: 'delete-set',
      journalId: crypto.randomUUID(),
      timestamp: Date.now(),
      setId: setId,
    };
  }
}

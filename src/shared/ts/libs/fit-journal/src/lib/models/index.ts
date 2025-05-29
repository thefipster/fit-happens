import {
  CreateExerciseMsg,
  LinkExerciseTagsMsg as LinkExerciseTagsMsg,
} from './exercise-msgs';
import { JournalMessage } from './journal-message';
import { CreateBatchMsg, DeleteBatchMsg } from './batch-msgs';
import { CreateTagMsg } from './tag-msgs';
import { CreateBodyweightMsg } from './user-msgs';

export {
  // base type
  JournalMessage,
  // messages
  CreateExerciseMsg,
  CreateTagMsg,
  CreateBatchMsg,
  DeleteBatchMsg,
  CreateBodyweightMsg,
  LinkExerciseTagsMsg,
};

export type AnyJournalMessage =
  | CreateTagMsg
  | CreateExerciseMsg
  | CreateBatchMsg
  | DeleteBatchMsg
  | CreateBodyweightMsg
  | LinkExerciseTagsMsg;

export enum MessageTypes {
  CreateExercise = 'create-exercise',
  CreateTag = 'create-tag',
  CreateBatch = 'create-batch',
  DeleteBatch = 'delete-batch',
  CreateBodyWeight = 'create-bodyweight',
  LinkExerciseTags = 'link-exercise-tags',
}

export enum ExerciseTypes {
  Repeated = 'reps',
  Timed = 'time',
}

export const ExerciseMap = [
  {
    key: ExerciseTypes.Repeated,
    value: 'Repeated',
  },
  {
    key: ExerciseTypes.Timed,
    value: 'Timed',
  },
];

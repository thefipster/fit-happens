import { CreateExerciseMsg } from './exercise-msgs';
import { JournalMessage } from './journal-message';
import { CreateSetMsg, DeleteSetMsg } from './set-msgs';
import { CreateTagMsg } from './tag-msgs';

export { JournalMessage, CreateExerciseMsg, CreateTagMsg, CreateSetMsg, DeleteSetMsg };

export type AnyJournalMessage =
  | CreateTagMsg
  | CreateExerciseMsg
  | CreateSetMsg
  | DeleteSetMsg;

export enum MessageTypes {
  CreateExercise = "create-exercise",
  CreateTag = "create-tag",
  CreateSet = "create-set",
  DeleteSet = "delete-set"
}


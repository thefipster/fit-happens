import { CreateExerciseMsg } from './exercise-msgs';
import { JournalMessage } from './journal-message';
import { CreateSetMsg, DeleteSetMsg } from './set-msgs';
import { CreateTagMsg } from './tag-msgs';

export type AnyJournalMessage =
  | CreateTagMsg
  | CreateExerciseMsg
  | CreateSetMsg
  | DeleteSetMsg;

export { JournalMessage, CreateExerciseMsg, CreateTagMsg, CreateSetMsg, DeleteSetMsg };

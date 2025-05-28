import { CreateExerciseMsg } from './exercise-msgs';
import { JournalMessage } from './journal-message';
import { CreateBatchMsg, DeleteBlatchMsg as DeleteBatchMsg } from './set-msgs';
import { CreateTagMsg } from './tag-msgs';

export { JournalMessage, CreateExerciseMsg, CreateTagMsg, CreateBatchMsg as CreateSetMsg, DeleteBatchMsg as DeleteSetMsg };

export type AnyJournalMessage =
  | CreateTagMsg
  | CreateExerciseMsg
  | CreateBatchMsg
  | DeleteBatchMsg;

export enum MessageTypes {
  CreateExercise = "create-exercise",
  CreateTag = "create-tag",
  CreateBatch = "create-batch",
  DeleteBatch = "delete-batch"
}

export enum ExerciseTypes {
  Repeated = "reps",
  Timed = "time"
}

export const ExerciseMap = [
  {
    key: ExerciseTypes.Repeated,
    value: "Repeated"
  },{
    key: ExerciseTypes.Timed,
    value: "Timed"
  }
]


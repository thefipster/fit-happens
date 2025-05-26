import { JournalMessage } from './journal-message';

export interface CreateExerciseMsg extends JournalMessage {
  exerciseId: string;
  name: string;
  type: string;
}
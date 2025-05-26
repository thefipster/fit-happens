import { JournalMessage } from './journal-message';

export interface CreateBatchMsg extends JournalMessage {
  setId: string;
  setTimestamp?: number;
  exerciseId: string;
  reps: number;
  tagIds?: string[];
  weight?: number;
}

export interface DeleteBlatchMsg extends JournalMessage {
  setId: string;
}

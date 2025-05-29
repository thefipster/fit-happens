import { JournalMessage } from './journal-message';

export interface CreateBatchMsg extends JournalMessage {
  batchId: string;
  batchTimestamp?: number;
  exerciseId: string;
  reps: number;
  tagIds?: string[];
  weight?: number;
}

export interface DeleteBatchMsg extends JournalMessage {
  batchId: string;
}

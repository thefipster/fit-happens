import { JournalMessage } from './journal-message';

export interface CreateSetMsg extends JournalMessage {
    setId: string;
    setTimestamp: number;
    exerciseId: string;
    reps: number;
    tagIds?: string[];
    weight?: number;
}

export interface DeleteSetMsg extends JournalMessage {
  setId: string;
}
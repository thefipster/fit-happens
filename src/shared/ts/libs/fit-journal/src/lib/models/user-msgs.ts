import { JournalMessage } from './journal-message';

export interface CreateBodyweightMsg extends JournalMessage {
  weightTimestamp: number;
  weight: number;
}

export interface DeleteBodyweightMsg extends JournalMessage {
  weightTimestamp: number;
}

export interface CreateUserMsg extends JournalMessage {
  firstName: string;
  lastName: string;
}
import { JournalMessage } from './journal-message';

export interface CreateBodyweightMsg extends JournalMessage {
  weightTimestamp: number;
  weight: number;
}
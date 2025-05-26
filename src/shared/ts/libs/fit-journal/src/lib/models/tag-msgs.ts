import { JournalMessage } from './journal-message';

export interface CreateTagMsg extends JournalMessage {
  tagId: string;
  name: string;
  parentId?: string
}
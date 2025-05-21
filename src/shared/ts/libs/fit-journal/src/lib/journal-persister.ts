import { JournalMessage } from "./models/journal-message";

export interface JournalPersister {
  persist(messages: JournalMessage[]): Promise<void>;
}
import { AnyJournalMessage } from "./models";

export interface JournalPersister {
  persist(messages: AnyJournalMessage[]): Promise<void>;
}
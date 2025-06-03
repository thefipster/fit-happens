import { AnyJournalMessage } from "./models";

export interface JournalPersister {
  save(messages: AnyJournalMessage[]): Promise<void>;
  load(): Promise<AnyJournalMessage[]>;
  clear(): Promise<void>;
}
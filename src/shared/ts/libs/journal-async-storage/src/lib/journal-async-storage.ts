import AsyncStorage from '@react-native-async-storage/async-storage';
import { JournalMessage, JournalPersister } from '@fit-journal'

export class JournalAsyncStorage implements JournalPersister {
  private readonly key = 'journal-messages';

  async persist(messages: JournalMessage[]): Promise<void> {
    try {
      const existingRaw = await AsyncStorage.getItem(this.key);
      const existing = existingRaw ? JSON.parse(existingRaw) : [];

      const updated = [...existing, ...messages];
      await AsyncStorage.setItem(this.key, JSON.stringify(updated));
    } catch (err) {
      console.error("Failed to persist journal to AsyncStorage", err);
      throw err;
    }
  }

  async loadAll(): Promise<JournalMessage[]> {
    const raw = await AsyncStorage.getItem(this.key);
    return raw ? JSON.parse(raw) : [];
  }

  async clear(): Promise<void> {
    await AsyncStorage.removeItem(this.key);
  }
}
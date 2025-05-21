import AsyncStorage from "@react-native-async-storage/async-storage";

export class JournalStore {
  getDayKey(timestamp) {
    const date = new Date(timestamp);
    const dayStr = date.toISOString().split("T")[0]; // e.g., 2025-05-20
    return `journal-${dayStr}`;
  }

  async appendStorage(message) {
    try {
      const key = getDayKey(message.timestamp);
      const raw = await AsyncStorage.getItem(key);
      const entries = raw ? JSON.parse(raw) : [];
      entries.push(message);
      await AsyncStorage.setItem(key, JSON.stringify(entries));
    } catch (error) {
      console.error("[JournalService] Failed to append entry:", error);
    }
  }

  async readAll() {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const journalKeys = keys.filter((k) => k.startsWith("journal-"));
      const pairs = await AsyncStorage.multiGet(journalKeys);

      const messages = pairs.flatMap(([_, value]) => {
        try {
          return value ? JSON.parse(value) : [];
        } catch {
          return [];
        }
      });

      return messages.sort((a, b) => a.timestamp - b.timestamp);
    } catch (error) {
      console.error("[JournalService] Failed to read all entries:", error);
      return [];
    }
  }

  async getRecent(since, maxCount) {
    try {
      const startDate = new Date(since);
      const today = new Date();
      const keys = [];

      const cursor = new Date(startDate);
      while (cursor <= today) {
        keys.push(getDayKey(cursor.getTime()));
        cursor.setDate(cursor.getDate() + 1);
      }

      const pairs = await AsyncStorage.multiGet(keys);
      const entries = pairs.flatMap(([_, value]) => {
        try {
          const dayEntries = value ? JSON.parse(value) : [];
          return dayEntries.filter((e) => e.timestamp >= since);
        } catch {
          return [];
        }
      });

      return entries
        .sort((a, b) => b.timestamp - a.timestamp)
        .slice(0, maxCount);
    } catch (error) {
      console.error("[JournalService] Failed to get recent entries:", error);
      return [];
    }
  }

  async clear() {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const journalKeys = keys.filter((k) => k.startsWith("journal-"));
      await AsyncStorage.multiRemove(journalKeys);
    } catch (error) {
      console.error("[JournalService] Failed to clear journal:", error);
    }
  }
}

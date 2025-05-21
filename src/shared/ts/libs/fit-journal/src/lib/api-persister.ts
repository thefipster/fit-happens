import { JournalPersister } from './journal-persister';
import { JournalMessage } from './models/journal-message';

export class ApiPersister implements JournalPersister {
  constructor(private apiUrl: string, private apiKey: string) {}

  async persist(messages: JournalMessage[]): Promise<void> {
    const response = await fetch(`${this.apiUrl}/journal/append`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-API-Key': this.apiKey },
      body: JSON.stringify(messages),
    });

    if (!response.ok) {
      throw new Error(`Failed to persist journal: ${response.status}`);
    }
  }
}

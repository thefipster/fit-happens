import { AnyJournalMessage } from './models';

export class ApiSynchronizer {
  private key?: string;
  private url: string

  constructor(apiUrl: string, options?: {
    apiKey?: string;
  }) {
    this.url = apiUrl;
    this.key = options?.apiKey;
  }

  async push(messages: AnyJournalMessage[]): Promise<void> {
    const response = await fetch(`${this.url}/journal`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(messages),
    });

    if (!response.ok) {
      throw new Error(`Failed to persist journal: ${response.status}`);
    }
  }

  async pull(after?: number): Promise<AnyJournalMessage[]> {
    let url = `${this.url}/journal`;

    if (after) {
      url = `${url}?after=${after}`
    }

    const response = await fetch(url, {
      method: 'GET',
      headers: this.getHeaders()
    });

    if (!response.ok) {
      throw new Error(`Failed to persist journal: ${response.status}`);
    }

    return response.json()
  }

  updateKey(apiKey: string) {
    this.key = apiKey;
  }

  private getHeaders(): Record<string, string> {
    if (!this.key)
      throw new Error('Missing apikey.')

    return { 'Content-Type': 'application/json', 'X-API-Key': this.key };
  }
}

import { Injectable } from '@angular/core';
import { AnyJournalMessage, JournalPersister } from 'fit-journal';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageJournalPersisterService implements JournalPersister {
  private apiKey:string | undefined;

  setKey(apiKey: string) : void {
    this.apiKey = apiKey;
  }

  load(): Promise<AnyJournalMessage[]> {
    if (!this.apiKey)
      throw new Error("No api key defined. Local storage deactivated.");

    const storageKey = this.hashKey(this.apiKey);
    const encrypted = localStorage.getItem(storageKey);
    if (!encrypted) return Promise.resolve([]);
    const journal = this.decrypt(encrypted, this.apiKey);
    return Promise.resolve(journal);
  }

  save(messages: AnyJournalMessage[]): Promise<void> {
    if (!this.apiKey)
      throw new Error("No api key defined. Local storage deactivated.");

    const storageKey = this.hashKey(this.apiKey);
    const encrypted = this.encrypt(messages, this.apiKey);
    localStorage.setItem(storageKey, encrypted);
    return Promise.resolve();
  }

  clear(): Promise<void> {
    if (!this.apiKey)
      throw new Error("No api key defined. Local storage deactivated.");
    
    const storageKey = this.hashKey(this.apiKey);
    localStorage.removeItem(storageKey);
    return Promise.resolve();
  }

  private hashKey(key: string): string {
    return CryptoJS.SHA256(key).toString();
  }

  private encrypt(data: unknown, apiKey: string): string {
    const jsonString = JSON.stringify(data);
    return CryptoJS.AES.encrypt(jsonString, apiKey).toString();
  }

  private decrypt(encryptedData: string, apiKey: string): AnyJournalMessage[] {
    try {
      const bytes = CryptoJS.AES.decrypt(encryptedData, apiKey);
      const decryptedJson = bytes.toString(CryptoJS.enc.Utf8);
      return JSON.parse(decryptedJson);
    } catch (error) {
      console.error('Failed to decrypt journal messages:', error);
      return [];
    }
  }
}
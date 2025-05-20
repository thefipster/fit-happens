import { JournalService } from '../../src/journal-service.js';
import { CreateTagMsg } from '../../src/models/tag-messages.js';

describe('JournalService Emitter', () => {
  it('should emit a message when published', () => {
    const journal = new JournalService();
    const testMsg = new CreateTagMsg('CypressTest');

    let received = null;

    // Subscribe to the observable
    journal.messages$.subscribe(msg => {
      received = msg;
    });

    // Publish a message
    journal.append(testMsg);

    // Assert synchronously that the message was emitted
    expect(received).to.deep.equal(testMsg);
  });
});
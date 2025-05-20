import { JournalMessage } from './journal-message';

export class CreateTagMsg extends JournalMessage {
  constructor(name, parentId) {
    super();
    if (!name) {
      throw new Error('Name is required');
    }

    this.type = "create-tag";
    this.tagId = crypto.randomUUID(); 
    this.name = name;
    
    if (parentId)
        this.parentId = parentId;
  }
}

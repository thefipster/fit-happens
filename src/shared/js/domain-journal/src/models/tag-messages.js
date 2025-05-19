const { v4: uuidv4 } = require('uuid');
const { JournalMessage } = require('./journal-message');

class CreateTagMsg extends JournalMessage {
  constructor(name, parentId) {
    this.tagId = uuidv4();
    this.name = name;
    
    if (parentId)
        this.parentId = parentId;
  }
}

module.exports = {
    CreateTagMsg
};
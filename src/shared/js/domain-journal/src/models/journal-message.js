const { v4: uuidv4 } = require('uuid');

class JournalMessage {
  constructor() {
    this.id = uuidv4();
    this.timestamp = Date.now();
  }
}

module.exports = {
    JournalMessage
};
const { v4: uuidv4 } = require('uuid');
const { JournalMessage } = require('./journal-message');

class CreateExerciseMsg extends JournalMessage {
  constructor(name) {
    this.exerciseId = uuidv4();
    this.name = name;
  }
}

module.exports = {
  CreateExerciseMsg
};
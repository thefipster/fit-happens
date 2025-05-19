const { CreateExerciseMsg } = require("./models/exercise-messages");
const { CreateTagMsg } = require("./models/tag-messages");

class JournalBuilder {
  constructor() {
  }

  createTagMessage(name, parentId) {
    return new CreateTagMsg(name, parentId);
  }

  createExerciseMessage(name) {
    return new CreateExerciseMsg(name);
  }
}

module.exports = { JournalBuilder };
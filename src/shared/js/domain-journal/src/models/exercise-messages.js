import { JournalMessage } from './journal-message';

export class CreateExerciseMsg extends JournalMessage {
  constructor(name) {
    super();
    if (!name) {
      throw new Error('Name is required');
    }

    this.type = "create-exercise";
    this.exerciseId = crypto.randomUUID(); 
    this.name = name;
  }
}

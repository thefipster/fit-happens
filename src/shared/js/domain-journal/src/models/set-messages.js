import { JournalMessage } from './journal-message';

export class CreateSetMsg extends JournalMessage {
  constructor(timestamp, exercise, tags, reps, weight) {
    super();
    if (!timestamp)
      timestamp = Date.now();

    if (weight == 0)
      weight = null;

    if (!exercise)
      throw new Error('Exercise is required');

    if (!reps || reps === 0)
      throw new Error('Reps are required and have to be greater than zero');

    this.type = "create-set";
    this.setId = crypto.randomUUID();
    this.setTimestamp = timestamp;
    this.exerciseId = exercise;
    this.tagIds = tags;
    this.reps = reps;
    this.weight = weight; 
  }
}

import { JournalMessage } from './journal-message';

export interface CreateExerciseMsg extends JournalMessage {
  exerciseId: string;
  name: string;
  exerciseType: string;
  tagIds?: string[];
}

export interface LinkExerciseTagsMsg extends JournalMessage {
  exerciseIds: string[];
  tagIds: string[];
}
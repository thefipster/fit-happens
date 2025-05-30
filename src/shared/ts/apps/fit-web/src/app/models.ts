export interface FitData {
  tags: Tag[];
  exercises: Exercise[];
  exerciseTags: ExerciseTag[];
  batches: Batch[];
  bodyweights: Bodyweight[];
}

export interface Tag {
  id: string;
  name: string;
  parentId?: string;
  childs?: Tag[];
  parent: Tag | undefined;
}

export interface Exercise {
  id: string;
  name: string;
  type: string;
}

export interface Batch {
  id: string;
  timestamp: number;
  occuredAt: Date;
  timeAgo: string;
  exercise: Exercise;
  exerciseId: string;
  exerciseType: string;
  reps: number;
  tags?: Tag[];
  tagIds?: string[];
  weight?: number;
}

export interface ExerciseTag {
  exerciseId: string;
  exercise: Exercise;
  tagId: string;
  tag: Tag;
}

export interface Bodyweight {
  measuredAt: Date;
  timeAgo: string;
  timestamp: number;
  valueInKg: number;
}

export interface User {
  firstName: string,
  lastName: string
}
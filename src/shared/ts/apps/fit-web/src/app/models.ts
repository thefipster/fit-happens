export interface Tag {
  id: string;
  name: string;
  parentId?: string;
  childs?: Tag[];
}

export interface Exercise {
  id: string;
  name: string;
}

export interface Attempt {
  id: string;
  timestamp: number;
  occuredAt: Date;
  timeAgo: string;
  exercise: Exercise;
  exerciseId: string;
  reps: number;
  tags?: Tag[];
  tagIds?: string[];
  weight?: number;
}

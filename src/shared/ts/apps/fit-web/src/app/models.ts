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

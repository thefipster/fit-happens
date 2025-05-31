import { Injectable } from '@angular/core';
import {
  AnyJournalMessage,
  CreateBatchMsg,
  CreateBodyweightMsg,
  CreateExerciseMsg,
  CreateTagMsg,
  DeleteBatchMsg,
  DeleteBodyweightMsg,
  LinkExerciseTagsMsg,
} from '@fit-journal';
import { Batch, Bodyweight, Exercise, ExerciseTag, FitData, Tag } from '../models';
import { timeAgo } from 'short-time-ago';

@Injectable({
  providedIn: 'root',
})
export class TransformService {
  handleCreateBatch(msg: AnyJournalMessage, data: FitData): FitData {
    const batchMsg = msg as CreateBatchMsg;

    // load exercise
    const exercise = data.exercises.find(
      (item) => item.id == batchMsg.exerciseId
    );

    // load tags
    const tags = [];
    if (batchMsg.tagIds && batchMsg.tagIds.length > 0) {
      for (const tagId of batchMsg.tagIds) {
        const tag = data.tags.find((item) => item.id == tagId);
        tags.push(tag);
      }
    }

    // computed props
    const timestamp = batchMsg.batchTimestamp ?? batchMsg.timestamp;
    const date = new Date(timestamp);
    const ago = timeAgo(date);

    // create batch
    const batch = {
      id: batchMsg.batchId,
      exerciseId: batchMsg.exerciseId,
      exercise: exercise,
      timestamp: timestamp,
      occuredAt: date,
      timeAgo: ago,
      reps: batchMsg.reps,
      weight: batchMsg.weight,
      tagIds: batchMsg.tagIds,
      tags: tags,
    } as Batch;

    data.batches.push(batch);
    return data;
  }

  handleDeleteBatch(msg: AnyJournalMessage, data: FitData): FitData {
    const delMsg = msg as DeleteBatchMsg;
    data.batches = data.batches.filter(
      (item: Batch) => item.id !== delMsg.batchId
    );

    return data;
  }

  handleCreateTag(msg: AnyJournalMessage, data: FitData): FitData {
    const tagMsg = msg as CreateTagMsg;

    // create tag
    const tag = {
      id: tagMsg.tagId,
      name: tagMsg.name,
      parentId: tagMsg.parentId,
    } as Tag;

    // load parent
    if (tagMsg.parentId) {
      const parent = data.tags.find((item: Tag) => item.id === tagMsg.parentId);
      if (parent) {
        tag.parent = parent;
        if (!parent.childs) {
          parent.childs = [];
        }
        parent.childs.push(tag);
      }
    }

    data.tags.push(tag);

    return data;
  }

  handleCreateExercise(msg: AnyJournalMessage, data: FitData): FitData {
    const exMsg = msg as CreateExerciseMsg;

    // create exercise
    const exercise = {
      id: exMsg.exerciseId,
      name: exMsg.name,
      type: exMsg.exerciseType,
    } as Exercise;

    data.exercises.push(exercise);

    return data;
  }

  handleLinkExerciseTags(msg: AnyJournalMessage, data: FitData): FitData {
    const linkMsg = msg as LinkExerciseTagsMsg;

    // create exercise tag links
    for (const exId of linkMsg.exerciseIds) {
      for (const tagId of linkMsg.tagIds) {
        const exercise = data.exercises.find(
          (item: Exercise) => item.id === exId
        );
        const tag = data.tags.find((item: Tag) => item.id === tagId);

        if (exercise && tag) {
          const group = {
            exerciseId: exId,
            exercise: exercise,
            tagId: tagId,
            tag: tag,
          } as ExerciseTag;

          data.exerciseTags.push(group);
        }
      }
    }

    return data;
  }

  handleCreateBodyweight(msg: AnyJournalMessage, data: FitData): FitData {
    const bodyMsg = msg as CreateBodyweightMsg;

    // computed props
    const timestamp = bodyMsg.weightTimestamp ?? bodyMsg.timestamp;
    const date = new Date(timestamp);
    const ago = timeAgo(date);

    // create bodyweight
    const weight = {
      measuredAt: date,
      timeAgo: ago,
      timestamp:  bodyMsg.weightTimestamp,
      valueInKg: bodyMsg.weight
    } as Bodyweight;

    data.bodyweights.push(weight);

    return data;
  }

  handleDeleteBodyweight(msg: AnyJournalMessage, data: FitData): FitData {
    const delMsg = msg as DeleteBodyweightMsg;
    data.bodyweights = data.bodyweights.filter((x: Bodyweight) => x.timestamp !== delMsg.weightTimestamp);
    
    return data;
  }
}

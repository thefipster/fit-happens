import { Injectable } from '@angular/core';
import {
  AnyJournalMessage,
  CreateBatchMsg,
  CreateExerciseMsg,
  CreateTagMsg,
  DeleteBatchMsg,
  LinkExerciseTagsMsg,
} from '@fit-journal';
import { Batch, Exercise, ExerciseTag, Tag } from '../models';
import { timeAgo } from 'short-time-ago';

@Injectable({
  providedIn: 'root',
})
export class TransformService {
  handleCreateBatch(
    msg: AnyJournalMessage,
    existingExercises: Exercise[],
    existingTags: Tag[]
  ): Batch {
    const setMsg = msg as CreateBatchMsg;

    const exercise = existingExercises.find(
      (item) => item.id == setMsg.exerciseId
    );

    const tags = [];
    if (setMsg.tagIds && setMsg.tagIds.length > 0) {
      for (const tagId of setMsg.tagIds) {
        const tag = existingTags.find((item) => item.id == tagId);
        tags.push(tag);
      }
    }

    const timestamp = setMsg.batchTimestamp ?? setMsg.timestamp;
    const date = new Date(timestamp);
    const ago = timeAgo(date);

    const batch = {
      id: setMsg.batchId,
      exerciseId: setMsg.exerciseId,
      exercise: exercise,
      timestamp: timestamp,
      occuredAt: date,
      timeAgo: ago,
      reps: setMsg.reps,
      weight: setMsg.weight,
      tagIds: setMsg.tagIds,
      tags: tags,
    } as Batch;

    return batch;
  }

  handleDeleteBatch(msg: AnyJournalMessage, existingBatches: Batch[]): Batch[] {
    const delMsg = msg as DeleteBatchMsg;
    return existingBatches.filter((item: Batch) => item.id !== delMsg.batchId);
  }

  handleCreateTag(msg: AnyJournalMessage, existingTags: Tag[]): Tag {
    const tagMsg = msg as CreateTagMsg;
    const tag = {
      id: tagMsg.tagId,
      name: tagMsg.name,
      parentId: tagMsg.parentId,
    } as Tag;

    if (tagMsg.parentId) {
      const parent = existingTags.find(
        (item: Tag) => item.id === tagMsg.parentId
      );
      if (parent) {
        tag.parent = parent;
        if (!parent.childs) {
          parent.childs = [];
        }
        parent.childs.push(tag);
      }
    }

    return tag;
  }

  handleCreateExercise(msg: AnyJournalMessage): Exercise {
    const exMsg = msg as CreateExerciseMsg;
    const exercise = {
      id: exMsg.exerciseId,
      name: exMsg.name,
      type: exMsg.exerciseType,
    } as Exercise;

    return exercise;
  }

  handleLinkExerciseTags(
    msg: AnyJournalMessage,
    existingExercises: Exercise[],
    existingTags: Tag[]
  ): ExerciseTag[] {
    const linkMsg = msg as LinkExerciseTagsMsg;
    const refs = [];

    for (const exId of linkMsg.exerciseIds) {
      for (const tagId of linkMsg.tagIds) {
        const exercise = existingExercises.find(
          (item: Exercise) => item.id === exId
        );
        const tag = existingTags.find((item: Tag) => item.id === tagId);

        if (exercise && tag) {
          refs.push({
            exerciseId: exId,
            exercise: exercise,
            tagId: tagId,
            tag: tag,
          } as ExerciseTag);
        }
      }
    }

    return refs;
  }
}

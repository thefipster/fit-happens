import { Injectable } from '@angular/core';
import { AnyJournalMessage, CreateExerciseMsg, CreateSetMsg, CreateTagMsg } from '@fit-journal';
import { Batch, Exercise, Tag } from '../models';
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
    const setMsg = msg as CreateSetMsg;

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

    const timestamp = setMsg.setTimestamp ?? setMsg.timestamp;
    const date = new Date(timestamp);
    const ago = timeAgo(date);

    const batch = {
      id: setMsg.setId,
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

  handleCreateExercise(msg: AnyJournalMessage) {
    const exMsg = msg as CreateExerciseMsg;
    const exercise = {
      id: exMsg.exerciseId,
      name: exMsg.name,
      type: exMsg.exerciseType,
    } as Exercise;

    return exercise;
  }
}

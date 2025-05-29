# 📝 Journal Messages

This document describes the structure of the journal message types used for tracking actions within the system. All messages inherit from a common base `JournalMessage` that includes metadata for tracing and ordering.

The journal is the single source of truth. Every other data model must be derived from the journal by replaying all messages it contains in sequence given by the `Timestamp` property. Every message performs an action on the data model like adding, updating or deleting something, setting references etc. 

## Table of Contents

### Base
* [Journal Message](#JournalMessage)

### Messages
* [Create Exercise Message](#CreateExerciseMsg)
* [Create Tag Message](#CreateTagMsg)
* [Create Batch Message](#CreateBatchMsg)
* [Delete Batch Message](#DeleteBatchMsg)
* [Create BodyWeight Message](#CreateBodyWeightMsg)
* [Link Exercises with Tags Message](#LinkExerciseTagsMsg)

### Additional Information
* [Example Workflow](#Example)
* [Immutability](#Immutability)

---

<a id="JournalMessage"></a>
## `JournalMessage`

All messages extend from `JournalMessage`

| Property    | Type     | Description                                                  |
| ----------- | -------- | ------------------------------------------------------------ |
| `JournalId` | `string` | Unique identifier for the journal entry                      |
| `Timestamp` | `number` | UTC timestamp in milliseconds when the message was created   |
| `Type`      | `string` | Enumerated value, see MessageTypes                           |

<a id="MessageTypes"></a>
### `MessageTypes`

| Value                 | Description                                      |
| --------------------- | ------------------------------------------------ |
| `create-exercise`     | Create a new exercise                            |
| `create-tag`          | Create a new tag                                 |
| `create-batch`        | Create a new batch                               |
| `delete-batch`        | Delete an existing batch                         |
| `create-bodyweight`   | Create a new bodyweight measurement              |
| `link-exercise-tags` | Create n:m references between tags and exercises  |

---

<a id="CreateExerciseMsg"></a>
## `CreateExerciseMsg`

Represents the creation of a new exercise.

| Property       | Type        | Description                           |
| -------------- | --------    | ------------------------------------- |
| `ExerciseId`   | `string`    | Unique identifier for the exercise    |
| `ExerciseType` | `string`    | Enumerated value, see ExerciseTypes   |
| `Name`         | `string`    | Name of the exercise (e.g., "Burpee") |
| `TagIds`       | `string[]?` | Tags that are linked to this exercise |

<a id="ExerciseTypes"></a>
### `ExerciseTypes`

| Value  | Description                                   |
| ------ | --------------------------------------------- |
| `reps` | Repetitive exercises e.g. Push-Ups, Pull-Ups  |
| `time` | Timed exercises e.g. Wall-Sit, Plank          |

---
<a id="CreateTagMsg"></a>
## `CreateTagMsg`

Represents the creation of a new tag for adding information to a batch.

| Property      | Type        | Description                               |
| ------------- | ---------   | ----------------------------------------- |
| `TagId`       | `string`    | Unique identifier for the tag             |
| `Name`        | `string`    | Display name of the tag                   |
| `ParentId`    | `string?`   | Optional ID of a parent tag (for nesting) |
| `ExerciseIds` | `string[]?` | Optional exercises linked to this tag     |

---

<a id="CreateBatchMsg"></a>
## `CreateBatchMsg`

Represents the logging of a set within an exercise.

| Property         | Type        | Description                                      |
| ---------------- | ----------  | ----------------------------------------         |
| `BatchId`        | `string`    | Unique identifier for the set                    |
| `BatchTimestamp` | `number`    | UTC timestamp (ms) when the set occurred         |
| `ExerciseId`     | `string`    | ID of the associated exercise                    |
| `Weight`         | `number?`   | Optional weight lifted in the set                |
| `Reps`           | `number`    | Number of repetitions / Time in seconds          |
| `TagIds`         | `string[]?` | Optional list of tag IDs associated with the set |

---

<a id="DeleteBatchMsg"></a>
## `DeleteBatchMsg`

Represents the deletion of an existing batch.

| Property   | Type     | Description             |
| ---------- | -------- | ----------------------- |
| `BatchId`  | `string` | ID of the set to delete |

---

<a id="CreateBodyWeightMsg"></a>
##  `CreateBodyWeightMsg`

Represents the measurement of the users bodyweight.

| Property          | Type      | Description                               |
| ----------------- | --------- | ----------------------------------------- |
| `Weight`          | `number`  | Bodyweight of the user in kg              |
| `WeightTimestamp` | `number`  | Timestamp when the measurement occured    |

---

<a id="LinkExerciseTagsMsg"></a>
##  `LinkExerciseTagsMsg`

Creates a link between tags and execises so that not all tags are shown for every exercise.

| Property      | Type        | Description         |
| ------------- | ----------- | ------------------- |
| `ExerciseIds` | `string[]`  | List of exerciseIds |
| `TagIds`      | `string[]`  | List of tagIds      |

All given tags will be linked to all given exercises.

### Example

```
tagIds: [a, b]; 
exercisIds: [x, y]

Result:
a: x
a: y
b: x
b: y
```



---

<a id="Example"></a>
## ✅ Example Workflow

1. `CreateExerciseMsg` – Create a new exercise called "Squat"
2. `CreateTagMsg` – Create tag called "assisted"
3. `CreateBatchMsg` – Log a batch for "Squat" with "assisted" tag.
4. `DeleteBatchMsg` – Remove the batch because you realized it was just a dream.

---


<a id="Immutability"></a>
## 🔄 Immutability

All messages are immutable journal entries.

They should be:

* Appended to a stream or log
* Stored for auditing or undo functionality
* Emitted to subscribers (e.g., via RxJS `Subject`)

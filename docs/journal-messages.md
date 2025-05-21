# 📝 Journal Messages

This document describes the structure of the journal message types used for tracking actions within the system. All messages inherit from a common base `JournalMessage` that includes metadata for tracing and ordering.

---

## 📌 Common Base: `JournalMessage`

All messages extend from `JournalMessage`, which includes:

| Property    | Type     | Description                                                  |
| ----------- | -------- | ------------------------------------------------------------ |
| `JournalId` | `string` | Unique identifier for the journal entry                      |
| `Timestamp` | `number` | UTC timestamp (in milliseconds) when the message was created |

---

## 🏋️‍♂️ `CreateExerciseMsg`

Represents the creation of a new exercise.

| Property     | Type     | Description                                |
| ------------ | -------- | ------------------------------------------ |
| `ExerciseId` | `string` | Unique identifier for the exercise         |
| `Name`       | `string` | Name of the exercise (e.g., "Burpee") |

Inherits from `JournalMessage`.

---

## 🧱 `CreateSetMsg`

Represents the logging of a set within an exercise.

| Property       | Type       | Description                              |
| -------------- | ---------- | ---------------------------------------- |
| `SetId`        | `string`   | Unique identifier for the set            |
| `SetTimestamp` | `number`   | UTC timestamp (ms) when the set occurred |
| `ExerciseId`   | `string`   | ID of the associated exercise            |
| `Weight`       | `number?`  | Optional weight lifted in the set        |
| `Reps`         | `number`   | Number of repetitions                    |
| `TagIds`       | `string[]` | List of tag IDs associated with the set  |

Inherits from `JournalMessage`.

---

## 🏷️ `CreateTagMsg`

Represents the creation of a new tag for organizing or labeling sets.

| Property   | Type      | Description                               |
| ---------- | --------- | ----------------------------------------- |
| `TagId`    | `string`  | Unique identifier for the tag             |
| `Name`     | `string`  | Display name of the tag                   |
| `ParentId` | `string?` | Optional ID of a parent tag (for nesting) |

Inherits from `JournalMessage`.


## ❌ `DeleteSetMsg`

Represents the deletion of an existing set.

| Property | Type     | Description             |
| -------- | -------- | ----------------------- |
| `SetId`  | `string` | ID of the set to delete |

Inherits from `JournalMessage`.

---

##  `SetNewBodyWeight`

Represents the creation of a new tag for organizing or labeling sets.

| Property          | Type      | Description                               |
| ----------------- | --------- | ----------------------------------------- |
| `Bodyweight`      | `number`  | Bodyweight of the user in kg              |
| `WeightTimestamp` | `number`  | Timestamp when the measurement occured    |

Inherits from `JournalMessage`.

---

## ✅ Example Workflow

1. `CreateExerciseMsg` – Create "Squat"
2. `CreateTagMsg` – Create tag "assisted"
3. `CreateSetMsg` – Log a set for "Squat" with reps and optional tags or weight
4. `DeleteSetMsg` – Remove an incorrectly logged set

---

## 🔄 All messages are immutable journal entries.

They should be:

* Appended to a stream or log
* Stored for auditing or undo functionality
* Emitted to subscribers (e.g., via RxJS `Subject`)

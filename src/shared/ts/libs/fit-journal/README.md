# 🏋️‍♀️ FitJournal 📓

**Track it. Stream it. Sync it.**

> A reactive journal engine for your fitness app that stores, streams, and syncs workout events with ease.

---

## 🚀 What is FitJournal?

FitJournal is your in-memory journal for fitness data — powered by RxJS magic. It's designed to collect, emit, and sync user-generated messages such as exercises, tags, and batches in a reactive and extendable way.

Whether you're building a swole solo lifter app or a connected community workout tracker — **FitJournal keeps your reps in check**.

---

## 🎯 Features

* 🧠 **In-memory storage** of journal messages
* 🔄 **RxJS event stream** of all journal activity
* 🔗 **Sync support** via custom API handlers
* 💾 **Persistence ready** with a pluggable interface
* ⚒️ Built-in **MessageBuilder** for safe message creation

---

## 🏗️ Usage

```ts
import { FitJournal } from 'your-fitness-journal-lib';

const journal = new FitJournal({
  autoSync: true,
  persister: myPersister,
  synchronizer: mySynchronizer
});

journal.stream$.subscribe(msg => {
  console.log('New journal message:', msg);
});

const msg = journal.builder.createExercise('Push Ups');
await journal.append(msg);
```

---

## 🔁 Syncing

### Push to API

```ts
await journal.pushApi();
```

Pushes any new messages that haven’t been synced yet.

### Pull from API

```ts
await journal.pullApi();
```

Fetches messages from the remote source and updates local state.

---

## 🛠️ API

### `new FitJournal(options?)`

| Option         | Type               | Description                         |
| -------------- | ------------------ | ----------------------------------- |
| `persister`    | `JournalPersister` | Optional storage adapter            |
| `synchronizer` | `ApiSynchronizer`  | Handles pushing/pulling to your API |
| `autoSync`     | `boolean`          | Automatically sync on `append()`    |

---

### Core Methods

| Method              | Description                                      |
| ------------------- | ------------------------------------------------ |
| `append(msg)`       | Adds a message to the journal                    |
| `stream$`           | RxJS stream for new journal messages             |
| `pushApi()`         | Pushes unsynced messages to the API              |
| `pullApi()`         | Pulls all messages from the API and resets state |
| `setSynchronizer()` | Set or change the synchronizer dynamically       |
| `setPersister()`    | Set or change the persister dynamically          |

---

## 💡 Design Notes

* Messages must implement the `JournalMessage` interface and must be added to the `AnyJournalMessage` derived type.
* Syncing is **timestamp-based** — only new messages are pushed.
* `MessageBuilder` helps you create safe, typed messages for actions like creating a tag, adding a batch, or deleting one.

---

## 🧬 Extensibility

Want to sync the the mighty `FitHappensApi`, it's already integrated!
Want to persist messages to `AsyncStorage`? Just implement `JournalPersister`.
Need to sync with a custom cloud service? Create a custom `ApiSynchronizer`!

---

## 🧠 Pro Tip

Create the `FitJournal` as a singleton so it will be reused by every component.

Example implementation for angular
```ts
# services/journal-service.ts

import { Injectable } from '@angular/core';
import { FitJournal } from '@fit-journal';

@Injectable({
  providedIn: 'root',
})

export class JournalService {
  private journal: FitJournal;

  constructor() {
    this.journal = new FitJournal();
  }
}

---
# screens/exercise-screen-component.ts

import { JournalService } from '../services/journal-service';


export class ExerciseScreenComponent {
    constructor(journalService: JournalService) { }
}
```

Use `.stream$` to update your datamodel when new messages are pushed to the journal. This way it will be a breeze to recover the state of your data model to any given time by replaying the journal.

```js

journal.stream$.subscribe(msg => {
    switch (msg.type) {

        case MessageTypes.CreateExercise: {
            const exercise = {
                id: msg.exerciseId,
                name: msg.name,
                type: msg.exerciseType,
            }

            this.database.exercises.push(exercise);
            break;
        }

        case MessageTypes.AnotherOne: { rocketScience(); break; }
});

const msg = journal.builder.createExercise('Push Ups', ExerciseTypes.Repeated);
await journal.append(msg);

```

---

## 🧃 Stay Juicy

FitJournal is lightweight but mighty. Pair it with your favorite database, state management, analytics, or visualization tool — and you’ve got a performance powerhouse 💪.

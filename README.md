# 💪 Fit Happens

Welcome to **Fit Happens** – the world's most honest name for a fitness app.  
Because sometimes you lift, sometimes you log, and sometimes… well… fit just happens.

This is the **monorepo** for a lovingly handcrafted fitness ecosystem that doesn't try to sell you supplements or yell at you with motivational quotes. Instead, we focus on:

- 🧠 A clean event-based journal to track your fitness life.
- 🛠️ Simple, hackable architecture using open formats like JSON and TypeScript.
- 📲 Real apps that run on your phone or in your browser.
- 🧘 No judgment. Log what you want, how you want.

---

## 🧩 What’s Inside?

This repo is where all the magic (and code) lives. Here’s a quick tour of the rooms in this digital gym:

| Folder                  | What It Does                                                                 |
|--------------------------|------------------------------------------------------------------------------|
| [`fit-happens-api`](./src/api/README.md)   | The backend: A .NET Core WebAPI that stores your journal entries as JSON files. It’s like a dumbbell rack for your data. Uses a dead-simple `x-api-key` for access. |
| [`fit-happens-app`](./src/frontend/README.md)   | The mobile app, built with React Native. This is where users create exercises, tag them, log batches, track bodyweight, and admire their statistical gains. |
| [`fit-happens-web`](./src/shared/ts/apps/fit-web/README.md)   | An Angular web frontend that’s basically a temporary notepad with muscles. Made to inject test data while the real app catches up. Zero frills, zero validation. |
| [`fit-journal`](./src/shared/ts/libs/fit-journal/README.md)           | A TypeScript library that handles journal logic. Think of it as your personal fitness historian. Used by both frontends. Tested, typed, terrific. |

---

## 📚 Documentation

We don’t believe in gatekeeping knowledge (or gains). Here’s everything you need to understand how Fit Happens works:

- [📓 Journal Mechanics](./docs/journal.md)  
  How our event-based system captures the full story of your fitness journey.

- [💬 Journal Message Types](./docs/journal-messages.md)  
  The complete list of all message types (like `CreateSetMsg`, `CreateTagMsg`, etc.).  
  Spoiler: everything’s just a message. Even deleting a set.

- [🧠 Derived Data Model](./docs/fitness-data.md)  
  How we reconstruct useful stuff from a pile of journal entries. It's like CrossFit for your data.

---

## 🔐 Authentication

We keep it simple:

```http
x-api-key: your-auth-key
````

No OAuth dance, no login screens, no cookies. Just you and your secret key. Keep it safe. Like your lifting belt.

---

## 🧪 Development Philosophy

We believe software should be like a good workout:

* **Modular**: Train different muscle groups (apps) independently.
* **Repeatable**: Consistent results with the same inputs.
* **Transparent**: No black boxes. Everything’s in JSON or open-source code.
* **No-nonsense**: Zero third-party analytics. Zero popups. Zero guilt.

The mobile app is the main focus. The web frontend is a lovable kludge. The journal library is where the brains live.

---

## 🚧 Project Status

Currently:

* Actively developed
* Passively opinionated
* Casually awesome

We’re not trying to be the next big fitness platform. We just want to build something that **works**, is **hackable**, and respects your data. Oh, and we want you to be able to export everything, anytime.

---

## 🧘 Final Thoughts

This whole thing started because the existing fitness apps were either too bloated, too commercial, or too condescending. Fit Happens is our rebellion.

So if you’re into:

* Data you own
* Workouts you control
* Apps you can actually read the code for

Then you’re in the right place.

Let’s lift some logs.
Let’s make Fit Happen.

---

🧡 Made with sweat and code.

# 🧪 fit-happens-web

Welcome to **fit-happens-web** — the Angular app that wasn’t supposed to happen, but did anyway.

This is the temporary (and slightly chaotic) web frontend for the **Fit Happens** ecosystem.  
It exists to let us:

- Enter test data into the journal
- See if our messages look okay
- Fake being a real frontend until the mobile app grows up

It’s not pretty. It’s not polished. But it logs.  
And when you're designing an event-based fitness system, that’s half the battle.

---

## ⚠️ Warning: Here Be Hacks

This app was built quickly to help test journal functionality. Here’s what you should expect:

- ✅ Can create and send journal messages
- ✅ Can display lists of exercises, tags, and logged sets (batches)
- 🚫 No real input validation
- 🚫 No mobile friendliness
- 🚫 No expectations

You’ve been warned. Use it like a workout band from a bargain bin: only if you know what you’re doing.

---

## 🏋️ Features

Such as they are:

| Feature                  | Status        | Notes                                               |
|--------------------------|---------------|-----------------------------------------------------|
| Create Exercises         | ✅ Works       | Adds a `CreateExerciseMsg` to the journal           |
| Create Tags              | ✅ Works       | Adds a `CreateTagMsg`                               |
| Log Exercise Batches     | ✅ Works       | Adds multiple `CreateSetMsg` in one go              |
| View Exercises & Tags    | ✅ Works-ish   | Lists the raw journal-derived data                  |
| View Logged Sets         | ✅ Rudimentary | It works, but don’t expect heatmaps or charts       |

---

## 🧠 Architecture

- **Framework**: Angular (with a heavy dose of "eh, good enough")
- **Journal logic**: Delegated to the shared [`fit-journal`](../fit-journal) TypeScript library
- **Backend**: Communicates with [`fit-happens-api`](../fit-happens-api) using raw HTTP and an `x-api-key`
- **Design**: Pure utility. No style frameworks, animations, or dark mode. Just honest pixels.

---

## 🚀 Getting Started

If for some reason you want to run this thing:

```bash
npm install
nx serve fit-web
````

Then open [http://localhost:4200](http://localhost:4200) and behold... something.

> ⚠️ Make sure your API is running and the `x-api-key` is correctly set in the environment.

---

## 🧪 Why This Exists

This app is a glorified playground. It helps us:

* Test new message types
* Populate the journal with semi-realistic data
* Debug the way we reconstruct derived state from messages
* Avoid crying when the mobile app isn’t ready yet

---

## 🙈 Should I Use This?

**Only if you're developing Fit Happens.**
If you're an end user, go back to the mobile app. If you're a developer, prepare to squint.

---

## 📦 Part of the Fit Happens Monorepo

This app is one of the four main components:

* [`fit-happens-app`](../fit-happens-app) – The real mobile app
* [`fit-happens-api`](../fit-happens-api) – Backend storing JSON journals
* [`fit-journal`](../fit-journal) – Core logic for handling journal messages
* [`fit-happens-web`](.) – This lovely mess

---

## 🧹 TODO (never?)

* [ ] Input validation
* [ ] Better UI
* [ ] Edit/delete functionality
* [ ] A reason to keep this long-term

---

## 🧘 Final Thoughts

Some tools are precision-engineered.
This one is a duct-taped barbell.

But hey — it gets the job done.

---

🧡 Built with good intentions and no test coverage.

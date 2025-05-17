# 🏋️‍♂️ fit-happens api

Welcome to the **fit-happens api**, where only the worthy get through. This project is a lean, mean, ASP.NET Core WebAPI machine, currently rocking a single endpoint and some truly unforgiving authentication logic. Think of it as the **burpee** of backend systems — tough, random, and "effective".

## 🔍 What is this?

It's an ASP.NET Core WebAPI, built for strength and resilience. We don't mess around with flabby, unsecured endpoints here—this is barebones, shared-key-authenticated, and absolutely **ruthless**.

The API has:

* 🛠️ A single `GET /ping` endpoint
* 🔐 A shared key authentication mechanism
* 🎲 A 50/50 chance you'll be allowed in

That's right. You either get a high-five 🖐️ or get drop-kicked out of the gym 🦶—no middle ground.

## 💪 Authentication Flow

**Auth Type**: Shared Key

**Mechanism**:

* You send a header: `x-api-key: your-secret-key`
* 🪙 **50% chance** you get in
* ❌ **50% chance** you're rejected with a **401 Unauthorized**

It’s not about fairness—it’s about building *mental toughness*.

> "Sometimes life says 'pong'. Sometimes life says 'no entry'." – API Sensei

## 🚀 Available Endpoints

### `GET /ping`

Think of this as your warm-up set.

**Headers:**

```
x-api-key: your-secret-key
```

**Responses:**

* ✅ `200 OK`: `pong` – You did your reps right.
* ❌ `401 Unauthorized`: Denied. Drop and give me 20.


## 🧪 Test Like a Pro

Use curl or Postman to challenge the gatekeeper:

```bash
curl -H "x-api-key: your-secret-key" https://your-api-url.com/ping
```

Then... wait for fate.

## 🧘 Philosophy

This API isn't just a testbed—it's a **way of life**. Sometimes it says yes. Sometimes it says no. You train. You improve. You build systems that can handle rejection. 💥

---
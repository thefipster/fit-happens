# Fit Happens API

This is the backend API for the **fit-happens** ecosystem – a fitness journaling platform focused on flexibility, local-first data handling, and sync-friendly architecture.

The API manages user journal data, including workouts, exercises, tags, and bodyweight entries. Clients (e.g. mobile or web apps) can read, write, and synchronize structured fitness events using a unified message format.

Authentication is handled via an API key (`x-api-key` header).

## Endpoints Overview

| Method | Endpoint                   | Description                                                        |
| ------ | -------------------------- | ------------------------------------------------------------------ |
| GET    | `/api/ping`                | Ping endpoint for health checks and fun.                           |
| GET    | `/api/journal/latest`      | Get the latest journal timestamp for the current user.             |
| GET    | `/api/journal`             | Fetch the entire journal history of the current user.              |
| GET    | `/api/journal/{timestamp}` | Fetch journal entries since a specific timestamp.                  |
| POST   | `/api/journal/append`      | Append new journal messages (exercises, tags, sets, etc.).         |
| DELETE | `/api/journal`             | Clear all journal entries for the current user (use with caution). |

## Integration

This API is designed to be used by the **fit-happens** client libraries and apps. It acts as a central sync hub for journals, enabling local storage and offline-first usage patterns, while still supporting cloud sync and multi-device access.

## Authentication

All endpoints require a valid API key passed in the `x-api-key` header.
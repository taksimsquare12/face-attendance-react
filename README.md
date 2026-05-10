# AI Attendance System + Firestore CRUD Assignment

This project keeps the original attendance system features and extends the app with assignment CRUD pages using React Router DOM and Firebase Firestore.

## Live URL

- https://face-attendance-react.web.app

## Features

- Existing attendance system routes and UI remain available
- SPA navigation via React Router DOM (no full page reloads)
- Persistent navbar across attendance and item routes
- Create item with Firestore
- View all items in card layout
- View single item with dynamic route `/items/:id`
- Edit item with prefilled values and Firestore update
- Delete item and update UI immediately

## Attendance Routes

- `/` -> Home
- `/blog` -> Blog
- `/about` -> About
- `/records` -> Records
- `/contact` -> Contact
- `/signin` -> Sign In
- `/signup` -> Sign Up
- `/page-not-found` -> Not Found

## Assignment CRUD Routes

- `/items/new` -> Create Item
- `/items` -> View All Items
- `/items/:id` -> View Single Item
- `/items/:id/edit` -> Edit Item

## Run locally

```bash
npm install
npm run dev
```

## Build and deploy

```bash
npm run build
firebase deploy --only hosting
```

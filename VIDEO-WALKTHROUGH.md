# Video Walkthrough Guide

## 0:00–0:40 — Introduction
Start by explaining that this is a task management dashboard built as a frontend assessment. Mention that it is built with React and Vite, and that the app focuses on practical workflow management rather than static mock data. You can say that the dashboard is meant to help users create, track, and complete tasks with a clean and minimal operational view.

## 0:40–1:30 — UI and Dashboard
Walk through the main layout: the sidebar, the top header, the summary cards, and the task board. Point out the four metric cards for total tasks, pending, in progress, and completed work. Then explain the filter toolbar, the search box, and the add-task button. Point out that the task form and delete confirmation use accessible Radix-backed shadcn/ui-style components, customized to match the dashboard rather than the default shadcn theme.

## 1:30–2:30 — Functionality
Demonstrate the main task interactions:
- Create a new task with a title, description, priority, due date, and status.
- Show validation by trying a task without a title or due date.
- Edit an existing task and update its fields.
- Delete a task using the confirmation dialog.
- Open the task action menu and show its edit/delete choices and delete confirmation.
- Change a task status directly from the card.
- Search by title.
- Apply status and priority filters.
- Reset filters to return to the full board.

## 2:30–3:30 — Code Explanation
Open the main code areas and explain the logic clearly:
- `src/pages/Dashboard.jsx` for the dashboard layout and task state flow.
- `src/components/TaskForm.jsx` for the create/edit modal and validation logic.
- `src/components/TaskCard.jsx` for each task card and status update controls.
- `src/components/ui/` for the reusable, locally themed shadcn/ui-style primitives.
- `src/hooks/useLocalStorage.js` for reading and saving tasks to browser storage.
- `src/utils/taskHelpers.js` for task normalization, validation, and counts.

Keep the explanation beginner-friendly: state holds the live task list, user actions update state, and the UI re-renders from that state. Explain that the LocalStorage hook keeps the data persistent after refresh.

## 3:30–4:00 — Edge Cases and Responsiveness
End by showing a couple of practical edge cases:
- empty state when no tasks exist
- no results state when filters are too restrictive
- combined search and filters working together
- mobile view with a collapsed sidebar
- persistence after refresh with saved tasks still present

## Files to open during the recording
- `src/App.jsx`
- `src/pages/Dashboard.jsx`
- `src/components/TaskForm.jsx`
- `src/components/TaskCard.jsx`
- `src/hooks/useLocalStorage.js`
- `src/utils/taskHelpers.js`

## Key code sections to explain
- task list state and filter logic
- create and edit form validation
- LocalStorage hydration and save flow
- status change and deletion actions
- Radix UI primitives behind the dialog, confirmation, select, dropdown, tooltip, and mobile sheet interactions
- summary count calculations

## Interactions to demonstrate
- Add new task
- Try invalid submission
- Edit a task title and status
- Delete with confirmation
- Search and filter together
- Change sort order
- Open the mobile navigation sheet and use a task action menu
- Reload the page to show persistence

## Beginner-friendly React explanation
The app uses React state to hold the current list of tasks. When the user adds, edits, deletes, or filters tasks, the state updates and the screen re-renders. The LocalStorage hook keeps those values saved in the browser, so the tasks remain after refresh. This is a good example of a small, real-world UI built with state, reusable components, and simple data flow.

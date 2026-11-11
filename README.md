# Task Management Dashboard

## 1. Project Title
Task Management Dashboard.

## 2. Project Overview
This application is a lightweight task management dashboard built with React and Vite. It helps users track work items, monitor task status, and stay organized across ongoing, pending, and completed projects. The dashboard is designed for practical day-to-day use: create tasks, assign priorities, manage due dates, search quickly, apply filters, update statuses, and keep everything saved in the browser with LocalStorage.

## 3. Features
- Task creation with validation
- Task editing for all fields
- Task deletion with confirmation
- Status management from task cards and forms
- Priority assignment for Low, Medium, and High tasks
- Search by title with case-insensitive matching
- Status and priority filters used together
- Due-date sorting in earliest-first and latest-first order
- Dashboard statistics that update immediately as tasks change
- LocalStorage persistence across page refreshes
- Responsive mobile-friendly layout
- Empty-state and no-results-state handling

## 4. Technology Stack
- React.js
- Vite
- JavaScript (ES6+)
- HTML5
- CSS3
- shadcn/ui-style local components built with Radix UI primitives
- Lucide React icons
- Browser LocalStorage

## 5. Project Structure
```text
src/
  components/
    ConfirmDialog.jsx
    EmptyState.jsx
    Header.jsx
    SearchBar.jsx
    Sidebar.jsx
    SummaryCards.jsx
    TaskCard.jsx
    TaskFilters.jsx
    TaskForm.jsx
    TaskList.jsx
    ui/
      AlertDialog.jsx
      Badge.jsx
      Button.jsx
      Card.jsx
      Dialog.jsx
      DropdownMenu.jsx
      Input.jsx
      Select.jsx
      Separator.jsx
      Sheet.jsx
      Textarea.jsx
      Tooltip.jsx
  hooks/
    useLocalStorage.js
  pages/
    Dashboard.jsx
  utils/
    taskHelpers.js
  App.jsx
  index.css
  main.jsx
```

## 6. Installation and Setup
```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd YOUR_PROJECT_FOLDER
npm install
npm run dev
```

The required Radix UI primitives and Lucide React icons are listed in `package.json` and installed by `npm install`. The shadcn/ui-style components are local, project-themed wrappers in `src/components/ui`; no shadcn CLI or Tailwind setup is required.

## 7. Build Instructions
```bash
npm run build
npm run preview
```

## 8. LocalStorage Explanation
The application stores tasks in the browser using the `localStorage` API under a single key: `task-dashboard-v1`.

- On app load, the dashboard reads the stored value and validates the data.
- Empty or missing values safely fall back to an empty task array.
- Invalid JSON is caught and ignored without crashing the app.
- Only valid tasks are retained after data validation.
- Any create, edit, update, or delete action is immediately saved back to LocalStorage.

This keeps tasks available after a page refresh without requiring a backend or server.

## 9. Application Architecture
- Component structure: the app is split into reusable UI pieces such as sidebar, header, task cards, form modal, filters, and empty states.
- UI primitives: local shadcn/ui-style wrappers use Radix UI for accessible dialogs, confirmation, selects, dropdown menus, tooltips, and the mobile navigation sheet, while project-specific CSS preserves the dashboard's visual identity.
- State management: the top-level app keeps task data and filter state in React state, while the dashboard page handles task interactions.
- Custom hook: `useLocalStorage` centralizes reading and writing browser storage.
- Search and filtering logic: tasks are filtered by title, status, priority, and active dashboard category before rendering.
- Form validation: required title and due date checks are handled before submission, with inline error feedback.

## 10. Screenshots
Screenshots will be added here after the project is reviewed or deployed.

## 11. Live Demo
Not yet deployed.

## 12. GitHub Repository
Repository URL will be added after the project is published to GitHub.

## 13. Assessment Information
This project was built as a frontend developer assessment for a task management dashboard interface and interactive task workflow.

## Font Note
The dashboard uses Poppins as the primary typeface and declares Montreal as the secondary heading family. A local Montreal font asset is not included in this workspace, so the app declares the family and will use the available local font if present; otherwise it falls back cleanly without introducing any other type family. The project still follows the required font-family specification for the UI.

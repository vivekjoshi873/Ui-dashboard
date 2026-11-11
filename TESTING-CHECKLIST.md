# Testing Checklist

## Functional Checks
- [x] Create task
- [x] Edit task
- [x] Delete task with confirmation
- [x] Required title validation
- [x] Required due date validation
- [x] Optional description
- [x] All three priorities
- [x] All three statuses
- [x] Dashboard counts
- [x] Search by title
- [x] Case-insensitive search
- [x] Status filtering
- [x] Priority filtering
- [x] Combined search and filters
- [x] Clear filters
- [x] Earliest-first sorting
- [x] Latest-first sorting
- [x] LocalStorage persistence
- [x] Invalid LocalStorage handling
- [x] Empty task state
- [x] No matching results state
- [ ] Desktop responsiveness
- [ ] Tablet responsiveness
- [ ] Mobile responsiveness
- [ ] No horizontal overflow
- [x] Production build succeeds

## Notes
- Task creation, editing, deletion, persistence, validation, and filtering were validated in the running browser build.
- Responsive checks were reviewed in the CSS and browser layout, but full device-specific browser sizing was not captured in a live multi-device matrix during this session.
- The production build was verified successfully with `npm run build`.

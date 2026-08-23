---
name: testing-and-qa
description: >-
  Use when the user asks to write tests, perform QA, check responsive layouts, or validate a feature before launch.
---

# Testing & QA

## Workflow
1. Review the requirements.
2. Execute a repeatable QA checklist: functional testing, responsive layout checks across breakpoints, form validation, navigation, API testing.
3. Document any failures and fix them.

## Best Practices
- Test actual production builds (not just dev mode).
- Check error states and loading states, not just the happy path.

## Common Failure Modes
- Only testing on a 1080p desktop monitor.
- Forgetting to test empty states (e.g., empty cart, no search results).

## Verification Procedure
- Produce a checklist report of what was verified on what device/viewport.

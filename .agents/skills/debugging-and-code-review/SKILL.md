---
name: debugging-and-code-review
description: >-
  Use when the user asks to diagnose a failing build, a CORS error, a broken API call, or any 'X isn't working' report, or requests a code review.
---

# Debugging & Code Review

## Workflow
1. Reproduce the issue first.
2. Inspect logs, browser console, and network requests.
3. Find the root cause, not just the symptom.
4. Apply the fix and document what changed.

## Best Practices
- Hard rule: **never report a bug fixed without actually running/testing the affected functionality** and stating what was tested.
- Isolate the bug before rewriting large chunks of code.

## Common Failure Modes
- Guessing the fix without reading error traces.
- Fixing the symptom (e.g., hiding a broken element) instead of the underlying data error.

## Verification Procedure
- Prove the bug is gone by triggering the exact sequence that previously failed and confirming success.

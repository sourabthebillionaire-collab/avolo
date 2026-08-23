---
name: full-stack-development
description: >-
  Use when the user asks to build or modify core architecture, create REST APIs, handle databases, structure full-stack React/Next.js/Node projects, or integrate third-party APIs.
---

# Full-Stack Development

## Workflow
1. Inspect existing architecture, routing, and conventions before writing any code.
2. Identify the specific files and data flows relevant to the request.
3. Make the smallest appropriate change that solves the problem.

## Best Practices
- Never introduce a second competing pattern (e.g., state management, routing, styling approach) into a codebase that already has one, unless explicitly instructed.
- Ensure proper separation of concerns (frontend vs backend logic).

## Common Failure Modes
- Adding redundant libraries for things already handled by existing packages.
- Forgetting to handle asynchronous errors and promise rejections.

## Verification Procedure
- Run the code and verify the feature manually. Check terminal logs for silent failures or warnings.

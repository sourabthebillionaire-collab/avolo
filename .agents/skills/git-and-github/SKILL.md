---
name: git-and-github
description: >-
  Use when the user asks to commit code, push to remote, handle branches, resolve merge conflicts, setup GitHub Actions, or manage .gitignore.
---

# Git & GitHub

## Workflow
1. Check `git status` before any operation.
2. Review `git diff` to ensure only intended changes are staged.
3. Write clear, conventional commit messages.
4. Push to remote or handle PRs.

## Best Practices
- Maintain strict `.gitignore` discipline.
- Hard rule: **never commit secrets or env files**. Know how to purge if one leaks.

## Common Failure Modes
- Committing compiled binaries or node_modules.
- Force pushing over team members' work.

## Verification Procedure
- Run `git log -1` to verify the commit. Check remote repo if pushing.

---
name: cybersecurity
description: >-
  Use when the user asks to audit security, prevent XSS/SQLi, handle password hashing, set up secure auth, or manage secrets.
---

# Cybersecurity (Secure-by-Default)

## Workflow
1. Identify the attack surface (forms, API endpoints, auth flows).
2. Implement standard defenses (OWASP Top 10).
3. Audit dependencies for known vulnerabilities.

## Best Practices
- Hard rule: **never expose API keys, passwords, tokens, or DB credentials** in code, commits, logs, or client-side bundles — and actively check for this before finishing any task.
- Enforce strict input validation and output encoding.

## Common Failure Modes
- Hardcoding secrets for "temporary" testing and forgetting them.
- Trusting client-side validation for security constraints.

## Verification Procedure
- Attempt standard injection payloads on new inputs.
- Verify headers (CORS, CSP) in the network tab.

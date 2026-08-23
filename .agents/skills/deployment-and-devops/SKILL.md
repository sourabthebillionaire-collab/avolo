---
name: deployment-and-devops
description: >-
  Use when the user asks to deploy the site to Vercel, Render, GitHub Pages, setup custom domains, configure DNS, or manage environment variables for production.
---

# Deployment & DevOps

## Workflow
1. Verify the project builds successfully locally (`npm run build`).
2. Identify the target platform (Vercel, Render, etc.).
3. Configure environment variables for the production environment.
4. Execute deployment and monitor build logs.

## Best Practices
- Explicitly distinguish development vs. production configuration at every step (env vars, API keys, build flags, database targets).

## Common Failure Modes
- Forgetting to map environment variables in the hosting provider dashboard.
- Deploying unoptimized development builds.

## Verification Procedure
- Visit the live production URL.
- Test one API call or dynamic route to verify production DB/Env connection.

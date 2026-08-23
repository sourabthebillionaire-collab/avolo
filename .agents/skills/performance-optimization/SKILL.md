---
name: performance-optimization
description: >-
  Use when the user asks to speed up the site, improve Lighthouse scores, optimize images, or fix slow API queries.
---

# Performance Optimization

## Workflow
1. Run a baseline performance audit to identify bottlenecks.
2. Optimize assets: compress images, implement lazy loading.
3. Optimize code: code splitting, caching strategies, reducing bundle size.

## Best Practices
- Optimize database queries by adding indexes or preventing N+1 problems.
- Target strict Core Web Vitals thresholds (LCP, FID, CLS).

## Common Failure Modes
- Serving 4MB uncompressed PNGs for UI elements.
- Loading bulky third-party scripts before the main thread is interactive.

## Verification Procedure
- Compare before/after Lighthouse performance scores.
- Verify network payload reduction in DevTools.

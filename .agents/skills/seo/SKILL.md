---
name: seo
description: >-
  Use when the user asks to improve search rankings, configure technical SEO, metadata, sitemaps, semantic HTML, or schema markup.
---

# SEO

## Workflow
1. Audit current semantic HTML structure (H1-H6).
2. Inject unique metadata, titles, and descriptions per page.
3. Configure `robots.txt` and generate XML sitemaps.
4. Add JSON-LD schema markup for rich snippets.

## Best Practices
- Performance is an SEO factor; ensure Core Web Vitals are met.
- Ensure all Open Graph tags are present for social sharing.

## Common Failure Modes
- Using client-side rendering for metadata without SSR/SSG, making it invisible to some crawlers.
- Duplicate H1 tags or missing alt attributes.

## Verification Procedure
- Run Lighthouse SEO audit.
- Inspect the `<head>` of the built page to ensure tags rendered correctly.

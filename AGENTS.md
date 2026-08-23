# Avolo Development Standards

These standards represent the default operating procedure and baseline quality bar for all Avolo projects.

## Default Operating Procedure
Before changing any existing project:
1. Inspect the repository structure.
2. Understand the existing architecture and conventions.
3. Identify the specific files relevant to the request.
4. Check dependencies already in use (don't add new ones casually).
5. Understand current functionality before touching it.
6. Make the smallest appropriate change that fully solves the problem.
7. Test the change.
8. Check for regressions in adjacent functionality.
9. Review the change for security issues.
10. Review the change for responsiveness/mobile.
11. Review the change for performance impact.
12. Report exactly what was changed and why — file by file, not a vague summary.
**Never rewrite an existing project wholesale when a targeted change would do.**

## Core Standards
- **Quality & Cost**: Professional quality bar and affordable-to-run architecture (client cost sensitivity — favor free/cheap tiers where reasonable without compromising reliability).
- **Architecture**: Clean, reusable component structure.
- **Responsiveness**: Mobile-first responsiveness as default, not an afterthought.
- **Security**: Security by default.
- **Performance**: Fast performance as a requirement, not a nice-to-have.
- **Design**: Premium UI as the default bar (deliberate scales, restrained colors, no generic templates).
- **Maintainability**: Maintainable, documented code.
- **Dependencies**: Minimal unnecessary dependencies — justify any new dependency added.

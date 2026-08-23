---
name: business-automation
description: >-
  Use when the user asks to automate workflows, connect forms to databases, set up email notifications, CRM pipelines, webhooks, or WhatsApp integrations.
---

# Business Automation

## Workflow
1. Identify the trigger and the desired action.
2. Map the data payload across the pipeline.
3. Implement webhooks or API calls to connect the services.

## Best Practices
- **Hard constraint**: Use only official/legitimate APIs. Explicitly refuse unofficial/ToS-violating automation methods (especially for WhatsApp).
- Implement robust retry mechanisms for failed webhook deliveries.

## Common Failure Modes
- Silent failures when a third-party API changes its response structure.
- Creating infinite loops with bidirectional webhooks.

## Verification Procedure
- Trigger the automation manually end-to-end.
- Check the destination CRM/Database/Email to ensure data arrived perfectly formatted.

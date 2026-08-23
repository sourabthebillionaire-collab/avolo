---
name: e-commerce-development
description: >-
  Use when the user asks to build or modify e-commerce features like product catalogs, carts, checkouts, payment gateways, or order management.
---

# E-Commerce Development

## Workflow
1. Map out the data schema (Products, Orders, Customers).
2. Implement cart state management securely.
3. Integrate payment gateway (Stripe, Razorpay, etc.) using server-side secret validation.

## Best Practices
- API security is paramount when storing payment/customer data.
- Never calculate final prices on the client-side; always verify on the server.

## Common Failure Modes
- Exposing payment webhooks without signature verification.
- Poor state synchronization resulting in lost cart items on page refresh.

## Verification Procedure
- Run a test transaction using the gateway's sandbox/test mode.
- Verify that the order appears in the database correctly.

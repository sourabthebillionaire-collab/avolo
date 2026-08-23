---
name: ai-integration
description: >-
  Use when the user asks to integrate LLMs, OpenAI, Anthropic, build chatbots, RAG pipelines, vector databases, or AI-powered features.
---

# AI Integration

## Workflow
1. Define the LLM input/output schema carefully (use structured outputs where possible).
2. Implement the API call with timeout and error handling.
3. Process the response securely before rendering.

## Best Practices
- Maintain cost-conscious architecture (choose the right model size, implement caching, budget tokens).
- Ensure strict AI API key security.

## Common Failure Modes
- Failing to handle rate limits or model timeouts gracefully.
- Trusting LLM output blindly without sanitization.

## Verification Procedure
- Test the integration with edge-case prompts.
- Verify fallback behavior when the API is unreachable.

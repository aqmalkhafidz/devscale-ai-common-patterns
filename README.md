# Devscale Indonesia Bootcamp: AI Product Engineering Common Pattern

This repository contains common LLM application patterns for the Devscale Indonesia Bootcamp AI Product Engineering program. The examples use Anvia with OpenAI-compatible model calls, plus Tavily for search-based workflows.

## Topics

- Prompt chaining
- Prompt routing
- Context injection
- Extraction pipelines
- Evaluator and optimizer loops
- Parallel fan-out and fan-in
- Plan and execute workflows
- Agentic decision making

## Requirements

- Node.js
- pnpm
- OpenAI API key
- Tavily API key for search examples

## Setup

Install dependencies:

```bash
pnpm install
```

Create a local environment file:

```bash
cp .env.example .env
```

Fill in the required values:

```env
OPENAI_API_KEY=
OPENROUTER_API_KEY=
MINIMAX_API_KEY=
TAVILY_API_KEY=
```

`OPENAI_API_KEY` is required for the OpenAI examples. `TAVILY_API_KEY` is required for examples that perform web search.

## Run Examples

Run any TypeScript example with `tsx`:

```bash
pnpm tsx src/01-prompt-chaining.ts
pnpm tsx src/02-prompt-router.ts
pnpm tsx src/03-context-injection.ts
pnpm tsx src/04-extraction-pipeline.ts
pnpm tsx src/05-extraction-pipeline-2.ts
pnpm tsx src/06-evaluator-optimizer.ts
pnpm tsx src/07-parallel-fanout-fanin.ts
pnpm tsx src/08-plan-and-execute.ts
pnpm tsx src/09-agentic-decision.ts
```

## Assignment: 3 Cases

Three cases from the bootcamp, each built on one of the patterns above.

```bash
pnpm tsx src/case-01-billing-decision.ts
pnpm tsx src/case-02-meeting-extract.ts
pnpm tsx src/case-03-company-profile.ts "Astra"   # company name is an optional arg
```

| Case | Task | Pattern | File |
| ---- | ---- | ------- | ---- |
| 1 | Customer asks "Why was I charged twice? Fix it now." — decide what the AI should do before answering. | Agentic decision (never auto-refunds; hands off account/money issues to a human). | `src/case-01-billing-decision.ts` |
| 2 | Turn a long meeting transcript into decisions, risks, and action items. | Extraction pipeline (structured output via Zod). | `src/case-02-meeting-extract.ts` |
| 3 | Given a company name, return a short profile with website and industry. | Web search (Tavily) + extraction. | `src/case-03-company-profile.ts` |

## Project Structure

```text
src/
  01-prompt-chaining.ts
  02-prompt-router.ts
  03-context-injection.ts
  04-extraction-pipeline.ts
  05-extraction-pipeline-2.ts
  06-evaluator-optimizer.ts
  07-parallel-fanout-fanin.ts
  08-plan-and-execute.ts
  09-agentic-decision.ts
  utils.ts
```

`src/utils.ts` centralizes the model client and Tavily client used across the examples.

import z from "zod";
import { createCompletion, createParsedCompletion } from "@anvia/core";
import { getModel } from "./utils";
import "dotenv/config";

const userInput = "Why was I charged twice? Please fix it now.";

const DecisionSchema = z.object({
  action: z.enum(["ask_clarifying_question", "handoff", "answer_directly"]),
  reason: z.string(),
  question: z
    .string()
    .describe("Only fill when action is ask_clarifying_question"),
});

const decision = await createParsedCompletion(getModel(), {
  instructions: `
    A customer reports a billing problem. Decide the next action BEFORE answering.

    Never promise a refund or claim the charge is fixed — you cannot access accounts or move money.

    Use ask_clarifying_question when you need order ID, date, or which charge to investigate.
    Use handoff when the issue needs account access, a refund, or a money guarantee.
    Use answer_directly only for general billing info that needs no account access.
  `,
  input: `Customer message: ${userInput}`,
  schema: DecisionSchema,
});

console.log(decision.data);

if (decision.data.action === "ask_clarifying_question") {
  console.log(decision.data.question);
} else if (decision.data.action === "handoff") {
  console.log(
    "This needs a human with account and payment access. Handing off to the billing team.",
  );
} else {
  const answer = await createCompletion(getModel(), {
    instructions:
      "Answer general billing questions. Do not promise refunds or claim anything is fixed.",
    input: userInput,
  });
  console.log(answer.text);
}

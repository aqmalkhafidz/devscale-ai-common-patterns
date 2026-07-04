import z from "zod";
import { createParsedCompletion } from "@anvia/core";
import { getModel } from "./utils";
import "dotenv/config";


const transcript = `
Alya: Ok team, for the Q3 launch we agreed to ship the mobile app first, web can wait.
Budi: Agreed. But the payment gateway integration is still not signed off by legal.
Alya: That's a real risk. If legal blocks it we can't take payments at launch.
Citra: I'll follow up with legal by Friday and report back.
Budi: Also the load test showed the API falls over above 500 concurrent users.
Alya: Let's decide: we cap beta users at 400 until infra scales the cluster.
Citra: I can own the infra scaling ticket, target end of next sprint.
Budi: One more — the analytics vendor contract expires this month, might lose event data.
Alya: Decision: renew the analytics contract, Budi you handle it before the 20th.
`;

const MeetingSchema = z.object({
  decisions: z.array(z.string()).describe("Concrete decisions the team made"),
  risks: z.array(z.string()).describe("Risks or blockers raised"),
  actionItems: z
    .array(
      z.object({
        task: z.string(),
        owner: z.string().describe("Person responsible, or NONE"),
        due: z.string().describe("Deadline mentioned, or NONE"),
      }),
    )
    .describe("Follow-up tasks"),
});

const response = await createParsedCompletion(getModel(), {
  instructions:
    "Extract decisions, risks, and action items from the meeting transcript. If a field is missing use 'NONE' without quotes.",
  input: `Transcript:\n${transcript}`,
  schema: MeetingSchema,
});

console.log(JSON.stringify(response.data, null, 2));

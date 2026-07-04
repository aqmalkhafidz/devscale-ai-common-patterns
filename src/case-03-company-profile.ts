import z from "zod";
import { createParsedCompletion } from "@anvia/core";
import { getModel, tavilyClient } from "./utils";
import "dotenv/config";

const companyName = process.argv[2] ?? "Gojek";

const searchResult = await tavilyClient.search(
  `${companyName} company website industry overview`,
  { searchDepth: "basic" },
);

const ProfileSchema = z.object({
  name: z.string().describe("Official company name"),
  website: z.string().describe("Company website URL, or NONE"),
  industry: z.string().describe("Primary industry, or NONE"),
  summary: z.string().describe("Two-sentence company profile"),
});

const response = await createParsedCompletion(getModel(), {
  instructions:
    "Build a short company profile from the search results. If a field is not found return 'NONE' without quotes. Do not invent facts.",
  input: `Company: ${companyName}\n\nSearch results: ${JSON.stringify(
    searchResult.results,
  )}`,
  schema: ProfileSchema,
});

console.log(JSON.stringify(response.data, null, 2));

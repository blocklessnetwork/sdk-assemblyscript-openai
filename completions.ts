import { Client, ClientOptions } from "@blockless/sdk/assembly/http";
import { JSON } from "@blockless/sdk/assembly/json";

export function generateCompletion(
  apiKey: string,
  model: string = "text-davinci-003",
  prompt: string = "The following is a conversation with an AI assistant...",
  maxTokens: i32 = 150,
  temperature: number = 0.9,
  topP: number = 1.0,
  frequencyPenalty: number = 0.0,
  presencePenalty: number = 0.6,
  stopSequences: string[] = [" Human:", " AI:"]
): JSON.Obj {
  // Create JSON payload
  let payload: JSON.Obj = new JSON.Obj();
  payload.set("model", model);
  payload.set("prompt", prompt);
  payload.set("temperature", temperature);
  payload.set("max_tokens", maxTokens);
  payload.set("top_p", topP);
  payload.set("frequency_penalty", frequencyPenalty);
  payload.set("presence_penalty", presencePenalty);
  payload.set("stop", stopSequences);

  // Set up API client
  let headers: Map<string, string> = new Map();
  headers.set("Content-Type", "application/json");
  headers.set("Authorization", `Bearer ${apiKey}`);

  let clientOptions: ClientOptions = new ClientOptions(
    "https://api.openai.com",
    headers
  );
  let client: Client = new Client(clientOptions);

  // Make API request
  let response = client.post("/v1/completions", payload.toString());

  return response;
}

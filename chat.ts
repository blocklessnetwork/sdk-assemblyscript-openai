import { Client, ClientOptions } from "@blockless/sdk/assembly/http";
import { JSON } from "@blockless/sdk/assembly/json";

export class Message {
  role: string;
  content: string;
  name: string;

  constructor(role: string, content: string, name: string) {
    this.role = role;
    this.content = content;
    this.name = name;
  }
}

export function generateChatCompletion(
  apiKey: string,
  model: string = "gpt-3.5-turbo",
  messages: Message[] = [],
  temperature: number = 1.0,
  topP: number = 1.0,
  maxTokens: i32 = 1,
  presencePenalty: number = 0.0,
  frequencyPenalty: number = 0.0
): JSON.Obj {
  let payload: JSON.Obj = new JSON.Obj();
  payload.set("model", model);

  let jsonMessages: JSON.Arr = new JSON.Arr();
  for (let i = 0; i < messages.length; i++) {
    let jsonMessage: JSON.Obj = new JSON.Obj();
    jsonMessage.set("role", messages[i].role);
    jsonMessage.set("content", messages[i].content);
    if (messages[i].role === "function" && messages[i].name) {
      jsonMessage.set("name", messages[i].name);
    }
    jsonMessages.push(jsonMessage);
  }

  payload.set("messages", jsonMessages);
  payload.set("temperature", temperature);
  payload.set("top_p", topP);
  payload.set("max_tokens", maxTokens);
  payload.set("presence_penalty", presencePenalty);
  payload.set("frequency_penalty", frequencyPenalty);

  let headers: Map<string, string> = new Map();
  headers.set("Content-Type", "application/json");
  headers.set("Authorization", `Bearer ${apiKey}`);

  let clientOptions: ClientOptions = new ClientOptions(
    "https://api.openai.com",
    headers
  );

  let client: Client = new Client(clientOptions);

  let response = client.post("/v1/chat/completions", payload.toString());

  return response;
}

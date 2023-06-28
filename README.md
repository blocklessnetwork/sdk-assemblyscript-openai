OpenAI GPT APIs with AssemblyScript and Blockless SDK
=====================================================

This README provides a brief guide on how to use the OpenAI GPT APIs (Completions API and Chat API) in AssemblyScript, leveraging the Blockless SDK.

Setup
-----

Firstly, ensure that you have AssemblyScript and the Blockless SDK installed in your project.

Using the OpenAI GPT APIs
-------------------------

In this guide, we've encapsulated the functionalities of both the Completions API and Chat API in two separate files within an `openai` directory in the project.

### Importing necessary modules and methods

    `import { Console } from "as-wasi/assembly"; import { generateCompletion } from "./openai/completions"; import { generateChatCompletion, Message } from "./openai/chat";`
    
  

### Using the Completions API

    `const apiKey = "key";  // Replace this with your actual OpenAI API key  const response = generateCompletion(   apiKey,   "text-davinci-003",   "Hello AI, tell me a joke.",   100 );  Console.log(response.toString());`
    
  

### Using the Chat API

    `const model = "gpt-3.5-turbo"; let systemMessage = new Message("system", "You are a helpful assistant.", ""); let userMessage = new Message("user", "Hello!", "");  let messages: Message[] = [systemMessage, userMessage]; const chatResponse = generateChatCompletion(apiKey, model, messages);  Console.log(chatResponse.toString());`
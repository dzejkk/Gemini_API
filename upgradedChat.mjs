import { GoogleGenerativeAI } from "@google/generative-ai";
import readline from "readline";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function run() {
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  const chat = model.startChat({
    history: [],
    generationConfig: {
      maxOutputTokens: 500,
    },
  });

  async function askAndRespond() {
    rl.question("You: ", async (msg) => {
      if (msg.toLowerCase() === "exit") {
        rl.close();
      } else {
        const result = await chat.sendMessageStream(msg);
        process.stdout.write("AI: ");

        for await (const chunk of result.stream) {
          process.stdout.write(chunk.text());
        }

        console.log("\n");
        askAndRespond();
      }
    });
  }
  askAndRespond();
}

run();

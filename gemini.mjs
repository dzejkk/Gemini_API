import { GoogleGenerativeAI } from "@google/generative-ai";

// Load the environment variables
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// The prompt to generate content for

const prompt = "how to make a website";

// Generate the content
const result = await model.generateContent(prompt);

// Print the generated content
console.log(result.response.text());

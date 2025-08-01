import { InferenceClient } from "@huggingface/inference";

const client = new InferenceClient(import.meta.env.VITE_HF_TOKEN);

export const getAiResponse = async (history) => {
  try {
    const chatCompletion = await client.chatCompletion({
      model: "deepseek-ai/DeepSeek-V3-0324",
      messages: history,
    });
    return chatCompletion.choices[0].message;
  } catch (error) {
    console.error("AI service error:", error);
    throw new Error("Failed to get response from AI. Please check the console for more details.");
  }
}; 
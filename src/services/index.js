import { createGeminiClient } from "./geminiClient.js";
import { createPetAIService } from "./petAIService.js";

/** Wires the default Gemini-backed pet AI service. Swap the client here only. */
export function createDefaultPetAIService() {
  return createPetAIService(createGeminiClient());
}

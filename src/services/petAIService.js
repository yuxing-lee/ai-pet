import { SPECIES_NAMES } from "../config/personality.js";
import { PLACEABLE_TILES } from "../config/room.js";

/**
 * High-level domain service. Owns all prompt engineering and response parsing
 * for pet behaviours. UI/hooks call these intent-level methods and never see
 * raw prompts or the LLM client. (Single Responsibility + Dependency Inversion:
 * it depends on an injected `client`, any object with `.generate(...)`.)
 */
export function createPetAIService(client) {
  const speciesName = (type) => SPECIES_NAMES[type] || "寵物";

  async function chat({ apiKey, pet, history, message }) {
    const transcript = history
      .map((m) => `${m.role === "user" ? "主人" : pet.name}：${m.text}`)
      .join("\n");
    const system =
      `你是叫「${pet.name}」的AI寵物，個性：${pet.tags.join("、")}。${pet.note || ""}\n` +
      `用符合個性的方式回應，語氣生動可愛，不超過80字，第一人稱。`;
    const prompt = `${transcript}\n主人：${message}\n${pet.name}：`;
    const reply = await client.generate({ apiKey, prompt, system });
    return reply.trim();
  }

  async function designHome({ apiKey, pet }) {
    const prompt =
      `你是「${pet.name}」，一隻${speciesName(pet.type)}，個性：${pet.tags.join("、")}。${pet.note || ""}\n` +
      `今天你佈置了自己的家。請用JSON回應，格式：\n` +
      `{"layout":["tile1","tile2",...（共20個，從可用清單選）],"story":"一句話描述今天家的心情故事"}\n` +
      `可用：${PLACEABLE_TILES.join(",")}\n只回JSON。`;
    const raw = await client.generate({ apiKey, prompt });
    const parsed = JSON.parse(raw.replace(/```json|```/g, "").trim());
    return { layout: parsed.layout, story: parsed.story };
  }

  return { chat, designHome };
}

/** Deterministic fallback used when the AI call fails. */
export const FALLBACK_HOME = {
  layout: ["tree","flower","star","mushroom","crystal","lamp","sofa","book","chest","cloud","grass","flower","tree","star","mushroom","lamp","sofa","book","chest","cloud"],
  story: "今天的家充滿了神秘與溫暖的氣息。",
};

export const FALLBACK_REPLY = "（嗯…我好像走神了，再說一次？）";

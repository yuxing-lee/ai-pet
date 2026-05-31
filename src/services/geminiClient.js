/**
 * Low-level LLM provider. Turns (prompt, system) into text via the Gemini REST
 * API. Implements the generic `LLMClient` shape:
 *
 *   generate({ apiKey, prompt, system }) => Promise<string>
 *
 * Resilient to model rotation: tries each model in order and moves on when one
 * is missing/deprecated (HTTP 404 / NOT_FOUND). Errors are explicit so the UI
 * can show a useful message instead of failing silently.
 */
const BASE = "https://generativelanguage.googleapis.com/v1beta/models";

// Gemma 4 models, served on the same Gemini API generateContent endpoint.
// Primary: Gemma 4 31B. Fallback: the other Gemma 4 variant supported by the API.
// (Both confirmed in Google's docs: gemma-4-31b-it, gemma-4-26b-a4b-it.)
export const DEFAULT_MODELS = [
  "gemma-4-31b-it",
  "gemma-4-26b-a4b-it",
];

export function createGeminiClient({ models = DEFAULT_MODELS } = {}) {
  async function callModel(model, { apiKey, prompt, system }) {
    const res = await fetch(`${BASE}/${model}:generateContent?key=${apiKey}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        system_instruction: system ? { parts: [{ text: system }] } : undefined,
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0.9, maxOutputTokens: 600 },
      }),
    });
    const data = await res.json().catch(() => ({}));
    return { res, data };
  }

  async function generate({ apiKey, prompt, system = "" }) {
    if (!apiKey) throw new Error("缺少 API Key，請先輸入 Gemini Key。");

    let lastError = "";
    for (const model of models) {
      let res, data;
      try {
        ({ res, data } = await callModel(model, { apiKey, prompt, system }));
      } catch (e) {
        throw new Error(`網路連線失敗（離線 / CORS / 防火牆）：${e.message}`);
      }

      if (res.status === 404) { lastError = data.error?.message || "model not found"; continue; }

      if (!res.ok || data.error) {
        throw new Error(`Gemini API 錯誤：${data.error?.message || `HTTP ${res.status}`}`);
      }

      const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (text == null) {
        const reason = data.promptFeedback?.blockReason || data.candidates?.[0]?.finishReason;
        throw new Error(`沒有產生內容${reason ? `（原因：${reason}）` : ""}。`);
      }
      return text;
    }
    throw new Error(`找不到可用的模型（已試：${models.join(", ")}）。最後訊息：${lastError}`);
  }

  return { generate };
}

export default createGeminiClient;

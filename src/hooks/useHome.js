import { useState } from "react";
import { usePetAI } from "../context/PetAIContext.jsx";
import { FALLBACK_HOME } from "../services/petAIService.js";

/** Owns the AI room-decoration state + regeneration. */
export function useHome({ pet, apiKey }) {
  const ai = usePetAI();
  const [layout, setLayout] = useState(null);
  const [story, setStory] = useState("");
  const [loading, setLoading] = useState(false);

  async function generate() {
    if (!apiKey || !pet) return;
    setLoading(true);
    try {
      const { layout: l, story: s } = await ai.designHome({ apiKey, pet });
      setLayout(l);
      setStory(s);
    } catch {
      setLayout(FALLBACK_HOME.layout);
      setStory(FALLBACK_HOME.story);
    } finally {
      setLoading(false);
    }
  }

  function reset() {
    setLayout(null);
    setStory("");
  }

  return { layout, story, loading, generate, reset };
}

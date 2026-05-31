import { useEffect, useRef, useState } from "react";
import { usePetAI } from "../context/PetAIContext.jsx";

/**
 * Owns chat state + the send workflow. Components stay presentational and
 * depend only on what this returns. (Interface Segregation)
 */
export function useChat({ pet, apiKey }) {
  const ai = usePetAI();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function send() {
    const text = input.trim();
    if (!text || loading) return;
    if (!apiKey) {
      setMessages((prev) => [...prev, { role: "user", text },
        { role: "pet", text: "⚠️ 尚未設定 API Key，無法對話。", error: true }]);
      setInput("");
      return;
    }

    const history = messages;
    setMessages((prev) => [...prev, { role: "user", text }]);
    setInput("");
    setLoading(true);
    try {
      const reply = await ai.chat({ apiKey, pet, history, message: text });
      setMessages((prev) => [...prev, { role: "pet", text: reply }]);
    } catch (e) {
      // Show the real reason so problems are debuggable, not hidden.
      setMessages((prev) => [...prev, { role: "pet", text: `⚠️ ${e.message}`, error: true }]);
    } finally {
      setLoading(false);
    }
  }

  return { messages, input, setInput, send, loading, endRef };
}

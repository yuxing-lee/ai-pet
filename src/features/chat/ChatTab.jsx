import { T } from "../../config/theme.js";
import { SPRITES } from "../../config/sprites.jsx";
import NeonButton from "../../components/NeonButton.jsx";

/** Presentational chat view. All state comes from the useChat hook in App. */
export default function ChatTab({ pet, chat }) {
  const { messages, input, setInput, send, loading, endRef } = chat;
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div style={{ flex: 1, overflowY: "auto", padding: 16, display: "flex", flexDirection: "column", gap: 10 }}>
        {messages.length === 0 && (
          <div style={{ textAlign: "center", padding: "48px 20px", animation: "fadeUp 0.6s ease both" }}>
            <div style={{ animation: "petBob 2s ease-in-out infinite", marginBottom: 12, display: "inline-block" }}>
              {SPRITES[pet.type]?.(pet.color, 56)}
            </div>
            <p style={{ color: T.muted, fontSize: 13 }}>
              跟 <span style={{ color: pet.color }}>{pet.name}</span> 說聲嗨吧！
            </p>
          </div>
        )}
        {messages.map((m, i) => (
          <div key={i} style={{
            display: "flex",
            justifyContent: m.role === "user" ? "flex-end" : "flex-start",
            animation: "bubblePop 0.25s ease both", gap: 8,
          }}>
            {m.role === "pet" && (
              <div style={{ flexShrink: 0, alignSelf: "flex-end" }}>
                {SPRITES[pet.type]?.(pet.color, 32)}
              </div>
            )}
            <div style={{
              maxWidth: "72%", padding: "9px 14px", fontSize: 13, lineHeight: 1.6,
              borderRadius: m.role === "user" ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
              background: m.error
                ? "rgba(255,79,79,0.12)"
                : m.role === "user" ? `linear-gradient(135deg,${T.cyan},${T.blue})` : T.bgTile,
              color: m.error ? "#ff8a8a" : m.role === "user" ? T.bg : T.text,
              border: m.error
                ? "1px solid #ff4f4f55"
                : m.role === "pet" ? `1px solid ${pet.color}33` : "none",
              boxShadow: m.error
                ? "0 0 8px #ff4f4f33"
                : m.role === "user" ? `0 0 12px ${T.cyan}44` : `0 0 8px ${pet.color}22`,
            }}>{m.text}</div>
          </div>
        ))}
        {loading && (
          <div style={{ display: "flex", gap: 8, alignItems: "flex-end" }}>
            <div>{SPRITES[pet.type]?.(pet.color, 32)}</div>
            <div style={{ background: T.bgTile, border: `1px solid ${pet.color}33`,
              borderRadius: "18px 18px 18px 4px", padding: "10px 16px",
              display: "flex", gap: 4, alignItems: "center" }}>
              {[0, 1, 2].map((i) => (
                <div key={i} style={{ width: 5, height: 5, borderRadius: "50%",
                  background: pet.color, animation: `petBob 0.6s ${i * 0.15}s ease-in-out infinite` }} />
              ))}
            </div>
          </div>
        )}
        <div ref={endRef} />
      </div>

      <div style={{ display: "flex", gap: 8, padding: "10px 12px",
        borderTop: `1px solid ${T.border}`, background: T.bgCard }}>
        <input
          value={input} onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          placeholder={`對 ${pet.name} 說些什麼…`}
          style={{ flex: 1, background: "#060c18", border: `1px solid ${T.border}`,
            borderRadius: 10, color: T.text, padding: "10px 14px", fontSize: 13,
            outline: "none", fontFamily: T.fontBody, transition: "border-color 0.2s" }}
          onFocus={(e) => (e.target.style.borderColor = pet.color)}
          onBlur={(e) => (e.target.style.borderColor = T.border)}
        />
        <NeonButton onClick={send} disabled={loading || !input.trim()} color={pet.color} small>
          送出
        </NeonButton>
      </div>
    </div>
  );
}

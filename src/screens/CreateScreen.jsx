import { useState } from "react";
import { T } from "../config/theme.js";
import { SPRITE_TYPES, SPRITE_COLORS, SPRITES } from "../config/sprites.jsx";
import { PERSONALITY_TAGS } from "../config/personality.js";
import NeonButton from "../components/NeonButton.jsx";
import ScreenShell from "./ScreenShell.jsx";

const MAX_TAGS = 4;

export default function CreateScreen({ onDone }) {
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [type, setType] = useState("cat");
  const [color, setColor] = useState(SPRITE_COLORS.cat[0]);
  const [tags, setTags] = useState([]);
  const [note, setNote] = useState("");

  const toggleTag = (t) =>
    setTags((prev) =>
      prev.includes(t) ? prev.filter((x) => x !== t) : prev.length < MAX_TAGS ? [...prev, t] : prev
    );

  const steps = [
    <div key="name" style={{ animation: "fadeUp 0.4s ease both" }}>
      <div style={{ textAlign: "center", marginBottom: 24 }}>
        <div style={{ fontSize: 40, marginBottom: 8 }}>🐾</div>
        <div style={{ fontFamily: T.fontPx, fontSize: 9, color: T.cyan }}>STEP 1 / 3</div>
        <h2 style={{ color: T.text, fontSize: 15, marginTop: 8 }}>幫你的寵物取名字</h2>
      </div>
      <input
        autoFocus maxLength={12} value={name} onChange={(e) => setName(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && name.trim() && setStep(1)}
        placeholder="輸入名字…"
        style={{ width: "100%", background: "#060c18", border: `2px solid ${T.cyan}44`,
          borderRadius: 10, color: T.text, padding: "14px", fontSize: 18, textAlign: "center",
          outline: "none", fontFamily: T.fontBody, marginBottom: 20,
          boxShadow: `0 0 0 0 ${T.cyan}`, transition: "all 0.2s" }}
        onFocus={(e) => { e.target.style.borderColor = T.cyan; e.target.style.boxShadow = `0 0 12px ${T.cyan}44`; }}
        onBlur={(e) => { e.target.style.borderColor = `${T.cyan}44`; e.target.style.boxShadow = "none"; }}
      />
      <NeonButton full onClick={() => setStep(1)} disabled={!name.trim()} color={T.cyan}>
        下一步 →
      </NeonButton>
    </div>,

    <div key="type" style={{ animation: "fadeUp 0.4s ease both" }}>
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <div style={{ fontFamily: T.fontPx, fontSize: 9, color: T.pink }}>STEP 2 / 3</div>
        <h2 style={{ color: T.text, fontSize: 15, marginTop: 8 }}>選擇外觀</h2>
      </div>
      <div style={{ display: "flex", justifyContent: "center", gap: 8, flexWrap: "wrap", marginBottom: 16 }}>
        {SPRITE_TYPES.map((t) => {
          const sel = type === t;
          return (
            <button key={t} onClick={() => { setType(t); setColor(SPRITE_COLORS[t][0]); }}
              style={{ background: sel ? `${SPRITE_COLORS[t][0]}22` : T.bgCard,
                border: `2px solid ${sel ? SPRITE_COLORS[t][0] : T.border}`,
                borderRadius: 12, padding: "10px", cursor: "pointer",
                boxShadow: sel ? `0 0 16px ${SPRITE_COLORS[t][0]}55` : "none",
                transition: "all 0.2s" }}>
              {SPRITES[t]?.(sel ? color : SPRITE_COLORS[t][0], 38)}
            </button>
          );
        })}
      </div>
      <div style={{ display: "flex", justifyContent: "center", gap: 10, marginBottom: 20 }}>
        {SPRITE_COLORS[type].map((c) => (
          <button key={c} onClick={() => setColor(c)}
            style={{ width: 28, height: 28, borderRadius: "50%", background: c, cursor: "pointer",
              border: color === c ? `3px solid white` : `3px solid transparent`,
              boxShadow: color === c ? `0 0 10px ${c}` : "none", transition: "all 0.15s" }} />
        ))}
      </div>
      <div style={{ display: "flex", justifyContent: "center", marginBottom: 16,
        animation: "petBob 2s ease-in-out infinite" }}>
        {SPRITES[type]?.(color, 52)}
      </div>
      <NeonButton full onClick={() => setStep(2)} color={T.pink}>下一步 →</NeonButton>
    </div>,

    <div key="personality" style={{ animation: "fadeUp 0.4s ease both" }}>
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <div style={{ fontFamily: T.fontPx, fontSize: 9, color: T.yellow }}>STEP 3 / 3</div>
        <h2 style={{ color: T.text, fontSize: 15, marginTop: 8 }}>設定個性（最多4個）</h2>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center", marginBottom: 14 }}>
        {PERSONALITY_TAGS.map((t) => {
          const sel = tags.includes(t);
          return (
            <button key={t} onClick={() => toggleTag(t)}
              style={{ padding: "6px 14px", borderRadius: 20, cursor: "pointer",
                fontFamily: T.fontBody, fontSize: 12, transition: "all 0.15s",
                background: sel ? T.yellow : `${T.yellow}11`,
                color: sel ? T.bg : T.muted,
                border: `1px solid ${sel ? T.yellow : `${T.yellow}33`}`,
                boxShadow: sel ? `0 0 10px ${T.yellow}55` : "none" }}>
              {t}
            </button>
          );
        })}
      </div>
      <textarea value={note} onChange={(e) => setNote(e.target.value)} maxLength={80}
        placeholder="補充描述（選填）"
        style={{ width: "100%", background: "#060c18", border: `1px solid ${T.border}`,
          borderRadius: 8, color: T.text, padding: "10px 12px", fontSize: 12,
          resize: "none", height: 56, outline: "none", fontFamily: T.fontBody, marginBottom: 14 }}
        onFocus={(e) => (e.target.style.borderColor = T.yellow)}
        onBlur={(e) => (e.target.style.borderColor = T.border)}
      />
      <NeonButton full color={T.yellow} disabled={tags.length === 0}
        onClick={() => onDone({ name, type, color, tags, note })}>
        ✨ 誕生！
      </NeonButton>
    </div>,
  ];

  return (
    <ScreenShell style={{
      minHeight: "100dvh", display: "flex", alignItems: "center", justifyContent: "center",
      position: "relative", zIndex: 1, padding: 20, fontFamily: T.fontBody,
    }}>
      <div style={{ background: T.bgCard, border: `1px solid ${T.border}`, borderRadius: 20,
        padding: "28px 24px", width: "100%", maxWidth: 360 }}>
        <div style={{ display: "flex", gap: 6, marginBottom: 24 }}>
          {[T.cyan, T.pink, T.yellow].map((c, i) => (
            <div key={i} style={{ flex: 1, height: 3, borderRadius: 2,
              background: i <= step ? c : `${c}22`,
              boxShadow: i <= step ? `0 0 6px ${c}` : "none",
              transition: "all 0.3s" }} />
          ))}
        </div>
        {steps[step]}
      </div>
    </ScreenShell>
  );
}

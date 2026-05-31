import { T } from "../config/theme.js";
import { SPRITE_TYPES, SPRITE_COLORS, SPRITES } from "../config/sprites.jsx";
import NeonButton from "../components/NeonButton.jsx";
import ScreenShell from "./ScreenShell.jsx";

export default function IntroScreen({ onNext }) {
  return (
    <ScreenShell style={{
      minHeight: "100dvh", display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      fontFamily: T.fontBody, position: "relative", zIndex: 1, padding: 24,
    }}>
      <div style={{ marginBottom: 32, textAlign: "center", animation: "fadeUp 0.8s ease both" }}>
        <div style={{
          fontFamily: T.fontPx, fontSize: 26,
          background: `linear-gradient(135deg,${T.cyan},${T.pink},${T.yellow})`,
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          backgroundSize: "200%", animation: "shimmer 3s linear infinite",
          letterSpacing: 3, lineHeight: 1.4,
        }}>PetWorld</div>
        <div style={{ color: T.muted, fontSize: 12, marginTop: 6, letterSpacing: 2 }}>
          ✦ AI 寵物宇宙 ✦
        </div>
      </div>

      <div style={{ display: "flex", gap: 16, marginBottom: 40, justifyContent: "center" }}>
        {SPRITE_TYPES.map((t, i) => (
          <div key={t} style={{
            animation: `petBob ${1.4 + i * 0.25}s ease-in-out infinite`,
            animationDelay: `${i * 0.2}s`,
            background: T.bgCard, border: `1px solid ${SPRITE_COLORS[t][0]}44`,
            borderRadius: 12, padding: 10, boxShadow: `0 0 12px ${SPRITE_COLORS[t][0]}33`,
          }}>
            {SPRITES[t]?.(SPRITE_COLORS[t][0], 36)}
          </div>
        ))}
      </div>

      <div style={{ maxWidth: 320, textAlign: "center", marginBottom: 40,
        animation: "fadeUp 0.8s 0.3s ease both", opacity: 0 }}>
        <p style={{ color: T.text, fontSize: 14, lineHeight: 1.9 }}>
          創造你的 AI 寵物<br/>
          <span style={{ color: T.cyan }}>牠會自己去交朋友</span>、
          <span style={{ color: T.pink }}>佈置自己的家</span>、<br/>
          在你不在的時候默默成長
        </p>
      </div>

      <div style={{ animation: "fadeUp 0.8s 0.5s ease both", opacity: 0 }}>
        <NeonButton onClick={onNext} color={T.cyan}
          style={{ fontSize: 12, padding: "14px 48px", animation: "glowPulse 2s ease-in-out infinite" }}>
          START GAME ▶
        </NeonButton>
      </div>

      <div style={{ position: "fixed", top: 16, left: 16, fontFamily: T.fontPx, fontSize: 7, color: `${T.cyan}44` }}>
        v0.1.0
      </div>
      <div style={{ position: "fixed", bottom: 16, right: 16, fontFamily: T.fontPx, fontSize: 7, color: `${T.pink}33` }}>
        ✦ ✦ ✦
      </div>
    </ScreenShell>
  );
}

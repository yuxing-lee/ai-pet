import { T } from "../config/theme.js";
import NeonButton from "../components/NeonButton.jsx";
import ScreenShell from "./ScreenShell.jsx";

export default function ApiKeyScreen({ value, setValue, onNext }) {
  return (
    <ScreenShell style={{
      minHeight: "100dvh", display: "flex", alignItems: "center", justifyContent: "center",
      position: "relative", zIndex: 1, padding: 24, fontFamily: T.fontBody,
    }}>
      <div style={{
        background: T.bgCard, border: `1px solid ${T.border}`, borderRadius: 20,
        padding: "32px 28px", width: "100%", maxWidth: 360,
        boxShadow: `0 0 40px ${T.cyan}11`, animation: "fadeUp 0.5s ease both",
      }}>
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <div style={{ fontSize: 36, marginBottom: 12 }}>🔑</div>
          <div style={{ fontFamily: T.fontPx, fontSize: 10, color: T.yellow, marginBottom: 8 }}>
            API KEY
          </div>
          <p style={{ color: T.muted, fontSize: 12, lineHeight: 1.7 }}>
            前往{" "}
            <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noreferrer"
              style={{ color: T.cyan }}>Google AI Studio</a>
            {" "}取得免費 Gemini Key
          </p>
        </div>
        <input
          type="password"
          placeholder="AIza..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && value.length > 10 && onNext()}
          style={{
            width: "100%", background: "#060c18", border: `1px solid ${T.border}`,
            borderRadius: 8, color: T.text, padding: "12px 14px", fontSize: 13,
            outline: "none", marginBottom: 16, fontFamily: "monospace",
            transition: "border-color 0.2s",
          }}
          onFocus={(e) => (e.target.style.borderColor = T.cyan)}
          onBlur={(e) => (e.target.style.borderColor = T.border)}
        />
        <NeonButton full onClick={onNext} disabled={value.length <= 10} color={T.cyan}>
          確認輸入 →
        </NeonButton>
      </div>
    </ScreenShell>
  );
}

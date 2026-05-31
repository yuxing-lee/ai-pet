import { useState } from "react";
import { T } from "../config/theme.js";

/** Reusable neon-styled button. */
export default function NeonButton({
  children, onClick, disabled, color = T.cyan, small, full, style: extraStyle,
}) {
  const [hover, setHover] = useState(false);
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        fontFamily: T.fontPx,
        fontSize: small ? 8 : 10,
        color: disabled ? T.muted : (hover ? T.bg : color),
        background: disabled ? "transparent" : (hover ? color : "transparent"),
        border: `2px solid ${disabled ? T.muted : color}`,
        borderRadius: 6,
        padding: small ? "6px 12px" : "10px 20px",
        cursor: disabled ? "not-allowed" : "pointer",
        width: full ? "100%" : "auto",
        boxShadow: disabled ? "none" : (hover ? `0 0 20px ${color}88` : `0 0 8px ${color}44`),
        transition: "all 0.15s",
        letterSpacing: 1,
        lineHeight: 1.6,
        ...extraStyle,
      }}
    >{children}</button>
  );
}

import { useRef } from "react";
import { T } from "../config/theme.js";

/** Decorative animated star particles + scanline overlay. */
export default function StarField() {
  const stars = useRef(
    Array.from({ length: 40 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 8,
      dur: 4 + Math.random() * 6,
      size: Math.random() > 0.7 ? 3 : 2,
      color: [T.cyan, T.pink, T.yellow, T.blue][Math.floor(Math.random() * 4)],
    }))
  ).current;

  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden" }}>
      {stars.map((s) => (
        <div key={s.id} style={{
          position: "absolute", left: `${s.left}%`, bottom: "-10px",
          width: s.size, height: s.size, borderRadius: "50%",
          background: s.color, boxShadow: `0 0 4px ${s.color}`,
          animation: `starFloat ${s.dur}s ${s.delay}s linear infinite`,
        }} />
      ))}
      <div style={{
        position: "absolute", inset: 0,
        background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.08) 2px, rgba(0,0,0,0.08) 4px)",
        pointerEvents: "none",
      }} />
    </div>
  );
}

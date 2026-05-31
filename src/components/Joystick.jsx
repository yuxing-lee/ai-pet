import { T } from "../config/theme.js";

/** On-screen D-pad for moving the pet in the room. */
export default function Joystick({ onDir, onStop }) {
  const dirs = [
    { label: "▲", dx: 0,  dy: -1, t: 0,  l: 32 },
    { label: "▼", dx: 0,  dy: 1,  t: 64, l: 32 },
    { label: "◀", dx: -1, dy: 0,  t: 32, l: 0 },
    { label: "▶", dx: 1,  dy: 0,  t: 32, l: 64 },
  ];
  return (
    <div style={{ position: "relative", width: 96, height: 96 }}>
      <div style={{ position: "absolute", top: 32, left: 32, width: 32, height: 32,
        borderRadius: "50%", background: `${T.cyan}11`, border: `1px solid ${T.cyan}22` }} />
      {dirs.map((d) => (
        <button key={d.label}
          onPointerDown={() => onDir(d.dx, d.dy)}
          onPointerUp={onStop} onPointerLeave={onStop}
          style={{ position: "absolute", top: d.t, left: d.l, width: 32, height: 32,
            borderRadius: 6, background: `${T.cyan}15`, border: `1px solid ${T.cyan}40`,
            color: T.cyan, fontSize: 12, cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            userSelect: "none", touchAction: "none", fontFamily: T.fontBody }}>
          {d.label}
        </button>
      ))}
    </div>
  );
}

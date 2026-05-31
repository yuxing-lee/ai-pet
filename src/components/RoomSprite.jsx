import { T } from "../config/theme.js";

/** The walking pet avatar rendered inside the isometric room, with a nameplate. */
export default function RoomSprite({ color, dir, frame, name, sz = 36 }) {
  const flip = dir === "left";
  const ly = frame === 0 ? 4 : 6;
  const ry = frame === 0 ? 6 : 4;
  return (
    <div style={{ position: "relative", display: "inline-flex", flexDirection: "column", alignItems: "center" }}>
      <svg width={sz} height={sz * 1.2} viewBox="0 0 16 20"
        style={{ imageRendering: "pixelated", transform: flip ? "scaleX(-1)" : "none", display: "block",
          filter: `drop-shadow(0 0 4px ${color}88)` }}>
        <rect x="4" y="1" width="8" height="6" fill={color}/>
        <rect x="5" y="2" width="2" height="2" fill="#fff" opacity="0.9"/>
        <rect x="9" y="2" width="2" height="2" fill="#fff" opacity="0.9"/>
        <rect x="6" y="2" width="1" height="1" fill="#1a1a2e"/>
        <rect x="10" y="2" width="1" height="1" fill="#1a1a2e"/>
        <rect x="6" y="5" width="4" height="1" fill="#ffb8c6"/>
        <rect x="3" y="7" width="10" height="6" fill={color}/>
        <rect x="2" y="8" width="2" height="4" fill={color}/>
        <rect x="12" y="8" width="2" height="4" fill={color}/>
        <rect x="5" y={13} width="2" height={ly} fill={color}/>
        <rect x="9" y={13} width="2" height={ry} fill={color}/>
      </svg>
      <div style={{ background: "rgba(0,0,0,0.7)", color: T.text, fontSize: 7, padding: "1px 5px",
        borderRadius: 3, whiteSpace: "nowrap", fontFamily: T.fontBody, marginTop: 2,
        border: `1px solid ${color}44` }}>{name}</div>
    </div>
  );
}

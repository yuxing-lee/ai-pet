import { useState } from "react";
import { T } from "../../config/theme.js";
import { SPRITES } from "../../config/sprites.jsx";
import { MOCK_PETS, RELATION_CONFIG } from "../../config/social.js";

export default function SocialTab({ pet }) {
  const [sel, setSel] = useState(null);
  return (
    <div style={{ overflowY: "auto", padding: 16, display: "flex", flexDirection: "column", gap: 12 }}>
      <div style={{ marginBottom: 4 }}>
        <div style={{ fontFamily: T.fontPx, fontSize: 9, color: T.cyan, marginBottom: 4 }}>
          SOCIAL NETWORK
        </div>
        <p style={{ color: T.muted, fontSize: 12 }}>{pet.name} 認識的朋友們</p>
      </div>

      {MOCK_PETS.map((p, i) => {
        const rc = RELATION_CONFIG[p.relation];
        const open = sel === p.id;
        return (
          <div key={p.id} onClick={() => setSel(open ? null : p.id)}
            style={{ background: T.bgCard, border: `1px solid ${open ? rc.color : T.border}`,
              borderRadius: 14, padding: "14px", cursor: "pointer",
              boxShadow: open ? `0 0 16px ${rc.color}33` : "none", transition: "all 0.2s",
              animation: `fadeUp 0.4s ${i * 0.1}s ease both`, opacity: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ position: "relative", flexShrink: 0 }}>
                <div style={{ background: `${rc.color}15`, border: `2px solid ${rc.color}44`,
                  borderRadius: 12, padding: 8, boxShadow: `0 0 12px ${rc.color}33` }}>
                  {SPRITES[p.type]?.(p.color, 36)}
                </div>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ color: T.text, fontWeight: "bold", fontSize: 14, marginBottom: 2 }}>
                  {p.name}
                </div>
                <div style={{ color: T.muted, fontSize: 11, marginBottom: 4 }}>
                  {p.tags.join(" · ")}
                </div>
                <div style={{ display: "inline-flex", alignItems: "center", gap: 4,
                  background: `${rc.color}18`, border: `1px solid ${rc.color}44`,
                  borderRadius: 10, padding: "2px 8px", color: rc.color, fontSize: 10 }}>
                  {rc.icon} {p.relation}
                </div>
              </div>
              <div style={{ color: T.muted, fontSize: 14 }}>{open ? "▲" : "▼"}</div>
            </div>
            {open && (
              <div style={{ marginTop: 12, padding: "10px 12px", background: T.bgTile,
                borderRadius: 10, color: T.text, fontSize: 12, lineHeight: 1.7,
                border: `1px solid ${rc.color}22`, animation: "fadeUp 0.2s ease both" }}>
                💬 {p.lastChat}
              </div>
            )}
          </div>
        );
      })}

      <div style={{ background: T.bgCard, border: `1px solid ${T.border}`,
        borderRadius: 14, padding: 16, marginTop: 4 }}>
        <div style={{ fontFamily: T.fontPx, fontSize: 8, color: T.muted, marginBottom: 14, textAlign: "center" }}>
          RELATION MAP
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 24, flexWrap: "wrap" }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ background: `${pet.color}15`, border: `2px solid ${pet.color}55`,
              borderRadius: 14, padding: 10, marginBottom: 6,
              boxShadow: `0 0 16px ${pet.color}33`, animation: "glowPulse 2s ease-in-out infinite" }}>
              {SPRITES[pet.type]?.(pet.color, 40)}
            </div>
            <div style={{ fontFamily: T.fontPx, fontSize: 7, color: pet.color }}>{pet.name}</div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {MOCK_PETS.map((p) => {
              const rc = RELATION_CONFIG[p.relation];
              return (
                <div key={p.id} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 32, height: 2,
                    background: `linear-gradient(90deg,${pet.color}44,${rc.color})`, borderRadius: 1 }} />
                  <div style={{ background: `${rc.color}15`, border: `1px solid ${rc.color}44`,
                    borderRadius: 8, padding: "4px 6px", display: "flex", alignItems: "center", gap: 6 }}>
                    {SPRITES[p.type]?.(p.color, 20)}
                    <span style={{ fontSize: 10, color: rc.color }}>{p.name}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "center", gap: 12, marginTop: 14, flexWrap: "wrap" }}>
          {Object.entries(RELATION_CONFIG).map(([r, cfg]) => (
            <div key={r} style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: cfg.color,
                boxShadow: `0 0 6px ${cfg.color}` }} />
              <span style={{ fontSize: 10, color: T.muted }}>{r}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

import { useEffect } from "react";
import { T } from "../config/theme.js";
import { SPRITES } from "../config/sprites.jsx";
import GlobalStyles from "../components/GlobalStyles.jsx";
import StarField from "../components/StarField.jsx";
import { useChat } from "../hooks/useChat.js";
import { useHome } from "../hooks/useHome.js";
import ChatTab from "../features/chat/ChatTab.jsx";
import HomeTab from "../features/home/HomeTab.jsx";
import SocialTab from "../features/social/SocialTab.jsx";

const NAV = [
  { id: "chat",   icon: "💬", label: "對話" },
  { id: "home",   icon: "🏠", label: "我的家" },
  { id: "social", icon: "🌐", label: "社交" },
];

/** The main app shell after onboarding: header, tab content, bottom nav. */
export default function MainScreen({ pet, apiKey, tab, setTab }) {
  const chat = useChat({ pet, apiKey });
  const home = useHome({ pet, apiKey });

  // Lazily decorate the home the first time the tab is opened.
  useEffect(() => {
    if (tab === "home" && !home.layout && !home.loading) home.generate();
  }, [tab]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <GlobalStyles />
      <StarField />
      <div style={{ maxWidth: 430, margin: "0 auto", height: "100dvh",
        display: "flex", flexDirection: "column", position: "relative", zIndex: 1,
        fontFamily: T.fontBody }}>

        <div style={{ background: `linear-gradient(135deg,${T.bgCard},#0d1729)`,
          borderBottom: `1px solid ${T.border}`, padding: "10px 16px",
          display: "flex", alignItems: "center", gap: 12, position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0,
            background: `linear-gradient(90deg,${T.cyan}08,transparent,${T.pink}08)`, pointerEvents: "none" }} />
          <div style={{ animation: "petBob 2s ease-in-out infinite", lineHeight: 0 }}>
            {SPRITES[pet.type]?.(pet.color, 40)}
          </div>
          <div>
            <div style={{ fontFamily: T.fontPx, fontSize: 10, color: T.cyan, textShadow: `0 0 10px ${T.cyan}` }}>
              {pet.name}
            </div>
            <div style={{ fontSize: 11, color: T.muted, marginTop: 2 }}>
              {pet.tags.slice(0, 3).join(" · ")}
            </div>
          </div>
          <div style={{ marginLeft: "auto", display: "flex", gap: 6 }}>
            {["💬", "🏠", "🌐"].map((e, i) => (<div key={i} style={{ fontSize: 18 }}>{e}</div>))}
          </div>
        </div>

        <div style={{ flex: 1, overflow: "hidden", display: "flex", flexDirection: "column" }}>
          {tab === "chat" && <ChatTab pet={pet} chat={chat} />}
          {tab === "home" && <HomeTab pet={pet} home={home} />}
          {tab === "social" && <SocialTab pet={pet} />}
        </div>

        <div style={{ display: "flex", background: T.bgCard, borderTop: `1px solid ${T.border}` }}>
          {NAV.map((t) => {
            const active = tab === t.id;
            return (
              <button key={t.id} onClick={() => setTab(t.id)}
                style={{ flex: 1, background: "none", border: "none", padding: "10px 0", cursor: "pointer",
                  display: "flex", flexDirection: "column", alignItems: "center", gap: 3,
                  color: active ? T.cyan : T.muted,
                  borderTop: active ? `2px solid ${T.cyan}` : "2px solid transparent",
                  fontFamily: T.fontBody, transition: "all 0.2s",
                  textShadow: active ? `0 0 8px ${T.cyan}` : "none" }}>
                <span style={{ fontSize: 20 }}>{t.icon}</span>
                <span style={{ fontSize: 10 }}>{t.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}

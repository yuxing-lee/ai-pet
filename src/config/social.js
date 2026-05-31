import { T } from "./theme.js";

/** Placeholder social graph. Swap for a real API later without touching UI. */
export const MOCK_PETS = [
  {id:"p1",name:"Luna",type:"spirit",color:"#a29bfe",tags:["神秘","獨立"],relation:"摯友",lastChat:"今天Luna悄悄把一顆會發光的石頭塞進你家信箱，附了一張寫著「給最特別的朋友」的紙條。"},
  {id:"p2",name:"Koko",type:"dragon",color:"#ff4757",tags:["外向","愛冒險"],relation:"好朋友",lastChat:"Koko找到了一張古老地圖，拉著你的寵物說要一起去找傳說中的甜點樹！"},
  {id:"p3",name:"Mochi",type:"rabbit",color:"#6bcb77",tags:["話多","樂觀"],relation:"點頭之交",lastChat:"Mochi問你的寵物最喜歡哪種顏色的天空，還說牠覺得彩色的最好。"},
];

/** Relation tier -> presentation. Add tiers here without editing components. */
export const RELATION_CONFIG = {
  "摯友":    { color: T.yellow, icon: "💛" },
  "好朋友":  { color: T.cyan,   icon: "💙" },
  "點頭之交":{ color: T.muted,  icon: "🤍" },
};

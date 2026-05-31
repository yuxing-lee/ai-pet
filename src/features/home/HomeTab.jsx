import { T } from "../../config/theme.js";
import { buildGrid } from "../../lib/isometric.js";
import { useRoomMovement } from "../../hooks/useRoomMovement.js";
import NeonButton from "../../components/NeonButton.jsx";
import Joystick from "../../components/Joystick.jsx";
import RoomCanvas from "./RoomCanvas.jsx";

export default function HomeTab({ pet, home }) {
  const { layout, story, loading, reset, generate } = home;
  const grid = buildGrid(layout);
  const { pos, facing, frame, go, stop } = useRoomMovement(grid);

  const onRefresh = () => { reset(); generate(); };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", background: T.bg }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "8px 14px", borderBottom: `1px solid ${T.border}` }}>
        <span style={{ fontFamily: T.fontPx, fontSize: 8, color: T.cyan }}>
          {pet.name.toUpperCase()}'S HOME
        </span>
        <NeonButton small color={T.cyan} onClick={onRefresh} disabled={loading}>
          🔄 重新佈置
        </NeonButton>
      </div>

      <div style={{ flex: 1, overflow: "hidden", display: "flex", alignItems: "center",
        justifyContent: "center", padding: 8, background: T.bg, position: "relative" }}>
        {loading ? (
          <div style={{ color: T.muted, fontSize: 12, fontFamily: T.fontPx,
            display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
            <div style={{ width: 24, height: 24, borderRadius: "50%",
              border: `3px solid ${T.cyan}`, borderTopColor: "transparent",
              animation: "spin 0.8s linear infinite" }} />
            AI 佈置中…
          </div>
        ) : (
          <RoomCanvas grid={grid} pet={pet} pos={pos} facing={facing} frame={frame} />
        )}
      </div>

      {story && (
        <div style={{ padding: "6px 14px", color: T.muted, fontSize: 11,
          borderTop: `1px solid ${T.border}`, lineHeight: 1.6, fontStyle: "italic" }}>
          ✦ {story}
        </div>
      )}

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "10px 16px", borderTop: `1px solid ${T.border}`, background: T.bgCard }}>
        <div style={{ color: `${T.muted}88`, fontSize: 10, fontFamily: T.fontPx, lineHeight: 1.8 }}>
          方向鍵<br/>移動
        </div>
        <Joystick onDir={(dx, dy) => go(dx, dy)} onStop={stop} />
      </div>
    </div>
  );
}

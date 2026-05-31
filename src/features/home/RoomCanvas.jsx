import { T } from "../../config/theme.js";
import { ROOM_COLS, ROOM_ROWS, TILE_W, TILE_H, FURNITURE } from "../../config/room.js";
import { isoX, isoY } from "../../lib/isometric.js";
import RoomSprite from "../../components/RoomSprite.jsx";

const WALL_1 = "#1a2560";
const WALL_2 = "#111d4a";

/** Renders the isometric room grid, furniture and the pet at `pos`. */
export default function RoomCanvas({ grid, pet, pos, facing, frame }) {
  const canW = (ROOM_COLS + ROOM_ROWS) * (TILE_W / 2);
  const canH = (ROOM_COLS + ROOM_ROWS) * (TILE_H / 2) + 80;
  const ox = ROOM_ROWS * (TILE_W / 2);
  const oy = 24;

  const tiles = [];
  for (let r = 0; r < ROOM_ROWS; r++) for (let c = 0; c < ROOM_COLS; c++) tiles.push({ r, c });
  tiles.sort((a, b) => (a.r + a.c) - (b.r + b.c));

  return (
    <div style={{ position: "relative", width: canW, height: canH, flexShrink: 0 }}>
      <svg style={{ position: "absolute", top: oy, left: ox - ROOM_ROWS * (TILE_W / 2) + 4,
        width: canW, height: canH, overflow: "visible", pointerEvents: "none" }}>
        <polygon
          points={`${ROOM_ROWS*(TILE_W/2)},0 0,${ROOM_ROWS*(TILE_H/2)} 0,${ROOM_ROWS*(TILE_H/2)+40} ${ROOM_ROWS*(TILE_W/2)},40`}
          fill={WALL_1} stroke={`${T.cyan}18`} strokeWidth="0.5" />
        <polygon
          points={`${ROOM_ROWS*(TILE_W/2)},0 ${ROOM_ROWS*(TILE_W/2)+ROOM_COLS*(TILE_W/2)},${ROOM_COLS*(TILE_H/2)} ${ROOM_ROWS*(TILE_W/2)+ROOM_COLS*(TILE_W/2)},${ROOM_COLS*(TILE_H/2)+40} ${ROOM_ROWS*(TILE_W/2)},40`}
          fill={WALL_2} stroke={`${T.cyan}18`} strokeWidth="0.5" />
      </svg>

      {tiles.map(({ r, c }) => {
        const x = ox + isoX(c, r), y = oy + isoY(c, r);
        const furn = FURNITURE[grid[r][c]];
        const isPet = pos.col === c && pos.row === r;
        const depth = r + c;
        const isLight = (r + c) % 2 === 0;

        return (
          <div key={`${r}-${c}`}>
            <div style={{ position: "absolute", left: x, top: y, width: TILE_W, height: TILE_H,
              clipPath: "polygon(50% 0%,100% 50%,50% 100%,0% 50%)",
              background: isLight ? "#141f3a" : "#111830", zIndex: depth }}>
              <div style={{ position: "absolute", inset: 0,
                background: `linear-gradient(135deg,${T.cyan}06,transparent)`,
                clipPath: "polygon(50% 0%,100% 50%,50% 100%,0% 50%)" }} />
            </div>
            <div style={{ position: "absolute", left: x, top: y + TILE_H / 2, width: TILE_W / 2, height: 12,
              background: "#0c1428", clipPath: "polygon(0% 0%,100% 0%,100% 100%,0% 60%)",
              zIndex: depth, pointerEvents: "none" }} />
            <div style={{ position: "absolute", left: x + TILE_W / 2, top: y + TILE_H / 2, width: TILE_W / 2, height: 12,
              background: "#080f1e", clipPath: "polygon(0% 0%,100% 60%,100% 100%,0% 100%)",
              zIndex: depth, pointerEvents: "none" }} />
            {furn && furn.emoji && (
              <div style={{ position: "absolute", left: x + TILE_W / 2 - 12, top: y - 16,
                fontSize: furn.block ? 22 : 16, lineHeight: 1, zIndex: depth + 1, pointerEvents: "none",
                filter: furn.block ? `drop-shadow(0 0 4px ${T.cyan}44)` : "none" }}>{furn.emoji}</div>
            )}
            {isPet && (
              <div style={{ position: "absolute", left: x + TILE_W / 2 - 20, top: y - 42,
                zIndex: depth + 2, pointerEvents: "none" }}>
                <RoomSprite color={pet.color} dir={facing} frame={frame} name={pet.name} />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

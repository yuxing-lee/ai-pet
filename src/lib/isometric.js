import { ROOM_COLS, ROOM_ROWS, TILE_W, TILE_H } from "../config/room.js";

/** Pure isometric helpers — no React, fully unit-testable. */
export const isoX = (col, row) => (col - row) * (TILE_W / 2);
export const isoY = (col, row) => (col + row) * (TILE_H / 2);

/**
 * Turn a flat AI tile list into a ROOM_ROWS x ROOM_COLS grid, placing tiles
 * only along the room border (interior stays walkable/empty).
 */
export function buildGrid(aiLayout) {
  const grid = Array.from({ length: ROOM_ROWS }, () => Array(ROOM_COLS).fill("empty"));
  if (!aiLayout) return grid;

  const border = [];
  for (let c = 0; c < ROOM_COLS; c++) { border.push([0, c]); border.push([ROOM_ROWS - 1, c]); }
  for (let r = 1; r < ROOM_ROWS - 1; r++) { border.push([r, 0]); border.push([r, ROOM_COLS - 1]); }

  aiLayout.slice(0, border.length).forEach((tile, i) => {
    const [r, c] = border[i];
    grid[r][c] = tile;
  });
  return grid;
}

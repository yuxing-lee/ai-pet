import { useCallback, useEffect, useRef, useState } from "react";
import { ROOM_COLS, ROOM_ROWS, FURNITURE } from "../config/room.js";

const KEY_MAP = {
  ArrowUp:    [0, -1, "up"],
  ArrowDown:  [0,  1, "down"],
  ArrowLeft:  [-1, 0, "left"],
  ArrowRight: [1,  0, "right"],
};

/**
 * Encapsulates grid walking: position, facing, walk-cycle frame, collision and
 * keyboard binding. Returns an imperative {go, stop} plus render state.
 */
export function useRoomMovement(grid, start = { col: 3, row: 2 }) {
  const [pos, setPos] = useState(start);
  const [facing, setFacing] = useState("down");
  const [frame, setFrame] = useState(0);
  const moveRef = useRef(null);
  const frameRef = useRef(null);

  const stop = useCallback(() => {
    clearInterval(moveRef.current);
    clearInterval(frameRef.current);
    setFrame(0);
  }, []);

  const go = useCallback((dx, dy, dir) => {
    stop();
    setFacing(dir || (dx < 0 ? "left" : dx > 0 ? "right" : dy < 0 ? "up" : "down"));
    moveRef.current = setInterval(() => {
      setPos((p) => {
        const nc = p.col + dx, nr = p.row + dy;
        if (nc < 0 || nc >= ROOM_COLS || nr < 0 || nr >= ROOM_ROWS) return p;
        if (FURNITURE[grid[nr]?.[nc]]?.block) return p;
        return { col: nc, row: nr };
      });
    }, 180);
    frameRef.current = setInterval(() => setFrame((f) => 1 - f), 180);
  }, [grid, stop]);

  useEffect(() => {
    const onDown = (e) => {
      const m = KEY_MAP[e.key];
      if (!m) return;
      e.preventDefault();
      go(m[0], m[1], m[2]);
    };
    const onUp = () => stop();
    window.addEventListener("keydown", onDown);
    window.addEventListener("keyup", onUp);
    return () => {
      window.removeEventListener("keydown", onDown);
      window.removeEventListener("keyup", onUp);
    };
  }, [go, stop]);

  useEffect(() => () => stop(), [stop]);

  return { pos, facing, frame, go, stop };
}

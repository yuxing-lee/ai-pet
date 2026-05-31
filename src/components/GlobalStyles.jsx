import { GLOBAL_CSS } from "../config/globalStyles.js";

/** Injects the global stylesheet. Rendered once near the root of each screen. */
export default function GlobalStyles() {
  return <style>{GLOBAL_CSS}</style>;
}

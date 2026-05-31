import { T } from "./theme.js";

/**
 * Global CSS (keyframes, scrollbar, body reset) injected once via <GlobalStyles/>.
 */
export const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&family=M+PLUS+Rounded+1c:wght@400;700&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: ${T.bg}; }

  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: ${T.bgCard}; }
  ::-webkit-scrollbar-thumb { background: ${T.cyan}44; border-radius: 2px; }

  @keyframes starFloat {
    0%   { transform: translateY(0px) rotate(0deg); opacity: 0.6; }
    50%  { opacity: 1; }
    100% { transform: translateY(-120px) rotate(360deg); opacity: 0; }
  }
  @keyframes petBob {
    0%,100% { transform: translateY(0); }
    50%     { transform: translateY(-4px); }
  }
  @keyframes glowPulse {
    0%,100% { box-shadow: 0 0 8px ${T.cyan}55, 0 0 20px ${T.cyan}22; }
    50%     { box-shadow: 0 0 16px ${T.cyan}99, 0 0 40px ${T.cyan}44; }
  }
  @keyframes shimmer {
    0%   { background-position: -200% center; }
    100% { background-position: 200% center; }
  }
  @keyframes fadeUp {
    from { opacity:0; transform: translateY(12px); }
    to   { opacity:1; transform: translateY(0); }
  }
  @keyframes spin { to { transform: rotate(360deg); } }
  @keyframes scanline {
    0%   { transform: translateY(-100%); }
    100% { transform: translateY(100vh); }
  }
  @keyframes neonFlicker {
    0%,19%,21%,23%,25%,54%,56%,100% { opacity:1; }
    20%,24%,55% { opacity:.4; }
  }
  @keyframes walk0 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-3px)} }
  @keyframes bubblePop {
    0%   { transform: scale(0.7); opacity:0; }
    70%  { transform: scale(1.05); }
    100% { transform: scale(1); opacity:1; }
  }
`;
export default GLOBAL_CSS;

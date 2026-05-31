/**
 * Pixel-sprite registry. Each entry is a pure render function
 * (color, size) => <svg/>. Adding a new species = add one entry here;
 * every consumer (header, chat, social, create) picks it up automatically.
 * (Open-Closed Principle — data-driven registry.)
 */
export const SPRITE_TYPES = ["cat", "dog", "rabbit", "dragon", "spirit"];

export const SPRITE_COLORS = {
  cat:    ["#ff9f43","#ffd32a","#ff6b9d","#c56cf0"],
  dog:    ["#a29bfe","#74b9ff","#55efc4","#fd79a8"],
  rabbit: ["#00ffe7","#6bcb77","#ffd93d","#ff6b6b"],
  dragon: ["#ff4757","#ff6348","#ffa502","#c56cf0"],
  spirit: ["#74b9ff","#a29bfe","#00ffe7","#dfe6e9"],
};

export const SPRITES = {
  cat: (c = "#ff9f43", sz = 48) => (
    <svg width={sz} height={sz} viewBox="0 0 16 16" style={{imageRendering:"pixelated",display:"block"}}>
      <rect x="3" y="4" width="10" height="8" fill={c}/>
      <rect x="2" y="5" width="1" height="5" fill={c}/>
      <rect x="13" y="5" width="1" height="5" fill={c}/>
      <rect x="3" y="1" width="2" height="4" fill={c}/>
      <rect x="11" y="1" width="2" height="4" fill={c}/>
      <rect x="3" y="1" width="1" height="2" fill="#ff9999"/>
      <rect x="12" y="1" width="1" height="2" fill="#ff9999"/>
      <rect x="5" y="6" width="2" height="2" fill="#1a1a2e"/>
      <rect x="9" y="6" width="2" height="2" fill="#1a1a2e"/>
      <rect x="6" y="6" width="1" height="1" fill="white"/>
      <rect x="10" y="6" width="1" height="1" fill="white"/>
      <rect x="6" y="9" width="4" height="1" fill="#ff9999"/>
      <rect x="5" y="8" width="1" height="1" fill="#e88"/>
      <rect x="10" y="8" width="1" height="1" fill="#e88"/>
      <rect x="1" y="12" width="3" height="1" fill={c}/>
      <rect x="12" y="12" width="3" height="1" fill={c}/>
    </svg>
  ),
  dog: (c = "#a29bfe", sz = 48) => (
    <svg width={sz} height={sz} viewBox="0 0 16 16" style={{imageRendering:"pixelated",display:"block"}}>
      <rect x="3" y="5" width="10" height="7" fill={c}/>
      <rect x="2" y="3" width="3" height="4" fill={c}/>
      <rect x="11" y="3" width="3" height="4" fill={c}/>
      <rect x="5" y="6" width="2" height="2" fill="#1a1a2e"/>
      <rect x="9" y="6" width="2" height="2" fill="#1a1a2e"/>
      <rect x="6" y="6" width="1" height="1" fill="white"/>
      <rect x="10" y="6" width="1" height="1" fill="white"/>
      <rect x="6" y="9" width="4" height="1" fill="#1a1a2e"/>
      <rect x="7" y="10" width="2" height="1" fill="#ff9999"/>
      <rect x="1" y="12" width="3" height="2" fill={c}/>
      <rect x="12" y="12" width="3" height="2" fill={c}/>
      <rect x="6" y="12" width="4" height="2" fill={c}/>
    </svg>
  ),
  rabbit: (c = "#00ffe7", sz = 48) => (
    <svg width={sz} height={sz} viewBox="0 0 16 16" style={{imageRendering:"pixelated",display:"block"}}>
      <rect x="5" y="6" width="6" height="6" fill={c}/>
      <rect x="4" y="7" width="1" height="4" fill={c}/>
      <rect x="11" y="7" width="1" height="4" fill={c}/>
      <rect x="5" y="1" width="2" height="6" fill={c}/>
      <rect x="9" y="1" width="2" height="6" fill={c}/>
      <rect x="5" y="1" width="1" height="3" fill="#ff9999"/>
      <rect x="10" y="1" width="1" height="3" fill="#ff9999"/>
      <rect x="6" y="7" width="1" height="1" fill="#1a1a2e"/>
      <rect x="9" y="7" width="1" height="1" fill="#1a1a2e"/>
      <rect x="7" y="9" width="2" height="1" fill="#ff9999"/>
      <rect x="5" y="12" width="2" height="1" fill={c}/>
      <rect x="9" y="12" width="2" height="1" fill={c}/>
    </svg>
  ),
  dragon: (c = "#ff4757", sz = 48) => (
    <svg width={sz} height={sz} viewBox="0 0 16 16" style={{imageRendering:"pixelated",display:"block"}}>
      <rect x="4" y="5" width="8" height="7" fill={c}/>
      <rect x="2" y="4" width="3" height="2" fill={c}/>
      <rect x="11" y="4" width="3" height="2" fill={c}/>
      <rect x="3" y="2" width="2" height="3" fill="#ffd32a"/>
      <rect x="11" y="2" width="2" height="3" fill="#ffd32a"/>
      <rect x="5" y="6" width="2" height="2" fill="#ffd32a"/>
      <rect x="9" y="6" width="2" height="2" fill="#ffd32a"/>
      <rect x="6" y="6" width="1" height="1" fill="#1a1a2e"/>
      <rect x="10" y="6" width="1" height="1" fill="#1a1a2e"/>
      <rect x="6" y="9" width="4" height="1" fill="#ffd32a"/>
      <rect x="12" y="7" width="3" height="1" fill={c}/>
      <rect x="13" y="8" width="2" height="3" fill={c}/>
      <rect x="4" y="12" width="3" height="1" fill={c}/>
      <rect x="9" y="12" width="3" height="1" fill={c}/>
    </svg>
  ),
  spirit: (c = "#74b9ff", sz = 48) => (
    <svg width={sz} height={sz} viewBox="0 0 16 16" style={{imageRendering:"pixelated",display:"block"}}>
      <rect x="5" y="4" width="6" height="7" fill={c} opacity="0.9"/>
      <rect x="4" y="5" width="1" height="5" fill={c} opacity="0.7"/>
      <rect x="11" y="5" width="1" height="5" fill={c} opacity="0.7"/>
      <rect x="5" y="11" width="2" height="2" fill={c} opacity="0.5"/>
      <rect x="7" y="12" width="2" height="2" fill={c} opacity="0.3"/>
      <rect x="9" y="11" width="2" height="2" fill={c} opacity="0.5"/>
      <rect x="6" y="6" width="2" height="2" fill="white"/>
      <rect x="9" y="6" width="2" height="2" fill="white"/>
      <rect x="7" y="6" width="1" height="1" fill={c}/>
      <rect x="10" y="6" width="1" height="1" fill={c}/>
      <rect x="6" y="9" width="4" height="1" fill="white" opacity="0.7"/>
      <rect x="3" y="3" width="1" height="1" fill={c} opacity="0.5"/>
      <rect x="12" y="3" width="1" height="1" fill={c} opacity="0.5"/>
    </svg>
  ),
};

/**
 * Thin component wrapper so consumers can write <PetSprite type color size/>
 * instead of calling the registry function directly.
 */
export function PetSprite({ type, color, size = 48 }) {
  const render = SPRITES[type];
  return render ? render(color, size) : null;
}

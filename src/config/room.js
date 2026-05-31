/** Isometric room dimensions and tile geometry. */
export const ROOM_COLS = 7;
export const ROOM_ROWS = 5;
export const TILE_W = 52; // tile width
export const TILE_H = 30; // tile height

/**
 * Furniture catalogue. `block` = pet cannot walk onto it.
 * Adding a new furniture type is purely additive (Open-Closed).
 */
export const FURNITURE = {
  grass:   {emoji:"🌿",block:false}, flower:  {emoji:"🌸",block:false},
  tree:    {emoji:"🌲",block:true},  sofa:    {emoji:"🛋️",block:true},
  table:   {emoji:"🪵",block:true},  lamp:    {emoji:"🪔",block:true},
  book:    {emoji:"📚",block:true},  star:    {emoji:"⭐",block:false},
  crystal: {emoji:"💎",block:true},  mushroom:{emoji:"🍄",block:false},
  cloud:   {emoji:"☁️",block:false}, chest:   {emoji:"📦",block:true},
  empty:   {emoji:"",  block:false},
};

/** Tile keys the AI is allowed to choose from when decorating. */
export const PLACEABLE_TILES = [
  "grass","flower","tree","sofa","table","lamp",
  "book","star","crystal","mushroom","cloud","chest","empty",
];

const WASTE_DATAS = [
  {
    name: "apple",
    source: "./captcha-game/apple.png",
    width: 60,
    height: 60,
  },
  {
    name: "banana",
    source: "./captcha-game/banana.png",
    width: 61,
    height: 61,
  },
  {
    name: "paper",
    source: "./captcha-game/paper.png",
    width: 54,
    height: 36,
  },
  {
    name: "bottle",
    source: "./captcha-game/bottle.png",
    width: 62,
    height: 60,
  },
];

export const PLAYER_SPRITE_DATA = {
  name: "player",
  source: "./captcha-game/player.png",
  width: 164,
  height: 75,
};

export const SHADOW_SPRITE_DATA = {
  name: "shadow",
  source: "./captcha-game/shadow.png",
  width: 50,
  height: 36,
};

export function randomWasteSpriteData() {
  return WASTE_DATAS[Math.floor(Math.random() * WASTE_DATAS.length)];
}

import { PLAYER_SPRITE_DATA } from "$lib/captcha-game/data/imageDatas";
import Input from "$lib/captcha-game/utils/Input";
import Vector2 from "$lib/captcha-game/utils/Vector2";
import Sprite from "../../utils/Sprite";
import GameObject from "./GameObject";
import Waste from "./Waste";

export default class Player extends GameObject {
  constructor() {
    super(new Vector2(), new Sprite(PLAYER_SPRITE_DATA));
  }

  update() {
    const ml = Input.mouseLocation;

    if (ml) {
      this.position = new Vector2(ml.x, ml.y);
    }
  }
}

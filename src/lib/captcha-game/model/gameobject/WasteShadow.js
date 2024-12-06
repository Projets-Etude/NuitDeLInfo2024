import { SHADOW_SPRITE_DATA } from "$lib/captcha-game/data/imageDatas";
import Sprite from "../../utils/Sprite";
import GameObject from "./GameObject";

export default class Waste extends GameObject {
  constructor(position) {
    super(position, new Sprite(SHADOW_SPRITE_DATA));
  }
}

import States from "../../Infrastructure/GameModel/ElementStates";
import gameConfig from "../../config/game.config";

export default class GameElement extends PIXI.Sprite implements DrobableElement {
  private _state: States;

  constructor(texture: PIXI.RenderTexture) {
    super(texture);
    this.interactive = true;
    this.buttonMode = true;
  }

  get state(): States {
    return this._state;
  }

  set state(value: States) {
    this._state = value;
  }

  public drop() {
    this.y -= gameConfig.rowHeight;
  }
};

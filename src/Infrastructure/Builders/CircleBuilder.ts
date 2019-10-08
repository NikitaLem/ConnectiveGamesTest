import GameElement from "../../GameObjects/GameElements/GameElement";
import gameConfig from "../../config/game.config";
import GameApplication from "../../GameApplication/GameApplication";

export default class CircleBuilder {
  private _radius: number;
  private _color: number;
  public app: GameApplication;
  
  constructor(app: GameApplication, colorNumber: number) {
    this._radius = gameConfig.elemSize / 2;
    this._color = colorNumber;
    this.app = app;
  }

  get radius(): number {
    return this._radius;
  }

  public create(): GameElement {
    const gr = new PIXI.Graphics();  
    gr.beginFill(this._color);
    gr.lineStyle(0);
    gr.drawCircle(0, 0, this.radius);
    gr.endFill();
    return new GameElement(this.app.renderer.generateTexture(gr));
  }
};

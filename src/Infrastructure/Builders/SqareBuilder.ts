import GameElement from "../../GameObjects/GameElements/GameElement";
import gameConfig from "../../config/game.config";
import GameApplication from "../../GameApplication/GameApplication";

export default class SqareBuilder {
  private _side: number;
  private _color: number;
  public app: GameApplication;
  
  constructor(app: GameApplication, colorNumber: number) {
    this._side = gameConfig.elemSize;
    this._color = colorNumber;
    this.app = app;
  }

  get side(): number {
    return this._side;
  }

  public create(): GameElement {
    const gr = new PIXI.Graphics();  
    gr.beginFill(this._color);
    gr.lineStyle(0);
    gr.drawRect(0, 0, this.side, this.side);
    gr.endFill();
    return new GameElement(this.app.renderer.generateTexture(gr));
  }
};

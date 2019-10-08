import GameElement from "../../GameObjects/GameElements/GameElement";
import gameConfig from "../../config/game.config";
import GameApplication from "../../GameApplication/GameApplication";

export default class TriangleBuilder {
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
    gr.moveTo(this.side / 2, 0);
    gr.lineTo(this.side, this.side); 
    gr.lineTo(0, this.side);
    gr.endFill();
    return new GameElement(this.app.renderer.generateTexture(gr));
  }
};

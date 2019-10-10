import GameElement from "../../GameObjects/GameElements/GameElement";
import gameConfig from "../../config/game.config";
import GameApplication from "../../GameApplication/GameApplication";
import IGameModelElement from "../GameModel/IGameModelElement";
import colorsMap from "../../config/colorsMap";

export default class TriangleBuilder {
  private _side: number; 
  private _modelElement: IGameModelElement;
  public app: GameApplication;
  
  constructor(app: GameApplication, modelElement: IGameModelElement) {
    this._side = gameConfig.elemSize;
    this._modelElement = modelElement;
    this.app = app;
  }

  get side(): number {
    return this._side;
  }

  public create(colNum: number, rowNum: number): GameElement {
    const fillColor = colorsMap.get(this._modelElement.color);

    const gr = new PIXI.Graphics();  
    gr.beginFill(fillColor);
    gr.lineStyle(0);
    gr.moveTo(this.side / 2, 0);
    gr.lineTo(this.side, this.side); 
    gr.lineTo(0, this.side);
    gr.endFill();
    return new GameElement(this.app, this.app.renderer.generateTexture(gr), colNum, rowNum, this._modelElement);
  }
};

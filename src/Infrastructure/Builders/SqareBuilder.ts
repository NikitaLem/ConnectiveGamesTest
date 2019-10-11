import GameElement from "../../GameObjects/GameElements/GameElement";
import gameConfig from "../../config/game.config";
import GameApplication from "../../GameApplication/GameApplication";
import IGameModelElement from "../GameModel/IGameModelElement";
import colorsMap from "../../config/colorsMap";
import IShapeBuilder from "./IShapeBuilder";

export default class SqareBuilder implements IShapeBuilder {
  private _side: number;
  public app: GameApplication;
  
  constructor(app: GameApplication) {
    this._side = gameConfig.elemSize;
    this.app = app;
  }

  get side(): number {
    return this._side;
  }

  public create(modelElement: IGameModelElement, colNum: number, rowNum: number): GameElement {
    const fillColor = colorsMap.get(modelElement.color);

    const gr = new PIXI.Graphics();  
    gr.beginFill(fillColor);
    gr.lineStyle(0);
    gr.drawRect(0, 0, this.side, this.side);
    gr.endFill();
    return new GameElement(this.app, this.app.renderer.generateTexture(gr), colNum, rowNum, modelElement);
  }
};

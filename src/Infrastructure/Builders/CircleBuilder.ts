import GameElement from "../../GameObjects/GameElements/GameElement";
import gameConfig from "../../config/game.config";
import GameApplication from "../../GameApplication/GameApplication";
import IGameModelElement from "../GameModel/IGameModelElement";
import colorsMap from "../../config/colorsMap";
import IShapeBuilder from "./IShapeBuilder";

export default class CircleBuilder implements IShapeBuilder {
  private _radius: number;
  public app: GameApplication;
  
  constructor(app: GameApplication) {
    this._radius = gameConfig.elemSize / 2;
    this.app = app;
  }

  get radius(): number {
    return this._radius;
  }

  public create(modelElement: IGameModelElement, colNum: number, rowNum: number): GameElement {
    const fillColor = colorsMap.get(modelElement.color);

    const gr = new PIXI.Graphics();  
    gr.beginFill(fillColor);
    gr.lineStyle(0);
    gr.drawCircle(0, 0, this.radius);
    gr.endFill();
    return new GameElement(this.app, this.app.renderer.generateTexture(gr), colNum, rowNum, modelElement);
  }
};

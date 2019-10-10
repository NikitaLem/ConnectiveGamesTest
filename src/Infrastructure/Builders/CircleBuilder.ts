import GameElement from "../../GameObjects/GameElements/GameElement";
import gameConfig from "../../config/game.config";
import GameApplication from "../../GameApplication/GameApplication";
import IGameModelElement from "../GameModel/IGameModelElement";
import colorsMap from "../../config/colorsMap";

export default class CircleBuilder {
  private _radius: number;
  private _modelElement: IGameModelElement;
  public app: GameApplication;
  
  constructor(app: GameApplication, modelElement: IGameModelElement) {
    this._radius = gameConfig.elemSize / 2;
    this._modelElement = modelElement;
    this.app = app;
  }

  get radius(): number {
    return this._radius;
  }

  public create(colNum: number, rowNum: number): GameElement {
    const fillColor = colorsMap.get(this._modelElement.color);

    const gr = new PIXI.Graphics();  
    gr.beginFill(fillColor);
    gr.lineStyle(0);
    gr.drawCircle(0, 0, this.radius);
    gr.endFill();
    return new GameElement(this.app, this.app.renderer.generateTexture(gr), colNum, rowNum, this._modelElement);
  }
};

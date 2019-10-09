import GameApplication from "../../GameApplication/GameApplication";
import GameElement from "../../GameObjects/GameElements/GameElement";
import CircleBuilder from "./CircleBuilder";
import SqareBuilder from "./SqareBuilder";
import TriangleBuilder from "./TriangleBuilder";
import gameConfig from "../../config/game.config";
import shapesMap from "../../config/shapesMap";
import IGameModelElement from "../GameModel/IGameModelElement";
import colorsMap from "../../config/colorsMap";

export default class ElementBuilder {
  public app: GameApplication;

  constructor(app: GameApplication) {
    this.app = app;
  }

  public createElement(modelElement: IGameModelElement): GameElement {
    const shapeType = shapesMap.get(gameConfig.shape);
    const color = colorsMap.get(modelElement.color);
    const elem = this.createShapedElem(shapeType, color);
    elem.state = modelElement.state;
    return elem;
  }

  private createShapedElem(shapeType: number, color: number): GameElement {
    switch (shapeType) {
      case 2:
        return this.createSqare(color);
      case 3:
        return this.createTriangle(color);
      default:
        return this.createCircle(color);
    }
  }

  private createCircle(colorNumber: number): GameElement {
    const circleBuilder = new CircleBuilder(this.app, colorNumber);
    return circleBuilder.create();
  }

  private createSqare(colorNumber: number): GameElement {
    const sqareBuilder = new SqareBuilder(this.app, colorNumber);
    return sqareBuilder.create();
  }

  private createTriangle(colorNumber: number): GameElement {
    const triangleBuilder = new TriangleBuilder(this.app, colorNumber);
    return triangleBuilder.create();
  }
};

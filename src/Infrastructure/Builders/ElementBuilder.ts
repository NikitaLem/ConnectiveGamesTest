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

  public createElement(modelElement: IGameModelElement, colNum: number, rowNum: number): GameElement {
    const shapeType = shapesMap.get(gameConfig.shape);
    const elem = this.createShapedElem(shapeType, modelElement, colNum, rowNum);
    elem.state = modelElement.state;
    
    return elem;
  }

  private createShapedElem(shapeType: number, modelElement: IGameModelElement, colNum: number, rowNum: number): GameElement {
    switch (shapeType) {
      case 2:
        return this.createSqare(modelElement, colNum, rowNum);
      case 3:
        return this.createTriangle(modelElement, colNum, rowNum);
      default:
        return this.createCircle(modelElement, colNum, rowNum);
    }
  }

  private createCircle(modelElement: IGameModelElement, colNum: number, rowNum: number): GameElement {
    const circleBuilder = new CircleBuilder(this.app, modelElement);
    return circleBuilder.create(colNum, rowNum);
  }

  private createSqare(modelElement: IGameModelElement, colNum: number, rowNum: number): GameElement {
    const sqareBuilder = new SqareBuilder(this.app, modelElement);
    return sqareBuilder.create(colNum, rowNum);
  }

  private createTriangle(modelElement: IGameModelElement, colNum: number, rowNum: number): GameElement {
    const triangleBuilder = new TriangleBuilder(this.app, modelElement);
    return triangleBuilder.create(colNum, rowNum);
  }
};

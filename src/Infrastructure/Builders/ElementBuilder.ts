import GameApplication from "../../GameApplication/GameApplication";
import GameElement from "../../GameObjects/GameElements/GameElement";
import RandomGenerator from "../../helpers/RandomGenerator";
import CircleBuilder from "./CircleBuilder";
import SqareBuilder from "./SqareBuilder";
import TriangleBuilder from "./TriangleBuilder";
import gameConfig from "../../config/game.config";
import shapesMap from "../../config/shapesMap";

export default class ElementBuilder {
  public app: GameApplication;

  constructor(app: GameApplication) {
    this.app = app;
  }

  public createElement(colorNumber: number): GameElement {
    const shapeType = shapesMap.get(gameConfig.shape);

    switch (shapeType) {
      case 2:
        return this.createSqare(colorNumber);
      case 3:
        return this.createTriangle(colorNumber);
      default:
        return this.createCircle(colorNumber);
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

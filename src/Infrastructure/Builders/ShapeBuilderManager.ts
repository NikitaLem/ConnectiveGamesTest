import IShapeBuilder from "./IShapeBuilder";
import CircleBuilder from "./CircleBuilder";
import SqareBuilder from "./SqareBuilder";
import TriangleBuilder from "./TriangleBuilder";
import GameApplication from "../../GameApplication/GameApplication";

export default class ShapeBuilderManager {
  public builders: Map<number, IShapeBuilder>;

  constructor(app: GameApplication) {
    this.builders = new Map<number, IShapeBuilder>();
    this.builders.set(1, new CircleBuilder(app));
    this.builders.set(2, new SqareBuilder(app));
    this.builders.set(3, new TriangleBuilder(app));
  }
};

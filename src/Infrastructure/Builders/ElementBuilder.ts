import GameApplication from "../../GameApplication/GameApplication";
import GameElement from "../../GameObjects/GameElements/GameElement";
import gameConfig from "../../config/game.config";
import shapesMap from "../../config/shapesMap";
import IGameModelElement from "../GameModel/IGameModelElement";
import ShapeBuilderManager from "./ShapeBuilderManager";

export default class ElementBuilder {
  private shapeBuilderManager: ShapeBuilderManager;
  
  public app: GameApplication;

  constructor(app: GameApplication) {
    this.app = app;
    this.shapeBuilderManager = new ShapeBuilderManager(this.app);
  }

  public createElement(modelElement: IGameModelElement, colNum: number, rowNum: number): GameElement {
    const shapeType = shapesMap.get(gameConfig.shape);
    const builder = this.shapeBuilderManager.builders.get(shapeType);
    const elem = builder.create(modelElement, colNum, rowNum);
    elem.state = modelElement.state;
    
    return elem;
  }
};

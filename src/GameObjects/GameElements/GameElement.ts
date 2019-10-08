import ShapeBuilder from "../../Infrastructure/ShapeBuilder";

export default class GameElement extends PIXI.Sprite implements IGameElement {
  private shapeBuilder: ShapeBuilder;

  constructor() {
    super();
  }
};

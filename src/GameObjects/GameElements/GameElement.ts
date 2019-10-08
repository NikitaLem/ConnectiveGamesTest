import ShapeBuilder from "../../Infrastructure/Builders/ElementBuilder";

export default class GameElement extends PIXI.Sprite implements DrobableElement {
  private shapeBuilder: ShapeBuilder;

  constructor(texture: PIXI.RenderTexture) {
    super(texture);
    this.interactive = true;
    this.buttonMode = true;
  }

  public drop() {

  }
};

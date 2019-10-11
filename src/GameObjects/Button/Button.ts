import GameApplication from "../../GameApplication/GameApplication";
import gameConfig from "../../config/game.config";

export default class Button extends PIXI.Sprite {
  private _text: PIXI.Text;
  
  constructor(
    app: GameApplication, 
    x: number, 
    y: number, 
    text: string = 'click',
    width: number = 160,
    height: number = 45,
  ) {
    super();

    this.texture = this.createTexture(app, width, height);
    this.x = x;
    this.y = y;

    this._text = new PIXI.Text(text, { fill: gameConfig.textFillColor });
    this.setText(text);
    this._text.x = (this.width - this._text.width) / 2;
    this._text.y = (this.height - this._text.height) / 2;
    this.addChild(this._text);

    this.enable();
  }

  public setText(text: string) {
    this._text.text = text;
  }

  public enable() {
    this.buttonMode = true;
    this.interactive = true;
  }

  public disable() {
    this.buttonMode = false;
    this.interactive = false;
  }

  private createTexture(app: GameApplication, width: number, height: number): PIXI.Texture {
    const gr = new PIXI.Graphics();  
    gr.beginFill(0x323232);
    gr.lineStyle(0);
    gr.drawRoundedRect(0, 0, width, height, 5);
    gr.endFill();

    return app.renderer.generateTexture(gr);
  }
}
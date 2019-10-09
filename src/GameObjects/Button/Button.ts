import GameApplication from "../../GameApplication/GameApplication";
import gameConfig from "../../config/game.config";

export default class Button extends PIXI.Sprite {
  private _text: PIXI.Text;
  
  constructor(app: GameApplication, x: number, y: number, text: string = 'click') {
    super();

    this.texture = this.createTexture(app);
    this.x = x;
    this.y = y;

    this._text = new PIXI.Text(text, { fill: gameConfig.textFillColor });
    this.setText(text);
    this._text.x = (this.width - this._text.width) / 2;
    this._text.y = (this.height - this._text.height) / 2;
    this.addChild(this._text);

    this.buttonMode = true;
    this.interactive = true;
  }

  public setText(text: string) {
    this._text.text = text;
  }

  private createTexture(app: GameApplication): PIXI.Texture {
    const gr = new PIXI.Graphics();  
    gr.beginFill(0x323232);
    gr.lineStyle(0);
    gr.drawRoundedRect(0, 0, 160, 45, 5);
    gr.endFill();

    return app.renderer.generateTexture(gr);
  }
}
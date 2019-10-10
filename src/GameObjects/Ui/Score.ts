import GameApplication from "../../GameApplication/GameApplication";

export default class Score extends PIXI.Container {
  private static SIDE_PADDING: number = 5;
  
  private _score: number = 0;
  private scoreText: PIXI.Text;
  
  public app: GameApplication;
  
  constructor(app: GameApplication, width: number = 160, height: number = 45) {
    super();
    this.app = app;

    const gr = new PIXI.Graphics();
    gr.beginFill(0xF5F5F5);
    gr.drawRoundedRect(0, 0, width, height, 5);
    gr.lineStyle(0);
    gr.endFill();

    const background = new PIXI.Sprite(this.app.renderer.generateTexture(gr));
    background.interactive = true;
    this.addChild(background);

    const label = new PIXI.Text('Score: ', { fill: 0x232323, fontSize: 18 });
    label.x = Score.SIDE_PADDING;
    label.y = (this.height - label.height) / 2;
    this.addChild(label);

    this.scoreText = new PIXI.Text(this.score.toString(), { fill: 0x232323 });
    this.align();
    this.scoreText.y = (this.height - this.scoreText.height) / 2;
    this.addChild(this.scoreText);
  }

  get score(): number {
    return this._score;
  }

  set score(value: number) {
    this._score = value;
  }

  public updateScore(value: number) {
    this.score += value;
    this.scoreText.text = this.score.toString();
    this.align();
  }

  private align() {
    this.scoreText.x = this.width - this.scoreText.width - Score.SIDE_PADDING;
  }
}
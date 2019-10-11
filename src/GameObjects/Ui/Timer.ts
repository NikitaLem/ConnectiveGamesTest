import GameApplication from "../../GameApplication/GameApplication";
import gameConfig from "../../config/game.config";
import { TweenMax } from "gsap";
import EventsList from "../../Events/EventsList";

export default class Timer extends PIXI.Container {
  private time: number;
  private timeText: PIXI.Text;
  
  public app: GameApplication;
  
  constructor(app: GameApplication, width: number = 60, height: number = 45) {
    super();
    this.app = app;
    this.time = gameConfig.gameTime;

    const gr = new PIXI.Graphics();
    gr.beginFill(0xF5F5F5);
    gr.drawRoundedRect(0, 0, width, height, 5);
    gr.lineStyle(0);
    gr.endFill();

    const background = new PIXI.Sprite(this.app.renderer.generateTexture(gr));
    background.interactive = true;
    this.addChild(background);

    this.timeText = new PIXI.Text(this.time.toString(), { fill: 0x882222, fontSize: 28 });
    this.timeText.x = (this.width - this.timeText.width) / 2;
    this.timeText.y = (this.height - this.timeText.height) / 2;
    this.addChild(this.timeText);
  }

  public startCountdown() {
    const self = this;

    TweenMax.to(this, 1, {
      repeat: gameConfig.gameTime,
      onRepeat() {
        self.time -= 1;
        self.timeText.text = self.time.toString();
        self.timeText.x = (self.width - self.timeText.width) / 2;
      },
      onComplete() {
        self.app.stage.emit(EventsList.GAME_OVER);
      }
    });
  }
}
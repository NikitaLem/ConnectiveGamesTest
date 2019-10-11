import Button from "../Button/Button";
import GameApplication from "../../GameApplication/GameApplication";
import EventsList from "../../Events/EventsList";
import Score from "./Score";
import Timer from "./Timer";

export default class Ui extends PIXI.Container {
  private static PADDING = 2;

  public randomButton: Button;
  public score: Score;
  public timer: Timer;
  
  constructor(app: GameApplication) {
    super();

    const gr = new PIXI.Graphics();
    gr.beginFill(0x995555);
    gr.drawRoundedRect(0, 0, app.gameSceen.width, 49, 5);
    gr.lineStyle(0);
    gr.endFill();

    const background = new PIXI.Sprite(app.renderer.generateTexture(gr));
    this.addChild(background);

    this.randomButton = new Button(app, 0, 0, 'Random');
    this.randomButton.x = Ui.PADDING;
    this.alignVerticalCenter(this.randomButton, this);
    this.randomButton.on('pointerdown', () => {
      app.stage.emit(EventsList.RANDOM_GENERATE);
    });
    this.addChild(this.randomButton);

    this.score = new Score(app, 220);
    this.score.x = background.width - this.score.width - Ui.PADDING;
    this.alignVerticalCenter(this.score, this);
    this.addChild(this.score);

    this.timer = new Timer(app);
    this.timer.x = background.width - this.score.width - this.timer.width - 2 * Ui.PADDING;
    this.alignVerticalCenter(this.timer, this);
    this.addChild(this.timer);
  }

  private alignVerticalCenter(elem: PIXI.Sprite | PIXI.Container, container: PIXI.Container) {
    elem.y = (container.height - elem.height) / 2;
  }
};

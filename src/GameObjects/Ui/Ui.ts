import Button from "../Button/Button";
import GameApplication from "../../GameApplication/GameApplication";
import EventsList from "../../Events/EventsList";
import Score from "./Score";

export default class Ui extends PIXI.Container {
  public randomButton: Button;
  public score: Score;
  
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
    this.randomButton.x = 2;
    this.randomButton.y = (background.height - this.randomButton.height) / 2;
    this.randomButton.on('pointerdown', () => {
      app.stage.emit(EventsList.RANDOM_GENERATE);
    });
    this.addChild(this.randomButton);

    this.score = new Score(app, 220);
    this.score.x = background.width - this.score.width - 2;
    this.score.y = (background.height - this.score.height) / 2;
    this.addChild(this.score);
  }
};

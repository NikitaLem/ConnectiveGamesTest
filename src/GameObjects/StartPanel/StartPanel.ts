import GameApplication from "../../GameApplication/GameApplication";
import Button from "../Button/Button";
import EventsList from "../../Events/EventsList";

export default class StartPanel extends PIXI.Container {
  public app: GameApplication;
  public startButton: Button;

  constructor(app: GameApplication) {
    super();
    this.app = app;

    const gr = new PIXI.Graphics();
    gr.beginFill(0x000000, .75);
    gr.drawRect(0, 0, this.app.view.width, this.app.view.height);
    gr.lineStyle(0);
    gr.endFill();

    const background = new PIXI.Sprite(this.app.renderer.generateTexture(gr));
    background.interactive = true;
    this.addChild(background);

    this.startButton = new Button(app, 0, 0, 'Start', 200, 100);
    this.startButton.on('pointerdown', () => {
      app.stage.emit(EventsList.REELS_SETTED);
      this.visible = false;
      this.interactive = false;
    });
    this.startButton.x = (this.width - this.startButton.width) / 2;
    this.startButton.y = (this.height - this.startButton.height) / 2;
    this.addChild(this.startButton);
  }
}
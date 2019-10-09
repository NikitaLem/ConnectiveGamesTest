import Button from "../Button/Button";
import GameApplication from "../../GameApplication/GameApplication";
import EventsList from "../../EventsController/EventsList";

export default class Ui extends PIXI.Container {
  public startButton: Button;
  
  constructor(app: GameApplication) {
    super();
    this.startButton = new Button(app, 0, 0, 'Start');
    this.startButton.on('pointerdown', () => {
      app.stage.emit(EventsList.REELS_SETTED);
    });
    this.addChild(this.startButton);
    this.x = (app.view.width - this.width) / 2;
    this.y = app.view.height - this.height;
  }
};

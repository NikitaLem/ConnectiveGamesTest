import GameApplication from "../GameApplication/GameApplication";
import GameModel from "../Infrastructure/GameModel/GameModel";
import GameSceen from "../GameObjects/GameSceen/GameSceen";

export default class EventsController {
  private stage: PIXI.Container;
  
  public app: GameApplication;
  
  constructor(app: GameApplication) {
    this.app = app;
    this.stage = app.stage;
    this.registerListeners();
  }

  private registerListeners() {
    this.stage.on(GameModel.MODEL_CHANGED, () => {
      // this.app.gameModel.findWins();
    });

    this.stage.on(GameModel.WINS_FINDED, () => {
      console.log('Wins finded!');
      this.app.gameModel.clearWins();
    });

    this.stage.on(GameModel.NO_WINS_FINDED, () => {
      console.log('Wins not finded!');
    });

    this.stage.on(GameModel.WINS_CLEARED, (winCount) => {
      console.log(winCount, this.app.gameModel.map);
    });

    this.stage.on(GameSceen.REELS_SETTED, () => {
      console.log('Reels setted!');
      this.app.gameModel.findWins();
    });
  }
};

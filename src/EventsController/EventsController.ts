import GameApplication from "../GameApplication/GameApplication";
import EventsList from "./EventsList";

export default class EventsController {
  private stage: PIXI.Container;
  
  public app: GameApplication;
  
  constructor(app: GameApplication) {
    this.app = app;
    this.stage = app.stage;
  }

  public registerListeners() {
    this.stage.on(EventsList.MODEL_CHANGED, () => {
      // this.app.gameModel.findWins();
    });

    this.stage.on(EventsList.REELS_SETTED, () => {
      console.log('Reels setted!');
      this.app.gameModel.findWins();
    });

    this.stage.on(EventsList.WINS_FINDED, () => {
      console.log('Wins finded!');
      this.app.gameModel.clearWins();
    });

    this.stage.on(EventsList.NO_WINS_FINDED, () => {
      console.log('Wins not finded!');
    });

    this.stage.on(EventsList.WINS_CLEARED, (winCount) => {
      console.log('Wins cleared! Total win: ', winCount);
      this.app.gameSceen.destroyEmptyElems(this.app.gameModel.map);
    });

    this.stage.on(EventsList.ELEMS_DESTROYED, () => {
      console.log('Empty elems destroyed!');
      this.app.gameModel.fillNulls();
    });

    this.stage.on(EventsList.NULLS_FILLED, () => {
      console.log('Nulls filled!');
      this.app.gameSceen.updateReels(this.app.gameModel.map);
    });
  }
};

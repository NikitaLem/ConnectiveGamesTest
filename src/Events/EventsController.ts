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
      this.app.gameModel.setStatesToAll(this.app.gameModel.map);
    });

    this.stage.on(EventsList.STATES_SETTED, () => {
      console.log('States setted!');
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
      this.app.ui.score.updateScore(winCount);
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

    this.stage.on(EventsList.ELEM_PRESSED, ({ col, row, color }) => {
      console.log('Elem pressed!');
      this.app.gameModel.setActiveElems(col, row, color);
    });

    this.stage.on(EventsList.ELEM_UNPRESSED, () => {
      console.log('Elem unpressed!');
      this.app.gameModel.resetActiveElems();
    });

    this.stage.on(EventsList.ELEMS_ACTIVE_RESETED, () => {
      console.log('Elem active reseted!');
      this.app.gameSceen.reset(this.app.gameModel.map);
    });

    this.stage.on(EventsList.ELEMS_ACTIVATED, () => {
      console.log('Elems activated!');
      this.app.gameSceen.onElemsActivated(this.app.gameModel.map);
    });

    this.stage.on(EventsList.ELEMS_SWAP, ({ col, row }) => {
      console.log('Elems start swapping!');
      this.app.gameModel.swap(col, row);
    });

    this.stage.on(EventsList.ELEMS_SWAP_END, () => {
      console.log('Elems end swapping!');
      this.app.gameSceen.reset(this.app.gameModel.map);
    });

    this.stage.on(EventsList.RANDOM_GENERATE, () => {
      console.log('Generate random map!');
      this.app.gameModel.randomMap();
    });

    this.stage.on(EventsList.RANDOM_GENERATE, () => {
      console.log('Random map generated!');
      this.app.gameSceen.reset(this.app.gameModel.map);
    });
  }
};

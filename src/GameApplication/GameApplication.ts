import GameSceen from "../GameObjects/GameSceen/GameSceen";
import GameModel from "../Infrastructure/GameModel/GameModel";
import IGameModelElement from "../Infrastructure/GameModel/IGameModelElement";
import EventsController from "../EventsController/EventsController";

export default class GameApplication extends PIXI.Application {
  public gameSceen: GameSceen;
  public gameModel: GameModel;
  public eventsController: EventsController;
  
  constructor(options: PIXI.ApplicationOptions) {
    super(options);
    this.eventsController = new EventsController(this);
    this.gameModel = this.createGameModel();
    this.gameSceen = this.createSceen(this.gameModel.generateGameMap());

    // this.resize();
  }

  public resize() {
    this.renderer.resize(window.innerWidth, window.innerHeight);
  }

  private createSceen(gameModel: IGameModelElement[][]) {
    const sceen = new GameSceen(this, gameModel);
    sceen.createReels();
    this.stage.addChild(sceen);
    return sceen;
  }

  private createGameModel(): GameModel {
    const gameModel = new GameModel(this);
    return gameModel;
  }
};

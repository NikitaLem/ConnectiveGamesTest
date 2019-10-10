import GameSceen from "../GameObjects/GameSceen/GameSceen";
import GameModel from "../Infrastructure/GameModel/GameModel";
import IGameModelElement from "../Infrastructure/GameModel/IGameModelElement";
import EventsController from "../Events/EventsController";
import Ui from "../GameObjects/Ui/Ui";

export default class GameApplication extends PIXI.Application {
  public gameSceen: GameSceen;
  public gameModel: GameModel;
  public eventsController: EventsController;
  public ui: Ui;
  
  constructor(options: PIXI.ApplicationOptions) {
    super(options);
    this.eventsController = this.createEventController(this);
    this.gameModel = this.createGameModel();
    this.gameSceen = this.createSceen(this.gameModel.generateGameMap());
    this.ui = this.createUi(this);

    // this.resize();
  }

  public resize() {
    this.renderer.resize(window.innerWidth, window.innerHeight);
  }

  private createSceen(gameModel: IGameModelElement[][]) {
    const sceen = new GameSceen(this, gameModel);
    this.stage.addChild(sceen);
    sceen.x = (this.view.width - sceen.width) / 2;
    sceen.y = 25;
    return sceen;
  }

  private createGameModel(): GameModel {
    const gameModel = new GameModel(this);
    return gameModel;
  }

  private createEventController(app: GameApplication): EventsController {
    const eventsController = new EventsController(app);
    eventsController.registerListeners();
    return eventsController;
  }

  private createUi(app: GameApplication): Ui {
    const ui = new Ui(app);
    this.stage.addChild(ui);
    return ui;
  }
};

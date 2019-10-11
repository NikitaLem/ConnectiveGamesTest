import appConfig from "../config/app.config";
import GameSceen from "../GameObjects/GameSceen/GameSceen";
import GameModel from "../Infrastructure/GameModel/GameModel";
import IGameModelElement from "../Infrastructure/GameModel/IGameModelElement";
import EventsController from "../Events/EventsController";
import Ui from "../GameObjects/Ui/Ui";
import StartPanel from "../GameObjects/StartPanel/StartPanel";
import gameConfig from "../config/game.config";

export default class GameApplication extends PIXI.Application {
  public gameSceen: GameSceen;
  public gameModel: GameModel;
  public eventsController: EventsController;
  public ui: Ui;
  public startPanel: StartPanel;
  
  constructor(options: PIXI.ApplicationOptions) {
    super(options);
    this.eventsController = this.createEventController(this);
    this.gameModel = this.createGameModel();
    this.gameSceen = this.createSceen(this.gameModel.generateGameMap());
    this.ui = this.createUi(this);
    this.startPanel = this.createStartPanel(this);

    this.resize();
  }

  public resize() {
    this.renderer.resize(window.innerWidth, window.innerHeight);
    
    let aspectRatio = 1;

    if (window.innerWidth < window.innerHeight) {
      aspectRatio = window.innerWidth / appConfig.width;
    } else {
      aspectRatio = window.innerHeight / appConfig.height;
    }
    
    this.stage.scale = new PIXI.Point(aspectRatio, aspectRatio);
    this.stage.x = (window.innerWidth - this.stage.width) / 2;
    this.stage.y = (window.innerHeight - this.stage.height) / 2;
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
    ui.x = app.gameSceen.x;
    ui.y = gameConfig.rowHeight * gameConfig.rowsCount;
    this.stage.addChild(ui);
    return ui;
  }

  private createStartPanel(app: GameApplication): StartPanel {
    const startPanel = new StartPanel(app);
    this.stage.addChild(startPanel);
    return startPanel;
  }
};

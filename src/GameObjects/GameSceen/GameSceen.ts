import GameApplication from "../../GameApplication/GameApplication";
import GameReel from "../GameReel/GameReel";
import gameConfig from "../../config/game.config";
import IGameModelElement from "../../Infrastructure/GameModel/IGameModelElement";
import EventsList from "../../EventsController/EventsList";

export default class GameSceen extends PIXI.Container {
  private _reelsCount: number;
  private _reelWidth: number;
  private _gameMap: IGameModelElement[][];

  public app: GameApplication;
  public reels: GameReel[];

  constructor(app: GameApplication, gameMap: IGameModelElement[][]) {
    super();
    this.app = app;
    this._reelsCount = gameConfig.reelsCount;
    this._reelWidth = gameConfig.reelWidth;
    this._gameMap = gameMap;
    this.reels = this.createReels();
  }

  get reelsCount(): number {
    return this._reelsCount;
  }

  get reelWidth(): number {
    return this._reelWidth;
  }

  private createReels() {
    const reels: GameReel[] = [];
    let reelsCount: number = 0;

    for (let i = 0; i < this.reelsCount; i++) {
      const reel = new GameReel(this.app);
      reel.x = this.reelWidth * i;
      reel.fillWithElems(this._gameMap[i]);
      this.addChild(reel);
      reels.push(reel);
    }

    return reels;
  }

  public destroyEmptyElems(gameModel: IGameModelElement[][]) {
    this.reels.forEach((reel, i) => {
      reel.destroyEmptyElems(gameModel[i]);
    });

    this.app.stage.emit(EventsList.ELEMS_DESTROYED);
  }

  public updateReels(gameModel: IGameModelElement[][]) {
    this.reels.forEach((reel, i) => {
      reel.updateElems(gameModel[i]);
    });

    // this.app.stage.emit(EventsList.REELS_SETTED);
  }
};

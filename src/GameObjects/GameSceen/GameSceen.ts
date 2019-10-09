import GameApplication from "../../GameApplication/GameApplication";
import GameReel from "../GameReel/GameReel";
import gameConfig from "../../config/game.config";
import IGameModelElement from "../../Infrastructure/GameModel/IGameModelElement";

export default class GameSceen extends PIXI.Container {
  public static REELS_SETTED = 'sceen-reels-setted';

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
  }

  get reelsCount(): number {
    return this._reelsCount;
  }

  get reelWidth(): number {
    return this._reelWidth;
  }

  public createReels() {
    const reels: GameReel[] = [];

    for (let i = 0; i < this.reelsCount; i++) {
      const reel = new GameReel(this.app, this._gameMap[i]);
      reel.x = this.reelWidth * i;
      reel.fillWithElems();
      this.addChild(reel);
      reels.push(reel);
    }

    this.app.stage.emit(GameSceen.REELS_SETTED);
    return reels;
  }
};

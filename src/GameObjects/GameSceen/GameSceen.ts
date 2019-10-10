import GameApplication from "../../GameApplication/GameApplication";
import GameReel from "../GameReel/GameReel";
import gameConfig from "../../config/game.config";
import IGameModelElement from "../../Infrastructure/GameModel/IGameModelElement";
import EventsList from "../../Events/EventsList";

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
    
    const gr = new PIXI.Graphics();
    gr.beginFill(0x338833);
    gr.drawRoundedRect(
      0, 
      0, 
      gameConfig.reelWidth * gameConfig.reelsCount, 
      gameConfig.rowHeight * gameConfig.rowsCount,
      5
    );
    gr.lineStyle(0);
    gr.endFill();
    
    const background = new PIXI.Sprite(app.renderer.generateTexture(gr));
    this.addChild(background);
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

    for (let i = 0; i < this.reelsCount; i++) {
      const reel = new GameReel(this.app, i);
      reel.x = this.reelWidth * i;
      reel.fillWithElems(this._gameMap[i]);
      this.addChild(reel);
      reels.push(reel);
    }

    reels[0].on(EventsList.ELEMS_SETTED, () => {
      setTimeout(() => {
        this.app.stage.emit(EventsList.REELS_SETTED);
      }, 200);
    });

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

    // setTimeout(() => {
    //   this.app.stage.emit(EventsList.REELS_SETTED);
    // }, 200);
  }

  public onElemsActivated(gameModel: IGameModelElement[][]) {
    this.reels.forEach((reel, i) => {
      reel.onElemsActivated(gameModel[i]);
    });
  }

  public reset(gameModel: IGameModelElement[][]) {
    this.reels.forEach((reel, i) => {
      reel.resetElems(gameModel[i]);
    });

    this.app.stage.emit(EventsList.REELS_SETTED);
  }
};

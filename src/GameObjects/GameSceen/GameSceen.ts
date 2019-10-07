import GameApplication from "../../GameApplication/GameApplication";
import GameReel from "../GameReel/GameReel";

export default class GameSceen extends PIXI.Container {
  private static REELS_COUNT: number = 5;
  
  public app: GameApplication;
  public reels: GameReel[];

  constructor(app: GameApplication) {
    super();
    this.app = app;
    this.width = app.view.width;
    this.height = app.view.height;

    this.reels = this.createReels();
  }

  private createReels() {
    const reels: GameReel[] = [];

    for (let i = 0; i < GameSceen.REELS_COUNT; i++) {
      const reel = new GameReel();
      reel.x = reel.width * i;
      this.addChild(reel);
      reels.push(reel);
    }

    return reels;
  }
};

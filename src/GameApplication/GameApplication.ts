import GameSceen from "../GameObjects/GameSceen/GameSceen";
import GameMap from "../Infrastructure/GameMap/GameMap";

export default class GameApplication extends PIXI.Application {
  public gameSceen: GameSceen;
  public gameMap: GameMap;
  
  constructor(options: PIXI.ApplicationOptions) {
    super(options);
    this.gameMap = new GameMap();
    this.gameSceen = this.createSceen(this.gameMap.map);
    // this.resize();
  }

  public resize() {
    this.renderer.resize(window.innerWidth, window.innerHeight);
  }

  private createSceen(gameMap: number[][]) {
    const sceen = new GameSceen(this, gameMap);
    sceen.createReels();
    this.stage.addChild(sceen);
    return sceen;
  }
};

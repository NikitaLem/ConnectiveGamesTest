import GameSceen from "../GameObjects/GameSceen/GameSceen";

export default class GameApplication extends PIXI.Application {
  public gameSceen: GameSceen;
  
  constructor(options: PIXI.ApplicationOptions) {
    super(options);
    this.gameSceen = this.createSceen();
    
    // this.resize();
  }

  public resize() {
    this.renderer.resize(window.innerWidth, window.innerHeight);
  }

  private createSceen() {
    const sceen = new GameSceen(this);
    this.stage.addChild(sceen);
    return sceen;
  }
};

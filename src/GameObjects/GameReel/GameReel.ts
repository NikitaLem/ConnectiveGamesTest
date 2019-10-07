export default class GameReel extends PIXI.Container {
  private static REEL_WIDTH: number = 160;

  constructor() {
    super();
    this.width = GameReel.REEL_WIDTH;
  }
}
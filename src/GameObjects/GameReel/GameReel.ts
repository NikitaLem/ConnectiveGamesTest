import gameConfig from "../../config/game.config";
import GameApplication from "../../GameApplication/GameApplication";
import GameElement from "../GameElements/GameElement";
import ElementBuilder from "../../Infrastructure/Builders/ElementBuilder";
import IGameModelElement from "../../Infrastructure/GameModel/IGameModelElement";

export default class GameReel extends PIXI.Container {
  private _rowHeight: number;
  private _rowsCount: number;
  private _gameMapReel: IGameModelElement[];
  private elementBuilder: ElementBuilder;

  public app: GameApplication;
  public elements: GameElement[];

  constructor(app: GameApplication, gameMapReel: IGameModelElement[]) {
    super();
    this.app = app;
    this._rowHeight = gameConfig.rowHeight;
    this._rowsCount = gameConfig.rowsCount;
    this.elementBuilder = new ElementBuilder(this.app);
    this._gameMapReel = gameMapReel;
  }

  get rowHeight(): number {
    return this._rowHeight;
  }

  get rowCount(): number {
    return this._rowsCount;
  }

  public fillWithElems(): GameElement[] {
    const elements: GameElement[] = [];

    for (let i = 0; i < this.rowCount; i++) {
      const element = this.elementBuilder.createElement(this._gameMapReel[i]);
      element.y = this.rowHeight * i;
      this.addChild(element);
      elements.push(element);
    }

    return elements;
  }
};

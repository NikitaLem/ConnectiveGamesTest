import gameConfig from "../../config/game.config";
import GameApplication from "../../GameApplication/GameApplication";
import GameElement from "../GameElements/GameElement";
import ElementBuilder from "../../Infrastructure/Builders/ElementBuilder";
import IGameModelElement from "../../Infrastructure/GameModel/IGameModelElement";

export default class GameReel extends PIXI.Container {
  private _nullsCount: number = 0;
  private elementBuilder: ElementBuilder;

  public app: GameApplication;
  public elements: GameElement[];

  constructor(app: GameApplication) {
    super();
    this.app = app;
    this.elementBuilder = new ElementBuilder(this.app);
  }

  public fillWithElems(gameMapReel: IGameModelElement[]): GameElement[] {
    const elements: GameElement[] = [];

    for (let i = 0; i < gameConfig.rowsCount; i++) {
      elements.push(this.createElement(gameMapReel[i], i));
    }

    this.elements = [...elements];
    return elements;
  }

  public destroyEmptyElems(gameMap: IGameModelElement[]) {
    let nullCount: number = 0;

    this.elements.forEach((elem, i) => {
      if (!gameMap[i]) {
        elem.destroy();
        this.elements.splice(i, 1);
        nullCount++;
      }
    });

    this._nullsCount = nullCount;
  }

  public updateElems(gameMap: IGameModelElement[]) {
    for (let i = 0; i < this._nullsCount; i ++) {
      this.elements.push(this.createElement(gameMap[i], 0));
    }

    for (let i = 0, len = this.elements.length; i < len; i++) {
      for (let j = 0; j < this._nullsCount; j++) {
        this.elements[i].drop(i - j);
      }
    }

    this._nullsCount = 0;
    
    // this.destroyAllElements();
    // this.fillWithElems(gameMap);
  }

  private destroyAllElements() {
    this.elements.forEach(child => {
      child.destroy();
    });
    this.elements.splice(0, this.elements.length);
  }

  private createElement(gameMapElem: IGameModelElement, index: number): GameElement {
    const element = this.elementBuilder.createElement(gameMapElem);    
    element.y = gameConfig.rowHeight * index;
    this.addChild(element);
    return element;
  }
};

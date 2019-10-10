import gameConfig from "../../config/game.config";
import GameApplication from "../../GameApplication/GameApplication";
import GameElement from "../GameElements/GameElement";
import ElementBuilder from "../../Infrastructure/Builders/ElementBuilder";
import IGameModelElement from "../../Infrastructure/GameModel/IGameModelElement";
import States from "../../Infrastructure/GameModel/ElementStates";
import EventsList from "../../Events/EventsList";

export default class GameReel extends PIXI.Container {
  private _nullsCount: number = 0;
  private _columnNumber: number;
  private elementBuilder: ElementBuilder;

  public app: GameApplication;
  public elements: GameElement[];

  constructor(app: GameApplication, columnNumber: number) {
    super();
    this.app = app;
    this._columnNumber = columnNumber;
    this.elementBuilder = new ElementBuilder(this.app);
  }

  public fillWithElems(gameMapReel: IGameModelElement[]): GameElement[] {
    const elements: GameElement[] = [];

    for (let i = 0; i < gameConfig.rowsCount; i++) {
      elements.push(this.createElement(gameMapReel[i], i, i));
    }

    this.elements = [...elements];
    return elements;
  }

  public destroyEmptyElems(gameMap: IGameModelElement[]) {
    let nullCount: number = 0;

    this.elements.forEach((elem, i, arr) => {
      if (!gameMap[i]) {
        elem.destroy();
        arr[i] = null;
        nullCount++;
      }
    });

    this._nullsCount = nullCount;
  }

  public updateElems(gameMap: IGameModelElement[]) {
    this.destroyAllElements(); //!!!

    for (let i = 0, len = gameMap.length; i < len; i++) {
      // if (gameMap[i].state === States.Filler && !this.elements[i]) {
        const newElem = this.createElement(gameMap[i], -(len - i), i);
        this.elements[i] = newElem;
      // }
    }

    for (let i = 0, len = this.elements.length; i < len; i++) {
      // if (this.elements[i].state === States.Filler) {
        this.elements[i].drop(len);
      // }
    }

    this.elements[0].once(EventsList.ELEM_DROPPED, () => {
      this.emit(EventsList.ELEMS_SETTED);
    });
    this._nullsCount = 0;
  }

  public onElemsActivated(gameMap: IGameModelElement[]) {
    gameMap.forEach((elem, i) => {
      if (elem.state === States.Active) {
        this.elements[i].activate();
      } else {
        this.elements[i].disable();
      }
    });
  }

  public onSwap(elem: IGameModelElement, index: number) {
    this.elements[index].destroy;
    this.elements.splice(index, 1);
    this.elements[index] = this.createElement(elem, index, index);
  }

  public deactivate() {
    this.elements.forEach(elem => elem.deactivate());
  }

  private destroyAllElements() {
    this.elements.forEach(child => {
      if (child) child.destroy();
    });
    this.elements.splice(0, this.elements.length);
  }

  private createElement(gameMapElem: IGameModelElement, steps: number, rowNum: number): GameElement {
    const element = this.elementBuilder.createElement(gameMapElem, this._columnNumber, rowNum);    
    element.y = gameConfig.rowHeight * steps;
    this.addChild(element);
    return element;
  }
};

import gameConfig from "../../config/game.config";
import GameApplication from "../../GameApplication/GameApplication";
import GameElement from "../GameElements/GameElement";
import ElementBuilder from "../../Infrastructure/Builders/ElementBuilder";
import IGameModelElement from "../../Infrastructure/GameModel/IGameModelElement";
import States from "../../Infrastructure/GameModel/ElementStates";
import EventsList from "../../Events/EventsList";

export default class GameReel extends PIXI.Container {
  private static TOP_PADDING = 14;

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

    const gr = new PIXI.Graphics();
    gr.beginFill(0x000000, 0);
    gr.drawRect(0, 0, gameConfig.reelWidth, gameConfig.rowHeight * gameConfig.rowsCount);
    gr.lineStyle(0);
    gr.endFill();

    const background = new PIXI.Sprite(app.renderer.generateTexture(gr));
    this.addChild(background);

    const mask = new PIXI.Graphics();
    mask.beginFill(0x0, 1);
    mask.drawRect(0, 0, gameConfig.reelWidth, gameConfig.rowHeight * gameConfig.rowsCount);
    mask.endFill();
    this.addChild(mask);
    this.mask = mask;
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
      } else if (elem.state === States.Selected) {
        this.elements[i].state = elem.state;
      } else {
        this.elements[i].disable();
      }
    });
  }

  public resetElems(elems: IGameModelElement[]) {
    this.destroyAllElements();
    this.elements = this.fillWithElems(elems);
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
    element.x = (this.width - element.width) / 2;
    element.y = gameConfig.rowHeight * steps + GameReel.TOP_PADDING;
    this.addChild(element);
    return element;
  }
};

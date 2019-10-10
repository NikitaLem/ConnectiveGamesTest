import States from "../../Infrastructure/GameModel/ElementStates";
import gameConfig from "../../config/game.config";
import { TweenMax } from "gsap";
import EventsList from "../../Events/EventsList";
import GameApplication from "../../GameApplication/GameApplication";
import IGameModelElement from "../../Infrastructure/GameModel/IGameModelElement";
export default class GameElement extends PIXI.Sprite implements IGameElement {
  private _state: States;
  private _columnNumber: number;
  private _rowNumber: number;
  private _color: number;
  private _activeMark: PIXI.Sprite;

  public app: GameApplication;

  constructor(app: GameApplication, texture: PIXI.RenderTexture, colNum: number, rowNum: number, modelElement: IGameModelElement) {
    super(texture);
    this.app = app;
    this._columnNumber = colNum;
    this._rowNumber = rowNum;
    this._state = modelElement.state;
    this._color = modelElement.color;
    this.enable();

    this.on('pointerdown', () => {
      switch (this.state) {
        case States.Active:
          this.app.stage.emit(EventsList.ELEMS_SWAP, {
            col: this._columnNumber, 
            row: this._rowNumber,
          });
          break;
        case States.Selected:
          this.app.stage.emit(EventsList.ELEM_UNPRESSED);
          break;
        default:
          this.app.stage.emit(EventsList.ELEM_PRESSED, {
            col: this._columnNumber, 
            row: this._rowNumber,
            color: this._color,
          });
          break;    
      }
    });
  }
  
  get state(): States {
    return this._state;
  }

  set state(value: States) {
    this._state = value;
  }

  public enable() {
    this.interactive = true;
    this.buttonMode = true;
  }

  public disable() {
    this.interactive = false;
    this.buttonMode = false;
  }

  public activate() {
    this.state = States.Active;
    this._activeMark = this.addActiveMark();
    this._activeMark.x = (gameConfig.elemSize - this._activeMark.width) / 2;
    this._activeMark.y = (gameConfig.elemSize - this._activeMark.height) / 2;
    this.addChild(this._activeMark);
  }

  public deactivate() {
    this.state = States.Base;
    this.enable();

    if (this._activeMark) {
      this._activeMark.destroy();
    }
  }

  public drop(steps: number = 1) {
    const self = this;
    const fromY = this.y;
    const toY = this.y + steps * gameConfig.rowHeight;
    TweenMax.fromTo(self, .5, {
      y: fromY,
    }, 
    {
      y: toY,
      onComplete() {
        self.emit(EventsList.ELEM_DROPPED);
      }
    });
  }

  private addActiveMark(): PIXI.Sprite {
    const gr = new PIXI.Graphics();  
    gr.beginFill(0x000000);
    gr.lineStyle(0);
    gr.drawCircle(0, 0, gameConfig.elemSize / 8);
    gr.endFill();
    
    return new PIXI.Sprite(this.app.renderer.generateTexture(gr));
  }
};

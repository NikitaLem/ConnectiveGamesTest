import RandomGenerator from "../../helpers/RandomGenerator";
import gameConfig from "../../config/game.config";
import IGameModelElement from "./IGameModelElement";
import States from "./ElementStates";
import GameApplication from "../../GameApplication/GameApplication";
import EventsList from "../../EventsController/EventsList";

export default class GameModel {
  private _map: IGameModelElement[][];
  
  public app: GameApplication;

  constructor(app: GameApplication) {
    this.app = app;
  }

  get map(): IGameModelElement[][] {
    return this._map;
  }

  set map(value: IGameModelElement[][]) {
    this._map = value;
  }

  public generateGameMap(): IGameModelElement[][] {
    const randomMap: number[][] = RandomGenerator.random2dArray(gameConfig);
    const gameMap: IGameModelElement[][] = randomMap.map(innerArr => innerArr.map(value => {
      return { color: value, state: States.Base };
    }));

    this.setStatesToAll(gameMap);
    this.map = gameMap;
    // this.app.stage.emit(EventList.MODEL_CHANGED);
    return gameMap;
  }

  public findWins() {
    const winsExist = this.map.some(innerArr => innerArr.some(elem => elem.state === 2));
    const event = winsExist ? EventsList.WINS_FINDED : EventsList.NO_WINS_FINDED;
    this.app.stage.emit(event);
  }

  public clearWins() {
    let winCount: number = 0;
    
    for (let i = 0, len = this.map.length; i < len; i++) {
      for (let j = 0, innerArrLen = this.map[i].length; j < innerArrLen; j++) {
        if (this.map[i][j].state === States.Win) {
          winCount++;
          this.map[i][j] = null;
        }
      }
    }

    this.app.stage.emit(EventsList.WINS_CLEARED, winCount);
  }

  public fillNulls() {
    for (let i = 0, len = this.map.length; i < len; i++) {
      for (let j = 0, innerArrLen = this.map[i].length; j < innerArrLen; j++) {
        if (!this.map[i][j]) {
          this.propogateElem(this.map[i], this.map[i][j]);
        }
      }
    }

    this.setStatesToAll(this.map);
    this.app.stage.emit(EventsList.NULLS_FILLED);
  }

  private propogateElem(arr: IGameModelElement[], elem: IGameModelElement | null) {
    let currentIndex = arr.indexOf(elem);
    let nextIndex = currentIndex - 1;

    for (nextIndex; nextIndex >= 0; nextIndex--, currentIndex--) {
      const temp = arr[nextIndex];
      arr[currentIndex] = temp;
      arr[nextIndex] = elem;
    }

    const newElem: IGameModelElement = {
      color: RandomGenerator.minmax(gameConfig.colorsTypesCount),
      state: States.Base,
    };
    arr[nextIndex + 1] = newElem;
  }

  private setStatesToAll(gameMap: IGameModelElement[][]) {
    for (let i = 0, len = gameMap.length; i < len; i++) {
      for (let j = 0, innerArrLen = gameMap[i].length; j < innerArrLen; j++) {
        if (!gameMap[i] || !gameMap[i][j] || gameMap[i][j].state !== States.Win)
          this.setState(gameMap, i, j);
      }
    }
  }

  private setState(gameMap: IGameModelElement[][], i: number, j: number) {
    const color = gameMap[i][j].color;
    const neighborCoords = [
      { x: i - 1, y: j },
      { x: i + 1, y: j },
      { x: i, y: j - 1 },
      { x: i, y: j + 1 },
    ];

    gameMap[i][j].state = neighborCoords.some(coords => this.checkElem(color, gameMap, coords.x, coords.y))
      ? States.Win
      : States.Base;
  }

  private checkElem(color: number, arr: IGameModelElement[][], x: number, y: number): boolean {
    if (x < 0 || y < 0) return false;
    if (x >= arr.length || y >= arr[x].length) return false;
    return arr[x][y].color === color;
  }
};

import RandomGenerator from "../../helpers/RandomGenerator";
import gameConfig from "../../config/game.config";
import IGameModelElement from "./IGameModelElement";
import States from "./ElementStates";
import GameApplication from "../../GameApplication/GameApplication";
import EventsList from "../../Events/EventsList";

export default class GameModel {
  private _map: IGameModelElement[][];
  private _selectedElemCoords: { x: number, y: number };
  
  public app: GameApplication;

  constructor(app: GameApplication) {
    this.app = app;
  }

  get selectedElemCoords(): { x: number, y: number } {
    return this._selectedElemCoords;
  }

  set selectedElemCoords(value: { x: number, y: number }) {
    this._selectedElemCoords = value;
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

    this.map = gameMap;
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

    this.app.stage.emit(EventsList.NULLS_FILLED);
  }

  public setStatesToAll(gameMap: IGameModelElement[][]) {
    for (let i = 0, len = gameMap.length; i < len; i++) {
      for (let j = 0, innerArrLen = gameMap[i].length; j < innerArrLen; j++) {
        if (!gameMap[i] || !gameMap[i][j] || gameMap[i][j].state !== States.Win)
          this.setState(gameMap, i, j, gameMap[i][j].color);
      }
    }

    this.app.stage.emit(EventsList.STATES_SETTED);
  }

  public setActiveElems(col: number, row: number, color: number) {
    const neighborCoords = [
      { x: col - 1, y: row },
      { x: col + 1, y: row },
      { x: col, y: row - 1 },
      { x: col, y: row + 1 },
    ];

    let isAnyActiveElem: boolean = false;

    neighborCoords.forEach(({ x, y }) => {
      if (this.isElemExist(x, y)) {
        const activeFinded: boolean = this.setState(this.map, x, y, color, States.Active, col, row);
        if (!isAnyActiveElem) isAnyActiveElem = activeFinded;
      }
    });

    if (isAnyActiveElem) {
      this.selectedElemCoords = { x: col, y: row };
      this.app.stage.emit(EventsList.ELEMS_ACTIVATED);
    }
  }

  public swap(x: number, y: number) {
    const { x: x0, y: y0 } = this.selectedElemCoords;
    const temp: IGameModelElement = this.map[x0][y0];
    this.map[x0][y0] = this.map[x][y];
    this.map[x][y] = temp;
    
    this.app.stage.emit(EventsList.ELEMS_SWAP_END);
    this.selectedElemCoords = null;
  }

  private isElemExist(i: number, j: number): boolean {
    return !!this.map[i] && !!this.map[i][j];
  }

  private propogateElem(arr: IGameModelElement[], elem: IGameModelElement | null) {
    let currentIndex = arr.indexOf(elem);
    let nextIndex = currentIndex - 1;

    for (nextIndex; nextIndex >= 0; nextIndex--, currentIndex--) {
      const temp = { color: arr[nextIndex].color, state: States.Filler };
      arr[currentIndex] = temp;
      arr[nextIndex] = elem;
    }

    const newElem: IGameModelElement = {
      color: RandomGenerator.minmax(gameConfig.colorsTypesCount),
      state: States.Filler,
    };
    arr[nextIndex + 1] = newElem;
  }

  private setState(
    gameMap: IGameModelElement[][], 
    i: number, 
    j: number, 
    color: number, 
    state: States = States.Win,
    targetX?: number, 
    targetY?: number  
  ): boolean {
    let neighborCoords = [
      { x: i - 1, y: j },
      { x: i + 1, y: j },
      { x: i, y: j - 1 },
      { x: i, y: j + 1 },
    ];

    if (state === States.Active)
      neighborCoords = [...neighborCoords.filter(({ x, y }) => !(x === targetX && y === targetY))];

    const checkResult = neighborCoords.some(({ x, y }) => this.checkElem(color, gameMap, x, y));
    gameMap[i][j].state = checkResult ? state : States.Base;
    return checkResult;
  }

  private checkElem(color: number, arr: IGameModelElement[][], x: number, y: number): boolean {
    if (x < 0 || y < 0) return false;
    if (x >= arr.length || y >= arr[x].length) return false;
    return arr[x][y].color === color;
  }
};

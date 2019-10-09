import RandomGenerator from "../../helpers/RandomGenerator";
import gameConfig from "../../config/game.config";
import IGameModelElement from "./IGameModelElement";
import States from "./ElementStates";
import GameApplication from "../../GameApplication/GameApplication";

export default class GameModel {
  public static MODEL_CHANGED = 'game-model-changed';
  public static WINS_FINDED = 'game-wins-finded';
  public static NO_WINS_FINDED = 'game-no-wins-finded';

  private _map: IGameModelElement[][];
  
  public app: GameApplication;

  constructor(app: GameApplication) {
    this.app = app;
    // this._map = this.generateGameMap();
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

    for (let i = 0, len = gameMap.length; i < len; i++) {
      for (let j = 0, innerArrLen = gameMap[i].length; j < innerArrLen; j++) {
        if (!gameMap[i] || !gameMap[i][j] || gameMap[i][j].state !== States.Win)
          this.setState(gameMap, i, j);
      }
    }

    this.map = gameMap;
    this.app.stage.emit(GameModel.MODEL_CHANGED);
    return gameMap;
  }

  public findWins() {
    const winsExist = this.map.some(innerArr => innerArr.some(elem => elem.state === 2));
    const event = winsExist ? GameModel.WINS_FINDED : GameModel.NO_WINS_FINDED;
    this.app.stage.emit(event);
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

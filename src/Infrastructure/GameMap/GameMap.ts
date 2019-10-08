import RandomGenerator from "../../helpers/RandomGenerator";
import gameConfig from "../../config/game.config";
import IGameMapModel from "./IGameMapModel";

export default class GameMap {
  private _randomMap: number[][];
  private _map: IGameMapModel[];

  constructor() {
    this._randomMap = RandomGenerator.random2dArray(gameConfig);
  }

  get map(): IGameMapModel[] {
    return this._map;
  }

  set map(map: IGameMapModel[]) {
    this._map = map;
  }

  private calcMap(): IGameMapModel[] {
    const result: IGameMapModel[] = [];

    for (let i = 0, len = this._randomMap.length; i < len; i++) {
      for (let j = 0, innerArrLen = this._randomMap[i].length; j < innerArrLen; j++) {
        
      }
    }

    return result;
  }
};

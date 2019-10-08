import gameConfig from "../config/game.config";
import IGameConfig from "../config/IGameConfig";

export default class RandomGenerator {

  public static minmax(max: number, min: number = 1): number {
    return Math.floor(min + Math.random() * (max - min + 1));
  }

  public static random2dArray({ rowsCount, reelsCount, colorsTypesCount }: IGameConfig): number[][] {
    const gameMap: number[][] = [];

    for (let i = 0; i < reelsCount; i++) {
      const reel: number[] = [];
      
      for (let j = 0; j < rowsCount; j++) {
        reel.push(RandomGenerator.minmax(colorsTypesCount));
      }

      gameMap.push(reel);
    }

    return gameMap;
  }
};

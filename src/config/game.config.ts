import colorsMap from "./colorsMap";

const gameConfig = {
  reelWidth: 160,
  reelsCount: 5,
  rowHeight: 180,
  rowsCount: 3,
  colorsTypesCount: colorsMap.size,
  elemSize: 120,
  shape: 'circle',
  textFillColor: 0xFFFFFF,
  gameTime: 30,
};

export default gameConfig;

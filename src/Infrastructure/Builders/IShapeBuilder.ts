import GameElement from "../../GameObjects/GameElements/GameElement";
import IGameModelElement from "../GameModel/IGameModelElement";

export default interface IShapeBuilder {
  create(modelElement: IGameModelElement, colNumber: number, rowNumber: number): GameElement;
};

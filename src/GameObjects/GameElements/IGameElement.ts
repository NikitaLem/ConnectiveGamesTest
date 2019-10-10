interface IGameElement {
  /**
   * Drop elem by one cell.
   */
  drop(): void;

  /**
   * Make elements active for swap.
   */
  activate(): void;
};

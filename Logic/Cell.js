export const CELL_STATUS = {
  EMPTY: 0,
  BLACK: 1,
  WHITE: 2,
};

export default class Cell {
  status = 0;
  id = Math.random();
}

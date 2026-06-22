import { Ship } from "./ship.js";

class GameBoard {
  ships = new Set();
  constructor() {
    this.board = Array.from({ length: 100 }, () => ({
      hasShip: false,
      shipObj: null,
      isHit: false,
    }));
  }

  placeShip(ship, location, axis) {
    if (!this.isLegalPlacement(ship, location, axis)) {
      return false;
    }
    const length = ship.length;
    const step = axis ? 10 : 1;
    for (let i = 0; i < length; i++) {
      let coordinate = location + i * step;
      let cell = this.board[coordinate];
      cell.hasShip = true;
      cell.shipObj = ship;
    }
    this.ships.add(ship);
    return true;
  }

  isLegalPlacement(ship, location, axis) {
    if (location < 0 || location >= 100) {
      return false;
    }
    const length = ship.length;
    if (axis) {
      // vertical: the last cell must stay on the board
      if (location + (length - 1) * 10 >= 100) {
        return false;
      }
    } else {
      // horizontal: the ship must not cross the right edge into another row
      if ((location % 10) + (length - 1) > 9) {
        return false;
      }
    }
    const step = axis ? 10 : 1;
    for (let i = 0; i < length; i++) {
      let coordinate = location + i * step;
      if (this.board[coordinate].hasShip) {
        return false;
      }
    }
    return true;
  }

  receiveAttack(location) {
    if (location < 0 || location >= 100) {
      return null;
    }

    const cell = this.board[location];

    if (cell.isHit) {
      return null;
    }

    cell.isHit = true;
    if (!cell.hasShip) {
      return false;
    }

    cell.shipObj.hit();
    return true;
  }

  isAttacked(location) {
    if (location < 0 || location >= 100) {
      return true;
    }
    return this.board[location].isHit;
  }

  isAllSunk() {
    for (const ship of this.ships) {
      if (!ship.isSunk()) {
        return false;
      }
    }
    return true;
  }
}

export { GameBoard };

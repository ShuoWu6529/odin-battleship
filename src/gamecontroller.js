import { Ship } from "./module/ship.js";
import { Player } from "./module/player.js";

const SHIP_LENGTHS = [5, 4, 3, 3, 2];

class GameController {
  constructor() {
    this.players = [new Player(), new Player()];
    this.activePlayer = this.players[0];
    this.gameOver = false;
  }

  getHuman() {
    return this.players[0];
  }

  getBot() {
    return this.players[1];
  }

  getActivePlayer() {
    return this.activePlayer;
  }

  getInactivePlayer() {
    return this.activePlayer === this.players[0]
      ? this.players[1]
      : this.players[0];
  }

  switchTurn() {
    this.activePlayer = this.getInactivePlayer();
  }

  getShipLengths() {
    return SHIP_LENGTHS;
  }

  placeShipsRandomly(player) {
    SHIP_LENGTHS.forEach((length) => {
      let placed = false;
      while (!placed) {
        const location = Math.floor(Math.random() * 100);
        const axis = Math.random() < 0.5 ? 0 : 1;
        placed = player.board.placeShip(new Ship(length), location, axis);
      }
    });
  }

  isGameOver() {
    return this.gameOver;
  }

  getWinner() {
    if (!this.gameOver) return null;
    if (this.players[1].board.isAllSunk()) return this.players[0];
    if (this.players[0].board.isAllSunk()) return this.players[1];
    return null;
  }

  playRound(location) {
    const opponent = this.getInactivePlayer();
    const attackRes = opponent.board.receiveAttack(location);

    if (attackRes === null) {
      return false;
    }

    if (opponent.board.isAllSunk()) {
      this.gameOver = true;
      return true;
    }

    this.switchTurn();
    return true;
  }

  computerMove() {
    const opponent = this.getInactivePlayer();
    let location;
    do {
      location = Math.floor(Math.random() * 100);
    } while (opponent.board.isAttacked(location));

    opponent.board.receiveAttack(location);

    if (opponent.board.isAllSunk()) {
      this.gameOver = true;
      return;
    }
    this.switchTurn();
  }
}

export { GameController };

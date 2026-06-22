import { Ship } from "./module/ship.js";
import { GameBoard } from "./module/gameboard.js";
import { Player } from "./module/player.js";

class GameController {
  constructor() {
    real = new Player();
    bot = new Player();
    this.placeShips(real);
    this.placeShips(bot);
    this.players = [real, bot];
    this.activePlayer = players[0];
    this.gameOver = false;
  }

  getActivePlayer() {
    return this.activePlayer;
  }

  getInactivePlayer() {
    return this.activePlayer === players[0] ? players[1] : players[0];
  }

  switchTurn() {
    this.activePlayer =
      this.activePlayer === players[0] ? players[1] : players[0];
  }

  placeShips(player) {
    const ships = [
      new Ship(5),
      new Ship(4),
      new Ship(3),
      new Ship(3),
      new Ship(2),
    ];
    ships.forEach((ship, i) => {
      player.board.placeShip(ship, i, 0);
    });
  }

  isGameOver() {
    return this.gameOver;
  }

  getWinner() {
    if (!gameOver) return null;
    if (computer.gameboard.allShipsSunk()) return this.players[0];
    if (human.gameboard.allShipsSunk()) return this.players[1];
    return null;
  }

  playRound(location) {
    const opponent = this.getInactivePlayer();
    attackRes = opponent.board.receiveAttack(location);

    if (attackRes === null) {
      return false;
    }

    if (opponent.board.isAllSunk()) {
      this.gameOver = true;
      return true;
    }

    this.switchTurn();

    if (this.activePlayer === this.players[1]) {
      this.computerMove();
    }
    return true;
  }

  computerMove() {
    const opponent = getInactivePlayer();
    do {
      location = Math.floor(Math.random() * 100);
    } while (opponent.board.receiveAttack(location) !== null);

    if (opponent.gameboard.allShipsSunk()) {
      gameOver = true;
      return;
    }
    switchPlayerTurn();
  }

  getHuman() {
    return this.players[0];
  }

  getBot() {
    return this.players[1];
  }
}

export { GameController }

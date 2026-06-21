import { Ship } from "./ship.js";

class GameBoard {
    ships = new Set();
    constructor() {
        this.board = Array.from({ length: 100 }, () => ({ hasShip : false, shipObj : null, isHit : false }));
    }

    placeShip(ship, location, axis) {
        if (this.checkCollision(ship, location, axis)) {
            return false;
        }
        const length = ship.length;
        const step = axis ? 10 : 1;
        for (let i = 0; i < length; i++) {
            coordinate = location + i * step;
            cell = this.board[coordinate]; 
            cell.hasShip = true;
            cell.shipObj = ship;
        }
        this.ships.add(ship);
        return true;
    }

    checkCollision(ship, location, axis) {
        const length = ship.length;
        const step = axis ? 10 : 1;
        for (let i = 0; i < length; i++) {
            coordinate = location + i * step;
            cell = this.board[coordinate]; 
            if (cell.hasShip) {
                return true;
            }
        }
        return false;
    }

    receiveAttack(location) {
        if (location < 0 || location >= 100) {
            return false;
        }

        cell = this.board[location];

        if (cell.isHit) {
            return false;
        }

        cell.isHit = true;
        if (!cell.hasShip) {
            return false;
        }

        cell.shipObj.hit();
        return true;
    }

    isAllSunk() {
        this.ships.forEach((ship) => {
            if (!ship.isSunk()) {
                return false;
            }
        });
        return true;
    }
}

export { GameBoard }
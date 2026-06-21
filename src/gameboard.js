import { Ship } from "./ship.js";

class GameBoard {
    constructor() {
        this.board = Array(100).fill(0);
    }

    placeShip(ship, location, axis) {
        const length = ship.length;
        const step = axis ? 10 : 1;
        for (let i = 0; i < length; i++) {
            coordinate = location + i * step;
            this.board[coordinate] = 1; 
        }
    }

}

export { GameBoard }
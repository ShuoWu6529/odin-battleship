import { GameBoard } from "./gameboard.js"
import { Ship } from "./ship.js";

let gameboard;
let ship;
beforeEach(() => {
    gameboard = new GameBoard();
    ship = new Ship(5);
})

test("GameBoard exists", () => {
    expect(gameboard).toBeDefined();
})

test("Check board array", () => {
    const arr = Array(100).fill(0);
    expect(gameboard.board).toEqual(arr);
})

test("Place a ship", () => {
    gameboard.placeShip(ship, 2, 0);
    const board = gameboard.board;
    expect(board.slice(2, 7)).toEqual(Array(5).fill(1));
})



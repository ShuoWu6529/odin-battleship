import { GameBoard } from "../module/gameboard.js";
import { Ship } from "../module/ship.js";

let gameboard;
let ship;
beforeEach(() => {
  gameboard = new GameBoard();
  ship = new Ship(5);
});

test("GameBoard exists", () => {
  expect(gameboard).toBeDefined();
});

test("Check board array", () => {
  const arr = Array.from({ length: 100 }, () => ({
    hasShip: false,
    shipObj: null,
    isHit: false,
  }));
  expect(gameboard.board).toEqual(arr);
});

test("Place a ship", () => {
  gameboard.placeShip(ship, 2, 0);
  const board = gameboard.board;
  const arr = Array.from({ length: 5 }, () => ({
    hasShip: true,
    shipObj: ship,
    isHit: false,
  }));
  expect(board.slice(2, 7)).toEqual(arr);
});

test("Place a ship on the y-axis", () => {
  gameboard.placeShip(ship, 1, 1);

  const board = gameboard.board;
  const width = 10;
  const location = 1;

  const occupied = Array.from(
    { length: ship.length },
    (_, i) => board[location + i * width],
  );

  const arr = Array.from({ length: 5 }, () => ({
    hasShip: true,
    shipObj: ship,
    isHit: false,
  }));
  expect(occupied).toEqual(arr);
});

test("Check ship receiving attack", () => {
  gameboard.placeShip(ship, 2, 0);
  expect(gameboard.receiveAttack(2)).toBeTruthy();
  expect(ship.hits).toBe(1);
});

test("Check all ship is sunk", () => {
  gameboard.placeShip(ship, 2, 0);
  for (let i = 0; i < ship.length; i++) {
    gameboard.receiveAttack(2 + i);
  }
  expect(gameboard.isAllSunk()).toBeTruthy();
});

test("Collision checking", () => {
  const newShip = new Ship(3);
  gameboard.placeShip(ship, 2, 0);
  expect(gameboard.placeShip(newShip, 1, 0)).toBeUndefined();
});

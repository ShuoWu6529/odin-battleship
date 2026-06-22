import { Player } from "../module/player.js"
import { GameBoard } from "../module/gameboard.js";

let player;
let board
beforeEach(() => {
    board = new GameBoard();
    player = new Player(board);
})

test("Check player exists", () => {
    expect(player).toBeDefined();
})

test("Check player board", () => {
    expect(player.board).toBe(board);
})
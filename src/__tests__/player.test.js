import { Player } from "../module/player.js";

let player;
beforeEach(() => {
  player = new Player();
});

test("Check player exists", () => {
  expect(player).toBeDefined();
});

test("Check player board", () => {
  expect(player.board).toBeDefined();
});

import { experiments } from "webpack";
import { Ship } from "../module/ship.js";

let ship;

beforeEach(() => {
  ship = new Ship(2);
});

test("Ship Exists", () => {
  expect(ship).toBeDefined();
});

test("Get Ship length", () => {
  expect(ship.length).toBe(2);
});

test("Get hits", () => {
  expect(ship.hits).toBe(0);
});

test("Hit functionality", () => {
  ship.hit();
  ship.hit();
  expect(ship.hits).toBe(2);
});

test("check ship sunkness", () => {
  expect(ship.isSunk()).toBeFalsy();
});

test("check ship sunkness 2", () => {
  ship.hit();
  ship.hit();
  expect(ship.isSunk()).toBeTruthy();
});

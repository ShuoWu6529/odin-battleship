# Odin Battleship

A browser-based implementation of the classic Battleship game, built as part of [The Odin Project](https://www.theodinproject.com/) curriculum. Play against a computer opponent on a 10×10 grid.

## Features

- Manual ship placement — click to position each of your 5 ships, with a rotate button to toggle between horizontal and vertical orientation.
- Computer opponent with randomly placed ships and random attacks.
- Turn-based attack phase: hits, misses, and sunk ships are tracked and rendered.
- Win detection when one player's entire fleet is sunk.
- Test-driven core (ship, gameboard, and player logic) with Jest.

## Gameplay

1. Place your fleet of 5 ships (lengths 5, 4, 3, 3, 2) by clicking a cell to set the top/left position. Use the **Rotate** button to switch orientation.
2. Once all ships are placed, the attack phase begins. Click a cell on the enemy board to fire.
3. The computer takes its turn automatically after each of your shots.
4. The first player to sink the opponent's entire fleet wins.

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server (opens a live-reloading dev build):

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Run the test suite:

```bash
npm test
```

Deploy the contents of `dist/` to GitHub Pages:

```bash
npm run deploy
```

## Project Structure

```
src/
├── index.js              # Entry point — wires up the DOM
├── dom.js                # Rendering and UI event handling
├── gamecontroller.js     # Game flow: turns, ship placement, win logic
├── template.html         # Page markup
├── styles.css            # Styling
├── module/
│   ├── ship.js           # Ship: length, hit tracking, sunk state
│   ├── gameboard.js      # GameBoard: placement, attacks, fleet status
│   └── player.js         # Player: owns a gameboard
└── __tests__/            # Jest unit tests
```

## Built With

- JavaScript (ES modules)
- [Webpack](https://webpack.js.org/) — bundling and dev server
- [Jest](https://jestjs.io/) — testing
- [Babel](https://babeljs.io/), ESLint, and Prettier — tooling

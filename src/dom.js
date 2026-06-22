import { Ship } from "./module/ship.js";

function renderBoard(board, container, { showShips }) {
  container.replaceChildren();
  board.board.forEach((cell, index) => {
    const cellEl = document.createElement("div");
    cellEl.classList.add("cell");
    cellEl.dataset.index = index;

    if (cell.isHit && cell.hasShip) {
      cellEl.classList.add("hit");
    } else if (cell.isHit) {
      cellEl.classList.add("miss");
    } else if (cell.hasShip && showShips) {
      cellEl.classList.add("ship");
    }

    container.appendChild(cellEl);
  });
}

function initGame(controller) {
  const human = controller.getHuman();
  const bot = controller.getBot();
  const shipLengths = controller.getShipLengths();

  controller.placeShipsRandomly(bot);

  const playerBoardEl = document.querySelector("#player-board");
  const enemyBoardEl = document.querySelector("#enemy-board");
  const statusEl = document.querySelector("#status");
  const rotateBtn = document.querySelector("#rotate-btn");

  let phase = "placement";
  let placementIndex = 0;
  let axis = 0; // 0 = horizontal, 1 = vertical

  const render = () => {
    renderBoard(human.board, playerBoardEl, { showShips: true });
    renderBoard(bot.board, enemyBoardEl, { showShips: false });
  };

  const placementStatus = () => {
    const length = shipLengths[placementIndex];
    const orientation = axis ? "vertical" : "horizontal";
    statusEl.textContent = `Place your ship (length ${length}) - ${orientation}. Click a cell to set its top/left.`;
  };

  const startAttackPhase = () => {
    phase = "attack";
    rotateBtn.style.display = "none";
    statusEl.textContent = "Your turn — attack the enemy waters!";
  };

  const announceWinner = () => {
    const winner = controller.getWinner();
    statusEl.textContent =
      winner === human ? "You win!" : "The computer wins.";
  };

  rotateBtn.addEventListener("click", () => {
    if (phase !== "placement") return;
    axis = axis ? 0 : 1;
    placementStatus();
  });

  playerBoardEl.addEventListener("click", (event) => {
    if (phase !== "placement") return;
    const cell = event.target.closest(".cell");
    if (!cell) return;

    const location = Number(cell.dataset.index);
    const length = shipLengths[placementIndex];
    const placed = human.board.placeShip(new Ship(length), location, axis);
    if (!placed) return;

    placementIndex += 1;
    render();

    if (placementIndex >= shipLengths.length) {
      startAttackPhase();
    } else {
      placementStatus();
    }
  });

  enemyBoardEl.addEventListener("click", (event) => {
    if (phase !== "attack" || controller.isGameOver()) return;
    if (controller.getActivePlayer() !== human) return;

    const cell = event.target.closest(".cell");
    if (!cell) return;

    const location = Number(cell.dataset.index);
    const moved = controller.playRound(location);
    if (!moved) return;

    render();
    if (controller.isGameOver()) {
      announceWinner();
      return;
    }

    controller.computerMove();
    render();
    if (controller.isGameOver()) {
      announceWinner();
    }
  });

  render();
  placementStatus();
}

export { initGame, renderBoard };

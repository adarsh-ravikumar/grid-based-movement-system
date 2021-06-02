let screen = document.getElementById("screen");
let grid = document.getElementById("boxes");
let player = document.getElementById("player");
let hasMoved = false;
let max;
let currentPos;

let screenSettings = {
  width: 550,
  height: 550,
};

//Can only use values that are divisible by the screen's reselution
let playerSettings = {
  left: 5,
  top: 5,
  width: 50,
  height: 50,
};

screen.style.display = "grid";

screen.style.gridTemplateColumns = `repeat(${
  screenSettings.width / playerSettings.width
}, ${playerSettings.width}px)`;

screen.style.gridTemplateRows = `repeat(${
  screenSettings.height / playerSettings.height
}, ${playerSettings.height}px)`;

grid.style.display = "grid";

grid.style.gridTemplateColumns = `repeat(${
  screenSettings.width / playerSettings.width
}, ${playerSettings.width}px)`;

grid.style.gridTemplateRows = `repeat(${
  screenSettings.height / playerSettings.height
}, ${playerSettings.height}px)`;

function Player() {
  player.style.left = `${playerSettings.left * 100}%`;
  player.style.top = `${playerSettings.top * 100}%`;

  max = [
    screenSettings.width / playerSettings.width - 1,
    screenSettings.height / playerSettings.height - 1,
  ];
  currentPos = [playerSettings.left, playerSettings.top];
}

function drawGrid() {
  for (i = 0; i < 121; i++) {
    let gridBox = document.createElement("div");
    gridBox.style.border = "solid #103541";
    grid.appendChild(gridBox);
  }
}

function GameObjects() {
  Player();
}

//#region Controlled snappy movement

function keyDown(e) {
  //Up
  if (
    (e.keyCode == 38 && hasMoved == false) ||
    (e.keyCode == 87 && hasMoved == false)
  ) {
    if (currentPos[1] != 0 || currentPos < 0) {
      playerSettings.top -= 1;
      hasMoved = true;
    }
  }

  //Down
  if (
    (e.keyCode == 40 && hasMoved == false) ||
    (e.keyCode == 83 && hasMoved == false)
  ) {
    if (currentPos[1] < max[1]) {
      playerSettings.top += 1;
      hasMoved = true;
    }
  }

  //Left
  if (
    (e.keyCode == 39 && hasMoved == false) ||
    (e.keyCode == 68 && hasMoved == false)
  ) {
    if (currentPos[0] < max[0]) {
      playerSettings.left += 1;
      hasMoved = true;
    }
  }

  //Right
  if (
    (e.keyCode == 37 && hasMoved == false) ||
    (e.keyCode == 65 && hasMoved == false)
  ) {
    if (currentPos[0] != 0 || currentPos[0] < 0) {
      playerSettings.left -= 1;
      hasMoved = true;
    }
  }
}

function keyUp(e) {
  if (e.keyCode == 38 || e.keyCode == 87) hasMoved = false;
  if (e.keyCode == 40 || e.keyCode == 83) hasMoved = false;
  if (e.keyCode == 39 || e.keyCode == 68) hasMoved = false;
  if (e.keyCode == 37 || e.keyCode == 65) hasMoved = false;
}

//#endregion

function Update() {
  GameObjects();
  requestAnimationFrame(Update);
}

Update();
drawGrid();

document.addEventListener("keydown", keyDown);
document.addEventListener("keyup", keyUp);

var canvas = document.getElementById("myCanvas");
var title = document.getElementById("pageTitle");
var gamepadconnected;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
};

window.addEventListener("resize", resizeCanvas);

resizeCanvas();

var context = canvas.getContext("2d");
var imageObj = new Image();
var x = 0;
var lastTimeStamp;
var buttonleft = false;
var buttonright = false;

imageObj.onload = function () {
  lastTimeStamp = document.timeline.currentTime;
  window.requestAnimationFrame(gameLoop);
};

function gameLoop(timeStamp) {
  timestep = timeStamp - lastTimeStamp;
  title.innerHTML = (1000/timestep).toFixed(0);

  if (gamepadconnected) {
    const gamepads = navigator.getGamepads();

    // Operate with the gamepad: read button values, perform actions, etc.
    // Example: log message while Start button in first gamepad is pressed
    buttonleft = gamepads[0].buttons[14].pressed;
    buttonright = gamepads[0].buttons[15].pressed;  
  }
  draw(timestep);
  lastTimeStamp = timeStamp;
  window.requestAnimationFrame(gameLoop);
}

function draw(timestep) {
  x += (buttonright*timestep - buttonleft*timestep)/2;
  if (buttonright) console.log(x);

  if (x < 0) x = 0;
  if (x >= canvas.width) x = canvas.width;
  context.drawImage(imageObj, x, 50);
}

imageObj.src = "Χαρακτήρες/Γουίπι.jpg ";

document.addEventListener("keydown", (event) => {
  const keyName = event.key;
  if (keyName == "ArrowRight" || keyName == "ControlRight") buttonright = true;
  if (keyName == "ArrowLeft" || keyName == "AltRight") buttonleft = true;
});
document.addEventListener("keyup", (event) => {
  const keyName = event.key;
  if (keyName == "ArrowRight" || keyName == "ControlRight") buttonright = false;
  if (keyName == "ArrowLeft" || keyName == "AltRight") buttonleft = false;
});

window.addEventListener("gamepadconnected", (event) => {
    gamepadconnected = true;
    console.log("Gamepad connected:", event.gamepad.id);
});

window.addEventListener("gamepaddisconnected", (event) => {
    gamepadconnected = false;
    console.log("Gamepad disconnected:", event.gamepad.id);
});




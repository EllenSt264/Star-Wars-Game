const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");    // This will give us access to building canvas methods
canvas.width = 800;
canvas.height = 500;

// We will use this array to keep track of what keys the user pressing on the keyboard using key and key down event listeners 
const key = [];

const player = {
    x: 0,               // player's horizontal position on the x axis
    y: 0,               // player's vertical position on the y axis
    width: 40,           // width will have to be calculated based on what spritesheet we use
    height: 72,          // height will have to be calculated based on what spritesheet we use
    frameX: 0,          // the horizontal coordinate of frame we cut out from our sprite sheet
    frameY: 0,          // the vertical coordinate of frame we cut out from our sprite sheet
    speed: 9,           // how many pixels we move per frame
    moving: false       // we will use this value to switch between standing and walking animation
}

const playerSprite = new Image();
playerSprite.src = "../assets/spritesheet/chewie.png";
const background = new Image();
background.src = "../assets/img/background.png";

// Need to tell JavaScript what image we want to draw and where we want to draw it 
// But for playerSprite we also need to tell JS what area from the sprite sheet to crop out,
// to show only a particular frame
function drawSprite(img, sX, sY, sW, sH, dX, dY, dW, dH) {
    ctx.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH);
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);   // clear entire canvas between every animation frame
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    drawSprite(playerSprite, 0, 0, player.width, player.height, 200, 200, player.width, player.height);
    requestAnimationFrame(animate);
}

animate();
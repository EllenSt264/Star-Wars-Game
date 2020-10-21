const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");    // This will give us access to building canvas methods
canvas.width = 800;
canvas.height = 500;

// We will use this array to keep track of what keys the user pressing on the keyboard using key and key down event listeners 
const keys = [];

const player = {
    x: 200,               // player's horizontal position on the x axis
    y: 300,               // player's vertical position on the y axis
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
    drawSprite(playerSprite, 0, 0, player.width, player.height, player.x, player.y, player.width, player.height);
    movePlayer();   // need to call this function to see the character move (defined below)
    requestAnimationFrame(animate);
}

animate();

// Keyup/ KeyDown Event listeners

window.addEventListener("keydown", function(e) {   // e stands for built in event object passed as an attribute
    keys[e.keyCode] = true;     // whenever a key is pressed, we add that key into our keys array
});

window.addEventListener("keyup", function(e) {   // e stands for built in event object passed as an attribute
    delete keys[e.keyCode];     // when we release a button and keyup occurs, we remove that button from the keys array
});


// Move player

function movePlayer() {
    if (keys[38] && player.y > 100) {      // 38 is the keycode for the up arrow key // player.y>100 prevents the character from leaving the page
        player.y -= player.speed;   // moves character in the negative direction along the vertical y-axis
    }
}
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
    speed: 4,           // how many pixels we move per frame
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

// Keyup/ KeyDown Event listeners

window.addEventListener("keydown", function(e) {   // e stands for built in event object passed as an attribute
    keys[e.keyCode] = true;     // whenever a key is pressed, we add that key into our keys array
    player.moving = true;
});

window.addEventListener("keyup", function(e) {   // e stands for built in event object passed as an attribute
    delete keys[e.keyCode];     // when we release a button and keyup occurs, we remove that button from the keys array
    player.moving = false;
});


// Move player

function movePlayer() {
    if (keys[38] && player.y > 100) {      // 38 is the keycode for the up arrow key // player.y>100 prevents the character from leaving the page
        player.y -= player.speed;   // moves character in the negative direction along the vertical y-axis
        player.frameY = 3;      // will change the animation row of the sprite to display the character walking up
        player.moving = true;
    }
    if (keys[37] && player.x > 0) {     // 37 is the keycode for left arrow key
        player.x -= player.speed;
        player.frameY = 1;
        player.moving = true;
    }
    if (keys[40] && player.y < canvas.height - player.height) {     // 40 is the keycode for down arrow key
        player.y += player.speed;
        player.frameY = 0;
        player.moving = true;
    }
    if (keys[39] && player.x < canvas.width - player.width) {     // 39 is the keycode for right arrow key
        player.x += player.speed;
        player.frameY = 2;
        player.moving = true;
    }   
}

// For the walking animation

function handlePlayerFrame() {
    if (player.frameX < 3 && player.moving) {    // because our spritesheet has four collumns, starting from 0
        player.frameX ++;
    }
    else {
        player.frameX = 0;
    }      
}

let fps, fpsInterval, startTime, now, then, elapsed;

function startAnimation(fps) {
    fpsInterval = 1000/fps;
    then = Date.now();
    startTime = then;
    animate();                                                                                                                                                                  
}

function animate() {
    requestAnimationFrame(animate);
    now = Date.now();
    elapsed = now - then;
    if (elapsed >fpsInterval) {
        then = now - (elapsed % fpsInterval);
        ctx.clearRect(0, 0, canvas.width, canvas.height);   // clear entire canvas between every animation frame
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
        drawSprite(playerSprite, player.width * player.frameX, player.height * player.frameY, 
        player.width, player.height, player.x, player.y, player.width, player.height);
        movePlayer();   // need to call this function to see the character move (defined below)
        handlePlayerFrame();
    }
}

startAnimation(30);
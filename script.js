var ball = document.getElementById("ball");
var game = document.getElementById("wrapper");

let interval;
var both = 0;
let leftLimit = 0;
let rightLimit = 480;
var cnt = 0;
var blocks = [];
var levelDuration = 0;
var level=1;
var speed = 0.5;
var highestLevel = 1;

highestLevel = parseInt(document.cookie.split(':')[1]) || 1;
document.getElementById("highest").innerText  = document.cookie;

function moveLeft() {
    var moveX = parseInt(window.getComputedStyle(ball).getPropertyValue("left"));
    if(moveX > leftLimit){
        ball.style.left = moveX - 2 + "px";
    }
}

function moveRight() {
    var moveX = parseInt(window.getComputedStyle(ball).getPropertyValue("left"));
    if(moveX < rightLimit){
        ball.style.left = moveX + 2 + "px";
    }
}

function moveUp() {
    var top = parseInt(window.getComputedStyle(ball).getPropertyValue("top"));
    ball.style.top = top - 2 + "px";
}

function moveDown() {
    var top = parseInt(window.getComputedStyle(ball).getPropertyValue("top"));
    ball.style.top = top + 2 + "px";
}

document.addEventListener("keydown", event => {
    if(both==0){
        both++;
        if(event.key === "ArrowLeft"){
            interval = setInterval(moveLeft, 1);
        }
        if(event.key === "ArrowRight"){
            interval = setInterval(moveRight, 1);
        }
        // if(event.key === "ArrowUp"){
        //     interval = setInterval(moveUp, 1);
        // }
        // if(event.key === "ArrowDown"){
        //     interval = setInterval(moveDown, 1);
        // }
    }
});

document.addEventListener("keyup", event => {
    clearInterval(interval);
    both = 0;
});

var Game = setInterval(()=>{
    var lastBlock = document.getElementById("block"+(cnt - 1));
    var lastHole = document.getElementById("hole"+(cnt - 1));

    if(cnt > 0){
        var lastBlockTop = parseInt(window.getComputedStyle(lastBlock).getPropertyValue("top"));
        var lastHoleTop = parseInt(window.getComputedStyle(lastHole).getPropertyValue("top"));

    }

    if(lastBlockTop < 500 || cnt == 0){
        var block = document.createElement("div");
        var hole = document.createElement("div");
        block.setAttribute("class","block");
        hole.setAttribute("class","hole");
        block.setAttribute("id","block"+cnt);
        hole.setAttribute("id","hole"+cnt);

        block.style.top = lastBlockTop + 100 + "px";
        hole.style.top = lastHoleTop + 100 + "px";


        var random = Math.floor(Math.random() * 360);
        hole.style.left = random + "px";

        game.appendChild(block);
        game.appendChild(hole);
        blocks.push(cnt);
        cnt++;
    }

    var ballTop = parseInt(window.getComputedStyle(ball).getPropertyValue("top"));
    var ballLeft = parseInt(window.getComputedStyle(ball).getPropertyValue("left"));
    var drop = 0;

    if(ballTop <= 0){
        alert("Game over!!! Score is "+ (level));
        clearInterval(Game);
        document.cookie = "HIGHEST LEVEL REACHED:" + highestLevel;
        // window.location.reload();
    }

    for(let i = 0; i<blocks.length;i++){
        let currentBlock = blocks[i];
        let iblock = document.getElementById("block"+currentBlock);
        let ihole = document.getElementById("hole"+currentBlock);

        let iblockTop = parseFloat(window.getComputedStyle(iblock).getPropertyValue("top"));
        let iholeLeft = parseFloat(window.getComputedStyle(ihole).getPropertyValue("left"));

        iblock.style.top = iblockTop - speed + "px";
        ihole.style.top = iblockTop - speed + "px";

        if(iblockTop < 0){
            blocks.shift();
            iblock.remove();
            ihole.remove();
        }
        if(iblockTop - 20 < ballTop && iblockTop > ballTop){
            drop++;
            if(iholeLeft <= ballLeft && iholeLeft + 20 >= ballLeft){
                drop = 0;
            }
        }
    }

    if(drop == 0 && ballTop < 580){
        ball.style.top = ballTop + 5 + "px";
    }
    else{
        ball.style.top = ballTop - 0.5 + "px";
    }

    levelDuration++;
    if(levelDuration == 3000 && level < 10){
        level++;
        speed += 0.1;
        document.getElementById("level").innerText = "LEVEL:" +level;
        levelDuration = 0;
        highestLevel = Math.max(level, highestLevel);
    }
},1);




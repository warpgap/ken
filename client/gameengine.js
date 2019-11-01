var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var Is;
var Js;
var Ks;
var Ls;

var Ws;
var As;
var Ss;
var Ds;

var DownA;
var UpA;
var LeftA;
var RightA;

var Space;
var MouseX;
var MouseY;

canvas.width = window.innerWidth * 0.99;
canvas.height = window.innerHeight * 0.96;

/*
var rect1 = new rectSprite(1, 150, 50, 50, "#8B0000", 0);  // red
var rect2 = new rectSprite(350, 0, 50, 50, "#b3ccff", 0);	// blue
var rect3 = new rectSprite(250, 60, 50, 50, "#ffff00", 0);  // yelllow
var rect4 = new rectSprite(0, 250, 50, 50, "#00cc00", 0);  // green

var allRects = [rect1, rect2, rect3, rect4];
*/
var tank1 = new tankPlayer(500, 400, 25, "#8B0000", 30);  // red
tank1.name = "player 1"
var tank2 = new tankPlayer(500, 400, 25, "#8B0000", 30);  // red
tank2.name = "player 2"








class bulletSprite {
    constructor(x, y, radius, start, end, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.start = start;
        this.end = end;
        this.color = color;
        this.velX = 0;
        this.velY = 0;
    }

    draw() {
        this.x = this.x + this.velX;
        this.y = this.y + this.velY;

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, this.start, this.end);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }
}

function tankPlayer(x, y, radius, color, angle)    //tankplayer IS NOT an OBJECT!!!        IT IS A CLASS..    THE REAL THING IS tank1
{
    var tempcolor;
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.angle = angle;
    this.rotationSpeed = 0;
    this.forwardSpeed = 0;
    this.health = 5;
    this.color;
    this.name;
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    this.x1;
    this.y1;
    this.xNew;
    this.yNew;
    this.x2;
    this.y2;

    this.draw = function () {

        this.x1 = this.radius * Math.sin((this.angle - 45) * (Math.PI / 180));
        this.y1 = -this.radius * Math.cos((this.angle - 45) * (Math.PI / 180));

        this.x2 = this.radius * Math.sin((this.angle + 45) * (Math.PI / 180));
        this.y2 = -this.radius * Math.cos((this.angle + 45) * (Math.PI / 180));

        this.x3 = -this.x1;
        this.y3 = -this.y1;

        this.x4 = -this.x2;
        this.y4 = -this.y2;

        this.colorHealth();

        ctx.beginPath();
        ctx.moveTo(this.x1 + this.x, this.y1 + this.y);
        ctx.strokeStyle = "#FF0000";
        ctx.lineWidth = 10;
        ctx.lineTo(this.x2 + this.x, this.y2 + this.y);
        ctx.closePath();
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(this.x2 + this.x, this.y2 + this.y);
        ctx.strokeStyle = "#000";
        ctx.lineTo(this.x3 + this.x, this.y3 + this.y);
        ctx.lineTo(this.x4 + this.x, this.y4 + this.y);
        ctx.lineTo(this.x1 + this.x, this.y1 + this.y);
        ctx.fillStyle = tempcolor; 
        ctx.fill();
        ctx.stroke();

        ctx.font = "10px Arial";
        ctx.fillText(this.name, this.x-30, this.y-40);
    }

    this.colorHealth = function() {
        if(this.health == 1){
            tempcolor = '#FF0000';
        }
        if(this.health == 2){
            tempcolor = '#FF8B00';  
        }
        if(this.health == 3){
            tempcolor = '#F7FF00';  
        }
        if(this.health == 4){
            tempcolor = '#6CFF00';  
        }
        if(this.health == 5){
            tempcolor = '#00FF08';  
            console.log(this.health);
        }
    }

 

    // this.startRotate = function(rotationSpeed) {
    //     this.rotationSpeed = rotationSpeed;
    // }

    // this.stopRotate = function(rotationSpeed) {
    //     this.rotationSpeed = 0;
    // }
}


/*
function rectSprite(x, y, width, height, color, angle) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    this.draw = function () {
        ctx.beginPath();		//middle ship
        ctx.rect(this.x, this.y, width, height);
        ctx.fillStyle = color;
        ctx.fill();
        ctx.closePath();
    }

    this.move = function () {

    }
}
*/

var bullet1 = new bulletSprite(25, 25, 10, 0, 2 * Math.PI, "#97F5FF"); // lightblue
var bullet2 = new bulletSprite(25, 25, 10, 0, 2 * Math.PI, "#97F5FF"); // lightblue



function updateGameArea() {
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    /*
    check_all_collisions();
    for (step = 0; step < allRects.length; step++) {
    allRects[step].draw()
    }
    */
    //the script for rect2's bullet is down bellow this comment
    bullet1.draw();
    //ColorHeath('player1Health');

    tank1.draw();
    tank2.draw();
}











function check_pair_collision(sprite1, sprite2) {

    var xCol = false;
    var yCol = false;

    // Check X-axis Collision
    if (sprite1.x < sprite2.x) {
        if (sprite2.x - sprite1.x < sprite1.width) {
            xCol = true;
        }
    }
    else {
        if (sprite1.x - sprite2.x < sprite2.width) {
            xCol = true;
        }
    }

    // Check y-axis collision
    if (sprite1.y < sprite2.y) {
        if (sprite2.y - sprite1.y < sprite1.height) {
            yCol = true;
        }
    }
    else {
        if (sprite1.y - sprite2.y < sprite2.height) {
            yCol = true;
        }
    }

    if (xCol && yCol) {
        return true;
    }
    else {
        return false;
    }
}

function KeyDownFunc() {
    if (event.keyCode == 32) {
        Space = "down";
    }

    //tank's movement
    if (event.keyCode == 73)//i
    {
        socket.emit('chat message', 'Pressed [I]')
        //tank1.forwardSpeed = 1;
    }
    if (event.keyCode == 74)//j
    {
        socket.emit('chat message', 'Pressed [J]')
        //tank1.rotationSpeed = -1;
    }
    if (event.keyCode == 75)//k
    {
        socket.emit('chat message', 'Pressed [K]')
        //tank1.forwardSpeed = -1;
    }
    if (event.keyCode == 76)//l
    {
        socket.emit('chat message', 'Pressed [L]')
        //tank1.rotationSpeed = 1;
    }

}

function KeyUpFunc() {
    if (event.keyCode == 73) {
        //tank1.forwardSpeed = 0;
        socket.emit('chat message', 'Released [I]')
    }
    if (event.keyCode == 74) {
        socket.emit('chat message', 'Released [J]')
        //tank1.stopRotate();
    }
    if (event.keyCode == 75) {
        socket.emit('chat message', 'Released [K]')
        //tank1.forwardSpeed = 0;
    }
    if (event.keyCode == 76) {
        socket.emit('chat message', 'Released [L]')
        //tank1.stopRotate();
    }
    ////////////////



    //==========================================================================//

    if (event.keyCode == 38) {
        UpA = "up";
    }
    if (event.keyCode == 32) {
        Space = "up";
    }
    if (event.keyCode == 37) {
        LeftA = "up";
    }
    if (event.keyCode == 39) {
        RightA = "up";
    }
    if (event.keyCode == 40) {
        DownA = "up";
    }

    //=========================================================================================//

    if (event.keyCode == 87) {
        Ws = "up";
    }
    if (event.keyCode == 65) {
        As = "up";
    }
    if (event.keyCode == 68) {
        Ds = "up";
    }
    if (event.keyCode == 83) {
        Ss = "up";
    }

}

function move() {
    if (Ws == "down") {
        rect2.y = rect2.y - 1;
    }

    if (As == "down") {
        rect2.x = rect2.x - 1;
    }
    if (Ds == "down") {
        rect2.x = rect2.x + 1;
    }
    if (Ss == "down") {
        rect2.y = rect2.y + 1;
    }
    //Up here are WASD code.
    //Down here are the arrow keys.
    if (UpA == "down") {
        rect1.y = rect1.y - 1;
    }

    if (LeftA == "down") {
        rect1.x = rect1.x - 1;
    }
    if (RightA == "down") {
        rect1.x = rect1.x + 1;
    }
    if (DownA == "down") {
        rect1.y = rect1.y + 1;
    }
    //Up here are the arrow keys.
    //Down here are the IJKL keys.



}

function FindMousePos(event) {
    //console.log(event.clientX + " x");
    MouseX = event.clientX;
    MouseY = event.clientY;
}










function MouseDown(event) {
    var mouseXY = {
        X : event.clientX,
        Y : event.clientY,
    }
    
    socket.emit("Clicked", mouseXY)
}
function MouseUp() {
    mouse = "up";
}
socket = io();
socket.on('Player 1 Health', function(msg){
console.log(msg + '  from server')
tank1.health = msg;
})
socket.on('Player 2 Health', function(msg){
    console.log(msg + '  from server')
    tank2.health = msg;
    })


socket.on('X Pos1', function(msg){
    tank1.x = msg;
})
socket.on('Y Pos1', function(msg){
    tank1.y = msg;
})
socket.on('Angle1', function(msg){
    tank1.angle = msg;
})

socket.on('X Pos2', function(msg){
    tank2.x = msg;
})
socket.on('Y Pos2', function(msg){
    tank2.y = msg;
})
socket.on('Angle2', function(msg){
    tank2.angle = msg;
})

socket.on('bullet1Pos', function(pos){
    bullet1.x = pos.X;
    bullet1.y = pos.Y;
    bullet1.draw();
})
socket.on('bullet2Pos', function(pos){
    bullet2.x = pos.X;
    bullet2.y = pos.Y;
    bullet2.draw();
})








setInterval(updateGameArea, 20);
document.addEventListener('keydown', KeyDownFunc);
document.addEventListener('keyup', KeyUpFunc);
document.addEventListener("mousemove", function (event) { FindMousePos(event); });
document.addEventListener("mousedown", MouseDown);
document.addEventListener("mouseup", MouseUp);
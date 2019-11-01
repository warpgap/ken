const express = require('express') //import libary 
const app = express() //write down in object
const port =  4000

var player1 = null;
var player2 = null;

var path = require('path');
//
var testvar = 0;

app.use(express.static('public'))
//app.get('/', (req, res) => res.sendFile(circle) ) //send hello world to client 

//app.get('/gamesource', (req, res) => res.sendFile('/client/gameengine.js') )
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/client/KEN3.html'));
});
app.get('/gamesource', function(req, res) {
    res.sendFile(path.join(__dirname + '/client/gameengine.js'));
});



const server = require('http').Server(app);
const io = require('socket.io')(server);

io.on('connection', function(socket) {

    console.log('user  ' + socket.id + '  connected')

    if (player1 == null) {
        player1 = socket.id;
    }
    else if (player2 == null) {
        player2 = socket.id;
    }

    socket.on('disconnect', function(){
        console.log('user  ' + socket.id + "  disconnect");
        if(player1 == socket.id)
        {
            player1 = null;
        }
        else{
            player2 = null;
        }
        
    })

    socket.on('chat message', function(msg){
        console.log('message:' + msg + "  from  " + socket.id);
        var temp
        if (socket.id == player1) {
            temp = tank1;
        }
        else {
            temp = tank2;
        }
        //io.emit('chat message', msg)
        if(msg == 'Released [I]'){
            temp.forwardSpeed = 0;
        }  
        if(msg == 'Pressed [I]'){
            temp.forwardSpeed = 5;
        }
        if(msg == 'Released [K]'){
            temp.forwardSpeed = 0;
        }  
        if(msg == 'Pressed [K]'){
            temp.forwardSpeed = -5;
        }
        if(msg == 'Pressed [J]'){
            temp.rotationSpeed = -5;
        }
        if(msg == 'Released [J]'){
            temp.rotationSpeed = 0;
        }
        if(msg == 'Pressed [L]'){
            temp.rotationSpeed = 5;
        }
        if(msg == 'Released [L]'){
            temp.rotationSpeed = 0;
        }
    });
    socket.on("Clicked", function(msg) {
        var playerTank;
        if(socket.id == player1){
            temp = bullet1;
            playerTank = tank1
        }
        else{
            temp = bullet2;
            playerTank = tank2
        }
        
        temp.shoot(playerTank.x , playerTank.y , msg.X, msg.Y);
    })
});     





//this is the engne copy

var tank1 = new tankPlayer(500,400, 25, "#8B0000", 30);  // red
tank1.name = "player 1"
var tank2 = new tankPlayer(500,300, 25, "#8B0000", 30);  // red
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
        this.active = 0;
        this.health = 5;
    }

    draw() {

        this.x = this.x + this.velX;
        this.y = this.y + this.velY;
    }

    shoot(originX, originY, targetX, targetY) {
        this.x = originX;
        this.y = originY;
        var BulletSpeed = 8;
        var a = (targetX - this.x);
        var b = (targetY - this.y);
        var magnitude = Math.sqrt( Math.pow(a,2) + Math.pow(b,2) )
        var scaler = BulletSpeed/magnitude;
        this.velX = a*scaler;
        this.velY = b*scaler;
        this.active = 1;
    }
}
bullet1 = new bulletSprite(25, 25, 10, 0, 2 * Math.PI, "#97F5FF"); // lightblue
bullet2 = new bulletSprite(25, 25, 10, 0, 2 * Math.PI, "#97F5FF"); // lightblue
function tankPlayer( x, y, radius, color, angle)    //tankplayer IS NOT an OBJECT!!!        IT IS A CLASS..    THE REAL THING IS tank1
        {
            this.x = x;
            this.y = y;
            this.radius = radius;
            this.angle = angle;
            this.rotationSpeed = 0;
            this.forwardSpeed = 0;
            this.health = 5;
            this.name;

            this.x1;
            this.y1;
            this.xNew;
            this.yNew;
            this.x2;
            this.y2; 
            this.draw = function() {
                this.angle = this.angle + this.rotationSpeed;


                this.x = this.x +  this.forwardSpeed  * Math.sin( (this.angle) * ( Math.PI / 180) )
                this.y = this.y -  this.forwardSpeed  * Math.cos( (this.angle) * ( Math.PI / 180) )

                this.x1 = this.radius * Math.sin( (this.angle-45) * ( Math.PI / 180) );
                this.y1 = -this.radius * Math.cos( (this.angle-45) * ( Math.PI / 180) ) ;

                this.x2 = this.radius * Math.sin( (this.angle+45) * ( Math.PI / 180) ) ;
                this.y2 = -this.radius * Math.cos( (this.angle+45) * ( Math.PI / 180) ) ;

                this.x3 = -this.x1;
                this.y3 = -this.y1;

                this.x4 = -this.x2;
                this.y4 = -this.y2;
            }
            

            this.startRotate = function(rotationSpeed) {
                this.rotationSpeed = rotationSpeed;
            }

            this.stopRotate = function(rotationSpeed) {
                this.rotationSpeed = 0;
            }
        }


    function updateGameArea()
    {
                    
        tank1.draw();
        tank2.draw();
        io.emit('X Pos1', tank1.x);
        io.emit('Y Pos1', tank1.y);
        io.emit('Angle1', tank1.angle);

        io.emit('X Pos2', tank2.x);
        io.emit('Y Pos2', tank2.y);
        io.emit('Angle2', tank2.angle);
        // pos bullet below here
        // if(bullet1.x < 0 || bullet1.y < 0 || bullet1.x > 500 || bullet1.y > 500){
        //     bullet1.x = tank1.x;
        //     bullet1.y = tank2.y;
        //     bullet1.BulletSpeed =  0;
        // }

        var BulletXY = {
            X: bullet1.x,
            Y: bullet1.y,
            velX1: bullet1.velX,
            velY1: bullet1.velY,
        }
        bullet2.draw();
        bullet1.draw();
        io.emit('bullet2Pos',BulletXY );
        
        BulletXY = {
            X: bullet2.x,
            Y: bullet2.y,
            velX2: bullet2.velX,
            velY2: bullet2.velY,
        }

  
        io.emit('bullet1Pos',BulletXY );
        checkCollisions();
    }


    function checkCollisions()  
    {
        if (Math.sqrt(Math.pow(tank1.x - bullet2.x, 2) + Math.pow(tank1.y - bullet2.y, 2) )  <  (tank1.radius/2) + (bullet2.radius/2)){
            if(bullet2.active == 1){
                tank1.health = tank1.health - 1;  
                bullet2.active = 0;
                console.log("p1 hit")
                console.log(tank1.health);
                io.emit('Player 1 Health', tank1.health);
            }
            
        } 
        else {
            bullet2.active = 1;
        }

        if(Math.sqrt(Math.pow(tank2.x - bullet1.x, 2) + Math.pow(tank2.y - bullet1.y, 2) )  <  (tank2.radius/2) + (bullet1.radius/2) ){
            if(bullet1.active == 1){
                tank2.health = tank2.health - 1;  
                bullet1.active = 0;
                console.log("p2 hit")
                console.log(tank2.health);
                io.emit('Player 2 Health', tank2.health);
            }
            
        } 
        else {
            bullet1.active = 1;
        }
        
    }
//don't mess with thisssssssssssssssssssssssssssssssss below
server.listen(port);
setInterval(updateGameArea, 10);	



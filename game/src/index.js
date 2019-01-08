
let canvas = document.getElementById("gameScreen");
if(canvas==null){
    alert("wtf");
}

// ADDING TO THE CANVAS

// The getContext() method returns an object that provides methods and properties for drawing on the canvas.This reference will cover the properties and methods of the getContext("2d") object, which can be used to draw text, lines, boxes, circles, and more - on the canvas.
let context = canvas.getContext('2d');
// fill rectangle (x,y,width,height)
context.fillRect(20,20,100,100);
// adding color (#f00) is red
context.fillStyle = "red";
context.fillRect(50,50,20,20);
// to change the color of the next added object change fillstyle again
context.fillStyle = "blue";
context.fillRect(100,100,20,20);

// clearing the canvas
context.clearRect(0,0,800,600);   //clearing the whole screen here


// 

class InputHandler{
    constructor(paddle){
        document.addEventListener('keydown',(event) =>{
            // alert(event.keyCode);
            switch(event.keyCode)
            {
                case 37:
                    // alert("moveleft");
                    paddle.moveLeft();
                    break;
                case 39:
                    // alert("moveright");
                    paddle.moveRight();
                    break;
            }
        }); 
        document.addEventListener('keyup',(event) =>{
            // alert(event.keyCode);
            switch(event.keyCode)
            {
                case 37:    
                    if(paddle.speed<0)
                    paddle.stop();
                    break;
                case 39:
                    if(paddle.speed>0)
                    paddle.stop();
                    break;
            }
        }); 
    }       
}

// game will start form here
// make a class paddle

// import is not working for some fuckall reason

class Paddle{
    constructor(gameWidht, gameHeight){
        // declaring feilds here
        this.gw = gameWidht;
        this.width = 150;
        this.height = 30;
        this.maxSpeed = 5;
        this.speed = 0;
        // below is a way to make a new object
        this.position = {

            //a square is drawn from the top left corner 

            x : gameWidht/2 - this.width/2,
            y : gameHeight - this.height - 10
        }
    }

    draw(context){
        context.fillRect(this.position.x,this.position.y,this.width,this.height);
    }

    update(dt)
    {
        // dt is deltaTime
        if(!dt) return;
        this.position.x+=this.speed*dt/15;
        if(this.position.x<0)
            this.position.x = 0;
        if(this.position.x+this.width>this.gw)
            this.position.x = this.gw-this.width;
    }

    moveLeft()
    {
        this.speed = -this.maxSpeed;
    }

    moveRight()
    {
        this.speed = this.maxSpeed;
    }

    stop(){
        this.speed = 0;
    }

}

const GAME_WIDTH  = canvas.width;
const GAME_HEIGHT = canvas.height;



let paddle = new Paddle(GAME_WIDTH,GAME_HEIGHT);
new InputHandler(paddle);
paddle.draw(context);


// game loop

let lastTime = 0;



// We enter a callback function containing the code we wish to run, and requestAnimationFrame() will run it when the screen is ready to accept the next screen repaint. Some noteworthy details:The callback function is automatically passed a timestamp indicating the precise time requestAnimationFrame() was called.requestAnimationFrame() returns a non 0 integer that can be passed into its nemesis counterpart cancelAnimationFrame() to cancel a requestAnimationFrame()

function gameLoop(timestamp){

    let deltaTime = timestamp - lastTime;
    lastTime = timestamp;

    context.clearRect(0,0,800,500);
    paddle.update(deltaTime);
    paddle.draw(context);

    requestAnimationFrame(gameLoop);
}

gameLoop();
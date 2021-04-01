var balloon;
var backgroundImg,balloonImg;
var database;
var position;

function setup() {
  createCanvas(windowWidth,windowHeight);
  database = firebase.database();
  console.log(database)
  balloon = createSprite(400, 200, 50, 50);
  var balloonPosition=database.ref('balloon/position');
  console.log(balloonPosition)
  balloonPosition.on("value",readPosition, showError);

}

function preload() {
  backgroundImg=loadImage("pro-C35 images/Hot Air Ballon-01.png")
  balloonImg1=loadImage("pro-C35 images/Hot Air Ballon-02.png")
  balloonImg2=loadImage("pro-C35 images/Hot Air Ballon-03.png")
  balloonImg3=loadImage("pro-C35 images/Hot Air Ballon-04.png")
}

function draw() {
  background(backgroundImg);
  balloon.addImage(balloonImg1);

  if(keyDown(LEFT_ARROW)){
   // balloon.x = balloon.x -10;
   updatePosition(-10,0)
  }
  else if(keyDown(RIGHT_ARROW)){
   // balloon.x =balloon.x +10;
   updatePosition(10,0)
  }
  else if(keyDown(UP_ARROW)){
   // balloon.y = balloon.y -10;
    updatePosition(0,-10);
    console.log("inside Up")
    balloon.addAnimation("balloonImage1",balloonImg2);
    balloon.scale=balloon.scale -0.01;
  }
  else if(keyDown(DOWN_ARROW)){
    //balloon.y = balloon.y +10;
    updatePosition(0,10);
    console.log("inside Down")
    balloon.addAnimation("balloonImage2",balloonImg3);
    balloon.scale=balloon.scale +0.01;
  }
  drawSprites();
}

function updatePosition(x,y){
  database.ref('balloon/position').set({
    x:position.x+x,
    y:position.y+y
  })
}

function readPosition(data){
  position=data.val();
  balloon.x = position.x;
  balloon.y = position.y;
}

function showError(){
  console.log("Error in writing to the database");
}
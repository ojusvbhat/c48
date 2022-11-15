var bgImg;
var bottomGround;
var topGround;
var balloon, balloonImg;
var bird , birdimg;
var build,lamp,buildImg,lampImg;

var PLAY = 0;
var END = 1;
var Birdgroup,obsGroup;
var gameState = "PLAY";
var restart,restartImg;

var jumpSound,dieSound;

var score = 0;

function preload(){
bgImg = loadImage("assets/bg.png")
birdimg = loadImage("assets/obsTop2.png");
balloonImg = loadAnimation("assets/balloon1.png","assets/balloon2.png","assets/balloon3.png")
restartImg = loadImage("assets/restart.png");
buildImg = loadImage("assets/obsBottom1.png");
lampImg = loadImage("assets/obsBottom2.png");

jumpSound = loadSound("assets/jump.mp3");
dieSound = loadSound("assets/die.mp3");
}

function setup(){
createCanvas(windowWidth,windowHeight);

//creating top and bottom grounds
bottomGround = createSprite(200,390,800,20);
bottomGround.visible = false;

topGround = createSprite(200,10,800,20);
topGround.visible = false;
      
//creating balloon     
balloon = createSprite(100,200,20,50);
balloon.addAnimation("balloon",balloonImg);
balloon.scale = 0.5;

restart= createSprite(770,390,30,30);
restart.addImage("r",restartImg);
restart.visible = false;

Birdgroup = new Group();
obsGroup = new Group();

}

function draw() {
  
background(bgImg);

 if (gameState === "PLAY"){

   //making the hot air balloon jump
   if(keyDown("space") && balloon.y>0  ) {
   balloon.velocityY = -10 ;
   //jumpSound.play();
   }
  
   //adding gravity
  balloon.velocityY = balloon.velocityY + 2;
  
  spawnBirds();
  spawnObs();

  if(balloon.isTouching(Birdgroup)){
    gameState="END";
    dieSound.play();
    }
}
Score();
if(gameState === "END"){
    balloon.velocityY =0;

    build.velocityX=0; 
    build.lifetime =-1;

    lamp.velocityX=0; 
    lamp.lifetime =-1;

    Birdgroup.setvelocityXEach = 0;
    //bird.velocityX=0; 
    bird.lifetime =-1;

    restart.visible = true;

    if(mousePressedOver(restart)){
      gameState = "PLAY";
      Birdgroup.destroyEach();
      obsGroup.destroyEach();
      score =0;
      restart.visible = false;
      }
}

//console.log(gameState);

drawSprites();
        
}

function spawnBirds(){    
  if (frameCount % 80 === 0){
    score +=1;
    a = Math.round(random(10,600))
    bird = createSprite(windowWidth,a,20,20);
    bird.addImage("bird",birdimg);
    bird.scale = 0.18;
    bird.velocityX=-9;
    bird.lifetime = 500;
    Birdgroup.add(bird)
    } 

}

function spawnObs(){
  if (frameCount % 200 === 0){
    build = createSprite(windowWidth,windowHeight-225 ,30,30);
    build.addImage("build",buildImg); 
    build.scale = 0.25  ; 
    build.velocityX=-5; 
    build.lifetime =500;
    obsGroup.add(build);

    lamp = createSprite(windowWidth-200,windowHeight-135 ,30,30);
    lamp.addImage("lamp",lampImg);
    lamp.scale =0.15;
    lamp.velocityX=-5;
    lamp.lifetime=500;
    obsGroup.add(lamp);

    }
}
function Score() {
textSize(30);
fill("black");
text("Score:"+score,1400,90);


}

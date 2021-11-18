var PLAY = 1;
var END = 0;
var gameState = PLAY;

var sky, skying
var run, runner
var rock, rocking
var coin, coins
var invisibleGround
var distance
var score

var gameOverImg,restartImg

function preload(){
skying=loadImage("sky.png.jpg")
runner=loadAnimation("k.png","k2.png","k3.png","k4.png","k5.png","k6.png")
rocking=loadImage("k7.png")
coins = loadAnimation("p.png","p1.png","p2.png","p3.png","p4.png","p5.png","p6.png","p7.png","p8.png","p9.png")
restartImg = loadImage("restart.png")
gameOverImg = loadImage("gameOver.png")
}

function setup() {
 createCanvas(600, 600);
 sky=createSprite(300,300)
 sky.scale=0.6
 sky.addImage("sky.png.jpg",skying)
 
 sky.x=width/3

 run=createSprite(100,500,100,100)
 run.addAnimation("k.png","k2.png","k3.png","k4.png","k5.png","k6.png",runner)

 gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(300,140);
  restart.addImage(restartImg);

  gameOver.scale = 0.5;
  restart.scale = 0.5;

 invisibleGround = createSprite(300,500,600,10);
 invisibleGround.visible = false;

 run.setCollider("rectangle",0,0,run.width,run.height);
 run.debug = true;

 score = 0;
 distance = 0;

 coinsGroup = createGroup();
 rocksGroup = createGroup();
}

function draw() {
 background("white")

 fill("red")
 distance = distance + Math.round(getFrameRate()/60);
 
 

 if(gameState===PLAY){
  if(sky.x<20){
    sky.x=500
 }

 sky.velocityX=-6

 gameOver.visible = false;
    restart.visible = false;

 if(run.x>560){
  run.x=200

 }

 if(keyDown("space")&& run.y >= 100) {
    run.velocityY = -14;
   
 }

 run.velocityY = run.velocityY + 0.4

 run.collide(invisibleGround);

 if(rocksGroup.isTouching(run)){
  rocksGroup.destroyEach()
  gameState = END;
 }

 if(coinsGroup.isTouching(run)){
  coinsGroup.destroyEach()
  score=score+3;
 }

 }

 if(gameState===END){

 run.changeAnimation("k.png",runner)
 run.velocityY=0;

 gameOver.visible = true;
 restart.visible = true;

 if(mousePressedOver(restart)) {
  reset();
}

 sky.velocityX = 0;

 rocksGroup.setVelocityXEach(0);
 coinsGroup.setVelocityXEach(0);    

 rocksGroup.destroyEach();
 coinsGroup.destroyEach();    

 coin.changeAnimation("p.png")
 run.velocityX=0 
 run.changeAnimation("k.png")
 }
 
 spawnCoins()
 spawnRocks()

 drawSprites()

 text("Score: "+ score,500,20);
 text("distance: "+ distance,500,50);
}

function spawnRocks() {

  if(frameCount%120===0){
    var rock=createSprite(520,520,60,60)
    rock.addImage("rock",rocking)
    rock.scale=0.3
    rock.velocityX=-5
    rock.lifetime=110;
    rocksGroup.add(rock)
    var select_rocks = Math.round(random(1,4));
  }
}

function spawnCoins() {

  if(frameCount%180===0){
    coin=createSprite(420,320,20,20)
    coin.addAnimation("p.png","p1.png","p2.png","p3.png","p4.png","p5.png","p6.png","p7.png","p8.png","p9.png",coins)
    coin.velocityX=-4
    coin.lifetime=110
    coinsGroup.add(coin)
    
    
  }
}

function reset(){
  gameState=PLAY;
  gameOver.visible=false;
  restart.visible=false;
  coinsGroup.destroyEach();
  rocksGroup.destroyEach();
  run.changeAnimation("k.png")
  score = 0;
  distance = 0;
 
}








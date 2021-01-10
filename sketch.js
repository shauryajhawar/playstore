var monkey, ground, banana, stone, invg, stoneGroup, bananaGroup, score = 0,
  health = 2,
  play = 0,
  end = 1,
  gameState = play,
  h1, h2, gameOver, restart, uphill; //hang;
var monkeyA, bananaI, StoneI, groundI, hp, gameOverI, restartI, uphillI, b1;


function preload() {
  monkeyA = loadAnimation("Monkey_01.png", "Monkey_02.png", "Monkey_03.png",
    "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png");

  bananaI = loadImage("banana.png");

  stoneI = loadImage("stone.png");

  groundI = loadImage("jungle.jpg");

  hp = loadImage("pixel-heart-2779422_960_720.webp");

  gameOverI = loadImage("game over.png");

  restartI = loadImage("restart.png");

  uphillI = loadImage("up.png");

  crash = loadSound("18365_1464637302.mp3")
  pointsound = loadSound("Tick-DeepFrozenApps-397275646.mp3")
  jumpsound = loadSound("maro-jump-sound-effect_1 (2).mp3")


}

function setup() {
  createCanvas(windowWidth, windowHeight);

  invg = createSprite(200, height - 120, 400, 5);

  ground = createSprite(width / 2, height / 3, windowWidth, windowHeight + 100);
  ground.addImage("ground", groundI);

  ground.velocityX = -5;
  ground.x = ground.width / 2;

  monkey = createSprite(70, height / 2, 10, 10);
  monkey.addAnimation("monkeyg", monkeyA);
  monkey.scale = 0.15

  stoneGroup = createGroup();
  bananaGroup = createGroup();
  upGroup = createGroup();

  h1 = createSprite(20, 20);
  h1.addAnimation("heart1", hp);
  h1.scale = 0.06;

  h2 = createSprite(59, 20);
  h2.addAnimation("heart2", hp);
  h2.scale = 0.06;

  gameOver = createSprite(width / 2, height / 2, 10, 10);
  gameOver.addImage("GameOverT", gameOverI);
  gameOver.scale = 0.5;
  gameOver.visible = false;

  restart = createSprite(width / 2 + 225, height / 2 - 220, 10, 10);
  restart.addImage("restartButton", restartI);
  restart.scale = 0.2;
  restart.visible = false;


  b1 = createSprite(0, height - 150, 5, 400);

  ground.scale = 1.5;

}

function draw() {
  background(groundI);
  
  edges = createEdgeSprites();
  
  // restart.scale = 0.4;
  // monkey.collide(b1);
  
  if (gameState === play) {
    monkey.collide(upGroup);
    ground.setVelocity(-5, 0);
    restart.visible = true;
    monkey.velocityY = monkey.velocityY + 0.5;
   
      if (ground.x < 0) {
      ground.x = ground.width / 2;
    }

    if (monkey.isTouching(bananaGroup)) {
      bananaGroup.destroyEach();
      score = score + 2;
      pointsound.play();
    }

    spawnObstacles();
    spawnBanana();

    monkeyLife();
    SpawnGround();

    
    if (touches.length > 0 || mousePressedOver(restart)) {
      if(touches.length > 0)
        {
      if (restart.overlapPoint(touches[0].x, touches[0].y)) {
        reset();
        console.log("in reset play state mobile" + touches[0]);
        touches = []
      }
        }
      else{
        // this for non mobile view
        reset()
        console.log("reset in play state laptop")
      }
    }
if (touches.length > 0 || keyDown("space") && monkey.y >= height - 300) {
      monkey.velocityY = -12;
      console.log("in jump play state" + touches[0]);
      touches = [];
      jumpsound.play();
    }

    if (health === 0 || monkey.x < 0) {
      gameState = end;

    }

  } 
  else if (gameState === end) {
    monkey.visible = false;
    gameOver.visible = true;

    stoneGroup.destroyEach();
    bananaGroup.destroyEach();
    ground.setVelocity(0, 0);
    upGroup.destroyEach();

    if (touches.length > 0 || mousePressedOver(restart)) {
      if(touches.length > 0)
        {
      if (restart.overlapPoint(touches[0].x, touches[0].y)) {
        reset();
        console.log("in reset end" + touches[0]);
        touches = []
      }
    }
      else{
        reset()
      }
    }

  }

  monkey.collide(invg);



  drawSprites();
  fill("white");
  textSize(18);
  text("Your score:-" + score, width / 2 + 80, 20);
}

function spawnObstacles() {

  if (frameCount % 200 === 0) {
    stone = createSprite(610, height - 150, 10, 10);
    stone.x = 610;
    stone.addAnimation("Stone", stoneI);
    stone.velocityX = -5;
    stone.lifetime = 122;
    stone.scale = 0.20;
    stone.debug = false;
    stone.setCollider("rectangle", 0, 0, 350, 350);
    stoneGroup.add(stone);

  }
}

function spawnBanana() {
  if (frameCount % 120 === 0) {
    banana = createSprite(610, height - 200, 10, 10);
    banana.x = 610;
    banana.y = random(height - 300, height - 350);
    banana.addAnimation("Banana", bananaI);
    banana.velocityX = -5;
    banana.lifetime = 122;
    banana.scale = 0.08;
    bananaGroup.add(banana);
  }
}

function monkeyLife() {
  if (monkey.isTouching(stoneGroup)) {
    health = health - 1;
    stoneGroup.destroyEach();
    crash.play();

  }
  if (health === 2) {
    h1.visible = true;
    h2.visible = true;
  }
  if (health === 1) {
    monkey.scale = 0.12
    h2.visible = false;
  }

  if (health === 0) {
    h1.visible = false;

  }

  switch (score) {
    case 10:
      monkey.scale = 0.15;
      break;
    case 20:
      monkey.scale = 0.20;
      break
    case 30:
      monkey.scale = 0.25;
      break;
    case 40:
      monkey.scale = 0.30;
      break;
    case 50:
      monkey.scale = 0.35;
      break;
    case 60:
      monkey.scale = 0.40;
      break;
    case 70:
      monkey.scale = 0.45;
      break;
    case 80:
      monkey.scale = 0.50;
      break;
  }
}

function SpawnGround() {
  if (frameCount % 140 === 0) {
    uphill = createSprite(610, height - 250);
    uphill.x = 610;
    uphill.addAnimation("ground", uphillI);
    uphill.velocityX = -5;
    //uphill.debug=true;
    uphill.scale = 2;
    upGroup.add(uphill);
    uphill.setCollider("rectangle", 0, 0, 80, 15);


  }
}

function reset() {
  gameState = play;
  monkey.visible = true;
  monkey.x = 150;
 // monkey.y = height / 2
  monkey.scale = 0.15;
  gameOver.visible = false;
  restart.visible = false;
  ground.velocityX = -5;
  score = 0;
  health = 2;

}
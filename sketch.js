var canvas;
var ufo_img, ufo
var soilder, soilder_img, soilderGroup
var people, people_img, peopleGroup
var space, space_img
var gameOver, gameOver_img
var youWin, youWin_img
var score = 0

var gameState = "play"

function preload() {
  gameOver_img = loadImage("pictures/Game Over.jpeg")
  space_img = loadImage("pictures/Space.png")
  ufo_img = loadImage("pictures/ufo1.jpg")
  soilder_img = loadImage("pictures/Soilder.jpg")
  people_img = loadImage("pictures/People.png")
  youWin_img = loadImage("pictures/You Win.jpg")
}

function setup() {

  canvas = createCanvas(1700, 749);

  space = createSprite(799, 370)
  space.addImage("space", space_img)
  space.velocityY = 1;
  space.scale = 1.6

  gameOver = createSprite(799, 370)
  gameOver.addImage("gameOver", gameOver_img)
  gameOver.scale = 1
  gameOver.visible = false
  // gameOver.debug = true

  youWin = createSprite(799, 370)
  youWin.addImage("youWin", youWin_img)
  youWin.scale = 2.3
  youWin.visible = false

  ufo = createSprite(200, 200, 1, 1)
  ufo.addImage("ufo", ufo_img)
  ufo.scale = 0.3
  ufo.debug = false
  ufo.setCollider("circle",0,0,10)

  peopleGroup = createGroup()
  soilderGroup = createGroup()

  score = 0
}


function draw() {
  background(space_img)



  if (gameState === "play") {
    score.visible = true


    if (space.y > 400) {
      space.y = 300
    }

    if (keyDown("SPACE")) {
      ufo.velocityY = -10
    }
    ufo.velocityY = ufo.velocityY + 0.8;

    if (keyDown("LEFT_ARROW")) {
      ufo.x = ufo.x - 3
    }

    if (keyDown("RIGHT_ARROW")) {
      ufo.x = ufo.x + 5
    }

    if (space.y > 400) {
      space.y = 300
    }

    if (peopleGroup.isTouching(ufo)) {
      score = score + 1
      peopleGroup.destroyEach()
    }
    if (soilderGroup.isTouching(ufo) || ufo.y > 749) {
      ufo.destroy()
      gameState = "end"
    }

    soilderSpawn()
    peopleSpawn()
  }



  if (gameState === "end") {
    gameOver.visible = true
    space.visible = false
    peopleGroup.destroyEach()
    soilderGroup.destroyEach()

  }

  if(score === 1){
  youWin.visible = true
  space.visible = false
  peopleGroup.destroyEach()
  soilderGroup.destroyEach()
  ufo.destroy()
  }

  drawSprites()
  textSize(20);
  fill("gold")
  text("Humans Abducted: " + score, 30, 50);

  textSize(20);
  fill("gold")
  text("Jump : Space",30,570);
  
  textSize(20);
  fill("gold")
  text("Move Left : Left Arrow Key",30,600);

  textSize(20);
  fill("gold")
  text("Move Right : Right Arrow Key",30,630);

  textSize(20);
  fill("gold")
  text("Get 10 Humans To Win",30,660);

  textSize(20);
  fill("gold")
  text("Dont Touch The Soilders...",30,690);

  textSize(20);
  fill("gold")
  text("And Dont Fall Off Of The Screen",30,720);

}

function soilderSpawn() {
  if (frameCount % 200 === 0) {
    var soilder = createSprite(200, -50)
    soilder.addImage(soilder_img)
    soilder.scale = 0.17

    soilder.x = Math.round(random(1700, 749))
    soilder.velocityY = 1

    soilder.lifetime = 800
    soilderGroup.add(soilder)
  }
}
function peopleSpawn() {
  if (frameCount % 200 === 0) {
    var people = createSprite(200, -50)
    people.addImage(people_img)
    people.scale = 0.17

    people.x = Math.round(random(1700, 749))
    people.velocityY = 1

    people.lifetime = 800
    peopleGroup.add(people)
  }

}
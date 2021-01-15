var plane, fuelPack, TStorm, runway, airport, backGround, certificate,planeIMG,tStormIMG,runwayIMG,fuelIMG,airportIMG,backgroundIMG,certificateIMG,fuelValue,gameOver,keyName
function preload(){
planeIMG = loadImage("images/plane.png")
tStormIMG = loadImage("images/tstorm.jpg")
fuelPackIMG = loadImage("images/fuel.png.png")
runwayIMG = loadImage("images/runway.png")
certificateIMG = loadImage("images/certificate.jpg")
backgroundIMG = loadImage("images/bg.jpg")
airportIMG = loadImage("images/airport.png")
gameOverIMG = loadImage("images/gameOver.png")

}
function setup() {
  createCanvas(displayWidth,displayHeight);
  backGround = createSprite(width/2,height/2,width,height)
  backGround.addImage("bG",backgroundIMG)
  backGround.x = backGround.width/2
  backGround.velocityX = -4
  plane = createSprite(150,height/2,10,10);
  plane.addImage("plane", planeIMG)
  fuelValue = 255
  keyName ="UP_ARROW"

  cloudGroup = new Group()
  fuelPackGroup = new Group()
  airportGroup = new Group()

  gameState = "play"


// certificate = createSprite(height/2,height/2,10,10)
// certificate.addImage("certificate",certificateIMG)

}

function draw() {
  console.log(backGround.x)
  background(20,255,255);  
  drawSprites();
plane.velocityY = plane.velocityY + 0.8
if(gameState == "play"){

  
  if(keyDown(keyName)){
    plane.velocityY = -12
  }
  spawnClouds()
  spawnFuelPack()
  spawnAirport()
  spawnKey()
  tint(255,fuelValue)
  image(fuelPackIMG,1150,10)
  fuelValue= fuelValue - 0.1
  if(backGround.x <-440){
    backGround.x = backGround.width/2
    }
    if(plane.isTouching(cloudGroup)){
    fuelValue = fuelValue - 1
    }
    if(fuelValue <= 0){
      gameState = "end"
    }
    if(plane.y>displayHeight){
      gameState = "end"
    }

    if(plane.isTouching(fuelPackGroup)){
      fuelValue = fuelValue+ 100
      fuelPackGroup.destroyEach()
    }

} else if (gameState == "end"){
backGround.velocityX = 0
cloudGroup.setVelocityEach(0,0)
fuelPackGroup.setVelocityEach(0,0)
airportGroup.setVelocityEach(0,0)
gameOver = createSprite(height/2,width/2,10,10)
gameOver.addImage(gameOverIMG)
}

}

function spawnClouds(){
  if(frameCount %200 == 0){
    TStorm = createSprite(1500,random(200,600),10,10)
TStorm.addImage("thunderstorm",tStormIMG)
TStorm.velocityX = -4
TStorm.scale = 2
TStorm.lifeTime = 500
cloudGroup.add(TStorm)
  }
}

function spawnFuelPack(){
  if(frameCount %150 == 0){
    fuelPack = createSprite(1500,random(-700,700),10,10)

    fuelPack.addImage("fuel",fuelPackIMG)
    fuelPack.velocityX = -4
  fuelPack.lifeTime=500
  fuelPackGroup.add(fuelPack)
  }
}

function spawnAirport(){
  if(frameCount% 1100 == 0){
    airport = createSprite(1500,700,10,10)
airport.addImage("airport",airportIMG)
airport.scale=0.1
    airport.velocityX = -4
    airport.lifeTime = 500
    airportGroup.add(airport)
  }
}

function spawnKey (){
if(frameCount%200 == 0){
  var keyType = Math.round(random(1,4))

switch(keyType){
  case 1 :  console.log("press up arrow to go up", width/2,height/2);
            keyName= "UP_ARROW";
            break ;
 case 2 : console.log("press down arrow to go up",width/2,height/2);
          keyName = "DOWN_ARROW";
          break ;
case 3 : console.log("press right arrow to go up",width/2,height/2);
        keyName = "RIGHT_ARROW";
        break ;
case 4 : console.log("press left arrow to go up",width/2,height/2);
      keyName = "LEFT_ARROW";
      break ;
      default:console.log("error",keyType,keyName);break;
      
}
}
}
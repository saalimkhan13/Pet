//Create variables here
var dog,dog_img;
var happyDog;
var sadDog;
var database;
var foodS = 0;
var food;
var feedTime;
var addFood;
var feed;
var lastFed;
var input;
var play;
var name = null;
var line;
var gameState;
var readState;
var bedroom,garden,washroom

function preload()
{
  //load images here
  dog_img = loadImage("images/Dog.png")
  happyDog = loadImage("images/Happy.png")
  sadDog = loadImage("images/deadDog.png")
  bedroom = loadImage("images/bedRoom.png")
  garden = loadImage("images/Garden.png")
  washroom = loadImage("images/washRoom.png")
}

function setup() {
  database = firebase.database();
  console.log(database);
  createCanvas(600, 800);

  readState = database.ref('gameState');
  readState.on("value",(data)=>{
    gameState = data.val();
  })
 
  dog = createSprite(300,700,20,20)
 // dog.addImage(dog_img)
  dog.scale = 0.2
  food = new Food();
  food.getFood();
  
  feed = createButton("Feed The Dog");
  feed.position(400,95);
  feed.mousePressed(()=>
  {
    food.feedDog(foodS)
  })

  addFood = createButton("Add Food");
  addFood.position(800,95)
  addFood.mousePressed(()=>{
    food.addFood(foodS)
  })

  

}


function draw() {  
  
  background(46,139,87)
  var fedTime = database.ref('feedTime');
  fedTime.on("value", (data)=>{
    lastFed = data.val();
  })
  fill("black");
  textSize(25);
  if(lastFed >= 12){
    text("Last Fed : "+ lastFed % 12 + "Pm", 200,30)
  }
  else if(lastFed === 0)
  {
    text("Last Fed : 12 AM", 200, 30)
  }
  else{
    text("Last Fed : " + lastFed + "AM", 200, 30)
  }
  
  if(gameState === "Hungry")
  {
    feed.show();
    addFood.show();
    dog.addImage(sadDog)
  }
  else
  {
    feed.hide();
    addFood.hide();
    dog.remove();
  }
  currentTime = hour();
  if(currentTime === (lastFed+1))
  {
    update("Playing");
    food.Garden();
  }
  else if(currentTime === (lastFed+2))
  {
    update("Sleeping");
    food.Bedroom();
  }
  else if(currentTime > (lastFed+2) && currentTime <= (lastFed+4))
  {
    update("Bathing");
    food.Washroom();
  }
  else
  {
    update("Hungry")
    food.display();
  }
  //add styles here
  

  drawSprites();
}

function update(x)
{
  database.ref('/').update({
    gameState:x
  })
}



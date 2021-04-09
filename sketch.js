var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var feedDog;
var foodObj;

//create feed and lastFed variable here
var lastFeedTime;
var timeStampButton;

function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //create feed the dog button here
  feedDog=createButton("Feed the Dog");
  feedDog.position (700,95);
  feedDog.mousePressed(feedDogs);



  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}

function draw() {
  background(46,139,87);
  foodObj.display();

  //write code to read fedtime value from the database 
  
 
  //write code to display text lastFed time here

 
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDogs(){
  dog.addImage(happyDog);
  var feedStock  = foodObj.getFoodStock();
  //write code here to update food stock and last fed time
  if(feedStock <= 0){
    foodObj.updateFoodStock(feedStock * 0 );
  }else{
    foodObj.updateFoodStock(feedStock - 1);
    foodS--;
  }
  lastFeedTime = new Date();
  text("Last Feed Time = ",350,30);
  timeStampButton =createButton("Last Feed Time " + lastFeedTime.getHours() + ":" + lastFeedTime.getMinutes() + "");
  timeStampButton.position(350,95);

}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}

var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;

//create feed and lastFed variable here
var feed;
var lastFed;

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
  feed=createButton("Feed The Dog");
  feed.position(900,95);
  feed.mousePressed(feedDog)
  
  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods)

}

function draw() {
  background(" #00ef96");
  foodObj.display();

  //write code to read fedtime value from the database 
  fedTime=database.ref("FeedTime")
 fedTime.on("value",(data)=>{
 lastFed=data.val()  
 })
  //write code to display text lastFed time here
if(lastFed>=12){

}else if(lastFed==0){
text("Last Feed:12 AM",350,30)  ;
}else{

}
 
  drawSprites();
}

//function to read food Stock
function readStock(data){
 foodS=data.val();
foodObj.updateFoodStock(foodS);
}


function feedDog(){
 
  dog.addImage(happyDog);
  lastFed+=1
  console.log(lastFed)
 foodS-- 
 console.log (foodS)
  if (foodS <=0){
foodObj.updateFoodStock(foodS * 0)
  }
  else {
    foodObj.updateFoodStock(foodS * -1)
  }
  database.ref ("/").update({
    Food: foodS,
  FeedTime:hour() 
  })
}
  
function addFoods(){
  foodS++;
  database.ref('/').update({
  Food:foodS
    
  })
}


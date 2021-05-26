//Create variables here
var foodStock;


function preload()
{
	//load images here
  dogImg=loadImage("images/dogImg1.png");
  happyDog=loadImage("images/dogImg.png");
}

function setup() {
	createCanvas(500, 500);
  dog=createSprite(250,350);
  dog.addImage(dogImg);
  dog.scale=0.25;
  food=new Food();




  database=firebase.database();
  var databaseRef=database.ref('food'); 
  databaseRef.on("value",readStock);


  FeedDog=createButton("Feed the Dog");
  FeedDog.position(700,130);

  AddFood=createButton("Add Food");
  AddFood.position(700,160);


}


function draw() {  

  background("pink");
  
  if(foodStock!==undefined){
    food.display();
    FeedDog.mousePressed(function(){
      dog.addImage(happyDog);
      writeStock(foodStock); 
    })

    AddFood.mousePressed(function(){
      food.updateFoodStock(20)
    })
  }

  textSize(15);
  fill(0);
  text("Press UP_ARROW key to Feed the Drago Milk ",20,30);

  
  fill("brown");
  text("Food Stock: " + foodStock,350,70)


  drawSprites();
  //add styles here

}



function readStock(data){
  foodStock=data.val();

}

function writeStock(num){

if(num<=0){
  num=0;
}
else{
  num=num-1;
}
database.ref('/').update({
  food:num
})

}


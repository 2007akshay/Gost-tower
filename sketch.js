var PLAY = 1;
var END = 0 ;
var gameState = PLAY;
var invisibleclimber
var tower , tower_image
var goast , goast_image
var door , door_image
var climber , climber_image
var playsound 


function preload () {
  tower_image=loadImage("tower.png");
  goast_image=loadImage("ghost-standing.png");
  door_image=loadImage("door.png");
  climber_image=loadImage("climber.png");
  playsound=loadSound("spooky.wav");
}


function setup () {
  createCanvas(600,600);
 tower=createSprite(300,300,10,10); 
  goast=createSprite(300,300,10,10);
tower.addImage(tower_image);
  goast.addImage(goast_image);
  goast.scale=0.4;
  climberGroup=new Group();
  doorGroup=new Group();
   invisibleclimbergroup=new Group ();
  playsound.play();
  goast.debug=false;  
 goast.setCollider("rectangle",-33,0,50  ,goast.height);
}

function draw (){
 background(0); 
  if(gameState === PLAY){             
  drawSprites();
  tower.velocityY=2;
   if(tower.y>600){
    tower.y=tower.width/2;
  }      
    
       if(keyDown("space")){
     goast.velocityY=-5  
     }
    if(keyDown("left")){
     goast.x=goast.x-3;  
     }
      if(keyDown("right")){
     goast.x=goast.x+3;  
   }                                                               if  ( invisibleclimbergroup.isTouching(goast)||goast.y>600)  {
    goast.destroy(); 
     gameState = END;
   }        
   spawndoors();      
  goast.velocityY=goast.velocityY+0.8;
  if(climberGroup.isTouching(goast)){
    goast.velocityY=0; 
  }
     }
  if (gameState === END){
      fill("yellow");
      textSize(70);
    text("GAME OVER",150,250);
      
 // text(mouseX+","+mouseY,mouseX,mouseY)
  }
}
function spawndoors(){
 if(frameCount % 300 ===0){
  door=createSprite(200,-10,10,10); 
   door.addImage(door_image);
   climber=createSprite(200,50,10,10); 
   climber.addImage(climber_image);
   door.velocityY=2;
   climber.velocityY=2;
   door.x=Math.round(random(120,400));
   climber.x=door.x;
    invisibleclimber=createSprite(200,70,climber.width,20);    
    invisibleclimber.visible=false;  
    invisibleclimber.lifetime=320;
    invisibleclimber.velocityY=2;
    invisibleclimber.x= climber.x;
    door.lifetime=320;
    climber.lifetime=320;
   goast.depth=door.depth+1;
     goast.depth=climber.depth+1;
    invisibleclimbergroup.add( invisibleclimber);
 climberGroup.add(climber);  
    doorGroup.add(door);
 }
 
}

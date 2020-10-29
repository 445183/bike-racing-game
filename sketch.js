var bike,bikeImage,bikeSound;
var track,trackImage;
var o1,o2,o3,obstacleGroup;
var fuelImage,fuelGroup;
var gameState=PLAY;
var PLAY=1,END=0;
var f1=100;
var travel=0;

function preload(){
  bikeImage=loadImage("image_processing20200424-29859-955t9l.png");
  trackImage=loadImage("running-track-detail-31484482.jpg");
  o1=loadImage("6-512.png");
  o2=loadImage("ee419dee89c6a37579023bb24f2e834b.png");
  o3=loadImage("6837857_thumb.webp");
  fuelImage=loadImage("free-vector-fuel-pump-map-poi_101270_Fuel_pump_map_POI.png");
  
  bikeSound=loadSound("vehicle123.mp3")
  
}

function setup() {
   createCanvas(550,400);
   track=createSprite(275,200,1,1); 
   track.addImage(trackImage);
  
   bike=createSprite(50,200,1,1);
   bike.addImage(bikeImage);
   bike.scale=0.1;
   //bike.debug=true;
   bike.setCollider("circle",0,0,175);
  
   obstacleGroup= new Group();
   fuelGroup= new Group();
  
   gameState=PLAY;
}

function draw() {
   background(0);
   drawSprites();
   if(gameState===PLAY){
       track.velocityX=-2.5;
       if(track.x<150){
         track.x=width/2;
       }
       fill("yellow");    
       textSize(17.5);
       text("Fuel: "+f1+"%",30,30);
       text("Distance travelled: "+travel+" metres",300,30);
     
       if(frameCount%50===0){
         f1=f1-1;
       }
       if(frameCount%15===0){
         travel=travel+1;
       }
     
       bikeSound.play();
     
       if(keyDown("q")){
         bike.y=75;
       }
       if(keyDown("w")){
         bike.y=100;
       }
       if(keyDown("e")){
         bike.y=125;
       }
       if(keyDown("r")){
         bike.y=150;
       }
       if(keyDown("t")){
         bike.y=185;
       }
       if(keyDown("y")){
         bike.y=225;
       }
       if(keyDown("u")){
         bike.y=285;
       }
       if(keyDown("i")){
         bike.y=350;
       }
       if(f1===0 || bike.isTouching(obstacleGroup)){
         gameState=END;
       }
       if(bike.isTouching(fuelGroup)){
         fuelGroup.destroyEach();
         f1=100;
       }
    }
    if(gameState===END){
      fill("red");
      textSize(30);
      text("Game Over",200,35);
      textSize(20);
      text("Press ctrl to restart",200,70)
      obstacleGroup.setVelocityXEach(0);
      obstacleGroup.setLifetimeEach(-1);
      fuelGroup.setVelocityXEach(0);
      track.velocityX=0;
      if(keyDown("ctrl")){
        obstacleGroup.destroyEach();
        gameState=PLAY;
        f1=100;
        travel=0;
      }
    }
  obstacle(); 
  fuel();
}

function obstacle(){
  if(frameCount%65===0){
    var obstacle=createSprite(600,200,1,1);
    obstacle.velocityX=-2.5;
    var selion=Math.round(random(1,3));
    switch(selion){
      case 1:obstacle.addImage(o1);
             obstacle.scale=0.12;
        break;
      case 2:obstacle.addImage(o2);
             obstacle.scale=0.12;
        break;
      case 3:obstacle.addImage(o3);
             obstacle.scale=0.12;
        break;
    }
    var selpos=Math.round(random(1,8));
    switch(selpos){
      case 1:obstacle.y=75;
        break;
      case 2:obstacle.y=100;
        break;
      case 3:obstacle.y=125;
        break;
      case 4:obstacle.y=150;
        break;
      case 5:obstacle.y=185;  
        break;
      case 6:obstacle.y=225;
        break;
      case 7:obstacle.y=285;
        break;
      case 8:obstacle.y=350;
        break;
    }
    bike.depth=obstacle.depth+5;
    obstacle.lifetime=225;
    
    //obstacle.debug=true;
    obstacle.setCollider("rectangle",0,0,500,100);
    
    
    obstacleGroup.add(obstacle);
  }
}
function fuel(){
  if(frameCount%4900===0){
      var fuel=createSprite(600,200,1,1);
      fuel.addImage(fuelImage);
      fuel.scale=0.05;
      fuel.velocityX=-2.5;
      var selpos=Math.round(random(1,8));
      switch(selpos){
          case 1:fuel.y=75;
            break;
          case 2:fuel.y=100;
            break;
          case 3:fuel.y=125;
            break;
          case 4:fuel.y=150;
            break;
          case 5:fuel.y=185;  
            break;
          case 6:fuel.y=225;
            break;
          case 7:fuel.y=285;
            break;
          case 8:fuel.y=350;
            break;
      }
      fuel.lifetime=225;
      //fuel.debug=true;
      fuel.setCollider("rectangle",0,0,100,500)
      fuelGroup.add(fuel);
  }
}
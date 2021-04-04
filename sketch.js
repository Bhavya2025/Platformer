

var player,ground,ground2;

var ONGROUND = false; 

var FollowChange = 5;

const TargetFPS = 30;

const  Gravity = 1.5;
var  Friction = 0.5;

var JumpSpeed = -25;

var SideSpeed = 5;

var multiplierX = -1
var multiplierY = -1


var speedLimitX = 20; 



function setup() {
createCanvas(screen.width,screen.height-111);


player = createSprite(1920/2,1080/2,50,50);
player.shapeColor = "red";
player.setCollider("rectangle",0,0,50,50);


ground = createSprite(1920/2,1080/1.2,1920,200);
ground.shapeColor = "green";



ground2 = createSprite(1920/4,1080/2,400,200);
ground2.shapeColor = "blue";






}





function isTouching(O1,O2)
{
  if (O1.x - O2.x < O2.width/2 + O1.width/2
    && O2.x - O1.x < O2.width/2 + O1.width/2
    && O1.y - O2.y < O2.height/2 + O1.height/2
    && O2.y - O1.y <O2.height/2 + O1.height/2)
  {
   return true;
  }
 else 
 {
  return false;
 }
}

// equation used is 
// (groundY)-((playerH/2)+(groundH/2))
// (groundX)-((playerW/2)+(groundW/2))
//





function pushBack()
{


  if(player.velocityX>0)
{
  multiplierX = -1;
}

else
{
  multiplierX = 1;
}


  if(isTouching(player,ground2))
  {
    player.x = (ground2.x)+((player.width/2)+(ground2.width/2))*multiplierX;
    
    player.setVelocity(0,player.velocityY)
   
  }

// Y COLLISION

  if(player.velocityY>0)
  {
    multiplierY = -1;
  }

  else
  {
    multiplierY = 1;
  }


  if(isTouching(player,ground))
  {
    player.y = (ground.y)+((player.height/2)+(ground.height/2))*multiplierY;
    
    player.setVelocity(player.velocityX,0);
    ONGROUND = true;
  
  }


  if(isTouching(player,ground2))
  {
    player.y = (ground2.y)+((player.height/2)+(ground2.height/2))*multiplierY;
    
    player.setVelocity(player.velocityX,0);
    ONGROUND = true;

  }


}



function draw() 
{
 
  background(135, 206, 235); 
  
  textSize(25);
  text( player.velocity,1000,108);
  fill(0, 102, 153);

  //DeltaTimeFun();
 
  if(keyIsDown(68)) //D
  {
    SideSpeed = SideSpeed+1;
  }
  else if(keyIsDown(65)) //A
  {
    SideSpeed = SideSpeed-1;
  }

  if(SideSpeed>speedLimitX)
  {
    SideSpeed = speedLimitX;
  }
  else if(SideSpeed<(speedLimitX*-1))
  {
    SideSpeed = speedLimitX*-1;
  }

  if( !(keyIsDown(65) || keyIsDown(68)) )
  {
   SideSpeed = (SideSpeed*Friction);
  }

  // Gravity
  player.setVelocity(player.velocityX,player.velocityY+1*Gravity);
  player.setVelocity(SideSpeed,player.velocityY);




  
  pushBack();
  
    //Jump
    if(keyIsDown(87) && ONGROUND)
    {
      ONGROUND = false;
      player.setVelocity(player.velocity.x,JumpSpeed);
    }
      
    
  
  
  
  drawSprites();
  frameRate(TargetFPS);
}







var platforms;
var gameChar_x;
var gameChar_y;
var floorPos_y;
var scrollPos;
var gameChar_world_x;

var isLeft;
var isRight;
var isFalling;
var isPlummeting;

var trees_x;
var mountains;
var clouds;
var collectables;
var canyons;

var game_score;
var flagpole;
var lives;

var jumpSound;
var levelCompleteSound;
var coinCollectSound;
var losingSound;

var platforms;

function preload()
{
    soundFormats('mp3','wav');
    
    //load your sounds here
    jumpSound = loadSound('assets/jump.wav');
    jumpSound.setVolume(0.1);
    
    levelCompleteSound = loadSound('assets/level-completion.wav');
    levelCompleteSound.setVolume(0.2);
    
    coinCollectSound = loadSound('assets/coins.wav');
    coinCollectSound.setVolume(0.4);
    
    losingSound = loadSound('assets/falling-losing.wav');
    losingSound.setVolume(0.1);
    
    
}

function setup()
{
	createCanvas(1024, 576);
	floorPos_y = height * 3/4;

    lives = 3;    
    
    startGame();
}

function draw()
{
	background(100, 155, 255); 
    fill(125,155,255);
    rect(0, 0, 1024, 100);
    noStroke();
    fill(34,139,34);
	rect(0, 432, 1024, 144); 
    fill(34,125,34);
    rect(0, 536, 1024, 40);
    fill(34,155,34);
    rect(0,432, 1024, 20);
    
    push();
    translate(scrollPos,0);
    
    drawClouds();

    drawMountains();

 
    drawTrees();

    for(var i = 0; i < platforms.length; i++)
    {
        platforms[i].draw();
    }
    
    for(var i = 0; i < canyons.length; i++)
    {
        
        drawCanyon(canyons[i]);
        checkCanyon(canyons[i]);
        
    }


    for(var i = 0; i < collectables.length; i++)
    {   
        if(collectables[i].isFound == false)
        {
            
            drawCollectable(collectables[i]);
            checkCollectable(collectables[i]);
        }
    }
    
 
    renderFlagpole();

    pop();
    

	
	drawGameChar();
    
  
    fill(255);
    noStroke();
    text("score:" + game_score + "/" + collectables.length, 20, 20);
    
    
    checkPlayerDie();
    
   
    text("lives:" + lives, 100, 20);
    
    
     
    for(i = 0; i<lives; i++)
    {
        fill(255,0,0);
        ellipse(150 +i*30, 15, 8);
    }
    

    
     
    if(flagpole.isReached)
    {
        fill(255);
        text("Level complete. Press space to continue.", 512, 263);
        isLeft = false;
        isRight = false;
       
        
        if(isFalling)
        {
            startGame();


        }
    }
    
    
  
    if(lives == 0)
    {
        fill(255);
        text("Game over. Press space to continue.", 512, 263);
        isLeft = false;
        isRight = false;     
        
        if(isFalling)
        {
            startGame();
            lives = 3;

        }
    }

	
    
        if (isPlummeting == true)
    {
       
        
        isLeft = false;

     
        isRight = false;

        
        gameChar_y += 8;
        gameChar_world_x = canyons.x_pos + (1/2)*(canyons.width);

    }
    
	if(isLeft)
	{
		if(gameChar_x > width * 0.2)
		{
			gameChar_x -= 7;
		}
		else
		{
			scrollPos += 7;
		}
	}

	if(isRight)
	{
		if(gameChar_x < width * 0.8)
		{
			gameChar_x  += 7;
		}
		else
		{
			scrollPos -= 7; 
		}
	}

		 

//noninteracting with platform code for plaayer to fall down to the floor    
/*    if(gameChar_y < floorPos_y)
    {

  
            gameChar_y +=5;
            isFalling = true;
    }
        else
        {
            isFalling=false;
        }*/

    //logic for landing on the platform and interactions 
    
    if (gameChar_y < floorPos_y)
    {
        var isContact = false;
        for(var i = 0; i < platforms.length; i++)
        {       
            if(platforms[i].checkContact(gameChar_world_x, gameChar_y)==true)
            {
                isContact = true;
                isFalling = false;
                break;
            } 
        
        }
    
        if(isContact == false)
        {          
            gameChar_y +=5;
            isFalling = true;
        }
    }
    else
    {
        isFalling = false;
    }

    if(flagpole.isReached == false)
    {
        checkFlagpole();
    }
    
    

	gameChar_world_x = gameChar_x - scrollPos;
    


}



function keyPressed(){
    
    
    if (keyCode == 37)
        {
            isLeft = true;
        }
    
    if (keyCode == 39)
        {
            isRight = true;
        }

    if (keyCode == 32)
        {
            if(isFalling==false)
            {
                gameChar_y -= 150;
                jumpSound.play();
            }
        }

}

function keyReleased()
{

        if (keyCode == 37)
        {
            isLeft = false;

        }
    
    if (keyCode == 39)
        {
            isRight = false;
        }
}




function drawGameChar()
{

    if(isLeft && isFalling)
	{
	
        fill(160,82,45);
        ellipse(gameChar_x,gameChar_y-58,16);
  
        fill(0,0,128);
        arc(gameChar_x,gameChar_y-65,14,14,PI,2*PI);
        
        rect(gameChar_x-9,gameChar_y-50, 18,26);
        
        fill(189,183,107);
        quad(gameChar_x+1,gameChar_y-69,gameChar_x+2,gameChar_y-69,gameChar_x+7,gameChar_y-74,gameChar_x+3,gameChar_y-72);
       
        rect(gameChar_x-4,gameChar_y-24,8,13);
        rect(gameChar_x-4,gameChar_y-13,12,8);
        
        arc(gameChar_x,gameChar_y-45,7,7,PI,2*PI);
        
        rect(gameChar_x-3,gameChar_y-45,6,18);
       
        fill(0);
        rect(gameChar_x+6,gameChar_y-13,4,10);
    
        ellipse(gameChar_x-3,gameChar_y-59,2);
 
        fill(160,82,45);
        ellipse(gameChar_x,gameChar_y-25,4);
        
	}
	else if(isRight && isFalling)
	{
        
	
        fill(160,82,45);
        ellipse(gameChar_x,gameChar_y-58,16);
    
        fill(0,0,128);
        arc(gameChar_x,gameChar_y-65,14,14,PI,2*PI);
    
        rect(gameChar_x-9,gameChar_y-50, 18,26);
      
        fill(189,183,107);
        quad(gameChar_x-1,gameChar_y-69,gameChar_x-2,gameChar_y-69,gameChar_x-7,gameChar_y-74,gameChar_x-3,gameChar_y-72);
   
        rect(gameChar_x-4,gameChar_y-24,8,13);
        rect(gameChar_x-8,gameChar_y-13,12,8);
       
        arc(gameChar_x,gameChar_y-45,7,7,PI,2*PI);
   
        rect(gameChar_x-3,gameChar_y-45,6,18);
   
        fill(0);
        rect(gameChar_x-10,gameChar_y-13,4,10);
    
        ellipse(gameChar_x+3,gameChar_y-59,2);
    
        fill(160,82,45);
        ellipse(gameChar_x,gameChar_y-25,4);
    
	}
	else if(isLeft)
	{
	
        fill(160,82,45);
        ellipse(gameChar_x,gameChar_y-58,16);

        fill(0,0,128);
        arc(gameChar_x,gameChar_y-65,14,14,PI,2*PI);

        rect(gameChar_x-9,gameChar_y-50, 18,26);
  
        fill(189,183,107);
        quad(gameChar_x+1,gameChar_y-69,gameChar_x+2,gameChar_y-69,gameChar_x+7,gameChar_y-74,gameChar_x+3,gameChar_y-72);

        rect(gameChar_x-4,gameChar_y-24,8,24);

        arc(gameChar_x,gameChar_y-45,7,7,PI,2*PI);
   
        rect(gameChar_x-3,gameChar_y-45,6,18);
       
        fill(0);
        rect(gameChar_x-6,gameChar_y-3,10,3);
     
        ellipse(gameChar_x-3,gameChar_y-59,2);
      
        fill(160,82,45);
        ellipse(gameChar_x,gameChar_y-25,4);


	}
	else if(isRight)
	{
		
        fill(160,82,45);
        ellipse(gameChar_x,gameChar_y-58,16);
     
        fill(0,0,128);
        arc(gameChar_x,gameChar_y-65,14,14,PI,2*PI);
      
        rect(gameChar_x-9,gameChar_y-50, 18,26);
        
        fill(189,183,107);
        quad(gameChar_x-1,gameChar_y-69,gameChar_x-2,gameChar_y-69,gameChar_x-7,gameChar_y-74,gameChar_x-3,gameChar_y-72);
    
        rect(gameChar_x-4,gameChar_y-24,8,24);
       
        arc(gameChar_x,gameChar_y-45,7,7,PI,2*PI);
 
        rect(gameChar_x-3,gameChar_y-45,6,18);
     
        fill(0);
        rect(gameChar_x-4,gameChar_y-3,10,3);
      
        ellipse(gameChar_x+3,gameChar_y-59,2);
    
        fill(160,82,45);
        ellipse(gameChar_x,gameChar_y-25,4);

	}
	else if(isFalling || isPlummeting)
	{
	
        fill(160,82,45);
        ellipse(gameChar_x,gameChar_y-58,16);
      
        ellipse(gameChar_x-9,gameChar_y-28,4);
        ellipse(gameChar_x+9,gameChar_y-28,4);
     
        fill(0,0,128);
        arc(gameChar_x,gameChar_y-65,14,14,PI,2*PI);
    
        rect(gameChar_x-9,gameChar_y-50, 18,26);
    
        fill(189,183,107);
        triangle(gameChar_x-6,gameChar_y-50,gameChar_x+6,gameChar_y-50,gameChar_x,gameChar_y-39);

        quad(gameChar_x-1,gameChar_y-69,gameChar_x-2,gameChar_y-69,gameChar_x-7,gameChar_y-74,gameChar_x-3,gameChar_y-72);

        rect(gameChar_x-9,gameChar_y-24,7,13);
        rect(gameChar_x+2,gameChar_y-24,7,13);
  
        arc(gameChar_x-9,gameChar_y-45,7,7,PI,2*PI);
        arc(gameChar_x+9,gameChar_y-45,7,7,PI,2*PI);
    
        rect(gameChar_x-12,gameChar_y-45,6,18);
        rect(gameChar_x+6,gameChar_y-45,6,18);
  
        fill(0);
        ellipse(gameChar_x-3,gameChar_y-59,2);
        ellipse(gameChar_x+3,gameChar_y-59,2);

	}
	else
	{
	
        fill(160,82,45);
        ellipse(gameChar_x,gameChar_y-58,16);
        ellipse(gameChar_x-9,gameChar_y-28,4);
        ellipse(gameChar_x+9,gameChar_y-28,4);       
        fill(0,0,128);
        arc(gameChar_x,gameChar_y-65,14,14,PI,2*PI);   
        rect(gameChar_x-9,gameChar_y-50, 18,26);     
        fill(189,183,107);
        triangle(gameChar_x-6,gameChar_y-50,gameChar_x+6,gameChar_y-50,gameChar_x,gameChar_y-39);    
        quad(gameChar_x-1,gameChar_y-69,gameChar_x-2,gameChar_y-69,gameChar_x-7,gameChar_y-74,gameChar_x-3,gameChar_y-72);     
        rect(gameChar_x-9,gameChar_y-24,7,24);
        rect(gameChar_x+2,gameChar_y-24,7,24);    
        arc(gameChar_x-9,gameChar_y-45,7,7,PI,2*PI);
        arc(gameChar_x+9,gameChar_y-45,7,7,PI,2*PI);  
        rect(gameChar_x-12,gameChar_y-45,6,18);
        rect(gameChar_x+6,gameChar_y-45,6,18);   
        fill(0);
        rect(gameChar_x-10,gameChar_y-3,9,3);
        rect(gameChar_x+1,gameChar_y-3,9,3);
        ellipse(gameChar_x-3,gameChar_y-59,2);
        ellipse(gameChar_x+3,gameChar_y-59,2);
	}
}


function drawClouds()
{
    for(var i=0; i<clouds.length; i++)
    {
            fill(235, 230, 230);
            arc(clouds[i].x_pos+30*clouds[i].size, 
                clouds[i].y_pos-10, 
                60*clouds[i].size, 
                60*clouds[i].size, PI, 2*PI, CHORD);

            fill(245,245, 245);
            arc(clouds[i].x_pos+75*clouds[i].size, 
                clouds[i].y_pos+17, 
                100*clouds[i].size, 
                100*clouds[i].size, PI, 2*PI, CHORD);
            arc(clouds[i].x_pos, 
                clouds[i].y_pos, 
                70*clouds[i].size, 
                70*clouds[i].size, PI, 2*PI, CHORD);
    }
}

function drawMountains()
{
    for(var i = 0; i<mountains.length; i++)
    {
        fill(80,80,80);
        triangle(mountains[i].x_pos+50*mountains[i].size, 
                    mountains[i].y_pos, 
                    mountains[i].x_pos+270*mountains[i].size, 
                    mountains[i].y_pos, 
                    mountains[i].x_pos+160*mountains[i].size, 
                    mountains[i].y_pos-222); 
        fill(120,120,120);
        triangle(mountains[i].x_pos, 
                    mountains[i].y_pos, 
                    mountains[i].x_pos+200*mountains[i].size, 
                    mountains[i].y_pos, 
                    mountains[i].x_pos+100*mountains[i].size, 
                    mountains[i].y_pos-232);
        triangle(mountains[i].x_pos+100*mountains[i].size, 
                    mountains[i].y_pos, 
                    mountains[i].x_pos+300*mountains[i].size, 
                    mountains[i].y_pos, 
                    mountains[i].x_pos+200*mountains[i].size, 
                    mountains[i].y_pos-212);         
    }
}

function drawTrees()
{
     for (var i = 0; i< trees_x.length; i++)
        {
            
             
                fill(139,69,19);
                rect(trees_x[i],floorPos_y-63,20,63);
                fill(107, 142,35);
                triangle(trees_x[i]-20,floorPos_y-63, 
                         trees_x[i]+40, floorPos_y-30, 
                         trees_x[i]+15, floorPos_y-250);
                fill(154,205,50);
                quad(trees_x[i],floorPos_y-63, 
                     trees_x[i]+50,floorPos_y-30, 
                     trees_x[i], floorPos_y-145, 
                     trees_x[i]-30, floorPos_y-22);
        }
}

function drawCanyon(t_canyon)
{
    fill(205,133,63);
    rect(t_canyon.x_pos,floorPos_y, t_canyon.width,144);  
    fill(160,82,45);
    triangle(t_canyon.x_pos, floorPos_y, t_canyon.x_pos, height, t_canyon.x_pos+0.2*t_canyon.width, height);
    triangle(t_canyon.x_pos+t_canyon.width, 
             floorPos_y, t_canyon.x_pos+t_canyon.width - 0.2*t_canyon.width, height, t_canyon.x_pos+t_canyon.width, height);
}

function checkCanyon(t_canyon)
{
    if ((gameChar_world_x > t_canyon.x_pos + 11) && gameChar_world_x < ((t_canyon.x_pos+t_canyon.width) - 11) && gameChar_y == floorPos_y)
    {
        isPlummeting = true;
    
    }    
}

function drawCollectable(t_collectable)
{

    fill(255,223,0);
    ellipse(t_collectable.x_pos, t_collectable.y_pos-32, 35*t_collectable.size);
    fill(212,175,55);
    ellipse(t_collectable.x_pos, t_collectable.y_pos-32, 30*t_collectable.size); 

}

function checkCollectable(t_collectable)
{
        if (dist(t_collectable.x_pos, t_collectable.y_pos, gameChar_world_x, gameChar_y) < 20)
        {
            t_collectable.isFound = true;
            game_score += 1;
            coinCollectSound.play();
        }
}

function renderFlagpole()
{
    push();
    strokeWeight(5);
    stroke(180);
    line(flagpole.x_pos, floorPos_y, flagpole.x_pos, floorPos_y - 250);
    fill(255,0,255);
    noStroke();
    if(flagpole.isReached) 
    {
        rect(flagpole.x_pos, floorPos_y - 250,50,50);
    }
    else
    {
        rect(flagpole.x_pos, floorPos_y,50,50);
    }
    pop();
}

function checkFlagpole()
{
    var d = abs(gameChar_world_x - flagpole.x_pos);
    if (d < 15)
    {
        flagpole.isReached = true;
        levelCompleteSound.play();
    }
    
}

function checkPlayerDie()
{
    if(gameChar_y > height && lives > 0)
    {
        lives -= 1;
        startGame();
        losingSound.play();
    }
}

function startGame()
{
    gameChar_x = width/2;
	gameChar_y = floorPos_y;

	scrollPos = 0;

	gameChar_world_x = gameChar_x - scrollPos;

	isLeft = false;
	isRight = false;
	isFalling = false;
	isPlummeting = false;
     
    trees_x = [150,300,600,700,800,1200,1600,1800];
    
    clouds = [{x_pos:170,y_pos:110, size:1},
              {x_pos:400,y_pos:70, size:1.1},
              {x_pos:550,y_pos:110, size:1},
              {x_pos:800,y_pos:110, size:1},
              {x_pos:1170,y_pos:110, size:1},
              {x_pos:1400,y_pos:70, size:1.15},
              {x_pos:1550,y_pos:110, size:0.95},
              {x_pos:1800,y_pos:110, size:0.9}];
    
    mountains =[{x_pos:100, y_pos:floorPos_y, size:0.75},
               {x_pos:400, y_pos:floorPos_y, size:1.1},
               {x_pos:700, y_pos:floorPos_y, size:0.9},
               {x_pos:1100, y_pos:floorPos_y, size:1},
               {x_pos:1400, y_pos:floorPos_y, size:0.88},
               {x_pos:1700, y_pos:floorPos_y, size:1.2}];
    
    collectables = [{x_pos:230, y_pos:floorPos_y, size:1, isFound: false},
                    {x_pos:550, y_pos:floorPos_y, size:1, isFound: false},
                    {x_pos:1000, y_pos:floorPos_y, size:1, isFound: false},
                    {x_pos:1130, y_pos:floorPos_y, size:1, isFound: false},
                    {x_pos:1550, y_pos:floorPos_y, size:1, isFound: false},
                    {x_pos:1750, y_pos:floorPos_y, size:1, isFound: false}];

    canyons = [{x_pos:350,width:70},
               {x_pos:850,width:70},
               {x_pos:1350,width:70},
               {x_pos:1850,width:70}];
    
    game_score = 0;
    
    flagpole = {isReached: false, x_pos: 2200};
    
    platforms = [];
    platforms.push(createPlatforms(100,floorPos_y-100,100));
    platforms.push(createPlatforms(500,floorPos_y-100,200));  
}

function createPlatforms(x, y, length)
{
    var p = {
            x: x, 
            y: y, 
            length: length,
            draw: function()
            {  
                fill(0,50,0);
                rect(this.x, this.y, this.length, 20);
            },
            checkContact: function(gc_x, gc_y)
            {
                if(gc_x > this.x && gc_x < this.x + this.length)
                {       
                    var d = this.y - gc_y;
                    if(d >= 0 && d < 5)
                    {
                        return true;
                        //console.log("inline with platform");
                    }
                } 
                return false; 
                //console.log("out of line with platform");
            }    
    }
    return p;
}
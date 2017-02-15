noWallsAboveBoxBelowHard = function()
{
    //Level goal & Timer
    this.gameTime = 20;
    this.goal = 60;

    this.lowerGoal = 35;
    this.middleGoal = 45;
    this.higherGoal = 60;
    this.ballImage = "ball_18";

    var version = TGE.Game.GetInstance().version;
    if(version == "original" || version == "christmas")
    {
        this.tools.spawner.setCandyMethod(["fixed",18]);
        this.tools.setNewCandy();
    }

    //Params to set hole
    this.bottomWidth = this.width;
    this.bottomXPos =  this.percentageOfWidth(0.2);
    this.bottomShelfXPos =  this.percentageOfWidth(0.5);
    this.bottomShelfYPos =  this.percentageOfHeight(0.5);

    this.leftWallHeight = 260;
    this.leftWallYPos =  this.percentageOfWidth(0.875);
    this.rightWallHeight = 400;
    this.rightWallYPos =  this.percentageOfWidth(0.985);

    //Borders
    var margin = this.percentageOfWidth(0.05);
    var rightMarginPos = this.percentageOfWidth(0.95);
    var halfHeight = this.percentageOfHeight(0.5);
    var halfWidth = this.percentageOfWidth(0.5);


    //Left Wall
    this.tools.cStaticBox({
        x:margin,
        y:this.leftWallYPos,
        width:margin*2,
        height:this.leftWallHeight,
        screen:this.getLayer("frame"),
        image:"left_wall"
    });
    //Right Wall
    this.tools.cStaticBox({
        x:rightMarginPos,
        y:this.rightWallYPos,
        width:margin*2,
        height:this.rightWallHeight,
        screen:this.getLayer("frame"),
        image:"right_wall"
    });
    //Bottom Shelf
    this.tools.cStaticBox({
        x:this.bottomShelfXPos,
        y:this.bottomShelfYPos,
        width:this.bottomWidth,
        height:margin+20,
        screen:this.getLayer("frame"),
        image:"floor"
    });
    //Bottom
    this.tools.cStaticBox({
        x:this.bottomXPos,
        y:this.height-(margin/2+10),
        width:this.bottomWidth,
        height:margin+20,
        screen:this.getLayer("frame"),
        image:"floor"
    });

    //Mice
    this.mMouseX = this.percentageOfWidth(0.07);
    this.mMouseY = this.percentageOfHeight(0.9);
    this.mouseTime = 4;

    this.addEventListener("update",
        function(event)
        {
            var spawnNow = (Math.floor(this.gameTime%this.mouseTime) == 0);
            if(spawnNow && !this.alreadySpawned)
            {
                this.tools.cMouse(this.mMouseX ,this.mMouseY);
            }
            this.alreadySpawned = spawnNow;

        }
    );
/*
    this.showTutorialMessage({
        message: "Drag units from your base to the other base to attack it.",
        x: 50,
        y: 50,
        nextTutorial: {
            message: "You win the level by conquering all the bases.",
            x: 250,
            y: 350
        }
    });
*/

};
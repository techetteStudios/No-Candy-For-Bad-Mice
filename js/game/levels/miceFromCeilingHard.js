miceFromCeilingHard = function()
{
    //Level goal & Timer
    this.gameTime = 15;
    this.goal = 50;

    this.lowerGoal = 30;
    this.middleGoal = 40;
    this.higherGoal = 50;
    this.ballImage = "ball_12";

    var version = TGE.Game.GetInstance().version;
    if(version == "original" || version == "christmas")
    {
        this.tools.spawner.setCandyMethod(["fixed",12]);
        this.tools.setNewCandy();
    }

    //Params to set hole
    this.bottomWidth = this.width;
    this.bottomXPos =  this.percentageOfWidth(0.5);
    this.topWidth = 500;
    this.topXPos =  this.percentageOfWidth(0.6);

    //Borders
    var margin = this.percentageOfWidth(0.05);
    var rightMarginPos = this.percentageOfWidth(0.95);
    var halfHeight = this.percentageOfHeight(0.5);
    var halfWidth = this.percentageOfWidth(0.5);
    //Left Wall
    this.tools.cStaticBox({
        x:margin,
        y:halfHeight,
        width:margin*2,
        height:this.height,
        screen:this.getLayer("frame"),
        image:"left_wall"
    });
    //Right Wall
    this.tools.cStaticBox({
        x:rightMarginPos,
        y:halfHeight,
        width:margin*2,
        height:this.height,
        screen:this.getLayer("frame"),
        image:"right_wall"
    });
    //Roof
    this.tools.cStaticBox({
        x:this.topXPos,
        y:margin,
        width:this.topWidth,
        height:margin*4,
        screen:this.getLayer("frame"),
        image:"roof"
    });
    //Floor
    this.tools.cStaticBox({
        x:this.bottomXPos,
        y:this.height-(margin/2+10),
        width:this.bottomWidth,
        height:margin+20,
        screen:this.getLayer("frame"),
        image:"floor"
    });

    //Mice
    this.mMouseX = this.percentageOfWidth(0.1);
    this.mMouseY = this.percentageOfHeight(0.05);
    this.mouseTime = 1.5;

    this.addEventListener("update",
        function(event)
        {
            var spawnNow = (Math.floor(this.gameTime%this.mouseTime) == 0);
            if(spawnNow && !this.alreadySpawned)
            {
                this.tools.cMouse(this.mMouseX, this.mMouseY);
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
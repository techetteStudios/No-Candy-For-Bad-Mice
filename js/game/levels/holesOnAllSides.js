holesOnAllSides = function()
{
    //Level goal & Timer
    this.gameTime = 10;
    this.goal = 20;

    this.lowerGoal = 15;
    this.middleGoal = 25;
    this.higherGoal = 35;
    this.ballImage = "ball_16";
    var version = TGE.Game.GetInstance().version;
    if(version == "original" || version == "christmas")
    {
        this.tools.spawner.setCandyMethod(["fixed",16]);
        this.tools.setNewCandy();
    }
    //Params to set hole
    this.bottomWidth = 275;
    this.bottomLeftXPos =  this.percentageOfWidth(0.2);
    this.bottomRightXPos =  this.percentageOfWidth(0.8);

    this.topWidth = 275;
    this.topLeftXPos =  this.percentageOfWidth(0.2);
    this.topRightXPos =  this.percentageOfWidth(0.8);

    this.leftHeight = 300;
    this.leftTopYPos =  this.percentageOfWidth(0.3);
    this.leftBottomYPos =  this.percentageOfWidth(0.985);

    this.rightHeight = 300;
    this.rightTopYPos =  this.percentageOfWidth(0.3);
    this.rightBottomYPos =  this.percentageOfWidth(0.985);

    //Borders
    var margin = this.percentageOfWidth(0.05);
    var rightMarginPos = this.percentageOfWidth(0.95);
    var halfHeight = this.percentageOfHeight(0.5);
    var halfWidth = this.percentageOfWidth(0.5);

    //Left Top Wall
    this.tools.cStaticBox({
        x:margin,
        y:this.leftTopYPos,
        width:margin*2,
        height:this.leftHeight,
        screen:this.getLayer("frame"),
        image:"left_wall"
    });
    //Left Bottom Wall
    this.tools.cStaticBox({
        x:margin,
        y:this.leftBottomYPos,
        width:margin*2,
        height:this.leftHeight,
        screen:this.getLayer("frame"),
        image:"left_wall"
    });
    //Right Top Wall
    this.tools.cStaticBox({
        x:rightMarginPos,
        y:this.rightTopYPos,
        width:margin*2,
        height:this.rightHeight,
        screen:this.getLayer("frame"),
        image:"right_wall"
    });
    //Right Bottom Wall
    this.tools.cStaticBox({
        x:rightMarginPos,
        y:this.rightBottomYPos,
        width:margin*2,
        height:this.rightHeight,
        screen:this.getLayer("frame"),
        image:"right_wall"
    });
    //Left Roof
    this.tools.cStaticBox({
        x:this.topLeftXPos,
        y:margin,
        width:this.topWidth,
        height:margin*4,
        screen:this.getLayer("frame"),
        image:"roof"
    });
    //Right Roof
    this.tools.cStaticBox({
        x:this.topRightXPos,
        y:margin,
        width:this.topWidth,
        height:margin*4,
        screen:this.getLayer("frame"),
        image:"roof"
    });
    //LEft Bottom
    this.tools.cStaticBox({
        x:this.bottomLeftXPos,
        y:this.height-(margin/2+10),
        width:this.bottomWidth,
        height:margin+20,
        screen:this.getLayer("frame"),
        image:"floor"
    });
    //Right Bottom
    this.tools.cStaticBox({
        x:this.bottomRightXPos,
        y:this.height-(margin/2+10),
        width:this.bottomWidth,
        height:margin+20,
        screen:this.getLayer("frame"),
        image:"floor"
    });

    //Mice
    this.mMouseX = this.percentageOfWidth(0.5);
    this.mMouseY = this.percentageOfHeight(0.05);
    this.mouseTime = 1.5;

    this.addEventListener("update",
        function(event)
        {
            var spawnNow = (Math.floor(this.gameTime%this.mouseTime) == 0);
            if(spawnNow && !this.alreadySpawned)
            {
                this.tools.cMouse(this.mMouseX ,this.mMouseY);
                this.tools.cMouse(this.percentageOfWidth(0.05) ,this.percentageOfHeight(0.5));
                this.tools.cMouse(this.percentageOfWidth(0.95) ,this.percentageOfHeight(0.5));
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
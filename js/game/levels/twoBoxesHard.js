twoBoxesHard = function()
{
    //Level goal & Timer
    this.gameTime = 15;
    this.goal = 43;


    this.lowerGoal = 16;
    this.middleGoal = 30;
    this.higherGoal = 40;
    this.ballImage = "ball_19";
    var version = TGE.Game.GetInstance().version;
    if(version == "original" || version == "christmas")
    {
        this.tools.spawner.setCandyMethod(["fixed",19]);
        this.tools.setNewCandy();
    }

    //Params to set hole
    this.bottomWidth = this.width;
    this.bottomXPos =  this.percentageOfWidth(0.2);
    this.bottomShelfXPos =  this.percentageOfWidth(0.5);
    this.bottomShelfTopYPos =  this.percentageOfHeight(0.4);
    this.bottomShelfBottomYPos =  this.percentageOfHeight(0.6);

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
    //Roof
    this.tools.cStaticBox({
        x:halfWidth,
        y:margin,
        width:this.width,
        height:margin*4,
        screen:this.getLayer("frame"),
        image:"roof"
    });
    //Bottom Shelf Top
    this.tools.cStaticBox({
        x:this.bottomShelfXPos,
        y:this.bottomShelfTopYPos,
        width:this.bottomWidth,
        height:margin+20,
        screen:this.getLayer("frame"),
        image:"floor"
    });
    //Bottom Shelf Bottom
    this.tools.cStaticBox({
        x:this.bottomShelfXPos,
        y:this.bottomShelfBottomYPos,
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
    this.mMouseX = this.percentageOfWidth(0.1);
    this.mMouseY = this.percentageOfHeight(0.5);
    this.mouseTime = 1.5;

    this.tools.cMouse(this.mMouseX ,this.mMouseY);
    this.tools.cMouse(this.mMouseX+200 ,this.mMouseY);
    this.tools.cMouse(this.mMouseX+500 ,this.mMouseY);

    this.addEventListener("update",
        function(event)
        {
            var spawnNow = (Math.floor(this.gameTime%this.mouseTime) == 0);
            if(spawnNow && !this.alreadySpawned)
            {
                this.tools.cMouse(this.mMouseX ,this.mMouseY);
                this.tools.cMouse(this.mMouseX+200 ,this.mMouseY);
                this.tools.cMouse(this.mMouseX+500 ,this.mMouseY);
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
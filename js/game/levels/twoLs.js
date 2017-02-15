twoLs = function()
{
    //Level goal & Timer
    this.gameTime = 25;
    this.goal = 20;

    this.ballImage = "ball_8";
    var version = TGE.Game.GetInstance().version;
    if(version == "original" || version == "christmas")
    {
        this.tools.spawner.setCandyMethod(["fixed",8]);
        this.tools.setNewCandy();
    }

    this.lowerGoal = 15;
    this.middleGoal = 25;
    this.higherGoal = 55;

    //Params to set hole
    this.bottomWidth = 175;
    this.bottomLeftXPos =  this.percentageOfWidth(0.36);
    this.bottomLeftYPos =  this.percentageOfHeight(0.6);
    this.bottomRightXPos =  this.percentageOfWidth(0.6);
    this.bottomRightYPos =  this.percentageOfHeight(0.5);

    this.shelfYPos = this.percentageOfHeight(0.27);
    this.leftShelfHeight=  600;
    this.rightShelfHeight =  400;
    this.leftShelfXPos =  this.percentageOfWidth(0.45);
    this.rightShelfXPos =  this.percentageOfWidth(0.5);


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
    //Middle Left Wall
    this.tools.cStaticBox({
        x:this.leftShelfXPos,
        y:this.shelfYPos,
        width:margin*2,
        height:this.leftShelfHeight,
        screen:this.getLayer("frame"),
        image:"left_wall"
    });
    //Middle Right Wall
    this.tools.cStaticBox({
        x:this.rightShelfXPos,
        y:this.shelfYPos,
        width:margin*2,
        height:this.rightShelfHeight,
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
    //BottomL
    this.tools.cStaticBox({
        x:this.bottomLeftXPos,
        y:this.bottomLeftYPos,
        width:this.bottomWidth,
        height:margin+20,
        screen:this.getLayer("frame"),
        image:"floor"
    });
    //BottomR
    this.tools.cStaticBox({
        x:this.bottomRightXPos,
        y:this.bottomRightYPos,
        width:this.bottomWidth,
        height:margin+20,
        screen:this.getLayer("frame"),
        image:"floor"
    });

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
twoLeftShelvesHard = function()
{
    //Level goal & Timer
    this.gameTime = 8;
    this.goal = 22;

    this.lowerGoal = 16;
    this.middleGoal = 21;
    this.higherGoal = 28;
    this.ballImage = "ball_10";

    var version = TGE.Game.GetInstance().version;
    if(version == "original" || version == "christmas")
    {
        this.tools.spawner.setCandyMethod(["fixed",10]);
        this.tools.setNewCandy();
    }

    //Params to set hole
    this.bottomWidth = 200;
    this.bottomXPos =  this.percentageOfWidth(0.245);
    this.bottomShelfWidth = 300;
    this.bottomShelfXPos =  this.percentageOfWidth(0.325);
    this.bottomShelfYPos =  this.percentageOfHeight(0.5);

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
        x:halfWidth,
        y:margin,
        width:this.width,
        height:margin*4,
        screen:this.getLayer("frame"),
        image:"roof"
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
    //Bottom Shelf
    this.tools.cStaticBox({
        x:this.bottomShelfXPos,
        y:this.bottomShelfYPos,
        width:this.bottomShelfWidth,
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
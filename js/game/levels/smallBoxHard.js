smallBoxHard = function()
{
    //Level goal & Timer
    this.gameTime = 10;
    this.goal = 20;

    this.lowerGoal = 16;
    this.middleGoal = 21;
    this.higherGoal = 26;
    this.ballImage = "ball_8";

    var version = TGE.Game.GetInstance().version;
    if(version == "original" || version == "christmas")
    {
        this.tools.spawner.setCandyMethod(["fixed",8]);
        this.tools.setNewCandy();
    }
    //Params to set hole
    this.bottomWidth = this.width;
    this.bottomXPos =  this.percentageOfWidth(0.5);
    this.wallWidth = 300;

    //Borders
    var margin = this.percentageOfWidth(0.05);
    var rightMarginPos = this.percentageOfWidth(0.95);
    var halfHeight = this.percentageOfHeight(0.5);
    var halfWidth = this.percentageOfWidth(0.5);
    //Left Wall
    this.tools.cStaticBox({
        x:margin/2+10,
        y:halfHeight,
        width:this.wallWidth,
        height:this.height,
        screen:this.getLayer("frame"),
        image:"left_wall"
    });
    //Right Wall
    this.tools.cStaticBox({
        x:this.width-(margin/2+10),
        y:halfHeight,
        width:this.wallWidth,
        height:this.height,
        screen:this.getLayer("frame"),
        image:"right_wall"
    });
    //Roof
    this.tools.cStaticBox({
        x:halfWidth,
        y:margin+10,
        width:this.width,
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
    this.tools.cMouse(this.percentageOfWidth(0.3),this.percentageOfHeight(0.1));
    this.tools.cMouse(this.percentageOfWidth(0.5),this.percentageOfHeight(0.5));
    this.tools.cMouse(this.percentageOfWidth(0.7),this.percentageOfHeight(0.1));

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
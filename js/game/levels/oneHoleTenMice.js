oneHoleTenMice = function()
{
    //Level goal & Timer
    this.gameTime  = 15;
    this.goal  = 25;

    this.lowerGoal = 18;
    this.middleGoal = 25;
    this.higherGoal = 35;
    this.ballImage = "ball_5";

    var version = TGE.Game.GetInstance().version;
    if(version == "original" || version == "christmas")
    {
        this.tools.spawner.setCandyMethod(["fixed",5]);
        this.tools.setNewCandy();
    }

    //Params to set hole
    this.bottomWidth = 275;
    this.bottomLeftXPos =  this.percentageOfWidth(0.2);
    this.bottomRightXPos =  this.percentageOfWidth(0.8);

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
    //BottomL
    this.tools.cStaticBox({
        x:this.bottomLeftXPos,
        y:this.height-(margin/2+10),
        width:this.bottomWidth,
        height:margin+20,
        screen:this.getLayer("frame"),
        image:"floor"
    });
    //BottomR
    this.tools.cStaticBox({
        x:this.bottomRightXPos,
        y:this.height-(margin/2+10),
        width:this.bottomWidth,
        height:margin+20,
        screen:this.getLayer("frame"),
        image:"floor"
    });

    //Mice
    this.tools.cMouse(this.percentageOfWidth(0.1),this.percentageOfHeight(0.1));
    this.tools.cMouse(this.percentageOfWidth(0.1),this.percentageOfHeight(0.25));
    this.tools.cMouse(this.percentageOfWidth(0.1),this.percentageOfHeight(0.5));
    this.tools.cMouse(this.percentageOfWidth(0.5),this.percentageOfHeight(0.1));
    this.tools.cMouse(this.percentageOfWidth(0.5),this.percentageOfHeight(0.25));
    this.tools.cMouse(this.percentageOfWidth(0.5),this.percentageOfHeight(0.3));
    this.tools.cMouse(this.percentageOfWidth(0.5),this.percentageOfHeight(0.5));
    this.tools.cMouse(this.percentageOfWidth(0.8),this.percentageOfHeight(0.1));
    this.tools.cMouse(this.percentageOfWidth(0.8),this.percentageOfHeight(0.25));
    this.tools.cMouse(this.percentageOfWidth(0.8),this.percentageOfHeight(0.5));

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
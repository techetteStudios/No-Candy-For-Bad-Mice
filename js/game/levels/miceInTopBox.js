miceInTopBox= function()
{
    //Level goal & Timer
    this.gameTime = 12;
    this.goal = 20;

    this.lowerGoal = 12;
    this.middleGoal = 18;
    this.higherGoal = 25;
    this.ballImage = "ball_10";

    var version = TGE.Game.GetInstance().version;
    if(version == "original" || version == "christmas")
    {
        this.tools.spawner.setCandyMethod(["fixed",10]);
        this.tools.setNewCandy();
    }

    //Params to set hole
    this.bottomWidth = this.width;
    this.bottomXPos =  this.percentageOfWidth(0.2);
    this.bottomShelfXPos =  this.percentageOfWidth(0.5);
    this.bottomShelfYPos =  this.percentageOfHeight(0.5);

    this.leftWidth =  this.percentageOfWidth(0.5);
    this.rightWidth =  this.percentageOfWidth(0.5);

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
    this.tools.cMouse(this.percentageOfWidth(0.1),this.percentageOfHeight(0.15));
    this.tools.cMouse(this.percentageOfWidth(0.1),this.percentageOfHeight(0.15));
    this.tools.cMouse(this.percentageOfWidth(0.1),this.percentageOfHeight(0.15));
    this.tools.cMouse(this.percentageOfWidth(0.1),this.percentageOfHeight(0.15));
    this.tools.cMouse(this.percentageOfWidth(0.1),this.percentageOfHeight(0.15));
    this.tools.cMouse(this.percentageOfWidth(0.3),this.percentageOfHeight(0.1));
    this.tools.cMouse(this.percentageOfWidth(0.3),this.percentageOfHeight(0.1));
    this.tools.cMouse(this.percentageOfWidth(0.3),this.percentageOfHeight(0.1));
    this.tools.cMouse(this.percentageOfWidth(0.3),this.percentageOfHeight(0.1));
    this.tools.cMouse(this.percentageOfWidth(0.3),this.percentageOfHeight(0.1));
    this.tools.cMouse(this.percentageOfWidth(0.3),this.percentageOfHeight(0.1));
    this.tools.cMouse(this.percentageOfWidth(0.5),this.percentageOfHeight(0.1));
    this.tools.cMouse(this.percentageOfWidth(0.5),this.percentageOfHeight(0.1));
    this.tools.cMouse(this.percentageOfWidth(0.5),this.percentageOfHeight(0.1));
    this.tools.cMouse(this.percentageOfWidth(0.5),this.percentageOfHeight(0.1));
    this.tools.cMouse(this.percentageOfWidth(0.5),this.percentageOfHeight(0.1));
    this.tools.cMouse(this.percentageOfWidth(0.5),this.percentageOfHeight(0.1));
    this.tools.cMouse(this.percentageOfWidth(0.7),this.percentageOfHeight(0.15));
    this.tools.cMouse(this.percentageOfWidth(0.7),this.percentageOfHeight(0.15));
    this.tools.cMouse(this.percentageOfWidth(0.7),this.percentageOfHeight(0.15));
    this.tools.cMouse(this.percentageOfWidth(0.7),this.percentageOfHeight(0.15));
    this.tools.cMouse(this.percentageOfWidth(0.7),this.percentageOfHeight(0.15));
    this.tools.cMouse(this.percentageOfWidth(0.7),this.percentageOfHeight(0.15));
    this.tools.cMouse(this.percentageOfWidth(0.7),this.percentageOfHeight(0.15));
    this.tools.cMouse(this.percentageOfWidth(0.7),this.percentageOfHeight(0.15));
    this.tools.cMouse(this.percentageOfWidth(0.7),this.percentageOfHeight(0.15));
    this.tools.cMouse(this.percentageOfWidth(0.7),this.percentageOfHeight(0.15));




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
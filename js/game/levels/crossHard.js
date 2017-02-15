crossHard = function()
{
    //Level goal & Timer
    this.gameTime = 20;
    this.goal = 60;

    this.ballImage = "ball_20";
    var version = TGE.Game.GetInstance().version;
    if(version == "original" || version == "christmas")
    {
        this.tools.spawner.setCandyMethod(["fixed",20]);
        this.tools.setNewCandy();
    }

    //Params to set hole
    this.bottomWidth = this.width;
    this.bottomXPos =  this.percentageOfWidth(0.5);
    this.bottomShelfWidth = 500;
    this.bottomShelfXPos =  this.percentageOfWidth(0.5);
    this.bottomShelfYPos =  this.percentageOfHeight(0.5);

    this.middleWallHeight =  500;
    this.middleWallXPos =  this.percentageOfWidth(0.5);
    this.middleWallYPos =  this.percentageOfHeight(0.5);

    //Borders
    var margin = this.percentageOfWidth(0.05);
    var rightMarginPos = this.percentageOfWidth(0.95);
    var halfHeight = this.percentageOfHeight(0.5);
    var halfWidth = this.percentageOfWidth(0.5);

    //Roof
    this.tools.cStaticBox({
        x:halfWidth,
        y:margin,
        width:this.width,
        height:margin*4,
        screen:this.getLayer("frame"),
        image:"roof"
    });
    //Middle Wall
    this.tools.cStaticBox({
        x:this.middleWallXPos,
        y:this.middleWallYPos,
        width:margin*2,
        height:this.middleWallHeight ,
        screen:this.getLayer("frame"),
        image:"right_wall"
    });
    //Bottom Shelf
    this.tools.cStaticBox({
        x:this.bottomShelfXPos,
        y:this.bottomShelfYPos,
        width: this.bottomShelfWidth,
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
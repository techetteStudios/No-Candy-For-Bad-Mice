noWallsForTriangle = function()
{
    //Level goal & Timer
    this.gameTime = 20;
    this.goal = 85;

    this.lowerGoal = 35;
    this.middleGoal = 50;
    this.higherGoal = 60;

    this.triangleImage = "triangle_1";

    this.triangleFrequency = 0;
    this.trianglesEnabled = true;

    var version = TGE.Game.GetInstance().version;
    if(version == "original" || version == "christmas")
    {
        this.triangleImage = "triangle_3";
    }

    //Params to set hole
    this.bottomWidth = this.width;
    this.bottomXPos =  this.percentageOfWidth(0.5);
    this.bottomShelfXPos =  this.percentageOfWidth(0.5);
    this.bottomShelfYPos =  this.percentageOfHeight(0.5);

    //Borders
    var margin = this.percentageOfWidth(0.05);
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

};
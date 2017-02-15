moreMice = function()
{
    //Level goal & Timer
    this.gameTime = 20;
    this.goal = 55;

    this.lowerGoal = 35;
    this.middleGoal = 50;
    this.higherGoal = 60;
    this.ballImage = "ball_3";

    var version = TGE.Game.GetInstance().version;
    if(version == "original" || version == "christmas")
    {
        this.tools.spawner.setCandyMethod(["fixed",3]);
        this.tools.setNewCandy();
    }
    this.walls = new Walls(this.width,this.height,this.tools,this.getLayer("frame"));
    this.walls.createWalls("firstMouse");
    //this.walls.shrinkFrame();


    //Mice
    this.tools.cMouse(this.percentageOfWidth(0.5),this.percentageOfHeight(0.5));
    this.tools.cMouse(this.percentageOfWidth(0.5),this.percentageOfHeight(0.5));
    this.tools.cMouse(this.percentageOfWidth(0.5),this.percentageOfHeight(0.5));

};
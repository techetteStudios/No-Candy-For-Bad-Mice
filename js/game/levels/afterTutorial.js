afterTutorial = function()
{
    //Level goal & Timer
    this.gameTime = 30;
    this.goal = 50;

    this.lowerGoal = 30;
    this.middleGoal = 50;
    this.higherGoal = 75;

    this.ballImage = "ball_2";
    var version = TGE.Game.GetInstance().version;
    if(version == "original" || version == "christmas")
    {
        this.tools.spawner.setCandyMethod(["fixed",2]);
        this.tools.setNewCandy();
    }

    this.walls = new Walls(this.width,this.height,this.tools,this.getLayer("frame"));
    this.walls.createWalls("tutorial");
    //this.walls.shrinkFrame();

};
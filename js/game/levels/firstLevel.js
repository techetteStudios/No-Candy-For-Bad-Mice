firstLevel = function()
{
    //Level goal & Timer
    this.gameTime = 25;
    this.goal = 50;

    this.lowerGoal = 40;
    this.middleGoal = 60;
    this.higherGoal = 72;

    this.ballImage = "ball_1";
    var version = TGE.Game.GetInstance().version;
    if(version == "original" || version == "christmas")
    {
        this.tools.spawner.setCandyMethod(["fixed",1]);
        this.tools.setNewCandy();
    }

    this.triangleImage = "triangle_1";
    if(version == "halloween")
    {
        this.trianglesEnabled = true;
        this.triangleFrequency = 6;
    }


    this.walls = new Walls(this.width,this.height,this.tools,this.getLayer("frame"));
    this.walls.createWalls("tutorial");
    //this.walls.shrinkFrame();

};
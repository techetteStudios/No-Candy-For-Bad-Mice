firstHoleHard = function()
{
    //Level goal & Timer
    this.gameTime  = 15;
    this.goal = 60;

    this.lowerGoal = 40;
    this.middleGoal = 55;
    this.higherGoal = 70;

    this.ballImage = "ball_2";

    var version = TGE.Game.GetInstance().version;
    if(version == "original" || version == "christmas")
    {
        this.tools.spawner.setCandyMethod(["fixed",2]);
        this.tools.setNewCandy();
    }

    /**/
    this.walls = new Walls(this.width,this.height,this.tools,this.getLayer("frame"));
    this.walls.createWalls("firstHole");
    //this.walls.shrinkFrame();
    /**/

};
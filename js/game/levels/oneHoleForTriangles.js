oneHoleForTriangles = function()
{
    //Level goal & Timer
    this.gameTime  = 15;
    this.goal = 60;

    this.lowerGoal = 40;
    this.middleGoal = 55;
    this.higherGoal = 70;

    this.triangleImage = "triangle_1";

    this.triangleFrequency = 0;
    this.trianglesEnabled = true;

    var version = TGE.Game.GetInstance().version;
    if(version == "original" || version == "christmas")
    {
        this.triangleImage = "triangle_2";
    }

    /**/
    this.walls = new Walls(this.width,this.height,this.tools,this.getLayer("frame"));
    this.walls.createWalls("oneHoleForTriangles");
    //this.walls.shrinkFrame();
    /**/

};
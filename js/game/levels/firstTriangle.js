firstTriangle = function()
{
    //Level goal & Timer
    this.gameTime = 30;
    this.goal = 50;

    this.lowerGoal = 30;
    this.middleGoal = 50;
    this.higherGoal = 75;

    this.triangleFrequency = 0;
    this.trianglesEnabled = true;
    this.triangleImage = "triangle_1";

    this.walls = new Walls(this.width,this.height,this.tools,this.getLayer("frame"));
    this.walls.createWalls("tutorial");
    //this.walls.shrinkFrame();

};
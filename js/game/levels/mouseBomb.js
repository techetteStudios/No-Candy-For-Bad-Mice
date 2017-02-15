mouseBomb = function()
{
    //Level goal & Timer
    this.gameTime = 15;
    this.goal = 25;


    this.lowerGoal = 15;
    this.middleGoal = 25;
    this.higherGoal = 35;

    this.ballImage = "ball_15";

    var version = TGE.Game.GetInstance().version;
    if(version == "original" || version == "christmas")
    {
        this.tools.spawner.setCandyMethod(["fixed",15]);
        this.tools.setNewCandy();
    }
    this.walls = new Walls(this.width,this.height,this.tools,this.getLayer("frame"));
    this.walls.createWalls("mouseBomb");

    //Mice
    this.mMouseX = this.percentageOfWidth(0.5);
    this.mMouseY = this.percentageOfHeight(0.5);
    this.mouseTime = 6;

    this.tools.cMouse(this.mMouseX ,this.mMouseY);

    this.addEventListener("update",
        function(event)
        {
            var timeElapsed = 15-this.gameTime;
            var spawnNow = (timeElapsed%this.mouseTime < 1);
            if(spawnNow && timeElapsed>1)
            {
                this.tools.cMouse(this.mMouseX ,this.mMouseY);
            }
        }
    );
};
outerBordersInnerShelfHard = function()
{
    this.gameTime = 20;
    this.goal = 55;

    this.ballImage = "ball_1"; //22

    var version = TGE.Game.GetInstance().version;
    if(version == "original")
    {
        this.tools.spawner.setCandyMethod(["fixed",1]); //22
        this.tools.setNewCandy();
    }
    if(version == "christmas")
    {
        this.tools.spawner.setCandyMethod(["fixed",2]); //22
        this.tools.setNewCandy();
    }

    this.walls = new Walls(this.width,this.height,this.tools,this.getLayer("frame"));
    this.walls.createWalls("outerBordersInnerShelf");
    //this.walls.shrinkFrame();

    //Mice
    this.mMouseX = this.percentageOfWidth(0.5);
    this.mMouseY = this.percentageOfHeight(0.05);
    this.mouseTime = 3;

    this.addEventListener("update",
        function(event)
        {
            var spawnNow = (Math.floor(this.gameTime%this.mouseTime) == 0);
            if(spawnNow && !this.alreadySpawned)
            {
                this.tools.cMouse(this.mMouseX ,this.mMouseY);
            }
            this.alreadySpawned = spawnNow;

        }
    );

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
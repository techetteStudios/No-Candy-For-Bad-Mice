cubbyHoles = function()
{
    //Level goal & Timer
    this.gameTime  = 20;
    this.goal = 10;

    this.ballImage = "ball_20";

    var version = TGE.Game.GetInstance().version;
    if(version == "original" || version == "christmas")
    {
        this.tools.spawner.setCandyMethod(["fixed",20]);
        this.tools.setNewCandy();
    }
    //this.ballImage = "ball_23";    //TODO

    /**/
    this.walls = new Walls(this.width,this.height,this.tools,this.getLayer("frame"));
    this.walls.createWalls("cubbyHoles");
    //this.walls.shrinkFrame();

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
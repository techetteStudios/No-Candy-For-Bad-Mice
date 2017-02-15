cubbyHolesHard = function()
{
    //Level goal & Timer
    this.gameTime  = 15;
    this.goal = 10;

    this.ballImage = "ball_2"; //23

    var version = TGE.Game.GetInstance().version;
    if(version == "original")
    {
        this.tools.spawner.setCandyMethod(["fixed",2]); //23
        this.tools.setNewCandy();
    }
    if(version == "christmas")
    {
        this.tools.spawner.setCandyMethod(["fixed",3]); //22
        this.tools.setNewCandy();
    }

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
cubbyHolesWithMice = function()
{
    this.gameTime = 20;
    this.goal = 10;

    this.ballImage = "ball_3";  //24
    var version = TGE.Game.GetInstance().version;
    if(version == "original")
    {
        this.tools.spawner.setCandyMethod(["fixed",3]); //24
        this.tools.setNewCandy();
    }
    if(version == "christmas")
    {
        this.tools.spawner.setCandyMethod(["fixed",4]); //22
        this.tools.setNewCandy();
    }

    /**/
    this.walls = new Walls(this.width,this.height,this.tools,this.getLayer("frame"));
    this.walls.createWalls("cubbyHolesWithMice");
    //this.walls.shrinkFrame();
    //Mice
    this.tools.cMouse(this.percentageOfWidth(0.1),this.percentageOfHeight(0.15));
    this.tools.cMouse(this.percentageOfWidth(0.5),this.percentageOfHeight(0.3));
    this.tools.cMouse(this.percentageOfWidth(0.5),this.percentageOfHeight(0.5));
    this.tools.cMouse(this.percentageOfWidth(0.7),this.percentageOfHeight(0.9));
    this.tools.cMouse(this.percentageOfWidth(0.8),this.percentageOfHeight(0.7));

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
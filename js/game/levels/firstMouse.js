firstMouse = function()
{
    //Level goal & Timer
    this.gameTime = 20;
    this.goal = 60;

    this.lowerGoal = 40;
    this.middleGoal = 55;
    this.higherGoal = 65;

    this.ballImage = "ball_4";
    var version = TGE.Game.GetInstance().version;
    if(version == "original" || version == "christmas")
    {
        this.tools.spawner.setCandyMethod(["fixed",4]);
        this.tools.setNewCandy()
    }

    this.walls = new Walls(this.width,this.height,this.tools,this.getLayer("frame"));
    this.walls.createWalls("firstMouse");
    //this.walls.shrinkFrame();


    //Mice
    this.tools.cMouse(this.percentageOfWidth(0.5),this.percentageOfHeight(0.5));

    //Tutorial Stuff
    this.tutorialObject = this.getLayer("tutorial").addChild(new TGE.DisplayObjectContainer().setup({
        x: 0,
        y: 0
    }));

    this.showTutorialMessage({
        image: "tut_4",
        x: 320,
        y: 5,
        height: 500,
        pressFunction: this.skipTutorial.bind(this)
    });

};
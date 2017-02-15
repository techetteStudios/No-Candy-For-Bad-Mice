noBorders = function()
{
    this.gameTime = 10;
    this.goal = 90;

    this.ballImage = "ball_4"; //25

    var version = TGE.Game.GetInstance().version;
    if(version == "original")
    {
        this.tools.spawner.setCandyMethod(["fixed",4]);   //25
        this.tools.setNewCandy();
    }
    if(version == "christmas")
    {
        this.tools.spawner.setCandyMethod(["fixed",5]); //22
        this.tools.setNewCandy();
    }

};
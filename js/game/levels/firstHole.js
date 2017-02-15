firstHole = function()
{
    //Level goal & Timer
    this.gameTime  = 15;
    this.goal = 60;
    this.lowerGoal = 40;
    this.middleGoal = 55;
    this.higherGoal = 70;

    this.ballImage = "ball_3";

    var version = TGE.Game.GetInstance().version;
    if(version == "original" || version == "christmas")
    {
        this.tools.spawner.setCandyMethod(["fixed",3]);
        this.tools.setNewCandy();
    }

    /**/
    this.walls = new Walls(this.width,this.height,this.tools,this.getLayer("frame"));
    this.walls.createWalls("firstHole");
    //this.walls.shrinkFrame();
    /**/

    //Tutorial Stuff
    this.tutorialObject = this.getLayer("tutorial").addChild(new TGE.DisplayObjectContainer().setup({
        x: 0,
        y: 0
    }));

    this.showTutorialMessage({
        image: "tut_5",
        x: 320,
        y: 5,
        height: 500,
        pressFunction: function(){
            this.arrow.markForRemoval();
            startSecondAnimation(this);
        }.bind(this)
    });

    this.arrow = this.tutorialObject.addChild(new TGE.Sprite().setup( {
        image:"arrowDown",
        x:this.percentageOfWidth(0.7),
        y:this.percentageOfHeight(0.9)
    })).tweenFrom({
        scaleX:0.1,
        scaleY:0.1,
        alpha:0,
        duration:0.5,
        delay:0.25,
        easing:TGE.Tween.Back.Out,
        easingParam:2 // amplitude
    }).thenTweenTo({
        scaleX:1.5,
        scaleY:1.5,
        duration:0.5,
        delay:1,
        loop:true,
        rewind:true,
        easing:TGE.Tween.Quadratic.InOut
    });

    function startSecondAnimation(that) {


    }
};
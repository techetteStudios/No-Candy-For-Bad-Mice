tutorial = function()
{
    //Level goal & Timer
    this.gameTime = 20;
    this.goal = 50;

    this.lowerGoal = 30;
    this.middleGoal = 50;
    this.higherGoal = 60;
    this.ballImage = "ball_1";

    var version = TGE.Game.GetInstance().version;
    if(version == "original" || version == "christmas")
    {
        this.tools.spawner.setCandyMethod(["fixed",1]);
        this.tools.setNewCandy();
    }
    this.walls = new Walls(this.width,this.height,this.tools,this.getLayer("frame"));
    this.walls.createWalls("tutorial");
    //this.walls.shrinkFrame();


    //Tutorial Stuff
    this.tutorialObject = this.getLayer("tutorial").addChild(new TGE.DisplayObjectContainer().setup({
        x: 0,
        y: 0
    }));

    this.skipbutton = this.tutorialObject.addChild(new TGE.Button().setup({
        image: 'skipBtn',
        x: 530,
        y: 150,
        font:"bold 20px BubbleGum",
        pressFunction: this.skipTutorial.bind(this)
    }));
    this.skipbutton.visible = false; //Removed skip button for now

    this.cursorObject = this.tutorialObject.addChild(new TGE.DisplayObjectContainer().setup({
        x: 0,
        y: 0
    }));


    var tutorialFive = {
        //message: "\nClick again to release.",
        image: "tut_7",
        x: 320,
        y: 200,
        pressFunction: function(){
        }.bind(this)
    };
    var tutorialFour = {
        //message: "\nClick again to release.",
        image: "tut_3",
        x: 320,
        y: 100,
        nextTutorial: tutorialFive,
        pressFunction: function(){
            this.tutorialObject.markForRemoval();
        }.bind(this)
    };

    var tutorialThree ={
        //message: "\nFill the box before time runs out!",
        image: "tut_2",
        x: 320,
        y: 35,
        nextTutorial: tutorialFour,
        pressFunction: function(){
            startThirdAnimation(this);
        }.bind(this)
    };

    var tutorialTwo = {
        //message: "\nIf the candy hits\n a wall it resets",
        image: "tut_6",
        x: 320,
        y: 5,
        nextTutorial: tutorialThree,
        pressFunction: function(){
            this.cursorObject.markForRemoval();
        }.bind(this)
    };

    this.showTutorialMessage({
        //message: "\nClick once to start \nforming Candy.",
        image: "tut_1",
        x: 320,
        y: 5,
        nextTutorial: tutorialTwo,
        pressFunction: function(){
            this.cursorObject.markForRemoval();
            startSecondAnimation(this);
        }.bind(this)
    });

    function moveCursor(that){
        that.cursor = that.cursorObject.addChild(new TGE.Sprite().setup({
            image: 'cursor',
            x: 320,
            y: 300
        }));
        that.cursor.tweenTo({
            y:370,
            duration: 0.75,
            easing: TGE.Tween.Linear,
            onComplete: function(){
                that.cursor.markForRemoval();
                startFirstAnimation(that);
            }
        });
    }

    function startFirstAnimation(that) {

        var cursorAnimation = that.cursorObject.addChild(new TGE.SpriteSheetAnimation().setup({
            x:320,
            y:370,
            image:"cursorAnimation",
            rows:1,
            columns:2,
            totalFrames:2,
            fps:3
        }));
        cursorAnimation.play();
        //cursorAnimation.addEventListener("finished", removeCursor.bind(that));
    }

    function startSecondAnimation(that) {

        that.cursorObject = that.tutorialObject.addChild(new TGE.DisplayObjectContainer().setup({
            x: 0,
            y: 0
        }));

        var cursorAnimation = that.cursorObject.addChild(new TGE.SpriteSheetAnimation().setup({
            x:400,
            y:330,
            image:"cursorAnimation",
            rows:1,
            columns:2,
            totalFrames:2,
            fps:3
        }));
        cursorAnimation.play();
        //cursorAnimation.addEventListener("finished", removeCursor.bind(that));
    }

    function startThirdAnimation(that) {

        that.tutorialObject.addChild(new TGE.Sprite().setup( {
            image:"arrowUp",
            x:that.percentageOfWidth(0.5),
            y:that.percentageOfHeight(0.15)
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

    }

    moveCursor(this);

};
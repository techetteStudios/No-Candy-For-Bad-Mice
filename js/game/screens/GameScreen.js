GameScreen = function(width,height)
{
    GameScreen.superclass.constructor.apply(this,arguments);


    this.DEBUG = true;
    this.areaFilled = 0;
    this.areaToFill = 369000;
    this.trianglesEnabled = false;
    this.triangleFrequency = 2;
    this.stage._mCanvas.setAttribute("id", "canvas");

    this.world = null;
    this.candyArray = [];
    this.miceArray = [];
    this.paused = false;
    this.gameEnd = false;

    //Public Members
    this.gameTime = 0;//Timer
    this.goal = 60; //default

    //Private Members
    this._mCurrentTutorial = null;
    this.lastHitRadius = 100000;



};

GameScreen.prototype =
{

    setup:function(params)
    {
        GameScreen.superclass.setup.call(this,params);

        params.level = typeof params.level == "number" ? params.level : 0;
        if(params.level == 0 && TGE.Game.GetInstance().mode == 0)
        {
            this.addEventListener("mousedown", this.mouseTutorial.bind(this));
            this.addEventListener("update",this.updateTutorial.bind(this));
            this.tutorialState = 1;
        }
        else
        {
            this.addEventListener("mousedown", this.mousePressed.bind(this));
            this.addEventListener("update",this.update.bind(this));
        }
        if(this.DEBUG)
        {
            this.addEventListener("keydown",this._keyDown.bind(this));
        }
        TGE.Game.GetInstance().updateLevel(params.level);

        this.levelIndex = TGE.Game.GetInstance().currentLevelIndex;
        this.levelNo = this.levelIndex+1;

        TGS.Analytics.logLevelEvent('start',this.levelNo);

        //Init needs to go before layer creation
        this.init();

        // Create the layers before loading levels
        this.createLayer("background");
        this.createLayer("ballLayer");
        this.createLayer("mouse");
        this.createLayer("frame");
        this.createLayer("hits");
        this.createLayer("UI");
        this.createLayer("tutorial");

        // Load the level
        this.loadLevel(TGE.Game.GetInstance().currentLevel);

        this.background = this.getLayer("background").addChild(new TGE.Sprite().setup({
            image: "woodBG",
            x:this.percentageOfWidth(0.5),
            y:this.percentageOfHeight(0.5)
        }));


        this.lowerGoal = typeof this.lowerGoal == "undefined" ? this.goal*0.9 : this.lowerGoal;
        this.middleGoal = typeof this.middleGoal == "undefined" ? this.goal : this.middleGoal;
        this.higherGoal = typeof this.higherGoal == "undefined" ? this.goal*1.1 : this.higherGoal;
        this.goal = this.lowerGoal;

        //console.log(this.lowerGoal + " " + this.middleGoal + " " + this.higherGoal);
        this.createUIElements();
        this.setProgress();
    },

    loadLevel: function(level)
    {
        level.call(this);
    },

    pauseGame: function()
    {
        if(!this.paused)
        {
            this.overlayWindow({windowClass:PauseScreen,fadeTime:0.25});
            this.paused = true;
        }
    },

    createUIElements: function()
    {
        this.levelHeader = this.getLayer("UI").addChild(new TGE.Sprite().setup( {
            image: "lvl_header",
            x:this.percentageOfWidth(0.5),
            y:this.percentageOfHeight(0.05)
        }));

        //Top Bar of Text
        this.levelText = this.getLayer("UI").addChild(new TGE.Text().setup( {
            text: "Lvl: " + this.levelNo,
            x:this.percentageOfWidth(0.025),
            y:this.percentageOfHeight(0.05),
            hAlign:"left",
            font:"bold 30px BubbleGum",
            color:"#000",
            strokeWidth:2,
            strokeColor:"#fff"
        }));
        this.timerSprite = this.getLayer("UI").addChild(new TGE.Sprite().setup( {
            image: "clock",
            x:this.percentageOfWidth(0.8),
            y:this.percentageOfHeight(0.05)
        }));
        this.timerText = this.getLayer("UI").addChild(new TGE.Text().setup( {
            text: "",
            x:this.percentageOfWidth(0.8),
            y:this.percentageOfHeight(0.05),
            hAlign:"center",
            font:"bold 25px BubbleGum",
            color:"#000",
            strokeWidth:2,
            strokeColor:"#49D9E4"
        }));

        //Top Bar Progress Meter
        /**
        this.targetPercentage = this.getLayer("UI").addChild(new TGE.Sprite().setup({
            x:this.percentageOfWidth(0.47),
            y:this.percentageOfHeight(0.05),
            width:300,
            height:30,
            backgroundColor:"red"
        }));
        this.currentPercentage = this.getLayer("UI").addChild(new TGE.Sprite().setup({
            x:this.percentageOfWidth(0.47)-150,
            y:this.percentageOfHeight(0.05),
            registrationX:0,
            width:300,
            height:30,
            backgroundColor:"gold",
            scaleX:0
        }));


        this.firstTarget = this.getLayer("UI").addChild(new TGE.Sprite().setup({
            x:this.percentageOfWidth(0.5),
            y:this.percentageOfHeight(0.05),
            registrationX:0,
            width:5,
            height:30,
            backgroundColor:"black"
        }));
        this.secondTarget = this.getLayer("UI").addChild(new TGE.Sprite().setup({
            x:this.percentageOfWidth(0.55),
            y:this.percentageOfHeight(0.05),
            registrationX:0,
            width:5,
            height:30,
            backgroundColor:"black"
        }));
        this.thirdTarget = this.getLayer("UI").addChild(new TGE.Sprite().setup({
            x:this.percentageOfWidth(0.6),
            y:this.percentageOfHeight(0.05),
            registrationX:0,
            width:5,
            height:30,
            backgroundColor:"black"
        }));
        /**/

        this.progressBar = this.getLayer("UI").addChild(new ProgressBar().setup({
            x:this.percentageOfWidth(0.47),
            y:this.percentageOfHeight(0.05),
            low:this.lowerGoal,
            mid:this.middleGoal,
            high:this.higherGoal
        }));

        // Pause button
        this.getLayer("UI").addChild(new TGE.Button().setup({
            image:"pause",
            x:this.percentageOfWidth(0.93),
            y:this.percentageOfHeight(0.05),
            scale: 0.65,
            pressFunction:this.pauseGame.bind(this)
        }));

    },

    showTutorialMessage: function(params)
    {
        if(this._mCurrentTutorial)
        {
            this._mCurrentTutorial.message.image = params.image;
            this._mCurrentTutorial.message.text = params.message;
            this._mCurrentTutorial.pressFunction = params.pressFunction;

            return;
        }
        params.rotation = typeof params.rotation == "number" ? params.rotation : 0;

        var s = Math.min(this.height/536, this.width/960);
        var x = (this.width-(s*960))/2 + params.x*s;
        var y = (this.height-(s*536))/3.5 + params.y*s;

        var tutorialBox = this.getLayer("UI").addChild(new TGE.DisplayObjectContainer().setup({
            width: 350*s,
            height: 300*s,
            rotation:params.rotation,
            registrationX: 0,
            registrationY: 0,
            x: x,
            y: y
        }));

        if(params.image)
        {
            tutorialBox.message = tutorialBox.addChild(new TGE.Sprite().setup({
                image: params.image,
                x: this.pixelsFromLeft(100),
                y: this.pixelsFromTop(10)
            }));
        }
        else
        {
            tutorialBox.message = tutorialBox.addChild(new TGE.Text().setup({
                text: params.message,
                font:"16px",
                x: this.pixelsFromLeft(100),
                y: this.pixelsFromTop(50)
            }));
        }

        tutorialBox.pressFunction = params.pressFunction;

        tutorialBox.tweenFrom({
            alpha: 0,
            duration: 0.75
        });

        this._mCurrentTutorial = tutorialBox;
        this._mCurrentTutorial.nextTutorial = params.nextTutorial;
    },

    findHit: function()
    {
        var x = this.candyToCreateBody.mySprite.x;
        var y = this.candyToCreateBody.mySprite.y;
        var r = this.candyToCreateBody.boundingRadius;
        if(x - r < 65)
        {
            this.addHit(65,y);
        }
        if(y  - r < 96)
        {
            this.addHit(x,96);
        }
        if(x + r > 575)
        {
            this.addHit(575,y);
        }
        if(y + r > 779)
        {
            this.addHit(x,779);
        }
    },

    addHit: function(x,y)
    {
        var hit = this.getLayer("hits").addChild(new TGE.Sprite().setup({
            image: "bang",
            x:x,
            y:y
        }));
        var timer = 0;
        var last = 0;
        var frequency = 2;
        hit.addEventListener("update",function(event)
        {
            timer += event.elapsedTime;
            if(Math.floor(timer*10)%frequency == 0 && Math.floor(timer*10) != last)
            {
                last = Math.floor(timer*10);
                hit.alpha = hit.alpha == 0 ? 1 : 0;
            }
        });
    },


    closeTutorial: function()
    {
        if(this._mCurrentTutorial)
        {
            var tut = this._mCurrentTutorial;
            tut.tweenTo({
                alpha: 0,
                duration: 1,
                onComplete: tut.markForRemoval.bind(tut)
            });


        }
    },
    tutorialNext: function()
    {
        var tut = this._mCurrentTutorial;
        this._mCurrentTutorial = null;
        if(tut.pressFunction)
        {
            tut.pressFunction();
        }
        if(tut.nextTutorial)
        {
            this.showTutorialMessage(tut.nextTutorial);
        }
    },

    skipTutorial: function()
    {
        TGS.Analytics.logCustomEvent('skipped_tutorial');
        if(this._mCurrentTutorial)
        {
            this._mCurrentTutorial.markForRemoval();
            this._mCurrentTutorial = null;
            this.tutorialObject.markForRemoval();
        }
    },

    setProgress: function()
    {
        var percent = this.getPercent();
        //this.currentPercentage.scaleX = Math.min(1,(percent*0.0058));
        this.progressBar.setProgress(Math.min(1,(percent*0.01)));
    },

    percentDecimal: function()
    {
        this.areaToFill = 368000;
        return this.areaFilled/this.areaToFill;
    },

    getPercent: function()
    {
        var percentDecimal = this.percentDecimal();
        return Math.floor(percentDecimal*100);
    },

    init: function () {

        this.tools = new P2Tools(this);
        var world = this.webWorld = this.tools.cWorld(0,-981);

        world.on("impact",this.objectCollision.bind(this));


        // Animation loop
        function animate(t){
            t = t || 0;
            requestAnimationFrame(animate);

            // Move physics bodies forward in time
            world.step(1/60);
        }
        //animate();
    },

    objectCollision: function(contact)
    {
        if(contact.bodyA == this.candyToCreateBody
            || contact.bodyB == this.candyToCreateBody)
        {
            if(this.candyToCreateBody.boundingRadius > 10 && this.charging)
            {
                this.lastHitRadius = this.candyToCreateBody.boundingRadius;
            }
            if(this.tutorialState == 2)
            {
                this.tutorialState = 3;
                this.findHit();
                this.tutorialNext();
            }
            else
            {//Normal collision except when you are in level 3 waiting for user to continue
                if(this.tutorialState != 3)
                {
                    this.newCandyScale = 0.01;
                }
            }
        }
    },

    mouseTutorial: function(event)
    {
        if(this.tutorialState == 1
            || this.tutorialState == 5
            //|| this.tutorialState == 6
            || this.tutorialState == 7
            || this.tutorialState == 8)
        {
            this.mousePressed(event);
        }
        if(this.tutorialState == 3 || this.tutorialState == 5 || this.tutorialState == 6 || this.tutorialState == 7)
        {
            this.candyToCreateBody.boundingRadius = 1;
            this.closeTutorial();
            this.tutorialNext();
            this.getLayer("hits").visible = false;
            this.tutorialState++;
        }
    },

    mousePressed: function(event)
    {
        if(this.tutorialState == 1
            && (event.stageX < 270 ||
            event.stageX > 370 ||
            event.stageY < 300 ||
            event.stageY > 550))
        {
            return;
        }
        //Add return for out of bounds (ie. x to low, y too low, x too high, y too high)
        this.closeTutorial();
        if(this.charging)
        {
            this.createCandy();
            return;
        }
        this.charging = true;
        this.newCandyScale = 0.01;
        this.candyToCreateBody = this.createObject(event.stageX,event.stageY,this.ballImage,0.01,0.25);
    },

    createCandy: function()
    {
        if(this.newCandyScale > 0.1)
        {
            var factor = (this.everyFew == this.triangleFrequency) ? 2 :Math.PI;
            this.areaFilled += (this.newCandyScale*100)*(this.newCandyScale*100)*factor;
            this.setProgress();
            this.candyToCreateBody.mySprite.alpha = 1;
            this.candyToCreateBody.mySprite.hardened = true;
            this.candyArray.push(this.candyToCreateBody);
        }
        else
        {
            this.candyToCreateBody.mySprite.alpha = 0;
            this.webWorld.removeBody(this.candyToCreateBody);
        }
        this.charging = false;
        this.tools.setNewCandy();
        if(this.everyFew == this.triangleFrequency)
        {
            this.everyFew = 0;
        }
        else
        {
            this.everyFew++;
        }
        this.lastHitRadius = 100000;


        //this.candyToCreateBody = null;
    },

    updateTutorial: function(event)
    {
        // If the update event is getting fired it means we're not paused anymore
        if(this.paused)
        {
            this.paused = false;
        }

        switch(this.tutorialState)
        {
            case 1: //First input
                this.webWorld.step(event.elapsedTime);
                this.checkCandyCreation(event);
                if(this.charging)
                {
                    this.tutorialState++;
                }
                break;
            case 2:
                this.webWorld.step(event.elapsedTime);
                this.checkCandyCreation(event);
                break;
            case 3:
                break;
            case 4:
                if(this.candyToCreateBody.boundingRadius < this.lastHitRadius-10)
                {
                    this.webWorld.step(event.elapsedTime);
                    this.checkCandyCreation(event);
                }
                else
                {
                    this.tutorialState++;
                }
                break;
            case 5:
                break;
            case 8:
                this.webWorld.step(event.elapsedTime);
                this.checkCandyCreation(event,true);
                this.checkGameOver(event);
                break;
            default:
                this.webWorld.step(event.elapsedTime);
                this.checkCandyCreation(event);
                break;

        }
        this.checkLooseCandy();
        this.timerText.text = Math.floor(this.gameTime-0.001)+1;
    },

    update: function(event)
    {
        // If the update event is getting fired it means we're not paused anymore
        if(this.paused)
        {
            this.paused = false;
        }

        this.webWorld.step(event.elapsedTime);
        this.checkCandyCreation(event,true);
        this.checkLooseCandy();
        this.moveMice();
        this.checkGameOver(event);
    },

    moveMice: function()
    {
        for(var i = 0; i < this.miceArray.length; i++)
        {
            var mouseObj = this.miceArray[i];
            var threshold = 2;

            if(/*mouseObj.velocity[0] < threshold &&
                mouseObj.velocity[0] > -threshold &&*/
                mouseObj.velocity[1] < threshold &&
                mouseObj.velocity[1] > -threshold)
            {
                mouseObj.velocity[0] = Math.random()*150 - 75;
                mouseObj.velocity[1] = 1000;
            }
        }
    },

    clipDecimal: function(number)
    {
        return Math.floor(number*10000)/10000;
    },

    checkCandyCreation: function(event,slowdown)
    {
        if(this.charging)
        {
            this.newCandyScale += event.elapsedTime;
            if(slowdown)
            {
                var amount = event.elapsedTime * (this.candyToCreateBody.boundingRadius/this.lastHitRadius);
                var diff = event.elapsedTime - amount;
                /**
                console.log("Slowing down " +
                    this.clipDecimal(this.lastHitRadius) + " to " +
                    this.clipDecimal(amount) + " to " +
                    this.clipDecimal(diff) + " speed diff = " +
                    this.clipDecimal(diff/event.elapsedTime));
                /**/
                if(diff/event.elapsedTime < 0.2)
                {
                    this.newCandyScale -= amount;
                }
                else
                {
                    this.newCandyScale += event.elapsedTime*0.5;
                }
            }
            var nexX = this.candyToCreateBody.mySprite.x;
            var nexY = this.candyToCreateBody.mySprite.y;
            var previousRotation = this.candyToCreateBody.mySprite.rotation;
            this.candyToCreateBody.mySprite.markForRemoval();
            this.webWorld.removeBody(this.candyToCreateBody);
            var alpha = this.newCandyScale > 0.25 ? 0.3 : 0.15;
            this.candyToCreateBody = this.createObject(nexX,nexY,this.ballImage,this.newCandyScale,alpha,previousRotation + event.elapsedTime*300);
        }
    },

    checkGameOver: function(event)
    {
        //Keep track of elapsed game time
        this.gameTime -= event.elapsedTime;
        this.timerText.text = Math.floor(this.gameTime)+1;
        if(this.gameTime <=0)
        {
            if(!this.gameEnd)
            {
                this.overlayWindow({windowClass:TimesUp,fadeTime:0,callback:this.endGame.bind(this)});
                this.gameEnd = true;
            }
        }
    },

    endGame: function()
    {
        if(this.getPercent() >= this.lowerGoal)
        {
            var stars = 1;
            stars = this.getPercent() >= this.middleGoal ? 2 : stars;
            stars = this.getPercent() >= this.higherGoal ? 3 : stars;

            this.transitionToWindow({
                windowClass:LevelUp,
                timer:this.gameTime,
                stars:stars
            });
        }
        else
        {
            this.transitionToWindow({
                windowClass:GameOver,
                timer:this.gameTime
            });
        }
    },

    checkLooseCandy: function()
    {
        for(var i = this.candyArray.length-1; i >= 0; i--)
        {
            var candy = this.candyArray[i];
            var r = candy.boundingRadius;
            if(candy.mySprite.y-r > this.height)
            {
                this.webWorld.removeBody(candy);
                this.candyArray.splice(i,1);
                this.areaFilled -= r*r*Math.PI;
                this.setProgress();
            }
        }
    },

    everyFew:0,


    createObject: function(posX,posY,image,scale,alpha,rotationOffset )
    {
        if(typeof alpha !== "number")
        {
            alpha = 1;
        }
        if(typeof rotationOffset !== "number")
        {
            rotationOffset = 0;
        }
        //TODO SWITCH BACK FOR REGULAR GAME
        if(this.everyFew == this.triangleFrequency && this.trianglesEnabled)
        {
            return this.tools.cTriangleX(posX,posY,100,this.triangleImage,scale,alpha,0);
        }
        else
        {
            return this.tools.cCircle(posX,posY,100,this.ballImage,scale,alpha,rotationOffset);
        }
    },


    _keyDown: function(event)
    {
        var keyCode = event.keyCode;
        var setting = "";
        // E - edit mode
        if(this.DEBUG && keyCode==69)//Remove edit mode
        {
            setting = this.getLayer("background").visible;
            this.getLayer("background").visible = !setting;
        }
        // R - edit mode
        if(this.DEBUG && keyCode==82)//Remove edit mode
        {
            setting = this.getLayer("frame").visible;
            this.getLayer("frame").visible = !setting;
        }

    }

};
extend(GameScreen,TGE.Window);

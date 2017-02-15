PauseScreen = function(width,height)
{
    PauseScreen.superclass.constructor.apply(this,arguments);

    // We want the game updates to originate from this window - everything below it will effectively be frozen
    TGE.Game.SetUpdateRoot(this);

    // Create a semi-transparent background
    this.addChild(new TGE.DisplayObject().setup({
        registrationX:0,
        registrationY:0,
        width:this.width,
        height:this.height,
        backgroundColor:"#fff",
        alpha:0.6
    }));

    // Pause text
    this.addChild(new TGE.Sprite().setup( {
        image:"paused",
        x:this.percentageOfWidth(0.5),
        y:this.percentageOfHeight(0.2)
    }));

    // Resume button
    this.addChild(new TGE.Button().setup( {
        image:"btn_resume",
        x:this.percentageOfWidth(0.5),
        y:this.percentageOfHeight(0.35),
        pressFunction:this.resume.bind(this)
    }));

    // Restart button
    this.addChild(new TGE.Button().setup( {
        image:"btn_restart",
        x:this.percentageOfWidth(0.5),
        y:this.percentageOfHeight(0.45),
        pressFunction:this.restart.bind(this)
    }));

    // Quit button
    this.addChild(new TGE.Button().setup( {
        image:"btn_quit",
        x:this.percentageOfWidth(0.5),
        y:this.percentageOfHeight(0.55),
        pressFunction:this.quitGame.bind(this)
    }));

	// Instructions button
	this.addChild(new TGE.Button().setup( {
        image:"btn_instructions",
        x:this.percentageOfWidth(0.5),
        y:this.percentageOfHeight(0.65),
		pressFunction:this.showInstructions.bind(this)
	}));

    this.levelIndex = TGE.Game.GetInstance().currentLevelIndex;
    this.levelNo = this.levelIndex+1;

    TGS.Analytics.logScreen('PauseScreen'); // open pause screen

};

PauseScreen.prototype =
{
    resume: function()
    {
        TGS.Analytics.logCustomEvent('resume_from_Pause', 0, {'level':this.levelNo});
       this.close();
    },

    restart: function()
    {
        TGS.Analytics.logCustomEvent('restart from Pause', 0, {'level':this.levelNo });
        this.resetToWindow({
            windowClass:GameScreen,
            level: TGE.Game.GetInstance().currentLevelIndex
        });
    },

	quitGame: function()
    {
        TGS.Analytics.logCustomEvent('quit from Pause', 0, {'level':this.levelNo });
        this.resetToWindow({windowClass:LevelSelect});
    },

	showInstructions: function()
	{
        TGS.Analytics.logCustomEvent('instructions from Pause', 0, {'level':this.levelNo });
		// Overlays a new window on top of this one
		this.overlayWindow({windowClass:Instructions,fadeTime:0.75,from:"pause"});
	}
};
extend(PauseScreen,TGE.Window);

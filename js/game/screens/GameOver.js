GameOver = function()
{
    GameOver.superclass.constructor.apply(this,arguments);

    // GameOver Background
    this.addChild(new TGE.Sprite().setup( {
        image:"mainMenuBG",
        x:this.percentageOfWidth(0.5),
        y:this.percentageOfHeight(0.5)
    }));

    this._mUix = this.percentageOfWidth(0.5);

    // Game over message
    this.addChild(new TGE.Sprite().setup( {
        x:this._mUix,
        y:this.percentageOfHeight(0.1),
        image:"gameover"
    }));

};

GameOver.prototype =
{
    show: function() {
        GameOver.superclass.show.apply(this,arguments);

        // Track screen
        TGS.Analytics.logScreen('GameOver');
    },

    // The setup function is defined in the TGE.DisplayObject base class - we can override it here if our window
    // has custom information we need to pass in. In this case we'll pass in the score and highscore so we can
    // customize the game over screen.
    setup: function(params)
    {
        GameOver.superclass.setup.call(this,params);

        this.levelIndex = TGE.Game.GetInstance().currentLevelIndex;
        this.levelNo = this.levelIndex+1;

        TGS.Analytics.logLevelEvent('fail',this.levelNo);

        // Buttons
        var x = this.percentageOfHeight(0.225);
        var y = this.percentageOfHeight(0.8);

        // Try again button
        this.addChild(new TGE.Button().setup( {
            image:"btn_tryagain",
            x:x,
            y:y,
            pressFunction:this.playAgain.bind(this)
        }));

        //Level Select button
        this.addChild(new TGE.Button().setup( {
            image:"btn_levelselect",
            x:this.percentageOfHeight(0.55),
            y:y,
            pressFunction:this.gotoLevelSelect.bind(this)
        }));

        //SubmitScore
        var numOfStars = TGE.Game.GetInstance().getTotalStars();
        TGS.Leaderboard.SubmitScore({score:numOfStars, leaderboardID:1});

        // TGS Game Over Widget
        this.widget = TGS.Widget.CreateWidget({
            x: 158,
            y: 155,
            leaderboardID: 1,
            shareMessage: "I just earned " + numOfStars + " stars in No Candy For Bad Mice. Beat that!",
            disableInterstitialAd: TGE.Game.GetInstance().unlockedOn
        });

        return this;
    },

    playAgain: function()
    {
        TGS.Analytics.logLevelEvent('replay',this.levelNo);
        if (this.widget != null && typeof this.widget !== "undefined"){
            var self = this;
            this.widget.close(function(){
                self.transitionToWindow({
                    windowClass:GameScreen,
                    level:self.levelIndex
                });
            });
        }
    },

    gotoLevelSelect: function()
    {
        TGS.Analytics.logCustomEvent('LvlSelect from GameOver', 0, {'level':this.levelNo});
        if (this.widget != null && typeof this.widget !== "undefined"){
            var self = this;
            this.widget.close(function(){
                self.transitionToWindow({windowClass:LevelSelect})
            });
        }
    }
};
extend(GameOver,TGE.Window);
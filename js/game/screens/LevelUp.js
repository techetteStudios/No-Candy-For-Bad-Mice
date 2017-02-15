LevelUp = function(width,height)
{
    LevelUp.superclass.constructor.apply(this,arguments);

    // LevelUp Background
    this.addChild(new TGE.Sprite().setup( {
        image:"mainMenuBG",
        x:this.percentageOfWidth(0.5),
        y:this.percentageOfHeight(0.5)
    }));

};

LevelUp.prototype =
{
    setup: function(params)
    {
        LevelUp.superclass.setup.call(this,params);

        this.game = TGE.Game.GetInstance();
        var currentLevelIndex = this.game.currentLevelIndex;
        var nextLevelIndex;
        this.currentLevelText = nextLevelIndex = ++this.game.currentLevelIndex;
        var nextLevelText = this.game.currentLevelIndex+1;
        var totNumOfLevels = this.game.totNumOfLevels;

        var timeFinished = Math.floor(params.timer);
        var starsEarned = params.star;
        this.game.saveLevel(this.game.currentLevelIndex,{stars:params.stars,score:timeFinished});

        if(nextLevelIndex > this.game.highestLevel && nextLevelIndex<totNumOfLevels+1)
        {
            this.game.highestLevel = nextLevelIndex;
            TGS.Analytics.logAchievementEvent("new_level_unlocked", this.game.highestLevel);
        }

        //TODO add back in
        this.game.saveState();

        //Analytics
        TGS.Analytics.logLevelEvent('complete',this.currentLevelText, timeFinished);

        // LevelUp Title
        this.levelUpTitle = this.addChild(new TGE.Text().setup( {
            text:"",
            x:this.percentageOfWidth(0.5),
            y:this.percentageOfHeight(0.08),
            hAlign:"center",
            font:"bold 60px BubbleGum",
            color:"#0D0C0C"
        }));

        //Stars
        var levelData = this.game.mode==0? this.game.levelDataEasy:this.game.levelDataHard;
        var modeType = this.game.mode==0? "levelDataEasy":"levelDataHard";
        var level = this.currentLevelText;
        var levelStars = levelData[modeType+level].stars;
        var starXPos = this.percentageOfWidth(0.4);
        var starYPos = this.percentageOfHeight(0.14);
        for(var j = 0; j < levelStars; j++)
        {
            this.addChild(new TGE.Sprite().setup({
                image:"star",
                x:starXPos,
                y:starYPos
            }));
            starXPos += 60;
        }
        for(var k = 0; k < 3-levelStars; k++)
        {
            this.addChild(new TGE.Sprite().setup({
                image:"graystar",
                x:starXPos,
                y:starYPos
            }));
            starXPos += 60;
        }


        var yPos = this.percentageOfHeight(0.75);

        //SubmitScore
        var numOfStars = TGE.Game.GetInstance().getTotalStars();
        TGS.Leaderboard.SubmitScore({score:numOfStars, leaderboardID:1});

        if(nextLevelIndex<TGE.Game.GetInstance().numOfCreatedLevelsIndex+1)  //TODO from 25 to totNumOfLevels after all levels have been made
        {

            this.levelUpTitle.markForRemoval();

            // Game over message
            this.levelUpTitle = this.addChild(new TGE.Sprite().setup( {
                x:this.percentageOfWidth(0.5),
                y:this.percentageOfHeight(0.08),
                image:"levelup"
            }));

            // Next Level button
            this.addChild(new TGE.Button().setup( {
                image:"btn_nextlevel",
                x:this.percentageOfWidth(0.5),
                y:this.percentageOfHeight(0.725),
                pressFunction:this.gotoNext.bind(this, nextLevelIndex)
            }));

            yPos = this.percentageOfHeight(0.85);

            // TGS Game Over Widget
            this.widget = TGS.Widget.CreateWidget({
                x: 158,
                y: 155,
                leaderboardID: 1,
                shareMessage: "I just earned " + numOfStars + " stars in No Candy For Bad Mice. Beat that!",
                disableInterstitialAd: TGE.Game.GetInstance().unlockedOn
            });
        }
        else
        {
            this.levelUpTitle.text = "Congratulations!";
            this.levelUpTitle.font = "bold 40px BubbleGum";

            // TGS Game Over Widget
            this.widget = TGS.Widget.CreateWidget({
                x: 158,
                y: 155,
                leaderboardID: 1,
                shareMessage: "I just beat every level in No Candy For Bad Mice and earned " +numOfStars+ " stars. Beat that!",
                disableInterstitialAd: TGE.Game.GetInstance().unlockedOn
            });

            this.moreToCome= this.addChild(new TGE.Text().setup( {
                text:"More Levels Coming Soon!",
                x:this.percentageOfWidth(0.5),
                y:this.percentageOfHeight(0.9),
                hAlign:"center",
                font:"bold 40px BubbleGum",
                color:"#0D0C0C"
            }));
        }

        // Replay Level button
        this.addChild(new TGE.Button().setup( {
            image:"btn_replay",
            x:this.percentageOfHeight(0.225),
            y:yPos,
            pressFunction:this.replay.bind(this, currentLevelIndex)
        }));

        //Level Select button
        this.addChild(new TGE.Button().setup( {
            image:"btn_levelselect",
            x:this.percentageOfHeight(0.55),
            y:yPos,
            pressFunction:this.gotoLevelSelect.bind(this)
        }));

    },

    play: function(level)
    {
        if (this.widget != null && typeof this.widget !== "undefined"){
            var self = this;
            this.widget.close(function(){
                self.transitionToWindow({
                    windowClass:GameScreen,
                    level:level
                });
            });
        }
    },

    gotoNext: function(level)
    {
        TGS.Analytics.logCustomEvent('nextLvl from LvlUp', 0, {'level':this.currentLevelText});
        this.play(level);
    },

    replay: function(level)
    {
        TGS.Analytics.logLevelEvent('replay',this.currentLevelText);
        this.play(level);
    },

    gotoLevelSelect: function()
    {
        TGS.Analytics.logCustomEvent('LvlSelect from LvlUp', 0, {'level':this.currentLevelText});
        if (this.widget != null && typeof this.widget !== "undefined"){
            var self = this;
            this.widget.close(function(){
                self.resetToWindow({windowClass:LevelSelect});
            });
        }

    }
};
extend(LevelUp,TGE.Window);

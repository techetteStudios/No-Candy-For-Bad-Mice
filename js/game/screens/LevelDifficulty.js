LevelDifficulty = function(width,height)
{
    LevelDifficulty.superclass.constructor.apply(this,arguments);

    // Create a semi-transparent background
    this.addChild(new TGE.Sprite().setup( {
        image:"mainMenuBG",
        x:this.percentageOfWidth(0.5),
        y:this.percentageOfHeight(0.5)
    }));

    this.game = TGE.Game.GetInstance();

};

LevelDifficulty.prototype =
{
    setup: function(params)
    {
        TGS.Analytics.logScreen('LevelDifficulty');

        // Level Difficulty Title
        this.addChild(new TGE.Sprite().setup( {
            image:"levelDifficulty",
            x:this.percentageOfWidth(0.5),
            y:this.percentageOfHeight(0.125)
        }));

        //Easy button
        this.addChild(new TGE.Button().setup( {
            image:"btn_easy",
            x:this.percentageOfWidth(0.5),
            y:this.percentageOfHeight(0.25),
            pressFunction:this.selectEasy.bind(this)
        }));

        //Hard button
        this.nextButton = this.addChild(new TGE.Button().setup( {
            image:"btn_hard",
            x:this.percentageOfWidth(0.5),
            y:this.percentageOfHeight(0.37),
            pressFunction:this.selectHard.bind(this)
        }));
    },

    selectEasy: function()
    {
        TGS.Analytics.logCustomEvent('selected EASY');
        this.game.mode = 0;
        this.game.numOfCreatedLevelsIndex = 19; //****TODO change based on how many levels are designed for EASY
        this.game.numPages = 2;
        this.game.numRowByCol = 4;
        this.game.totNumOfLevels = this.game.numRowByCol*this.game.numRowByCol*this.game.numPages;
        this.game.updateLevel(0);
        this.game.getLevelProgress();
        this.gotoLevelSelect();
    },

    selectHard: function()
    {
        TGS.Analytics.logCustomEvent('selected HARD');
        this.game.mode = 1;
        this.game.numOfCreatedLevelsIndex = 24; //****TODO change based on how many levels are designed for EASY
        this.game.numPages = 2;
        this.game.numRowByCol = 4;
        this.game.totNumOfLevels = this.game.numRowByCol*this.game.numRowByCol*this.game.numPages;
        this.game.updateLevel(0);
        this.game.getLevelProgress();
        this.gotoLevelSelect();
    },

    gotoLevelSelect: function()
    {
        TGS.Analytics.logCustomEvent('lvlSelect from lvlDifficulty');
        // Opens a new window and closes this one when done
        this.resetToWindow({windowClass:LevelSelect});
    }
};
extend(LevelDifficulty,TGE.Window);

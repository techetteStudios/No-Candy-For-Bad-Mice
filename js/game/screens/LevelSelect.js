LevelSelect = function(width,height)
{
    LevelSelect.superclass.constructor.apply(this,arguments);

    // Create a semi-transparent background
    // LevelUp Background
    this.addChild(new TGE.Sprite().setup( {
        image:"regularBG",
        x:this.percentageOfWidth(0.5),
        y:this.percentageOfHeight(0.5)
    }));
    this.addChild(new TGE.Sprite().setup( {
        x:this.percentageOfWidth(0.5),
        y:this.percentageOfHeight(0.5),
        alpha:0.0,
        backgroundColor:"white",
        width:this.width,
        height:this.height
    }));

    // LevelSelect Title
    this.addChild(new TGE.Sprite().setup( {
        image:"levelselect",
        x:this.percentageOfWidth(0.5),
        y:this.percentageOfHeight(0.09)
    }));

    // Main menu button
    this.addChild(new TGE.Button().setup( {
        image:"btn_mainmenu",
        x:this.percentageOfWidth(0.5),
        y:this.percentageOfHeight(0.85),
        pressFunction:this.gotoMainMenu.bind(this)
    }));

    // Previous button
    this.levelsBackground = this.addChild(new TGE.Sprite().setup( {
        image:"levelwindow",
        x:this.percentageOfWidth(0.5),
        y:this.percentageOfHeight(0.475)
    }));
    this.levelsBackground.visible = true;

    // Next button
    this.nextButton = this.addChild(new TGE.Button().setup( {
        image:"btn_next",
        x:this.percentageOfWidth(0.815),
        y:this.percentageOfHeight(0.85),
        pressFunction:this.goToNext.bind(this)
    }));

    // Previous button
    this.prevButton = this.addChild(new TGE.Button().setup( {
        image:"btn_prev",
        x:this.percentageOfWidth(0.185),
        y:this.percentageOfHeight(0.85),
        pressFunction:this.goToPrevious.bind(this)
    }));

    this.levelButtons = [];
    this.totNumOfPages = TGE.Game.GetInstance().numPages;
    this.numRowByCol = TGE.Game.GetInstance().numRowByCol;
};

LevelSelect.prototype =
{
    setup: function()
    {
        this.game = TGE.Game.GetInstance();
        this.highestLevel = this.game.highestLevel<=this.game.numOfCreatedLevelsIndex? this.game.highestLevel:this.game.numOfCreatedLevelsIndex;  //TODO Change highestLEvel to how many levels there are unlocked

        // Level Buttons
        this.xInit = this.percentageOfWidth(0.03);

        this.createPage(1);
        this.prevButton.visible = false;

        TGS.Analytics.logScreen('LevelSelect');
    },

    createPage: function(pageNum)
    {
        var firstLevel = (pageNum-1)*16;
        var lastLevel = pageNum*16;
        //remove previous page
        if(typeof this.page !== "undefined")
            this.page.markForRemoval();

        this.page = this.addChild(new TGE.DisplayObjectContainer().setup({
            x:0,
            y:0
        }));
        this.game = TGE.Game.GetInstance();
        var levelData = this.game.mode==0? this.game.levelDataEasy:this.game.levelDataHard;
        var modeType = this.game.mode==0? "levelDataEasy":"levelDataHard";

        var yPos = this.percentageOfHeight(0.26);
        var xPos = this.percentageOfWidth(0.03);

        //create this page
        for(var i = firstLevel; i < lastLevel; i++)
        {
            var level = i+1;

            if(i>firstLevel && i%this.numRowByCol == 0)
            {
                yPos+=120;
                xPos = this.xInit;
            }
            xPos+=120;
            this.levelButtons[i] = this.page.addChild(new TGE.Button().setup( {
                text: " " + level,
                x:xPos,
                y:yPos,
                pressFunction:this.play.bind(this, i),
                font:"bold 20px BubbleGum",
                width: 100,
                height: 100
            }));
            var levelStars = levelData[modeType+level].stars;
            var starXPos = xPos - 30;
            var starYPos = yPos + 30;
            for(var j = 0; j < levelStars; j++)
            {
                this.page.addChild(new TGE.Sprite().setup({
                    image:"star",
                    x:starXPos,
                    y:starYPos,
                    scale: 0.5
                }));
                starXPos += 30;
            }
            this.levelButtons[i].enabled = (i <= this.highestLevel);
            //console.log("i:"+i+" highLvl:"+this.highestLevel+" compare:");
            //console.log(i <= this.highestLevel);
            if(i <= this.highestLevel)
            {
                for(var k = 0; k < 3-levelStars; k++)
                {
                    this.page.addChild(new TGE.Sprite().setup({
                        image:"graystar",
                        x:starXPos,
                        y:starYPos,
                        scale: 0.5
                    }));
                    starXPos += 30;
                }
            }
            else
            {
                this.page.addChild(new TGE.Sprite().setup({
                    image:"lock",
                    x:xPos,
                    y:starYPos
                }));
            }


        }

        this.currentPage = pageNum;
    },

    play: function(i)
    {
        TGS.Analytics.logCustomEvent('Play from LvlSelect');
        this.transitionToWindow({
            windowClass:GameScreen,
            level:i
        });
    },

    goToNext: function()
    {
        TGS.Analytics.logCustomEvent('Next from LvlSelect');
        this.createPage(this.currentPage+1);

        //hide next button on last page
        if(this.currentPage == this.totNumOfPages)
        {
            this.nextButton.visible = false;
        }

        //show previous button
        this.prevButton.visible = true
    },

    goToPrevious: function()
    {
        TGS.Analytics.logCustomEvent('Clicked_Prev_From_LvlSelect');
        this.createPage(this.currentPage-1);

        //hide next button on last page
        if(this.currentPage == 1)
        {
            this.prevButton.visible = false;
        }

        //show previous button
        this.nextButton.visible = true
    },

    gotoMainMenu: function()
    {
        TGS.Analytics.logCustomEvent('Clicked_MainMenu_From_LvlSelect');
        this.resetToWindow({windowClass:MainMenu});
    }
};
extend(LevelSelect,TGE.Window);

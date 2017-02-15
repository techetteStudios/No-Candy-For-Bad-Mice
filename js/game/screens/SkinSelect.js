SkinSelect = function(width,height)
{
    SkinSelect.superclass.constructor.apply(this,arguments);

    this.loading = false;
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
        image:"skinsTitle",
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
        image:"8Frame",
        x:this.percentageOfWidth(0.5),
        y:this.percentageOfHeight(0.475)
    }));

    // Next button
    this.nextButton = this.addChild(new TGE.Button().setup( {
        image:"btn_next",
        x:this.percentageOfWidth(0.815),
        y:this.percentageOfHeight(0.85)
        //pressFunction:this.goToNext.bind(this)
    }));
    this.levelsBackground = this.addChild(new TGE.Sprite().setup( {
        image:"nextButtonLock",
        x:this.percentageOfWidth(0.815),
        y:this.percentageOfHeight(0.85)
    }));



    // Previous button
    this.prevButton = this.addChild(new TGE.Button().setup( {
        image:"btn_prev",
        x:this.percentageOfWidth(0.185),
        y:this.percentageOfHeight(0.85),
        pressFunction:this.goToPrevious.bind(this)
    }));

    for(var i = 1; i < 7; i++)
    {
        var xPos = 0.04+(i*0.135);
        this.addChild(new TGE.Sprite().setup( {
            image:"ball_" + i,
            x:this.percentageOfWidth(xPos),
            y:this.percentageOfHeight(0.225),
            scale:0.4
        }));
    }

    this.levelButtons = [];
    this.totNumOfPages = TGE.Game.GetInstance().numPages;
    this.numRowByCol = TGE.Game.GetInstance().numRowByCol;
};

SkinSelect.prototype =
{
    setup: function()
    {
        this.game = TGE.Game.GetInstance();
        this.version = this.game.version;

        // Level Buttons
        this.xInit = this.percentageOfWidth(0.03);

        this.createPage(1);
        this.prevButton.visible = false;

        TGS.Analytics.logScreen('SkinSelect');
    },

    createPage: function(pageNum)
    {
        var firstLevel = (pageNum-1)*8;
        var lastLevel = pageNum*8;
        //remove previous page
        if(typeof this.page !== "undefined")
            this.page.markForRemoval();

        this.page = this.addChild(new TGE.DisplayObjectContainer().setup({
            x:0,
            y:0
        }));

        var yPos = this.percentageOfHeight(0.26);
        var xPos = this.percentageOfWidth(0.03);
        yPos+=120;

        //create this page
        for(var i = firstLevel; i < lastLevel; i++)
        {

            if(i>firstLevel && i%this.numRowByCol == 0)
            {
                yPos+=120;
                xPos = this.xInit;
            }
            xPos+=120;
            if(i < 3)
            {
                this.createButton(i,xPos,yPos);
                if(i == 2)
                {
                    this.page.addChild(new TGE.Sprite().setup({
                        image: "btn_new",
                        x: xPos-32,
                        y: yPos-38
                    }));
                }
            }
            else
            {
                this.page.addChild(new TGE.Sprite().setup({
                    image:"lockIcon",
                    x:xPos,
                    y:yPos
                }));
            }

        }

        this.currentPage = pageNum;
    },

    createButton: function(i,xPos,yPos)
    {
        var game = TGE.Game.GetInstance();
        var selectedName = game.versionNames[i] + "Bg";
        var background = this.page.addChild(new TGE.Sprite().setup( {
            image: selectedName,
            x:xPos,
            y:yPos
        }));

        var name = game.versionNames[i] + "Icon";
        var current = this.page.addChild(new TGE.Button().setup( {
            image: name,
            x:xPos,
            y:yPos,
            pressFunction:this.selectSkin.bind(this, i)
        }));

        this.levelButtons[i] = current;
        var self = this;
        current.addEventListener("update",function()
        {
            if(self.loading){return}
            if(current._mState == "hover" || game.versionId == i)
            {
                background.setImage(selectedName);
            }
            else
            {
                background.setImage("grayBackground");
            }
        });
    },

    selectSkin: function(i)
    {    // Loading text
        this.loadingText = TGE.Game.GetInstance().displayStaticNumber({image:"numbers",x:this.percentageOfWidth(0.5),y:this.percentageOfHeight(0.75), number:0});

        this.loading = true;
        var game = TGE.Game.GetInstance();
        game.versionId = i;
        game.version = game.versionNames[game.versionId];
        TGS.Analytics.logCustomEvent('Selected Skin ' + game.version);
        game.assetClass.loadCurrentVersion(this.progressCallback.bind(this),this.finishedCallback.bind(this));
        this.loadingBar = this.addChild(new TGE.Sprite().setup({
            width:300,
            height:30,
            backgroundColor:"black",
            x:this.percentageOfWidth(0.3),
            y:this.percentageOfHeight(0.7)
        }));
        this.loadingBar.scaleX = 0;
        this.loadingBar.registrationX = 0;

    },

    progressCallback: function(percent)
    {
        this.loadingBar.scaleX = percent;
        var number = Math.round(percent * 100);
        this.loadingText.markForRemoval();
        this.loadingText = TGE.Game.GetInstance().displayStaticNumber({image:"numbers",x:this.percentageOfWidth(0.5),y:this.percentageOfHeight(0.75), number:number});
        this.addChild(this.loadingText);
    },

    finishedCallback: function()
    {
        this.resetToWindow({windowClass:SkinSelect});
    },

    goToNext: function()
    {
        TGS.Analytics.logCustomEvent('Next from SkinSelect');
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
        TGS.Analytics.logCustomEvent('Clicked_Prev_From_SkinSelect');
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
        TGS.Analytics.logCustomEvent('Clicked_MainMenu_From_SkinSelect');
        this.resetToWindow({windowClass:MainMenu});
    }
};
extend(SkinSelect,TGE.Window);

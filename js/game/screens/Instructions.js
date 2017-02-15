Instructions = function(width,height)
{
    Instructions.superclass.constructor.apply(this,arguments);

    // Create a semi-transparent background
    this.addChild(new TGE.Sprite().setup( {
        image:"mainMenuBG",
        x:this.percentageOfWidth(0.5),
        y:this.percentageOfHeight(0.5)
    }));

    this.pages = [];
};

Instructions.prototype =
{
    setup: function(params)
    {
        TGS.Analytics.logScreen('Instructions'); // open pause screen

        // Instructions Title
        this.addChild(new TGE.Sprite().setup( {
            image:"instructions",
            x:this.percentageOfWidth(0.5),
            y:this.percentageOfHeight(0.125)
        }));

        this.currentPage = 0;


        for(var i=0; i < 3; i++)
        {
            // Page 1
            this.pages[i] = this.addChild(new TGE.Sprite().setup( {
                image:"instructions" + (i+1),
                x:this.percentageOfWidth(0.5),
                y:this.percentageOfHeight(0.325)
            }));
            this.pages[i].visible =  (i==0);
        }


        var pressFunct =this.gotoMainMenu.bind(this);
        var closeImage = "btn_mainmenu";
        if(params.from == "pause")
        {
            pressFunct = this.close.bind(this);
            closeImage = "btn_resume";
        }

        // Main menu button
        this.addChild(new TGE.Button().setup( {
            image:closeImage,
            x:this.percentageOfWidth(0.5),
            y:this.percentageOfHeight(0.65),
            pressFunction:pressFunct
        }));

        // Next button
        this.nextButton = this.addChild(new TGE.Button().setup( {
            image:"btn_more",
            x:this.percentageOfWidth(0.75),
            y:this.percentageOfHeight(0.52),
            pressFunction:this.goToNext.bind(this)
        }));

        // Previous button
        this.prevButton = this.addChild(new TGE.Button().setup( {
            image:"btn_back",
            x:this.percentageOfWidth(0.25),
            y:this.percentageOfHeight(0.52),
            pressFunction:this.goToPrevious.bind(this)
        }));

        this.prevButton.visible = false;

    },

    goToNext: function()
    {
        TGS.Analytics.logCustomEvent('Click nextPage', 0, {'currentPage':this.currentPage });
        this.pages[this.currentPage].visible = false;
        this.currentPage++;
        this.pages[this.currentPage].visible = true;
        
        //hide next button on last page
        if(this.currentPage == this.pages.length-1)
        {
            this.nextButton.visible = false;
        }
        
        //show previous button
        this.prevButton.visible = true
        
    },

    goToPrevious: function()
    {
        TGS.Analytics.logCustomEvent('Clicked prevPage', 0, {'currentPage':this.currentPage });
        this.pages[this.currentPage].visible = false;
        this.currentPage--;
        this.pages[this.currentPage].visible = true;

        //hide next button on last page
        if(this.currentPage == 0)
        {
            this.prevButton.visible = false;
        }

        //show previous button
        this.nextButton.visible = true
    },

    gotoMainMenu: function()
    {
        TGS.Analytics.logCustomEvent('MainMenu from Instruct', 0, {'currentPage':this.currentPage });
        this.resetToWindow({windowClass:MainMenu});
    }
};
extend(Instructions,TGE.Window);

MainMenu = function(width,height)
{
    MainMenu.superclass.constructor.apply(this,arguments);

    this.addChild(new TGE.Sprite().setup( {
        image:"mainMenuBG",
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

    // Title
    this.addChild(new TGE.Sprite().setup({
        image: "title",
        x: this.percentageOfWidth(0.5),
        y: this.percentageOfHeight(0.2)
    }));


    var tweenFrom = {
        scaleX:0.1,
        scaleY:0.1,
        alpha:0,
        duration:0.5,
        delay:0.25,
        easing:TGE.Tween.Back.Out,
        easingParam:2 // amplitude
    };
    var thenTweenTo = {
        scaleX:1.05,
        scaleY:1.05,
        duration:0.5,
        delay:1,
        loop:true,
        rewind:true,
        easing:TGE.Tween.Quadratic.InOut
    };
    // Level Select button
    this.addChild(new TGE.Button().setup( {
        image:"btn_levelselect",
        x:this.percentageOfWidth(0.5),
        y:this.percentageOfHeight(0.45),
        pressFunction:this.gotoLevelSelect.bind(this)
    })).tweenFrom(tweenFrom).thenTweenTo(thenTweenTo);


    //Skins Button
    this.addChild(new TGE.Button().setup( {
            image:"btn_seasonal",
            x:this.percentageOfWidth(0.5),
            y:this.percentageOfHeight(0.57),
            pressFunction:this.gotoSkins.bind(this,1)
        })).tweenFrom({
            scaleX:0.1,
            scaleY:0.1,
            alpha:0,
            duration:0.5,
            delay:0.5,
            easing:TGE.Tween.Back.Out,
            easingParam:2 // amplitude
        });

    tweenFrom.delay = 0.5;
    thenTweenTo.delay = 0.5;
    // New Text
    this.addChild(new TGE.Sprite().setup({
        image: "btn_new",
        x: this.percentageOfWidth(0.34),
        y: this.percentageOfHeight(0.54)
    })).tweenFrom(tweenFrom).thenTweenTo(thenTweenTo);

    //Instructions Button
    this.addChild(new TGE.Button().setup( {
        image:"btn_instructions",
        x:this.percentageOfWidth(0.5),
        y:this.percentageOfHeight(0.68),
        pressFunction:this.gotoInstructions.bind(this)
    })).tweenFrom({
        scaleX:0.1,
        scaleY:0.1,
        alpha:0,
        duration:0.5,
        delay:0.75,
        easing:TGE.Tween.Back.Out,
        easingParam:2 // amplitude
    });


    var game = TGE.Game.GetInstance();
    if(game.versionId == 0)
    {
        //Skins Button
        var hwbg = this.addChild(new TGE.Sprite().setup({
            image: "christmasBg",
            x: this.percentageOfWidth(0.8),
            y: this.percentageOfHeight(0.85)
        }));

        hwbg.tweenFrom({
            scaleX: 0.1,
            scaleY: 0.1,
            alpha: 0,
            duration: 0.5,
            delay: 1,
            easing: TGE.Tween.Back.Out,
            easingParam: 2 // amplitude
        });
        hwbg.addChild(new TGE.Button().setup({
            image: "christmasIcon",
            pressFunction: this.gotoSkins.bind(this,2)
        }));
        hwbg.addChild(new TGE.Sprite().setup({
            image: "btn_new",
            x: -32,
            y: -38
        }));
    }
};

MainMenu.prototype =
{
    setup: function()
    {
        this.game = TGE.Game.GetInstance();
        //this.highestLevel = this.game.getLevelProgress();

        // Replay Comic, only show when user has seen comic at least once
        if(this.highestLevel > 0)
        {

        }

    },

    show: function() {
        MainMenu.superclass.show.apply(this,arguments);

        //Track Screen
        TGS.Analytics.logScreen('MainMenu');
    },

    gotoLevelSelect: function()
    {
        TGS.Analytics.logCustomEvent('lvlSelect from MainMenu');
        // Opens a new window and closes this one when done
        this.resetToWindow({windowClass:LevelDifficulty});
    },

    gotoSkins: function(buttonID)
    {
        TGS.Analytics.logCustomEvent('SkinSelect from MainMenu' + buttonID);
        // Opens a new window and closes this one when done
        this.resetToWindow({windowClass:SkinSelect});
    },

    gotoInstructions: function()
    {
        TGS.Analytics.logCustomEvent('instruct from MainMenu');
        // Overlays a new window on top of this one
        this.resetToWindow({windowClass:Instructions});
    }
};
extend(MainMenu,TGE.Window);

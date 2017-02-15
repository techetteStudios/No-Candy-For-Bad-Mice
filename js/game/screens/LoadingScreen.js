
LoadingScreen = function(width,height)
{
    LoadingScreen.superclass.constructor.apply(this,arguments);

    this.backgroundColor = "#CC99CC";

    // Loading  Background
    this.addChild(new TGE.Sprite().setup( {
        image:"regularBG",
        x:this.percentageOfWidth(0.5),
        y:this.percentageOfHeight(0.5)
    }));

    // Loading  Background
    this.addChild(new TGE.Sprite().setup( {
        image:"loading",
        x:this.percentageOfWidth(0.5),
        y:this.percentageOfHeight(0.3)
    }));

    // Loading text
    this.loadingText = TGE.Game.GetInstance().displayStaticNumber({image:"numbers",x:this.percentageOfWidth(0.5),y:this.percentageOfHeight(0.5), number:0});
    this.addChild(this.loadingText);

    // Add an event listener for the progress update
    this.addEventListener("progress",this.progressCallback.bind(this));

    //Track Screen
    TGS.Analytics.logScreen('LoadingScreen');
    if(!TGE.BrowserDetect.isMobileDevice)
    {
        TGS.Analytics.logCustomEvent('non-mobile');
    }
    else
    {
        TGS.Analytics.logCustomEvent('mobile');
    }
};


LoadingScreen.prototype =
{
    progressCallback: function(event)
    {
        var text = event.percentComplete<1 ? "LOADING " + Math.round(event.percentComplete * 100).toString() + "%" : "";
        var number = Math.round(event.percentComplete * 100);
        this.loadingText.markForRemoval();
        this.loadingText = TGE.Game.GetInstance().displayStaticNumber({image:"numbers",x:this.percentageOfWidth(0.5),y:this.percentageOfHeight(0.5), number:number});
        this.addChild(this.loadingText);
    }
};
extend(LoadingScreen,TGE.Window);

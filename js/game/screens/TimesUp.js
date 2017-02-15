TimesUp = function(width,height)
{
    TimesUp.superclass.constructor.apply(this,arguments);

    // We want the game updates to originate from this window - everything below it will effectively be frozen
    TGE.Game.SetUpdateRoot(this);


    // Times Up text
    this.timesUpImage = this.addChild(new TGE.Sprite().setup( {
        image:"timesup",
        x:this.percentageOfWidth(0.5),
        y:this.percentageOfHeight(0.5),
        alpha:0
    }));

    this.callback = null;
    this.addEventListener("update",this.update.bind(this));

};

TimesUp.prototype =
{
    setup: function(params)
    {
        this.callback = params.callback;
        this.timer = 0;
    },

    update: function(event)
    {
        this.timer += event.elapsedTime/2.5;
        this.timer = this.timer > 1 ? 1 : this.timer;
        this.timesUpImage.alpha = this.timer;
        this.timesUpImage.scaleX = this.timesUpImage.scaleY = 0.75+(this.timer/2);

        if(this.timer == 1)
        {
            this.close();
            this.callback();
        }
    }
};
extend(TimesUp,TGE.Window);

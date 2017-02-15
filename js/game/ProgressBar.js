
ProgressBar = function()
{
    ProgressBar.superclass.constructor.call(this);

    // Public members
    this.game = TGE.Game.GetInstance();

    this.blackBackground = this.addChild(new TGE.Sprite().setup({
        width:300,
        height:30,
        backgroundColor:"black"
    }));

    this.targetOnePos = 0.5;
    this.targetTwoPos = 0.684;
    this.targetThreePos = 0.858;

    this.lowFillBar = this.addChild(new TGE.Sprite().setup({
        x:-150,
        registrationX:0,
        width:300*0.5,
        height:30,
        scaleX:0,
        backgroundColor:"#FF0009"
    }));
    this.midFillBar = this.addChild(new TGE.Sprite().setup({
        x:0,
        registrationX:0,
        width:55,
        height:30,
        scaleX:0,
        backgroundColor:"#FFAA00"
    }));
    this.highFillBar = this.addChild(new TGE.Sprite().setup({
        x:55,
        registrationX:0,
        width:52,
        height:30,
        scaleX:0,
        backgroundColor:"#FFEA00"
    }));
    this.extraFillBar = this.addChild(new TGE.Sprite().setup({
        x:107,
        registrationX:0,
        width:43,
        height:30,
        scaleX:0,
        backgroundColor:"gray"
    }));
    this.foreGround = this.addChild(new TGE.Sprite().setup({
        image:"progressTop"
    }));

    this.starOne = this.addChild(new TGE.Sprite().setup({
        x:2,
        scaleX:0,
        scaleY:0,
        image:"progressStar"
    }));
    this.starOne.grow = false;
    this.starOne.addEventListener("update",this.growThis.bind(this.starOne));

    this.starTwo = this.addChild(new TGE.Sprite().setup({
        x:56,
        scaleX:0,
        scaleY:0,
        image:"progressStar"
    }));
    this.starTwo.grow = false;
    this.starTwo.addEventListener("update",this.growThis.bind(this.starTwo));

    this.starThree = this.addChild(new TGE.Sprite().setup({
        x:109,
        scaleX:0,
        scaleY:0,
        image:"progressStar"
    }));
    this.starThree.grow = false;
    this.starThree.addEventListener("update",this.growThis.bind(this.starThree));

    return this;
};

ProgressBar.prototype =
{
    /**
     * The setup method can be used initialize multiple parameters of an object with a single call. The setup method travels up the class hierarchy, so any properties that can be set in superclasses can be included in this param object as well.
     * @param {Object} params Information used to initialize the object.
     * @return {ProgressBar} Returns this object.
     */
    setup: function(params)
    {
        ProgressBar.superclass.setup.call(this,params);

        this.low = typeof(params.low)==="number" ? params.low/100 : 0.5;
        this.mid = typeof(params.mid)==="number" ? params.mid/100 : 0.6;
        this.high = typeof(params.high)==="number" ? params.high/100 : 0.7;

        return this;
    },

    setProgress: function(percent)
    {
        this.setLowBar(percent);
        this.setMidBar(percent);
        this.setHighBar(percent);
        this.setFiller(percent);
    },

    setLowBar: function(percent)
    {
        var percentOfLow = (percent/this.low);
        this.lowFillBar.scaleX = Math.min(1,percentOfLow);
        if(this.lowFillBar.scaleX == 1)
        {
            this.starOne.grow = true;
        }
        else
        {
            this.starOne.scaleX = this.starOne.scaleY = this.starOne.rotation = 0;
            this.starOne.grow = false;
        }
    },

    setMidBar: function(percent)
    {
        if(percent < this.low)
        {
            this.midFillBar.scaleX = 0;
            this.starTwo.scaleX = this.starTwo.scaleY = this.starTwo.rotation = 0;
            this.starTwo.grow = false;
        }
        else if(percent >= this.mid)
        {
            this.midFillBar.scaleX = 1;
            this.starTwo.grow = true;
        }
        else
        {
            var goalDiff = this.mid-this.low;
            var percentOfMid = (percent-this.low)/goalDiff;
            this.midFillBar.scaleX = Math.min(1,percentOfMid);
            this.starTwo.scaleX = this.starTwo.scaleY = this.starTwo.rotation = 0;
        }
    },

    setHighBar: function(percent)
    {
        if(percent < this.mid)
        {
            this.highFillBar.scaleX = 0;
            this.starThree.scaleX = this.starThree.scaleY = this.starThree.rotation = 0;
            this.starThree.grow = false;
        }
        else if(percent >= this.high)
        {
            this.highFillBar.scaleX = 1;
            this.starThree.grow = true;
        }
        else
        {
            var goalDiff = this.high-this.mid;
            var percentOfHigh = (percent-this.mid)/goalDiff;
            this.highFillBar.scaleX = Math.min(1,percentOfHigh);
            this.starThree.scaleX = this.starThree.scaleY = this.starThree.rotation = 0;
        }
    },

    setFiller: function(percent)
    {
        if(percent < this.high)
        {
            this.extraFillBar.scaleX = 0;
        }
        else
        {
            var goalDiff = this.high*0.15;
            var percentOfHigh = (percent-this.high)/goalDiff;
            this.extraFillBar.scaleX = Math.min(1,percentOfHigh);
        }
    },

    growThis: function(event)
    {
        if(this.grow)
        {
            this.rotation = Math.min(360,this.rotation+event.elapsedTime*500);
            this.scaleX = Math.min(1,this.scaleX+event.elapsedTime);
            this.scaleY = Math.min(1,this.scaleY+event.elapsedTime);
        }
    }

};
extend(ProgressBar, TGE.DisplayObjectContainer);
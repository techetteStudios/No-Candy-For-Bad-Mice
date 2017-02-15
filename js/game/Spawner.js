Spawner = function(levelNumber)
{
    this.level = levelNumber;
    this.version = TGE.Game.GetInstance().version;

    this.cMethod = ["fixed",1];
    this.mMethod = ["fixed",1];
    this.miceOrder = [];
    this.candyOrder = [];

    //random/sequential/fixed
    this.miceMethod = {
        original: ["random",[1,2]],
        halloween: ["sequential",[1,2,3,4,5,6]],
        christmas: ["sequential",[1,2,3,4,5,6,7,8,9]]
    };

    this.candyMethod = {
        original: ["fixed",1],
        halloween: ["sequential",[1,2,3,4,5,6]],
        christmas: ["fixed",1]
    };

    this.miceIndex = 0;
    this.candyIndex = 0;
    this.setMiceMethod(null);
    this.setCandyMethod(null);

};

Spawner.prototype =
{
    setMiceMethod: function(method)
    {
        this.mMethod = (method == null) ? this.miceMethod[this.version] : method;
        this.generateMiceOrder();
    },

    generateMiceOrder: function()
    {
        this.miceOrder = [];
        var iterator = 0;
        switch(this.mMethod[0])
        {
            case "fixed":
                this.miceOrder.push(this.mMethod[1]);
                break;
            case "random":
                for(iterator = 0; iterator < 100; iterator++)
                {
                    var index = Math.floor(Math.random()*this.mMethod[1].length);
                    this.miceOrder.push(this.mMethod[1][index]);
                }
                break;
            case "sequential":
                var index = 0;
                for(iterator = 0; iterator < 100; iterator++)
                {
                    this.miceOrder.push(this.mMethod[1][index]);
                    index++;
                    index %= this.mMethod[1].length;
                }
                break;
            default:
                this.miceOrder.push(1);
        }
    },

    setCandyMethod: function(method)
    {
        this.cMethod = (method == null) ? this.candyMethod[this.version] : method;
        this.generateCandyOrder();
    },

    generateCandyOrder: function()
    {
        this.candyOrder = [];
        var iterator = 0;
        switch(this.cMethod[0])
        {
            case "fixed":
                this.candyOrder.push(this.cMethod[1]);
                break;
            case "random":
                for(iterator = 0; iterator < 100; iterator++)
                {
                    var index = Math.floor(Math.random()*this.cMethod[1].length);
                    this.candyOrder.push(this.cMethod[1][index]);
                }
                break;
            case "sequential":
                var index = 0;
                for(iterator = 0; iterator < 100; iterator++)
                {
                    this.candyOrder.push(this.cMethod[1][index]);
                    index++;
                    index %= this.cMethod[1].length;
                }
                break;
            default:
                this.candyOrder.push(1);
        }
    },

    getNextMouse: function()
    {
        if(this.miceIndex == this.miceOrder.length)
        {
            this.miceIndex = 0;
        }
        var imageId = this.miceOrder[this.miceIndex];
        this.miceIndex++;
        return imageId;
    },

    getNextCandy: function()
    {
        if(this.candyIndex == this.candyOrder.length)
        {
            this.candyIndex = 0;
        }
        var imageId = "ball_"+this.candyOrder[this.candyIndex];
        this.candyIndex++;
        return imageId;
    }
};

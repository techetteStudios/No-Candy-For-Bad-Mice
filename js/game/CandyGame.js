CandyGame = function()
{
    // Make sure to call the constructor for the TGE.Game superclass
    CandyGame.superclass.constructor.call(this);


    //this.version = "halloween";
    this.versionNames = ["original","halloween","christmas",
                        "original","halloween","christmas"];
    this.versionId = 0;
    this.version = this.versionNames[this.versionId];
    this.assetClass = new Assets(this.assetManager,this.version);


    // Add the images required by TGS to the asset list
    TGS.AddRequiredImagesToAssetList("required");


    // Global game variables
    this.unlockedOn = false; //****TODO change from true to false
    this.mode = 0; //easy = 0, hard =1
    this.totNumLevelsEasy = 19; //****TODO change based on how many levels are designed for easy
    this.totNumLevelsHard = 27;  //****TODO change based on how many levels are designed for hard
    this.numOfCreatedLevelsIndex = this.mode==0? this.totNumLevelsEasy:this.totNumLevelsHard; //tot num of lvls available
    this.highestLevel = this.unlockedOn? this.numOfCreatedLevelsIndex: 0;
    this.numPages = 2;
    this.numRowByCol = 4;
    this.totNumOfLevels = this.numRowByCol*this.numRowByCol*this.numPages;

    //Init levels as unfinished
    this.levelDataEasy = [];
    this.levelDataHard = [];
    for(var i = 1; i <= this.totNumOfLevels; i++)
    {
        this.levelDataEasy["levelDataEasy"+i] = {stars: 0, score: 0};
        this.levelDataHard["levelDataHard"+i] = {stars: 0, score: 0};
    }
    this.updateLevel(0);

    if (GameConfig && GameConfig.TGS && GameConfig.TGS.ENABLED) {
        TGS.DataStore.onDataChanged = this.onDataStoreUpdated.bind(this);
    }

    // Set our default loading screen
    TGE.LoadingWindow = LoadingScreen;

    // Start the game off with the main menu screen
    TGE.FirstGameWindow = MainMenu; //****TODO MainMenu;
};

CandyGame.prototype =
{
    getLevelProgress: function()
    {
        this.numOfCreatedLevelsIndex = this.mode==0? this.totNumLevelsEasy:this.totNumLevelsHard;
        var highLvl= (this.mode==0)?TGS.DataStore.FetchIntValue("levelEasy",0):TGS.DataStore.FetchIntValue("levelHard",0);  //retrieve either highest level for easy or hard mode
        this.highestLevel = this.unlockedOn? this.numOfCreatedLevelsIndex: highLvl;
        return this.highestLevel;
    },

    saveState: function()
    {
        if(this.mode == 0)
        {
            TGS.DataStore.SaveValues({levelEasy:this.highestLevel});
        }
        else
        {
            TGS.DataStore.SaveValues({levelHard:this.highestLevel});
        }
    },

    saveLevel: function(i,data)
    {
        var saveData = {};
        if(this.mode==0)
        {
            saveData["levelDataEasy"+i] = JSON.stringify(data);
        }
        else
        {
            saveData["levelDataHard"+i] = JSON.stringify(data);
        }
        TGS.DataStore.SaveValues(saveData);
    },

    updateLevel: function(i)
    {
        this.currentLevelIndex = i;
        this.currentLevel = Levels[this.mode][this.currentLevelIndex];
    },

    getTotalStars: function()
    {
        var retVal = 0;
        if(this.mode==0)
        {
            for(var i = 1; i <= this.highestLevel; i++)
            {
                retVal += this.levelDataEasy["levelDataEasy"+i].stars;
            }
        }
        else
        {
            for(var i = 1; i <= this.highestLevel; i++)
            {
                retVal += this.levelDataHard["levelDataHard"+i].stars;
            }
        }

        return retVal;
    },

    onDataStoreUpdated: function()
    {
        // Fetch number of levels unlocked
        var int = this.unlockedOn? this.numOfCreatedLevelsIndex:0;
        if(this.mode==0)
        {
            for (var i = 1; i <= this.highestLevel; i++) {
                var levelData = TGS.DataStore.FetchStringValue("levelDataEasy" + i, JSON.stringify({stars: 0, score: 0}));
                this.levelDataEasy['levelDataEasy' + i] = JSON.parse(levelData);
            }
        }
        else
        {
            this.highestLevel = TGS.DataStore.FetchIntValue("levelHard",int);
            for (var i = 1; i <= this.highestLevel; i++) {
                var levelData = TGS.DataStore.FetchStringValue("levelDataHard" + i, JSON.stringify({stars: 0, score: 0}));
                this.levelDataHard['levelDataHard' + i] = JSON.parse(levelData);
            }
        }

    },

    displayStaticNumber: function(params)
    {
        var number = typeof(params.number)==="number" ? params.number : 0;
        var x = typeof(params.x)==="number" ? params.x : 0;
        var y = typeof(params.y)==="number" ? params.y : 0;
        var image =  typeof(params.image)!="undefined" ? params.image :  "";
        var columns = typeof(params.columns)==="number" ? params.columns : 10;
        var spacing = typeof(params.spacing)==="number" ? params.spacing : 20;
        var alignment =  typeof(params.alignment)!="undefined" ? params.alignment :  "center";
        var scaling = typeof(params.scaling)==="number" ? params.scaling : 1;

        var host = new TGE.DisplayObjectContainer();
        host.setup({x:x,y:y});

        var numberString = number.toString();
        var stringWidth = numberString.length*spacing;


        var iconX = alignment=="center" ? stringWidth/2 + spacing/2 : stringWidth;
        iconX = alignment=="right" ? x : iconX;

        iconX -= spacing*2;
        var iconY = 0;

        //Add %
        var percent = new TGE.Sprite();
        percent.setImage("percent");
        percent.x = iconX+40; percent.y = iconY;
        host.addChild(percent);



        var c = 0;
        for(var i=numberString.length-1; i>=0; i--)
        {

            var digit = new TGE.Sprite();
            digit.setImage(image,1,columns);
            digit.setSpriteIndex(numberString.charCodeAt(i)-48);
            digit.x = iconX; digit.y = iconY;
            digit.scaleX = digit.scaleY = scaling;
            host.addChild(digit);

            iconX -= spacing;
            c++;
        }
        return host;
    }


};

extend(CandyGame,TGE.Game);


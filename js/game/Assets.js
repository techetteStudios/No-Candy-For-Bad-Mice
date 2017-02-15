Assets = function(assetManager,version)
{
    this.assetManager = assetManager;
    this.version = version;



    this.assetLists = [];
    this.assetLists["original"] = [
        //GAMESCREEN
        //frame
        {id:'lvl_header',   url:'images/original/screens/gamescreen/top.jpg'},
        {id:'left_wall',   url:'images/original/screens/gamescreen/side_left.jpg'},
        {id:'right_wall',   url:'images/original/screens/gamescreen/side_right.jpg'},
        {id:'timesup',   url:'images/original/screens/gamescreen/timesup.png'},
        {id:'roof',   url:'images/original/screens/gamescreen/top2.jpg'},
        {id:'floor',   url:'images/original/screens/gamescreen/bottom.jpg'},

        //Progress Bar
        {id:'progressStar',   url:'images/original/screens/gamescreen/progressbar/progressStar.png'},
        {id:'progressTop',   url:'images/original/screens/gamescreen/progressbar/progressTop.png'},

        //UI
        {id:'pause',   url:'images/original/pauseBtn.png'},
        {id:'clock',   url:'images/original/clock.png'},

        //Skins
        {id:'skinsTitle',       url:'images/shared/screens/skins/seasonalThemes.png'},
        {id:'nextButtonLock',   url:'images/shared/screens/skins/nextButtonLock.png'},
        {id:'btn_seasonal',     url:'images/shared/screens/skins/btn_seasonal.png'},
        {id:'btn_new',          url:'images/shared/screens/skins/btn_new.png'},
        {id:'8Frame',           url:'images/shared/screens/skins/8Frame.png'},
        {id:'christmasIcon',    url:'images/shared/screens/skins/christmasIcon.png'},
        {id:'halloweenIcon',    url:'images/shared/screens/skins/halloweenIcon.png'},
        {id:'originalIcon',     url:'images/shared/screens/skins/traditionalIcon.png'},
        {id:'lockIcon',         url:'images/shared/screens/skins/lockIcon.png'},
        {id:'grayBackground',   url:'images/shared/screens/skins/grayBackground.png'},
        {id:'originalBg',       url:'images/shared/screens/skins/traditionalBackground.png'},
        {id:'halloweenBg',      url:'images/shared/screens/skins/halloweenBackground.png'},
        {id:'christmasBg',      url:'images/shared/screens/skins/christmasBackground.png'},

        //Tutorial
        {id:'cursor',   url:'images/original/tutorial/cursor.png'},
        {id:'cursorAnimation',   url:'images/original/tutorial/cursorAnimation.png'},
        {id:'arrowUp',   url:'images/original/tutorial/arrow_up.png'},
        {id:'arrowDown',   url:'images/original/tutorial/arrow_down.png'},
        {id:'bang',   url:'images/original/tutorial/bang.png'},
        {id:'skipBtn',   url:'images/original/tutorial/skip.png'},
        {id:'tut_1',   url:'images/original/tutorial/tut_01.png'},
        {id:'tut_2',   url:'images/original/tutorial/tut_02.png'},
        {id:'tut_3',   url:'images/original/tutorial/tut_03.png'},
        {id:'tut_4',   url:'images/original/tutorial/tut_04.png'},
        {id:'tut_5',   url:'images/original/tutorial/tut_05.png'},
        {id:'tut_6',   url:'images/original/tutorial/tut_06.png'},
        {id:'tut_7',   url:'images/original/tutorial/tut_07.png'},

        //Background
        {id:'woodBG',   url:'images/original/screens/gamescreen/wood.jpg'},
        {id:'mainMenuBG',   url:'images/original/background.jpg'},

        //Endscreen
        {id:'btn_levels',   url:'images/original/screens/endscreen/btn_levels.jpg'},
        {id:'btn_nextlevel',url:'images/original/screens/endscreen/btn_nextlevel.jpg'},
        {id:'btn_replay',   url:'images/original/screens/endscreen/btn_replay.jpg'},
        {id:'btn_tryagain', url:'images/original/screens/endscreen/btn_tryagain.jpg'},
        {id:'frame',        url:'images/original/screens/endscreen/frame.png'},
        {id:'gameover',     url:'images/original/screens/endscreen/gameover.png'},
        {id:'levelup',     url:'images/original/screens/endscreen/levelup.png'},

        //Instructions
        {id:'btn_back',     url:'images/original/screens/instructions/btn_back.jpg'},
        {id:'btn_mainmenu', url:'images/original/screens/instructions/btn_mainmenu.jpg'},
        {id:'btn_more',     url:'images/original/screens/instructions/btn_more.jpg'},
        {id:'instructions', url:'images/original/screens/instructions/instructions.png'},
        {id:'instructions1',url:'images/original/screens/instructions/instructions1.png'},
        {id:'instructions2',url:'images/original/screens/instructions/instructions2.png'},
        {id:'instructions3',url:'images/original/screens/instructions/instructions3.png'},

        //LevelSelect
        {id:'btn_next',     url:'images/original/screens/levelselect/btn_next.jpg'},
        {id:'btn_prev',     url:'images/original/screens/levelselect/btn_prev.jpg'},
        {id:'levelselect',  url:'images/original/screens/levelselect/levelselect.png'},
        {id:'levelwindow',  url:'images/original/screens/levelselect/levelwindow.jpg'},
        {id:'lock',   url:'images/original/screens/levelselect/lock.png'},
        {id:'star',         url:'images/original/screens/levelselect/star.png'},
        {id:'graystar',     url:'images/original/screens/levelselect/graystar.png'},

        //LevelDifficulty
        {id:'btn_easy',     url:'images/original/screens/leveldifficulty/btn_easy.png'},
        {id:'btn_hard',     url:'images/original/screens/leveldifficulty/btn_hard.png'},
        {id:'levelDifficulty',  url:'images/original/screens/leveldifficulty/selectDifficulty.png'},

        //Pause
        {id:'btn_quit',     url:'images/original/screens/pause/btn_quit.jpg'},
        {id:'btn_restart',  url:'images/original/screens/pause/btn_restart.jpg'},
        {id:'btn_resume',   url:'images/original/screens/pause/btn_resume.jpg'},
        {id:'paused',       url:'images/original/screens/pause/paused.png'},

        //Level Select
        {id:'btn_levelselect',  url:'images/original/screens/splash/btn_levelselect.jpg'},
        {id:'btn_instructions', url:'images/original/screens/splash/btn_instructions.jpg'},
        {id:'title',            url:'images/original/screens/splash/title.png'},
        {id:'logo',             url:'images/original/screens/splash/Tresensa_logo_65px.png'},

        //mice
        {id: 'mouse1', url: 'images/original/mice/mouse1.png'},
        {id: 'mouse2', url: 'images/original/mice/mouse2.png'},
        //candies
        {id: 'ball_1', url: 'images/original/candy/bigball.png'},
        {id: 'ball_2', url: 'images/original/candy/bigball2.png'},
        {id: 'ball_3', url: 'images/original/candy/bigball3.png'},
        {id: 'ball_4', url: 'images/original/candy/bigball4.png'},
        {id: 'ball_5', url: 'images/original/candy/bigball5.png'},
        {id: 'ball_6', url: 'images/original/candy/bigball6.png'},
        {id: 'ball_7', url: 'images/original/candy/bigball7.png'},
        {id: 'ball_8', url: 'images/original/candy/bigball8.png'},
        {id: 'ball_9', url: 'images/original/candy/bigball9.png'},
        {id: 'ball_10', url: 'images/original/candy/bigball10.png'},
        {id: 'ball_11', url: 'images/original/candy/bigball11.png'},
        {id: 'ball_12', url: 'images/original/candy/bigball12.png'},
        {id: 'ball_13', url: 'images/original/candy/bigball13.png'},
        {id: 'ball_14', url: 'images/original/candy/bigball14.png'},
        {id: 'ball_15', url: 'images/original/candy/bigball15.png'},
        {id: 'ball_16', url: 'images/original/candy/bigball16.png'},
        {id: 'ball_17', url: 'images/original/candy/bigball17.png'},
        {id: 'ball_18', url: 'images/original/candy/bigball18.png'},
        {id: 'ball_19', url: 'images/original/candy/bigball19.png'},
        {id: 'ball_20', url: 'images/original/candy/bigball20.png'},
        {id: 'ball_21', url: 'images/original/candy/bigball21.png'},
        {id: 'triangle_1',url:'images/original/candy/lime.png'},
        {id: 'triangle_2',url:'images/original/candy/orange.png'},
        {id: 'triangle_3',url:'images/original/candy/watermelon.png'}
    ];

    this.loadingSkins = [];
    this.loadingSkins["original"] = [
        {id:'loading',  url:'images/original/screens/loading/loading.png'},
        {id:'numbers',  url:'images/original/screens/loading/numbers.png'},
        {id:'percent',  url:'images/original/screens/loading/percent.png'},
        {id:'regularBG',   url:'images/original/background2.jpg'}
    ];
    this.loadingSkins["halloween"] = [
        {id:'loading',  url:'images/halloween/screens/loading/loading.png'},
        {id:'numbers',  url:'images/halloween/screens/loading/numbers.png'},
        {id:'percent',  url:'images/halloween/screens/loading/percent.png'},
        {id:'regularBG',   url:'images/halloween/background2.jpg'}
    ];
    this.loadingSkins["christmas"] = [
        {id:'loading',  url:'images/christmas/screens/loading/loading.png'},
        {id:'numbers',  url:'images/christmas/screens/loading/numbers.png'},
        {id:'percent',  url:'images/christmas/screens/loading/percent.png'},
        {id:'regularBG',   url:'images/christmas/background2.jpg'}
    ];

    this.skins = [];
    this.skins["halloween"] = [
        {id:'lvl_header',   url:'images/halloween/screens/gamescreen/top.jpg'},
        {id:'left_wall',   url:'images/halloween/screens/gamescreen/side_left.jpg'},
        {id:'right_wall',   url:'images/halloween/screens/gamescreen/side_right.jpg'},
        {id:'roof',   url:'images/halloween/screens/gamescreen/top2.jpg'},
        {id:'floor',   url:'images/halloween/screens/gamescreen/bottom.jpg'},

        {id:'pause',   url:'images/halloween/pauseBtn.png'},
        {id:'clock',   url:'images/halloween/clock.png'},


        {id:'skipBtn',   url:'images/halloween/tutorial/skip.png'},
        {id:'tut_1',   url:'images/halloween/tutorial/tut_01.png'},
        {id:'tut_2',   url:'images/halloween/tutorial/tut_02.png'},
        {id:'tut_3',   url:'images/halloween/tutorial/tut_03.png'},
        {id:'tut_4',   url:'images/halloween/tutorial/tut_04.png'},
        {id:'tut_5',   url:'images/halloween/tutorial/tut_05.png'},
        {id:'tut_6',   url:'images/halloween/tutorial/tut_06.png'},
        {id:'tut_7',   url:'images/halloween/tutorial/tut_07.png'},


        //Background
        {id:'mainMenuBG',   url:'images/halloween/background.png'},

        //Endscreen
        {id:'btn_levels',   url:'images/halloween/screens/endscreen/btn_levels.jpg'},
        {id:'btn_nextlevel',url:'images/halloween/screens/endscreen/btn_nextlevel.jpg'},
        {id:'btn_replay',   url:'images/halloween/screens/endscreen/btn_replay.jpg'},
        {id:'btn_tryagain', url:'images/halloween/screens/endscreen/btn_tryagain.jpg'},
        {id:'frame',        url:'images/halloween/screens/endscreen/frame.png'},
        {id:'gameover',     url:'images/halloween/screens/endscreen/gameover.png'},
        {id:'levelup',     url:'images/halloween/screens/endscreen/levelup.png'},

        //Instructions
        {id:'btn_back',     url:'images/halloween/screens/instructions/btn_back.jpg'},
        {id:'btn_mainmenu', url:'images/halloween/screens/instructions/btn_mainmenu.jpg'},
        {id:'btn_more',     url:'images/halloween/screens/instructions/btn_more.jpg'},
        {id:'instructions', url:'images/halloween/screens/instructions/instructions.png'},
        {id:'instructions1',url:'images/halloween/screens/instructions/instructions1.png'},
        {id:'instructions2',url:'images/halloween/screens/instructions/instructions2.png'},
        {id:'instructions3',url:'images/halloween/screens/instructions/instructions3.png'},

        //LevelSelect
        {id:'btn_next',     url:'images/halloween/screens/levelselect/btn_next.jpg'},
        {id:'btn_prev',     url:'images/halloween/screens/levelselect/btn_prev.jpg'},
        {id:'levelselect',  url:'images/halloween/screens/levelselect/levelselect.png'},
        {id:'levelwindow',  url:'images/halloween/screens/levelselect/levelwindow.png'},


        //LevelDifficulty
        {id:'btn_easy',     url:'images/halloween/screens/leveldifficulty/btn_easy.png'},
        {id:'btn_hard',     url:'images/halloween/screens/leveldifficulty/btn_hard.png'},
        {id:'levelDifficulty',  url:'images/halloween/screens/leveldifficulty/selectDifficulty.png'},

        //Pause
        {id:'btn_quit',     url:'images/halloween/screens/pause/btn_quit.jpg'},
        {id:'btn_restart',  url:'images/halloween/screens/pause/btn_restart.jpg'},
        {id:'btn_resume',   url:'images/halloween/screens/pause/btn_resume.jpg'},
        {id:'paused',       url:'images/halloween/screens/pause/paused.png'},

        //Level Select
        {id:'btn_levelselect',  url:'images/halloween/screens/splash/btn_levelselect.jpg'},
        {id:'btn_instructions', url:'images/halloween/screens/splash/btn_instructions.jpg'},
        {id:'title',            url:'images/halloween/screens/splash/title.png'},

        {id:'btn_seasonal',     url:'images/shared/screens/skins/btn_seasonalHalloween.png'},

        {id:'mouse1', url: 'images/halloween/mice/mouse_bride.png'},
        {id:'mouse2', url: 'images/halloween/mice/mouse_dracula.png'},
        {id:'mouse3',   url:'images/halloween/mice/mouse_frankenstein.png'},
        {id:'mouse4',   url:'images/halloween/mice/mouse_ghost.png'},
        {id:'mouse5',   url:'images/halloween/mice/mouse_skeletor.png'},
        {id:'mouse6',   url:'images/halloween/mice/mouse_witch.png'},

        {id:'ball_1',   url:'images/halloween/candy/bigball22.png'},
        {id:'ball_2',   url:'images/halloween/candy/bigball23.png'},
        {id:'ball_3',   url:'images/halloween/candy/bigball24.png'},
        {id:'ball_4',   url:'images/halloween/candy/bigball25.png'},
        {id:'ball_5',   url:'images/halloween/candy/bigball26.png'},
        {id:'ball_6',   url:'images/halloween/candy/bigball27.png'},
        {id: 'triangle_1',url:'images/halloween/candy/candyCorn.png'}
    ];


    this.skins["christmas"] = [
        {id:'lvl_header',   url:'images/christmas/screens/gamescreen/top.jpg'},
        {id:'left_wall',   url:'images/christmas/screens/gamescreen/side_left.jpg'},
        {id:'right_wall',   url:'images/christmas/screens/gamescreen/side_right.jpg'},
        {id:'timesup',   url:'images/christmas/screens/gamescreen/timesup.png'},
        {id:'roof',   url:'images/christmas/screens/gamescreen/top2.jpg'},
        {id:'floor',   url:'images/christmas/screens/gamescreen/bottom.jpg'},

        {id:'pause',   url:'images/christmas/pauseBtn.png'},
        {id:'clock',   url:'images/christmas/clock.png'},


        {id:'skipBtn',   url:'images/christmas/tutorial/skip.png'},
        {id:'tut_1',   url:'images/christmas/tutorial/tut_01.png'},
        {id:'tut_2',   url:'images/christmas/tutorial/tut_02.png'},
        {id:'tut_3',   url:'images/christmas/tutorial/tut_03.png'},
        {id:'tut_4',   url:'images/christmas/tutorial/tut_04.png'},
        {id:'tut_5',   url:'images/christmas/tutorial/tut_05.png'},
        {id:'tut_6',   url:'images/christmas/tutorial/tut_06.png'},
        {id:'tut_7',   url:'images/christmas/tutorial/tut_07.png'},


        //Background
        {id:'mainMenuBG',   url:'images/christmas/background.jpg'},

        //Endscreen
        {id:'btn_levels',   url:'images/christmas/screens/endscreen/btn_levels.jpg'},
        {id:'btn_nextlevel',url:'images/christmas/screens/endscreen/btn_nextlevel.jpg'},
        {id:'btn_replay',   url:'images/christmas/screens/endscreen/btn_replay.jpg'},
        {id:'btn_tryagain', url:'images/christmas/screens/endscreen/btn_tryagain.jpg'},
        {id:'frame',        url:'images/christmas/screens/endscreen/frame.png'},
        {id:'gameover',     url:'images/christmas/screens/endscreen/gameover.png'},
        {id:'levelup',     url:'images/christmas/screens/endscreen/levelup.png'},

        //Instructions
        {id:'btn_back',     url:'images/christmas/screens/instructions/btn_back.jpg'},
        {id:'btn_mainmenu', url:'images/christmas/screens/instructions/btn_mainmenu.jpg'},
        {id:'btn_more',     url:'images/christmas/screens/instructions/btn_more.jpg'},
        {id:'instructions', url:'images/christmas/screens/instructions/instructions.png'},
        {id:'instructions1',url:'images/christmas/screens/instructions/instructions1.png'},
        {id:'instructions2',url:'images/christmas/screens/instructions/instructions2.png'},
        {id:'instructions3',url:'images/christmas/screens/instructions/instructions3.png'},

        //LevelSelect
        {id:'btn_next',     url:'images/christmas/screens/levelselect/btn_next.jpg'},
        {id:'btn_prev',     url:'images/christmas/screens/levelselect/btn_prev.jpg'},
        {id:'levelselect',  url:'images/christmas/screens/levelselect/levelselect.png'},
        {id:'levelwindow',  url:'images/christmas/screens/levelselect/levelwindow.jpg'},


        //LevelDifficulty
        {id:'btn_easy',     url:'images/christmas/screens/leveldifficulty/btn_easy.png'},
        {id:'btn_hard',     url:'images/christmas/screens/leveldifficulty/btn_hard.png'},
        {id:'levelDifficulty',  url:'images/christmas/screens/leveldifficulty/selectDifficulty.png'},

        //Pause
        {id:'btn_quit',     url:'images/christmas/screens/pause/btn_quit.jpg'},
        {id:'btn_restart',  url:'images/christmas/screens/pause/btn_restart.jpg'},
        {id:'btn_resume',   url:'images/christmas/screens/pause/btn_resume.jpg'},
        {id:'paused',       url:'images/christmas/screens/pause/paused.png'},

        //Level Select
        {id:'btn_levelselect',  url:'images/christmas/screens/splash/btn_levelselect.jpg'},
        {id:'btn_instructions', url:'images/christmas/screens/splash/btn_instructions.jpg'},
        {id:'title',            url:'images/christmas/screens/splash/title.png'},

        {id:'btn_seasonal',     url:'images/shared/screens/skins/btn_seasonalChristmas.png'},

        {id:'mouse1', url: 'images/christmas/mice/mouse_reindeer.png'},
        {id:'mouse2', url: 'images/christmas/mice/mouse_mrsclaus.png'},
        {id:'mouse3',   url:'images/christmas/mice/mouse_elf.png'},
        {id:'mouse4',   url:'images/christmas/mice/mouse_scarf.png'},
        {id:'mouse5',   url:'images/christmas/mice/mouse_santa.png'},
        {id:'mouse6',   url:'images/christmas/mice/mouse_uglysweater.png'},
        {id:'mouse7',   url:'images/christmas/mice/mouse_glasses.png'},
        {id:'mouse8',   url:'images/christmas/mice/mouse_tophat.png'},
        {id:'mouse9',   url:'images/christmas/mice/mouse_wig.png'},

        {id:'ball_1',   url:'images/christmas/candy/bigball28.png'},
        {id:'ball_2',   url:'images/christmas/candy/bigball29.png'},
        {id:'ball_3',   url:'images/christmas/candy/bigball30.png'},
        {id:'ball_4',   url:'images/christmas/candy/bigball31.png'},
        {id:'ball_5',   url:'images/christmas/candy/bigball32.png'},
        {id:'ball_6',   url:'images/christmas/candy/bigball33.png'},
        {id:'ball_7',   url:'images/christmas/candy/bigball34.png'},
        {id:'ball_8',   url:'images/christmas/candy/bigball35.png'},
        {id:'ball_9',   url:'images/christmas/candy/bigball36.png'},
        {id:'ball_10',   url:'images/christmas/candy/bigball37.png'},
        {id:'ball_11',   url:'images/christmas/candy/bigball38.png'},
        {id:'ball_12',   url:'images/christmas/candy/bigball39.png'},
        {id:'ball_13',   url:'images/christmas/candy/bigball40.png'},
        {id:'ball_14',   url:'images/christmas/candy/bigball41.png'},
        {id:'ball_15',   url:'images/christmas/candy/bigball42.png'},
        {id:'ball_16',   url:'images/christmas/candy/bigball43.png'},
        {id:'ball_17',   url:'images/christmas/candy/bigball44.png'},
        {id:'ball_18',   url:'images/christmas/candy/bigball45.png'},
        {id:'ball_19',   url:'images/christmas/candy/bigball46.png'},
        {id:'ball_20',   url:'images/christmas/candy/bigball47.png'},


        {id: 'triangle_1',url:'images/christmas/candy/tree.png'},
        {id: 'triangle_2',url:'images/christmas/candy/peppermint.png'},
        {id: 'triangle_3',url:'images/christmas/candy/cookie.png'},
        {id: 'triangle_4',url:'images/christmas/candy/wintermint.png'}

    ];

    this.createLists();
    this.addAssets();

};

Assets.prototype =
{

    copyArray: function(original)
    {
        var retArray = [];
        for(var i = 0; i < original.length; i++)
        {
            retArray.push(original[i]);
        }
        return retArray;
    },

    replaceAndAdd: function(skinArray, oldArray)
    {
        var originalArray = this.copyArray(oldArray);
        var replaced = false;
        for(var i = 0; i < skinArray.length; i++)
        {
            replaced = false;
            for(var j = 0; j < originalArray.length; j++)
            {
                if(skinArray[i].id == originalArray[j].id)
                {
                    originalArray[j] = skinArray[i];
                    replaced = true;
                }
            }
            if(!replaced)
            {
                originalArray.push(skinArray[i]);
            }
        }
        return originalArray;
    },

    createLists: function()
    {
        for (var key in this.skins) {
            if (this.skins.hasOwnProperty(key)) {
                this.assetLists[key] = this.replaceAndAdd(this.skins[key],this.assetLists["original"]);
            }
        }
    },

    addAssets: function()
    {
        var loading = this.loadingSkins["original"];
        if(this.version != "original" && typeof this.loadingSkins[this.version] == "object")
        {
            loading = this.replaceAndAdd(this.loadingSkins[this.version],this.loadingSkins["original"]);
        }
        this.assetManager.assignImageAssetList("loading", loading);

        var required = this.assetLists["original"];
        if(this.version != "original" && typeof this.assetLists[this.version] == "object")
        {
            required = this.assetLists[this.version];
        }

        this.assetManager.addAssets("required", required);
    },

    loadCurrentVersion: function(progress,complete)
    {
        var game = TGE.Game.GetInstance();
        game.assetManager.assignImageAssetList(game.version, this.assetLists[game.version]);
        game.assetManager.assignImageAssetList(game.version+"_load", this.loadingSkins[game.version]);
        game.assetManager._mAssetCache = [];
        var callback = function()
        {
            game.assetManager.loadAssetList(
                game.version,
                progress,
                complete
            );
        }.bind(this);
        game.assetManager.loadAssetList(
            game.version+"_load",
            null,
            callback
        );
    }
};

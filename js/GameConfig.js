// Game Config Global
var GameConfig = {

    PROD_ENV:true,
    //LIB_DIR:'js/lib/',
    LOG_LEVEL: 3,
    ORIENTATION: 'portrait',   // portrait|landscape

    GAME_ID: 'nocandyforbadmice',
    TITLE: 'No Candy For Bad Mice',
    VERSION: '1.0.0',

    CONSTRUCTOR: 'CandyGame',
    SOURCE: [
        "js/game/P2Tools.js",
        "js/game/ProgressBar.js",
        "js/game/Walls.js",
        "js/game/Assets.js",
        "js/game/Spawner.js",
        "js/game/p2.min.js",
        "js/game/p2.renderer.min.js",
        "js/game/levels/tutorial.js",
        "js/game/levels/afterTutorial.js",
        "js/game/levels/firstLevel.js",
        "js/game/levels/firstTriangle.js",
        "js/game/levels/firstMouse.js",
        "js/game/levels/moreMice.js",
        "js/game/levels/firstHole.js",
        "js/game/levels/firstHoleHard.js",
        "js/game/levels/oneHoleTenMice.js",
        "js/game/levels/oneHoleThirtyMice.js",
        "js/game/levels/twoShelves.js",
        "js/game/levels/twoShelvesHard.js",
        "js/game/levels/mouseInLeftBox.js",
        "js/game/levels/mouseInLeftBoxHard.js",
        "js/game/levels/twoLs.js",
        "js/game/levels/twoLsHard.js",
        "js/game/levels/smallBox.js",
        "js/game/levels/smallBoxHard.js",
        "js/game/levels/oneHoleForTriangles.js",
        "js/game/levels/miceInTopBox.js",
        "js/game/levels/miceInTopBoxHard.js",
        "js/game/levels/twoLeftShelves.js",
        "js/game/levels/twoLeftShelvesHard.js",
        "js/game/levels/miceFallingOutTopBox.js",
        "js/game/levels/miceFallingOutTopBoxHard.js",
        "js/game/levels/miceFromCeiling.js",
        "js/game/levels/miceFromCeilingHard.js",
        "js/game/levels/twoCeilingHoles.js",
        "js/game/levels/threeCeilingHoles.js",
        "js/game/levels/mouseBomb.js",
        "js/game/levels/holesOnAllSides.js",
        "js/game/levels/noWalls.js",
        "js/game/levels/noWallsForTriangle.js",
        "js/game/levels/noWallsAboveBoxBelow.js",
        "js/game/levels/noWallsAboveBoxBelowHard.js",
        "js/game/levels/twoBoxes.js",
        "js/game/levels/twoBoxesHard.js",
        "js/game/levels/cross.js",
        "js/game/levels/crossHard.js",
        "js/game/levels/crossTriangle.js",
        "js/game/levels/lowestFloor.js",
        "js/game/levels/lowestFloorHard.js",
        "js/game/levels/outerBordersInnerShelf.js",
        "js/game/levels/outerBordersInnerShelfHard.js",
        "js/game/levels/cubbyHoles.js",
        "js/game/levels/cubbyHolesHard.js",
        "js/game/levels/cubbyHolesWithMice.js",
        "js/game/levels/noBorders.js",
        "js/game/levels/firstLevel.js",
        "js/game/Levels.js",
        "js/game/screens/LoadingScreen.js",
        "js/game/screens/MainMenu.js",
        "js/game/screens/Instructions.js",
        "js/game/screens/TimesUp.js",
        "js/game/screens/LevelDifficulty.js",
        "js/game/screens/LevelSelect.js",
        "js/game/screens/SkinSelect.js",
        "js/game/screens/GameScreen.js",
        "js/game/screens/PauseScreen.js",
        "js/game/screens/LevelUp.js",
        "js/game/CandyGame.js",
        "js/game/screens/GameOver.js"
    ],

    ADS: {
        DISPLAY_PLACEMENT_ID: '3281390',
        INTERSTITIAL_PLACEMENT_ID: '3281388',
        PRELOADER_PLACEMENT_ID: '3281389'

    },

    CSS: [
        "css/sweet.css"
    ],

    EXCLUDE: [
    ],

    TGL: {
        VERSION: '1.0'
    },

    TGS: {
        ENABLED: true,
        VERSION: '0.3'
    },

    TGE: {
        ENABLED: true,
        FONT_LOADER: false,
        VERSION: '1.0'
    },

    GoogleAnalytics: {
        ENABLED: true,
        QA_ID:     'UA-51056405-15',
        PROD_ID:   'UA-51056405-15',
        LABEL: 'No Candy For Bad Mice'
    },

    MixPanel: {
        ENABLED: false,
        TOKEN: "39a9307c249d8d1c3eab38bf3855c49e"
    }
};
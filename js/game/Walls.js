Walls = function(width,height,tools,frame)
{
    this.tools = tools;
    this.width = width;
    this.height = height;
    this.frame = frame;

    //Params to set hole


    //Borders
    var margin = this.percentageOfWidth(0.05);
    var rightMarginPos = this.percentageOfWidth(0.95);
    var bottomMarginPos = this.height-(margin/2+10);
    var halfHeight = this.percentageOfHeight(0.5);
    var halfWidth = this.percentageOfWidth(0.5);

    this.wallVersions = [
    /** 0  Full Left Wall */    {x:margin,y:halfHeight,width:margin*2,height:height,image:"left_wall"},
    /** 1  Full Left Buffer */  {x:margin*-3,y:halfHeight,width:margin*6,height:height*2,image:"left_wall"},
    /** 2  Full Right Wall */   {x:rightMarginPos,y:halfHeight,width:margin*2,height:height,image:"right_wall"},
    /** 3  Full Right Buffer */ {x:rightMarginPos+margin*4,y:halfHeight,width:margin*6,height:height*2,image:"right_wall"},
    /** 4  Full Roof */         {x:halfWidth,y:margin,width:width,height:margin*4,image:"roof"},
    /** 5  Full Roof Buffer */  {x:halfWidth,y:margin*-4,width:width,height:margin*6,image:"roof"},
    /** 6  Full Floor */        {x:halfWidth,y:bottomMarginPos,width:width,height:margin+20,image:"floor"},
    /** 7  Full Floor Buffer */ {x:halfWidth,y:height+margin*4,width:width,height:margin*8,image:"floor"},
    /** 8  Left 350 Floor */    {x:this.percentageOfWidth(0.25),y:bottomMarginPos,width:350,height:margin+20,image:"floor"},
    /** 9  Left 350 Buffer */   {x:this.percentageOfWidth(0.25),y:height+margin*4,width:350,height:margin*8,image:"floor"},
    /** 10  Middle Floor */     {x:halfWidth,y:bottomMarginPos,width:width-250,height:margin+20,image:"floor"},
    /** 11  Middle Floor Buffer */{x:halfWidth,y:height+margin*4,width:width-250,height:margin*8,image:"floor"},
    /** 12  Middle Left Wall */  {x:this.percentageOfWidth(0.45),y:this.percentageOfHeight(0.27),width:margin*2,height:400,image:"left_wall"},
    /** 13  Off screen Floor Buffer */ {x:halfWidth,y:height+margin*10+100,width:width,height:margin*20,image:"floor"},
    /** 14  Left Shelf */        {x:margin+width/6,y:height/2+100,width:width/4,height:margin+20,image:"floor"},
    /** 15  Right Shelf */        {x:rightMarginPos-width/6,y:height/2+100,width:width/4,height:margin+20,image:"floor"},
    /** 16  Left Roof */         {x:margin+width/6,y:margin,width:width/3,height:margin*4,image:"roof"},
    /** 17  Left Roof Buffer */  {x:margin+width/6,y:margin*-4,width:width/3,height:margin*6,image:"roof"},
    /** 18  Right Roof */         {x:rightMarginPos-width/6,y:margin,width:width/3,height:margin*4,image:"roof"},
    /** 19  Right Roof Buffer */  {x:rightMarginPos-width/6,y:margin*-4,width:width/3,height:margin*6,image:"roof"},
    /** 20  Top Shelf */        {x:halfWidth,y:margin+300,width:width-116,height:margin+20,image:"floor"},
    /** 21  Middle Shelf */        {x:halfWidth,y:margin+500,width:width-116,height:margin+20,image:"floor"},
    /** 22  Middle Left Wall */    {x:margin+200,y:halfHeight+10,width:margin*2,height:height-120,image:"left_wall"},
    /** 23  Middle Right Wall */   {x:rightMarginPos-200,y:halfHeight+10,width:margin*2,height:height-120,image:"right_wall"},
    /** 24  Left 250 Floor */    {x:this.percentageOfWidth(0.25),y:bottomMarginPos,width:250,height:margin+20,image:"floor"},
    /** 25  Left 250 Buffer */   {x:this.percentageOfWidth(0.25),y:height+margin*4,width:250,height:margin*8,image:"floor"},
    /** 26  Left 450 Wall */    {x:margin,y:halfHeight,width:margin*2,height:450,image:"left_wall"},
    /** 27  Full 450 Buffer */  {x:margin*-3,y:halfHeight,width:margin*6,height:450,image:"left_wall"},
    /** 28  Right 250 Floor */    {x:this.percentageOfWidth(0.72),y:bottomMarginPos,width:250,height:margin+20,image:"floor"},
    /** 29  Right 250 Buffer */   {x:this.percentageOfWidth(0.72),y:height+margin*4,width:250,height:margin*8,image:"floor"}

    ];
    this.levelWalls = {
        tutorial:[0,1,2,3,4,5,6,7],
        firstMouse:[0,1,2,3,4,5,6,7],
        firstHole:[0,1,2,3,4,5,8,9],
        firstHoleHard:[0,1,2,3,4,5,24,25],
        mouseBomb:[0,1,2,3,4,5,10,11],
        moreMice:[0,1,2,3,4,5,6,7],
        twoLs:[0,1,2,3,4,5,12],
        lowestFloor:[0,1,2,3,4,5,13],
        lowestFloorHard:[2,3,4,5,13,26,27],
        outerBordersInnerShelf:[0,1,2,3,13,14,15,16,17,18,19],
        cubbyHoles:[0,1,2,3,4,5,6,7,20,21,22,23],
        cubbyHolesWithMice:[0,1,2,3,4,5,6,7,20,21,22,23],
        oneHoleForTriangles:[0,1,2,3,4,5, 28, 29]
    };

};

Walls.prototype =
{

    createWalls:function(levelID)
    {

        var wallIDs = this.levelWalls[levelID];
        for(var i = 0; i < wallIDs.length; i++)
        {
            var params = this.wallVersions[wallIDs[i]];
            params.screen = this.frame;
            this.tools.cStaticBox(params);
        }
    },

    shrinkFrame: function()
    {
        this.frame.scaleX = this.frame.scaleY = 0.333;
        this.frame.x = this.percentageOfWidth(0.33);
        this.frame.y = this.percentageOfHeight(0.33);
    },

    percentageOfWidth: function(percent)
    {
        return this.width*percent;
    },

    percentageOfHeight: function(percent)
    {
        return this.height*percent;
    }
};

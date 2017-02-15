P2Tools = function(parent)
{
    this.parent = parent;
    this.width = parent.width;
    this.height = parent.height;
    this.world = null;
    this.circles = [];
    this.spawner = new Spawner(parent.levelIndex);
    this.setNewMouse();
    this.setNewCandy();
};

P2Tools.prototype =
{

    cWorld: function(gravityX,gravityY)
    {
        this.world = new p2.World({
            gravity:[gravityX,gravityY]
        });
        return this.world;
    },

    setNewMouse: function()
    {
        this.currentMouse = this.spawner.getNextMouse();
    },

    setNewCandy: function()
    {
        this.currentCandy = this.spawner.getNextCandy();
    },

    cMouse: function(x,y)
    {

        var type = this.currentMouse;
        this.setNewMouse();
        var circleShape = new p2.Circle(30);
        var circleBody = new p2.Body({ mass:1,
            position:[this.transformX(x),this.transformY(y)]
        });
        circleBody.damping = 0;
        circleBody.addShape(circleShape);
        circleBody.color = 'red';
        this.world.addBody(circleBody);
        this.circles.push([circleBody,circleShape]);

        var visibleObject = new TGE.Sprite().setup({
            image: "mouse" + type,
            scale:0.226,
            x:x,
            y:y
        });
        this.parent.getLayer("mouse").addChild(visibleObject);
        this.parent.miceArray.push(circleBody);

        var tools = this;

        visibleObject.follow  = circleBody;
        circleBody.mySprite = visibleObject;
        visibleObject.addEventListener("update",function()
        {
            this.x = tools.xToP2(this.follow.position[0]);
            this.y = tools.yToP2(this.follow.position[1]);
            /**
             this.x = tools.transformX(this.follow.position[0]);
             this.y = tools.transformY(this.follow.position[1]);
             /**/

            this.rotation = this.follow.angle*57.2957795;
        }.bind(visibleObject));

        return circleBody;
    },

    cCircle: function(x,y,radius,images,scale,alpha,rotationOffset)
    {
        //images = typeof images == "string" ? images : "ball_1";
        images = this.currentCandy;
        scale = typeof scale == "number" ? scale : 1;
        alpha = typeof alpha == "number" ? alpha : 1;
        rotationOffset = typeof rotationOffset == "number" ? rotationOffset : 0;

        var circleShape = new p2.Circle(radius*scale);
        var circleBody = new p2.Body({ mass:1,
            position:[this.transformX(x),this.transformY(y)]
        });
        circleBody.damping = 0;
        circleBody.addShape(circleShape);
        circleBody.color = 'red';
        this.world.addBody(circleBody);
        this.circles.push([circleBody,circleShape]);

        var visibleObject = new TGE.Sprite().setup({
            image: images,
            x:x,
            y:y,
            scale:scale,
            alpha:alpha,
            rotation: rotationOffset
        });
        this.parent.getLayer("ballLayer").addChild(visibleObject);

        var tools = this;

        visibleObject.follow  = circleBody;
        circleBody.mySprite = visibleObject;

        visibleObject.hardened = false;
        visibleObject.addEventListener("update",function()
        {
            if(!visibleObject.hardened)
            {
                return;
            }
            this.x = tools.xToP2(this.follow.position[0]);
            this.y = tools.yToP2(this.follow.position[1]);
            /**
             this.x = tools.transformX(this.follow.position[0]);
             this.y = tools.transformY(this.follow.position[1]);
             /**/

            this.rotation = this.follow.angle*57.2957795;
        }.bind(visibleObject));

        return circleBody;
    },



    cTriangleX: function(x,y,radius,images,scale,alpha,rotationOffset)
    {
        images = typeof images == "string" ? images : "ball_1";
        scale = typeof scale == "number" ? scale : 1;
        alpha = typeof alpha == "number" ? alpha : 1;
        rotationOffset = typeof rotationOffset == "number" ? rotationOffset : 0;

        var triangleBody = new p2.Body({ mass:1,
            position:[this.transformX(x),this.transformY(y)+radius*0.14]
        });
        triangleBody.damping = 0;
        var triangleShape = [
            [-1*radius*scale, -1*radius*0.88*scale],
            [-1*radius*scale, -1*radius*0.72*scale],

            [-1*radius*0.15*scale, radius*0.9*scale],
            [0, radius*scale],
            [radius*0.15*scale, radius*0.9*scale],

            [radius*scale, -1*radius*0.72*scale],
            [radius*scale, -1*radius*0.88*scale],
            [radius*0.82*scale, -1*radius*scale],

            [-radius*0.82*scale, -1*radius*scale]];
        triangleBody.fromPolygon(triangleShape);
        triangleBody.color = 'red';
        this.world.addBody(triangleBody);
        this.circles.push([triangleBody,triangleShape]);

        var visibleObject = new TGE.Sprite().setup({
            image: images,
            x:x,
            y:y,
            scale:scale,
            alpha:alpha,
            rotation: rotationOffset
        });
        this.parent.getLayer("ballLayer").addChild(visibleObject);

        var tools = this;

        visibleObject.follow  = triangleBody;
        //console.log(visibleObject);
        triangleBody.mySprite = visibleObject;
        visibleObject.registrationY = 0.64;

        visibleObject.hardened = false;
        visibleObject.addEventListener("update",function()
        {
            if(!visibleObject.hardened)
            {
                return;
            }
            this.x = tools.xToP2(this.follow.position[0]);
            this.y = tools.yToP2(this.follow.position[1]);
            /**
             this.x = tools.transformX(this.follow.position[0]);
             this.y = tools.transformY(this.follow.position[1]);
             /**/
            //console.log(this.follow.angle);
            this.rotation = -this.follow.angle*57.2957795;
        }.bind(visibleObject));

        return triangleBody;
    },

    cTriangle: function(x,y,radius)
    {

        var circleBody = new p2.Body({ mass:1,
            position:[this.transformX(x),this.transformY(y)]
        });
        circleBody.damping = 0;
        circleBody.fromPolygon([[0,0],[0,30],[15,15]]);
        circleBody.color = 'red';

        var visibleObject = new TGE.Sprite().setup({
            image: "mouse1",
            x:x,
            y:y,
            scale:0.22
        });
        this.parent.getLayer("ballLayer").addChild(visibleObject);

        var tools = this;

        visibleObject.follow  = circleBody;
        circleBody.mySprite = visibleObject;

        visibleObject.hardened = false;
        visibleObject.addEventListener("update",function()
        {
            console.log(this.y);
            this.x = tools.xToP2(this.follow.position[0]);
            this.y = tools.yToP2(this.follow.position[1]);
            /**
             this.x = tools.transformX(this.follow.position[0]);
             this.y = tools.transformY(this.follow.position[1]);
             /**/

            this.rotation = (this.follow.angle*57.2957795+globalValue);
        }.bind(visibleObject));

        return circleBody;
    },


    initFixture: function(params)
    {
        var groundMaterial = new p2.Material();
        params.position = typeof params.position !== "undefined" ? params.position : [0,0];
        var width = typeof params.width == "number" ? params.width : 20;
        var height = typeof params.height == "number" ? params.height : 20;
        var x = typeof params.x == "number" ? params.x : 0;
        var y = typeof params.y == "number" ? params.y : 0;

        var platformShape = new p2.Rectangle(width,height);
        var platformBody = new p2.Body({
            mass: 0, // Static
            position:[this.transformX(x),this.transformY(y)]
        });
        platformBody.type = p2.Body.KINEMATIC;
        platformBody.addShape(platformShape);
        platformShape.material = groundMaterial;
        this.world.addBody(platformBody);

        return platformBody;
    },

    cStaticBox: function(params)
    {
        typeof params.shape !== "string" ? params.shape = "box" : null;
        var body = this.initFixture(params);

        var scale = typeof params.scale == "number" ? params.scale : 1;
        var alpha = typeof params.alpha == "number" ? params.alpha : 1;
        var x = typeof params.x == "number" ? params.x : 0;
        var y = typeof params.y == "number" ? params.y : 0;
        var width = typeof params.width == "number" ? params.width : 20;
        var height = typeof params.height == "number" ? params.height : 20;
        var visibleObject = {follow:body};

        if(typeof params.screen == "undefined" /** || true /**/)
        {
            return visibleObject;
        }
        var visualConfig = {
            x:x,
            y:y,
            width:width,
            height:height,
            scale:scale,
            alpha:alpha
        };
        if(typeof params.image != "string")
        {
            console.log("Creating yellow box at"  + x + " " + y);
            visualConfig.backgroundColor = "yellow";
            visibleObject = params.screen.addChild(new TGE.DisplayObjectContainer().setup(visualConfig));
        }
        else
        {
            visualConfig.image = params.image;
            visibleObject = params.screen.addChild(new TGE.Sprite().setup(visualConfig));
        }


        var tools = this;

        visibleObject.follow  = body;
        visibleObject.addEventListener("update",function()
        {
            this.x = tools.xToP2(this.follow.position[0]);
            this.y = tools.yToP2(this.follow.position[1]);
        }.bind(visibleObject));

        return visibleObject;
    },

    transformX: function(x)
    {
        return x-this.percentageOfWidth(0.5);
    },

    transformY: function(y)
    {
        return -y+this.percentageOfHeight(0.5);
    },

    xToP2: function(x)
    {
        return x+this.percentageOfWidth(0.5);
    },

    yToP2: function(y)
    {
        return -y+this.percentageOfHeight(0.5);
    },

    percentageOfWidth: function(x)
    {
        return x*this.width;
    },

    percentageOfHeight: function(y)
    {
        return y*this.height;
    }
};

var globalValue = 60;
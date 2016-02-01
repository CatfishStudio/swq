
/* == START FILE ========================================================= */

var EndGame = function(parent)
{
    var that = {
        windowStage: null,
        leftBoomArray: null,
        rightBoomArray: null,
        
        styleDroidBlueText: { font : 'bold 14px Arial', fill : '#FFFFFF', stroke : '#0090F0', strokeThickness : 1, wordWrap : true, wordWrapWidth : 275 },
        styleDroidRedText: { font : 'bold 14px Arial', fill : '#FFFFFF', stroke : '#880000', strokeThickness : 1, wordWrap : true, wordWrapWidth : 275 },
                
        SIDE_NONE: "side_none",
	SIDE_JEDI: "side_jedi",
	SIDE_SITH: "side_sith",
        
        create: function(status)
        {
            that.leftBoomArray = [];
            that.leftBoomArray.push([200, 200]);
            that.leftBoomArray.push([150, 210]);
            that.leftBoomArray.push([210, 250]);
            that.leftBoomArray.push([225, 180]);
            that.leftBoomArray.push([285, 190]);
            that.leftBoomArray.push([290, 120]);
            that.leftBoomArray.push([215, 235]);
            that.leftBoomArray.push([170, 150]);
            that.leftBoomArray.push([350, 100]);
            that.leftBoomArray.push([300, 250]);
            that.leftBoomArray.push([265, 270]);
            
            that.rightBoomArray = [];
            that.rightBoomArray.push([400, 200]);
            that.rightBoomArray.push([350, 210]);
            that.rightBoomArray.push([410, 250]);
            that.rightBoomArray.push([425, 180]);
            that.rightBoomArray.push([485, 190]);
            that.rightBoomArray.push([490, 120]);
            that.rightBoomArray.push([415, 235]);
            that.rightBoomArray.push([370, 150]);
            that.rightBoomArray.push([550, 100]);
            that.rightBoomArray.push([500, 250]);
            that.rightBoomArray.push([465, 270]);
            
            that.windowStage = new PIXI.Container();
            that.backgroundCreate();
            if(status === "win") // Пользователь победил
            {
                if(parent.config.side === that.SIDE_JEDI)
                {
                    that.deathStarCreate(150, 100);
                    that.boomCreate("left");
                    that.heroesJEDICreate();
                    that.borderBlueCreate();
                }
                if(parent.config.side === that.SIDE_SITH)
                {
                    that.corusantCreate(350, 100);
                    that.boomCreate("right");
                    that.heroesSITHCreate();
                    that.borderRedCreate();
                }
            }
            if(status === "lost") // Пользователь проиграл
            {
                if(parent.config.side === that.SIDE_JEDI)
                {
                    that.corusantCreate(350, 100);
                    that.boomCreate("right");
                    that.heroesSITHCreate();
                    that.borderRedCreate();
                }
                if(parent.config.side === that.SIDE_SITH)
                {
                    that.deathStarCreate(150, 100);
                    that.boomCreate("left");
                    that.heroesJEDICreate();
                    that.borderBlueCreate();
                }
            }
        },
        
        backgroundCreate: function()
        {
            var sprite = new PIXI.Sprite(parent.assets.getAsset("stars1Texture")); 
            sprite.position.x = 0; 
            sprite.position.y = 0; 
            sprite.scale.set(1.0); 
            that.windowStage.addChild(sprite);
        },
        
        borderBlueCreate: function()
        {
            var graphics = new PIXI.Graphics();
            graphics.lineStyle(2, 0x0000FF, 1);
            graphics.beginFill(0x000000, 0);
            graphics.drawRect(10, 10, 840, 710);
            graphics.endFill();
            
            graphics.lineStyle(0);
            graphics.beginFill(0xFFFFFF, 1);
            graphics.drawCircle(5, 600,4);
            graphics.endFill();

            graphics.lineStyle(2, 0xFFFFFF, 1);
            graphics.moveTo(5,600);
            graphics.lineTo(5, 725);
            
            graphics.lineStyle(2, 0xFFFFFF, 1);
            graphics.moveTo(5,725);
            graphics.lineTo(25, 725);
            graphics.moveTo(25,725);
            graphics.lineTo(430, 725);

            graphics.lineStyle(2, 0xFFFFFF, 1);
            graphics.moveTo(430,725);
            graphics.lineTo(855, 725);

            graphics.lineStyle(0);
            graphics.beginFill(0xFFFFFF, 1);
            graphics.drawCircle(855, 725,4);
            graphics.endFill();
            
            graphics.lineStyle(0);
            graphics.beginFill(0xFFFFFF, 1);
            graphics.drawCircle(855, 150,4);
            graphics.endFill();

            graphics.lineStyle(2, 0xFFFFFF, 1);
            graphics.moveTo(855,150);
            graphics.lineTo(855, 5);
            graphics.moveTo(855,5);
            graphics.lineTo(430, 5);

            graphics.lineStyle(2, 0xFFFFFF, 1);
            graphics.moveTo(430,5);
            graphics.lineTo(5, 5);

            graphics.lineStyle(0);
            graphics.beginFill(0xFFFFFF, 1);
            graphics.drawCircle(5,5,4);
            graphics.endFill();
            
            that.windowStage.addChild(graphics);
            
            var textureSprite = new PIXI.Sprite(parent.assets.getAsset("r2d2DroidBlueLeftTexture")); 
            textureSprite.position.x = 40; 
            textureSprite.position.y = 550; 
            textureSprite.scale.set(0.4);
            that.windowStage.addChild(textureSprite);
            
            var graphics = new PIXI.Graphics(); 
            graphics.lineStyle(2, 0x0080C0, 1);
            graphics.beginFill(0x0080C0, 0.2);
            graphics.moveTo(125,450);
            graphics.lineTo(410, 450);
            graphics.lineTo(410, 575);
            graphics.lineTo(125, 575);
            graphics.endFill();
            for(var i = 0; i < 42; i++)
            {
                    graphics.lineStyle(1, 0x0090F0, 0.5);
                    graphics.moveTo(125, 450+(3*i));
                    graphics.lineTo(410, 450+(3*i));
            }
            that.windowStage.addChild(graphics);
            
            var textMessage = new PIXI.Text("ВЫ ПОБЕДИЛИ!!!", that.styleDroidBlueText); 
            textMessage.x = 130; 
            textMessage.y = 455; 
            that.windowStage.addChild(textMessage);
        },
        
        borderRedCreate: function()
        {
            var graphics = new PIXI.Graphics();
            graphics.lineStyle(2, 0xFF0000, 1);
            graphics.beginFill(0x000000, 0);
            graphics.drawRect(10, 10, 840, 710);
            graphics.endFill();
            
            graphics.lineStyle(0);
            graphics.beginFill(0xFFFF80, 1);
            graphics.drawCircle(5, 600,4);
            graphics.endFill();

            graphics.lineStyle(2, 0xFFFF80, 1);
            graphics.moveTo(5,600);
            graphics.lineTo(5, 725);
            
            graphics.lineStyle(2, 0xFFFF80, 1);
            graphics.moveTo(5,725);
            graphics.lineTo(25, 725);
            graphics.moveTo(25,725);
            graphics.lineTo(430, 725);

            graphics.lineStyle(2, 0xFFFF80, 1);
            graphics.moveTo(430,725);
            graphics.lineTo(855, 725);

            graphics.lineStyle(0);
            graphics.beginFill(0xFFFF80, 1);
            graphics.drawCircle(855, 725,4);
            graphics.endFill();
            
            graphics.lineStyle(0);
            graphics.beginFill(0xFFFF80, 1);
            graphics.drawCircle(855, 150,4);
            graphics.endFill();

            graphics.lineStyle(2, 0xFFFF80, 1);
            graphics.moveTo(855,150);
            graphics.lineTo(855, 5);
            graphics.moveTo(855,5);
            graphics.lineTo(430, 5);

            graphics.lineStyle(2, 0xFFFF80, 1);
            graphics.moveTo(430,5);
            graphics.lineTo(5, 5);

            graphics.lineStyle(0);
            graphics.beginFill(0xFFFF80, 1);
            graphics.drawCircle(5,5,4);
            graphics.endFill();
            
            that.windowStage.addChild(graphics);
            
            var textureSprite = new PIXI.Sprite(parent.assets.getAsset("r2d2DroidRedRightTexture")); 
            textureSprite.position.x = 700; 
            textureSprite.position.y = 550;  
            textureSprite.scale.set(0.4);
            that.windowStage.addChild(textureSprite);
            
            var graphics = new PIXI.Graphics(); 
            graphics.lineStyle(2, 0x800000, 1);
            graphics.beginFill(0x800000, 0.2);
            graphics.moveTo(450, 450);
            graphics.lineTo(735, 450);
            graphics.lineTo(735, 575);
            graphics.lineTo(450, 575);
            graphics.endFill();
            for(var i = 0; i < 42; i++)
            {
                    graphics.lineStyle(1, 0x800000, 0.5);
                    graphics.moveTo(450, 450+(3*i));
                    graphics.lineTo(735, 450+(3*i));
            }
            that.windowStage.addChild(graphics);
            
            var textMessage = new PIXI.Text("ВЫ ПОБЕДИЛИ!!!", that.styleDroidRedText); 
            textMessage.x = 455; 
            textMessage.y = 455; 
            that.windowStage.addChild(textMessage);
        },
        
        heroesJEDICreate: function()
        {
            var movieClip = new PIXI.extras.MovieClip(parent.assets.getAsset("animTexSideLukeSkywalker"));
            movieClip.name = "LukeSkywalker";
            movieClip.position.x = 500;
            movieClip.position.y = 150;
            movieClip.loop = true;
            movieClip.animationSpeed = 0.2;
            movieClip.play();
            that.windowStage.addChild(movieClip);
        },
        
        heroesSITHCreate: function()
        {
            var movieClip = new PIXI.extras.MovieClip(parent.assets.getAsset("animTexSideDarthVader"));
            movieClip.name = "DarthVader";
            movieClip.position.x = 25;
            movieClip.position.y = 155;
            movieClip.loop = true;
            movieClip.animationSpeed = 0.2;
            movieClip.play();
            that.windowStage.addChild(movieClip);
        },
        
        corusantCreate: function(posX, posY)
        {
            var sprite = new PIXI.Sprite(parent.assets.getAsset("planetTextures").Coruscant[1]); 
            sprite.position.x = posX; 
            sprite.position.y = posY; 
            that.windowStage.addChild(sprite);
        },
        
        deathStarCreate: function(posX, posY)
        {
            var sprite = new PIXI.Sprite(parent.assets.getAsset("deathstarDestroyTexture")); 
            sprite.position.x = posX; 
            sprite.position.y = posY; 
            that.windowStage.addChild(sprite);
        },
        
        boomCreate: function(position)
        {
            if(position === "left")
            {
                var boomMovieClip = new PIXI.extras.MovieClip(parent.assets.getAsset("animTexBoom")); 
                boomMovieClip.status = "left";
                boomMovieClip.position.x = 200; 
                boomMovieClip.position.y = 200; 
                boomMovieClip.loop = false; 
                boomMovieClip.animationSpeed = 0.2;
                boomMovieClip.onComplete = that.onBoomUpdate;
                boomMovieClip.play();
                that.windowStage.addChild(boomMovieClip);
            }
            if(position === "right")
            {
                var boomMovieClip = new PIXI.extras.MovieClip(parent.assets.getAsset("animTexBoom")); 
                boomMovieClip.status = "right";
                boomMovieClip.position.x = 400; 
                boomMovieClip.position.y = 200; 
                boomMovieClip.loop = false; 
                boomMovieClip.animationSpeed = 0.2;
                boomMovieClip.onComplete = that.onBoomUpdate;
                boomMovieClip.play();
                that.windowStage.addChild(boomMovieClip);
            }
        },
        
        onBoomUpdate: function(e)
        {
            if(this.status === "left")
            {
                this.position.x = that.leftBoomArray[parent.initialization.randomIndex()][0];
                this.position.y = that.leftBoomArray[parent.initialization.randomIndex()][1];
            }
            if(this.status === "right")
            {
                this.position.x = that.rightBoomArray[parent.initialization.randomIndex()][0];
                this.position.y = that.rightBoomArray[parent.initialization.randomIndex()][1];
            }
            this.gotoAndPlay(0);
        },
        
        tweenStart: function()
        {
            
        },
        
        tweenStop: function()
        {
            
        },
        
        show: function()
        {
                that.tweenStart();
                return that.windowStage;
        },

        close: function()
        {
                that.tweenStop();
                for(var child in that.windowStage.children) that.windowStage.removeChild(that.windowStage.children[child]);
                return that.windowStage;
        },

        getWindowStage: function()
        {
                return that.windowStage;
        },

        destroy: function()
        {
                for(var child in that.windowStage.children) that.windowStage.removeChild(that.windowStage.children[child]);
                that.windowStage.destroy();
                delete that.windowStage.children;

                for(var property in that) that[property] = null;
        }
    };
    return that;
};


/* == END FILE ========================================================== */

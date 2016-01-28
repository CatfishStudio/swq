
/* == START FILE ========================================================= */

var Lost = function(parent)
{
    var that = {
        windowStage: null,
        lineAnimationGraphics: null,
        
        SIDE_NONE: "side_none",
	SIDE_JEDI: "side_jedi",
	SIDE_SITH: "side_sith",
        
        intercept: null,
        planetID: null,
        
        create: function(planetID, intercept)
        {
            that.intercept = intercept;
            that.planetID = planetID;
            
            that.windowStage = new PIXI.Container();
            that.backgroundCreate();
            that.windowCreate();
        },
        
        backgroundCreate: function()
        {
            var graphics = new PIXI.Graphics(); 
            graphics.hitArea = new PIXI.Rectangle(0, 0, parent.config.MAIN_WIDTH, parent.config.MAIN_HEIGH);
            graphics.interactive = true;
            graphics.lineStyle(1, 0x000000, 0.05);
            graphics.beginFill(0x000000, 0.5);
            graphics.drawRect(0, 0, parent.config.MAIN_WIDTH, parent.config.MAIN_HEIGH);
            graphics.endFill();
            that.windowStage.addChild(graphics); 
        },
        
        windowCreate: function()
        {
            if(parent.config.side === that.SIDE_JEDI)
            {
                var graphics = new PIXI.Graphics(); 
                graphics.lineStyle(2, 0xFFFF80, 1);
                graphics.drawRoundedRect(200, 150, 460, 420, 15);
                graphics.lineStyle(2, 0xFF0000, 1);
                graphics.beginFill(0x800000, 0.5);
                graphics.drawRoundedRect(210, 160, 440, 400, 5);
                graphics.endFill();
                that.windowStage.addChild(graphics);
                
                var textureSprite; 
                if(that.intercept === false) textureSprite = new PIXI.Sprite(parent.assets.getAsset("heroesTextures")[parent.initialization.planets[that.planetID].redPersonage1][1]);
                else {
                    if(parent.initialization.commandAI["personage1"] != undefined) textureSprite = new PIXI.Sprite(parent.assets.getAsset("heroesTextures")[parent.initialization.commandAI["personage1"]][1]);
                    else{
                        if(parent.initialization.commandAI["personage2"] != undefined) textureSprite = new PIXI.Sprite(parent.assets.getAsset("heroesTextures")[parent.initialization.commandAI["personage2"]][1]);
                        else textureSprite = new PIXI.Sprite(parent.assets.getAsset("heroesTextures")[parent.initialization.commandAI["personage3"]][1]);
                    }
                }
                textureSprite.position.x = 220; 
                textureSprite.position.y = 265; 
                textureSprite.scale.set(0.5);
                that.windowStage.addChild(textureSprite);
                
                graphics = new PIXI.Graphics();
                for(var i = 0; i < 133; i++)
                {
                        graphics.lineStyle(1, 0xA63A24, 0.5);
                        graphics.moveTo(210, 160+(3*i));
                        graphics.lineTo(650, 160+(3*i));
                }
                that.windowStage.addChild(graphics);

                that.lineAnimationGraphics = new PIXI.Graphics(); 
                that.lineAnimationGraphics.lineStyle(10, 0xA63A24, 0.3);
                that.lineAnimationGraphics.moveTo(210, 165);
                that.lineAnimationGraphics.lineTo(650, 165);
                that.windowStage.addChild(that.lineAnimationGraphics);
            }
            if(parent.config.side === that.SIDE_SITH)
            {
                var graphics = new PIXI.Graphics(); 
                graphics.lineStyle(2, 0xFFFFFF, 1);
                graphics.drawRoundedRect(200, 150, 460, 420, 15);
                graphics.lineStyle(2, 0x0000FF, 1);
                graphics.beginFill(0x00000F, 0.5);
                graphics.drawRoundedRect(210, 160, 440, 400, 5);
                graphics.endFill();
                that.windowStage.addChild(graphics);
                
                var textureSprite; 
                if(that.intercept === false) textureSprite = new PIXI.Sprite(parent.assets.getAsset("heroesTextures")[parent.initialization.planets[that.planetID].bluePersonage1][1]);
                else {
                    if(parent.initialization.commandAI["personage1"] != undefined) textureSprite = new PIXI.Sprite(parent.assets.getAsset("heroesTextures")[parent.initialization.commandAI["personage1"]][1]);
                    else{
                        if(parent.initialization.commandAI["personage2"] != undefined) textureSprite = new PIXI.Sprite(parent.assets.getAsset("heroesTextures")[parent.initialization.commandAI["personage2"]][1]);
                        else textureSprite = new PIXI.Sprite(parent.assets.getAsset("heroesTextures")[parent.initialization.commandAI["personage3"]][1]);
                    }
                }
                textureSprite.position.x = 220; 
                textureSprite.position.y = 265; 
                textureSprite.scale.set(0.5);
                that.windowStage.addChild(textureSprite);
                
                graphics = new PIXI.Graphics();
                for(var i = 0; i < 133; i++)
                {
                        graphics.lineStyle(1, 0x0000FF, 0.5);
                        graphics.moveTo(210, 160+(3*i));
                        graphics.lineTo(650, 160+(3*i));
                }
                that.windowStage.addChild(graphics);

                that.lineAnimationGraphics = new PIXI.Graphics(); 
                that.lineAnimationGraphics.lineStyle(10, 0x0000FF, 0.3);
                that.lineAnimationGraphics.moveTo(210, 165);
                that.lineAnimationGraphics.lineTo(650, 165);
                that.windowStage.addChild(that.lineAnimationGraphics);
            }
        },
        
        
        
        
        
        
        
        
        
        
        tweenStart: function()
        {
            createjs.Tween.get(that.lineAnimationGraphics, {loop: true}) 
                    .to({x: 0, y: 390}, 2500, createjs.Ease.getPowInOut(3));
            createjs.Ticker.setFPS(60);
        },

        tweenStop: function()
        {
            createjs.Tween.removeTweens(that.lineAnimationGraphics);
        },

        show: function()
        {
                if(parent.level !== null) parent.timer.timerPauseBegin();
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

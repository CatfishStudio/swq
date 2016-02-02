
/* == START FILE ========================================================= */

var Lost = function(parent)
{
    var that = {
        windowStage: null,
        lineAnimationGraphics: null,
        styleBlueText: { font : 'bold 18px Arial', fill : '#C4DEFB', stroke : '#0090F0', strokeThickness : 1, wordWrap : true, wordWrapWidth : 400, align: "center"},
        styleRedText: { font : 'bold 18px Arial', fill : '#EDCDCB', stroke : '#880000', strokeThickness : 1, wordWrap : true, wordWrapWidth : 400, align: "center"}, 
        styleBlueText2: { font : 'bold 12px Arial', fill : '#C4DEFB', stroke : '#0090F0', strokeThickness : 1, wordWrap : true, wordWrapWidth : 200, align: "center"},
        styleRedText2: { font : 'bold 12px Arial', fill : '#EDCDCB', stroke : '#880000', strokeThickness : 1, wordWrap : true, wordWrapWidth : 200, align: "center"}, 
        buttonStyleBlueText: { font : 'bold 24px Arial', fill : '#FFFFFF', stroke : '#0090F0', strokeThickness : 1, wordWrap : true, wordWrapWidth : 340 },
        buttonStyleRedText: { font : 'bold 24px Arial', fill : '#FFFFFF', stroke : '#880000', strokeThickness : 1, wordWrap : true, wordWrapWidth : 340 }, 

        SIDE_NONE: "side_none",
	SIDE_JEDI: "side_jedi",
	SIDE_SITH: "side_sith",
        
        intercept: null,
        planetID: null,
        aiPlanetID: null,
        
        create: function(planetID, intercept, aiPlanetID)
        {
            that.intercept = intercept;
            that.planetID = planetID;
            that.aiPlanetID = aiPlanetID;
            
            that.windowStage = new PIXI.Container();
            that.backgroundCreate();
            that.windowCreate();
            that.titleCreate();
            that.textCreate();
            that.buttonCloseCreate();
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
                textureSprite.position.x = 360; 
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
                textureSprite.position.x = 360; 
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
        
         titleCreate: function()
        {
            var text;
            if(parent.config.side === that.SIDE_SITH) text = new PIXI.Text("ВЫ ПРОИГРАЛИ!", that.buttonStyleBlueText); 
            if(parent.config.side === that.SIDE_JEDI) text = new PIXI.Text("ВЫ ПРОИГРАЛИ!", that.buttonStyleRedText); 
            text.x = 335;
            text.y = 180;
            that.windowStage.addChild(text);
        },
        
         textCreate: function()
        {
            var text;
            if(parent.config.side === that.SIDE_SITH)
            {
                if(that.intercept === false) text = new PIXI.Text(parent.initialization.personages[parent.initialization.planets[that.planetID].bluePersonage1].name + " победил вас на планете " + parent.initialization.planets[that.planetID].name, that.styleBlueText);
                else{
                    if(parent.initialization.commandAI["personage1"] != undefined) text = new PIXI.Text(parent.initialization.personages[parent.initialization.commandAI["personage1"]].name + " победил вас на планете " + parent.initialization.planets[that.planetID].name, that.styleBlueText);
                    else{
                        if(parent.initialization.commandAI["personage2"] != undefined) text = new PIXI.Text(parent.initialization.personages[parent.initialization.commandAI["personage2"]].name + " победил вас на планете " + parent.initialization.planets[that.planetID].name, that.styleBlueText);
                        else text = new PIXI.Text(parent.initialization.personages[parent.initialization.commandAI["personage3"]].name + " победил вас на планете " + parent.initialization.planets[that.planetID].name, that.styleBlueText);
                    }
                }
                text.x = 260;
                text.y = 210;
                that.windowStage.addChild(text);
            }
			
            if(parent.config.side === that.SIDE_JEDI)
            {
                if(that.intercept === false) text = new PIXI.Text(parent.initialization.personages[parent.initialization.planets[that.planetID].redPersonage1].name + " победил вас на планете " + parent.initialization.planets[that.planetID].name, that.styleRedText);
                else{
                    if(parent.initialization.commandAI["personage1"] != undefined) text = new PIXI.Text(parent.initialization.personages[parent.initialization.commandAI["personage1"]].name + " победил вас на планете " + parent.initialization.planets[that.planetID].name, that.styleRedText);
                    else{
                        if(parent.initialization.commandAI["personage2"] != undefined) text = new PIXI.Text(parent.initialization.personages[parent.initialization.commandAI["personage2"]].name + " победил вас на планете " + parent.initialization.planets[that.planetID].name, that.styleRedText);
                        else text = new PIXI.Text(parent.initialization.personages[parent.initialization.commandAI["personage3"]].name + " победил вас на планете " + parent.initialization.planets[that.planetID].name, that.styleRedText);
                    }
                }
                text.x = 260;
                text.y = 210;
                that.windowStage.addChild(text);
            }
        },
        
        buttonCloseCreate: function()
        {
            if(parent.config.side === that.SIDE_SITH)
            {
                var button = new PIXI.extras.MovieClip(parent.assets.getAsset("animTexButtonBlue")); 
                button.name = "button_close";
                button.position.x = 330; 
                button.position.y = 510; 
                button.interactive = true; 
                button.buttonMode = true; 
                button.loop = false; 
                button.animationSpeed = 0.2;
                button.onComplete = that.onButtonCloseUpdate;
                button.tap = that.onButtonCloseClick; 
                button.click = that.onButtonCloseClick; 
                button.on('mouseover', that.onButtonCloseOver);
                button.on('mouseout', that.onButtonCloseOut);
                var text = new PIXI.Text("Закрыть", that.styleBlueText); 
                text.x = (button.width / 2) - (text.width / 2);
                text.y = button.height / 3.2;
                button.addChild(text); 
                that.windowStage.addChild(button);
            }
			
            if(parent.config.side === that.SIDE_JEDI)
            {
                var button = new PIXI.extras.MovieClip(parent.assets.getAsset("animTexButtonRed")); 
                button.name = "button_close";
                button.position.x = 330; 
                button.position.y = 510; 
                button.interactive = true; 
                button.buttonMode = true; 
                button.loop = false; 
                button.animationSpeed = 0.2;
                button.onComplete = that.onButtonCloseUpdate;
                button.tap = that.onButtonCloseClick; 
                button.click = that.onButtonCloseClick; 
                button.on('mouseover', that.onButtonCloseOver);
                button.on('mouseout', that.onButtonCloseOut);
                var text = new PIXI.Text("Закрыть", that.styleRedText); 
                text.x = (button.width / 2) - (text.width / 2);
                text.y = button.height / 3.2;
                button.addChild(text); 
                that.windowStage.addChild(button);
            }
        },
        
        onButtonCloseOver: function(event)
        {
                this.isOver = true;
                this.gotoAndPlay(1);
        },

        onButtonCloseOut: function(event)
        {
                this.isOver = false;
                this.gotoAndStop(0);
        },

        onButtonCloseUpdate: function(event)
        {
                if(this.isOver)
                {
                    this.gotoAndPlay(1);
                }else{
                    this.gotoAndStop(0);
                }
        },

        onButtonCloseClick: function(event)
        {
            // ИИ присваиваем планете статус завоёванной если это был перехват
            if(that.intercept === true)
            {
                if(parent.config.side === that.SIDE_SITH) parent.initialization.planets[that.planetID].status = parent.initialization.USER_PLANET_QUEST_COMPLETE_JEDI; 
                if(parent.config.side === that.SIDE_JEDI) parent.initialization.planets[that.planetID].status = parent.initialization.USER_PLANET_QUEST_COMPLETE_SITH; 
                // Увеличиваем очки опыта ИИ
                parent.initialization.userExperiencePointsAI += 3;
                // обновление команды ИИ распределение очков опыта
                if(parent.config.side === that.SIDE_JEDI) parent.initialization.aiUpgradeCommand(that.SIDE_SITH, that.aiPlanetID);
                if(parent.config.side === that.SIDE_SITH) parent.initialization.aiUpgradeCommand(that.SIDE_JEDI, that.aiPlanetID);
                
                if(parent.config.side === that.SIDE_JEDI && parent.initialization.planets[that.aiPlanetID].id === "Coruscant") parent.endGameShow("lost");
                else{
                    if(parent.config.side === that.SIDE_SITH && parent.initialization.planets[that.aiPlanetID].id === "DeathStar") parent.endGameShow("lost");
                    else{
                        parent.lostClose(); // закрываем окно
                    }
                }
                
            }else{
                if(parent.initialization.aiResultBattle() === true) // ИИ присваиваем планете статус завоёванной
                {
                    if(parent.config.side === that.SIDE_SITH) parent.initialization.planets[that.aiPlanetID].status = parent.initialization.USER_PLANET_QUEST_COMPLETE_JEDI; 
                    if(parent.config.side === that.SIDE_JEDI) parent.initialization.planets[that.aiPlanetID].status = parent.initialization.USER_PLANET_QUEST_COMPLETE_SITH; 
                    // Увеличиваем очки опыта ИИ
                    parent.initialization.userExperiencePointsAI += 3;
                    // обновление команды ИИ распределение очков опыта
                    if(parent.config.side === that.SIDE_JEDI) parent.initialization.aiUpgradeCommand(that.SIDE_SITH, that.aiPlanetID);
                    if(parent.config.side === that.SIDE_SITH) parent.initialization.aiUpgradeCommand(that.SIDE_JEDI, that.aiPlanetID);
                    
                    if(parent.config.side === that.SIDE_JEDI && parent.initialization.planets[that.aiPlanetID].id === "Coruscant") parent.endGameShow("lost");
                    else{
                        if(parent.config.side === that.SIDE_SITH && parent.initialization.planets[that.aiPlanetID].id === "DeathStar") parent.endGameShow("lost");
                        else{
                            parent.lostClose(); // закрываем окно
                        }
                    }
                }else{
                    parent.lostClose(); // закрываем окно
                }
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

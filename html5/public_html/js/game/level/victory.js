
/* == START FILE ========================================================= */

var Victory = function(parent)
{
    var that = {
        windowStage: null,
        lineAnimationGraphics: null,
        styleBlueText: { font : 'bold 18px Arial', fill : '#C4DEFB', stroke : '#0090F0', strokeThickness : 1, wordWrap : true, wordWrapWidth : 340, align: "center"},
        styleRedText: { font : 'bold 18px Arial', fill : '#EDCDCB', stroke : '#880000', strokeThickness : 1, wordWrap : true, wordWrapWidth : 340, align: "center"}, 
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
            if(that.intercept === true) that.buttonCloseCreate();
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
                graphics.lineStyle(2, 0xFFFFFF, 1);
                graphics.drawRoundedRect(200, 150, 460, 420, 15);
                graphics.lineStyle(2, 0x0000FF, 1);
                graphics.beginFill(0x00000F, 0.5);
                graphics.drawRoundedRect(210, 160, 440, 400, 5);
                graphics.endFill();
                that.windowStage.addChild(graphics);

                var textureSprite; 
                if(parent.initialization.commandUser["personage1"] != undefined) textureSprite = new PIXI.Sprite(parent.assets.getAsset("heroesTextures")[parent.initialization.commandUser["personage1"]][1]);
                else{
                        if(parent.initialization.commandUser["personage2"] != undefined) textureSprite = new PIXI.Sprite(parent.assets.getAsset("heroesTextures")[parent.initialization.commandUser["personage2"]][1]);
                        else textureSprite = new PIXI.Sprite(parent.assets.getAsset("heroesTextures")[parent.initialization.commandUser["personage3"]][1]);
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
            if(parent.config.side === that.SIDE_SITH)
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
                if(parent.initialization.commandUser["personage1"] != undefined) textureSprite = new PIXI.Sprite(parent.assets.getAsset("heroesTextures")[parent.initialization.commandUser["personage1"]][1]);
                else{
                        if(parent.initialization.commandUser["personage2"] != undefined) textureSprite = new PIXI.Sprite(parent.assets.getAsset("heroesTextures")[parent.initialization.commandUser["personage2"]][1]);
                        else textureSprite = new PIXI.Sprite(parent.assets.getAsset("heroesTextures")[parent.initialization.commandUser["personage3"]][1]);
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
        },
        
        titleCreate: function()
        {
            var text;
            if(parent.config.side === that.SIDE_JEDI) text = new PIXI.Text("ВЫ ПОБЕДИЛИ!", that.buttonStyleBlueText); 
            if(parent.config.side === that.SIDE_SITH) text = new PIXI.Text("ВЫ ПОБЕДИЛИ!", that.buttonStyleRedText); 
            text.x = 335;
            text.y = 180;
            that.windowStage.addChild(text);
        },
        
        textCreate: function()
        {
            var text;
            if(parent.config.side === that.SIDE_JEDI)
            {
                text = new PIXI.Text("Очки за уровень: " + parent.initialization.userlTotalPointsPlayerLevel, that.styleBlueText); 
                text.x = 355;
                text.y = 225;
                that.windowStage.addChild(text);
                
                text = new PIXI.Text("Получено очков опыта: +1", that.styleBlueText); 
                text.x = 355;
                text.y = 250;
                that.windowStage.addChild(text);
                
                if(that.intercept === false)
                {
                    text = new PIXI.Text("Доступны новые союзники:", that.styleBlueText); 
                    text.x = 355;
                    text.y = 275;
                    that.windowStage.addChild(text);
                    that.contentCreate();
                }else{
                    text = new PIXI.Text("Вы успешно отразили нападение Дарт Вейдера на планету " + parent.initialization.planets[that.planetID].name, that.styleBlueText); 
                    text.x = 325;
                    text.y = 350;
                    that.windowStage.addChild(text);
                }
            }
            if(parent.config.side === that.SIDE_SITH)
            {
                text = new PIXI.Text("Очки за уровень: " + parent.initialization.userlTotalPointsPlayerLevel, that.styleRedText); 
                text.x = 355;
                text.y = 225;
                that.windowStage.addChild(text);
                
                text = new PIXI.Text("Получено очков опыта: +1", that.styleRedText); 
                text.x = 355;
                text.y = 250;
                that.windowStage.addChild(text);
                
                if(that.intercept === false)
                {
                    text = new PIXI.Text("Доступны новые союзники:", that.styleRedText); 
                    text.x = 355;
                    text.y = 275;
                    that.windowStage.addChild(text);
                    that.contentCreate();
                }else{
                    text = new PIXI.Text("Вы успешно помешали Люку Скайуокеру на планету " + parent.initialization.planets[that.planetID].name, that.styleRedText); 
                    text.x = 325;
                    text.y = 350;
                    that.windowStage.addChild(text);
                }
            }
        },
        
        powerPersonage: function(personageID)
        {
            var hitCount = 0;
            hitCount += parent.initialization.personages[personageID].hitDefense1 
                + parent.initialization.personages[personageID].hitDefense2 
                + parent.initialization.personages[personageID].hitDefense3 
                + parent.initialization.personages[personageID].hitDefense4
                + parent.initialization.personages[personageID].hitDefense5;
            hitCount /= 10;
            return hitCount;
        },
        
        contentCreate: function()
        {
            if(parent.config.side === that.SIDE_JEDI)
            {
                var textureSprite = new PIXI.Sprite(parent.assets.getAsset("heroesTextures")[parent.initialization.planets[that.planetID].blueRewardPersonage1][3]);
                textureSprite.position.x = 357;
                textureSprite.position.y = 300;
                that.windowStage.addChild(textureSprite);
                
                var graphics = new PIXI.Graphics();
                graphics.lineStyle(1, 0x0000FF, 1);
                graphics.beginFill(0x00000F, 0.15);
                graphics.drawRoundedRect(355, 300, 280, 75, 5);
                graphics.endFill();
                that.windowStage.addChild(graphics);
                
                var text = new PIXI.Text(parent.assets.getAsset("heroesTextures")[parent.initialization.planets[that.planetID].blueRewardPersonage1][0] + "  [Сила: " + that.powerPersonage(parent.initialization.planets[that.planetID].blueRewardPersonage1) + "]", that.styleBlueText2); 
                text.x = 440;
                text.y = 300;
                that.windowStage.addChild(text);

                if(parent.initialization.personages[parent.initialization.planets[that.planetID].blueRewardPersonage1].status !== parent.initialization.USER_PERSONAGE_AVAILABLE)
                {
                    var button = new PIXI.extras.MovieClip(parent.assets.getAsset("animTexButtonBlue")); 
                    button.name = parent.initialization.planets[that.planetID].blueRewardPersonage1;
                    button.position.x = 435; 
                    button.position.y = 325; 
                    button.interactive = true; 
                    button.buttonMode = true; 
                    button.loop = false; 
                    button.animationSpeed = 0.2;
                    button.onComplete = that.onButtonUpdate;
                    button.tap = that.onButtonClick; 
                    button.click = that.onButtonClick; 
                    button.on('mouseover', that.onButtonOver);
                    button.on('mouseout', that.onButtonOut);
                    var text = new PIXI.Text("Выбрать", that.styleBlueText); 
                    text.x = (button.width / 2) - (text.width / 2);
                    text.y = button.height / 3.2;
                    button.addChild(text); 
                    that.windowStage.addChild(button);
                }
                
                var textureSprite = new PIXI.Sprite(parent.assets.getAsset("heroesTextures")[parent.initialization.planets[that.planetID].blueRewardPersonage2][3]);
                textureSprite.position.x = 357;
                textureSprite.position.y = 385;
                that.windowStage.addChild(textureSprite);
                
                var graphics = new PIXI.Graphics(); 
                graphics.lineStyle(1, 0x0000FF, 1);
                graphics.beginFill(0x00000F, 0.15);
                graphics.drawRoundedRect(355, 385, 280, 75, 5);
                graphics.endFill();
                that.windowStage.addChild(graphics);
                
                var text = new PIXI.Text(parent.assets.getAsset("heroesTextures")[parent.initialization.planets[that.planetID].blueRewardPersonage2][0] + "  [Сила: " + that.powerPersonage(parent.initialization.planets[that.planetID].blueRewardPersonage2) + "]", that.styleBlueText2); 
                text.x = 440;
                text.y = 385;
                that.windowStage.addChild(text);
                
                if(parent.initialization.personages[parent.initialization.planets[that.planetID].blueRewardPersonage2].status !== parent.initialization.USER_PERSONAGE_AVAILABLE)
                {
                    var button = new PIXI.extras.MovieClip(parent.assets.getAsset("animTexButtonBlue")); 
                    button.name = parent.initialization.planets[that.planetID].blueRewardPersonage2;
                    button.position.x = 435; 
                    button.position.y = 410; 
                    button.interactive = true; 
                    button.buttonMode = true; 
                    button.loop = false; 
                    button.animationSpeed = 0.2;
                    button.onComplete = that.onButtonUpdate;
                    button.tap = that.onButtonClick; 
                    button.click = that.onButtonClick; 
                    button.on('mouseover', that.onButtonOver);
                    button.on('mouseout', that.onButtonOut);
                    var text = new PIXI.Text("Выбрать", that.styleBlueText); 
                    text.x = (button.width / 2) - (text.width / 2);
                    text.y = button.height / 3.2;
                    button.addChild(text); 
                    that.windowStage.addChild(button);
                }
                
                var textureSprite = new PIXI.Sprite(parent.assets.getAsset("heroesTextures")[parent.initialization.planets[that.planetID].blueRewardPersonage3][3]);
                textureSprite.position.x = 357;
                textureSprite.position.y = 470;
                that.windowStage.addChild(textureSprite);
                
                var graphics = new PIXI.Graphics(); 
                graphics.lineStyle(1, 0x0000FF, 1);
                graphics.beginFill(0x00000F, 0.15);
                graphics.drawRoundedRect(355, 470, 280, 75, 5);
                graphics.endFill();
                that.windowStage.addChild(graphics);
                
                var text = new PIXI.Text(parent.assets.getAsset("heroesTextures")[parent.initialization.planets[that.planetID].blueRewardPersonage3][0] + "  [Сила: " + that.powerPersonage(parent.initialization.planets[that.planetID].blueRewardPersonage3) + "]", that.styleBlueText2); 
                text.x = 440;
                text.y = 470;
                that.windowStage.addChild(text);
                
                if(parent.initialization.personages[parent.initialization.planets[that.planetID].blueRewardPersonage3].status !== parent.initialization.USER_PERSONAGE_AVAILABLE)
                {
                    var button = new PIXI.extras.MovieClip(parent.assets.getAsset("animTexButtonBlue")); 
                    button.name = parent.initialization.planets[that.planetID].blueRewardPersonage3;
                    button.position.x = 435; 
                    button.position.y = 495; 
                    button.interactive = true; 
                    button.buttonMode = true; 
                    button.loop = false; 
                    button.animationSpeed = 0.2;
                    button.onComplete = that.onButtonUpdate;
                    button.tap = that.onButtonClick; 
                    button.click = that.onButtonClick; 
                    button.on('mouseover', that.onButtonOver);
                    button.on('mouseout', that.onButtonOut);
                    var text = new PIXI.Text("Выбрать", that.styleBlueText); 
                    text.x = (button.width / 2) - (text.width / 2);
                    text.y = button.height / 3.2;
                    button.addChild(text); 
                    that.windowStage.addChild(button);
                }
            }
            if(parent.config.side === that.SIDE_SITH)
            {
                var textureSprite = new PIXI.Sprite(parent.assets.getAsset("heroesTextures")[parent.initialization.planets[that.planetID].redRewardPersonage1][3]);
                textureSprite.position.x = 357;
                textureSprite.position.y = 300;
                that.windowStage.addChild(textureSprite);
                
                var graphics = new PIXI.Graphics();
                graphics.lineStyle(1, 0xFFFF80, 1);
                graphics.beginFill(0xFF0000, 0.15);
                graphics.drawRoundedRect(355, 300, 280, 75, 5);
                graphics.endFill();
                that.windowStage.addChild(graphics);
                
                var text = new PIXI.Text(parent.assets.getAsset("heroesTextures")[parent.initialization.planets[that.planetID].redRewardPersonage1][0] + "  [Сила: " + that.powerPersonage(parent.initialization.planets[that.planetID].redRewardPersonage1) + "]", that.styleRedText2); 
                text.x = 440;
                text.y = 300;
                that.windowStage.addChild(text);
                
                if(parent.initialization.personages[parent.initialization.planets[that.planetID].redRewardPersonage1].status !== parent.initialization.USER_PERSONAGE_AVAILABLE)
                {
                    var button = new PIXI.extras.MovieClip(parent.assets.getAsset("animTexButtonRed")); 
                    button.name = parent.initialization.planets[that.planetID].redRewardPersonage1;
                    button.position.x = 435; 
                    button.position.y = 325; 
                    button.interactive = true; 
                    button.buttonMode = true; 
                    button.loop = false; 
                    button.animationSpeed = 0.2;
                    button.onComplete = that.onButtonUpdate;
                    button.tap = that.onButtonClick; 
                    button.click = that.onButtonClick; 
                    button.on('mouseover', that.onButtonOver);
                    button.on('mouseout', that.onButtonOut);
                    var text = new PIXI.Text("Выбрать", that.styleRedText); 
                    text.x = (button.width / 2) - (text.width / 2);
                    text.y = button.height / 3.2;
                    button.addChild(text); 
                    that.windowStage.addChild(button);
                }
                
                var textureSprite = new PIXI.Sprite(parent.assets.getAsset("heroesTextures")[parent.initialization.planets[that.planetID].redRewardPersonage2][3]);
                textureSprite.position.x = 357;
                textureSprite.position.y = 385;
                that.windowStage.addChild(textureSprite);
                
                var graphics = new PIXI.Graphics(); 
                graphics.lineStyle(1, 0xFFFF80, 1);
                graphics.beginFill(0xFF0000, 0.15);
                graphics.drawRoundedRect(355, 385, 280, 75, 5);
                graphics.endFill();
                that.windowStage.addChild(graphics);
                
                var text = new PIXI.Text(parent.assets.getAsset("heroesTextures")[parent.initialization.planets[that.planetID].redRewardPersonage2][0] + "  [Сила: " + that.powerPersonage(parent.initialization.planets[that.planetID].redRewardPersonage2) + "]", that.styleRedText2); 
                text.x = 440;
                text.y = 385;
                that.windowStage.addChild(text);
                
                if(parent.initialization.personages[parent.initialization.planets[that.planetID].redRewardPersonage2].status !== parent.initialization.USER_PERSONAGE_AVAILABLE)
                {
                    var button = new PIXI.extras.MovieClip(parent.assets.getAsset("animTexButtonRed")); 
                    button.name = parent.initialization.planets[that.planetID].redRewardPersonage2;
                    button.position.x = 435; 
                    button.position.y = 410; 
                    button.interactive = true; 
                    button.buttonMode = true; 
                    button.loop = false; 
                    button.animationSpeed = 0.2;
                    button.onComplete = that.onButtonUpdate;
                    button.tap = that.onButtonClick; 
                    button.click = that.onButtonClick; 
                    button.on('mouseover', that.onButtonOver);
                    button.on('mouseout', that.onButtonOut);
                    var text = new PIXI.Text("Выбрать", that.styleRedText); 
                    text.x = (button.width / 2) - (text.width / 2);
                    text.y = button.height / 3.2;
                    button.addChild(text); 
                    that.windowStage.addChild(button);
                }
                
                var textureSprite = new PIXI.Sprite(parent.assets.getAsset("heroesTextures")[parent.initialization.planets[that.planetID].redRewardPersonage3][3]);
                textureSprite.position.x = 357;
                textureSprite.position.y = 470;
                that.windowStage.addChild(textureSprite);
                
                var graphics = new PIXI.Graphics(); 
                graphics.lineStyle(1, 0xFFFF80, 1);
                graphics.beginFill(0xFF0000, 0.15);
                graphics.drawRoundedRect(355, 470, 280, 75, 5);
                graphics.endFill();
                that.windowStage.addChild(graphics);
                
                var text = new PIXI.Text(parent.assets.getAsset("heroesTextures")[parent.initialization.planets[that.planetID].redRewardPersonage3][0] + "  [Сила: " + that.powerPersonage(parent.initialization.planets[that.planetID].redRewardPersonage3) + "]", that.styleRedText2); 
                text.x = 440;
                text.y = 470;
                that.windowStage.addChild(text);
                
                if(parent.initialization.personages[parent.initialization.planets[that.planetID].redRewardPersonage3].status !== parent.initialization.USER_PERSONAGE_AVAILABLE)
                {
                    var button = new PIXI.extras.MovieClip(parent.assets.getAsset("animTexButtonRed")); 
                    button.name = parent.initialization.planets[that.planetID].redRewardPersonage3;
                    button.position.x = 435; 
                    button.position.y = 495; 
                    button.interactive = true; 
                    button.buttonMode = true; 
                    button.loop = false; 
                    button.animationSpeed = 0.2;
                    button.onComplete = that.onButtonUpdate;
                    button.tap = that.onButtonClick; 
                    button.click = that.onButtonClick; 
                    button.on('mouseover', that.onButtonOver);
                    button.on('mouseout', that.onButtonOut);
                    var text = new PIXI.Text("Выбрать", that.styleRedText); 
                    text.x = (button.width / 2) - (text.width / 2);
                    text.y = button.height / 3.2;
                    button.addChild(text); 
                    that.windowStage.addChild(button);
                }
            }
        },
        
        onButtonOver: function(event)
        {
            this.isOver = true;
            this.gotoAndPlay(1);
        },

        onButtonOut: function(event)
        {
            this.isOver = false;
            this.gotoAndStop(0);
        },

        onButtonUpdate: function(event)
        {
            if(this.isOver)
            {
                this.gotoAndPlay(1);
            }else{
                this.gotoAndStop(0);
            }
        },

        onButtonClick: function(event)
        {
            if(parent.config.side === that.SIDE_JEDI)
            {
                // присваиваем планете статус завоёванной
                parent.initialization.planets[that.planetID].status = parent.initialization.USER_PLANET_QUEST_COMPLETE_JEDI;
                // присваиваем статус выбранный для выбранного союзника
                parent.initialization.personages[this.name].status = parent.initialization.USER_PERSONAGE_AVAILABLE;
                // ИИ победил в своей битве
                if(parent.initialization.aiResultBattle() === true && parent.config.stopAI === false)
                {
                    // ИИ присваиваем планете статус завоёванной
                    parent.initialization.planets[that.aiPlanetID].status = parent.initialization.USER_PLANET_QUEST_COMPLETE_SITH;
                    // Увеличиваем очки опыта ИИ
                    parent.initialization.userExperiencePointsAI++;
                    // обновление команды ИИ распределение очков опыта
                    parent.initialization.aiUpgradeCommand(that.SIDE_SITH, that.aiPlanetID);
                    
                    if(parent.config.side === that.SIDE_JEDI && parent.initialization.planets[that.aiPlanetID].id === "Coruscant") parent.endGameShow("lost");
                    else{
                        if(parent.config.side === that.SIDE_SITH && parent.initialization.planets[that.aiPlanetID].id === "DeathStar") parent.endGameShow("lost");
                        else{

                            // Увеличиваем очки опыта Пользователя
                            parent.initialization.userExperiencePoints++;
                            // ИИ получает разрешение на выполнение действий!
                            parent.config.stopAI = false;
                            parent.victoryClose(); // закрываем окно
                            parent.vkWallPost(that.planetID, that.intercept, parent.initialization.personages[this.name].name);

                        }
                    }
                }
                else
                {
                    // ИИ проиграл!
                    parent.initialization.aiRemovePersonageCommand(that.SIDE_SITH);
                    // Увеличиваем очки опыта Пользователя
                    parent.initialization.userExperiencePoints++;
                    // ИИ получает разрешение на выполнение действий!
                    parent.config.stopAI = false;
                    parent.victoryClose(); // закрываем окно
                    parent.vkWallPost(that.planetID, that.intercept, parent.initialization.personages[this.name].name);
                }
            }
            if(parent.config.side === that.SIDE_SITH)
            {
                // присваиваем планете статус завоёванной
                parent.initialization.planets[that.planetID].status = parent.initialization.USER_PLANET_QUEST_COMPLETE_SITH;
                // присваиваем статус выбранный для выбранного союзника
                parent.initialization.personages[this.name].status = parent.initialization.USER_PERSONAGE_AVAILABLE;
                // ИИ победил в своей битве
                if(parent.initialization.aiResultBattle() === true && parent.config.stopAI === false)
                {
                    // ИИ присваиваем планете статус завоёванной
                    parent.initialization.planets[that.aiPlanetID].status = parent.initialization.USER_PLANET_QUEST_COMPLETE_JEDI;
                    // Увеличиваем очки опыта ИИ
                    parent.initialization.userExperiencePointsAI++;
                    // обновление команды ИИ распределение очков опыта
                    parent.initialization.aiUpgradeCommand(that.SIDE_JEDI, that.aiPlanetID);
                    
                    if(parent.config.side === that.SIDE_JEDI && parent.initialization.planets[that.aiPlanetID].id === "Coruscant") parent.endGameShow("lost");
                    else{
                        if(parent.config.side === that.SIDE_SITH && parent.initialization.planets[that.aiPlanetID].id === "DeathStar") parent.endGameShow("lost");
                        else{

                            // Увеличиваем очки опыта Пользователя
                            parent.initialization.userExperiencePoints++;
                            // ИИ получает разрешение на выполнение действий!
                            parent.config.stopAI = false;
                            parent.victoryClose(); // закрываем окно
                            parent.vkWallPost(that.planetID, that.intercept, parent.initialization.personages[this.name].name);

                        }
                    }
                }
                else
                {
                    // ИИ проиграл!
                    parent.initialization.aiRemovePersonageCommand(that.SIDE_JEDI);
                    // Увеличиваем очки опыта Пользователя
                    parent.initialization.userExperiencePoints++;
                    // ИИ получает разрешение на выполнение действий!
                    parent.config.stopAI = false;
                    parent.victoryClose(); // закрываем окно
                    parent.vkWallPost(that.planetID, that.intercept, parent.initialization.personages[this.name].name);
                }
            }
            
            
            
            
        },
        
        buttonCloseCreate: function()
        {
            if(parent.config.side === that.SIDE_NONE || parent.config.side === that.SIDE_JEDI)
            {
                    var button = new PIXI.extras.MovieClip(parent.assets.getAsset("animTexButtonBlue")); 
                    button.name = "button_close";
                    button.position.x = 450; 
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
            if(parent.config.side === that.SIDE_SITH)
            {
                    var button = new PIXI.extras.MovieClip(parent.assets.getAsset("animTexButtonRed")); 
                    button.name = "button_close";
                    button.position.x = 450; 
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
            // ИИ пропускает ход!
            parent.config.stopAI = true;    
            // Увеличиваем очки опыта Пользователя
            parent.initialization.userExperiencePoints++;
            parent.victoryClose(); // закрываем окно
            parent.vkWallPost(that.planetID, that.intercept, null);
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

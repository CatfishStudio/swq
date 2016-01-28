
/* == START FILE ========================================================= */

var Level = function(parent)
{
	var that = {
		levelStage: null,
		levelPlanetID: null,
		levelStarsSprite: null,
		levelPlanetSprite: null,
		levelLandscapeSprite: null,
		
		levelStatus: null,
		LEVEL_STATUS_BATTLE: "that.LEVEL_STATUS_BATTLE",
		LEVEL_STATUS_END_BATTLE_WIN_USER: "that.LEVEL_STATUS_END_BATTLE_WIN_USER",
		LEVEL_STATUS_END_BATTLE_WIN_AI: "that.LEVEL_STATUS_END_BATTLE_WIN_AI",
		
		SIDE_NONE: "side_none",
		SIDE_JEDI: "side_jedi",
		SIDE_SITH: "side_sith",

		levelStyleButtonBlueText: { font : 'bold 18px Arial', fill : '#FFFFFF', stroke : '#0090F0', strokeThickness : 1, wordWrap : true, wordWrapWidth : 200 },
		levelStyleButtonRedText: { font : 'bold 18px Arial', fill : '#FFFFFF', stroke : '#880000', strokeThickness : 1, wordWrap : true, wordWrapWidth : 200 }, 
		levelStyleDroidBlueText: { font : 'bold 14px Arial', fill : '#C4DEFB', stroke : '#0090F0', strokeThickness : 1, wordWrap : true, wordWrapWidth : 270 },
		levelStyleDroidRedText: { font : 'bold 14px Arial', fill : '#EDCDCB', stroke : '#880000', strokeThickness : 1, wordWrap : true, wordWrapWidth : 270 }, 
		levelStyleButtonsBlueText: { font : 'bold 14px Arial', fill : '#FFFFFF', stroke : '#0090F0', strokeThickness : 1, wordWrap : true, wordWrapWidth : 200 },
		levelStyleButtonsRedText: { font : 'bold 14px Arial', fill : '#FFFFFF', stroke : '#880000', strokeThickness : 1, wordWrap : true, wordWrapWidth : 200 }, 

		levelIntercept: false,
		levelCommandUser: [],  // команда пользователя (parent.initialization.commandUser)
		levelCommandAI: [],    // команда ИИ (parent.initialization.commandAI)
		levelIndexUser: 0,     // индекс персонажа в команде пользователя
		levelIndexAI: 0,       // индекс персонажа в команде ИИ
		levelBorderPersonageUser: null,
		levelBorderPersonageAI: null,
		levelPersonageUserSprite: null,
		levelPersonageAISprite: null,
		levelUserHit1Text: null,
		levelUserHit2Text: null,
		levelUserHit3Text: null,
		levelUserHit4Text: null,
		levelUserHit5Text: null,
		levelUserLifeText: null,
		levelUserHit1: null,
		levelUserHit2: null,
		levelUserHit3: null,
		levelUserHit4: null,
		levelUserHit5: null,
		levelUserLife: null,
		levelAIHit1Text: null,
		levelAIHit2Text: null,
		levelAIHit3Text: null,
		levelAIHit4Text: null,
		levelAIHit5Text: null,
		levelAILifeText: null,
		levelAIHit1: null,
		levelAIHit2: null,
		levelAIHit3: null,
		levelAIHit4: null,
		levelAIHit5: null,
		levelAILife: null,

		levelLineUserAnimationGraphics: null,
		levelLineAIAnimationGraphics: null,
		levelMessageLineGraphics: null,
		
		levelCreate: function(planetID, intercept)
		{
                        parent.initialization.userlTotalPointsPlayerLevel = 0;
                        parent.initialization.userTotalBattle++;
                        
			that.levelStage = new PIXI.Container();
			
			that.levelIntercept = intercept;
			that.levelPlanetID = planetID;
			that.levelStatus = that.LEVEL_STATUS_BATTLE;
			that.levelCommandUser = [];
			that.levelCommandAI = [];
			that.levelIndexUser = 0;
			that.levelIndexAI = 0;
			
			that.levelInitCommands(intercept);
			
			that.levelBackground();
			//parent.timerShow();
			if(parent.config.side === that.SIDE_JEDI)
			{
				that.levelBorderBlue();
				that.levelDesktopBlue();
				that.levelDroidBlue();
			}
			if(parent.config.side === that.SIDE_SITH)
			{
				that.levelBorderRed();
				that.levelDesktopRed();
				that.levelDroidRed();
			}
			that.levelBattons();
			that.levelShowCommandUser();
			that.levelShowCommandAI();
			//that.levelFieldCreate();
		},
		
		levelInitCommands: function(intercept)
		{
			if(intercept === true)
			{
				that.levelCommandUser = [];
				for(var key in parent.initialization.commandUser)
				{
					if(parent.initialization.commandUser[key] !== null)
					{
						var life = (parent.initialization.personages[parent.initialization.commandUser[key]].hitDefense1 + parent.initialization.personages[parent.initialization.commandUser[key]].hitDefense2 + parent.initialization.personages[parent.initialization.commandUser[key]].hitDefense3 + parent.initialization.personages[parent.initialization.commandUser[key]].hitDefense4 + parent.initialization.personages[parent.initialization.commandUser[key]].hitDefense5) / 10 * 50;
						parent.initialization.personages[parent.initialization.commandUser[key]].life = Math.round(life);
						that.levelCommandUser.push(parent.initialization.personages[parent.initialization.commandUser[key]]);
					}
				}
				that.levelUserHit1 = that.levelCommandUser[that.levelIndexUser].hitDefense1;
				that.levelUserHit2 = that.levelCommandUser[that.levelIndexUser].hitDefense2;
				that.levelUserHit3 = that.levelCommandUser[that.levelIndexUser].hitDefense3;
				that.levelUserHit4 = that.levelCommandUser[that.levelIndexUser].hitDefense4;
				that.levelUserHit5 = that.levelCommandUser[that.levelIndexUser].hitDefense5;
				that.levelUserLife = that.levelCommandUser[that.levelIndexUser].life;

				that.levelCommandAI = [];
				for(var key in parent.initialization.commandAI)
				{
					if(parent.initialization.commandAI[key] !== null)
					{
						var life = (parent.initialization.personages[parent.initialization.commandAI[key]].hitDefense1 + parent.initialization.personages[parent.initialization.commandAI[key]].hitDefense2 + parent.initialization.personages[parent.initialization.commandAI[key]].hitDefense3 + parent.initialization.personages[parent.initialization.commandAI[key]].hitDefense4 + parent.initialization.personages[parent.initialization.commandAI[key]].hitDefense5) / 10 * 50;
						parent.initialization.personages[parent.initialization.commandAI[key]].life = Math.round(life);
						that.levelCommandAI.push(parent.initialization.personages[parent.initialization.commandAI[key]]);
					}
				}
				
				that.levelAIHit1 = that.levelCommandAI[that.levelIndexAI].hitDefense1;
				that.levelAIHit2 = that.levelCommandAI[that.levelIndexAI].hitDefense2;
				that.levelAIHit3 = that.levelCommandAI[that.levelIndexAI].hitDefense3;
				that.levelAIHit4 = that.levelCommandAI[that.levelIndexAI].hitDefense4;
				that.levelAIHit5 = that.levelCommandAI[that.levelIndexAI].hitDefense5;
				that.levelAILife = that.levelCommandAI[that.levelIndexAI].life;
				
			}else{
				that.levelCommandUser = [];
				for(var key in parent.initialization.commandUser)
				{
					if(parent.initialization.commandUser[key] !== null)
					{
						var life = (parent.initialization.personages[parent.initialization.commandUser[key]].hitDefense1 + parent.initialization.personages[parent.initialization.commandUser[key]].hitDefense2 + parent.initialization.personages[parent.initialization.commandUser[key]].hitDefense3 + parent.initialization.personages[parent.initialization.commandUser[key]].hitDefense4 + parent.initialization.personages[parent.initialization.commandUser[key]].hitDefense5) / 10 * 50;
						parent.initialization.personages[parent.initialization.commandUser[key]].life = Math.round(life);
						that.levelCommandUser.push(parent.initialization.personages[parent.initialization.commandUser[key]]);
					}
				}
				that.levelUserHit1 = that.levelCommandUser[that.levelIndexUser].hitDefense1;
				that.levelUserHit2 = that.levelCommandUser[that.levelIndexUser].hitDefense2;
				that.levelUserHit3 = that.levelCommandUser[that.levelIndexUser].hitDefense3;
				that.levelUserHit4 = that.levelCommandUser[that.levelIndexUser].hitDefense4;
				that.levelUserHit5 = that.levelCommandUser[that.levelIndexUser].hitDefense5;
				that.levelUserLife = that.levelCommandUser[that.levelIndexUser].life;
				
				if(parent.config.side === that.SIDE_JEDI)
				{
					that.levelCommandAI = [];
					var life = (parent.initialization.personages[parent.initialization.planets[that.levelPlanetID].redPersonage1].hitAttack1 + parent.initialization.personages[parent.initialization.planets[that.levelPlanetID].redPersonage1].hitAttack2 + parent.initialization.personages[parent.initialization.planets[that.levelPlanetID].redPersonage1].hitAttack3 + parent.initialization.personages[parent.initialization.planets[that.levelPlanetID].redPersonage1].hitAttack4 + parent.initialization.personages[parent.initialization.planets[that.levelPlanetID].redPersonage1].hitAttack5) / 10 * 50;
					parent.initialization.personages[parent.initialization.planets[that.levelPlanetID].redPersonage1].life = Math.round(life);
					that.levelCommandAI.push(parent.initialization.personages[parent.initialization.planets[that.levelPlanetID].redPersonage1]);
					
					life = (parent.initialization.personages[parent.initialization.planets[that.levelPlanetID].redPersonage2].hitAttack1 + parent.initialization.personages[parent.initialization.planets[that.levelPlanetID].redPersonage2].hitAttack2 + parent.initialization.personages[parent.initialization.planets[that.levelPlanetID].redPersonage2].hitAttack3 + parent.initialization.personages[parent.initialization.planets[that.levelPlanetID].redPersonage2].hitAttack4 + parent.initialization.personages[parent.initialization.planets[that.levelPlanetID].redPersonage2].hitAttack5) / 10 * 50;
					parent.initialization.personages[parent.initialization.planets[that.levelPlanetID].redPersonage2].life = Math.round(life);
					that.levelCommandAI.push(parent.initialization.personages[parent.initialization.planets[that.levelPlanetID].redPersonage2]);
					
					life = (parent.initialization.personages[parent.initialization.planets[that.levelPlanetID].redPersonage3].hitAttack1 + parent.initialization.personages[parent.initialization.planets[that.levelPlanetID].redPersonage3].hitAttack2 + parent.initialization.personages[parent.initialization.planets[that.levelPlanetID].redPersonage3].hitAttack3 + parent.initialization.personages[parent.initialization.planets[that.levelPlanetID].redPersonage3].hitAttack4 + parent.initialization.personages[parent.initialization.planets[that.levelPlanetID].redPersonage3].hitAttack5) / 10 * 50;
					parent.initialization.personages[parent.initialization.planets[that.levelPlanetID].redPersonage3].life = Math.round(life);
					that.levelCommandAI.push(parent.initialization.personages[parent.initialization.planets[that.levelPlanetID].redPersonage3]);
				}
				if(parent.config.side === that.SIDE_SITH)
				{
					that.levelCommandAI = [];
					var life = (parent.initialization.personages[parent.initialization.planets[that.levelPlanetID].bluePersonage1].hitAttack1 + parent.initialization.personages[parent.initialization.planets[that.levelPlanetID].bluePersonage1].hitAttack2 + parent.initialization.personages[parent.initialization.planets[that.levelPlanetID].bluePersonage1].hitAttack3 + parent.initialization.personages[parent.initialization.planets[that.levelPlanetID].bluePersonage1].hitAttack4 + parent.initialization.personages[parent.initialization.planets[that.levelPlanetID].bluePersonage1].hitAttack5) / 10 * 50;
					parent.initialization.personages[parent.initialization.planets[that.levelPlanetID].bluePersonage1].life = Math.round(life);
					that.levelCommandAI.push(parent.initialization.personages[parent.initialization.planets[that.levelPlanetID].bluePersonage1]);
					
					life = (parent.initialization.personages[parent.initialization.planets[that.levelPlanetID].bluePersonage2].hitAttack1 + parent.initialization.personages[parent.initialization.planets[that.levelPlanetID].bluePersonage2].hitAttack2 + parent.initialization.personages[parent.initialization.planets[that.levelPlanetID].bluePersonage2].hitAttack3 + parent.initialization.personages[parent.initialization.planets[that.levelPlanetID].bluePersonage2].hitAttack4 + parent.initialization.personages[parent.initialization.planets[that.levelPlanetID].bluePersonage2].hitAttack5) / 10 * 50;
					parent.initialization.personages[parent.initialization.planets[that.levelPlanetID].bluePersonage2].life = Math.round(life);
					that.levelCommandAI.push(parent.initialization.personages[parent.initialization.planets[that.levelPlanetID].bluePersonage2]);
					
					life = (parent.initialization.personages[parent.initialization.planets[that.levelPlanetID].bluePersonage3].hitAttack1 + parent.initialization.personages[parent.initialization.planets[that.levelPlanetID].bluePersonage3].hitAttack2 + parent.initialization.personages[parent.initialization.planets[that.levelPlanetID].bluePersonage3].hitAttack3 + parent.initialization.personages[parent.initialization.planets[that.levelPlanetID].bluePersonage3].hitAttack4 + parent.initialization.personages[parent.initialization.planets[that.levelPlanetID].bluePersonage3].hitAttack5) / 10 * 50;
					parent.initialization.personages[parent.initialization.planets[that.levelPlanetID].bluePersonage3].life = Math.round(life);
					that.levelCommandAI.push(parent.initialization.personages[parent.initialization.planets[that.levelPlanetID].bluePersonage3]);
				}
				
				that.levelAIHit1 = that.levelCommandAI[that.levelIndexAI].hitAttack1;
				that.levelAIHit2 = that.levelCommandAI[that.levelIndexAI].hitAttack2;
				that.levelAIHit3 = that.levelCommandAI[that.levelIndexAI].hitAttack3;
				that.levelAIHit4 = that.levelCommandAI[that.levelIndexAI].hitAttack4;
				that.levelAIHit5 = that.levelCommandAI[that.levelIndexAI].hitAttack5;
				that.levelAILife = that.levelCommandAI[that.levelIndexAI].life;
			}
		},
		
		levelBackground: function(planetID)
		{
			that.levelStarsSprite = new PIXI.Sprite(parent.assets.getAsset("stars1Texture")); 
			that.levelStarsSprite.position.x = 0; 
			that.levelStarsSprite.position.y = 0; 
			that.levelStage.addChild(that.levelStarsSprite);
			  
			that.levelPlanetSprite = new PIXI.Sprite(parent.assets.getAsset("planetTextures")[that.levelPlanetID][1]); 
			that.levelPlanetSprite.position.x = 300; 
			that.levelPlanetSprite.position.y = 100;
			that.levelStage.addChild(that.levelPlanetSprite);
			
			that.levelLandscapeSprite = new PIXI.Sprite(parent.assets.getAsset("planetTextures")[that.levelPlanetID][2]);
			that.levelLandscapeSprite.position.x = 0; 
			that.levelLandscapeSprite.position.y = 0; 
			that.levelLandscapeSprite.alpha = 0.0;
			that.levelStage.addChild(that.levelLandscapeSprite);
		},
		
		levelBorderBlue: function()
		{
			var graphics = new PIXI.Graphics(); 

			graphics.lineStyle(2, 0x0000FF, 1);
			graphics.beginFill(0x000000, 0);
			graphics.drawRect(10, 10, 840, 710);
			graphics.endFill();
			
			graphics.lineStyle(0);
			graphics.beginFill(0xFFFFFF, 1);
			graphics.drawCircle(170, 562,4);
			graphics.endFill();

			graphics.lineStyle(2, 0xFFFFFF, 1);
			graphics.moveTo(170, 562);
			graphics.lineTo(5, 562);
			graphics.moveTo(5, 562);
			graphics.lineTo(5, 725);
			graphics.moveTo(5, 725);
			graphics.lineTo(470, 725);
			graphics.moveTo(470, 725);
			graphics.lineTo(490, 710);
			graphics.moveTo(490, 710);
			graphics.lineTo(840, 710);

			graphics.lineStyle(0);
			graphics.beginFill(0xFFFFFF, 1);
			graphics.drawCircle(840, 710,4);
			graphics.endFill();

			graphics.lineStyle(0);
			graphics.beginFill(0xFFFFFF, 1);
			graphics.drawCircle(20, 20,4);
			graphics.endFill();

			graphics.lineStyle(2, 0xFFFFFF, 1);
			graphics.moveTo(20,20);
			graphics.lineTo(370, 20);
			graphics.moveTo(370, 20);
			graphics.lineTo(390, 5);
			graphics.moveTo(390,5);
			graphics.lineTo(855, 5);
			graphics.moveTo(855,5);
			graphics.lineTo(855, 170);
			graphics.moveTo(855, 170);
			graphics.lineTo(690, 170);

			graphics.lineStyle(0);
			graphics.beginFill(0xFFFFFF, 1);
			graphics.drawCircle(690, 170,4);
			graphics.endFill();

			graphics.lineStyle(2, 0xFFFFFF, 1);
			graphics.beginFill(0x0000FF, 0.0);
			graphics.drawRoundedRect(((parent.config.MAIN_WIDTH / 2) - (500 / 2)), ((parent.config.MAIN_HEIGH / 2) - (500 / 2)), 500, 500, 25);
			graphics.endFill();
			
			that.levelStage.addChild(graphics);
		},
		
		levelBorderRed: function()
		{
			var graphics = new PIXI.Graphics(); 

			graphics.lineStyle(2, 0xFF0000, 1);
			graphics.beginFill(0x000000, 0);
			graphics.drawRect(10, 10, 840, 710);
			graphics.endFill();
			
			graphics.lineStyle(0);
			graphics.beginFill(0xFFFF80, 1);
			graphics.drawCircle(170, 562, 4);
			graphics.endFill();

			graphics.lineStyle(2, 0xFFFF80, 1);
			graphics.moveTo(170, 562);
			graphics.lineTo(5, 562);
			graphics.moveTo(5, 562);
			graphics.lineTo(5, 725);
			graphics.moveTo(5, 725);
			graphics.lineTo(470, 725);
			graphics.moveTo(470, 725);
			graphics.lineTo(490, 710);
			graphics.moveTo(490, 710);
			graphics.lineTo(840, 710);

			graphics.lineStyle(0);
			graphics.beginFill(0xFFFF80, 1);
			graphics.drawCircle(840, 710,4);
			graphics.endFill();

			graphics.lineStyle(0);
			graphics.beginFill(0xFFFF80, 1);
			graphics.drawCircle(20, 20,4);
			graphics.endFill();

			graphics.lineStyle(2, 0xFFFF80, 1);
			graphics.moveTo(20,20);
			graphics.lineTo(370, 20);
			graphics.moveTo(370, 20);
			graphics.lineTo(390, 5);
			graphics.moveTo(390,5);
			graphics.lineTo(855, 5);
			graphics.moveTo(855,5);
			graphics.lineTo(855, 170);
			graphics.moveTo(855, 170);
			graphics.lineTo(690, 170);

			graphics.lineStyle(0);
			graphics.beginFill(0xFFFF80, 1);
			graphics.drawCircle(690, 170,4);
			graphics.endFill();

			graphics.lineStyle(2, 0xFFFF80, 1);
			graphics.beginFill(0xFF0000, 0.0);
			graphics.drawRoundedRect(((parent.config.MAIN_WIDTH / 2) - (500 / 2)), ((parent.config.MAIN_HEIGH / 2) - (500 / 2)), 500, 500, 25);
			graphics.endFill();
			
			that.levelStage.addChild(graphics);
		},
		
		levelDesktopBlue: function()
		{
			var graphics = new PIXI.Graphics(); 
			graphics.lineStyle(2, 0x0000FF, 1);
			graphics.beginFill(0x0080FF, 0.2);
			graphics.moveTo(25, 22);
			graphics.lineTo(370, 22);
			graphics.lineTo(370, 110);
			graphics.lineTo(25, 110);
			graphics.endFill();
			that.levelStage.addChild(graphics);
			
			graphics = new PIXI.Graphics(); 
			graphics.lineStyle(2, 0x800000, 1);
			graphics.beginFill(0x800000, 0.2);
			graphics.moveTo(490, 620);
			graphics.lineTo(835, 620);
			graphics.lineTo(835, 708);
			graphics.lineTo(490, 708);
			graphics.endFill();
			that.levelStage.addChild(graphics);
		},
		
		levelDesktopRed: function()
		{
			var graphics = new PIXI.Graphics(); 
			graphics.lineStyle(2, 0x800000, 1);
			graphics.beginFill(0x800000, 0.2);
			graphics.moveTo(25, 22);
			graphics.lineTo(370, 22);
			graphics.lineTo(370, 110);
			graphics.lineTo(25, 110);
			graphics.endFill();
			that.levelStage.addChild(graphics);
			
			graphics = new PIXI.Graphics(); 
			graphics.lineStyle(2, 0x0000FF, 1);
			graphics.beginFill(0x0080FF, 0.2);
			graphics.moveTo(490, 620);
			graphics.lineTo(835, 620);
			graphics.lineTo(835, 708);
			graphics.lineTo(490, 708);
			graphics.endFill();
			that.levelStage.addChild(graphics);
		},
		
		levelShowCommandUser: function()
		{
			/* персонажи */
			for(var i in that.levelCommandUser)
			{
				var textureSprite = new PIXI.Sprite(parent.assets.getAsset("heroesTextures")[that.levelCommandUser[i].id][3]); 
				textureSprite.position.x = 55 + (105 * i); 
				textureSprite.position.y = 30; 
				that.levelStage.addChild(textureSprite);
				
				var graphics = new PIXI.Graphics();
				if(parent.config.side === that.SIDE_JEDI) graphics.lineStyle(2, 0x0000FF, 0.2);
				if(parent.config.side === that.SIDE_SITH) graphics.lineStyle(2, 0xFF0000, 0.2);
				graphics.drawRect(55 + (105 * i), 30, 75, 75);
				
				for(var j = 0; j < 25; j++)
				{
					if(parent.config.side === that.SIDE_JEDI) graphics.lineStyle(1, 0x0000FF, 0.2);
					if(parent.config.side === that.SIDE_SITH) graphics.lineStyle(1, 0xFF0000, 0.2);
					graphics.moveTo(55 + (105 * i), 30 +(3*j));
					graphics.lineTo(55 + (105 * i) + 75, 30 +(3*j));
					
				}
				that.levelStage.addChild(graphics);
			}
			
			/* рамка */
			that.levelBorderPersonageUser = new PIXI.Graphics();
			if(parent.config.side === that.SIDE_JEDI) that.levelBorderPersonageUser.lineStyle(2, 0xFFFFFF, 1);
			if(parent.config.side === that.SIDE_SITH) that.levelBorderPersonageUser.lineStyle(2, 0xFFFF80, 1);
			that.levelBorderPersonageUser.drawRect(55, 30, 75, 75);
			that.levelStage.addChild(that.levelBorderPersonageUser);
			
			/* дисплей фон */
			var graphics = new PIXI.Graphics(); 
			if(parent.config.side === that.SIDE_JEDI)
			{
				graphics.lineStyle(2, 0x0000FF, 1);
				graphics.beginFill(0x0080FF, 0.2);
			}
			if(parent.config.side === that.SIDE_SITH)
			{
				graphics.lineStyle(2, 0x800000, 1);
				graphics.beginFill(0x800000, 0.2);
			}
			graphics.moveTo(25, 115);
			graphics.lineTo(170, 115);
			graphics.lineTo(170, 400);
			graphics.lineTo(25, 400);
			graphics.endFill();
			that.levelStage.addChild(graphics);
			
			/* персонаж во весь рост */
			that.levelPersonageUserSprite = new PIXI.Sprite(parent.assets.getAsset("heroesTextures")[that.levelCommandUser[that.levelIndexUser].id][1]); 
			that.levelPersonageUserSprite.position.x = 30; 
			that.levelPersonageUserSprite.position.y = 140; 
			that.levelPersonageUserSprite.scale.set(0.5);
			that.levelStage.addChild(that.levelPersonageUserSprite);
			
			/* фон полоски */
			graphics = new PIXI.Graphics();
			for(var i = 0; i < 95; i++)
			{
				if(parent.config.side === that.SIDE_JEDI) graphics.lineStyle(1, 0x0000FF, 0.5);
				if(parent.config.side === that.SIDE_SITH) graphics.lineStyle(1, 0x800000, 0.5);
				graphics.moveTo(25, 115+(3*i));
				graphics.lineTo(170, 115+(3*i));
			}
			that.levelStage.addChild(graphics);
			
			/* бегущая полоска */
			that.levelLineUserAnimationGraphics = new PIXI.Graphics(); 
			if(parent.config.side === that.SIDE_JEDI) that.levelLineUserAnimationGraphics.lineStyle(10, 0x0000FF, 0.3);
			if(parent.config.side === that.SIDE_SITH) that.levelLineUserAnimationGraphics.lineStyle(10, 0x800000, 0.3);
			that.levelLineUserAnimationGraphics.moveTo(25, 120);
			that.levelLineUserAnimationGraphics.lineTo(170, 120);
			that.levelStage.addChild(that.levelLineUserAnimationGraphics);
			
			/* харктеристики */
			graphics = new PIXI.Graphics(); 
			if(parent.config.side === that.SIDE_JEDI)
			{
				graphics.lineStyle(2, 0x0000FF, 1);
				graphics.beginFill(0x0080FF, 0.2);
			}
			if(parent.config.side === that.SIDE_SITH)
			{
				graphics.lineStyle(2, 0x800000, 1);
				graphics.beginFill(0x800000, 0.2);
			}
			graphics.moveTo(25, 405);
			graphics.lineTo(170, 405);
			graphics.lineTo(170, 520);
			graphics.lineTo(25, 520);
			graphics.endFill();
			that.levelStage.addChild(graphics);
			
			var sprite = new PIXI.Sprite(parent.assets.getAsset("hit1Texture"));
			sprite.position.x = 30; sprite.position.y = 410; sprite.scale.set(0.3);
			that.levelStage.addChild(sprite);
			if(parent.config.side === that.SIDE_JEDI) that.levelUserHit1Text = new PIXI.Text("- " + that.levelUserHit1, that.levelStyleButtonBlueText);
			if(parent.config.side === that.SIDE_SITH) that.levelUserHit1Text = new PIXI.Text("- " + that.levelUserHit1, that.levelStyleButtonRedText);
			that.levelUserHit1Text.x = 55; that.levelUserHit1Text.y = 410;
			that.levelStage.addChild(that.levelUserHit1Text);
			
			sprite = new PIXI.Sprite(parent.assets.getAsset("hit2Texture"));
			sprite.position.x = 100; sprite.position.y = 410; sprite.scale.set(0.3);
			that.levelStage.addChild(sprite);
			if(parent.config.side === that.SIDE_JEDI) that.levelUserHit2Text = new PIXI.Text("- " + that.levelUserHit2, that.levelStyleButtonBlueText);
			if(parent.config.side === that.SIDE_SITH) that.levelUserHit2Text = new PIXI.Text("- " + that.levelUserHit2, that.levelStyleButtonRedText); 
			that.levelUserHit2Text.x = 125; that.levelUserHit2Text.y = 410;
			that.levelStage.addChild(that.levelUserHit2Text);
			
			sprite = new PIXI.Sprite(parent.assets.getAsset("hit3Texture"));
			sprite.position.x = 30; sprite.position.y = 450; sprite.scale.set(0.3);
			that.levelStage.addChild(sprite);
			if(parent.config.side === that.SIDE_JEDI) that.levelUserHit3Text = new PIXI.Text("+ " + that.levelUserHit3, that.levelStyleButtonBlueText);
			if(parent.config.side === that.SIDE_SITH) that.levelUserHit3Text = new PIXI.Text("+ " + that.levelUserHit3, that.levelStyleButtonRedText); 
			that.levelUserHit3Text.x = 55; that.levelUserHit3Text.y = 450;
			that.levelStage.addChild(that.levelUserHit3Text);
			
			sprite = new PIXI.Sprite(parent.assets.getAsset("hit4Texture"));
			sprite.position.x = 100; sprite.position.y = 450; sprite.scale.set(0.3);
			that.levelStage.addChild(sprite);
			if(parent.config.side === that.SIDE_JEDI) that.levelUserHit4Text = new PIXI.Text("- " + that.levelUserHit4, that.levelStyleButtonBlueText);
			if(parent.config.side === that.SIDE_SITH) that.levelUserHit4Text = new PIXI.Text("- " + that.levelUserHit4, that.levelStyleButtonRedText);
			that.levelUserHit4Text.x = 125; that.levelUserHit4Text.y = 450;
			that.levelStage.addChild(that.levelUserHit4Text);
			
			sprite = new PIXI.Sprite(parent.assets.getAsset("hit5Texture"));
			sprite.position.x = 30; sprite.position.y = 490; sprite.scale.set(0.3);
			that.levelStage.addChild(sprite);
			if(parent.config.side === that.SIDE_JEDI) that.levelUserHit5Text = new PIXI.Text("- " + that.levelUserHit5, that.levelStyleButtonBlueText);
			if(parent.config.side === that.SIDE_SITH) that.levelUserHit5Text = new PIXI.Text("- " + that.levelUserHit5, that.levelStyleButtonRedText); 
			that.levelUserHit5Text.x = 55; that.levelUserHit5Text.y = 490;
			that.levelStage.addChild(that.levelUserHit5Text);
			
			graphics = new PIXI.Graphics(); 
			if(parent.config.side === that.SIDE_JEDI)
			{
				graphics.lineStyle(2, 0x0000FF, 1);
				graphics.beginFill(0x0080FF, 0.2);
			}
			if(parent.config.side === that.SIDE_SITH)
			{
				graphics.lineStyle(2, 0x800000, 1);
				graphics.beginFill(0x800000, 0.2);
			}
			graphics.moveTo(25, 525);
			graphics.lineTo(170, 525);
			graphics.lineTo(170, 555);
			graphics.lineTo(25, 555);
			graphics.endFill();
			that.levelStage.addChild(graphics);
			
			if(parent.config.side === that.SIDE_JEDI) that.levelUserLifeText = new PIXI.Text("Здоровье: " + that.levelUserLife, that.levelStyleButtonBlueText); 
			if(parent.config.side === that.SIDE_SITH) that.levelUserLifeText = new PIXI.Text("Здоровье: " + that.levelUserLife, that.levelStyleButtonRedText); 
			that.levelUserLifeText.x = 27; that.levelUserLifeText.y = 530;
			that.levelStage.addChild(that.levelUserLifeText);
		},
		
		levelShowCommandAI: function()
		{
			/* персонажи */
			for(var i in that.levelCommandAI)
			{
				var textureSprite = new PIXI.Sprite(parent.assets.getAsset("heroesTextures")[that.levelCommandAI[i].id][3]); 
				textureSprite.position.x = 520 + (105 * i); 
				textureSprite.position.y = 628; 
				that.levelStage.addChild(textureSprite);
				
				var graphics = new PIXI.Graphics();
				if(parent.config.side === that.SIDE_JEDI) graphics.lineStyle(2, 0xFF0000, 0.2);
				if(parent.config.side === that.SIDE_SITH) graphics.lineStyle(2, 0x0000FF, 0.2);
				graphics.drawRect(520 + (105 * i), 628, 75, 75);
				
				for(var j = 0; j < 25; j++)
				{
					if(parent.config.side === that.SIDE_JEDI) graphics.lineStyle(1, 0xFF0000, 0.2);
					if(parent.config.side === that.SIDE_SITH) graphics.lineStyle(1, 0x0000FF, 0.2);
					graphics.moveTo(520 + (105 * i), 628 +(3*j));
					graphics.lineTo(520 + (105 * i) + 75, 628 +(3*j));
				}
				that.levelStage.addChild(graphics);
			}
			
			/* рамка */
			that.levelBorderPersonageAI = new PIXI.Graphics();
			if(parent.config.side === that.SIDE_JEDI) that.levelBorderPersonageAI.lineStyle(2, 0xFFFF80, 1);
			if(parent.config.side === that.SIDE_SITH) that.levelBorderPersonageAI.lineStyle(2, 0xFFFFFF, 1);
			that.levelBorderPersonageAI.drawRect(520, 628, 75, 75);
			that.levelStage.addChild(that.levelBorderPersonageAI);
			
			/* дисплей фон */
			var graphics = new PIXI.Graphics(); 
			if(parent.config.side === that.SIDE_SITH)
			{
				graphics.lineStyle(2, 0x0000FF, 1);
				graphics.beginFill(0x0080FF, 0.2);
			}
			if(parent.config.side === that.SIDE_JEDI)
			{
				graphics.lineStyle(2, 0x800000, 1);
				graphics.beginFill(0x800000, 0.2);
			}
			graphics.moveTo(690, 330);
			graphics.lineTo(835, 330);
			graphics.lineTo(835, 615);
			graphics.lineTo(690, 615);
			graphics.endFill();
			that.levelStage.addChild(graphics);
			
			/* персонаж во весь рост */
			that.levelPersonageAISprite = new PIXI.Sprite(parent.assets.getAsset("heroesTextures")[that.levelCommandAI[that.levelIndexAI].id][2]); 
			that.levelPersonageAISprite.position.x = 695; 
			that.levelPersonageAISprite.position.y = 350; 
			that.levelPersonageAISprite.scale.set(0.5);
			that.levelStage.addChild(that.levelPersonageAISprite);
			
			/* фон полоски */
			graphics = new PIXI.Graphics();
			for(var i = 0; i < 95; i++)
			{
				if(parent.config.side === that.SIDE_SITH) graphics.lineStyle(1, 0x0000FF, 0.5);
				if(parent.config.side === that.SIDE_JEDI) graphics.lineStyle(1, 0x800000, 0.5);
				graphics.moveTo(690, 330+(3*i));
				graphics.lineTo(835, 330+(3*i));
			}
			that.levelStage.addChild(graphics);
			
			/* бегущая полоска */
			that.levelLineAIAnimationGraphics = new PIXI.Graphics(); 
			if(parent.config.side === that.SIDE_SITH) that.levelLineAIAnimationGraphics.lineStyle(10, 0x0000FF, 0.3);
			if(parent.config.side === that.SIDE_JEDI) that.levelLineAIAnimationGraphics.lineStyle(10, 0x800000, 0.3);
			that.levelLineAIAnimationGraphics.moveTo(690, 335);
			that.levelLineAIAnimationGraphics.lineTo(835, 335);
			that.levelStage.addChild(that.levelLineAIAnimationGraphics);
						
			/* харктеристики */
			graphics = new PIXI.Graphics(); 
			if(parent.config.side === that.SIDE_SITH)
			{
				graphics.lineStyle(2, 0x0000FF, 1);
				graphics.beginFill(0x0080FF, 0.2);
			}
			if(parent.config.side === that.SIDE_JEDI)
			{
				graphics.lineStyle(2, 0x800000, 1);
				graphics.beginFill(0x800000, 0.2);
			}
			graphics.moveTo(690, 325);
			graphics.lineTo(835, 325);
			graphics.lineTo(835, 210);
			graphics.lineTo(690, 210);
			graphics.endFill();
			that.levelStage.addChild(graphics);
			
			var sprite = new PIXI.Sprite(parent.assets.getAsset("hit1Texture"));
			sprite.position.x = 695; sprite.position.y = 215; sprite.scale.set(0.3);
			that.levelStage.addChild(sprite);
			if(parent.config.side === that.SIDE_SITH) that.levelAIHit1Text = new PIXI.Text("- " + that.levelAIHit1, that.levelStyleButtonBlueText);
			if(parent.config.side === that.SIDE_JEDI) that.levelAIHit1Text = new PIXI.Text("- " + that.levelAIHit1, that.levelStyleButtonRedText); 
			that.levelAIHit1Text.x = 720; that.levelAIHit1Text.y = 215;
			that.levelStage.addChild(that.levelAIHit1Text);
			
			sprite = new PIXI.Sprite(parent.assets.getAsset("hit2Texture"));
			sprite.position.x = 765; sprite.position.y = 215; sprite.scale.set(0.3);
			that.levelStage.addChild(sprite);
			if(parent.config.side === that.SIDE_SITH) that.levelAIHit2Text = new PIXI.Text("- " + that.levelAIHit2, that.levelStyleButtonBlueText);
			if(parent.config.side === that.SIDE_JEDI) that.levelAIHit2Text = new PIXI.Text("- " + that.levelAIHit2, that.levelStyleButtonRedText);  
			that.levelAIHit2Text.x = 790; that.levelAIHit2Text.y = 215;
			that.levelStage.addChild(that.levelAIHit2Text);
			
			sprite = new PIXI.Sprite(parent.assets.getAsset("hit3Texture"));
			sprite.position.x = 695; sprite.position.y = 250; sprite.scale.set(0.3);
			that.levelStage.addChild(sprite);
			if(parent.config.side === that.SIDE_SITH) that.levelAIHit3Text = new PIXI.Text("+ " + that.levelAIHit3, that.levelStyleButtonBlueText);
			if(parent.config.side === that.SIDE_JEDI) that.levelAIHit3Text = new PIXI.Text("+ " + that.levelAIHit3, that.levelStyleButtonRedText);  
			that.levelAIHit3Text.x = 720; that.levelAIHit3Text.y = 250;
			that.levelStage.addChild(that.levelAIHit3Text);
			
			sprite = new PIXI.Sprite(parent.assets.getAsset("hit4Texture"));
			sprite.position.x = 765; sprite.position.y = 250; sprite.scale.set(0.3);
			that.levelStage.addChild(sprite);
			if(parent.config.side === that.SIDE_SITH) that.levelAIHit4Text = new PIXI.Text("- " + that.levelAIHit4, that.levelStyleButtonBlueText);
			if(parent.config.side === that.SIDE_JEDI) that.levelAIHit4Text = new PIXI.Text("- " + that.levelAIHit4, that.levelStyleButtonRedText); 
			that.levelAIHit4Text.x = 790; that.levelAIHit4Text.y = 250;
			that.levelStage.addChild(that.levelAIHit4Text);
			
			sprite = new PIXI.Sprite(parent.assets.getAsset("hit5Texture"));
			sprite.position.x = 695; sprite.position.y = 290; sprite.scale.set(0.3);
			that.levelStage.addChild(sprite);
			if(parent.config.side === that.SIDE_SITH) that.levelAIHit5Text = new PIXI.Text("- " + that.levelAIHit5, that.levelStyleButtonBlueText);
			if(parent.config.side === that.SIDE_JEDI) that.levelAIHit5Text = new PIXI.Text("- " + that.levelAIHit5, that.levelStyleButtonRedText);  
			that.levelAIHit5Text.x = 720; that.levelAIHit5Text.y = 290;
			that.levelStage.addChild(that.levelAIHit5Text);
			
			graphics = new PIXI.Graphics(); 
			if(parent.config.side === that.SIDE_SITH)
			{
				graphics.lineStyle(2, 0x0000FF, 1);
				graphics.beginFill(0x0080FF, 0.2);
			}
			if(parent.config.side === that.SIDE_JEDI)
			{
				graphics.lineStyle(2, 0x800000, 1);
				graphics.beginFill(0x800000, 0.2);
			}
			graphics.moveTo(690, 205);
			graphics.lineTo(835, 205);
			graphics.lineTo(835, 175);
			graphics.lineTo(690, 175);
			graphics.endFill();
			that.levelStage.addChild(graphics);
			
			if(parent.config.side === that.SIDE_SITH) that.levelAILifeText = new PIXI.Text("Здоровье: " + that.levelAILife, that.levelStyleButtonBlueText); 
			if(parent.config.side === that.SIDE_JEDI) that.levelAILifeText = new PIXI.Text("Здоровье: " + that.levelAILife, that.levelStyleButtonRedText); 
			that.levelAILifeText.x = 692; that.levelAILifeText.y = 180;
			that.levelStage.addChild(that.levelAILifeText);
		},

		levelDroidBlue: function()
		{
			var textureSprite = new PIXI.Sprite(parent.assets.getAsset("r2d2DroidBlueRightTexture")); 
			textureSprite.position.x = 765; 
			textureSprite.position.y = 50; 
			textureSprite.scale.set(0.3);
			that.levelStage.addChild(textureSprite);
			
			var graphics = new PIXI.Graphics(); 
			graphics.lineStyle(2, 0x0090F0, 0.2);
			graphics.beginFill(0x0090F0, 0.2);
			graphics.moveTo(795, 65);
			graphics.lineTo(760, 20);
			graphics.lineTo(760, 110);
			graphics.lineTo(795, 65);
			graphics.endFill;
			
			for(var i = 0; i < 31; i++)
			{
				graphics.lineStyle(1, 0x0090F0, 0.2);
				graphics.moveTo(480, 20+(3*i));
				graphics.lineTo(760, 20+(3*i));
			}
			that.levelStage.addChild(graphics);
			
			that.levelMessageLineGraphics = new PIXI.Graphics(); 
			that.levelMessageLineGraphics.lineStyle(10, 0x0090F0, 0.3);
			that.levelMessageLineGraphics.moveTo(480, 25);
			that.levelMessageLineGraphics.lineTo(760, 25);
			that.levelStage.addChild(that.levelMessageLineGraphics);
			
			var text = new PIXI.Text("Миссия " + parent.initialization.planets[that.levelPlanetID].name + "\nПобедите всех своих соперников.\nДля этого наносите удары собирая кристалы три в ряд.\nУдары наносите по очереди.", that.levelStyleDroidBlueText); 
			text.x = 490; 
			text.y = 23; 
			that.levelStage.addChild(text);
		},
		
		levelDroidRed: function()
		{
			var textureSprite = new PIXI.Sprite(parent.assets.getAsset("r2d2DroidRedRightTexture")); 
			textureSprite.position.x = 765; 
			textureSprite.position.y = 50; 
			textureSprite.scale.set(0.3);
			that.levelStage.addChild(textureSprite);
			
			var graphics = new PIXI.Graphics(); 
			graphics.lineStyle(2, 0xA63A24, 0.2);
			graphics.beginFill(0xA63A24, 0.2);
			graphics.moveTo(795, 65);
			graphics.lineTo(760, 20);
			graphics.lineTo(760, 110);
			graphics.lineTo(795, 65);
			graphics.endFill;
			
			for(var i = 0; i < 31; i++)
			{
				graphics.lineStyle(1, 0xA63A24, 0.2);
				graphics.moveTo(480, 20+(3*i));
				graphics.lineTo(760, 20+(3*i));
			}
			that.levelStage.addChild(graphics);
			
			that.levelMessageLineGraphics = new PIXI.Graphics(); 
			that.levelMessageLineGraphics.lineStyle(10, 0xA63A24, 0.3);
			that.levelMessageLineGraphics.moveTo(480, 25);
			that.levelMessageLineGraphics.lineTo(760, 25);
			that.levelStage.addChild(that.levelMessageLineGraphics);
			
			var text = new PIXI.Text("Миссия " + parent.initialization.planets[that.levelPlanetID].name + "\nПобедите всех своих соперников.\nДля этого наносите удары собирая кристалы три в ряд.\nУдары наносите по очереди.", that.levelStyleDroidRedText); 
			text.x = 490; 
			text.y = 23; 
			that.levelStage.addChild(text);
		},
		
		levelSelectPersonageUser: function()
		{
			var position = [[0,0],[105,0],[210,0]];
			that.levelBorderPersonageUser.x = position[that.levelIndexUser][0];
			that.levelBorderPersonageUser.y = position[that.levelIndexUser][1];
			position = null;
			that.levelPersonageUserSprite.texture = parent.assets.getAsset("heroesTextures")[that.levelCommandUser[that.levelIndexUser].id][1];
			that.levelUserHit1 = that.levelCommandUser[that.levelIndexUser].hitDefense1;
			that.levelUserHit2 = that.levelCommandUser[that.levelIndexUser].hitDefense2;
			that.levelUserHit3 = that.levelCommandUser[that.levelIndexUser].hitDefense3;
			that.levelUserHit4 = that.levelCommandUser[that.levelIndexUser].hitDefense4;
			that.levelUserHit5 = that.levelCommandUser[that.levelIndexUser].hitDefense5;
			that.levelUserLife = that.levelCommandUser[that.levelIndexUser].life;
			that.levelUserHit1Text.text = "- " + that.levelUserHit1;
			that.levelUserHit2Text.text = "- " + that.levelUserHit2;
			that.levelUserHit3Text.text = "+ " + that.levelUserHit3;
			that.levelUserHit4Text.text = "- " + that.levelUserHit4;
			that.levelUserHit5Text.text = "- " + that.levelUserHit5;
			that.levelUserLifeText.text = "Здоровье: " + that.levelUserLife;
		},
		
		levelSelectPersonageAI: function()
		{
			var position = [[0,0],[105,0],[210,0]];
			that.levelBorderPersonageAI.x = position[that.levelIndexAI][0];
			that.levelBorderPersonageAI.y = position[that.levelIndexAI][1];
			position = null;
			that.levelPersonageAISprite.texture = parent.assets.getAsset("heroesTextures")[that.levelCommandAI[that.levelIndexAI].id][2];
			if(that.levelIntercept === true)
			{
				that.levelAIHit1 = that.levelCommandAI[that.levelIndexAI].hitDefense1;
				that.levelAIHit2 = that.levelCommandAI[that.levelIndexAI].hitDefense2;
				that.levelAIHit3 = that.levelCommandAI[that.levelIndexAI].hitDefense3;
				that.levelAIHit4 = that.levelCommandAI[that.levelIndexAI].hitDefense4;
				that.levelAIHit5 = that.levelCommandAI[that.levelIndexAI].hitDefense5;
			}else{
				that.levelAIHit1 = that.levelCommandAI[that.levelIndexAI].hitAttack1;
				that.levelAIHit2 = that.levelCommandAI[that.levelIndexAI].hitAttack2;
				that.levelAIHit3 = that.levelCommandAI[that.levelIndexAI].hitAttack3;
				that.levelAIHit4 = that.levelCommandAI[that.levelIndexAI].hitAttack4;
				that.levelAIHit5 = that.levelCommandAI[that.levelIndexAI].hitAttack5;
			}
			that.levelAILife = that.levelCommandAI[that.levelIndexAI].life;
			that.levelAIHit1Text.text = "- " + that.levelAIHit1;
			that.levelAIHit2Text.text = "- " + that.levelAIHit2;
			that.levelAIHit3Text.text = "+ " + that.levelAIHit3;
			that.levelAIHit4Text.text = "- " + that.levelAIHit4;
			that.levelAIHit5Text.text = "- " + that.levelAIHit5;
			that.levelAILifeText.text = "Здоровье: " + that.levelAILife;
		},
		
		levelBattons: function()
		{
			var textArr = ["ЗАКОНЧИТЬ БИТВУ", "НАСТРОЙКИ", "ВЫЙТИ В МЕНЮ", "ПРИГЛАСИТЬ"];
			var nameArr = ["EndBattle", "Settings", "BackMenu", "Invite"];
			
			var button; 
			if(parent.config.side === that.SIDE_JEDI) button = new PIXI.extras.MovieClip(parent.assets.getAsset("animTexButtonBlue"));
			if(parent.config.side === that.SIDE_SITH) button = new PIXI.extras.MovieClip(parent.assets.getAsset("animTexButtonRed"));
			button.name = nameArr[0];
			button.position.x = 35; 
			button.position.y = 670; 
			button.interactive = true; 
			button.buttonMode = true; 
			button.loop = false; 
			button.animationSpeed = 0.2;
			button.onComplete = that.onLevelButtonUpdate;
			button.tap = that.onLevelButtonClick; 
			button.click = that.onLevelButtonClick; 
			button.on('mouseover', that.onLevelButtonOver);
			button.on('mouseout', that.onLevelButtonOut);
			var text; 
			if(parent.config.side === that.SIDE_JEDI) text = new PIXI.Text(textArr[0], that.levelStyleButtonsBlueText); 
			if(parent.config.side === that.SIDE_SITH) text = new PIXI.Text(textArr[0], that.levelStyleButtonsRedText); 
			text.x = (button.width / 2) - (text.width / 2);
			text.y = button.height / 3;
			button.addChild(text); 
			that.levelStage.addChild(button);
			
			if(parent.config.side === that.SIDE_JEDI) button = new PIXI.extras.MovieClip(parent.assets.getAsset("animTexButtonBlue"));
			if(parent.config.side === that.SIDE_SITH) button = new PIXI.extras.MovieClip(parent.assets.getAsset("animTexButtonRed")); 
			button.name = nameArr[1];
			button.position.x = 255; 
			button.position.y = 670; 
			button.interactive = true; 
			button.buttonMode = true; 
			button.loop = false; 
			button.animationSpeed = 0.2;
			button.onComplete = that.onLevelButtonUpdate;
			button.tap = that.onLevelButtonClick; 
			button.click = that.onLevelButtonClick; 
			button.on('mouseover', that.onLevelButtonOver);
			button.on('mouseout', that.onLevelButtonOut);
			if(parent.config.side === that.SIDE_JEDI) text = new PIXI.Text(textArr[1], that.levelStyleButtonsBlueText); 
			if(parent.config.side === that.SIDE_SITH) text = new PIXI.Text(textArr[1], that.levelStyleButtonsRedText);
			text.x = (button.width / 2) - (text.width / 2);
			text.y = button.height / 3;
			button.addChild(text); 
			that.levelStage.addChild(button);
			
			if(parent.config.side === that.SIDE_JEDI) button = new PIXI.extras.MovieClip(parent.assets.getAsset("animTexButtonBlue"));
			if(parent.config.side === that.SIDE_SITH) button = new PIXI.extras.MovieClip(parent.assets.getAsset("animTexButtonRed")); 
			button.name = nameArr[2];
			button.position.x = 35; 
			button.position.y = 620; 
			button.interactive = true; 
			button.buttonMode = true; 
			button.loop = false; 
			button.animationSpeed = 0.2;
			button.onComplete = that.onLevelButtonUpdate;
			button.tap = that.onLevelButtonClick; 
			button.click = that.onLevelButtonClick; 
			button.on('mouseover', that.onLevelButtonOver);
			button.on('mouseout', that.onLevelButtonOut);
			if(parent.config.side === that.SIDE_JEDI) text = new PIXI.Text(textArr[2], that.levelStyleButtonsBlueText); 
			if(parent.config.side === that.SIDE_SITH) text = new PIXI.Text(textArr[2], that.levelStyleButtonsRedText);
			text.x = (button.width / 2) - (text.width / 2);
			text.y = button.height / 3;
			button.addChild(text); 
			that.levelStage.addChild(button);
			
			if(parent.config.side === that.SIDE_JEDI) button = new PIXI.extras.MovieClip(parent.assets.getAsset("animTexButtonBlue"));
			if(parent.config.side === that.SIDE_SITH) button = new PIXI.extras.MovieClip(parent.assets.getAsset("animTexButtonRed")); 
			button.name = nameArr[3];
			button.position.x = 255; 
			button.position.y = 620; 
			button.interactive = true; 
			button.buttonMode = true; 
			button.loop = false; 
			button.animationSpeed = 0.2;
			button.onComplete = that.onLevelButtonUpdate;
			button.tap = that.onLevelButtonClick; 
			button.click = that.onLevelButtonClick; 
			button.on('mouseover', that.onLevelButtonOver);
			button.on('mouseout', that.onLevelButtonOut);
			if(parent.config.side === that.SIDE_JEDI) text = new PIXI.Text(textArr[3], that.levelStyleButtonsBlueText); 
			if(parent.config.side === that.SIDE_SITH) text = new PIXI.Text(textArr[3], that.levelStyleButtonsRedText); 
			text.x = (button.width / 2) - (text.width / 2);
			text.y = button.height / 3;
			button.addChild(text); 
			that.levelStage.addChild(button);
		},

		onLevelButtonOver: function()
		{
			this.isOver = true;
			this.gotoAndPlay(1);
		},

		onLevelButtonOut: function()
		{
			this.isOver = false;
			this.gotoAndStop(0);
		},

		onLevelButtonUpdate: function()
		{
			if(this.isOver)
			{
				this.gotoAndPlay(1);
			}else{
				this.gotoAndStop(0);
			}
		},
		
		onLevelButtonClick: function() 
		{
			switch (this.name)
			{
				case "EndBattle":
					parent.lostShow(that.levelPlanetID, that.levelIntercept);
					break;
				case "Settings":
					parent.settingsShow();
					break;
				case "BackMenu":
					
					break;
				case "Invite": 
					parent.vkInvite();
					break;
				default:
					break;
			}
		},
		
		/* Создание игрового поля =================================================== */
		levelFieldCreate: function()
		{
			parent.matchShow(parent.initialization.levels[that.levelPlanetID]);
		},
		/* ========================================================================== */
		
		/* ПРОГРЕСС: Уменьшение значений LifeBars =================================== */
		levelReduceLifeBar: function(hitType, hitCount, hitModeAI) 
		{
			if(hitModeAI === false) // удар пользователя (урон ИИ)
			{
				if(hitType === parent.match.MATCH_HIT_1)
				{
                                        parent.initialization.userlTotalPointsPlayerLevel += (that.levelUserHit1 * hitCount) * 10;
					that.levelCommandAI[that.levelIndexAI].life -= (that.levelUserHit1 * hitCount);
					that.levelAILife = that.levelCommandAI[that.levelIndexAI].life;
					if(that.levelAILife < 0) that.levelAILife = 0;
					that.levelAILifeText.text = "Здоровье: " + that.levelAILife;
				}
				if(hitType === parent.match.MATCH_HIT_2)
				{
                                        parent.initialization.userlTotalPointsPlayerLevel += (that.levelUserHit2 * hitCount) * 10;
					that.levelCommandAI[that.levelIndexAI].life -= (that.levelUserHit2 * hitCount);
					that.levelAILife = that.levelCommandAI[that.levelIndexAI].life;
					if(that.levelAILife < 0) that.levelAILife = 0;
					that.levelAILifeText.text = "Здоровье: " + that.levelAILife;
				}
				if(hitType === parent.match.MATCH_HIT_3)
				{
                                        parent.initialization.userlTotalPointsPlayerLevel += (that.levelUserHit3 * hitCount) * 10;
					that.levelCommandUser[that.levelIndexUser].life += (that.levelUserHit3 * hitCount);
					that.levelUserLife = that.levelCommandUser[that.levelIndexUser].life;
					if(that.levelAILife < 0) that.levelAILife = 0;
					that.levelUserLifeText.text = "Здоровье: " + that.levelUserLife;
				}
				if(hitType === parent.match.MATCH_HIT_4)
				{
                                        parent.initialization.userlTotalPointsPlayerLevel += (that.levelUserHit4 * hitCount) * 10;
					that.levelCommandAI[that.levelIndexAI].life -= (that.levelUserHit4 * hitCount);
					that.levelAILife = that.levelCommandAI[that.levelIndexAI].life;
					if(that.levelAILife < 0) that.levelAILife = 0;
					that.levelAILifeText.text = "Здоровье: " + that.levelAILife;
				}
				if(hitType === parent.match.MATCH_HIT_5)
				{
                                        parent.initialization.userlTotalPointsPlayerLevel += (that.levelUserHit5 * hitCount) * 10;
					that.levelCommandAI[that.levelIndexAI].life -= (that.levelUserHit5 * hitCount);
					that.levelAILife = that.levelCommandAI[that.levelIndexAI].life;
					if(that.levelAILife < 0) that.levelAILife = 0;
					that.levelAILifeText.text = "Здоровье: " + that.levelAILife;
				}
			}else{ // удар ИИ (урон пользователю)
				if(hitType === parent.match.MATCH_HIT_1)
				{
					that.levelCommandUser[that.levelIndexUser].life -= (that.levelAIHit1 * hitCount);
					that.levelUserLife = that.levelCommandUser[that.levelIndexUser].life;
					if(that.levelUserLife < 0) that.levelUserLife = 0;
					that.levelUserLifeText.text = "Здоровье: " + that.levelUserLife;
				}
				if(hitType === parent.match.MATCH_HIT_2)
				{
					that.levelCommandUser[that.levelIndexUser].life -= (that.levelAIHit2 * hitCount);
					that.levelUserLife = that.levelCommandUser[that.levelIndexUser].life;
					if(that.levelUserLife < 0) that.levelUserLife = 0;
					that.levelUserLifeText.text = "Здоровье: " + that.levelUserLife;
				}
				if(hitType === parent.match.MATCH_HIT_3)
				{
					that.levelCommandAI[that.levelIndexAI].life += (that.levelAIHit2 * hitCount);
					that.levelAILife = that.levelCommandAI[that.levelIndexAI].life;
					if(that.levelUserLife < 0) that.levelUserLife = 0;
					that.levelAILifeText.text = "Здоровье: " + that.levelAILife;
				}
				if(hitType === parent.match.MATCH_HIT_4)
				{
					that.levelCommandUser[that.levelIndexUser].life -= (that.levelAIHit4 * hitCount);
					that.levelUserLife = that.levelCommandUser[that.levelIndexUser].life;
					if(that.levelUserLife < 0) that.levelUserLife = 0;
					that.levelUserLifeText.text = "Здоровье: " + that.levelUserLife;
				}
				if(hitType === parent.match.MATCH_HIT_5)
				{
					that.levelCommandUser[that.levelIndexUser].life -= (that.levelAIHit5 * hitCount);
					that.levelUserLife = that.levelCommandUser[that.levelIndexUser].life;
					if(that.levelUserLife < 0) that.levelUserLife = 0;
					that.levelUserLifeText.text = "Здоровье: " + that.levelUserLife;
				}
			}
		},
		/* ========================================================================== */
		
		/* Меняем персонаж ========================================================== */
		levelExchangePersonage: function(mode)
		{
			if(mode === "AI") // меняем персонаж ИИ
			{
				var removePers = 0;
				for(var i in that.levelCommandAI)
				{
					if(that.levelCommandAI[i].life <= 0)
					{
						removePers++; // if(that.levelCommandAI[0].life <= 0 && that.levelCommandAI[1].life <= 0 && that.levelCommandAI[2].life <= 0)
					}
				}
				if(removePers === (that.levelCommandAI.length))
				{
					// битва завершена ИИ проиграл!
					parent.timer.timerPause = true;
					parent.timer.timerStop();
					that.levelStage.removeChild(that.levelPersonageAISprite);
					that.levelStage.removeChild(that.levelAIHit1Text);
					that.levelStage.removeChild(that.levelAIHit2Text);
					that.levelStage.removeChild(that.levelAIHit3Text);
					that.levelStage.removeChild(that.levelAIHit4Text);
					that.levelStage.removeChild(that.levelAIHit5Text);
					that.levelStage.removeChild(that.levelAILifeText);
                                        
					parent.victoryShow(that.levelPlanetID, that.levelIntercept);
					
				}else{
					if(that.levelIndexAI < that.levelCommandAI.length - 1) that.levelIndexAI++; // < 2
					else that.levelIndexAI = 0;
					if(that.levelCommandAI[that.levelIndexAI].life <= 0) that.levelExchangePersonage("AI");
					else that.levelSelectPersonageAI();
					
					if(that.levelCommandUser[that.levelIndexUser].life <= 0)
					{
						var position = [[55,30],[160,30],[265,30]];
						var sprite = new PIXI.Sprite(parent.assets.getAsset("personageDeadTexture"));
						sprite.position.x = position[that.levelIndexUser][0];
						sprite.position.y = position[that.levelIndexUser][1];
						that.levelStage.addChild(sprite);
						position = null;
						that.levelExchangePersonage("USER");
					}
				}
			}
			if(mode === "USER") // меняем персонажа пользователя
			{
				var removePers = 0;
				for(var i in that.levelCommandUser)
				{
					if(that.levelCommandUser[i].life <= 0)
					{
						removePers++; //if(that.levelCommandUser[0].life <= 0 && that.levelCommandUser[1].life <= 0 && that.levelCommandUser[2].life <= 0)
					}
				}
				if(removePers === (that.levelCommandUser.length))
				{
					// битва завершена Пользователь проиграл!
					parent.timer.timerPause = true;
					parent.timer.timerStop();
					that.levelStage.removeChild(that.levelPersonageUserSprite);
					that.levelStage.removeChild(that.levelUserHit1Text);
					that.levelStage.removeChild(that.levelUserHit2Text);
					that.levelStage.removeChild(that.levelUserHit3Text);
					that.levelStage.removeChild(that.levelUserHit4Text);
					that.levelStage.removeChild(that.levelUserHit5Text);
					that.levelStage.removeChild(that.levelUserLifeText);
					console.log("Пользователь проиграл!");
					
				}else{
					if(that.levelIndexUser < that.levelCommandUser.length - 1)that.levelIndexUser++; // < 2
					else that.levelIndexUser = 0;
					if(that.levelCommandUser[that.levelIndexUser].life <= 0) that.levelExchangePersonage("USER");
					else that.levelSelectPersonageUser();
					
					if(that.levelCommandAI[that.levelIndexAI].life <= 0)
					{
						var position = [[520,628],[625,628],[730,628]];
						var sprite = new PIXI.Sprite(parent.assets.getAsset("personageDeadTexture"));
						sprite.position.x = position[that.levelIndexAI][0];
						sprite.position.y = position[that.levelIndexAI][1];
						that.levelStage.addChild(sprite);
						position = null;
						that.levelExchangePersonage("AI");
					}
				}
			}
		},
		/* ========================================================================== */	
		
		
		/* Завершение работы с классом ======================================== */
		tweenStart: function()
		{
			createjs.Tween.get(that.levelStarsSprite, {loop: true}) 
					.to({x: -50, y: 0}, 10000, createjs.Ease.getPowInOut(3))
					.to({x: -50, y: -50}, 10000, createjs.Ease.getPowInOut(3))
					.to({x: 0, y: -50}, 10000, createjs.Ease.getPowInOut(3))
					.to({x: 0, y: 0}, 10000, createjs.Ease.getPowInOut(3));

			createjs.Tween.get(that.levelPlanetSprite, {loop: true}) 
					.to({x: 200, y: 100}, 10000, createjs.Ease.getPowInOut(3))
					.to({x: 200, y: 0}, 10000, createjs.Ease.getPowInOut(3))
					.to({x: 300, y: 0}, 10000, createjs.Ease.getPowInOut(3))
					.to({x: 300, y: 100}, 10000, createjs.Ease.getPowInOut(3));
					
			createjs.Tween.get(that.levelLandscapeSprite, {loop: true}) 
					.to({x: -50, y: 0}, 10000, createjs.Ease.getPowInOut(3))
					.to({x: -50, y: -50}, 10000, createjs.Ease.getPowInOut(3))
					.to({x: 0, y: -50}, 10000, createjs.Ease.getPowInOut(3))
					.to({x: 0, y: 0}, 10000, createjs.Ease.getPowInOut(3))
					.to({alpha: 1.0}, 10000, createjs.Ease.getPowInOut(3))
					.to({x: -50, y: 0}, 10000, createjs.Ease.getPowInOut(3))
					.to({x: -50, y: -50}, 10000, createjs.Ease.getPowInOut(3))
					.to({x: 0, y: -50}, 10000, createjs.Ease.getPowInOut(3))
					.to({x: 0, y: 0}, 10000, createjs.Ease.getPowInOut(3))
					.to({alpha: 0.0}, 10000, createjs.Ease.getPowInOut(3));
					
			createjs.Tween.get(that.levelLineUserAnimationGraphics, {loop: true}) 
				.to({x: 0, y: 275}, 2500, createjs.Ease.getPowInOut(3));
			createjs.Tween.get(that.levelLineAIAnimationGraphics, {loop: true}) 
				.to({x: 0, y: 275}, 2500, createjs.Ease.getPowInOut(3));
			createjs.Tween.get(that.levelMessageLineGraphics, {loop: true}) 
				.to({x: 0, y: 80}, 2000, createjs.Ease.getPowInOut(3));
				
			createjs.Ticker.setFPS(60);
		},
		
		tweenStop: function()
		{
			createjs.Tween.removeTweens(that.levelStarsSprite);
			createjs.Tween.removeTweens(that.levelPlanetSprite);
			createjs.Tween.removeTweens(that.levelLandscapeSprite);
			createjs.Tween.removeTweens(that.levelLineUserAnimationGraphics);
			createjs.Tween.removeTweens(that.levelLineAIAnimationGraphics);
			createjs.Tween.removeTweens(that.levelMessageLineGraphics);
		},
		
		show: function()
		{
			that.tweenStart();
			return that.levelStage;
		},
		
		close: function()
		{
			that.tweenStop();
			for(var child in that.levelStage.children) that.levelStage.removeChild(that.levelStage.children[child]);
			return that.levelStage;
		},
		
		getWindowStage: function()
		{
			return that.levelStage;
		},
		
		destroy: function()
		{
			for(var child in that.levelStage.children) that.levelStage.removeChild(that.levelStage.children[child]);
			that.levelStage.destroy();
			delete that.levelStage.children;
			
			for(var property in that) that[property] = null;
		}
	};
	return that;
};


/* == END FILE ========================================================== */

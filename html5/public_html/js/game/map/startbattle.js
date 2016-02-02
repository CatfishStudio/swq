
/* == START FILE ========================================================= */

var StartBattle = function(parent)
{
	var that = {
		windowStage: null,
		lineAnimationGraphics: null,
		styleBlueText: { font : 'bold 18px Arial', fill : '#C4DEFB', stroke : '#0090F0', strokeThickness : 1, wordWrap : true, wordWrapWidth : 340, align: "center"},
		styleRedText: { font : 'bold 18px Arial', fill : '#EDCDCB', stroke : '#880000', strokeThickness : 1, wordWrap : true, wordWrapWidth : 340, align: "center"}, 
		buttonStyleBlueText: { font : 'bold 24px Arial', fill : '#FFFFFF', stroke : '#0090F0', strokeThickness : 1, wordWrap : true, wordWrapWidth : 340 },
		buttonStyleRedText: { font : 'bold 24px Arial', fill : '#FFFFFF', stroke : '#880000', strokeThickness : 1, wordWrap : true, wordWrapWidth : 340 }, 
		userPlanetID: null,
		aiPlanetID: null,

		SIDE_NONE: "side_none",
		SIDE_JEDI: "side_jedi",
		SIDE_SITH: "side_sith",
		
		create: function(planetUserTargetID, planetAITargetID)
		{
			that.userPlanetID = planetUserTargetID;
			that.aiPlanetID = planetAITargetID
			that.windowStage = new PIXI.Container();
			that.backgroundCreate();
			that.windowCreate();
			that.titleCreate();
			that.textCreate();
			that.buttonsCreate();
		},
		
		backgroundCreate: function()
		{
			var graphics = new PIXI.Graphics(); 
			graphics.hitArea = new PIXI.Rectangle(0, 0, parent.config.MAIN_WIDTH, parent.config.MAIN_HEIGH);
			graphics.interactive = true;
			graphics.lineStyle(1, 0x000000, 0.05);
			graphics.beginFill(0x000000, 0.05);
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
				graphics.drawRoundedRect(200, 150, 460, 260, 15);
				graphics.lineStyle(2, 0x0000FF, 1);
				graphics.beginFill(0x00000F, 0.5);
				graphics.drawRoundedRect(210, 160, 440, 240, 5);
				graphics.endFill();
				that.windowStage.addChild(graphics);
				
				var textureSprite; 
				if(parent.initialization.commandUser["personage1"] != undefined) textureSprite = new PIXI.Sprite(parent.assets.getAsset("heroesTextures")[parent.initialization.commandUser["personage1"]][1]);
				else{
					if(parent.initialization.commandUser["personage2"] != undefined) textureSprite = new PIXI.Sprite(parent.assets.getAsset("heroesTextures")[parent.initialization.commandUser["personage2"]][1]);
					else textureSprite = new PIXI.Sprite(parent.assets.getAsset("heroesTextures")[parent.initialization.commandUser["personage3"]][1]);
				}
				textureSprite.position.x = 220; 
				textureSprite.position.y = 165; 
				textureSprite.scale.set(0.5);
				that.windowStage.addChild(textureSprite);
				
				if(that.userPlanetID !== that.aiPlanetID || parent.config.stopAI === true)
				{
					textureSprite = new PIXI.Sprite(parent.assets.getAsset("heroesTextures")[parent.initialization.planets[that.userPlanetID].redPersonage1][2]);
				} else {
					if(parent.initialization.commandAI["personage1"] != undefined) textureSprite = new PIXI.Sprite(parent.assets.getAsset("heroesTextures")[parent.initialization.commandAI["personage1"]][2]);
					else{
						if(parent.initialization.commandAI["personage2"] != undefined) textureSprite = new PIXI.Sprite(parent.assets.getAsset("heroesTextures")[parent.initialization.commandAI["personage2"]][2]);
						else textureSprite = new PIXI.Sprite(parent.assets.getAsset("heroesTextures")[parent.initialization.commandAI["personage3"]][2]);
					}
				} 
				textureSprite.position.x = 510; 
				textureSprite.position.y = 165; 
				textureSprite.scale.set(0.5);
				that.windowStage.addChild(textureSprite);
				
				graphics = new PIXI.Graphics();
				for(var i = 0; i < 80; i++)
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
				graphics.drawRoundedRect(200, 150, 460, 260, 15);
				graphics.lineStyle(2, 0xFF0000, 1);
				graphics.beginFill(0x800000, 0.5);
				graphics.drawRoundedRect(210, 160, 440, 240, 5);
				graphics.endFill();
				that.windowStage.addChild(graphics);
				
				var textureSprite; 
				if(parent.initialization.commandUser["personage1"] != undefined) textureSprite = new PIXI.Sprite(parent.assets.getAsset("heroesTextures")[parent.initialization.commandUser["personage1"]][1]);
				else{
					if(parent.initialization.commandUser["personage2"] != undefined) textureSprite = new PIXI.Sprite(parent.assets.getAsset("heroesTextures")[parent.initialization.commandUser["personage2"]][1]);
					else textureSprite = new PIXI.Sprite(parent.assets.getAsset("heroesTextures")[parent.initialization.commandUser["personage3"]][1]);
				}
				textureSprite.position.x = 220; 
				textureSprite.position.y = 165; 
				textureSprite.scale.set(0.5);
				that.windowStage.addChild(textureSprite);
				
				if(that.userPlanetID !== that.aiPlanetID || parent.config.stopAI === true)
				{
					textureSprite = new PIXI.Sprite(parent.assets.getAsset("heroesTextures")[parent.initialization.planets[that.userPlanetID].bluePersonage1][2]);
				} else {
					if(parent.initialization.commandAI["personage1"] != undefined) textureSprite = new PIXI.Sprite(parent.assets.getAsset("heroesTextures")[parent.initialization.commandAI["personage1"]][2]);
					else{
						if(parent.initialization.commandAI["personage2"] != undefined) textureSprite = new PIXI.Sprite(parent.assets.getAsset("heroesTextures")[parent.initialization.commandAI["personage2"]][2]);
						else textureSprite = new PIXI.Sprite(parent.assets.getAsset("heroesTextures")[parent.initialization.commandAI["personage3"]][2]);
					}
				} 
				textureSprite.position.x = 510; 
				textureSprite.position.y = 165; 
				textureSprite.scale.set(0.5);
				that.windowStage.addChild(textureSprite);
				
				graphics = new PIXI.Graphics();
				for(var i = 0; i < 80; i++)
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
			if(parent.config.side === that.SIDE_JEDI) text = new PIXI.Text("БИТВА", that.buttonStyleBlueText); 
			if(parent.config.side === that.SIDE_SITH) text = new PIXI.Text("БИТВА", that.buttonStyleRedText); 
			text.x = 390;
			text.y = 180;
			that.windowStage.addChild(text);
		},
		
		textCreate: function()
		{
			var hitCountUser = 0;
			if(parent.initialization.personages[parent.initialization.commandUser["personage1"]] != undefined)
			{
				hitCountUser += parent.initialization.personages[parent.initialization.commandUser["personage1"]].hitDefense1 
					+ parent.initialization.personages[parent.initialization.commandUser["personage1"]].hitDefense2 
					+ parent.initialization.personages[parent.initialization.commandUser["personage1"]].hitDefense3 
					+ parent.initialization.personages[parent.initialization.commandUser["personage1"]].hitDefense4
					+ parent.initialization.personages[parent.initialization.commandUser["personage1"]].hitDefense5;
			}
			if(parent.initialization.personages[parent.initialization.commandUser["personage2"]] != undefined)
			{
				hitCountUser += parent.initialization.personages[parent.initialization.commandUser["personage2"]].hitDefense1 
					+ parent.initialization.personages[parent.initialization.commandUser["personage2"]].hitDefense2 
					+ parent.initialization.personages[parent.initialization.commandUser["personage2"]].hitDefense3 
					+ parent.initialization.personages[parent.initialization.commandUser["personage2"]].hitDefense4
					+ parent.initialization.personages[parent.initialization.commandUser["personage2"]].hitDefense5;
			}
			if(parent.initialization.personages[parent.initialization.commandUser["personage3"]] != undefined)
			{
				hitCountUser += parent.initialization.personages[parent.initialization.commandUser["personage3"]].hitDefense1 
					+ parent.initialization.personages[parent.initialization.commandUser["personage3"]].hitDefense2 
					+ parent.initialization.personages[parent.initialization.commandUser["personage3"]].hitDefense3 
					+ parent.initialization.personages[parent.initialization.commandUser["personage3"]].hitDefense4
					+ parent.initialization.personages[parent.initialization.commandUser["personage3"]].hitDefense5;
			}
			hitCountUser /= 10;
			
			var hitCountAI = 0;
			if(parent.config.side === that.SIDE_JEDI)
			{
				if(that.userPlanetID !== that.aiPlanetID || parent.config.stopAI === true)
				{
					if(parent.initialization.personages[parent.initialization.planets[that.userPlanetID].redPersonage1] != undefined)
					{
						hitCountAI += parent.initialization.personages[parent.initialization.planets[that.userPlanetID].redPersonage1].hitAttack1 
							+ parent.initialization.personages[parent.initialization.planets[that.userPlanetID].redPersonage1].hitAttack2 
							+ parent.initialization.personages[parent.initialization.planets[that.userPlanetID].redPersonage1].hitAttack3 
							+ parent.initialization.personages[parent.initialization.planets[that.userPlanetID].redPersonage1].hitAttack4
							+ parent.initialization.personages[parent.initialization.planets[that.userPlanetID].redPersonage1].hitAttack5;
					}
					if(parent.initialization.personages[parent.initialization.planets[that.userPlanetID].redPersonage2] != undefined)
					{
						hitCountAI += parent.initialization.personages[parent.initialization.planets[that.userPlanetID].redPersonage2].hitAttack1 
							+ parent.initialization.personages[parent.initialization.planets[that.userPlanetID].redPersonage2].hitAttack2 
							+ parent.initialization.personages[parent.initialization.planets[that.userPlanetID].redPersonage2].hitAttack3 
							+ parent.initialization.personages[parent.initialization.planets[that.userPlanetID].redPersonage2].hitAttack4
							+ parent.initialization.personages[parent.initialization.planets[that.userPlanetID].redPersonage2].hitAttack5;
					}
					if(parent.initialization.personages[parent.initialization.planets[that.userPlanetID].redPersonage3] != undefined)
					{
						hitCountAI += parent.initialization.personages[parent.initialization.planets[that.userPlanetID].redPersonage3].hitAttack1 
							+ parent.initialization.personages[parent.initialization.planets[that.userPlanetID].redPersonage3].hitAttack2 
							+ parent.initialization.personages[parent.initialization.planets[that.userPlanetID].redPersonage3].hitAttack3 
							+ parent.initialization.personages[parent.initialization.planets[that.userPlanetID].redPersonage3].hitAttack4
							+ parent.initialization.personages[parent.initialization.planets[that.userPlanetID].redPersonage3].hitAttack5;
					}
				}else{
					if(parent.initialization.personages[parent.initialization.commandAI["personage1"]] != undefined)
					{
						hitCountAI += parent.initialization.personages[parent.initialization.commandAI["personage1"]].hitDefense1 
							+ parent.initialization.personages[parent.initialization.commandAI["personage1"]].hitDefense2 
							+ parent.initialization.personages[parent.initialization.commandAI["personage1"]].hitDefense3 
							+ parent.initialization.personages[parent.initialization.commandAI["personage1"]].hitDefense3
							+ parent.initialization.personages[parent.initialization.commandAI["personage1"]].hitDefense4;
					}
					if(parent.initialization.personages[parent.initialization.commandAI["personage2"]] != undefined)
					{
						hitCountAI += parent.initialization.personages[parent.initialization.commandAI["personage2"]].hitDefense1 
							+ parent.initialization.personages[parent.initialization.commandAI["personage2"]].hitDefense2 
							+ parent.initialization.personages[parent.initialization.commandAI["personage2"]].hitDefense3 
							+ parent.initialization.personages[parent.initialization.commandAI["personage2"]].hitDefense4
							+ parent.initialization.personages[parent.initialization.commandAI["personage2"]].hitDefense5;
					}
					if(parent.initialization.personages[parent.initialization.commandAI["personage3"]] != undefined)
					{
						hitCountAI += parent.initialization.personages[parent.initialization.commandAI["personage3"]].hitDefense1 
							+ parent.initialization.personages[parent.initialization.commandAI["personage3"]].hitDefense2 
							+ parent.initialization.personages[parent.initialization.commandAI["personage3"]].hitDefense3 
							+ parent.initialization.personages[parent.initialization.commandAI["personage3"]].hitDefense4
							+ parent.initialization.personages[parent.initialization.commandAI["personage3"]].hitDefense5;
					}
				}
			}
			if(parent.config.side === that.SIDE_SITH)
			{
				if(that.userPlanetID !== that.aiPlanetID || parent.config.stopAI === true)
				{
					if(parent.initialization.personages[parent.initialization.planets[that.userPlanetID].bluePersonage1] != undefined)
					{
						hitCountAI += parent.initialization.personages[parent.initialization.planets[that.userPlanetID].bluePersonage1].hitAttack1 
							+ parent.initialization.personages[parent.initialization.planets[that.userPlanetID].bluePersonage1].hitAttack2 
							+ parent.initialization.personages[parent.initialization.planets[that.userPlanetID].bluePersonage1].hitAttack3 
							+ parent.initialization.personages[parent.initialization.planets[that.userPlanetID].bluePersonage1].hitAttack4
							+ parent.initialization.personages[parent.initialization.planets[that.userPlanetID].bluePersonage1].hitAttack5;
					}
					if(parent.initialization.personages[parent.initialization.planets[that.userPlanetID].bluePersonage2] != undefined)
					{
						hitCountAI += parent.initialization.personages[parent.initialization.planets[that.userPlanetID].bluePersonage2].hitAttack1 
							+ parent.initialization.personages[parent.initialization.planets[that.userPlanetID].bluePersonage2].hitAttack2 
							+ parent.initialization.personages[parent.initialization.planets[that.userPlanetID].bluePersonage2].hitAttack3 
							+ parent.initialization.personages[parent.initialization.planets[that.userPlanetID].bluePersonage2].hitAttack4
							+ parent.initialization.personages[parent.initialization.planets[that.userPlanetID].bluePersonage2].hitAttack5;
					}
					if(parent.initialization.personages[parent.initialization.planets[that.userPlanetID].bluePersonage3] != undefined)
					{
						hitCountAI += parent.initialization.personages[parent.initialization.planets[that.userPlanetID].bluePersonage3].hitAttack1 
							+ parent.initialization.personages[parent.initialization.planets[that.userPlanetID].bluePersonage3].hitAttack2 
							+ parent.initialization.personages[parent.initialization.planets[that.userPlanetID].bluePersonage3].hitAttack3 
							+ parent.initialization.personages[parent.initialization.planets[that.userPlanetID].bluePersonage3].hitAttack4
							+ parent.initialization.personages[parent.initialization.planets[that.userPlanetID].bluePersonage3].hitAttack5;
					}
				}else{
					if(parent.initialization.personages[parent.initialization.commandAI["personage1"]] != undefined)
					{
						hitCountAI += parent.initialization.personages[parent.initialization.commandAI["personage1"]].hitDefense1 
							+ parent.initialization.personages[parent.initialization.commandAI["personage1"]].hitDefense2 
							+ parent.initialization.personages[parent.initialization.commandAI["personage1"]].hitDefense3 
							+ parent.initialization.personages[parent.initialization.commandAI["personage1"]].hitDefense3
							+ parent.initialization.personages[parent.initialization.commandAI["personage1"]].hitDefense4;
					}
					if(parent.initialization.personages[parent.initialization.commandAI["personage2"]] != undefined)
					{
						hitCountAI += parent.initialization.personages[parent.initialization.commandAI["personage2"]].hitDefense1 
							+ parent.initialization.personages[parent.initialization.commandAI["personage2"]].hitDefense2 
							+ parent.initialization.personages[parent.initialization.commandAI["personage2"]].hitDefense3 
							+ parent.initialization.personages[parent.initialization.commandAI["personage2"]].hitDefense4
							+ parent.initialization.personages[parent.initialization.commandAI["personage2"]].hitDefense5;
					}
					if(parent.initialization.personages[parent.initialization.commandAI["personage3"]] != undefined)
					{
						hitCountAI += parent.initialization.personages[parent.initialization.commandAI["personage3"]].hitDefense1 
							+ parent.initialization.personages[parent.initialization.commandAI["personage3"]].hitDefense2 
							+ parent.initialization.personages[parent.initialization.commandAI["personage3"]].hitDefense3 
							+ parent.initialization.personages[parent.initialization.commandAI["personage3"]].hitDefense4
							+ parent.initialization.personages[parent.initialization.commandAI["personage3"]].hitDefense5;
					}
				}
			}
			hitCountAI /= 10;
			
			var text;
			if(parent.config.side === that.SIDE_JEDI)
			{
				text = new PIXI.Text("Сила: " + hitCountUser, that.styleBlueText); 
				text.x = (parent.config.MAIN_WIDTH / 2) - (text.width / 2) - 150;
				text.y = 350;
				that.windowStage.addChild(text);
				text = new PIXI.Text("Сила: " + hitCountAI, that.styleBlueText); 
				text.x = (parent.config.MAIN_WIDTH / 2) - (text.width / 2) + 150;
				text.y = 350;
				that.windowStage.addChild(text);
			}
			if(parent.config.side === that.SIDE_SITH)
			{
				text = new PIXI.Text("Сила: " + hitCountUser, that.styleRedText); 
				text.x = (parent.config.MAIN_WIDTH / 2) - (text.width / 2) - 150;
				text.y = 350;
				that.windowStage.addChild(text);
				text = new PIXI.Text("Сила: " + hitCountAI, that.styleRedText); 
				text.x = (parent.config.MAIN_WIDTH / 2) - (text.width / 2) + 150;
				text.y = 350;
				that.windowStage.addChild(text);
			}
			
			if(parent.config.side === that.SIDE_JEDI)
			{
				if(that.userPlanetID !== that.aiPlanetID || parent.config.stopAI === true)
				{
					if(parent.initialization.commandUser["personage1"] != undefined) text = new PIXI.Text(parent.assets.getAsset("heroesTextures")[parent.initialization.commandUser["personage1"]][0] + "\nVS\n" + parent.assets.getAsset("heroesTextures")[parent.initialization.planets[that.userPlanetID].redPersonage1][0], that.styleBlueText); 
					else{
						if(parent.initialization.commandUser["personage2"] != undefined) text = new PIXI.Text(parent.assets.getAsset("heroesTextures")[parent.initialization.commandUser["personage2"]][0] + "\nVS\n" + parent.assets.getAsset("heroesTextures")[parent.initialization.planets[that.userPlanetID].redPersonage1][0], that.styleBlueText); 
						else  text = new PIXI.Text(parent.assets.getAsset("heroesTextures")[parent.initialization.commandUser["personage3"]][0] + "\nVS\n" + parent.assets.getAsset("heroesTextures")[parent.initialization.planets[that.userPlanetID].redPersonage1][0], that.styleBlueText); 
					}    
				}else{
					if(parent.initialization.commandUser["personage1"] != undefined) text = new PIXI.Text(parent.assets.getAsset("heroesTextures")[parent.initialization.commandUser["personage1"]][0] + "\nVS\n" + parent.assets.getAsset("heroesTextures")[parent.initialization.commandAI["personage1"]][0], that.styleBlueText);
					else{
						if(parent.initialization.commandUser["personage2"] != undefined) text = new PIXI.Text(parent.assets.getAsset("heroesTextures")[parent.initialization.commandUser["personage2"]][0] + "\nVS\n" + parent.assets.getAsset("heroesTextures")[parent.initialization.commandAI["personage1"]][0], that.styleBlueText);
						else text = new PIXI.Text(parent.assets.getAsset("heroesTextures")[parent.initialization.commandUser["personage3"]][0] + "\nVS\n" + parent.assets.getAsset("heroesTextures")[parent.initialization.commandAI["personage1"]][0], that.styleBlueText);
					}
				}
			}
			if(parent.config.side === that.SIDE_SITH)
			{
				if(that.userPlanetID !== that.aiPlanetID || parent.config.stopAI === true)
				{
					if(parent.initialization.commandUser["personage1"] != undefined) text = new PIXI.Text(parent.assets.getAsset("heroesTextures")[parent.initialization.commandUser["personage1"]][0] + "\nVS\n" + parent.assets.getAsset("heroesTextures")[parent.initialization.planets[that.userPlanetID].bluePersonage1][0], that.styleRedText); 
					else{
						if(parent.initialization.commandUser["personage2"] != undefined) text = new PIXI.Text(parent.assets.getAsset("heroesTextures")[parent.initialization.commandUser["personage2"]][0] + "\nVS\n" + parent.assets.getAsset("heroesTextures")[parent.initialization.planets[that.userPlanetID].bluePersonage1][0], that.styleRedText); 
						else text = new PIXI.Text(parent.assets.getAsset("heroesTextures")[parent.initialization.commandUser["personage3"]][0] + "\nVS\n" + parent.assets.getAsset("heroesTextures")[parent.initialization.planets[that.userPlanetID].bluePersonage1][0], that.styleRedText); 
					}
				}else{
					if(parent.initialization.commandUser["personage1"] != undefined) text = new PIXI.Text(parent.assets.getAsset("heroesTextures")[parent.initialization.commandUser["personage1"]][0] + "\nVS\n" + parent.assets.getAsset("heroesTextures")[parent.initialization.commandAI["personage1"]][0], that.styleRedText); 
					else{
						if(parent.initialization.commandUser["personage2"] != undefined) text = new PIXI.Text(parent.assets.getAsset("heroesTextures")[parent.initialization.commandUser["personage2"]][0] + "\nVS\n" + parent.assets.getAsset("heroesTextures")[parent.initialization.commandAI["personage1"]][0], that.styleRedText); 
						else text = new PIXI.Text(parent.assets.getAsset("heroesTextures")[parent.initialization.commandUser["personage3"]][0] + "\nVS\n" + parent.assets.getAsset("heroesTextures")[parent.initialization.commandAI["personage1"]][0], that.styleRedText); 
					}
				}
			}
			text.x = (parent.config.MAIN_WIDTH / 2) - (text.width / 2);
			text.y = 225;
			that.windowStage.addChild(text);
		},
		
		buttonsCreate: function()
		{
			if(parent.config.side === that.SIDE_JEDI)
			{
				var button = new PIXI.extras.MovieClip(parent.assets.getAsset("animTexButtonBlue")); 
				button.name = "yes";
				button.position.x = (parent.config.MAIN_WIDTH / 2) -  (button.width / 2.5); 
				button.position.y = 300; 
				button.scale.set(0.8);
				button.interactive = true; 
				button.buttonMode = true; 
				button.loop = false; 
				button.animationSpeed = 0.2;
				button.onComplete = that.onButtonUpdate;
				button.tap = that.onButtonClick; 
				button.click = that.onButtonClick; 
				button.on('mouseover', that.onButtonOver);
				button.on('mouseout', that.onButtonOut);
				var text = new PIXI.Text("Начать", that.buttonStyleBlueText); 
				text.x = (button.width / 2) - (text.width / 3.0);
				text.y = button.height / 3.5;
				button.addChild(text); 
				that.windowStage.addChild(button);
				
				button = new PIXI.extras.MovieClip(parent.assets.getAsset("animTexButtonBlue")); 
				button.name = "no";
				button.position.x = (parent.config.MAIN_WIDTH / 2) -  (button.width / 2.5);
				button.position.y = 350; 
				button.scale.set(0.8);
				button.interactive = true; 
				button.buttonMode = true; 
				button.loop = false; 
				button.animationSpeed = 0.2;
				button.onComplete = that.onButtonUpdate;
				button.tap = that.onButtonClick; 
				button.click = that.onButtonClick; 
				button.on('mouseover', that.onButtonOver);
				button.on('mouseout', that.onButtonOut);
				var text = new PIXI.Text("Отмена", that.buttonStyleBlueText); 
				text.x = (button.width / 2) - (text.width / 3.0);
				text.y = button.height / 3.5;
				button.addChild(text); 
				that.windowStage.addChild(button);
			}
			if(parent.config.side === that.SIDE_SITH)
			{
				var button = new PIXI.extras.MovieClip(parent.assets.getAsset("animTexButtonRed")); 
				button.name = "yes";
				button.position.x = (parent.config.MAIN_WIDTH / 2) -  (button.width / 2.5); 
				button.position.y = 300; 
				button.scale.set(0.8);
				button.interactive = true; 
				button.buttonMode = true; 
				button.loop = false; 
				button.animationSpeed = 0.2;
				button.onComplete = that.onButtonUpdate;
				button.tap = that.onButtonClick; 
				button.click = that.onButtonClick; 
				button.on('mouseover', that.onButtonOver);
				button.on('mouseout', that.onButtonOut);
				var text = new PIXI.Text("Начать", that.buttonStyleRedText); 
				text.x = (button.width / 2) - (text.width / 3.0);
				text.y = button.height / 3.5;
				button.addChild(text); 
				that.windowStage.addChild(button);
				
				button = new PIXI.extras.MovieClip(parent.assets.getAsset("animTexButtonRed")); 
				button.name = "no";
				button.position.x = (parent.config.MAIN_WIDTH / 2) -  (button.width / 2.5); 
				button.position.y = 350; 
				button.scale.set(0.8);
				button.interactive = true; 
				button.buttonMode = true; 
				button.loop = false; 
				button.animationSpeed = 0.2;
				button.onComplete = that.onButtonUpdate;
				button.tap = that.onButtonClick; 
				button.click = that.onButtonClick; 
				button.on('mouseover', that.onButtonOver);
				button.on('mouseout', that.onButtonOut);
				var text = new PIXI.Text("Отмена", that.buttonStyleRedText); 
				text.x = (button.width / 2) - (text.width / 3.0);
				text.y = button.height / 3.5;
				button.addChild(text); 
				that.windowStage.addChild(button);
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
                        parent.sound.soundPlayStarWarsButtonClick();
			switch (this.name)
			{
				case "yes":
					if(that.userPlanetID !== that.aiPlanetID || parent.config.stopAI === true) parent.levelShow(that.userPlanetID, false, that.aiPlanetID);
					else parent.levelShow(that.userPlanetID, true, that.aiPlanetID);
                                        parent.startbattleClose();
                                        parent.mapClose();
					break;
				case "no":
					parent.startbattleClose();
					break;
				default:
					break;
			}
		},
		
		tweenStart: function()
		{
			createjs.Tween.get(that.lineAnimationGraphics, {loop: true}) 
				.to({x: 0, y: 230}, 2500, createjs.Ease.getPowInOut(3));
			createjs.Ticker.setFPS(60);
		},
		
		tweenStop: function()
		{
			createjs.Tween.removeTweens(that.lineAnimationGraphics);
		},
		
		show: function()
		{
			that.tweenStart();
			return that.windowStage;
		},
		
		close: function()
		{
			that.tweenStop();
			for(var child in that.windowStage.children)	that.windowStage.removeChild(that.windowStage.children[child]);
			return that.windowStage;
		},
		
		getWindowStage: function()
		{
			return that.windowStage;
		},
		
		destroy: function()
		{
			for(var child in that.windowStage.children)	that.windowStage.removeChild(that.windowStage.children[child]);
			that.windowStage.destroy();
			delete that.windowStage.children;
			
			for(var property in that) that[property] = null;
		}
	};
	return that;
};


/* == END FILE ========================================================== */

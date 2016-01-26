
/* == START FILE ========================================================= */

var Map = function(parent)
{
	var that = {
		windowStage: null,
		mapSprite: null,
		mapStartPosX: null,
		mapStartPosY: null,
		desktopLineGraphics: null,
		messageLineGraphics: null,
		styleDroidBlueText: { font : 'bold 12px Arial', fill : '#C4DEFB', stroke : '#0090F0', strokeThickness : 1, wordWrap : true, wordWrapWidth : 145 },
		styleButtonBlueText: { font : 'bold 14px Arial', fill : '#FFFFFF', stroke : '#0090F0', strokeThickness : 1, wordWrap : true, wordWrapWidth : 200 },
		styleDroidRedText: { font : 'bold 12px Arial', fill : '#EDCDCB', stroke : '#880000', strokeThickness : 1, wordWrap : true, wordWrapWidth : 145 },
		styleButtonRedText: { font : 'bold 14px Arial', fill : '#FFFFFF', stroke : '#880000', strokeThickness : 1, wordWrap : true, wordWrapWidth : 200 },
		textMessage: null,
		targetPlanetBlue: null,
		targetPlanetRed: null,
		targetAI: null,    // текущая цель ИИ
		SIDE_JEDI: "side_jedi",
		SIDE_SITH: "side_sith",
		
		create: function()
		{
			that.windowStage = new PIXI.Container();
			that.checkAvailablePersonage();	// определение доступности персонажей команды
			that.spaceCreate();
			that.planetsCreate();
			that.interfaceCreate();
			that.targetsCreate();
			that.targetSearch();
		},
		
		checkAvailablePersonage: function()
		{
			for(var key in parent.initialization.commandUser)
			{
				for(var planetID in parent.initialization.planets)
				{
					if( (parent.config.side === that.SIDE_JEDI)
					&& (parent.initialization.planets[planetID].blueRewardPersonage1 === parent.initialization.commandUser[key] || parent.initialization.planets[planetID].blueRewardPersonage2 === parent.initialization.commandUser[key] || parent.initialization.planets[planetID].blueRewardPersonage3 === parent.initialization.commandUser[key]) 
					&& (parent.initialization.planets[planetID].status === parent.initialization.USER_PLANET_QUEST_AWAITING || parent.initialization.planets[planetID].status === parent.initialization.USER_PLANET_QUEST_COMPLETE_SITH)) 
					{
						parent.initialization.commandUser[key] = null;
					}
					if( (parent.config.side === that.SIDE_SITH)
					&& (parent.initialization.planets[planetID].redRewardPersonage1 === parent.initialization.commandUser[key] || parent.initialization.planets[planetID].redRewardPersonage2 === parent.initialization.commandUser[key] || parent.initialization.planets[planetID].redRewardPersonage3 === parent.initialization.commandUser[key]) 
					&& (parent.initialization.planets[planetID].status === parent.initialization.USER_PLANET_QUEST_AWAITING || parent.initialization.planets[planetID].status === parent.initialization.USER_PLANET_QUEST_COMPLETE_JEDI)) 
					{
						parent.initialization.commandUser[key] = null;
					}
				}
			}
			
			for(var key in parent.initialization.commandAI)
			{
				for(var planetID in parent.initialization.planets)
				{
					if( (parent.config.side === that.SIDE_JEDI)
					&& (parent.initialization.planets[planetID].redPersonage1 === parent.initialization.commandAI[key] || parent.initialization.planets[planetID].redPersonage2 === parent.initialization.commandAI[key] || parent.initialization.planets[planetID].redPersonage3 === parent.initialization.commandAI[key]) 
					&& (parent.initialization.planets[planetID].status === parent.initialization.USER_PLANET_QUEST_AWAITING || parent.initialization.planets[planetID].status === parent.initialization.USER_PLANET_QUEST_COMPLETE_JEDI)) 
					{
						parent.initialization.commandAI[key] = null;
					}
					if( (parent.config.side === that.SIDE_SITH)
					&& (parent.initialization.planets[planetID].bluePersonage1 === parent.initialization.commandAI[key] || parent.initialization.planets[planetID].bluePersonage2 === parent.initialization.commandAI[key] || parent.initialization.planets[planetID].bluePersonage3 === parent.initialization.commandAI[key]) 
					&& (parent.initialization.planets[planetID].status === parent.initialization.USER_PLANET_QUEST_AWAITING || parent.initialization.planets[planetID].status === parent.initialization.USER_PLANET_QUEST_COMPLETE_SITH)) 
					{
						parent.initialization.commandAI[key] = null;
					}
				}
			}
		},
		
		spaceCreate: function()
		{
			if(parent.config.side === that.SIDE_JEDI) that.mapSprite = new PIXI.Sprite(parent.assets.getAsset("mapSpaceBlueTexture")); 
			if(parent.config.side === that.SIDE_SITH) that.mapSprite = new PIXI.Sprite(parent.assets.getAsset("mapSpaceRedTexture")); 
			that.mapSprite.position.x = -82; 
			that.mapSprite.position.y = -19; 
			that.mapSprite.interactive = true;
			that.mapSprite.on('mousedown', that.onSpaceDown);
			that.mapSprite.on('touchstart', that.onSpaceDown);
			that.mapSprite.on('mouseup', that.onSpaceUp);
			that.mapSprite.on('touchend', that.onSpaceUp);
			that.mapSprite.on('mouseupoutside', that.onSpaceUp);
			that.mapSprite.on('touchendoutside', that.onSpaceUp);
			that.mapSprite.on('mousemove', that.onSpaceMove);
			that.mapSprite.on('touchmove', that.onSpaceMove);
			that.windowStage.addChild(that.mapSprite);
			
		},
		
		onSpaceDown: function(event)
		{
			var cursorPosition = event.data.getLocalPosition(this.parent);
			that.mapStartPosX = cursorPosition.x;
			that.mapStartPosY = cursorPosition.y;
			this.data = event.data;
			this.move = true;
		},
		
		onSpaceUp: function(event)
		{
			that.mapStartPosX = 0;
			that.mapStartPosY = 0;
			this.move = false;
			this.data = null;
		},
		
		onSpaceMove: function(event)
		{
			if (this.move)
			{
				var newPosition = this.data.getLocalPosition(this.parent);
				if(that.mapStartPosX < newPosition.x)
				{
					if(this.position.x < -5) this.position.x += 5;
					that.mapStartPosX = newPosition.x;
				}
				if(that.mapStartPosX > newPosition.x)
				{
					if(this.position.x  > -160)this.position.x -= 5;
					that.mapStartPosX = newPosition.x;
				}
				
				if(that.mapStartPosY < newPosition.y)
				{
					if(this.position.y < -10) this.position.y += 5;
					that.mapStartPosY = newPosition.y;
				}
				if(that.mapStartPosY > newPosition.y)
				{
					if(this.position.y > -10)this.position.y -= 5;
					that.mapStartPosY = newPosition.y;
				}
			}
		},
		
		planetsCreate: function()
		{
			for (var key in parent.initialization.mapPlanets)
			{
				parent.initialization.mapPlanets[key][1].tap = that.onPlanetClick;
				parent.initialization.mapPlanets[key][1].click = that.onPlanetClick;
				parent.initialization.mapPlanets[key][1].on('mouseover', that.onPlanetOver);
				parent.initialization.mapPlanets[key][1].on('mouseout', that.onPlanetOut);
				
				if(parent.config.side === that.SIDE_JEDI)
				{
					if(parent.initialization.planets[key].status === parent.initialization.USER_PLANET_QUEST_AWAITING)
					{
						that.mapSprite.addChild(parent.initialization.mapPlanets[key][1]);
						that.mapSprite.addChild(parent.initialization.mapPlanets[key][4]);
						that.mapSprite.addChild(parent.initialization.mapPlanets[key][2]);
						that.mapSprite.addChild(parent.initialization.mapPlanets[key][5]);
						that.mapSprite.addChild(parent.initialization.mapPlanets[key][6]);
						that.mapSprite.addChild(parent.initialization.mapPlanets[key][7]);
					}
					if(parent.initialization.planets[key].status === parent.initialization.USER_PLANET_QUEST_COMPLETE_JEDI)
					{
						var graphics = new PIXI.Graphics();
						graphics.beginFill(0x0000FF, 0.25);
						graphics.lineStyle(1, 0x0000FF, 0.8);
						graphics.drawCircle(parent.initialization.mapPlanets[key][2].position.x + 1, parent.initialization.mapPlanets[key][2].position.y + 65, 50);
						graphics.lineStyle(1, 0x0000FF, 1);
						graphics.endFill();
						that.mapSprite.addChild(graphics);
					
						that.mapSprite.addChild(parent.initialization.mapPlanets[key][1]);
						that.mapSprite.addChild(parent.initialization.mapPlanets[key][4]);
						that.mapSprite.addChild(parent.initialization.mapPlanets[key][2]);
						that.mapSprite.addChild(parent.initialization.mapPlanets[key][11]);
					}
					if(parent.initialization.planets[key].status === parent.initialization.USER_PLANET_QUEST_COMPLETE_SITH)
					{
						var graphics = new PIXI.Graphics();
						graphics.beginFill(0xFF0000, 0.25);
						graphics.lineStyle(1, 0xFF0000, 0.3);
						graphics.drawCircle(parent.initialization.mapPlanets[key][2].position.x + 1, parent.initialization.mapPlanets[key][2].position.y + 65, 50);
						graphics.lineStyle(1, 0xFF0000, 1);
						graphics.endFill();
						that.mapSprite.addChild(graphics);
					
						that.mapSprite.addChild(parent.initialization.mapPlanets[key][1]);
						that.mapSprite.addChild(parent.initialization.mapPlanets[key][4]);
						that.mapSprite.addChild(parent.initialization.mapPlanets[key][2]);
						that.mapSprite.addChild(parent.initialization.mapPlanets[key][12]);
					}
				}
				if(parent.config.side === that.SIDE_SITH) 
				{
					if(parent.initialization.planets[key].status === parent.initialization.USER_PLANET_QUEST_AWAITING)
					{
						that.mapSprite.addChild(parent.initialization.mapPlanets[key][1]);
						that.mapSprite.addChild(parent.initialization.mapPlanets[key][4]);
						that.mapSprite.addChild(parent.initialization.mapPlanets[key][3]);
						that.mapSprite.addChild(parent.initialization.mapPlanets[key][8]);
						that.mapSprite.addChild(parent.initialization.mapPlanets[key][9]);
						that.mapSprite.addChild(parent.initialization.mapPlanets[key][10]);
					}
					if(parent.initialization.planets[key].status === parent.initialization.USER_PLANET_QUEST_COMPLETE_JEDI)
					{
						var graphics = new PIXI.Graphics();
						graphics.beginFill(0x0000FF, 0.25);
						graphics.lineStyle(1, 0x0000FF, 0.8);
						graphics.drawCircle(parent.initialization.mapPlanets[key][2].position.x + 1, parent.initialization.mapPlanets[key][2].position.y + 65, 50);
						graphics.lineStyle(1, 0x0000FF, 1);
						graphics.endFill();
						that.mapSprite.addChild(graphics);
						
						that.mapSprite.addChild(parent.initialization.mapPlanets[key][1]);
						that.mapSprite.addChild(parent.initialization.mapPlanets[key][4]);
						that.mapSprite.addChild(parent.initialization.mapPlanets[key][3]);
						that.mapSprite.addChild(parent.initialization.mapPlanets[key][11]);
					}
					if(parent.initialization.planets[key].status === parent.initialization.USER_PLANET_QUEST_COMPLETE_SITH)
					{
						var graphics = new PIXI.Graphics();
						graphics.beginFill(0xFF0000, 0.25);
						graphics.lineStyle(1, 0xFF0000, 0.3);
						graphics.drawCircle(parent.initialization.mapPlanets[key][2].position.x + 1, parent.initialization.mapPlanets[key][2].position.y + 65, 50);
						graphics.lineStyle(1, 0xFF0000, 1);
						graphics.endFill();
						that.mapSprite.addChild(graphics);
						
						that.mapSprite.addChild(parent.initialization.mapPlanets[key][1]);
						that.mapSprite.addChild(parent.initialization.mapPlanets[key][4]);
						that.mapSprite.addChild(parent.initialization.mapPlanets[key][3]);
						that.mapSprite.addChild(parent.initialization.mapPlanets[key][12]);
					}
				}
			}
		},
		
		onPlanetClick: function(event)
		{
			if(parent.initialization.commandUser["personage1"] === null && parent.initialization.commandUser["personage2"] === null && parent.initialization.commandUser["personage3"] === null)
			{
				parent.messageShow("ПРЕДУПРЕЖДЕНИЕ", "В вашей комманде нет не одного персонажа. \nВы не можите начать битву пока в команде не будет хотя бы один персонаж!");
			}else{
				if(parent.config.side === that.SIDE_JEDI)
				{
					if(parent.initialization.planets[this.name].status !== parent.initialization.USER_PLANET_QUEST_COMPLETE_JEDI || this.name === that.targetAI)
					{
						that.mapSprite.move = false;
						parent.startbattleShow(this.name, that.targetAI);
					}
				}
				if(parent.config.side === that.SIDE_SITH)
				{
					if(parent.initialization.planets[this.name].status !== parent.initialization.USER_PLANET_QUEST_COMPLETE_SITH || this.name === that.targetAI)
					{
						that.mapSprite.move = false;
						parent.startbattleShow(this.name, that.targetAI);
					}
				}
			}
		},
		
		onPlanetOver: function(event)
		{
			if(parent.config.side === that.SIDE_JEDI) that.textMessage.text = parent.initialization.mapMessage[event.target.name][0];
			if(parent.config.side === that.SIDE_SITH) that.textMessage.text = parent.initialization.mapMessage[event.target.name][1];
		},
		
		onPlanetOut: function(event)
		{
			if(parent.config.side === that.SIDE_JEDI) that.textMessage.text = parent.initialization.mapMessage["LastNews"][0];
			if(parent.config.side === that.SIDE_SITH) that.textMessage.text = parent.initialization.mapMessage["LastNews"][1];
		},
		
		interfaceCreate: function()
		{
			that.commandShow();
			if(parent.config.side === that.SIDE_JEDI)
			{
				that.borderBlue();
				that.desktopBlue();
				that.droidBlue();
				that.droidBlueMessage();
				that.buttonsBlue();
			}
			if(parent.config.side === that.SIDE_SITH)
			{
				that.borderRed();
				that.desktopRed();
				that.droidRed();
				that.droidRedMessage();
				that.buttonsRed();
			}
		},
		
		commandShow: function()
		{
			var index = 0;
			for(var key in parent.initialization.commandUser)
			{
				if(parent.initialization.commandUser[key] !== null)
				{
					var textureSprite = new PIXI.Sprite(parent.assets.getAsset("heroesTextures")[parent.initialization.commandUser[key]][3]); 
					textureSprite.position.x = 35 + (105 * index); 
					textureSprite.position.y = 625; 
					that.windowStage.addChild(textureSprite);
				}
				index++;
			}
		},
		
		borderBlue: function()
		{
			var graphics = new PIXI.Graphics(); 
			graphics.lineStyle(2, 0x0000FF, 1);
			graphics.beginFill(0x000000, 0);
			graphics.drawRect(10, 10, 840, 710);
			graphics.lineStyle(0);
			graphics.beginFill(0xFFFFFF, 1);
			graphics.drawCircle(50, 605,4);
			graphics.endFill();
			graphics.lineStyle(2, 0xFFFFFF, 1);
			graphics.moveTo(50,605);
			graphics.lineTo(5, 605);
			graphics.moveTo(5,605);
			graphics.lineTo(5, 725);
			graphics.moveTo(5, 725);
			graphics.lineTo(840, 725);
			graphics.lineStyle(0);
			graphics.beginFill(0xFFFFFF, 1);
			graphics.drawCircle(840, 725,4);
			graphics.endFill();
			graphics.lineStyle(0);
			graphics.beginFill(0xFFFFFF, 1);
			graphics.drawCircle(355, 680,4);
			graphics.endFill();
			graphics.lineStyle(2, 0xFFFFFF, 1);
			graphics.moveTo(355, 680);
			graphics.lineTo(355, 725);
			graphics.lineStyle(0);
			graphics.beginFill(0xFFFFFF, 1);
			graphics.drawCircle(855, 550, 4);
			graphics.endFill();
			graphics.lineStyle(2, 0xFFFFFF, 1);
			graphics.moveTo(855,550);
			graphics.lineTo(855, 5);
			graphics.moveTo(855,5);
			graphics.lineTo(5, 5);
			graphics.lineStyle(0);
			graphics.beginFill(0xFFFFFF, 1);
			graphics.drawCircle(5, 5, 4);
			graphics.endFill();
			that.windowStage.addChild(graphics);
		},
		
		desktopBlue: function()
		{
			var graphics = new PIXI.Graphics(); 
			graphics.lineStyle(2, 0x0000FF, 1);
			graphics.beginFill(0x0000FF, 0.2);
			graphics.moveTo(15, 610);
			graphics.lineTo(350, 610);
			graphics.lineTo(350, 715);
			graphics.lineTo(15, 715);
			graphics.endFill();
			for(var i = 0; i < 35; i++)
			{
				graphics.lineStyle(1, 0x0000FF, 0.5);
				graphics.moveTo(15, 610+(3*i));
				graphics.lineTo(350, 610+(3*i));
			}
			that.windowStage.addChild(graphics);
			
			that.desktopLineGraphics = new PIXI.Graphics(); 
			that.desktopLineGraphics.lineStyle(10, 0x0000FF, 0.3);
			that.desktopLineGraphics.moveTo(15,615);
			that.desktopLineGraphics.lineTo(350, 615);
			that.windowStage.addChild(that.desktopLineGraphics);
		},
		
		droidBlue: function()
		{
			var textureSprite = new PIXI.Sprite(parent.assets.getAsset("r2d2DroidBlueRightTexture")); 
			textureSprite.position.x = 765; 
			textureSprite.position.y = 605; 
			textureSprite.scale.set(0.3);
			that.windowStage.addChild(textureSprite);
			
			var graphics = new PIXI.Graphics(); 
			graphics.lineStyle(2, 0x0090F0, 0.2);
			graphics.beginFill(0x0090F0, 0.2);
			graphics.moveTo(792, 620);
			graphics.lineTo(700, 455);
			graphics.lineTo(845, 455);
			graphics.lineTo(792, 620);
			graphics.endFill;
			that.windowStage.addChild(graphics);
			
			graphics = new PIXI.Graphics();
			for(var i = 0; i < 72; i++)
			{
				graphics.lineStyle(1, 0x0090F0, 0.2);
				graphics.moveTo(698, 239+(3*i));
				graphics.lineTo(846, 239+(3*i));
			}
			that.windowStage.addChild(graphics);
			
			that.messageLineGraphics = new PIXI.Graphics(); 
			that.messageLineGraphics.lineStyle(10, 0x0090F0, 0.3);
			that.messageLineGraphics.moveTo(698, 243);
			that.messageLineGraphics.lineTo(846, 243);
			that.windowStage.addChild(that.messageLineGraphics);
		},
		
		droidBlueMessage: function()
		{
			that.textMessage = new PIXI.Text(parent.initialization.mapMessage["LastNews"][0], that.styleDroidBlueText); 
			that.textMessage.x = 700; 
			that.textMessage.y = 240; 
			that.windowStage.addChild(that.textMessage);
		},
		
		buttonsBlue: function()
		{
			var textArr = ["КОМАНДА", "НАСТРОЙКИ"];
			var nameArr = ["Command", "Settings"];
			
			for(var i = 0; i < textArr.length; i++)
			{
				var button = new PIXI.extras.MovieClip(parent.assets.getAsset("animTexButtonBlue")); 
				button.name = nameArr[i];
				button.position.x = 360 + (200 * i); 
				button.position.y = 670; 
				button.interactive = true; 
				button.buttonMode = true; 
				button.loop = false; 
				button.animationSpeed = 0.2;
				button.onComplete = that.onButtonUpdate;
				button.tap = that.onButtonClick; 
				button.click = that.onButtonClick; 
				button.on('mouseover', that.onButtonOver);
				button.on('mouseout', that.onButtonOut);

				var text = new PIXI.Text(textArr[i], that.styleButtonBlueText); 
				text.x = button.width / 3.8;
				text.y = button.height / 3;

				button.addChild(text); 
				that.windowStage.addChild(button);
			}
			
			textArr = ["НАЗАД В МЕНЮ", "ПРИГЛАСИТЬ"];
			nameArr = ["BackMenu", "Invite"];
			
			for(var i = 0; i < textArr.length; i++)
			{
				var button = new PIXI.extras.MovieClip(parent.assets.getAsset("animTexButtonBlue")); 
				button.name = nameArr[i];
				button.position.x = 10; 
				button.position.y = 10 + (545 * i); 
				button.interactive = true; 
				button.buttonMode = true; 
				button.loop = false; 
				button.animationSpeed = 0.2;
				button.onComplete = that.onButtonUpdate;
				button.tap = that.onButtonClick; 
				button.click = that.onButtonClick; 
				button.on('mouseover', that.onButtonOver);
				button.on('mouseout', that.onButtonOut);

				var text = new PIXI.Text(textArr[i], that.styleButtonBlueText); 
				text.x = button.width / 3.8;
				text.y = button.height / 3;

				button.addChild(text); 
				that.windowStage.addChild(button);
			}
		},
		
		borderRed: function()
		{
			var graphics = new PIXI.Graphics(); 
			graphics.lineStyle(2, 0xFF0000, 1);
			graphics.beginFill(0x000000, 0);
			graphics.drawRect(10, 10, 840, 710);
			graphics.lineStyle(0);
			graphics.beginFill(0xFFFF80, 1);
			graphics.drawCircle(50, 605,4);
			graphics.endFill();
			graphics.lineStyle(2, 0xFFFF80, 1);
			graphics.moveTo(50,605);
			graphics.lineTo(5, 605);
			graphics.moveTo(5, 605);
			graphics.lineTo(5, 725);
			graphics.moveTo(5, 725);
			graphics.lineTo(840, 725);
			graphics.lineStyle(0);
			graphics.beginFill(0xFFFF80, 1);
			graphics.drawCircle(840, 725,4);
			graphics.endFill();
			graphics.lineStyle(0);
			graphics.beginFill(0xFFFF80, 1);
			graphics.drawCircle(355, 680,4);
			graphics.endFill();
			graphics.lineStyle(2, 0xFFFF80, 1);
			graphics.moveTo(355, 680);
			graphics.lineTo(355, 725);
			graphics.lineStyle(0);
			graphics.beginFill(0xFFFF80, 1);
			graphics.drawCircle(855, 550, 4);
			graphics.endFill();
			graphics.lineStyle(2, 0xFFFF80, 1);
			graphics.moveTo(855,550);
			graphics.lineTo(855, 5);
			graphics.moveTo(855,5);
			graphics.lineTo(5, 5);
			graphics.lineStyle(0);
			graphics.beginFill(0xFFFF80, 1);
			graphics.drawCircle(5, 5, 4);
			graphics.endFill();
			that.windowStage.addChild(graphics);
		},
		
		desktopRed: function()
		{
			var graphics = new PIXI.Graphics(); 
			graphics.lineStyle(2, 0x800000, 1);
			graphics.beginFill(0x800000, 0.2);
			graphics.moveTo(15, 610);
			graphics.lineTo(350, 610);
			graphics.lineTo(350, 715);
			graphics.lineTo(15, 715);
			graphics.endFill();
			for(var i = 0; i < 35; i++)
			{
				graphics.lineStyle(1, 0x800000, 0.5);
				graphics.moveTo(15, 610+(3*i));
				graphics.lineTo(350, 610+(3*i));
			}
			that.windowStage.addChild(graphics);
			
			that.desktopLineGraphics = new PIXI.Graphics(); 
			that.desktopLineGraphics.lineStyle(10, 0x800000, 0.3);
			that.desktopLineGraphics.moveTo(15,615);
			that.desktopLineGraphics.lineTo(350, 615);
			that.windowStage.addChild(that.desktopLineGraphics);
		},
		
		droidRed: function()
		{
			var textureSprite = new PIXI.Sprite(parent.assets.getAsset("r2d2DroidRedRightTexture")); 
			textureSprite.position.x = 765; 
			textureSprite.position.y = 605; 
			textureSprite.scale.set(0.3);
			that.windowStage.addChild(textureSprite);
			
			var graphics = new PIXI.Graphics(); 
			graphics.lineStyle(2, 0xA63A24, 0.2);
			graphics.beginFill(0xA63A24, 0.2);
			graphics.moveTo(792, 620);
			graphics.lineTo(700, 455);
			graphics.lineTo(845, 455);
			graphics.lineTo(792, 620);
			graphics.endFill;
			that.windowStage.addChild(graphics);
			
			graphics = new PIXI.Graphics();
			for(var i = 0; i < 72; i++)
			{
				graphics.lineStyle(1, 0xA63A24, 0.2);
				graphics.moveTo(698, 239+(3*i));
				graphics.lineTo(846, 239+(3*i));
			}
			that.windowStage.addChild(graphics);
			
			that.messageLineGraphics = new PIXI.Graphics(); 
			that.messageLineGraphics.lineStyle(10, 0xA63A24, 0.3);
			that.messageLineGraphics.moveTo(698, 243);
			that.messageLineGraphics.lineTo(846, 243);
			that.windowStage.addChild(that.messageLineGraphics);
		},
		
		droidRedMessage: function()
		{
			that.textMessage = new PIXI.Text(parent.initialization.mapMessage["LastNews"][1], that.styleDroidRedText); 
			that.textMessage.x = 700; 
			that.textMessage.y = 240; 
			that.windowStage.addChild(that.textMessage);
		},
		
		buttonsRed: function()
		{
			var textArr = ["КОМАНДА", "НАСТРОЙКИ"];
			var nameArr = ["Command", "Settings"];
			
			for(var i = 0; i < textArr.length; i++)
			{
				var button = new PIXI.extras.MovieClip(parent.assets.getAsset("animTexButtonRed")); 
				button.name = nameArr[i];
				button.position.x = 360 + (200 * i); 
				button.position.y = 670; 
				button.interactive = true; 
				button.buttonMode = true; 
				button.loop = false; 
				button.animationSpeed = 0.2;
				button.onComplete = that.onButtonUpdate;
				button.tap = that.onButtonClick; 
				button.click = that.onButtonClick; 
				button.on('mouseover', that.onButtonOver);
				button.on('mouseout', that.onButtonOut);

				var text = new PIXI.Text(textArr[i], that.styleButtonRedText); 
				text.x = button.width / 3.8;
				text.y = button.height / 3;

				button.addChild(text); 
				that.windowStage.addChild(button);
			}
			
			textArr = ["НАЗАД В МЕНЮ", "ПРИГЛАСИТЬ"];
			nameArr = ["BackMenu", "Invite"];
			
			for(var i = 0; i < textArr.length; i++)
			{
				var button = new PIXI.extras.MovieClip(parent.assets.getAsset("animTexButtonRed")); 
				button.name = nameArr[i];
				button.position.x = 10; 
				button.position.y = 10 + (545 * i); 
				button.interactive = true; 
				button.buttonMode = true; 
				button.loop = false; 
				button.animationSpeed = 0.2;
				button.onComplete = that.onButtonUpdate;
				button.tap = that.onButtonClick; 
				button.click = that.onButtonClick; 
				button.on('mouseover', that.onButtonOver);
				button.on('mouseout', that.onButtonOut);

				var text = new PIXI.Text(textArr[i], that.styleButtonRedText); 
				text.x = button.width / 3.8;
				text.y = button.height / 3;

				button.addChild(text); 
				that.windowStage.addChild(button);
			}
		},
		
		onButtonOver: function(e)
		{
			this.isOver = true;
			this.gotoAndPlay(1);
		},
		
		onButtonOut: function(e)
		{
			this.isOver = false;
			this.gotoAndStop(0);
		},
		
		onButtonUpdate: function(e)
		{
			if(this.isOver)
			{
				this.gotoAndPlay(1);
			}else{
				this.gotoAndStop(0);
			}
		},
		
		onButtonClick: function(e)
		{
			switch (this.name)
			{
				case "Command":
					parent.commandShow();
					break;
				case "Settings":
					parent.settingsShow();
					break;
				case "BackMenu":
					parent.backmenuShow();
					break;
				case "Invite":
					parent.vkInvite();
					break;
				default:
					break;
			}
		},
		
		targetsCreate: function()
		{
			that.targetPlanetRed = new PIXI.Graphics();
			that.targetPlanetRed.lineStyle(2, 0xFF0000, 0.5);
			that.targetPlanetRed.beginFill(0xFF0000, 0.2);
			that.targetPlanetRed.moveTo(0, -5);
			that.targetPlanetRed.lineTo(-15, -55);
			that.targetPlanetRed.lineTo(15, -55);
			that.targetPlanetRed.lineTo(0, -5);
			that.targetPlanetRed.endFill;
			
			that.targetPlanetRed.lineStyle(2, 0xFF0000, 0.5);
			that.targetPlanetRed.beginFill(0xFF0000, 0.2);
			that.targetPlanetRed.moveTo(0, 5);
			that.targetPlanetRed.lineTo(-15, 55);
			that.targetPlanetRed.lineTo(15, 55);
			that.targetPlanetRed.lineTo(0, 5);
			that.targetPlanetRed.endFill;
			
			that.targetPlanetRed.lineStyle(2, 0xFF0000, 0.5);
			that.targetPlanetRed.beginFill(0xFF0000, 0.2);
			that.targetPlanetRed.moveTo(-5, 0);
			that.targetPlanetRed.lineTo(-55, -15);
			that.targetPlanetRed.lineTo(-55, 15);
			that.targetPlanetRed.lineTo(-5, 0);
			that.targetPlanetRed.endFill;
			
			that.targetPlanetRed.lineStyle(2, 0xFF0000, 0.5);
			that.targetPlanetRed.beginFill(0xFF0000, 0.2);
			that.targetPlanetRed.moveTo(5, 0);
			that.targetPlanetRed.lineTo(55, -15);
			that.targetPlanetRed.lineTo(55, 15);
			that.targetPlanetRed.lineTo(5, 0);
			that.targetPlanetRed.endFill;
			
			that.targetPlanetRed.position.x = 100;
			that.targetPlanetRed.position.y = 100;
			that.targetPlanetRed.visible = false;
			that.mapSprite.addChild(that.targetPlanetRed);
			
			that.targetPlanetBlue = new PIXI.Graphics();
			that.targetPlanetBlue.lineStyle(2, 0x0000FF, 0.5);
			that.targetPlanetBlue.beginFill(0x0000FF, 0.5);
			that.targetPlanetBlue.moveTo(0, -5);
			that.targetPlanetBlue.lineTo(-15, -55);
			that.targetPlanetBlue.lineTo(15, -55);
			that.targetPlanetBlue.lineTo(0, -5);
			that.targetPlanetBlue.endFill;
			
			that.targetPlanetBlue.lineStyle(2, 0x0000FF, 0.5);
			that.targetPlanetBlue.beginFill(0x0000FF, 0.5);
			that.targetPlanetBlue.moveTo(0, 5);
			that.targetPlanetBlue.lineTo(-15, 55);
			that.targetPlanetBlue.lineTo(15, 55);
			that.targetPlanetBlue.lineTo(0, 5);
			that.targetPlanetBlue.endFill;
			
			that.targetPlanetBlue.lineStyle(2, 0x0000FF, 0.5);
			that.targetPlanetBlue.beginFill(0x0000FF, 0.5);
			that.targetPlanetBlue.moveTo(-5, 0);
			that.targetPlanetBlue.lineTo(-55, -15);
			that.targetPlanetBlue.lineTo(-55, 15);
			that.targetPlanetBlue.lineTo(-5, 0);
			that.targetPlanetBlue.endFill;
			
			that.targetPlanetBlue.lineStyle(2, 0x0000FF, 0.5);
			that.targetPlanetBlue.beginFill(0x0000FF, 0.5);
			that.targetPlanetBlue.moveTo(5, 0);
			that.targetPlanetBlue.lineTo(55, -15);
			that.targetPlanetBlue.lineTo(55, 15);
			that.targetPlanetBlue.lineTo(5, 0);
			that.targetPlanetBlue.endFill;
			
			that.targetPlanetBlue.position.x = 100;
			that.targetPlanetBlue.position.y = 100;
			that.targetPlanetBlue.visible = false;
			that.mapSprite.addChild(that.targetPlanetBlue);
		},
		
		targetSearch: function()
		{
			var target = new Object();
			target["planetUser"] = "";
			target["indexUser"] = 1000;
			target["planetAI"] = "";
			target["indexAI"] = 1000;
			
			for(var key in parent.initialization.planets)
			{
				if(parent.config.side === that.SIDE_JEDI)
				{
				   if(parent.initialization.planets[key].status !== parent.initialization.USER_PLANET_QUEST_COMPLETE_JEDI)
				   {
						var hitCount = 0;
						hitCount += parent.initialization.personages[parent.initialization.planets[key].redPersonage1].hitAttack1 
								+ parent.initialization.personages[parent.initialization.planets[key].redPersonage1].hitAttack2 
								+ parent.initialization.personages[parent.initialization.planets[key].redPersonage1].hitAttack3 
								+ parent.initialization.personages[parent.initialization.planets[key].redPersonage1].hitAttack4
								+ parent.initialization.personages[parent.initialization.planets[key].redPersonage1].hitAttack5;
						hitCount += parent.initialization.personages[parent.initialization.planets[key].redPersonage2].hitAttack1
								+ parent.initialization.personages[parent.initialization.planets[key].redPersonage2].hitAttack2
								+ parent.initialization.personages[parent.initialization.planets[key].redPersonage2].hitAttack3
								+ parent.initialization.personages[parent.initialization.planets[key].redPersonage2].hitAttack4
								+ parent.initialization.personages[parent.initialization.planets[key].redPersonage2].hitAttack5;
						hitCount += parent.initialization.personages[parent.initialization.planets[key].redPersonage3].hitAttack1
								+ parent.initialization.personages[parent.initialization.planets[key].redPersonage3].hitAttack2
								+ parent.initialization.personages[parent.initialization.planets[key].redPersonage3].hitAttack3
								+ parent.initialization.personages[parent.initialization.planets[key].redPersonage3].hitAttack4
								+ parent.initialization.personages[parent.initialization.planets[key].redPersonage3].hitAttack5;
						hitCount /= 10;
						if(hitCount < target["indexUser"])
						{
						   target["planetUser"] = parent.initialization.planets[key].id; 
						   target["indexUser"] = hitCount;
						}
				   }
				   if(parent.initialization.planets[key].status !== parent.initialization.USER_PLANET_QUEST_COMPLETE_SITH)
				   {
						var hitCount = 0;
						hitCount += parent.initialization.personages[parent.initialization.planets[key].bluePersonage1].hitAttack1 
								+ parent.initialization.personages[parent.initialization.planets[key].bluePersonage1].hitAttack2 
								+ parent.initialization.personages[parent.initialization.planets[key].bluePersonage1].hitAttack3 
								+ parent.initialization.personages[parent.initialization.planets[key].bluePersonage1].hitAttack4
								+ parent.initialization.personages[parent.initialization.planets[key].bluePersonage1].hitAttack5;
						hitCount += parent.initialization.personages[parent.initialization.planets[key].bluePersonage2].hitAttack1
								+ parent.initialization.personages[parent.initialization.planets[key].bluePersonage2].hitAttack2
								+ parent.initialization.personages[parent.initialization.planets[key].bluePersonage2].hitAttack3
								+ parent.initialization.personages[parent.initialization.planets[key].bluePersonage2].hitAttack4
								+ parent.initialization.personages[parent.initialization.planets[key].bluePersonage2].hitAttack5;
						hitCount += parent.initialization.personages[parent.initialization.planets[key].bluePersonage3].hitAttack1
								+ parent.initialization.personages[parent.initialization.planets[key].bluePersonage3].hitAttack2
								+ parent.initialization.personages[parent.initialization.planets[key].bluePersonage3].hitAttack3
								+ parent.initialization.personages[parent.initialization.planets[key].bluePersonage3].hitAttack4
								+ parent.initialization.personages[parent.initialization.planets[key].bluePersonage3].hitAttack5;
						hitCount /= 10;
						if(hitCount < target["indexAI"])
						{
						   target["planetAI"] = parent.initialization.planets[key].id; 
						   target["indexAI"] = hitCount;
						}
					}
				}
				
				if(parent.config.side === that.SIDE_SITH)
				{
				   if(parent.initialization.planets[key].status !== parent.initialization.USER_PLANET_QUEST_COMPLETE_SITH)
				   {
						var hitCount = 0;
						hitCount += parent.initialization.personages[parent.initialization.planets[key].bluePersonage1].hitAttack1 
								+ parent.initialization.personages[parent.initialization.planets[key].bluePersonage1].hitAttack2 
								+ parent.initialization.personages[parent.initialization.planets[key].bluePersonage1].hitAttack3 
								+ parent.initialization.personages[parent.initialization.planets[key].bluePersonage1].hitAttack4
								+ parent.initialization.personages[parent.initialization.planets[key].bluePersonage1].hitAttack5;
						hitCount += parent.initialization.personages[parent.initialization.planets[key].bluePersonage2].hitAttack1
								+ parent.initialization.personages[parent.initialization.planets[key].bluePersonage2].hitAttack2
								+ parent.initialization.personages[parent.initialization.planets[key].bluePersonage2].hitAttack3
								+ parent.initialization.personages[parent.initialization.planets[key].bluePersonage2].hitAttack4
								+ parent.initialization.personages[parent.initialization.planets[key].bluePersonage2].hitAttack5;
						hitCount += parent.initialization.personages[parent.initialization.planets[key].bluePersonage3].hitAttack1
								+ parent.initialization.personages[parent.initialization.planets[key].bluePersonage3].hitAttack2
								+ parent.initialization.personages[parent.initialization.planets[key].bluePersonage3].hitAttack3
								+ parent.initialization.personages[parent.initialization.planets[key].bluePersonage3].hitAttack4
								+ parent.initialization.personages[parent.initialization.planets[key].bluePersonage3].hitAttack5;
						hitCount /= 10;
						if(hitCount < target["indexUser"])
						{
						   target["planetUser"] = parent.initialization.planets[key].id; 
						   target["indexUser"] = hitCount;
						}
				   }
				   if(parent.initialization.planets[key].status !== parent.initialization.USER_PLANET_QUEST_COMPLETE_JEDI)
				   {
						var hitCount = 0;
						hitCount += parent.initialization.personages[parent.initialization.planets[key].redPersonage1].hitAttack1 
								+ parent.initialization.personages[parent.initialization.planets[key].redPersonage1].hitAttack2 
								+ parent.initialization.personages[parent.initialization.planets[key].redPersonage1].hitAttack3 
								+ parent.initialization.personages[parent.initialization.planets[key].redPersonage1].hitAttack4
								+ parent.initialization.personages[parent.initialization.planets[key].redPersonage1].hitAttack5;
						hitCount += parent.initialization.personages[parent.initialization.planets[key].redPersonage2].hitAttack1
								+ parent.initialization.personages[parent.initialization.planets[key].redPersonage2].hitAttack2
								+ parent.initialization.personages[parent.initialization.planets[key].redPersonage2].hitAttack3
								+ parent.initialization.personages[parent.initialization.planets[key].redPersonage2].hitAttack4
								+ parent.initialization.personages[parent.initialization.planets[key].redPersonage2].hitAttack5;
						hitCount += parent.initialization.personages[parent.initialization.planets[key].redPersonage3].hitAttack1
								+ parent.initialization.personages[parent.initialization.planets[key].redPersonage3].hitAttack2
								+ parent.initialization.personages[parent.initialization.planets[key].redPersonage3].hitAttack3
								+ parent.initialization.personages[parent.initialization.planets[key].redPersonage3].hitAttack4
								+ parent.initialization.personages[parent.initialization.planets[key].redPersonage3].hitAttack5;
						hitCount /= 10;
						if(hitCount < target["indexAI"])
						{
						   target["planetAI"] = parent.initialization.planets[key].id; 
						   target["indexAI"] = hitCount;
						}
					}
				}
			}

			if(parent.config.side === that.SIDE_JEDI)
			{
                            that.blueTargetsShow(target["planetUser"]);
                            if(parent.config.stopAI === false) that.redTargetsShow(target["planetAI"]);
                            that.targetAI = target["planetAI"];

                            if(parent.initialization.userTotalBattle === 0)
                            {
                                parent.initialization.mapMessage["LastNews"][0] = "Меня зовут R2D2, рад вас приветствовать.\n\nКорусант является основной целью Ситов." + " В данное время Дарт Вейдер напали на " + parent.initialization.planets[target["planetAI"]].name + " вы можите попытаться помешать ему. \n\nИли выполните миссию " + parent.initialization.planets[target["planetUser"]].name + " и получите нового союзника.";
                            }else{
                                if(parent.config.stopAI === false) parent.initialization.mapMessage["LastNews"][0] = "На планете " + parent.initialization.planets[target["planetUser"]].name + " нуждаются в нашей помощи. Выполните миссию "  + parent.initialization.planets[target["planetUser"]].name + " и вам будет доступен новый союзник. \n\nТак же мы получаем сигнал с планеты " + parent.initialization.planets[target["planetAI"]].name + " о вторжении Дарт Вейдера. Вы можите предпринять попытку отбить нападение на " + parent.initialization.planets[target["planetAI"]].name + ".";
                                else parent.initialization.mapMessage["LastNews"][0] = "На планете " + parent.initialization.planets[target["planetUser"]].name + " нуждаются в нашей помощи. Выполните миссию "  + parent.initialization.planets[target["planetUser"]].name + " и вам будет доступен новый союзник. \n\nПоражение Дарт Вейдера в прошлой битве даёт вам преимущество в один ход.";
                            }

                            that.textMessage.text = parent.initialization.mapMessage["LastNews"][0];
			}
			if(parent.config.side === that.SIDE_SITH)
			{
                            if(parent.config.stopAI === false) that.blueTargetsShow(target["planetAI"]);
                            that.redTargetsShow(target["planetUser"]);
                            that.targetAI = target["planetAI"];

                            if(parent.initialization.userTotalBattle === 0)
                            {
                                parent.initialization.mapMessage["LastNews"][1] = "Меня зовут R3-S6, приветствую тебя мой повелитель. \n\nДжедаи хотят разрушить Звезду смерти и помешать нашим планам." + " Они направелись на " + parent.initialization.planets[target["planetAI"]].name + " можем помешать им. \n\nИли напасть на " + parent.initialization.planets[target["planetUser"]].name + " и получите нового союзника.";
                            }else{
                                if(parent.config.stopAI === false) parent.initialization.mapMessage["LastNews"][1] = "Оборона планеты " + parent.initialization.planets[target["planetUser"]].name + " слаба мы с лёгкостью захватим её и вам будет доступен новый союзник. \n\nТак же наш шпион докладывает что Джедаи направились на " + parent.initialization.planets[target["planetAI"]].name + " можем помешать им.";
                                else parent.initialization.mapMessage["LastNews"][1] = "Оборона планеты " + parent.initialization.planets[target["planetUser"]].name + " слаба мы с лёгкостью захватим её и вам будет доступен новый союзник. \n\nПосле нашей победы над  Люком Скайуокером, Джедаи отступили и у нас есть преимущество в один ход.";
                            }

                            that.textMessage.text = parent.initialization.mapMessage["LastNews"][1];
			}
		},
	
		blueTargetsShow: function(planetName)
		{
			that.targetPlanetBlue.position.x = parent.initialization.mapPlanets[planetName][1].position.x + 40;
			that.targetPlanetBlue.position.y = parent.initialization.mapPlanets[planetName][1].position.y + 40;
			that.targetPlanetBlue.visible = true;
		},

		redTargetsShow: function(planetName)
		{
			that.targetPlanetRed.position.x = parent.initialization.mapPlanets[planetName][1].position.x + 40;
			that.targetPlanetRed.position.y = parent.initialization.mapPlanets[planetName][1].position.y + 40;
			that.targetPlanetRed.visible = true;
		},
	
		tweenStart: function()
		{
			createjs.Tween.get(that.desktopLineGraphics, {loop: true}) 
				.to({x: 0, y: 95}, 2500, createjs.Ease.getPowInOut(3));
			createjs.Tween.get(that.messageLineGraphics, {loop: true}) 
				.to({x: 0, y: 205}, 2500, createjs.Ease.getPowInOut(3));
			 createjs.Tween.get(that.targetPlanetBlue, {loop: true}) 
				.to({rotation: 3.15 }, 2500, createjs.Ease.getPowInOut(1));
			createjs.Tween.get(that.targetPlanetRed, {loop: true}) 
				.to({rotation: 3.15 }, 2500, createjs.Ease.getPowInOut(1));
			
			createjs.Ticker.setFPS(60);
		},
		
		tweenStop: function()
		{
			createjs.Tween.removeTweens(that.desktopLineGraphics);
			createjs.Tween.removeTweens(that.messageLineGraphics);
			createjs.Tween.removeTweens(that.targetPlanetBlue);
			createjs.Tween.removeTweens(that.targetPlanetRed);
		},
		
		show: function()
		{
			that.tweenStart();
			return that.windowStage;
		},
		
		close: function()
		{
			that.tweenStop();
			
			for(var child in that.mapSprite.children) that.mapSprite.removeChild(that.mapSprite.children[child]);
			that.mapSprite.destroy();
			delete that.mapSprite.children;
			
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

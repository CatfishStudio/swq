
/* == START FILE ========================================================= */


var Command = function(parent)
{
	var that = {
		windowStage: null,
		spaceBackground: null,
		lineAnimPersonageDesktopGraphics: null,
		messageLineGraphics: null,
		styleButtonBlueText: { font : 'bold 14px Arial', fill : '#FFFFFF', stroke : '#0090F0', strokeThickness : 1, wordWrap : true, wordWrapWidth : 200 },
		styleButtonRedText: { font : 'bold 14px Arial', fill : '#FFFFFF', stroke : '#880000', strokeThickness : 1, wordWrap : true, wordWrapWidth : 200 }, 
		styledescriptionBlueText: { font : 'bold 14px Arial', fill : '#FFFFFF', stroke : '#0090F0', strokeThickness : 1, wordWrap : true, wordWrapWidth : 495 }, 
		styledescriptionRedText: { font : 'bold 14px Arial', fill : '#FFFFFF', stroke : '#880000', strokeThickness : 1, wordWrap : true, wordWrapWidth : 495 },
		styleDroidBlueText: { font : 'bold 14px Arial', fill : '#C4DEFB', stroke : '#0090F0', strokeThickness : 1, wordWrap : true, wordWrapWidth : 270 },
		styleDroidRedText: { font : 'bold 14px Arial', fill : '#EDCDCB', stroke : '#880000', strokeThickness : 1, wordWrap : true, wordWrapWidth : 270 }, 
		experiencePointsText: null,

		listCommand: [],
		listPersonage: [],
		desktopStage: null,
		tapeStage: null,
		tapePanelButtonsStage: null,
		selectPersonageID: null,
		selectPersonageIndex: null,
		
		SIDE_JEDI: "side_jedi",
		SIDE_SITH: "side_sith",
		
		create: function()
		{
			that.windowStage = new PIXI.Container();
			
			if(parent.config.side === that.SIDE_JEDI)
			{
				that.backgroundBlue(); 
				that.desktopBlue();
				that.borderBlue();
				that.droidBlue();
				that.blueCommand();
				that.tapeMask();
				that.tapeBlue();
				that.tapeButton();
				that.buttonsBlue();
			}
			if(parent.config.side === that.SIDE_SITH)
			{
				that.backgroundRed();
				that.desktopRed();
				that.borderRed();
				that.droidRed();
				that.redCommand();
				that.tapeMask();
				that.tapeRed();
				that.tapeButton();
				that.buttonsRed();
			}
		},
		
		
		backgroundBlue: function()
		{
			that.spaceBackground = new PIXI.Sprite(parent.assets.getAsset("mapSpaceBlueTexture")); 
			that.spaceBackground.position.x = -82; 
			that.spaceBackground.position.y = -19; 
			that.windowStage.addChild(that.spaceBackground);
			//cmdAnimSpaceTween();
		},
		
		borderBlue: function()
		{
			var graphics = new PIXI.Graphics(); 

			graphics.lineStyle(2, 0x0000FF, 1);
			graphics.beginFill(0x000000, 0);
			graphics.drawRect(10, 10, 840, 710);

			graphics.lineStyle(0);
			graphics.beginFill(0xFFFFFF, 1);
			graphics.drawCircle(555, 600,4);
			graphics.endFill();

			graphics.lineStyle(2, 0xFFFFFF, 1);
			graphics.moveTo(555, 600);
			graphics.lineTo(5, 600);
			
			graphics.moveTo(5, 600);
			graphics.lineTo(5, 725);
			graphics.moveTo(5, 725);
			graphics.lineTo(855, 725);
			graphics.moveTo(855, 725);
			graphics.lineTo(855, 665);
			graphics.moveTo(855, 665);
			graphics.lineTo(650, 665);

			graphics.lineStyle(0);
			graphics.beginFill(0xFFFFFF, 1);
			graphics.drawCircle(650, 665,4);
			graphics.endFill();

			graphics.lineStyle(0);
			graphics.beginFill(0xFFFFFF, 1);
			graphics.drawCircle(20, 15,4);
			graphics.endFill();

			graphics.lineStyle(2, 0xFFFFFF, 1);
			graphics.moveTo(20, 15);
			graphics.lineTo(550, 15);
			
			graphics.moveTo(550, 15);
			graphics.lineTo(570, 5);
			
			graphics.moveTo(570, 5);
			graphics.lineTo(855, 5);
			graphics.moveTo(855, 5);
			graphics.lineTo(855, 50);
			graphics.moveTo(855, 50);
			graphics.lineTo(650, 50);

			graphics.lineStyle(0);
			graphics.beginFill(0xFFFFFF, 1);
			graphics.drawCircle(650, 50,4);
			graphics.endFill();
			
			that.windowStage.addChild(graphics);
			
			that.experiencePointsText = new PIXI.Text("КОМАНДА. Очки опыта: " + parent.initialization.userExperiencePoints, that.styleButtonBlueText); 
			that.experiencePointsText.x = 655;
			that.experiencePointsText.y = 30;
			that.windowStage.addChild(that.experiencePointsText);
		},
		
		buttonsBlue: function()
		{
			var button = new PIXI.extras.MovieClip(parent.assets.getAsset("animTexButtonBlue"));
			button.name = "Closed";
			button.position.x = 650; 
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
			
			var text = new PIXI.Text("ЗАКРЫТЬ", that.styleButtonBlueText); 
			text.x = button.width / 3.2;
			text.y = button.height / 3;

			button.addChild(text); 
			that.windowStage.addChild(button);
		},
		
		desktopBlue: function()
		{
			var graphics = new PIXI.Graphics();
    
			graphics.lineStyle(2, 0x0000FF, 1);
			graphics.beginFill(0x0000FF, 0.2);
			graphics.moveTo(25, 600);
			graphics.lineTo(550, 600);
			graphics.lineTo(550, 715);
			graphics.lineTo(25, 715);
			graphics.endFill;
			
			graphics.lineStyle(2, 0x0000FF, 1);
			graphics.beginFill(0x0000FF, 0.2);
			graphics.moveTo(655, 50);
			graphics.lineTo(800, 50);
			graphics.lineTo(800, 350);
			graphics.lineTo(650, 350);
			graphics.endFill;
			
			that.windowStage.addChild(graphics);
		},
		
		droidBlue: function()
		{
			var textureSprite = new PIXI.Sprite(parent.assets.getAsset("r2d2DroidBlueRightTexture")); 
			textureSprite.position.x = 765; 
			textureSprite.position.y = 550; 
			textureSprite.scale.set(0.3);
			that.windowStage.addChild(textureSprite);
			
			var graphics = new PIXI.Graphics(); 
			graphics.lineStyle(2, 0x0090F0, 0.2);
			graphics.beginFill(0x0090F0, 0.2);
			graphics.moveTo(795, 570);
			graphics.lineTo(570, 525);
			graphics.lineTo(840, 525);
			graphics.lineTo(795, 570);
			graphics.endFill;
			that.windowStage.addChild(graphics);
			
			for(var i = 0; i < 50; i++)
			{
				graphics.lineStyle(1, 0x0090F0, 0.2);
				graphics.moveTo(560, 375+(3*i));
				graphics.lineTo(840, 375+(3*i));
			}
			that.windowStage.addChild(graphics);
			
			that.messageLineGraphics = new PIXI.Graphics(); 
			that.messageLineGraphics.lineStyle(10, 0x0090F0, 0.3);
			that.messageLineGraphics.moveTo(560, 380);
			that.messageLineGraphics.lineTo(840, 380);
			that.windowStage.addChild(that.messageLineGraphics);
			//cmdMessageLineGraphicsTween();
			
			that.textMessage = new PIXI.Text("Это окно вашей команды.\n\nТут вы можите убирать и добавлять персонажей в команду.\n\nВы можите улучшать характеристики персонажей за счёт полученных очков опыта.", that.styleDroidBlueText); 
			that.textMessage.x = 565; 
			that.textMessage.y = 375; 
			that.windowStage.addChild(that.textMessage);
		},
		
		backgroundRed: function()
		{
			that.spaceBackground = new PIXI.Sprite(parent.assets.getAsset("mapSpaceRedTexture")); 
			that.spaceBackground.position.x = -82; 
			that.spaceBackground.position.y = -19; 
			that.windowStage.addChild(that.spaceBackground);
			//cmdAnimSpaceTween();
		},
		
		borderRed: function()
		{
			var graphics = new PIXI.Graphics(); 

			graphics.lineStyle(2, 0xFF0000, 1);
			graphics.beginFill(0x000000, 0);
			graphics.drawRect(10, 10, 840, 710);

			graphics.lineStyle(0);
			graphics.beginFill(0xFFFF80, 1);
			graphics.drawCircle(555, 600,4);
			graphics.endFill();

			graphics.lineStyle(2, 0xFFFF80, 1);
			graphics.moveTo(555, 600);
			graphics.lineTo(5, 600);
			
			graphics.moveTo(5, 600);
			graphics.lineTo(5, 725);
			graphics.moveTo(5, 725);
			graphics.lineTo(855, 725);
			graphics.moveTo(855, 725);
			graphics.lineTo(855, 665);
			graphics.moveTo(855, 665);
			graphics.lineTo(650, 665);

			graphics.lineStyle(0);
			graphics.beginFill(0xFFFF80, 1);
			graphics.drawCircle(650, 665,4);
			graphics.endFill();

			graphics.lineStyle(0);
			graphics.beginFill(0xFFFF80, 1);
			graphics.drawCircle(20, 15,4);
			graphics.endFill();

			graphics.lineStyle(2, 0xFFFF80, 1);
			graphics.moveTo(20, 15);
			graphics.lineTo(550, 15);
			
			graphics.moveTo(550, 15);
			graphics.lineTo(570, 5);
			
			graphics.moveTo(570, 5);
			graphics.lineTo(855, 5);
			graphics.moveTo(855, 5);
			graphics.lineTo(855, 50);
			graphics.moveTo(855, 50);
			graphics.lineTo(650, 50);

			graphics.lineStyle(0);
			graphics.beginFill(0xFFFF80, 1);
			graphics.drawCircle(650, 50,4);
			graphics.endFill();
			
			that.windowStage.addChild(graphics);
			
			that.experiencePointsText = new PIXI.Text("КОМАНДА. Очки опыта: " + parent.initialization.userExperiencePoints, that.styleButtonRedText); 
			that.experiencePointsText.x = 655;
			that.experiencePointsText.y = 30;
			that.windowStage.addChild(that.experiencePointsText);
		},
		
		buttonsRed: function()
		{
			var button = new PIXI.extras.MovieClip(parent.assets.getAsset("animTexButtonRed"));
			button.name = "Closed";
			button.position.x = 650; 
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
			
			var text = new PIXI.Text("ЗАКРЫТЬ", that.styleButtonRedText); 
			text.x = button.width / 3.2;
			text.y = button.height / 3;

			button.addChild(text); 
			that.windowStage.addChild(button);
		},
		
		desktopRed: function()
		{
			var graphics = new PIXI.Graphics();
    
			graphics.lineStyle(2, 0x800000, 1);
			graphics.beginFill(0x800000, 0.2);
			graphics.moveTo(25, 600);
			graphics.lineTo(550, 600);
			graphics.lineTo(550, 715);
			graphics.lineTo(25, 715);
			graphics.endFill;
			
			graphics.lineStyle(2, 0x800000, 1);
			graphics.beginFill(0x800000, 0.2);
			graphics.moveTo(655, 50);
			graphics.lineTo(800, 50);
			graphics.lineTo(800, 350);
			graphics.lineTo(650, 350);
			graphics.endFill;
			
			that.windowStage.addChild(graphics);
		},
		
		droidRed: function()
		{
			var textureSprite = new PIXI.Sprite(parent.assets.getAsset("r2d2DroidRedRightTexture")); 
			textureSprite.position.x = 765; 
			textureSprite.position.y = 550; 
			textureSprite.scale.set(0.3);
			that.windowStage.addChild(textureSprite);
			
			var graphics = new PIXI.Graphics(); 
			graphics.lineStyle(2, 0xA63A24, 0.2);
			graphics.beginFill(0xA63A24, 0.2);
			graphics.moveTo(795, 570);
			graphics.lineTo(570, 525);
			graphics.lineTo(840, 525);
			graphics.lineTo(795, 570);
			graphics.endFill;
			that.windowStage.addChild(graphics);
			
			for(var i = 0; i < 50; i++)
			{
				graphics.lineStyle(1, 0xA63A24, 0.2);
				graphics.moveTo(560, 375+(3*i));
				graphics.lineTo(840, 375+(3*i));
			}
			that.windowStage.addChild(graphics);
			
			that.messageLineGraphics = new PIXI.Graphics(); 
			that.messageLineGraphics.lineStyle(10, 0xA63A24, 0.3);
			that.messageLineGraphics.moveTo(560, 380);
			that.messageLineGraphics.lineTo(840, 380);
			that.windowStage.addChild(that.messageLineGraphics);
			//cmdMessageLineGraphicsTween();
			
			that.textMessage = new PIXI.Text("Это окно вашей команды.\n\nТут вы можите убирать и добавлять персонажей в команду.\n\nВы можите улучшать характеристики персонажей за счёт полученных очков опыта.", that.styleDroidRedText); 
			that.textMessage.x = 565; 
			that.textMessage.y = 375; 
			that.windowStage.addChild(that.textMessage);
		},
		
		blueCommand: function(select)
		{
			if (select === undefined) {
				select = 0;
			}
			
			if(that.listCommand.length === 0)
			{
					that.listCommand = [];
			}else{
				for(var i = 0; i < that.listCommand.length; i++)
				{
					that.windowStage.removeChild(that.listCommand[i]);
				}
				that.listCommand = [];
			}
			
			var selectIndex = select;
			var index = 0;
			for(var key in parent.initialization.commandUser)
			{
				if(parent.initialization.commandUser[key] !== null)
				{
					var graphics = new PIXI.Graphics(); 
					graphics.lineStyle(2, 0x0000FF, 0.2);
					graphics.beginFill(0x0000FF, 0.2);
					graphics.drawRect(690, 60 + (100 * index), 75, 75);
					graphics.endFill;

					var textureSprite = new PIXI.Sprite(parent.assets.getAsset("heroesTextures")[parent.initialization.commandUser[key]][3]); 
					textureSprite.name = parent.initialization.commandUser[key];
					textureSprite.index = index;
					textureSprite.position.x = 690; 
					textureSprite.position.y = 60  + (100 * index); 
					textureSprite.interactive = true; 
					textureSprite.buttonMode = true;
					textureSprite.tap = that.onBlueIconCommandClick; 
					textureSprite.click = that.onBlueIconCommandClick; 
					graphics.addChild(textureSprite);
					
					var border = new PIXI.Graphics();
					if(index === selectIndex)
					{
						border.lineStyle(2, 0xFFFFFF, 0.5);
						that.bluePersonageShow(parent.initialization.commandUser[key]);
						that.selectPersonageID = parent.initialization.commandUser[key];
						that.selectPersonageIndex = index;
					} else {
						border.lineStyle(2, 0x0000FF, 0.2);
					}
					border.drawRect(690, 60 + (100 * index), 75, 75);
					graphics.addChild(border);
					
					that.listCommand.push(graphics);
					that.windowStage.addChild(that.listCommand[index]);
				} else{
					var graphics = new PIXI.Graphics(); 
					graphics.lineStyle(2, 0x0000FF, 0.2);
					graphics.beginFill(0x0000FF, 0.2);
					graphics.drawRect(690, 60 + (100 * index), 75, 75);
					graphics.endFill;
					that.listCommand.push(graphics);
					that.windowStage.addChild(that.listCommand[index]);
					if(select === 0 && selectIndex < 2) selectIndex++;
				}
				index++;
			}
		},
		
		onBlueIconCommandClick: function()
		{
			that.selectPersonageID = this.name;
			that.selectPersonageIndex = this.index;
			that.blueCommand(this.index);
			that.tapeBlue(-1);
		},
		
		bluePersonageShow: function(id)
		{
			that.windowStage.removeChild(that.desktopStage);
			if(id !== null)
			{
				that.desktopStage = new PIXI.Container();
				
				var graphics = new PIXI.Graphics();
				graphics.lineStyle(2, 0x0000FF, 1);
				graphics.beginFill(0x0000FF, 0.2);
				graphics.moveTo(25, 20);
				graphics.lineTo(550, 20);
				graphics.lineTo(550, 575);
				graphics.lineTo(25, 575);
				graphics.endFill;
				that.desktopStage.addChild(graphics);
				
				var sprite = new PIXI.Sprite(parent.assets.getAsset("heroesTextures")[id][1]);
				sprite.position.x = 25;
				sprite.position.y = 50;
				that.desktopStage.addChild(sprite);
				
				graphics = new PIXI.Graphics();
				for(var i = 0; i < 185; i++)
				{
					graphics.lineStyle(1, 0x0000FF, 0.5);
					graphics.moveTo(25, 20+(3*i));
					graphics.lineTo(550, 20+(3*i));
				}
				that.desktopStage.addChild(graphics);
				
				that.lineAnimPersonageDesktopGraphics = new PIXI.Graphics(); 
				that.lineAnimPersonageDesktopGraphics.lineStyle(10, 0x0000FF, 0.3);
				that.lineAnimPersonageDesktopGraphics.moveTo(25, 25);
				that.lineAnimPersonageDesktopGraphics.lineTo(550, 25);
				that.desktopStage.addChild(that.lineAnimPersonageDesktopGraphics);
				//cmdLineAnimPersonageDesktopGraphicsTween();
				
				var text = new PIXI.Text(parent.initialization.personages[id].name, that.styleButtonBlueText); 
				text.x = 50; text.y = 30;
				that.desktopStage.addChild(text);

				text = new PIXI.Text("Характеристики:", that.styleButtonBlueText); 
				text.x = 300; text.y = 100;
				that.desktopStage.addChild(text);
				
				var life = (parent.initialization.personages[parent.initialization.personages[id].id].hitDefense1 + parent.initialization.personages[parent.initialization.personages[id].id].hitDefense2 + parent.initialization.personages[parent.initialization.personages[id].id].hitDefense3 + parent.initialization.personages[parent.initialization.personages[id].id].hitDefense4 + parent.initialization.personages[parent.initialization.personages[id].id].hitDefense5) / 10 * 50;
				life = Math.round(life);
				text = new PIXI.Text("Здоровье: " + life, that.styleButtonBlueText); 
				text.x = 330; text.y = 130;
				that.desktopStage.addChild(text);

				sprite = new PIXI.Sprite(parent.assets.getAsset("hit1Texture"));
				sprite.position.x = 300; sprite.position.y = 150; sprite.scale.set(0.3);
				that.desktopStage.addChild(sprite);
				text = new PIXI.Text("Кристал ловкости:", that.styleButtonBlueText); 
				text.x = 330; text.y = 155;
				that.desktopStage.addChild(text);
				text = new PIXI.Text(parent.initialization.personages[parent.initialization.personages[id].id].hitDefense1, that.styleButtonBlueText); 
				text.x = 480; text.y = 155;
				that.desktopStage.addChild(text);

				sprite = new PIXI.Sprite(parent.assets.getAsset("hit2Texture"));
				sprite.position.x = 300; sprite.position.y = 175; sprite.scale.set(0.3);
				that.desktopStage.addChild(sprite);
				text = new PIXI.Text("Кристал тьмы:", that.styleButtonBlueText); 
				text.x = 330; text.y = 180;
				that.desktopStage.addChild(text);
				text = new PIXI.Text(parent.initialization.personages[parent.initialization.personages[id].id].hitDefense2, that.styleButtonBlueText); 
				text.x = 480; text.y = 180;
				that.desktopStage.addChild(text);

				sprite = new PIXI.Sprite(parent.assets.getAsset("hit3Texture"));
				sprite.position.x = 300; sprite.position.y = 200; sprite.scale.set(0.3);
				that.desktopStage.addChild(sprite);
				text = new PIXI.Text("Кристал жизни:", that.styleButtonBlueText); 
				text.x = 330; text.y = 205;
				that.desktopStage.addChild(text);
				text = new PIXI.Text(parent.initialization.personages[parent.initialization.personages[id].id].hitDefense3, that.styleButtonBlueText); 
				text.x = 480; text.y = 205;
				that.desktopStage.addChild(text);

				sprite = new PIXI.Sprite(parent.assets.getAsset("hit4Texture"));
				sprite.position.x = 300; sprite.position.y = 225; sprite.scale.set(0.3);
				that.desktopStage.addChild(sprite);
				text = new PIXI.Text("Кристал света:", that.styleButtonBlueText); 
				text.x = 330; text.y = 230;
				that.desktopStage.addChild(text);
				text = new PIXI.Text(parent.initialization.personages[parent.initialization.personages[id].id].hitDefense4, that.styleButtonBlueText); 
				text.x = 480; text.y = 230;
				that.desktopStage.addChild(text);

				sprite = new PIXI.Sprite(parent.assets.getAsset("hit5Texture"));
				sprite.position.x = 300; sprite.position.y = 250; sprite.scale.set(0.3);
				that.desktopStage.addChild(sprite);
				text = new PIXI.Text("Кристал интеллекта:", that.styleButtonBlueText); 
				text.x = 330; text.y = 255;
				that.desktopStage.addChild(text);
				text = new PIXI.Text(parent.initialization.personages[parent.initialization.personages[id].id].hitDefense5, that.styleButtonBlueText); 
				text.x = 480; text.y = 255;
				that.desktopStage.addChild(text);

				text = new PIXI.Text(parent.initialization.personages[id].description, that.styledescriptionBlueText); 
				text.x = 50;
				text.y = 550 - text.height;
				that.desktopStage.addChild(text);
				
				if(parent.initialization.personages[parent.initialization.personages[id].id].command === true) that.blueButtonRemovePersonage();
				else that.blueButtonSelectPersonage();

				that.experiencePointsButtons();

				that.windowStage.addChild(that.desktopStage);
			}else{
				var graphics = new PIXI.Graphics();
				graphics.lineStyle(2, 0x0000FF, 1);
				graphics.beginFill(0x0000FF, 0.2);
				graphics.moveTo(25, 20);
				graphics.lineTo(550, 20);
				graphics.lineTo(550, 575);
				graphics.lineTo(25, 575);
				graphics.endFill;
				for(var i = 0; i < 185; i++)
				{
					graphics.lineStyle(1, 0x0000FF, 0.5);
					graphics.moveTo(25, 20+(3*i));
					graphics.lineTo(550, 20+(3*i));
				}
				that.windowStage.addChild(graphics);
			}
		},
		
		blueButtonRemovePersonage: function()
		{
			var button = new PIXI.extras.MovieClip(parent.assets.getAsset("animTexButtonBlue"));
			button.name = "Remove";
			button.position.x = 350; 
			button.position.y = 25; 
			button.interactive = true; 
			button.buttonMode = true; 
			button.loop = false; 
			button.animationSpeed = 0.2;
			button.onComplete = that.onButtonUpdate;
			button.tap = that.onButtonClick; 
			button.click = that.onButtonClick; 
			button.on('mouseover', that.onButtonOver);
			button.on('mouseout', that.onButtonOut);
			
			var text = new PIXI.Text("УБРАТЬ ИЗ СПИСКА", that.styleButtonBlueText); 
			text.x = button.width / 6.5;
			text.y = button.height / 3;

			button.addChild(text); 
			that.desktopStage.addChild(button);
		},
		
		blueButtonSelectPersonage: function()
		{
			var button = new PIXI.extras.MovieClip(parent.assets.getAsset("animTexButtonBlue"));
			button.name = "Select";
			button.position.x = 350; 
			button.position.y = 25; 
			button.interactive = true; 
			button.buttonMode = true; 
			button.loop = false; 
			button.animationSpeed = 0.2;
			button.onComplete = that.onButtonUpdate;
			button.tap = that.onButtonClick; 
			button.click = that.onButtonClick; 
			button.on('mouseover', that.onButtonOver);
			button.on('mouseout', that.onButtonOut);
			
			var text = new PIXI.Text("ДОБАВИТЬ В СПИСОК", that.styleButtonBlueText); 
			text.x = button.width / 8.0;
			text.y = button.height / 3;

			button.addChild(text); 
			that.desktopStage.addChild(button);
		},
		
		redCommand: function(select)
		{
			if (select === undefined) {
				select = 0;
			}
			
			if(that.listCommand.length === 0)
			{
					that.listCommand = [];
			}else{
				for(var i = 0; i < that.listCommand.length; i++)
				{
					that.windowStage.removeChild(that.listCommand[i]);
				}
				that.listCommand = [];
			}

			var selectIndex = select;
			var index = 0;
			for(var key in parent.initialization.commandUser)
			{
				if(parent.initialization.commandUser[key] !== null)
				{
					var graphics = new PIXI.Graphics(); 
					graphics.lineStyle(2, 0xFF0000, 0.2);
					graphics.beginFill(0xFF0000, 0.2);
					graphics.drawRect(690, 60 + (100 * index), 75, 75);
					graphics.endFill();

					var textureSprite = new PIXI.Sprite(parent.assets.getAsset("heroesTextures")[parent.initialization.commandUser[key]][3]); 
					textureSprite.name = parent.initialization.commandUser[key];
					textureSprite.index = index;
					textureSprite.position.x = 690; 
					textureSprite.position.y = 60  + (100 * index); 
					textureSprite.interactive = true; 
					textureSprite.buttonMode = true;
					textureSprite.tap = that.onRedIconCommandClick; 
					textureSprite.click = that.onRedIconCommandClick; 
					graphics.addChild(textureSprite);
					
					var border = new PIXI.Graphics();
					if(index === selectIndex)
					{
						border.lineStyle(2, 0xFFFFFF, 0.5);
						that.redPersonageShow(parent.initialization.commandUser[key]);
						that.selectPersonageID = parent.initialization.commandUser[key];
						that.selectPersonageIndex = index;
					} else {
						border.lineStyle(2, 0x0000FF, 0.2);
					}
					border.drawRect(690, 60 + (100 * index), 75, 75);
					graphics.addChild(border);
					
					that.listCommand.push(graphics);
					that.windowStage.addChild(that.listCommand[index]);
				} else{
					var graphics = new PIXI.Graphics(); 
					graphics.lineStyle(2, 0xFF0000, 0.2);
					graphics.beginFill(0xFF0000, 0.2);
					graphics.drawRect(690, 60 + (100 * index), 75, 75);
					graphics.endFill();

					that.listCommand.push(graphics);
					that.windowStage.addChild(that.listCommand[index]);
					if(select === 0 && selectIndex < 2) selectIndex++;
				}
				index++;
			}
		},
		
		onRedIconCommandClick: function()
		{
			that.selectPersonageID = this.name;
			that.selectPersonageIndex = this.index;
			that.redCommand(this.index);
			that.tapeRed(-1);
		},
		
		redPersonageShow: function(id)
		{
			that.windowStage.removeChild(that.desktopStage);
			
			if(id !== null)
			{
				that.desktopStage = new PIXI.Container();
				
				var graphics = new PIXI.Graphics();
				graphics.lineStyle(2, 0x800000, 1);
				graphics.beginFill(0x800000, 0.2);
				graphics.moveTo(25, 20);
				graphics.lineTo(550, 20);
				graphics.lineTo(550, 575);
				graphics.lineTo(25, 575);
				graphics.endFill();
				that.desktopStage.addChild(graphics);
				
				var sprite = new PIXI.Sprite(parent.assets.getAsset("heroesTextures")[id][1]);
				sprite.position.x = 25;
				sprite.position.y = 50;
				that.desktopStage.addChild(sprite);
				
				var graphics = new PIXI.Graphics();
				for(var i = 0; i < 185; i++)
				{
					graphics.lineStyle(1, 0x800000, 0.5);
					graphics.moveTo(25, 20+(3*i));
					graphics.lineTo(550, 20+(3*i));
				}
				that.desktopStage.addChild(graphics);
				
				that.lineAnimPersonageDesktopGraphics = new PIXI.Graphics(); 
				that.lineAnimPersonageDesktopGraphics.lineStyle(10, 0x800000, 0.3);
				that.lineAnimPersonageDesktopGraphics.moveTo(25, 25);
				that.lineAnimPersonageDesktopGraphics.lineTo(550, 25);
				that.desktopStage.addChild(that.lineAnimPersonageDesktopGraphics);
				//cmdLineAnimPersonageDesktopGraphicsTween();

				var text = new PIXI.Text(parent.initialization.personages[id].name, that.styleButtonRedText); 
				text.x = 50; text.y = 30;
				that.desktopStage.addChild(text);

				text = new PIXI.Text("Характеристики:", that.styleButtonRedText); 
				text.x = 300; text.y = 100;
				that.desktopStage.addChild(text);
				
				var life = (parent.initialization.personages[parent.initialization.personages[id].id].hitDefense1 + parent.initialization.personages[parent.initialization.personages[id].id].hitDefense2 + parent.initialization.personages[parent.initialization.personages[id].id].hitDefense3 + parent.initialization.personages[parent.initialization.personages[id].id].hitDefense4 + parent.initialization.personages[parent.initialization.personages[id].id].hitDefense5) / 10 * 50;
				life = Math.round(life);
				text = new PIXI.Text("Здоровье: " + life, that.styleButtonRedText); 
				text.x = 330; text.y = 130;
				that.desktopStage.addChild(text);
				
				sprite = new PIXI.Sprite(parent.assets.getAsset("hit1Texture"));
				sprite.position.x = 300; sprite.position.y = 150; sprite.scale.set(0.3);
				that.desktopStage.addChild(sprite);
				text = new PIXI.Text("Кристал ловкости:", that.styleButtonRedText); 
				text.x = 330; text.y = 155;
				that.desktopStage.addChild(text);
				text = new PIXI.Text(parent.initialization.personages[parent.initialization.personages[id].id].hitDefense1, that.styleButtonRedText); 
				text.x = 480; text.y = 155;
				that.desktopStage.addChild(text);
				
				sprite = new PIXI.Sprite(parent.assets.getAsset("hit2Texture"));
				sprite.position.x = 300; sprite.position.y = 175; sprite.scale.set(0.3);
				that.desktopStage.addChild(sprite);
				text = new PIXI.Text("Кристал тьмы:", that.styleButtonRedText); 
				text.x = 330; text.y = 180;
				that.desktopStage.addChild(text);
				text = new PIXI.Text(parent.initialization.personages[parent.initialization.personages[id].id].hitDefense2, that.styleButtonRedText); 
				text.x = 480; text.y = 180;
				that.desktopStage.addChild(text);
				
				sprite = new PIXI.Sprite(parent.assets.getAsset("hit3Texture"));
				sprite.position.x = 300; sprite.position.y = 200; sprite.scale.set(0.3);
				that.desktopStage.addChild(sprite);
				text = new PIXI.Text("Кристал жизни:", that.styleButtonRedText); 
				text.x = 330; text.y = 205;
				that.desktopStage.addChild(text);
				text = new PIXI.Text(parent.initialization.personages[parent.initialization.personages[id].id].hitDefense3, that.styleButtonRedText); 
				text.x = 480; text.y = 205;
				that.desktopStage.addChild(text);

				sprite = new PIXI.Sprite(parent.assets.getAsset("hit4Texture"));
				sprite.position.x = 300; sprite.position.y = 225; sprite.scale.set(0.3);
				that.desktopStage.addChild(sprite);
				text = new PIXI.Text("Кристал света:", that.styleButtonRedText); 
				text.x = 330; text.y = 230;
				that.desktopStage.addChild(text);
				text = new PIXI.Text(parent.initialization.personages[parent.initialization.personages[id].id].hitDefense4, that.styleButtonRedText); 
				text.x = 480; text.y = 230;
				that.desktopStage.addChild(text);
				
				sprite = new PIXI.Sprite(parent.assets.getAsset("hit5Texture"));
				sprite.position.x = 300; sprite.position.y = 250; sprite.scale.set(0.3);
				that.desktopStage.addChild(sprite);
				text = new PIXI.Text("Кристал интеллекта:", that.styleButtonRedText); 
				text.x = 330; text.y = 255;
				that.desktopStage.addChild(text);
				text = new PIXI.Text(parent.initialization.personages[parent.initialization.personages[id].id].hitDefense5, that.styleButtonRedText); 
				text.x = 480; text.y = 255;
				that.desktopStage.addChild(text);

				text = new PIXI.Text(parent.initialization.personages[id].description, that.styledescriptionRedText); 
				text.x = 50;
				text.y = 550 - text.height;
				that.desktopStage.addChild(text);

				if(parent.initialization.personages[parent.initialization.personages[id].id].command === true) that.redButtonRemovePersonage();
				else that.redButtonSelectPersonage();

				that.experiencePointsButtons();

				that.windowStage.addChild(that.desktopStage);
			}else{
				that.desktopStage = new PIXI.Container();
				var graphics = new PIXI.Graphics();
				graphics.lineStyle(2, 0x800000, 1);
				graphics.beginFill(0x800000, 0.2);
				graphics.moveTo(25, 20);
				graphics.lineTo(550, 20);
				graphics.lineTo(550, 575);
				graphics.lineTo(25, 575);
				graphics.endFill();

				for(var i = 0; i < 185; i++)
				{
					graphics.lineStyle(1, 0x800000, 0.5);
					graphics.moveTo(25, 20+(3*i));
					graphics.lineTo(550, 20+(3*i));
				}
				that.desktopStage.addChild(graphics);
			}
		},
		
		redButtonRemovePersonage: function()
		{
			var button = new PIXI.extras.MovieClip(parent.assets.getAsset("animTexButtonRed"));
			button.name = "Remove";
			button.position.x = 350; 
			button.position.y = 25; 
			button.interactive = true; 
			button.buttonMode = true; 
			button.loop = false; 
			button.animationSpeed = 0.2;
			button.onComplete = that.onButtonUpdate;
			button.tap = that.onButtonClick; 
			button.click = that.onButtonClick; 
			button.on('mouseover', that.onButtonOver);
			button.on('mouseout', that.onButtonOut);
			
			var text = new PIXI.Text("УБРАТЬ ИЗ СПИСКА", that.styleButtonRedText); 
			text.x = button.width / 6.5;
			text.y = button.height / 3;

			button.addChild(text); 
			that.desktopStage.addChild(button);
		},
		
		redButtonSelectPersonage: function()
		{
			var button = new PIXI.extras.MovieClip(parent.assets.getAsset("animTexButtonRed"));
			button.name = "Select";
			button.position.x = 350; 
			button.position.y = 25; 
			button.interactive = true; 
			button.buttonMode = true; 
			button.loop = false; 
			button.animationSpeed = 0.2;
			button.onComplete = that.onButtonUpdate;
			button.tap = that.onButtonClick; 
			button.click = that.onButtonClick; 
			button.on('mouseover', that.onButtonOver);
			button.on('mouseout', that.onButtonOut);
			
			var text = new PIXI.Text("ДОБАВИТЬ В СПИСОК", that.styleButtonBlueText); 
			text.x = button.width / 8.0;
			text.y = button.height / 3;

			button.addChild(text); 
			that.desktopStage.addChild(button);
		},
		
		onButtonOver: function()
		{
			this.isOver = true;
			this.gotoAndPlay(1);
		},
		
		onButtonOut: function()
		{
			this.isOver = false;
			this.gotoAndStop(0);
		},
		
		onButtonUpdate: function()
		{
			if(this.isOver)
			{
				this.gotoAndPlay(1);
			}else{
				this.gotoAndStop(0);
			}
		},
		
		onButtonClick: function()
		{
			switch (this.name)
			{
				case "Closed":
					parent.commandClose();
					break;
				case "Select":
					that.selectCommandPersonage();
					break;
				case "Remove":
					that.removeCommandPersonage();
					break;    
				default:
					break;
			}
		},
		
		tapeMask: function()
		{
			 that.tapeStage = new PIXI.Container();
    
			var mask = new PIXI.Graphics();
			mask.lineStyle(2, 0xFF00FF, 1);
			mask.beginFill(0xFF00FF, 0.2);
			mask.moveTo(70, 610);
			mask.lineTo(500, 610);
			mask.lineTo(500, 705);
			mask.lineTo(70, 705);
			mask.endFill();
			
			that.tapeStage.mask = mask;
			that.windowStage.addChild(that.tapeStage);
			
			/* Всё что не отображается в маске будет не активно */
			var graphics = new PIXI.Graphics(); 
			graphics.hitArea = new PIXI.Rectangle(501, 610, 500, 95);
			graphics.interactive = true;
			graphics.lineStyle(1, 0x000000, 0.0);
			graphics.beginFill(0xFF0000, 0.0);
			graphics.drawRect(501, 610, 500, 95);
			graphics.endFill();
			that.windowStage.addChild(graphics);
		},
		
		tapeBlue: function(select)
		{
			var countRemove = 0;
			if (select === undefined) {
				for(var key in parent.initialization.commandUser)
					if(parent.initialization.commandUser[key] === null) countRemove++;
				if(countRemove === 3) select = 0;
				else select = -1;
			}
			
			if(that.listCommand.length === 0)
			{
					that.listPersonage = [];
			}else{
				for(var i = 0; i < that.listPersonage.length; i++)
				{
					that.tapeStage.removeChild(that.listPersonage[i]);
				}
				that.listPersonage = [];
			}
			
			var index = 0;
			for(var planet in parent.initialization.planets)
			{
				if(parent.initialization.planets[planet].status === parent.initialization.USER_PLANET_QUEST_COMPLETE_JEDI)
				{
					if(parent.initialization.personages[parent.initialization.planets[planet].bluePersonage1].status === parent.initialization.USER_PERSONAGE_AVAILABLE && parent.initialization.personages[parent.initialization.planets[planet].bluePersonage1].command === false)
					{
						var graphics = new PIXI.Graphics(); 
						graphics.lineStyle(2, 0x0000FF, 0.2);
						graphics.beginFill(0x0000FF, 0.2);
						graphics.drawRect(80 + (100 * index), 620, 75, 75);
						graphics.endFill();
						
						var textureSprite = new PIXI.Sprite(parent.assets.getAsset("heroesTextures")[parent.initialization.planets[planet].bluePersonage1][3]); 
						textureSprite.name = parent.initialization.planets[planet].bluePersonage1;
						textureSprite.index = index;
						textureSprite.key = parent.initialization.planets[planet].bluePersonage1;
						textureSprite.position.x = 80 + (100 * index); 
						textureSprite.position.y = 620; 
						textureSprite.interactive = true; 
						textureSprite.buttonMode = true;
						textureSprite.tap = that.onBlueIconPersonageClick; 
						textureSprite.click = that.onBlueIconPersonageClick; 
						graphics.addChild(textureSprite);

						var border = new PIXI.Graphics();
						if(select === index)
						{
							border.lineStyle(2, 0xFFFFFF, 0.3);
							that.bluePersonageShow(parent.initialization.planets[planet].bluePersonage1);
							that.selectPersonageID = parent.initialization.planets[planet].bluePersonage1;
							that.selectPersonageIndex = index;
						} else border.lineStyle(2, 0x0000FF, 0.2);
						border.drawRect(80 + (100 * index), 620, 75, 75);
						graphics.addChild(border);
						that.tapeStage.addChild(graphics);

						that.listPersonage.push(graphics);

						index++;
					}
					if(parent.initialization.personages[parent.initialization.planets[planet].bluePersonage2].status === parent.initialization.USER_PERSONAGE_AVAILABLE && parent.initialization.personages[parent.initialization.planets[planet].bluePersonage2].command === false)
					{
						var graphics = new PIXI.Graphics(); 
						graphics.lineStyle(2, 0x0000FF, 0.2);
						graphics.beginFill(0x0000FF, 0.2);
						graphics.drawRect(80 + (100 * index), 620, 75, 75);
						graphics.endFill();

						var textureSprite = new PIXI.Sprite(parent.assets.getAsset("heroesTextures")[parent.initialization.planets[planet].bluePersonage2][3]); 
						textureSprite.name = parent.initialization.planets[planet].bluePersonage2;
						textureSprite.index = index;
						textureSprite.key = parent.initialization.planets[planet].bluePersonage2;
						textureSprite.position.x = 80 + (100 * index); 
						textureSprite.position.y = 620; 
						textureSprite.interactive = true; 
						textureSprite.buttonMode = true;
						textureSprite.tap = that.onBlueIconPersonageClick; 
						textureSprite.click = that.onBlueIconPersonageClick; 
						graphics.addChild(textureSprite);

						var border = new PIXI.Graphics();
						if(select === index)
						{
							border.lineStyle(2, 0xFFFFFF, 0.3);
							that.bluePersonageShow(parent.initialization.planets[planet].bluePersonage2);
							that.selectPersonageID = parent.initialization.planets[planet].bluePersonage2;
							that.selectPersonageIndex = index;
						} else border.lineStyle(2, 0x0000FF, 0.2);
						border.drawRect(80 + (100 * index), 620, 75, 75);
						graphics.addChild(border);
						that.tapeStage.addChild(graphics);

						that.listPersonage.push(graphics);

						index++;
					}
					if(parent.initialization.personages[parent.initialization.planets[planet].bluePersonage3].status === parent.initialization.USER_PERSONAGE_AVAILABLE && parent.initialization.personages[parent.initialization.planets[planet].bluePersonage3].command === false)
					{
						var graphics = new PIXI.Graphics(); 
						graphics.lineStyle(2, 0x0000FF, 0.2);
						graphics.beginFill(0x0000FF, 0.2);
						graphics.drawRect(80 + (100 * index), 620, 75, 75);
						graphics.endFill();

						var textureSprite = new PIXI.Sprite(parent.assets.getAsset("heroesTextures")[parent.initialization.planets[planet].bluePersonage3][3]); 
						textureSprite.name = parent.initialization.planets[planet].bluePersonage3;
						textureSprite.index = index;
						textureSprite.key = parent.initialization.planets[planet].bluePersonage3;
						textureSprite.position.x = 80 + (100 * index); 
						textureSprite.position.y = 620; 
						textureSprite.interactive = true; 
						textureSprite.buttonMode = true;
						textureSprite.tap = that.onBlueIconPersonageClick; 
						textureSprite.click = that.onBlueIconPersonageClick; 
						graphics.addChild(textureSprite);

						var border = new PIXI.Graphics();
						if(select === index)
						{
							border.lineStyle(2, 0xFFFFFF, 0.3);
							that.bluePersonageShow(parent.initialization.planets[planet].bluePersonage3);
							that.selectPersonageID = parent.initialization.planets[planet].bluePersonage3;
							that.cmdSelectPersonageIndex = index;
						} else border.lineStyle(2, 0x0000FF, 0.2);
						border.drawRect(80 + (100 * index), 620, 75, 75);
						graphics.addChild(border);
						that.tapeStage.addChild(graphics);

						that.listPersonage.push(graphics);

						index++;
					}
				}
			}
			that.tapeButton();
		},
		
		onBlueIconPersonageClick: function()
		{
			that.selectPersonageID = this.name;
			that.selectPersonageIndex = this.index;
			that.tapeBlue(this.index);
			that.blueCommand(-1);
		},
		
		tapeRed: function(select)
		{
			var countRemove = 0;
			if (select === undefined) {
				for(var key in parent.initialization.commandUser)
					if(parent.initialization.commandUser[key] === null) countRemove++;
				if(countRemove === 3) select = 0;
				else select = -1;
			}
			
			if(that.listCommand.length === 0)
			{
					that.listPersonage = [];
			}else{
				for(var i = 0; i < that.listPersonage.length; i++)
				{
					that.tapeStage.removeChild(that.listPersonage[i]);
				}
				that.listPersonage = [];
			}
			
			var index = 0;
			for(var planet in parent.initialization.planets)
			{
				if(parent.initialization.planets[planet].status === parent.initialization.USER_PLANET_QUEST_COMPLETE_SITH)
				{
					if(parent.initialization.personages[parent.initialization.planets[planet].redPersonage1].status === parent.initialization.USER_PERSONAGE_AVAILABLE && parent.initialization.personages[parent.initialization.planets[planet].redPersonage1].command === false)
					{
						var graphics = new PIXI.Graphics(); 
						graphics.lineStyle(2, 0xFF0000, 0.2);
						graphics.beginFill(0xFF0000, 0.2);
						graphics.drawRect(80 + (100 * index), 620, 75, 75);
						graphics.endFill();
						
						var textureSprite = new PIXI.Sprite(parent.assets.getAsset("heroesTextures")[parent.initialization.planets[planet].redPersonage1][3]); 
						textureSprite.name = parent.initialization.planets[planet].redPersonage1;
						textureSprite.index = index;
						textureSprite.key = parent.initialization.planets[planet].redPersonage1;
						textureSprite.position.x = 80 + (100 * index); 
						textureSprite.position.y = 620; 
						textureSprite.interactive = true; 
						textureSprite.buttonMode = true;
						textureSprite.tap = that.onRedIconPersonageClick; 
						textureSprite.click = that.onRedIconPersonageClick; 
						graphics.addChild(textureSprite);

						var border = new PIXI.Graphics();
						if(select === index)
						{
							border.lineStyle(2, 0xFFFFFF, 0.3);
							that.redPersonageShow(parent.initialization.planets[planet].redPersonage1);
							that.selectPersonageID = parent.initialization.planets[planet].redPersonage1;
							that.selectPersonageIndex = index;
						} else border.lineStyle(2, 0xFF0000, 0.2);
						border.drawRect(80 + (100 * index), 620, 75, 75);
						graphics.addChild(border);
						that.tapeStage.addChild(graphics);

						that.listPersonage.push(graphics);

						index++;
					}
					if(parent.initialization.personages[parent.initialization.planets[planet].redPersonage2].status === parent.initialization.USER_PERSONAGE_AVAILABLE && parent.initialization.personages[parent.initialization.planets[planet].redPersonage2].command === false)
					{
						var graphics = new PIXI.Graphics(); 
						graphics.lineStyle(2, 0xFF0000, 0.2);
						graphics.beginFill(0xFF0000, 0.2);
						graphics.drawRect(80 + (100 * index), 620, 75, 75);
						graphics.endFill();

						var textureSprite = new PIXI.Sprite(parent.assets.getAsset("heroesTextures")[parent.initialization.planets[planet].redPersonage2][3]); 
						textureSprite.name = parent.initialization.planets[planet].redPersonage2;
						textureSprite.index = index;
						textureSprite.key = parent.initialization.planets[planet].redPersonage2;
						textureSprite.position.x = 80 + (100 * index); 
						textureSprite.position.y = 620; 
						textureSprite.interactive = true; 
						textureSprite.buttonMode = true;
						textureSprite.tap = that.onRedIconPersonageClick; 
						textureSprite.click = that.onRedIconPersonageClick; 
						graphics.addChild(textureSprite);

						var border = new PIXI.Graphics();
						if(select === index)
						{
							border.lineStyle(2, 0xFFFFFF, 0.3);
							that.redPersonageShow(parent.initialization.planets[planet].redPersonage2);
							that.selectPersonageID = parent.initialization.planets[planet].redPersonage2;
							that.selectPersonageIndex = index;
						} else border.lineStyle(2, 0xFF0000, 0.2);
						border.drawRect(80 + (100 * index), 620, 75, 75);
						graphics.addChild(border);
						that.tapeStage.addChild(graphics);

						that.listPersonage.push(graphics);

						index++;
					}
					if(parent.initialization.personages[parent.initialization.planets[planet].redPersonage3].status === parent.initialization.USER_PERSONAGE_AVAILABLE && parent.initialization.personages[parent.initialization.planets[planet].redPersonage3].command === false)
					{
						var graphics = new PIXI.Graphics(); 
						graphics.lineStyle(2, 0xFF0000, 0.2);
						graphics.beginFill(0xFF0000, 0.2);
						graphics.drawRect(80 + (100 * index), 620, 75, 75);
						graphics.endFill();

						var textureSprite = new PIXI.Sprite(parent.assets.getAsset("heroesTextures")[parent.initialization.planets[planet].redPersonage3][3]); 
						textureSprite.name = parent.initialization.planets[planet].redPersonage3;
						textureSprite.index = index;
						textureSprite.key = parent.initialization.planets[planet].redPersonage3;
						textureSprite.position.x = 80 + (100 * index); 
						textureSprite.position.y = 620; 
						textureSprite.interactive = true; 
						textureSprite.buttonMode = true;
						textureSprite.tap = that.onRedIconPersonageClick; 
						textureSprite.click = that.onRedIconPersonageClick; 
						graphics.addChild(textureSprite);

						var border = new PIXI.Graphics();
						if(select === index)
						{
							border.lineStyle(2, 0xFFFFFF, 0.3);
							that.redPersonageShow(parent.initialization.planets[planet].redPersonage3);
							that.selectPersonageID = parent.initialization.planets[planet].redPersonage3;
							that.selectPersonageIndex = index;
						} else border.lineStyle(2, 0xFF0000, 0.2);
						border.drawRect(80 + (100 * index), 620, 75, 75);
						graphics.addChild(border);
						that.tapeStage.addChild(graphics);

						that.listPersonage.push(graphics);

						index++;
					}
				}
			}
			that.tapeButton();
		},
		
		onRedIconPersonageClick: function()
		{
			that.selectPersonageID = this.name;
			that.selectPersonageIndex = this.index;
			that.tapeRed(this.index);
			that.redCommand(-1);
		},
		
		removeCommandPersonage: function()
		{
			if(parent.config.side === that.SIDE_JEDI)
			{
				parent.initialization.personages[that.selectPersonageID].command = false;
				if(that.selectPersonageIndex === 0) parent.initialization.commandUser["personage1"] = null;
				if(that.selectPersonageIndex === 1) parent.initialization.commandUser["personage2"] = null;
				if(that.selectPersonageIndex === 2) parent.initialization.commandUser["personage3"] = null;
				that.blueCommand();
				that.tapeBlue();
				
			}
			if(parent.config.side === that.SIDE_SITH)
			{
				parent.initialization.personages[that.selectPersonageID].command = false;
				if(that.selectPersonageIndex === 0) parent.initialization.commandUser["personage1"] = null;
				if(that.selectPersonageIndex === 1) parent.initialization.commandUser["personage2"] = null;
				if(that.selectPersonageIndex === 2) parent.initialization.commandUser["personage3"] = null;
				that.redCommand();
				that.tapeRed(); 
			}
		},
		
		selectCommandPersonage: function()
		{
			parent.initialization.personages[that.selectPersonageID].command = true;
			for(var key in parent.initialization.commandUser)
			{
				if(parent.initialization.commandUser[key] === null)
				{
					parent.initialization.commandUser[key] = that.selectPersonageID;
					break;
				}
			}
			if(parent.config.side === that.SIDE_JEDI)
			{
				that.blueCommand();
				that.tapeBlue();
			}
			if(parent.config.side === that.SIDE_SITH)
			{
				
				that.redCommand();
				that.tapeRed();
			}
		},
		
		tapeButton: function()
		{
			that.windowStage.removeChild(that.tapePanelButtonsStage);
    
			if(that.listPersonage.length > 4)
			{
				var color;
				if(parent.config.side === that.SIDE_JEDI) color = 0x0000FF;
				else color = 0xFF0000;
				
				that.tapePanelButtonsStage = new PIXI.Container();
				var tapeButtonGraphics = new PIXI.Graphics();
				tapeButtonGraphics.name = "TapeLeft";
				tapeButtonGraphics.lineStyle(2, color, 1);
				tapeButtonGraphics.beginFill(color, 1);
				tapeButtonGraphics.moveTo(40, 655);
				tapeButtonGraphics.lineTo(65, 630);
				tapeButtonGraphics.lineTo(65, 680);
				tapeButtonGraphics.lineTo(40, 655);
				tapeButtonGraphics.endFill();
				tapeButtonGraphics.interactive = true; 
				tapeButtonGraphics.buttonMode = true; 
				tapeButtonGraphics.tap = that.onTapeButtonClick; 
				tapeButtonGraphics.click = that.onTapeButtonClick;
				that.tapePanelButtonsStage.addChild(tapeButtonGraphics);

				tapeButtonGraphics = new PIXI.Graphics();
				tapeButtonGraphics.name = "TapeRight";
				tapeButtonGraphics.lineStyle(2, color, 1);
				tapeButtonGraphics.beginFill(color, 1);
				tapeButtonGraphics.moveTo(535, 655);
				tapeButtonGraphics.lineTo(510, 630);
				tapeButtonGraphics.lineTo(510, 680);
				tapeButtonGraphics.lineTo(535, 655);
				tapeButtonGraphics.endFill();
				tapeButtonGraphics.interactive = true; 
				tapeButtonGraphics.buttonMode = true; 
				tapeButtonGraphics.tap = that.onTapeButtonClick; 
				tapeButtonGraphics.click = that.onTapeButtonClick;
				that.tapePanelButtonsStage.addChild(tapeButtonGraphics);
				
				that.windowStage.addChild(that.tapePanelButtonsStage);
			}else{
				that.tapeStage.position.x = 0;
			}
		},
		
		onTapeButtonClick: function()
		{
			switch (this.name)
			{
				case "TapeLeft":
					if(that.tapeStage.position.x >= ((that.tapeStage.width - 100) * -1)) that.tapeStage.position.x -= 100;
					break;
				case "TapeRight":
					if(that.tapeStage.position.x <= -100) that.tapeStage.position.x += 100;
					break;
				default:
					break;
			}
		},
		
		experiencePointsButtons: function()
		{
			if(parent.initialization.userExperiencePoints > 0)
			{
				var color1, color2;
				if(parent.config.side === that.SIDE_JEDI)
				{
					color1 = 0x0000FF;
					color2 = 0xFFFFFF;
				}
				if(parent.config.side === that.SIDE_SITH)
				{
					color1 = 0xFF0000;
					color2 = 0xFFFF00;
				}
				
				for(var i = 0; i < 5; i++)
				{
					var graphics = new PIXI.Graphics();
					graphics.name = "Add" + i;
					graphics.lineStyle(1, color1, 1);
					graphics.beginFill(color1, 0.5);
					graphics.drawRect(525, 155 + (25.5 * i), 15, 15);
					graphics.endFill();
					graphics.lineStyle(1, color2, 1);
					graphics.moveTo(532.5, 156 + (25.5 * i));
					graphics.lineTo(532.5, 168 + (25.5 * i));
					graphics.moveTo(526, 162 + (25.5 * i));
					graphics.lineTo(538, 162 + (25.5 * i));
					graphics.interactive = true; 
					graphics.buttonMode = true; 
					graphics.tap = that.onButtonPlusClick; 
					graphics.click = that.onButtonPlusClick; 
					
					that.desktopStage.addChild(graphics);
				}
			}
		},
		
		onButtonPlusClick: function()
		{
			switch (this.name)
			{
				case "Add0":
					parent.initialization.personages[that.selectPersonageID].hitDefense1 += 1;
					parent.initialization.userExperiencePoints--;
					that.experiencePointsText.text = "КОМАНДА. Очки опыта: " + parent.initialization.userExperiencePoints;
					if(parent.config.side === that.SIDE_JEDI) that.bluePersonageShow(that.selectPersonageID);
					if(parent.config.side === that.SIDE_SITH) that.redPersonageShow(that.selectPersonageID);
					break;
				case "Add1":
					parent.initialization.personages[that.selectPersonageID].hitDefense2 += 1;
					parent.initialization.userExperiencePoints--;
					that.experiencePointsText.text = "КОМАНДА. Очки опыта: " + parent.initialization.userExperiencePoints;
					if(parent.config.side === that.SIDE_JEDI) that.bluePersonageShow(that.selectPersonageID);
					if(parent.config.side === that.SIDE_SITH) that.redPersonageShow(that.selectPersonageID);
					break;
				case "Add2":
					parent.initialization.personages[that.selectPersonageID].hitDefense3 += 1;
					parent.initialization.userExperiencePoints--;
					that.experiencePointsText.text = "КОМАНДА. Очки опыта: " + parent.initialization.userExperiencePoints;
					if(parent.config.side === that.SIDE_JEDI) that.bluePersonageShow(that.selectPersonageID);
					if(parent.config.side === that.SIDE_SITH) that.redPersonageShow(that.selectPersonageID);
					break;
				case "Add3":
					parent.initialization.personages[that.selectPersonageID].hitDefense4 += 1;
					parent.initialization.userExperiencePoints--;
					that.experiencePointsText.text = "КОМАНДА. Очки опыта: " + parent.initialization.userExperiencePoints;
					if(parent.config.side === that.SIDE_JEDI) that.bluePersonageShow(that.selectPersonageID);
					if(parent.config.side === that.SIDE_SITH) that.redPersonageShow(that.selectPersonageID);
					break;
				case "Add4":
					parent.initialization.personages[that.selectPersonageID].hitDefense5 += 1;
					parent.initialization.userExperiencePoints--;
					that.experiencePointsText.text = "КОМАНДА. Очки опыта: " + parent.initialization.userExperiencePoints;
					if(parent.config.side === that.SIDE_JEDI) that.bluePersonageShow(that.selectPersonageID);
					if(parent.config.side === that.SIDE_SITH) that.redPersonageShow(that.selectPersonageID);
					break;
				default:
					break;
			}
		},
		
		tweenStart: function()
		{
			createjs.Tween.get(that.spaceBackground, {loop: true}) 
				.to({rotation: -0.015}, 2500, createjs.Ease.getPowInOut(3))
				.to({rotation: 0.015}, 2500, createjs.Ease.getPowInOut(3))
				.to({rotation: 0.0}, 2500, createjs.Ease.getPowInOut(3));
			
			createjs.Tween.get(that.lineAnimPersonageDesktopGraphics, {loop: true}) 
				.to({x: 0, y: 545}, 2500, createjs.Ease.getPowInOut(3));
			
			createjs.Tween.get(that.messageLineGraphics, {loop: true}) 
				.to({x: 0, y: 138}, 2000, createjs.Ease.getPowInOut(3));
			
			createjs.Ticker.setFPS(60);
		},
		
		tweenStop: function()
		{
			createjs.Tween.removeTweens(that.spaceBackground);
			createjs.Tween.removeTweens(that.lineAnimPersonageDesktopGraphics);
			createjs.Tween.removeTweens(that.messageLineGraphics);
		},
		
		show: function()
		{
			that.tweenStart();
			return that.windowStage;
		},
		
		close: function()
		{
			that.tweenStop();
			for(var child in that.desktopStage.children) that.desktopStage.removeChild(that.desktopStage.children[child]);
			that.desktopStage.destroy();
			delete that.desktopStage.children;
			
			for(var child in that.tapeStage.children) that.tapeStage.removeChild(that.tapeStage.children[child]);
			that.tapeStage.destroy();
			delete that.tapeStage.children;
			
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


/* == START FILE ========================================================= */

var Menu = function(parent)
{
	var that = {
		windowStage: null,
		starsSprite: null,
		deathStarSprite: null,
		ship1Sprite: null, 
		ship2Sprite: null,
		ship3Sprite: null,
		lineMessageGraphics: null,
		styleDroidText: { font : 'bold 14px Arial', fill : '#FFFFFF', stroke : '#0090F0', strokeThickness : 1, wordWrap : true, wordWrapWidth : 175 },
		styleButtonText: { font : 'bold 14px Arial', fill : '#FFFFFF', stroke : '#0090F0', strokeThickness : 1, wordWrap : true, wordWrapWidth : 200 },
		
		create: function()
		{
			that.windowStage = new PIXI.Container();
			that.starsCreate();
			that.deathStarCreate();
			that.shipsCreate();
			that.panetBattonsCreate();
			that.borderCreate();
			that.logoCreate();
			that.droidCreate();
		},
		
		starsCreate: function()
		{
			that.starsSprite = new PIXI.Sprite(parent.assets.getAsset("stars1Texture")); 
			that.starsSprite.position.x = 0; 
			that.starsSprite.position.y = 0; 
			that.starsSprite.scale.set(1.0); 
			that.windowStage.addChild(that.starsSprite);
		},
		
		deathStarCreate: function()
		{
			that.deathStarSprite = new PIXI.Sprite(parent.assets.getAsset("deathstarTexture")); 
			that.deathStarSprite.position.x = 300; 
			that.deathStarSprite.position.y = 100; 
			that.windowStage.addChild(that.deathStarSprite);
		},
		
		shipsCreate: function()
		{
			that.ship2Sprite = new PIXI.Sprite(parent.assets.getAsset("ship2Texture")); 
			that.ship2Sprite.position.x = 900; 
			that.ship2Sprite.position.y = 150; 
			that.windowStage.addChild(that.ship2Sprite);
			
			that.ship3Sprite = new PIXI.Sprite(parent.assets.getAsset("ship3Texture")); 
			that.ship3Sprite.position.x = 50; 
			that.ship3Sprite.position.y = 150; 
			that.windowStage.addChild(that.ship3Sprite);
			
			that.ship1Sprite = new PIXI.Sprite(parent.assets.getAsset("ship1Texture")); 
			that.ship1Sprite.position.x = -375; 
			that.ship1Sprite.position.y = 250; 
			that.windowStage.addChild(that.ship1Sprite);
		},
		
		panetBattonsCreate: function()
		{
			var graphics = new PIXI.Graphics(); 
			graphics.lineStyle(2, 0x0000FF, 0);
			graphics.beginFill(0x0000FF, 0.4);
			graphics.drawRect(23, 20, 347, 700);
			that.windowStage.addChild(graphics);
			
			var textArr = ["НАЧАТЬ ИГРУ", "НАСТРОЙКИ", "ПРИГЛАСИТЬ"];
			
			for(var i = 0; i < textArr.length; i++)
			{
				var button = new PIXI.extras.MovieClip(parent.assets.getAsset("animTexButtonBlue")); 
				button.name = "button_" + i;
				button.position.x = 85; 
				button.position.y = 350 + (75 * i); 
				button.interactive = true; 
				button.buttonMode = true; 
				button.loop = false; 
				button.animationSpeed = 0.2;
				button.onComplete = that.onButtonUpdate;
			
			
				button.tap = that.onButtonClick; 
				button.click = that.onButtonClick; 
				button.on('mouseover', that.onButtonOver);
				button.on('mouseout', that.onButtonOut);

				var text = new PIXI.Text(textArr[i], that.styleButtonText); 
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
                        parent.sound.soundPlayStarWarsButtonClick();
			switch (this.name)
			{
				case "button_0":        // Начать игру
					parent.menuStartGame();
					break;
				case "button_1":        // Настройки игры
					parent.settingsShow("menu_map");
					break;
				case "button_2":        // Позвать друзей ВК
					parent.vkInvite();
					break;
				default:
					break;
			}
		},
		
		borderCreate: function()
		{
			var graphics = new PIXI.Graphics(); 

			graphics.lineStyle(2, 0x0000FF, 1);
			graphics.beginFill(0x000000, 0);
			graphics.drawRect(10, 10, 840, 710);

			graphics.lineStyle(0);
			graphics.beginFill(0xFFFFFF, 1);
			graphics.drawCircle(5, 600,4);
			graphics.endFill();

			graphics.lineStyle(2, 0xFFFFFF, 1);
			graphics.moveTo(5,600);
			graphics.lineTo(5, 725);
			graphics.moveTo(5,725);
			graphics.lineTo(650, 725);
			graphics.moveTo(650,725);
			graphics.lineTo(670, 710);
			graphics.moveTo(670,710);
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
			graphics.moveTo(370,20);
			graphics.lineTo(390, 5);
			graphics.moveTo(390,5);
			graphics.lineTo(855, 5);
			graphics.moveTo(855,5);
			graphics.lineTo(855, 150);

			graphics.lineStyle(0);
			graphics.beginFill(0xFFFFFF, 1);
			graphics.drawCircle(855, 150,4);
			graphics.endFill();

			that.windowStage.addChild(graphics);
		},
		
		logoCreate: function()
		{
			var textureSprite = new PIXI.Sprite(parent.assets.getAsset("starwarsTexture")); 
			textureSprite.position.x = 25; 
			textureSprite.position.y = 15; 
			that.windowStage.addChild(textureSprite);
		},
		
		droidCreate: function()
		{
			var textureSprite = new PIXI.Sprite(parent.assets.getAsset("r2d2DroidBlueRightTexture")); 
			textureSprite.position.x = 700; 
			textureSprite.position.y = 550; 
			textureSprite.scale.set(0.4);
			that.windowStage.addChild(textureSprite);

			var graphics = new PIXI.Graphics(); 
			graphics.lineStyle(2, 0x0080C0, 1);
			graphics.beginFill(0x0080C0, 0.2);
			graphics.moveTo(735,575);
			graphics.lineTo(550, 575);
			graphics.lineTo(550, 300);
			graphics.lineTo(735, 300);
			graphics.endFill;
			for(var i = 0; i < 92; i++)
			{
				graphics.lineStyle(1, 0x0090F0, 0.5);
				graphics.moveTo(735,300+(3*i));
				graphics.lineTo(550, 300+(3*i));
			}
			that.windowStage.addChild(graphics);

			that.droidMessage();

			that.lineMessageGraphics = new PIXI.Graphics(); 
			that.lineMessageGraphics.lineStyle(10, 0x0090F0, 0.3);
			that.lineMessageGraphics.moveTo(735,305);
			that.lineMessageGraphics.lineTo(550, 305);
			that.windowStage.addChild(that.lineMessageGraphics);
		},
		
		droidMessage: function()
		{
			var text = new PIXI.Text("\nДобро пожаловать на путь силы. \nВаши способности превышают способности обычных людей. \nВы тут потому что вы были избраны. \n\nНажмите кнопку \n''Начать игру'' \n\nИ да пребудет с Вами Сила!", that.styleDroidText); 
			text.x = 555; 
			text.y = 300; 
			that.windowStage.addChild(text);
		},
		
		tweenStart: function()
		{
			createjs.Tween.get(that.lineMessageGraphics , {loop: true}) 
				.to({x: 0, y: 265}, 2500, createjs.Ease.getPowInOut(3));
				
			createjs.Tween.get(that.starsSprite, {loop: true}) 
				.to({x: -50, y: 0}, 25000, createjs.Ease.getPowInOut(3))
				.to({x: -50, y: -50}, 25000, createjs.Ease.getPowInOut(3))
				.to({x: 0, y: -50}, 25000, createjs.Ease.getPowInOut(3))
				.to({x: 0, y: 0}, 25000, createjs.Ease.getPowInOut(3));

			createjs.Tween.get(that.deathStarSprite, {loop: true}) 
					.to({x: 200, y: 100}, 25000, createjs.Ease.getPowInOut(3))
					.to({x: 200, y: 0}, 25000, createjs.Ease.getPowInOut(3))
					.to({x: 300, y: 0}, 25000, createjs.Ease.getPowInOut(3))
					.to({x: 300, y: 100}, 25000, createjs.Ease.getPowInOut(3));

			createjs.Tween.get(that.ship3Sprite, {loop: true}) 
					.to({x: -150, y: 150}, 25000, createjs.Ease.getPowInOut(3))
					.to({x: -150, y: 0}, 25000, createjs.Ease.getPowInOut(3))
					.to({x: 50, y: 0}, 25000, createjs.Ease.getPowInOut(3))
					.to({x: 50, y: 150}, 25000, createjs.Ease.getPowInOut(3));

			createjs.Tween.get(that.ship1Sprite, {loop: true}) 
					.to({x: 1000, y: 1000}, 5000, createjs.Ease.getPowInOut(3));

			createjs.Tween.get(that.ship2Sprite, {loop: true}) 
					.to({x: -250, y: 350}, 5000, createjs.Ease.getPowInOut(3));

			createjs.Ticker.setFPS(60); 
		},
		
		tweenStop: function()
		{
			createjs.Tween.removeTweens(that.lineMessageGraphics);
			createjs.Tween.removeTweens(that.starsSprite);
			createjs.Tween.removeTweens(that.deathStarSprite);
			createjs.Tween.removeTweens(that.ship3Sprite);
			createjs.Tween.removeTweens(that.ship1Sprite);
			createjs.Tween.removeTweens(that.ship2Sprite);
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

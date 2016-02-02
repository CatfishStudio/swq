
/* == START FILE ========================================================= */

var Side = function(parent)
{
	var that = {
		windowStage: null,
		SIDE_NONE: "side_none",
		SIDE_JEDI: "side_jedi",
		SIDE_SITH: "side_sith",
		side: null,
		
		selectGraphics: null,
		droidBlueStage: null,
		styleDroidBlueText: { font : 'bold 14px Arial', fill : '#FFFFFF', stroke : '#0090F0', strokeThickness : 1, wordWrap : true, wordWrapWidth : 275 },
		blueLineAnimationGraphics: null,
		
		droidRedStage: null,
		styleDroidRedText: { font : 'bold 14px Arial', fill : '#FFFFFF', stroke : '#880000', strokeThickness : 1, wordWrap : true, wordWrapWidth : 275 },
		redLineAnimationGraphics: null,
		
		create: function()
		{
			that.windowStage = new PIXI.Container();
			that.backgroundCreate();
			that.borderCreate();
			that.heroesCreate();
			that.droidCreate();
		},
		
		backgroundCreate: function()
		{
			var sprite = new PIXI.Sprite(parent.assets.getAsset("sideBackgroundTexture"));
			sprite.position.x = 0; 
			sprite.position.y = 0; 
			that.windowStage.addChild(sprite);
		},

		borderCreate: function()
		{
			var graphics = new PIXI.Graphics(); 

			graphics.lineStyle(2, 0x0000FF, 1);
			graphics.beginFill(0x000000, 0);
			graphics.drawRect(10, 10, 840, 710);
			
			graphics.lineStyle(2, 0xFF0000, 1);
			graphics.moveTo(430,720);
			graphics.lineTo(10, 720);
			graphics.moveTo(10,720);
			graphics.lineTo(10, 10);
			graphics.moveTo(10,10);
			graphics.lineTo(430, 10);
			
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
			
			graphics.lineStyle(2, 0xFFFF80, 1);
			graphics.moveTo(430,5);
			graphics.lineTo(5, 5);
			
			graphics.lineStyle(0);
			graphics.beginFill(0xFFFF80, 1);
			graphics.drawCircle(5,5,4);
			graphics.endFill();
			
			that.windowStage.addChild(graphics);
		},
		
		heroesCreate: function()
		{
			var button1 = new PIXI.extras.MovieClip(parent.assets.getAsset("animTexSideDarthVader"));
			button1.name = "DarthVader";
			button1.position.x = 25;
			button1.position.y = 75;
			button1.interactive = true;
			button1.buttonMode = true;
			button1.tap = that.onButtonClick; 
			button1.click = that.onButtonClick; 
			button1.on('mouseover', that.onButtonOver);
			button1.on('mouseout', that.onButtonOut);
			button1.loop = true;
			button1.animationSpeed = 0.2;
			button1.play();
			that.windowStage.addChild(button1);
			
			var button2 = new PIXI.extras.MovieClip(parent.assets.getAsset("animTexSideLukeSkywalker"));
			button2.name = "LukeSkywalker";
			button2.position.x = 475;
			button2.position.y = 80;
			button2.interactive = true;
			button2.buttonMode = true;
			button2.tap = that.onButtonClick; 
			button2.click = that.onButtonClick; 
			button2.on('mouseover', that.onButtonOver);
			button2.on('mouseout', that.onButtonOut);
                        button2.loop = true;
			button2.animationSpeed = 0.2;
			button2.play();
			that.windowStage.addChild(button2);
		},
		
		onButtonOver: function()
		{
			if(this.name === "DarthVader")
			{
				that.droidBlueStage.visible = false;
				that.droidRedStage.visible = true;
			}
			if(this.name === "LukeSkywalker")
			{
				that.droidBlueStage.visible = true;
				that.droidRedStage.visible = false;
			}
		},
		
		onButtonOut: function()
		{
			
		},
		
		onButtonClick: function()
		{
                        parent.sound.soundPlayStarWarsButtonClick();
                        
			if(this.name === "DarthVader") that.side = that.SIDE_SITH;
			if(this.name === "LukeSkywalker") that.side = that.SIDE_JEDI;
			
			parent.config.side = that.side;
			parent.sideClose();
		},
		
		droidCreate: function()
		{
                    that.droidBlueStage = new PIXI.Container();
                    var textureSprite = new PIXI.Sprite(parent.assets.getAsset("r2d2DroidBlueRightTexture")); 
                    textureSprite.position.x = 700; 
                    textureSprite.position.y = 550; 
                    textureSprite.scale.set(0.4);
                    that.droidBlueStage.addChild(textureSprite);
                    var graphics = new PIXI.Graphics(); 
                    graphics.lineStyle(2, 0x0080C0, 1);
                    graphics.beginFill(0x0080C0, 0.2);
                    graphics.moveTo(450,450);
                    graphics.lineTo(735, 450);
                    graphics.lineTo(735, 575);
                    graphics.lineTo(450, 575);
                    graphics.endFill();
                    for(var i = 0; i < 42; i++)
                    {
                            graphics.lineStyle(1, 0x0090F0, 0.5);
                            graphics.moveTo(450, 450+(3*i));
                            graphics.lineTo(735, 450+(3*i));
                    }
                    that.droidBlueStage.addChild(graphics);
                    var textMessage = new PIXI.Text("\nВыберите светлую сторону силы.\n\"Только покой ощутив, возмёшь контроль над желаниями своими\". \n\nПройдите путь Люка Скайуокера!", that.styleDroidBlueText); 
                    textMessage.x = 455; 
                    textMessage.y = 455; 
                    that.droidBlueStage.addChild(textMessage);
                    that.blueLineAnimationGraphics = new PIXI.Graphics(); 
                    that.blueLineAnimationGraphics.lineStyle(10, 0x0090F0, 0.3);
                    that.blueLineAnimationGraphics.moveTo(450,455);
                    that.blueLineAnimationGraphics.lineTo(735, 455);
                    that.droidBlueStage.addChild(that.blueLineAnimationGraphics);
                    that.windowStage.addChild(that.droidBlueStage);


                    that.droidRedStage = new PIXI.Container();
                    var textureSprite = new PIXI.Sprite(parent.assets.getAsset("r2d2DroidRedLeftTexture")); 
                    textureSprite.position.x = 40; 
                    textureSprite.position.y = 550; 
                    textureSprite.scale.set(0.4);
                    that.droidRedStage.addChild(textureSprite);
                    var graphics = new PIXI.Graphics(); 
                    graphics.lineStyle(2, 0x800000, 1);
                    graphics.beginFill(0x800000, 0.2);
                    graphics.moveTo(125,450);
                    graphics.lineTo(410, 450);
                    graphics.lineTo(410, 575);
                    graphics.lineTo(125, 575);
                    graphics.endFill();
                    for(var i = 0; i < 42; i++)
                    {
                            graphics.lineStyle(1, 0x800000, 0.5);
                            graphics.moveTo(125, 450+(3*i));
                            graphics.lineTo(410, 450+(3*i));
                    }
                    that.droidRedStage.addChild(graphics);
                    var textMessage = new PIXI.Text("\nВыберите тёмную сторону силы.\n\"Поддайся амбициям, почувствуй власть в своих руках.\" \n\nПройдите путь Дарт Вейдера!", that.styleDroidRedText); 
                    textMessage.x = 130; 
                    textMessage.y = 455; 
                    that.droidRedStage.addChild(textMessage);
                    that.redLineAnimationGraphics = new PIXI.Graphics(); 
                    that.redLineAnimationGraphics.lineStyle(10, 0x800000, 0.3);
                    that.redLineAnimationGraphics.moveTo(125,455);
                    that.redLineAnimationGraphics.lineTo(410, 455);
                    that.droidRedStage.addChild(that.redLineAnimationGraphics);
                    that.windowStage.addChild(that.droidRedStage);

                    that.droidBlueStage.visible = false;
                    that.droidRedStage.visible = false;
		},
		
		tweenStart: function()
		{
			createjs.Tween.get(that.blueLineAnimationGraphics, {loop: true}) 
				.to({x: 0, y: 115}, 2500, createjs.Ease.getPowInOut(3));
			createjs.Tween.get(that.redLineAnimationGraphics, {loop: true}) 
				.to({x: 0, y: 115}, 2500, createjs.Ease.getPowInOut(3));
			createjs.Ticker.setFPS(60); 
		},
		
		tweenStop: function()
		{
			createjs.Tween.removeTweens(that.blueLineAnimationGraphics);
			createjs.Tween.removeTweens(that.redLineAnimationGraphics);
		},
		
		show: function()
		{
			that.tweenStart();
			return that.windowStage;
		},
		
		close: function()
		{
			that.tweenStop();
			
			for(var child in that.droidBlueStage.children) that.droidBlueStage.removeChild(that.droidBlueStage.children[child]);
			that.droidBlueStage.destroy();
			delete that.droidBlueStage.children;
			
			for(var child in that.droidRedStage.children) that.droidRedStage.removeChild(that.droidRedStage.children[child]);
			that.droidRedStage.destroy();
			delete that.droidRedStage.children;
			
			for(var child in that.windowStage.children)	that.windowStage.removeChild(that.windowStage.children[child]);
			
			return that.windowStage;
		},
		
		getWindowStage: function()
		{
			return that.windowStage;
		},
		
		destroy: function()
		{
			for(var child in that.windowStage.children)that.windowStage.removeChild(that.windowStage.children[child]);
			that.windowStage.destroy();
			delete that.windowStage.children;
			
			for(var property in that) that[property] = null;
		}
	};
	return that;
};

/* == END FILE ========================================================== */

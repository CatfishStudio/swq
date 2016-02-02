
/* == START FILE ========================================================= */

var Backmenu = function(parent)
{
	var that = {
		windowStage: null,
		lineAnimationGraphics: null,
		styleBlueText: { font : 'bold 14px Arial', fill : '#FFFFFF', stroke : '#0090F0', strokeThickness : 1, wordWrap : true, wordWrapWidth : 340 },
		styleRedText: { font : 'bold 14px Arial', fill : '#FFFFFF', stroke : '#880000', strokeThickness : 1, wordWrap : true, wordWrapWidth : 340 }, 
		styleButtonBlueText: { font : 'bold 24px Arial', fill : '#FFFFFF', stroke : '#0090F0', strokeThickness : 1, wordWrap : true, wordWrapWidth : 340 },
		styleButtonRedText: { font : 'bold 24px Arial', fill : '#FFFFFF', stroke : '#880000', strokeThickness : 1, wordWrap : true, wordWrapWidth : 340 }, 
		SIDE_NONE: "side_none",
		SIDE_JEDI: "side_jedi",
		SIDE_SITH: "side_sith",
		
		create: function()
		{
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
			graphics.beginFill(0x000000, 0.5);
			graphics.drawRect(0, 0, parent.config.MAIN_WIDTH, parent.config.MAIN_HEIGH);
			graphics.endFill();
			that.windowStage.addChild(graphics);
		},
		
		windowCreate: function()
		{
			if(parent.config.side === that.SIDE_NONE ||  parent.config.side === that.SIDE_JEDI)
			{
				var graphics = new PIXI.Graphics(); 
				graphics.lineStyle(2, 0x0080C0, 1);
				graphics.beginFill(0x0080C0, 0.2);
				graphics.moveTo(250,250);
				graphics.lineTo(600, 250);
				graphics.lineTo(600, 500);
				graphics.lineTo(250, 500);
				graphics.endFill();
				for(var i = 0; i < 40; i++)
				{
					graphics.lineStyle(1, 0x0090F0, 0.5);
					graphics.moveTo(250,280+(3*i));
					graphics.lineTo(600, 280+(3*i));
				}
				that.windowStage.addChild(graphics);
				
				that.lineAnimationGraphics = new PIXI.Graphics(); 
				that.lineAnimationGraphics.lineStyle(10, 0x0090F0, 0.3);
				that.lineAnimationGraphics.moveTo(250,255);
				that.lineAnimationGraphics.lineTo(600, 255);
				that.windowStage.addChild(that.lineAnimationGraphics);
				
				graphics = new PIXI.Graphics(); 
				graphics.lineStyle(1, 0x0080C0, 1);
				graphics.beginFill(0x0080C0, 1);
				graphics.moveTo(400,250);
				graphics.lineTo(425, 275);
				graphics.lineTo(600, 275);
				graphics.lineTo(600, 250);
				graphics.endFill();
				that.windowStage.addChild(graphics);
			}
			if(parent.config.side === that.SIDE_SITH)
			{
				var graphics = new PIXI.Graphics(); 
				graphics.lineStyle(2, 0xA63A24, 1);
				graphics.beginFill(0xA63A24, 0.2);
				graphics.moveTo(250,250);
				graphics.lineTo(600, 250);
				graphics.lineTo(600, 500);
				graphics.lineTo(250, 500);
				graphics.endFill();
				for(var i = 0; i < 40; i++)
				{
					graphics.lineStyle(1, 0xA63A24, 0.5);
					graphics.moveTo(250,280+(3*i));
					graphics.lineTo(600, 280+(3*i));
				}
				that.windowStage.addChild(graphics);
				
				that.lineAnimationGraphics = new PIXI.Graphics(); 
				that.lineAnimationGraphics.lineStyle(10, 0xA63A24, 0.3);
				that.lineAnimationGraphics.moveTo(250,255);
				that.lineAnimationGraphics.lineTo(600, 255);
				that.windowStage.addChild(that.lineAnimationGraphics);
				
				graphics = new PIXI.Graphics(); 
				graphics.lineStyle(1, 0xA63A24, 1);
				graphics.beginFill(0xA63A24, 1);
				graphics.moveTo(400,250);
				graphics.lineTo(425, 275);
				graphics.lineTo(600, 275);
				graphics.lineTo(600, 250);
				graphics.endFill();
				that.windowStage.addChild(graphics);
			}
		},
		
		titleCreate: function()
		{
			var text;
			if(parent.config.side === that.SIDE_NONE || parent.config.side === that.SIDE_JEDI) text = new PIXI.Text("ПРЕДУПРЕЖДЕНИЕ", that.styleBlueText); 
			if(parent.config.side === that.SIDE_SITH) text = new PIXI.Text("ПРЕДУПРЕЖДЕНИЕ", that.styleRedText); 
			text.x = 450;
			text.y = 255;
			that.windowStage.addChild(text);
		},
		
		textCreate: function()
		{
			var text;
			if(parent.config.side === that.SIDE_NONE || parent.config.side === that.SIDE_JEDI) text = new PIXI.Text("\n    Вы собираетесь выйти в главное меню.\n    В таком случае прогресс будет потерян.\n\n\n     Продолжить выход в основное меню?", that.styleBlueText); 
			if(parent.config.side === that.SIDE_SITH) text = new PIXI.Text("\n    Вы собираетесь выйти в главное меню.\n    В таком случае прогресс будет потерян.\n\n\n     Продолжить выход в основное меню?", that.styleRedText); 
			text.x = 255;
			text.y = 285;
			that.windowStage.addChild(text);
		},
		
		buttonsCreate: function()
		{
			if(parent.config.side === that.SIDE_NONE || parent.config.side === that.SIDE_JEDI)
			{
				var button = new PIXI.extras.MovieClip(parent.assets.getAsset("animTexButtonBlue")); 
				button.name = "yes";
				button.position.x = 255; 
				button.position.y = 450; 
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
				var text = new PIXI.Text("Да", that.styleButtonBlueText); 
				text.x = button.width / 2;
				text.y = button.height / 3.5;
				button.addChild(text); 
				that.windowStage.addChild(button);
				
				button = new PIXI.extras.MovieClip(parent.assets.getAsset("animTexButtonBlue")); 
				button.name = "no";
				button.position.x = 435; 
				button.position.y = 450; 
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
				var text = new PIXI.Text("Нет", that.styleButtonBlueText); 
				text.x = button.width / 2;
				text.y = button.height / 3.5;
				button.addChild(text); 
				that.windowStage.addChild(button);
			}
			if(parent.config.side === that.SIDE_SITH)
			{
				var button = new PIXI.extras.MovieClip(parent.assets.getAsset("animTexButtonRed")); 
				button.name = "yes";
				button.position.x = 255; 
				button.position.y = 450; 
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
				var text = new PIXI.Text("Да", that.styleButtonRedText); 
				text.x = button.width / 2;
				text.y = button.height / 3.5;
				button.addChild(text); 
				that.windowStage.addChild(button);
				
				button = new PIXI.extras.MovieClip(parent.assets.getAsset("animTexButtonRed")); 
				button.name = "no";
				button.position.x = 435; 
				button.position.y = 450; 
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
				var text = new PIXI.Text("Нет", that.styleButtonRedText); 
				text.x = button.width / 2;
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
					parent.backmenuClose(true);
					break;
				case "no":
					parent.backmenuClose(false);
					break;
				default:
					break;
			}
		},
		
		tweenStart: function()
		{
			createjs.Tween.get(that.lineAnimationGraphics, {loop: true}) 
				.to({x: 0, y: 240}, 2500, createjs.Ease.getPowInOut(3));
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
                        if(parent.level !== null)parent.timer.timerPauseEnd();
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

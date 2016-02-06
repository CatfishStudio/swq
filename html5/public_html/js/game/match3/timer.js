
/* == START FILE ========================================================= */

var Timer = function(parent)
{
	var that = {
		windowStage: null,
		
		timerText: null,
		timerCount: null,
		timerPause: null,
		timer: null,
		timerStyleBlueText: {font : 'bold 36px Arial', fill : '#FFFFFF', stroke : '#0090F0', strokeThickness : 3, wordWrap : true, wordWrapWidth : 440},
		timerStyleRedText: {font : 'bold 36px Arial', fill : '#FFFFFF', stroke : '#880000', strokeThickness : 3, wordWrap : true, wordWrapWidth : 440},
		
		TIMER_MAX_VALUE: 10,
		TIMER_MIN_VALUE: 0,
		
		SIDE_NONE: "side_none",
		SIDE_JEDI: "side_jedi",
		SIDE_SITH: "side_sith",
		
		create: function()
		{
			that.timerPause = false;
			that.timerCount = that.TIMER_MAX_VALUE;
			
			that.windowStage = new PIXI.Container();
			that.windowStage.position.x = (parent.config.MAIN_WIDTH / 2 - 25);
			that.windowStage.position.y = 35;
			
			var graphics = new PIXI.Graphics();
			if(parent.config.side === that.SIDE_JEDI)
			{
				graphics.lineStyle(2, 0xFFFFFF, 1);
				graphics.beginFill(0x0000FF, 0.75);
			}
			if(parent.config.side === that.SIDE_SITH)
			{
				graphics.lineStyle(2, 0xFFFF80, 1);
				graphics.beginFill(0x800000, 0.75);
			}
			graphics.drawRoundedRect(0, 0, 50, 50, 15);
			graphics.endFill();
			that.windowStage.addChild(graphics);
			
			if(parent.config.side === that.SIDE_JEDI) that.timerText = new PIXI.Text(that.timerCount, that.timerStyleBlueText);
			if(parent.config.side === that.SIDE_SITH) that.timerText = new PIXI.Text(that.timerCount, that.timerStyleRedText);
			that.timerText.x = 2.5;
			that.timerText.y = 2.5;
			that.windowStage.addChild(that.timerText);

			if(that.timerPause === false) that.timer = setInterval(that.onTimerComplete, 1000);
		},
		
		onTimerComplete: function()
		{
                    if(parent.level !== null)
                    {
                	if(that.timerCount === that.TIMER_MIN_VALUE){	// таймер = минимум
        
				if(parent.match.modeAI === true)
				{
						parent.match.matchFieldBlocked = false; 	// поле разблокированно
						parent.match.modeAI = false;				// ИИ отключен
						// console.log("[HIT]: USER наносит удар!");
				}else{
						parent.match.matchFieldBlocked = true;	// поле заблокированно
						parent.match.modeAI = true;				// ИИ включен
						parent.match.matchCellColorBack();
						parent.match.matchSelectUnit1 = null;
						parent.match.matchSelectUnit2 = null;
						// console.log("[HIT]: AI наносит удар!");
				}
                                parent.level.onCompleteTextLeftShow();
                                parent.level.onCompleteTextRightShow();
				
				that.timerCount = that.TIMER_MAX_VALUE;	// устанавливаем максимальное значение таймера
				that.timerText.text = that.timerCount;	// показываем секунды
			}else{
				that.timerCount--;						// уменьшение таймера
				that.timerText.text = " " + that.timerCount;	// показываем секунды
				if(parent.match.modeAI === true && that.timerCount === 8) { parent.match.matchActionAI();}
			}
                    }else{
                        that.timerStop();
                        parent.timerClose(); // УДАЛЯЕТСЯ ТАЙМЕР ЕСЛИ НЕТ УРОВНЯ
                    }
		},
		
		timerStart: function()
		{
                    if(parent.level !== null)
                    {
                    	if(parent.match.modeAI === true)
			{
                            	parent.match.matchFieldBlocked = false; 	// поле разблокированно
				parent.match.modeAI = false;					// ИИ отключен
				parent.level.levelExchangePersonage("AI");
				// console.log("[HIT START]: USER наносит удар!");
			}else{
                            	parent.match.matchFieldBlocked = true;		// поле заблокированно
				parent.match.modeAI = true;					// ИИ включен
				parent.level.levelExchangePersonage("USER");
				parent.match.matchCellColorBack();
				parent.match.matchSelectUnit1 = null;
				parent.match.matchSelectUnit2 = null;
				// console.log("[HIT START]: AI наносит удар!");
			}
                        parent.level.onCompleteTextLeftShow();
                        parent.level.onCompleteTextRightShow();
			
			that.timerCount = that.TIMER_MAX_VALUE;	// устанавливаем максимальное значение таймера
			that.timerText.text = that.timerCount;	// показываем секунды
			if(that.timerPause === false)
                        {
                            that.timer = setInterval(that.onTimerComplete, 1000);	// запуск таймера
                        }
                    }
		},
		
		timerStop: function()
		{
			clearInterval(that.timer);
		},
		
		timerPauseBegin: function()
		{
			that.timerPause = true;
                        if(parent.level.getWindowStage() !== null) clearInterval(that.timer);
		},
		
		timerPauseEnd: function()
		{
			that.timerPause = false;
			if(parent.level.getWindowStage() !== null) that.timer = setInterval(that.onTimerComplete, 1000);
		},
				
		show: function()
		{
			return that.windowStage;
		},
		
		close: function()
		{
			that.timerStop();
			for(var child in that.windowStage.children)	that.windowStage.removeChild(that.windowStage.children[child]);
			return that.windowStage;
		},
		
		getWindowStage: function()
		{
			return that.windowStage;
		},
		
		destroy: function()
		{
                        that.timerStop();
			for(var child in that.windowStage.children)	that.windowStage.removeChild(that.windowStage.children[child]);
			that.windowStage.destroy();
			delete that.windowStage.children;
			
			for(var property in that) that[property] = null;
		}
	};
	return that;
};

/* == END FILE ========================================================== */


/* == НАЧАЛО ФАЙЛА ========================================================= */

var TIMER_MAX_VALUE = 10;
var TIMER_MIN_VALUE = 0;

var timerStage;
var timerText;
var timerCount;
var timerPause;
var timer;

var timerStyleBlueText = {
    font : 'bold 36px Arial',
    fill : '#FFFFFF', 
    stroke : '#0090F0',
    strokeThickness : 3,
    wordWrap : true,
    wordWrapWidth : 440
};
var timerStyleRedText = {
    font : 'bold 36px Arial',
    fill : '#FFFFFF', 
    stroke : '#880000',
    strokeThickness : 3,
    wordWrap : true,
    wordWrapWidth : 440
};

function timerCreate()
{
    timerPause = false;
    timerCount = TIMER_MAX_VALUE;
    
    timerStage = new PIXI.Container();
    timerStage.position.x = (MAIN_WIDTH / 2 - 25);
    timerStage.position.y = 35;
    
    var graphics = new PIXI.Graphics();
    if(side === SIDE_JEDI)
    {
        graphics.lineStyle(2, 0xFFFFFF, 1);
        graphics.beginFill(0x0000FF, 0.75);
    }
    if(side === SIDE_SITH)
    {
        graphics.lineStyle(2, 0xFFFF80, 1);
        graphics.beginFill(0x800000, 0.75);
    }
    graphics.drawRoundedRect(0, 0, 50, 50, 15);
    graphics.endFill();
    timerStage.addChild(graphics);
    
    if(side === SIDE_JEDI) timerText = new PIXI.Text(timerCount, timerStyleBlueText);
    if(side === SIDE_SITH) timerText = new PIXI.Text(timerCount, timerStyleRedText);
    timerText.x = 2.5;
    timerText.y = 2.5;
    timerStage.addChild(timerText);

    stage.addChild(timerStage);

    if(timerPause === false) timer = setInterval(onTimerComplete, 1000);
    
}

function timerRemove()
{
    timerStop();
    stage.removeChild(timerStage);
    timerStage = null;
}

function onTimerComplete()
{
    if(timerCount === TIMER_MIN_VALUE){	// таймер = минимум
        
        if(modeAI === true)
        {
                matchFieldBlocked = false; 	// поле разблокированно
                modeAI = false;				// ИИ отключен
                // console.log("[HIT]: USER наносит удар!");
        }else{
                matchFieldBlocked = true;	// поле заблокированно
                modeAI = true;				// ИИ включен
                matchCellColorBack();
                matchSelectUnit1 = null;
                matchSelectUnit2 = null;
                // console.log("[HIT]: AI наносит удар!");
        }
        
        timerCount = TIMER_MAX_VALUE;	// устанавливаем максимальное значение таймера
        timerText.text = timerCount;	// показываем секунды
    }else{
        timerCount--;						// уменьшение таймера
        timerText.text = " " + timerCount;	// показываем секунды
        if(modeAI === true && timerCount === 8) { matchActionAI();}
    }
}

function timerStart()
{
    if(modeAI === true)
    {
            matchFieldBlocked = false; 	// поле разблокированно
            modeAI = false;					// ИИ отключен
            levelExchangePersonage("AI");
            // console.log("[HIT START]: USER наносит удар!");
    }else{
            matchFieldBlocked = true;		// поле заблокированно
            modeAI = true;					// ИИ включен
            levelExchangePersonage("USER");
            matchCellColorBack();
            matchSelectUnit1 = null;
            matchSelectUnit2 = null;
            // console.log("[HIT START]: AI наносит удар!");
    }
    
    timerCount = TIMER_MAX_VALUE;	// устанавливаем максимальное значение таймера
    timerText.text = timerCount;	// показываем секунды
    if(timerPause === false) timer = setInterval(onTimerComplete, 1000);	// запуск таймера
}

function timerStop()
{
    clearInterval(timer);
}

function timerPauseBegin()
{
        timerPause = true;
        if(levelStage !== null) clearInterval(timer);
}

function timerPauseEnd()
{
        timerPause = false;
	if(levelStage !== null) timer = setInterval(onTimerComplete, 1000);
}

/* == КОНЕЦ ФАЙЛА ========================================================== */

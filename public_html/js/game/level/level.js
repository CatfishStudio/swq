
/* == НАЧАЛО ФАЙЛА ========================================================= */

var levelStage;
var levelPlanetID;
var levelStarsSprite;
var levelPlanetSprite;
var levelLandscapeSprite;

var levelStatus;
var LEVEL_STATUS_BATTLE = "LEVEL_STATUS_BATTLE";
var LEVEL_STATUS_END_BATTLE_WIN_USER = "LEVEL_STATUS_END_BATTLE_WIN_USER";
var LEVEL_STATUS_END_BATTLE_WIN_AI = "LEVEL_STATUS_END_BATTLE_WIN_AI";

var levelCommandUser = [];  // команда пользователя (userCommandUser)
var levelCommandAI = [];    // команда ИИ (userCommandAI)
var levelIndexUser = 0;     // индекс персонажа в команде пользователя
var levelIndexAI = 0;       // индекс персонажа в команде ИИ
var levelIntercept = false; // перехват планеты (да или нет)

function levelCreate(planetID, intercept)
{
    levelStage = new PIXI.Container();
    stage.addChild(levelStage);
    
    levelPlanetID = planetID;
    levelStatus = LEVEL_STATUS_BATTLE;
    levelCommandUser = [];
    levelCommandAI = [];
    levelIndexUser = 0;
    levelIndexAI = 0;
    
    levelBackground();
    levelBackgroundParallaxTween();
    timerCreate();
    if(side === SIDE_JEDI)
    {
        levelBorderBlue();
        levelDesktopBlue();
    }
    if(side === SIDE_SITH)
    {
        levelBorderRed();
        levelDesktopRed();
    }
    levelShowCommandUser();
    levelShowCommandAI();
    levelFieldCreate();
}

function levelRemove()
{
    stage.removeChild(levelStage);
    levelStage = null;
}

function levelBackground(planetID)
{
    levelStarsSprite = new PIXI.Sprite(stars1Texture); 
    levelStarsSprite.position.x = 0; 
    levelStarsSprite.position.y = 0; 
    levelStage.addChild(levelStarsSprite);
      
    levelPlanetSprite = new PIXI.Sprite(planetTextures[levelPlanetID][1]); 
    levelPlanetSprite.position.x = 300; 
    levelPlanetSprite.position.y = 100;
    levelStage.addChild(levelPlanetSprite);
    
    levelLandscapeSprite = new PIXI.Sprite(planetTextures[levelPlanetID][2]);
    levelLandscapeSprite.position.x = 0; 
    levelLandscapeSprite.position.y = 0; 
    levelLandscapeSprite.alpha = 0.0;
    levelStage.addChild(levelLandscapeSprite);
}

function levelBackgroundParallaxTween()
{
    createjs.Tween.get(levelStarsSprite, {loop: true}) 
            .to({x: -50, y: 0}, 10000, createjs.Ease.getPowInOut(3))
            .to({x: -50, y: -50}, 10000, createjs.Ease.getPowInOut(3))
            .to({x: 0, y: -50}, 10000, createjs.Ease.getPowInOut(3))
            .to({x: 0, y: 0}, 10000, createjs.Ease.getPowInOut(3));

    createjs.Tween.get(levelPlanetSprite, {loop: true}) 
            .to({x: 200, y: 100}, 10000, createjs.Ease.getPowInOut(3))
            .to({x: 200, y: 0}, 10000, createjs.Ease.getPowInOut(3))
            .to({x: 300, y: 0}, 10000, createjs.Ease.getPowInOut(3))
            .to({x: 300, y: 100}, 10000, createjs.Ease.getPowInOut(3));
            
    createjs.Tween.get(levelLandscapeSprite, {loop: true}) 
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
}

function levelBorderBlue()
{
    var graphics = new PIXI.Graphics(); 

    graphics.lineStyle(2, 0x0000FF, 1);
    graphics.beginFill(0x000000, 0);
    graphics.drawRect(10, 10, 840, 710);
    graphics.endFill();
    
    graphics.lineStyle(0);
    graphics.beginFill(0xFFFFFF, 1);
    graphics.drawCircle(5, 600,4);
    graphics.endFill();

    graphics.lineStyle(2, 0xFFFFFF, 1);
    graphics.moveTo(5, 600);
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
    graphics.lineTo(855, 150);

    graphics.lineStyle(0);
    graphics.beginFill(0xFFFFFF, 1);
    graphics.drawCircle(855, 150,4);
    graphics.endFill();

    graphics.lineStyle(2, 0xFFFFFF, 1);
    graphics.beginFill(0x0000FF, 0.0);
    graphics.drawRoundedRect(((MAIN_WIDTH / 2) - (500 / 2)), ((MAIN_HEIGH / 2) - (500 / 2)), 500, 500, 25);
    graphics.endFill();
    
    levelStage.addChild(graphics);
}

function levelBorderRed()
{
    var graphics = new PIXI.Graphics(); 

    graphics.lineStyle(2, 0xFF0000, 1);
    graphics.beginFill(0x000000, 0);
    graphics.drawRect(10, 10, 840, 710);
    graphics.endFill();
    
    graphics.lineStyle(0);
    graphics.beginFill(0xFFFF80, 1);
    graphics.drawCircle(5, 600,4);
    graphics.endFill();

    graphics.lineStyle(2, 0xFFFF80, 1);
    graphics.moveTo(5, 600);
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
    graphics.moveTo(370,20);
    graphics.lineTo(390, 5);
    graphics.moveTo(390,5);
    graphics.lineTo(855, 5);
    graphics.moveTo(855,5);
    graphics.lineTo(855, 150);

    graphics.lineStyle(0);
    graphics.beginFill(0xFFFF80, 1);
    graphics.drawCircle(855, 150,4);
    graphics.endFill();

    graphics.lineStyle(2, 0xFFFF80, 1);
    graphics.beginFill(0xFF0000, 0.0);
    graphics.drawRoundedRect(((MAIN_WIDTH / 2) - (500 / 2)), ((MAIN_HEIGH / 2) - (500 / 2)), 500, 500, 25);
    graphics.endFill();
    
    levelStage.addChild(graphics);
}

function levelDesktopBlue()
{
    var graphics = new PIXI.Graphics(); 
    graphics.lineStyle(2, 0x0000FF, 1);
    graphics.beginFill(0x0080FF, 0.2);
    graphics.moveTo(25, 22);
    graphics.lineTo(370, 22);
    graphics.lineTo(370, 110);
    graphics.lineTo(25, 110);
    graphics.endFill();
    levelStage.addChild(graphics);
    
    graphics = new PIXI.Graphics(); 
    graphics.lineStyle(2, 0x800000, 1);
    graphics.beginFill(0x800000, 0.2);
    graphics.moveTo(490, 620);
    graphics.lineTo(835, 620);
    graphics.lineTo(835, 708);
    graphics.lineTo(490, 708);
    graphics.endFill();
    levelStage.addChild(graphics);
}

function levelDesktopRed()
{
    var graphics = new PIXI.Graphics(); 
    graphics.lineStyle(2, 0x800000, 1);
    graphics.beginFill(0x800000, 0.2);
    graphics.moveTo(25, 22);
    graphics.lineTo(370, 22);
    graphics.lineTo(370, 110);
    graphics.lineTo(25, 110);
    graphics.endFill();
    levelStage.addChild(graphics);
    
    graphics = new PIXI.Graphics(); 
    graphics.lineStyle(2, 0x0000FF, 1);
    graphics.beginFill(0x0080FF, 0.2);
    graphics.moveTo(490, 620);
    graphics.lineTo(835, 620);
    graphics.lineTo(835, 708);
    graphics.lineTo(490, 708);
    graphics.endFill();
    levelStage.addChild(graphics);
}

function levelShowCommandUser()
{
    var index = 0;
    for(var key in userCommandUser)
    {
        if(userCommandUser[key] !== null)
        {
            var textureSprite = new PIXI.Sprite(heroesTextures[userCommandUser[key]][3]); 
            textureSprite.position.x = 55 + (105 * index); 
            textureSprite.position.y = 30; 
            levelStage.addChild(textureSprite);
        }
        index++;
    }
}

function levelShowCommandAI()
{
    var index = 0;
    for(var key in userCommandAI)
    {
        if(userCommandAI[key] !== null)
        {
            var textureSprite = new PIXI.Sprite(heroesTextures[userCommandAI[key]][3]); 
            textureSprite.position.x = 520 + (105 * index); 
            textureSprite.position.y = 628; 
            levelStage.addChild(textureSprite);
        }
        index++;
    }
}

/* Создание игрового поля ========================================================== */
function levelFieldCreate()
{
    createMatchField(userLevels[levelPlanetID]);
    levelStage.addChild(matchStage);
}
/* =========================================================================== */

/* == КОНЕЦ ФАЙЛА ========================================================== */

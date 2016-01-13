
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

var levelStyleButtonBlueText = { font : 'bold 18px Arial', fill : '#FFFFFF', stroke : '#0090F0', strokeThickness : 1, wordWrap : true, wordWrapWidth : 200 }; 
var levelStyleButtonRedText = { font : 'bold 18px Arial', fill : '#FFFFFF', stroke : '#880000', strokeThickness : 1, wordWrap : true, wordWrapWidth : 200 }; 
var levelStyleDroidBlueText = { font : 'bold 14px Arial', fill : '#C4DEFB', stroke : '#0090F0', strokeThickness : 1, wordWrap : true, wordWrapWidth : 270 }; 
var levelStyleDroidRedText = { font : 'bold 14px Arial', fill : '#EDCDCB', stroke : '#880000', strokeThickness : 1, wordWrap : true, wordWrapWidth : 270 }; 
var levelStyleButtonsBlueText = { font : 'bold 14px Arial', fill : '#FFFFFF', stroke : '#0090F0', strokeThickness : 1, wordWrap : true, wordWrapWidth : 200 }; 
var levelStyleButtonsRedText = { font : 'bold 14px Arial', fill : '#FFFFFF', stroke : '#880000', strokeThickness : 1, wordWrap : true, wordWrapWidth : 200 }; 


var levelCommandUser = [];  // команда пользователя (userCommandUser)
var levelCommandAI = [];    // команда ИИ (userCommandAI)
var levelIndexUser = 0;     // индекс персонажа в команде пользователя
var levelIndexAI = 0;       // индекс персонажа в команде ИИ
var levelBorderPersonageUser;
var levelBorderPersonageAI;
var levelPersonageUserSprite;
var levelPersonageAISprite;
var levelUserHit1Text;
var levelUserHit2Text;
var levelUserHit3Text;
var levelUserHit4Text;
var levelUserHit5Text;
var levelUserLifeText;
var levelUserHit1;
var levelUserHit2;
var levelUserHit3;
var levelUserHit4;
var levelUserHit5;
var levelUserLife;
var levelAIHit1Text;
var levelAIHit2Text;
var levelAIHit3Text;
var levelAIHit4Text;
var levelAIHit5Text;
var levelAILifeText;
var levelAIHit1;
var levelAIHit2;
var levelAIHit3;
var levelAIHit4;
var levelAIHit5;
var levelAILife;

var levelLineUserAnimationGraphics;
var levelLineAIAnimationGraphics;
var levelMessageLineGraphics;

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
    
    levelInitCommands(intercept);
    
    levelBackground();
    levelBackgroundParallaxTween();
    timerCreate();
    if(side === SIDE_JEDI)
    {
        levelBorderBlue();
        levelDesktopBlue();
        levelDroidBlue();
    }
    if(side === SIDE_SITH)
    {
        levelBorderRed();
        levelDesktopRed();
        levelDroidRed();
    }
    levelBattons();
    levelShowCommandUser();
    levelShowCommandAI();
    levelFieldCreate();
}

function levelRemove()
{
    stage.removeChild(levelStage);
    levelStage = null;
}

function levelInitCommands(intercept)
{
    levelDisplayUser = [];
    levelDisplayAI = [];
    if(intercept === true)
    {
        levelCommandUser = [];
        for(var key in userCommandUser)
        {
            if(userCommandUser[key] !== null)
            {
                var life = (userPersonages[userCommandUser[key]].hitDefense1 + userPersonages[userCommandUser[key]].hitDefense2 + userPersonages[userCommandUser[key]].hitDefense3 + userPersonages[userCommandUser[key]].hitDefense4 + userPersonages[userCommandUser[key]].hitDefense5) / 10 * 50;
                userPersonages[userCommandUser[key]].life = Math.round(life);
                levelCommandUser.push(userPersonages[userCommandUser[key]]);
            }
        }
        levelUserHit1 = levelCommandUser[levelIndexUser].hitDefense1;
        levelUserHit2 = levelCommandUser[levelIndexUser].hitDefense2;
        levelUserHit3 = levelCommandUser[levelIndexUser].hitDefense3;
        levelUserHit4 = levelCommandUser[levelIndexUser].hitDefense4;
        levelUserHit5 = levelCommandUser[levelIndexUser].hitDefense5;
        levelUserLife = levelCommandUser[levelIndexUser].life;

        levelCommandAI = [];
        for(var key in userCommandAI)
        {
            if(userCommandAI[key] !== null)
            {
                var life = (userPersonages[userCommandAI[key]].hitDefense1 + userPersonages[userCommandAI[key]].hitDefense2 + userPersonages[userCommandAI[key]].hitDefense3 + userPersonages[userCommandAI[key]].hitDefense4 + userPersonages[userCommandAI[key]].hitDefense5) / 10 * 50;
                userPersonages[userCommandAI[key]].life = Math.round(life);
                levelCommandAI.push(userPersonages[userCommandAI[key]]);
            }
        }
        
        levelAIHit1 = levelCommandAI[levelIndexAI].hitDefense1;
        levelAIHit2 = levelCommandAI[levelIndexAI].hitDefense2;
        levelAIHit3 = levelCommandAI[levelIndexAI].hitDefense3;
        levelAIHit4 = levelCommandAI[levelIndexAI].hitDefense4;
        levelAIHit5 = levelCommandAI[levelIndexAI].hitDefense5;
        levelAILife = levelCommandAI[levelIndexAI].life;
        
    }else{
        levelCommandUser = [];
        for(var key in userCommandUser)
        {
            if(userCommandUser[key] !== null)
            {
                var life = (userPersonages[userCommandUser[key]].hitDefense1 + userPersonages[userCommandUser[key]].hitDefense2 + userPersonages[userCommandUser[key]].hitDefense3 + userPersonages[userCommandUser[key]].hitDefense4 + userPersonages[userCommandUser[key]].hitDefense5) / 10 * 50;
                userPersonages[userCommandUser[key]].life = Math.round(life);
                levelCommandUser.push(userPersonages[userCommandUser[key]]);
            }
        }
        levelUserHit1 = levelCommandUser[levelIndexUser].hitDefense1;
        levelUserHit2 = levelCommandUser[levelIndexUser].hitDefense2;
        levelUserHit3 = levelCommandUser[levelIndexUser].hitDefense3;
        levelUserHit4 = levelCommandUser[levelIndexUser].hitDefense4;
        levelUserHit5 = levelCommandUser[levelIndexUser].hitDefense5;
        levelUserLife = levelCommandUser[levelIndexUser].life;
        
        if(side === SIDE_JEDI)
        {
            levelCommandAI = [];
            var life = (userPersonages[userPlanets[levelPlanetID].redPersonage1].hitAttack1 + userPersonages[userPlanets[levelPlanetID].redPersonage1].hitAttack2 + userPersonages[userPlanets[levelPlanetID].redPersonage1].hitAttack3 + userPersonages[userPlanets[levelPlanetID].redPersonage1].hitAttack4 + userPersonages[userPlanets[levelPlanetID].redPersonage1].hitAttack5) / 10 * 50;
            userPersonages[userPlanets[levelPlanetID].redPersonage1].life = Math.round(life);
            levelCommandAI.push(userPersonages[userPlanets[levelPlanetID].redPersonage1]);
            
            life = (userPersonages[userPlanets[levelPlanetID].redPersonage2].hitAttack1 + userPersonages[userPlanets[levelPlanetID].redPersonage2].hitAttack2 + userPersonages[userPlanets[levelPlanetID].redPersonage2].hitAttack3 + userPersonages[userPlanets[levelPlanetID].redPersonage2].hitAttack4 + userPersonages[userPlanets[levelPlanetID].redPersonage2].hitAttack5) / 10 * 50;
            userPersonages[userPlanets[levelPlanetID].redPersonage2].life = Math.round(life);
            levelCommandAI.push(userPersonages[userPlanets[levelPlanetID].redPersonage2]);
            
            life = (userPersonages[userPlanets[levelPlanetID].redPersonage3].hitAttack1 + userPersonages[userPlanets[levelPlanetID].redPersonage3].hitAttack2 + userPersonages[userPlanets[levelPlanetID].redPersonage3].hitAttack3 + userPersonages[userPlanets[levelPlanetID].redPersonage3].hitAttack4 + userPersonages[userPlanets[levelPlanetID].redPersonage3].hitAttack5) / 10 * 50;
            userPersonages[userPlanets[levelPlanetID].redPersonage3].life = Math.round(life);
            levelCommandAI.push(userPersonages[userPlanets[levelPlanetID].redPersonage3]);
        }
        if(side === SIDE_SITH)
        {
            levelCommandAI = [];
            var life = (userPersonages[userPlanets[levelPlanetID].bluePersonage1].hitAttack1 + userPersonages[userPlanets[levelPlanetID].bluePersonage1].hitAttack2 + userPersonages[userPlanets[levelPlanetID].bluePersonage1].hitAttack3 + userPersonages[userPlanets[levelPlanetID].bluePersonage1].hitAttack4 + userPersonages[userPlanets[levelPlanetID].bluePersonage1].hitAttack5) / 10 * 50;
            userPersonages[userPlanets[levelPlanetID].bluePersonage1].life = Math.round(life);
            levelCommandAI.push(userPersonages[userPlanets[levelPlanetID].bluePersonage1]);
            
            life = (userPersonages[userPlanets[levelPlanetID].bluePersonage2].hitAttack1 + userPersonages[userPlanets[levelPlanetID].bluePersonage2].hitAttack2 + userPersonages[userPlanets[levelPlanetID].bluePersonage2].hitAttack3 + userPersonages[userPlanets[levelPlanetID].bluePersonage2].hitAttack4 + userPersonages[userPlanets[levelPlanetID].bluePersonage2].hitAttack5) / 10 * 50;
            userPersonages[userPlanets[levelPlanetID].bluePersonage2].life = Math.round(life);
            levelCommandAI.push(userPersonages[userPlanets[levelPlanetID].bluePersonage2]);
            
            life = (userPersonages[userPlanets[levelPlanetID].bluePersonage3].hitAttack1 + userPersonages[userPlanets[levelPlanetID].bluePersonage3].hitAttack2 + userPersonages[userPlanets[levelPlanetID].bluePersonage3].hitAttack3 + userPersonages[userPlanets[levelPlanetID].bluePersonage3].hitAttack4 + userPersonages[userPlanets[levelPlanetID].bluePersonage3].hitAttack5) / 10 * 50;
            userPersonages[userPlanets[levelPlanetID].bluePersonage3].life = Math.round(life);
            levelCommandAI.push(userPersonages[userPlanets[levelPlanetID].bluePersonage3]);
        }
        
        levelAIHit1 = levelCommandAI[levelIndexAI].hitAttack1;
        levelAIHit2 = levelCommandAI[levelIndexAI].hitAttack2;
        levelAIHit3 = levelCommandAI[levelIndexAI].hitAttack3;
        levelAIHit4 = levelCommandAI[levelIndexAI].hitAttack4;
        levelAIHit5 = levelCommandAI[levelIndexAI].hitAttack5;
        levelAILife = levelCommandAI[levelIndexAI].life;
    }
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
    /* персонажи */
    for(var i in levelCommandUser)
    {
        var textureSprite = new PIXI.Sprite(heroesTextures[levelCommandUser[i].id][3]); 
        textureSprite.position.x = 55 + (105 * i); 
        textureSprite.position.y = 30; 
        levelStage.addChild(textureSprite);
        
        var graphics = new PIXI.Graphics();
        if(side === SIDE_JEDI) graphics.lineStyle(2, 0x0000FF, 0.2);
        if(side === SIDE_SITH) graphics.lineStyle(2, 0xFF0000, 0.2);
        graphics.drawRect(55 + (105 * i), 30, 75, 75);
        
        for(var j = 0; j < 25; j++)
        {
            if(side === SIDE_JEDI) graphics.lineStyle(1, 0x0000FF, 0.2);
            if(side === SIDE_SITH) graphics.lineStyle(1, 0xFF0000, 0.2);
            graphics.moveTo(55 + (105 * i), 30 +(3*j));
            graphics.lineTo(55 + (105 * i) + 75, 30 +(3*j));
            
        }
        levelStage.addChild(graphics);
    }
    
    /* рамка */
    levelBorderPersonageUser = new PIXI.Graphics();
    if(side === SIDE_JEDI) levelBorderPersonageUser.lineStyle(2, 0xFFFFFF, 1);
    if(side === SIDE_SITH) levelBorderPersonageUser.lineStyle(2, 0xFFFF80, 1);
    levelBorderPersonageUser.drawRect(55, 30, 75, 75);
    levelStage.addChild(levelBorderPersonageUser);
    
    /* дисплей фон */
    var graphics = new PIXI.Graphics(); 
    if(side === SIDE_JEDI)
    {
        graphics.lineStyle(2, 0x0000FF, 1);
        graphics.beginFill(0x0080FF, 0.2);
    }
    if(side === SIDE_SITH)
    {
        graphics.lineStyle(2, 0x800000, 1);
        graphics.beginFill(0x800000, 0.2);
    }
    graphics.moveTo(25, 115);
    graphics.lineTo(170, 115);
    graphics.lineTo(170, 400);
    graphics.lineTo(25, 400);
    graphics.endFill();
    levelStage.addChild(graphics);
    
    /* персонаж во весь рост */
    levelPersonageUserSprite = new PIXI.Sprite(heroesTextures[levelCommandUser[levelIndexUser].id][1]); 
    levelPersonageUserSprite.position.x = 30; 
    levelPersonageUserSprite.position.y = 140; 
    levelPersonageUserSprite.scale.set(0.5);
    levelStage.addChild(levelPersonageUserSprite);
    
    /* фон полоски */
    graphics = new PIXI.Graphics();
    for(var i = 0; i < 95; i++)
    {
        if(side === SIDE_JEDI) graphics.lineStyle(1, 0x0000FF, 0.5);
        if(side === SIDE_SITH) graphics.lineStyle(1, 0x800000, 0.5);
        graphics.moveTo(25, 115+(3*i));
        graphics.lineTo(170, 115+(3*i));
    }
    levelStage.addChild(graphics);
    
    /* бегущая полоска */
    levelLineUserAnimationGraphics = new PIXI.Graphics(); 
    if(side === SIDE_JEDI) levelLineUserAnimationGraphics.lineStyle(10, 0x0000FF, 0.3);
    if(side === SIDE_SITH) levelLineUserAnimationGraphics.lineStyle(10, 0x800000, 0.3);
    levelLineUserAnimationGraphics.moveTo(25, 120);
    levelLineUserAnimationGraphics.lineTo(170, 120);
    levelStage.addChild(levelLineUserAnimationGraphics);
    
    /* харктеристики */
    graphics = new PIXI.Graphics(); 
    if(side === SIDE_JEDI)
    {
        graphics.lineStyle(2, 0x0000FF, 1);
        graphics.beginFill(0x0080FF, 0.2);
    }
    if(side === SIDE_SITH)
    {
        graphics.lineStyle(2, 0x800000, 1);
        graphics.beginFill(0x800000, 0.2);
    }
    graphics.moveTo(25, 405);
    graphics.lineTo(170, 405);
    graphics.lineTo(170, 520);
    graphics.lineTo(25, 520);
    graphics.endFill();
    levelStage.addChild(graphics);
    
    var sprite = new PIXI.Sprite(hit1Texture);
    sprite.position.x = 30; sprite.position.y = 410; sprite.scale.set(0.3);
    levelStage.addChild(sprite);
    if(side === SIDE_JEDI) levelUserHit1Text = new PIXI.Text("- " + levelUserHit1, levelStyleButtonBlueText);
    if(side === SIDE_SITH) levelUserHit1Text = new PIXI.Text("- " + levelUserHit1, levelStyleButtonRedText);
    levelUserHit1Text.x = 55; levelUserHit1Text.y = 410;
    levelStage.addChild(levelUserHit1Text);
    
    sprite = new PIXI.Sprite(hit2Texture);
    sprite.position.x = 100; sprite.position.y = 410; sprite.scale.set(0.3);
    levelStage.addChild(sprite);
    if(side === SIDE_JEDI) levelUserHit2Text = new PIXI.Text("- " + levelUserHit2, levelStyleButtonBlueText);
    if(side === SIDE_SITH) levelUserHit2Text = new PIXI.Text("- " + levelUserHit2, levelStyleButtonRedText); 
    levelUserHit2Text.x = 125; levelUserHit2Text.y = 410;
    levelStage.addChild(levelUserHit2Text);
    
    sprite = new PIXI.Sprite(hit3Texture);
    sprite.position.x = 30; sprite.position.y = 450; sprite.scale.set(0.3);
    levelStage.addChild(sprite);
    if(side === SIDE_JEDI) levelUserHit3Text = new PIXI.Text("+ " + levelUserHit3, levelStyleButtonBlueText);
    if(side === SIDE_SITH) levelUserHit3Text = new PIXI.Text("+ " + levelUserHit3, levelStyleButtonRedText); 
    levelUserHit3Text.x = 55; levelUserHit3Text.y = 450;
    levelStage.addChild(levelUserHit3Text);
    
    sprite = new PIXI.Sprite(hit4Texture);
    sprite.position.x = 100; sprite.position.y = 450; sprite.scale.set(0.3);
    levelStage.addChild(sprite);
    if(side === SIDE_JEDI) levelUserHit4Text = new PIXI.Text("- " + levelUserHit4, levelStyleButtonBlueText);
    if(side === SIDE_SITH) levelUserHit4Text = new PIXI.Text("- " + levelUserHit4, levelStyleButtonRedText);
    levelUserHit4Text.x = 125; levelUserHit4Text.y = 450;
    levelStage.addChild(levelUserHit4Text);
    
    sprite = new PIXI.Sprite(hit5Texture);
    sprite.position.x = 30; sprite.position.y = 490; sprite.scale.set(0.3);
    levelStage.addChild(sprite);
    if(side === SIDE_JEDI) levelUserHit5Text = new PIXI.Text("- " + levelUserHit5, levelStyleButtonBlueText);
    if(side === SIDE_SITH) levelUserHit5Text = new PIXI.Text("- " + levelUserHit5, levelStyleButtonRedText); 
    levelUserHit5Text.x = 55; levelUserHit5Text.y = 490;
    levelStage.addChild(levelUserHit5Text);
    
    graphics = new PIXI.Graphics(); 
    if(side === SIDE_JEDI)
    {
        graphics.lineStyle(2, 0x0000FF, 1);
        graphics.beginFill(0x0080FF, 0.2);
    }
    if(side === SIDE_SITH)
    {
        graphics.lineStyle(2, 0x800000, 1);
        graphics.beginFill(0x800000, 0.2);
    }
    graphics.moveTo(25, 525);
    graphics.lineTo(170, 525);
    graphics.lineTo(170, 555);
    graphics.lineTo(25, 555);
    graphics.endFill();
    levelStage.addChild(graphics);
    
    if(side === SIDE_JEDI) levelUserLifeText = new PIXI.Text("Здоровье: " + levelUserLife, levelStyleButtonBlueText); 
    if(side === SIDE_SITH) levelUserLifeText = new PIXI.Text("Здоровье: " + levelUserLife, levelStyleButtonRedText); 
    levelUserLifeText.x = 27; levelUserLifeText.y = 530;
    levelStage.addChild(levelUserLifeText);
}

function levelShowCommandAI()
{
    /* персонажи */
    for(var i in levelCommandAI)
    {
        var textureSprite = new PIXI.Sprite(heroesTextures[levelCommandAI[i].id][3]); 
        textureSprite.position.x = 520 + (105 * i); 
        textureSprite.position.y = 628; 
        levelStage.addChild(textureSprite);
        
        var graphics = new PIXI.Graphics();
        if(side === SIDE_JEDI) graphics.lineStyle(2, 0xFF0000, 0.2);
        if(side === SIDE_SITH) graphics.lineStyle(2, 0x0000FF, 0.2);
        graphics.drawRect(520 + (105 * i), 628, 75, 75);
        
        for(var j = 0; j < 25; j++)
        {
            if(side === SIDE_JEDI) graphics.lineStyle(1, 0xFF0000, 0.2);
            if(side === SIDE_SITH) graphics.lineStyle(1, 0x0000FF, 0.2);
            graphics.moveTo(520 + (105 * i), 628 +(3*j));
            graphics.lineTo(520 + (105 * i) + 75, 628 +(3*j));
        }
        levelStage.addChild(graphics);
    }
    
    /* рамка */
    levelBorderPersonageAI = new PIXI.Graphics();
    if(side === SIDE_JEDI) levelBorderPersonageAI.lineStyle(2, 0xFFFF80, 1);
    if(side === SIDE_SITH) levelBorderPersonageAI.lineStyle(2, 0xFFFFFF, 1);
    levelBorderPersonageAI.drawRect(520, 628, 75, 75);
    levelStage.addChild(levelBorderPersonageAI);
    
    /* дисплей фон */
    var graphics = new PIXI.Graphics(); 
    if(side === SIDE_SITH)
    {
        graphics.lineStyle(2, 0x0000FF, 1);
        graphics.beginFill(0x0080FF, 0.2);
    }
    if(side === SIDE_JEDI)
    {
        graphics.lineStyle(2, 0x800000, 1);
        graphics.beginFill(0x800000, 0.2);
    }
    graphics.moveTo(690, 330);
    graphics.lineTo(835, 330);
    graphics.lineTo(835, 615);
    graphics.lineTo(690, 615);
    graphics.endFill();
    levelStage.addChild(graphics);
    
    /* персонаж во весь рост */
    levelPersonageAISprite = new PIXI.Sprite(heroesTextures[levelCommandAI[levelIndexAI].id][2]); 
    levelPersonageAISprite.position.x = 695; 
    levelPersonageAISprite.position.y = 350; 
    levelPersonageAISprite.scale.set(0.5);
    levelStage.addChild(levelPersonageAISprite);
    
    /* фон полоски */
    graphics = new PIXI.Graphics();
    for(var i = 0; i < 95; i++)
    {
        if(side === SIDE_SITH) graphics.lineStyle(1, 0x0000FF, 0.5);
        if(side === SIDE_JEDI) graphics.lineStyle(1, 0x800000, 0.5);
        graphics.moveTo(690, 330+(3*i));
        graphics.lineTo(835, 330+(3*i));
    }
    levelStage.addChild(graphics);
    
    /* бегущая полоска */
    levelLineAIAnimationGraphics = new PIXI.Graphics(); 
    if(side === SIDE_SITH) levelLineAIAnimationGraphics.lineStyle(10, 0x0000FF, 0.3);
    if(side === SIDE_JEDI) levelLineAIAnimationGraphics.lineStyle(10, 0x800000, 0.3);
    levelLineAIAnimationGraphics.moveTo(690, 335);
    levelLineAIAnimationGraphics.lineTo(835, 335);
    levelStage.addChild(levelLineAIAnimationGraphics);
    levelLineAnimationGraphicsTween();
    
    /* харктеристики */
    graphics = new PIXI.Graphics(); 
    if(side === SIDE_SITH)
    {
        graphics.lineStyle(2, 0x0000FF, 1);
        graphics.beginFill(0x0080FF, 0.2);
    }
    if(side === SIDE_JEDI)
    {
        graphics.lineStyle(2, 0x800000, 1);
        graphics.beginFill(0x800000, 0.2);
    }
    graphics.moveTo(690, 325);
    graphics.lineTo(835, 325);
    graphics.lineTo(835, 210);
    graphics.lineTo(690, 210);
    graphics.endFill();
    levelStage.addChild(graphics);
    
    var sprite = new PIXI.Sprite(hit1Texture);
    sprite.position.x = 695; sprite.position.y = 215; sprite.scale.set(0.3);
    levelStage.addChild(sprite);
    if(side === SIDE_SITH) levelAIHit1Text = new PIXI.Text("- " + levelAIHit1, levelStyleButtonBlueText);
    if(side === SIDE_JEDI) levelAIHit1Text = new PIXI.Text("- " + levelAIHit1, levelStyleButtonRedText); 
    levelAIHit1Text.x = 720; levelAIHit1Text.y = 215;
    levelStage.addChild(levelAIHit1Text);
    
    sprite = new PIXI.Sprite(hit2Texture);
    sprite.position.x = 765; sprite.position.y = 215; sprite.scale.set(0.3);
    levelStage.addChild(sprite);
    if(side === SIDE_SITH) levelAIHit2Text = new PIXI.Text("- " + levelAIHit2, levelStyleButtonBlueText);
    if(side === SIDE_JEDI) levelAIHit2Text = new PIXI.Text("- " + levelAIHit2, levelStyleButtonRedText);  
    levelAIHit2Text.x = 790; levelAIHit2Text.y = 215;
    levelStage.addChild(levelAIHit2Text);
    
    sprite = new PIXI.Sprite(hit3Texture);
    sprite.position.x = 695; sprite.position.y = 250; sprite.scale.set(0.3);
    levelStage.addChild(sprite);
    if(side === SIDE_SITH) levelAIHit3Text = new PIXI.Text("+ " + levelAIHit3, levelStyleButtonBlueText);
    if(side === SIDE_JEDI) levelAIHit3Text = new PIXI.Text("+ " + levelAIHit3, levelStyleButtonRedText);  
    levelAIHit3Text.x = 720; levelAIHit3Text.y = 250;
    levelStage.addChild(levelAIHit3Text);
    
    sprite = new PIXI.Sprite(hit4Texture);
    sprite.position.x = 765; sprite.position.y = 250; sprite.scale.set(0.3);
    levelStage.addChild(sprite);
    if(side === SIDE_SITH) levelAIHit4Text = new PIXI.Text("- " + levelAIHit4, levelStyleButtonBlueText);
    if(side === SIDE_JEDI) levelAIHit4Text = new PIXI.Text("- " + levelAIHit4, levelStyleButtonRedText); 
    levelAIHit4Text.x = 790; levelAIHit4Text.y = 250;
    levelStage.addChild(levelAIHit4Text);
    
    sprite = new PIXI.Sprite(hit5Texture);
    sprite.position.x = 695; sprite.position.y = 290; sprite.scale.set(0.3);
    levelStage.addChild(sprite);
    if(side === SIDE_SITH) levelAIHit5Text = new PIXI.Text("- " + levelAIHit5, levelStyleButtonBlueText);
    if(side === SIDE_JEDI) levelAIHit5Text = new PIXI.Text("- " + levelAIHit5, levelStyleButtonRedText);  
    levelAIHit5Text.x = 720; levelAIHit5Text.y = 290;
    levelStage.addChild(levelAIHit5Text);
    
    graphics = new PIXI.Graphics(); 
    if(side === SIDE_SITH)
    {
        graphics.lineStyle(2, 0x0000FF, 1);
        graphics.beginFill(0x0080FF, 0.2);
    }
    if(side === SIDE_JEDI)
    {
        graphics.lineStyle(2, 0x800000, 1);
        graphics.beginFill(0x800000, 0.2);
    }
    graphics.moveTo(690, 205);
    graphics.lineTo(835, 205);
    graphics.lineTo(835, 175);
    graphics.lineTo(690, 175);
    graphics.endFill();
    levelStage.addChild(graphics);
    
    if(side === SIDE_SITH) levelAILifeText = new PIXI.Text("Здоровье: " + levelAILife, levelStyleButtonBlueText); 
    if(side === SIDE_JEDI) levelAILifeText = new PIXI.Text("Здоровье: " + levelAILife, levelStyleButtonRedText); 
    levelAILifeText.x = 692; levelAILifeText.y = 180;
    levelStage.addChild(levelAILifeText);
}


function levelDroidBlue()
{
    var textureSprite = new PIXI.Sprite(r2d2DroidBlueRightTexture); 
    textureSprite.position.x = 765; 
    textureSprite.position.y = 50; 
    textureSprite.scale.set(0.3);
    levelStage.addChild(textureSprite);
    
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
    levelStage.addChild(graphics);
    
    levelMessageLineGraphics = new PIXI.Graphics(); 
    levelMessageLineGraphics.lineStyle(10, 0x0090F0, 0.3);
    levelMessageLineGraphics.moveTo(480, 25);
    levelMessageLineGraphics.lineTo(760, 25);
    levelStage.addChild(levelMessageLineGraphics);
    
    var text = new PIXI.Text("Миссия " + userPlanets[levelPlanetID].name + "\nПобедите всех своих соперников.\nДля этого наносите удары собирая кристалы три в ряд.\nУдары наносите по очереди.", levelStyleDroidBlueText); 
    text.x = 490; 
    text.y = 23; 
    levelStage.addChild(text);
}

function levelDroidRed()
{
    var textureSprite = new PIXI.Sprite(r2d2DroidRedRightTexture); 
    textureSprite.position.x = 765; 
    textureSprite.position.y = 50; 
    textureSprite.scale.set(0.3);
    levelStage.addChild(textureSprite);
    
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
    levelStage.addChild(graphics);
    
    levelMessageLineGraphics = new PIXI.Graphics(); 
    levelMessageLineGraphics.lineStyle(10, 0xA63A24, 0.3);
    levelMessageLineGraphics.moveTo(480, 25);
    levelMessageLineGraphics.lineTo(760, 25);
    levelStage.addChild(levelMessageLineGraphics);
    
    var text = new PIXI.Text("Миссия " + userPlanets[levelPlanetID].name + "\nПобедите всех своих соперников.\nДля этого наносите удары собирая кристалы три в ряд.\nУдары наносите по очереди.", levelStyleDroidRedText); 
    text.x = 490; 
    text.y = 23; 
    levelStage.addChild(text);
}

function levelLineAnimationGraphicsTween()
{
    createjs.Tween.get(levelLineUserAnimationGraphics, {loop: true}) 
        .to({x: 0, y: 275}, 2500, createjs.Ease.getPowInOut(3));
    createjs.Tween.get(levelLineAIAnimationGraphics, {loop: true}) 
        .to({x: 0, y: 275}, 2500, createjs.Ease.getPowInOut(3));
    createjs.Tween.get(levelMessageLineGraphics, {loop: true}) 
        .to({x: 0, y: 80}, 2000, createjs.Ease.getPowInOut(3));
    createjs.Ticker.setFPS(60);
}

function levelSelectPersonageUser()
{
    var position = [[0,0],[105,0],[210,0]];
    levelBorderPersonageUser.x = position[levelIndexUser][0];
    levelBorderPersonageUser.y = position[levelIndexUser][1];
    position = null;
    levelPersonageUserSprite.texture = heroesTextures[levelCommandUser[levelIndexUser].id][1];
    levelUserHit1 = levelCommandUser[levelIndexUser].hitDefense1;
    levelUserHit2 = levelCommandUser[levelIndexUser].hitDefense2;
    levelUserHit3 = levelCommandUser[levelIndexUser].hitDefense3;
    levelUserHit4 = levelCommandUser[levelIndexUser].hitDefense4;
    levelUserHit5 = levelCommandUser[levelIndexUser].hitDefense5;
    levelUserLife = levelCommandUser[levelIndexUser].life;
    levelUserHit1Text.text = "- " + levelUserHit1;
    levelUserHit2Text.text = "- " + levelUserHit2;
    levelUserHit3Text.text = "+ " + levelUserHit3;
    levelUserHit4Text.text = "- " + levelUserHit4;
    levelUserHit5Text.text = "- " + levelUserHit5;
    levelUserLifeText.text = "Здоровье: " + levelUserLife;
}

function levelSelectPersonageAI()
{
    var position = [[0,0],[105,0],[210,0]];
    levelBorderPersonageAI.x = position[levelIndexAI][0];
    levelBorderPersonageAI.y = position[levelIndexAI][1];
    position = null;
    levelPersonageAISprite.texture = heroesTextures[levelCommandAI[levelIndexAI].id][2];
    levelAIHit1 = levelCommandAI[levelIndexAI].hitAttack1;
    levelAIHit2 = levelCommandAI[levelIndexAI].hitAttack2;
    levelAIHit3 = levelCommandAI[levelIndexAI].hitAttack3;
    levelAIHit4 = levelCommandAI[levelIndexAI].hitAttack4;
    levelAIHit5 = levelCommandAI[levelIndexAI].hitAttack5;
    levelAILife = levelCommandAI[levelIndexAI].life;
    levelAIHit1Text.text = "- " + levelAIHit1;
    levelAIHit2Text.text = "- " + levelAIHit2;
    levelAIHit3Text.text = "+ " + levelAIHit3;
    levelAIHit4Text.text = "- " + levelAIHit4;
    levelAIHit5Text.text = "- " + levelAIHit5;
    levelAILifeText.text = "Здоровье: " + levelAILife;
}

function levelBattons()
{
    var textArr = ["ЗАКОНЧИТЬ БИТВУ", "НАСТРОЙКИ", "ВЫЙТИ В МЕНЮ", "ПРИГЛАСИТЬ"];
    var nameArr = ["EndBattle", "Settings", "BackMenu", "Invite"];
    
    var button; 
    if(side === SIDE_JEDI) button = new PIXI.extras.MovieClip(animTexButtonBlue);
    if(side === SIDE_SITH) button = new PIXI.extras.MovieClip(animTexButtonRed);
    button.name = nameArr[0];
    button.position.x = 35; 
    button.position.y = 670; 
    button.interactive = true; 
    button.buttonMode = true; 
    button.loop = false; 
    button.animationSpeed = 0.2;
    button.onComplete = onLevelButtonUpdate;
    button.tap = onLevelButtonClick; 
    button.click = onLevelButtonClick; 
    button.on('mouseover', onLevelButtonOver);
    button.on('mouseout', onLevelButtonOut);
    var text; 
    if(side === SIDE_JEDI) text = new PIXI.Text(textArr[0], levelStyleButtonsBlueText); 
    if(side === SIDE_SITH) text = new PIXI.Text(textArr[0], levelStyleButtonsRedText); 
    text.x = (button.width / 2) - (text.width / 2);
    text.y = button.height / 3;
    button.addChild(text); 
    levelStage.addChild(button);
    
    if(side === SIDE_JEDI) button = new PIXI.extras.MovieClip(animTexButtonBlue);
    if(side === SIDE_SITH) button = new PIXI.extras.MovieClip(animTexButtonRed); 
    button.name = nameArr[1];
    button.position.x = 255; 
    button.position.y = 670; 
    button.interactive = true; 
    button.buttonMode = true; 
    button.loop = false; 
    button.animationSpeed = 0.2;
    button.onComplete = onLevelButtonUpdate;
    button.tap = onLevelButtonClick; 
    button.click = onLevelButtonClick; 
    button.on('mouseover', onLevelButtonOver);
    button.on('mouseout', onLevelButtonOut);
    if(side === SIDE_JEDI) text = new PIXI.Text(textArr[1], levelStyleButtonsBlueText); 
    if(side === SIDE_SITH) text = new PIXI.Text(textArr[1], levelStyleButtonsRedText);
    text.x = (button.width / 2) - (text.width / 2);
    text.y = button.height / 3;
    button.addChild(text); 
    levelStage.addChild(button);
    
    if(side === SIDE_JEDI) button = new PIXI.extras.MovieClip(animTexButtonBlue);
    if(side === SIDE_SITH) button = new PIXI.extras.MovieClip(animTexButtonRed); 
    button.name = nameArr[2];
    button.position.x = 35; 
    button.position.y = 620; 
    button.interactive = true; 
    button.buttonMode = true; 
    button.loop = false; 
    button.animationSpeed = 0.2;
    button.onComplete = onLevelButtonUpdate;
    button.tap = onLevelButtonClick; 
    button.click = onLevelButtonClick; 
    button.on('mouseover', onLevelButtonOver);
    button.on('mouseout', onLevelButtonOut);
    if(side === SIDE_JEDI) text = new PIXI.Text(textArr[2], levelStyleButtonsBlueText); 
    if(side === SIDE_SITH) text = new PIXI.Text(textArr[2], levelStyleButtonsRedText);
    text.x = (button.width / 2) - (text.width / 2);
    text.y = button.height / 3;
    button.addChild(text); 
    levelStage.addChild(button);
    
    if(side === SIDE_JEDI) button = new PIXI.extras.MovieClip(animTexButtonBlue);
    if(side === SIDE_SITH) button = new PIXI.extras.MovieClip(animTexButtonRed); 
    button.name = nameArr[3];
    button.position.x = 255; 
    button.position.y = 620; 
    button.interactive = true; 
    button.buttonMode = true; 
    button.loop = false; 
    button.animationSpeed = 0.2;
    button.onComplete = onLevelButtonUpdate;
    button.tap = onLevelButtonClick; 
    button.click = onLevelButtonClick; 
    button.on('mouseover', onLevelButtonOver);
    button.on('mouseout', onLevelButtonOut);
    if(side === SIDE_JEDI) text = new PIXI.Text(textArr[3], levelStyleButtonsBlueText); 
    if(side === SIDE_SITH) text = new PIXI.Text(textArr[3], levelStyleButtonsRedText); 
    text.x = (button.width / 2) - (text.width / 2);
    text.y = button.height / 3;
    button.addChild(text); 
    levelStage.addChild(button);
}

function onLevelButtonOver()
{
    this.isOver = true;
    this.gotoAndPlay(1);
}

function onLevelButtonOut()
{
    this.isOver = false;
    this.gotoAndStop(0);
}

function onLevelButtonUpdate()
{
    if(this.isOver)
    {
        this.gotoAndPlay(1);
    }else{
        this.gotoAndStop(0);
    }
}

function onLevelButtonClick() 
{
    switch (this.name)
    {
        case "EndBattle":
            timerStop();
            break;
        case "Settings":
            
            break;
        case "BackMenu":
            
            break;
        case "Invite": 
            VK.callMethod("showInviteBox");
            break;
        default:
            break;
    }
    
}

/* Создание игрового поля =================================================== */
function levelFieldCreate()
{
    createMatchField(userLevels[levelPlanetID]);
    levelStage.addChild(matchStage);
}
/* ========================================================================== */

/* ПРОГРЕСС: Уменьшение значений LifeBars =================================== */
function levelReduceLifeBar(hitType, hitCount, hitModeAI) 
{
    if(hitModeAI === false) // удар пользователя (урон ИИ)
    {
	if(hitType === MATCH_HIT_1)
        {
            levelCommandAI[levelIndexAI].life -= (levelUserHit1 * hitCount);
            levelAILife = levelCommandAI[levelIndexAI].life;
            if(levelAILife < 0) levelAILife = 0;
            levelAILifeText.text = "Здоровье: " + levelAILife;
        }
        if(hitType === MATCH_HIT_2)
        {
            levelCommandAI[levelIndexAI].life -= (levelUserHit2 * hitCount);
            levelAILife = levelCommandAI[levelIndexAI].life;
            if(levelAILife < 0) levelAILife = 0;
            levelAILifeText.text = "Здоровье: " + levelAILife;
        }
        if(hitType === MATCH_HIT_3)
        {
            levelCommandUser[levelIndexUser].life += (levelUserHit3 * hitCount);
            levelUserLife = levelCommandUser[levelIndexUser].life;
            if(levelAILife < 0) levelAILife = 0;
            levelUserLifeText.text = "Здоровье: " + levelUserLife;
        }
        if(hitType === MATCH_HIT_4)
        {
            levelCommandAI[levelIndexAI].life -= (levelUserHit4 * hitCount);
            levelAILife = levelCommandAI[levelIndexAI].life;
            if(levelAILife < 0) levelAILife = 0;
            levelAILifeText.text = "Здоровье: " + levelAILife;
        }
        if(hitType === MATCH_HIT_5)
        {
            levelCommandAI[levelIndexAI].life -= (levelUserHit5 * hitCount);
            levelAILife = levelCommandAI[levelIndexAI].life;
            if(levelAILife < 0) levelAILife = 0;
            levelAILifeText.text = "Здоровье: " + levelAILife;
        }
    }else{ // удар ИИ (урон пользователю)
	if(hitType === MATCH_HIT_1)
        {
            levelCommandUser[levelIndexUser].life -= (levelAIHit1 * hitCount);
            levelUserLife = levelCommandUser[levelIndexUser].life;
            if(levelUserLife < 0) levelUserLife = 0;
            levelUserLifeText.text = "Здоровье: " + levelUserLife;
        }
        if(hitType === MATCH_HIT_2)
        {
            levelCommandUser[levelIndexUser].life -= (levelAIHit2 * hitCount);
            levelUserLife = levelCommandUser[levelIndexUser].life;
            if(levelUserLife < 0) levelUserLife = 0;
            levelUserLifeText.text = "Здоровье: " + levelUserLife;
        }
        if(hitType === MATCH_HIT_3)
        {
            levelCommandAI[levelIndexAI].life += (levelAIHit2 * hitCount);
            levelAILife = levelCommandAI[levelIndexAI].life;
            if(levelUserLife < 0) levelUserLife = 0;
            levelAILifeText.text = "Здоровье: " + levelAILife;
        }
        if(hitType === MATCH_HIT_4)
        {
            levelCommandUser[levelIndexUser].life -= (levelAIHit4 * hitCount);
            levelUserLife = levelCommandUser[levelIndexUser].life;
            if(levelUserLife < 0) levelUserLife = 0;
            levelUserLifeText.text = "Здоровье: " + levelUserLife;
        }
        if(hitType === MATCH_HIT_5)
        {
            levelCommandUser[levelIndexUser].life -= (levelAIHit5 * hitCount);
            levelUserLife = levelCommandUser[levelIndexUser].life;
            if(levelUserLife < 0) levelUserLife = 0;
            levelUserLifeText.text = "Здоровье: " + levelUserLife;
        }
    }
}
/* ========================================================================== */

/* Меняем персонаж ========================================================== */
function levelExchangePersonage(mode)
{
    if(mode === "AI") // меняем персонаж ИИ
    {
        if(levelCommandAI[0].life <= 0 && levelCommandAI[1].life <= 0 && levelCommandAI[2].life <= 0)
        {
            // битва завершена ИИ проиграл!
            timerPause = true;
            timerStop();
            levelStage.removeChild(levelPersonageAISprite);
            levelStage.removeChild(levelAIHit1Text);
            levelStage.removeChild(levelAIHit2Text);
            levelStage.removeChild(levelAIHit3Text);
            levelStage.removeChild(levelAIHit4Text);
            levelStage.removeChild(levelAIHit5Text);
            levelStage.removeChild(levelAILifeText);
            console.log("ИИ проиграл!");
            
        }else{
            if(levelIndexAI < 2) levelIndexAI++;
            else levelIndexAI = 0;
            if(levelCommandAI[levelIndexAI].life <= 0) levelExchangePersonage("AI");
            else levelSelectPersonageAI();
            
            if(levelCommandUser[levelIndexUser].life <= 0)
            {
                var position = [[55,30],[160,30],[265,30]];
                var sprite = new PIXI.Sprite(personageDeadTexture);
                sprite.position.x = position[levelIndexUser][0];
                sprite.position.y = position[levelIndexUser][1];
                levelStage.addChild(sprite);
                position = null;
                levelExchangePersonage("USER");
            }
        }
    }
    if(mode === "USER") // меняем персонажа пользователя
    {
        if(levelCommandUser[0].life <= 0 && levelCommandUser[1].life <= 0 && levelCommandUser[2].life <= 0)
        {
            // битва завершена Пользователь проиграл!
            timerPause = true;
            timerStop();
            levelStage.removeChild(levelPersonageUserSprite);
            levelStage.removeChild(levelUserHit1Text);
            levelStage.removeChild(levelUserHit2Text);
            levelStage.removeChild(levelUserHit3Text);
            levelStage.removeChild(levelUserHit4Text);
            levelStage.removeChild(levelUserHit5Text);
            levelStage.removeChild(levelUserLifeText);
            console.log("Пользователь проиграл!");
            
        }else{
            if(levelIndexUser < 2)levelIndexUser++;
            else levelIndexUser = 0;
            if(levelCommandUser[levelIndexUser].life <= 0) levelExchangePersonage("USER");
            else levelSelectPersonageUser();
            
            if(levelCommandAI[levelIndexAI].life <= 0)
            {
                var position = [[520,628],[625,628],[730,628]];
                var sprite = new PIXI.Sprite(personageDeadTexture);
                sprite.position.x = position[levelIndexAI][0];
                sprite.position.y = position[levelIndexAI][1];
                levelStage.addChild(sprite);
                position = null;
                levelExchangePersonage("AI");
            }
        }
    }
}
/* ========================================================================== */	


/* == КОНЕЦ ФАЙЛА ========================================================== */

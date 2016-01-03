
/* == НАЧАЛО ФАЙЛА ========================================================= */

var sbattleStage;
var sbattleLineAnimationGraphics;
var sbattleStyleBlueText = { font : 'bold 18px Arial', fill : '#C4DEFB', stroke : '#0090F0', strokeThickness : 1, wordWrap : true, wordWrapWidth : 340, align: "center"}; 
var sbattleStyleRedText = { font : 'bold 18px Arial', fill : '#EDCDCB', stroke : '#880000', strokeThickness : 1, wordWrap : true, wordWrapWidth : 340, align: "center"}; 
var sbattleButtonStyleBlueText = { font : 'bold 24px Arial', fill : '#FFFFFF', stroke : '#0090F0', strokeThickness : 1, wordWrap : true, wordWrapWidth : 340 }; 
var sbattleButtonStyleRedText = { font : 'bold 24px Arial', fill : '#FFFFFF', stroke : '#880000', strokeThickness : 1, wordWrap : true, wordWrapWidth : 340 }; 
var sbattlePlanetID

function sbattleCreate(planetTargetID)
{
    sbattleStage = new PIXI.Container();
    stage.addChild(sbattleStage);
    sbattlePlanetID = planetTargetID;
    
    sbattleBackground();
    sbattleWindow();
    sbattleTitle();
    sbattleText();
    sbattleButtons();
}

function sbattleRemove()
{
    stage.removeChild(sbattleStage);
    sbattleStage = null;
}

function sbattleBackground()
{
    var graphics = new PIXI.Graphics(); 
    graphics.hitArea = new PIXI.Rectangle(0, 0, MAIN_WIDTH, MAIN_HEIGH);
    graphics.interactive = true;
    graphics.lineStyle(1, 0x000000, 0.05);
    graphics.beginFill(0x000000, 0.05);
    graphics.drawRect(0, 0, MAIN_WIDTH, MAIN_HEIGH);
    graphics.endFill();
    sbattleStage.addChild(graphics);
}

function sbattleWindow()
{
    if(side === SIDE_JEDI)
    {
        var graphics = new PIXI.Graphics(); 
        graphics.lineStyle(2, 0xFFFFFF, 1);
        graphics.drawRoundedRect(200, 150, 460, 260, 15);
        graphics.lineStyle(2, 0x0000FF, 1);
        graphics.beginFill(0x00000F, 0.5);
        graphics.drawRoundedRect(210, 160, 440, 240, 5);
        graphics.endFill();
        sbattleStage.addChild(graphics);
        
        var textureSprite = new PIXI.Sprite(heroesTextures[userCommandUser["personage1"]][1]); 
        textureSprite.position.x = 220; 
        textureSprite.position.y = 165; 
        textureSprite.scale.set(0.5);
        sbattleStage.addChild(textureSprite);
        
        textureSprite = new PIXI.Sprite(heroesTextures[userPlanets[sbattlePlanetID].redPersonage1][2]); 
        textureSprite.position.x = 510; 
        textureSprite.position.y = 165; 
        textureSprite.scale.set(0.5);
        sbattleStage.addChild(textureSprite);
        
        graphics = new PIXI.Graphics();
        for(var i = 0; i < 80; i++)
        {
            graphics.lineStyle(1, 0x0000FF, 0.5);
            graphics.moveTo(210, 160+(3*i));
            graphics.lineTo(650, 160+(3*i));
        }
        sbattleStage.addChild(graphics);
        
        sbattleLineAnimationGraphics = new PIXI.Graphics(); 
        sbattleLineAnimationGraphics.lineStyle(10, 0x0000FF, 0.3);
        sbattleLineAnimationGraphics.moveTo(210, 165);
        sbattleLineAnimationGraphics.lineTo(650, 165);
        sbattleStage.addChild(sbattleLineAnimationGraphics);
        sbattleLineAnimationGraphicsTween();
    }
    if(side === SIDE_SITH)
    {
        var graphics = new PIXI.Graphics(); 
        graphics.lineStyle(2, 0xFFFF00, 1);
        graphics.drawRoundedRect(200, 150, 460, 260, 15);
        graphics.lineStyle(2, 0xFF0000, 1);
        graphics.beginFill(0x800000, 0.5);
        graphics.drawRoundedRect(210, 160, 440, 240, 5);
        graphics.endFill();
        sbattleStage.addChild(graphics);
        
        var textureSprite = new PIXI.Sprite(heroesTextures[userCommandUser["personage1"]][1]); 
        textureSprite.position.x = 220; 
        textureSprite.position.y = 165; 
        textureSprite.scale.set(0.5);
        sbattleStage.addChild(textureSprite);
        
        textureSprite = new PIXI.Sprite(heroesTextures[userPlanets[sbattlePlanetID].bluePersonage1][2]); 
        textureSprite.position.x = 510; 
        textureSprite.position.y = 165; 
        textureSprite.scale.set(0.5);
        sbattleStage.addChild(textureSprite);
        
        graphics = new PIXI.Graphics();
        for(var i = 0; i < 80; i++)
        {
            graphics.lineStyle(1, 0xA63A24, 0.5);
            graphics.moveTo(210, 160+(3*i));
            graphics.lineTo(650, 160+(3*i));
        }
        sbattleStage.addChild(graphics);
       
        sbattleLineAnimationGraphics = new PIXI.Graphics(); 
        sbattleLineAnimationGraphics.lineStyle(10, 0xA63A24, 0.3);
        sbattleLineAnimationGraphics.moveTo(210, 165);
        sbattleLineAnimationGraphics.lineTo(650, 165);
        sbattleStage.addChild(sbattleLineAnimationGraphics);
        sbattleLineAnimationGraphicsTween();
    }
}

function sbattleLineAnimationGraphicsTween()
{
    createjs.Tween.get(sbattleLineAnimationGraphics, {loop: true}) 
        .to({x: 0, y: 230}, 2500, createjs.Ease.getPowInOut(3));
    createjs.Ticker.setFPS(60);
}

function sbattleTitle()
{
    var text;
    if(side === SIDE_JEDI) text = new PIXI.Text("БИТВА", sbattleButtonStyleBlueText); 
    if(side === SIDE_SITH) text = new PIXI.Text("БИТВА", sbattleButtonStyleRedText); 
    text.x = 390;
    text.y = 180;
    sbattleStage.addChild(text);
}

function sbattleText()
{
    var hitCountUser = 0;
    hitCountUser += userPersonages[userCommandUser["personage1"]].hitDefense1 
            + userPersonages[userCommandUser["personage1"]].hitDefense2 
            + userPersonages[userCommandUser["personage1"]].hitDefense3 
            + userPersonages[userCommandUser["personage1"]].hitDefense4
            + userPersonages[userCommandUser["personage1"]].hitDefense5;
    hitCountUser += userPersonages[userCommandUser["personage2"]].hitDefense1 
            + userPersonages[userCommandUser["personage2"]].hitDefense2 
            + userPersonages[userCommandUser["personage2"]].hitDefense3 
            + userPersonages[userCommandUser["personage2"]].hitDefense4
            + userPersonages[userCommandUser["personage2"]].hitDefense5;
    hitCountUser += userPersonages[userCommandUser["personage3"]].hitDefense1 
            + userPersonages[userCommandUser["personage3"]].hitDefense2 
            + userPersonages[userCommandUser["personage3"]].hitDefense3 
            + userPersonages[userCommandUser["personage3"]].hitDefense4
            + userPersonages[userCommandUser["personage3"]].hitDefense5;
    hitCountUser /= 10;
    
    var hitCountAI = 0;
    if(side === SIDE_JEDI)
    {
        hitCountAI += userPersonages[userPlanets[sbattlePlanetID].redPersonage1].hitAttack1 
                + userPersonages[userPlanets[sbattlePlanetID].redPersonage1].hitAttack2 
                + userPersonages[userPlanets[sbattlePlanetID].redPersonage1].hitAttack3 
                + userPersonages[userPlanets[sbattlePlanetID].redPersonage1].hitAttack4
                + userPersonages[userPlanets[sbattlePlanetID].redPersonage1].hitAttack5;
        hitCountAI += userPersonages[userPlanets[sbattlePlanetID].redPersonage2].hitAttack1 
                + userPersonages[userPlanets[sbattlePlanetID].redPersonage2].hitAttack2 
                + userPersonages[userPlanets[sbattlePlanetID].redPersonage2].hitAttack3 
                + userPersonages[userPlanets[sbattlePlanetID].redPersonage2].hitAttack4
                + userPersonages[userPlanets[sbattlePlanetID].redPersonage2].hitAttack5;
        hitCountAI += userPersonages[userPlanets[sbattlePlanetID].redPersonage3].hitAttack1 
                + userPersonages[userPlanets[sbattlePlanetID].redPersonage3].hitAttack2 
                + userPersonages[userPlanets[sbattlePlanetID].redPersonage3].hitAttack3 
                + userPersonages[userPlanets[sbattlePlanetID].redPersonage3].hitAttack4
                + userPersonages[userPlanets[sbattlePlanetID].redPersonage3].hitAttack5;
    }
    if(side === SIDE_SITH)
    {
        hitCountAI += userPersonages[userPlanets[sbattlePlanetID].bluePersonage1].hitAttack1 
                + userPersonages[userPlanets[sbattlePlanetID].bluePersonage1].hitAttack2 
                + userPersonages[userPlanets[sbattlePlanetID].bluePersonage1].hitAttack3 
                + userPersonages[userPlanets[sbattlePlanetID].bluePersonage1].hitAttack4
                + userPersonages[userPlanets[sbattlePlanetID].bluePersonage1].hitAttack5;
        hitCountAI += userPersonages[userPlanets[sbattlePlanetID].bluePersonage2].hitAttack1 
                + userPersonages[userPlanets[sbattlePlanetID].bluePersonage2].hitAttack2 
                + userPersonages[userPlanets[sbattlePlanetID].bluePersonage2].hitAttack3 
                + userPersonages[userPlanets[sbattlePlanetID].bluePersonage2].hitAttack4
                + userPersonages[userPlanets[sbattlePlanetID].bluePersonage2].hitAttack5;
        hitCountAI += userPersonages[userPlanets[sbattlePlanetID].bluePersonage3].hitAttack1 
                + userPersonages[userPlanets[sbattlePlanetID].bluePersonage3].hitAttack2 
                + userPersonages[userPlanets[sbattlePlanetID].bluePersonage3].hitAttack3 
                + userPersonages[userPlanets[sbattlePlanetID].bluePersonage3].hitAttack4
                + userPersonages[userPlanets[sbattlePlanetID].bluePersonage3].hitAttack5;
    }
    hitCountAI /= 10;
    
    var text;
    if(side === SIDE_JEDI)
    {
        text = new PIXI.Text("Сила: " + hitCountUser, sbattleStyleBlueText); 
        text.x = (MAIN_WIDTH / 2) - (text.width / 2) - 150;
        text.y = 350;
        sbattleStage.addChild(text);
        text = new PIXI.Text("Сила: " + hitCountAI, sbattleStyleBlueText); 
        text.x = (MAIN_WIDTH / 2) - (text.width / 2) + 150;
        text.y = 350;
        sbattleStage.addChild(text);
    }
    if(side === SIDE_SITH)
    {
        text = new PIXI.Text("Сила: " + hitCountUser, sbattleStyleRedText); 
        text.x = (MAIN_WIDTH / 2) - (text.width / 2) - 150;
        text.y = 350;
        sbattleStage.addChild(text);
        text = new PIXI.Text("Сила: " + hitCountAI, sbattleStyleRedText); 
        text.x = (MAIN_WIDTH / 2) - (text.width / 2) + 150;
        text.y = 350;
        sbattleStage.addChild(text);
    }
    
    
    if(side === SIDE_JEDI) text = new PIXI.Text(heroesTextures[userCommandUser["personage1"]][0] + "\nVS\n" + heroesTextures[userPlanets[sbattlePlanetID].redPersonage1][0], sbattleStyleBlueText); 
    if(side === SIDE_SITH) text = new PIXI.Text(heroesTextures[userCommandUser["personage1"]][0] + "\nVS\n" + heroesTextures[userPlanets[sbattlePlanetID].bluePersonage1][0], sbattleStyleRedText); 
    text.x = (MAIN_WIDTH / 2) - (text.width / 2);
    text.y = 225;
    sbattleStage.addChild(text);
    
}

function sbattleButtons()
{
    if(side === SIDE_JEDI)
    {
        var button = new PIXI.extras.MovieClip(animTexButtonBlue); 
        button.name = "yes";
        button.position.x = (MAIN_WIDTH / 2) -  (button.width / 2.5); 
        button.position.y = 300; 
        button.scale.set(0.8);
        button.interactive = true; 
        button.buttonMode = true; 
        button.loop = false; 
        button.animationSpeed = 0.2;
        button.onComplete = onSBattleButtonButtonUpdate;
        button.tap = onSBattleButtonButtonClick; 
        button.click = onSBattleButtonButtonClick; 
        button.on('mouseover', onSBattleButtonButtonOver);
        button.on('mouseout', onSBattleButtonButtonOut);
        var text = new PIXI.Text("Начать", sbattleButtonStyleBlueText); 
        text.x = (button.width / 2) - (text.width / 3.0);
        text.y = button.height / 3.5;
        button.addChild(text); 
        sbattleStage.addChild(button);
        
        button = new PIXI.extras.MovieClip(animTexButtonBlue); 
        button.name = "no";
        button.position.x = (MAIN_WIDTH / 2) -  (button.width / 2.5);
        button.position.y = 350; 
        button.scale.set(0.8);
        button.interactive = true; 
        button.buttonMode = true; 
        button.loop = false; 
        button.animationSpeed = 0.2;
        button.onComplete = onSBattleButtonButtonUpdate;
        button.tap = onSBattleButtonButtonClick; 
        button.click = onSBattleButtonButtonClick; 
        button.on('mouseover', onSBattleButtonButtonOver);
        button.on('mouseout', onSBattleButtonButtonOut);
        var text = new PIXI.Text("Отмена", sbattleButtonStyleBlueText); 
        text.x = (button.width / 2) - (text.width / 3.0);
        text.y = button.height / 3.5;
        button.addChild(text); 
        sbattleStage.addChild(button);
    }
    if(side === SIDE_SITH)
    {
        var button = new PIXI.extras.MovieClip(animTexButtonRed); 
        button.name = "yes";
        button.position.x = (MAIN_WIDTH / 2) -  (button.width / 2.5); 
        button.position.y = 300; 
        button.scale.set(0.8);
        button.interactive = true; 
        button.buttonMode = true; 
        button.loop = false; 
        button.animationSpeed = 0.2;
        button.onComplete = onSBattleButtonButtonUpdate;
        button.tap = onSBattleButtonButtonClick; 
        button.click = onSBattleButtonButtonClick; 
        button.on('mouseover', onSBattleButtonButtonOver);
        button.on('mouseout', onSBattleButtonButtonOut);
        var text = new PIXI.Text("Начать", sbattleButtonStyleRedText); 
        text.x = (button.width / 2) - (text.width / 3.0);
        text.y = button.height / 3.5;
        button.addChild(text); 
        sbattleStage.addChild(button);
        
        button = new PIXI.extras.MovieClip(animTexButtonRed); 
        button.name = "no";
        button.position.x = (MAIN_WIDTH / 2) -  (button.width / 2.5); 
        button.position.y = 350; 
        button.scale.set(0.8);
        button.interactive = true; 
        button.buttonMode = true; 
        button.loop = false; 
        button.animationSpeed = 0.2;
        button.onComplete = onSBattleButtonButtonUpdate;
        button.tap = onSBattleButtonButtonClick; 
        button.click = onSBattleButtonButtonClick; 
        button.on('mouseover', onSBattleButtonButtonOver);
        button.on('mouseout', onSBattleButtonButtonOut);
        var text = new PIXI.Text("Отмена", sbattleButtonStyleRedText); 
        text.x = (button.width / 2) - (text.width / 3.0);
        text.y = button.height / 3.5;
        button.addChild(text); 
        sbattleStage.addChild(button);
    }
}

function onSBattleButtonButtonOver()
{
    this.isOver = true;
    this.gotoAndPlay(1);
}

function onSBattleButtonButtonOut()
{
    this.isOver = false;
    this.gotoAndStop(0);
}

function onSBattleButtonButtonUpdate()
{
    if(this.isOver)
    {
        this.gotoAndPlay(1);
    }else{
        this.gotoAndStop(0);
    }
}

function onSBattleButtonButtonClick() 
{
    switch (this.name)
    {
        case "yes":
            
            break;
        case "no":
            sbattleRemove();
            break;
        default:
            break;
    }
}

/* == КОНЕЦ ФАЙЛА ========================================================== */

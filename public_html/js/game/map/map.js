
/* == НАЧАЛО ФАЙЛА ========================================================= */

var mapStage;
var mapSprite;
var mapStartPosX;
var mapStartPosY;
var mapDesktopLineGraphics;
var mapMessageLineGraphics;
var mapStyleDroidBlueText = { font : 'bold 12px Arial', fill : '#C4DEFB', stroke : '#0090F0', strokeThickness : 1, wordWrap : true, wordWrapWidth : 145 }; 
var mapStyleButtonBlueText = { font : 'bold 14px Arial', fill : '#FFFFFF', stroke : '#0090F0', strokeThickness : 1, wordWrap : true, wordWrapWidth : 200 }; 
var mapStyleDroidRedText = { font : 'bold 12px Arial', fill : '#EDCDCB', stroke : '#880000', strokeThickness : 1, wordWrap : true, wordWrapWidth : 145 }; 
var mapStyleButtonRedText = { font : 'bold 14px Arial', fill : '#FFFFFF', stroke : '#880000', strokeThickness : 1, wordWrap : true, wordWrapWidth : 200 }; 
var mapTextMessage;
var mapTargetPlanetBlue;
var mapTargetPlanetRed;

function mapCreate() 
{ 
    mapStage = new PIXI.Container();
    
    mapCheckAvailablePersonage();   // определение доступности персонажей команды
    
    mapSpace();                     // построение вселенной
    mapCreatePlanets();             // построение планет
    mapCreateInterface();           // построение интерфейса
    mapCreateTargets();             // построение анимации указывающей на цель
    
    mapDestinationSearch();         // поиск ближайшей цели
    
    stage.addChild(mapStage);
} 

function mapRemove() 
{ 
    stage.removeChild(mapStage); 
    mapStage = null; 
} 

function mapSpace()
{
    if(side === SIDE_JEDI) mapSprite = new PIXI.Sprite(mapSpaceBlueTexture); 
    if(side === SIDE_SITH) mapSprite = new PIXI.Sprite(mapSpaceRedTexture); 
    mapSprite.position.x = -82; 
    mapSprite.position.y = -19; 
    mapSprite.interactive = true;
    mapSprite.on('mousedown', onMapSpaceDown);
    mapSprite.on('touchstart', onMapSpaceDown);
    mapSprite.on('mouseup', onMapSpaceUp);
    mapSprite.on('touchend', onMapSpaceUp);
    mapSprite.on('mouseupoutside', onMapSpaceUp);
    mapSprite.on('touchendoutside', onMapSpaceUp);
    mapSprite.on('mousemove', onMapSpaceMove);
    mapSprite.on('touchmove', onMapSpaceMove);

    mapStage.addChild(mapSprite);
}

function onMapSpaceDown(event)
{
    var cursorPosition = event.data.getLocalPosition(this.parent);
    mapStartPosX = cursorPosition.x;
    mapStartPosY = cursorPosition.y;
    this.data = event.data;
    this.move = true;
}

function onMapSpaceUp()
{
    mapStartPosX = 0;
    mapStartPosY = 0;
    this.move = false;
    this.data = null;
}

function onMapSpaceMove()
{
    if (this.move)
    {
        var newPosition = this.data.getLocalPosition(this.parent);
        if(mapStartPosX < newPosition.x)
        {
            if(this.position.x < -5) this.position.x += 5;
            mapStartPosX = newPosition.x;
        }
        if(mapStartPosX > newPosition.x)
        {
            if(this.position.x  > -160)this.position.x -= 5;
            mapStartPosX = newPosition.x;
        }
        
        if(mapStartPosY < newPosition.y)
        {
            if(this.position.y < -10) this.position.y += 5;
            mapStartPosY = newPosition.y;
        }
        if(mapStartPosY > newPosition.y)
        {
            if(this.position.y > -10)this.position.y -= 5;
            mapStartPosY = newPosition.y;
        }
    }
}

function mapCreatePlanets()
{
    for (var key in userMapPlanets)
    {
        userMapPlanets[key][1].tap = onMapPlanetClick;
        userMapPlanets[key][1].click = onMapPlanetClick;
        userMapPlanets[key][1].on('mouseover', onMapPlanetOver);
        userMapPlanets[key][1].on('mouseout', onMapPlanetOut);
        
        if(side === SIDE_JEDI)
        {
            if(userPlanets[key].status === USER_PLANET_QUEST_AWAITING)
            {
                mapSprite.addChild(userMapPlanets[key][1]);
                mapSprite.addChild(userMapPlanets[key][4]);
                mapSprite.addChild(userMapPlanets[key][2]);
                mapSprite.addChild(userMapPlanets[key][5]);
                mapSprite.addChild(userMapPlanets[key][6]);
                mapSprite.addChild(userMapPlanets[key][7]);
            }
            if(userPlanets[key].status === USER_PLANET_QUEST_COMPLETE_JEDI)
            {
                var graphics = new PIXI.Graphics();
                graphics.beginFill(0x0000FF, 0.25);
                graphics.lineStyle(1, 0x0000FF, 0.8);
                graphics.drawCircle(userMapPlanets[key][2].position.x + 1, userMapPlanets[key][2].position.y + 65, 50);
                graphics.lineStyle(1, 0x0000FF, 1);
                graphics.endFill();
                mapSprite.addChild(graphics);
            
                mapSprite.addChild(userMapPlanets[key][1]);
                mapSprite.addChild(userMapPlanets[key][4]);
                mapSprite.addChild(userMapPlanets[key][2]);
                mapSprite.addChild(userMapPlanets[key][11]);
            }
            if(userPlanets[key].status === USER_PLANET_QUEST_COMPLETE_SITH)
            {
                var graphics = new PIXI.Graphics();
                graphics.beginFill(0xFF0000, 0.25);
                graphics.lineStyle(1, 0xFF0000, 0.3);
                graphics.drawCircle(userMapPlanets[key][2].position.x + 1, userMapPlanets[key][2].position.y + 65, 50);
                graphics.lineStyle(1, 0xFF0000, 1);
                graphics.endFill();
                mapSprite.addChild(graphics);
            
                mapSprite.addChild(userMapPlanets[key][1]);
                mapSprite.addChild(userMapPlanets[key][4]);
                mapSprite.addChild(userMapPlanets[key][2]);
                mapSprite.addChild(userMapPlanets[key][12]);
            }
        }
        if(side === SIDE_SITH) 
        {
            if(userPlanets[key].status === USER_PLANET_QUEST_AWAITING)
            {
                mapSprite.addChild(userMapPlanets[key][1]);
                mapSprite.addChild(userMapPlanets[key][4]);
                mapSprite.addChild(userMapPlanets[key][3]);
                mapSprite.addChild(userMapPlanets[key][8]);
                mapSprite.addChild(userMapPlanets[key][9]);
                mapSprite.addChild(userMapPlanets[key][10]);
            }
            if(userPlanets[key].status === USER_PLANET_QUEST_COMPLETE_JEDI)
            {
                var graphics = new PIXI.Graphics();
                graphics.beginFill(0x0000FF, 0.25);
                graphics.lineStyle(1, 0x0000FF, 0.8);
                graphics.drawCircle(userMapPlanets[key][2].position.x + 1, userMapPlanets[key][2].position.y + 65, 50);
                graphics.lineStyle(1, 0x0000FF, 1);
                graphics.endFill();
                mapSprite.addChild(graphics);
                
                mapSprite.addChild(userMapPlanets[key][1]);
                mapSprite.addChild(userMapPlanets[key][4]);
                mapSprite.addChild(userMapPlanets[key][3]);
                mapSprite.addChild(userMapPlanets[key][11]);
            }
            if(userPlanets[key].status === USER_PLANET_QUEST_COMPLETE_SITH)
            {
                var graphics = new PIXI.Graphics();
                graphics.beginFill(0xFF0000, 0.25);
                graphics.lineStyle(1, 0xFF0000, 0.3);
                graphics.drawCircle(userMapPlanets[key][2].position.x + 1, userMapPlanets[key][2].position.y + 65, 50);
                graphics.lineStyle(1, 0xFF0000, 1);
                graphics.endFill();
                mapSprite.addChild(graphics);
                
                mapSprite.addChild(userMapPlanets[key][1]);
                mapSprite.addChild(userMapPlanets[key][4]);
                mapSprite.addChild(userMapPlanets[key][3]);
                mapSprite.addChild(userMapPlanets[key][12]);
            }
        }
    }
}

function onMapPlanetClick()
{
    if(userCommandUser["personage1"] === null && userCommandUser["personage2"] === null && userCommandUser["personage3"] === null)
    {
        msgCreate("ПРЕДУПРЕЖДЕНИЕ", "В вашей комманде нет не одного персонажа. \nВы не можите начать битву пока в команде не будет хотя бы один персонаж!");
    }else{
        if(side === SIDE_JEDI)
        {
            if(userPlanets[this.name].status !== USER_PLANET_QUEST_COMPLETE_JEDI)
            {
                mapSprite.move = false;
                sbattleCreate(this.name);
            }
        }
        if(side === SIDE_SITH)
        {
            if(userPlanets[this.name].status !== USER_PLANET_QUEST_COMPLETE_SITH)
            {
                mapSprite.move = false;
                sbattleCreate(this.name);
            }
        }
    }
}

function onMapPlanetOver(event)
{
    if(side === SIDE_JEDI) mapTextMessage.text = userMapMessage[event.target.name][0];
    if(side === SIDE_SITH) mapTextMessage.text = userMapMessage[event.target.name][1];
}

function onMapPlanetOut()
{
    if(side === SIDE_JEDI) mapTextMessage.text = userMapMessage["LastNews"][0];
    if(side === SIDE_SITH) mapTextMessage.text = userMapMessage["LastNews"][1];
}

function mapCreateInterface()
{
    mapShowCommand();
    if(side === SIDE_JEDI)
    {
        mapBorderBlue();
        mapDesktopBlue();
        mapDroidBlue();
        mapDroidBlueMessage();
        mapBattonsBlue();
    }
    if(side === SIDE_SITH)
    {
        mapBorderRed();
        mapDesktopRed();
        mapDroidRed();
        mapDroidRedMessage();
        mapBattonsRed();
    }
    
}

function mapBorderBlue()
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
    
    mapStage.addChild(graphics);
}

function mapDesktopBlue()
{
    var graphics = new PIXI.Graphics(); 
    graphics.lineStyle(2, 0x0000FF, 1);
    graphics.beginFill(0x0000FF, 0.2);
    graphics.moveTo(15, 610);
    graphics.lineTo(350, 610);
    graphics.lineTo(350, 715);
    graphics.lineTo(15, 715);
    graphics.endFill
    for(var i = 0; i < 35; i++)
    {
        graphics.lineStyle(1, 0x0000FF, 0.5);
        graphics.moveTo(15, 610+(3*i));
        graphics.lineTo(350, 610+(3*i));
    }
    mapStage.addChild(graphics);
    
    mapDesktopLineGraphics = new PIXI.Graphics(); 
    mapDesktopLineGraphics.lineStyle(10, 0x0000FF, 0.3);
    mapDesktopLineGraphics.moveTo(15,615);
    mapDesktopLineGraphics.lineTo(350, 615);
    mapStage.addChild(mapDesktopLineGraphics);
    mapDesktopLineGraphicsTween();
}

function mapDroidBlue()
{
    var textureSprite = new PIXI.Sprite(r2d2DroidBlueRightTexture); 
    textureSprite.position.x = 765; 
    textureSprite.position.y = 605; 
    textureSprite.scale.set(0.3);
    mapStage.addChild(textureSprite);
    
    var graphics = new PIXI.Graphics(); 
    graphics.lineStyle(2, 0x0090F0, 0.2);
    graphics.beginFill(0x0090F0, 0.2);
    graphics.moveTo(792, 620);
    graphics.lineTo(700, 455);
    graphics.lineTo(845, 455);
    graphics.lineTo(792, 620);
    graphics.endFill;
    mapStage.addChild(graphics);
    
    for(var i = 0; i < 72; i++)
    {
        graphics.lineStyle(1, 0x0090F0, 0.2);
        graphics.moveTo(698, 239+(3*i));
        graphics.lineTo(846, 239+(3*i));
    }
    mapStage.addChild(graphics);
    
    mapMessageLineGraphics = new PIXI.Graphics(); 
    mapMessageLineGraphics.lineStyle(10, 0x0090F0, 0.3);
    mapMessageLineGraphics.moveTo(698, 243);
    mapMessageLineGraphics.lineTo(846, 243);
    mapStage.addChild(mapMessageLineGraphics);
    mapMessageLineGraphicsTween();
}

function mapDroidBlueMessage()
{
    mapTextMessage = new PIXI.Text(userMapMessage["LastNews"][0], mapStyleDroidBlueText); 
    mapTextMessage.x = 700; 
    mapTextMessage.y = 240; 
    mapStage.addChild(mapTextMessage);
}

function mapBattonsBlue()
{
    var textArr = ["КОМАНДА", "НАСТРОЙКИ"];
    var nameArr = ["Command", "Settings"];
    
    for(var i = 0; i < textArr.length; i++)
    {
        var button = new PIXI.extras.MovieClip(animTexButtonBlue); 
        button.name = nameArr[i];
        button.position.x = 360 + (200 * i); 
        button.position.y = 670; 
        button.interactive = true; 
        button.buttonMode = true; 
        button.loop = false; 
        button.animationSpeed = 0.2;
        button.onComplete = onMapButtonUpdate;
	button.tap = onMapButtonClick; 
        button.click = onMapButtonClick; 
        button.on('mouseover', onMapButtonOver);
        button.on('mouseout', onMapButtonOut);

        var text = new PIXI.Text(textArr[i], mapStyleButtonBlueText); 
        text.x = button.width / 3.8;
        text.y = button.height / 3;

        button.addChild(text); 
        mapStage.addChild(button);
    }
    
    textArr = ["НАЗАД В МЕНЮ", "ПРИГЛАСИТЬ"];
    nameArr = ["BackMenu", "Invite"];
    
    for(var i = 0; i < textArr.length; i++)
    {
        var button = new PIXI.extras.MovieClip(animTexButtonBlue); 
        button.name = nameArr[i];
        button.position.x = 10; 
        button.position.y = 10 + (545 * i); 
        button.interactive = true; 
        button.buttonMode = true; 
        button.loop = false; 
        button.animationSpeed = 0.2;
        button.onComplete = onMapButtonUpdate;
	button.tap = onMapButtonClick; 
        button.click = onMapButtonClick; 
        button.on('mouseover', onMapButtonOver);
        button.on('mouseout', onMapButtonOut);

        var text = new PIXI.Text(textArr[i], mapStyleButtonBlueText); 
        text.x = button.width / 3.8;
        text.y = button.height / 3;

        button.addChild(text); 
        mapStage.addChild(button);
    }
}

function mapBorderRed()
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
    
    mapStage.addChild(graphics);
}

function mapDesktopRed()
{
    var graphics = new PIXI.Graphics(); 
    graphics.lineStyle(2, 0x800000, 1);
    graphics.beginFill(0x800000, 0.2);
    graphics.moveTo(15, 610);
    graphics.lineTo(350, 610);
    graphics.lineTo(350, 715);
    graphics.lineTo(15, 715);
    graphics.endFill
    for(var i = 0; i < 35; i++)
    {
        graphics.lineStyle(1, 0x800000, 0.5);
        graphics.moveTo(15, 610+(3*i));
        graphics.lineTo(350, 610+(3*i));
    }
    mapStage.addChild(graphics);
    
    mapDesktopLineGraphics = new PIXI.Graphics(); 
    mapDesktopLineGraphics.lineStyle(10, 0x800000, 0.3);
    mapDesktopLineGraphics.moveTo(15,615);
    mapDesktopLineGraphics.lineTo(350, 615);
    mapStage.addChild(mapDesktopLineGraphics);
    mapDesktopLineGraphicsTween();
}

function mapDroidRed()
{
    var textureSprite = new PIXI.Sprite(r2d2DroidRedRightTexture); 
    textureSprite.position.x = 765; 
    textureSprite.position.y = 605; 
    textureSprite.scale.set(0.3);
    mapStage.addChild(textureSprite);
    
    var graphics = new PIXI.Graphics(); 
    graphics.lineStyle(2, 0xA63A24, 0.2);
    graphics.beginFill(0xA63A24, 0.2);
    graphics.moveTo(792, 620);
    graphics.lineTo(700, 455);
    graphics.lineTo(845, 455);
    graphics.lineTo(792, 620);
    graphics.endFill;
    mapStage.addChild(graphics);
    
    for(var i = 0; i < 72; i++)
    {
        graphics.lineStyle(1, 0xA63A24, 0.2);
        graphics.moveTo(698, 239+(3*i));
        graphics.lineTo(846, 239+(3*i));
    }
    mapStage.addChild(graphics);
    
    mapMessageLineGraphics = new PIXI.Graphics(); 
    mapMessageLineGraphics.lineStyle(10, 0xA63A24, 0.3);
    mapMessageLineGraphics.moveTo(698, 243);
    mapMessageLineGraphics.lineTo(846, 243);
    mapStage.addChild(mapMessageLineGraphics);
    mapMessageLineGraphicsTween();
}

function mapDroidRedMessage()
{
    mapTextMessage = new PIXI.Text(userMapMessage["LastNews"][1], mapStyleDroidRedText); 
    mapTextMessage.x = 700; 
    mapTextMessage.y = 240; 
    mapStage.addChild(mapTextMessage);
}

function mapBattonsRed()
{
    var textArr = ["КОМАНДА", "НАСТРОЙКИ"];
    var nameArr = ["Command", "Settings"];
    
    for(var i = 0; i < textArr.length; i++)
    {
        var button = new PIXI.extras.MovieClip(animTexButtonRed); 
        button.name = nameArr[i];
        button.position.x = 360 + (200 * i); 
        button.position.y = 670; 
        button.interactive = true; 
        button.buttonMode = true; 
        button.loop = false; 
        button.animationSpeed = 0.2;
        button.onComplete = onMapButtonUpdate;
        button.tap = onMapButtonClick; 
        button.click = onMapButtonClick; 
        button.on('mouseover', onMapButtonOver);
        button.on('mouseout', onMapButtonOut);

        var text = new PIXI.Text(textArr[i], mapStyleButtonRedText); 
        text.x = button.width / 3.8;
        text.y = button.height / 3;

        button.addChild(text); 
        mapStage.addChild(button);
    }
    
    textArr = ["НАЗАД В МЕНЮ", "ПРИГЛАСИТЬ"];
    nameArr = ["BackMenu", "Invite"];
    
    for(var i = 0; i < textArr.length; i++)
    {
        var button = new PIXI.extras.MovieClip(animTexButtonRed); 
        button.name = nameArr[i];
        button.position.x = 10; 
        button.position.y = 10 + (545 * i); 
        button.interactive = true; 
        button.buttonMode = true; 
        button.loop = false; 
        button.animationSpeed = 0.2;
        button.onComplete = onMapButtonUpdate;
        button.tap = onMapButtonClick; 
        button.click = onMapButtonClick; 
        button.on('mouseover', onMapButtonOver);
        button.on('mouseout', onMapButtonOut);

        var text = new PIXI.Text(textArr[i], mapStyleButtonRedText); 
        text.x = button.width / 3.8;
        text.y = button.height / 3;

        button.addChild(text); 
        mapStage.addChild(button);
    }
}
function onMapButtonOver()
{
    this.isOver = true;
    this.gotoAndPlay(1);
}

function onMapButtonOut()
{
    this.isOver = false;
    this.gotoAndStop(0);
}

function onMapButtonUpdate()
{
    if(this.isOver)
    {
        this.gotoAndPlay(1);
    }else{
        this.gotoAndStop(0);
    }
}

function onMapButtonClick() 
{
    switch (this.name)
    {
        case "Command":
            cmdCreate();
            mapRemove();
            break;
        case "Settings":
            settingsCreate();
            break;
        case "BackMenu":
            backmenuCreate();
            
            break;
        case "Invite": 
            VK.callMethod("showInviteBox");
            break;
        default:
            break;
    }
    
}

function mapDesktopLineGraphicsTween()
{
    createjs.Tween.get(mapDesktopLineGraphics, {loop: true}) 
            .to({x: 0, y: 95}, 2500, createjs.Ease.getPowInOut(3));
    createjs.Ticker.setFPS(60);
}

function mapMessageLineGraphicsTween()
{
    createjs.Tween.get(mapMessageLineGraphics, {loop: true}) 
            .to({x: 0, y: 205}, 2500, createjs.Ease.getPowInOut(3));
    createjs.Ticker.setFPS(60);
}


function mapCheckAvailablePersonage()
{
    for(var key in userCommandUser)
    {
        for(var planetID in userPlanets)
        {
            if( (side === SIDE_JEDI)
            && (userPlanets[planetID].blueRewardPersonage1 === userCommandUser[key] || userPlanets[planetID].blueRewardPersonage2 === userCommandUser[key] || userPlanets[planetID].blueRewardPersonage3 === userCommandUser[key]) 
            && (userPlanets[planetID].status === USER_PLANET_QUEST_AWAITING || userPlanets[planetID].status === USER_PLANET_QUEST_COMPLETE_SITH)) 
            {
                userCommandUser[key] = null;
                
            }
            if( (side === SIDE_SITH)
            && (userPlanets[planetID].redRewardPersonage1 === userCommandUser[key] || userPlanets[planetID].redRewardPersonage2 === userCommandUser[key] || userPlanets[planetID].redRewardPersonage3 === userCommandUser[key]) 
            && (userPlanets[planetID].status === USER_PLANET_QUEST_AWAITING || userPlanets[planetID].status === USER_PLANET_QUEST_COMPLETE_JEDI)) 
            {
                userCommandUser[key] = null;
            }
        }
    }
	
    for(var key in userCommandAI)
    {
        for(var planetID in userPlanets)
        {
            if( (side === SIDE_JEDI)
            && (userPlanets[planetID].redPersonage1 === userCommandAI[key] || userPlanets[planetID].redPersonage2 === userCommandAI[key] || userPlanets[planetID].redPersonage3 === userCommandAI[key]) 
            && (userPlanets[planetID].status === USER_PLANET_QUEST_AWAITING || userPlanets[planetID].status === USER_PLANET_QUEST_COMPLETE_JEDI)) 
            {
                userCommandAI[key] = null;
            }
            if( (side === SIDE_SITH)
            && (userPlanets[planetID].bluePersonage1 === userCommandAI[key] || userPlanets[planetID].bluePersonage2 === userCommandAI[key] || userPlanets[planetID].bluePersonage3 === userCommandAI[key]) 
            && (userPlanets[planetID].status === USER_PLANET_QUEST_AWAITING || userPlanets[planetID].status === USER_PLANET_QUEST_COMPLETE_SITH)) 
            {
                userCommandAI[key] = null;
            }
        }
    }
	
	
}

function mapShowCommand()
{
    var index = 0;
    for(var key in userCommandUser)
    {
        if(userCommandUser[key] !== null)
        {
            var textureSprite = new PIXI.Sprite(heroesTextures[userCommandUser[key]][3]); 
            textureSprite.position.x = 35 + (105 * index); 
            textureSprite.position.y = 625; 
            mapStage.addChild(textureSprite);
        }
        index++;
    }
}

function mapCreateTargets()
{
    mapTargetPlanetRed = new PIXI.Graphics();
    mapTargetPlanetRed.lineStyle(2, 0xFF0000, 0.5);
    mapTargetPlanetRed.beginFill(0xFF0000, 0.2);
    mapTargetPlanetRed.moveTo(0, -5);
    mapTargetPlanetRed.lineTo(-15, -55);
    mapTargetPlanetRed.lineTo(15, -55);
    mapTargetPlanetRed.lineTo(0, -5);
    mapTargetPlanetRed.endFill;
    
    mapTargetPlanetRed.lineStyle(2, 0xFF0000, 0.5);
    mapTargetPlanetRed.beginFill(0xFF0000, 0.2);
    mapTargetPlanetRed.moveTo(0, 5);
    mapTargetPlanetRed.lineTo(-15, 55);
    mapTargetPlanetRed.lineTo(15, 55);
    mapTargetPlanetRed.lineTo(0, 5);
    mapTargetPlanetRed.endFill;
    
    mapTargetPlanetRed.lineStyle(2, 0xFF0000, 0.5);
    mapTargetPlanetRed.beginFill(0xFF0000, 0.2);
    mapTargetPlanetRed.moveTo(-5, 0);
    mapTargetPlanetRed.lineTo(-55, -15);
    mapTargetPlanetRed.lineTo(-55, 15);
    mapTargetPlanetRed.lineTo(-5, 0);
    mapTargetPlanetRed.endFill;
    
    mapTargetPlanetRed.lineStyle(2, 0xFF0000, 0.5);
    mapTargetPlanetRed.beginFill(0xFF0000, 0.2);
    mapTargetPlanetRed.moveTo(5, 0);
    mapTargetPlanetRed.lineTo(55, -15);
    mapTargetPlanetRed.lineTo(55, 15);
    mapTargetPlanetRed.lineTo(5, 0);
    mapTargetPlanetRed.endFill;
    
    mapTargetPlanetRed.position.x = 100;
    mapTargetPlanetRed.position.y = 100;
    mapTargetPlanetRed.visible = false;
    mapSprite.addChild(mapTargetPlanetRed);
    
    mapTargetPlanetBlue = new PIXI.Graphics();
    mapTargetPlanetBlue.lineStyle(2, 0x0000FF, 0.5);
    mapTargetPlanetBlue.beginFill(0x0000FF, 0.5);
    mapTargetPlanetBlue.moveTo(0, -5);
    mapTargetPlanetBlue.lineTo(-15, -55);
    mapTargetPlanetBlue.lineTo(15, -55);
    mapTargetPlanetBlue.lineTo(0, -5);
    mapTargetPlanetBlue.endFill;
    
    mapTargetPlanetBlue.lineStyle(2, 0x0000FF, 0.5);
    mapTargetPlanetBlue.beginFill(0x0000FF, 0.5);
    mapTargetPlanetBlue.moveTo(0, 5);
    mapTargetPlanetBlue.lineTo(-15, 55);
    mapTargetPlanetBlue.lineTo(15, 55);
    mapTargetPlanetBlue.lineTo(0, 5);
    mapTargetPlanetBlue.endFill;
    
    mapTargetPlanetBlue.lineStyle(2, 0x0000FF, 0.5);
    mapTargetPlanetBlue.beginFill(0x0000FF, 0.5);
    mapTargetPlanetBlue.moveTo(-5, 0);
    mapTargetPlanetBlue.lineTo(-55, -15);
    mapTargetPlanetBlue.lineTo(-55, 15);
    mapTargetPlanetBlue.lineTo(-5, 0);
    mapTargetPlanetBlue.endFill;
    
    mapTargetPlanetBlue.lineStyle(2, 0x0000FF, 0.5);
    mapTargetPlanetBlue.beginFill(0x0000FF, 0.5);
    mapTargetPlanetBlue.moveTo(5, 0);
    mapTargetPlanetBlue.lineTo(55, -15);
    mapTargetPlanetBlue.lineTo(55, 15);
    mapTargetPlanetBlue.lineTo(5, 0);
    mapTargetPlanetBlue.endFill;
    
    mapTargetPlanetBlue.position.x = 100;
    mapTargetPlanetBlue.position.y = 100;
    mapTargetPlanetBlue.visible = false;
    mapSprite.addChild(mapTargetPlanetBlue);
}

function mapRedTargetsShow(planetName)
{
    mapTargetPlanetRed.position.x = userMapPlanets[planetName][1].position.x + 40;
    mapTargetPlanetRed.position.y = userMapPlanets[planetName][1].position.y + 40;
    mapTargetPlanetRed.visible = true;
    mapTargetRedTween();
}

function mapTargetRedTween()
{
    createjs.Tween.get(mapTargetPlanetRed, {loop: true}) 
            .to({rotation: 3.15 }, 2500, createjs.Ease.getPowInOut(1));
    createjs.Ticker.setFPS(60);
}

function mapBlueTargetsShow(planetName)
{
    mapTargetPlanetBlue.position.x = userMapPlanets[planetName][1].position.x + 40;
    mapTargetPlanetBlue.position.y = userMapPlanets[planetName][1].position.y + 40;
    mapTargetPlanetBlue.visible = true;
    mapTargetBlueTween();
}

function mapTargetBlueTween()
{
    createjs.Tween.get(mapTargetPlanetBlue, {loop: true}) 
            .to({rotation: 3.15 }, 2500, createjs.Ease.getPowInOut(1));
    createjs.Ticker.setFPS(60);
}

function mapDestinationSearch()
{
    var target = new Object();
    target["planetUser"] = "";
    target["indexUser"] = 1000;
    target["planetAI"] = "";
    target["indexAI"] = 1000;
    
    for(var key in userPlanets)
    {
        if(side === SIDE_JEDI || side === SIDE_SITH)
        {
           if(userPlanets[key].status !== USER_PLANET_QUEST_COMPLETE_JEDI)
           {
                var hitCount = 0;
                hitCount += userPersonages[userPlanets[key].redPersonage1].hitAttack1 
                        + userPersonages[userPlanets[key].redPersonage1].hitAttack2 
                        + userPersonages[userPlanets[key].redPersonage1].hitAttack3 
                        + userPersonages[userPlanets[key].redPersonage1].hitAttack4
                        + userPersonages[userPlanets[key].redPersonage1].hitAttack5;
                hitCount += userPersonages[userPlanets[key].redPersonage2].hitAttack1
                        + userPersonages[userPlanets[key].redPersonage2].hitAttack2
                        + userPersonages[userPlanets[key].redPersonage2].hitAttack3
                        + userPersonages[userPlanets[key].redPersonage2].hitAttack4
                        + userPersonages[userPlanets[key].redPersonage2].hitAttack5;
                hitCount += userPersonages[userPlanets[key].redPersonage3].hitAttack1
                        + userPersonages[userPlanets[key].redPersonage3].hitAttack2
                        + userPersonages[userPlanets[key].redPersonage3].hitAttack3
                        + userPersonages[userPlanets[key].redPersonage3].hitAttack4
                        + userPersonages[userPlanets[key].redPersonage3].hitAttack5;
                hitCount /= 10;
		if(hitCount < target["indexUser"])
                {
                   target["planetUser"] = userPlanets[key].id; 
                   target["indexUser"] = hitCount;
                }
           }
           if(userPlanets[key].status !== USER_PLANET_QUEST_COMPLETE_SITH)
           {
                var hitCount = 0;
                hitCount += userPersonages[userPlanets[key].bluePersonage1].hitAttack1 
                        + userPersonages[userPlanets[key].bluePersonage1].hitAttack2 
                        + userPersonages[userPlanets[key].bluePersonage1].hitAttack3 
                        + userPersonages[userPlanets[key].bluePersonage1].hitAttack4
                        + userPersonages[userPlanets[key].bluePersonage1].hitAttack5;
                hitCount += userPersonages[userPlanets[key].bluePersonage2].hitAttack1
                        + userPersonages[userPlanets[key].bluePersonage2].hitAttack2
                        + userPersonages[userPlanets[key].bluePersonage2].hitAttack3
                        + userPersonages[userPlanets[key].bluePersonage2].hitAttack4
                        + userPersonages[userPlanets[key].bluePersonage2].hitAttack5;
                hitCount += userPersonages[userPlanets[key].bluePersonage3].hitAttack1
                        + userPersonages[userPlanets[key].bluePersonage3].hitAttack2
                        + userPersonages[userPlanets[key].bluePersonage3].hitAttack3
                        + userPersonages[userPlanets[key].bluePersonage3].hitAttack4
                        + userPersonages[userPlanets[key].bluePersonage3].hitAttack5;
                hitCount /= 10;
                if(hitCount < target["indexAI"])
                {
                   target["planetAI"] = userPlanets[key].id; 
                   target["indexAI"] = hitCount;
                }
            }
        }
    }

    if(side === SIDE_JEDI)
    {
        mapBlueTargetsShow(target["planetUser"]);
        mapRedTargetsShow(target["planetAI"]);
        if(userTotalBattle === 0) userMapMessage["LastNews"][0] = "Меня зовут R2D2, рад вас приветствовать.\n\nКорусант является основной целью Ситов." + " В данное время Дарт Вейдер напали на " + userPlanets[target["planetAI"]].name + " вы можите попытаться помешать ему. \n\nИли выполните миссию " + userPlanets[target["planetUser"]].name + " и получите нового союзника.";
        else userMapMessage["LastNews"][0] = "На планете " + userPlanets[target["planetUser"]].name + " нуждаются в нашей помощи. Выполните миссию "  + userPlanets[target["planetUser"]].name + " и вам будет доступен новый союзник. \n\nТак же мы получаем сигнал с планеты " + userPlanets[target["planetAI"]].name + " о вторжении Дарт Вейдера. Вы можите предпринять попытку отбить нападение на " + userPlanets[target["planetAI"]].name + ".";
        mapTextMessage.text = userMapMessage["LastNews"][0];
    }
    if(side === SIDE_SITH)
    {
        //mapRedTargetsShow(target["planetUser"]);
        //mapBlueTargetsShow(target["planetAI"]);
        mapBlueTargetsShow(target["planetUser"]);
        mapRedTargetsShow(target["planetAI"]);
        
        if(userTotalBattle === 0) userMapMessage["LastNews"][1] = "Меня зовут R3-S6, приветствую тебя мой повелитель. \n\nДжедаи хотят разрушить Звезду смерти и помешать нашим планам." + " Они направелись на " + userPlanets[target["planetAI"]].name + " можем помешать им. \n\nИли напасть на " + userPlanets[target["planetUser"]].name + " и получите нового союзника.";
        else userMapMessage["LastNews"][1] = "Оборона планеты " + userPlanets[target["planetUser"]].name + " слаба мы с лёгкостью захватим её и вам будет доступен новый союзник. \n\nТак же наш шпион докладывает что Джедаи направились на " + userPlanets[target["planetAI"]].name + " можем помешать им.";
        mapTextMessage.text = userMapMessage["LastNews"][1];
    }
    
    
    
}

/* == КОНЕЦ ФАЙЛА ========================================================== */

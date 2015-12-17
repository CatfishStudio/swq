var mapStage;
var mapSprite;
var mapStartPosX;
var mapStartPosY;
var mapDesktopLineGraphics;
var mapMessageLineGraphics;
var mapStyleDroidBlueText = { font : 'bold 14px Arial', fill : '#C4DEFB', stroke : '#0090F0', strokeThickness : 1, wordWrap : true, wordWrapWidth : 175 }; 
var mapStyleButtonBlueText = { font : 'bold 14px Arial', fill : '#FFFFFF', stroke : '#0090F0', strokeThickness : 1, wordWrap : true, wordWrapWidth : 200 }; 
var mapStyleDroidRedText = { font : 'bold 14px Arial', fill : '#EDCDCB', stroke : '#880000', strokeThickness : 1, wordWrap : true, wordWrapWidth : 175 }; 
var mapStyleButtonRedText = { font : 'bold 14px Arial', fill : '#FFFFFF', stroke : '#880000', strokeThickness : 1, wordWrap : true, wordWrapWidth : 200 }; 


function mapCreate() 
{ 
    mapStage = new PIXI.Container();
    stage.addChild(mapStage);
    
    mapSpace();
    mapCreatePlanets();
    mapCreateInterface()
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
            if(this.position.x < - 5) this.position.x += 5;
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
        mapSprite.addChild(userMapPlanets[key][1]);
        mapSprite.addChild(userMapPlanets[key][4]);
        if(side === SIDE_JEDI)
        {
            mapSprite.addChild(userMapPlanets[key][2]);
            if(key !== "Coruscant")
            {
                mapSprite.addChild(userMapPlanets[key][5]);
                mapSprite.addChild(userMapPlanets[key][6]);
                mapSprite.addChild(userMapPlanets[key][7]);
            }
        }
        if(side === SIDE_SITH) 
        {
            mapSprite.addChild(userMapPlanets[key][3]);
            if(key !== "DeathStar")
            {
                mapSprite.addChild(userMapPlanets[key][8]);
                mapSprite.addChild(userMapPlanets[key][9]);
                mapSprite.addChild(userMapPlanets[key][10]);
            }
        }
    }
}

function mapCreateInterface()
{
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
    var textMessage = new PIXI.Text("Меня зовут R2D2", mapStyleDroidBlueText); 
    textMessage.x = 705; 
    textMessage.y = 245; 
    mapStage.addChild(textMessage);
}

function mapBattonsBlue()
{
    var textArr = ["КОММАНДА", "НАСТРОЙКИ"];
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
    graphics.beginFill(0xFFFF00, 1);
    graphics.drawCircle(50, 605,4);
    graphics.endFill();
    
    graphics.lineStyle(2, 0xFFFF00, 1);
    graphics.moveTo(50,605);
    graphics.lineTo(5, 605);
    
    graphics.moveTo(5, 605);
    graphics.lineTo(5, 725);
    graphics.moveTo(5, 725);
    graphics.lineTo(840, 725);
    
    graphics.lineStyle(0);
    graphics.beginFill(0xFFFF00, 1);
    graphics.drawCircle(840, 725,4);
    graphics.endFill();
    
    graphics.lineStyle(0);
    graphics.beginFill(0xFFFF00, 1);
    graphics.drawCircle(355, 680,4);
    graphics.endFill();
    
    graphics.lineStyle(2, 0xFFFF00, 1);
    graphics.moveTo(355, 680);
    graphics.lineTo(355, 725);
    
    graphics.lineStyle(0);
    graphics.beginFill(0xFFFF00, 1);
    graphics.drawCircle(855, 550, 4);
    graphics.endFill();
    
    graphics.lineStyle(2, 0xFFFF00, 1);
    graphics.moveTo(855,550);
    graphics.lineTo(855, 5);
    graphics.moveTo(855,5);
    graphics.lineTo(5, 5);
    
    graphics.lineStyle(0);
    graphics.beginFill(0xFFFF00, 1);
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
    var textMessage = new PIXI.Text("Меня зовут R2D2", mapStyleDroidRedText); 
    textMessage.x = 705; 
    textMessage.y = 245; 
    mapStage.addChild(textMessage);
}

function mapBattonsRed()
{
    var textArr = ["КОММАНДА", "НАСТРОЙКИ"];
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
            
            break;
        case "Settings":
            
            break;
        case "BackMenu":
            
            break;
        case "Invite": 
            
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
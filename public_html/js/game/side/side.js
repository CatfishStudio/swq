var SIDE_NONE = "side_none";
var SIDE_JEDI = "side_jedi";
var SIDE_SITH = "side_sith";

var side = SIDE_NONE;

var sideStage;

var sideSelectGraphics;
var sideDroidBlueStage;
var sideStyleDroidBlueText = { font : 'bold 14px Arial', fill : '#FFFFFF', stroke : '#0090F0', strokeThickness : 1, wordWrap : true, wordWrapWidth : 275 }; 
var sideBlueLineAnimationGraphics;

var sideDroidRedStage;
var sideStyleDroidRedText = { font : 'bold 14px Arial', fill : '#FFFFFF', stroke : '#880000', strokeThickness : 1, wordWrap : true, wordWrapWidth : 275 }; 
var sideRedLineAnimationGraphics;

function sideCreate()
{
    sideStage = new PIXI.Container();
    stage.addChild(sideStage);
    
    sideBackground();
    sideBorder();
    sideHeroes();
}

function sideRemove()
{
    stage.removeChild(sideStage);
    sideStage = null;
}

function sideBackground()
{
    var sprite = new PIXI.Sprite(sideBackgroundTexture);
    sprite.position.x = 0; 
    sprite.position.y = 0; 
    sideStage.addChild(sprite);
}

function sideBorder()
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
    graphics.beginFill(0xFFFF00, 1);
    graphics.drawCircle(5, 600,4);
    graphics.endFill();
    
    graphics.lineStyle(2, 0xFFFF00, 1);
    graphics.moveTo(5,600);
    graphics.lineTo(5, 725);
    
    graphics.lineStyle(2, 0xFFFF00, 1);
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
    
    graphics.lineStyle(2, 0xFFFF00, 1);
    graphics.moveTo(430,5);
    graphics.lineTo(5, 5);
    
    graphics.lineStyle(0);
    graphics.beginFill(0xFFFF00, 1);
    graphics.drawCircle(5,5,4);
    graphics.endFill();
    
    sideStage.addChild(graphics);
}

function sideHeroes()
{
    var button = new PIXI.Sprite(sideDarthVaderTexture);
    button.name = "DarthVader";
    button.position.x = 25;
    button.position.y = 75;
    button.interactive = true;
    button.buttonMode = true;
    button.tap = onSideButtonClick; 
    button.click = onSideButtonClick; 
    button.on('mouseover', onSideButtonOver);
    button.on('mouseout', onSideButtonOut);
    sideStage.addChild(button);
    
    button = new PIXI.Sprite(sideLukeSkywalkerTexture);
    button.name = "LukeSkywalker";
    button.position.x = 475;
    button.position.y = 80;
    button.interactive = true;
    button.buttonMode = true;
    button.tap = onSideButtonClick; 
    button.click = onSideButtonClick; 
    button.on('mouseover', onSideButtonOver);
    button.on('mouseout', onSideButtonOut);
    sideStage.addChild(button);
}

function onSideButtonOver()
{
    if(this.name === "DarthVader")
    {
        sideStage.removeChild(sideSelectGraphics);
        sideSelectGraphics = new PIXI.Graphics(); 
        sideSelectGraphics.lineStyle(1, 0x880000, 0.2);
        sideSelectGraphics.beginFill(0x880000, 0.2);
        sideSelectGraphics.drawRect(0, 0, 430, MAIN_HEIGH);
        sideSelectGraphics.endFill();
        sideStage.addChild(sideSelectGraphics);
        sideDroidRed();
    }
    if(this.name === "LukeSkywalker")
    {
        sideStage.removeChild(sideSelectGraphics);
        sideSelectGraphics = new PIXI.Graphics(); 
        sideSelectGraphics.lineStyle(1, 0x0000FF, 0.2);
        sideSelectGraphics.beginFill(0x0000FF, 0.2);
        sideSelectGraphics.drawRect(430, 0, 430, MAIN_HEIGH);
        sideSelectGraphics.endFill();
        sideStage.addChild(sideSelectGraphics);
        sideDroidBlue();
    }
}

function onSideButtonOut()
{
    sideStage.removeChild(sideSelectGraphics);
    sideStage.removeChild(sideDroidRedStage);
    sideStage.removeChild(sideDroidBlueStage);
    
}

function onSideButtonClick()
{
    if(this.name === "DarthVader")
    {
        
    }
    if(this.name === "LukeSkywalker")
    {
        
    }
}

function sideDroidBlue()
{
    sideDroidBlueStage = new PIXI.Container();
    
    var textureSprite = new PIXI.Sprite(r2d2DroidBlueRightTexture); 
    textureSprite.position.x = 700; 
    textureSprite.position.y = 550; 
    textureSprite.scale.set(0.4);
    sideDroidBlueStage.addChild(textureSprite);

    var graphics = new PIXI.Graphics(); 
    graphics.lineStyle(2, 0x0080C0, 1);
    graphics.beginFill(0x0080C0, 0.2);
    graphics.moveTo(450,450);
    graphics.lineTo(735, 450);
    graphics.lineTo(735, 575);
    graphics.lineTo(450, 575);
    graphics.endFill
    for(var i = 0; i < 42; i++)
    {
        graphics.lineStyle(1, 0x0090F0, 0.5);
        graphics.moveTo(450, 450+(3*i));
        graphics.lineTo(735, 450+(3*i));
    }
    sideDroidBlueStage.addChild(graphics);

    
    sideDroidBlueMessage();

    sideBlueLineAnimationGraphics = new PIXI.Graphics(); 
    sideBlueLineAnimationGraphics.lineStyle(10, 0x0090F0, 0.3);
    sideBlueLineAnimationGraphics.moveTo(450,455);
    sideBlueLineAnimationGraphics.lineTo(735, 455);
    sideDroidBlueStage.addChild(sideBlueLineAnimationGraphics);
    
    sideStage.addChild(sideDroidBlueStage);
    
    sideBlueLineAnimationGraphicsTween();
}

function sideDroidBlueMessage()
{
    var textMessage = new PIXI.Text("\nВыберите светлую сторону силы.\nТолько покой ощутив, возмёшь контроль над желаниями своими. \n\nПройдите путь Люка Скайуокера!", sideStyleDroidBlueText); 
    textMessage.x = 455; 
    textMessage.y = 455; 
    sideDroidBlueStage.addChild(textMessage);
}

function sideBlueLineAnimationGraphicsTween()
{
    createjs.Tween.get(sideBlueLineAnimationGraphics, {loop: true}) 
        .to({x: 0, y: 115}, 2500, createjs.Ease.getPowInOut(3));
    createjs.Ticker.setFPS(60); 

}

function sideDroidRed()
{
    sideDroidRedStage = new PIXI.Container();
    
    var textureSprite = new PIXI.Sprite(r2d2DroidRedLeftTexture); 
    textureSprite.position.x = 40; 
    textureSprite.position.y = 550; 
    textureSprite.scale.set(0.4);
    sideDroidRedStage.addChild(textureSprite);

    var graphics = new PIXI.Graphics(); 
    graphics.lineStyle(2, 0x800000, 1);
    graphics.beginFill(0x800000, 0.2);
    graphics.moveTo(125,450);
    graphics.lineTo(410, 450);
    graphics.lineTo(410, 575);
    graphics.lineTo(125, 575);
    graphics.endFill
    for(var i = 0; i < 42; i++)
    {
        graphics.lineStyle(1, 0x800000, 0.5);
        graphics.moveTo(125, 450+(3*i));
        graphics.lineTo(410, 450+(3*i));
    }
    sideDroidRedStage.addChild(graphics);

    
    sideDroidRedMessage();

    sideRedLineAnimationGraphics = new PIXI.Graphics(); 
    sideRedLineAnimationGraphics.lineStyle(10, 0x800000, 0.3);
    sideRedLineAnimationGraphics.moveTo(125,455);
    sideRedLineAnimationGraphics.lineTo(410, 455);
    sideDroidRedStage.addChild(sideRedLineAnimationGraphics);
    
    sideStage.addChild(sideDroidRedStage);
    
    sideRedLineAnimationGraphicsTween();
}

function sideDroidRedMessage()
{
    var textMessage = new PIXI.Text("\nВыберите тёмную сторону силы.\nПоддайся амбициям, почувствуй власть в своих руках. \n\nПройдите путь Дарт Вейдера!", sideStyleDroidRedText); 
    textMessage.x = 130; 
    textMessage.y = 455; 
    sideDroidRedStage.addChild(textMessage);
}

function sideRedLineAnimationGraphicsTween()
{
    createjs.Tween.get(sideRedLineAnimationGraphics, {loop: true}) 
        .to({x: 0, y: 115}, 2500, createjs.Ease.getPowInOut(3));
    createjs.Ticker.setFPS(60); 

}

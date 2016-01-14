
/* == НАЧАЛО ФАЙЛА ========================================================= */

var backmenuStage;
var backmenuLineAnimationGraphics;
var backmenuStyleBlueText = { font : 'bold 14px Arial', fill : '#FFFFFF', stroke : '#0090F0', strokeThickness : 1, wordWrap : true, wordWrapWidth : 340 }; 
var backmenuStyleRedText = { font : 'bold 14px Arial', fill : '#FFFFFF', stroke : '#880000', strokeThickness : 1, wordWrap : true, wordWrapWidth : 340 }; 
var backmenuButtonStyleBlueText = { font : 'bold 24px Arial', fill : '#FFFFFF', stroke : '#0090F0', strokeThickness : 1, wordWrap : true, wordWrapWidth : 340 }; 
var backmenuButtonStyleRedText = { font : 'bold 24px Arial', fill : '#FFFFFF', stroke : '#880000', strokeThickness : 1, wordWrap : true, wordWrapWidth : 340 }; 


function backmenuCreate()
{
    backmenuStage = new PIXI.Container();
    stage.addChild(backmenuStage);
    
    backmenuBackground();
    backmenuWindow();
    backmenuTitle();
    backmenuText();
    backmenuButtons();
}

function backmenuRemove()
{
    stage.removeChild(backmenuStage);
    backmenuStage = null;
}

function backmenuBackground()
{
    var graphics = new PIXI.Graphics(); 
    graphics.hitArea = new PIXI.Rectangle(0, 0, MAIN_WIDTH, MAIN_HEIGH);
    graphics.interactive = true;
    graphics.lineStyle(1, 0x000000, 0.05);
    graphics.beginFill(0x000000, 0.05);
    graphics.drawRect(0, 0, MAIN_WIDTH, MAIN_HEIGH);
    graphics.endFill();
    backmenuStage.addChild(graphics);
}

function backmenuWindow()
{
    if(side === SIDE_NONE || side === SIDE_JEDI)
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
        backmenuStage.addChild(graphics);
        
        backmenuLineAnimationGraphics = new PIXI.Graphics(); 
        backmenuLineAnimationGraphics.lineStyle(10, 0x0090F0, 0.3);
        backmenuLineAnimationGraphics.moveTo(250,255);
        backmenuLineAnimationGraphics.lineTo(600, 255);
        backmenuStage.addChild(backmenuLineAnimationGraphics);
        backmenuLineAnimationGraphicsTween();
        
        graphics = new PIXI.Graphics(); 
        graphics.lineStyle(1, 0x0080C0, 1);
        graphics.beginFill(0x0080C0, 1);
        graphics.moveTo(400,250);
        graphics.lineTo(425, 275);
        graphics.lineTo(600, 275);
        graphics.lineTo(600, 250);
        graphics.endFill();
        backmenuStage.addChild(graphics);
    }
    if(side === SIDE_SITH)
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
        backmenuStage.addChild(graphics);
        
        backmenuLineAnimationGraphics = new PIXI.Graphics(); 
        backmenuLineAnimationGraphics.lineStyle(10, 0xA63A24, 0.3);
        backmenuLineAnimationGraphics.moveTo(250,255);
        backmenuLineAnimationGraphics.lineTo(600, 255);
        backmenuStage.addChild(backmenuLineAnimationGraphics);
        backmenuLineAnimationGraphicsTween();
        
        graphics = new PIXI.Graphics(); 
        graphics.lineStyle(1, 0xA63A24, 1);
        graphics.beginFill(0xA63A24, 1);
        graphics.moveTo(400,250);
        graphics.lineTo(425, 275);
        graphics.lineTo(600, 275);
        graphics.lineTo(600, 250);
        graphics.endFill();
        backmenuStage.addChild(graphics);
    }
}

function backmenuLineAnimationGraphicsTween()
{
    createjs.Tween.get(backmenuLineAnimationGraphics, {loop: true}) 
        .to({x: 0, y: 240}, 2500, createjs.Ease.getPowInOut(3));
    createjs.Ticker.setFPS(60);
}

function backmenuTitle()
{
    var text;
    
    if(side === SIDE_NONE || side === SIDE_JEDI) text = new PIXI.Text("ПРЕДУПРЕЖДЕНИЕ", backmenuStyleBlueText); 
    if(side === SIDE_SITH) text = new PIXI.Text("ПРЕДУПРЕЖДЕНИЕ", backmenuStyleRedText); 
    text.x = 450;
    text.y = 255;
    backmenuStage.addChild(text);
}

function backmenuText()
{
    var text;
    if(side === SIDE_NONE || side === SIDE_JEDI) text = new PIXI.Text("\n    Вы собираетесь выйти в главное меню.\n    В таком случае прогресс будет потерян.\n\n\n     Продолжить выход в основное меню?", backmenuStyleBlueText); 
    if(side === SIDE_SITH) text = new PIXI.Text("\n    Вы собираетесь выйти в главное меню.\n    В таком случае прогресс будет потерян.\n\n\n     Продолжить выход в основное меню?", backmenuStyleRedText); 
    text.x = 255;
    text.y = 285;
    backmenuStage.addChild(text);
}

function backmenuButtons()
{
    if(side === SIDE_NONE || side === SIDE_JEDI)
    {
        var button = new PIXI.extras.MovieClip(animTexButtonBlue); 
        button.name = "yes";
        button.position.x = 255; 
        button.position.y = 450; 
        button.scale.set(0.8);
        button.interactive = true; 
        button.buttonMode = true; 
        button.loop = false; 
        button.animationSpeed = 0.2;
        button.onComplete = onBackmenuButtonButtonUpdate;
        button.tap = onBackmenuButtonButtonClick; 
        button.click = onBackmenuButtonButtonClick; 
        button.on('mouseover', onBackmenuButtonButtonOver);
        button.on('mouseout', onBackmenuButtonButtonOut);
        var text = new PIXI.Text("Да", backmenuButtonStyleBlueText); 
        text.x = button.width / 2;
        text.y = button.height / 3.5;
        button.addChild(text); 
        backmenuStage.addChild(button);
        
        button = new PIXI.extras.MovieClip(animTexButtonBlue); 
        button.name = "no";
        button.position.x = 435; 
        button.position.y = 450; 
        button.scale.set(0.8);
        button.interactive = true; 
        button.buttonMode = true; 
        button.loop = false; 
        button.animationSpeed = 0.2;
        button.onComplete = onBackmenuButtonButtonUpdate;
        button.tap = onBackmenuButtonButtonClick; 
        button.click = onBackmenuButtonButtonClick; 
        button.on('mouseover', onBackmenuButtonButtonOver);
        button.on('mouseout', onBackmenuButtonButtonOut);
        var text = new PIXI.Text("Нет", backmenuButtonStyleBlueText); 
        text.x = button.width / 2;
        text.y = button.height / 3.5;
        button.addChild(text); 
        backmenuStage.addChild(button);
    }
    if(side === SIDE_SITH)
    {
        var button = new PIXI.extras.MovieClip(animTexButtonRed); 
        button.name = "yes";
        button.position.x = 255; 
        button.position.y = 450; 
        button.scale.set(0.8);
        button.interactive = true; 
        button.buttonMode = true; 
        button.loop = false; 
        button.animationSpeed = 0.2;
        button.onComplete = onBackmenuButtonButtonUpdate;
        button.tap = onBackmenuButtonButtonClick; 
        button.click = onBackmenuButtonButtonClick; 
        button.on('mouseover', onBackmenuButtonButtonOver);
        button.on('mouseout', onBackmenuButtonButtonOut);
        var text = new PIXI.Text("Да", backmenuButtonStyleRedText); 
        text.x = button.width / 2;
        text.y = button.height / 3.5;
        button.addChild(text); 
        backmenuStage.addChild(button);
        
        button = new PIXI.extras.MovieClip(animTexButtonRed); 
        button.name = "no";
        button.position.x = 435; 
        button.position.y = 450; 
        button.scale.set(0.8);
        button.interactive = true; 
        button.buttonMode = true; 
        button.loop = false; 
        button.animationSpeed = 0.2;
        button.onComplete = onBackmenuButtonButtonUpdate;
        button.tap = onBackmenuButtonButtonClick; 
        button.click = onBackmenuButtonButtonClick; 
        button.on('mouseover', onBackmenuButtonButtonOver);
        button.on('mouseout', onBackmenuButtonButtonOut);
        var text = new PIXI.Text("Нет", backmenuButtonStyleRedText); 
        text.x = button.width / 2;
        text.y = button.height / 3.5;
        button.addChild(text); 
        backmenuStage.addChild(button);
    }
}

function onBackmenuButtonButtonOver()
{
    this.isOver = true;
    this.gotoAndPlay(1);
}

function onBackmenuButtonButtonOut()
{
    this.isOver = false;
    this.gotoAndStop(0);
}

function onBackmenuButtonButtonUpdate()
{
    if(this.isOver)
    {
        this.gotoAndPlay(1);
    }else{
        this.gotoAndStop(0);
    }
}

function onBackmenuButtonButtonClick() 
{
    switch (this.name)
    {
        case "yes":
            backmenuRemove();
            menuCreate();
            mapRemove();
            break;
        case "no":
            backmenuRemove();
            break;
        default:
            break;
    }
}



/* == КОНЕЦ ФАЙЛА ========================================================== */

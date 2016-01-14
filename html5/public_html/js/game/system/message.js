
/* == НАЧАЛО ФАЙЛА ========================================================= */

var msgStage;
var msgLineAnimationGraphics;
var msgStyleBlueText = { font : 'bold 14px Arial', fill : '#FFFFFF', stroke : '#0090F0', strokeThickness : 1, wordWrap : true, wordWrapWidth : 340 }; 
var msgStyleRedText = { font : 'bold 14px Arial', fill : '#FFFFFF', stroke : '#880000', strokeThickness : 1, wordWrap : true, wordWrapWidth : 340 }; 
var msgStyleBlueTitle = { font : 'bold 14px Arial', fill : '#FFFFFF', stroke : '#0090F0', strokeThickness : 1, wordWrap : true, wordWrapWidth : 200, align: "left"}; 
var msgStyleRedTitle = { font : 'bold 14px Arial', fill : '#FFFFFF', stroke : '#880000', strokeThickness : 1, wordWrap : true, wordWrapWidth : 200, align: "left" }; 

var msgTitleText;
var msgMessageText;

function msgCreate(title, messageText)
{
    msgStage = new PIXI.Container();
    stage.addChild(msgStage);
    
    msgTitleText = title;
    msgMessageText = messageText;
    
    msgBackground();
    msgWindow();
    msgTitle();
    msgText();
    msgButtonClose();
}

function msgRemove()
{
    stage.removeChild(msgStage);
    msgStage = null;
}

function msgBackground()
{
    var graphics = new PIXI.Graphics(); 
    graphics.hitArea = new PIXI.Rectangle(0, 0, MAIN_WIDTH, MAIN_HEIGH);
    graphics.interactive = true;
    graphics.lineStyle(1, 0x000000, 0.05);
    graphics.beginFill(0x000000, 0.05);
    graphics.drawRect(0, 0, MAIN_WIDTH, MAIN_HEIGH);
    graphics.endFill();
    msgStage.addChild(graphics);
}

function msgWindow()
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
        for(var i = 0; i < 55; i++)
        {
            graphics.lineStyle(1, 0x0090F0, 0.5);
            graphics.moveTo(250,280+(3*i));
            graphics.lineTo(600, 280+(3*i));

        }
        msgStage.addChild(graphics);
        
        msgLineAnimationGraphics = new PIXI.Graphics(); 
        msgLineAnimationGraphics.lineStyle(10, 0x0090F0, 0.3);
        msgLineAnimationGraphics.moveTo(250,255);
        msgLineAnimationGraphics.lineTo(600, 255);
        msgStage.addChild(msgLineAnimationGraphics);
        msgLineAnimationGraphicsTween();
        
        graphics = new PIXI.Graphics(); 
        graphics.lineStyle(1, 0x0080C0, 1);
        graphics.beginFill(0x0080C0, 1);
        graphics.moveTo(400,250);
        graphics.lineTo(425, 275);
        graphics.lineTo(600, 275);
        graphics.lineTo(600, 250);
        graphics.endFill();
        msgStage.addChild(graphics);
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
        for(var i = 0; i < 55; i++)
        {
            graphics.lineStyle(1, 0xA63A24, 0.5);
            graphics.moveTo(250,280+(3*i));
            graphics.lineTo(600, 280+(3*i));
        }
        msgStage.addChild(graphics);
        
        msgLineAnimationGraphics = new PIXI.Graphics(); 
        msgLineAnimationGraphics.lineStyle(10, 0xA63A24, 0.3);
        msgLineAnimationGraphics.moveTo(250,255);
        msgLineAnimationGraphics.lineTo(600, 255);
        msgStage.addChild(msgLineAnimationGraphics);
        msgLineAnimationGraphicsTween();
        
        graphics = new PIXI.Graphics(); 
        graphics.lineStyle(1, 0xA63A24, 1);
        graphics.beginFill(0xA63A24, 1);
        graphics.moveTo(400,250);
        graphics.lineTo(425, 275);
        graphics.lineTo(600, 275);
        graphics.lineTo(600, 250);
        graphics.endFill();
        msgStage.addChild(graphics);
    }
}


function msgLineAnimationGraphicsTween()
{
    createjs.Tween.get(msgLineAnimationGraphics, {loop: true}) 
        .to({x: 0, y: 240}, 2500, createjs.Ease.getPowInOut(3));
    createjs.Ticker.setFPS(60);
}

function msgTitle()
{
    var text;
    
    if(side === SIDE_NONE || side === SIDE_JEDI) text = new PIXI.Text(msgTitleText, msgStyleBlueTitle); 
    if(side === SIDE_SITH) text = new PIXI.Text(msgTitleText, msgStyleRedTitle); 
    text.x = 450;
    text.y = 255;
    msgStage.addChild(text);
}

function msgText()
{
    var text;
    if(side === SIDE_NONE || side === SIDE_JEDI) text = new PIXI.Text(msgMessageText, settingsStyleBlueText); 
    if(side === SIDE_SITH) text = new PIXI.Text(msgMessageText, settingsStyleRedText); 
    text.x = 255;
    text.y = 285;
    msgStage.addChild(text);
}

function msgButtonClose()
{
    if(side === SIDE_NONE || side === SIDE_JEDI)
    {
        var button = new PIXI.extras.MovieClip(animTexButtonBlue); 
        button.name = "button_close";
        button.position.x = 320; 
        button.position.y = 450; 
        button.interactive = true; 
        button.buttonMode = true; 
        button.loop = false; 
        button.animationSpeed = 0.2;
        button.onComplete = onMsgButtonCloseUpdate;
        button.tap = onMsgButtonCloseClick; 
        button.click = onMsgButtonCloseClick; 
        button.on('mouseover', onMsgButtonCloseOver);
        button.on('mouseout', onMsgButtonCloseOut);
        var text = new PIXI.Text("Закрыть", msgStyleBlueText); 
        text.x = button.width / 3;
        text.y = button.height / 3;
        button.addChild(text); 
        msgStage.addChild(button);
    }
    if(side === SIDE_SITH)
    {
        var button = new PIXI.extras.MovieClip(animTexButtonRed); 
        button.name = "button_close";
        button.position.x = 320; 
        button.position.y = 450; 
        button.interactive = true; 
        button.buttonMode = true; 
        button.loop = false; 
        button.animationSpeed = 0.2;
        button.onComplete = onMsgButtonCloseUpdate;
        button.tap = onMsgButtonCloseClick; 
        button.click = onMsgButtonCloseClick; 
        button.on('mouseover', onMsgButtonCloseOver);
        button.on('mouseout', onMsgButtonCloseOut);
        var text = new PIXI.Text("Закрыть", msgStyleRedText); 
        text.x = button.width / 3;
        text.y = button.height / 3;
        button.addChild(text); 
        msgStage.addChild(button);
    }
}

function onMsgButtonCloseOver()
{
    this.isOver = true;
    this.gotoAndPlay(1);
}

function onMsgButtonCloseOut()
{
    this.isOver = false;
    this.gotoAndStop(0);
}

function onMsgButtonCloseUpdate()
{
    if(this.isOver)
    {
        this.gotoAndPlay(1);
    }else{
        this.gotoAndStop(0);
    }
}

function onMsgButtonCloseClick() 
{
    msgRemove();
}

/* == КОНЕЦ ФАЙЛА ========================================================== */

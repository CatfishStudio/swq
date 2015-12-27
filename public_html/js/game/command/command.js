
/* == НАЧАЛО ФАЙЛА ========================================================= */

var cmdStage;
var cmdSpaceBackground;
var cmdLineAnimPersonageDesktopGraphics;
var cmdMessageLineGraphics;
var cmdStyleButtonBlueText = { font : 'bold 14px Arial', fill : '#FFFFFF', stroke : '#0090F0', strokeThickness : 1, wordWrap : true, wordWrapWidth : 200 }; 
var cmdStyleButtonRedText = { font : 'bold 14px Arial', fill : '#FFFFFF', stroke : '#880000', strokeThickness : 1, wordWrap : true, wordWrapWidth : 200 }; 

function cmdCreate()
{
	cmdStage = new PIXI.Container();
	
        if(side === SIDE_JEDI)
        {
            cmdBackgroundBlue(); 
            cmdDesktopBlue();
            cmdBorderBlue();
            cmdDroidBlue();
            cmdBattonsBlue();
           
        }
        if(side === SIDE_SITH)
        {
            cmdBackgroundRed();
            cmdDesktopRed();
            cmdBorderRed();
            cmdDroidRed();
            cmdBattonsRed();
        }
	
	stage.addChild(cmdStage);
}

function cmdRemove()
{
	stage.removeChild(cmdStage);
	cmdStage = null;
}

function cmdBackgroundBlue()
{
    cmdSpaceBackground = new PIXI.Sprite(mapSpaceBlueTexture); 
    cmdSpaceBackground.position.x = -82; 
    cmdSpaceBackground.position.y = -19; 
    cmdStage.addChild(cmdSpaceBackground);
    cmdAnimSpaceTween();
}

function cmdBorderBlue()
{
    var graphics = new PIXI.Graphics(); 

    graphics.lineStyle(2, 0x0000FF, 1);
    graphics.beginFill(0x000000, 0);
    graphics.drawRect(10, 10, 840, 710);

    graphics.lineStyle(0);
    graphics.beginFill(0xFFFFFF, 1);
    graphics.drawCircle(555, 600,4);
    graphics.endFill();

    graphics.lineStyle(2, 0xFFFFFF, 1);
    graphics.moveTo(555, 600);
    graphics.lineTo(5, 600);
    
    graphics.moveTo(5, 600);
    graphics.lineTo(5, 725);
    graphics.moveTo(5, 725);
    graphics.lineTo(855, 725);
    graphics.moveTo(855, 725);
    graphics.lineTo(855, 665);
    graphics.moveTo(855, 665);
    graphics.lineTo(650, 665);

    graphics.lineStyle(0);
    graphics.beginFill(0xFFFFFF, 1);
    graphics.drawCircle(650, 665,4);
    graphics.endFill();

    graphics.lineStyle(0);
    graphics.beginFill(0xFFFFFF, 1);
    graphics.drawCircle(20, 20,4);
    graphics.endFill();

    graphics.lineStyle(2, 0xFFFFFF, 1);
    graphics.moveTo(20, 20);
    graphics.lineTo(550, 20);
    
    graphics.moveTo(550, 20);
    graphics.lineTo(570, 5);
    
    graphics.moveTo(570, 5);
    graphics.lineTo(855, 5);
    graphics.moveTo(855, 5);
    graphics.lineTo(855, 50);
    graphics.moveTo(855, 50);
    graphics.lineTo(650, 50);

    graphics.lineStyle(0);
    graphics.beginFill(0xFFFFFF, 1);
    graphics.drawCircle(650, 50,4);
    graphics.endFill();
    
    cmdStage.addChild(graphics);
    
    var text = new PIXI.Text("КОМАНДА", cmdStyleButtonBlueText); 
    text.x = 655;
    text.y = 30;
    cmdStage.addChild(text);
}

function cmdBattonsBlue()
{
    var button = new PIXI.extras.MovieClip(animTexButtonBlue);
    button.name = "Closed";
    button.position.x = 650; 
    button.position.y = 670; 
    button.interactive = true; 
    button.buttonMode = true; 
    button.loop = false; 
    button.animationSpeed = 0.2;
    button.onComplete = onCmdButtonUpdate;
    button.tap = onCmdButtonClick; 
    button.click = onCmdButtonClick; 
    button.on('mouseover', onCmdButtonOver);
    button.on('mouseout', onCmdButtonOut);
    
    var text = new PIXI.Text("ЗАКРЫТЬ", cmdStyleButtonBlueText); 
    text.x = button.width / 3.2;
    text.y = button.height / 3;

    button.addChild(text); 
    cmdStage.addChild(button);
}

function cmdDesktopBlue()
{
    var graphics = new PIXI.Graphics();

    graphics.lineStyle(2, 0x0000FF, 1);
    graphics.beginFill(0x0000FF, 0.2);
    graphics.moveTo(25, 20);
    graphics.lineTo(550, 20);
    graphics.lineTo(550, 575);
    graphics.lineTo(25, 575);
    graphics.endFill;

    for(var i = 0; i < 185; i++)
    {
        graphics.lineStyle(1, 0x0000FF, 0.5);
        graphics.moveTo(25, 20+(3*i));
        graphics.lineTo(550, 20+(3*i));
    }
    
    graphics.lineStyle(2, 0x0000FF, 1);
    graphics.beginFill(0x0000FF, 0.2);
    graphics.moveTo(25, 600);
    graphics.lineTo(550, 600);
    graphics.lineTo(550, 715);
    graphics.lineTo(25, 715);
    graphics.endFill;
    
    graphics.lineStyle(2, 0x0000FF, 1);
    graphics.beginFill(0x0000FF, 0.2);
    graphics.moveTo(655, 50);
    graphics.lineTo(800, 50);
    graphics.lineTo(800, 350);
    graphics.lineTo(650, 350);
    graphics.endFill;
    
    cmdStage.addChild(graphics);

    cmdLineAnimPersonageDesktopGraphics = new PIXI.Graphics(); 
    cmdLineAnimPersonageDesktopGraphics.lineStyle(10, 0x0000FF, 0.3);
    cmdLineAnimPersonageDesktopGraphics.moveTo(25, 25);
    cmdLineAnimPersonageDesktopGraphics.lineTo(550, 25);
    cmdStage.addChild(cmdLineAnimPersonageDesktopGraphics);
    cmdLineAnimPersonageDesktopGraphicsTween();
}

function cmdDroidBlue()
{
    var textureSprite = new PIXI.Sprite(r2d2DroidBlueRightTexture); 
    textureSprite.position.x = 765; 
    textureSprite.position.y = 550; 
    textureSprite.scale.set(0.3);
    cmdStage.addChild(textureSprite);
    
    var graphics = new PIXI.Graphics(); 
    graphics.lineStyle(2, 0x0090F0, 0.2);
    graphics.beginFill(0x0090F0, 0.2);
    graphics.moveTo(795, 570);
    graphics.lineTo(570, 525);
    graphics.lineTo(840, 525);
    graphics.lineTo(795, 570);
    graphics.endFill;
    cmdStage.addChild(graphics);
    
    for(var i = 0; i < 50; i++)
    {
        graphics.lineStyle(1, 0x0090F0, 0.2);
        graphics.moveTo(560, 375+(3*i));
        graphics.lineTo(840, 375+(3*i));
    }
    cmdStage.addChild(graphics);
    
    cmdMessageLineGraphics = new PIXI.Graphics(); 
    cmdMessageLineGraphics.lineStyle(10, 0x0090F0, 0.3);
    cmdMessageLineGraphics.moveTo(560, 380);
    cmdMessageLineGraphics.lineTo(840, 380);
    cmdStage.addChild(cmdMessageLineGraphics);
    cmdMessageLineGraphicsTween();
}

function cmdBackgroundRed()
{
    cmdSpaceBackground = new PIXI.Sprite(mapSpaceRedTexture); 
    cmdSpaceBackground.position.x = -82; 
    cmdSpaceBackground.position.y = -19; 
    cmdStage.addChild(cmdSpaceBackground);
    cmdAnimSpaceTween();
}

function cmdBorderRed()
{
    var graphics = new PIXI.Graphics(); 

    graphics.lineStyle(2, 0xFF0000, 1);
    graphics.beginFill(0x000000, 0);
    graphics.drawRect(10, 10, 840, 710);

    graphics.lineStyle(0);
    graphics.beginFill(0xFFFF00, 1);
    graphics.drawCircle(555, 600,4);
    graphics.endFill();

    graphics.lineStyle(2, 0xFFFF00, 1);
    graphics.moveTo(555, 600);
    graphics.lineTo(5, 600);
    
    graphics.moveTo(5, 600);
    graphics.lineTo(5, 725);
    graphics.moveTo(5, 725);
    graphics.lineTo(855, 725);
    graphics.moveTo(855, 725);
    graphics.lineTo(855, 665);
    graphics.moveTo(855, 665);
    graphics.lineTo(650, 665);

    graphics.lineStyle(0);
    graphics.beginFill(0xFFFF00, 1);
    graphics.drawCircle(650, 665,4);
    graphics.endFill();

    graphics.lineStyle(0);
    graphics.beginFill(0xFFFF00, 1);
    graphics.drawCircle(20, 20,4);
    graphics.endFill();

    graphics.lineStyle(2, 0xFFFF00, 1);
    graphics.moveTo(20, 20);
    graphics.lineTo(550, 20);
    
    graphics.moveTo(550, 20);
    graphics.lineTo(570, 5);
    
    graphics.moveTo(570, 5);
    graphics.lineTo(855, 5);
    graphics.moveTo(855, 5);
    graphics.lineTo(855, 50);
    graphics.moveTo(855, 50);
    graphics.lineTo(650, 50);

    graphics.lineStyle(0);
    graphics.beginFill(0xFFFF00, 1);
    graphics.drawCircle(650, 50,4);
    graphics.endFill();
    
    cmdStage.addChild(graphics);
    
    var text = new PIXI.Text("КОМАНДА", cmdStyleButtonRedText); 
    text.x = 655;
    text.y = 30;
    cmdStage.addChild(text);
}

function cmdBattonsRed()
{
    var button = new PIXI.extras.MovieClip(animTexButtonRed);
    button.name = "Closed";
    button.position.x = 650; 
    button.position.y = 670; 
    button.interactive = true; 
    button.buttonMode = true; 
    button.loop = false; 
    button.animationSpeed = 0.2;
    button.onComplete = onCmdButtonUpdate;
    button.tap = onCmdButtonClick; 
    button.click = onCmdButtonClick; 
    button.on('mouseover', onCmdButtonOver);
    button.on('mouseout', onCmdButtonOut);
    
    var text = new PIXI.Text("ЗАКРЫТЬ", cmdStyleButtonRedText); 
    text.x = button.width / 3.2;
    text.y = button.height / 3;

    button.addChild(text); 
    cmdStage.addChild(button);
}

function cmdDesktopRed()
{
    var graphics = new PIXI.Graphics();

    graphics.lineStyle(2, 0x800000, 1);
    graphics.beginFill(0x800000, 0.2);
    graphics.moveTo(25, 20);
    graphics.lineTo(550, 20);
    graphics.lineTo(550, 575);
    graphics.lineTo(25, 575);
    graphics.endFill;

    for(var i = 0; i < 185; i++)
    {
        graphics.lineStyle(1, 0x800000, 0.5);
        graphics.moveTo(25, 20+(3*i));
        graphics.lineTo(550, 20+(3*i));
    }
    
    graphics.lineStyle(2, 0x800000, 1);
    graphics.beginFill(0x800000, 0.2);
    graphics.moveTo(25, 600);
    graphics.lineTo(550, 600);
    graphics.lineTo(550, 715);
    graphics.lineTo(25, 715);
    graphics.endFill;
    
    graphics.lineStyle(2, 0x800000, 1);
    graphics.beginFill(0x800000, 0.2);
    graphics.moveTo(655, 50);
    graphics.lineTo(800, 50);
    graphics.lineTo(800, 350);
    graphics.lineTo(650, 350);
    graphics.endFill;
    
    cmdStage.addChild(graphics);

    cmdLineAnimPersonageDesktopGraphics = new PIXI.Graphics(); 
    cmdLineAnimPersonageDesktopGraphics.lineStyle(10, 0x800000, 0.3);
    cmdLineAnimPersonageDesktopGraphics.moveTo(25, 25);
    cmdLineAnimPersonageDesktopGraphics.lineTo(550, 25);
    cmdStage.addChild(cmdLineAnimPersonageDesktopGraphics);
    cmdLineAnimPersonageDesktopGraphicsTween();
}

function cmdDroidRed()
{
    var textureSprite = new PIXI.Sprite(r2d2DroidRedRightTexture); 
    textureSprite.position.x = 765; 
    textureSprite.position.y = 550; 
    textureSprite.scale.set(0.3);
    cmdStage.addChild(textureSprite);
    
    var graphics = new PIXI.Graphics(); 
    graphics.lineStyle(2, 0xA63A24, 0.2);
    graphics.beginFill(0xA63A24, 0.2);
    graphics.moveTo(795, 570);
    graphics.lineTo(570, 525);
    graphics.lineTo(840, 525);
    graphics.lineTo(795, 570);
    graphics.endFill;
    cmdStage.addChild(graphics);
    
    for(var i = 0; i < 50; i++)
    {
        graphics.lineStyle(1, 0xA63A24, 0.2);
        graphics.moveTo(560, 375+(3*i));
        graphics.lineTo(840, 375+(3*i));
    }
    cmdStage.addChild(graphics);
    
    cmdMessageLineGraphics = new PIXI.Graphics(); 
    cmdMessageLineGraphics.lineStyle(10, 0xA63A24, 0.3);
    cmdMessageLineGraphics.moveTo(560, 380);
    cmdMessageLineGraphics.lineTo(840, 380);
    cmdStage.addChild(cmdMessageLineGraphics);
    cmdMessageLineGraphicsTween();
}


function onCmdButtonOver()
{
    this.isOver = true;
    this.gotoAndPlay(1);
}

function onCmdButtonOut()
{
    this.isOver = false;
    this.gotoAndStop(0);
}

function onCmdButtonUpdate()
{
    if(this.isOver)
    {
        this.gotoAndPlay(1);
    }else{
        this.gotoAndStop(0);
    }
}

function onCmdButtonClick() 
{
    switch (this.name)
    {
        case "Closed":
            mapCreate();
            cmdRemove();
            break;
        
        case "Invite": 
            VK.callMethod("showInviteBox");
            break;
        default:
            break;
    }
    
}

function cmdAnimSpaceTween()
{
    createjs.Tween.get(cmdSpaceBackground, {loop: true}) 
        .to({rotation: -0.015}, 2500, createjs.Ease.getPowInOut(3))
        .to({rotation: 0.015}, 2500, createjs.Ease.getPowInOut(3))
        .to({rotation: 0.0}, 2500, createjs.Ease.getPowInOut(3));
    createjs.Ticker.setFPS(60);
}

function cmdLineAnimPersonageDesktopGraphicsTween()
{
    createjs.Tween.get(cmdLineAnimPersonageDesktopGraphics, {loop: true}) 
        .to({x: 0, y: 545}, 2500, createjs.Ease.getPowInOut(3));
    createjs.Ticker.setFPS(60);
}

function cmdMessageLineGraphicsTween()
{
    createjs.Tween.get(cmdMessageLineGraphics, {loop: true}) 
            .to({x: 0, y: 138}, 2000, createjs.Ease.getPowInOut(3));
    createjs.Ticker.setFPS(60);
}

/* == КОНЕЦ ФАЙЛА ========================================================== */

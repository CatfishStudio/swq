
/* == НАЧАЛО ФАЙЛА ========================================================= */

var cmdStage;
var cmdSpaceBackground;
var cmdLineAnimPersonageDesktopGraphics;
var cmdMessageLineGraphics;
var cmdStyleButtonBlueText = { font : 'bold 14px Arial', fill : '#FFFFFF', stroke : '#0090F0', strokeThickness : 1, wordWrap : true, wordWrapWidth : 200 }; 
var cmdStyleButtonRedText = { font : 'bold 14px Arial', fill : '#FFFFFF', stroke : '#880000', strokeThickness : 1, wordWrap : true, wordWrapWidth : 200 }; 
var cmdStyledescriptionBlueText = { font : 'bold 14px Arial', fill : '#FFFFFF', stroke : '#0090F0', strokeThickness : 1, wordWrap : true, wordWrapWidth : 500 }; 
var cmdStyledescriptionRedText = { font : 'bold 14px Arial', fill : '#FFFFFF', stroke : '#880000', strokeThickness : 1, wordWrap : true, wordWrapWidth : 500 }; 

var cmdListCommand = [];
var cmdListPersonage = [];
var cmdDesktopStage;

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
        cmdBlueCommand();
    }
    if(side === SIDE_SITH)
    {
        cmdBackgroundRed();
        cmdDesktopRed();
        cmdBorderRed();
        cmdDroidRed();
        cmdBattonsRed();
        cmdRedCommand();
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
    
    var text = new PIXI.Text("КОМАНДА. Очки опыта: " + userExperiencePoints, cmdStyleButtonBlueText); 
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

function cmdBlueCommand(select)
{
    if (select === undefined) {
        select = 0;
    }
    
    if(cmdListCommand.length === 0)
    {
            cmdListCommand = [];
    }else{
        for(var i = 0; i < cmdListCommand.length; i++)
        {
            cmdStage.removeChild(cmdListCommand[i]);
        }
        cmdListCommand = [];
    }
		
    var index = 0;
    for(var key in userCommandUser)
    {
        if(userCommandUser[key] !== null)
        {
            var graphics = new PIXI.Graphics(); 
            graphics.lineStyle(2, 0x0000FF, 0.2);
            graphics.beginFill(0x0000FF, 0.2);
            graphics.drawRect(690, 60 + (100 * index), 75, 75);
            graphics.endFill;

            var textureSprite = new PIXI.Sprite(heroesTextures[userCommandUser[key]][3]); 
            textureSprite.index = index;
            textureSprite.tag = "IN_COMMAND";
            textureSprite.position.x = 690; 
            textureSprite.position.y = 60  + (100 * index); 
            textureSprite.interactive = true; 
            textureSprite.buttonMode = true;
            textureSprite.tap = onCmdBlueIconCommandClick; 
            textureSprite.click = onCmdBlueIconCommandClick; 
            graphics.addChild(textureSprite);
            
            var border = new PIXI.Graphics();
            if(index === select)
            {
                border.lineStyle(2, 0xFFFFFF, 0.5);
                cmdBluePersonageShow(userCommandUser[key], "IN_COMMAND");
            } else {
                border.lineStyle(2, 0x0000FF, 0.2);
            }
            border.drawRect(690, 60 + (100 * index), 75, 75);
            graphics.addChild(border);
            
            cmdListCommand.push(graphics);
            cmdStage.addChild(cmdListCommand[index]);
        } else{
            var graphics = new PIXI.Graphics(); 
            if(index === select) graphics.lineStyle(2, 0xFFFFFF, 0.5);
            else graphics.lineStyle(2, 0x0000FF, 0.2);
            graphics.beginFill(0x0000FF, 0.2);
            graphics.drawRect(690, 60 + (100 * index), 75, 75);
            graphics.endFill;

            cmdListCommand.push(graphics);
            cmdStage.addChild(cmdListCommand[index]);
        }
        index++;
    }
}

function onCmdBlueIconCommandClick()
{
	cmdBlueCommand(this.index);
}

function cmdBluePersonageShow(id, status)
{
    cmdStage.removeChild(cmdDesktopStage);
    
    cmdDesktopStage = new PIXI.Container();
    var text = new PIXI.Text(userPersonages[id].name, cmdStyleButtonBlueText); 
    text.x = 50; text.y = 30;
    cmdDesktopStage.addChild(text);
    
    text = new PIXI.Text("Характеристики:", cmdStyleButtonBlueText); 
    text.x = 300; text.y = 100;
    cmdDesktopStage.addChild(text);
    
    text = new PIXI.Text("Кристал света:", cmdStyleButtonBlueText); 
    text.x = 300; text.y = 150;
    cmdDesktopStage.addChild(text);
    text = new PIXI.Text(userPersonages[userPersonages[id].id].hitDefense1, cmdStyleButtonBlueText); 
    text.x = 450; text.y = 150;
    cmdDesktopStage.addChild(text);
    
    text = new PIXI.Text("Кристал тьмы:", cmdStyleButtonBlueText); 
    text.x = 300; text.y = 175;
    cmdDesktopStage.addChild(text);
    text = new PIXI.Text(userPersonages[userPersonages[id].id].hitDefense2, cmdStyleButtonBlueText); 
    text.x = 450; text.y = 175;
    cmdDesktopStage.addChild(text);
    
    text = new PIXI.Text("Кристал жизни:", cmdStyleButtonBlueText); 
    text.x = 300; text.y = 200;
    cmdDesktopStage.addChild(text);
    text = new PIXI.Text(userPersonages[userPersonages[id].id].hitDefense3, cmdStyleButtonBlueText); 
    text.x = 450; text.y = 200;
    cmdDesktopStage.addChild(text);
    
    text = new PIXI.Text("Кристал ловкости:", cmdStyleButtonBlueText); 
    text.x = 300; text.y = 225;
    cmdDesktopStage.addChild(text);
    text = new PIXI.Text(userPersonages[userPersonages[id].id].hitDefense4, cmdStyleButtonBlueText); 
    text.x = 450; text.y = 225;
    cmdDesktopStage.addChild(text);
    
    text = new PIXI.Text("Кристал интелекта:", cmdStyleButtonBlueText); 
    text.x = 300; text.y = 250;
    cmdDesktopStage.addChild(text);
    text = new PIXI.Text(userPersonages[userPersonages[id].id].hitDefense5, cmdStyleButtonBlueText); 
    text.x = 450; text.y = 250;
    cmdDesktopStage.addChild(text);
    
    var sprite = new PIXI.Sprite(heroesTextures[id][1]);
    sprite.position.x = 25;
    sprite.position.y = 50;
    cmdDesktopStage.addChild(sprite);
    
    text = new PIXI.Text(userPersonages[id].description, cmdStyledescriptionBlueText); 
    text.x = 50;
    text.y = 550 - text.height;
    cmdDesktopStage.addChild(text);
    
    if(status === "IN_COMMAND") cmdBlueButtonRemovePersonage();
    else cmdBlueButtonSelectPersonage();
    
    cmdStage.addChild(cmdDesktopStage);
}

function cmdBlueButtonRemovePersonage()
{
    var button = new PIXI.extras.MovieClip(animTexButtonBlue);
    button.name = "Remove";
    button.position.x = 350; 
    button.position.y = 25; 
    button.interactive = true; 
    button.buttonMode = true; 
    button.loop = false; 
    button.animationSpeed = 0.2;
    button.onComplete = onCmdButtonUpdate;
    button.tap = onCmdButtonClick; 
    button.click = onCmdButtonClick; 
    button.on('mouseover', onCmdButtonOver);
    button.on('mouseout', onCmdButtonOut);
    
    var text = new PIXI.Text("УБРАТЬ ИЗ СПИСКА", cmdStyleButtonBlueText); 
    text.x = button.width / 6.5;
    text.y = button.height / 3;

    button.addChild(text); 
    cmdDesktopStage.addChild(button);
}

function cmdBlueButtonSelectPersonage()
{
    var button = new PIXI.extras.MovieClip(animTexButtonBlue);
    button.name = "Select";
    button.position.x = 350; 
    button.position.y = 25; 
    button.interactive = true; 
    button.buttonMode = true; 
    button.loop = false; 
    button.animationSpeed = 0.2;
    button.onComplete = onCmdButtonUpdate;
    button.tap = onCmdButtonClick; 
    button.click = onCmdButtonClick; 
    button.on('mouseover', onCmdButtonOver);
    button.on('mouseout', onCmdButtonOut);
    
    var text = new PIXI.Text("ДОБАВИТЬ В СПИСОК", cmdStyleButtonBlueText); 
    text.x = button.width / 6.5;
    text.y = button.height / 3;

    button.addChild(text); 
    cmdDesktopStage.addChild(button);
}

function cmdRedCommand(select)
{
    if (select === undefined) {
        select = 0;
    }
    
    if(cmdListCommand.length === 0)
    {
            cmdListCommand = [];
    }else{
        for(var i = 0; i < cmdListCommand.length; i++)
        {
            cmdStage.removeChild(cmdListCommand[i]);
        }
        cmdListCommand = [];
    }
		
    var index = 0;
    for(var key in userCommandUser)
    {
        if(userCommandUser[key] !== null)
        {
            var graphics = new PIXI.Graphics(); 
            graphics.lineStyle(2, 0xFF0000, 0.2);
            graphics.beginFill(0xFF0000, 0.2);
            graphics.drawRect(690, 60 + (100 * index), 75, 75);
            graphics.endFill;

            var textureSprite = new PIXI.Sprite(heroesTextures[userCommandUser[key]][3]); 
            textureSprite.index = index;
            textureSprite.tag = "IN_COMMAND";
            textureSprite.position.x = 690; 
            textureSprite.position.y = 60  + (100 * index); 
            textureSprite.interactive = true; 
            textureSprite.buttonMode = true;
            textureSprite.tap = onCmdRedIconCommandClick; 
            textureSprite.click = onCmdRedIconCommandClick; 
            graphics.addChild(textureSprite);
            
            var border = new PIXI.Graphics();
            if(index === select)
            {
                border.lineStyle(2, 0xFFFFFF, 0.5);
                cmdRedPersonageShow(userCommandUser[key], "IN_COMMAND");
            } else {
                border.lineStyle(2, 0x0000FF, 0.2);
            }
            border.drawRect(690, 60 + (100 * index), 75, 75);
            graphics.addChild(border);
            
            cmdListCommand.push(graphics);
            cmdStage.addChild(cmdListCommand[index]);
        } else{
            var graphics = new PIXI.Graphics(); 
            if(index === select) graphics.lineStyle(2, 0xFFFFFF, 0.5);
            else graphics.lineStyle(2, 0xFF0000, 0.2);
            graphics.beginFill(0xFF0000, 0.2);
            graphics.drawRect(690, 60 + (100 * index), 75, 75);
            graphics.endFill;

            cmdListCommand.push(graphics);
            cmdStage.addChild(cmdListCommand[index]);
        }
        index++;
    }
}

function onCmdRedIconCommandClick()
{
	cmdRedCommand(this.index);
}

function cmdRedPersonageShow(id, status)
{
    cmdStage.removeChild(cmdDesktopStage);
    
    cmdDesktopStage = new PIXI.Container();
    var text = new PIXI.Text(userPersonages[id].name, cmdStyleButtonRedText); 
    text.x = 50; text.y = 30;
    cmdDesktopStage.addChild(text);
    
    text = new PIXI.Text("Характеристики:", cmdStyleButtonRedText); 
    text.x = 300; text.y = 100;
    cmdDesktopStage.addChild(text);
    
    text = new PIXI.Text("Кристал света:", cmdStyleButtonRedText); 
    text.x = 300; text.y = 150;
    cmdDesktopStage.addChild(text);
    text = new PIXI.Text(userPersonages[userPersonages[id].id].hitDefense1, cmdStyleButtonRedText); 
    text.x = 450; text.y = 150;
    cmdDesktopStage.addChild(text);
    
    text = new PIXI.Text("Кристал тьмы:", cmdStyleButtonRedText); 
    text.x = 300; text.y = 175;
    cmdDesktopStage.addChild(text);
    text = new PIXI.Text(userPersonages[userPersonages[id].id].hitDefense2, cmdStyleButtonRedText); 
    text.x = 450; text.y = 175;
    cmdDesktopStage.addChild(text);
    
    text = new PIXI.Text("Кристал жизни:", cmdStyleButtonRedText); 
    text.x = 300; text.y = 200;
    cmdDesktopStage.addChild(text);
    text = new PIXI.Text(userPersonages[userPersonages[id].id].hitDefense3, cmdStyleButtonRedText); 
    text.x = 450; text.y = 200;
    cmdDesktopStage.addChild(text);
    
    text = new PIXI.Text("Кристал ловкости:", cmdStyleButtonRedText); 
    text.x = 300; text.y = 225;
    cmdDesktopStage.addChild(text);
    text = new PIXI.Text(userPersonages[userPersonages[id].id].hitDefense4, cmdStyleButtonRedText); 
    text.x = 450; text.y = 225;
    cmdDesktopStage.addChild(text);
    
    text = new PIXI.Text("Кристал интелекта:", cmdStyleButtonRedText); 
    text.x = 300; text.y = 250;
    cmdDesktopStage.addChild(text);
    text = new PIXI.Text(userPersonages[userPersonages[id].id].hitDefense5, cmdStyleButtonRedText); 
    text.x = 450; text.y = 250;
    cmdDesktopStage.addChild(text);
    
    var sprite = new PIXI.Sprite(heroesTextures[id][1]);
    sprite.position.x = 25;
    sprite.position.y = 50;
    cmdDesktopStage.addChild(sprite);
    
    text = new PIXI.Text(userPersonages[id].description, cmdStyledescriptionRedText); 
    text.x = 50;
    text.y = 550 - text.height;
    cmdDesktopStage.addChild(text);
    
    if(status === "IN_COMMAND") cmdRedButtonRemovePersonage();
    else cmdRedButtonSelectPersonage();
    
    cmdStage.addChild(cmdDesktopStage);
}

function cmdRedButtonRemovePersonage()
{
    var button = new PIXI.extras.MovieClip(animTexButtonRed);
    button.name = "Remove";
    button.position.x = 350; 
    button.position.y = 25; 
    button.interactive = true; 
    button.buttonMode = true; 
    button.loop = false; 
    button.animationSpeed = 0.2;
    button.onComplete = onCmdButtonUpdate;
    button.tap = onCmdButtonClick; 
    button.click = onCmdButtonClick; 
    button.on('mouseover', onCmdButtonOver);
    button.on('mouseout', onCmdButtonOut);
    
    var text = new PIXI.Text("УБРАТЬ ИЗ СПИСКА", cmdStyleButtonBlueText); 
    text.x = button.width / 6.5;
    text.y = button.height / 3;

    button.addChild(text); 
    cmdDesktopStage.addChild(button);
}

function cmdRedButtonSelectPersonage()
{
    var button = new PIXI.extras.MovieClip(animTexButtonRed);
    button.name = "Select";
    button.position.x = 350; 
    button.position.y = 25; 
    button.interactive = true; 
    button.buttonMode = true; 
    button.loop = false; 
    button.animationSpeed = 0.2;
    button.onComplete = onCmdButtonUpdate;
    button.tap = onCmdButtonClick; 
    button.click = onCmdButtonClick; 
    button.on('mouseover', onCmdButtonOver);
    button.on('mouseout', onCmdButtonOut);
    
    var text = new PIXI.Text("ДОБАВИТЬ В СПИСОК", cmdStyleButtonBlueText); 
    text.x = button.width / 6.5;
    text.y = button.height / 3;

    button.addChild(text); 
    cmdDesktopStage.addChild(button);
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

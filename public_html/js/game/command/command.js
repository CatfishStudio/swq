
/* == НАЧАЛО ФАЙЛА ========================================================= */

var cmdStage;
var cmdSpaceBackground;
var cmdLineAnimPersonageDesktopGraphics;
var cmdMessageLineGraphics;
var cmdStyleButtonBlueText = { font : 'bold 14px Arial', fill : '#FFFFFF', stroke : '#0090F0', strokeThickness : 1, wordWrap : true, wordWrapWidth : 200 }; 
var cmdStyleButtonRedText = { font : 'bold 14px Arial', fill : '#FFFFFF', stroke : '#880000', strokeThickness : 1, wordWrap : true, wordWrapWidth : 200 }; 
var cmdStyledescriptionBlueText = { font : 'bold 14px Arial', fill : '#FFFFFF', stroke : '#0090F0', strokeThickness : 1, wordWrap : true, wordWrapWidth : 495 }; 
var cmdStyledescriptionRedText = { font : 'bold 14px Arial', fill : '#FFFFFF', stroke : '#880000', strokeThickness : 1, wordWrap : true, wordWrapWidth : 495 }; 
var cmdStyleDroidBlueText = { font : 'bold 14px Arial', fill : '#C4DEFB', stroke : '#0090F0', strokeThickness : 1, wordWrap : true, wordWrapWidth : 270 }; 
var cmdStyleDroidRedText = { font : 'bold 14px Arial', fill : '#EDCDCB', stroke : '#880000', strokeThickness : 1, wordWrap : true, wordWrapWidth : 270 }; 
var cmdExperiencePointsText;

var cmdListCommand = [];
var cmdListPersonage = [];
var cmdDesktopStage;
var cmdTapeStage;
var cmdTapePanelButtonsStage;
var cmdSelectPersonageID;
var cmdSelectPersonageIndex;

function cmdCreate()
{
    cmdStage = new PIXI.Container();

    if(side === SIDE_JEDI)
    {
        cmdBackgroundBlue(); 
        cmdDesktopBlue();
        cmdBorderBlue();
        cmdDroidBlue();
        cmdBlueCommand();
        cmdTapeMask();
        cmdTapeBlue();
        cmdTapeButton();
        cmdBattonsBlue();
    }
    if(side === SIDE_SITH)
    {
        cmdBackgroundRed();
        cmdDesktopRed();
        cmdBorderRed();
        cmdDroidRed();
        cmdRedCommand();
        cmdTapeMask();
        cmdTapeRed();
        cmdTapeButton();
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
    graphics.drawCircle(20, 15,4);
    graphics.endFill();

    graphics.lineStyle(2, 0xFFFFFF, 1);
    graphics.moveTo(20, 15);
    graphics.lineTo(550, 15);
    
    graphics.moveTo(550, 15);
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
    
    cmdExperiencePointsText = new PIXI.Text("КОМАНДА. Очки опыта: " + userExperiencePoints, cmdStyleButtonBlueText); 
    cmdExperiencePointsText.x = 655;
    cmdExperiencePointsText.y = 30;
    cmdStage.addChild(cmdExperiencePointsText);
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
    
    cmdTextMessage = new PIXI.Text("Это окно вашей команды.\n\nТут вы можите убирать и добавлять персонажей в команду.\n\nВы можите улучшать характеристики персонажей за счёт полученных очков опыта.", cmdStyleDroidBlueText); 
    cmdTextMessage.x = 565; 
    cmdTextMessage.y = 375; 
    cmdStage.addChild(cmdTextMessage);
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
    graphics.beginFill(0xFFFF80, 1);
    graphics.drawCircle(555, 600,4);
    graphics.endFill();

    graphics.lineStyle(2, 0xFFFF80, 1);
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
    graphics.beginFill(0xFFFF80, 1);
    graphics.drawCircle(650, 665,4);
    graphics.endFill();

    graphics.lineStyle(0);
    graphics.beginFill(0xFFFF80, 1);
    graphics.drawCircle(20, 15,4);
    graphics.endFill();

    graphics.lineStyle(2, 0xFFFF80, 1);
    graphics.moveTo(20, 15);
    graphics.lineTo(550, 15);
    
    graphics.moveTo(550, 15);
    graphics.lineTo(570, 5);
    
    graphics.moveTo(570, 5);
    graphics.lineTo(855, 5);
    graphics.moveTo(855, 5);
    graphics.lineTo(855, 50);
    graphics.moveTo(855, 50);
    graphics.lineTo(650, 50);

    graphics.lineStyle(0);
    graphics.beginFill(0xFFFF80, 1);
    graphics.drawCircle(650, 50,4);
    graphics.endFill();
    
    cmdStage.addChild(graphics);
    
    cmdExperiencePointsText = new PIXI.Text("КОМАНДА. Очки опыта: " + userExperiencePoints, cmdStyleButtonRedText); 
    cmdExperiencePointsText.x = 655;
    cmdExperiencePointsText.y = 30;
    cmdStage.addChild(cmdExperiencePointsText);
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
    
    cmdTextMessage = new PIXI.Text("Это окно вашей команды.\n\nТут вы можите убирать и добавлять персонажей в команду.\n\nВы можите улучшать характеристики персонажей за счёт полученных очков опыта.", cmdStyleDroidRedText); 
    cmdTextMessage.x = 565; 
    cmdTextMessage.y = 375; 
    cmdStage.addChild(cmdTextMessage);
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
    
    var selectIndex = select;
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
            textureSprite.name = userCommandUser[key];
            textureSprite.index = index;
            textureSprite.position.x = 690; 
            textureSprite.position.y = 60  + (100 * index); 
            textureSprite.interactive = true; 
            textureSprite.buttonMode = true;
            textureSprite.tap = onCmdBlueIconCommandClick; 
            textureSprite.click = onCmdBlueIconCommandClick; 
            graphics.addChild(textureSprite);
            
            var border = new PIXI.Graphics();
            if(index === selectIndex)
            {
                border.lineStyle(2, 0xFFFFFF, 0.5);
                cmdBluePersonageShow(userCommandUser[key]);
                cmdSelectPersonageID = userCommandUser[key];
                cmdSelectPersonageIndex = index;
            } else {
                border.lineStyle(2, 0x0000FF, 0.2);
            }
            border.drawRect(690, 60 + (100 * index), 75, 75);
            graphics.addChild(border);
            
            cmdListCommand.push(graphics);
            cmdStage.addChild(cmdListCommand[index]);
        } else{
            var graphics = new PIXI.Graphics(); 
            graphics.lineStyle(2, 0x0000FF, 0.2);
            graphics.beginFill(0x0000FF, 0.2);
            graphics.drawRect(690, 60 + (100 * index), 75, 75);
            graphics.endFill;
            cmdListCommand.push(graphics);
            cmdStage.addChild(cmdListCommand[index]);
            if(select === 0 && selectIndex < 2) selectIndex++;
        }
        index++;
    }
}

function onCmdBlueIconCommandClick()
{
        cmdSelectPersonageID = this.name;
        cmdSelectPersonageIndex = this.index;
        cmdBlueCommand(this.index);
        cmdTapeBlue(-1);
}

function cmdBluePersonageShow(id)
{
    cmdStage.removeChild(cmdDesktopStage);
    if(id !== null)
    {
        cmdDesktopStage = new PIXI.Container();
        
        var graphics = new PIXI.Graphics();
        graphics.lineStyle(2, 0x0000FF, 1);
        graphics.beginFill(0x0000FF, 0.2);
        graphics.moveTo(25, 20);
        graphics.lineTo(550, 20);
        graphics.lineTo(550, 575);
        graphics.lineTo(25, 575);
        graphics.endFill;
        cmdDesktopStage.addChild(graphics);
        
        var sprite = new PIXI.Sprite(heroesTextures[id][1]);
        sprite.position.x = 25;
        sprite.position.y = 50;
        cmdDesktopStage.addChild(sprite);
        
        graphics = new PIXI.Graphics();
        for(var i = 0; i < 185; i++)
        {
            graphics.lineStyle(1, 0x0000FF, 0.5);
            graphics.moveTo(25, 20+(3*i));
            graphics.lineTo(550, 20+(3*i));
        }
        cmdDesktopStage.addChild(graphics);
        
        cmdLineAnimPersonageDesktopGraphics = new PIXI.Graphics(); 
        cmdLineAnimPersonageDesktopGraphics.lineStyle(10, 0x0000FF, 0.3);
        cmdLineAnimPersonageDesktopGraphics.moveTo(25, 25);
        cmdLineAnimPersonageDesktopGraphics.lineTo(550, 25);
        cmdDesktopStage.addChild(cmdLineAnimPersonageDesktopGraphics);
        cmdLineAnimPersonageDesktopGraphicsTween();
        
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

        text = new PIXI.Text("Кристал интеллекта:", cmdStyleButtonBlueText); 
        text.x = 300; text.y = 250;
        cmdDesktopStage.addChild(text);
        text = new PIXI.Text(userPersonages[userPersonages[id].id].hitDefense5, cmdStyleButtonBlueText); 
        text.x = 450; text.y = 250;
        cmdDesktopStage.addChild(text);

        text = new PIXI.Text(userPersonages[id].description, cmdStyledescriptionBlueText); 
        text.x = 50;
        text.y = 550 - text.height;
        cmdDesktopStage.addChild(text);
        
        if(userPersonages[userPersonages[id].id].command === true) cmdBlueButtonRemovePersonage();
        else cmdBlueButtonSelectPersonage();

        cmdExperiencePointsButtons();

        cmdStage.addChild(cmdDesktopStage);
    }else{
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
        cmdDesktopStage.addChild(graphics);
    }
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
    text.x = button.width / 8.0;
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

    var selectIndex = select;
    var index = 0;
    for(var key in userCommandUser)
    {
        if(userCommandUser[key] !== null)
        {
            var graphics = new PIXI.Graphics(); 
            graphics.lineStyle(2, 0xFF0000, 0.2);
            graphics.beginFill(0xFF0000, 0.2);
            graphics.drawRect(690, 60 + (100 * index), 75, 75);
            graphics.endFill();

            var textureSprite = new PIXI.Sprite(heroesTextures[userCommandUser[key]][3]); 
            textureSprite.name = userCommandUser[key];
            textureSprite.index = index;
            textureSprite.position.x = 690; 
            textureSprite.position.y = 60  + (100 * index); 
            textureSprite.interactive = true; 
            textureSprite.buttonMode = true;
            textureSprite.tap = onCmdRedIconCommandClick; 
            textureSprite.click = onCmdRedIconCommandClick; 
            graphics.addChild(textureSprite);
            
            var border = new PIXI.Graphics();
            if(index === selectIndex)
            {
                border.lineStyle(2, 0xFFFFFF, 0.5);
                cmdRedPersonageShow(userCommandUser[key]);
                cmdSelectPersonageID = userCommandUser[key];
                cmdSelectPersonageIndex = index;
            } else {
                border.lineStyle(2, 0x0000FF, 0.2);
            }
            border.drawRect(690, 60 + (100 * index), 75, 75);
            graphics.addChild(border);
            
            cmdListCommand.push(graphics);
            cmdStage.addChild(cmdListCommand[index]);
        } else{
            var graphics = new PIXI.Graphics(); 
            graphics.lineStyle(2, 0xFF0000, 0.2);
            graphics.beginFill(0xFF0000, 0.2);
            graphics.drawRect(690, 60 + (100 * index), 75, 75);
            graphics.endFill();

            cmdListCommand.push(graphics);
            cmdStage.addChild(cmdListCommand[index]);
            if(select === 0 && selectIndex < 2) selectIndex++;
        }
        index++;
    }
}

function onCmdRedIconCommandClick()
{
        cmdSelectPersonageID = this.name;
        cmdSelectPersonageIndex = this.index;
	cmdRedCommand(this.index);
        cmdTapeRed(-1);
}

function cmdRedPersonageShow(id)
{
    cmdStage.removeChild(cmdDesktopStage);
    
    if(id !== null)
    {
        cmdDesktopStage = new PIXI.Container();
        
        var graphics = new PIXI.Graphics();
        graphics.lineStyle(2, 0x800000, 1);
        graphics.beginFill(0x800000, 0.2);
        graphics.moveTo(25, 20);
        graphics.lineTo(550, 20);
        graphics.lineTo(550, 575);
        graphics.lineTo(25, 575);
        graphics.endFill();
        cmdDesktopStage.addChild(graphics);
        
        var sprite = new PIXI.Sprite(heroesTextures[id][1]);
        sprite.position.x = 25;
        sprite.position.y = 50;
        cmdDesktopStage.addChild(sprite);
        
        var graphics = new PIXI.Graphics();
        for(var i = 0; i < 185; i++)
        {
            graphics.lineStyle(1, 0x800000, 0.5);
            graphics.moveTo(25, 20+(3*i));
            graphics.lineTo(550, 20+(3*i));
        }
        cmdDesktopStage.addChild(graphics);
        
        cmdLineAnimPersonageDesktopGraphics = new PIXI.Graphics(); 
        cmdLineAnimPersonageDesktopGraphics.lineStyle(10, 0x800000, 0.3);
        cmdLineAnimPersonageDesktopGraphics.moveTo(25, 25);
        cmdLineAnimPersonageDesktopGraphics.lineTo(550, 25);
        cmdDesktopStage.addChild(cmdLineAnimPersonageDesktopGraphics);
        cmdLineAnimPersonageDesktopGraphicsTween();

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

        text = new PIXI.Text("Кристал интеллекта:", cmdStyleButtonRedText); 
        text.x = 300; text.y = 250;
        cmdDesktopStage.addChild(text);
        text = new PIXI.Text(userPersonages[userPersonages[id].id].hitDefense5, cmdStyleButtonRedText); 
        text.x = 450; text.y = 250;
        cmdDesktopStage.addChild(text);

        text = new PIXI.Text(userPersonages[id].description, cmdStyledescriptionRedText); 
        text.x = 50;
        text.y = 550 - text.height;
        cmdDesktopStage.addChild(text);

        if(userPersonages[userPersonages[id].id].command === true) cmdRedButtonRemovePersonage();
        else cmdRedButtonSelectPersonage();

        cmdExperiencePointsButtons();

        cmdStage.addChild(cmdDesktopStage);
    }else{
        cmdDesktopStage = new PIXI.Container();
        var graphics = new PIXI.Graphics();
        graphics.lineStyle(2, 0x800000, 1);
        graphics.beginFill(0x800000, 0.2);
        graphics.moveTo(25, 20);
        graphics.lineTo(550, 20);
        graphics.lineTo(550, 575);
        graphics.lineTo(25, 575);
        graphics.endFill();

        for(var i = 0; i < 185; i++)
        {
            graphics.lineStyle(1, 0x800000, 0.5);
            graphics.moveTo(25, 20+(3*i));
            graphics.lineTo(550, 20+(3*i));
        }
        cmdDesktopStage.addChild(graphics);
    }
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
    
    var text = new PIXI.Text("УБРАТЬ ИЗ СПИСКА", cmdStyleButtonRedText); 
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
    text.x = button.width / 8.0;
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
        case "Select":
            cmdSelectCommandPersonage();
            break;
        case "Remove":
            cmdRemoveCommandPersonage();
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

function cmdTapeMask()
{
    cmdTapeStage = new PIXI.Container();
    
    var mask = new PIXI.Graphics();
    mask.lineStyle(2, 0xFF00FF, 1);
    mask.beginFill(0xFF00FF, 0.2);
    mask.moveTo(70, 610);
    mask.lineTo(500, 610);
    mask.lineTo(500, 705);
    mask.lineTo(70, 705);
    mask.endFill();
    
    cmdTapeStage.mask = mask;
    cmdStage.addChild(cmdTapeStage);
    
    /* Всё что не отображается в маске будет не активно */
    var graphics = new PIXI.Graphics(); 
    graphics.hitArea = new PIXI.Rectangle(501, 610, 500, 95);
    graphics.interactive = true;
    graphics.lineStyle(1, 0x000000, 0.0);
    graphics.beginFill(0xFF0000, 0.0);
    graphics.drawRect(501, 610, 500, 95);
    graphics.endFill();
    //cmdTapeStage.addChild(graphics);
    cmdStage.addChild(graphics);

}

function cmdTapeBlue(select)
{
    var countRemove = 0;
    if (select === undefined) {
        for(var key in userCommandUser)
            if(userCommandUser[key] === null) countRemove++;
        if(countRemove === 3) select = 0;
        else select = -1;
    }
    
    if(cmdListCommand.length === 0)
    {
            cmdListPersonage = [];
    }else{
        for(var i = 0; i < cmdListPersonage.length; i++)
        {
            cmdTapeStage.removeChild(cmdListPersonage[i]);
        }
        cmdListPersonage = [];
    }
    
    var index = 0;
    for(var planet in userPlanets)
    {
        if(userPlanets[planet].status === USER_PLANET_QUEST_COMPLETE_JEDI)
        {
            if(userPersonages[userPlanets[planet].bluePersonage1].status === USER_PERSONAGE_AVAILABLE && userPersonages[userPlanets[planet].bluePersonage1].command === false)
            {
                var graphics = new PIXI.Graphics(); 
                graphics.lineStyle(2, 0x0000FF, 0.2);
                graphics.beginFill(0x0000FF, 0.2);
                graphics.drawRect(80 + (100 * index), 620, 75, 75);
                graphics.endFill();
                
                var textureSprite = new PIXI.Sprite(heroesTextures[userPlanets[planet].bluePersonage1][3]); 
                textureSprite.name = userPlanets[planet].bluePersonage1;
                textureSprite.index = index;
                textureSprite.key = userPlanets[planet].bluePersonage1;
                textureSprite.position.x = 80 + (100 * index); 
                textureSprite.position.y = 620; 
                textureSprite.interactive = true; 
                textureSprite.buttonMode = true;
                textureSprite.tap = onCmdBlueIconPersonageClick; 
                textureSprite.click = onCmdBlueIconPersonageClick; 
                graphics.addChild(textureSprite);

                var border = new PIXI.Graphics();
                if(select === index)
                {
                    border.lineStyle(2, 0xFFFFFF, 0.3);
                    cmdBluePersonageShow(userPlanets[planet].bluePersonage1);
                    cmdSelectPersonageID = userPlanets[planet].bluePersonage1;
                    cmdSelectPersonageIndex = index;
                } else border.lineStyle(2, 0x0000FF, 0.2);
                border.drawRect(80 + (100 * index), 620, 75, 75);
                graphics.addChild(border);
                cmdTapeStage.addChild(graphics);

                cmdListPersonage.push(graphics);

                index++;
            }
            if(userPersonages[userPlanets[planet].bluePersonage2].status === USER_PERSONAGE_AVAILABLE && userPersonages[userPlanets[planet].bluePersonage2].command === false)
            {
                var graphics = new PIXI.Graphics(); 
                graphics.lineStyle(2, 0x0000FF, 0.2);
                graphics.beginFill(0x0000FF, 0.2);
                graphics.drawRect(80 + (100 * index), 620, 75, 75);
                graphics.endFill();

                var textureSprite = new PIXI.Sprite(heroesTextures[userPlanets[planet].bluePersonage2][3]); 
                textureSprite.name = userPlanets[planet].bluePersonage2;
                textureSprite.index = index;
                textureSprite.key = userPlanets[planet].bluePersonage2;
                textureSprite.position.x = 80 + (100 * index); 
                textureSprite.position.y = 620; 
                textureSprite.interactive = true; 
                textureSprite.buttonMode = true;
                textureSprite.tap = onCmdBlueIconPersonageClick; 
                textureSprite.click = onCmdBlueIconPersonageClick; 
                graphics.addChild(textureSprite);

                var border = new PIXI.Graphics();
                if(select === index)
                {
                    border.lineStyle(2, 0xFFFFFF, 0.3);
                    cmdBluePersonageShow(userPlanets[planet].bluePersonage2);
                    cmdSelectPersonageID = userPlanets[planet].bluePersonage2;
                    cmdSelectPersonageIndex = index;
                } else border.lineStyle(2, 0x0000FF, 0.2);
                border.drawRect(80 + (100 * index), 620, 75, 75);
                graphics.addChild(border);
                cmdTapeStage.addChild(graphics);

                cmdListPersonage.push(graphics);

                index++;
            }
            if(userPersonages[userPlanets[planet].bluePersonage3].status === USER_PERSONAGE_AVAILABLE && userPersonages[userPlanets[planet].bluePersonage3].command === false)
            {
                var graphics = new PIXI.Graphics(); 
                graphics.lineStyle(2, 0x0000FF, 0.2);
                graphics.beginFill(0x0000FF, 0.2);
                graphics.drawRect(80 + (100 * index), 620, 75, 75);
                graphics.endFill();

                var textureSprite = new PIXI.Sprite(heroesTextures[userPlanets[planet].bluePersonage3][3]); 
                textureSprite.name = userPlanets[planet].bluePersonage3;
                textureSprite.index = index;
                textureSprite.key = userPlanets[planet].bluePersonage3;
                textureSprite.position.x = 80 + (100 * index); 
                textureSprite.position.y = 620; 
                textureSprite.interactive = true; 
                textureSprite.buttonMode = true;
                textureSprite.tap = onCmdBlueIconPersonageClick; 
                textureSprite.click = onCmdBlueIconPersonageClick; 
                graphics.addChild(textureSprite);

                var border = new PIXI.Graphics();
                if(select === index)
                {
                    border.lineStyle(2, 0xFFFFFF, 0.3);
                    cmdBluePersonageShow(userPlanets[planet].bluePersonage3);
                    cmdSelectPersonageID = userPlanets[planet].bluePersonage3;
                    cmdSelectPersonageIndex = index;
                } else border.lineStyle(2, 0x0000FF, 0.2);
                border.drawRect(80 + (100 * index), 620, 75, 75);
                graphics.addChild(border);
                cmdTapeStage.addChild(graphics);

                cmdListPersonage.push(graphics);

                index++;
            }
        }
    }
    
    cmdTapeButton();
}

function onCmdBlueIconPersonageClick()
{
    cmdSelectPersonageID = this.name;
    cmdSelectPersonageIndex = this.index;
    cmdTapeBlue(this.index);
    cmdBlueCommand(-1);
}

function cmdTapeRed(select)
{
    var countRemove = 0;
    if (select === undefined) {
        for(var key in userCommandUser)
            if(userCommandUser[key] === null) countRemove++;
        if(countRemove === 3) select = 0;
        else select = -1;
    }
    
    if(cmdListCommand.length === 0)
    {
            cmdListPersonage = [];
    }else{
        for(var i = 0; i < cmdListPersonage.length; i++)
        {
            cmdTapeStage.removeChild(cmdListPersonage[i]);
        }
        cmdListPersonage = [];
    }
    
    var index = 0;
    for(var planet in userPlanets)
    {
        if(userPlanets[planet].status === USER_PLANET_QUEST_COMPLETE_SITH)
        {
            if(userPersonages[userPlanets[planet].redPersonage1].status === USER_PERSONAGE_AVAILABLE && userPersonages[userPlanets[planet].redPersonage1].command === false)
            {
                var graphics = new PIXI.Graphics(); 
                graphics.lineStyle(2, 0xFF0000, 0.2);
                graphics.beginFill(0xFF0000, 0.2);
                graphics.drawRect(80 + (100 * index), 620, 75, 75);
                graphics.endFill();
                
                var textureSprite = new PIXI.Sprite(heroesTextures[userPlanets[planet].redPersonage1][3]); 
                textureSprite.name = userPlanets[planet].redPersonage1;
                textureSprite.index = index;
                textureSprite.key = userPlanets[planet].redPersonage1;
                textureSprite.position.x = 80 + (100 * index); 
                textureSprite.position.y = 620; 
                textureSprite.interactive = true; 
                textureSprite.buttonMode = true;
                textureSprite.tap = onCmdRedIconPersonageClick; 
                textureSprite.click = onCmdRedIconPersonageClick; 
                graphics.addChild(textureSprite);

                var border = new PIXI.Graphics();
                if(select === index)
                {
                    border.lineStyle(2, 0xFFFFFF, 0.3);
                    cmdRedPersonageShow(userPlanets[planet].redPersonage1);
                    cmdSelectPersonageID = userPlanets[planet].redPersonage1;
                    cmdSelectPersonageIndex = index;
                } else border.lineStyle(2, 0xFF0000, 0.2);
                border.drawRect(80 + (100 * index), 620, 75, 75);
                graphics.addChild(border);
                cmdTapeStage.addChild(graphics);

                cmdListPersonage.push(graphics);

                index++;
            }
            if(userPersonages[userPlanets[planet].redPersonage2].status === USER_PERSONAGE_AVAILABLE && userPersonages[userPlanets[planet].redPersonage2].command === false)
            {
                var graphics = new PIXI.Graphics(); 
                graphics.lineStyle(2, 0xFF0000, 0.2);
                graphics.beginFill(0xFF0000, 0.2);
                graphics.drawRect(80 + (100 * index), 620, 75, 75);
                graphics.endFill();

                var textureSprite = new PIXI.Sprite(heroesTextures[userPlanets[planet].redPersonage2][3]); 
                textureSprite.name = userPlanets[planet].redPersonage2;
                textureSprite.index = index;
                textureSprite.key = userPlanets[planet].redPersonage2;
                textureSprite.position.x = 80 + (100 * index); 
                textureSprite.position.y = 620; 
                textureSprite.interactive = true; 
                textureSprite.buttonMode = true;
                textureSprite.tap = onCmdRedIconPersonageClick; 
                textureSprite.click = onCmdRedIconPersonageClick; 
                graphics.addChild(textureSprite);

                var border = new PIXI.Graphics();
                if(select === index)
                {
                    border.lineStyle(2, 0xFFFFFF, 0.3);
                    cmdRedPersonageShow(userPlanets[planet].redPersonage2);
                    cmdSelectPersonageID = userPlanets[planet].redPersonage2;
                    cmdSelectPersonageIndex = index;
                } else border.lineStyle(2, 0xFF0000, 0.2);
                border.drawRect(80 + (100 * index), 620, 75, 75);
                graphics.addChild(border);
                cmdTapeStage.addChild(graphics);

                cmdListPersonage.push(graphics);

                index++;
            }
            if(userPersonages[userPlanets[planet].redPersonage3].status === USER_PERSONAGE_AVAILABLE && userPersonages[userPlanets[planet].redPersonage3].command === false)
            {
                var graphics = new PIXI.Graphics(); 
                graphics.lineStyle(2, 0xFF0000, 0.2);
                graphics.beginFill(0xFF0000, 0.2);
                graphics.drawRect(80 + (100 * index), 620, 75, 75);
                graphics.endFill();

                var textureSprite = new PIXI.Sprite(heroesTextures[userPlanets[planet].redPersonage3][3]); 
                textureSprite.name = userPlanets[planet].redPersonage3;
                textureSprite.index = index;
                textureSprite.key = userPlanets[planet].redPersonage3;
                textureSprite.position.x = 80 + (100 * index); 
                textureSprite.position.y = 620; 
                textureSprite.interactive = true; 
                textureSprite.buttonMode = true;
                textureSprite.tap = onCmdRedIconPersonageClick; 
                textureSprite.click = onCmdRedIconPersonageClick; 
                graphics.addChild(textureSprite);

                var border = new PIXI.Graphics();
                if(select === index)
                {
                    border.lineStyle(2, 0xFFFFFF, 0.3);
                    cmdRedPersonageShow(userPlanets[planet].redPersonage3);
                    cmdSelectPersonageID = userPlanets[planet].redPersonage3;
                    cmdSelectPersonageIndex = index;
                } else border.lineStyle(2, 0xFF0000, 0.2);
                border.drawRect(80 + (100 * index), 620, 75, 75);
                graphics.addChild(border);
                cmdTapeStage.addChild(graphics);

                cmdListPersonage.push(graphics);

                index++;
            }
        }
    }
    
    cmdTapeButton();
}

function onCmdRedIconPersonageClick()
{
    cmdSelectPersonageID = this.name;
    cmdSelectPersonageIndex = this.index;
    cmdTapeRed(this.index);
    cmdRedCommand(-1);
}

function cmdRemoveCommandPersonage()
{
    if(side === SIDE_JEDI)
    {
        userPersonages[cmdSelectPersonageID].command = false;
        if(cmdSelectPersonageIndex === 0) userCommandUser["personage1"] = null;
        if(cmdSelectPersonageIndex === 1) userCommandUser["personage2"] = null;
        if(cmdSelectPersonageIndex === 2) userCommandUser["personage3"] = null;
        cmdBlueCommand();
        cmdTapeBlue();
        
    }
    if(side === SIDE_SITH)
    {
        userPersonages[cmdSelectPersonageID].command = false;
        if(cmdSelectPersonageIndex === 0) userCommandUser["personage1"] = null;
        if(cmdSelectPersonageIndex === 1) userCommandUser["personage2"] = null;
        if(cmdSelectPersonageIndex === 2) userCommandUser["personage3"] = null;
        cmdRedCommand();
        cmdTapeRed(); 
    }
}

function cmdSelectCommandPersonage()
{
    userPersonages[cmdSelectPersonageID].command = true;
    for(var key in userCommandUser)
    {
        if(userCommandUser[key] === null)
        {
            userCommandUser[key] = cmdSelectPersonageID;
            break;
        }
    }
    if(side === SIDE_JEDI)
    {
        cmdBlueCommand();
        cmdTapeBlue();
    }
    if(side === SIDE_SITH)
    {
        
        cmdRedCommand();
        cmdTapeRed();
    }
}

function cmdTapeButton()
{
    cmdStage.removeChild(cmdTapePanelButtonsStage);
    
    if(cmdListPersonage.length > 4)
    {
        var color;
        if(side === SIDE_JEDI) color = 0x0000FF;
        else color = 0xFF0000;
        
        cmdTapePanelButtonsStage = new PIXI.Container();
        var tapeButtonGraphics = new PIXI.Graphics();
        tapeButtonGraphics.name = "TapeLeft";
        tapeButtonGraphics.lineStyle(2, color, 1);
        tapeButtonGraphics.beginFill(color, 1);
        tapeButtonGraphics.moveTo(40, 655);
        tapeButtonGraphics.lineTo(65, 630);
        tapeButtonGraphics.lineTo(65, 680);
        tapeButtonGraphics.lineTo(40, 655);
        tapeButtonGraphics.endFill();
        tapeButtonGraphics.interactive = true; 
        tapeButtonGraphics.buttonMode = true; 
        tapeButtonGraphics.tap = onCmdTapeButtonClick; 
        tapeButtonGraphics.click = onCmdTapeButtonClick;
        cmdTapePanelButtonsStage.addChild(tapeButtonGraphics);

        tapeButtonGraphics = new PIXI.Graphics();
        tapeButtonGraphics.name = "TapeRight";
        tapeButtonGraphics.lineStyle(2, color, 1);
        tapeButtonGraphics.beginFill(color, 1);
        tapeButtonGraphics.moveTo(535, 655);
        tapeButtonGraphics.lineTo(510, 630);
        tapeButtonGraphics.lineTo(510, 680);
        tapeButtonGraphics.lineTo(535, 655);
        tapeButtonGraphics.endFill();
        tapeButtonGraphics.interactive = true; 
        tapeButtonGraphics.buttonMode = true; 
        tapeButtonGraphics.tap = onCmdTapeButtonClick; 
        tapeButtonGraphics.click = onCmdTapeButtonClick;
        cmdTapePanelButtonsStage.addChild(tapeButtonGraphics);
        
        cmdStage.addChild(cmdTapePanelButtonsStage);
    }else{
        cmdTapeStage.position.x = 0;
    }
}

function onCmdTapeButtonClick()
{
    switch (this.name)
    {
        case "TapeLeft":
            if(cmdTapeStage.position.x >= ((cmdTapeStage.width - 100) * -1)) cmdTapeStage.position.x -= 100;
            break;
        case "TapeRight":
            if(cmdTapeStage.position.x <= -100) cmdTapeStage.position.x += 100;
            break;
        default:
            break;
    }
}

function cmdExperiencePointsButtons()
{
    if(userExperiencePoints > 0)
    {
        var color1, color2;
        if(side === SIDE_JEDI)
        {
            color1 = 0x0000FF;
            color2 = 0xFFFFFF;
        }
        if(side === SIDE_SITH)
        {
            color1 = 0xFF0000;
            color2 = 0xFFFF00;
        }
        
        for(var i = 0; i < 5; i++)
        {
            var graphics = new PIXI.Graphics();
            graphics.name = "Add" + i;
            graphics.lineStyle(1, color1, 1);
            graphics.beginFill(color1, 0.5);
            graphics.drawRect(525, 152 + (25 * i), 15, 15);
            graphics.endFill();
            graphics.lineStyle(1, color2, 1);
            graphics.moveTo(532.5, 153 + (25 * i));
            graphics.lineTo(532.5, 165 + (25 * i));
            graphics.moveTo(526, 159 + (25 * i));
            graphics.lineTo(538, 159 + (25 * i));
            graphics.interactive = true; 
            graphics.buttonMode = true; 
            graphics.tap = onCmdButtonPlusClick; 
            graphics.click = onCmdButtonPlusClick; 
            
            cmdDesktopStage.addChild(graphics);
        }
    }
}

function onCmdButtonPlusClick()
{
    switch (this.name)
    {
        case "Add0":
            userPersonages[cmdSelectPersonageID].hitDefense1 += 1;
            userExperiencePoints--;
            cmdExperiencePointsText.text = "КОМАНДА. Очки опыта: " + userExperiencePoints;
            if(side === SIDE_JEDI) cmdBluePersonageShow(cmdSelectPersonageID);
            if(side === SIDE_SITH) cmdRedPersonageShow(cmdSelectPersonageID);
            break;
        case "Add1":
            userPersonages[cmdSelectPersonageID].hitDefense2 += 1;
            userExperiencePoints--;
            cmdExperiencePointsText.text = "КОМАНДА. Очки опыта: " + userExperiencePoints;
            if(side === SIDE_JEDI) cmdBluePersonageShow(cmdSelectPersonageID);
            if(side === SIDE_SITH) cmdRedPersonageShow(cmdSelectPersonageID);
            break;
        case "Add2":
            userPersonages[cmdSelectPersonageID].hitDefense3 += 1;
            userExperiencePoints--;
            cmdExperiencePointsText.text = "КОМАНДА. Очки опыта: " + userExperiencePoints;
            if(side === SIDE_JEDI) cmdBluePersonageShow(cmdSelectPersonageID);
            if(side === SIDE_SITH) cmdRedPersonageShow(cmdSelectPersonageID);
            break;
        case "Add3":
            userPersonages[cmdSelectPersonageID].hitDefense4 += 1;
            userExperiencePoints--;
            cmdExperiencePointsText.text = "КОМАНДА. Очки опыта: " + userExperiencePoints;
            if(side === SIDE_JEDI) cmdBluePersonageShow(cmdSelectPersonageID);
            if(side === SIDE_SITH) cmdRedPersonageShow(cmdSelectPersonageID);
            break;
        case "Add4":
            userPersonages[cmdSelectPersonageID].hitDefense5 += 1;
            userExperiencePoints--;
            cmdExperiencePointsText.text = "КОМАНДА. Очки опыта: " + userExperiencePoints;
            if(side === SIDE_JEDI) cmdBluePersonageShow(cmdSelectPersonageID);
            if(side === SIDE_SITH) cmdRedPersonageShow(cmdSelectPersonageID);
            break;
        default:
            break;
    }
}

/* == КОНЕЦ ФАЙЛА ========================================================== */

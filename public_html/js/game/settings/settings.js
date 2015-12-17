var settingsStage;
var settingsLineAnimationGraphics;
var settingsStyleBlueText = { font : 'bold 14px Arial', fill : '#FFFFFF', stroke : '#0090F0', strokeThickness : 1, wordWrap : true, wordWrapWidth : 340 }; 
var settingsStyleRedText = { font : 'bold 14px Arial', fill : '#FFFFFF', stroke : '#880000', strokeThickness : 1, wordWrap : true, wordWrapWidth : 340 }; 

function settingsCreate()
{
    settingsStage = new PIXI.Container();
    stage.addChild(settingsStage);
    
    settingsBackground();
    settingsWindow();
    settingsTitle();
    settingsText();
    settingsButtons();
    settingsButtonClose();
}

function settingsRemove()
{
    stage.removeChild(settingsStage);
    settingsStage = null;
}

function settingsBackground()
{
    var graphics = new PIXI.Graphics(); 
    graphics.hitArea = new PIXI.Rectangle(0, 0, MAIN_WIDTH, MAIN_HEIGH);
    graphics.interactive = true;
    graphics.lineStyle(1, 0x000000, 0.25);
    graphics.beginFill(0x000000, 0.25);
    graphics.drawRect(0, 0, MAIN_WIDTH, MAIN_HEIGH);
    graphics.endFill();
    settingsStage.addChild(graphics);
}

function settingsWindow()
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
        graphics.endFill
        for(var i = 0; i < 55; i++)
        {
            if(i > 15 && i < 35)
            {
                
            }else{
                graphics.lineStyle(1, 0x0090F0, 0.5);
                graphics.moveTo(250,280+(3*i));
                graphics.lineTo(600, 280+(3*i));
            }
        }
        settingsStage.addChild(graphics);
        
        settingsLineAnimationGraphics = new PIXI.Graphics(); 
        settingsLineAnimationGraphics.lineStyle(10, 0x0090F0, 0.3);
        settingsLineAnimationGraphics.moveTo(250,255);
        settingsLineAnimationGraphics.lineTo(600, 255);
        settingsStage.addChild(settingsLineAnimationGraphics);
        settingsLineAnimationGraphicsTween();
        
        graphics = new PIXI.Graphics(); 
        graphics.lineStyle(1, 0x0080C0, 1);
        graphics.beginFill(0x0080C0, 1);
        graphics.moveTo(400,250);
        graphics.lineTo(425, 275);
        graphics.lineTo(600, 275);
        graphics.lineTo(600, 250);
        graphics.endFill
        settingsStage.addChild(graphics);
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
        graphics.endFill
        for(var i = 0; i < 55; i++)
        {
            if(i > 15 && i < 35)
            {
                
            }else{
                graphics.lineStyle(1, 0xA63A24, 0.5);
                graphics.moveTo(250,280+(3*i));
                graphics.lineTo(600, 280+(3*i));
            }
        }
        settingsStage.addChild(graphics);
        
        settingsLineAnimationGraphics = new PIXI.Graphics(); 
        settingsLineAnimationGraphics.lineStyle(10, 0xA63A24, 0.3);
        settingsLineAnimationGraphics.moveTo(250,255);
        settingsLineAnimationGraphics.lineTo(600, 255);
        settingsStage.addChild(settingsLineAnimationGraphics);
        settingsLineAnimationGraphicsTween();
        
        graphics = new PIXI.Graphics(); 
        graphics.lineStyle(1, 0xA63A24, 1);
        graphics.beginFill(0xA63A24, 1);
        graphics.moveTo(400,250);
        graphics.lineTo(425, 275);
        graphics.lineTo(600, 275);
        graphics.lineTo(600, 250);
        graphics.endFill
        settingsStage.addChild(graphics);
    }
    
}

function settingsLineAnimationGraphicsTween()
{
    createjs.Tween.get(settingsLineAnimationGraphics, {loop: true}) 
        .to({x: 0, y: 240}, 2500, createjs.Ease.getPowInOut(3));
    createjs.Ticker.setFPS(60);
}

function settingsTitle()
{
    var text;
    
    if(side === SIDE_NONE || side === SIDE_JEDI) text = new PIXI.Text("НАСТРОЙКИ", settingsStyleBlueText); 
    if(side === SIDE_SITH) text = new PIXI.Text("НАСТРОЙКИ", settingsStyleRedText); 
    text.x = 500;
    text.y = 255;
    settingsStage.addChild(text);
}

function settingsText()
{
    var text;
    if(side === SIDE_NONE || side === SIDE_JEDI) text = new PIXI.Text("Окно настроек позволяет включить или отключить в игре звуки и музыку.\n\n\n\n\nТакже вы можете посетить группу разработчика ВКонтакте, нажав на кнопку 'информация'.", settingsStyleBlueText); 
    if(side === SIDE_SITH) text = new PIXI.Text("Окно настроек позволяет включить или отключить в игре звуки и музыку.\n\n\n\n\nТакже вы можете посетить группу разработчика ВКонтакте, нажав на кнопку 'информация'.", settingsStyleRedText); 
    text.x = 255;
    text.y = 285;
    settingsStage.addChild(text);
}

function settingsButtonClose()
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
        button.onComplete = onSettingsButtonCloseUpdate;
        button.tap = onSettingsButtonCloseClick; 
        button.click = onSettingsButtonCloseClick; 
        button.on('mouseover', onSettingsButtonCloseOver);
        button.on('mouseout', onSettingsButtonCloseOut);
        var text = new PIXI.Text("Закрыть", settingsStyleBlueText); 
        text.x = button.width / 3;
        text.y = button.height / 3;
        button.addChild(text); 
        settingsStage.addChild(button);
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
        button.onComplete = onSettingsButtonCloseUpdate;
        button.tap = onSettingsButtonCloseClick; 
        button.click = onSettingsButtonCloseClick; 
        button.on('mouseover', onSettingsButtonCloseOver);
        button.on('mouseout', onSettingsButtonCloseOut);
        var text = new PIXI.Text("Закрыть", settingsStyleRedText); 
        text.x = button.width / 3;
        text.y = button.height / 3;
        button.addChild(text); 
        settingsStage.addChild(button);
    }
}

function onSettingsButtonCloseOver()
{
    this.isOver = true;
    this.gotoAndPlay(1);
}

function onSettingsButtonCloseOut()
{
    this.isOver = false;
    this.gotoAndStop(0);
}

function onSettingsButtonCloseUpdate()
{
    if(this.isOver)
    {
        this.gotoAndPlay(1);
    }else{
        this.gotoAndStop(0);
    }
}

function onSettingsButtonCloseClick() 
{
    settingsRemove();
}

function settingsButtons()
{   
    var soundButton;
    if(sound === true) soundButton = new PIXI.Sprite(soundOnButtonTexture);
    else soundButton = new PIXI.Sprite(soundOffButtonTexture);
    soundButton.name = "sound";
    soundButton.position.x = 300;
    soundButton.position.y = 345;
    soundButton.interactive = true;
    soundButton.buttonMode = true;
    soundButton.tap = onSettingsButtonsClick;
    soundButton.click = onSettingsButtonsClick;
    soundButton.on('mousedown', onSettingsButtonsDown);
    soundButton.on('touchstart', onSettingsButtonsDown);
    soundButton.on('mouseup', onSettingsButtonsUp);
    soundButton.on('touchend', onSettingsButtonsUp);
    soundButton.on('mouseupoutside', onSettingsButtonsUp);
    soundButton.on('touchendoutside', onSettingsButtonsUp);
    settingsStage.addChild(soundButton);
    
    var musicButton;
    if(music === true) musicButton = new PIXI.Sprite(musicOnButtonTexture);
    else musicButton = new PIXI.Sprite(musicOffButtonTexture);
    musicButton.name = "music";
    musicButton.position.x = 405;
    musicButton.position.y = 345;
    musicButton.interactive = true;
    musicButton.buttonMode = true;
    musicButton.tap = onSettingsButtonsClick;
    musicButton.click = onSettingsButtonsClick;
    musicButton.on('mousedown', onSettingsButtonsDown);
    musicButton.on('touchstart', onSettingsButtonsDown);
    musicButton.on('mouseup', onSettingsButtonsUp);
    musicButton.on('touchend', onSettingsButtonsUp);
    musicButton.on('mouseupoutside', onSettingsButtonsUp);
    musicButton.on('touchendoutside', onSettingsButtonsUp);
    settingsStage.addChild(musicButton);
    
    var infoButton = new PIXI.Sprite(infoButtonTexture);
    infoButton.name = "info";
    infoButton.position.x = 510;
    infoButton.position.y = 345;
    infoButton.interactive = true;
    infoButton.buttonMode = true;
    infoButton.tap = onSettingsButtonsClick;
    infoButton.click = onSettingsButtonsClick;
    infoButton.on('mousedown', onSettingsButtonsDown);
    infoButton.on('touchstart', onSettingsButtonsDown);
    infoButton.on('mouseup', onSettingsButtonsUp);
    infoButton.on('touchend', onSettingsButtonsUp);
    infoButton.on('mouseupoutside', onSettingsButtonsUp);
    infoButton.on('touchendoutside', onSettingsButtonsUp);
    settingsStage.addChild(infoButton);
}

function onSettingsButtonsDown()
{
	this.isdown = true;
	this.scale.set(0.95);
	this.position.x += 5; 
}

function onSettingsButtonsUp()
{
	if(this.isdown)
	{
		this.isdown = false;
		this.scale.set(1.0);
		this.position.x -= 5;
	}
}

function onSettingsButtonsClick() 
{
    if(this.name === "sound")
    {
        if(sound === true)
        {
            sound = false;
            this.texture = soundOffButtonTexture;
            
        }else{
            sound = true;
            this.texture = soundOnButtonTexture;
            
        }
    }
    if(this.name === "music")
    {
        if(music === true)
        {
            music = false;
            this.texture = musicOffButtonTexture;
            soundStopStarWarsThemeSong();
        }else{
            music = true;
            this.texture = musicOnButtonTexture;
            soundPlayStarWarsThemeSong();
        }
    }
    if(this.name === "info")
    {
        window.open("https://vk.com/club62618339","_target");
    }
}

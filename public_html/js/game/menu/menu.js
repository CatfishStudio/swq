var menuStage;
var menuStarsSprite;
var menuDeathStarSprite;
var menuShip1Sprite;
var menuShip2Sprite;
var menuShip3Sprite;
var menuLineMessageGraphics;

var menuStyleDroidText = { font : 'bold 14px Arial', fill : '#FFFFFF', stroke : '#0090F0', strokeThickness : 1, wordWrap : true, wordWrapWidth : 175 }; 
var menuStyleButtonText = { font : 'bold 14px Arial', fill : '#FFFFFF', stroke : '#0090F0', strokeThickness : 1, wordWrap : true, wordWrapWidth : 200 }; 

function menuCreate()
{
    menuStage = new PIXI.Container(); 
    stage.addChild(menuStage); 
    
    soundPlayStarWarsThemeSong();
    
    menuStars();
    menuDeathStar();
    menuShip2();
    menuShip3();
    menuShip1();

    menuButtonPanel();
    menuBorder();
    menuLogo();
    menuDroid();

    menuBackgroundParallaxTween();
} 

function menuRemove() 
{ 
    stage.removeChild(menuStage); 
    menuStage = null; 
}

function menuStars()
{
    menuStarsSprite = new PIXI.Sprite(stars1Texture); 
    menuStarsSprite.position.x = 0; 
    menuStarsSprite.position.y = 0; 
    menuStarsSprite.scale.set(1.0); 
    menuStage.addChild(menuStarsSprite);
}

function menuBorder()
{
    var graphics = new PIXI.Graphics(); 

    graphics.lineStyle(2, 0x0000FF, 1);
    graphics.beginFill(0x000000, 0);
    graphics.drawRect(10, 10, 840, 710);

    graphics.lineStyle(0);
    graphics.beginFill(0xFFFFFF, 1);
    graphics.drawCircle(5, 600,4);
    graphics.endFill();

    graphics.lineStyle(2, 0xFFFFFF, 1);
    graphics.moveTo(5,600);
    graphics.lineTo(5, 725);
    graphics.moveTo(5,725);
    graphics.lineTo(650, 725);
    graphics.moveTo(650,725);
    graphics.lineTo(670, 710);
    graphics.moveTo(670,710);
    graphics.lineTo(840, 710);

    graphics.lineStyle(0);
    graphics.beginFill(0xFFFFFF, 1);
    graphics.drawCircle(840, 710,4);
    graphics.endFill();

    graphics.lineStyle(0);
    graphics.beginFill(0xFFFFFF, 1);
    graphics.drawCircle(20, 20,4);
    graphics.endFill();

    graphics.lineStyle(2, 0xFFFFFF, 1);
    graphics.moveTo(20,20);
    graphics.lineTo(370, 20);
    graphics.moveTo(370,20);
    graphics.lineTo(390, 5);
    graphics.moveTo(390,5);
    graphics.lineTo(855, 5);
    graphics.moveTo(855,5);
    graphics.lineTo(855, 150);

    graphics.lineStyle(0);
    graphics.beginFill(0xFFFFFF, 1);
    graphics.drawCircle(855, 150,4);
    graphics.endFill();

    menuStage.addChild(graphics);
}

function menuButtonPanel()
{
    var graphics = new PIXI.Graphics(); 
    graphics.lineStyle(2, 0x0000FF, 0);
    graphics.beginFill(0x0000FF, 0.4);
    graphics.drawRect(23, 20, 347, 700);
    menuStage.addChild(graphics);
    
    var textArr = ["НАЧАТЬ ИГРУ", "НАСТРОЙКИ", "ПРИГЛАСИТЬ"];
    
    for(var i = 0; i < textArr.length; i++)
    {
        var button = new PIXI.extras.MovieClip(animTexButtonBlue); 
        button.name = "button_" + i;
        button.position.x = 85; 
        button.position.y = 350 + (75 * i); 
        button.interactive = true; 
        button.buttonMode = true; 
        button.loop = false; 
        button.animationSpeed = 0.2;
        button.onComplete = onMenuButtonUpdate;
	
    
        button.tap = onMenuButtonClick; 
        button.click = onMenuButtonClick; 
        button.on('mouseover', onMenuButtonOver);
        button.on('mouseout', onMenuButtonOut);

        var text = new PIXI.Text(textArr[i], menuStyleButtonText); 
        text.x = button.width / 3.8;
        text.y = button.height / 3;

        button.addChild(text); 
        menuStage.addChild(button);
    }
    
}

function onMenuButtonOver()
{
    this.isOver = true;
    this.gotoAndPlay(1);
}

function onMenuButtonOut()
{
    this.isOver = false;
    this.gotoAndStop(0);
}

function onMenuButtonUpdate()
{
    if(this.isOver)
    {
        this.gotoAndPlay(1);
    }else{
        this.gotoAndStop(0);
    }
}

function onMenuButtonClick() 
{
    switch (this.name)
    {
        case "button_0":        // Начать игру
            sideCreate();
            menuRemove();
            break;
        case "button_1":        // Настройки игры
            settingsCreate();
            break;
        case "button_2":        // Позвать друзей ВК
            //VK.callMethod("showInviteBox");
            testCreate();
            menuRemove();
            break;
        
        default:
            break;
    }
    
}

function menuLogo()
{
    var textureSprite = new PIXI.Sprite(starwarsTexture); 
    textureSprite.position.x = 25; 
    textureSprite.position.y = 15; 
    menuStage.addChild(textureSprite);
}

function menuDeathStar()
{
    menuDeathStarSprite = new PIXI.Sprite(deathstarTexture); 
    menuDeathStarSprite.position.x = 300; 
    menuDeathStarSprite.position.y = 100; 
    menuStage.addChild(menuDeathStarSprite);
}

function menuDroid()
{
    var textureSprite = new PIXI.Sprite(r2d2DroidBlueRightTexture); 
    textureSprite.position.x = 700; 
    textureSprite.position.y = 550; 
    textureSprite.scale.set(0.4);
    menuStage.addChild(textureSprite);

    var graphics = new PIXI.Graphics(); 
    graphics.lineStyle(2, 0x0080C0, 1);
    graphics.beginFill(0x0080C0, 0.2);
    graphics.moveTo(735,575);
    graphics.lineTo(550, 575);
    graphics.lineTo(550, 300);
    graphics.lineTo(735, 300);
    graphics.endFill;
    for(var i = 0; i < 92; i++)
    {
        graphics.lineStyle(1, 0x0090F0, 0.5);
        graphics.moveTo(735,300+(3*i));
        graphics.lineTo(550, 300+(3*i));
    }
    menuStage.addChild(graphics);

    menuDroidMessage();

    menuLineMessageGraphics = new PIXI.Graphics(); 
    menuLineMessageGraphics.lineStyle(10, 0x0090F0, 0.3);
    menuLineMessageGraphics.moveTo(735,305);
    menuLineMessageGraphics.lineTo(550, 305);
    menuStage.addChild(menuLineMessageGraphics);
    menuLineMessageGraphicsTween();
}

function menuLineMessageGraphicsTween()
{
    createjs.Tween.get(menuLineMessageGraphics, {loop: true}) 
            .to({x: 0, y: 265}, 2500, createjs.Ease.getPowInOut(3));
    createjs.Ticker.setFPS(60); 
}

function menuDroidMessage()
{
    menuText = new PIXI.Text("\nДобро пожаловать на путь силы. \nВаши способности превышают способности обычных людей. \nВы тут потому что вы были избраны. \n\nНажмите кнопку \n''Начать игру'' \n\nИ да пребудет с Вами Сила!", menuStyleDroidText); 
    menuText.x = 555; 
    menuText.y = 300; 
    menuStage.addChild(menuText);
}

function menuShip1()
{
    menuShip1Sprite = new PIXI.Sprite(ship1Texture); 
    menuShip1Sprite.position.x = -375; 
    menuShip1Sprite.position.y = 250; 
    menuStage.addChild(menuShip1Sprite);
}

function menuShip2()
{
    menuShip2Sprite = new PIXI.Sprite(ship2Texture); 
    menuShip2Sprite.position.x = 900; 
    menuShip2Sprite.position.y = 150; 
    menuStage.addChild(menuShip2Sprite);
}

function menuShip3()
{
    menuShip3Sprite = new PIXI.Sprite(ship3Texture); 
    menuShip3Sprite.position.x = 50; 
    menuShip3Sprite.position.y = 150; 
    menuStage.addChild(menuShip3Sprite);
}

function menuBackgroundParallaxTween()
{
    createjs.Tween.get(menuStarsSprite, {loop: true}) 
            .to({x: -50, y: 0}, 25000, createjs.Ease.getPowInOut(3))
            .to({x: -50, y: -50}, 25000, createjs.Ease.getPowInOut(3))
            .to({x: 0, y: -50}, 25000, createjs.Ease.getPowInOut(3))
            .to({x: 0, y: 0}, 25000, createjs.Ease.getPowInOut(3));

    createjs.Tween.get(menuDeathStarSprite, {loop: true}) 
            .to({x: 200, y: 100}, 25000, createjs.Ease.getPowInOut(3))
            .to({x: 200, y: 0}, 25000, createjs.Ease.getPowInOut(3))
            .to({x: 300, y: 0}, 25000, createjs.Ease.getPowInOut(3))
            .to({x: 300, y: 100}, 25000, createjs.Ease.getPowInOut(3));

    createjs.Tween.get(menuShip3Sprite, {loop: true}) 
            .to({x: -150, y: 150}, 25000, createjs.Ease.getPowInOut(3))
            .to({x: -150, y: 0}, 25000, createjs.Ease.getPowInOut(3))
            .to({x: 50, y: 0}, 25000, createjs.Ease.getPowInOut(3))
            .to({x: 50, y: 150}, 25000, createjs.Ease.getPowInOut(3));

    createjs.Tween.get(menuShip1Sprite, {loop: true}) 
            .to({x: 1000, y: 1000}, 5000, createjs.Ease.getPowInOut(3));

    createjs.Tween.get(menuShip2Sprite, {loop: true}) 
            .to({x: -250, y: 350}, 5000, createjs.Ease.getPowInOut(3));


    createjs.Ticker.setFPS(60); 
}

/* == НАЧАЛО ФАЙЛА ========================================================= */

var levelStage;
var levelPlanetID;
var levelStarsSprite;
var levelPlanetSprite;
var levelLandscapeSprite;

function levelCreate(planetID)
{
    levelStage = new PIXI.Container();
    stage.addChild(levelStage);
    
    levelPlanetID = planetID;
    
    levelBackground();
    levelBackgroundParallaxTween();
    if(side === SIDE_JEDI)
    {
        levelBorderBlue();
    }
}

function levelRemove()
{
    stage.removeChild(levelStage);
    levelStage = null;
}

function levelBackground(planetID)
{
    levelStarsSprite = new PIXI.Sprite(stars1Texture); 
    levelStarsSprite.position.x = 0; 
    levelStarsSprite.position.y = 0; 
    levelStage.addChild(levelStarsSprite);
      
    levelPlanetSprite = new PIXI.Sprite(planetTextures[levelPlanetID][1]); 
    levelPlanetSprite.position.x = 300; 
    levelPlanetSprite.position.y = 100;
    levelStage.addChild(levelPlanetSprite);
    
    levelLandscapeSprite = new PIXI.Sprite(planetTextures[levelPlanetID][2]);
    levelLandscapeSprite.position.x = 0; 
    levelLandscapeSprite.position.y = 0; 
    levelLandscapeSprite.alpha = 0.0;
    levelStage.addChild(levelLandscapeSprite);
}

function levelBackgroundParallaxTween()
{
    createjs.Tween.get(levelStarsSprite, {loop: true}) 
            .to({x: -50, y: 0}, 10000, createjs.Ease.getPowInOut(3))
            .to({x: -50, y: -50}, 10000, createjs.Ease.getPowInOut(3))
            .to({x: 0, y: -50}, 10000, createjs.Ease.getPowInOut(3))
            .to({x: 0, y: 0}, 10000, createjs.Ease.getPowInOut(3));

    createjs.Tween.get(levelPlanetSprite, {loop: true}) 
            .to({x: 200, y: 100}, 10000, createjs.Ease.getPowInOut(3))
            .to({x: 200, y: 0}, 10000, createjs.Ease.getPowInOut(3))
            .to({x: 300, y: 0}, 10000, createjs.Ease.getPowInOut(3))
            .to({x: 300, y: 100}, 10000, createjs.Ease.getPowInOut(3));
            
    createjs.Tween.get(levelLandscapeSprite, {loop: true}) 
            .to({x: -50, y: 0}, 10000, createjs.Ease.getPowInOut(3))
            .to({x: -50, y: -50}, 10000, createjs.Ease.getPowInOut(3))
            .to({x: 0, y: -50}, 10000, createjs.Ease.getPowInOut(3))
            .to({x: 0, y: 0}, 10000, createjs.Ease.getPowInOut(3))
            .to({alpha: 1.0}, 10000, createjs.Ease.getPowInOut(3))
            .to({x: -50, y: 0}, 10000, createjs.Ease.getPowInOut(3))
            .to({x: -50, y: -50}, 10000, createjs.Ease.getPowInOut(3))
            .to({x: 0, y: -50}, 10000, createjs.Ease.getPowInOut(3))
            .to({x: 0, y: 0}, 10000, createjs.Ease.getPowInOut(3))
            .to({alpha: 0.0}, 10000, createjs.Ease.getPowInOut(3));
}

function levelBorderBlue()
{
    var graphics = new PIXI.Graphics(); 

    graphics.lineStyle(2, 0x0000FF, 1);
    graphics.beginFill(0x000000, 0);
    graphics.drawRect(10, 10, 840, 710);
    graphics.endFill();
    
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

    graphics.lineStyle(2, 0xFFFFFF, 1);
    graphics.beginFill(0x0000FF, 0.2);
    graphics.drawRoundedRect(((MAIN_WIDTH / 2) - (500 / 2)), ((MAIN_HEIGH / 2) - (500 / 2)), 500, 500, 25);
    graphics.endFill();
    
    levelStage.addChild(graphics);
    
    
    
}



/* == КОНЕЦ ФАЙЛА ========================================================== */

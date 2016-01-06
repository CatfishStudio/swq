
/* == НАЧАЛО ФАЙЛА ========================================================= */

var levelStage;
var levelPlanetID;
var levelStarsSprite;
var levelPlanetSprite;

function levelCreate(planetID)
{
    levelStage = new PIXI.Container();
    stage.addChild(levelStage);
    
    levelPlanetID = planetID;
    
    levelBackground();
    levelBackgroundParallaxTween();
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
    levelStarsSprite.scale.set(1.0); 
    levelStage.addChild(levelStarsSprite);
    /*
    levelPlanetSprite = new PIXI.Sprite(planetTextures[levelPlanetID][3]); 
    levelPlanetSprite.position.x = 300; 
    levelPlanetSprite.position.y = 100; 
    var planet = new PIXI.Sprite(planetTextures[levelPlanetID][1]); 
    planet.position.x = 15; 
    planet.position.y = 22;
    levelPlanetSprite.addChild(planet);
    */
  
    levelPlanetSprite = new PIXI.Sprite(planetTextures[levelPlanetID][1]); 
    levelPlanetSprite.position.x = 300; 
    levelPlanetSprite.position.y = 100; 
    
    levelStage.addChild(levelPlanetSprite);
}

function levelBackgroundParallaxTween()
{
    
}

/* == КОНЕЦ ФАЙЛА ========================================================== */

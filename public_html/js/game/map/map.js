var mapStage;
var mapSprite;
var mapStartPosX;
var mapStartPosY;

function mapCreate() 
{ 
    mapStage = new PIXI.Container();
    stage.addChild(mapStage);
    
    mapSpace();
    mapCreatePlanets();
} 

function mapRemove() 
{ 
    stage.removeChild(mapStage); 
    mapStage = null; 
} 

function mapSpace()
{
    if(side === SIDE_JEDI) mapSprite = new PIXI.Sprite(mapSpaceBlueTexture); 
    if(side === SIDE_SITH) mapSprite = new PIXI.Sprite(mapSpaceRedTexture); 
    mapSprite.position.x = -82; 
    mapSprite.position.y = -19; 
    mapSprite.interactive = true;
    mapSprite.on('mousedown', onMapSpaceDown);
    mapSprite.on('touchstart', onMapSpaceDown);
    mapSprite.on('mouseup', onMapSpaceUp);
    mapSprite.on('touchend', onMapSpaceUp);
    mapSprite.on('mouseupoutside', onMapSpaceUp);
    mapSprite.on('touchendoutside', onMapSpaceUp);
    mapSprite.on('mousemove', onMapSpaceMove);
    mapSprite.on('touchmove', onMapSpaceMove);

    mapStage.addChild(mapSprite);
}

function onMapSpaceDown(event)
{
    var cursorPosition = event.data.getLocalPosition(this.parent);
    mapStartPosX = cursorPosition.x;
    mapStartPosY = cursorPosition.y;
    this.data = event.data;
    this.move = true;
}

function onMapSpaceUp()
{
    mapStartPosX = 0;
    mapStartPosY = 0;
    this.move = false;
    this.data = null;
}

function onMapSpaceMove()
{
    if (this.move)
    {
        var newPosition = this.data.getLocalPosition(this.parent);
        if(mapStartPosX < newPosition.x)
        {
            if(this.position.x < - 5) this.position.x += 5;
            mapStartPosX = newPosition.x;
        }
        if(mapStartPosX > newPosition.x)
        {
            if(this.position.x  > -160)this.position.x -= 5;
            mapStartPosX = newPosition.x;
        }
        
         if(mapStartPosY < newPosition.y)
        {
            if(this.position.y < -10) this.position.y += 5;
            mapStartPosY = newPosition.y;
        }
        if(mapStartPosY > newPosition.y)
        {
            if(this.position.y > -10)this.position.y -= 5;
            mapStartPosY = newPosition.y;
        }
    }
}

function mapCreatePlanets()
{
    userMapPlanets["Coruscant"][1].scale.set(0.2);
    mapSprite.addChild(userMapPlanets["Coruscant"][1]);
    mapSprite.addChild(userMapPlanets["Coruscant"][5]);
    if(side === SIDE_JEDI) mapSprite.addChild(userMapPlanets["Coruscant"][3]);
    if(side === SIDE_SITH) mapSprite.addChild(userMapPlanets["Coruscant"][4]);
        
    userMapPlanets["Totooine"][1].scale.set(0.2);
    mapSprite.addChild(userMapPlanets["Totooine"][1]);
    mapSprite.addChild(userMapPlanets["Totooine"][5]);
    if(side === SIDE_JEDI) mapSprite.addChild(userMapPlanets["Totooine"][3]);
    if(side === SIDE_SITH) mapSprite.addChild(userMapPlanets["Totooine"][4]);
        
    userMapPlanets["Naboo"][1].scale.set(0.2);
    mapSprite.addChild(userMapPlanets["Naboo"][1]);
    mapSprite.addChild(userMapPlanets["Naboo"][5]);
    if(side === SIDE_JEDI) mapSprite.addChild(userMapPlanets["Naboo"][3]);
    if(side === SIDE_SITH) mapSprite.addChild(userMapPlanets["Naboo"][4]);
        
    userMapPlanets["Endor"][1].scale.set(0.2);
    mapSprite.addChild(userMapPlanets["Endor"][1]);
    mapSprite.addChild(userMapPlanets["Endor"][5]);
    if(side === SIDE_JEDI) mapSprite.addChild(userMapPlanets["Endor"][3]);
    if(side === SIDE_SITH) mapSprite.addChild(userMapPlanets["Endor"][4]);
        
    userMapPlanets["Hoth"][1].scale.set(0.2);
    mapSprite.addChild(userMapPlanets["Hoth"][1]);
    mapSprite.addChild(userMapPlanets["Hoth"][5]);
    if(side === SIDE_JEDI) mapSprite.addChild(userMapPlanets["Hoth"][3]);
    if(side === SIDE_SITH) mapSprite.addChild(userMapPlanets["Hoth"][4]);
        
    userMapPlanets["Mustafar"][1].scale.set(0.2);
    mapSprite.addChild(userMapPlanets["Mustafar"][1]);
    mapSprite.addChild(userMapPlanets["Mustafar"][5]);
    if(side === SIDE_JEDI) mapSprite.addChild(userMapPlanets["Mustafar"][3]);
    if(side === SIDE_SITH) mapSprite.addChild(userMapPlanets["Mustafar"][4]);
        
    userMapPlanets["Dagobah"][1].scale.set(0.2);
    mapSprite.addChild(userMapPlanets["Dagobah"][1]);
    mapSprite.addChild(userMapPlanets["Dagobah"][5]);
    if(side === SIDE_JEDI) mapSprite.addChild(userMapPlanets["Dagobah"][3]);
    if(side === SIDE_SITH) mapSprite.addChild(userMapPlanets["Dagobah"][4]);
        
    userMapPlanets["Bespin"][1].scale.set(0.2);
    mapSprite.addChild(userMapPlanets["Bespin"][1]);
    mapSprite.addChild(userMapPlanets["Bespin"][5]);
    if(side === SIDE_JEDI) mapSprite.addChild(userMapPlanets["Bespin"][3]);
    if(side === SIDE_SITH) mapSprite.addChild(userMapPlanets["Bespin"][4]);
        
    userMapPlanets["Geonosis"][1].scale.set(0.2);
    mapSprite.addChild(userMapPlanets["Geonosis"][1]);
    mapSprite.addChild(userMapPlanets["Geonosis"][5]);
    if(side === SIDE_JEDI) mapSprite.addChild(userMapPlanets["Geonosis"][3]);
    if(side === SIDE_SITH) mapSprite.addChild(userMapPlanets["Geonosis"][4]);
        
    userMapPlanets["Alderaan"][1].scale.set(0.2);
    mapSprite.addChild(userMapPlanets["Alderaan"][1]);
    mapSprite.addChild(userMapPlanets["Alderaan"][5]);
    if(side === SIDE_JEDI) mapSprite.addChild(userMapPlanets["Alderaan"][3]);
    if(side === SIDE_SITH) mapSprite.addChild(userMapPlanets["Alderaan"][4]);
        
    userMapPlanets["Kamino"][1].scale.set(0.2);
    mapSprite.addChild(userMapPlanets["Kamino"][1]);
    mapSprite.addChild(userMapPlanets["Kamino"][5]);
    if(side === SIDE_JEDI) mapSprite.addChild(userMapPlanets["Kamino"][3]);
    if(side === SIDE_SITH) mapSprite.addChild(userMapPlanets["Kamino"][4]);
    
    userMapPlanets["DeathStar"][1].scale.set(0.2);
    mapSprite.addChild(userMapPlanets["DeathStar"][1]);
    mapSprite.addChild(userMapPlanets["DeathStar"][5]);
    if(side === SIDE_JEDI) mapSprite.addChild(userMapPlanets["DeathStar"][3]);
    if(side === SIDE_SITH) mapSprite.addChild(userMapPlanets["DeathStar"][4]);
        
    userMapPlanets["Utapau"][1].scale.set(0.2);
    mapSprite.addChild(userMapPlanets["Utapau"][1]);
    mapSprite.addChild(userMapPlanets["Utapau"][5]);
    if(side === SIDE_JEDI) mapSprite.addChild(userMapPlanets["Utapau"][3]);
    if(side === SIDE_SITH) mapSprite.addChild(userMapPlanets["Utapau"][4]);
        
    userMapPlanets["Saleucami"][1].scale.set(0.2);
    mapSprite.addChild(userMapPlanets["Saleucami"][1]);
    mapSprite.addChild(userMapPlanets["Saleucami"][5]);
    if(side === SIDE_JEDI) mapSprite.addChild(userMapPlanets["Saleucami"][3]);
    if(side === SIDE_SITH) mapSprite.addChild(userMapPlanets["Saleucami"][4]);
    
    userMapPlanets["Jakku"][1].scale.set(0.2);
    mapSprite.addChild(userMapPlanets["Jakku"][1]);
    mapSprite.addChild(userMapPlanets["Jakku"][5]);
    if(side === SIDE_JEDI) mapSprite.addChild(userMapPlanets["Jakku"][3]);
    if(side === SIDE_SITH) mapSprite.addChild(userMapPlanets["Jakku"][4]);
    
}
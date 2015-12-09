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
    userMapPlanets["Totooine"][1].scale.set(0.2);
    mapSprite.addChild(userMapPlanets["Totooine"][1]);
    userMapPlanets["Naboo"][1].scale.set(0.2);
    mapSprite.addChild(userMapPlanets["Naboo"][1]);
    userMapPlanets["Endor"][1].scale.set(0.2);
    mapSprite.addChild(userMapPlanets["Endor"][1]);
    userMapPlanets["Hoth"][1].scale.set(0.2);
    mapSprite.addChild(userMapPlanets["Hoth"][1]);
    userMapPlanets["Mustafar"][1].scale.set(0.2);
    mapSprite.addChild(userMapPlanets["Mustafar"][1]);
    userMapPlanets["Dagobah"][1].scale.set(0.2);
    mapSprite.addChild(userMapPlanets["Dagobah"][1]);
    userMapPlanets["Bespin"][1].scale.set(0.2);
    mapSprite.addChild(userMapPlanets["Bespin"][1]);
    userMapPlanets["Geonosis"][1].scale.set(0.2);
    mapSprite.addChild(userMapPlanets["Geonosis"][1]);
    userMapPlanets["Alderaan"][1].scale.set(0.2);
    mapSprite.addChild(userMapPlanets["Alderaan"][1]);
    userMapPlanets["Kamino"][1].scale.set(0.2);
    mapSprite.addChild(userMapPlanets["Kamino"][1]);
    userMapPlanets["DeathStar"][1].scale.set(0.2);
    mapSprite.addChild(userMapPlanets["DeathStar"][1]);
    userMapPlanets["Utapau"][1].scale.set(0.2);
    mapSprite.addChild(userMapPlanets["Utapau"][1]);
    userMapPlanets["Saleucami"][1].scale.set(0.2);
    mapSprite.addChild(userMapPlanets["Saleucami"][1]);
    
}
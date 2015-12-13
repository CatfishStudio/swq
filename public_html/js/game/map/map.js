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
    mapSprite.addChild(userMapPlanets["Coruscant"][4]);
    if(side === SIDE_JEDI)
    {
        mapSprite.addChild(userMapPlanets["Coruscant"][2]);
        //mapSprite.addChild(userMapPlanets["Coruscant"][5]);
        //mapSprite.addChild(userMapPlanets["Coruscant"][6]);
        //mapSprite.addChild(userMapPlanets["Coruscant"][7]);
    }
    if(side === SIDE_SITH) 
    {
        mapSprite.addChild(userMapPlanets["Coruscant"][3]);
        mapSprite.addChild(userMapPlanets["Coruscant"][8]);
        mapSprite.addChild(userMapPlanets["Coruscant"][9]);
        mapSprite.addChild(userMapPlanets["Coruscant"][10]);
    }
        
    userMapPlanets["Totooine"][1].scale.set(0.2);
    mapSprite.addChild(userMapPlanets["Totooine"][1]);
    mapSprite.addChild(userMapPlanets["Totooine"][4]);
    if(side === SIDE_JEDI) 
    {
        mapSprite.addChild(userMapPlanets["Totooine"][2]);
        mapSprite.addChild(userMapPlanets["Totooine"][5]);
        mapSprite.addChild(userMapPlanets["Totooine"][6]);
        mapSprite.addChild(userMapPlanets["Totooine"][7]);
    }
    if(side === SIDE_SITH) 
    {
        mapSprite.addChild(userMapPlanets["Totooine"][3]);
        mapSprite.addChild(userMapPlanets["Totooine"][8]);
        mapSprite.addChild(userMapPlanets["Totooine"][9]);
        mapSprite.addChild(userMapPlanets["Totooine"][10]);
    }
        
    userMapPlanets["Naboo"][1].scale.set(0.2);
    mapSprite.addChild(userMapPlanets["Naboo"][1]);
    mapSprite.addChild(userMapPlanets["Naboo"][4]);
    if(side === SIDE_JEDI)
    {
        mapSprite.addChild(userMapPlanets["Naboo"][2]);
        mapSprite.addChild(userMapPlanets["Naboo"][5]);
        mapSprite.addChild(userMapPlanets["Naboo"][6]);
        mapSprite.addChild(userMapPlanets["Naboo"][7]);
    }
    if(side === SIDE_SITH)
    {
        mapSprite.addChild(userMapPlanets["Naboo"][3]);
        mapSprite.addChild(userMapPlanets["Naboo"][8]);
        mapSprite.addChild(userMapPlanets["Naboo"][9]);
        mapSprite.addChild(userMapPlanets["Naboo"][10]);
    }
        
    userMapPlanets["Endor"][1].scale.set(0.2);
    mapSprite.addChild(userMapPlanets["Endor"][1]);
    mapSprite.addChild(userMapPlanets["Endor"][4]);
    if(side === SIDE_JEDI) 
    {
        mapSprite.addChild(userMapPlanets["Endor"][2]);
        mapSprite.addChild(userMapPlanets["Endor"][5]);
        mapSprite.addChild(userMapPlanets["Endor"][6]);
        mapSprite.addChild(userMapPlanets["Endor"][7]);
    }
    if(side === SIDE_SITH) 
    {
        mapSprite.addChild(userMapPlanets["Endor"][3]);
        mapSprite.addChild(userMapPlanets["Endor"][8]);
        mapSprite.addChild(userMapPlanets["Endor"][9]);
        mapSprite.addChild(userMapPlanets["Endor"][10]);
    }
        
    userMapPlanets["Hoth"][1].scale.set(0.2);
    mapSprite.addChild(userMapPlanets["Hoth"][1]);
    mapSprite.addChild(userMapPlanets["Hoth"][4]);
    if(side === SIDE_JEDI) mapSprite.addChild(userMapPlanets["Hoth"][2]);
    if(side === SIDE_SITH) mapSprite.addChild(userMapPlanets["Hoth"][3]);
        
    userMapPlanets["Mustafar"][1].scale.set(0.2);
    mapSprite.addChild(userMapPlanets["Mustafar"][1]);
    mapSprite.addChild(userMapPlanets["Mustafar"][4]);
    if(side === SIDE_JEDI) mapSprite.addChild(userMapPlanets["Mustafar"][2]);
    if(side === SIDE_SITH) mapSprite.addChild(userMapPlanets["Mustafar"][3]);
        
    userMapPlanets["Dagobah"][1].scale.set(0.2);
    mapSprite.addChild(userMapPlanets["Dagobah"][1]);
    mapSprite.addChild(userMapPlanets["Dagobah"][4]);
    if(side === SIDE_JEDI) mapSprite.addChild(userMapPlanets["Dagobah"][2]);
    if(side === SIDE_SITH) mapSprite.addChild(userMapPlanets["Dagobah"][3]);
        
    userMapPlanets["Bespin"][1].scale.set(0.2);
    mapSprite.addChild(userMapPlanets["Bespin"][1]);
    mapSprite.addChild(userMapPlanets["Bespin"][4]);
    if(side === SIDE_JEDI) mapSprite.addChild(userMapPlanets["Bespin"][2]);
    if(side === SIDE_SITH) mapSprite.addChild(userMapPlanets["Bespin"][3]);
        
    userMapPlanets["Geonosis"][1].scale.set(0.2);
    mapSprite.addChild(userMapPlanets["Geonosis"][1]);
    mapSprite.addChild(userMapPlanets["Geonosis"][4]);
    if(side === SIDE_JEDI) mapSprite.addChild(userMapPlanets["Geonosis"][2]);
    if(side === SIDE_SITH) mapSprite.addChild(userMapPlanets["Geonosis"][3]);
        
    userMapPlanets["Alderaan"][1].scale.set(0.2);
    mapSprite.addChild(userMapPlanets["Alderaan"][1]);
    mapSprite.addChild(userMapPlanets["Alderaan"][4]);
    if(side === SIDE_JEDI) mapSprite.addChild(userMapPlanets["Alderaan"][2]);
    if(side === SIDE_SITH) mapSprite.addChild(userMapPlanets["Alderaan"][3]);
        
    userMapPlanets["Kamino"][1].scale.set(0.2);
    mapSprite.addChild(userMapPlanets["Kamino"][1]);
    mapSprite.addChild(userMapPlanets["Kamino"][4]);
    if(side === SIDE_JEDI) mapSprite.addChild(userMapPlanets["Kamino"][2]);
    if(side === SIDE_SITH) mapSprite.addChild(userMapPlanets["Kamino"][3]);
    
    userMapPlanets["DeathStar"][1].scale.set(0.2);
    mapSprite.addChild(userMapPlanets["DeathStar"][1]);
    mapSprite.addChild(userMapPlanets["DeathStar"][4]);
    if(side === SIDE_JEDI) mapSprite.addChild(userMapPlanets["DeathStar"][2]);
    if(side === SIDE_SITH) mapSprite.addChild(userMapPlanets["DeathStar"][3]);
        
    userMapPlanets["Utapau"][1].scale.set(0.2);
    mapSprite.addChild(userMapPlanets["Utapau"][1]);
    mapSprite.addChild(userMapPlanets["Utapau"][4]);
    if(side === SIDE_JEDI) mapSprite.addChild(userMapPlanets["Utapau"][2]);
    if(side === SIDE_SITH) mapSprite.addChild(userMapPlanets["Utapau"][3]);
        
    userMapPlanets["Saleucami"][1].scale.set(0.2);
    mapSprite.addChild(userMapPlanets["Saleucami"][1]);
    mapSprite.addChild(userMapPlanets["Saleucami"][4]);
    if(side === SIDE_JEDI) mapSprite.addChild(userMapPlanets["Saleucami"][2]);
    if(side === SIDE_SITH) mapSprite.addChild(userMapPlanets["Saleucami"][3]);
    
    userMapPlanets["Jakku"][1].scale.set(0.2);
    mapSprite.addChild(userMapPlanets["Jakku"][1]);
    mapSprite.addChild(userMapPlanets["Jakku"][4]);
    if(side === SIDE_JEDI)
    {
        mapSprite.addChild(userMapPlanets["Jakku"][2]);
        mapSprite.addChild(userMapPlanets["Jakku"][5]);
        mapSprite.addChild(userMapPlanets["Jakku"][6]);
        mapSprite.addChild(userMapPlanets["Jakku"][7]);
    }
    if(side === SIDE_SITH)
    {
        mapSprite.addChild(userMapPlanets["Jakku"][3]);
        mapSprite.addChild(userMapPlanets["Jakku"][8]);
        mapSprite.addChild(userMapPlanets["Jakku"][9]);
        mapSprite.addChild(userMapPlanets["Jakku"][10]);
    }
    
}
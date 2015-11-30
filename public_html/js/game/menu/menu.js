var menuStage;
var menuStarsSprite;

function menuCreate()
{
	menuStage = new PIXI.Container(); 
	stage.addChild(menuStage); 
	
	menuStarsShow();
} 

function menuRemove() 
{ 
	stage.removeChild(menuStage); 
	menuStage = null; 
}

function menuStarsShow()
{
	menuStarsSprite = new PIXI.Sprite(stars1Texture); 
	menuStarsSprite.position.x = 0; 
	menuStarsSprite.position.y = 0; 
	menuStarsSprite.scale.set(1.0); 
	menuStage.addChild(menuStarsSprite);
}
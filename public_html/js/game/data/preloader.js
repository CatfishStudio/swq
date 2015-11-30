var preloaderStage;

function preloaderCreate()
{
	preloaderStage = new PIXI.Container(); 
	stage.addChild(preloaderStage);
	
	var loader = new PIXI.loaders.Loader();
	loader.add('preloaderTexture',"./assets/image/textures/preloader.jpg");
	loader.once('complete',onPreloaderLoaderComplete);
	loader.load();
} 

function preloaderRemove() 
{
	stage.removeChild(preloaderStage);
	preloaderStage = null;
}

function onPreloaderLoaderComplete(loader, res)
{
	var mkload = document.getElementById("game");
	mkload.parentNode.removeChild(mkload);
	
	textureSprite = new PIXI.Sprite(res.preloaderTexture.texture); 
	textureSprite.position.x = 0; 
	textureSprite.position.y = 0; 
	preloaderStage.addChild(textureSprite);
	
	preloaderLoadAssets();
}

function preloaderLoadAssets()
{
	var loader = new PIXI.loaders.Loader();
	loader.add('deathstarTexture','./assets/image/textures/deathstar.png');
	loader.add('starwarsTexture','./assets/image/textures/starwars.png')
	loader.add('stars1Texture','./assets/image/textures/stars1.jpg')
	loader.add('ship1Texture','./assets/image/textures/ship1.png')
	loader.add('ship2Texture','./assets/image/textures/ship2.png')
	loader.add('ship3Texture','./assets/image/textures/ship3.png')
	
	loader.once('complete',onPreloaderAssetsLoaderComplete);
	loader.once('progress',onPreloaderAssetsLoaderProcess);
	loader.load();
	
}

function onPreloaderAssetsLoaderProcess()
{
	// console.log("Progress load!");
}

function onPreloaderAssetsLoaderComplete(loader, res) 
{
	deathstarTexture = res.deathstarTexture.texture;			// deathstar.png
	starwarsTexture = res.starwarsTexture.texture;			// starwars.png
	stars1Texture = res.stars1Texture.texture;					// stars1.jpg
	ship1Texture = res.ship1Texture.texture;						// ship1.png
	ship2Texture = res.ship2Texture.texture;						// ship2.png
	ship3Texture = res.ship3Texture.texture;						// ship3.png
	
	menuCreate();
	preloaderRemove();
}
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

    preloaderLoadSound(); // загрузка звуков и музыки
}

var preloaderSounds = [
    //{id:"Music", src:"M-GameBG.ogg"},
    {id:"StarWarsThemeSong", src:"assets/music/star_wars_theme_song.mp3"}
];

function preloaderLoadSound()
{
    createjs.Sound.addEventListener("fileload", onPreloaderSoundLoaderComplete);
    createjs.Sound.registerSounds(preloaderSounds);
}

function onPreloaderSoundLoaderComplete(event) 
{
    preloaderLoadAssets();  // загрузка текстур и атласов
}


function preloaderLoadAssets()
{
    var loader = new PIXI.loaders.Loader();
    loader.add('deathstarTexture','./assets/image/textures/deathstar.png');
    loader.add('starwarsTexture','./assets/image/textures/starwars.png');
    loader.add('stars1Texture','./assets/image/textures/stars1.jpg');
    loader.add('ship1Texture','./assets/image/textures/ship1.png');
    loader.add('ship2Texture','./assets/image/textures/ship2.png');
    loader.add('ship3Texture','./assets/image/textures/ship3.png');

    loader.add('r2d2DroidBlueRightTexture','./assets/image/textures/r2d2_droid_blue_right.png');
    loader.add('r2d2DroidRedRightTexture','./assets/image/textures/r2d2_droid_red_right.png');
    loader.add('r2d2DroidBlueLeftTexture','./assets/image/textures/r2d2_droid_blue_left.png');
    loader.add('r2d2DroidRedLeftTexture','./assets/image/textures/r2d2_droid_red_left.png');

    loader.add('sideBackgroundTexture','./assets/image/textures/side_background.png');
    loader.add('sideDarthVaderTexture','./assets/image/textures/side_darth_vader.png');
    loader.add('sideLukeSkywalkerTexture','./assets/image/textures/side_luke_skywalker.png');


    loader.add('buttonBlueAtlas','./assets/image/atlas/button_blue.json');
    loader.add('buttonRedAtlas','./assets/image/atlas/button_red.json');
    
    loader.add('buttonsSettings','./assets/image/atlas/settings_buttons.json');


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
    stars1Texture = res.stars1Texture.texture;				// stars1.jpg
    ship1Texture = res.ship1Texture.texture;				// ship1.png
    ship2Texture = res.ship2Texture.texture;				// ship2.png
    ship3Texture = res.ship3Texture.texture;				// ship3.png
    r2d2DroidBlueRightTexture  = res.r2d2DroidBlueRightTexture.texture;	// r2d2_droid_blue_right.png
    r2d2DroidRedRightTexture = res.r2d2DroidRedRightTexture.texture;	// r2d2_droid_red_right.png
    r2d2DroidBlueLeftTexture  = res.r2d2DroidBlueLeftTexture.texture;	// r2d2_droid_blue_left.png
    r2d2DroidRedLeftTexture = res.r2d2DroidRedLeftTexture.texture;	// r2d2_droid_red_left.png
    sideBackgroundTexture = res.sideBackgroundTexture.texture;          // side_background.png
    sideDarthVaderTexture = res.sideDarthVaderTexture.texture;          // side_darth_vader.png
    sideLukeSkywalkerTexture = res.sideLukeSkywalkerTexture.texture;    // side_luke_skywalker.png

    animTexButtonBlue = loadAnimationTextures(11, 'button_blue_');
    animTexButtonRed = loadAnimationTextures(11, 'button_red_');
    
    engButtonTexture = PIXI.Texture.fromFrame('eng.png');
    infoButtonTexture = PIXI.Texture.fromFrame('information.png');
    musicOnButtonTexture = PIXI.Texture.fromFrame('music.png');
    musicOffButtonTexture = PIXI.Texture.fromFrame('music_off.png');
    rusButtonTexture = PIXI.Texture.fromFrame('rus.png');
    soundOnButtonTexture = PIXI.Texture.fromFrame('sound.png');
    soundOffButtonTexture = PIXI.Texture.fromFrame('sound_off.png');

    menuCreate();
    preloaderRemove();
}

function loadAnimationTextures(countFrame, nameFrame)
{
    var nameTexture;
    var animTextures = [];
    for(var i = 1; i <= countFrame; i++)
    {
        if(i < 10)
	{
            nameTexture = nameFrame + '0' + i + '.png'
        }else{
            nameTexture = nameFrame + i + '.png'
        }
        var texture = PIXI.Texture.fromFrame(nameTexture);
        animTextures.push(texture);
    }
    return animTextures;
}
var preloaderStage;
var preloaderProgressAssetsText;
var preloaderStyleText = { font : 'bold 48px Arial', fill : '#FFFF80', stroke : '#FF8000', strokeThickness : 1, wordWrap : true, wordWrapWidth : 600 }; 
var preloaderComplete = 0;  // количество завершенных процессов.
var preloaderPercentSounds = 0;
var preloaderPercentTextures = 0;

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
    
    preloaderProgressAssets();
    
    preloaderLoadAssets();  // загрузка текстур
    preloaderLoadSound();   // загрузка звуков и музыки
}

function preloaderProgressAssets()
{
    preloaderProgressAssetsText = new PIXI.Text("Загрузка", preloaderStyleText); 
    preloaderProgressAssetsText.x = 280;
    preloaderProgressAssetsText.y = 550;
    preloaderStage.addChild(preloaderProgressAssetsText);
}

function preloaderLoadSound()
{
    var queue = new createjs.LoadQueue();
    createjs.Sound.alternateExtensions = ["mp3"];
    queue.installPlugin(createjs.Sound);
    queue.on("progress", onPreloaderSoundLoaderProcess);
    queue.on("complete", onPreloaderSoundLoaderComplete);
    queue.loadFile({"id":"StarWarsThemeSong", "src":"assets/music/star_wars_theme_song.mp3"});
}

function onPreloaderSoundLoaderProcess(event) 
{
    preloaderPercentSounds = Math.round((event.loaded) * (50 / event.total));
    preloaderProgressAssetsText.text = "Загрузка " + (preloaderPercentTextures + preloaderPercentSounds) + "%";
}

function onPreloaderSoundLoaderComplete(event) 
{
    preloaderComplete++;
    if(preloaderComplete === 2)
    {
        menuCreate();
        preloaderRemove();
    }
}

function preloaderLoadAssets()
{
    var loader = new PIXI.loaders.Loader();
    
    loader.add('animTest','./assets/test/test_animation.json');
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

    loader.add('mapSpaceBlueTexture','./assets/image/textures/space_blue.jpg');
    loader.add('mapSpaceRedTexture','./assets/image/textures/space_red.jpg');


    loader.add('buttonBlueAtlas','./assets/image/atlas/button_blue.json');
    loader.add('buttonRedAtlas','./assets/image/atlas/button_red.json');
    
    loader.add('buttonsSettings','./assets/image/atlas/settings_buttons.json');

    loader.add('deathstarTexture','./assets/image/textures/deathstar.png');
    loader.add('deathstar_landscape','./assets/image/textures/deathstar_landscape.jpg');
    loader.add('coruscant_planet','./assets/image/textures/coruscant.png');
    loader.add('coruscant_landscape','./assets/image/textures/coruscant_landscape.jpg');
    loader.add('tatooine_planet','./assets/image/textures/tatooine.png');
    loader.add('tatooine_landscape','./assets/image/textures/tatooine_landscape.jpg');
    loader.add('naboo_planet','./assets/image/textures/naboo.png');
    loader.add('naboo_landscape','./assets/image/textures/naboo_landscape.jpg');
    loader.add('endor_planet','./assets/image/textures/endor.png');
    loader.add('endor_landscape','./assets/image/textures/endor_landscape.jpg');
    loader.add('hoth_planet','./assets/image/textures/hoth.png');
    loader.add('hoth_landscape','./assets/image/textures/hoth_landscape.jpg');
    loader.add('mustafar_planet','./assets/image/textures/mustafar.png');
    loader.add('mustafar_landscape','./assets/image/textures/mustafar_landscape.jpg');
    loader.add('dagobah_planet','./assets/image/textures/dagobah.png');
    loader.add('dagobah_landscape','./assets/image/textures/dagobah_landscape.jpg');
    loader.add('bespin_planet','./assets/image/textures/bespin.png');
    loader.add('bespin_landscape','./assets/image/textures/bespin_landscape.jpg');
    loader.add('geonosis_planet','./assets/image/textures/geonosis.png');
    loader.add('geonosis_landscape','./assets/image/textures/geonosis_landscape.jpg');
    loader.add('alderaan_planet','./assets/image/textures/alderaan.png');
    loader.add('alderaan_landscape','./assets/image/textures/alderaan_landscape.jpg');
    loader.add('kamino_planet','./assets/image/textures/kamino.png');
    loader.add('kamino_landscape','./assets/image/textures/kamino_landscape.jpg');
    loader.add('utapau_planet','./assets/image/textures/utapau.png');
    loader.add('utapau_landscape','./assets/image/textures/utapau_landscape.jpg');
    loader.add('saleucami_planet','./assets/image/textures/saleucami.png');
    loader.add('saleucami_landscape','./assets/image/textures/saleucami_landscape.jpg');


    loader.on('complete', onPreloaderAssetsLoaderComplete);
    loader.on('progress',onPreloaderAssetsLoaderProcess);
    loader.load();
	
}

function onPreloaderAssetsLoaderProcess()
{
    preloaderPercentTextures = (Math.round(this.progress) / 2);
    preloaderProgressAssetsText.text = "Загрузка " + (preloaderPercentTextures + preloaderPercentSounds) + "%";
}

function onPreloaderAssetsLoaderComplete(loader, res) 
{
    //preloaderProgressImageText.text = "Загрузка текстур: ............... 100%";
    preloaderComplete++;
    preloaderPercentTextures = 50;
    preloaderProgressAssetsText.text = "Загрузка " + (preloaderPercentTextures + preloaderPercentSounds) + "%";
    
    animTest = loadAnimationTextures(11, 'dv_');
    
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

    mapSpaceBlueTexture = res.mapSpaceBlueTexture.texture;              // space_blue.jpg
    mapSpaceRedTexture = res.mapSpaceRedTexture.texture;                // space_red.jpg

    animTexButtonBlue = loadAnimationTextures(11, 'button_blue_');
    animTexButtonRed = loadAnimationTextures(11, 'button_red_');
    
    engButtonTexture = PIXI.Texture.fromFrame('eng.png');
    infoButtonTexture = PIXI.Texture.fromFrame('information.png');
    musicOnButtonTexture = PIXI.Texture.fromFrame('music.png');
    musicOffButtonTexture = PIXI.Texture.fromFrame('music_off.png');
    rusButtonTexture = PIXI.Texture.fromFrame('rus.png');
    soundOnButtonTexture = PIXI.Texture.fromFrame('sound.png');
    soundOffButtonTexture = PIXI.Texture.fromFrame('sound_off.png');
    
    planetTextures = new Object();
    planetTextures["Coruscant"] = [res.coruscant_planet.texture, res.coruscant_landscape.texture];
    planetTextures["Totooine"] = [res.tatooine_planet.texture, res.tatooine_landscape.texture];
    planetTextures["Naboo"] = [res.naboo_planet.texture, res.naboo_landscape.texture];
    planetTextures["Endor"] = [res.endor_planet.texture, res.endor_landscape.texture];
    planetTextures["Hoth"] = [res.hoth_planet.texture, res.hoth_landscape.texture];
    planetTextures["Mustafar"] = [res.mustafar_planet.texture, res.mustafar_landscape.texture];
    planetTextures["Dagobah"] = [res.dagobah_planet.texture, res.dagobah_landscape.texture];
    planetTextures["Bespin"] = [res.bespin_planet.texture, res.bespin_landscape.texture];
    planetTextures["Geonosis"] = [res.geonosis_planet.texture, res.geonosis_landscape.texture];
    planetTextures["Alderaan"] = [res.alderaan_planet.texture, res.alderaan_landscape.texture];
    planetTextures["Kamino"] = [res.kamino_planet.texture, res.kamino_landscape.texture];
    planetTextures["DeathStar"] = [res.deathstarTexture.texture, res.deathstar_landscape.texture];
    planetTextures["Utapau"] = [res.utapau_planet.texture, res.utapau_landscape.texture];
    planetTextures["Saleucami"] = [res.saleucami_planet.texture, res.saleucami_landscape.texture];
    
    
    heroesTextures = new Object();
    heroesTextures["Luke_Skywalker"] = [];
    

    if(preloaderComplete === 2)
    {
        menuCreate();
        preloaderRemove();
    }
}

function loadAnimationTextures(countFrame, nameFrame)
{
    var nameTexture;
    var animTextures = [];
    for(var i = 1; i <= countFrame; i++)
    {
        if(i < 10)
	{
            nameTexture = nameFrame + '0' + i + '.png';
        }else{
            nameTexture = nameFrame + i + '.png';
        }
        var texture = PIXI.Texture.fromFrame(nameTexture);
        animTextures.push(texture);
    }
    return animTextures;
}
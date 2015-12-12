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
    loader.add('testTexture','./assets/test/test_texture.png');
    
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

    loader.add('deathstarTexture','./assets/image/textures/planets/deathstar.png');
    loader.add('deathstar_landscape','./assets/image/textures/planets/deathstar_landscape.jpg');
    loader.add('coruscant_planet','./assets/image/textures/planets/coruscant.png');
    loader.add('coruscant_landscape','./assets/image/textures/planets/coruscant_landscape.jpg');
    loader.add('tatooine_planet','./assets/image/textures/planets/tatooine.png');
    loader.add('tatooine_landscape','./assets/image/textures/planets/tatooine_landscape.jpg');
    loader.add('naboo_planet','./assets/image/textures/planets/naboo.png');
    loader.add('naboo_landscape','./assets/image/textures/planets/naboo_landscape.jpg');
    loader.add('endor_planet','./assets/image/textures/planets/endor.png');
    loader.add('endor_landscape','./assets/image/textures/planets/endor_landscape.jpg');
    loader.add('hoth_planet','./assets/image/textures/planets/hoth.png');
    loader.add('hoth_landscape','./assets/image/textures/planets/hoth_landscape.jpg');
    loader.add('mustafar_planet','./assets/image/textures/planets/mustafar.png');
    loader.add('mustafar_landscape','./assets/image/textures/planets/mustafar_landscape.jpg');
    loader.add('dagobah_planet','./assets/image/textures/planets/dagobah.png');
    loader.add('dagobah_landscape','./assets/image/textures/planets/dagobah_landscape.jpg');
    loader.add('bespin_planet','./assets/image/textures/planets/bespin.png');
    loader.add('bespin_landscape','./assets/image/textures/planets/bespin_landscape.jpg');
    loader.add('geonosis_planet','./assets/image/textures/planets/geonosis.png');
    loader.add('geonosis_landscape','./assets/image/textures/planets/geonosis_landscape.jpg');
    loader.add('alderaan_planet','./assets/image/textures/planets/alderaan.png');
    loader.add('alderaan_landscape','./assets/image/textures/planets/alderaan_landscape.jpg');
    loader.add('kamino_planet','./assets/image/textures/planets/kamino.png');
    loader.add('kamino_landscape','./assets/image/textures/planets/kamino_landscape.jpg');
    loader.add('utapau_planet','./assets/image/textures/planets/utapau.png');
    loader.add('utapau_landscape','./assets/image/textures/planets/utapau_landscape.jpg');
    loader.add('saleucami_planet','./assets/image/textures/planets/saleucami.png');
    loader.add('saleucami_landscape','./assets/image/textures/planets/saleucami_landscape.jpg');

    loader.add('aayla_secura_lr','./assets/image/textures/personages/aayla_secura_lr.png');
    loader.add('aayla_secura_rl','./assets/image/textures/personages/aayla_secura_rl.png');
    loader.add('adigallia','./assets/image/textures/personages/adigallia.png');
    loader.add('admiral_ozzel','./assets/image/textures/personages/admiral_ozzel.png');
    loader.add('alliance_to_restore_the_republic','./assets/image/textures/personages/alliance_to_restore_the_republic.png');
    loader.add('anakin_skywalker','./assets/image/textures/personages/anakin_skywalker.png');
    loader.add('aurra_sing_lr','./assets/image/textures/personages/aurra_sing_lr.png');
    loader.add('aurra_sing_rl','./assets/image/textures/personages/aurra_sing_rl.png');
    loader.add('b1_battle_droid_lr','./assets/image/textures/personages/b1_battle_droid_lr.png');
    loader.add('b1_battle_droid_rl','./assets/image/textures/personages/b1_battle_droid_rl.png');
    loader.add('bail_organa','./assets/image/textures/personages/bail_organa.png');
    loader.add('barriss_offee','./assets/image/textures/personages/barriss_offee.png');
    loader.add('beru_lars','./assets/image/textures/personages/beru_lars.png');
    loader.add('bib_fortuna','./assets/image/textures/personages/bib_fortuna.png');
    loader.add('boba_fett','./assets/image/textures/personages/boba_fett.png');
    loader.add('boss_nass_lr','./assets/image/textures/personages/boss_nass_lr.png');
    loader.add('boss_nass_rl','./assets/image/textures/personages/boss_nass_rl.png');
    loader.add('c_3po_lr','./assets/image/textures/personages/c_3po_lr.png');
    loader.add('c_3po_rl','./assets/image/textures/personages/c_3po_rl.png');
    loader.add('capitan_panaka','./assets/image/textures/personages/capitan_panaka.png');
    loader.add('chewbacca_lr','./assets/image/textures/personages/chewbacca_lr.png');
    loader.add('chewbacca_rl','./assets/image/textures/personages/chewbacca_rl.png');
    loader.add('clone_commander_bakara','./assets/image/textures/personages/clone_commander_bakara.png');
    loader.add('clone_commander_cody_lr','./assets/image/textures/personages/clone_commander_cody_lr.png');
    loader.add('clone_commander_cody_rl','./assets/image/textures/personages/clone_commander_cody_rl.png');
    loader.add('clone_commander_neyo','./assets/image/textures/personages/clone_commander_neyo.png');
    loader.add('clone_commander_rex','./assets/image/textures/personages/clone_commander_rex.png');
    loader.add('commander_jerjerrod_lr','./assets/image/textures/personages/commander_jerjerrod_lr.png');
    loader.add('commander_jerjerrod_rl','./assets/image/textures/personages/commander_jerjerrod_rl.png');
    loader.add('darth_maul','./assets/image/textures/personages/darth_maul.png');
    loader.add('darth_sidious_lr','./assets/image/textures/personages/darth_sidious_lr.png');
    loader.add('darth_sidious_rl','./assets/image/textures/personages/darth_sidious_rl.png');
    loader.add('darth_vader','./assets/image/textures/personages/darth_vader.png');
    loader.add('dooku_lr','./assets/image/textures/personages/dooku_lr.png');
    loader.add('dooku_rl','./assets/image/textures/personages/dooku_rl.png');
    loader.add('eeth_koth','./assets/image/textures/personages/eeth_koth.png');
    loader.add('general_grievous','./assets/image/textures/personages/general_grievous.png');
    loader.add('general_madine_lr','./assets/image/textures/personages/general_madine_lr.png');
    loader.add('general_madine_rl','./assets/image/textures/personages/general_madine_rl.png');
    loader.add('han_solo_lr','./assets/image/textures/personages/han_solo_lr.png');
    loader.add('han_solo_rl','./assets/image/textures/personages/han_solo_rl.png');
    loader.add('jango_fett_lr','./assets/image/textures/personages/jango_fett_lr.png');
    loader.add('jango_fett_rl','./assets/image/textures/personages/jango_fett_rl.png');
    loader.add('jar_jar_binks','./assets/image/textures/personages/jar_jar_binks.png');
    loader.add('jawas','./assets/image/textures/personages/jawas.png');
    loader.add('kapitan_antilles','./assets/image/textures/personages/kapitan_antilles.png');
    loader.add('ki_adi_mundi','./assets/image/textures/personages/ki_adi_mundi.png');
    loader.add('kit_fisto','./assets/image/textures/personages/kit_fisto.png');
    loader.add('lando_calrissian_lr','./assets/image/textures/personages/lando_calrissian_lr.png');
    loader.add('lando_calrissian_rl','./assets/image/textures/personages/lando_calrissian_rl.png');
    loader.add('leia_organa_lr','./assets/image/textures/personages/leia_organa_lr.png');
    loader.add('leia_organa_rl','./assets/image/textures/personages/leia_organa_rl.png');
    loader.add('luke_skywalker','./assets/image/textures/personages/luke_skywalker.png');
    loader.add('mace_windu_lr','./assets/image/textures/personages/mace_windu_lr.png');
    loader.add('mace_windu_rl','./assets/image/textures/personages/mace_windu_rl.png');
    loader.add('mas_amedda','./assets/image/textures/personages/mas_amedda.png');
    loader.add('maximilian_veers','./assets/image/textures/personages/maximilian_veers.png');
    loader.add('mon_motma_lr','./assets/image/textures/personages/mon_motma_lr.png');
    loader.add('mon_motma_rl','./assets/image/textures/personages/mon_motma_rl.png');
    loader.add('nute_gunray','./assets/image/textures/personages/nute_gunray.png');
    loader.add('obi_wan_kenobi','./assets/image/textures/personages/obi_wan_kenobi.png');
    loader.add('owen_lars','./assets/image/textures/personages/owen_lars.png');
    loader.add('padme_amidala','./assets/image/textures/personages/padme_amidala.png');
    loader.add('palpatine','./assets/image/textures/personages/palpatine.png');
    loader.add('plo_koon','./assets/image/textures/personages/plo_koon.png');
    loader.add('poggle_the_lesser','./assets/image/textures/personages/poggle_the_lesser.png');
    loader.add('qui_gon_jinn_lr','./assets/image/textures/personages/qui_gon_jinn_lr.png');
    loader.add('qui_gon_jinn_rl','./assets/image/textures/personages/qui_gon_jinn_rl.png');
    loader.add('red_battle_droid_lr','./assets/image/textures/personages/red_battle_droid_lr.png');
    loader.add('red_battle_droid_rl','./assets/image/textures/personages/red_battle_droid_rl.png');
    loader.add('republic_clone_army','./assets/image/textures/personages/republic_clone_army.png');
    loader.add('royal_guards','./assets/image/textures/personages/royal_guards.png');
    loader.add('rune_haako_lr','./assets/image/textures/personages/rune_haako_lr.png');
    loader.add('rune_haako_rl','./assets/image/textures/personages/rune_haako_rl.png');
    loader.add('saesee_tiin_lr','./assets/image/textures/personages/saesee_tiin_lr.png');
    loader.add('saesee_tiin_rl','./assets/image/textures/personages/saesee_tiin_rl.png');
    loader.add('separatists','./assets/image/textures/personages/separatists.png');
    loader.add('shaak_ti','./assets/image/textures/personages/shaak_ti.png');
    loader.add('shmi_skywalker','./assets/image/textures/personages/shmi_skywalker.png');
    loader.add('sio_bibble','./assets/image/textures/personages/sio_bibble.png');
    loader.add('stormtrooper','./assets/image/textures/personages/stormtrooper.png');
    loader.add('stormtrooper_lr','./assets/image/textures/personages/stormtrooper_lr.png');
    loader.add('stormtrooper_rl','./assets/image/textures/personages/stormtrooper_rl.png');
    loader.add('stormtroopers','./assets/image/textures/personages/stormtroopers.png');
    loader.add('tion_medon','./assets/image/textures/personages/tion_medon.png');
    loader.add('trade_federation','./assets/image/textures/personages/trade_federation.png');
    loader.add('tusken','./assets/image/textures/personages/tusken.png');
    loader.add('wat_tambor_lr','./assets/image/textures/personages/wat_tambor_lr.png');
    loader.add('wat_tambor_rl','./assets/image/textures/personages/wat_tambor_rl.png');
    loader.add('watto','./assets/image/textures/personages/watto.png');
    loader.add('wicket_wysri_warrick','./assets/image/textures/personages/wicket_wysri_warrick.png');
    loader.add('yoda','./assets/image/textures/personages/yoda.png');
    
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
    testTexture = res.testTexture.texture;
    
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
    planetTextures["Coruscant"] = ["Корусант", res.coruscant_planet.texture, res.coruscant_landscape.texture];
    planetTextures["Totooine"] = ["Татуин", res.tatooine_planet.texture, res.tatooine_landscape.texture];
    planetTextures["Naboo"] = ["Набу", res.naboo_planet.texture, res.naboo_landscape.texture];
    planetTextures["Endor"] = ["Эндор", res.endor_planet.texture, res.endor_landscape.texture];
    planetTextures["Hoth"] = ["Хот", res.hoth_planet.texture, res.hoth_landscape.texture];
    planetTextures["Mustafar"] = ["Мустафар", res.mustafar_planet.texture, res.mustafar_landscape.texture];
    planetTextures["Dagobah"] = ["Дагоба", res.dagobah_planet.texture, res.dagobah_landscape.texture];
    planetTextures["Bespin"] = ["Беспин", res.bespin_planet.texture, res.bespin_landscape.texture];
    planetTextures["Geonosis"] = ["Джеонозис", res.geonosis_planet.texture, res.geonosis_landscape.texture];
    planetTextures["Alderaan"] = ["Альдераан", res.alderaan_planet.texture, res.alderaan_landscape.texture];
    planetTextures["Kamino"] = ["Камино", res.kamino_planet.texture, res.kamino_landscape.texture];
    planetTextures["DeathStar"] = ["Звезда смерти", res.deathstarTexture.texture, res.deathstar_landscape.texture];
    planetTextures["Utapau"] = ["Утапау", res.utapau_planet.texture, res.utapau_landscape.texture];
    planetTextures["Saleucami"] = ["Салукемай", res.saleucami_planet.texture, res.saleucami_landscape.texture];
    
    
    heroesTextures = new Object();
    heroesTextures["aayla_secura"] = ["Эйла Секура", res.aayla_secura_lr.texture, res.aayla_secura_rl.texture];
    heroesTextures["adigallia"] = ["Ади Галлия", res.adigallia.texture, res.adigallia.texture];
    heroesTextures["admiral_ozzel"] = ["Кендал Оззель", res.admiral_ozzel.texture, res.admiral_ozzel.texture];
    heroesTextures["alliance_to_restore_the_republic"] = ["Альянс повстанцев", res.alliance_to_restore_the_republic.texture, res.alliance_to_restore_the_republic.texture];
    heroesTextures["anakin_skywalker"] = ["Энакин Скайуокер", res.anakin_skywalker.texture, res.anakin_skywalker.texture];
    heroesTextures["aurra_sing"] = ["Орра Синг", res.aurra_sing_lr.texture, res.aurra_sing_rl.texture];
    heroesTextures["b1_battle_droid"] = ["Боевой дроид B1", res.b1_battle_droid_lr.texture, res.b1_battle_droid_rl.texture];
    heroesTextures["bail_organa"] = ["Бэйл Органа", res.bail_organa.texture, res.bail_organa.texture];
    heroesTextures["barriss_offee"] = ["Бэррисс Оффи", res.barriss_offee.texture, res.barriss_offee.texture];
    heroesTextures["beru_lars"] = ["Беру Ларс", res.beru_lars.texture, res.beru_lars.texture];
    heroesTextures["bib_fortuna"] = ["Биб Фортуна", res.bib_fortuna.texture, res.bib_fortuna.texture];
    heroesTextures["boba_fett"] = ["Боба Фетт", res.boba_fett.texture, res.boba_fett.texture];
    heroesTextures["boss_nass"] = ["Босс Насс", res.boss_nass_lr.texture, res.boss_nass_rl.texture];
    heroesTextures["c_3po"] = ["С-3РО", res.c_3po_lr.texture, res.c_3po_rl.texture];
    heroesTextures["capitan_panaka"] = ["Капитан Панака", res.capitan_panaka.texture, res.capitan_panaka.texture];
    heroesTextures["chewbacca"] = ["Чубака", res.chewbacca_lr.texture, res.chewbacca_rl.texture];
    heroesTextures["clone_commander_bakara"] = ["Бакара", res.clone_commander_bakara.texture, res.clone_commander_bakara.texture];
    heroesTextures["clone_commander_cody"] = ["Коди", res.clone_commander_cody_lr.texture, res.clone_commander_cody_rl.texture];
    heroesTextures["clone_commander_neyo"] = ["Нейо", res.clone_commander_neyo.texture, res.clone_commander_neyo.texture];
    heroesTextures["clone_commander_rex"] = ["Рекс", res.clone_commander_rex.texture, res.clone_commander_rex.texture];
    heroesTextures["commander_jerjerrod"] = ["Тиаан Джерджеррод", res.commander_jerjerrod_lr.texture, res.commander_jerjerrod_rl.texture];
    heroesTextures["darth_maul"] = ["Дарт Мол", res.darth_maul.texture, res.darth_maul.texture];
    heroesTextures["darth_sidious"] = ["Дарт Сидиус", res.darth_sidious_lr.texture, res.darth_sidious_rl.texture];
    heroesTextures["darth_vader"] = ["Дарт Вейдер", res.darth_vader.texture, res.darth_vader.texture];
    heroesTextures["dooku"] = ["Граф Дуку", res.dooku_lr.texture, res.dooku_rl.texture];
    heroesTextures["eeth_koth"] = ["Иит Кот", res.eeth_koth.texture, res.eeth_koth.texture];
    heroesTextures["general_grievous"] = ["Генерал Гривус", res.general_grievous.texture, res.general_grievous.texture];
    heroesTextures["general_madine"] = ["Генерал Мадин", res.general_madine_lr.texture, res.general_madine_rl.texture];
    heroesTextures["han_solo"] = ["Хан Соло", res.han_solo_lr.texture, res.han_solo_rl.texture];
    heroesTextures["jango_fett"] = ["Джанго Фетт", res.jango_fett_lr.texture, res.jango_fett_rl.texture];
    heroesTextures["jar_jar_binks"] = ["Джа-Джа Бинкс", res.jar_jar_binks.texture, res.jar_jar_binks.texture];
    heroesTextures["jawas"] = ["Джавы", res.jawas.texture, res.jawas.texture];
    heroesTextures["kapitan_antilles"] = ["Капитан Антиллес", res.kapitan_antilles.texture, res.kapitan_antilles.texture];
    heroesTextures["ki_adi_mundi"] = ["Ки-Ади-Мунди", res.ki_adi_mundi.texture, res.ki_adi_mundi.texture];
    heroesTextures["kit_fisto"] = ["Кит Фисто", res.kit_fisto.texture, res.kit_fisto.texture];
    heroesTextures["lando_calrissian"] = ["Лэндо Калриссиан", res.lando_calrissian_lr.texture, res.lando_calrissian_rl.texture];
    heroesTextures["leia_organa"] = ["Принцесса Лея Органа", res.leia_organa_lr.texture, res.leia_organa_rl.texture];
    heroesTextures["luke_skywalker"] = ["Люк Скайуокер", res.luke_skywalker.texture, res.luke_skywalker.texture];
    heroesTextures["mace_windu"] = ["Мейс Винду", res.mace_windu_lr.texture, res.mace_windu_rl.texture];
    heroesTextures["mas_amedda"] = ["Мас Амедда", res.mas_amedda.texture, res.mas_amedda.texture];
    heroesTextures["maximilian_veers"] = ["Максимилиан Вирс", res.maximilian_veers.texture, res.maximilian_veers.texture];
    heroesTextures["mon_motma"] = ["Мон Мотма", res.mon_motma_lr.texture, res.mon_motma_rl.texture];
    heroesTextures["nute_gunray"] = ["Нут Ганрей", res.nute_gunray.texture, res.nute_gunray.texture];
    heroesTextures["obi_wan_kenobi"] = ["Оби-Ван Кеноби", res.obi_wan_kenobi.texture, res.obi_wan_kenobi.texture];
    heroesTextures["owen_lars"] = ["Оуэн Ларс", res.owen_lars.texture, res.owen_lars.texture];
    heroesTextures["padme_amidala"] = ["Падме Амидала", res.padme_amidala.texture, res.padme_amidala.texture];
    heroesTextures["palpatine"] = ["Палпатин", res.palpatine.texture, res.palpatine.texture];
    heroesTextures["plo_koon"] = ["Пло Кун", res.plo_koon.texture, res.plo_koon.texture];
    heroesTextures["poggle_the_lesser"] = ["Поггль Меньший", res.poggle_the_lesser.texture, res.poggle_the_lesser.texture];
    heroesTextures["qui_gon_jinn"] = ["Квай-Гон Джинн", res.qui_gon_jinn_lr.texture, res.qui_gon_jinn_rl.texture];
    heroesTextures["red_battle_droid"] = ["Боевой дроид", res.red_battle_droid_lr.texture, res.red_battle_droid_rl.texture];
    heroesTextures["republic_clone_army"] = ["Республиканская армия клонов", res.republic_clone_army.texture, res.republic_clone_army.texture];
    heroesTextures["royal_guards"] = ["Королевский страж", res.royal_guards.texture, res.royal_guards.texture];
    heroesTextures["rune_haako"] = ["Рун Хаако", res.rune_haako_lr.texture, res.rune_haako_rl.texture];
    heroesTextures["saesee_tiin"] = ["Сэси Тийн", res.saesee_tiin_lr.texture, res.saesee_tiin_rl.texture];
    heroesTextures["separatists"] = ["Сепаратисты", res.separatists.texture, res.separatists.texture];
    heroesTextures["shaak_ti"] = ["Шаак Ти", res.shaak_ti.texture, res.shaak_ti.texture];
    heroesTextures["shmi_skywalker"] = ["Шми Скайуокер", res.shmi_skywalker.texture, res.shmi_skywalker.texture];
    heroesTextures["sio_bibble"] = ["Сио Биббл", res.sio_bibble.texture, res.sio_bibble.texture];
    heroesTextures["stormtrooper_1"] = ["Штурмовик", res.stormtrooper.texture, res.stormtrooper.texture];
    heroesTextures["stormtrooper_2"] = ["Штурмовик", res.stormtrooper_lr.texture, res.stormtrooper_rl.texture];
    heroesTextures["stormtroopers"] = ["Имперские штурмовики", res.stormtroopers.texture, res.stormtroopers.texture];
    heroesTextures["tion_medon"] = ["Тион Медон", res.tion_medon.texture, res.tion_medon.texture];
    heroesTextures["trade_federation"] = ["Торговая Федерация", res.trade_federation.texture, res.trade_federation.texture];
    heroesTextures["tusken"] = ["Таскенские рейдеры", res.tusken.texture, res.tusken.texture];
    heroesTextures["wat_tambor"] = ["Уот Тамбор", res.wat_tambor_lr.texture, res.wat_tambor_rl.texture];
    heroesTextures["watto"] = ["Уотто", res.watto.texture, res.watto.texture];
    heroesTextures["wicket_wysri_warrick"] = ["Уикет У.Уоррик", res.wicket_wysri_warrick.texture, res.wicket_wysri_warrick.texture];
    heroesTextures["yoda"] = ["Йода", res.yoda.texture, res.yoda.texture];
    

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
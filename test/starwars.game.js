var animTest = [];                      // для теста
var testTexture;                        // для теста

var deathstarTexture;			// deathstar.png
var starwarsTexture;			// starwars.png
var stars1Texture;			// stars1.jpg
var ship1Texture;			// ship1.png
var ship2Texture;			// ship2.png
var ship3Texture;			// ship3.png
var r2d2DroidBlueRightTexture;		// r2d2_droid_blue_right.png
var r2d2DroidRedRightTexture;		// r2d2_droid_red_right.png
var r2d2DroidBlueLeftTexture;		// r2d2_droid_blue_left.png
var r2d2DroidRedLeftTexture;		// r2d2_droid_red_left.png
var sideBackgroundTexture;              // side_background.png
var sideDarthVaderTexture;              // side_darth_vader.png
var sideLukeSkywalkerTexture;           // side_luke_skywalker.png
var mapSpaceBlueTexture;                // space_blue.jpg
var mapSpaceRedTexture;                 // space_red.jpg

/* button_blue.json */
var animTexButtonBlue = [];

/* button_red.json */
var animTexButtonRed = [];

/* side_darth_vader.json */
var animTexSideDarthVader = [];

/* settings_buttons.json */
var engButtonTexture;
var infoButtonTexture;
var musicOnButtonTexture;
var musicOffButtonTexture;
var rusButtonTexture;
var soundOnButtonTexture;
var soundOffButtonTexture;

/* Planets */
var planetTextures;                     // текстуры планет

/* Heroes */
var heroesTextures;                     // текстуры персонажей
var music = false;
var sound = true;
var language = "rus";var MAIN_WIDTH = 860;
var MAIN_HEIGH = 730;
var MAIN_BACKGROUND_COLOR = 0xFFFFFF;

var DAMAGE_HIT_1 = 5;
var DAMAGE_HIT_2 = 3;
var DAMAGE_HIT_3 = 3;
var DAMAGE_HIT_4 = 6;
var DAMAGE_HIT_5 = 10;

var DAMAGE_MAX_HIT_1 = 6;
var DAMAGE_MAX_HIT_2 = 12;
var DAMAGE_MAX_HIT_3 = 12;
var DAMAGE_MAX_HIT_4 = 5;
var DAMAGE_MAX_HIT_5 = 3;var initPlanetBlueStyleText = { font : 'bold 14px Arial', fill : '#FFFFFF', stroke : '#0090F0', strokeThickness : 1, wordWrap : true, wordWrapWidth : 175 }; 
var initPlanetRedStyleText = { font : 'bold 14px Arial', fill : '#FFFFFF', stroke : '#880000', strokeThickness : 1, wordWrap : true, wordWrapWidth : 175 }; 

function initGame()
{
    userMapPlanets = initMap();
}

function initMap()
{
    var planets = new Object();
    
    planets["Coruscant"] = [
        "Coruscant",
        new PIXI.Sprite(planetTextures["Coruscant"][1]),
        new PIXI.Text(planetTextures["Coruscant"][0], initPlanetBlueStyleText),
        new PIXI.Text(planetTextures["Coruscant"][0], initPlanetRedStyleText),
        new PIXI.Graphics(),
        new PIXI.Sprite(heroesTextures["darth_vader"][1]),
        new PIXI.Sprite(heroesTextures["darth_vader"][1]),
        new PIXI.Sprite(heroesTextures["darth_vader"][1]),
        new PIXI.Sprite(heroesTextures["luke_skywalker"][1]),
        new PIXI.Sprite(heroesTextures["mace_windu"][1]),
        new PIXI.Sprite(heroesTextures["mas_amedda"][1])
    ];
    planets["Coruscant"][1].name = "coruscant_planet";
    planets["Coruscant"][1].position.x = 450;
    planets["Coruscant"][1].position.y = 575;
    planets["Coruscant"][1].interactive = true; 
    planets["Coruscant"][1].buttonMode = true;
    planets["Coruscant"][1].scale.set(0.2);
    planets["Coruscant"][2].position.x = 490; 
    planets["Coruscant"][2].position.y = 550; 
    planets["Coruscant"][3].position.x = 490; 
    planets["Coruscant"][3].position.y = 550;
    planets["Coruscant"][4].lineStyle(1, 0xFFFFFF, 0.3);
    planets["Coruscant"][4].drawCircle(492, 615, 39);
    planets["Coruscant"][4].lineStyle(1, 0xFFFFFF, 1);
    planets["Coruscant"][4].moveTo(475, 595);
    planets["Coruscant"][4].lineTo(485, 570);
    planets["Coruscant"][4].moveTo(485, 570);
    planets["Coruscant"][4].lineTo(650, 570);
    planets["Coruscant"][5].position.x = 0; 
    planets["Coruscant"][5].position.y = 0;
    planets["Coruscant"][5].scale.set(0.18);
    planets["Coruscant"][6].position.x = 0; 
    planets["Coruscant"][6].position.y = 0;
    planets["Coruscant"][6].scale.set(0.18);
    planets["Coruscant"][7].position.x = 0; 
    planets["Coruscant"][7].position.y = 0;
    planets["Coruscant"][7].scale.set(0.18);
    planets["Coruscant"][8].position.x = 525; 
    planets["Coruscant"][8].position.y = 575;
    planets["Coruscant"][8].scale.set(0.18);
    planets["Coruscant"][9].position.x = 575; 
    planets["Coruscant"][9].position.y = 575;
    planets["Coruscant"][9].scale.set(0.18);
    planets["Coruscant"][10].position.x = 625; 
    planets["Coruscant"][10].position.y = 575;
    planets["Coruscant"][10].scale.set(0.18);
    
    
    planets["Totooine"] = [
        "Totooine",
        new PIXI.Sprite(planetTextures["Totooine"][1]),
        new PIXI.Text(planetTextures["Totooine"][0], initPlanetBlueStyleText),
        new PIXI.Text(planetTextures["Totooine"][0], initPlanetRedStyleText),
        new PIXI.Graphics(),
        new PIXI.Sprite(heroesTextures["tusken"][1]),
        new PIXI.Sprite(heroesTextures["jawas"][1]),
        new PIXI.Sprite(heroesTextures["watto"][1]),
        new PIXI.Sprite(heroesTextures["qui_gon_jinn"][1]),
        new PIXI.Sprite(heroesTextures["owen_lars"][1]),
        new PIXI.Sprite(heroesTextures["tusken"][1])
    ];
    planets["Totooine"][1].name = "tatooine_planet";
    planets["Totooine"][1].position.x = 300; 
    planets["Totooine"][1].position.y = 425; 
    planets["Totooine"][1].interactive = true; 
    planets["Totooine"][1].buttonMode = true;
    planets["Totooine"][1].scale.set(0.2);
    planets["Totooine"][2].position.x = 340; 
    planets["Totooine"][2].position.y = 400; 
    planets["Totooine"][3].position.x = 340; 
    planets["Totooine"][3].position.y = 400;
    planets["Totooine"][4].lineStyle(1, 0xFFFFFF, 0.3);
    planets["Totooine"][4].drawCircle(341, 465, 39);
    planets["Totooine"][4].lineStyle(1, 0xFFFFFF, 1);
    planets["Totooine"][4].moveTo(325, 445);
    planets["Totooine"][4].lineTo(335, 420);
    planets["Totooine"][4].moveTo(335, 420);
    planets["Totooine"][4].lineTo(500, 420);
    planets["Totooine"][5].position.x = 375; 
    planets["Totooine"][5].position.y = 400;
    planets["Totooine"][5].scale.set(0.23);
    planets["Totooine"][6].position.x = 435; 
    planets["Totooine"][6].position.y = 400;
    planets["Totooine"][6].scale.set(0.23);
    planets["Totooine"][7].position.x = 490; 
    planets["Totooine"][7].position.y = 410;
    planets["Totooine"][7].scale.set(0.25);
    planets["Totooine"][8].position.x = 375; 
    planets["Totooine"][8].position.y = 425;
    planets["Totooine"][8].scale.set(0.18);
    planets["Totooine"][9].position.x = 425; 
    planets["Totooine"][9].position.y = 425;
    planets["Totooine"][9].scale.set(0.18);
    planets["Totooine"][10].position.x = 475; 
    planets["Totooine"][10].position.y = 400;
    planets["Totooine"][10].scale.set(0.25);
    
    planets["Naboo"] = [
        "Naboo",
        new PIXI.Sprite(planetTextures["Naboo"][1]),
        new PIXI.Text(planetTextures["Naboo"][0], initPlanetBlueStyleText),
        new PIXI.Text(planetTextures["Naboo"][0], initPlanetRedStyleText),
        new PIXI.Graphics(),
        new PIXI.Sprite(heroesTextures["darth_maul"][1]),
        new PIXI.Sprite(heroesTextures["trade_federation"][1]),
        new PIXI.Sprite(heroesTextures["b1_battle_droid"][2]),
        new PIXI.Sprite(heroesTextures["boss_nass"][2]),
        new PIXI.Sprite(heroesTextures["capitan_panaka"][1]),
        new PIXI.Sprite(heroesTextures["royal_guards"][1])
    ];
    planets["Naboo"][1].name = "naboo_planet";
    planets["Naboo"][1].position.x = 630; 
    planets["Naboo"][1].position.y = 240; 
    planets["Naboo"][1].interactive = true; 
    planets["Naboo"][1].buttonMode = true;
    planets["Naboo"][1].scale.set(0.2);
    planets["Naboo"][2].position.x = 670; 
    planets["Naboo"][2].position.y = 215; 
    planets["Naboo"][3].position.x = 670; 
    planets["Naboo"][3].position.y = 215;
    planets["Naboo"][4].lineStyle(1, 0xFFFFFF, 0.3);
    planets["Naboo"][4].drawCircle(672, 280, 39);
    planets["Naboo"][4].lineStyle(1, 0xFFFFFF, 1);
    planets["Naboo"][4].moveTo(655, 260);
    planets["Naboo"][4].lineTo(665, 235);
    planets["Naboo"][4].moveTo(665, 235);
    planets["Naboo"][4].lineTo(830, 235);
    planets["Naboo"][5].position.x = 705; 
    planets["Naboo"][5].position.y = 240;
    planets["Naboo"][5].scale.set(0.18);
    planets["Naboo"][6].position.x = 752; 
    planets["Naboo"][6].position.y = 235;
    planets["Naboo"][6].scale.set(0.22);
    planets["Naboo"][7].position.x = 805; 
    planets["Naboo"][7].position.y = 240;
    planets["Naboo"][7].scale.set(0.18);
    planets["Naboo"][8].position.x = 705; 
    planets["Naboo"][8].position.y = 240;
    planets["Naboo"][8].scale.set(0.18);
    planets["Naboo"][9].position.x = 752; 
    planets["Naboo"][9].position.y = 240;
    planets["Naboo"][9].scale.set(0.18);
    planets["Naboo"][10].position.x = 805; 
    planets["Naboo"][10].position.y = 240;
    planets["Naboo"][10].scale.set(0.18);
    
    
    planets["Endor"] = [
        "Endor",
        new PIXI.Sprite(planetTextures["Endor"][1]),
        new PIXI.Text(planetTextures["Endor"][0], initPlanetBlueStyleText),
        new PIXI.Text(planetTextures["Endor"][0], initPlanetRedStyleText),
        new PIXI.Graphics(),
        new PIXI.Sprite(heroesTextures["nute_gunray"][1]),
        new PIXI.Sprite(heroesTextures["stormtroopers"][1]),
        new PIXI.Sprite(heroesTextures["aurra_sing"][2]),
        new PIXI.Sprite(heroesTextures["alliance_to_restore_the_republic"][2]),
        new PIXI.Sprite(heroesTextures["wicket_wysri_warrick"][1]),
        new PIXI.Sprite(heroesTextures["aayla_secura"][1])
    ];
    planets["Endor"][1].name = "endor_planet";
    planets["Endor"][1].position.x = 150; 
    planets["Endor"][1].position.y = 550; 
    planets["Endor"][1].interactive = true; 
    planets["Endor"][1].buttonMode = true;
    planets["Endor"][1].scale.set(0.2);
    planets["Endor"][2].position.x = 190; 
    planets["Endor"][2].position.y = 525; 
    planets["Endor"][3].position.x = 190; 
    planets["Endor"][3].position.y = 525;
    planets["Endor"][4].lineStyle(1, 0xFFFFFF, 0.3);
    planets["Endor"][4].drawCircle(190, 590, 39);
    planets["Endor"][4].lineStyle(1, 0xFFFFFF, 1);
    planets["Endor"][4].moveTo(175, 570);
    planets["Endor"][4].lineTo(185, 545);
    planets["Endor"][4].moveTo(185, 545);
    planets["Endor"][4].lineTo(350, 545);
    planets["Endor"][5].position.x = 225; 
    planets["Endor"][5].position.y = 550;
    planets["Endor"][5].scale.set(0.18);
    planets["Endor"][6].position.x = 275; 
    planets["Endor"][6].position.y = 545;
    planets["Endor"][6].scale.set(0.2);
    planets["Endor"][7].position.x = 325; 
    planets["Endor"][7].position.y = 550;
    planets["Endor"][7].scale.set(0.19);
    planets["Endor"][8].position.x = 225; 
    planets["Endor"][8].position.y = 545;
    planets["Endor"][8].scale.set(0.20);
    planets["Endor"][9].position.x = 280; 
    planets["Endor"][9].position.y = 550;
    planets["Endor"][9].scale.set(0.18);
    planets["Endor"][10].position.x = 325; 
    planets["Endor"][10].position.y = 550;
    planets["Endor"][10].scale.set(0.18);
    
    planets["Hoth"] = [
        "Hoth",
        new PIXI.Sprite(planetTextures["Hoth"][1]),
        new PIXI.Text(planetTextures["Hoth"][0], initPlanetBlueStyleText),
        new PIXI.Text(planetTextures["Hoth"][0], initPlanetRedStyleText),
        new PIXI.Graphics(),
        new PIXI.Sprite(heroesTextures["maximilian_veers"][1]),
        new PIXI.Sprite(heroesTextures["stormtrooper_2"][2]),
        new PIXI.Sprite(heroesTextures["stormtrooper_1"][1]),
        new PIXI.Sprite(heroesTextures["general_madine"][2]),
        new PIXI.Sprite(heroesTextures["han_solo"][1]),
        new PIXI.Sprite(heroesTextures["chewbacca"][2])
    ];
    planets["Hoth"][1].name = "hoth_planet";
    planets["Hoth"][1].position.x = 700; 
    planets["Hoth"][1].position.y = 485; // 475 +10
    planets["Hoth"][1].interactive = true; 
    planets["Hoth"][1].buttonMode = true;
    planets["Hoth"][1].scale.set(0.2);
    planets["Hoth"][2].position.x = 740; 
    planets["Hoth"][2].position.y = 460; 
    planets["Hoth"][3].position.x = 740; 
    planets["Hoth"][3].position.y = 460;
    planets["Hoth"][4].lineStyle(1, 0xFFFFFF, 0.3);
    planets["Hoth"][4].drawCircle(741, 525, 39);
    planets["Hoth"][4].lineStyle(1, 0xFFFFFF, 1);
    planets["Hoth"][4].moveTo(725, 505);
    planets["Hoth"][4].lineTo(735, 480);
    planets["Hoth"][4].moveTo(735, 480);
    planets["Hoth"][4].lineTo(900, 480);
    planets["Hoth"][5].position.x = 775; 
    planets["Hoth"][5].position.y = 485;
    planets["Hoth"][5].scale.set(0.18);
    planets["Hoth"][6].position.x = 825; 
    planets["Hoth"][6].position.y = 485;
    planets["Hoth"][6].scale.set(0.18);
    planets["Hoth"][7].position.x = 875; 
    planets["Hoth"][7].position.y = 485;
    planets["Hoth"][7].scale.set(0.18);
    planets["Hoth"][8].position.x = 775; 
    planets["Hoth"][8].position.y = 485;
    planets["Hoth"][8].scale.set(0.18);
    planets["Hoth"][9].position.x = 825; 
    planets["Hoth"][9].position.y = 485;
    planets["Hoth"][9].scale.set(0.18);
    planets["Hoth"][10].position.x = 875; 
    planets["Hoth"][10].position.y = 485;
    planets["Hoth"][10].scale.set(0.18);
    
    planets["Mustafar"] = [
        "Mustafar",
        new PIXI.Sprite(planetTextures["Mustafar"][1]),
        new PIXI.Text(planetTextures["Mustafar"][0], initPlanetBlueStyleText),
        new PIXI.Text(planetTextures["Mustafar"][0], initPlanetRedStyleText),
        new PIXI.Graphics(),
        new PIXI.Sprite(heroesTextures["anakin_skywalker"][1]),
        new PIXI.Sprite(heroesTextures["palpatine"][2]),
        new PIXI.Sprite(heroesTextures["separatists"][1]),
        new PIXI.Sprite(heroesTextures["obi_wan_kenobi"][2]),
        new PIXI.Sprite(heroesTextures["padme_amidala"][1]),
        new PIXI.Sprite(heroesTextures["wat_tambor"][1])
    ];
    planets["Mustafar"][1].name = "mustafar_planet";
    planets["Mustafar"][1].position.x = 600; 
    planets["Mustafar"][1].position.y = 375;
    planets["Mustafar"][1].interactive = true; 
    planets["Mustafar"][1].buttonMode = true;
    planets["Mustafar"][1].scale.set(0.2);
    planets["Mustafar"][2].position.x = 640; 
    planets["Mustafar"][2].position.y = 350; 
    planets["Mustafar"][3].position.x = 640; 
    planets["Mustafar"][3].position.y = 350;
    planets["Mustafar"][4].lineStyle(1, 0xFFFFFF, 0.3);
    planets["Mustafar"][4].drawCircle(642, 415, 39);
    planets["Mustafar"][4].lineStyle(1, 0xFFFFFF, 1);
    planets["Mustafar"][4].moveTo(625, 395);
    planets["Mustafar"][4].lineTo(635, 370);
    planets["Mustafar"][4].moveTo(635, 370);
    planets["Mustafar"][4].lineTo(800, 370);
    planets["Mustafar"][5].position.x = 675; 
    planets["Mustafar"][5].position.y = 375;
    planets["Mustafar"][5].scale.set(0.18);
    planets["Mustafar"][6].position.x = 725; 
    planets["Mustafar"][6].position.y = 375;
    planets["Mustafar"][6].scale.set(0.18);
    planets["Mustafar"][7].position.x = 775; 
    planets["Mustafar"][7].position.y = 360;
    planets["Mustafar"][7].scale.set(0.22);
    planets["Mustafar"][8].position.x = 675; 
    planets["Mustafar"][8].position.y = 375;
    planets["Mustafar"][8].scale.set(0.18);
    planets["Mustafar"][9].position.x = 725; 
    planets["Mustafar"][9].position.y = 375;
    planets["Mustafar"][9].scale.set(0.18);
    planets["Mustafar"][10].position.x = 775; 
    planets["Mustafar"][10].position.y = 375;
    planets["Mustafar"][10].scale.set(0.18);
    
    
    planets["Dagobah"] = [
        "Dagobah",
        new PIXI.Sprite(planetTextures["Dagobah"][1]),
        new PIXI.Text(planetTextures["Dagobah"][0], initPlanetBlueStyleText),
        new PIXI.Text(planetTextures["Dagobah"][0], initPlanetRedStyleText),
        new PIXI.Graphics(),
        new PIXI.Sprite(heroesTextures["stormtroopers"][1]),
        new PIXI.Sprite(heroesTextures["clone_commander_bakara"][2]),
        new PIXI.Sprite(heroesTextures["clone_commander_cody"][1]),
        new PIXI.Sprite(heroesTextures["yoda"][1]),
        new PIXI.Sprite(heroesTextures["barriss_offee"][1]),
        new PIXI.Sprite(heroesTextures["kit_fisto"][1])
    ];
    planets["Dagobah"][1].name = "dagobah_planet";
    planets["Dagobah"][1].position.x = 200; 
    planets["Dagobah"][1].position.y = 50; 
    planets["Dagobah"][1].interactive = true; 
    planets["Dagobah"][1].buttonMode = true;
    planets["Dagobah"][1].scale.set(0.2);
    planets["Dagobah"][2].position.x = 240; 
    planets["Dagobah"][2].position.y = 25; 
    planets["Dagobah"][3].position.x = 240; 
    planets["Dagobah"][3].position.y = 25;
    planets["Dagobah"][4].lineStyle(1, 0xFFFFFF, 0.3);
    planets["Dagobah"][4].drawCircle(241, 90, 39);
    planets["Dagobah"][4].lineStyle(1, 0xFFFFFF, 1);
    planets["Dagobah"][4].moveTo(225, 70);
    planets["Dagobah"][4].lineTo(235, 45);
    planets["Dagobah"][4].moveTo(235, 45);
    planets["Dagobah"][4].lineTo(400, 45);
    planets["Dagobah"][5].position.x = 275; 
    planets["Dagobah"][5].position.y = 45;
    planets["Dagobah"][5].scale.set(0.2);
    planets["Dagobah"][6].position.x = 325; 
    planets["Dagobah"][6].position.y = 50;
    planets["Dagobah"][6].scale.set(0.18);
    planets["Dagobah"][7].position.x = 375; 
    planets["Dagobah"][7].position.y = 50;
    planets["Dagobah"][7].scale.set(0.18);
    planets["Dagobah"][8].position.x = 275; 
    planets["Dagobah"][8].position.y = 50;
    planets["Dagobah"][8].scale.set(0.18);
    planets["Dagobah"][9].position.x = 325; 
    planets["Dagobah"][9].position.y = 50;
    planets["Dagobah"][9].scale.set(0.18);
    planets["Dagobah"][10].position.x = 375; 
    planets["Dagobah"][10].position.y = 50;
    planets["Dagobah"][10].scale.set(0.18);
   
    
    planets["Bespin"] = [
        "Bespin",
        new PIXI.Sprite(planetTextures["Bespin"][1]),
        new PIXI.Text(planetTextures["Bespin"][0], initPlanetBlueStyleText),
        new PIXI.Text(planetTextures["Bespin"][0], initPlanetRedStyleText),
        new PIXI.Graphics(),
        new PIXI.Sprite(heroesTextures["boba_fett"][1]),
        new PIXI.Sprite(heroesTextures["stormtrooper_1"][1]),
        new PIXI.Sprite(heroesTextures["clone_commander_neyo"][1]),
        new PIXI.Sprite(heroesTextures["adigallia"][1]),
        new PIXI.Sprite(heroesTextures["lando_calrissian"][1]),
        new PIXI.Sprite(heroesTextures["ki_adi_mundi"][1])
    ];
    planets["Bespin"][1].name = "bespin_planet";
    planets["Bespin"][1].position.x = 5;
    planets["Bespin"][1].position.y = 125;
    planets["Bespin"][1].interactive = true; 
    planets["Bespin"][1].buttonMode = true;
    planets["Bespin"][1].scale.set(0.2);
    planets["Bespin"][2].position.x = 45; 
    planets["Bespin"][2].position.y = 100; 
    planets["Bespin"][3].position.x = 45; 
    planets["Bespin"][3].position.y = 100;
    planets["Bespin"][4].lineStyle(2, 0xFFFFFF, 0.4);
    planets["Bespin"][4].drawCircle(47.5, 165.5, 38);
    planets["Bespin"][4].lineStyle(1, 0xFFFFFF, 1);
    planets["Bespin"][4].moveTo(30, 145);
    planets["Bespin"][4].lineTo(40, 120);
    planets["Bespin"][4].moveTo(40, 120);
    planets["Bespin"][4].lineTo(205, 120);
    planets["Bespin"][5].position.x = 80; 
    planets["Bespin"][5].position.y = 125;
    planets["Bespin"][5].scale.set(0.18);
    planets["Bespin"][6].position.x = 130; 
    planets["Bespin"][6].position.y = 125;
    planets["Bespin"][6].scale.set(0.18);
    planets["Bespin"][7].position.x = 180; 
    planets["Bespin"][7].position.y = 125;
    planets["Bespin"][7].scale.set(0.18);
    planets["Bespin"][8].position.x = 80; 
    planets["Bespin"][8].position.y = 125;
    planets["Bespin"][8].scale.set(0.18);
    planets["Bespin"][9].position.x = 130; 
    planets["Bespin"][9].position.y = 125;
    planets["Bespin"][9].scale.set(0.18);
    planets["Bespin"][10].position.x = 180; 
    planets["Bespin"][10].position.y = 125;
    planets["Bespin"][10].scale.set(0.18);

   
    planets["Geonosis"] = [
        "Geonosis",
        new PIXI.Sprite(planetTextures["Geonosis"][1]),
        new PIXI.Text(planetTextures["Geonosis"][0], initPlanetBlueStyleText),
        new PIXI.Text(planetTextures["Geonosis"][0], initPlanetRedStyleText),
        new PIXI.Graphics(),
        new PIXI.Sprite(heroesTextures["b1_battle_droid"][2]),
        new PIXI.Sprite(heroesTextures["dooku"][1]),
        new PIXI.Sprite(heroesTextures["red_battle_droid"][1]),
        new PIXI.Sprite(heroesTextures["republic_clone_army"][1]),
        new PIXI.Sprite(heroesTextures["poggle_the_lesser"][1]),
        new PIXI.Sprite(heroesTextures["saesee_tiin"][2])
    ];
    planets["Geonosis"][1].name = "geonosis_planet";
    planets["Geonosis"][1].position.x = 750;
    planets["Geonosis"][1].position.y = 600; 
    planets["Geonosis"][1].interactive = true; 
    planets["Geonosis"][1].buttonMode = true;
    planets["Geonosis"][1].scale.set(0.2);
    planets["Geonosis"][2].position.x = 790; 
    planets["Geonosis"][2].position.y = 575; 
    planets["Geonosis"][3].position.x = 790; 
    planets["Geonosis"][3].position.y = 575;
    planets["Geonosis"][4].lineStyle(1, 0xFFFFFF, 0.3);
    planets["Geonosis"][4].drawCircle(790, 639, 39);
    planets["Geonosis"][4].lineStyle(1, 0xFFFFFF, 1);
    planets["Geonosis"][4].moveTo(775, 620);
    planets["Geonosis"][4].lineTo(785, 595);
    planets["Geonosis"][4].moveTo(785, 595);
    planets["Geonosis"][4].lineTo(950, 595);
    planets["Geonosis"][5].position.x = 825; 
    planets["Geonosis"][5].position.y = 600;
    planets["Geonosis"][5].scale.set(0.18);
    planets["Geonosis"][6].position.x = 875; 
    planets["Geonosis"][6].position.y = 600;
    planets["Geonosis"][6].scale.set(0.19);
    planets["Geonosis"][7].position.x = 925; 
    planets["Geonosis"][7].position.y = 600;
    planets["Geonosis"][7].scale.set(0.18);
    planets["Geonosis"][8].position.x = 815; 
    planets["Geonosis"][8].position.y = 585;
    planets["Geonosis"][8].scale.set(0.23);
    planets["Geonosis"][9].position.x = 880; 
    planets["Geonosis"][9].position.y = 600;
    planets["Geonosis"][9].scale.set(0.18);
    planets["Geonosis"][10].position.x = 925; 
    planets["Geonosis"][10].position.y = 600;
    planets["Geonosis"][10].scale.set(0.18);
    
    planets["Alderaan"] = [
        "Alderaan",
        new PIXI.Sprite(planetTextures["Alderaan"][1]),
        new PIXI.Text(planetTextures["Alderaan"][0], initPlanetBlueStyleText),
        new PIXI.Text(planetTextures["Alderaan"][0], initPlanetRedStyleText),
        new PIXI.Graphics(),
        new PIXI.Sprite(heroesTextures["admiral_ozzel"][1]),
        new PIXI.Sprite(heroesTextures["stormtroopers"][1]),
        new PIXI.Sprite(heroesTextures["rune_haako"][1]),
        new PIXI.Sprite(heroesTextures["bail_organa"][1]),
        new PIXI.Sprite(heroesTextures["leia_organa"][1]),
        new PIXI.Sprite(heroesTextures["kapitan_antilles"][1])
    ];
    planets["Alderaan"][1].name = "alderaan_planet";
    planets["Alderaan"][1].position.x = 50; 
    planets["Alderaan"][1].position.y = 350; 
    planets["Alderaan"][1].interactive = true; 
    planets["Alderaan"][1].buttonMode = true;
    planets["Alderaan"][1].scale.set(0.2);
    planets["Alderaan"][2].position.x = 90; 
    planets["Alderaan"][2].position.y = 325; 
    planets["Alderaan"][3].position.x = 90; 
    planets["Alderaan"][3].position.y = 325;
    planets["Alderaan"][4].lineStyle(1, 0xFFFFFF, 0.3);
    planets["Alderaan"][4].drawCircle(90, 390, 39);
    planets["Alderaan"][4].lineStyle(1, 0xFFFFFF, 1);
    planets["Alderaan"][4].moveTo(75, 370);
    planets["Alderaan"][4].lineTo(85, 345);
    planets["Alderaan"][4].moveTo(85, 345);
    planets["Alderaan"][4].lineTo(250, 345);
    planets["Alderaan"][5].position.x = 125; 
    planets["Alderaan"][5].position.y = 350;
    planets["Alderaan"][5].scale.set(0.18);
    planets["Alderaan"][6].position.x = 175; 
    planets["Alderaan"][6].position.y = 345;
    planets["Alderaan"][6].scale.set(0.2);
    planets["Alderaan"][7].position.x = 225; 
    planets["Alderaan"][7].position.y = 350;
    planets["Alderaan"][7].scale.set(0.18);
    planets["Alderaan"][8].position.x = 125; 
    planets["Alderaan"][8].position.y = 350;
    planets["Alderaan"][8].scale.set(0.18);
    planets["Alderaan"][9].position.x = 175; 
    planets["Alderaan"][9].position.y = 350;
    planets["Alderaan"][9].scale.set(0.17);
    planets["Alderaan"][10].position.x = 225; 
    planets["Alderaan"][10].position.y = 350;
    planets["Alderaan"][10].scale.set(0.18);
    
        
    planets["Kamino"] = [
        "Kamino",
        new PIXI.Sprite(planetTextures["Kamino"][1]),
        new PIXI.Text(planetTextures["Kamino"][0], initPlanetBlueStyleText),
        new PIXI.Text(planetTextures["Kamino"][0], initPlanetRedStyleText),
        new PIXI.Graphics(),
        new PIXI.Sprite(heroesTextures["jango_fett"][1]),
        new PIXI.Sprite(heroesTextures["republic_clone_army"][1]),
        new PIXI.Sprite(heroesTextures["clone_commander_rex"][1]),
        new PIXI.Sprite(heroesTextures["plo_koon"][1]),
        new PIXI.Sprite(heroesTextures["clone_commander_bakara"][1]),
        new PIXI.Sprite(heroesTextures["clone_commander_neyo"][1])
    ];
    planets["Kamino"][1].name = "kamino_planet";
    planets["Kamino"][1].position.x = 400; 
    planets["Kamino"][1].position.y = 275; 
    planets["Kamino"][1].interactive = true; 
    planets["Kamino"][1].buttonMode = true;
    planets["Kamino"][1].scale.set(0.2);
    planets["Kamino"][2].position.x = 440; 
    planets["Kamino"][2].position.y = 250; 
    planets["Kamino"][3].position.x = 440; 
    planets["Kamino"][3].position.y = 250;
    planets["Kamino"][4].lineStyle(1, 0xFFFFFF, 0.3);
    planets["Kamino"][4].drawCircle(441, 315, 39);
    planets["Kamino"][4].lineStyle(1, 0xFFFFFF, 1);
    planets["Kamino"][4].moveTo(425, 295);
    planets["Kamino"][4].lineTo(435, 270);
    planets["Kamino"][4].moveTo(435, 270);
    planets["Kamino"][4].lineTo(600, 270);
    planets["Kamino"][5].position.x = 475; 
    planets["Kamino"][5].position.y = 275;
    planets["Kamino"][5].scale.set(0.18);
    planets["Kamino"][6].position.x = 515; 
    planets["Kamino"][6].position.y = 260;
    planets["Kamino"][6].scale.set(0.22);
    planets["Kamino"][7].position.x = 575; 
    planets["Kamino"][7].position.y = 275;
    planets["Kamino"][7].scale.set(0.18);
    planets["Kamino"][8].position.x = 475; 
    planets["Kamino"][8].position.y = 275;
    planets["Kamino"][8].scale.set(0.18);
    planets["Kamino"][9].position.x = 525; 
    planets["Kamino"][9].position.y = 275;
    planets["Kamino"][9].scale.set(0.18);
    planets["Kamino"][10].position.x = 575; 
    planets["Kamino"][10].position.y = 275;
    planets["Kamino"][10].scale.set(0.18);
   
    
    planets["DeathStar"] = [
        "DeathStar",
        new PIXI.Sprite(planetTextures["DeathStar"][1]),
        new PIXI.Text(planetTextures["DeathStar"][0], initPlanetBlueStyleText),
        new PIXI.Text(planetTextures["DeathStar"][0], initPlanetRedStyleText),
        new PIXI.Graphics(),
        new PIXI.Sprite(heroesTextures["darth_vader"][1]),
        new PIXI.Sprite(heroesTextures["darth_sidious"][1]),
        new PIXI.Sprite(heroesTextures["commander_jerjerrod"][1]),
        new PIXI.Sprite(heroesTextures["luke_skywalker"][1]),
        new PIXI.Sprite(heroesTextures["luke_skywalker"][1]),
        new PIXI.Sprite(heroesTextures["luke_skywalker"][1])
    ];
    planets["DeathStar"][1].name = "deathstar_planet";
    planets["DeathStar"][1].position.x = 150;
    planets["DeathStar"][1].position.y = 245; //225 + 20
    planets["DeathStar"][1].interactive = true; 
    planets["DeathStar"][1].buttonMode = true;
    planets["DeathStar"][1].scale.set(0.2);
    planets["DeathStar"][2].position.x = 190; 
    planets["DeathStar"][2].position.y = 220; 
    planets["DeathStar"][3].position.x = 190; 
    planets["DeathStar"][3].position.y = 220;
    planets["DeathStar"][4].lineStyle(1, 0xFFFFFF, 0.3);
    planets["DeathStar"][4].drawCircle(190, 285, 39);
    planets["DeathStar"][4].lineStyle(1, 0xFFFFFF, 1);
    planets["DeathStar"][4].moveTo(175, 265);
    planets["DeathStar"][4].lineTo(185, 240);
    planets["DeathStar"][4].moveTo(185, 240);
    planets["DeathStar"][4].lineTo(350, 240);
    planets["DeathStar"][5].position.x = 225; 
    planets["DeathStar"][5].position.y = 245;
    planets["DeathStar"][5].scale.set(0.18);
    planets["DeathStar"][6].position.x = 275; 
    planets["DeathStar"][6].position.y = 240;
    planets["DeathStar"][6].scale.set(0.20);
    planets["DeathStar"][7].position.x = 325; 
    planets["DeathStar"][7].position.y = 245;
    planets["DeathStar"][7].scale.set(0.18);
    planets["DeathStar"][8].position.x = 225; 
    planets["DeathStar"][8].position.y = 245;
    planets["DeathStar"][8].scale.set(0.18);
    planets["DeathStar"][9].position.x = 275; 
    planets["DeathStar"][9].position.y = 245;
    planets["DeathStar"][9].scale.set(0.18);
    planets["DeathStar"][10].position.x = 325; 
    planets["DeathStar"][10].position.y = 245;
    planets["DeathStar"][10].scale.set(0.18);
    
    
    planets["Utapau"] = [
        "Utapau",
        new PIXI.Sprite(planetTextures["Utapau"][1]),
        new PIXI.Text(planetTextures["Utapau"][0], initPlanetBlueStyleText),
        new PIXI.Text(planetTextures["Utapau"][0], initPlanetRedStyleText),
        new PIXI.Graphics(),
        new PIXI.Sprite(heroesTextures["separatists"][1]),
        new PIXI.Sprite(heroesTextures["general_grievous"][1]),
        new PIXI.Sprite(heroesTextures["clone_commander_cody"][1]),
        new PIXI.Sprite(heroesTextures["shaak_ti"][1]),
        new PIXI.Sprite(heroesTextures["tion_medon"][1]),
        new PIXI.Sprite(heroesTextures["bib_fortuna"][1])
    ];
    planets["Utapau"][1].name = "utapau_planet";
    planets["Utapau"][1].position.x = 700; 
    planets["Utapau"][1].position.y = 50; 
    planets["Utapau"][1].interactive = true; 
    planets["Utapau"][1].buttonMode = true;
    planets["Utapau"][1].scale.set(0.2);
    planets["Utapau"][2].position.x = 740; 
    planets["Utapau"][2].position.y = 25; 
    planets["Utapau"][3].position.x = 740; 
    planets["Utapau"][3].position.y = 25;
    planets["Utapau"][4].lineStyle(1, 0xFFFFFF, 0.3);
    planets["Utapau"][4].drawCircle(741, 90, 39);
    planets["Utapau"][4].lineStyle(1, 0xFFFFFF, 1);
    planets["Utapau"][4].moveTo(725, 70);
    planets["Utapau"][4].lineTo(735, 45);
    planets["Utapau"][4].moveTo(735, 45);
    planets["Utapau"][4].lineTo(900, 45);
    planets["Utapau"][5].position.x = 770; 
    planets["Utapau"][5].position.y = 40;
    planets["Utapau"][5].scale.set(0.22);
    planets["Utapau"][6].position.x = 820; 
    planets["Utapau"][6].position.y = 40;
    planets["Utapau"][6].scale.set(0.25);
    planets["Utapau"][7].position.x = 875; 
    planets["Utapau"][7].position.y = 50;
    planets["Utapau"][7].scale.set(0.18);
    planets["Utapau"][8].position.x = 775; 
    planets["Utapau"][8].position.y = 50;
    planets["Utapau"][8].scale.set(0.18);
    planets["Utapau"][9].position.x = 825; 
    planets["Utapau"][9].position.y = 50;
    planets["Utapau"][9].scale.set(0.18);
    planets["Utapau"][10].position.x = 875; 
    planets["Utapau"][10].position.y = 50;
    planets["Utapau"][10].scale.set(0.18);
    
    
    
    planets["Saleucami"] = [
        "Saleucami",
        new PIXI.Sprite(planetTextures["Saleucami"][1]),
        new PIXI.Text(planetTextures["Saleucami"][0], initPlanetBlueStyleText),
        new PIXI.Text(planetTextures["Saleucami"][0], initPlanetRedStyleText),
        new PIXI.Graphics(),
        new PIXI.Sprite(heroesTextures["clone_commander_rex"][1]),
        new PIXI.Sprite(heroesTextures["general_grievous"][1]),
        new PIXI.Sprite(heroesTextures["b1_battle_droid"][1]),
        new PIXI.Sprite(heroesTextures["eeth_koth"][1]),
        new PIXI.Sprite(heroesTextures["mon_motma"][1]),
        new PIXI.Sprite(heroesTextures["c_3po"][2])
    ];
    planets["Saleucami"][1].name = "saleucami_planet";
    planets["Saleucami"][1].position.x = 810;
    planets["Saleucami"][1].position.y = 155;
    planets["Saleucami"][1].interactive = true; 
    planets["Saleucami"][1].buttonMode = true;
    planets["Saleucami"][1].scale.set(0.2);
    planets["Saleucami"][2].position.x = 850; 
    planets["Saleucami"][2].position.y = 130; 
    planets["Saleucami"][3].position.x = 850; 
    planets["Saleucami"][3].position.y = 130;
    planets["Saleucami"][4].lineStyle(1, 0xFFFFFF, 0.3);
    planets["Saleucami"][4].drawCircle(850, 195, 39);
    planets["Saleucami"][4].lineStyle(1, 0xFFFFFF, 1);
    planets["Saleucami"][4].moveTo(835, 175);
    planets["Saleucami"][4].lineTo(845, 150);
    planets["Saleucami"][4].moveTo(845, 150);
    planets["Saleucami"][4].lineTo(1010, 150);
    
    planets["Saleucami"][5].position.x = 885; 
    planets["Saleucami"][5].position.y = 155;
    planets["Saleucami"][5].scale.set(0.18);
    planets["Saleucami"][6].position.x = 930; 
    planets["Saleucami"][6].position.y = 140;
    planets["Saleucami"][6].scale.set(0.25);
    planets["Saleucami"][7].position.x = 985; 
    planets["Saleucami"][7].position.y = 155;
    planets["Saleucami"][7].scale.set(0.18);
    
    planets["Saleucami"][8].position.x = 885; 
    planets["Saleucami"][8].position.y = 155;
    planets["Saleucami"][8].scale.set(0.18);
    planets["Saleucami"][9].position.x = 935; 
    planets["Saleucami"][9].position.y = 155;
    planets["Saleucami"][9].scale.set(0.18);
    planets["Saleucami"][10].position.x = 985; 
    planets["Saleucami"][10].position.y = 155;
    planets["Saleucami"][10].scale.set(0.18);
    
    
    
    planets["Jakku"] = [
        "Jakku",                                                                                        // 0 - наименование
        new PIXI.Sprite(planetTextures["Jakku"][1]),                                                    // 1 - текстура планеты
        new PIXI.Text(planetTextures["Jakku"][0], initPlanetBlueStyleText),                             // 2 - имя планеты (свет)
        new PIXI.Text(planetTextures["Jakku"][0], initPlanetRedStyleText),                              // 3 - имя планеты (тьма)
        new PIXI.Graphics(),                                                                            // 4 - графика
        new PIXI.Sprite(heroesTextures["kylo_ren"][1]),                                                 // 5 - персонаж (тьма)
        new PIXI.Sprite(heroesTextures["phasma"][1]),                                                   // 6 - персонажи (тьма)
        new PIXI.Sprite(heroesTextures["stormtrooper_1"][1]),                                           // 7 - персонажи (тьма)
        new PIXI.Sprite(heroesTextures["rey"][1]),                                                      // 8 - персонажи (свет)
        new PIXI.Sprite(heroesTextures["finn"][1]),                                                     // 9 - персонажи (свет)
        new PIXI.Sprite(heroesTextures["poe_dameron"][1])                                               // 10 - персонажи (свет)
    ];
    planets["Jakku"][1].name = "jakku_planet";
    planets["Jakku"][1].position.x = 450; 
    planets["Jakku"][1].position.y = 75; 
    planets["Jakku"][1].interactive = true; 
    planets["Jakku"][1].buttonMode = true;
    planets["Jakku"][1].scale.set(0.2);
    planets["Jakku"][2].position.x = 490; 
    planets["Jakku"][2].position.y = 50; 
    planets["Jakku"][3].position.x = 490; 
    planets["Jakku"][3].position.y = 50;
    planets["Jakku"][4].lineStyle(1, 0xFFFFFF, 0.3);
    planets["Jakku"][4].drawCircle(491, 115, 39);
    planets["Jakku"][4].lineStyle(1, 0xFFFFFF, 1);
    planets["Jakku"][4].moveTo(475, 95);
    planets["Jakku"][4].lineTo(485, 70);
    planets["Jakku"][4].moveTo(485, 70);
    planets["Jakku"][4].lineTo(650, 70);
    planets["Jakku"][5].position.x = 525; 
    planets["Jakku"][5].position.y = 75;
    planets["Jakku"][5].scale.set(0.18);
    planets["Jakku"][6].position.x = 575; 
    planets["Jakku"][6].position.y = 75;
    planets["Jakku"][6].scale.set(0.18);
    planets["Jakku"][7].position.x = 625; 
    planets["Jakku"][7].position.y = 75;
    planets["Jakku"][7].scale.set(0.18);
    planets["Jakku"][8].position.x = 525; 
    planets["Jakku"][8].position.y = 75;
    planets["Jakku"][8].scale.set(0.18);
    planets["Jakku"][9].position.x = 575; 
    planets["Jakku"][9].position.y = 75;
    planets["Jakku"][9].scale.set(0.18);
    planets["Jakku"][10].position.x = 625; 
    planets["Jakku"][10].position.y = 75;
    planets["Jakku"][10].scale.set(0.18);
    
    return planets;
}var renderer;
var stage;

function init()
{
    renderer = PIXI.autoDetectRenderer(MAIN_WIDTH, MAIN_HEIGH,{backgroundColor : MAIN_BACKGROUND_COLOR, antialias : true});
    document.body.appendChild(renderer.view);
    stage = new PIXI.Container();

    draw();

    preloaderCreate();		// Запускаем загрузку ассетов
    
    /* Инициализация ВКонтакте */
    VK.init(function() {
        apiId: 5170657;
    });
}

function draw() 
{
    requestAnimationFrame(draw);
    renderer.render(stage);
}

window.addEventListener("load", init, false);

 var mapStage;
var mapSprite;
var mapStartPosX;
var mapStartPosY;
var mapDesktopLineGraphics;

function mapCreate() 
{ 
    mapStage = new PIXI.Container();
    stage.addChild(mapStage);
    
    mapSpace();
    mapCreatePlanets();
    mapCreateInterface()
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
    for (var key in userMapPlanets)
    {
        mapSprite.addChild(userMapPlanets[key][1]);
        mapSprite.addChild(userMapPlanets[key][4]);
        if(side === SIDE_JEDI)
        {
            mapSprite.addChild(userMapPlanets[key][2]);
            if(key !== "Coruscant")
            {
                mapSprite.addChild(userMapPlanets[key][5]);
                mapSprite.addChild(userMapPlanets[key][6]);
                mapSprite.addChild(userMapPlanets[key][7]);
            }
        }
        if(side === SIDE_SITH) 
        {
            mapSprite.addChild(userMapPlanets[key][3]);
            if(key !== "DeathStar")
            {
                mapSprite.addChild(userMapPlanets[key][8]);
                mapSprite.addChild(userMapPlanets[key][9]);
                mapSprite.addChild(userMapPlanets[key][10]);
            }
        }
    }
}

function mapCreateInterface()
{
    if(side === SIDE_JEDI)
    {
        mapBorderBlue();
        mapDesktopBlue();
    }
    if(side === SIDE_SITH)
    {
        mapBorderRed();
        mapDesktopRed();
    }
}

function mapBorderBlue()
{
    var graphics = new PIXI.Graphics(); 

    graphics.lineStyle(2, 0x0000FF, 1);
    graphics.beginFill(0x000000, 0);
    graphics.drawRect(10, 10, 840, 710);
    
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
    graphics.drawCircle(855, 550, 4);
    graphics.endFill();
    
    graphics.lineStyle(2, 0xFFFFFF, 1);
    graphics.moveTo(855,550);
    graphics.lineTo(855, 5);
    graphics.moveTo(855,5);
    graphics.lineTo(5, 5);
    
    graphics.lineStyle(0);
    graphics.beginFill(0xFFFFFF, 1);
    graphics.drawCircle(5, 5, 4);
    graphics.endFill();
    
    mapStage.addChild(graphics);
}

function mapDesktopBlue()
{
    var graphics = new PIXI.Graphics(); 
    graphics.lineStyle(2, 0x0000FF, 1);
    graphics.beginFill(0x0000FF, 0.2);
    graphics.moveTo(15, 610);
    graphics.lineTo(350, 610);
    graphics.lineTo(350, 715);
    graphics.lineTo(15, 715);
    graphics.endFill
    for(var i = 0; i < 35; i++)
    {
        graphics.lineStyle(1, 0x0000FF, 0.5);
        graphics.moveTo(15, 610+(3*i));
        graphics.lineTo(350, 610+(3*i));
    }
    mapStage.addChild(graphics);
    
    mapDesktopLineGraphics = new PIXI.Graphics(); 
    mapDesktopLineGraphics.lineStyle(10, 0x0000FF, 0.3);
    mapDesktopLineGraphics.moveTo(15,615);
    mapDesktopLineGraphics.lineTo(350, 615);
    mapStage.addChild(mapDesktopLineGraphics);
    mapDesktopLineGraphicsTween();
}

function mapBorderRed()
{
    var graphics = new PIXI.Graphics(); 

    graphics.lineStyle(2, 0xFF0000, 1);
    graphics.beginFill(0x000000, 0);
    graphics.drawRect(10, 10, 840, 710);
    
    graphics.lineStyle(0);
    graphics.beginFill(0xFFFF00, 1);
    graphics.drawCircle(5, 600,4);
    graphics.endFill();
    
    graphics.lineStyle(2, 0xFFFF00, 1);
    graphics.moveTo(5,600);
    graphics.lineTo(5, 725);
    graphics.moveTo(5,725);
    graphics.lineTo(650, 725);
    graphics.moveTo(650,725);
    graphics.lineTo(670, 710);
    graphics.moveTo(670,710);
    graphics.lineTo(840, 710);
    
    graphics.lineStyle(0);
    graphics.beginFill(0xFFFF00, 1);
    graphics.drawCircle(855, 550, 4);
    graphics.endFill();
    
    graphics.lineStyle(2, 0xFFFF00, 1);
    graphics.moveTo(855,550);
    graphics.lineTo(855, 5);
    graphics.moveTo(855,5);
    graphics.lineTo(5, 5);
    
    graphics.lineStyle(0);
    graphics.beginFill(0xFFFF00, 1);
    graphics.drawCircle(5, 5, 4);
    graphics.endFill();
    
    mapStage.addChild(graphics);
}

function mapDesktopRed()
{
    var graphics = new PIXI.Graphics(); 
    graphics.lineStyle(2, 0x800000, 1);
    graphics.beginFill(0x800000, 0.2);
    graphics.moveTo(15, 610);
    graphics.lineTo(350, 610);
    graphics.lineTo(350, 715);
    graphics.lineTo(15, 715);
    graphics.endFill
    for(var i = 0; i < 35; i++)
    {
        graphics.lineStyle(1, 0x800000, 0.5);
        graphics.moveTo(15, 610+(3*i));
        graphics.lineTo(350, 610+(3*i));
    }
    mapStage.addChild(graphics);
    
    mapDesktopLineGraphics = new PIXI.Graphics(); 
    mapDesktopLineGraphics.lineStyle(10, 0x800000, 0.3);
    mapDesktopLineGraphics.moveTo(15,615);
    mapDesktopLineGraphics.lineTo(350, 615);
    mapStage.addChild(mapDesktopLineGraphics);
    mapDesktopLineGraphicsTween();
}

function mapDesktopLineGraphicsTween()
{
    createjs.Tween.get(mapDesktopLineGraphics, {loop: true}) 
            .to({x: 0, y: 95}, 2500, createjs.Ease.getPowInOut(3));
    createjs.Ticker.setFPS(60);
}var menuStage;
var menuStarsSprite;
var menuDeathStarSprite;
var menuShip1Sprite;
var menuShip2Sprite;
var menuShip3Sprite;
var menuLineMessageGraphics;

var menuStyleDroidText = { font : 'bold 14px Arial', fill : '#FFFFFF', stroke : '#0090F0', strokeThickness : 1, wordWrap : true, wordWrapWidth : 175 }; 
var menuStyleButtonText = { font : 'bold 14px Arial', fill : '#FFFFFF', stroke : '#0090F0', strokeThickness : 1, wordWrap : true, wordWrapWidth : 200 }; 

function menuCreate()
{
    menuStage = new PIXI.Container(); 
    stage.addChild(menuStage); 
    
    soundPlayStarWarsThemeSong();
    
    menuStars();
    menuDeathStar();
    menuShip2();
    menuShip3();
    menuShip1();

    menuButtonPanel();
    menuBorder();
    menuLogo();
    menuDroid();

    menuBackgroundParallaxTween();
} 

function menuRemove() 
{ 
    stage.removeChild(menuStage); 
    menuStage = null; 
}

function menuStars()
{
    menuStarsSprite = new PIXI.Sprite(stars1Texture); 
    menuStarsSprite.position.x = 0; 
    menuStarsSprite.position.y = 0; 
    menuStarsSprite.scale.set(1.0); 
    menuStage.addChild(menuStarsSprite);
}

function menuBorder()
{
    var graphics = new PIXI.Graphics(); 

    graphics.lineStyle(2, 0x0000FF, 1);
    graphics.beginFill(0x000000, 0);
    graphics.drawRect(10, 10, 840, 710);

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

    menuStage.addChild(graphics);
}

function menuButtonPanel()
{
    var graphics = new PIXI.Graphics(); 
    graphics.lineStyle(2, 0x0000FF, 0);
    graphics.beginFill(0x0000FF, 0.4);
    graphics.drawRect(23, 20, 347, 700);
    menuStage.addChild(graphics);
    
    var textArr = ["НАЧАТЬ ИГРУ", "НАСТРОЙКИ", "ПРИГЛАСИТЬ"];
    
    for(var i = 0; i < textArr.length; i++)
    {
        var button = new PIXI.extras.MovieClip(animTexButtonBlue); 
        button.name = "button_" + i;
        button.position.x = 85; 
        button.position.y = 350 + (75 * i); 
        button.interactive = true; 
        button.buttonMode = true; 
        button.loop = false; 
        button.animationSpeed = 0.2;
        button.onComplete = onMenuButtonUpdate;
	
    
        button.tap = onMenuButtonClick; 
        button.click = onMenuButtonClick; 
        button.on('mouseover', onMenuButtonOver);
        button.on('mouseout', onMenuButtonOut);

        var text = new PIXI.Text(textArr[i], menuStyleButtonText); 
        text.x = button.width / 3.8;
        text.y = button.height / 3;

        button.addChild(text); 
        menuStage.addChild(button);
    }
    
}

function onMenuButtonOver()
{
    this.isOver = true;
    this.gotoAndPlay(1);
}

function onMenuButtonOut()
{
    this.isOver = false;
    this.gotoAndStop(0);
}

function onMenuButtonUpdate()
{
    if(this.isOver)
    {
        this.gotoAndPlay(1);
    }else{
        this.gotoAndStop(0);
    }
}

function onMenuButtonClick() 
{
    switch (this.name)
    {
        case "button_0":        // Начать игру
            sideCreate();
            menuRemove();
            break;
        case "button_1":        // Настройки игры
            settingsCreate();
            break;
        case "button_2":        // Позвать друзей ВК
            //VK.callMethod("showInviteBox");
            testCreate();
            menuRemove();
            break;
        
        default:
            break;
    }
    
}

function menuLogo()
{
    var textureSprite = new PIXI.Sprite(starwarsTexture); 
    textureSprite.position.x = 25; 
    textureSprite.position.y = 15; 
    menuStage.addChild(textureSprite);
}

function menuDeathStar()
{
    menuDeathStarSprite = new PIXI.Sprite(deathstarTexture); 
    menuDeathStarSprite.position.x = 300; 
    menuDeathStarSprite.position.y = 100; 
    menuStage.addChild(menuDeathStarSprite);
}

function menuDroid()
{
    var textureSprite = new PIXI.Sprite(r2d2DroidBlueRightTexture); 
    textureSprite.position.x = 700; 
    textureSprite.position.y = 550; 
    textureSprite.scale.set(0.4);
    menuStage.addChild(textureSprite);

    var graphics = new PIXI.Graphics(); 
    graphics.lineStyle(2, 0x0080C0, 1);
    graphics.beginFill(0x0080C0, 0.2);
    graphics.moveTo(735,575);
    graphics.lineTo(550, 575);
    graphics.lineTo(550, 300);
    graphics.lineTo(735, 300);
    graphics.endFill
    for(var i = 0; i < 92; i++)
    {
        graphics.lineStyle(1, 0x0090F0, 0.5);
        graphics.moveTo(735,300+(3*i));
        graphics.lineTo(550, 300+(3*i));
    }
    menuStage.addChild(graphics);

    menuDroidMessage();

    menuLineMessageGraphics = new PIXI.Graphics(); 
    menuLineMessageGraphics.lineStyle(10, 0x0090F0, 0.3);
    menuLineMessageGraphics.moveTo(735,305);
    menuLineMessageGraphics.lineTo(550, 305);
    menuStage.addChild(menuLineMessageGraphics);
    menuLineMessageGraphicsTween();
}

function menuLineMessageGraphicsTween()
{
    createjs.Tween.get(menuLineMessageGraphics, {loop: true}) 
            .to({x: 0, y: 265}, 2500, createjs.Ease.getPowInOut(3));
    createjs.Ticker.setFPS(60); 
}

function menuDroidMessage()
{
    menuText = new PIXI.Text("\nДобро пожаловать на путь силы. \nВаши способности превышают способности обычных людей. \nВы тут потому что вы были избраны. \n\nНажмите кнопку \n''Начать игру'' \n\nИ да пребудет с Вами Сила!", menuStyleDroidText); 
    menuText.x = 555; 
    menuText.y = 300; 
    menuStage.addChild(menuText);
}

function menuShip1()
{
    menuShip1Sprite = new PIXI.Sprite(ship1Texture); 
    menuShip1Sprite.position.x = -375; 
    menuShip1Sprite.position.y = 250; 
    menuStage.addChild(menuShip1Sprite);
}

function menuShip2()
{
    menuShip2Sprite = new PIXI.Sprite(ship2Texture); 
    menuShip2Sprite.position.x = 900; 
    menuShip2Sprite.position.y = 150; 
    menuStage.addChild(menuShip2Sprite);
}

function menuShip3()
{
    menuShip3Sprite = new PIXI.Sprite(ship3Texture); 
    menuShip3Sprite.position.x = 50; 
    menuShip3Sprite.position.y = 150; 
    menuStage.addChild(menuShip3Sprite);
}

function menuBackgroundParallaxTween()
{
    createjs.Tween.get(menuStarsSprite, {loop: true}) 
            .to({x: -50, y: 0}, 25000, createjs.Ease.getPowInOut(3))
            .to({x: -50, y: -50}, 25000, createjs.Ease.getPowInOut(3))
            .to({x: 0, y: -50}, 25000, createjs.Ease.getPowInOut(3))
            .to({x: 0, y: 0}, 25000, createjs.Ease.getPowInOut(3));

    createjs.Tween.get(menuDeathStarSprite, {loop: true}) 
            .to({x: 200, y: 100}, 25000, createjs.Ease.getPowInOut(3))
            .to({x: 200, y: 0}, 25000, createjs.Ease.getPowInOut(3))
            .to({x: 300, y: 0}, 25000, createjs.Ease.getPowInOut(3))
            .to({x: 300, y: 100}, 25000, createjs.Ease.getPowInOut(3));

    createjs.Tween.get(menuShip3Sprite, {loop: true}) 
            .to({x: -150, y: 150}, 25000, createjs.Ease.getPowInOut(3))
            .to({x: -150, y: 0}, 25000, createjs.Ease.getPowInOut(3))
            .to({x: 50, y: 0}, 25000, createjs.Ease.getPowInOut(3))
            .to({x: 50, y: 150}, 25000, createjs.Ease.getPowInOut(3));

    createjs.Tween.get(menuShip1Sprite, {loop: true}) 
            .to({x: 1000, y: 1000}, 5000, createjs.Ease.getPowInOut(3));

    createjs.Tween.get(menuShip2Sprite, {loop: true}) 
            .to({x: -250, y: 350}, 5000, createjs.Ease.getPowInOut(3));


    createjs.Ticker.setFPS(60); 
}var preloaderStage;
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
    
    loader.add('sideDarthVaderAtlas','./assets/image/atlas/side_darth_vader.json');

    loader.add('planet_light','./assets/image/textures/planets/planet_light.png');
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
    loader.add('jakku_planet','./assets/image/textures/planets/jakku.png');
    loader.add('jakku_landscape','./assets/image/textures/planets/jakku_landscape.jpg');

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
    loader.add('finn_lr','./assets/image/textures/personages/finn_lr.png');
    loader.add('finn_rl','./assets/image/textures/personages/finn_rl.png');
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
    loader.add('kylo_ren','./assets/image/textures/personages/kylo_ren.png');
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
    loader.add('phasma','./assets/image/textures/personages/phasma.png');
    loader.add('plo_koon','./assets/image/textures/personages/plo_koon.png');
    loader.add('poe_dameron','./assets/image/textures/personages/poe_dameron.png');
    loader.add('poggle_the_lesser','./assets/image/textures/personages/poggle_the_lesser.png');
    loader.add('qui_gon_jinn_lr','./assets/image/textures/personages/qui_gon_jinn_lr.png');
    loader.add('qui_gon_jinn_rl','./assets/image/textures/personages/qui_gon_jinn_rl.png');
    loader.add('red_battle_droid_lr','./assets/image/textures/personages/red_battle_droid_lr.png');
    loader.add('red_battle_droid_rl','./assets/image/textures/personages/red_battle_droid_rl.png');
    loader.add('republic_clone_army','./assets/image/textures/personages/republic_clone_army.png');
    loader.add('rey','./assets/image/textures/personages/rey.png');
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
    
    animTest = loadAnimationTextures(8, 'dv_');
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
    
    animTexSideDarthVader = loadAnimationTextures(16, 'side_darth_vader_');
    
    planetTextures = new Object();
    planetTextures["Coruscant"] = ["Корусант", res.coruscant_planet.texture, res.coruscant_landscape.texture, res.planet_light.texture];
    planetTextures["Totooine"] = ["Татуин", res.tatooine_planet.texture, res.tatooine_landscape.texture, res.planet_light.texture];
    planetTextures["Naboo"] = ["Набу", res.naboo_planet.texture, res.naboo_landscape.texture, res.planet_light.texture];
    planetTextures["Endor"] = ["Эндор", res.endor_planet.texture, res.endor_landscape.texture, res.planet_light.texture];
    planetTextures["Hoth"] = ["Хот", res.hoth_planet.texture, res.hoth_landscape.texture, res.planet_light.texture];
    planetTextures["Mustafar"] = ["Мустафар", res.mustafar_planet.texture, res.mustafar_landscape.texture, res.planet_light.texture];
    planetTextures["Dagobah"] = ["Дагоба", res.dagobah_planet.texture, res.dagobah_landscape.texture, res.planet_light.texture];
    planetTextures["Bespin"] = ["Беспин", res.bespin_planet.texture, res.bespin_landscape.texture, res.planet_light.texture];
    planetTextures["Geonosis"] = ["Джеонозис", res.geonosis_planet.texture, res.geonosis_landscape.texture, res.planet_light.texture];
    planetTextures["Alderaan"] = ["Альдераан", res.alderaan_planet.texture, res.alderaan_landscape.texture, res.planet_light.texture];
    planetTextures["Kamino"] = ["Камино", res.kamino_planet.texture, res.kamino_landscape.texture, res.planet_light.texture];
    planetTextures["DeathStar"] = ["Звезда смерти", res.deathstarTexture.texture, res.deathstar_landscape.texture, res.planet_light.texture];
    planetTextures["Utapau"] = ["Утапау", res.utapau_planet.texture, res.utapau_landscape.texture, res.planet_light.texture];
    planetTextures["Saleucami"] = ["Салукемай", res.saleucami_planet.texture, res.saleucami_landscape.texture, res.planet_light.texture];
    planetTextures["Jakku"] = ["Джакку", res.jakku_planet.texture, res.jakku_landscape.texture, res.planet_light.texture];
    
    
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
    heroesTextures["finn"] = ["Финн", res.finn_lr.texture, res.finn_rl.texture];
    heroesTextures["general_grievous"] = ["Генерал Гривус", res.general_grievous.texture, res.general_grievous.texture];
    heroesTextures["general_madine"] = ["Генерал Мадин", res.general_madine_lr.texture, res.general_madine_rl.texture];
    heroesTextures["han_solo"] = ["Хан Соло", res.han_solo_lr.texture, res.han_solo_rl.texture];
    heroesTextures["jango_fett"] = ["Джанго Фетт", res.jango_fett_lr.texture, res.jango_fett_rl.texture];
    heroesTextures["jar_jar_binks"] = ["Джа-Джа Бинкс", res.jar_jar_binks.texture, res.jar_jar_binks.texture];
    heroesTextures["jawas"] = ["Джавы", res.jawas.texture, res.jawas.texture];
    heroesTextures["kapitan_antilles"] = ["Капитан Антиллес", res.kapitan_antilles.texture, res.kapitan_antilles.texture];
    heroesTextures["ki_adi_mundi"] = ["Ки-Ади-Мунди", res.ki_adi_mundi.texture, res.ki_adi_mundi.texture];
    heroesTextures["kit_fisto"] = ["Кит Фисто", res.kit_fisto.texture, res.kit_fisto.texture];
    heroesTextures["kylo_ren"] = ["Кайло Рен", res.kylo_ren.texture, res.kylo_ren.texture];
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
    heroesTextures["phasma"] = ["Фазма", res.phasma.texture, res.phasma.texture];   
    heroesTextures["plo_koon"] = ["Пло Кун", res.plo_koon.texture, res.plo_koon.texture];
    heroesTextures["poe_dameron"] = ["По Дамерон", res.poe_dameron.texture, res.poe_dameron.texture];
    heroesTextures["poggle_the_lesser"] = ["Поггль Меньший", res.poggle_the_lesser.texture, res.poggle_the_lesser.texture];
    heroesTextures["qui_gon_jinn"] = ["Квай-Гон Джинн", res.qui_gon_jinn_lr.texture, res.qui_gon_jinn_rl.texture];
    heroesTextures["red_battle_droid"] = ["Боевой дроид", res.red_battle_droid_lr.texture, res.red_battle_droid_rl.texture];
    heroesTextures["republic_clone_army"] = ["Республиканская армия клонов", res.republic_clone_army.texture, res.republic_clone_army.texture];
    heroesTextures["rey"] = ["Рей армия клонов", res.rey.texture, res.rey.texture];
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
}var settingsStage;
var settingsLineAnimationGraphics;
var settingsStyleText = { font : 'bold 14px Arial', fill : '#FFFFFF', stroke : '#0090F0', strokeThickness : 1, wordWrap : true, wordWrapWidth : 340 }; 

function settingsCreate()
{
    settingsStage = new PIXI.Container();
    stage.addChild(settingsStage);
    
    settingsBackground();
    settingsWindow();
    settingsTitle();
    settingsText();
    settingsButtons();
    settingsButtonClose();
}

function settingsRemove()
{
    stage.removeChild(settingsStage);
    settingsStage = null;
}

function settingsBackground()
{
    var graphics = new PIXI.Graphics(); 
    graphics.hitArea = new PIXI.Rectangle(0, 0, MAIN_WIDTH, MAIN_HEIGH);
    graphics.interactive = true;
    graphics.lineStyle(1, 0x000000, 0.25);
    graphics.beginFill(0x000000, 0.25);
    graphics.drawRect(0, 0, MAIN_WIDTH, MAIN_HEIGH);
    graphics.endFill();
    settingsStage.addChild(graphics);
}

function settingsWindow()
{
    if(side === SIDE_NONE)
    {
        var graphics = new PIXI.Graphics(); 
        graphics.lineStyle(2, 0x0080C0, 1);
        graphics.beginFill(0x0080C0, 0.2);
        graphics.moveTo(250,250);
        graphics.lineTo(600, 250);
        graphics.lineTo(600, 500);
        graphics.lineTo(250, 500);
        graphics.endFill
        for(var i = 0; i < 55; i++)
        {
            if(i > 15 && i < 35)
            {
                
            }else{
                graphics.lineStyle(1, 0x0090F0, 0.5);
                graphics.moveTo(250,280+(3*i));
                graphics.lineTo(600, 280+(3*i));
            }
        }
        settingsStage.addChild(graphics);
        
        settingsLineAnimationGraphics = new PIXI.Graphics(); 
        settingsLineAnimationGraphics.lineStyle(10, 0x0090F0, 0.3);
        settingsLineAnimationGraphics.moveTo(250,255);
        settingsLineAnimationGraphics.lineTo(600, 255);
        settingsStage.addChild(settingsLineAnimationGraphics);
        settingsLineAnimationGraphicsTween();
        
        graphics = new PIXI.Graphics(); 
        graphics.lineStyle(1, 0x0080C0, 1);
        graphics.beginFill(0x0080C0, 1);
        graphics.moveTo(400,250);
        graphics.lineTo(425, 275);
        graphics.lineTo(600, 275);
        graphics.lineTo(600, 250);
        graphics.endFill
        settingsStage.addChild(graphics);
    }
}

function settingsLineAnimationGraphicsTween()
{
    createjs.Tween.get(settingsLineAnimationGraphics, {loop: true}) 
        .to({x: 0, y: 240}, 2500, createjs.Ease.getPowInOut(3));
    createjs.Ticker.setFPS(60);
}

function settingsTitle()
{
    var text = new PIXI.Text("НАСТРОЙКИ", settingsStyleText); 
    text.x = 500;
    text.y = 255;
    settingsStage.addChild(text);
}

function settingsText()
{
    var text = new PIXI.Text("Окно настроек позволяет включить или отключить в игре звуки и музыку.\n\n\n\n\nТак же вы можете посетить группу разработчика ВКонтакте, нажав на кнопку 'информация'.", settingsStyleText); 
    text.x = 255;
    text.y = 285;
    settingsStage.addChild(text);
}

function settingsButtonClose()
{
    if(side === SIDE_NONE)
    {
        var button = new PIXI.extras.MovieClip(animTexButtonBlue); 
        button.name = "button_close";
        button.position.x = 320; 
        button.position.y = 450; 
        button.interactive = true; 
        button.buttonMode = true; 
        button.loop = false; 
        button.animationSpeed = 0.2;
        button.onComplete = onSettingsButtonCloseUpdate;
        button.tap = onSettingsButtonCloseClick; 
        button.click = onSettingsButtonCloseClick; 
        button.on('mouseover', onSettingsButtonCloseOver);
        button.on('mouseout', onSettingsButtonCloseOut);
        var text = new PIXI.Text("Закрыть", settingsStyleText); 
        text.x = button.width / 3;
        text.y = button.height / 3;
        button.addChild(text); 
        settingsStage.addChild(button);
    }
}

function onSettingsButtonCloseOver()
{
    this.isOver = true;
    this.gotoAndPlay(1);
}

function onSettingsButtonCloseOut()
{
    this.isOver = false;
    this.gotoAndStop(0);
}

function onSettingsButtonCloseUpdate()
{
    if(this.isOver)
    {
        this.gotoAndPlay(1);
    }else{
        this.gotoAndStop(0);
    }
}

function onSettingsButtonCloseClick() 
{
    settingsRemove();
}

function settingsButtons()
{   
    var soundButton;
    if(sound === true) soundButton = new PIXI.Sprite(soundOnButtonTexture);
    else soundButton = new PIXI.Sprite(soundOffButtonTexture);
    soundButton.name = "sound";
    soundButton.position.x = 300;
    soundButton.position.y = 345;
    soundButton.interactive = true;
    soundButton.buttonMode = true;
    soundButton.tap = onSettingsButtonsClick;
    soundButton.click = onSettingsButtonsClick;
    soundButton.on('mousedown', onSettingsButtonsDown);
    soundButton.on('touchstart', onSettingsButtonsDown);
    soundButton.on('mouseup', onSettingsButtonsUp);
    soundButton.on('touchend', onSettingsButtonsUp);
    soundButton.on('mouseupoutside', onSettingsButtonsUp);
    soundButton.on('touchendoutside', onSettingsButtonsUp);
    settingsStage.addChild(soundButton);
    
    var musicButton;
    if(music === true) musicButton = new PIXI.Sprite(musicOnButtonTexture);
    else musicButton = new PIXI.Sprite(musicOffButtonTexture);
    musicButton.name = "music";
    musicButton.position.x = 405;
    musicButton.position.y = 345;
    musicButton.interactive = true;
    musicButton.buttonMode = true;
    musicButton.tap = onSettingsButtonsClick;
    musicButton.click = onSettingsButtonsClick;
    musicButton.on('mousedown', onSettingsButtonsDown);
    musicButton.on('touchstart', onSettingsButtonsDown);
    musicButton.on('mouseup', onSettingsButtonsUp);
    musicButton.on('touchend', onSettingsButtonsUp);
    musicButton.on('mouseupoutside', onSettingsButtonsUp);
    musicButton.on('touchendoutside', onSettingsButtonsUp);
    settingsStage.addChild(musicButton);
    
    var infoButton = new PIXI.Sprite(infoButtonTexture);
    infoButton.name = "info";
    infoButton.position.x = 510;
    infoButton.position.y = 345;
    infoButton.interactive = true;
    infoButton.buttonMode = true;
    infoButton.tap = onSettingsButtonsClick;
    infoButton.click = onSettingsButtonsClick;
    infoButton.on('mousedown', onSettingsButtonsDown);
    infoButton.on('touchstart', onSettingsButtonsDown);
    infoButton.on('mouseup', onSettingsButtonsUp);
    infoButton.on('touchend', onSettingsButtonsUp);
    infoButton.on('mouseupoutside', onSettingsButtonsUp);
    infoButton.on('touchendoutside', onSettingsButtonsUp);
    settingsStage.addChild(infoButton);
}

function onSettingsButtonsDown()
{
	this.isdown = true;
	this.scale.set(0.95);
	this.position.x += 5; 
}

function onSettingsButtonsUp()
{
	if(this.isdown)
	{
		this.isdown = false;
		this.scale.set(1.0);
		this.position.x -= 5;
	}
}

function onSettingsButtonsClick() 
{
    if(this.name === "sound")
    {
        if(sound === true)
        {
            sound = false;
            this.texture = soundOffButtonTexture;
            
        }else{
            sound = true;
            this.texture = soundOnButtonTexture;
            
        }
    }
    if(this.name === "music")
    {
        if(music === true)
        {
            music = false;
            this.texture = musicOffButtonTexture;
            soundStopStarWarsThemeSong();
        }else{
            music = true;
            this.texture = musicOnButtonTexture;
            soundPlayStarWarsThemeSong();
        }
    }
    if(this.name === "info")
    {
        window.open("https://vk.com/club62618339","_target");
    }
}
var SIDE_NONE = "side_none";
var SIDE_JEDI = "side_jedi";
var SIDE_SITH = "side_sith";

var side = SIDE_NONE;

var sideStage;

var sideSelectGraphics;
var sideDroidBlueStage;
var sideStyleDroidBlueText = { font : 'bold 14px Arial', fill : '#FFFFFF', stroke : '#0090F0', strokeThickness : 1, wordWrap : true, wordWrapWidth : 275 }; 
var sideBlueLineAnimationGraphics;

var sideDroidRedStage;
var sideStyleDroidRedText = { font : 'bold 14px Arial', fill : '#FFFFFF', stroke : '#880000', strokeThickness : 1, wordWrap : true, wordWrapWidth : 275 }; 
var sideRedLineAnimationGraphics;

function sideCreate()
{
    sideStage = new PIXI.Container();
    stage.addChild(sideStage);
    
    sideBackground();
    sideBorder();
    sideHeroes();
}

function sideRemove()
{
    stage.removeChild(sideStage);
    sideStage = null;
}

function sideBackground()
{
    var sprite = new PIXI.Sprite(sideBackgroundTexture);
    sprite.position.x = 0; 
    sprite.position.y = 0; 
    sideStage.addChild(sprite);
}

function sideBorder()
{
    var graphics = new PIXI.Graphics(); 

    graphics.lineStyle(2, 0x0000FF, 1);
    graphics.beginFill(0x000000, 0);
    graphics.drawRect(10, 10, 840, 710);
    
    graphics.lineStyle(2, 0xFF0000, 1);
    graphics.moveTo(430,720);
    graphics.lineTo(10, 720);
    graphics.moveTo(10,720);
    graphics.lineTo(10, 10);
    graphics.moveTo(10,10);
    graphics.lineTo(430, 10);
    
    graphics.lineStyle(0);
    graphics.beginFill(0xFFFF00, 1);
    graphics.drawCircle(5, 600,4);
    graphics.endFill();
    
    graphics.lineStyle(2, 0xFFFF00, 1);
    graphics.moveTo(5,600);
    graphics.lineTo(5, 725);
    
    graphics.lineStyle(2, 0xFFFF00, 1);
    graphics.moveTo(5,725);
    graphics.lineTo(25, 725);
    graphics.moveTo(25,725);
    graphics.lineTo(430, 725);
    
    graphics.lineStyle(2, 0xFFFFFF, 1);
    graphics.moveTo(430,725);
    graphics.lineTo(855, 725);
    
    graphics.lineStyle(0);
    graphics.beginFill(0xFFFFFF, 1);
    graphics.drawCircle(855, 725,4);
    graphics.endFill();
    
    graphics.lineStyle(0);
    graphics.beginFill(0xFFFFFF, 1);
    graphics.drawCircle(855, 150,4);
    graphics.endFill();
    
    graphics.lineStyle(2, 0xFFFFFF, 1);
    graphics.moveTo(855,150);
    graphics.lineTo(855, 5);
    graphics.moveTo(855,5);
    graphics.lineTo(430, 5);
    
    graphics.lineStyle(2, 0xFFFF00, 1);
    graphics.moveTo(430,5);
    graphics.lineTo(5, 5);
    
    graphics.lineStyle(0);
    graphics.beginFill(0xFFFF00, 1);
    graphics.drawCircle(5,5,4);
    graphics.endFill();
    
    sideStage.addChild(graphics);
}

function sideHeroes()
{
    /*
    var button = new PIXI.Sprite(sideDarthVaderTexture);
    button.name = "DarthVader";
    button.position.x = 25;
    button.position.y = 75;
    button.interactive = true;
    button.buttonMode = true;
    button.tap = onSideButtonClick; 
    button.click = onSideButtonClick; 
    button.on('mouseover', onSideButtonOver);
    button.on('mouseout', onSideButtonOut);
    sideStage.addChild(button);
    */
    var button = new PIXI.extras.MovieClip(animTexSideDarthVader);
    button.name = "DarthVader";
    button.position.x = 25;
    button.position.y = 75;
    button.interactive = true;
    button.buttonMode = true;
    button.tap = onSideButtonClick; 
    button.click = onSideButtonClick; 
    button.on('mouseover', onSideButtonOver);
    button.on('mouseout', onSideButtonOut);
    button.loop = true;
    button.animationSpeed = 0.2;
    button.play();
    sideStage.addChild(button);
    
    button = new PIXI.Sprite(sideLukeSkywalkerTexture);
    button.name = "LukeSkywalker";
    button.position.x = 475;
    button.position.y = 80;
    button.interactive = true;
    button.buttonMode = true;
    button.tap = onSideButtonClick; 
    button.click = onSideButtonClick; 
    button.on('mouseover', onSideButtonOver);
    button.on('mouseout', onSideButtonOut);
    sideStage.addChild(button);
}

function onSideButtonOver()
{
    if(this.name === "DarthVader")
    {
        sideStage.removeChild(sideSelectGraphics);
        sideSelectGraphics = new PIXI.Graphics(); 
        sideSelectGraphics.lineStyle(1, 0x880000, 0.2);
        sideSelectGraphics.beginFill(0x880000, 0.2);
        sideSelectGraphics.drawRect(0, 0, 430, MAIN_HEIGH);
        sideSelectGraphics.endFill();
        sideStage.addChild(sideSelectGraphics);
        sideDroidRed();
    }
    if(this.name === "LukeSkywalker")
    {
        sideStage.removeChild(sideSelectGraphics);
        sideSelectGraphics = new PIXI.Graphics(); 
        sideSelectGraphics.lineStyle(1, 0x0000FF, 0.2);
        sideSelectGraphics.beginFill(0x0000FF, 0.2);
        sideSelectGraphics.drawRect(430, 0, 430, MAIN_HEIGH);
        sideSelectGraphics.endFill();
        sideStage.addChild(sideSelectGraphics);
        sideDroidBlue();
    }
}

function onSideButtonOut()
{
    sideStage.removeChild(sideSelectGraphics);
    sideStage.removeChild(sideDroidRedStage);
    sideStage.removeChild(sideDroidBlueStage);
    
}

function onSideButtonClick()
{
    initGame(); // инициализация игры
    
    if(this.name === "DarthVader")
    {
        side = SIDE_SITH;
        mapCreate();
    }
    if(this.name === "LukeSkywalker")
    {
        side = SIDE_JEDI;
        mapCreate();
    }
    
    sideRemove();
}

function sideDroidBlue()
{
    sideDroidBlueStage = new PIXI.Container();
    
    var textureSprite = new PIXI.Sprite(r2d2DroidBlueRightTexture); 
    textureSprite.position.x = 700; 
    textureSprite.position.y = 550; 
    textureSprite.scale.set(0.4);
    sideDroidBlueStage.addChild(textureSprite);

    var graphics = new PIXI.Graphics(); 
    graphics.lineStyle(2, 0x0080C0, 1);
    graphics.beginFill(0x0080C0, 0.2);
    graphics.moveTo(450,450);
    graphics.lineTo(735, 450);
    graphics.lineTo(735, 575);
    graphics.lineTo(450, 575);
    graphics.endFill
    for(var i = 0; i < 42; i++)
    {
        graphics.lineStyle(1, 0x0090F0, 0.5);
        graphics.moveTo(450, 450+(3*i));
        graphics.lineTo(735, 450+(3*i));
    }
    sideDroidBlueStage.addChild(graphics);

    
    sideDroidBlueMessage();

    sideBlueLineAnimationGraphics = new PIXI.Graphics(); 
    sideBlueLineAnimationGraphics.lineStyle(10, 0x0090F0, 0.3);
    sideBlueLineAnimationGraphics.moveTo(450,455);
    sideBlueLineAnimationGraphics.lineTo(735, 455);
    sideDroidBlueStage.addChild(sideBlueLineAnimationGraphics);
    
    sideStage.addChild(sideDroidBlueStage);
    
    sideBlueLineAnimationGraphicsTween();
}

function sideDroidBlueMessage()
{
    var textMessage = new PIXI.Text("\nВыберите светлую сторону силы.\n\"Только покой ощутив, возмёшь контроль над желаниями своими\". \n\nПройдите путь Люка Скайуокера!", sideStyleDroidBlueText); 
    textMessage.x = 455; 
    textMessage.y = 455; 
    sideDroidBlueStage.addChild(textMessage);
}

function sideBlueLineAnimationGraphicsTween()
{
    createjs.Tween.get(sideBlueLineAnimationGraphics, {loop: true}) 
        .to({x: 0, y: 115}, 2500, createjs.Ease.getPowInOut(3));
    createjs.Ticker.setFPS(60); 

}

function sideDroidRed()
{
    sideDroidRedStage = new PIXI.Container();
    
    var textureSprite = new PIXI.Sprite(r2d2DroidRedLeftTexture); 
    textureSprite.position.x = 40; 
    textureSprite.position.y = 550; 
    textureSprite.scale.set(0.4);
    sideDroidRedStage.addChild(textureSprite);

    var graphics = new PIXI.Graphics(); 
    graphics.lineStyle(2, 0x800000, 1);
    graphics.beginFill(0x800000, 0.2);
    graphics.moveTo(125,450);
    graphics.lineTo(410, 450);
    graphics.lineTo(410, 575);
    graphics.lineTo(125, 575);
    graphics.endFill
    for(var i = 0; i < 42; i++)
    {
        graphics.lineStyle(1, 0x800000, 0.5);
        graphics.moveTo(125, 450+(3*i));
        graphics.lineTo(410, 450+(3*i));
    }
    sideDroidRedStage.addChild(graphics);

    
    sideDroidRedMessage();

    sideRedLineAnimationGraphics = new PIXI.Graphics(); 
    sideRedLineAnimationGraphics.lineStyle(10, 0x800000, 0.3);
    sideRedLineAnimationGraphics.moveTo(125,455);
    sideRedLineAnimationGraphics.lineTo(410, 455);
    sideDroidRedStage.addChild(sideRedLineAnimationGraphics);
    
    sideStage.addChild(sideDroidRedStage);
    
    sideRedLineAnimationGraphicsTween();
}

function sideDroidRedMessage()
{
    var textMessage = new PIXI.Text("\nВыберите тёмную сторону силы.\n\"Поддайся амбициям, почувствуй власть в своих руках.\" \n\nПройдите путь Дарт Вейдера!", sideStyleDroidRedText); 
    textMessage.x = 130; 
    textMessage.y = 455; 
    sideDroidRedStage.addChild(textMessage);
}

function sideRedLineAnimationGraphicsTween()
{
    createjs.Tween.get(sideRedLineAnimationGraphics, {loop: true}) 
        .to({x: 0, y: 115}, 2500, createjs.Ease.getPowInOut(3));
    createjs.Ticker.setFPS(60); 

}

/*
function soundload () 
{
    createjs.Sound.on("fileload", createjs.proxy(this.soundloadComplete, (this)));
    createjs.Sound.registerSound("assets/music/StarWarsThemeSong.mp3", "StarWarsThemeSong");
    console.log("SOUND LOAD!");
}

function soundloadComplete(event) 
{
     var instance = createjs.Sound.play("StarWarsThemeSong");  // play using id.  Could also use full source path or event.src.
     //instance.on("complete", createjs.proxy(this.handleComplete, this));
     //instance.volume = 0.5;
     console.log("SOUND OK!");
 }
 */

function soundPlayStarWarsThemeSong()
{
    if(music === true) createjs.Sound.play("StarWarsThemeSong", {loop:-1});
}

function soundStopStarWarsThemeSong()
{
    createjs.Sound.stop("StarWarsThemeSong");
}var testStage;

function testCreate()
{
	testStage = new PIXI.Container();
	stage.addChild(testStage);
        
        testBackground();
        testAnimation();
        textTexture();
}

function testRemove()
{
	stage.removeChild(testStage);
	testStage = null;
}

function testBackground()
{
    var sprite = new PIXI.Sprite(sideBackgroundTexture); 
    sprite.position.x = 0; 
    sprite.position.y = 0; 
    sprite.scale.set(1.0); 
    testStage.addChild(sprite);
}

function testAnimation()
{
    var anim = new PIXI.extras.MovieClip(animTest); 
    anim.name = "animation_test";
    anim.position.x = 0; 
    anim.position.y = 150; 
    anim.interactive = true; 
    anim.buttonMode = true; 
    anim.loop = true; 
    anim.animationSpeed = 0.2;
    anim.play();
    testStage.addChild(anim);
}

function textTexture()
{
    var sprite = new PIXI.Sprite(testTexture);
    sprite.position.x = 500;
    sprite.position.y = 250;
    stage.addChild(sprite);
}
var userMapPlanets;     // карта планет
var userLevels;         // Уровни

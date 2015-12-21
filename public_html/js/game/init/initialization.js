
/* == НАЧАЛО ФАЙЛА ========================================================= */

var initPlanetBlueStyleText = { font : 'bold 14px Arial', fill : '#FFFFFF', stroke : '#0090F0', strokeThickness : 1, wordWrap : true, wordWrapWidth : 175 }; 
var initPlanetRedStyleText = { font : 'bold 14px Arial', fill : '#FFFFFF', stroke : '#880000', strokeThickness : 1, wordWrap : true, wordWrapWidth : 175 }; 

function initGame()
{
    userMapPlanets = initMap();                 // карта планет
    userMapMessage = initMessage();             // сообщения
    userPersonages = initPersonages();          // характеристики персонажей
    userPlanets = initPlanets();                // планеты
    userCommandUser = initCommandUser();        // команда пользователя
    userCommandAI = initCommandAI();            // команда ИИ
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
        new PIXI.Sprite(heroesTextures["mas_amedda"][1]),
        new PIXI.Text("Орден Джедаев", initPlanetBlueStyleText),
        new PIXI.Text("Победа Ситов", initPlanetRedStyleText)
    ];
    planets["Coruscant"][1].name = "Coruscant";
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
    planets["Coruscant"][11].position.x = 520; 
    planets["Coruscant"][11].position.y = 570; 
    planets["Coruscant"][12].position.x = 520; 
    planets["Coruscant"][12].position.y = 570; 
    
    
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
        new PIXI.Sprite(heroesTextures["tusken"][1]),
        new PIXI.Text("Союзник Джедай", initPlanetBlueStyleText),
        new PIXI.Text("Пренадлежит Ситам", initPlanetRedStyleText)
    ];
    planets["Totooine"][1].name = "Totooine";
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
    planets["Totooine"][11].position.x = 370; 
    planets["Totooine"][11].position.y = 420; 
    planets["Totooine"][12].position.x = 370; 
    planets["Totooine"][12].position.y = 420; 
    
    
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
        new PIXI.Sprite(heroesTextures["royal_guards"][1]),
        new PIXI.Text("Союзник Джедай", initPlanetBlueStyleText),
        new PIXI.Text("Пренадлежит Ситам", initPlanetRedStyleText)
    ];
    planets["Naboo"][1].name = "Naboo";
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
    planets["Naboo"][11].position.x = 700; 
    planets["Naboo"][11].position.y = 235; 
    planets["Naboo"][12].position.x = 700; 
    planets["Naboo"][12].position.y = 235; 
    
    
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
        new PIXI.Sprite(heroesTextures["aayla_secura"][1]),
        new PIXI.Text("Союзник Джедай", initPlanetBlueStyleText),
        new PIXI.Text("Пренадлежит Ситам", initPlanetRedStyleText)
    ];
    planets["Endor"][1].name = "Endor";
    planets["Endor"][1].position.x = 200;
    planets["Endor"][1].position.y = 550;
    planets["Endor"][1].interactive = true; 
    planets["Endor"][1].buttonMode = true;
    planets["Endor"][1].scale.set(0.2);
    planets["Endor"][2].position.x = 240; 
    planets["Endor"][2].position.y = 525; 
    planets["Endor"][3].position.x = 240; 
    planets["Endor"][3].position.y = 525;
    planets["Endor"][4].lineStyle(1, 0xFFFFFF, 0.3);
    planets["Endor"][4].drawCircle(240, 590, 39);
    planets["Endor"][4].lineStyle(1, 0xFFFFFF, 1);
    planets["Endor"][4].moveTo(225, 570);
    planets["Endor"][4].lineTo(235, 545);
    planets["Endor"][4].moveTo(235, 545);
    planets["Endor"][4].lineTo(400, 545);
    planets["Endor"][5].position.x = 275; 
    planets["Endor"][5].position.y = 550;
    planets["Endor"][5].scale.set(0.18);
    planets["Endor"][6].position.x = 325; 
    planets["Endor"][6].position.y = 545;
    planets["Endor"][6].scale.set(0.2);
    planets["Endor"][7].position.x = 375; 
    planets["Endor"][7].position.y = 550;
    planets["Endor"][7].scale.set(0.19);
    planets["Endor"][8].position.x = 275; 
    planets["Endor"][8].position.y = 545;
    planets["Endor"][8].scale.set(0.20);
    planets["Endor"][9].position.x = 325; 
    planets["Endor"][9].position.y = 550;
    planets["Endor"][9].scale.set(0.18);
    planets["Endor"][10].position.x = 375; 
    planets["Endor"][10].position.y = 550;
    planets["Endor"][10].scale.set(0.18);
    planets["Endor"][11].position.x = 270; 
    planets["Endor"][11].position.y = 545; 
    planets["Endor"][12].position.x = 270; 
    planets["Endor"][12].position.y = 545; 
    
    
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
        new PIXI.Sprite(heroesTextures["chewbacca"][2]),
        new PIXI.Text("Союзник Джедай", initPlanetBlueStyleText),
        new PIXI.Text("Пренадлежит Ситам", initPlanetRedStyleText)
    ];
    planets["Hoth"][1].name = "Hoth";
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
    planets["Hoth"][11].position.x = 770; 
    planets["Hoth"][11].position.y = 480; 
    planets["Hoth"][12].position.x = 770; 
    planets["Hoth"][12].position.y = 480; 
    
    
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
        new PIXI.Sprite(heroesTextures["wat_tambor"][1]),
        new PIXI.Text("Союзник Джедай", initPlanetBlueStyleText),
        new PIXI.Text("Пренадлежит Ситам", initPlanetRedStyleText)
    ];
    planets["Mustafar"][1].name = "Mustafar";
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
    planets["Mustafar"][11].position.x = 670; 
    planets["Mustafar"][11].position.y = 370; 
    planets["Mustafar"][12].position.x = 670; 
    planets["Mustafar"][12].position.y = 370; 
    
    
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
        new PIXI.Sprite(heroesTextures["kit_fisto"][1]),
        new PIXI.Text("Союзник Джедай", initPlanetBlueStyleText),
        new PIXI.Text("Пренадлежит Ситам", initPlanetRedStyleText)
    ];
    planets["Dagobah"][1].name = "Dagobah";
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
    planets["Dagobah"][11].position.x = 270; 
    planets["Dagobah"][11].position.y = 45; 
    planets["Dagobah"][12].position.x = 270; 
    planets["Dagobah"][12].position.y = 45; 
    
    
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
        new PIXI.Sprite(heroesTextures["ki_adi_mundi"][1]),
        new PIXI.Text("Союзник Джедай", initPlanetBlueStyleText),
        new PIXI.Text("Пренадлежит Ситам", initPlanetRedStyleText)
    ];
    planets["Bespin"][1].name = "Bespin";
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
    planets["Bespin"][11].position.x = 45; 
    planets["Bespin"][11].position.y = 150; 
    planets["Bespin"][12].position.x = 45; 
    planets["Bespin"][12].position.y = 150; 
    
   
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
        new PIXI.Sprite(heroesTextures["saesee_tiin"][2]),
        new PIXI.Text("Союзник Джедай", initPlanetBlueStyleText),
        new PIXI.Text("Пренадлежит Ситам", initPlanetRedStyleText)
    ];
    planets["Geonosis"][1].name = "Geonosis";
    planets["Geonosis"][1].position.x = 720; // 750 -30
    planets["Geonosis"][1].position.y = 600; 
    planets["Geonosis"][1].interactive = true; 
    planets["Geonosis"][1].buttonMode = true;
    planets["Geonosis"][1].scale.set(0.2);
    planets["Geonosis"][2].position.x = 760; 
    planets["Geonosis"][2].position.y = 575; 
    planets["Geonosis"][3].position.x = 760; 
    planets["Geonosis"][3].position.y = 575;
    planets["Geonosis"][4].lineStyle(1, 0xFFFFFF, 0.3);
    planets["Geonosis"][4].drawCircle(760, 639, 39);
    planets["Geonosis"][4].lineStyle(1, 0xFFFFFF, 1);
    planets["Geonosis"][4].moveTo(745, 620);
    planets["Geonosis"][4].lineTo(755, 595);
    planets["Geonosis"][4].moveTo(755, 595);
    planets["Geonosis"][4].lineTo(920, 595);
    planets["Geonosis"][5].position.x = 795; 
    planets["Geonosis"][5].position.y = 600;
    planets["Geonosis"][5].scale.set(0.18);
    planets["Geonosis"][6].position.x = 845; 
    planets["Geonosis"][6].position.y = 600;
    planets["Geonosis"][6].scale.set(0.19);
    planets["Geonosis"][7].position.x = 895; 
    planets["Geonosis"][7].position.y = 600;
    planets["Geonosis"][7].scale.set(0.18);
    planets["Geonosis"][8].position.x = 785; 
    planets["Geonosis"][8].position.y = 585;
    planets["Geonosis"][8].scale.set(0.23);
    planets["Geonosis"][9].position.x = 850; 
    planets["Geonosis"][9].position.y = 600;
    planets["Geonosis"][9].scale.set(0.18);
    planets["Geonosis"][10].position.x = 890; 
    planets["Geonosis"][10].position.y = 600;
    planets["Geonosis"][10].scale.set(0.18);
    planets["Geonosis"][11].position.x = 790; 
    planets["Geonosis"][11].position.y = 595; 
    planets["Geonosis"][12].position.x = 790; 
    planets["Geonosis"][12].position.y = 595; 
    
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
        new PIXI.Sprite(heroesTextures["kapitan_antilles"][1]),
        new PIXI.Text("Союзник Джедай", initPlanetBlueStyleText),
        new PIXI.Text("Пренадлежит Ситам", initPlanetRedStyleText)
    ];
    planets["Alderaan"][1].name = "Alderaan";
    planets["Alderaan"][1].position.x = 50; 
    planets["Alderaan"][1].position.y = 380;
    planets["Alderaan"][1].interactive = true; 
    planets["Alderaan"][1].buttonMode = true;
    planets["Alderaan"][1].scale.set(0.2);
    planets["Alderaan"][2].position.x = 90; 
    planets["Alderaan"][2].position.y = 355; 
    planets["Alderaan"][3].position.x = 90; 
    planets["Alderaan"][3].position.y = 355;
    planets["Alderaan"][4].lineStyle(1, 0xFFFFFF, 0.3);
    planets["Alderaan"][4].drawCircle(90, 420, 39);
    planets["Alderaan"][4].lineStyle(1, 0xFFFFFF, 1);
    planets["Alderaan"][4].moveTo(75, 400);
    planets["Alderaan"][4].lineTo(85, 375);
    planets["Alderaan"][4].moveTo(85, 375);
    planets["Alderaan"][4].lineTo(250, 375);
    planets["Alderaan"][5].position.x = 125; 
    planets["Alderaan"][5].position.y = 380;
    planets["Alderaan"][5].scale.set(0.18);
    planets["Alderaan"][6].position.x = 175; 
    planets["Alderaan"][6].position.y = 375;
    planets["Alderaan"][6].scale.set(0.2);
    planets["Alderaan"][7].position.x = 225; 
    planets["Alderaan"][7].position.y = 380;
    planets["Alderaan"][7].scale.set(0.18);
    planets["Alderaan"][8].position.x = 125; 
    planets["Alderaan"][8].position.y = 380;
    planets["Alderaan"][8].scale.set(0.18);
    planets["Alderaan"][9].position.x = 175; 
    planets["Alderaan"][9].position.y = 380;
    planets["Alderaan"][9].scale.set(0.17);
    planets["Alderaan"][10].position.x = 225; 
    planets["Alderaan"][10].position.y = 380;
    planets["Alderaan"][10].scale.set(0.18);
    planets["Alderaan"][11].position.x = 120; 
    planets["Alderaan"][11].position.y = 375; 
    planets["Alderaan"][12].position.x = 120; 
    planets["Alderaan"][12].position.y = 375; 
    
        
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
        new PIXI.Sprite(heroesTextures["clone_commander_neyo"][1]),
        new PIXI.Text("Союзник Джедай", initPlanetBlueStyleText),
        new PIXI.Text("Пренадлежит Ситам", initPlanetRedStyleText)
    ];
    planets["Kamino"][1].name = "Kamino";
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
    planets["Kamino"][11].position.x = 470; 
    planets["Kamino"][11].position.y = 270; 
    planets["Kamino"][12].position.x = 470; 
    planets["Kamino"][12].position.y = 270; 
    
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
        new PIXI.Sprite(heroesTextures["luke_skywalker"][1]),
        new PIXI.Text("Союзник Джедай", initPlanetBlueStyleText),
        new PIXI.Text("Пренадлежит Ситам", initPlanetRedStyleText)
    ];
    planets["DeathStar"][1].name = "DeathStar";
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
    planets["DeathStar"][11].position.x = 220; 
    planets["DeathStar"][11].position.y = 240; 
    planets["DeathStar"][12].position.x = 220; 
    planets["DeathStar"][12].position.y = 240; 
    
    
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
        new PIXI.Sprite(heroesTextures["bib_fortuna"][1]),
        new PIXI.Text("Союзник Джедай", initPlanetBlueStyleText),
        new PIXI.Text("Пренадлежит Ситам", initPlanetRedStyleText)
    ];
    planets["Utapau"][1].name = "Utapau";
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
    planets["Utapau"][11].position.x = 770; 
    planets["Utapau"][11].position.y = 45; 
    planets["Utapau"][12].position.x = 770; 
    planets["Utapau"][12].position.y = 45; 
    
    
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
        new PIXI.Sprite(heroesTextures["c_3po"][2]),
        new PIXI.Text("Союзник Джедай", initPlanetBlueStyleText),
        new PIXI.Text("Пренадлежит Ситам", initPlanetRedStyleText)
    ];
    planets["Saleucami"][1].name = "Saleucami";
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
    planets["Saleucami"][11].position.x = 880; 
    planets["Saleucami"][11].position.y = 150; 
    planets["Saleucami"][12].position.x = 880; 
    planets["Saleucami"][12].position.y = 150; 
    
    
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
        new PIXI.Sprite(heroesTextures["poe_dameron"][1]),                                              // 10 - персонажи (свет)
        new PIXI.Text("Союзник Джедай", initPlanetBlueStyleText),                                       // 11
        new PIXI.Text("Пренадлежит Ситам", initPlanetRedStyleText)                                      // 12
    ];
    planets["Jakku"][1].name = "Jakku";
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
    planets["Jakku"][11].position.x = 520; 
    planets["Jakku"][11].position.y = 70; 
    planets["Jakku"][12].position.x = 520; 
    planets["Jakku"][12].position.y = 70; 
    
    return planets;
}

function initMessage()
{
    var message = new Object();
    message["message1"] = ["Меня зовут R2D2", "Меня зовут R3-S6"];
    
    return message;
}

function initPersonages()
{
    var personageObj = new Object();
    for (var key in personagesJson.data.Personages.personage)
    {
        personageObj[personagesJson.data.Personages.personage[key].id] = new UserPersonage(personagesJson.data.Personages.personage[key].id, personagesJson.data.Personages.personage[key].name);
        personageObj[personagesJson.data.Personages.personage[key].id].life = personagesJson.data.Personages.personage[key].life;
        personageObj[personagesJson.data.Personages.personage[key].id].hit1 = personagesJson.data.Personages.personage[key].hit1;
        personageObj[personagesJson.data.Personages.personage[key].id].hit2 = personagesJson.data.Personages.personage[key].hit2;
        personageObj[personagesJson.data.Personages.personage[key].id].hit3 = personagesJson.data.Personages.personage[key].hit3;
        personageObj[personagesJson.data.Personages.personage[key].id].hit4 = personagesJson.data.Personages.personage[key].hit4;
        personageObj[personagesJson.data.Personages.personage[key].id].hit5 = personagesJson.data.Personages.personage[key].hit5;
        personageObj[personagesJson.data.Personages.personage[key].id].status = personagesJson.data.Personages.personage[key].status;
        personageObj[personagesJson.data.Personages.personage[key].id].description = personagesJson.data.Personages.personage[key].description;
    }
    return personageObj;
}

function initPlanets()
{
    var planetsObj = new Object();
    for (var key in planetsJson.data.Planets.planet)
    {
        planetsObj[planetsJson.data.Planets.planet[key].id] = new UserPlanet(planetsJson.data.Planets.planet[key].id, planetsJson.data.Planets.planet[key].name);
        planetsObj[planetsJson.data.Planets.planet[key].id].redPersonage1 = planetsJson.data.Planets.planet[key].redPersonage1;
        planetsObj[planetsJson.data.Planets.planet[key].id].redPersonage2 = planetsJson.data.Planets.planet[key].redPersonage2;
        planetsObj[planetsJson.data.Planets.planet[key].id].redPersonage3 = planetsJson.data.Planets.planet[key].redPersonage3;
        planetsObj[planetsJson.data.Planets.planet[key].id].bluePersonage1 = planetsJson.data.Planets.planet[key].bluePersonage1;
        planetsObj[planetsJson.data.Planets.planet[key].id].bluePersonage2 = planetsJson.data.Planets.planet[key].bluePersonage2;
        planetsObj[planetsJson.data.Planets.planet[key].id].bluePersonage3 = planetsJson.data.Planets.planet[key].bluePersonage3;
        planetsObj[planetsJson.data.Planets.planet[key].id].status = planetsJson.data.Planets.planet[key].status;
        planetsObj[planetsJson.data.Planets.planet[key].id].description = planetsJson.data.Planets.planet[key].description;
    }
   
   return planetsObj;
}

function initCommandUser()
{
    var commandUser = new Object();
    
    if(side === SIDE_JEDI)
    {
        commandUser["personage1"] = userPlanets["Coruscant"].bluePersonage1;
        commandUser["personage2"] = userPlanets["Coruscant"].bluePersonage2;
        commandUser["personage3"] = userPlanets["Coruscant"].bluePersonage3;
    }
    if(side === SIDE_SITH)
    {
        commandUser["personage1"] = userPlanets["DeathStar"].redPersonage1;
        commandUser["personage2"] = userPlanets["DeathStar"].redPersonage2;
        commandUser["personage3"] = userPlanets["DeathStar"].redPersonage3;
    }
    return commandUser;
}

function initCommandAI()
{
    var commandAI = new Object();
    if(side === SIDE_JEDI)
    {
        commandAI["personage1"] = userPlanets["DeathStar"].redPersonage1;
        commandAI["personage2"] = userPlanets["DeathStar"].redPersonage2;
        commandAI["personage3"] = userPlanets["DeathStar"].redPersonage3;
    }
    if(side === SIDE_SITH)
    {
        commandAI["personage1"] = userPlanets["Coruscant"].bluePersonage1;
        commandAI["personage2"] = userPlanets["Coruscant"].bluePersonage2;
        commandAI["personage3"] = userPlanets["Coruscant"].bluePersonage3;
    }
    return commandAI;
}

/* == КОНЕЦ ФАЙЛА ========================================================== */

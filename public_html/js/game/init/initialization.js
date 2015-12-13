var initPlanetBlueStyleText = { font : 'bold 14px Arial', fill : '#FFFFFF', stroke : '#0090F0', strokeThickness : 1, wordWrap : true, wordWrapWidth : 175 }; 
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
        new PIXI.Sprite(planetTextures["Coruscant"][2]),
        new PIXI.Text(planetTextures["Coruscant"][0], initPlanetBlueStyleText),
        new PIXI.Text(planetTextures["Coruscant"][0], initPlanetRedStyleText),
        new PIXI.Graphics()
    ];
    planets["Coruscant"][1].name = "coruscant_planet";
    planets["Coruscant"][1].position.x = 550; 
    planets["Coruscant"][1].position.y = 600; 
    planets["Coruscant"][1].interactive = true; 
    planets["Coruscant"][1].buttonMode = true;
    planets["Coruscant"][2].name = "coruscant_landscape";
    planets["Coruscant"][2].position.x = 0; 
    planets["Coruscant"][2].position.y = 0; 
    planets["Coruscant"][3].position.x = 590; 
    planets["Coruscant"][3].position.y = 575; 
    planets["Coruscant"][4].position.x = 590; 
    planets["Coruscant"][4].position.y = 575;
    planets["Coruscant"][5].lineStyle(1, 0xFFFFFF, 0.3);
    planets["Coruscant"][5].drawCircle(592, 640, 39);
    planets["Coruscant"][5].lineStyle(1, 0xFFFFFF, 1);
    planets["Coruscant"][5].moveTo(575, 620);
    planets["Coruscant"][5].lineTo(585, 595);
    planets["Coruscant"][5].moveTo(585, 595);
    planets["Coruscant"][5].lineTo(650, 595);
    
    planets["Totooine"] = [
        "Totooine",
        new PIXI.Sprite(planetTextures["Totooine"][1]),
        new PIXI.Sprite(planetTextures["Totooine"][2]),
        new PIXI.Text(planetTextures["Totooine"][0], initPlanetBlueStyleText),
        new PIXI.Text(planetTextures["Totooine"][0], initPlanetRedStyleText),
        new PIXI.Graphics()
    ];
    planets["Totooine"][1].name = "tatooine_planet";
    planets["Totooine"][1].position.x = 300; 
    planets["Totooine"][1].position.y = 425; 
    planets["Totooine"][1].interactive = true; 
    planets["Totooine"][1].buttonMode = true;
    planets["Totooine"][2].name = "tatooine_landscape";
    planets["Totooine"][2].position.x = 0; 
    planets["Totooine"][2].position.y = 0;
    planets["Totooine"][3].position.x = 340; 
    planets["Totooine"][3].position.y = 400; 
    planets["Totooine"][4].position.x = 340; 
    planets["Totooine"][4].position.y = 400;
    planets["Totooine"][5].lineStyle(1, 0xFFFFFF, 0.3);
    planets["Totooine"][5].drawCircle(341, 465, 39);
    planets["Totooine"][5].lineStyle(1, 0xFFFFFF, 1);
    planets["Totooine"][5].moveTo(325, 445);
    planets["Totooine"][5].lineTo(335, 420);
    planets["Totooine"][5].moveTo(335, 420);
    planets["Totooine"][5].lineTo(400, 420);
    
    planets["Naboo"] = [
        "Naboo",
        new PIXI.Sprite(planetTextures["Naboo"][1]),
        new PIXI.Sprite(planetTextures["Naboo"][2]),
        new PIXI.Text(planetTextures["Naboo"][0], initPlanetBlueStyleText),
        new PIXI.Text(planetTextures["Naboo"][0], initPlanetRedStyleText),
        new PIXI.Graphics()
    ];
    planets["Naboo"][1].name = "naboo_planet";
    planets["Naboo"][1].position.x = 630; 
    planets["Naboo"][1].position.y = 240; 
    planets["Naboo"][1].interactive = true; 
    planets["Naboo"][1].buttonMode = true;
    planets["Naboo"][2].name = "naboo_landscape";
    planets["Naboo"][2].position.x = 0; 
    planets["Naboo"][2].position.y = 0;
    planets["Naboo"][3].position.x = 670; 
    planets["Naboo"][3].position.y = 215; 
    planets["Naboo"][4].position.x = 670; 
    planets["Naboo"][4].position.y = 215;
    planets["Naboo"][5].lineStyle(1, 0xFFFFFF, 0.3);
    planets["Naboo"][5].drawCircle(672, 280, 39);
    planets["Naboo"][5].lineStyle(1, 0xFFFFFF, 1);
    planets["Naboo"][5].moveTo(655, 260);
    planets["Naboo"][5].lineTo(665, 235);
    planets["Naboo"][5].moveTo(665, 235);
    planets["Naboo"][5].lineTo(730, 235);
    
    planets["Endor"] = [
        "Endor",
        new PIXI.Sprite(planetTextures["Endor"][1]),
        new PIXI.Sprite(planetTextures["Endor"][2]),
        new PIXI.Text(planetTextures["Endor"][0], initPlanetBlueStyleText),
        new PIXI.Text(planetTextures["Endor"][0], initPlanetRedStyleText),
        new PIXI.Graphics()
    ];
    planets["Endor"][1].name = "endor_planet";
    planets["Endor"][1].position.x = 150; 
    planets["Endor"][1].position.y = 550; 
    planets["Endor"][1].interactive = true; 
    planets["Endor"][1].buttonMode = true;
    planets["Endor"][2].name = "endor_landscape";
    planets["Endor"][2].position.x = 0; 
    planets["Endor"][2].position.y = 0;
    planets["Endor"][3].position.x = 190; 
    planets["Endor"][3].position.y = 525; 
    planets["Endor"][4].position.x = 190; 
    planets["Endor"][4].position.y = 525;
    planets["Endor"][5].lineStyle(1, 0xFFFFFF, 0.3);
    planets["Endor"][5].drawCircle(190, 590, 39);
    planets["Endor"][5].lineStyle(1, 0xFFFFFF, 1);
    planets["Endor"][5].moveTo(175, 570);
    planets["Endor"][5].lineTo(185, 545);
    planets["Endor"][5].moveTo(185, 545);
    planets["Endor"][5].lineTo(250, 545);
    
    planets["Hoth"] = [
        "Hoth",
        new PIXI.Sprite(planetTextures["Hoth"][1]),
        new PIXI.Sprite(planetTextures["Hoth"][2]),
        new PIXI.Text(planetTextures["Hoth"][0], initPlanetBlueStyleText),
        new PIXI.Text(planetTextures["Endor"][0], initPlanetRedStyleText),
        new PIXI.Graphics()
    ];
    planets["Hoth"][1].name = "hoth_planet";
    planets["Hoth"][1].position.x = 850; 
    planets["Hoth"][1].position.y = 450; 
    planets["Hoth"][1].interactive = true; 
    planets["Hoth"][1].buttonMode = true;
    planets["Hoth"][2].name = "hoth_landscape";
    planets["Hoth"][2].position.x = 0; 
    planets["Hoth"][2].position.y = 0;
    planets["Hoth"][3].position.x = 890; 
    planets["Hoth"][3].position.y = 425; 
    planets["Hoth"][4].position.x = 890; 
    planets["Hoth"][4].position.y = 425;
    planets["Hoth"][5].lineStyle(1, 0xFFFFFF, 0.3);
    planets["Hoth"][5].drawCircle(891, 490, 39);
    planets["Hoth"][5].lineStyle(1, 0xFFFFFF, 1);
    planets["Hoth"][5].moveTo(875, 470);
    planets["Hoth"][5].lineTo(885, 445);
    planets["Hoth"][5].moveTo(885, 445);
    planets["Hoth"][5].lineTo(950, 445);
    
    planets["Mustafar"] = [
        "Mustafar",
        new PIXI.Sprite(planetTextures["Mustafar"][1]),
        new PIXI.Sprite(planetTextures["Mustafar"][2]),
        new PIXI.Text(planetTextures["Mustafar"][0], initPlanetBlueStyleText),
        new PIXI.Text(planetTextures["Mustafar"][0], initPlanetRedStyleText),
        new PIXI.Graphics()
    ];
    planets["Mustafar"][1].name = "mustafar_planet";
    planets["Mustafar"][1].position.x = 600; 
    planets["Mustafar"][1].position.y = 425; 
    planets["Mustafar"][1].interactive = true; 
    planets["Mustafar"][1].buttonMode = true;
    planets["Mustafar"][2].name = "mustafar_landscape";
    planets["Mustafar"][2].position.x = 0; 
    planets["Mustafar"][2].position.y = 0;
    planets["Mustafar"][3].position.x = 640; 
    planets["Mustafar"][3].position.y = 400; 
    planets["Mustafar"][4].position.x = 640; 
    planets["Mustafar"][4].position.y = 400;
    planets["Mustafar"][5].lineStyle(1, 0xFFFFFF, 0.3);
    planets["Mustafar"][5].drawCircle(642, 465, 39);
    planets["Mustafar"][5].lineStyle(1, 0xFFFFFF, 1);
    planets["Mustafar"][5].moveTo(625, 445);
    planets["Mustafar"][5].lineTo(635, 420);
    planets["Mustafar"][5].moveTo(635, 420);
    planets["Mustafar"][5].lineTo(700, 420);
    
    
    planets["Dagobah"] = [
        "Dagobah",
        new PIXI.Sprite(planetTextures["Dagobah"][1]),
        new PIXI.Sprite(planetTextures["Dagobah"][2]),
        new PIXI.Text(planetTextures["Dagobah"][0], initPlanetBlueStyleText),
        new PIXI.Text(planetTextures["Dagobah"][0], initPlanetRedStyleText),
        new PIXI.Graphics()
    ];
    planets["Dagobah"][1].name = "dagobah_planet";
    planets["Dagobah"][1].position.x = 200; 
    planets["Dagobah"][1].position.y = 50; 
    planets["Dagobah"][1].interactive = true; 
    planets["Dagobah"][1].buttonMode = true;
    planets["Dagobah"][2].name = "dagobah_landscape";
    planets["Dagobah"][2].position.x = 0; 
    planets["Dagobah"][2].position.y = 0;
    planets["Dagobah"][3].position.x = 240; 
    planets["Dagobah"][3].position.y = 25; 
    planets["Dagobah"][4].position.x = 240; 
    planets["Dagobah"][4].position.y = 25;
    planets["Dagobah"][5].lineStyle(1, 0xFFFFFF, 0.3);
    planets["Dagobah"][5].drawCircle(241, 90, 39);
    planets["Dagobah"][5].lineStyle(1, 0xFFFFFF, 1);
    planets["Dagobah"][5].moveTo(225, 70);
    planets["Dagobah"][5].lineTo(235, 45);
    planets["Dagobah"][5].moveTo(235, 45);
    planets["Dagobah"][5].lineTo(300, 45);
    
    planets["Bespin"] = [
        "Bespin",
        new PIXI.Sprite(planetTextures["Bespin"][1]),
        new PIXI.Sprite(planetTextures["Bespin"][2]),
        new PIXI.Text(planetTextures["Bespin"][0], initPlanetBlueStyleText),
        new PIXI.Text(planetTextures["Bespin"][0], initPlanetRedStyleText),
        new PIXI.Graphics()
    ];
    planets["Bespin"][1].name = "bespin_planet";
    planets["Bespin"][1].position.x = 25; 
    planets["Bespin"][1].position.y = 105; 
    planets["Bespin"][1].interactive = true; 
    planets["Bespin"][1].buttonMode = true;
    planets["Bespin"][2].name = "bespin_landscape";
    planets["Bespin"][2].position.x = 0; 
    planets["Bespin"][2].position.y = 0;
    planets["Bespin"][3].position.x = 65; 
    planets["Bespin"][3].position.y = 80; 
    planets["Bespin"][4].position.x = 65; 
    planets["Bespin"][4].position.y = 80;
    planets["Bespin"][5].lineStyle(2, 0xFFFFFF, 0.4);
    planets["Bespin"][5].drawCircle(67.5, 145.5, 38);
    planets["Bespin"][5].lineStyle(1, 0xFFFFFF, 1);
    planets["Bespin"][5].moveTo(50, 125);
    planets["Bespin"][5].lineTo(60, 100);
    planets["Bespin"][5].moveTo(60, 100);
    planets["Bespin"][5].lineTo(125, 100);
    
    planets["Geonosis"] = [
        "Geonosis",
        new PIXI.Sprite(planetTextures["Geonosis"][1]),
        new PIXI.Sprite(planetTextures["Geonosis"][2]),
        new PIXI.Text(planetTextures["Geonosis"][0], initPlanetBlueStyleText),
        new PIXI.Text(planetTextures["Geonosis"][0], initPlanetRedStyleText),
        new PIXI.Graphics()
    ];
    planets["Geonosis"][1].name = "geonosis_planet";
    planets["Geonosis"][1].position.x = 800; 
    planets["Geonosis"][1].position.y = 600; 
    planets["Geonosis"][1].interactive = true; 
    planets["Geonosis"][1].buttonMode = true;
    planets["Geonosis"][2].name = "geonosis_landscape";
    planets["Geonosis"][2].position.x = 0; 
    planets["Geonosis"][2].position.y = 0;
    planets["Geonosis"][3].position.x = 840; 
    planets["Geonosis"][3].position.y = 575; 
    planets["Geonosis"][4].position.x = 840; 
    planets["Geonosis"][4].position.y = 575;
    planets["Geonosis"][5].lineStyle(1, 0xFFFFFF, 0.3);
    planets["Geonosis"][5].drawCircle(840, 639, 39);
    planets["Geonosis"][5].lineStyle(1, 0xFFFFFF, 1);
    planets["Geonosis"][5].moveTo(825, 620);
    planets["Geonosis"][5].lineTo(835, 595);
    planets["Geonosis"][5].moveTo(835, 595);
    planets["Geonosis"][5].lineTo(900, 595);
    
    planets["Alderaan"] = [
        "Alderaan",
        new PIXI.Sprite(planetTextures["Alderaan"][1]),
        new PIXI.Sprite(planetTextures["Alderaan"][2]),
        new PIXI.Text(planetTextures["Alderaan"][0], initPlanetBlueStyleText),
        new PIXI.Text(planetTextures["Alderaan"][0], initPlanetRedStyleText),
        new PIXI.Graphics()
    ];
    planets["Alderaan"][1].name = "alderaan_planet";
    planets["Alderaan"][1].position.x = 50; 
    planets["Alderaan"][1].position.y = 350; 
    planets["Alderaan"][1].interactive = true; 
    planets["Alderaan"][1].buttonMode = true;
    planets["Alderaan"][2].name = "alderaan_landscape";
    planets["Alderaan"][2].position.x = 0; 
    planets["Alderaan"][2].position.y = 0;
    planets["Alderaan"][3].position.x = 90; 
    planets["Alderaan"][3].position.y = 325; 
    planets["Alderaan"][4].position.x = 90; 
    planets["Alderaan"][4].position.y = 325;
    planets["Alderaan"][5].lineStyle(1, 0xFFFFFF, 0.3);
    planets["Alderaan"][5].drawCircle(90, 390, 39);
    planets["Alderaan"][5].lineStyle(1, 0xFFFFFF, 1);
    planets["Alderaan"][5].moveTo(75, 370);
    planets["Alderaan"][5].lineTo(85, 345);
    planets["Alderaan"][5].moveTo(85, 345);
    planets["Alderaan"][5].lineTo(150, 345);
        
    planets["Kamino"] = [
        "Kamino",
        new PIXI.Sprite(planetTextures["Kamino"][1]),
        new PIXI.Sprite(planetTextures["Kamino"][2]),
        new PIXI.Text(planetTextures["Kamino"][0], initPlanetBlueStyleText),
        new PIXI.Text(planetTextures["Kamino"][0], initPlanetRedStyleText),
        new PIXI.Graphics()
    ];
    planets["Kamino"][1].name = "kamino_planet";
    planets["Kamino"][1].position.x = 400; 
    planets["Kamino"][1].position.y = 275; 
    planets["Kamino"][1].interactive = true; 
    planets["Kamino"][1].buttonMode = true;
    planets["Kamino"][2].name = "kamino_landscape";
    planets["Kamino"][2].position.x = 0; 
    planets["Kamino"][2].position.y = 0;
    planets["Kamino"][3].position.x = 440; 
    planets["Kamino"][3].position.y = 250; 
    planets["Kamino"][4].position.x = 440; 
    planets["Kamino"][4].position.y = 250;
    planets["Kamino"][5].lineStyle(1, 0xFFFFFF, 0.3);
    planets["Kamino"][5].drawCircle(441, 315, 39);
    planets["Kamino"][5].lineStyle(1, 0xFFFFFF, 1);
    planets["Kamino"][5].moveTo(425, 295);
    planets["Kamino"][5].lineTo(435, 270);
    planets["Kamino"][5].moveTo(435, 270);
    planets["Kamino"][5].lineTo(500, 270);
    
    
    planets["DeathStar"] = [
        "DeathStar",
        new PIXI.Sprite(planetTextures["DeathStar"][1]),
        new PIXI.Sprite(planetTextures["DeathStar"][2]),
        new PIXI.Text(planetTextures["DeathStar"][0], initPlanetBlueStyleText),
        new PIXI.Text(planetTextures["DeathStar"][0], initPlanetRedStyleText),
        new PIXI.Graphics()
    ];
    planets["DeathStar"][1].name = "deathstar_planet";
    planets["DeathStar"][1].position.x = 200; 
    planets["DeathStar"][1].position.y = 200; 
    planets["DeathStar"][1].interactive = true; 
    planets["DeathStar"][1].buttonMode = true;
    planets["DeathStar"][2].name = "deathstar_landscape";
    planets["DeathStar"][2].position.x = 0; 
    planets["DeathStar"][2].position.y = 0;
    planets["DeathStar"][3].position.x = 240; 
    planets["DeathStar"][3].position.y = 175; 
    planets["DeathStar"][4].position.x = 240; 
    planets["DeathStar"][4].position.y = 175;
    planets["DeathStar"][5].lineStyle(1, 0xFFFFFF, 0.3);
    planets["DeathStar"][5].drawCircle(240, 240, 39);
    planets["DeathStar"][5].lineStyle(1, 0xFFFFFF, 1);
    planets["DeathStar"][5].moveTo(225, 220);
    planets["DeathStar"][5].lineTo(235, 195);
    planets["DeathStar"][5].moveTo(235, 195);
    planets["DeathStar"][5].lineTo(300, 195);
    
    
    planets["Utapau"] = [
        "Utapau",
        new PIXI.Sprite(planetTextures["Utapau"][1]),
        new PIXI.Sprite(planetTextures["Utapau"][2]),
        new PIXI.Text(planetTextures["Utapau"][0], initPlanetBlueStyleText),
        new PIXI.Text(planetTextures["Utapau"][0], initPlanetRedStyleText),
        new PIXI.Graphics()
    ];
    planets["Utapau"][1].name = "utapau_planet";
    planets["Utapau"][1].position.x = 700; 
    planets["Utapau"][1].position.y = 50; 
    planets["Utapau"][1].interactive = true; 
    planets["Utapau"][1].buttonMode = true;
    planets["Utapau"][2].name = "utapau_landscape";
    planets["Utapau"][2].position.x = 0; 
    planets["Utapau"][2].position.y = 0;
    planets["Utapau"][3].position.x = 740; 
    planets["Utapau"][3].position.y = 25; 
    planets["Utapau"][4].position.x = 740; 
    planets["Utapau"][4].position.y = 25;
    planets["Utapau"][5].lineStyle(1, 0xFFFFFF, 0.3);
    planets["Utapau"][5].drawCircle(741, 90, 39);
    planets["Utapau"][5].lineStyle(1, 0xFFFFFF, 1);
    planets["Utapau"][5].moveTo(725, 70);
    planets["Utapau"][5].lineTo(735, 45);
    planets["Utapau"][5].moveTo(735, 45);
    planets["Utapau"][5].lineTo(800, 45);
    
    
    planets["Saleucami"] = [
        "Saleucami",
        new PIXI.Sprite(planetTextures["Saleucami"][1]),
        new PIXI.Sprite(planetTextures["Saleucami"][2]),
        new PIXI.Text(planetTextures["Saleucami"][0], initPlanetBlueStyleText),
        new PIXI.Text(planetTextures["Saleucami"][0], initPlanetRedStyleText),
        new PIXI.Graphics()
    ];
    planets["Saleucami"][1].name = "saleucami_planet";
    planets["Saleucami"][1].position.x = 880; 
    planets["Saleucami"][1].position.y = 145; 
    planets["Saleucami"][1].interactive = true; 
    planets["Saleucami"][1].buttonMode = true;
    planets["Saleucami"][2].name = "saleucami_landscape";
    planets["Saleucami"][2].position.x = 0; 
    planets["Saleucami"][2].position.y = 0;
    planets["Saleucami"][3].position.x = 920; 
    planets["Saleucami"][3].position.y = 120; 
    planets["Saleucami"][4].position.x = 920; 
    planets["Saleucami"][4].position.y = 120;
    planets["Saleucami"][5].lineStyle(1, 0xFFFFFF, 0.3);
    planets["Saleucami"][5].drawCircle(920, 185, 39);
    planets["Saleucami"][5].lineStyle(1, 0xFFFFFF, 1);
    planets["Saleucami"][5].moveTo(905, 165);
    planets["Saleucami"][5].lineTo(915, 140);
    planets["Saleucami"][5].moveTo(915, 140);
    planets["Saleucami"][5].lineTo(980, 140);
    
    
    planets["Jakku"] = [
        "Jakku",
        new PIXI.Sprite(planetTextures["Jakku"][1]),
        new PIXI.Sprite(planetTextures["Jakku"][2]),
        new PIXI.Text(planetTextures["Jakku"][0], initPlanetBlueStyleText),
        new PIXI.Text(planetTextures["Jakku"][0], initPlanetRedStyleText),
        new PIXI.Graphics()
    ];
    planets["Jakku"][1].name = "jakku_planet";
    planets["Jakku"][1].position.x = 450; 
    planets["Jakku"][1].position.y = 75; 
    planets["Jakku"][1].interactive = true; 
    planets["Jakku"][1].buttonMode = true;
    planets["Jakku"][2].name = "jakku_landscape";
    planets["Jakku"][2].position.x = 0; 
    planets["Jakku"][2].position.y = 0;
    planets["Jakku"][3].position.x = 490; 
    planets["Jakku"][3].position.y = 50; 
    planets["Jakku"][4].position.x = 490; 
    planets["Jakku"][4].position.y = 50;
    planets["Jakku"][5].lineStyle(1, 0xFFFFFF, 0.3);
    planets["Jakku"][5].drawCircle(491, 115, 39);
    planets["Jakku"][5].lineStyle(1, 0xFFFFFF, 1);
    planets["Jakku"][5].moveTo(475, 95);
    planets["Jakku"][5].lineTo(485, 70);
    planets["Jakku"][5].moveTo(485, 70);
    planets["Jakku"][5].lineTo(550, 70);
    
    return planets;
}
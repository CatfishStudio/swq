function initGame()
{
    userMapPlanets = initMap();
}

function initMap()
{
    var planets = new Object();
    
    planets["Coruscant"] = [
        "Coruscant",
        new PIXI.Sprite(planetTextures["Coruscant"][0]),
        new PIXI.Sprite(planetTextures["Coruscant"][1]),
        "Корусант"
    ];
    planets["Coruscant"][1].name = "coruscant_planet";
    planets["Coruscant"][1].position.x = 550; 
    planets["Coruscant"][1].position.y = 600; 
    planets["Coruscant"][1].interactive = true; 
    planets["Coruscant"][1].buttonMode = true;
    planets["Coruscant"][2].name = "coruscant_landscape";
    planets["Coruscant"][2].position.x = 0; 
    planets["Coruscant"][2].position.y = 0; 
    
    planets["Totooine"] = [
        "Totooine",
        new PIXI.Sprite(planetTextures["Totooine"][0]),
        new PIXI.Sprite(planetTextures["Totooine"][1]),
        "Татуин"
    ];
    planets["Totooine"][1].name = "tatooine_planet";
    planets["Totooine"][1].position.x = 300; 
    planets["Totooine"][1].position.y = 400; 
    planets["Totooine"][1].interactive = true; 
    planets["Totooine"][1].buttonMode = true;
    planets["Totooine"][2].name = "tatooine_landscape";
    planets["Totooine"][2].position.x = 0; 
    planets["Totooine"][2].position.y = 0;
    
    planets["Naboo"] = [
        "Naboo",
        new PIXI.Sprite(planetTextures["Naboo"][0]),
        new PIXI.Sprite(planetTextures["Naboo"][1]),
        "Набу"
    ];
    planets["Naboo"][1].name = "naboo_planet";
    planets["Naboo"][1].position.x = 630; 
    planets["Naboo"][1].position.y = 240; 
    planets["Naboo"][1].interactive = true; 
    planets["Naboo"][1].buttonMode = true;
    planets["Naboo"][2].name = "naboo_landscape";
    planets["Naboo"][2].position.x = 0; 
    planets["Naboo"][2].position.y = 0;
    
    planets["Endor"] = [
        "Endor",
        new PIXI.Sprite(planetTextures["Endor"][0]),
        new PIXI.Sprite(planetTextures["Endor"][1]),
        "Эндор"
    ];
    planets["Endor"][1].name = "endor_planet";
    planets["Endor"][1].position.x = 150; 
    planets["Endor"][1].position.y = 550; 
    planets["Endor"][1].interactive = true; 
    planets["Endor"][1].buttonMode = true;
    planets["Endor"][2].name = "endor_landscape";
    planets["Endor"][2].position.x = 0; 
    planets["Endor"][2].position.y = 0;
    
    planets["Hoth"] = [
        "Hoth",
        new PIXI.Sprite(planetTextures["Hoth"][0]),
        new PIXI.Sprite(planetTextures["Hoth"][1]),
        "Хот"
    ];
    planets["Hoth"][1].name = "hoth_planet";
    planets["Hoth"][1].position.x = 850; 
    planets["Hoth"][1].position.y = 450; 
    planets["Hoth"][1].interactive = true; 
    planets["Hoth"][1].buttonMode = true;
    planets["Hoth"][2].name = "hoth_landscape";
    planets["Hoth"][2].position.x = 0; 
    planets["Hoth"][2].position.y = 0;
    
    planets["Mustafar"] = [
        "Mustafar",
        new PIXI.Sprite(planetTextures["Mustafar"][0]),
        new PIXI.Sprite(planetTextures["Mustafar"][1]),
        "Мустафар"
    ];
    planets["Mustafar"][1].name = "mustafar_planet";
    planets["Mustafar"][1].position.x = 600; 
    planets["Mustafar"][1].position.y = 425; 
    planets["Mustafar"][1].interactive = true; 
    planets["Mustafar"][1].buttonMode = true;
    planets["Mustafar"][2].name = "mustafar_landscape";
    planets["Mustafar"][2].position.x = 0; 
    planets["Mustafar"][2].position.y = 0;
    
    planets["Dagobah"] = [
        "Dagobah",
        new PIXI.Sprite(planetTextures["Dagobah"][0]),
        new PIXI.Sprite(planetTextures["Dagobah"][1]),
        "Дагоба"
    ];
    planets["Dagobah"][1].name = "dagobah_planet";
    planets["Dagobah"][1].position.x = 200; 
    planets["Dagobah"][1].position.y = 25; 
    planets["Dagobah"][1].interactive = true; 
    planets["Dagobah"][1].buttonMode = true;
    planets["Dagobah"][2].name = "dagobah_landscape";
    planets["Dagobah"][2].position.x = 0; 
    planets["Dagobah"][2].position.y = 0;
    
    planets["Bespin"] = [
        "Bespin",
        new PIXI.Sprite(planetTextures["Bespin"][0]),
        new PIXI.Sprite(planetTextures["Bespin"][1]),
        "Беспин"
    ];
    planets["Bespin"][1].name = "bespin_planet";
    planets["Bespin"][1].position.x = 375; 
    planets["Bespin"][1].position.y = 105; 
    planets["Bespin"][1].interactive = true; 
    planets["Bespin"][1].buttonMode = true;
    planets["Bespin"][2].name = "bespin_landscape";
    planets["Bespin"][2].position.x = 0; 
    planets["Bespin"][2].position.y = 0;
    
    planets["Geonosis"] = [
        "Geonosis",
        new PIXI.Sprite(planetTextures["Geonosis"][0]),
        new PIXI.Sprite(planetTextures["Geonosis"][1]),
        "Джеонозис"
    ];
    planets["Geonosis"][1].name = "geonosis_planet";
    planets["Geonosis"][1].position.x = 800; 
    planets["Geonosis"][1].position.y = 600; 
    planets["Geonosis"][1].interactive = true; 
    planets["Geonosis"][1].buttonMode = true;
    planets["Geonosis"][2].name = "geonosis_landscape";
    planets["Geonosis"][2].position.x = 0; 
    planets["Geonosis"][2].position.y = 0;
    
    planets["Alderaan"] = [
        "Alderaan",
        new PIXI.Sprite(planetTextures["Alderaan"][0]),
        new PIXI.Sprite(planetTextures["Alderaan"][1]),
        "Альдераан"
    ];
    planets["Alderaan"][1].name = "alderaan_planet";
    planets["Alderaan"][1].position.x = 50; 
    planets["Alderaan"][1].position.y = 350; 
    planets["Alderaan"][1].interactive = true; 
    planets["Alderaan"][1].buttonMode = true;
    planets["Alderaan"][2].name = "alderaan_landscape";
    planets["Alderaan"][2].position.x = 0; 
    planets["Alderaan"][2].position.y = 0;
    
    planets["Kamino"] = [
        "Kamino",
        new PIXI.Sprite(planetTextures["Kamino"][0]),
        new PIXI.Sprite(planetTextures["Kamino"][1]),
        "Камино"
    ];
    planets["Kamino"][1].name = "kamino_planet";
    planets["Kamino"][1].position.x = 400; 
    planets["Kamino"][1].position.y = 275; 
    planets["Kamino"][1].interactive = true; 
    planets["Kamino"][1].buttonMode = true;
    planets["Kamino"][2].name = "kamino_landscape";
    planets["Kamino"][2].position.x = 0; 
    planets["Kamino"][2].position.y = 0;
    
    planets["DeathStar"] = [
        "DeathStar",
        new PIXI.Sprite(planetTextures["DeathStar"][0]),
        new PIXI.Sprite(planetTextures["DeathStar"][1]),
        "Звезда смерти"
    ];
    planets["DeathStar"][1].name = "deathstar_planet";
    planets["DeathStar"][1].position.x = 200; 
    planets["DeathStar"][1].position.y = 200; 
    planets["DeathStar"][1].interactive = true; 
    planets["DeathStar"][1].buttonMode = true;
    planets["DeathStar"][2].name = "deathstar_landscape";
    planets["DeathStar"][2].position.x = 0; 
    planets["DeathStar"][2].position.y = 0;
    
    planets["Utapau"] = [
        "Utapau",
        new PIXI.Sprite(planetTextures["Utapau"][0]),
        new PIXI.Sprite(planetTextures["Utapau"][1]),
        "Утапау"
    ];
    planets["Utapau"][1].name = "utapau_planet";
    planets["Utapau"][1].position.x = 700; 
    planets["Utapau"][1].position.y = 50; 
    planets["Utapau"][1].interactive = true; 
    planets["Utapau"][1].buttonMode = true;
    planets["Utapau"][2].name = "utapau_landscape";
    planets["Utapau"][2].position.x = 0; 
    planets["Utapau"][2].position.y = 0;
    
    planets["Saleucami"] = [
        "Saleucami",
        new PIXI.Sprite(planetTextures["Saleucami"][0]),
        new PIXI.Sprite(planetTextures["Saleucami"][1]),
        "Салукемай"
    ];
    planets["Saleucami"][1].name = "saleucami_planet";
    planets["Saleucami"][1].position.x = 880; 
    planets["Saleucami"][1].position.y = 145; 
    planets["Saleucami"][1].interactive = true; 
    planets["Saleucami"][1].buttonMode = true;
    planets["Saleucami"][2].name = "saleucami_landscape";
    planets["Saleucami"][2].position.x = 0; 
    planets["Saleucami"][2].position.y = 0;
    
    return planets;
}
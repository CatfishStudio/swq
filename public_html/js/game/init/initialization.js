function initGame()
{
    userMapPlanets = initMap();
}

function initMap()
{
    var planets = new Object();
    
    var coruscant_planet = new PIXI.Sprite(planetTextures["Coruscant"][0]);
    coruscant_planet.name = "coruscant_planet";
    coruscant_planet.position.x = 525; coruscant_planet.position.y = 500; 
    coruscant_planet.interactive = true; coruscant_planet.buttonMode = true;
    
    var coruscant_landscape = new PIXI.Sprite(planetTextures["Coruscant"][1]);
    coruscant_landscape.name = "coruscant_landscape";
    coruscant_landscape.position.x = 0; coruscant_landscape.position.y = 0; 
    
    planets["Coruscant"] = [
        "Coruscant",
        coruscant_planet,
        coruscant_landscape
    ];
    
    return planets;
}
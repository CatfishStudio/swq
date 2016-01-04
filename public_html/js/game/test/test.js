
/* == НАЧАЛО ФАЙЛА ========================================================= */

var testStage;

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

function testRedCharacteristics()
{
    for(var key in userPlanets)
    {
        var hitCountAI = 0;
        hitCountAI = userPersonages[userPlanets[key].redPersonage1].hitAttack1 + userPersonages[userPlanets[key].redPersonage1].hitAttack2 + userPersonages[userPlanets[key].redPersonage1].hitAttack3 + userPersonages[userPlanets[key].redPersonage1].hitAttack4 + userPersonages[userPlanets[key].redPersonage1].hitAttack5;
        hitCountAI += userPersonages[userPlanets[key].redPersonage2].hitAttack1 + userPersonages[userPlanets[key].redPersonage2].hitAttack2 + userPersonages[userPlanets[key].redPersonage2].hitAttack3 + userPersonages[userPlanets[key].redPersonage2].hitAttack4 + userPersonages[userPlanets[key].redPersonage2].hitAttack5;
        hitCountAI += userPersonages[userPlanets[key].redPersonage3].hitAttack1 + userPersonages[userPlanets[key].redPersonage3].hitAttack2 + userPersonages[userPlanets[key].redPersonage3].hitAttack3 + userPersonages[userPlanets[key].redPersonage3].hitAttack4 + userPersonages[userPlanets[key].redPersonage3].hitAttack5;
        hitCountAI /= 10;
        console.log("ТЕСТ[red]: " + key + " = " + hitCountAI);
    }
}

function testBlueCharacteristics()
{
    for(var key in userPlanets)
    {
        var hitCountAI = 0;
        hitCountAI = userPersonages[userPlanets[key].bluePersonage1].hitAttack1 + userPersonages[userPlanets[key].bluePersonage1].hitAttack2 + userPersonages[userPlanets[key].bluePersonage1].hitAttack3 + userPersonages[userPlanets[key].bluePersonage1].hitAttack4 + userPersonages[userPlanets[key].bluePersonage1].hitAttack5;
        hitCountAI += userPersonages[userPlanets[key].bluePersonage2].hitAttack1 + userPersonages[userPlanets[key].bluePersonage2].hitAttack2 + userPersonages[userPlanets[key].bluePersonage2].hitAttack3 + userPersonages[userPlanets[key].bluePersonage2].hitAttack4 + userPersonages[userPlanets[key].bluePersonage2].hitAttack5;
        hitCountAI += userPersonages[userPlanets[key].bluePersonage3].hitAttack1 + userPersonages[userPlanets[key].bluePersonage3].hitAttack2 + userPersonages[userPlanets[key].bluePersonage3].hitAttack3 + userPersonages[userPlanets[key].bluePersonage3].hitAttack4 + userPersonages[userPlanets[key].bluePersonage3].hitAttack5;
        hitCountAI /= 10;
        console.log("ТЕСТ[blue]: " + key + " = " + hitCountAI);
    }
}

/* == КОНЕЦ ФАЙЛА ========================================================== */

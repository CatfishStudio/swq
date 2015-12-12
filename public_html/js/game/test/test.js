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
    anim.position.y = 0; 
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
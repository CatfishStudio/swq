var testStage;

function testCreate()
{
	testStage = new PIXI.Container();
	stage.addChild(testStage);
        
        testBackground();
        testAnimation();
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
    anim.position.x = 100; 
    anim.position.y = 200; 
    anim.interactive = true; 
    anim.buttonMode = true; 
    anim.loop = true; 
    anim.animationSpeed = 0.2;
    anim.play();
    testStage.addChild(anim);
}

/* == START FILE ========================================================= */

var renderer = null;
var stage = null;

function onInit()
{
	renderer = PIXI.autoDetectRenderer(860, 730,{backgroundColor : 0xFFFFFF, antialias : true});
    document.body.appendChild(renderer.view);
    stage = new PIXI.Container();

    draw();
	
	var game = Game(stage);
	game.loadAssets();
	
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

window.addEventListener("load", onInit, false);

/* == END FILE ========================================================== */

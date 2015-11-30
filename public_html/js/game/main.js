var renderer;
var stage;

function init()
{
	renderer = PIXI.autoDetectRenderer(MAIN_WIDTH, MAIN_HEIGH,{backgroundColor : MAIN_BACKGROUND_COLOR});
	document.body.appendChild(renderer.view);
	stage = new PIXI.Container();

	draw();

	preloaderCreate();		// Запускаем загрузку ассетов
}

window.addEventListener("load", init, false);

function draw() 
{
	requestAnimationFrame(draw);
	renderer.render(stage);
}
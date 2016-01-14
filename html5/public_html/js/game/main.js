
/* == НАЧАЛО ФАЙЛА ========================================================= */

var renderer;
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

/* == КОНЕЦ ФАЙЛА ========================================================== */

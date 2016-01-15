
/* == НАЧАЛО ФАЙЛА ========================================================= */

var renderer;
var stage;
var stats;

function init()
{
    stats = new Stats();
    stats.setMode( 1 );
    document.body.appendChild( stats.domElement );
        
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
    stats.begin();
    
    requestAnimationFrame(draw);
    renderer.render(stage);
    
    stats.end();
}

window.addEventListener("load", init, false);

/* == КОНЕЦ ФАЙЛА ========================================================== */

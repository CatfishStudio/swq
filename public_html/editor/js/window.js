var windowStage;
var selectCell = CELL_TYPE_DROP;


function windowCreate()
{
    windowStage = new PIXI.Container();
    stage.addChild(windowStage);
    
    windowGraphicsCreate();
    initField();
    createField(windowStage);
}

function windowRemove()
{
    stage.removeChild(windowStage);
    windowStage = null;
}

function windowGraphicsCreate()
{
    var graphics = new PIXI.Graphics();
    graphics.position.x = 0;
    graphics.position.y = 0;
    graphics.lineStyle(2, 0x777777, 0.2);
    graphics.clear();
    graphics.beginFill(0x777777, 0.25);
    graphics.drawRoundedRect(5, 5, 850, 720, 5);
    graphics.endFill();

    windowStage.addChild(graphics);
    }
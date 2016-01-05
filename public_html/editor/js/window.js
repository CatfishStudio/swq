var windowStage;
var selectCell = CELL_TYPE_DROP;


function windowCreate()
{
    windowStage = new PIXI.Container();
    stage.addChild(windowStage);
    
    windowGraphicsCreate();
    initField();
    createField(windowStage);
    windowPanelCellType();
    windowPanelHits();
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

function windowPanelCellType()
{
    var graphics = new PIXI.Graphics();
    graphics.name = CELL_TYPE_CLEAR;
    graphics.lineStyle(2, 0x000000, 1);
    graphics.beginFill(0xFFFFFF, 1.0);
    graphics.drawRect(0, 0, 82, 82);
    graphics.endFill();
    graphics.position.x = 10;
    graphics.position.y = 10;
    graphics.interactive = true;
    graphics.buttonMode = true;
    graphics.tap = onCellTypeClick;
    graphics.click = onCellTypeClick;
    windowStage.addChild(graphics);
    
    graphics = new PIXI.Graphics();
    graphics.name = CELL_TYPE_DROP;
    graphics.lineStyle(2, 0x000000, 1);
    graphics.beginFill(0x000000, 1.0);
    graphics.drawRect(0, 0, 82, 82);
    graphics.endFill();
    graphics.position.x = 10;
    graphics.position.y = 100;
    graphics.interactive = true;
    graphics.buttonMode = true;
    graphics.tap = onCellTypeClick;
    graphics.click = onCellTypeClick;
    windowStage.addChild(graphics);
}

function onCellTypeClick() 
{
    if(this.name === CELL_TYPE_DROP) selectCell = CELL_TYPE_DROP;
    if(this.name === CELL_TYPE_CLEAR) selectCell = CELL_TYPE_CLEAR;
    if(this.name === HIT_1) selectCell = HIT_1;
    if(this.name === HIT_2) selectCell = HIT_2;
    if(this.name === HIT_3) selectCell = HIT_3;
    if(this.name === HIT_4) selectCell = HIT_4;
    if(this.name === HIT_5) selectCell = HIT_5;
}

function windowPanelHits()
{
    var graphics = new PIXI.Graphics();
    graphics.name = HIT_1;
    graphics.lineStyle(2, 0x000000, 1);
    graphics.beginFill(0xFFFF00, 1.0);
    graphics.drawCircle(0, 0, 35);
    graphics.endFill();
    graphics.position.x = 50;
    graphics.position.y = 250;
    graphics.interactive = true;
    graphics.buttonMode = true;
    graphics.tap = onCellTypeClick;
    graphics.click = onCellTypeClick;
    windowStage.addChild(graphics);
    
    graphics = new PIXI.Graphics();
    graphics.name = HIT_2;
    graphics.lineStyle(2, 0x000000, 1);
    graphics.beginFill(0xFF0000, 1.0);
    graphics.drawCircle(0, 0, 35);
    graphics.endFill();
    graphics.position.x = 50;
    graphics.position.y = 350;
    graphics.interactive = true;
    graphics.buttonMode = true;
    graphics.tap = onCellTypeClick;
    graphics.click = onCellTypeClick;
    windowStage.addChild(graphics);
    
    graphics = new PIXI.Graphics();
    graphics.name = HIT_3;
    graphics.lineStyle(2, 0x000000, 1);
    graphics.beginFill(0x8000FF, 1.0);
    graphics.drawCircle(0, 0, 35);
    graphics.endFill();
    graphics.position.x = 50;
    graphics.position.y = 450;
    graphics.interactive = true;
    graphics.buttonMode = true;
    graphics.tap = onCellTypeClick;
    graphics.click = onCellTypeClick;
    windowStage.addChild(graphics);
    
    graphics = new PIXI.Graphics();
    graphics.name = HIT_4;
    graphics.lineStyle(2, 0x000000, 1);
    graphics.beginFill(0x0000FF, 1.0);
    graphics.drawCircle(0, 0, 35);
    graphics.endFill();
    graphics.position.x = 50;
    graphics.position.y = 550;
    graphics.interactive = true;
    graphics.buttonMode = true;
    graphics.tap = onCellTypeClick;
    graphics.click = onCellTypeClick;
    windowStage.addChild(graphics);
    
    graphics = new PIXI.Graphics();
    graphics.name = HIT_5;
    graphics.lineStyle(2, 0x000000, 1);
    graphics.beginFill(0x00FF80, 1.0);
    graphics.drawCircle(0, 0, 35);
    graphics.endFill();
    graphics.position.x = 50;
    graphics.position.y = 650;
    graphics.interactive = true;
    graphics.buttonMode = true;
    graphics.tap = onCellTypeClick;
    graphics.click = onCellTypeClick;
    windowStage.addChild(graphics);
}
var field = [];

function initField()
{
    for (var i = 0; i < 6; i++)
    {
        for (var j = 0; j < 6; j++)
        {   
            field.push([CELL_TYPE_CLEAR, HIT_0, i, j]);
        }
    }
}

function createField()
{
    var index = 0;
     for (var i = 0; i < 6; i++)
    {
        for (var j = 0; j < 6; j++)
        {   
            var graphics = new PIXI.Graphics();
            graphics.name = "i"+i+":j"+j;
            graphics.lineStyle(2, 0x000000, 1);
            graphics.beginFill(0xFFFFFF, 0.75);
            graphics.drawRect(0, 0, 82, 82);
            graphics.endFill();
            graphics.cellType = field[index][0];
            graphics.cellObject = field[index][1];
            graphics.cellColumn = field[index][2];
            graphics.cellRow = field[index][3];
            graphics.index = index;
            graphics.position.x = 180 + (82 * i);
            graphics.position.y = 120 + (82 * j);
            graphics.interactive = true;
            graphics.buttonMode = true;
            graphics.tap = onCellClick;
            graphics.click = onCellClick;
            windowStage.addChild(graphics);
        }
    }
}

function onCellClick() 
{
    if(selectCell === CELL_TYPE_CLEAR)
    {
        this.cellType = CELL_TYPE_CLEAR;
        field[this.index][0] = CELL_TYPE_CLEAR;
        this.cellObject = HIT_0;
        field[this.index][1] = HIT_0;
        
        var graphics = new PIXI.Graphics();
        graphics.lineStyle(2, 0x000000, 1);
        graphics.beginFill(0xFFFFFF, 1.0);
        graphics.drawRect(0, 0, 82, 82);
        graphics.endFill();
        this.addChild(graphics);
    }
    if(selectCell === CELL_TYPE_DROP)
    {
        this.cellType = CELL_TYPE_DROP;
        field[this.index][0] = CELL_TYPE_DROP;
        this.cellObject = HIT_0;
        field[this.index][1] = HIT_0;
                
        var graphics = new PIXI.Graphics();
        graphics.lineStyle(2, 0x000000, 1);
        graphics.beginFill(0x000000, 1.0);
        graphics.drawRect(0, 0, 82, 82);
        graphics.endFill();
        this.addChild(graphics);
    }
    if(selectCell === HIT_1)
    {
        this.cellObject = HIT_1;
        field[this.index][1] = HIT_1;
        
        var graphics = new PIXI.Graphics();
        graphics.name = HIT_1;
        graphics.lineStyle(2, 0x000000, 1);
        graphics.beginFill(0xFFFF00, 1.0);
        graphics.drawCircle(0, 0, 35);
        graphics.endFill();
        graphics.position.x = 40;
        graphics.position.y = 40;
        this.addChild(graphics);
    }
    if(selectCell === HIT_2)
    {
        this.cellObject = HIT_2;
        field[this.index][1] = HIT_2;
        
        var graphics = new PIXI.Graphics();
        graphics.name = HIT_2;
        graphics.lineStyle(2, 0x000000, 1);
        graphics.beginFill(0xFF0000, 1.0);
        graphics.drawCircle(0, 0, 35);
        graphics.endFill();
        graphics.position.x = 40;
        graphics.position.y = 40;
        this.addChild(graphics);
    }
    if(selectCell === HIT_3)
    {
        this.cellObject = HIT_3;
        field[this.index][1] = HIT_3;
        
        var graphics = new PIXI.Graphics();
        graphics.name = HIT_3;
        graphics.lineStyle(2, 0x000000, 1);
        graphics.beginFill(0x8000FF, 1.0);
        graphics.drawCircle(0, 0, 35);
        graphics.endFill();
        graphics.position.x = 40;
        graphics.position.y = 40;
        this.addChild(graphics);
    }
    if(selectCell === HIT_4)
    {
        this.cellObject = HIT_4;
        field[this.index][1] = HIT_4;
        
        var graphics = new PIXI.Graphics();
        graphics.name = HIT_4;
        graphics.lineStyle(2, 0x000000, 1);
        graphics.beginFill(0x0000FF, 1.0);
        graphics.drawCircle(0, 0, 35);
        graphics.endFill();
        graphics.position.x = 40;
        graphics.position.y = 40;
        this.addChild(graphics);
    }
    if(selectCell === HIT_5)
    {
        this.cellObject = HIT_5;
        field[this.index][1] = HIT_5;
        
        var graphics = new PIXI.Graphics();
        graphics.name = HIT_5;
        graphics.lineStyle(2, 0x000000, 1);
        graphics.beginFill(0x00FF80, 1.0);
        graphics.drawCircle(0, 0, 35);
        graphics.endFill();
        graphics.position.x = 40;
        graphics.position.y = 40;
        this.addChild(graphics);
    }
    
}
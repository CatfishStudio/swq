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
        
        var graphics = new PIXI.Graphics();
        graphics.lineStyle(2, 0x000000, 1);
        graphics.beginFill(0xFFFFFF, 0.75);
        graphics.drawRect(0, 0, 82, 82);
        graphics.endFill();
        this.addChild(graphics);
    }
    if(selectCell === CELL_TYPE_DROP)
    {
        this.cellType = CELL_TYPE_DROP;
        field[this.index][0] = CELL_TYPE_DROP;
                
        var graphics = new PIXI.Graphics();
        graphics.lineStyle(2, 0x000000, 1);
        graphics.beginFill(0x000000, 0.75);
        graphics.drawRect(0, 0, 82, 82);
        graphics.endFill();
        this.addChild(graphics);
    }
    
}
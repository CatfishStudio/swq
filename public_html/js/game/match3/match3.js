
/* == НАЧАЛО ФАЙЛА ========================================================= */

var MATCH_COLUMNS = 6;
var MATCH_ROWS = 6;
var MATCH_CELL_WIDTH = 82;
var MATCH_CELL_HEIGHT = 82;
var MATCH_CELL_TYPE_DROP = "CELL_TYPE_DROP";
var MATCH_CELL_TYPE_CLEAR = "CELL_TYPE_CLEAR";
var MATCH_CELL_TYPE_EMPTY = "CELL_TYPE_EMPTY";
var MATCH_HIT_0 = "HIT_0";
var MATCH_HIT_1 = "HIT_1";
var MATCH_HIT_2 = "HIT_2";
var MATCH_HIT_3 = "HIT_3";
var MATCH_HIT_4 = "HIT_4";
var MATCH_HIT_5 = "HIT_5";


var matchStage;						// главный stage
var matchMatrixCell = new Object();                     // Матрица ячеек игрового поля
var matchMatrixUnit = new Object();                     // Матрица юнитов на игровом поле

var matchMatrixFrontPosition = new Object();            // Матрица позиций x,y юнитов игрового поля
var matchMatrixBackPosition = new Object();		// Матрица позиций x,y юнитов за пределами игрового поля

var matchMoveDownProcesses = new Object();		// запущенные процессы спуска юнитов

var matchSelectUnit1 = null;                            // выбранный первый юнит
var matchSelectUnit2 = null;                            // выбран второй юнит

var matchFieldBlocked = false;                          // блокирование игрового поля

var modeAI = false;					// режим искуственного интелекта (по умолчанию отключен в начале)

var matchLevelJSON = null;                              // json игрового поля

/* Инициализация матриц позиций ================================================================ */
function initMatchMatrixPosition()
{
    matchMatrixFrontPosition = new Object();
    matchMatrixBackPosition = new Object();
    for(var i = 0; i < MATCH_COLUMNS; i++)
    {
        for(var j = 0; j < MATCH_ROWS; j++)
        {
            matchMatrixFrontPosition["i"+i+":j"+j] = [184 + (MATCH_CELL_WIDTH * i), 120 + (MATCH_CELL_HEIGHT * j)]; // x,y
            matchMatrixBackPosition["i"+i+":j"+j] = [180 + (MATCH_CELL_WIDTH * i), -372 + (MATCH_CELL_HEIGHT * j)]; // x,y
        }
    }
}

/* Создание игрового поля ====================================================================== */
function createMatchField(levelJSON)
{
    matchLevelJSON = levelJSON;
    
    initMatchMatrixPosition();

    matchStage = new PIXI.Container();
    matchMatrixCell = new Object();
    matchMatrixUnit = new Object();

    /* ячейки */
    var index = 0;
    for(var iCell = 0; iCell < MATCH_COLUMNS; iCell++)
    {
            for(var jCell = 0; jCell < MATCH_ROWS; jCell++)
            {
                    if(levelJSON.data.Level.cell[index].cellType !== MATCH_CELL_TYPE_DROP)
                    {
                            var graphics = new PIXI.Graphics();
                            if(side === SIDE_JEDI)
                            {
                                graphics.lineStyle(1, 0x0080FF, 0.25);
                                graphics.beginFill(0x0080FF, 0.25);
                            }
                            if(side === SIDE_SITH)
                            {
                                graphics.lineStyle(1, 0x880000, 0.25);
                                graphics.beginFill(0x880000, 0.25);
                            }
                            graphics.drawRoundedRect(0, 0, MATCH_CELL_WIDTH, MATCH_CELL_HEIGHT, 15);
                            graphics.endFill();
                            graphics.cellType = levelJSON.data.Level.cell[index].cellType;
                            graphics.position.x = matchMatrixFrontPosition["i"+iCell+":j"+jCell][0];
                            graphics.position.y = matchMatrixFrontPosition["i"+iCell+":j"+jCell][1];
                            matchMatrixCell["i"+iCell+":j"+jCell] = graphics;
                            matchStage.addChild(matchMatrixCell["i"+iCell+":j"+jCell]);
                    }else{
                            matchMatrixCell["i"+iCell+":j"+jCell] = null;
                    }
                    index++;
            }
    }

    /* Юниты */
    index = 0;
    var sprite;
    for(var iUnit = 0; iUnit < MATCH_COLUMNS; iUnit++)
    {
            for(var jUnit = 0; jUnit < MATCH_ROWS; jUnit++)
            {
                    if(levelJSON.data.Level.cell[index].cellObject !== MATCH_HIT_0)
                    {
                            if(levelJSON.data.Level.cell[index].cellObject === MATCH_HIT_1) sprite = new PIXI.Sprite(hit1Texture);
                            if(levelJSON.data.Level.cell[index].cellObject === MATCH_HIT_2) sprite = new PIXI.Sprite(hit2Texture);
                            if(levelJSON.data.Level.cell[index].cellObject === MATCH_HIT_3) sprite = new PIXI.Sprite(hit3Texture);
                            if(levelJSON.data.Level.cell[index].cellObject === MATCH_HIT_4) sprite = new PIXI.Sprite(hit4Texture);
                            if(levelJSON.data.Level.cell[index].cellObject === MATCH_HIT_5) sprite = new PIXI.Sprite(hit5Texture);
                            sprite.name = "i"+iUnit+":j"+jUnit;
                            sprite.position.x = matchMatrixFrontPosition["i"+iUnit+":j"+jUnit][0];
                            sprite.position.y = matchMatrixFrontPosition["i"+iUnit+":j"+jUnit][1];
                            sprite.interactive = true;
                            sprite.buttonMode = true;

                            sprite.unitType = levelJSON.data.Level.cell[index].cellObject;
                            sprite.flagRemove = false;
                            sprite.posColumnI = iUnit;
                            sprite.posRowJ = jUnit;

                            sprite.click = onMatchUnitClick;
                            sprite.tap = onMatchUnitClick;

                            matchMatrixUnit["i"+iUnit+":j"+jUnit] = sprite;
                            matchStage.addChild(matchMatrixUnit["i"+iUnit+":j"+jUnit]);
                   }else{
                            sprite = new PIXI.Sprite(hit1Texture);
                            sprite.name = "i"+iUnit+":j"+jUnit;
                            sprite.position.x = matchMatrixFrontPosition["i"+iUnit+":j"+jUnit][0];
                            sprite.position.y = matchMatrixFrontPosition["i"+iUnit+":j"+jUnit][1];
                            sprite.unitType = MATCH_HIT_0;
                            sprite.flagRemove = false;
                            sprite.posColumnI = iUnit;
                            sprite.posRowJ = jUnit;
                            matchMatrixUnit["i"+iUnit+":j"+jUnit] = sprite;
                    }
                    index++;
            }
    }
}

/* Событие: нажатие на юнит */
function onMatchUnitClick() 
{
    if(matchFieldBlocked === false)
    {
            matchCellColorSelect(this.unitType, this.posColumnI, this.posRowJ);
            if(matchSelectUnit1 === null) 
            {
                    matchSelectUnit1 = this;
            }else{
                    if(matchSelectUnit2 === null) 
                    {
                            matchSelectUnit2 = this;
                            matchExchangeUnits(); // меняем юниты местами
                    }
            }
    }
}

/* Определение цвета ячеек Cell игрового поля ================================================= */
function matchCellColorSelect(unitType, colI, rowJ)
{
    matchMatrixCell["i"+colI+":j"+rowJ].clear();
    if(side === SIDE_JEDI) matchMatrixCell["i"+colI+":j"+rowJ].lineStyle(1, 0x0080FF, 0.25);
    if(side === SIDE_SITH) matchMatrixCell["i"+colI+":j"+rowJ].lineStyle(1, 0x880000, 0.25);
    if(unitType === MATCH_HIT_1) matchMatrixCell["i"+colI+":j"+rowJ].beginFill(0xFFFF80, 0.50);
    if(unitType === MATCH_HIT_2) matchMatrixCell["i"+colI+":j"+rowJ].beginFill(0xFF0000, 0.50);
    if(unitType === MATCH_HIT_3) matchMatrixCell["i"+colI+":j"+rowJ].beginFill(0xFF00FF, 0.50);
    if(unitType === MATCH_HIT_4) matchMatrixCell["i"+colI+":j"+rowJ].beginFill(0x0080FF, 0.50);
    if(unitType === MATCH_HIT_5) matchMatrixCell["i"+colI+":j"+rowJ].beginFill(0x00FF80, 0.50);
    matchMatrixCell["i"+colI+":j"+rowJ].drawRoundedRect(0, 0, MATCH_CELL_WIDTH, MATCH_CELL_HEIGHT, 15);
    matchMatrixCell["i"+colI+":j"+rowJ].endFill();
}

function matchCellColorBack()
{
    if(matchSelectUnit1 !== null)
    {
            matchMatrixCell["i"+matchSelectUnit1.posColumnI+":j"+matchSelectUnit1.posRowJ].clear();
            if(side === SIDE_JEDI)
            {
                matchMatrixCell["i"+matchSelectUnit1.posColumnI+":j"+matchSelectUnit1.posRowJ].lineStyle(1, 0x0080FF, 0.25);
                matchMatrixCell["i"+matchSelectUnit1.posColumnI+":j"+matchSelectUnit1.posRowJ].beginFill(0x0080FF, 0.25);
            }
            if(side === SIDE_SITH)
            {
                matchMatrixCell["i"+matchSelectUnit1.posColumnI+":j"+matchSelectUnit1.posRowJ].lineStyle(1, 0x880000, 0.25);
                matchMatrixCell["i"+matchSelectUnit1.posColumnI+":j"+matchSelectUnit1.posRowJ].beginFill(0x880000, 0.25);
            }
            matchMatrixCell["i"+matchSelectUnit1.posColumnI+":j"+matchSelectUnit1.posRowJ].drawRoundedRect(0, 0, MATCH_CELL_WIDTH, MATCH_CELL_HEIGHT, 15);
            matchMatrixCell["i"+matchSelectUnit1.posColumnI+":j"+matchSelectUnit1.posRowJ].endFill();
    }
    if(matchSelectUnit2 !== null)
    {
            matchMatrixCell["i"+matchSelectUnit2.posColumnI+":j"+matchSelectUnit2.posRowJ].clear();
            if(side === SIDE_JEDI)
            {
                matchMatrixCell["i"+matchSelectUnit2.posColumnI+":j"+matchSelectUnit2.posRowJ].lineStyle(1, 0x0080FF, 0.25);
                matchMatrixCell["i"+matchSelectUnit2.posColumnI+":j"+matchSelectUnit2.posRowJ].beginFill(0x0080FF, 0.25);
            }
            if(side === SIDE_SITH)
            {
                matchMatrixCell["i"+matchSelectUnit2.posColumnI+":j"+matchSelectUnit2.posRowJ].lineStyle(1, 0x880000, 0.25);
                matchMatrixCell["i"+matchSelectUnit2.posColumnI+":j"+matchSelectUnit2.posRowJ].beginFill(0x880000, 0.25);
            }
            matchMatrixCell["i"+matchSelectUnit2.posColumnI+":j"+matchSelectUnit2.posRowJ].drawRoundedRect(0, 0, MATCH_CELL_WIDTH, MATCH_CELL_HEIGHT, 15);
            matchMatrixCell["i"+matchSelectUnit2.posColumnI+":j"+matchSelectUnit2.posRowJ].endFill();
    }
}

/* Обмен местами в массиве выбранных пользователем  объектов =================================== */
function matchExchangeUnits()
{
    matchFieldBlocked = true; // поле заблокированно

    var iUnit1 = matchSelectUnit1.posColumnI;
    var jUnit1 = matchSelectUnit1.posRowJ;
    var iUnit2 = matchSelectUnit2.posColumnI;
    var jUnit2 = matchSelectUnit2.posRowJ;

    if(iUnit2 > (iUnit1 - 2) && iUnit2 < (iUnit1 + 2) && jUnit2 > (jUnit1 - 2) && jUnit2 < (jUnit1 + 2) && ((iUnit2 === iUnit1 && jUnit2 !== jUnit1) || (jUnit2 === jUnit1 && iUnit2 !== iUnit1)))
    {
            matchMatrixUnit["i"+iUnit1+":j"+jUnit1] = matchSelectUnit2;
            matchMatrixUnit["i"+iUnit1+":j"+jUnit1].posColumnI = iUnit1;
            matchMatrixUnit["i"+iUnit1+":j"+jUnit1].posRowJ = jUnit1;
            matchMatrixUnit["i"+iUnit1+":j"+jUnit1].name = "i"+iUnit1+":j"+jUnit1;

            matchMatrixUnit["i"+iUnit2+":j"+jUnit2] = matchSelectUnit1;
            matchMatrixUnit["i"+iUnit2+":j"+jUnit2].posColumnI = iUnit2;
            matchMatrixUnit["i"+iUnit2+":j"+jUnit2].posRowJ = jUnit2;
            matchMatrixUnit["i"+iUnit2+":j"+jUnit2].name = "i"+iUnit2+":j"+jUnit2;

            createjs.Tween.get(matchMatrixUnit["i"+iUnit1+":j"+jUnit1], {loop: false})
                    .to({x: matchMatrixFrontPosition["i"+iUnit1+":j"+jUnit1][0], y: matchMatrixFrontPosition["i"+iUnit1+":j"+jUnit1][1]}, 500, createjs.Ease.getPowInOut(4));
            createjs.Tween.get(matchMatrixUnit["i"+iUnit2+":j"+jUnit2], {loop: false})
                    .to({x: matchMatrixFrontPosition["i"+iUnit2+":j"+jUnit2][0], y: matchMatrixFrontPosition["i"+iUnit2+":j"+jUnit2][1]}, 500, createjs.Ease.getPowInOut(4))
                    .call(onCompleteMatchExchangeUnits); // событие выполнено
            createjs.Ticker.setFPS(60);	

    }else{
            matchCellColorBack();
            matchSelectUnitsClear();
    }
}

function onCompleteMatchExchangeUnits()
{
    matchCellColorBack();
    matchCheckField(false);
}

function matchBackExchangeUnits()
{
    var iUnit1 = matchSelectUnit1.posColumnI;
    var jUnit1 = matchSelectUnit1.posRowJ;
    var iUnit2 = matchSelectUnit2.posColumnI;
    var jUnit2 = matchSelectUnit2.posRowJ;

    matchMatrixUnit["i"+iUnit1+":j"+jUnit1] = matchSelectUnit2;
    matchMatrixUnit["i"+iUnit1+":j"+jUnit1].posColumnI = iUnit1;
    matchMatrixUnit["i"+iUnit1+":j"+jUnit1].posRowJ = jUnit1;
    matchMatrixUnit["i"+iUnit1+":j"+jUnit1].name = "i"+iUnit1+":j"+jUnit1;

    matchMatrixUnit["i"+iUnit2+":j"+jUnit2] = matchSelectUnit1;
    matchMatrixUnit["i"+iUnit2+":j"+jUnit2].posColumnI = iUnit2;
    matchMatrixUnit["i"+iUnit2+":j"+jUnit2].posRowJ = jUnit2;
    matchMatrixUnit["i"+iUnit2+":j"+jUnit2].name = "i"+iUnit2+":j"+jUnit2;

    createjs.Tween.get(matchMatrixUnit["i"+iUnit1+":j"+jUnit1], {loop: false})
            .to({x: matchMatrixFrontPosition["i"+iUnit1+":j"+jUnit1][0], y: matchMatrixFrontPosition["i"+iUnit1+":j"+jUnit1][1]}, 500, createjs.Ease.getPowInOut(4));
    createjs.Tween.get(matchMatrixUnit["i"+iUnit2+":j"+jUnit2], {loop: false})
            .to({x: matchMatrixFrontPosition["i"+iUnit2+":j"+jUnit2][0], y: matchMatrixFrontPosition["i"+iUnit2+":j"+jUnit2][1]}, 500, createjs.Ease.getPowInOut(4))
            .call(matchSelectUnitsClear); // очистка и разблокиров поля
    createjs.Ticker.setFPS(60);	
}

function matchSelectUnitsClear()
{
    matchSelectUnit1 = null;
    matchSelectUnit2 = null;
    matchFieldBlocked = false; // поле разблокированно
}


/* Поиск групп ============================================================================== */
function matchCheckField(afterDown)
{
    matchMoveDownProcesses = new Object();
    if(matchCheckFieldFull()) // группы были найдены
    {
            timerStop();			// останавливаем таймер
            matchMoveDownUnits();	// спускаем юниты
    }else{ // группы не найдены
            if(afterDown === false) // первый спуск юнитов
            {
                    matchBackExchangeUnits(); 	// возвращаем выбранные юниты на места
            }else{ 
                    matchSelectUnitsClear();	// очистка и разблокиров поля
                    if(levelStatus === LEVEL_STATUS_BATTLE) timerStart();				// запускаем таймер
            }
    }
}


/* Общая проверка колонок и строк (3-и и более в ряд) */
function matchCheckFieldFull()
{
    var resultCheck = false;
    /* i - столбец; j - строка */
    for(var i = 0; i < MATCH_COLUMNS; i++)
    {
            if(matchCheckColumn(i) === true) resultCheck = true;
    }
    for(var j = 0; j < MATCH_ROWS; j++)
    {
            if(matchCheckRow(j) === true) resultCheck = true;	
    }
    return resultCheck;
}

/* Проверка колонки (3-и и более в ряд) */
function matchCheckColumn(column)
{
	var resultCheckColumn = false;
	/* просматриваем  в столбце (по строкам) */
	for(var j = 0; j < MATCH_ROWS; j++)
	{
		if(j < MATCH_ROWS - 2)
		{
			if(matchMatrixUnit["i"+column+":j"+j].unitType !== MATCH_HIT_0)
			{
				/* Группа из 3-х объектов */
				if(matchMatrixUnit["i"+column+":j"+j].unitType === matchMatrixUnit["i"+column+":j"+(j+1)].unitType && matchMatrixUnit["i"+column+":j"+j].unitType === matchMatrixUnit["i"+column+":j"+(j+2)].unitType)
				{
					resultCheckColumn = true;

					/* Группа из 4-х кристалов */
					if(j < MATCH_ROWS - 3)
					{
						if(matchMatrixUnit["i"+column+":j"+j].unitType === matchMatrixUnit["i"+column+":j"+(j+3)].unitType)
						{
							/* Группа из 5-ти кристалов */
							if(j < MATCH_ROWS - 4)
							{
								if(matchMatrixUnit["i"+column+":j"+j].unitType === matchMatrixUnit["i"+column+":j"+(j+4)].unitType)
								{
									/* Удаляем группу из 5 юнитов */
									matchRemoveUnit(column, j, "col", matchMatrixUnit["i"+column+":j"+j].unitType, 5);
								}else{
									/* Удаляем группу из 4 юнитов */
									matchRemoveUnit(column, j, "col", matchMatrixUnit["i"+column+":j"+j].unitType, 4);
								}
							}else{
								/* Удаляем группу из 4 юнитов */
								matchRemoveUnit(column, j, "col", matchMatrixUnit["i"+column+":j"+j].unitType, 4);
							}
						}else{
							/* Удаляем группу из 3 юнитов */
							matchRemoveUnit(column, j, "col", matchMatrixUnit["i"+column+":j"+j].unitType, 3);
						}
					}else{
						/* Удаляем группу из 3 юнитов */
						matchRemoveUnit(column, j, "col", matchMatrixUnit["i"+column+":j"+j].unitType, 3);
					}
				}
			}
		}else{
			break;
		}
	}
	return resultCheckColumn;
}

/* Проверка строки (3-и и более в ряд) */
function matchCheckRow(row)
{
	var resultCheckRow = false;
	/* просматриваем в строке (по столбцам) */
	for(var i = 0; i < MATCH_COLUMNS; i++)
	{
		if(i < MATCH_COLUMNS - 2)
		{
			if(matchMatrixUnit["i"+i+":j"+row].unitType !== MATCH_HIT_0)
			{
				/* Группа из 3-х объектов */
				if(matchMatrixUnit["i"+i+":j"+row].unitType === matchMatrixUnit["i"+(i+1)+":j"+row].unitType && matchMatrixUnit["i"+i+":j"+row].unitType === matchMatrixUnit["i"+(i+2)+":j"+row].unitType)
				{
					resultCheckRow = true;

					/* Группа из 4-х кристалов */
					if(i < MATCH_COLUMNS - 3)
					{
						if(matchMatrixUnit["i"+i+":j"+row].unitType === matchMatrixUnit["i"+(i+3)+":j"+row].unitType)
						{
							/* Группа из 5-ти кристалов */
							if(i < MATCH_COLUMNS - 4)
							{
								if(matchMatrixUnit["i"+i+":j"+row].unitType === matchMatrixUnit["i"+(i+4)+":j"+row].unitType)
								{
									/* Удаляем группу из 5 юнитов */
									matchRemoveUnit(i, row, "row", matchMatrixUnit["i"+i+":j"+row].unitType, 5);
								}else{
									/* Удаляем группу из 4 юнитов */
									matchRemoveUnit(i, row, "row", matchMatrixUnit["i"+i+":j"+row].unitType, 4);
								}
							}else{
								/* Удаляем группу из 4 юнитов */
								matchRemoveUnit(i, row, "row", matchMatrixUnit["i"+i+":j"+row].unitType, 4);
							}
						}else{
							/* Удаляем группу из 3 юнитов */
							matchRemoveUnit(i, row, "row", matchMatrixUnit["i"+i+":j"+row].unitType, 3);
						}
					}else{
						/* Удаляем группу из 3 юнитов */
						matchRemoveUnit(i, row, "row", matchMatrixUnit["i"+i+":j"+row].unitType, 3);
					}
				}
			}
		}else{
			break;
		}
	}
	return resultCheckRow;
}

/* Удаление юнитов */
function matchRemoveUnit(col, row, check, hitType, hitCount)
{

	if(levelStatus === LEVEL_STATUS_BATTLE)
	{
		/* ПРОГРЕСС: Обрабтка LifeBar */
		//levelReduceLifeBar(hitType, hitCount, modeAI); !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
		/* АНИМАЦИЯ: Анимация бойцов */
		//levelUpdateAnimation(modeAI, hitType);
	}
	
	/*Отмечаем юниты для удаления */
	if(check === "row")
	{
		if(hitCount === 3)
		{
			matchMatrixUnit["i"+col+":j"+row].alpha = 0.0;
			matchAnimationRemoveUnit(matchMatrixUnit["i"+col+":j"+row].position.x, matchMatrixUnit["i"+col+":j"+row].position.y); // анимация вспышка.
			matchMatrixUnit["i"+col+":j"+row].flagRemove = true;
			matchMatrixUnit["i"+col+":j"+row].position.x = matchMatrixBackPosition["i"+col+":j"+row][0];
			matchMatrixUnit["i"+col+":j"+row].position.y = matchMatrixBackPosition["i"+col+":j"+row][1];
			matchMoveDownProcesses["i"+col+":j"+row] = true;
			matchMatrixUnit["i"+(col+1)+":j"+row].alpha = 0.0;
			matchAnimationRemoveUnit(matchMatrixUnit["i"+(col+1)+":j"+row].position.x, matchMatrixUnit["i"+(col+1)+":j"+row].position.y); // анимация вспышка.
			matchMatrixUnit["i"+(col+1)+":j"+row].flagRemove = true;
			matchMatrixUnit["i"+(col+1)+":j"+row].position.x = matchMatrixBackPosition["i"+(col+1)+":j"+row][0];
			matchMatrixUnit["i"+(col+1)+":j"+row].position.y = matchMatrixBackPosition["i"+(col+1)+":j"+row][1];
			matchMoveDownProcesses["i"+(col+1)+":j"+row] = true;
			matchMatrixUnit["i"+(col+2)+":j"+row].alpha = 0.0;
			matchAnimationRemoveUnit(matchMatrixUnit["i"+(col+2)+":j"+row].position.x, matchMatrixUnit["i"+(col+2)+":j"+row].position.y); // анимация вспышка.
			matchMatrixUnit["i"+(col+2)+":j"+row].flagRemove = true;
			matchMatrixUnit["i"+(col+2)+":j"+row].position.x = matchMatrixBackPosition["i"+(col+2)+":j"+row][0];
			matchMatrixUnit["i"+(col+2)+":j"+row].position.y = matchMatrixBackPosition["i"+(col+2)+":j"+row][1];
			matchMoveDownProcesses["i"+(col+2)+":j"+row] = true;
			
		}
		if(hitCount === 4)
		{
			matchMatrixUnit["i"+col+":j"+row].alpha = 0.0;
			matchAnimationRemoveUnit(matchMatrixUnit["i"+col+":j"+row].position.x, matchMatrixUnit["i"+col+":j"+row].position.y);
			matchMatrixUnit["i"+col+":j"+row].flagRemove = true;
			matchMatrixUnit["i"+col+":j"+row].position.x = matchMatrixBackPosition["i"+col+":j"+row][0];
			matchMatrixUnit["i"+col+":j"+row].position.y = matchMatrixBackPosition["i"+col+":j"+row][1];
			matchMoveDownProcesses["i"+col+":j"+row] = true;
			matchMatrixUnit["i"+(col+1)+":j"+row].alpha = 0.0;
			matchAnimationRemoveUnit(matchMatrixUnit["i"+(col+1)+":j"+row].position.x, matchMatrixUnit["i"+(col+1)+":j"+row].position.y);
			matchMatrixUnit["i"+(col+1)+":j"+row].flagRemove = true;
			matchMatrixUnit["i"+(col+1)+":j"+row].position.x = matchMatrixBackPosition["i"+(col+1)+":j"+row][0];
			matchMatrixUnit["i"+(col+1)+":j"+row].position.y = matchMatrixBackPosition["i"+(col+1)+":j"+row][1];
			matchMoveDownProcesses["i"+(col+1)+":j"+row] = true;
			matchMatrixUnit["i"+(col+2)+":j"+row].alpha = 0.0;
			matchAnimationRemoveUnit(matchMatrixUnit["i"+(col+2)+":j"+row].position.x, matchMatrixUnit["i"+(col+2)+":j"+row].position.y);
			matchMatrixUnit["i"+(col+2)+":j"+row].flagRemove = true;
			matchMatrixUnit["i"+(col+2)+":j"+row].position.x = matchMatrixBackPosition["i"+(col+2)+":j"+row][0];
			matchMatrixUnit["i"+(col+2)+":j"+row].position.y = matchMatrixBackPosition["i"+(col+2)+":j"+row][1];
			matchMoveDownProcesses["i"+(col+2)+":j"+row] = true;
			matchMatrixUnit["i"+(col+3)+":j"+row].alpha = 0.0;
			matchAnimationRemoveUnit(matchMatrixUnit["i"+(col+3)+":j"+row].position.x, matchMatrixUnit["i"+(col+3)+":j"+row].position.y);
			matchMatrixUnit["i"+(col+3)+":j"+row].flagRemove = true;
			matchMatrixUnit["i"+(col+3)+":j"+row].position.x = matchMatrixBackPosition["i"+(col+3)+":j"+row][0];
			matchMatrixUnit["i"+(col+3)+":j"+row].position.y = matchMatrixBackPosition["i"+(col+3)+":j"+row][1];
			matchMoveDownProcesses["i"+(col+3)+":j"+row] = true;
		}
		if(hitCount === 5)
		{
			matchMatrixUnit["i"+col+":j"+row].alpha = 0.0;
			matchAnimationRemoveUnit(matchMatrixUnit["i"+col+":j"+row].position.x, matchMatrixUnit["i"+col+":j"+row].position.y);
			matchMatrixUnit["i"+col+":j"+row].flagRemove = true;
			matchMatrixUnit["i"+col+":j"+row].position.x = matchMatrixBackPosition["i"+col+":j"+row][0];
			matchMatrixUnit["i"+col+":j"+row].position.y = matchMatrixBackPosition["i"+col+":j"+row][1];
			matchMoveDownProcesses["i"+col+":j"+row] = true;
			matchMatrixUnit["i"+(col+1)+":j"+row].alpha = 0.0;
			matchAnimationRemoveUnit(matchMatrixUnit["i"+(col+1)+":j"+row].position.x, matchMatrixUnit["i"+(col+1)+":j"+row].position.y);
			matchMatrixUnit["i"+(col+1)+":j"+row].flagRemove = true;
			matchMatrixUnit["i"+(col+1)+":j"+row].position.x = matchMatrixBackPosition["i"+(col+1)+":j"+row][0];
			matchMatrixUnit["i"+(col+1)+":j"+row].position.y = matchMatrixBackPosition["i"+(col+1)+":j"+row][1];
			matchMoveDownProcesses["i"+(col+1)+":j"+row] = true;
			matchMatrixUnit["i"+(col+2)+":j"+row].alpha = 0.0;
			matchAnimationRemoveUnit(matchMatrixUnit["i"+(col+2)+":j"+row].position.x, matchMatrixUnit["i"+(col+2)+":j"+row].position.y);
			matchMatrixUnit["i"+(col+2)+":j"+row].flagRemove = true;
			matchMatrixUnit["i"+(col+2)+":j"+row].position.x = matchMatrixBackPosition["i"+(col+2)+":j"+row][0];
			matchMatrixUnit["i"+(col+2)+":j"+row].position.y = matchMatrixBackPosition["i"+(col+2)+":j"+row][1];
			matchMoveDownProcesses["i"+(col+2)+":j"+row] = true;
			matchMatrixUnit["i"+(col+3)+":j"+row].alpha = 0.0;
			matchAnimationRemoveUnit(matchMatrixUnit["i"+(col+3)+":j"+row].position.x, matchMatrixUnit["i"+(col+3)+":j"+row].position.y);
			matchMatrixUnit["i"+(col+3)+":j"+row].flagRemove = true;
			matchMatrixUnit["i"+(col+3)+":j"+row].position.x = matchMatrixBackPosition["i"+(col+3)+":j"+row][0];
			matchMatrixUnit["i"+(col+3)+":j"+row].position.y = matchMatrixBackPosition["i"+(col+3)+":j"+row][1];
			matchMoveDownProcesses["i"+(col+3)+":j"+row] = true;
			matchMatrixUnit["i"+(col+4)+":j"+row].alpha = 0.0;
			matchAnimationRemoveUnit(matchMatrixUnit["i"+(col+4)+":j"+row].position.x, matchMatrixUnit["i"+(col+4)+":j"+row].position.y);
			matchMatrixUnit["i"+(col+4)+":j"+row].flagRemove = true;
			matchMatrixUnit["i"+(col+4)+":j"+row].position.x = matchMatrixBackPosition["i"+(col+4)+":j"+row][0];
			matchMatrixUnit["i"+(col+4)+":j"+row].position.y = matchMatrixBackPosition["i"+(col+4)+":j"+row][1];
			matchMoveDownProcesses["i"+(col+4)+":j"+row] = true;
		}
	}
	if(check === "col")
	{
		if(hitCount === 3)
		{
			
			matchMatrixUnit["i"+col+":j"+row].alpha = 0.0;
			matchAnimationRemoveUnit(matchMatrixUnit["i"+col+":j"+row].position.x, matchMatrixUnit["i"+col+":j"+row].position.y);
			matchMatrixUnit["i"+col+":j"+row].flagRemove = true;
			matchMatrixUnit["i"+col+":j"+row].position.x = matchMatrixBackPosition["i"+col+":j"+row][0];
			matchMatrixUnit["i"+col+":j"+row].position.y = matchMatrixBackPosition["i"+col+":j"+row][1];
			matchMoveDownProcesses["i"+col+":j"+row] = true;
			matchMatrixUnit["i"+col+":j"+(row+1)].alpha = 0.0;
			matchAnimationRemoveUnit(matchMatrixUnit["i"+col+":j"+(row+1)].position.x, matchMatrixUnit["i"+col+":j"+(row+1)].position.y);
			matchMatrixUnit["i"+col+":j"+(row+1)].flagRemove = true;
			matchMatrixUnit["i"+col+":j"+(row+1)].position.x = matchMatrixBackPosition["i"+col+":j"+(row+1)][0];
			matchMatrixUnit["i"+col+":j"+(row+1)].position.y = matchMatrixBackPosition["i"+col+":j"+(row+1)][1];
			matchMoveDownProcesses["i"+col+":j"+(row+1)] = true;
			matchMatrixUnit["i"+col+":j"+(row+2)].alpha = 0.0;	
			matchAnimationRemoveUnit(matchMatrixUnit["i"+col+":j"+(row+2)].position.x, matchMatrixUnit["i"+col+":j"+(row+2)].position.y);
			matchMatrixUnit["i"+col+":j"+(row+2)].flagRemove = true;
			matchMatrixUnit["i"+col+":j"+(row+2)].position.x = matchMatrixBackPosition["i"+col+":j"+(row+2)][0];
			matchMatrixUnit["i"+col+":j"+(row+2)].position.y = matchMatrixBackPosition["i"+col+":j"+(row+2)][1];
			matchMoveDownProcesses["i"+col+":j"+(row+2)] = true;
		}
		if(hitCount === 4)
		{
			matchMatrixUnit["i"+col+":j"+row].alpha = 0.0;
			matchAnimationRemoveUnit(matchMatrixUnit["i"+col+":j"+row].position.x, matchMatrixUnit["i"+col+":j"+row].position.y);
			matchMatrixUnit["i"+col+":j"+row].flagRemove = true;
			matchMatrixUnit["i"+col+":j"+row].position.x = matchMatrixBackPosition["i"+col+":j"+row][0];
			matchMatrixUnit["i"+col+":j"+row].position.y = matchMatrixBackPosition["i"+col+":j"+row][1];
			matchMoveDownProcesses["i"+col+":j"+row] = true;
			matchMatrixUnit["i"+col+":j"+(row+1)].alpha = 0.0;
			matchAnimationRemoveUnit(matchMatrixUnit["i"+col+":j"+(row+1)].position.x, matchMatrixUnit["i"+col+":j"+(row+1)].position.y);
			matchMatrixUnit["i"+col+":j"+(row+1)].flagRemove = true;
			matchMatrixUnit["i"+col+":j"+(row+1)].position.x = matchMatrixBackPosition["i"+col+":j"+(row+1)][0];
			matchMatrixUnit["i"+col+":j"+(row+1)].position.y = matchMatrixBackPosition["i"+col+":j"+(row+1)][1];
			matchMoveDownProcesses["i"+col+":j"+(row+1)] = true;
			matchMatrixUnit["i"+col+":j"+(row+2)].alpha = 0.0;	
			matchAnimationRemoveUnit(matchMatrixUnit["i"+col+":j"+(row+2)].position.x, matchMatrixUnit["i"+col+":j"+(row+2)].position.y);
			matchMatrixUnit["i"+col+":j"+(row+2)].flagRemove = true;
			matchMatrixUnit["i"+col+":j"+(row+2)].position.x = matchMatrixBackPosition["i"+col+":j"+(row+2)][0];
			matchMatrixUnit["i"+col+":j"+(row+2)].position.y = matchMatrixBackPosition["i"+col+":j"+(row+2)][1];
			matchMoveDownProcesses["i"+col+":j"+(row+2)] = true;
			matchMatrixUnit["i"+col+":j"+(row+3)].alpha = 0.0;	
			matchAnimationRemoveUnit(matchMatrixUnit["i"+col+":j"+(row+3)].position.x, matchMatrixUnit["i"+col+":j"+(row+3)].position.y);			
			matchMatrixUnit["i"+col+":j"+(row+3)].flagRemove = true;
			matchMatrixUnit["i"+col+":j"+(row+3)].position.x = matchMatrixBackPosition["i"+col+":j"+(row+3)][0];
			matchMatrixUnit["i"+col+":j"+(row+3)].position.y = matchMatrixBackPosition["i"+col+":j"+(row+3)][1];
			matchMoveDownProcesses["i"+col+":j"+(row+3)] = true;
		}
		if(hitCount === 5)
		{
			matchMatrixUnit["i"+col+":j"+row].alpha = 0.0;
			matchAnimationRemoveUnit(matchMatrixUnit["i"+col+":j"+row].position.x, matchMatrixUnit["i"+col+":j"+row].position.y);
			matchMatrixUnit["i"+col+":j"+row].flagRemove = true;
			matchMatrixUnit["i"+col+":j"+row].position.x = matchMatrixBackPosition["i"+col+":j"+row][0];
			matchMatrixUnit["i"+col+":j"+row].position.y = matchMatrixBackPosition["i"+col+":j"+row][1];
			matchMoveDownProcesses["i"+col+":j"+row] = true;
			matchMatrixUnit["i"+col+":j"+(row+1)].alpha = 0.0;
			matchAnimationRemoveUnit(matchMatrixUnit["i"+col+":j"+(row+1)].position.x, matchMatrixUnit["i"+col+":j"+(row+1)].position.y);
			matchMatrixUnit["i"+col+":j"+(row+1)].flagRemove = true;
			matchMatrixUnit["i"+col+":j"+(row+1)].position.x = matchMatrixBackPosition["i"+col+":j"+(row+1)][0];
			matchMatrixUnit["i"+col+":j"+(row+1)].position.y = matchMatrixBackPosition["i"+col+":j"+(row+1)][1];
			matchMoveDownProcesses["i"+col+":j"+(row+1)] = true;
			matchMatrixUnit["i"+col+":j"+(row+2)].alpha = 0.0;	
			matchAnimationRemoveUnit(matchMatrixUnit["i"+col+":j"+(row+2)].position.x, matchMatrixUnit["i"+col+":j"+(row+2)].position.y);
			matchMatrixUnit["i"+col+":j"+(row+2)].flagRemove = true;
			matchMatrixUnit["i"+col+":j"+(row+2)].position.x = matchMatrixBackPosition["i"+col+":j"+(row+2)][0];
			matchMatrixUnit["i"+col+":j"+(row+2)].position.y = matchMatrixBackPosition["i"+col+":j"+(row+2)][1];
			matchMoveDownProcesses["i"+col+":j"+(row+2)] = true;
			matchMatrixUnit["i"+col+":j"+(row+3)].alpha = 0.0;
			matchAnimationRemoveUnit(matchMatrixUnit["i"+col+":j"+(row+3)].position.x, matchMatrixUnit["i"+col+":j"+(row+3)].position.y);			
			matchMatrixUnit["i"+col+":j"+(row+3)].flagRemove = true;
			matchMatrixUnit["i"+col+":j"+(row+3)].position.x = matchMatrixBackPosition["i"+col+":j"+(row+3)][0];
			matchMatrixUnit["i"+col+":j"+(row+3)].position.y = matchMatrixBackPosition["i"+col+":j"+(row+3)][1];
			matchMoveDownProcesses["i"+col+":j"+(row+3)] = true;
			matchMatrixUnit["i"+col+":j"+(row+4)].alpha = 0.0;
			matchAnimationRemoveUnit(matchMatrixUnit["i"+col+":j"+(row+4)].position.x, matchMatrixUnit["i"+col+":j"+(row+4)].position.y);
			matchMatrixUnit["i"+col+":j"+(row+4)].flagRemove = true;
			matchMatrixUnit["i"+col+":j"+(row+4)].position.x = matchMatrixBackPosition["i"+col+":j"+(row+4)][0];
			matchMatrixUnit["i"+col+":j"+(row+4)].position.y = matchMatrixBackPosition["i"+col+":j"+(row+4)][1];
			matchMoveDownProcesses["i"+col+":j"+(row+4)] = true;
		}
	}
}

/* Спуск юнитов вниз на свободные позиции */
function matchMoveDownUnits()
{
	for(var i = 0; i < MATCH_COLUMNS; i++)
	{
		for(var j = MATCH_ROWS-1; j >= 0; j--)
		{
			if(matchMatrixUnit["i"+i+":j"+j].flagRemove === true && matchMatrixUnit["i"+i+":j"+j].unitType !== MATCH_HIT_0)
			{
				/* Спускаем вниз оставщиеся юниты */
				for(var k = j; k >= 0; k--)
				{
					if(matchMatrixUnit["i"+i+":j"+k].flagRemove === false && matchMatrixUnit["i"+i+":j"+k].unitType !== MATCH_HIT_0)
					{
						var removeUnit = matchMatrixUnit["i"+i+":j"+j]; // удалённый юнит

						matchMatrixUnit["i"+i+":j"+j] = matchMatrixUnit["i"+i+":j"+k]; // перемещаем не удалённый юнит
						matchMatrixUnit["i"+i+":j"+j].name = "i"+i+":j"+j;
						matchMatrixUnit["i"+i+":j"+j].flagRemove = false;
						matchMatrixUnit["i"+i+":j"+j].posColumnI = i;
						matchMatrixUnit["i"+i+":j"+j].posRowJ = j;
						matchMoveDownProcesses["i"+i+":j"+j] = true;

						matchMatrixUnit["i"+i+":j"+k] = removeUnit;	// удалённый юнит ставим на место перемещённой
						matchMatrixUnit["i"+i+":j"+k].name = "i"+i+":j"+k;
						matchMatrixUnit["i"+i+":j"+k].flagRemove = true;
						matchMatrixUnit["i"+i+":j"+k].posColumnI = i;
						matchMatrixUnit["i"+i+":j"+k].posRowJ = k;
						matchMoveDownProcesses["i"+i+":j"+k] = true;
						
						break;
					}
				}
			}
		}
	}
	matchMoveDownNewUnits();
}


function onCompleteMatchMoveDownUnits()
{
    matchMoveDownNewUnits();
}

function matchMoveDownNewUnits()
{
    for(var i = 0; i < MATCH_COLUMNS; i++)
    {
            for(var j = MATCH_ROWS-1; j >= 0; j--)
            {
                    if(matchMoveDownProcesses["i"+i+":j"+j] === true && matchMatrixUnit["i"+i+":j"+j].flagRemove === false && matchMatrixUnit["i"+i+":j"+j].unitType !== MATCH_HIT_0)
                    {
                            matchMatrixUnit["i"+i+":j"+j].flagRemove = false;
                            /* Спускаем удалённые юниты */
                            createjs.Tween.get(matchMatrixUnit["i"+i+":j"+j], {loop: false})
                                    .to({alpha: 1.0}, 500)
                                    .to({x: matchMatrixFrontPosition["i"+i+":j"+j][0], y: matchMatrixFrontPosition["i"+i+":j"+j][1]}, 500, createjs.Ease.getPowInOut(4))
                                    .call(onCompleteMatchMoveDownNewUnits, this); // событие выполнено
                            createjs.Ticker.setFPS(60);	
                    }else{
                            if(matchMoveDownProcesses["i"+i+":j"+j] === true && matchMatrixUnit["i"+i+":j"+j].flagRemove === true && matchMatrixUnit["i"+i+":j"+j].unitType !== MATCH_HIT_0)
                            {
                                    var indexRandom = Math.random() / 0.1;
                                    var index = Math.round(indexRandom);
                                    if (index >= 0 && index <= 2) 
                                    {
                                            matchMatrixUnit["i"+i+":j"+j].texture = hit1Texture;
                                            matchMatrixUnit["i"+i+":j"+j].unitType = MATCH_HIT_1;
                                            matchMatrixUnit["i"+i+":j"+j].flagRemove = false;
                                    }
                                    if (index > 2 && index <= 4)
                                    {
                                            matchMatrixUnit["i"+i+":j"+j].texture = hit2Texture;
                                            matchMatrixUnit["i"+i+":j"+j].unitType = MATCH_HIT_2;
                                            matchMatrixUnit["i"+i+":j"+j].flagRemove = false;
                                    }
                                    if (index > 4 && index <= 6)
                                    {
                                            matchMatrixUnit["i"+i+":j"+j].texture = hit3Texture;
                                            matchMatrixUnit["i"+i+":j"+j].unitType = MATCH_HIT_3;
                                            matchMatrixUnit["i"+i+":j"+j].flagRemove = false;
                                    }
                                    if (index > 6 && index <= 8)
                                    {
                                            matchMatrixUnit["i"+i+":j"+j].texture = hit4Texture;
                                            matchMatrixUnit["i"+i+":j"+j].unitType = MATCH_HIT_4;
                                            matchMatrixUnit["i"+i+":j"+j].flagRemove = false;
                                    }
                                    if (index > 8 && index <= 10)
                                    {
                                            matchMatrixUnit["i"+i+":j"+j].texture = hit5Texture;
                                            matchMatrixUnit["i"+i+":j"+j].unitType = MATCH_HIT_5;
                                            matchMatrixUnit["i"+i+":j"+j].flagRemove = false;
                                    }

                                    /* Спускаем удалённые юниты */
                                    createjs.Tween.get(matchMatrixUnit["i"+i+":j"+j], {loop: false})
                                            .to({alpha: 1.0}, 500)
                                            .to({x: matchMatrixFrontPosition["i"+i+":j"+j][0], y: matchMatrixFrontPosition["i"+i+":j"+j][1]}, 500, createjs.Ease.getPowInOut(4))
                                            .call(onCompleteMatchMoveDownNewUnits, this); // событие выполнено
                                    createjs.Ticker.setFPS(60);
                            }
                    }
            }
    }
}

function onCompleteMatchMoveDownNewUnits()
{
    var result = false;
    matchMoveDownProcesses[this.name] = false;
    for(var key in matchMoveDownProcesses)
    {
            if(matchMoveDownProcesses[key] === true){
                    result = true;
                    break;	
            } 
    }
    if(result == false) // анимация завершена
    {
            if(matchCheckCombinations() === true) // Возможные ходы определены
            {
                    matchCheckField(true);	// проверка групп 3-и в ряд
            }else{	// нет возможности ходов
                    matchUpdateField(); // обновление игрового поля
            }
    }
}

/* Определение возможности хода и перестановка в случае отсутствия такой возможности ========== */
function matchCheckCombinations()
{
	/*	   0  1  2  3  4  5
	* 	0:[0][0][0][0][1][0]
		1:[0][0][1][1][0][1]
		2:[0][0][0][0][1][0]
		3:[0][0][0][0][0][0]
		4:[0][0][0][0][0][0]
		5:[0][0][0][0][0][0]
	 * */
	// Проверка строк и колонок
	for(var i = 0; i < MATCH_COLUMNS; i++)
	{
		for(var j = 0; j < MATCH_ROWS; j++)
		{
			if(matchMatrixUnit["i"+i+":j"+j].unitType != MATCH_HIT_0)
			{
				// ПРОВЕРКА СТРОКИ
				if(j == 0)
				{
					//[1][1][X][1]
					if((i + 3) < MATCH_COLUMNS){
						if(matchMatrixUnit["i"+(i+2)+":j"+j].unitType != MATCH_HIT_0 && matchMatrixUnit["i"+i+":j"+j].unitType != MATCH_HIT_0 && matchMatrixUnit["i"+(i+1)+":j"+j].unitType != MATCH_HIT_0 && matchMatrixUnit["i"+(i+3)+":j"+j].unitType != MATCH_HIT_0){
							if(matchMatrixUnit["i"+i+":j"+j].unitType == matchMatrixUnit["i"+(i+1)+":j"+j].unitType && matchMatrixUnit["i"+i+":j"+j].unitType == matchMatrixUnit["i"+(i+3)+":j"+j].unitType) { return true; }
						}
					}
					//[1][X][1][1]
					if((i + 3) < MATCH_COLUMNS){
						if(matchMatrixUnit["i"+(i+1)+":j"+j].unitType != MATCH_HIT_0 && matchMatrixUnit["i"+i+":j"+j].unitType != MATCH_HIT_0 && matchMatrixUnit["i"+(i+2)+":j"+j].unitType != MATCH_HIT_0 && matchMatrixUnit["i"+(i+3)+":j"+j].unitType != MATCH_HIT_0){
							if(matchMatrixUnit["i"+i+":j"+j].unitType == matchMatrixUnit["i"+(i+2)+":j"+j].unitType && matchMatrixUnit["i"+i+":j"+j].unitType == matchMatrixUnit["i"+(i+3)+":j"+j].unitType) { return true; }
						}
					}
					//[0][1][X][1]
					//[0][0][1][0]
					if((i + 2) < MATCH_COLUMNS && (j + 1) < MATCH_ROWS){
						if(matchMatrixUnit["i"+(i+1)+":j"+j].unitType != MATCH_HIT_0 && matchMatrixUnit["i"+i+":j"+j].unitType != MATCH_HIT_0 && matchMatrixUnit["i"+(i+1)+":j"+(j+1)].unitType != MATCH_HIT_0 && matchMatrixUnit["i"+(i+2)+":j"+j].unitType != MATCH_HIT_0){
							if(matchMatrixUnit["i"+i+":j"+j].unitType == matchMatrixUnit["i"+(i+1)+":j"+(j+1)].unitType && matchMatrixUnit["i"+i+":j"+j].unitType == matchMatrixUnit["i"+(i+2)+":j"+j].unitType) { return true; }
						}
					}
					//[0][1][1][X]
					//[0][0][0][1]
					if((i + 2) < MATCH_COLUMNS && (j + 1) < MATCH_ROWS){
						if(matchMatrixUnit["i"+(i+2)+":j"+j].unitType != MATCH_HIT_0 && matchMatrixUnit["i"+i+":j"+j].unitType != MATCH_HIT_0 && matchMatrixUnit["i"+(i+1)+":j"+j].unitType != MATCH_HIT_0 && matchMatrixUnit["i"+(i+2)+":j"+j].unitType != MATCH_HIT_0){
							if(matchMatrixUnit["i"+i+":j"+j].unitType == matchMatrixUnit["i"+(i+1)+":j"+j].unitType && matchMatrixUnit["i"+i+":j"+j].unitType == matchMatrixUnit["i"+(i+2)+":j"+(j+1)].unitType) { return true; }
						}
					}
					//[0][X][1][1]
					//[0][1][0][0]
					if((i + 2) < MATCH_COLUMNS && (j + 1) < MATCH_ROWS){
						if(matchMatrixUnit["i"+i+":j"+j].unitType != MATCH_HIT_0 && matchMatrixUnit["i"+i+":j"+(j+1)].unitType != MATCH_HIT_0 && matchMatrixUnit["i"+(i+1)+":j"+j].unitType != MATCH_HIT_0 && matchMatrixUnit["i"+(i+2)+":j"+j].unitType != MATCH_HIT_0){
							if(matchMatrixUnit["i"+i+":j"+(j+1)].unitType == matchMatrixUnit["i"+(i+1)+":j"+j].unitType && matchMatrixUnit["i"+i+":j"+(j+1)].unitType == matchMatrixUnit["i"+(i+2)+":j"+j].unitType) { return true; }
						}
					}
				}else{
					//[1][1][X][1]
					if((i + 3) < MATCH_COLUMNS){
						if(matchMatrixUnit["i"+(i+2)+":j"+j].unitType != MATCH_HIT_0 && matchMatrixUnit["i"+i+":j"+j].unitType != MATCH_HIT_0 && matchMatrixUnit["i"+(i+1)+":j"+j].unitType != MATCH_HIT_0 && matchMatrixUnit["i"+(i+3)+":j"+j].unitType != MATCH_HIT_0){
							if(matchMatrixUnit["i"+i+":j"+j].unitType == matchMatrixUnit["i"+(i+1)+":j"+j].unitType && matchMatrixUnit["i"+i+":j"+j].unitType == matchMatrixUnit["i"+(i+3)+":j"+j].unitType) { return true; }
						}
					}
					//[1][X][1][1]
					if((i + 3) < MATCH_COLUMNS){
						if(matchMatrixUnit["i"+(i+1)+":j"+j].unitType != MATCH_HIT_0 && matchMatrixUnit["i"+i+":j"+j].unitType != MATCH_HIT_0 && matchMatrixUnit["i"+(i+2)+":j"+j].unitType != MATCH_HIT_0 && matchMatrixUnit["i"+(i+3)+":j"+j].unitType != MATCH_HIT_0){
							if(matchMatrixUnit["i"+i+":j"+j].unitType == matchMatrixUnit["i"+(i+2)+":j"+j].unitType && matchMatrixUnit["i"+i+":j"+j].unitType == matchMatrixUnit["i"+(i+3)+":j"+j].unitType) { return true; }
						}
					}
					//[0][1][1][X]
					//[0][0][0][1]
					if((i + 2) < MATCH_COLUMNS && (j + 1) < MATCH_ROWS){
						if(matchMatrixUnit["i"+(i+2)+":j"+j].unitType != MATCH_HIT_0 && matchMatrixUnit["i"+i+":j"+j].unitType != MATCH_HIT_0 && matchMatrixUnit["i"+(i+1)+":j"+j].unitType != MATCH_HIT_0 && matchMatrixUnit["i"+(i+2)+":j"+(j+1)].unitType != MATCH_HIT_0){
							if(matchMatrixUnit["i"+i+":j"+j].unitType == matchMatrixUnit["i"+(i+1)+":j"+j].unitType && matchMatrixUnit["i"+i+":j"+j].unitType == matchMatrixUnit["i"+(i+2)+":j"+(j+1)].unitType) { return true; }
						}
					}
					//[0][0][0][1]
					//[0][1][1][X]
					if((i + 2) < MATCH_COLUMNS && (j - 1) >=0){
						if(matchMatrixUnit["i"+(i+2)+":j"+j].unitType != MATCH_HIT_0 && matchMatrixUnit["i"+i+":j"+j].unitType != MATCH_HIT_0 && matchMatrixUnit["i"+(i+1)+":j"+j].unitType != MATCH_HIT_0 && matchMatrixUnit["i"+(i+2)+":j"+(j-1)].unitType != MATCH_HIT_0){
							if(matchMatrixUnit["i"+i+":j"+j].unitType == matchMatrixUnit["i"+(i+1)+":j"+j].unitType && matchMatrixUnit["i"+i+":j"+j].unitType == matchMatrixUnit["i"+(i+2)+":j"+(j-1)].unitType) { return true; }
						}
					}
					//[0][X][1][1]
					//[0][1][0][0]
					if((i + 2) < MATCH_COLUMNS && (j + 1) < MATCH_ROWS){
						if(matchMatrixUnit["i"+i+":j"+j].unitType != MATCH_HIT_0 && matchMatrixUnit["i"+i+":j"+(j+1)].unitType != MATCH_HIT_0 && matchMatrixUnit["i"+(i+1)+":j"+j].unitType != MATCH_HIT_0 && matchMatrixUnit["i"+(i+2)+":j"+j].unitType != MATCH_HIT_0){
							if(matchMatrixUnit["i"+i+":j"+(j+1)].unitType == matchMatrixUnit["i"+(i+1)+":j"+j].unitType && matchMatrixUnit["i"+i+":j"+(j+1)].unitType == matchMatrixUnit["i"+(i+2)+":j"+j].unitType) { return true; }
						}
					}
					//[0][1][0][0]
					//[0][X][1][1]
					if((i + 2) < MATCH_COLUMNS && (j + 1) < MATCH_ROWS){
						if(matchMatrixUnit["i"+i+":j"+(j+1)].unitType != MATCH_HIT_0 && matchMatrixUnit["i"+i+":j"+j].unitType != MATCH_HIT_0 && matchMatrixUnit["i"+(i+1)+":j"+(j+1)].unitType != MATCH_HIT_0 && matchMatrixUnit["i"+(i+2)+":j"+(j+1)].unitType != MATCH_HIT_0){
							if(matchMatrixUnit["i"+i+":j"+j].unitType == matchMatrixUnit["i"+(i+1)+":j"+(j+1)].unitType && matchMatrixUnit["i"+i+":j"+j].unitType == matchMatrixUnit["i"+(i+2)+":j"+(j+1)].unitType) { return true; }
						}
					}
					//[0][0][1][0]
					//[0][1][X][1]
					if((i + 2) < MATCH_COLUMNS && (j - 1) >= 0){
						if(matchMatrixUnit["i"+(i+1)+":j"+j].unitType != MATCH_HIT_0 && matchMatrixUnit["i"+i+":j"+j].unitType != MATCH_HIT_0 && matchMatrixUnit["i"+(i+1)+":j"+(j-1)].unitType != MATCH_HIT_0 && matchMatrixUnit["i"+(i+2)+":j"+j].unitType != MATCH_HIT_0){
							if(matchMatrixUnit["i"+i+":j"+j].unitType == matchMatrixUnit["i"+(i+1)+":j"+(j-1)].unitType && matchMatrixUnit["i"+i+":j"+j].unitType == matchMatrixUnit["i"+(i+2)+":j"+j].unitType) { return true; }
						}
					}
					//[0][1][X][1]
					//[0][0][1][0]
					if((i + 2) < MATCH_COLUMNS && (j + 1) < MATCH_ROWS){
						if(matchMatrixUnit["i"+(i+1)+":j"+j].unitType != MATCH_HIT_0 && matchMatrixUnit["i"+i+":j"+j].unitType != MATCH_HIT_0 && matchMatrixUnit["i"+(i+1)+":j"+(j+1)].unitType != MATCH_HIT_0 && matchMatrixUnit["i"+(i+2)+":j"+j].unitType != MATCH_HIT_0){
							if(matchMatrixUnit["i"+i+":j"+j].unitType == matchMatrixUnit["i"+(i+1)+":j"+(j+1)].unitType && matchMatrixUnit["i"+i+":j"+j].unitType == matchMatrixUnit["i"+(i+2)+":j"+j].unitType) { return true; }
						}
					}
				}

				// ПРОВЕРКА КОЛОНКИ
				if(i == 0)
				{
					//[1]
					//[1]
					//[X]
					//[1]
					if((j + 3) < MATCH_ROWS){
						if(matchMatrixUnit["i"+i+":j"+(j+2)].unitType != MATCH_HIT_0 && matchMatrixUnit["i"+i+":j"+j].unitType != MATCH_HIT_0 && matchMatrixUnit["i"+i+":j"+(j+1)].unitType != MATCH_HIT_0 && matchMatrixUnit["i"+i+":j"+(j+3)].unitType != MATCH_HIT_0){
							if(matchMatrixUnit["i"+i+":j"+j].unitType == matchMatrixUnit["i"+i+":j"+(j+1)].unitType && matchMatrixUnit["i"+i+":j"+j].unitType == matchMatrixUnit["i"+i+":j"+(j+3)].unitType) { return true; }
						}
					}
					//[1]
					//[X]
					//[1]
					//[1]
					if((j + 3) < MATCH_ROWS){
						if(matchMatrixUnit["i"+i+":j"+(j+1)].unitType != MATCH_HIT_0 && matchMatrixUnit["i"+i+":j"+(j+2)].unitType != MATCH_HIT_0 && matchMatrixUnit["i"+i+":j"+j].unitType != MATCH_HIT_0 && matchMatrixUnit["i"+i+":j"+(j+3)].unitType != MATCH_HIT_0){
							if(matchMatrixUnit["i"+i+":j"+j].unitType == matchMatrixUnit["i"+i+":j"+(j+2)].unitType && matchMatrixUnit["i"+i+":j"+j].unitType == matchMatrixUnit["i"+i+":j"+(j+3)].unitType) { return true; }
						}
					}
					//[1][0]
					//[X][1]
					//[1][0]
					//[0][0]
					if((j + 2) < MATCH_ROWS && (i + 1) < MATCH_COLUMNS){
						if(matchMatrixUnit["i"+i+":j"+(j+1)].unitType != MATCH_HIT_0 && matchMatrixUnit["i"+i+":j"+j].unitType != MATCH_HIT_0 && matchMatrixUnit["i"+(i+1)+":j"+(j+1)].unitType != MATCH_HIT_0 && matchMatrixUnit["i"+i+":j"+(j+2)].unitType != MATCH_HIT_0){
							if(matchMatrixUnit["i"+i+":j"+j].unitType == matchMatrixUnit["i"+(i+1)+":j"+(j+1)].unitType && matchMatrixUnit["i"+i+":j"+j].unitType == matchMatrixUnit["i"+i+":j"+(j+2)].unitType) { return true; }
						}
					}
					//[1][0]
					//[1][0]
					//[X][1]
					//[0][0]
					if((j + 2) < MATCH_ROWS && (i + 1) < MATCH_COLUMNS){
						if(matchMatrixUnit["i"+i+":j"+(j+2)].unitType != MATCH_HIT_0 && matchMatrixUnit["i"+i+":j"+(j+1)].unitType != MATCH_HIT_0 && matchMatrixUnit["i"+i+":j"+j].unitType != MATCH_HIT_0 && matchMatrixUnit["i"+(i+1)+":j"+(j+2)].unitType != MATCH_HIT_0){
							if(matchMatrixUnit["i"+i+":j"+j].unitType == matchMatrixUnit["i"+i+":j"+(j+1)].unitType && matchMatrixUnit["i"+i+":j"+j].unitType == matchMatrixUnit["i"+(i+1)+":j"+(j+2)].unitType) { return true; }
						}
					}
					//[X][1]
					//[1][0]
					//[1][0]
					//[0][0]
					if((j + 2) < MATCH_ROWS && (i + 1) < MATCH_COLUMNS){
						if(matchMatrixUnit["i"+i+":j"+j].unitType != MATCH_HIT_0 && matchMatrixUnit["i"+(i+1)+":j"+j].unitType != MATCH_HIT_0 && matchMatrixUnit["i"+i+":j"+(j+1)].unitType != MATCH_HIT_0 && matchMatrixUnit["i"+i+":j"+(j+2)].unitType != MATCH_HIT_0){
							if(matchMatrixUnit["i"+(i+1)+":j"+j].unitType == matchMatrixUnit["i"+i+":j"+(j+1)].unitType && matchMatrixUnit["i"+(i+1)+":j"+j].unitType == matchMatrixUnit["i"+i+":j"+(j+2)].unitType) { return true; }
						}
					}
				}else{
					//[1]
					//[1]
					//[X]
					//[1]
					if((j + 3) < MATCH_ROWS){
						if(matchMatrixUnit["i"+i+":j"+(j+2)].unitType != MATCH_HIT_0 && matchMatrixUnit["i"+i+":j"+j].unitType != MATCH_HIT_0 && matchMatrixUnit["i"+i+":j"+(j+1)].unitType != MATCH_HIT_0 && matchMatrixUnit["i"+i+":j"+(j+3)].unitType != MATCH_HIT_0){
							if(matchMatrixUnit["i"+i+":j"+j].unitType == matchMatrixUnit["i"+i+":j"+(j+1)].unitType && matchMatrixUnit["i"+i+":j"+j].unitType == matchMatrixUnit["i"+i+":j"+(j+3)].unitType) { return true; }
						}
					}
					//[1]
					//[X]
					//[1]
					//[1]
					if((j + 3) < MATCH_ROWS){
						if(matchMatrixUnit["i"+i+":j"+(j+1)].unitType != MATCH_HIT_0 && matchMatrixUnit["i"+i+":j"+(j+2)].unitType != MATCH_HIT_0 && matchMatrixUnit["i"+i+":j"+j].unitType != MATCH_HIT_0 && matchMatrixUnit["i"+i+":j"+(j+3)].unitType != MATCH_HIT_0){
							if(matchMatrixUnit["i"+i+":j"+j].unitType == matchMatrixUnit["i"+i+":j"+(j+2)].unitType && matchMatrixUnit["i"+i+":j"+j].unitType == matchMatrixUnit["i"+i+":j"+(j+3)].unitType) { return true; }
						}
					}
					//[1][0]
					//[X][1]
					//[1][0]
					//[0][0]
					if((j + 2) < MATCH_ROWS && (i + 1) < MATCH_COLUMNS){
						if(matchMatrixUnit["i"+i+":j"+(j+1)].unitType != MATCH_HIT_0 && matchMatrixUnit["i"+(i+1)+":j"+(j+1)].unitType != MATCH_HIT_0 && matchMatrixUnit["i"+i+":j"+j].unitType != MATCH_HIT_0 && matchMatrixUnit["i"+i+":j"+(j+2)].unitType != MATCH_HIT_0){
							if(matchMatrixUnit["i"+i+":j"+j].unitType == matchMatrixUnit["i"+(i+1)+":j"+(j+1)].unitType && matchMatrixUnit["i"+i+":j"+j].unitType == matchMatrixUnit["i"+i+":j"+(j+2)].unitType) { return true; }
						}
					}
					//[0][1]
					//[1][X]
					//[0][1]
					//[0][0]
					if((j + 2) < MATCH_ROWS && (i - 1) >= 0){
						if(matchMatrixUnit["i"+i+":j"+(j+1)].unitType != MATCH_HIT_0 && matchMatrixUnit["i"+i+":j"+j].unitType != MATCH_HIT_0 && matchMatrixUnit["i"+(i-1)+":j"+(j+1)].unitType != MATCH_HIT_0 && matchMatrixUnit["i"+i+":j"+(j+2)].unitType != MATCH_HIT_0){
							if(matchMatrixUnit["i"+i+":j"+j].unitType == matchMatrixUnit["i"+(i-1)+":j"+(j+1)].unitType && matchMatrixUnit["i"+i+":j"+j].unitType == matchMatrixUnit["i"+i+":j"+(j+2)].unitType) { return true; }
						}
					}
					//[1][0]
					//[1][0]
					//[X][1]
					//[0][0]
					if((j + 2) < MATCH_ROWS && (i + 1) < MATCH_COLUMNS){
						if(matchMatrixUnit["i"+i+":j"+(j+2)].unitType != MATCH_HIT_0 && matchMatrixUnit["i"+i+":j"+j].unitType != MATCH_HIT_0 && matchMatrixUnit["i"+i+":j"+(j+1)].unitType != MATCH_HIT_0 && matchMatrixUnit["i"+(i+1)+":j"+(j+2)].unitType != MATCH_HIT_0){
							if(matchMatrixUnit["i"+i+":j"+j].unitType == matchMatrixUnit["i"+i+":j"+(j+1)].unitType && matchMatrixUnit["i"+i+":j"+j].unitType == matchMatrixUnit["i"+(i+1)+":j"+(j+2)].unitType) { return true; }
						}
					}
					//[X][1]
					//[1][0]
					//[1][0]
					//[0][0]
					if((j + 2) < MATCH_ROWS && (i + 1) < MATCH_COLUMNS){
						if(matchMatrixUnit["i"+i+":j"+j].unitType != MATCH_HIT_0 && matchMatrixUnit["i"+(i+1)+":j"+j].unitType != MATCH_HIT_0 && matchMatrixUnit["i"+i+":j"+(j+1)].unitType != MATCH_HIT_0 && matchMatrixUnit["i"+i+":j"+(j+2)].unitType != MATCH_HIT_0){
							if(matchMatrixUnit["i"+(i+1)+":j"+j].unitType == matchMatrixUnit["i"+i+":j"+(j+1)].unitType && matchMatrixUnit["i"+(i+1)+":j"+j].unitType == matchMatrixUnit["i"+i+":j"+(j+2)].unitType) { return true; }
						}
					}
					//[0][1]
					//[0][1]
					//[1][X]
					//[0][0]
					if((j + 2) < MATCH_ROWS && (i - 1) >= 0){
						if(matchMatrixUnit["i"+i+":j"+(j+2)].unitType != MATCH_HIT_0 && matchMatrixUnit["i"+i+":j"+j].unitType != MATCH_HIT_0 && matchMatrixUnit["i"+i+":j"+(j+1)].unitType != MATCH_HIT_0 && matchMatrixUnit["i"+(i-1)+":j"+(j+2)].unitType != MATCH_HIT_0){
							if(matchMatrixUnit["i"+i+":j"+j].unitType == matchMatrixUnit["i"+i+":j"+(j+1)].unitType && matchMatrixUnit["i"+i+":j"+j].unitType == matchMatrixUnit["i"+(i-1)+":j"+(j+2)].unitType) { return true; }
						}
					}
					//[1][X]
					//[0][1]
					//[0][1]
					//[0][0]
					if((j + 2) < MATCH_ROWS && (i - 1) >= 0){
						if(matchMatrixUnit["i"+i+":j"+j].unitType != MATCH_HIT_0 && matchMatrixUnit["i"+(i-1)+":j"+j].unitType != MATCH_HIT_0 && matchMatrixUnit["i"+i+":j"+(j+1)].unitType != MATCH_HIT_0 && matchMatrixUnit["i"+i+":j"+(j+2)].unitType != MATCH_HIT_0){
							if(matchMatrixUnit["i"+(i-1)+":j"+j].unitType == matchMatrixUnit["i"+i+":j"+(j+1)].unitType && matchMatrixUnit["i"+(i-1)+":j"+j].unitType == matchMatrixUnit["i"+i+":j"+(j+2)].unitType) { return true; }
						}
					}
				}
			}
		}
	}
	return false;
}


/* Обновление игрового поля если нет комбинаций ===================================================== */
function matchUpdateField()
{
	matchMoveDownProcesses = new Object();
        
        var indexRandom = Math.random() / 0.1;
	var indexLevel = Math.round(indexRandom);
        
	var index = 0;
	for(var i = 0; i < MATCH_COLUMNS; i++)
	{
		for(var j = 0; j < MATCH_ROWS; j++)
		{
			if(matchLevelJSON.data.Level.cell[index].cellObject !== MATCH_HIT_0)
			{
				//matchMatrixUnit["i"+i+":j"+j].alpha = 0.0;
				matchMatrixUnit["i"+i+":j"+j].flagRemove = false;
				matchMatrixUnit["i"+i+":j"+j].position.x = matchMatrixBackPosition["i"+i+":j"+j][0];
				matchMatrixUnit["i"+i+":j"+j].position.y = matchMatrixBackPosition["i"+i+":j"+j][1];
				matchMoveDownProcesses["i"+i+":j"+j] = true;
				
				if(fieldLevelsJson["level_0_" + indexLevel].data.Level.cell[index].cellObject === MATCH_HIT_1)
				{
					matchMatrixUnit["i"+i+":j"+j].texture = hit1Texture;
					matchMatrixUnit["i"+i+":j"+j].unitType = MATCH_HIT_1;
				}
				if(fieldLevelsJson["level_0_" + indexLevel].data.Level.cell[index].cellObject === MATCH_HIT_2)
				{
					matchMatrixUnit["i"+i+":j"+j].texture = hit2Texture;
					matchMatrixUnit["i"+i+":j"+j].unitType = MATCH_HIT_2;
				}
				if(fieldLevelsJson["level_0_" + indexLevel].data.Level.cell[index].cellObject === MATCH_HIT_3)
				{
					matchMatrixUnit["i"+i+":j"+j].texture = hit3Texture;
					matchMatrixUnit["i"+i+":j"+j].unitType = MATCH_HIT_3;
				}
				if(fieldLevelsJson["level_0_" + indexLevel].data.Level.cell[index].cellObject === MATCH_HIT_4)
				{
					matchMatrixUnit["i"+i+":j"+j].texture = hit4Texture;
					matchMatrixUnit["i"+i+":j"+j].unitType = MATCH_HIT_4;
				}
				if(fieldLevelsJson["level_0_" + indexLevel].data.Level.cell[index].cellObject === MATCH_HIT_5)
				{
					matchMatrixUnit["i"+i+":j"+j].texture = hit5Texture;
					matchMatrixUnit["i"+i+":j"+j].unitType = MATCH_HIT_5;
				}
				
				/* Спускаем удалённые юниты */
				createjs.Tween.get(matchMatrixUnit["i"+i+":j"+j], {loop: false})
					.to({alpha: 1.0}, 500)
					.to({x: matchMatrixFrontPosition["i"+i+":j"+j][0], y: matchMatrixFrontPosition["i"+i+":j"+j][1]}, 500, createjs.Ease.getPowInOut(4))
					.call(onCompleteMatchMoveDownNewUnits, matchMatrixUnit["i"+i+":j"+j]); // событие выполнено
				createjs.Ticker.setFPS(60);
			}
			index++;
		}
	}
}

/* Ход искусственного интеллекта ============================================================== */
function matchGetPriorityUnit(unitType)
{
	if(unitType === MATCH_HIT_1) {return 1;}
	if(unitType === MATCH_HIT_2) {return 2;}
	if(unitType === MATCH_HIT_3)
	{
		var typeRandom = Math.random() / 0.1;
		var uType = Math.round(typeRandom);
		return uType;
	}
	if(unitType === MATCH_HIT_4) {return 4;}
	if(unitType === MATCH_HIT_5) {return 5;}
	return 0;
}

function matchActionAI()
{
	/*	   0  1  2  3  4  5
	* 	0:[0][0][0][0][1][0]
		1:[0][0][1][1][0][1]
		2:[0][0][0][0][1][0]
		3:[0][0][0][0][0][0]
		4:[0][0][0][0][0][0]
		5:[0][0][0][0][0][0]
	 * */
	 var priorityUnit = 0;
	 var lastpriorityUnit = 0;

	// Проверка строк и колонок
	for(var i = 0; i < MATCH_COLUMNS; i++)
	{
		for(var j = 0; j < MATCH_ROWS; j++)
		{
			if(matchMatrixUnit["i"+i+":j"+j].unitType != MATCH_HIT_0)
			{
				// ПРОВЕРКА СТРОКИ
				if(j == 0)
				{
					//[1][1][X][1]
					if((i + 3) < MATCH_COLUMNS){
						if(matchMatrixUnit["i"+(i+2)+":j"+j].unitType != MATCH_HIT_0 && matchMatrixUnit["i"+i+":j"+j].unitType != MATCH_HIT_0 && matchMatrixUnit["i"+(i+1)+":j"+j].unitType != MATCH_HIT_0 && matchMatrixUnit["i"+(i+3)+":j"+j].unitType != MATCH_HIT_0){
							if(matchMatrixUnit["i"+i+":j"+j].unitType == matchMatrixUnit["i"+(i+1)+":j"+j].unitType && matchMatrixUnit["i"+i+":j"+j].unitType == matchMatrixUnit["i"+(i+3)+":j"+j].unitType) 
							{
								priorityUnit = matchGetPriorityUnit(matchMatrixUnit["i"+i+":j"+j].unitType);
								if(priorityUnit > lastpriorityUnit)	
								{
									matchSelectUnit1 = matchMatrixUnit["i"+(i+2)+":j"+j];
									matchSelectUnit2 = matchMatrixUnit["i"+(i+3)+":j"+j];
									lastpriorityUnit = priorityUnit;
								}
							}
						}
					}
					//[1][X][1][1]
					if((i + 3) < MATCH_COLUMNS){
						if(matchMatrixUnit["i"+(i+1)+":j"+j].unitType != MATCH_HIT_0 && matchMatrixUnit["i"+i+":j"+j].unitType != MATCH_HIT_0 && matchMatrixUnit["i"+(i+2)+":j"+j].unitType != MATCH_HIT_0 && matchMatrixUnit["i"+(i+3)+":j"+j].unitType != MATCH_HIT_0){
							if(matchMatrixUnit["i"+i+":j"+j].unitType == matchMatrixUnit["i"+(i+2)+":j"+j].unitType && matchMatrixUnit["i"+i+":j"+j].unitType == matchMatrixUnit["i"+(i+3)+":j"+j].unitType) 
							{ 
								priorityUnit = matchGetPriorityUnit(matchMatrixUnit["i"+i+":j"+j].unitType);
								if(priorityUnit > lastpriorityUnit)	
								{
									matchSelectUnit1 = matchMatrixUnit["i"+i+":j"+j];
									matchSelectUnit2 = matchMatrixUnit["i"+(i+1)+":j"+j];
									lastpriorityUnit = priorityUnit;
								}
							}
						}
					}
					//[0][1][X][1]
					//[0][0][1][0]
					if((i + 2) < MATCH_COLUMNS && (j + 1) < MATCH_ROWS){
						if(matchMatrixUnit["i"+(i+1)+":j"+j].unitType != MATCH_HIT_0 && matchMatrixUnit["i"+i+":j"+j].unitType != MATCH_HIT_0 && matchMatrixUnit["i"+(i+1)+":j"+(j+1)].unitType != MATCH_HIT_0 && matchMatrixUnit["i"+(i+2)+":j"+j].unitType != MATCH_HIT_0){
							if(matchMatrixUnit["i"+i+":j"+j].unitType == matchMatrixUnit["i"+(i+1)+":j"+(j+1)].unitType && matchMatrixUnit["i"+i+":j"+j].unitType == matchMatrixUnit["i"+(i+2)+":j"+j].unitType) 
							{
								priorityUnit = matchGetPriorityUnit(matchMatrixUnit["i"+i+":j"+j].unitType);
								if(priorityUnit > lastpriorityUnit)	
								{
									matchSelectUnit1 = matchMatrixUnit["i"+(i+1)+":j"+j];
									matchSelectUnit2 = matchMatrixUnit["i"+(i+1)+":j"+(j+1)];
									lastpriorityUnit = priorityUnit;
								}
							}
						}
					}
					//[0][1][1][X]
					//[0][0][0][1]
					if((i + 2) < MATCH_COLUMNS && (j + 1) < MATCH_ROWS){
						if(matchMatrixUnit["i"+(i+2)+":j"+j].unitType != MATCH_HIT_0 && matchMatrixUnit["i"+i+":j"+j].unitType != MATCH_HIT_0 && matchMatrixUnit["i"+(i+1)+":j"+j].unitType != MATCH_HIT_0 && matchMatrixUnit["i"+(i+2)+":j"+j].unitType != MATCH_HIT_0){
							if(matchMatrixUnit["i"+i+":j"+j].unitType == matchMatrixUnit["i"+(i+1)+":j"+j].unitType && matchMatrixUnit["i"+i+":j"+j].unitType == matchMatrixUnit["i"+(i+2)+":j"+(j+1)].unitType) 
							{
								priorityUnit = matchGetPriorityUnit(matchMatrixUnit["i"+i+":j"+j].unitType);
								if(priorityUnit > lastpriorityUnit)	
								{
									matchSelectUnit1 = matchMatrixUnit["i"+(i+2)+":j"+j];
									matchSelectUnit2 = matchMatrixUnit["i"+(i+2)+":j"+(j+1)];
									lastpriorityUnit = priorityUnit;
								}
							}
						}
					}
					//[0][X][1][1]
					//[0][1][0][0]
					if((i + 2) < MATCH_COLUMNS && (j + 1) < MATCH_ROWS){
						if(matchMatrixUnit["i"+i+":j"+j].unitType != MATCH_HIT_0 && matchMatrixUnit["i"+i+":j"+(j+1)].unitType != MATCH_HIT_0 && matchMatrixUnit["i"+(i+1)+":j"+j].unitType != MATCH_HIT_0 && matchMatrixUnit["i"+(i+2)+":j"+j].unitType != MATCH_HIT_0){
							if(matchMatrixUnit["i"+i+":j"+(j+1)].unitType == matchMatrixUnit["i"+(i+1)+":j"+j].unitType && matchMatrixUnit["i"+i+":j"+(j+1)].unitType == matchMatrixUnit["i"+(i+2)+":j"+j].unitType) 
							{
								priorityUnit = matchGetPriorityUnit(matchMatrixUnit["i"+i+":j"+(j+1)].unitType);
								if(priorityUnit > lastpriorityUnit)	
								{
									matchSelectUnit1 = matchMatrixUnit["i"+i+":j"+j];
									matchSelectUnit2 = matchMatrixUnit["i"+i+":j"+(j+1)];
									lastpriorityUnit = priorityUnit;
								}
							}
						}
					}
				}else{
					//[1][1][X][1]
					if((i + 3) < MATCH_COLUMNS){
						if(matchMatrixUnit["i"+(i+2)+":j"+j].unitType != MATCH_HIT_0 && matchMatrixUnit["i"+i+":j"+j].unitType != MATCH_HIT_0 && matchMatrixUnit["i"+(i+1)+":j"+j].unitType != MATCH_HIT_0 && matchMatrixUnit["i"+(i+3)+":j"+j].unitType != MATCH_HIT_0){
							if(matchMatrixUnit["i"+i+":j"+j].unitType == matchMatrixUnit["i"+(i+1)+":j"+j].unitType && matchMatrixUnit["i"+i+":j"+j].unitType == matchMatrixUnit["i"+(i+3)+":j"+j].unitType) 
							{
								priorityUnit = matchGetPriorityUnit(matchMatrixUnit["i"+i+":j"+j].unitType);
								if(priorityUnit > lastpriorityUnit)	
								{
									matchSelectUnit1 = matchMatrixUnit["i"+(i+2)+":j"+j];
									matchSelectUnit2 = matchMatrixUnit["i"+(i+3)+":j"+j];
									lastpriorityUnit = priorityUnit;
								}
							}
						}
					}
					//[1][X][1][1]
					if((i + 3) < MATCH_COLUMNS){
						if(matchMatrixUnit["i"+(i+1)+":j"+j].unitType != MATCH_HIT_0 && matchMatrixUnit["i"+i+":j"+j].unitType != MATCH_HIT_0 && matchMatrixUnit["i"+(i+2)+":j"+j].unitType != MATCH_HIT_0 && matchMatrixUnit["i"+(i+3)+":j"+j].unitType != MATCH_HIT_0){
							if(matchMatrixUnit["i"+i+":j"+j].unitType == matchMatrixUnit["i"+(i+2)+":j"+j].unitType && matchMatrixUnit["i"+i+":j"+j].unitType == matchMatrixUnit["i"+(i+3)+":j"+j].unitType) 
							{
								priorityUnit = matchGetPriorityUnit(matchMatrixUnit["i"+i+":j"+j].unitType);
								if(priorityUnit > lastpriorityUnit)	
								{
									matchSelectUnit1 = matchMatrixUnit["i"+i+":j"+j];
									matchSelectUnit2 = matchMatrixUnit["i"+(i+1)+":j"+j];
									lastpriorityUnit = priorityUnit;
								}
							}
						}
					}
					//[0][1][1][X]
					//[0][0][0][1]
					if((i + 2) < MATCH_COLUMNS && (j + 1) < MATCH_ROWS){
						if(matchMatrixUnit["i"+(i+2)+":j"+j].unitType != MATCH_HIT_0 && matchMatrixUnit["i"+i+":j"+j].unitType != MATCH_HIT_0 && matchMatrixUnit["i"+(i+1)+":j"+j].unitType != MATCH_HIT_0 && matchMatrixUnit["i"+(i+2)+":j"+(j+1)].unitType != MATCH_HIT_0){
							if(matchMatrixUnit["i"+i+":j"+j].unitType == matchMatrixUnit["i"+(i+1)+":j"+j].unitType && matchMatrixUnit["i"+i+":j"+j].unitType == matchMatrixUnit["i"+(i+2)+":j"+(j+1)].unitType) 
							{
								priorityUnit = matchGetPriorityUnit(matchMatrixUnit["i"+i+":j"+j].unitType);
								if(priorityUnit > lastpriorityUnit)	
								{
									matchSelectUnit1 = matchMatrixUnit["i"+(i+2)+":j"+j];
									matchSelectUnit2 = matchMatrixUnit["i"+(i+2)+":j"+(j+1)];
									lastpriorityUnit = priorityUnit;
								}
							}
						}
					}
					//[0][0][0][1]
					//[0][1][1][X]
					if((i + 2) < MATCH_COLUMNS && (j - 1) >=0){
						if(matchMatrixUnit["i"+(i+2)+":j"+j].unitType != MATCH_HIT_0 && matchMatrixUnit["i"+i+":j"+j].unitType != MATCH_HIT_0 && matchMatrixUnit["i"+(i+1)+":j"+j].unitType != MATCH_HIT_0 && matchMatrixUnit["i"+(i+2)+":j"+(j-1)].unitType != MATCH_HIT_0){
							if(matchMatrixUnit["i"+i+":j"+j].unitType == matchMatrixUnit["i"+(i+1)+":j"+j].unitType && matchMatrixUnit["i"+i+":j"+j].unitType == matchMatrixUnit["i"+(i+2)+":j"+(j-1)].unitType) 
							{
								priorityUnit = matchGetPriorityUnit(matchMatrixUnit["i"+i+":j"+j].unitType);
								if(priorityUnit > lastpriorityUnit)	
								{
									matchSelectUnit1 = matchMatrixUnit["i"+(i+2)+":j"+(j-1)];
									matchSelectUnit2 = matchMatrixUnit["i"+(i+2)+":j"+j];
									lastpriorityUnit = priorityUnit;
								}
							}
						}
					}
					//[0][X][1][1]
					//[0][1][0][0]
					if((i + 2) < MATCH_COLUMNS && (j + 1) < MATCH_ROWS){
						if(matchMatrixUnit["i"+i+":j"+j].unitType != MATCH_HIT_0 && matchMatrixUnit["i"+i+":j"+(j+1)].unitType != MATCH_HIT_0 && matchMatrixUnit["i"+(i+1)+":j"+j].unitType != MATCH_HIT_0 && matchMatrixUnit["i"+(i+2)+":j"+j].unitType != MATCH_HIT_0){
							if(matchMatrixUnit["i"+i+":j"+(j+1)].unitType == matchMatrixUnit["i"+(i+1)+":j"+j].unitType && matchMatrixUnit["i"+i+":j"+(j+1)].unitType == matchMatrixUnit["i"+(i+2)+":j"+j].unitType) 
							{
								priorityUnit = matchGetPriorityUnit(matchMatrixUnit["i"+i+":j"+(j+1)].unitType);
								if(priorityUnit > lastpriorityUnit)	
								{
									matchSelectUnit1 = matchMatrixUnit["i"+i+":j"+j];
									matchSelectUnit2 = matchMatrixUnit["i"+i+":j"+(j+1)];
									lastpriorityUnit = priorityUnit;
								}
							}
						}
					}
					//[0][1][0][0]
					//[0][X][1][1]
					if((i + 2) < MATCH_COLUMNS && (j + 1) < MATCH_ROWS){
						if(matchMatrixUnit["i"+i+":j"+(j+1)].unitType != MATCH_HIT_0 && matchMatrixUnit["i"+i+":j"+j].unitType != MATCH_HIT_0 && matchMatrixUnit["i"+(i+1)+":j"+(j+1)].unitType != MATCH_HIT_0 && matchMatrixUnit["i"+(i+2)+":j"+(j+1)].unitType != MATCH_HIT_0){
							if(matchMatrixUnit["i"+i+":j"+j].unitType == matchMatrixUnit["i"+(i+1)+":j"+(j+1)].unitType && matchMatrixUnit["i"+i+":j"+j].unitType == matchMatrixUnit["i"+(i+2)+":j"+(j+1)].unitType) 
							{
								priorityUnit = matchGetPriorityUnit(matchMatrixUnit["i"+i+":j"+j].unitType);
								if(priorityUnit > lastpriorityUnit)	
								{
									matchSelectUnit1 = matchMatrixUnit["i"+i+":j"+j];
									matchSelectUnit2 = matchMatrixUnit["i"+i+":j"+(j+1)];
									lastpriorityUnit = priorityUnit;
								}
							}
						}
					}
					//[0][0][1][0]
					//[0][1][X][1]
					if((i + 2) < MATCH_COLUMNS && (j - 1) >= 0){
						if(matchMatrixUnit["i"+(i+1)+":j"+j].unitType != MATCH_HIT_0 && matchMatrixUnit["i"+i+":j"+j].unitType != MATCH_HIT_0 && matchMatrixUnit["i"+(i+1)+":j"+(j-1)].unitType != MATCH_HIT_0 && matchMatrixUnit["i"+(i+2)+":j"+j].unitType != MATCH_HIT_0){
							if(matchMatrixUnit["i"+i+":j"+j].unitType == matchMatrixUnit["i"+(i+1)+":j"+(j-1)].unitType && matchMatrixUnit["i"+i+":j"+j].unitType == matchMatrixUnit["i"+(i+2)+":j"+j].unitType) 
							{
								priorityUnit = matchGetPriorityUnit(matchMatrixUnit["i"+i+":j"+j].unitType);
								if(priorityUnit > lastpriorityUnit)	
								{
									matchSelectUnit1 = matchMatrixUnit["i"+(i+1)+":j"+(j-1)];
									matchSelectUnit2 = matchMatrixUnit["i"+(i+1)+":j"+j];
									lastpriorityUnit = priorityUnit;
								}
							}
						}
					}
					//[0][1][X][1]
					//[0][0][1][0]
					if((i + 2) < MATCH_COLUMNS && (j + 1) < MATCH_ROWS){
						if(matchMatrixUnit["i"+(i+1)+":j"+j].unitType != MATCH_HIT_0 && matchMatrixUnit["i"+i+":j"+j].unitType != MATCH_HIT_0 && matchMatrixUnit["i"+(i+1)+":j"+(j+1)].unitType != MATCH_HIT_0 && matchMatrixUnit["i"+(i+2)+":j"+j].unitType != MATCH_HIT_0){
							if(matchMatrixUnit["i"+i+":j"+j].unitType == matchMatrixUnit["i"+(i+1)+":j"+(j+1)].unitType && matchMatrixUnit["i"+i+":j"+j].unitType == matchMatrixUnit["i"+(i+2)+":j"+j].unitType) 
							{
								priorityUnit = matchGetPriorityUnit(matchMatrixUnit["i"+i+":j"+j].unitType);
								if(priorityUnit > lastpriorityUnit)	
								{
									matchSelectUnit1 = matchMatrixUnit["i"+(i+1)+":j"+j];
									matchSelectUnit2 = matchMatrixUnit["i"+(i+1)+":j"+(j+1)];
									lastpriorityUnit = priorityUnit;
								}
							}
						}
					}
				}

				// ПРОВЕРКА КОЛОНКИ
				if(i == 0)
				{
					//[1]
					//[1]
					//[X]
					//[1]
					if((j + 3) < MATCH_ROWS){
						if(matchMatrixUnit["i"+i+":j"+(j+2)].unitType != MATCH_HIT_0 && matchMatrixUnit["i"+i+":j"+j].unitType != MATCH_HIT_0 && matchMatrixUnit["i"+i+":j"+(j+1)].unitType != MATCH_HIT_0 && matchMatrixUnit["i"+i+":j"+(j+3)].unitType != MATCH_HIT_0){
							if(matchMatrixUnit["i"+i+":j"+j].unitType == matchMatrixUnit["i"+i+":j"+(j+1)].unitType && matchMatrixUnit["i"+i+":j"+j].unitType == matchMatrixUnit["i"+i+":j"+(j+3)].unitType) 
							{
								priorityUnit = matchGetPriorityUnit(matchMatrixUnit["i"+i+":j"+j].unitType);
								if(priorityUnit > lastpriorityUnit)	
								{
									matchSelectUnit1 = matchMatrixUnit["i"+i+":j"+(j+2)];
									matchSelectUnit2 = matchMatrixUnit["i"+i+":j"+(j+3)];
									lastpriorityUnit = priorityUnit;
								}
							}
						}
					}
					//[1]
					//[X]
					//[1]
					//[1]
					if((j + 3) < MATCH_ROWS){
						if(matchMatrixUnit["i"+i+":j"+(j+1)].unitType != MATCH_HIT_0 && matchMatrixUnit["i"+i+":j"+(j+2)].unitType != MATCH_HIT_0 && matchMatrixUnit["i"+i+":j"+j].unitType != MATCH_HIT_0 && matchMatrixUnit["i"+i+":j"+(j+3)].unitType != MATCH_HIT_0){
							if(matchMatrixUnit["i"+i+":j"+j].unitType == matchMatrixUnit["i"+i+":j"+(j+2)].unitType && matchMatrixUnit["i"+i+":j"+j].unitType == matchMatrixUnit["i"+i+":j"+(j+3)].unitType) 
							{
								priorityUnit = matchGetPriorityUnit(matchMatrixUnit["i"+i+":j"+j].unitType);
								if(priorityUnit > lastpriorityUnit)	
								{
									matchSelectUnit1 = matchMatrixUnit["i"+i+":j"+j];
									matchSelectUnit2 = matchMatrixUnit["i"+i+":j"+(j+1)];
									lastpriorityUnit = priorityUnit;
								}
							}
						}
					}
					//[1][0]
					//[X][1]
					//[1][0]
					//[0][0]
					if((j + 2) < MATCH_ROWS && (i + 1) < MATCH_COLUMNS){
						if(matchMatrixUnit["i"+i+":j"+(j+1)].unitType != MATCH_HIT_0 && matchMatrixUnit["i"+i+":j"+j].unitType != MATCH_HIT_0 && matchMatrixUnit["i"+(i+1)+":j"+(j+1)].unitType != MATCH_HIT_0 && matchMatrixUnit["i"+i+":j"+(j+2)].unitType != MATCH_HIT_0){
							if(matchMatrixUnit["i"+i+":j"+j].unitType == matchMatrixUnit["i"+(i+1)+":j"+(j+1)].unitType && matchMatrixUnit["i"+i+":j"+j].unitType == matchMatrixUnit["i"+i+":j"+(j+2)].unitType) 
							{
								priorityUnit = matchGetPriorityUnit(matchMatrixUnit["i"+i+":j"+j].unitType);
								if(priorityUnit > lastpriorityUnit)	
								{
									matchSelectUnit1 = matchMatrixUnit["i"+i+":j"+(j+1)];
									matchSelectUnit2 = matchMatrixUnit["i"+(i+1)+":j"+(j+1)];
									lastpriorityUnit = priorityUnit;
								}
							}
						}
					}
					//[1][0]
					//[1][0]
					//[X][1]
					//[0][0]
					if((j + 2) < MATCH_ROWS && (i + 1) < MATCH_COLUMNS){
						if(matchMatrixUnit["i"+i+":j"+(j+2)].unitType != MATCH_HIT_0 && matchMatrixUnit["i"+i+":j"+(j+1)].unitType != MATCH_HIT_0 && matchMatrixUnit["i"+i+":j"+j].unitType != MATCH_HIT_0 && matchMatrixUnit["i"+(i+1)+":j"+(j+2)].unitType != MATCH_HIT_0){
							if(matchMatrixUnit["i"+i+":j"+j].unitType == matchMatrixUnit["i"+i+":j"+(j+1)].unitType && matchMatrixUnit["i"+i+":j"+j].unitType == matchMatrixUnit["i"+(i+1)+":j"+(j+2)].unitType) 
							{
								priorityUnit = matchGetPriorityUnit(matchMatrixUnit["i"+i+":j"+j].unitType);
								if(priorityUnit > lastpriorityUnit)	
								{
									matchSelectUnit1 = matchMatrixUnit["i"+i+":j"+(j+2)];
									matchSelectUnit2 = matchMatrixUnit["i"+(i+1)+":j"+(j+2)];
									lastpriorityUnit = priorityUnit;
								}
							}
						}
					}
					//[X][1]
					//[1][0]
					//[1][0]
					//[0][0]
					if((j + 2) < MATCH_ROWS && (i + 1) < MATCH_COLUMNS){
						if(matchMatrixUnit["i"+i+":j"+j].unitType != MATCH_HIT_0 && matchMatrixUnit["i"+(i+1)+":j"+j].unitType != MATCH_HIT_0 && matchMatrixUnit["i"+i+":j"+(j+1)].unitType != MATCH_HIT_0 && matchMatrixUnit["i"+i+":j"+(j+2)].unitType != MATCH_HIT_0){
							if(matchMatrixUnit["i"+(i+1)+":j"+j].unitType == matchMatrixUnit["i"+i+":j"+(j+1)].unitType && matchMatrixUnit["i"+(i+1)+":j"+j].unitType == matchMatrixUnit["i"+i+":j"+(j+2)].unitType) 
							{
								priorityUnit = matchGetPriorityUnit(matchMatrixUnit["i"+(i+1)+":j"+j].unitType);
								if(priorityUnit > lastpriorityUnit)	
								{
									matchSelectUnit1 = matchMatrixUnit["i"+i+":j"+j];
									matchSelectUnit2 = matchMatrixUnit["i"+(i+1)+":j"+j];
									lastpriorityUnit = priorityUnit;
								}
							}
						}
					}
				}else{
					//[1]
					//[1]
					//[X]
					//[1]
					if((j + 3) < MATCH_ROWS){
						if(matchMatrixUnit["i"+i+":j"+(j+2)].unitType != MATCH_HIT_0 && matchMatrixUnit["i"+i+":j"+j].unitType != MATCH_HIT_0 && matchMatrixUnit["i"+i+":j"+(j+1)].unitType != MATCH_HIT_0 && matchMatrixUnit["i"+i+":j"+(j+3)].unitType != MATCH_HIT_0){
							if(matchMatrixUnit["i"+i+":j"+j].unitType == matchMatrixUnit["i"+i+":j"+(j+1)].unitType && matchMatrixUnit["i"+i+":j"+j].unitType == matchMatrixUnit["i"+i+":j"+(j+3)].unitType) 
							{
								priorityUnit = matchGetPriorityUnit(matchMatrixUnit["i"+i+":j"+j].unitType);
								if(priorityUnit > lastpriorityUnit)	
								{
									matchSelectUnit1 = matchMatrixUnit["i"+i+":j"+(j+2)];
									matchSelectUnit2 = matchMatrixUnit["i"+i+":j"+(j+3)];
									lastpriorityUnit = priorityUnit;
								}
							}
						}
					}
					//[1]
					//[X]
					//[1]
					//[1]
					if((j + 3) < MATCH_ROWS){
						if(matchMatrixUnit["i"+i+":j"+(j+1)].unitType != MATCH_HIT_0 && matchMatrixUnit["i"+i+":j"+(j+2)].unitType != MATCH_HIT_0 && matchMatrixUnit["i"+i+":j"+j].unitType != MATCH_HIT_0 && matchMatrixUnit["i"+i+":j"+(j+3)].unitType != MATCH_HIT_0){
							if(matchMatrixUnit["i"+i+":j"+j].unitType == matchMatrixUnit["i"+i+":j"+(j+2)].unitType && matchMatrixUnit["i"+i+":j"+j].unitType == matchMatrixUnit["i"+i+":j"+(j+3)].unitType) 
							{
								priorityUnit = matchGetPriorityUnit(matchMatrixUnit["i"+i+":j"+j].unitType);
								if(priorityUnit > lastpriorityUnit)	
								{
									matchSelectUnit1 = matchMatrixUnit["i"+i+":j"+j];
									matchSelectUnit2 = matchMatrixUnit["i"+i+":j"+(j+1)];
									lastpriorityUnit = priorityUnit;
								}
							}
						}
					}
					//[1][0]
					//[X][1]
					//[1][0]
					//[0][0]
					if((j + 2) < MATCH_ROWS && (i + 1) < MATCH_COLUMNS){
						if(matchMatrixUnit["i"+i+":j"+(j+1)].unitType != MATCH_HIT_0 && matchMatrixUnit["i"+(i+1)+":j"+(j+1)].unitType != MATCH_HIT_0 && matchMatrixUnit["i"+i+":j"+j].unitType != MATCH_HIT_0 && matchMatrixUnit["i"+i+":j"+(j+2)].unitType != MATCH_HIT_0){
							if(matchMatrixUnit["i"+i+":j"+j].unitType == matchMatrixUnit["i"+(i+1)+":j"+(j+1)].unitType && matchMatrixUnit["i"+i+":j"+j].unitType == matchMatrixUnit["i"+i+":j"+(j+2)].unitType) 
							{
								priorityUnit = matchGetPriorityUnit(matchMatrixUnit["i"+i+":j"+j].unitType);
								if(priorityUnit > lastpriorityUnit)	
								{
									matchSelectUnit1 = matchMatrixUnit["i"+i+":j"+(j+1)];
									matchSelectUnit2 = matchMatrixUnit["i"+(i+1)+":j"+(j+1)];
									lastpriorityUnit = priorityUnit;
								}
							}
						}
					}
					//[0][1]
					//[1][X]
					//[0][1]
					//[0][0]
					if((j + 2) < MATCH_ROWS && (i - 1) >= 0){
						if(matchMatrixUnit["i"+i+":j"+(j+1)].unitType != MATCH_HIT_0 && matchMatrixUnit["i"+i+":j"+j].unitType != MATCH_HIT_0 && matchMatrixUnit["i"+(i-1)+":j"+(j+1)].unitType != MATCH_HIT_0 && matchMatrixUnit["i"+i+":j"+(j+2)].unitType != MATCH_HIT_0){
							if(matchMatrixUnit["i"+i+":j"+j].unitType == matchMatrixUnit["i"+(i-1)+":j"+(j+1)].unitType && matchMatrixUnit["i"+i+":j"+j].unitType == matchMatrixUnit["i"+i+":j"+(j+2)].unitType) 
							{
								priorityUnit = matchGetPriorityUnit(matchMatrixUnit["i"+i+":j"+j].unitType);
								if(priorityUnit > lastpriorityUnit)	
								{
									matchSelectUnit1 = matchMatrixUnit["i"+(i-1)+":j"+(j+1)];
									matchSelectUnit2 = matchMatrixUnit["i"+i+":j"+(j+1)];
									lastpriorityUnit = priorityUnit;
								}
							}
						}
					}
					//[1][0]
					//[1][0]
					//[X][1]
					//[0][0]
					if((j + 2) < MATCH_ROWS && (i + 1) < MATCH_COLUMNS){
						if(matchMatrixUnit["i"+i+":j"+(j+2)].unitType != MATCH_HIT_0 && matchMatrixUnit["i"+i+":j"+j].unitType != MATCH_HIT_0 && matchMatrixUnit["i"+i+":j"+(j+1)].unitType != MATCH_HIT_0 && matchMatrixUnit["i"+(i+1)+":j"+(j+2)].unitType != MATCH_HIT_0){
							if(matchMatrixUnit["i"+i+":j"+j].unitType == matchMatrixUnit["i"+i+":j"+(j+1)].unitType && matchMatrixUnit["i"+i+":j"+j].unitType == matchMatrixUnit["i"+(i+1)+":j"+(j+2)].unitType) 
							{
								priorityUnit = matchGetPriorityUnit(matchMatrixUnit["i"+i+":j"+j].unitType);
								if(priorityUnit > lastpriorityUnit)	
								{
									matchSelectUnit1 = matchMatrixUnit["i"+i+":j"+(j+2)];
									matchSelectUnit2 = matchMatrixUnit["i"+(i+1)+":j"+(j+2)];
									lastpriorityUnit = priorityUnit;
								}
							}
						}
					}
					//[X][1]
					//[1][0]
					//[1][0]
					//[0][0]
					if((j + 2) < MATCH_ROWS && (i + 1) < MATCH_COLUMNS){
						if(matchMatrixUnit["i"+i+":j"+j].unitType != MATCH_HIT_0 && matchMatrixUnit["i"+(i+1)+":j"+j].unitType != MATCH_HIT_0 && matchMatrixUnit["i"+i+":j"+(j+1)].unitType != MATCH_HIT_0 && matchMatrixUnit["i"+i+":j"+(j+2)].unitType != MATCH_HIT_0){
							if(matchMatrixUnit["i"+(i+1)+":j"+j].unitType == matchMatrixUnit["i"+i+":j"+(j+1)].unitType && matchMatrixUnit["i"+(i+1)+":j"+j].unitType == matchMatrixUnit["i"+i+":j"+(j+2)].unitType) 
							{
								priorityUnit = matchGetPriorityUnit(matchMatrixUnit["i"+(i+1)+":j"+j].unitType);
								if(priorityUnit > lastpriorityUnit)	
								{
									matchSelectUnit1 = matchMatrixUnit["i"+i+":j"+j];
									matchSelectUnit2 = matchMatrixUnit["i"+(i+1)+":j"+j];
									lastpriorityUnit = priorityUnit;
								}
							}
						}
					}
					//[0][1]
					//[0][1]
					//[1][X]
					//[0][0]
					if((j + 2) < MATCH_ROWS && (i - 1) >= 0){
						if(matchMatrixUnit["i"+i+":j"+(j+2)].unitType != MATCH_HIT_0 && matchMatrixUnit["i"+i+":j"+j].unitType != MATCH_HIT_0 && matchMatrixUnit["i"+i+":j"+(j+1)].unitType != MATCH_HIT_0 && matchMatrixUnit["i"+(i-1)+":j"+(j+2)].unitType != MATCH_HIT_0){
							if(matchMatrixUnit["i"+i+":j"+j].unitType == matchMatrixUnit["i"+i+":j"+(j+1)].unitType && matchMatrixUnit["i"+i+":j"+j].unitType == matchMatrixUnit["i"+(i-1)+":j"+(j+2)].unitType) 
							{
								priorityUnit = matchGetPriorityUnit(matchMatrixUnit["i"+i+":j"+j].unitType);
								if(priorityUnit > lastpriorityUnit)	
								{
									matchSelectUnit1 = matchMatrixUnit["i"+(i-1)+":j"+(j+2)];
									matchSelectUnit2 = matchMatrixUnit["i"+i+":j"+(j+2)];
									lastpriorityUnit = priorityUnit;
								}
							}
						}
					}
					//[1][X]
					//[0][1]
					//[0][1]
					//[0][0]
					if((j + 2) < MATCH_ROWS && (i - 1) >= 0){
						if(matchMatrixUnit["i"+i+":j"+j].unitType != MATCH_HIT_0 && matchMatrixUnit["i"+(i-1)+":j"+j].unitType != MATCH_HIT_0 && matchMatrixUnit["i"+i+":j"+(j+1)].unitType != MATCH_HIT_0 && matchMatrixUnit["i"+i+":j"+(j+2)].unitType != MATCH_HIT_0){
							if(matchMatrixUnit["i"+(i-1)+":j"+j].unitType == matchMatrixUnit["i"+i+":j"+(j+1)].unitType && matchMatrixUnit["i"+(i-1)+":j"+j].unitType == matchMatrixUnit["i"+i+":j"+(j+2)].unitType) 
							{
								priorityUnit = matchGetPriorityUnit(matchMatrixUnit["i"+(i-1)+":j"+j].unitType);
								if(priorityUnit > lastpriorityUnit)	
								{
									matchSelectUnit1 = matchMatrixUnit["i"+(i-1)+":j"+j];
									matchSelectUnit2 = matchMatrixUnit["i"+i+":j"+j];
									lastpriorityUnit = priorityUnit;
								}
							}
						}
					}
				}
			}
		}
	}

	if(matchSelectUnit1 !== null && matchSelectUnit2 !== null)
	{
		matchExchangeUnits(); // меняем юниты местами
	}else{
		matchActionAI();
	}
}

/* Анимация удаление юнитов */
function matchAnimationRemoveUnit(posX, posY)
{
	var anim = new PIXI.extras.MovieClip(animTexFlash);
	anim.position.x = posX - 45;
	anim.position.y = posY - 30;
	anim.loop = false;
	anim.animationSpeed = 0.2;
	anim.onComplete = onMatchAnimationRemoveUnitComplete;
	anim.play();
	matchStage.addChild(anim);
}

function onMatchAnimationRemoveUnitComplete()
{
	matchStage.removeChild(this);
}

/* == КОНЕЦ ФАЙЛА ========================================================== */

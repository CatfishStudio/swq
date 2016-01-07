
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

/* Инициализация матриц позиций ================================================================ */
function initMatchMatrixPosition()
{
    matchMatrixFrontPosition = new Object();
    matchMatrixBackPosition = new Object();
    for(var i = 0; i < MATCH_COLUMNS; i++)
    {
        for(var j = 0; j < MATCH_ROWS; j++)
        {
            matchMatrixFrontPosition["i"+i+":j"+j] = [180 + (MATCH_CELL_WIDTH * i), 120 + (MATCH_CELL_HEIGHT * j)]; // x,y
            matchMatrixBackPosition["i"+i+":j"+j] = [180 + (MATCH_CELL_WIDTH * i), -372 + (MATCH_CELL_HEIGHT * j)]; // x,y
        }
    }
}




/* == КОНЕЦ ФАЙЛА ========================================================== */


/* == START FILE ========================================================= */

var Match3 = function(parent)
{
	var that = {
		
		MATCH_COLUMNS: 6,
		MATCH_ROWS: 6,
		MATCH_CELL_WIDTH: 82,
		MATCH_CELL_HEIGHT: 82,
		MATCH_CELL_TYPE_DROP: "CELL_TYPE_DROP",
		MATCH_CELL_TYPE_CLEAR: "CELL_TYPE_CLEAR",
		MATCH_CELL_TYPE_EMPTY: "CELL_TYPE_EMPTY",
		MATCH_HIT_0: "HIT_0",
		MATCH_HIT_1: "HIT_1",
		MATCH_HIT_2: "HIT_2",
		MATCH_HIT_3: "HIT_3",
		MATCH_HIT_4: "HIT_4",
		MATCH_HIT_5: "HIT_5",
		
		SIDE_NONE: "side_none",
		SIDE_JEDI: "side_jedi",
		SIDE_SITH: "side_sith",
		
		matchStage: null,													// главный stage
		matchMatrixCell: new Object(),								// Матрица ячеек игрового поля
		matchMatrixUnit: new Object(),						 		// Матрица юнитов на игровом поле

		matchMatrixFrontPosition: new Object(),					// Матрица позиций x,y юнитов игрового поля
		matchMatrixBackPosition: new Object(),					// Матрица позиций x,y юнитов за пределами игрового поля

		matchMoveDownProcesses: new Object(),				// запущенные процессы спуска юнитов

		matchSelectUnit1: null,											// выбранный первый юнит
		matchSelectUnit2: null,											// выбран второй юнит

		matchFieldBlocked: false,										// блокирование игрового поля

		modeAI: false,														// режим искуственного интелекта (по умолчанию отключен в начале)
                
                matchLevelJSON: null,											// json игрового поля
		
		/* Инициализация матриц позиций ================================================================ */
		initMatchMatrixPosition: function()
		{
			that.matchMatrixFrontPosition = new Object();
			that.matchMatrixBackPosition = new Object();
			for(var i = 0; i < that.MATCH_COLUMNS; i++)
			{
				for(var j = 0; j < that.MATCH_ROWS; j++)
				{
					that.matchMatrixFrontPosition["i"+i+":j"+j] = [184 + (that.MATCH_CELL_WIDTH * i), 120 + (that.MATCH_CELL_HEIGHT * j)]; // x,y
					that.matchMatrixBackPosition["i"+i+":j"+j] = [180 + (that.MATCH_CELL_WIDTH * i), -372 + (that.MATCH_CELL_HEIGHT * j)]; // x,y
				}
			}
		},
		
		/* Создание игрового поля ====================================================================== */
		createMatchField: function(levelJSON)
		{
			that.matchLevelJSON = levelJSON;
    
			that.initMatchMatrixPosition();
			
			that.matchStage = new PIXI.Container();
			that.matchMatrixCell = new Object();
			that.matchMatrixUnit = new Object();

			/* ячейки */
			var index = 0;
			for(var iCell = 0; iCell < that.MATCH_COLUMNS; iCell++)
			{
					for(var jCell = 0; jCell < that.MATCH_ROWS; jCell++)
					{
							if(levelJSON.data.Level.cell[index].cellType !== that.MATCH_CELL_TYPE_DROP)
							{
									var graphics = new PIXI.Graphics();
									if(parent.config.side === that.SIDE_JEDI)
									{
										graphics.lineStyle(1, 0x0080FF, 0.25);
										graphics.beginFill(0x0080FF, 0.25);
									}
									if(parent.config.side === that.SIDE_SITH)
									{
										graphics.lineStyle(1, 0x880000, 0.25);
										graphics.beginFill(0x880000, 0.25);
									}
									graphics.drawRoundedRect(0, 0, that.MATCH_CELL_WIDTH, that.MATCH_CELL_HEIGHT, 15);
									graphics.endFill();
									graphics.cellType = levelJSON.data.Level.cell[index].cellType;
									graphics.position.x = that.matchMatrixFrontPosition["i"+iCell+":j"+jCell][0];
									graphics.position.y = that.matchMatrixFrontPosition["i"+iCell+":j"+jCell][1];
									that.matchMatrixCell["i"+iCell+":j"+jCell] = graphics;
									that.matchStage.addChild(that.matchMatrixCell["i"+iCell+":j"+jCell]);
							}else{
									that.matchMatrixCell["i"+iCell+":j"+jCell] = null;
							}
							index++;
					}
			}

			/* Юниты */
			index = 0;
			var sprite;
			for(var iUnit = 0; iUnit < that.MATCH_COLUMNS; iUnit++)
			{
					for(var jUnit = 0; jUnit < that.MATCH_ROWS; jUnit++)
					{
                                                    if(levelJSON.data.Level.cell[index].cellObject !== that.MATCH_HIT_0)
                                                    {
									if(levelJSON.data.Level.cell[index].cellObject === that.MATCH_HIT_1) sprite = new PIXI.Sprite(parent.assets.getAsset("hit1Texture"));
									if(levelJSON.data.Level.cell[index].cellObject === that.MATCH_HIT_2) sprite = new PIXI.Sprite(parent.assets.getAsset("hit2Texture"));
									if(levelJSON.data.Level.cell[index].cellObject === that.MATCH_HIT_3) sprite = new PIXI.Sprite(parent.assets.getAsset("hit3Texture"));
									if(levelJSON.data.Level.cell[index].cellObject === that.MATCH_HIT_4) sprite = new PIXI.Sprite(parent.assets.getAsset("hit4Texture"));
									if(levelJSON.data.Level.cell[index].cellObject === that.MATCH_HIT_5) sprite = new PIXI.Sprite(parent.assets.getAsset("hit5Texture"));
									sprite.name = "i"+iUnit+":j"+jUnit;
									sprite.position.x = that.matchMatrixFrontPosition["i"+iUnit+":j"+jUnit][0];
									sprite.position.y = that.matchMatrixFrontPosition["i"+iUnit+":j"+jUnit][1];
									sprite.interactive = true;
									sprite.buttonMode = true;

									sprite.unitType = levelJSON.data.Level.cell[index].cellObject;
									sprite.flagRemove = false;
									sprite.posColumnI = iUnit;
									sprite.posRowJ = jUnit;
                                                                        
									sprite.click = that.onMatchUnitClick;
									sprite.tap = that.onMatchUnitClick;
                                                                        sprite.on('mousedown', that.onMatchUnitClick);
                                                                        sprite.on('touchstart', that.onMatchUnitClick);
                                                                        sprite.on('mouseup', that.onMatchUnitEndClick);
                                                                        sprite.on('touchend', that.onMatchUnitEndClick);
                                                                        
									that.matchMatrixUnit["i"+iUnit+":j"+jUnit] = sprite;
									that.matchStage.addChild(that.matchMatrixUnit["i"+iUnit+":j"+jUnit]);
						   }else{
									sprite = new PIXI.Sprite(parent.assets.getAsset("hit1Texture"));
									sprite.name = "i"+iUnit+":j"+jUnit;
									sprite.position.x = that.matchMatrixFrontPosition["i"+iUnit+":j"+jUnit][0];
									sprite.position.y = that.matchMatrixFrontPosition["i"+iUnit+":j"+jUnit][1];
									sprite.unitType = that.MATCH_HIT_0;
									sprite.flagRemove = false;
									sprite.posColumnI = iUnit;
									sprite.posRowJ = jUnit;
									that.matchMatrixUnit["i"+iUnit+":j"+jUnit] = sprite;
                                                    }
                                                    index++;
					}
			}
			that.matchMask();
		},
		
		/* Событие: нажатие на юнит */
		onMatchUnitClick: function()
		{
                        if(that.matchFieldBlocked === false)
			{
					that.matchCellColorSelect(this.unitType, this.posColumnI, this.posRowJ);
					if(that.matchSelectUnit1 === null) 
					{
							that.matchSelectUnit1 = this;
					}else{
							if(that.matchSelectUnit2 === null) 
							{
									that.matchSelectUnit2 = this;
									that.matchExchangeUnits(); // меняем юниты местами
							}
					}
			}
		},
                
                /* Событие: свайп кристалов */
                onMatchUnitEndClick: function()
                {
                    if(that.matchFieldBlocked === false)
                    {
                                    that.matchCellColorSelect(this.unitType, this.posColumnI, this.posRowJ);
                                    if(that.matchSelectUnit1 === null) 
                                    {
                                                    that.matchSelectUnit1 = this;
                                    }else{
                                                    if(that.matchSelectUnit2 === null) 
                                                    {
                                                                    that.matchSelectUnit2 = this;
                                                                    that.matchExchangeUnits(); // меняем юниты местами
                                                    }
                                    }
                    }
                },
                
		/* Определение цвета ячеек Cell игрового поля ================================================= */
		matchCellColorSelect: function(unitType, colI, rowJ)
		{
			that.matchMatrixCell["i"+colI+":j"+rowJ].clear();
			if(parent.config.side === that.SIDE_JEDI) that.matchMatrixCell["i"+colI+":j"+rowJ].lineStyle(1, 0x0080FF, 0.25);
			if(parent.config.side === that.SIDE_SITH) that.matchMatrixCell["i"+colI+":j"+rowJ].lineStyle(1, 0x880000, 0.25);
			if(unitType === that.MATCH_HIT_1) that.matchMatrixCell["i"+colI+":j"+rowJ].beginFill(0xFFFF80, 0.50);
			if(unitType === that.MATCH_HIT_2) that.matchMatrixCell["i"+colI+":j"+rowJ].beginFill(0xFF0000, 0.50);
			if(unitType === that.MATCH_HIT_3) that.matchMatrixCell["i"+colI+":j"+rowJ].beginFill(0xFF00FF, 0.50);
			if(unitType === that.MATCH_HIT_4) that.matchMatrixCell["i"+colI+":j"+rowJ].beginFill(0x0080FF, 0.50);
			if(unitType === that.MATCH_HIT_5) that.matchMatrixCell["i"+colI+":j"+rowJ].beginFill(0x00FF80, 0.50);
			that.matchMatrixCell["i"+colI+":j"+rowJ].drawRoundedRect(0, 0, that.MATCH_CELL_WIDTH, that.MATCH_CELL_HEIGHT, 15);
			that.matchMatrixCell["i"+colI+":j"+rowJ].endFill();
		},	
		
		matchCellColorBack: function()
		{
			if(that.matchSelectUnit1 !== null)
			{
					that.matchMatrixCell["i"+that.matchSelectUnit1.posColumnI+":j"+that.matchSelectUnit1.posRowJ].clear();
					if(parent.config.side === that.SIDE_JEDI)
					{
						that.matchMatrixCell["i"+that.matchSelectUnit1.posColumnI+":j"+that.matchSelectUnit1.posRowJ].lineStyle(1, 0x0080FF, 0.25);
						that.matchMatrixCell["i"+that.matchSelectUnit1.posColumnI+":j"+that.matchSelectUnit1.posRowJ].beginFill(0x0080FF, 0.25);
					}
					if(parent.config.side === that.SIDE_SITH)
					{
						that.matchMatrixCell["i"+that.matchSelectUnit1.posColumnI+":j"+that.matchSelectUnit1.posRowJ].lineStyle(1, 0x880000, 0.25);
						that.matchMatrixCell["i"+that.matchSelectUnit1.posColumnI+":j"+that.matchSelectUnit1.posRowJ].beginFill(0x880000, 0.25);
					}
					that.matchMatrixCell["i"+that.matchSelectUnit1.posColumnI+":j"+that.matchSelectUnit1.posRowJ].drawRoundedRect(0, 0, that.MATCH_CELL_WIDTH, that.MATCH_CELL_HEIGHT, 15);
					that.matchMatrixCell["i"+that.matchSelectUnit1.posColumnI+":j"+that.matchSelectUnit1.posRowJ].endFill();
			}
			if(that.matchSelectUnit2 !== null)
			{
					that.matchMatrixCell["i"+that.matchSelectUnit2.posColumnI+":j"+that.matchSelectUnit2.posRowJ].clear();
					if(parent.config.side === that.SIDE_JEDI)
					{
						that.matchMatrixCell["i"+that.matchSelectUnit2.posColumnI+":j"+that.matchSelectUnit2.posRowJ].lineStyle(1, 0x0080FF, 0.25);
						that.matchMatrixCell["i"+that.matchSelectUnit2.posColumnI+":j"+that.matchSelectUnit2.posRowJ].beginFill(0x0080FF, 0.25);
					}
					if(parent.config.side === that.SIDE_SITH)
					{
						that.matchMatrixCell["i"+that.matchSelectUnit2.posColumnI+":j"+that.matchSelectUnit2.posRowJ].lineStyle(1, 0x880000, 0.25);
						that.matchMatrixCell["i"+that.matchSelectUnit2.posColumnI+":j"+that.matchSelectUnit2.posRowJ].beginFill(0x880000, 0.25);
					}
					that.matchMatrixCell["i"+that.matchSelectUnit2.posColumnI+":j"+that.matchSelectUnit2.posRowJ].drawRoundedRect(0, 0, that.MATCH_CELL_WIDTH, that.MATCH_CELL_HEIGHT, 15);
					that.matchMatrixCell["i"+that.matchSelectUnit2.posColumnI+":j"+that.matchSelectUnit2.posRowJ].endFill();
			}
		},
		
		/* Обмен местами в массиве выбранных пользователем  объектов =================================== */
		matchExchangeUnits: function()
		{
			that.matchFieldBlocked = true; // поле заблокированно

			var iUnit1 = that.matchSelectUnit1.posColumnI;
			var jUnit1 = that.matchSelectUnit1.posRowJ;
			var iUnit2 = that.matchSelectUnit2.posColumnI;
			var jUnit2 = that.matchSelectUnit2.posRowJ;

			if(iUnit2 > (iUnit1 - 2) && iUnit2 < (iUnit1 + 2) && jUnit2 > (jUnit1 - 2) && jUnit2 < (jUnit1 + 2) && ((iUnit2 === iUnit1 && jUnit2 !== jUnit1) || (jUnit2 === jUnit1 && iUnit2 !== iUnit1)))
			{
					that.matchMatrixUnit["i"+iUnit1+":j"+jUnit1] = that.matchSelectUnit2;
					that.matchMatrixUnit["i"+iUnit1+":j"+jUnit1].posColumnI = iUnit1;
					that.matchMatrixUnit["i"+iUnit1+":j"+jUnit1].posRowJ = jUnit1;
					that.matchMatrixUnit["i"+iUnit1+":j"+jUnit1].name = "i"+iUnit1+":j"+jUnit1;

					that.matchMatrixUnit["i"+iUnit2+":j"+jUnit2] = that.matchSelectUnit1;
					that.matchMatrixUnit["i"+iUnit2+":j"+jUnit2].posColumnI = iUnit2;
					that.matchMatrixUnit["i"+iUnit2+":j"+jUnit2].posRowJ = jUnit2;
					that.matchMatrixUnit["i"+iUnit2+":j"+jUnit2].name = "i"+iUnit2+":j"+jUnit2;

					createjs.Tween.get(that.matchMatrixUnit["i"+iUnit1+":j"+jUnit1], {loop: false})
							.to({x: that.matchMatrixFrontPosition["i"+iUnit1+":j"+jUnit1][0], y: that.matchMatrixFrontPosition["i"+iUnit1+":j"+jUnit1][1]}, 500, createjs.Ease.getPowInOut(4));
					createjs.Tween.get(that.matchMatrixUnit["i"+iUnit2+":j"+jUnit2], {loop: false})
							.to({x: that.matchMatrixFrontPosition["i"+iUnit2+":j"+jUnit2][0], y: that.matchMatrixFrontPosition["i"+iUnit2+":j"+jUnit2][1]}, 500, createjs.Ease.getPowInOut(4))
							.call(that.onCompleteMatchExchangeUnits); // событие выполнено
					createjs.Ticker.setFPS(60);	

			}else{
					that.matchCellColorBack();
					that.matchSelectUnitsClear();
			}
		},
		
		onCompleteMatchExchangeUnits: function()
		{
			that.matchCellColorBack();
			that.matchCheckField(false);
		},
		
		matchBackExchangeUnits: function()
		{
			var iUnit1 = that.matchSelectUnit1.posColumnI;
			var jUnit1 = that.matchSelectUnit1.posRowJ;
			var iUnit2 = that.matchSelectUnit2.posColumnI;
			var jUnit2 = that.matchSelectUnit2.posRowJ;

			that.matchMatrixUnit["i"+iUnit1+":j"+jUnit1] = that.matchSelectUnit2;
			that.matchMatrixUnit["i"+iUnit1+":j"+jUnit1].posColumnI = iUnit1;
			that.matchMatrixUnit["i"+iUnit1+":j"+jUnit1].posRowJ = jUnit1;
			that.matchMatrixUnit["i"+iUnit1+":j"+jUnit1].name = "i"+iUnit1+":j"+jUnit1;

			that.matchMatrixUnit["i"+iUnit2+":j"+jUnit2] = that.matchSelectUnit1;
			that.matchMatrixUnit["i"+iUnit2+":j"+jUnit2].posColumnI = iUnit2;
			that.matchMatrixUnit["i"+iUnit2+":j"+jUnit2].posRowJ = jUnit2;
			that.matchMatrixUnit["i"+iUnit2+":j"+jUnit2].name = "i"+iUnit2+":j"+jUnit2;

			createjs.Tween.get(that.matchMatrixUnit["i"+iUnit1+":j"+jUnit1], {loop: false})
					.to({x: that.matchMatrixFrontPosition["i"+iUnit1+":j"+jUnit1][0], y: that.matchMatrixFrontPosition["i"+iUnit1+":j"+jUnit1][1]}, 500, createjs.Ease.getPowInOut(4));
			createjs.Tween.get(that.matchMatrixUnit["i"+iUnit2+":j"+jUnit2], {loop: false})
					.to({x: that.matchMatrixFrontPosition["i"+iUnit2+":j"+jUnit2][0], y: that.matchMatrixFrontPosition["i"+iUnit2+":j"+jUnit2][1]}, 500, createjs.Ease.getPowInOut(4))
					.call(that.matchSelectUnitsClear); // очистка и разблокиров поля
			createjs.Ticker.setFPS(60);	
		},
		
		matchSelectUnitsClear: function()
		{
			that.matchSelectUnit1 = null;
			that.matchSelectUnit2 = null;
			that.matchFieldBlocked = false; // поле разблокированно
		},
		
		/* Поиск групп ============================================================================== */
		matchCheckField: function(afterDown)
		{
                    if(parent.level !== null)
                    {
			that.matchMoveDownProcesses = new Object();
			if(that.matchCheckFieldFull()) // группы были найдены
			{
                                parent.timer.timerStop();			// останавливаем таймер
                                that.matchMoveDownUnits();	// спускаем юниты
			}else{ // группы не найдены
                                if(afterDown === false) // первый спуск юнитов
                                {
                                    that.matchBackExchangeUnits(); 	// возвращаем выбранные юниты на места
                                }else{ 
                                    that.matchSelectUnitsClear();	// очистка и разблокиров поля
                                    if(parent.level.levelStatus === parent.level.LEVEL_STATUS_BATTLE) parent.timer.timerStart();				// запускаем таймер
                                }
			}
                    }else{
                        parent.matchClose(); // УДАЛЯЕТСЯ ТРИ В РЯД ЕСЛИ НЕТ УРОВНЯ
                    }
		},
		
		/* Общая проверка колонок и строк (3-и и более в ряд) */
		matchCheckFieldFull: function()
		{
			var resultCheck = false;
			/* i - столбец; j - строка */
			for(var i = 0; i < that.MATCH_COLUMNS; i++)
			{
					if(that.matchCheckColumn(i) === true) resultCheck = true;
			}
			for(var j = 0; j < that.MATCH_ROWS; j++)
			{
					if(that.matchCheckRow(j) === true) resultCheck = true;	
			}
			return resultCheck;
		},
		
		/* Проверка колонки (3-и и более в ряд) */
		matchCheckColumn: function(column)
		{
			var resultCheckColumn = false;
			/* просматриваем  в столбце (по строкам) */
			for(var j = 0; j < that.MATCH_ROWS; j++)
			{
				if(j < that.MATCH_ROWS - 2)
				{
					if(that.matchMatrixUnit["i"+column+":j"+j].unitType !== that.MATCH_HIT_0)
					{
						/* Группа из 3-х объектов */
						if(that.matchMatrixUnit["i"+column+":j"+j].unitType === that.matchMatrixUnit["i"+column+":j"+(j+1)].unitType && that.matchMatrixUnit["i"+column+":j"+j].unitType === that.matchMatrixUnit["i"+column+":j"+(j+2)].unitType)
						{
							resultCheckColumn = true;

							/* Группа из 4-х кристалов */
							if(j < that.MATCH_ROWS - 3)
							{
								if(that.matchMatrixUnit["i"+column+":j"+j].unitType === that.matchMatrixUnit["i"+column+":j"+(j+3)].unitType)
								{
									/* Группа из 5-ти кристалов */
									if(j < that.MATCH_ROWS - 4)
									{
										if(that.matchMatrixUnit["i"+column+":j"+j].unitType === that.matchMatrixUnit["i"+column+":j"+(j+4)].unitType)
										{
											/* Удаляем группу из 5 юнитов */
											that.matchRemoveUnit(column, j, "col", that.matchMatrixUnit["i"+column+":j"+j].unitType, 5);
                                                                                        j += 2;
										}else{
											/* Удаляем группу из 4 юнитов */
											that.matchRemoveUnit(column, j, "col", that.matchMatrixUnit["i"+column+":j"+j].unitType, 4);
                                                                                        j += 1;
										}
									}else{
										/* Удаляем группу из 4 юнитов */
										that.matchRemoveUnit(column, j, "col", that.matchMatrixUnit["i"+column+":j"+j].unitType, 4);
                                                                                j += 1;
									}
								}else{
									/* Удаляем группу из 3 юнитов */
									that.matchRemoveUnit(column, j, "col", that.matchMatrixUnit["i"+column+":j"+j].unitType, 3);
								}
							}else{
								/* Удаляем группу из 3 юнитов */
								that.matchRemoveUnit(column, j, "col", that.matchMatrixUnit["i"+column+":j"+j].unitType, 3);
							}
						}
					}
				}else{
					break;
				}
			}
			return resultCheckColumn;
		},
		
		/* Проверка строки (3-и и более в ряд) */
		matchCheckRow: function(row)
		{
			var resultCheckRow = false;
			/* просматриваем в строке (по столбцам) */
			for(var i = 0; i < that.MATCH_COLUMNS; i++)
			{
				if(i < that.MATCH_COLUMNS - 2)
				{
					if(that.matchMatrixUnit["i"+i+":j"+row].unitType !== that.MATCH_HIT_0)
					{
						/* Группа из 3-х объектов */
						if(that.matchMatrixUnit["i"+i+":j"+row].unitType === that.matchMatrixUnit["i"+(i+1)+":j"+row].unitType && that.matchMatrixUnit["i"+i+":j"+row].unitType === that.matchMatrixUnit["i"+(i+2)+":j"+row].unitType)
						{
							resultCheckRow = true;

							/* Группа из 4-х кристалов */
							if(i < that.MATCH_COLUMNS - 3)
							{
								if(that.matchMatrixUnit["i"+i+":j"+row].unitType === that.matchMatrixUnit["i"+(i+3)+":j"+row].unitType)
								{
									/* Группа из 5-ти кристалов */
									if(i < that.MATCH_COLUMNS - 4)
									{
										if(that.matchMatrixUnit["i"+i+":j"+row].unitType === that.matchMatrixUnit["i"+(i+4)+":j"+row].unitType)
										{
											/* Удаляем группу из 5 юнитов */
											that.matchRemoveUnit(i, row, "row", that.matchMatrixUnit["i"+i+":j"+row].unitType, 5);
                                                                                        i += 2;
										}else{
											/* Удаляем группу из 4 юнитов */
											that.matchRemoveUnit(i, row, "row", that.matchMatrixUnit["i"+i+":j"+row].unitType, 4);
                                                                                        i += 1;
										}
									}else{
										/* Удаляем группу из 4 юнитов */
										that.matchRemoveUnit(i, row, "row", that.matchMatrixUnit["i"+i+":j"+row].unitType, 4);
                                                                                i += 1;
									}
								}else{
									/* Удаляем группу из 3 юнитов */
									that.matchRemoveUnit(i, row, "row", that.matchMatrixUnit["i"+i+":j"+row].unitType, 3);
								}
							}else{
								/* Удаляем группу из 3 юнитов */
								that.matchRemoveUnit(i, row, "row", that.matchMatrixUnit["i"+i+":j"+row].unitType, 3);
							}
						}
					}
				}else{
					break;
				}
			}
			return resultCheckRow;
		},
		
		/* Удаление юнитов */
		matchRemoveUnit: function(col, row, check, hitType, hitCount)
		{
                    /*
                        if(parent.level === null)
                        {
                            console.log("!!!!!!!!!");
                            //parent.timer.timerStop();
                            parent.timerClose();
                            parent.matchClose();
                            return;
                        }
                    */    
			if(parent.level.levelStatus === parent.level.LEVEL_STATUS_BATTLE)
			{
				/* ПРОГРЕСС: Обрабтка LifeBar */
                                //console.log("Количество: " + hitCount + "(Тип удара: " + hitType + ")");
				parent.level.levelReduceLifeBar(hitType, hitCount, that.modeAI);
                                /* АНИМАЦИЯ: Анимация бойцов */
				//levelUpdateAnimation(that.modeAI, hitType); !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
			}
			
			/*Отмечаем юниты для удаления */
			if(check === "row")
			{
				if(hitCount === 3)
				{
					that.matchMatrixUnit["i"+col+":j"+row].alpha = 0.0;
					that.matchAnimationRemoveUnit(that.matchMatrixUnit["i"+col+":j"+row].position.x, that.matchMatrixUnit["i"+col+":j"+row].position.y); // анимация вспышка.
					that.matchMatrixUnit["i"+col+":j"+row].flagRemove = true;
					that.matchMatrixUnit["i"+col+":j"+row].position.x = that.matchMatrixBackPosition["i"+col+":j"+row][0];
					that.matchMatrixUnit["i"+col+":j"+row].position.y = that.matchMatrixBackPosition["i"+col+":j"+row][1];
					that.matchMoveDownProcesses["i"+col+":j"+row] = true;
					that.matchMatrixUnit["i"+(col+1)+":j"+row].alpha = 0.0;
					that.matchAnimationRemoveUnit(that.matchMatrixUnit["i"+(col+1)+":j"+row].position.x, that.matchMatrixUnit["i"+(col+1)+":j"+row].position.y); // анимация вспышка.
					that.matchMatrixUnit["i"+(col+1)+":j"+row].flagRemove = true;
					that.matchMatrixUnit["i"+(col+1)+":j"+row].position.x = that.matchMatrixBackPosition["i"+(col+1)+":j"+row][0];
					that.matchMatrixUnit["i"+(col+1)+":j"+row].position.y = that.matchMatrixBackPosition["i"+(col+1)+":j"+row][1];
					that.matchMoveDownProcesses["i"+(col+1)+":j"+row] = true;
					that.matchMatrixUnit["i"+(col+2)+":j"+row].alpha = 0.0;
					that.matchAnimationRemoveUnit(that.matchMatrixUnit["i"+(col+2)+":j"+row].position.x, that.matchMatrixUnit["i"+(col+2)+":j"+row].position.y); // анимация вспышка.
					that.matchMatrixUnit["i"+(col+2)+":j"+row].flagRemove = true;
					that.matchMatrixUnit["i"+(col+2)+":j"+row].position.x = that.matchMatrixBackPosition["i"+(col+2)+":j"+row][0];
					that.matchMatrixUnit["i"+(col+2)+":j"+row].position.y = that.matchMatrixBackPosition["i"+(col+2)+":j"+row][1];
					that.matchMoveDownProcesses["i"+(col+2)+":j"+row] = true;
					
				}
				if(hitCount === 4)
				{
					that.matchMatrixUnit["i"+col+":j"+row].alpha = 0.0;
					that.matchAnimationRemoveUnit(that.matchMatrixUnit["i"+col+":j"+row].position.x, that.matchMatrixUnit["i"+col+":j"+row].position.y);
					that.matchMatrixUnit["i"+col+":j"+row].flagRemove = true;
					that.matchMatrixUnit["i"+col+":j"+row].position.x = that.matchMatrixBackPosition["i"+col+":j"+row][0];
					that.matchMatrixUnit["i"+col+":j"+row].position.y = that.matchMatrixBackPosition["i"+col+":j"+row][1];
					that.matchMoveDownProcesses["i"+col+":j"+row] = true;
					that.matchMatrixUnit["i"+(col+1)+":j"+row].alpha = 0.0;
					that.matchAnimationRemoveUnit(that.matchMatrixUnit["i"+(col+1)+":j"+row].position.x, that.matchMatrixUnit["i"+(col+1)+":j"+row].position.y);
					that.matchMatrixUnit["i"+(col+1)+":j"+row].flagRemove = true;
					that.matchMatrixUnit["i"+(col+1)+":j"+row].position.x = that.matchMatrixBackPosition["i"+(col+1)+":j"+row][0];
					that.matchMatrixUnit["i"+(col+1)+":j"+row].position.y = that.matchMatrixBackPosition["i"+(col+1)+":j"+row][1];
					that.matchMoveDownProcesses["i"+(col+1)+":j"+row] = true;
					that.matchMatrixUnit["i"+(col+2)+":j"+row].alpha = 0.0;
					that.matchAnimationRemoveUnit(that.matchMatrixUnit["i"+(col+2)+":j"+row].position.x, that.matchMatrixUnit["i"+(col+2)+":j"+row].position.y);
					that.matchMatrixUnit["i"+(col+2)+":j"+row].flagRemove = true;
					that.matchMatrixUnit["i"+(col+2)+":j"+row].position.x = that.matchMatrixBackPosition["i"+(col+2)+":j"+row][0];
					that.matchMatrixUnit["i"+(col+2)+":j"+row].position.y = that.matchMatrixBackPosition["i"+(col+2)+":j"+row][1];
					that.matchMoveDownProcesses["i"+(col+2)+":j"+row] = true;
					that.matchMatrixUnit["i"+(col+3)+":j"+row].alpha = 0.0;
					that.matchAnimationRemoveUnit(that.matchMatrixUnit["i"+(col+3)+":j"+row].position.x, that.matchMatrixUnit["i"+(col+3)+":j"+row].position.y);
					that.matchMatrixUnit["i"+(col+3)+":j"+row].flagRemove = true;
					that.matchMatrixUnit["i"+(col+3)+":j"+row].position.x = that.matchMatrixBackPosition["i"+(col+3)+":j"+row][0];
					that.matchMatrixUnit["i"+(col+3)+":j"+row].position.y = that.matchMatrixBackPosition["i"+(col+3)+":j"+row][1];
					that.matchMoveDownProcesses["i"+(col+3)+":j"+row] = true;
				}
				if(hitCount === 5)
				{
					that.matchMatrixUnit["i"+col+":j"+row].alpha = 0.0;
					that.matchAnimationRemoveUnit(that.matchMatrixUnit["i"+col+":j"+row].position.x, that.matchMatrixUnit["i"+col+":j"+row].position.y);
					that.matchMatrixUnit["i"+col+":j"+row].flagRemove = true;
					that.matchMatrixUnit["i"+col+":j"+row].position.x = that.matchMatrixBackPosition["i"+col+":j"+row][0];
					that.matchMatrixUnit["i"+col+":j"+row].position.y = that.matchMatrixBackPosition["i"+col+":j"+row][1];
					that.matchMoveDownProcesses["i"+col+":j"+row] = true;
					that.matchMatrixUnit["i"+(col+1)+":j"+row].alpha = 0.0;
					that.matchAnimationRemoveUnit(that.matchMatrixUnit["i"+(col+1)+":j"+row].position.x, that.matchMatrixUnit["i"+(col+1)+":j"+row].position.y);
					that.matchMatrixUnit["i"+(col+1)+":j"+row].flagRemove = true;
					that.matchMatrixUnit["i"+(col+1)+":j"+row].position.x = that.matchMatrixBackPosition["i"+(col+1)+":j"+row][0];
					that.matchMatrixUnit["i"+(col+1)+":j"+row].position.y = that.matchMatrixBackPosition["i"+(col+1)+":j"+row][1];
					that.matchMoveDownProcesses["i"+(col+1)+":j"+row] = true;
					that.matchMatrixUnit["i"+(col+2)+":j"+row].alpha = 0.0;
					that.matchAnimationRemoveUnit(that.matchMatrixUnit["i"+(col+2)+":j"+row].position.x, that.matchMatrixUnit["i"+(col+2)+":j"+row].position.y);
					that.matchMatrixUnit["i"+(col+2)+":j"+row].flagRemove = true;
					that.matchMatrixUnit["i"+(col+2)+":j"+row].position.x = that.matchMatrixBackPosition["i"+(col+2)+":j"+row][0];
					that.matchMatrixUnit["i"+(col+2)+":j"+row].position.y = that.matchMatrixBackPosition["i"+(col+2)+":j"+row][1];
					that.matchMoveDownProcesses["i"+(col+2)+":j"+row] = true;
					that.matchMatrixUnit["i"+(col+3)+":j"+row].alpha = 0.0;
					that.matchAnimationRemoveUnit(that.matchMatrixUnit["i"+(col+3)+":j"+row].position.x, that.matchMatrixUnit["i"+(col+3)+":j"+row].position.y);
					that.matchMatrixUnit["i"+(col+3)+":j"+row].flagRemove = true;
					that.matchMatrixUnit["i"+(col+3)+":j"+row].position.x = that.matchMatrixBackPosition["i"+(col+3)+":j"+row][0];
					that.matchMatrixUnit["i"+(col+3)+":j"+row].position.y = that.matchMatrixBackPosition["i"+(col+3)+":j"+row][1];
					that.matchMoveDownProcesses["i"+(col+3)+":j"+row] = true;
					that.matchMatrixUnit["i"+(col+4)+":j"+row].alpha = 0.0;
					that.matchAnimationRemoveUnit(that.matchMatrixUnit["i"+(col+4)+":j"+row].position.x, that.matchMatrixUnit["i"+(col+4)+":j"+row].position.y);
					that.matchMatrixUnit["i"+(col+4)+":j"+row].flagRemove = true;
					that.matchMatrixUnit["i"+(col+4)+":j"+row].position.x = that.matchMatrixBackPosition["i"+(col+4)+":j"+row][0];
					that.matchMatrixUnit["i"+(col+4)+":j"+row].position.y = that.matchMatrixBackPosition["i"+(col+4)+":j"+row][1];
					that.matchMoveDownProcesses["i"+(col+4)+":j"+row] = true;
				}
			}
			if(check === "col")
			{
				if(hitCount === 3)
				{
					
					that.matchMatrixUnit["i"+col+":j"+row].alpha = 0.0;
					that.matchAnimationRemoveUnit(that.matchMatrixUnit["i"+col+":j"+row].position.x, that.matchMatrixUnit["i"+col+":j"+row].position.y);
					that.matchMatrixUnit["i"+col+":j"+row].flagRemove = true;
					that.matchMatrixUnit["i"+col+":j"+row].position.x = that.matchMatrixBackPosition["i"+col+":j"+row][0];
					that.matchMatrixUnit["i"+col+":j"+row].position.y = that.matchMatrixBackPosition["i"+col+":j"+row][1];
					that.matchMoveDownProcesses["i"+col+":j"+row] = true;
					that.matchMatrixUnit["i"+col+":j"+(row+1)].alpha = 0.0;
					that.matchAnimationRemoveUnit(that.matchMatrixUnit["i"+col+":j"+(row+1)].position.x, that.matchMatrixUnit["i"+col+":j"+(row+1)].position.y);
					that.matchMatrixUnit["i"+col+":j"+(row+1)].flagRemove = true;
					that.matchMatrixUnit["i"+col+":j"+(row+1)].position.x = that.matchMatrixBackPosition["i"+col+":j"+(row+1)][0];
					that.matchMatrixUnit["i"+col+":j"+(row+1)].position.y = that.matchMatrixBackPosition["i"+col+":j"+(row+1)][1];
					that.matchMoveDownProcesses["i"+col+":j"+(row+1)] = true;
					that.matchMatrixUnit["i"+col+":j"+(row+2)].alpha = 0.0;	
					that.matchAnimationRemoveUnit(that.matchMatrixUnit["i"+col+":j"+(row+2)].position.x, that.matchMatrixUnit["i"+col+":j"+(row+2)].position.y);
					that.matchMatrixUnit["i"+col+":j"+(row+2)].flagRemove = true;
					that.matchMatrixUnit["i"+col+":j"+(row+2)].position.x = that.matchMatrixBackPosition["i"+col+":j"+(row+2)][0];
					that.matchMatrixUnit["i"+col+":j"+(row+2)].position.y = that.matchMatrixBackPosition["i"+col+":j"+(row+2)][1];
					that.matchMoveDownProcesses["i"+col+":j"+(row+2)] = true;
				}
				if(hitCount === 4)
				{
					that.matchMatrixUnit["i"+col+":j"+row].alpha = 0.0;
					that.matchAnimationRemoveUnit(that.matchMatrixUnit["i"+col+":j"+row].position.x, that.matchMatrixUnit["i"+col+":j"+row].position.y);
					that.matchMatrixUnit["i"+col+":j"+row].flagRemove = true;
					that.matchMatrixUnit["i"+col+":j"+row].position.x = that.matchMatrixBackPosition["i"+col+":j"+row][0];
					that.matchMatrixUnit["i"+col+":j"+row].position.y = that.matchMatrixBackPosition["i"+col+":j"+row][1];
					that.matchMoveDownProcesses["i"+col+":j"+row] = true;
					that.matchMatrixUnit["i"+col+":j"+(row+1)].alpha = 0.0;
					that.matchAnimationRemoveUnit(that.matchMatrixUnit["i"+col+":j"+(row+1)].position.x, that.matchMatrixUnit["i"+col+":j"+(row+1)].position.y);
					that.matchMatrixUnit["i"+col+":j"+(row+1)].flagRemove = true;
					that.matchMatrixUnit["i"+col+":j"+(row+1)].position.x = that.matchMatrixBackPosition["i"+col+":j"+(row+1)][0];
					that.matchMatrixUnit["i"+col+":j"+(row+1)].position.y = that.matchMatrixBackPosition["i"+col+":j"+(row+1)][1];
					that.matchMoveDownProcesses["i"+col+":j"+(row+1)] = true;
					that.matchMatrixUnit["i"+col+":j"+(row+2)].alpha = 0.0;	
					that.matchAnimationRemoveUnit(that.matchMatrixUnit["i"+col+":j"+(row+2)].position.x, that.matchMatrixUnit["i"+col+":j"+(row+2)].position.y);
					that.matchMatrixUnit["i"+col+":j"+(row+2)].flagRemove = true;
					that.matchMatrixUnit["i"+col+":j"+(row+2)].position.x = that.matchMatrixBackPosition["i"+col+":j"+(row+2)][0];
					that.matchMatrixUnit["i"+col+":j"+(row+2)].position.y = that.matchMatrixBackPosition["i"+col+":j"+(row+2)][1];
					that.matchMoveDownProcesses["i"+col+":j"+(row+2)] = true;
					that.matchMatrixUnit["i"+col+":j"+(row+3)].alpha = 0.0;	
					that.matchAnimationRemoveUnit(that.matchMatrixUnit["i"+col+":j"+(row+3)].position.x, that.matchMatrixUnit["i"+col+":j"+(row+3)].position.y);			
					that.matchMatrixUnit["i"+col+":j"+(row+3)].flagRemove = true;
					that.matchMatrixUnit["i"+col+":j"+(row+3)].position.x = that.matchMatrixBackPosition["i"+col+":j"+(row+3)][0];
					that.matchMatrixUnit["i"+col+":j"+(row+3)].position.y = that.matchMatrixBackPosition["i"+col+":j"+(row+3)][1];
					that.matchMoveDownProcesses["i"+col+":j"+(row+3)] = true;
				}
				if(hitCount === 5)
				{
					that.matchMatrixUnit["i"+col+":j"+row].alpha = 0.0;
					that.matchAnimationRemoveUnit(that.matchMatrixUnit["i"+col+":j"+row].position.x, that.matchMatrixUnit["i"+col+":j"+row].position.y);
					that.matchMatrixUnit["i"+col+":j"+row].flagRemove = true;
					that.matchMatrixUnit["i"+col+":j"+row].position.x = that.matchMatrixBackPosition["i"+col+":j"+row][0];
					that.matchMatrixUnit["i"+col+":j"+row].position.y = that.matchMatrixBackPosition["i"+col+":j"+row][1];
					that.matchMoveDownProcesses["i"+col+":j"+row] = true;
					that.matchMatrixUnit["i"+col+":j"+(row+1)].alpha = 0.0;
					that.matchAnimationRemoveUnit(that.matchMatrixUnit["i"+col+":j"+(row+1)].position.x, that.matchMatrixUnit["i"+col+":j"+(row+1)].position.y);
					that.matchMatrixUnit["i"+col+":j"+(row+1)].flagRemove = true;
					that.matchMatrixUnit["i"+col+":j"+(row+1)].position.x = that.matchMatrixBackPosition["i"+col+":j"+(row+1)][0];
					that.matchMatrixUnit["i"+col+":j"+(row+1)].position.y = that.matchMatrixBackPosition["i"+col+":j"+(row+1)][1];
					that.matchMoveDownProcesses["i"+col+":j"+(row+1)] = true;
					that.matchMatrixUnit["i"+col+":j"+(row+2)].alpha = 0.0;	
					that.matchAnimationRemoveUnit(that.matchMatrixUnit["i"+col+":j"+(row+2)].position.x, that.matchMatrixUnit["i"+col+":j"+(row+2)].position.y);
					that.matchMatrixUnit["i"+col+":j"+(row+2)].flagRemove = true;
					that.matchMatrixUnit["i"+col+":j"+(row+2)].position.x = that.matchMatrixBackPosition["i"+col+":j"+(row+2)][0];
					that.matchMatrixUnit["i"+col+":j"+(row+2)].position.y = that.matchMatrixBackPosition["i"+col+":j"+(row+2)][1];
					that.matchMoveDownProcesses["i"+col+":j"+(row+2)] = true;
					that.matchMatrixUnit["i"+col+":j"+(row+3)].alpha = 0.0;
					that.matchAnimationRemoveUnit(that.matchMatrixUnit["i"+col+":j"+(row+3)].position.x, that.matchMatrixUnit["i"+col+":j"+(row+3)].position.y);			
					that.matchMatrixUnit["i"+col+":j"+(row+3)].flagRemove = true;
					that.matchMatrixUnit["i"+col+":j"+(row+3)].position.x = that.matchMatrixBackPosition["i"+col+":j"+(row+3)][0];
					that.matchMatrixUnit["i"+col+":j"+(row+3)].position.y = that.matchMatrixBackPosition["i"+col+":j"+(row+3)][1];
					that.matchMoveDownProcesses["i"+col+":j"+(row+3)] = true;
					that.matchMatrixUnit["i"+col+":j"+(row+4)].alpha = 0.0;
					that.matchAnimationRemoveUnit(that.matchMatrixUnit["i"+col+":j"+(row+4)].position.x, that.matchMatrixUnit["i"+col+":j"+(row+4)].position.y);
					that.matchMatrixUnit["i"+col+":j"+(row+4)].flagRemove = true;
					that.matchMatrixUnit["i"+col+":j"+(row+4)].position.x = that.matchMatrixBackPosition["i"+col+":j"+(row+4)][0];
					that.matchMatrixUnit["i"+col+":j"+(row+4)].position.y = that.matchMatrixBackPosition["i"+col+":j"+(row+4)][1];
					that.matchMoveDownProcesses["i"+col+":j"+(row+4)] = true;
				}
			}
		},
		
		/* Спуск юнитов вниз на свободные позиции */
		matchMoveDownUnits: function()
		{
			for(var i = 0; i < that.MATCH_COLUMNS; i++)
			{
				for(var j = that.MATCH_ROWS-1; j >= 0; j--)
				{
					if(that.matchMatrixUnit["i"+i+":j"+j].flagRemove === true && that.matchMatrixUnit["i"+i+":j"+j].unitType !== that.MATCH_HIT_0)
					{
						/* Спускаем вниз оставщиеся юниты */
						for(var k = j; k >= 0; k--)
						{
							if(that.matchMatrixUnit["i"+i+":j"+k].flagRemove === false && that.matchMatrixUnit["i"+i+":j"+k].unitType !== that.MATCH_HIT_0)
							{
								var removeUnit = that.matchMatrixUnit["i"+i+":j"+j]; // удалённый юнит

								that.matchMatrixUnit["i"+i+":j"+j] = that.matchMatrixUnit["i"+i+":j"+k]; // перемещаем не удалённый юнит
								that.matchMatrixUnit["i"+i+":j"+j].name = "i"+i+":j"+j;
								that.matchMatrixUnit["i"+i+":j"+j].flagRemove = false;
								that.matchMatrixUnit["i"+i+":j"+j].posColumnI = i;
								that.matchMatrixUnit["i"+i+":j"+j].posRowJ = j;
								that.matchMoveDownProcesses["i"+i+":j"+j] = true;

								that.matchMatrixUnit["i"+i+":j"+k] = removeUnit;	// удалённый юнит ставим на место перемещённой
								that.matchMatrixUnit["i"+i+":j"+k].name = "i"+i+":j"+k;
								that.matchMatrixUnit["i"+i+":j"+k].flagRemove = true;
								that.matchMatrixUnit["i"+i+":j"+k].posColumnI = i;
								that.matchMatrixUnit["i"+i+":j"+k].posRowJ = k;
								that.matchMoveDownProcesses["i"+i+":j"+k] = true;
								
								break;
							}
						}
					}
				}
			}
			that.matchMoveDownNewUnits();
		},
		
		onCompleteMatchMoveDownUnits: function()
		{
			that.matchMoveDownNewUnits();
		},
		
		matchMoveDownNewUnits: function()
		{
			for(var i = 0; i < that.MATCH_COLUMNS; i++)
			{
					for(var j = that.MATCH_ROWS-1; j >= 0; j--)
					{
							if(that.matchMoveDownProcesses["i"+i+":j"+j] === true && that.matchMatrixUnit["i"+i+":j"+j].flagRemove === false && that.matchMatrixUnit["i"+i+":j"+j].unitType !== that.MATCH_HIT_0)
							{
									that.matchMatrixUnit["i"+i+":j"+j].flagRemove = false;
									/* Спускаем удалённые юниты */
									createjs.Tween.get(that.matchMatrixUnit["i"+i+":j"+j], {loop: false})
											.to({alpha: 1.0}, 500)
											.to({x: that.matchMatrixFrontPosition["i"+i+":j"+j][0], y: that.matchMatrixFrontPosition["i"+i+":j"+j][1]}, 500, createjs.Ease.getPowInOut(4))
											.to({x: that.matchMatrixFrontPosition["i"+i+":j"+j][0], y: that.matchMatrixFrontPosition["i"+i+":j"+j][1] - 5}, 100, createjs.Ease.getPowInOut(4))
											.to({x: that.matchMatrixFrontPosition["i"+i+":j"+j][0], y: that.matchMatrixFrontPosition["i"+i+":j"+j][1]}, 50, createjs.Ease.getPowInOut(4))
											.call(that.onCompleteMatchMoveDownNewUnits, this); // событие выполнено
									createjs.Ticker.setFPS(60);	
							}else{
									if(that.matchMoveDownProcesses["i"+i+":j"+j] === true && that.matchMatrixUnit["i"+i+":j"+j].flagRemove === true && that.matchMatrixUnit["i"+i+":j"+j].unitType !== that.MATCH_HIT_0)
									{
											var indexRandom = Math.random() / 0.1;
											var index = Math.round(indexRandom);
											if (index >= 0 && index <= 2) 
											{
													that.matchMatrixUnit["i"+i+":j"+j].texture = parent.assets.getAsset("hit1Texture");
													that.matchMatrixUnit["i"+i+":j"+j].unitType = that.MATCH_HIT_1;
													that.matchMatrixUnit["i"+i+":j"+j].flagRemove = false;
											}
											if (index > 2 && index <= 4)
											{
													that.matchMatrixUnit["i"+i+":j"+j].texture = parent.assets.getAsset("hit2Texture");
													that.matchMatrixUnit["i"+i+":j"+j].unitType = that.MATCH_HIT_2;
													that.matchMatrixUnit["i"+i+":j"+j].flagRemove = false;
											}
											if (index > 4 && index <= 6)
											{
													that.matchMatrixUnit["i"+i+":j"+j].texture = parent.assets.getAsset("hit3Texture");
													that.matchMatrixUnit["i"+i+":j"+j].unitType = that.MATCH_HIT_3;
													that.matchMatrixUnit["i"+i+":j"+j].flagRemove = false;
											}
											if (index > 6 && index <= 8)
											{
													that.matchMatrixUnit["i"+i+":j"+j].texture = parent.assets.getAsset("hit4Texture");
													that.matchMatrixUnit["i"+i+":j"+j].unitType = that.MATCH_HIT_4;
													that.matchMatrixUnit["i"+i+":j"+j].flagRemove = false;
											}
											if (index > 8 && index <= 10)
											{
													that.matchMatrixUnit["i"+i+":j"+j].texture = parent.assets.getAsset("hit5Texture");
													that.matchMatrixUnit["i"+i+":j"+j].unitType = that.MATCH_HIT_5;
													that.matchMatrixUnit["i"+i+":j"+j].flagRemove = false;
											}

											/* Спускаем удалённые юниты */
											createjs.Tween.get(that.matchMatrixUnit["i"+i+":j"+j], {loop: false})
													.to({alpha: 1.0}, 500)
													.to({x: that.matchMatrixFrontPosition["i"+i+":j"+j][0], y: that.matchMatrixFrontPosition["i"+i+":j"+j][1]}, 500, createjs.Ease.getPowInOut(4))
													.to({x: that.matchMatrixFrontPosition["i"+i+":j"+j][0], y: that.matchMatrixFrontPosition["i"+i+":j"+j][1] - 5}, 100, createjs.Ease.getPowInOut(4))
													.to({x: that.matchMatrixFrontPosition["i"+i+":j"+j][0], y: that.matchMatrixFrontPosition["i"+i+":j"+j][1]}, 50, createjs.Ease.getPowInOut(4))
													.call(that.onCompleteMatchMoveDownNewUnits, this); // событие выполнено
											createjs.Ticker.setFPS(60);
									}
							}
					}
			}
		},
		
		onCompleteMatchMoveDownNewUnits: function()
		{
			var result = false;
			that.matchMoveDownProcesses[this.name] = false;
			for(var key in that.matchMoveDownProcesses)
			{
					if(that.matchMoveDownProcesses[key] === true){
							result = true;
							break;	
					} 
			}
			if(result == false) // анимация завершена
			{
					if(that.matchCheckCombinations() === true) // Возможные ходы определены
					{
							that.matchCheckField(true);	// проверка групп 3-и в ряд
					}else{	// нет возможности ходов
							that.matchUpdateField(); // обновление игрового поля
					}
			}
		},
		
		/* Определение возможности хода и перестановка в случае отсутствия такой возможности ========== */
		matchCheckCombinations: function()
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
			for(var i = 0; i < that.MATCH_COLUMNS; i++)
			{
				for(var j = 0; j < that.MATCH_ROWS; j++)
				{
					if(that.matchMatrixUnit["i"+i+":j"+j].unitType != that.MATCH_HIT_0)
					{
						// ПРОВЕРКА СТРОКИ
						if(j == 0)
						{
							//[1][1][X][1]
							if((i + 3) < that.MATCH_COLUMNS){
								if(that.matchMatrixUnit["i"+(i+2)+":j"+j].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+i+":j"+j].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+(i+1)+":j"+j].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+(i+3)+":j"+j].unitType != that.MATCH_HIT_0){
									if(that.matchMatrixUnit["i"+i+":j"+j].unitType == that.matchMatrixUnit["i"+(i+1)+":j"+j].unitType && that.matchMatrixUnit["i"+i+":j"+j].unitType == that.matchMatrixUnit["i"+(i+3)+":j"+j].unitType) { return true; }
								}
							}
							//[1][X][1][1]
							if((i + 3) < that.MATCH_COLUMNS){
								if(that.matchMatrixUnit["i"+(i+1)+":j"+j].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+i+":j"+j].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+(i+2)+":j"+j].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+(i+3)+":j"+j].unitType != that.MATCH_HIT_0){
									if(that.matchMatrixUnit["i"+i+":j"+j].unitType == that.matchMatrixUnit["i"+(i+2)+":j"+j].unitType && that.matchMatrixUnit["i"+i+":j"+j].unitType == that.matchMatrixUnit["i"+(i+3)+":j"+j].unitType) { return true; }
								}
							}
							//[0][1][X][1]
							//[0][0][1][0]
							if((i + 2) < that.MATCH_COLUMNS && (j + 1) < that.MATCH_ROWS){
								if(that.matchMatrixUnit["i"+(i+1)+":j"+j].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+i+":j"+j].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+(i+1)+":j"+(j+1)].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+(i+2)+":j"+j].unitType != that.MATCH_HIT_0){
									if(that.matchMatrixUnit["i"+i+":j"+j].unitType == that.matchMatrixUnit["i"+(i+1)+":j"+(j+1)].unitType && that.matchMatrixUnit["i"+i+":j"+j].unitType == that.matchMatrixUnit["i"+(i+2)+":j"+j].unitType) { return true; }
								}
							}
							//[0][1][1][X]
							//[0][0][0][1]
							if((i + 2) < that.MATCH_COLUMNS && (j + 1) < that.MATCH_ROWS){
								if(that.matchMatrixUnit["i"+(i+2)+":j"+j].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+i+":j"+j].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+(i+1)+":j"+j].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+(i+2)+":j"+j].unitType != that.MATCH_HIT_0){
									if(that.matchMatrixUnit["i"+i+":j"+j].unitType == that.matchMatrixUnit["i"+(i+1)+":j"+j].unitType && that.matchMatrixUnit["i"+i+":j"+j].unitType == that.matchMatrixUnit["i"+(i+2)+":j"+(j+1)].unitType) { return true; }
								}
							}
							//[0][X][1][1]
							//[0][1][0][0]
							if((i + 2) < that.MATCH_COLUMNS && (j + 1) < that.MATCH_ROWS){
								if(that.matchMatrixUnit["i"+i+":j"+j].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+i+":j"+(j+1)].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+(i+1)+":j"+j].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+(i+2)+":j"+j].unitType != that.MATCH_HIT_0){
									if(that.matchMatrixUnit["i"+i+":j"+(j+1)].unitType == that.matchMatrixUnit["i"+(i+1)+":j"+j].unitType && that.matchMatrixUnit["i"+i+":j"+(j+1)].unitType == that.matchMatrixUnit["i"+(i+2)+":j"+j].unitType) { return true; }
								}
							}
						}else{
							//[1][1][X][1]
							if((i + 3) < that.MATCH_COLUMNS){
								if(that.matchMatrixUnit["i"+(i+2)+":j"+j].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+i+":j"+j].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+(i+1)+":j"+j].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+(i+3)+":j"+j].unitType != that.MATCH_HIT_0){
									if(that.matchMatrixUnit["i"+i+":j"+j].unitType == that.matchMatrixUnit["i"+(i+1)+":j"+j].unitType && that.matchMatrixUnit["i"+i+":j"+j].unitType == that.matchMatrixUnit["i"+(i+3)+":j"+j].unitType) { return true; }
								}
							}
							//[1][X][1][1]
							if((i + 3) < that.MATCH_COLUMNS){
								if(that.matchMatrixUnit["i"+(i+1)+":j"+j].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+i+":j"+j].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+(i+2)+":j"+j].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+(i+3)+":j"+j].unitType != that.MATCH_HIT_0){
									if(that.matchMatrixUnit["i"+i+":j"+j].unitType == that.matchMatrixUnit["i"+(i+2)+":j"+j].unitType && that.matchMatrixUnit["i"+i+":j"+j].unitType == that.matchMatrixUnit["i"+(i+3)+":j"+j].unitType) { return true; }
								}
							}
							//[0][1][1][X]
							//[0][0][0][1]
							if((i + 2) < that.MATCH_COLUMNS && (j + 1) < that.MATCH_ROWS){
								if(that.matchMatrixUnit["i"+(i+2)+":j"+j].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+i+":j"+j].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+(i+1)+":j"+j].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+(i+2)+":j"+(j+1)].unitType != that.MATCH_HIT_0){
									if(that.matchMatrixUnit["i"+i+":j"+j].unitType == that.matchMatrixUnit["i"+(i+1)+":j"+j].unitType && that.matchMatrixUnit["i"+i+":j"+j].unitType == that.matchMatrixUnit["i"+(i+2)+":j"+(j+1)].unitType) { return true; }
								}
							}
							//[0][0][0][1]
							//[0][1][1][X]
							if((i + 2) < that.MATCH_COLUMNS && (j - 1) >=0){
								if(that.matchMatrixUnit["i"+(i+2)+":j"+j].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+i+":j"+j].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+(i+1)+":j"+j].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+(i+2)+":j"+(j-1)].unitType != that.MATCH_HIT_0){
									if(that.matchMatrixUnit["i"+i+":j"+j].unitType == that.matchMatrixUnit["i"+(i+1)+":j"+j].unitType && that.matchMatrixUnit["i"+i+":j"+j].unitType == that.matchMatrixUnit["i"+(i+2)+":j"+(j-1)].unitType) { return true; }
								}
							}
							//[0][X][1][1]
							//[0][1][0][0]
							if((i + 2) < that.MATCH_COLUMNS && (j + 1) < that.MATCH_ROWS){
								if(that.matchMatrixUnit["i"+i+":j"+j].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+i+":j"+(j+1)].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+(i+1)+":j"+j].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+(i+2)+":j"+j].unitType != that.MATCH_HIT_0){
									if(that.matchMatrixUnit["i"+i+":j"+(j+1)].unitType == that.matchMatrixUnit["i"+(i+1)+":j"+j].unitType && that.matchMatrixUnit["i"+i+":j"+(j+1)].unitType == that.matchMatrixUnit["i"+(i+2)+":j"+j].unitType) { return true; }
								}
							}
							//[0][1][0][0]
							//[0][X][1][1]
							if((i + 2) < that.MATCH_COLUMNS && (j + 1) < that.MATCH_ROWS){
								if(that.matchMatrixUnit["i"+i+":j"+(j+1)].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+i+":j"+j].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+(i+1)+":j"+(j+1)].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+(i+2)+":j"+(j+1)].unitType != that.MATCH_HIT_0){
									if(that.matchMatrixUnit["i"+i+":j"+j].unitType == that.matchMatrixUnit["i"+(i+1)+":j"+(j+1)].unitType && that.matchMatrixUnit["i"+i+":j"+j].unitType == that.matchMatrixUnit["i"+(i+2)+":j"+(j+1)].unitType) { return true; }
								}
							}
							//[0][0][1][0]
							//[0][1][X][1]
							if((i + 2) < that.MATCH_COLUMNS && (j - 1) >= 0){
								if(that.matchMatrixUnit["i"+(i+1)+":j"+j].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+i+":j"+j].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+(i+1)+":j"+(j-1)].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+(i+2)+":j"+j].unitType != that.MATCH_HIT_0){
									if(that.matchMatrixUnit["i"+i+":j"+j].unitType == that.matchMatrixUnit["i"+(i+1)+":j"+(j-1)].unitType && that.matchMatrixUnit["i"+i+":j"+j].unitType == that.matchMatrixUnit["i"+(i+2)+":j"+j].unitType) { return true; }
								}
							}
							//[0][1][X][1]
							//[0][0][1][0]
							if((i + 2) < that.MATCH_COLUMNS && (j + 1) < that.MATCH_ROWS){
								if(that.matchMatrixUnit["i"+(i+1)+":j"+j].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+i+":j"+j].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+(i+1)+":j"+(j+1)].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+(i+2)+":j"+j].unitType != that.MATCH_HIT_0){
									if(that.matchMatrixUnit["i"+i+":j"+j].unitType == that.matchMatrixUnit["i"+(i+1)+":j"+(j+1)].unitType && that.matchMatrixUnit["i"+i+":j"+j].unitType == that.matchMatrixUnit["i"+(i+2)+":j"+j].unitType) { return true; }
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
							if((j + 3) < that.MATCH_ROWS){
								if(that.matchMatrixUnit["i"+i+":j"+(j+2)].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+i+":j"+j].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+i+":j"+(j+1)].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+i+":j"+(j+3)].unitType != that.MATCH_HIT_0){
									if(that.matchMatrixUnit["i"+i+":j"+j].unitType == that.matchMatrixUnit["i"+i+":j"+(j+1)].unitType && that.matchMatrixUnit["i"+i+":j"+j].unitType == that.matchMatrixUnit["i"+i+":j"+(j+3)].unitType) { return true; }
								}
							}
							//[1]
							//[X]
							//[1]
							//[1]
							if((j + 3) < that.MATCH_ROWS){
								if(that.matchMatrixUnit["i"+i+":j"+(j+1)].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+i+":j"+(j+2)].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+i+":j"+j].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+i+":j"+(j+3)].unitType != that.MATCH_HIT_0){
									if(that.matchMatrixUnit["i"+i+":j"+j].unitType == that.matchMatrixUnit["i"+i+":j"+(j+2)].unitType && that.matchMatrixUnit["i"+i+":j"+j].unitType == that.matchMatrixUnit["i"+i+":j"+(j+3)].unitType) { return true; }
								}
							}
							//[1][0]
							//[X][1]
							//[1][0]
							//[0][0]
							if((j + 2) < that.MATCH_ROWS && (i + 1) < that.MATCH_COLUMNS){
								if(that.matchMatrixUnit["i"+i+":j"+(j+1)].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+i+":j"+j].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+(i+1)+":j"+(j+1)].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+i+":j"+(j+2)].unitType != that.MATCH_HIT_0){
									if(that.matchMatrixUnit["i"+i+":j"+j].unitType == that.matchMatrixUnit["i"+(i+1)+":j"+(j+1)].unitType && that.matchMatrixUnit["i"+i+":j"+j].unitType == that.matchMatrixUnit["i"+i+":j"+(j+2)].unitType) { return true; }
								}
							}
							//[1][0]
							//[1][0]
							//[X][1]
							//[0][0]
							if((j + 2) < that.MATCH_ROWS && (i + 1) < that.MATCH_COLUMNS){
								if(that.matchMatrixUnit["i"+i+":j"+(j+2)].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+i+":j"+(j+1)].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+i+":j"+j].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+(i+1)+":j"+(j+2)].unitType != that.MATCH_HIT_0){
									if(that.matchMatrixUnit["i"+i+":j"+j].unitType == that.matchMatrixUnit["i"+i+":j"+(j+1)].unitType && that.matchMatrixUnit["i"+i+":j"+j].unitType == that.matchMatrixUnit["i"+(i+1)+":j"+(j+2)].unitType) { return true; }
								}
							}
							//[X][1]
							//[1][0]
							//[1][0]
							//[0][0]
							if((j + 2) < that.MATCH_ROWS && (i + 1) < that.MATCH_COLUMNS){
								if(that.matchMatrixUnit["i"+i+":j"+j].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+(i+1)+":j"+j].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+i+":j"+(j+1)].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+i+":j"+(j+2)].unitType != that.MATCH_HIT_0){
									if(that.matchMatrixUnit["i"+(i+1)+":j"+j].unitType == that.matchMatrixUnit["i"+i+":j"+(j+1)].unitType && that.matchMatrixUnit["i"+(i+1)+":j"+j].unitType == that.matchMatrixUnit["i"+i+":j"+(j+2)].unitType) { return true; }
								}
							}
						}else{
							//[1]
							//[1]
							//[X]
							//[1]
							if((j + 3) < that.MATCH_ROWS){
								if(that.matchMatrixUnit["i"+i+":j"+(j+2)].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+i+":j"+j].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+i+":j"+(j+1)].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+i+":j"+(j+3)].unitType != that.MATCH_HIT_0){
									if(that.matchMatrixUnit["i"+i+":j"+j].unitType == that.matchMatrixUnit["i"+i+":j"+(j+1)].unitType && that.matchMatrixUnit["i"+i+":j"+j].unitType == that.matchMatrixUnit["i"+i+":j"+(j+3)].unitType) { return true; }
								}
							}
							//[1]
							//[X]
							//[1]
							//[1]
							if((j + 3) < that.MATCH_ROWS){
								if(that.matchMatrixUnit["i"+i+":j"+(j+1)].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+i+":j"+(j+2)].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+i+":j"+j].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+i+":j"+(j+3)].unitType != that.MATCH_HIT_0){
									if(that.matchMatrixUnit["i"+i+":j"+j].unitType == that.matchMatrixUnit["i"+i+":j"+(j+2)].unitType && that.matchMatrixUnit["i"+i+":j"+j].unitType == that.matchMatrixUnit["i"+i+":j"+(j+3)].unitType) { return true; }
								}
							}
							//[1][0]
							//[X][1]
							//[1][0]
							//[0][0]
							if((j + 2) < that.MATCH_ROWS && (i + 1) < that.MATCH_COLUMNS){
								if(that.matchMatrixUnit["i"+i+":j"+(j+1)].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+(i+1)+":j"+(j+1)].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+i+":j"+j].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+i+":j"+(j+2)].unitType != that.MATCH_HIT_0){
									if(that.matchMatrixUnit["i"+i+":j"+j].unitType == that.matchMatrixUnit["i"+(i+1)+":j"+(j+1)].unitType && that.matchMatrixUnit["i"+i+":j"+j].unitType == that.matchMatrixUnit["i"+i+":j"+(j+2)].unitType) { return true; }
								}
							}
							//[0][1]
							//[1][X]
							//[0][1]
							//[0][0]
							if((j + 2) < that.MATCH_ROWS && (i - 1) >= 0){
								if(that.matchMatrixUnit["i"+i+":j"+(j+1)].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+i+":j"+j].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+(i-1)+":j"+(j+1)].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+i+":j"+(j+2)].unitType != that.MATCH_HIT_0){
									if(that.matchMatrixUnit["i"+i+":j"+j].unitType == that.matchMatrixUnit["i"+(i-1)+":j"+(j+1)].unitType && that.matchMatrixUnit["i"+i+":j"+j].unitType == that.matchMatrixUnit["i"+i+":j"+(j+2)].unitType) { return true; }
								}
							}
							//[1][0]
							//[1][0]
							//[X][1]
							//[0][0]
							if((j + 2) < that.MATCH_ROWS && (i + 1) < that.MATCH_COLUMNS){
								if(that.matchMatrixUnit["i"+i+":j"+(j+2)].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+i+":j"+j].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+i+":j"+(j+1)].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+(i+1)+":j"+(j+2)].unitType != that.MATCH_HIT_0){
									if(that.matchMatrixUnit["i"+i+":j"+j].unitType == that.matchMatrixUnit["i"+i+":j"+(j+1)].unitType && that.matchMatrixUnit["i"+i+":j"+j].unitType == that.matchMatrixUnit["i"+(i+1)+":j"+(j+2)].unitType) { return true; }
								}
							}
							//[X][1]
							//[1][0]
							//[1][0]
							//[0][0]
							if((j + 2) < that.MATCH_ROWS && (i + 1) < that.MATCH_COLUMNS){
								if(that.matchMatrixUnit["i"+i+":j"+j].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+(i+1)+":j"+j].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+i+":j"+(j+1)].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+i+":j"+(j+2)].unitType != that.MATCH_HIT_0){
									if(that.matchMatrixUnit["i"+(i+1)+":j"+j].unitType == that.matchMatrixUnit["i"+i+":j"+(j+1)].unitType && that.matchMatrixUnit["i"+(i+1)+":j"+j].unitType == that.matchMatrixUnit["i"+i+":j"+(j+2)].unitType) { return true; }
								}
							}
							//[0][1]
							//[0][1]
							//[1][X]
							//[0][0]
							if((j + 2) < that.MATCH_ROWS && (i - 1) >= 0){
								if(that.matchMatrixUnit["i"+i+":j"+(j+2)].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+i+":j"+j].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+i+":j"+(j+1)].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+(i-1)+":j"+(j+2)].unitType != that.MATCH_HIT_0){
									if(that.matchMatrixUnit["i"+i+":j"+j].unitType == that.matchMatrixUnit["i"+i+":j"+(j+1)].unitType && that.matchMatrixUnit["i"+i+":j"+j].unitType == that.matchMatrixUnit["i"+(i-1)+":j"+(j+2)].unitType) { return true; }
								}
							}
							//[1][X]
							//[0][1]
							//[0][1]
							//[0][0]
							if((j + 2) < that.MATCH_ROWS && (i - 1) >= 0){
								if(that.matchMatrixUnit["i"+i+":j"+j].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+(i-1)+":j"+j].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+i+":j"+(j+1)].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+i+":j"+(j+2)].unitType != that.MATCH_HIT_0){
									if(that.matchMatrixUnit["i"+(i-1)+":j"+j].unitType == that.matchMatrixUnit["i"+i+":j"+(j+1)].unitType && that.matchMatrixUnit["i"+(i-1)+":j"+j].unitType == that.matchMatrixUnit["i"+i+":j"+(j+2)].unitType) { return true; }
								}
							}
						}
					}
				}
			}
			return false;
		},
		
		/* Обновление игрового поля если нет комбинаций ===================================================== */
		matchUpdateField: function()
		{
			that.matchMoveDownProcesses = new Object();
				
			var indexRandom = Math.random() / 0.1;
			var indexLevel = Math.round(indexRandom);
				
			var index = 0;
			for(var i = 0; i < that.MATCH_COLUMNS; i++)
			{
				for(var j = 0; j < that.MATCH_ROWS; j++)
				{
					if(that.matchLevelJSON.data.Level.cell[index].cellObject !== that.MATCH_HIT_0)
					{
						//that.matchMatrixUnit["i"+i+":j"+j].alpha = 0.0;
						that.matchMatrixUnit["i"+i+":j"+j].flagRemove = false;
						that.matchMatrixUnit["i"+i+":j"+j].position.x = that.matchMatrixBackPosition["i"+i+":j"+j][0];
						that.matchMatrixUnit["i"+i+":j"+j].position.y = that.matchMatrixBackPosition["i"+i+":j"+j][1];
						that.matchMoveDownProcesses["i"+i+":j"+j] = true;
						
						if(parent.assets.getAsset("fieldLevelsJson")["level_0_" + indexLevel].data.Level.cell[index].cellObject === that.MATCH_HIT_1)
						{
							that.matchMatrixUnit["i"+i+":j"+j].texture = parent.assets.getAsset("hit1Texture");
							that.matchMatrixUnit["i"+i+":j"+j].unitType = that.MATCH_HIT_1;
						}
						if(parent.assets.getAsset("fieldLevelsJson")["level_0_" + indexLevel].data.Level.cell[index].cellObject === that.MATCH_HIT_2)
						{
							that.matchMatrixUnit["i"+i+":j"+j].texture = parent.assets.getAsset("hit2Texture");
							that.matchMatrixUnit["i"+i+":j"+j].unitType = that.MATCH_HIT_2;
						}
						if(parent.assets.getAsset("fieldLevelsJson")["level_0_" + indexLevel].data.Level.cell[index].cellObject === that.MATCH_HIT_3)
						{
							that.matchMatrixUnit["i"+i+":j"+j].texture = parent.assets.getAsset("hit3Texture");
							that.matchMatrixUnit["i"+i+":j"+j].unitType = that.MATCH_HIT_3;
						}
						if(parent.assets.getAsset("fieldLevelsJson")["level_0_" + indexLevel].data.Level.cell[index].cellObject === that.MATCH_HIT_4)
						{
							that.matchMatrixUnit["i"+i+":j"+j].texture = parent.assets.getAsset("hit4Texture");
							that.matchMatrixUnit["i"+i+":j"+j].unitType = that.MATCH_HIT_4;
						}
						if(parent.assets.getAsset("fieldLevelsJson")["level_0_" + indexLevel].data.Level.cell[index].cellObject === that.MATCH_HIT_5)
						{
							that.matchMatrixUnit["i"+i+":j"+j].texture = parent.assets.getAsset("hit5Texture");
							that.matchMatrixUnit["i"+i+":j"+j].unitType = that.MATCH_HIT_5;
						}
						
						/* Спускаем удалённые юниты */
						createjs.Tween.get(that.matchMatrixUnit["i"+i+":j"+j], {loop: false})
							.to({alpha: 1.0}, 500)
							.to({x: that.matchMatrixFrontPosition["i"+i+":j"+j][0], y: that.matchMatrixFrontPosition["i"+i+":j"+j][1]}, 500, createjs.Ease.getPowInOut(4))
							.call(that.onCompleteMatchMoveDownNewUnits, that.matchMatrixUnit["i"+i+":j"+j]); // событие выполнено
						createjs.Ticker.setFPS(60);
					}
					index++;
				}
			}
		},
		
		/* Ход искусственного интеллекта ============================================================== */
		matchGetPriorityUnit: function(unitType)
		{
			if(unitType === that.MATCH_HIT_1) {return 1;}
			if(unitType === that.MATCH_HIT_2) {return 2;}
			if(unitType === that.MATCH_HIT_3)
			{
				var typeRandom = Math.random() / 0.1;
				var uType = Math.round(typeRandom);
				return uType;
			}
			if(unitType === that.MATCH_HIT_4) {return 4;}
			if(unitType === that.MATCH_HIT_5) {return 5;}
			return 0;
		},
		
		matchActionAI: function()
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
			for(var i = 0; i < that.MATCH_COLUMNS; i++)
			{
				for(var j = 0; j < that.MATCH_ROWS; j++)
				{
					if(that.matchMatrixUnit["i"+i+":j"+j].unitType != that.MATCH_HIT_0)
					{
						// ПРОВЕРКА СТРОКИ
						if(j == 0)
						{
							//[1][1][X][1]
							if((i + 3) < that.MATCH_COLUMNS){
								if(that.matchMatrixUnit["i"+(i+2)+":j"+j].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+i+":j"+j].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+(i+1)+":j"+j].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+(i+3)+":j"+j].unitType != that.MATCH_HIT_0){
									if(that.matchMatrixUnit["i"+i+":j"+j].unitType == that.matchMatrixUnit["i"+(i+1)+":j"+j].unitType && that.matchMatrixUnit["i"+i+":j"+j].unitType == that.matchMatrixUnit["i"+(i+3)+":j"+j].unitType) 
									{
										priorityUnit = that.matchGetPriorityUnit(that.matchMatrixUnit["i"+i+":j"+j].unitType);
										if(priorityUnit > lastpriorityUnit)	
										{
											that.matchSelectUnit1 = that.matchMatrixUnit["i"+(i+2)+":j"+j];
											that.matchSelectUnit2 = that.matchMatrixUnit["i"+(i+3)+":j"+j];
											lastpriorityUnit = priorityUnit;
										}
									}
								}
							}
							//[1][X][1][1]
							if((i + 3) < that.MATCH_COLUMNS){
								if(that.matchMatrixUnit["i"+(i+1)+":j"+j].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+i+":j"+j].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+(i+2)+":j"+j].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+(i+3)+":j"+j].unitType != that.MATCH_HIT_0){
									if(that.matchMatrixUnit["i"+i+":j"+j].unitType == that.matchMatrixUnit["i"+(i+2)+":j"+j].unitType && that.matchMatrixUnit["i"+i+":j"+j].unitType == that.matchMatrixUnit["i"+(i+3)+":j"+j].unitType) 
									{ 
										priorityUnit = that.matchGetPriorityUnit(that.matchMatrixUnit["i"+i+":j"+j].unitType);
										if(priorityUnit > lastpriorityUnit)	
										{
											that.matchSelectUnit1 = that.matchMatrixUnit["i"+i+":j"+j];
											that.matchSelectUnit2 = that.matchMatrixUnit["i"+(i+1)+":j"+j];
											lastpriorityUnit = priorityUnit;
										}
									}
								}
							}
							//[0][1][X][1]
							//[0][0][1][0]
							if((i + 2) < that.MATCH_COLUMNS && (j + 1) < that.MATCH_ROWS){
								if(that.matchMatrixUnit["i"+(i+1)+":j"+j].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+i+":j"+j].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+(i+1)+":j"+(j+1)].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+(i+2)+":j"+j].unitType != that.MATCH_HIT_0){
									if(that.matchMatrixUnit["i"+i+":j"+j].unitType == that.matchMatrixUnit["i"+(i+1)+":j"+(j+1)].unitType && that.matchMatrixUnit["i"+i+":j"+j].unitType == that.matchMatrixUnit["i"+(i+2)+":j"+j].unitType) 
									{
										priorityUnit = that.matchGetPriorityUnit(that.matchMatrixUnit["i"+i+":j"+j].unitType);
										if(priorityUnit > lastpriorityUnit)	
										{
											that.matchSelectUnit1 = that.matchMatrixUnit["i"+(i+1)+":j"+j];
											that.matchSelectUnit2 = that.matchMatrixUnit["i"+(i+1)+":j"+(j+1)];
											lastpriorityUnit = priorityUnit;
										}
									}
								}
							}
							//[0][1][1][X]
							//[0][0][0][1]
							if((i + 2) < that.MATCH_COLUMNS && (j + 1) < that.MATCH_ROWS){
								if(that.matchMatrixUnit["i"+(i+2)+":j"+j].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+i+":j"+j].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+(i+1)+":j"+j].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+(i+2)+":j"+j].unitType != that.MATCH_HIT_0){
									if(that.matchMatrixUnit["i"+i+":j"+j].unitType == that.matchMatrixUnit["i"+(i+1)+":j"+j].unitType && that.matchMatrixUnit["i"+i+":j"+j].unitType == that.matchMatrixUnit["i"+(i+2)+":j"+(j+1)].unitType) 
									{
										priorityUnit = that.matchGetPriorityUnit(that.matchMatrixUnit["i"+i+":j"+j].unitType);
										if(priorityUnit > lastpriorityUnit)	
										{
											that.matchSelectUnit1 = that.matchMatrixUnit["i"+(i+2)+":j"+j];
											that.matchSelectUnit2 = that.matchMatrixUnit["i"+(i+2)+":j"+(j+1)];
											lastpriorityUnit = priorityUnit;
										}
									}
								}
							}
							//[0][X][1][1]
							//[0][1][0][0]
							if((i + 2) < that.MATCH_COLUMNS && (j + 1) < that.MATCH_ROWS){
								if(that.matchMatrixUnit["i"+i+":j"+j].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+i+":j"+(j+1)].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+(i+1)+":j"+j].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+(i+2)+":j"+j].unitType != that.MATCH_HIT_0){
									if(that.matchMatrixUnit["i"+i+":j"+(j+1)].unitType == that.matchMatrixUnit["i"+(i+1)+":j"+j].unitType && that.matchMatrixUnit["i"+i+":j"+(j+1)].unitType == that.matchMatrixUnit["i"+(i+2)+":j"+j].unitType) 
									{
										priorityUnit = that.matchGetPriorityUnit(that.matchMatrixUnit["i"+i+":j"+(j+1)].unitType);
										if(priorityUnit > lastpriorityUnit)	
										{
											that.matchSelectUnit1 = that.matchMatrixUnit["i"+i+":j"+j];
											that.matchSelectUnit2 = that.matchMatrixUnit["i"+i+":j"+(j+1)];
											lastpriorityUnit = priorityUnit;
										}
									}
								}
							}
						}else{
							//[1][1][X][1]
							if((i + 3) < that.MATCH_COLUMNS){
								if(that.matchMatrixUnit["i"+(i+2)+":j"+j].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+i+":j"+j].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+(i+1)+":j"+j].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+(i+3)+":j"+j].unitType != that.MATCH_HIT_0){
									if(that.matchMatrixUnit["i"+i+":j"+j].unitType == that.matchMatrixUnit["i"+(i+1)+":j"+j].unitType && that.matchMatrixUnit["i"+i+":j"+j].unitType == that.matchMatrixUnit["i"+(i+3)+":j"+j].unitType) 
									{
										priorityUnit = that.matchGetPriorityUnit(that.matchMatrixUnit["i"+i+":j"+j].unitType);
										if(priorityUnit > lastpriorityUnit)	
										{
											that.matchSelectUnit1 = that.matchMatrixUnit["i"+(i+2)+":j"+j];
											that.matchSelectUnit2 = that.matchMatrixUnit["i"+(i+3)+":j"+j];
											lastpriorityUnit = priorityUnit;
										}
									}
								}
							}
							//[1][X][1][1]
							if((i + 3) < that.MATCH_COLUMNS){
								if(that.matchMatrixUnit["i"+(i+1)+":j"+j].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+i+":j"+j].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+(i+2)+":j"+j].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+(i+3)+":j"+j].unitType != that.MATCH_HIT_0){
									if(that.matchMatrixUnit["i"+i+":j"+j].unitType == that.matchMatrixUnit["i"+(i+2)+":j"+j].unitType && that.matchMatrixUnit["i"+i+":j"+j].unitType == that.matchMatrixUnit["i"+(i+3)+":j"+j].unitType) 
									{
										priorityUnit = that.matchGetPriorityUnit(that.matchMatrixUnit["i"+i+":j"+j].unitType);
										if(priorityUnit > lastpriorityUnit)	
										{
											that.matchSelectUnit1 = that.matchMatrixUnit["i"+i+":j"+j];
											that.matchSelectUnit2 = that.matchMatrixUnit["i"+(i+1)+":j"+j];
											lastpriorityUnit = priorityUnit;
										}
									}
								}
							}
							//[0][1][1][X]
							//[0][0][0][1]
							if((i + 2) < that.MATCH_COLUMNS && (j + 1) < that.MATCH_ROWS){
								if(that.matchMatrixUnit["i"+(i+2)+":j"+j].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+i+":j"+j].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+(i+1)+":j"+j].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+(i+2)+":j"+(j+1)].unitType != that.MATCH_HIT_0){
									if(that.matchMatrixUnit["i"+i+":j"+j].unitType == that.matchMatrixUnit["i"+(i+1)+":j"+j].unitType && that.matchMatrixUnit["i"+i+":j"+j].unitType == that.matchMatrixUnit["i"+(i+2)+":j"+(j+1)].unitType) 
									{
										priorityUnit = that.matchGetPriorityUnit(that.matchMatrixUnit["i"+i+":j"+j].unitType);
										if(priorityUnit > lastpriorityUnit)	
										{
											that.matchSelectUnit1 = that.matchMatrixUnit["i"+(i+2)+":j"+j];
											that.matchSelectUnit2 = that.matchMatrixUnit["i"+(i+2)+":j"+(j+1)];
											lastpriorityUnit = priorityUnit;
										}
									}
								}
							}
							//[0][0][0][1]
							//[0][1][1][X]
							if((i + 2) < that.MATCH_COLUMNS && (j - 1) >=0){
								if(that.matchMatrixUnit["i"+(i+2)+":j"+j].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+i+":j"+j].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+(i+1)+":j"+j].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+(i+2)+":j"+(j-1)].unitType != that.MATCH_HIT_0){
									if(that.matchMatrixUnit["i"+i+":j"+j].unitType == that.matchMatrixUnit["i"+(i+1)+":j"+j].unitType && that.matchMatrixUnit["i"+i+":j"+j].unitType == that.matchMatrixUnit["i"+(i+2)+":j"+(j-1)].unitType) 
									{
										priorityUnit = that.matchGetPriorityUnit(that.matchMatrixUnit["i"+i+":j"+j].unitType);
										if(priorityUnit > lastpriorityUnit)	
										{
											that.matchSelectUnit1 = that.matchMatrixUnit["i"+(i+2)+":j"+(j-1)];
											that.matchSelectUnit2 = that.matchMatrixUnit["i"+(i+2)+":j"+j];
											lastpriorityUnit = priorityUnit;
										}
									}
								}
							}
							//[0][X][1][1]
							//[0][1][0][0]
							if((i + 2) < that.MATCH_COLUMNS && (j + 1) < that.MATCH_ROWS){
								if(that.matchMatrixUnit["i"+i+":j"+j].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+i+":j"+(j+1)].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+(i+1)+":j"+j].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+(i+2)+":j"+j].unitType != that.MATCH_HIT_0){
									if(that.matchMatrixUnit["i"+i+":j"+(j+1)].unitType == that.matchMatrixUnit["i"+(i+1)+":j"+j].unitType && that.matchMatrixUnit["i"+i+":j"+(j+1)].unitType == that.matchMatrixUnit["i"+(i+2)+":j"+j].unitType) 
									{
										priorityUnit = that.matchGetPriorityUnit(that.matchMatrixUnit["i"+i+":j"+(j+1)].unitType);
										if(priorityUnit > lastpriorityUnit)	
										{
											that.matchSelectUnit1 = that.matchMatrixUnit["i"+i+":j"+j];
											that.matchSelectUnit2 = that.matchMatrixUnit["i"+i+":j"+(j+1)];
											lastpriorityUnit = priorityUnit;
										}
									}
								}
							}
							//[0][1][0][0]
							//[0][X][1][1]
							if((i + 2) < that.MATCH_COLUMNS && (j + 1) < that.MATCH_ROWS){
								if(that.matchMatrixUnit["i"+i+":j"+(j+1)].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+i+":j"+j].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+(i+1)+":j"+(j+1)].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+(i+2)+":j"+(j+1)].unitType != that.MATCH_HIT_0){
									if(that.matchMatrixUnit["i"+i+":j"+j].unitType == that.matchMatrixUnit["i"+(i+1)+":j"+(j+1)].unitType && that.matchMatrixUnit["i"+i+":j"+j].unitType == that.matchMatrixUnit["i"+(i+2)+":j"+(j+1)].unitType) 
									{
										priorityUnit = that.matchGetPriorityUnit(that.matchMatrixUnit["i"+i+":j"+j].unitType);
										if(priorityUnit > lastpriorityUnit)	
										{
											that.matchSelectUnit1 = that.matchMatrixUnit["i"+i+":j"+j];
											that.matchSelectUnit2 = that.matchMatrixUnit["i"+i+":j"+(j+1)];
											lastpriorityUnit = priorityUnit;
										}
									}
								}
							}
							//[0][0][1][0]
							//[0][1][X][1]
							if((i + 2) < that.MATCH_COLUMNS && (j - 1) >= 0){
								if(that.matchMatrixUnit["i"+(i+1)+":j"+j].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+i+":j"+j].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+(i+1)+":j"+(j-1)].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+(i+2)+":j"+j].unitType != that.MATCH_HIT_0){
									if(that.matchMatrixUnit["i"+i+":j"+j].unitType == that.matchMatrixUnit["i"+(i+1)+":j"+(j-1)].unitType && that.matchMatrixUnit["i"+i+":j"+j].unitType == that.matchMatrixUnit["i"+(i+2)+":j"+j].unitType) 
									{
										priorityUnit = that.matchGetPriorityUnit(that.matchMatrixUnit["i"+i+":j"+j].unitType);
										if(priorityUnit > lastpriorityUnit)	
										{
											that.matchSelectUnit1 = that.matchMatrixUnit["i"+(i+1)+":j"+(j-1)];
											that.matchSelectUnit2 = that.matchMatrixUnit["i"+(i+1)+":j"+j];
											lastpriorityUnit = priorityUnit;
										}
									}
								}
							}
							//[0][1][X][1]
							//[0][0][1][0]
							if((i + 2) < that.MATCH_COLUMNS && (j + 1) < that.MATCH_ROWS){
								if(that.matchMatrixUnit["i"+(i+1)+":j"+j].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+i+":j"+j].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+(i+1)+":j"+(j+1)].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+(i+2)+":j"+j].unitType != that.MATCH_HIT_0){
									if(that.matchMatrixUnit["i"+i+":j"+j].unitType == that.matchMatrixUnit["i"+(i+1)+":j"+(j+1)].unitType && that.matchMatrixUnit["i"+i+":j"+j].unitType == that.matchMatrixUnit["i"+(i+2)+":j"+j].unitType) 
									{
										priorityUnit = that.matchGetPriorityUnit(that.matchMatrixUnit["i"+i+":j"+j].unitType);
										if(priorityUnit > lastpriorityUnit)	
										{
											that.matchSelectUnit1 = that.matchMatrixUnit["i"+(i+1)+":j"+j];
											that.matchSelectUnit2 = that.matchMatrixUnit["i"+(i+1)+":j"+(j+1)];
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
							if((j + 3) < that.MATCH_ROWS){
								if(that.matchMatrixUnit["i"+i+":j"+(j+2)].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+i+":j"+j].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+i+":j"+(j+1)].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+i+":j"+(j+3)].unitType != that.MATCH_HIT_0){
									if(that.matchMatrixUnit["i"+i+":j"+j].unitType == that.matchMatrixUnit["i"+i+":j"+(j+1)].unitType && that.matchMatrixUnit["i"+i+":j"+j].unitType == that.matchMatrixUnit["i"+i+":j"+(j+3)].unitType) 
									{
										priorityUnit = that.matchGetPriorityUnit(that.matchMatrixUnit["i"+i+":j"+j].unitType);
										if(priorityUnit > lastpriorityUnit)	
										{
											that.matchSelectUnit1 = that.matchMatrixUnit["i"+i+":j"+(j+2)];
											that.matchSelectUnit2 = that.matchMatrixUnit["i"+i+":j"+(j+3)];
											lastpriorityUnit = priorityUnit;
										}
									}
								}
							}
							//[1]
							//[X]
							//[1]
							//[1]
							if((j + 3) < that.MATCH_ROWS){
								if(that.matchMatrixUnit["i"+i+":j"+(j+1)].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+i+":j"+(j+2)].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+i+":j"+j].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+i+":j"+(j+3)].unitType != that.MATCH_HIT_0){
									if(that.matchMatrixUnit["i"+i+":j"+j].unitType == that.matchMatrixUnit["i"+i+":j"+(j+2)].unitType && that.matchMatrixUnit["i"+i+":j"+j].unitType == that.matchMatrixUnit["i"+i+":j"+(j+3)].unitType) 
									{
										priorityUnit = that.matchGetPriorityUnit(that.matchMatrixUnit["i"+i+":j"+j].unitType);
										if(priorityUnit > lastpriorityUnit)	
										{
											that.matchSelectUnit1 = that.matchMatrixUnit["i"+i+":j"+j];
											that.matchSelectUnit2 = that.matchMatrixUnit["i"+i+":j"+(j+1)];
											lastpriorityUnit = priorityUnit;
										}
									}
								}
							}
							//[1][0]
							//[X][1]
							//[1][0]
							//[0][0]
							if((j + 2) < that.MATCH_ROWS && (i + 1) < that.MATCH_COLUMNS){
								if(that.matchMatrixUnit["i"+i+":j"+(j+1)].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+i+":j"+j].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+(i+1)+":j"+(j+1)].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+i+":j"+(j+2)].unitType != that.MATCH_HIT_0){
									if(that.matchMatrixUnit["i"+i+":j"+j].unitType == that.matchMatrixUnit["i"+(i+1)+":j"+(j+1)].unitType && that.matchMatrixUnit["i"+i+":j"+j].unitType == that.matchMatrixUnit["i"+i+":j"+(j+2)].unitType) 
									{
										priorityUnit = that.matchGetPriorityUnit(that.matchMatrixUnit["i"+i+":j"+j].unitType);
										if(priorityUnit > lastpriorityUnit)	
										{
											that.matchSelectUnit1 = that.matchMatrixUnit["i"+i+":j"+(j+1)];
											that.matchSelectUnit2 = that.matchMatrixUnit["i"+(i+1)+":j"+(j+1)];
											lastpriorityUnit = priorityUnit;
										}
									}
								}
							}
							//[1][0]
							//[1][0]
							//[X][1]
							//[0][0]
							if((j + 2) < that.MATCH_ROWS && (i + 1) < that.MATCH_COLUMNS){
								if(that.matchMatrixUnit["i"+i+":j"+(j+2)].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+i+":j"+(j+1)].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+i+":j"+j].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+(i+1)+":j"+(j+2)].unitType != that.MATCH_HIT_0){
									if(that.matchMatrixUnit["i"+i+":j"+j].unitType == that.matchMatrixUnit["i"+i+":j"+(j+1)].unitType && that.matchMatrixUnit["i"+i+":j"+j].unitType == that.matchMatrixUnit["i"+(i+1)+":j"+(j+2)].unitType) 
									{
										priorityUnit = that.matchGetPriorityUnit(that.matchMatrixUnit["i"+i+":j"+j].unitType);
										if(priorityUnit > lastpriorityUnit)	
										{
											that.matchSelectUnit1 = that.matchMatrixUnit["i"+i+":j"+(j+2)];
											that.matchSelectUnit2 = that.matchMatrixUnit["i"+(i+1)+":j"+(j+2)];
											lastpriorityUnit = priorityUnit;
										}
									}
								}
							}
							//[X][1]
							//[1][0]
							//[1][0]
							//[0][0]
							if((j + 2) < that.MATCH_ROWS && (i + 1) < that.MATCH_COLUMNS){
								if(that.matchMatrixUnit["i"+i+":j"+j].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+(i+1)+":j"+j].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+i+":j"+(j+1)].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+i+":j"+(j+2)].unitType != that.MATCH_HIT_0){
									if(that.matchMatrixUnit["i"+(i+1)+":j"+j].unitType == that.matchMatrixUnit["i"+i+":j"+(j+1)].unitType && that.matchMatrixUnit["i"+(i+1)+":j"+j].unitType == that.matchMatrixUnit["i"+i+":j"+(j+2)].unitType) 
									{
										priorityUnit = that.matchGetPriorityUnit(that.matchMatrixUnit["i"+(i+1)+":j"+j].unitType);
										if(priorityUnit > lastpriorityUnit)	
										{
											that.matchSelectUnit1 = that.matchMatrixUnit["i"+i+":j"+j];
											that.matchSelectUnit2 = that.matchMatrixUnit["i"+(i+1)+":j"+j];
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
							if((j + 3) < that.MATCH_ROWS){
								if(that.matchMatrixUnit["i"+i+":j"+(j+2)].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+i+":j"+j].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+i+":j"+(j+1)].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+i+":j"+(j+3)].unitType != that.MATCH_HIT_0){
									if(that.matchMatrixUnit["i"+i+":j"+j].unitType == that.matchMatrixUnit["i"+i+":j"+(j+1)].unitType && that.matchMatrixUnit["i"+i+":j"+j].unitType == that.matchMatrixUnit["i"+i+":j"+(j+3)].unitType) 
									{
										priorityUnit = that.matchGetPriorityUnit(that.matchMatrixUnit["i"+i+":j"+j].unitType);
										if(priorityUnit > lastpriorityUnit)	
										{
											that.matchSelectUnit1 = that.matchMatrixUnit["i"+i+":j"+(j+2)];
											that.matchSelectUnit2 = that.matchMatrixUnit["i"+i+":j"+(j+3)];
											lastpriorityUnit = priorityUnit;
										}
									}
								}
							}
							//[1]
							//[X]
							//[1]
							//[1]
							if((j + 3) < that.MATCH_ROWS){
								if(that.matchMatrixUnit["i"+i+":j"+(j+1)].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+i+":j"+(j+2)].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+i+":j"+j].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+i+":j"+(j+3)].unitType != that.MATCH_HIT_0){
									if(that.matchMatrixUnit["i"+i+":j"+j].unitType == that.matchMatrixUnit["i"+i+":j"+(j+2)].unitType && that.matchMatrixUnit["i"+i+":j"+j].unitType == that.matchMatrixUnit["i"+i+":j"+(j+3)].unitType) 
									{
										priorityUnit = that.matchGetPriorityUnit(that.matchMatrixUnit["i"+i+":j"+j].unitType);
										if(priorityUnit > lastpriorityUnit)	
										{
											that.matchSelectUnit1 = that.matchMatrixUnit["i"+i+":j"+j];
											that.matchSelectUnit2 = that.matchMatrixUnit["i"+i+":j"+(j+1)];
											lastpriorityUnit = priorityUnit;
										}
									}
								}
							}
							//[1][0]
							//[X][1]
							//[1][0]
							//[0][0]
							if((j + 2) < that.MATCH_ROWS && (i + 1) < that.MATCH_COLUMNS){
								if(that.matchMatrixUnit["i"+i+":j"+(j+1)].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+(i+1)+":j"+(j+1)].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+i+":j"+j].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+i+":j"+(j+2)].unitType != that.MATCH_HIT_0){
									if(that.matchMatrixUnit["i"+i+":j"+j].unitType == that.matchMatrixUnit["i"+(i+1)+":j"+(j+1)].unitType && that.matchMatrixUnit["i"+i+":j"+j].unitType == that.matchMatrixUnit["i"+i+":j"+(j+2)].unitType) 
									{
										priorityUnit = that.matchGetPriorityUnit(that.matchMatrixUnit["i"+i+":j"+j].unitType);
										if(priorityUnit > lastpriorityUnit)	
										{
											that.matchSelectUnit1 = that.matchMatrixUnit["i"+i+":j"+(j+1)];
											that.matchSelectUnit2 = that.matchMatrixUnit["i"+(i+1)+":j"+(j+1)];
											lastpriorityUnit = priorityUnit;
										}
									}
								}
							}
							//[0][1]
							//[1][X]
							//[0][1]
							//[0][0]
							if((j + 2) < that.MATCH_ROWS && (i - 1) >= 0){
								if(that.matchMatrixUnit["i"+i+":j"+(j+1)].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+i+":j"+j].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+(i-1)+":j"+(j+1)].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+i+":j"+(j+2)].unitType != that.MATCH_HIT_0){
									if(that.matchMatrixUnit["i"+i+":j"+j].unitType == that.matchMatrixUnit["i"+(i-1)+":j"+(j+1)].unitType && that.matchMatrixUnit["i"+i+":j"+j].unitType == that.matchMatrixUnit["i"+i+":j"+(j+2)].unitType) 
									{
										priorityUnit = that.matchGetPriorityUnit(that.matchMatrixUnit["i"+i+":j"+j].unitType);
										if(priorityUnit > lastpriorityUnit)	
										{
											that.matchSelectUnit1 = that.matchMatrixUnit["i"+(i-1)+":j"+(j+1)];
											that.matchSelectUnit2 = that.matchMatrixUnit["i"+i+":j"+(j+1)];
											lastpriorityUnit = priorityUnit;
										}
									}
								}
							}
							//[1][0]
							//[1][0]
							//[X][1]
							//[0][0]
							if((j + 2) < that.MATCH_ROWS && (i + 1) < that.MATCH_COLUMNS){
								if(that.matchMatrixUnit["i"+i+":j"+(j+2)].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+i+":j"+j].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+i+":j"+(j+1)].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+(i+1)+":j"+(j+2)].unitType != that.MATCH_HIT_0){
									if(that.matchMatrixUnit["i"+i+":j"+j].unitType == that.matchMatrixUnit["i"+i+":j"+(j+1)].unitType && that.matchMatrixUnit["i"+i+":j"+j].unitType == that.matchMatrixUnit["i"+(i+1)+":j"+(j+2)].unitType) 
									{
										priorityUnit = that.matchGetPriorityUnit(that.matchMatrixUnit["i"+i+":j"+j].unitType);
										if(priorityUnit > lastpriorityUnit)	
										{
											that.matchSelectUnit1 = that.matchMatrixUnit["i"+i+":j"+(j+2)];
											that.matchSelectUnit2 = that.matchMatrixUnit["i"+(i+1)+":j"+(j+2)];
											lastpriorityUnit = priorityUnit;
										}
									}
								}
							}
							//[X][1]
							//[1][0]
							//[1][0]
							//[0][0]
							if((j + 2) < that.MATCH_ROWS && (i + 1) < that.MATCH_COLUMNS){
								if(that.matchMatrixUnit["i"+i+":j"+j].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+(i+1)+":j"+j].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+i+":j"+(j+1)].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+i+":j"+(j+2)].unitType != that.MATCH_HIT_0){
									if(that.matchMatrixUnit["i"+(i+1)+":j"+j].unitType == that.matchMatrixUnit["i"+i+":j"+(j+1)].unitType && that.matchMatrixUnit["i"+(i+1)+":j"+j].unitType == that.matchMatrixUnit["i"+i+":j"+(j+2)].unitType) 
									{
										priorityUnit = that.matchGetPriorityUnit(that.matchMatrixUnit["i"+(i+1)+":j"+j].unitType);
										if(priorityUnit > lastpriorityUnit)	
										{
											that.matchSelectUnit1 = that.matchMatrixUnit["i"+i+":j"+j];
											that.matchSelectUnit2 = that.matchMatrixUnit["i"+(i+1)+":j"+j];
											lastpriorityUnit = priorityUnit;
										}
									}
								}
							}
							//[0][1]
							//[0][1]
							//[1][X]
							//[0][0]
							if((j + 2) < that.MATCH_ROWS && (i - 1) >= 0){
								if(that.matchMatrixUnit["i"+i+":j"+(j+2)].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+i+":j"+j].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+i+":j"+(j+1)].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+(i-1)+":j"+(j+2)].unitType != that.MATCH_HIT_0){
									if(that.matchMatrixUnit["i"+i+":j"+j].unitType == that.matchMatrixUnit["i"+i+":j"+(j+1)].unitType && that.matchMatrixUnit["i"+i+":j"+j].unitType == that.matchMatrixUnit["i"+(i-1)+":j"+(j+2)].unitType) 
									{
										priorityUnit = that.matchGetPriorityUnit(that.matchMatrixUnit["i"+i+":j"+j].unitType);
										if(priorityUnit > lastpriorityUnit)	
										{
											that.matchSelectUnit1 = that.matchMatrixUnit["i"+(i-1)+":j"+(j+2)];
											that.matchSelectUnit2 = that.matchMatrixUnit["i"+i+":j"+(j+2)];
											lastpriorityUnit = priorityUnit;
										}
									}
								}
							}
							//[1][X]
							//[0][1]
							//[0][1]
							//[0][0]
							if((j + 2) < that.MATCH_ROWS && (i - 1) >= 0){
								if(that.matchMatrixUnit["i"+i+":j"+j].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+(i-1)+":j"+j].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+i+":j"+(j+1)].unitType != that.MATCH_HIT_0 && that.matchMatrixUnit["i"+i+":j"+(j+2)].unitType != that.MATCH_HIT_0){
									if(that.matchMatrixUnit["i"+(i-1)+":j"+j].unitType == that.matchMatrixUnit["i"+i+":j"+(j+1)].unitType && that.matchMatrixUnit["i"+(i-1)+":j"+j].unitType == that.matchMatrixUnit["i"+i+":j"+(j+2)].unitType) 
									{
										priorityUnit = that.matchGetPriorityUnit(that.matchMatrixUnit["i"+(i-1)+":j"+j].unitType);
										if(priorityUnit > lastpriorityUnit)	
										{
											that.matchSelectUnit1 = that.matchMatrixUnit["i"+(i-1)+":j"+j];
											that.matchSelectUnit2 = that.matchMatrixUnit["i"+i+":j"+j];
											lastpriorityUnit = priorityUnit;
										}
									}
								}
							}
						}
					}
				}
			}

			if(that.matchSelectUnit1 !== null && that.matchSelectUnit2 !== null)
			{
				that.matchExchangeUnits(); // меняем юниты местами
			}else{
				that.matchActionAI();
			}
		},
		
		/* Анимация удаление юнитов */
		matchAnimationRemoveUnit: function(posX, posY)
		{
			var anim = new PIXI.extras.MovieClip(parent.assets.getAsset("animTexFlash"));
			anim.position.x = posX - 55;
			anim.position.y = posY - 55;
			anim.loop = false;
			anim.animationSpeed = 0.2;
			anim.onComplete = that.onMatchAnimationRemoveUnitComplete;
			anim.play();
			that.matchStage.addChild(anim);
		},
		
		onMatchAnimationRemoveUnitComplete: function()
		{
			that.matchStage.removeChild(this);
		},

		/* Наложение маски на игровое поле */
		matchMask: function()
		{
			var posX = (parent.config.MAIN_WIDTH / 2) - (500 / 2);
			var posY = (parent.config.MAIN_HEIGH / 2) - (500 / 2);
			var thing = new PIXI.Graphics();
			thing.position.x = 0;
			thing.position.y = 0;
			thing.lineStyle(0);
			thing.clear();
				thing.beginFill(0x8bc5ff, 0.4);
				thing.moveTo(posX, posY);
				thing.lineTo(posX, posY);
				thing.lineTo(posX + 500, posY);
				thing.lineTo(posX + 500, posY + 500);
				thing.lineTo(posX, posY + 500);
				that.matchStage.mask = thing;
		},
		
		/* Завершение работы с классом ======================================== */
		show: function()
		{
			return that.matchStage;
		},
		
		close: function()
		{
			for(var child in that.matchStage.children) that.matchStage.removeChild(that.matchStage.children[child]);
			return that.matchStage;
		},
		
		getWindowStage: function()
		{
			return that.matchStage;
		},
		
		destroy: function()
		{
			for(var child in that.matchStage.children) that.matchStage.removeChild(that.matchStage.children[child]);
			that.matchStage.destroy();
			delete that.matchStage.children;
			
			for(var property in that) that[property] = null;
		}
	};
	return that;
};

/* == END FILE ========================================================== */

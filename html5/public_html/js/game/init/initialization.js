
/* == START FILE ========================================================= */

var Initialization = function(planetTextures, heroesTextures, personagesJson, planetsJson, fieldLevelsJson, dataSide)
{
	var that = {
		mapPlanets: null,     // карта планет (объект)
		mapMessage: null,     // Сообщения на карте (объект)
		levels: null,         		// Уровни (объект)

		commandUser: null,    // команда пользователя (объект)
		commandAI: null,      // команда ИИ (объект)

		personages: null,      // список персонажей в игре (объект)
		planets: null,         // Прогресс игры в отношении планет (объект)

		userExperiencePoints: 0,			// Очки опыта
		userTotalPointsPlayerTournament: 0,	// Общие очки игрока за всю игру
		userlTotalPointsPlayerLevel: 0,            // Общие очки игрока за уровен
		userExperiencePointsAI: 0, 		// Очки опыта ИИ
		userTotalBattle: 0,                        // Общее количество проведённых битв (связь с сообщениями R2D2)
		
		SIDE_NONE: "side_none",
		SIDE_JEDI: "side_jedi",
		SIDE_SITH: "side_sith",
		
		USER_PLANET_QUEST_AWAITING: "user_planet_quest_awaiting",
		USER_PLANET_QUEST_COMPLETE_JEDI: "user_planet_quest_complete_jedi",
		USER_PLANET_QUEST_COMPLETE_SITH: "user_planet_quest_complete_sith",
		
		USER_PERSONAGE_AVAILABLE: "user_personage_available",
                AI_PERSONAGE_AVAILABLE: "ai_personage_available",
		USER_PERSONAGE_NOT_AVAILABLE: "user_personage_not_available",
		
		planetBlueStyleText: { font : 'bold 14px Arial', fill : '#FFFFFF', stroke : '#0090F0', strokeThickness : 1, wordWrap : true, wordWrapWidth : 175 },
		planetRedStyleText: { font : 'bold 14px Arial', fill : '#FFFFFF', stroke : '#880000', strokeThickness : 1, wordWrap : true, wordWrapWidth : 175 },
		
		Planet: function(id, name)
		{
			this.id = id;                       			// идентификатор планеты
			this.name = name;                   	// имя планеты
			this.bluePersonage1 = null;         	// персонаж планеты
			this.bluePersonage2 = null;         	// персонаж планеты
			this.bluePersonage3 = null;         	// персонаж планеты
			this.blueRewardPersonage1 = null;   // союзник
			this.blueRewardPersonage2 = null;   // союзник
			this.blueRewardPersonage3 = null;   // союзник
			this.redPersonage1 = null;          	// персонаж планеты
			this.redPersonage2 = null;          	// персонаж планеты
			this.redPersonage3 = null;          	// персонаж планеты
			this.redRewardPersonage1 = null;    // союзник
			this.redRewardPersonage2 = null;    // союзник
			this.redRewardPersonage3 = null;    // союзник
			this.status = "user_planet_quest_awaiting";   // статус
			this.description = "";              		// описнаие
		},
		
		Personage: function(id, name)
		{
			this.id = id;                       // идентификатор персонажа
			this.name = name;             // имя персонажа
			this.life = 0;                      // здоровье персонажа
			this.hitAttack1 = 0;                      // показатель атаки
			this.hitAttack2 = 0;                      // показатель атаки
			this.hitAttack3 = 0;                      // показатель атаки
			this.hitAttack4 = 0;                      // показатель атаки
			this.hitAttack5 = 0;                      // показатель атаки
			this.hitDefense1 = 0;                      // показатель защиты
			this.hitDefense2 = 0;                      // показатель защиты
			this.hitDefense3 = 0;                      // показатель защиты
			this.hitDefense4 = 0;                      // показатель защиты
			this.hitDefense5 = 0;                      // показатель защиты
			this.status = "user_personage_not_available"; // статус (выбран / не выбран)
			this.planet = "";					// планета
			this.command = false;               // входит в комманду или нет
			this.description = "";              // описание
		},
		
		initMap: function()
		{
			that.mapPlanets = new Object();
			
			that.mapPlanets["Coruscant"] = [
				"Coruscant",
				new PIXI.Sprite(planetTextures["Coruscant"][1]),
				new PIXI.Text(planetTextures["Coruscant"][0], that.planetBlueStyleText),
				new PIXI.Text(planetTextures["Coruscant"][0], that.planetRedStyleText),
				new PIXI.Graphics(),
				new PIXI.Sprite(heroesTextures["darth_vader"][1]),
				new PIXI.Sprite(heroesTextures["darth_vader"][1]),
				new PIXI.Sprite(heroesTextures["darth_vader"][1]),
				new PIXI.Sprite(heroesTextures["luke_skywalker"][1]),
				new PIXI.Sprite(heroesTextures["mace_windu"][1]),
				new PIXI.Sprite(heroesTextures["mas_amedda"][1]),
				new PIXI.Text("Орден Джедай", that.planetBlueStyleText),
				new PIXI.Text("Победа Ситов", that.planetRedStyleText)
			];
			that.mapPlanets["Coruscant"][1].name = "Coruscant";
			that.mapPlanets["Coruscant"][1].position.x = 450;
			that.mapPlanets["Coruscant"][1].position.y = 575;
			that.mapPlanets["Coruscant"][1].interactive = true; 
			that.mapPlanets["Coruscant"][1].buttonMode = true;
			that.mapPlanets["Coruscant"][1].scale.set(0.2);
			that.mapPlanets["Coruscant"][2].position.x = 490; 
			that.mapPlanets["Coruscant"][2].position.y = 550; 
			that.mapPlanets["Coruscant"][3].position.x = 490; 
			that.mapPlanets["Coruscant"][3].position.y = 550;
			that.mapPlanets["Coruscant"][4].lineStyle(1, 0xFFFFFF, 0.3);
			that.mapPlanets["Coruscant"][4].drawCircle(492, 615, 39);
			that.mapPlanets["Coruscant"][4].lineStyle(1, 0xFFFFFF, 1);
			that.mapPlanets["Coruscant"][4].moveTo(475, 595);
			that.mapPlanets["Coruscant"][4].lineTo(485, 570);
			that.mapPlanets["Coruscant"][4].moveTo(485, 570);
			that.mapPlanets["Coruscant"][4].lineTo(650, 570);
			that.mapPlanets["Coruscant"][5].position.x = 0; 
			that.mapPlanets["Coruscant"][5].position.y = 0;
			that.mapPlanets["Coruscant"][5].scale.set(0.18);
			that.mapPlanets["Coruscant"][6].position.x = 0; 
			that.mapPlanets["Coruscant"][6].position.y = 0;
			that.mapPlanets["Coruscant"][6].scale.set(0.18);
			that.mapPlanets["Coruscant"][7].position.x = 0; 
			that.mapPlanets["Coruscant"][7].position.y = 0;
			that.mapPlanets["Coruscant"][7].scale.set(0.18);
			that.mapPlanets["Coruscant"][8].position.x = 525; 
			that.mapPlanets["Coruscant"][8].position.y = 575;
			that.mapPlanets["Coruscant"][8].scale.set(0.18);
			that.mapPlanets["Coruscant"][9].position.x = 575; 
			that.mapPlanets["Coruscant"][9].position.y = 575;
			that.mapPlanets["Coruscant"][9].scale.set(0.18);
			that.mapPlanets["Coruscant"][10].position.x = 625; 
			that.mapPlanets["Coruscant"][10].position.y = 575;
			that.mapPlanets["Coruscant"][10].scale.set(0.18);
			that.mapPlanets["Coruscant"][11].position.x = 520; 
			that.mapPlanets["Coruscant"][11].position.y = 570; 
			that.mapPlanets["Coruscant"][12].position.x = 520; 
			that.mapPlanets["Coruscant"][12].position.y = 570;
			
			that.mapPlanets["Totooine"] = [
				"Totooine",
				new PIXI.Sprite(planetTextures["Totooine"][1]),
				new PIXI.Text(planetTextures["Totooine"][0], that.planetBlueStyleText),
				new PIXI.Text(planetTextures["Totooine"][0], that.planetRedStyleText),
				new PIXI.Graphics(),
				new PIXI.Sprite(heroesTextures["tusken"][1]),
				new PIXI.Sprite(heroesTextures["jawas"][1]),
				new PIXI.Sprite(heroesTextures["watto"][1]),
				new PIXI.Sprite(heroesTextures["qui_gon_jinn"][1]),
				new PIXI.Sprite(heroesTextures["owen_lars"][1]),
				new PIXI.Sprite(heroesTextures["tusken"][1]),
				new PIXI.Text("Союзник Джедай", that.planetBlueStyleText),
				new PIXI.Text("Пренадлежит Ситам", that.planetRedStyleText)
			];
			that.mapPlanets["Totooine"][1].name = "Totooine";
			that.mapPlanets["Totooine"][1].position.x = 300; 
			that.mapPlanets["Totooine"][1].position.y = 425; 
			that.mapPlanets["Totooine"][1].interactive = true; 
			that.mapPlanets["Totooine"][1].buttonMode = true;
			that.mapPlanets["Totooine"][1].scale.set(0.2);
			that.mapPlanets["Totooine"][2].position.x = 340; 
			that.mapPlanets["Totooine"][2].position.y = 400; 
			that.mapPlanets["Totooine"][3].position.x = 340; 
			that.mapPlanets["Totooine"][3].position.y = 400;
			that.mapPlanets["Totooine"][4].lineStyle(1, 0xFFFFFF, 0.3);
			that.mapPlanets["Totooine"][4].drawCircle(341, 465, 39);
			that.mapPlanets["Totooine"][4].lineStyle(1, 0xFFFFFF, 1);
			that.mapPlanets["Totooine"][4].moveTo(325, 445);
			that.mapPlanets["Totooine"][4].lineTo(335, 420);
			that.mapPlanets["Totooine"][4].moveTo(335, 420);
			that.mapPlanets["Totooine"][4].lineTo(500, 420);
			that.mapPlanets["Totooine"][5].position.x = 375; 
			that.mapPlanets["Totooine"][5].position.y = 400;
			that.mapPlanets["Totooine"][5].scale.set(0.23);
			that.mapPlanets["Totooine"][6].position.x = 435; 
			that.mapPlanets["Totooine"][6].position.y = 400;
			that.mapPlanets["Totooine"][6].scale.set(0.23);
			that.mapPlanets["Totooine"][7].position.x = 490; 
			that.mapPlanets["Totooine"][7].position.y = 410;
			that.mapPlanets["Totooine"][7].scale.set(0.25);
			that.mapPlanets["Totooine"][8].position.x = 375; 
			that.mapPlanets["Totooine"][8].position.y = 425;
			that.mapPlanets["Totooine"][8].scale.set(0.18);
			that.mapPlanets["Totooine"][9].position.x = 425; 
			that.mapPlanets["Totooine"][9].position.y = 425;
			that.mapPlanets["Totooine"][9].scale.set(0.18);
			that.mapPlanets["Totooine"][10].position.x = 475; 
			that.mapPlanets["Totooine"][10].position.y = 400;
			that.mapPlanets["Totooine"][10].scale.set(0.25);
			that.mapPlanets["Totooine"][11].position.x = 370; 
			that.mapPlanets["Totooine"][11].position.y = 420; 
			that.mapPlanets["Totooine"][12].position.x = 370; 
			that.mapPlanets["Totooine"][12].position.y = 420;
			
			that.mapPlanets["Naboo"] = [
				"Naboo",
				new PIXI.Sprite(planetTextures["Naboo"][1]),
				new PIXI.Text(planetTextures["Naboo"][0], that.planetBlueStyleText),
				new PIXI.Text(planetTextures["Naboo"][0], that.planetRedStyleText),
				new PIXI.Graphics(),
				new PIXI.Sprite(heroesTextures["darth_maul"][1]),
				new PIXI.Sprite(heroesTextures["trade_federation"][1]),
				new PIXI.Sprite(heroesTextures["b1_battle_droid"][2]),
				new PIXI.Sprite(heroesTextures["boss_nass"][2]),
				new PIXI.Sprite(heroesTextures["capitan_panaka"][1]),
				new PIXI.Sprite(heroesTextures["royal_guards"][1]),
				new PIXI.Text("Союзник Джедай", that.planetBlueStyleText),
				new PIXI.Text("Пренадлежит Ситам", that.planetRedStyleText)
			];
			that.mapPlanets["Naboo"][1].name = "Naboo";
			that.mapPlanets["Naboo"][1].position.x = 630; 
			that.mapPlanets["Naboo"][1].position.y = 240; 
			that.mapPlanets["Naboo"][1].interactive = true; 
			that.mapPlanets["Naboo"][1].buttonMode = true;
			that.mapPlanets["Naboo"][1].scale.set(0.2);
			that.mapPlanets["Naboo"][2].position.x = 670; 
			that.mapPlanets["Naboo"][2].position.y = 215; 
			that.mapPlanets["Naboo"][3].position.x = 670; 
			that.mapPlanets["Naboo"][3].position.y = 215;
			that.mapPlanets["Naboo"][4].lineStyle(1, 0xFFFFFF, 0.3);
			that.mapPlanets["Naboo"][4].drawCircle(672, 280, 39);
			that.mapPlanets["Naboo"][4].lineStyle(1, 0xFFFFFF, 1);
			that.mapPlanets["Naboo"][4].moveTo(655, 260);
			that.mapPlanets["Naboo"][4].lineTo(665, 235);
			that.mapPlanets["Naboo"][4].moveTo(665, 235);
			that.mapPlanets["Naboo"][4].lineTo(830, 235);
			that.mapPlanets["Naboo"][5].position.x = 705; 
			that.mapPlanets["Naboo"][5].position.y = 240;
			that.mapPlanets["Naboo"][5].scale.set(0.18);
			that.mapPlanets["Naboo"][6].position.x = 752; 
			that.mapPlanets["Naboo"][6].position.y = 235;
			that.mapPlanets["Naboo"][6].scale.set(0.22);
			that.mapPlanets["Naboo"][7].position.x = 805; 
			that.mapPlanets["Naboo"][7].position.y = 240;
			that.mapPlanets["Naboo"][7].scale.set(0.18);
			that.mapPlanets["Naboo"][8].position.x = 705; 
			that.mapPlanets["Naboo"][8].position.y = 240;
			that.mapPlanets["Naboo"][8].scale.set(0.18);
			that.mapPlanets["Naboo"][9].position.x = 752; 
			that.mapPlanets["Naboo"][9].position.y = 240;
			that.mapPlanets["Naboo"][9].scale.set(0.18);
			that.mapPlanets["Naboo"][10].position.x = 805; 
			that.mapPlanets["Naboo"][10].position.y = 240;
			that.mapPlanets["Naboo"][10].scale.set(0.18);
			that.mapPlanets["Naboo"][11].position.x = 700; 
			that.mapPlanets["Naboo"][11].position.y = 235; 
			that.mapPlanets["Naboo"][12].position.x = 700; 
			that.mapPlanets["Naboo"][12].position.y = 235;
			
			that.mapPlanets["Endor"] = [
				"Endor",
				new PIXI.Sprite(planetTextures["Endor"][1]),
				new PIXI.Text(planetTextures["Endor"][0], that.planetBlueStyleText),
				new PIXI.Text(planetTextures["Endor"][0], that.planetRedStyleText),
				new PIXI.Graphics(),
				new PIXI.Sprite(heroesTextures["nute_gunray"][1]),
				new PIXI.Sprite(heroesTextures["stormtroopers"][1]),
				new PIXI.Sprite(heroesTextures["aurra_sing"][2]),
				new PIXI.Sprite(heroesTextures["alliance_to_restore_the_republic"][2]),
				new PIXI.Sprite(heroesTextures["wicket_wysri_warrick"][1]),
				new PIXI.Sprite(heroesTextures["aayla_secura"][1]),
				new PIXI.Text("Союзник Джедай", that.planetBlueStyleText),
				new PIXI.Text("Пренадлежит Ситам", that.planetRedStyleText)
			];
			that.mapPlanets["Endor"][1].name = "Endor";
			that.mapPlanets["Endor"][1].position.x = 200;
			that.mapPlanets["Endor"][1].position.y = 550;
			that.mapPlanets["Endor"][1].interactive = true; 
			that.mapPlanets["Endor"][1].buttonMode = true;
			that.mapPlanets["Endor"][1].scale.set(0.2);
			that.mapPlanets["Endor"][2].position.x = 240; 
			that.mapPlanets["Endor"][2].position.y = 525; 
			that.mapPlanets["Endor"][3].position.x = 240; 
			that.mapPlanets["Endor"][3].position.y = 525;
			that.mapPlanets["Endor"][4].lineStyle(1, 0xFFFFFF, 0.3);
			that.mapPlanets["Endor"][4].drawCircle(240, 590, 39);
			that.mapPlanets["Endor"][4].lineStyle(1, 0xFFFFFF, 1);
			that.mapPlanets["Endor"][4].moveTo(225, 570);
			that.mapPlanets["Endor"][4].lineTo(235, 545);
			that.mapPlanets["Endor"][4].moveTo(235, 545);
			that.mapPlanets["Endor"][4].lineTo(400, 545);
			that.mapPlanets["Endor"][5].position.x = 275; 
			that.mapPlanets["Endor"][5].position.y = 550;
			that.mapPlanets["Endor"][5].scale.set(0.18);
			that.mapPlanets["Endor"][6].position.x = 325; 
			that.mapPlanets["Endor"][6].position.y = 545;
			that.mapPlanets["Endor"][6].scale.set(0.2);
			that.mapPlanets["Endor"][7].position.x = 375; 
			that.mapPlanets["Endor"][7].position.y = 550;
			that.mapPlanets["Endor"][7].scale.set(0.19);
			that.mapPlanets["Endor"][8].position.x = 275; 
			that.mapPlanets["Endor"][8].position.y = 545;
			that.mapPlanets["Endor"][8].scale.set(0.20);
			that.mapPlanets["Endor"][9].position.x = 325; 
			that.mapPlanets["Endor"][9].position.y = 550;
			that.mapPlanets["Endor"][9].scale.set(0.18);
			that.mapPlanets["Endor"][10].position.x = 375; 
			that.mapPlanets["Endor"][10].position.y = 550;
			that.mapPlanets["Endor"][10].scale.set(0.18);
			that.mapPlanets["Endor"][11].position.x = 270; 
			that.mapPlanets["Endor"][11].position.y = 545; 
			that.mapPlanets["Endor"][12].position.x = 270; 
			that.mapPlanets["Endor"][12].position.y = 545; 
			
			that.mapPlanets["Hoth"] = [
				"Hoth",
				new PIXI.Sprite(planetTextures["Hoth"][1]),
				new PIXI.Text(planetTextures["Hoth"][0], that.planetBlueStyleText),
				new PIXI.Text(planetTextures["Hoth"][0], that.planetRedStyleText),
				new PIXI.Graphics(),
				new PIXI.Sprite(heroesTextures["maximilian_veers"][1]),
				new PIXI.Sprite(heroesTextures["stormtrooper_2"][2]),
				new PIXI.Sprite(heroesTextures["stormtrooper_1"][1]),
				new PIXI.Sprite(heroesTextures["general_madine"][2]),
				new PIXI.Sprite(heroesTextures["han_solo"][1]),
				new PIXI.Sprite(heroesTextures["chewbacca"][2]),
				new PIXI.Text("Союзник Джедай", that.planetBlueStyleText),
				new PIXI.Text("Пренадлежит Ситам", that.planetRedStyleText)
			];
			that.mapPlanets["Hoth"][1].name = "Hoth";
			that.mapPlanets["Hoth"][1].position.x = 700; 
			that.mapPlanets["Hoth"][1].position.y = 485; // 475 +10
			that.mapPlanets["Hoth"][1].interactive = true; 
			that.mapPlanets["Hoth"][1].buttonMode = true;
			that.mapPlanets["Hoth"][1].scale.set(0.2);
			that.mapPlanets["Hoth"][2].position.x = 740; 
			that.mapPlanets["Hoth"][2].position.y = 460; 
			that.mapPlanets["Hoth"][3].position.x = 740; 
			that.mapPlanets["Hoth"][3].position.y = 460;
			that.mapPlanets["Hoth"][4].lineStyle(1, 0xFFFFFF, 0.3);
			that.mapPlanets["Hoth"][4].drawCircle(741, 525, 39);
			that.mapPlanets["Hoth"][4].lineStyle(1, 0xFFFFFF, 1);
			that.mapPlanets["Hoth"][4].moveTo(725, 505);
			that.mapPlanets["Hoth"][4].lineTo(735, 480);
			that.mapPlanets["Hoth"][4].moveTo(735, 480);
			that.mapPlanets["Hoth"][4].lineTo(900, 480);
			that.mapPlanets["Hoth"][5].position.x = 775; 
			that.mapPlanets["Hoth"][5].position.y = 485;
			that.mapPlanets["Hoth"][5].scale.set(0.18);
			that.mapPlanets["Hoth"][6].position.x = 825; 
			that.mapPlanets["Hoth"][6].position.y = 485;
			that.mapPlanets["Hoth"][6].scale.set(0.18);
			that.mapPlanets["Hoth"][7].position.x = 875; 
			that.mapPlanets["Hoth"][7].position.y = 485;
			that.mapPlanets["Hoth"][7].scale.set(0.18);
			that.mapPlanets["Hoth"][8].position.x = 775; 
			that.mapPlanets["Hoth"][8].position.y = 485;
			that.mapPlanets["Hoth"][8].scale.set(0.18);
			that.mapPlanets["Hoth"][9].position.x = 825; 
			that.mapPlanets["Hoth"][9].position.y = 485;
			that.mapPlanets["Hoth"][9].scale.set(0.18);
			that.mapPlanets["Hoth"][10].position.x = 875; 
			that.mapPlanets["Hoth"][10].position.y = 485;
			that.mapPlanets["Hoth"][10].scale.set(0.18);
			that.mapPlanets["Hoth"][11].position.x = 770; 
			that.mapPlanets["Hoth"][11].position.y = 480; 
			that.mapPlanets["Hoth"][12].position.x = 770; 
			that.mapPlanets["Hoth"][12].position.y = 480;
			
			that.mapPlanets["Mustafar"] = [
				"Mustafar",
				new PIXI.Sprite(planetTextures["Mustafar"][1]),
				new PIXI.Text(planetTextures["Mustafar"][0], that.planetBlueStyleText),
				new PIXI.Text(planetTextures["Mustafar"][0], that.planetRedStyleText),
				new PIXI.Graphics(),
				new PIXI.Sprite(heroesTextures["anakin_skywalker"][1]),
				new PIXI.Sprite(heroesTextures["palpatine"][2]),
				new PIXI.Sprite(heroesTextures["separatists"][1]),
				new PIXI.Sprite(heroesTextures["obi_wan_kenobi"][2]),
				new PIXI.Sprite(heroesTextures["padme_amidala"][1]),
				new PIXI.Sprite(heroesTextures["wat_tambor"][1]),
				new PIXI.Text("Союзник Джедай", that.planetBlueStyleText),
				new PIXI.Text("Пренадлежит Ситам", that.planetRedStyleText)
			];
			that.mapPlanets["Mustafar"][1].name = "Mustafar";
			that.mapPlanets["Mustafar"][1].position.x = 600; 
			that.mapPlanets["Mustafar"][1].position.y = 375;
			that.mapPlanets["Mustafar"][1].interactive = true; 
			that.mapPlanets["Mustafar"][1].buttonMode = true;
			that.mapPlanets["Mustafar"][1].scale.set(0.2);
			that.mapPlanets["Mustafar"][2].position.x = 640; 
			that.mapPlanets["Mustafar"][2].position.y = 350; 
			that.mapPlanets["Mustafar"][3].position.x = 640; 
			that.mapPlanets["Mustafar"][3].position.y = 350;
			that.mapPlanets["Mustafar"][4].lineStyle(1, 0xFFFFFF, 0.3);
			that.mapPlanets["Mustafar"][4].drawCircle(642, 415, 39);
			that.mapPlanets["Mustafar"][4].lineStyle(1, 0xFFFFFF, 1);
			that.mapPlanets["Mustafar"][4].moveTo(625, 395);
			that.mapPlanets["Mustafar"][4].lineTo(635, 370);
			that.mapPlanets["Mustafar"][4].moveTo(635, 370);
			that.mapPlanets["Mustafar"][4].lineTo(800, 370);
			that.mapPlanets["Mustafar"][5].position.x = 675; 
			that.mapPlanets["Mustafar"][5].position.y = 375;
			that.mapPlanets["Mustafar"][5].scale.set(0.18);
			that.mapPlanets["Mustafar"][6].position.x = 725; 
			that.mapPlanets["Mustafar"][6].position.y = 375;
			that.mapPlanets["Mustafar"][6].scale.set(0.18);
			that.mapPlanets["Mustafar"][7].position.x = 775; 
			that.mapPlanets["Mustafar"][7].position.y = 360;
			that.mapPlanets["Mustafar"][7].scale.set(0.22);
			that.mapPlanets["Mustafar"][8].position.x = 675; 
			that.mapPlanets["Mustafar"][8].position.y = 375;
			that.mapPlanets["Mustafar"][8].scale.set(0.18);
			that.mapPlanets["Mustafar"][9].position.x = 725; 
			that.mapPlanets["Mustafar"][9].position.y = 375;
			that.mapPlanets["Mustafar"][9].scale.set(0.18);
			that.mapPlanets["Mustafar"][10].position.x = 775; 
			that.mapPlanets["Mustafar"][10].position.y = 375;
			that.mapPlanets["Mustafar"][10].scale.set(0.18);
			that.mapPlanets["Mustafar"][11].position.x = 670; 
			that.mapPlanets["Mustafar"][11].position.y = 370; 
			that.mapPlanets["Mustafar"][12].position.x = 670; 
			that.mapPlanets["Mustafar"][12].position.y = 370;
			
			that.mapPlanets["Dagobah"] = [
				"Dagobah",
				new PIXI.Sprite(planetTextures["Dagobah"][1]),
				new PIXI.Text(planetTextures["Dagobah"][0], that.planetBlueStyleText),
				new PIXI.Text(planetTextures["Dagobah"][0], that.planetRedStyleText),
				new PIXI.Graphics(),
				new PIXI.Sprite(heroesTextures["stormtroopers"][1]),
				new PIXI.Sprite(heroesTextures["clone_commander_bakara"][2]),
				new PIXI.Sprite(heroesTextures["clone_commander_cody"][1]),
				new PIXI.Sprite(heroesTextures["yoda"][1]),
				new PIXI.Sprite(heroesTextures["barriss_offee"][1]),
				new PIXI.Sprite(heroesTextures["kit_fisto"][1]),
				new PIXI.Text("Союзник Джедай", that.planetBlueStyleText),
				new PIXI.Text("Пренадлежит Ситам", that.planetRedStyleText)
			];
			that.mapPlanets["Dagobah"][1].name = "Dagobah";
			that.mapPlanets["Dagobah"][1].position.x = 200; 
			that.mapPlanets["Dagobah"][1].position.y = 50; 
			that.mapPlanets["Dagobah"][1].interactive = true; 
			that.mapPlanets["Dagobah"][1].buttonMode = true;
			that.mapPlanets["Dagobah"][1].scale.set(0.2);
			that.mapPlanets["Dagobah"][2].position.x = 240; 
			that.mapPlanets["Dagobah"][2].position.y = 25; 
			that.mapPlanets["Dagobah"][3].position.x = 240; 
			that.mapPlanets["Dagobah"][3].position.y = 25;
			that.mapPlanets["Dagobah"][4].lineStyle(1, 0xFFFFFF, 0.3);
			that.mapPlanets["Dagobah"][4].drawCircle(241, 90, 39);
			that.mapPlanets["Dagobah"][4].lineStyle(1, 0xFFFFFF, 1);
			that.mapPlanets["Dagobah"][4].moveTo(225, 70);
			that.mapPlanets["Dagobah"][4].lineTo(235, 45);
			that.mapPlanets["Dagobah"][4].moveTo(235, 45);
			that.mapPlanets["Dagobah"][4].lineTo(400, 45);
			that.mapPlanets["Dagobah"][5].position.x = 275; 
			that.mapPlanets["Dagobah"][5].position.y = 45;
			that.mapPlanets["Dagobah"][5].scale.set(0.2);
			that.mapPlanets["Dagobah"][6].position.x = 325; 
			that.mapPlanets["Dagobah"][6].position.y = 50;
			that.mapPlanets["Dagobah"][6].scale.set(0.18);
			that.mapPlanets["Dagobah"][7].position.x = 375; 
			that.mapPlanets["Dagobah"][7].position.y = 50;
			that.mapPlanets["Dagobah"][7].scale.set(0.18);
			that.mapPlanets["Dagobah"][8].position.x = 275; 
			that.mapPlanets["Dagobah"][8].position.y = 50;
			that.mapPlanets["Dagobah"][8].scale.set(0.18);
			that.mapPlanets["Dagobah"][9].position.x = 325; 
			that.mapPlanets["Dagobah"][9].position.y = 50;
			that.mapPlanets["Dagobah"][9].scale.set(0.18);
			that.mapPlanets["Dagobah"][10].position.x = 375; 
			that.mapPlanets["Dagobah"][10].position.y = 50;
			that.mapPlanets["Dagobah"][10].scale.set(0.18);
			that.mapPlanets["Dagobah"][11].position.x = 270; 
			that.mapPlanets["Dagobah"][11].position.y = 45; 
			that.mapPlanets["Dagobah"][12].position.x = 270; 
			that.mapPlanets["Dagobah"][12].position.y = 45; 
			
			that.mapPlanets["Bespin"] = [
				"Bespin",
				new PIXI.Sprite(planetTextures["Bespin"][1]),
				new PIXI.Text(planetTextures["Bespin"][0], that.planetBlueStyleText),
				new PIXI.Text(planetTextures["Bespin"][0], that.planetRedStyleText),
				new PIXI.Graphics(),
				new PIXI.Sprite(heroesTextures["boba_fett"][1]),
				new PIXI.Sprite(heroesTextures["stormtrooper_1"][1]),
				new PIXI.Sprite(heroesTextures["clone_commander_neyo"][1]),
				new PIXI.Sprite(heroesTextures["adigallia"][1]),
				new PIXI.Sprite(heroesTextures["lando_calrissian"][1]),
				new PIXI.Sprite(heroesTextures["ki_adi_mundi"][1]),
				new PIXI.Text("Союзник Джедай", that.planetBlueStyleText),
				new PIXI.Text("Пренадлежит Ситам", that.planetRedStyleText)
			];
			that.mapPlanets["Bespin"][1].name = "Bespin";
			that.mapPlanets["Bespin"][1].position.x = 5;
			that.mapPlanets["Bespin"][1].position.y = 125;
			that.mapPlanets["Bespin"][1].interactive = true; 
			that.mapPlanets["Bespin"][1].buttonMode = true;
			that.mapPlanets["Bespin"][1].scale.set(0.2);
			that.mapPlanets["Bespin"][2].position.x = 45; 
			that.mapPlanets["Bespin"][2].position.y = 100; 
			that.mapPlanets["Bespin"][3].position.x = 45; 
			that.mapPlanets["Bespin"][3].position.y = 100;
			that.mapPlanets["Bespin"][4].lineStyle(1, 0xFFFFFF, 0.3);
			that.mapPlanets["Bespin"][4].drawCircle(47.5, 165.5, 38);
			that.mapPlanets["Bespin"][4].lineStyle(1, 0xFFFFFF, 1);
			that.mapPlanets["Bespin"][4].moveTo(30, 145);
			that.mapPlanets["Bespin"][4].lineTo(40, 120);
			that.mapPlanets["Bespin"][4].moveTo(40, 120);
			that.mapPlanets["Bespin"][4].lineTo(205, 120);
			that.mapPlanets["Bespin"][5].position.x = 80; 
			that.mapPlanets["Bespin"][5].position.y = 125;
			that.mapPlanets["Bespin"][5].scale.set(0.18);
			that.mapPlanets["Bespin"][6].position.x = 130; 
			that.mapPlanets["Bespin"][6].position.y = 125;
			that.mapPlanets["Bespin"][6].scale.set(0.18);
			that.mapPlanets["Bespin"][7].position.x = 180; 
			that.mapPlanets["Bespin"][7].position.y = 125;
			that.mapPlanets["Bespin"][7].scale.set(0.18);
			that.mapPlanets["Bespin"][8].position.x = 80; 
			that.mapPlanets["Bespin"][8].position.y = 125;
			that.mapPlanets["Bespin"][8].scale.set(0.18);
			that.mapPlanets["Bespin"][9].position.x = 130; 
			that.mapPlanets["Bespin"][9].position.y = 125;
			that.mapPlanets["Bespin"][9].scale.set(0.18);
			that.mapPlanets["Bespin"][10].position.x = 180; 
			that.mapPlanets["Bespin"][10].position.y = 125;
			that.mapPlanets["Bespin"][10].scale.set(0.18);
			that.mapPlanets["Bespin"][11].position.x = 75; 
			that.mapPlanets["Bespin"][11].position.y = 120; 
			that.mapPlanets["Bespin"][12].position.x = 75; 
			that.mapPlanets["Bespin"][12].position.y = 120;
			
			that.mapPlanets["Geonosis"] = [
				"Geonosis",
				new PIXI.Sprite(planetTextures["Geonosis"][1]),
				new PIXI.Text(planetTextures["Geonosis"][0], that.planetBlueStyleText),
				new PIXI.Text(planetTextures["Geonosis"][0], that.planetRedStyleText),
				new PIXI.Graphics(),
				new PIXI.Sprite(heroesTextures["b1_battle_droid"][2]),
				new PIXI.Sprite(heroesTextures["dooku"][1]),
				new PIXI.Sprite(heroesTextures["red_battle_droid"][1]),
				new PIXI.Sprite(heroesTextures["republic_clone_army"][1]),
				new PIXI.Sprite(heroesTextures["poggle_the_lesser"][1]),
				new PIXI.Sprite(heroesTextures["saesee_tiin"][2]),
				new PIXI.Text("Союзник Джедай", that.planetBlueStyleText),
				new PIXI.Text("Пренадлежит Ситам", that.planetRedStyleText)
			];
			that.mapPlanets["Geonosis"][1].name = "Geonosis";
			that.mapPlanets["Geonosis"][1].position.x = 720; // 750 -30
			that.mapPlanets["Geonosis"][1].position.y = 600; 
			that.mapPlanets["Geonosis"][1].interactive = true; 
			that.mapPlanets["Geonosis"][1].buttonMode = true;
			that.mapPlanets["Geonosis"][1].scale.set(0.2);
			that.mapPlanets["Geonosis"][2].position.x = 760; 
			that.mapPlanets["Geonosis"][2].position.y = 575; 
			that.mapPlanets["Geonosis"][3].position.x = 760; 
			that.mapPlanets["Geonosis"][3].position.y = 575;
			that.mapPlanets["Geonosis"][4].lineStyle(1, 0xFFFFFF, 0.3);
			that.mapPlanets["Geonosis"][4].drawCircle(760, 639, 39);
			that.mapPlanets["Geonosis"][4].lineStyle(1, 0xFFFFFF, 1);
			that.mapPlanets["Geonosis"][4].moveTo(745, 620);
			that.mapPlanets["Geonosis"][4].lineTo(755, 595);
			that.mapPlanets["Geonosis"][4].moveTo(755, 595);
			that.mapPlanets["Geonosis"][4].lineTo(920, 595);
			that.mapPlanets["Geonosis"][5].position.x = 795; 
			that.mapPlanets["Geonosis"][5].position.y = 600;
			that.mapPlanets["Geonosis"][5].scale.set(0.18);
			that.mapPlanets["Geonosis"][6].position.x = 845; 
			that.mapPlanets["Geonosis"][6].position.y = 600;
			that.mapPlanets["Geonosis"][6].scale.set(0.19);
			that.mapPlanets["Geonosis"][7].position.x = 895; 
			that.mapPlanets["Geonosis"][7].position.y = 600;
			that.mapPlanets["Geonosis"][7].scale.set(0.18);
			that.mapPlanets["Geonosis"][8].position.x = 785; 
			that.mapPlanets["Geonosis"][8].position.y = 585;
			that.mapPlanets["Geonosis"][8].scale.set(0.23);
			that.mapPlanets["Geonosis"][9].position.x = 850; 
			that.mapPlanets["Geonosis"][9].position.y = 600;
			that.mapPlanets["Geonosis"][9].scale.set(0.18);
			that.mapPlanets["Geonosis"][10].position.x = 890; 
			that.mapPlanets["Geonosis"][10].position.y = 600;
			that.mapPlanets["Geonosis"][10].scale.set(0.18);
			that.mapPlanets["Geonosis"][11].position.x = 790; 
			that.mapPlanets["Geonosis"][11].position.y = 595; 
			that.mapPlanets["Geonosis"][12].position.x = 790; 
			that.mapPlanets["Geonosis"][12].position.y = 595; 
	
			that.mapPlanets["Alderaan"] = [
				"Alderaan",
				new PIXI.Sprite(planetTextures["Alderaan"][1]),
				new PIXI.Text(planetTextures["Alderaan"][0], that.planetBlueStyleText),
				new PIXI.Text(planetTextures["Alderaan"][0], that.planetRedStyleText),
				new PIXI.Graphics(),
				new PIXI.Sprite(heroesTextures["admiral_ozzel"][1]),
				new PIXI.Sprite(heroesTextures["stormtroopers"][1]),
				new PIXI.Sprite(heroesTextures["rune_haako"][1]),
				new PIXI.Sprite(heroesTextures["bail_organa"][1]),
				new PIXI.Sprite(heroesTextures["leia_organa"][1]),
				new PIXI.Sprite(heroesTextures["kapitan_antilles"][1]),
				new PIXI.Text("Союзник Джедай", that.planetBlueStyleText),
				new PIXI.Text("Пренадлежит Ситам", that.planetRedStyleText)
			];
			that.mapPlanets["Alderaan"][1].name = "Alderaan";
			that.mapPlanets["Alderaan"][1].position.x = 50; 
			that.mapPlanets["Alderaan"][1].position.y = 380;
			that.mapPlanets["Alderaan"][1].interactive = true; 
			that.mapPlanets["Alderaan"][1].buttonMode = true;
			that.mapPlanets["Alderaan"][1].scale.set(0.2);
			that.mapPlanets["Alderaan"][2].position.x = 90; 
			that.mapPlanets["Alderaan"][2].position.y = 355; 
			that.mapPlanets["Alderaan"][3].position.x = 90; 
			that.mapPlanets["Alderaan"][3].position.y = 355;
			that.mapPlanets["Alderaan"][4].lineStyle(1, 0xFFFFFF, 0.3);
			that.mapPlanets["Alderaan"][4].drawCircle(90, 420, 39);
			that.mapPlanets["Alderaan"][4].lineStyle(1, 0xFFFFFF, 1);
			that.mapPlanets["Alderaan"][4].moveTo(75, 400);
			that.mapPlanets["Alderaan"][4].lineTo(85, 375);
			that.mapPlanets["Alderaan"][4].moveTo(85, 375);
			that.mapPlanets["Alderaan"][4].lineTo(250, 375);
			that.mapPlanets["Alderaan"][5].position.x = 125; 
			that.mapPlanets["Alderaan"][5].position.y = 380;
			that.mapPlanets["Alderaan"][5].scale.set(0.18);
			that.mapPlanets["Alderaan"][6].position.x = 175; 
			that.mapPlanets["Alderaan"][6].position.y = 375;
			that.mapPlanets["Alderaan"][6].scale.set(0.2);
			that.mapPlanets["Alderaan"][7].position.x = 225; 
			that.mapPlanets["Alderaan"][7].position.y = 380;
			that.mapPlanets["Alderaan"][7].scale.set(0.18);
			that.mapPlanets["Alderaan"][8].position.x = 125; 
			that.mapPlanets["Alderaan"][8].position.y = 380;
			that.mapPlanets["Alderaan"][8].scale.set(0.18);
			that.mapPlanets["Alderaan"][9].position.x = 175; 
			that.mapPlanets["Alderaan"][9].position.y = 380;
			that.mapPlanets["Alderaan"][9].scale.set(0.17);
			that.mapPlanets["Alderaan"][10].position.x = 225; 
			that.mapPlanets["Alderaan"][10].position.y = 380;
			that.mapPlanets["Alderaan"][10].scale.set(0.18);
			that.mapPlanets["Alderaan"][11].position.x = 120; 
			that.mapPlanets["Alderaan"][11].position.y = 375; 
			that.mapPlanets["Alderaan"][12].position.x = 120; 
			that.mapPlanets["Alderaan"][12].position.y = 375;
	
			that.mapPlanets["Kamino"] = [
				"Kamino",
				new PIXI.Sprite(planetTextures["Kamino"][1]),
				new PIXI.Text(planetTextures["Kamino"][0], that.planetBlueStyleText),
				new PIXI.Text(planetTextures["Kamino"][0], that.planetRedStyleText),
				new PIXI.Graphics(),
				new PIXI.Sprite(heroesTextures["jango_fett"][1]),
				new PIXI.Sprite(heroesTextures["republic_clone_army"][1]),
				new PIXI.Sprite(heroesTextures["clone_commander_rex"][1]),
				new PIXI.Sprite(heroesTextures["plo_koon"][1]),
				new PIXI.Sprite(heroesTextures["clone_commander_bakara"][1]),
				new PIXI.Sprite(heroesTextures["clone_commander_neyo"][1]),
				new PIXI.Text("Союзник Джедай", that.planetBlueStyleText),
				new PIXI.Text("Пренадлежит Ситам", that.planetRedStyleText)
			];
			that.mapPlanets["Kamino"][1].name = "Kamino";
			that.mapPlanets["Kamino"][1].position.x = 400; 
			that.mapPlanets["Kamino"][1].position.y = 275; 
			that.mapPlanets["Kamino"][1].interactive = true; 
			that.mapPlanets["Kamino"][1].buttonMode = true;
			that.mapPlanets["Kamino"][1].scale.set(0.2);
			that.mapPlanets["Kamino"][2].position.x = 440; 
			that.mapPlanets["Kamino"][2].position.y = 250; 
			that.mapPlanets["Kamino"][3].position.x = 440; 
			that.mapPlanets["Kamino"][3].position.y = 250;
			that.mapPlanets["Kamino"][4].lineStyle(1, 0xFFFFFF, 0.3);
			that.mapPlanets["Kamino"][4].drawCircle(441, 315, 39);
			that.mapPlanets["Kamino"][4].lineStyle(1, 0xFFFFFF, 1);
			that.mapPlanets["Kamino"][4].moveTo(425, 295);
			that.mapPlanets["Kamino"][4].lineTo(435, 270);
			that.mapPlanets["Kamino"][4].moveTo(435, 270);
			that.mapPlanets["Kamino"][4].lineTo(600, 270);
			that.mapPlanets["Kamino"][5].position.x = 475; 
			that.mapPlanets["Kamino"][5].position.y = 275;
			that.mapPlanets["Kamino"][5].scale.set(0.18);
			that.mapPlanets["Kamino"][6].position.x = 515; 
			that.mapPlanets["Kamino"][6].position.y = 260;
			that.mapPlanets["Kamino"][6].scale.set(0.22);
			that.mapPlanets["Kamino"][7].position.x = 575; 
			that.mapPlanets["Kamino"][7].position.y = 275;
			that.mapPlanets["Kamino"][7].scale.set(0.18);
			that.mapPlanets["Kamino"][8].position.x = 475; 
			that.mapPlanets["Kamino"][8].position.y = 275;
			that.mapPlanets["Kamino"][8].scale.set(0.18);
			that.mapPlanets["Kamino"][9].position.x = 525; 
			that.mapPlanets["Kamino"][9].position.y = 275;
			that.mapPlanets["Kamino"][9].scale.set(0.18);
			that.mapPlanets["Kamino"][10].position.x = 575; 
			that.mapPlanets["Kamino"][10].position.y = 275;
			that.mapPlanets["Kamino"][10].scale.set(0.18);
			that.mapPlanets["Kamino"][11].position.x = 470; 
			that.mapPlanets["Kamino"][11].position.y = 270; 
			that.mapPlanets["Kamino"][12].position.x = 470; 
			that.mapPlanets["Kamino"][12].position.y = 270; 
	
			that.mapPlanets["DeathStar"] = [
				"DeathStar",
				new PIXI.Sprite(planetTextures["DeathStar"][1]),
				new PIXI.Text(planetTextures["DeathStar"][0], that.planetBlueStyleText),
				new PIXI.Text(planetTextures["DeathStar"][0], that.planetRedStyleText),
				new PIXI.Graphics(),
				new PIXI.Sprite(heroesTextures["darth_vader"][1]),
				new PIXI.Sprite(heroesTextures["darth_sidious"][1]),
				new PIXI.Sprite(heroesTextures["commander_jerjerrod"][1]),
				new PIXI.Sprite(heroesTextures["luke_skywalker"][1]),
				new PIXI.Sprite(heroesTextures["luke_skywalker"][1]),
				new PIXI.Sprite(heroesTextures["luke_skywalker"][1]),
				new PIXI.Text("Победа Джедай", that.planetBlueStyleText),
				new PIXI.Text("Орден Ситов", that.planetRedStyleText)
			];
			that.mapPlanets["DeathStar"][1].name = "DeathStar";
			that.mapPlanets["DeathStar"][1].position.x = 150;
			that.mapPlanets["DeathStar"][1].position.y = 245;
			that.mapPlanets["DeathStar"][1].interactive = true; 
			that.mapPlanets["DeathStar"][1].buttonMode = true;
			that.mapPlanets["DeathStar"][1].scale.set(0.2);
			that.mapPlanets["DeathStar"][2].position.x = 190; 
			that.mapPlanets["DeathStar"][2].position.y = 220; 
			that.mapPlanets["DeathStar"][3].position.x = 190; 
			that.mapPlanets["DeathStar"][3].position.y = 220;
			that.mapPlanets["DeathStar"][4].lineStyle(1, 0xFFFFFF, 0.3);
			that.mapPlanets["DeathStar"][4].drawCircle(190, 285, 39);
			that.mapPlanets["DeathStar"][4].lineStyle(1, 0xFFFFFF, 1);
			that.mapPlanets["DeathStar"][4].moveTo(175, 265);
			that.mapPlanets["DeathStar"][4].lineTo(185, 240);
			that.mapPlanets["DeathStar"][4].moveTo(185, 240);
			that.mapPlanets["DeathStar"][4].lineTo(350, 240);
			that.mapPlanets["DeathStar"][5].position.x = 225; 
			that.mapPlanets["DeathStar"][5].position.y = 245;
			that.mapPlanets["DeathStar"][5].scale.set(0.18);
			that.mapPlanets["DeathStar"][6].position.x = 275; 
			that.mapPlanets["DeathStar"][6].position.y = 240;
			that.mapPlanets["DeathStar"][6].scale.set(0.20);
			that.mapPlanets["DeathStar"][7].position.x = 325; 
			that.mapPlanets["DeathStar"][7].position.y = 245;
			that.mapPlanets["DeathStar"][7].scale.set(0.18);
			that.mapPlanets["DeathStar"][8].position.x = 225; 
			that.mapPlanets["DeathStar"][8].position.y = 245;
			that.mapPlanets["DeathStar"][8].scale.set(0.18);
			that.mapPlanets["DeathStar"][9].position.x = 275; 
			that.mapPlanets["DeathStar"][9].position.y = 245;
			that.mapPlanets["DeathStar"][9].scale.set(0.18);
			that.mapPlanets["DeathStar"][10].position.x = 325; 
			that.mapPlanets["DeathStar"][10].position.y = 245;
			that.mapPlanets["DeathStar"][10].scale.set(0.18);
			that.mapPlanets["DeathStar"][11].position.x = 220; 
			that.mapPlanets["DeathStar"][11].position.y = 240; 
			that.mapPlanets["DeathStar"][12].position.x = 220; 
			that.mapPlanets["DeathStar"][12].position.y = 240;
	
			that.mapPlanets["Utapau"] = [
				"Utapau",
				new PIXI.Sprite(planetTextures["Utapau"][1]),
				new PIXI.Text(planetTextures["Utapau"][0], that.planetBlueStyleText),
				new PIXI.Text(planetTextures["Utapau"][0], that.planetRedStyleText),
				new PIXI.Graphics(),
				new PIXI.Sprite(heroesTextures["separatists"][1]),
				new PIXI.Sprite(heroesTextures["general_grievous"][1]),
				new PIXI.Sprite(heroesTextures["clone_commander_cody"][1]),
				new PIXI.Sprite(heroesTextures["shaak_ti"][1]),
				new PIXI.Sprite(heroesTextures["tion_medon"][1]),
				new PIXI.Sprite(heroesTextures["bib_fortuna"][1]),
				new PIXI.Text("Союзник Джедай", that.planetBlueStyleText),
				new PIXI.Text("Пренадлежит Ситам", that.planetRedStyleText)
			];
			that.mapPlanets["Utapau"][1].name = "Utapau";
			that.mapPlanets["Utapau"][1].position.x = 700; 
			that.mapPlanets["Utapau"][1].position.y = 50; 
			that.mapPlanets["Utapau"][1].interactive = true; 
			that.mapPlanets["Utapau"][1].buttonMode = true;
			that.mapPlanets["Utapau"][1].scale.set(0.2);
			that.mapPlanets["Utapau"][2].position.x = 740; 
			that.mapPlanets["Utapau"][2].position.y = 25; 
			that.mapPlanets["Utapau"][3].position.x = 740; 
			that.mapPlanets["Utapau"][3].position.y = 25;
			that.mapPlanets["Utapau"][4].lineStyle(1, 0xFFFFFF, 0.3);
			that.mapPlanets["Utapau"][4].drawCircle(741, 90, 39);
			that.mapPlanets["Utapau"][4].lineStyle(1, 0xFFFFFF, 1);
			that.mapPlanets["Utapau"][4].moveTo(725, 70);
			that.mapPlanets["Utapau"][4].lineTo(735, 45);
			that.mapPlanets["Utapau"][4].moveTo(735, 45);
			that.mapPlanets["Utapau"][4].lineTo(900, 45);
			that.mapPlanets["Utapau"][5].position.x = 770; 
			that.mapPlanets["Utapau"][5].position.y = 40;
			that.mapPlanets["Utapau"][5].scale.set(0.22);
			that.mapPlanets["Utapau"][6].position.x = 820; 
			that.mapPlanets["Utapau"][6].position.y = 40;
			that.mapPlanets["Utapau"][6].scale.set(0.25);
			that.mapPlanets["Utapau"][7].position.x = 875; 
			that.mapPlanets["Utapau"][7].position.y = 50;
			that.mapPlanets["Utapau"][7].scale.set(0.18);
			that.mapPlanets["Utapau"][8].position.x = 775; 
			that.mapPlanets["Utapau"][8].position.y = 50;
			that.mapPlanets["Utapau"][8].scale.set(0.18);
			that.mapPlanets["Utapau"][9].position.x = 825; 
			that.mapPlanets["Utapau"][9].position.y = 50;
			that.mapPlanets["Utapau"][9].scale.set(0.18);
			that.mapPlanets["Utapau"][10].position.x = 875; 
			that.mapPlanets["Utapau"][10].position.y = 50;
			that.mapPlanets["Utapau"][10].scale.set(0.18);
			that.mapPlanets["Utapau"][11].position.x = 770; 
			that.mapPlanets["Utapau"][11].position.y = 45; 
			that.mapPlanets["Utapau"][12].position.x = 770; 
			that.mapPlanets["Utapau"][12].position.y = 45; 
	
			that.mapPlanets["Saleucami"] = [
				"Saleucami",
				new PIXI.Sprite(planetTextures["Saleucami"][1]),
				new PIXI.Text(planetTextures["Saleucami"][0], that.planetBlueStyleText),
				new PIXI.Text(planetTextures["Saleucami"][0], that.planetRedStyleText),
				new PIXI.Graphics(),
				new PIXI.Sprite(heroesTextures["clone_commander_rex"][1]),
				new PIXI.Sprite(heroesTextures["general_grievous"][1]),
				new PIXI.Sprite(heroesTextures["b1_battle_droid"][1]),
				new PIXI.Sprite(heroesTextures["eeth_koth"][1]),
				new PIXI.Sprite(heroesTextures["mon_motma"][1]),
				new PIXI.Sprite(heroesTextures["c_3po"][2]),
				new PIXI.Text("Союзник Джедай", that.planetBlueStyleText),
				new PIXI.Text("Пренадлежит Ситам", that.planetRedStyleText)
			];
			that.mapPlanets["Saleucami"][1].name = "Saleucami";
			that.mapPlanets["Saleucami"][1].position.x = 810;
			that.mapPlanets["Saleucami"][1].position.y = 155;
			that.mapPlanets["Saleucami"][1].interactive = true; 
			that.mapPlanets["Saleucami"][1].buttonMode = true;
			that.mapPlanets["Saleucami"][1].scale.set(0.2);
			that.mapPlanets["Saleucami"][2].position.x = 850; 
			that.mapPlanets["Saleucami"][2].position.y = 130; 
			that.mapPlanets["Saleucami"][3].position.x = 850; 
			that.mapPlanets["Saleucami"][3].position.y = 130;
			that.mapPlanets["Saleucami"][4].lineStyle(1, 0xFFFFFF, 0.3);
			that.mapPlanets["Saleucami"][4].drawCircle(850, 195, 39);
			that.mapPlanets["Saleucami"][4].lineStyle(1, 0xFFFFFF, 1);
			that.mapPlanets["Saleucami"][4].moveTo(835, 175);
			that.mapPlanets["Saleucami"][4].lineTo(845, 150);
			that.mapPlanets["Saleucami"][4].moveTo(845, 150);
			that.mapPlanets["Saleucami"][4].lineTo(1010, 150);
			that.mapPlanets["Saleucami"][5].position.x = 885; 
			that.mapPlanets["Saleucami"][5].position.y = 155;
			that.mapPlanets["Saleucami"][5].scale.set(0.18);
			that.mapPlanets["Saleucami"][6].position.x = 930; 
			that.mapPlanets["Saleucami"][6].position.y = 140;
			that.mapPlanets["Saleucami"][6].scale.set(0.25);
			that.mapPlanets["Saleucami"][7].position.x = 985; 
			that.mapPlanets["Saleucami"][7].position.y = 155;
			that.mapPlanets["Saleucami"][7].scale.set(0.18);
			that.mapPlanets["Saleucami"][8].position.x = 885; 
			that.mapPlanets["Saleucami"][8].position.y = 155;
			that.mapPlanets["Saleucami"][8].scale.set(0.18);
			that.mapPlanets["Saleucami"][9].position.x = 935; 
			that.mapPlanets["Saleucami"][9].position.y = 155;
			that.mapPlanets["Saleucami"][9].scale.set(0.18);
			that.mapPlanets["Saleucami"][10].position.x = 985; 
			that.mapPlanets["Saleucami"][10].position.y = 155;
			that.mapPlanets["Saleucami"][10].scale.set(0.18);
			that.mapPlanets["Saleucami"][11].position.x = 880; 
			that.mapPlanets["Saleucami"][11].position.y = 150; 
			that.mapPlanets["Saleucami"][12].position.x = 880; 
			that.mapPlanets["Saleucami"][12].position.y = 150;
	
			that.mapPlanets["Jakku"] = [
				"Jakku",                                                                                        // 0 - наименование
				new PIXI.Sprite(planetTextures["Jakku"][1]),                                                    // 1 - текстура планеты
				new PIXI.Text(planetTextures["Jakku"][0], that.planetBlueStyleText),                             // 2 - имя планеты (свет)
				new PIXI.Text(planetTextures["Jakku"][0], that.planetRedStyleText),                              // 3 - имя планеты (тьма)
				new PIXI.Graphics(),                                                                            // 4 - графика
				new PIXI.Sprite(heroesTextures["kylo_ren"][1]),                                                 // 5 - персонаж (тьма)
				new PIXI.Sprite(heroesTextures["phasma"][1]),                                                   // 6 - персонажи (тьма)
				new PIXI.Sprite(heroesTextures["stormtrooper_1"][1]),                                           // 7 - персонажи (тьма)
				new PIXI.Sprite(heroesTextures["rey"][1]),                                                      // 8 - персонажи (свет)
				new PIXI.Sprite(heroesTextures["finn"][1]),                                                     // 9 - персонажи (свет)
				new PIXI.Sprite(heroesTextures["poe_dameron"][1]),                                              // 10 - персонажи (свет)
				new PIXI.Text("Союзник Джедай", that.planetBlueStyleText),                                       // 11
				new PIXI.Text("Пренадлежит Ситам", that.planetRedStyleText)                                      // 12
			];
			that.mapPlanets["Jakku"][1].name = "Jakku";
			that.mapPlanets["Jakku"][1].position.x = 450; 
			that.mapPlanets["Jakku"][1].position.y = 75; 
			that.mapPlanets["Jakku"][1].interactive = true; 
			that.mapPlanets["Jakku"][1].buttonMode = true;
			that.mapPlanets["Jakku"][1].scale.set(0.2);
			that.mapPlanets["Jakku"][2].position.x = 490; 
			that.mapPlanets["Jakku"][2].position.y = 50; 
			that.mapPlanets["Jakku"][3].position.x = 490; 
			that.mapPlanets["Jakku"][3].position.y = 50;
			that.mapPlanets["Jakku"][4].lineStyle(1, 0xFFFFFF, 0.3);
			that.mapPlanets["Jakku"][4].drawCircle(491, 115, 39);
			that.mapPlanets["Jakku"][4].lineStyle(1, 0xFFFFFF, 1);
			that.mapPlanets["Jakku"][4].moveTo(475, 95);
			that.mapPlanets["Jakku"][4].lineTo(485, 70);
			that.mapPlanets["Jakku"][4].moveTo(485, 70);
			that.mapPlanets["Jakku"][4].lineTo(650, 70);
			that.mapPlanets["Jakku"][5].position.x = 525; 
			that.mapPlanets["Jakku"][5].position.y = 75;
			that.mapPlanets["Jakku"][5].scale.set(0.18);
			that.mapPlanets["Jakku"][6].position.x = 575; 
			that.mapPlanets["Jakku"][6].position.y = 75;
			that.mapPlanets["Jakku"][6].scale.set(0.18);
			that.mapPlanets["Jakku"][7].position.x = 625; 
			that.mapPlanets["Jakku"][7].position.y = 75;
			that.mapPlanets["Jakku"][7].scale.set(0.18);
			that.mapPlanets["Jakku"][8].position.x = 525; 
			that.mapPlanets["Jakku"][8].position.y = 75;
			that.mapPlanets["Jakku"][8].scale.set(0.18);
			that.mapPlanets["Jakku"][9].position.x = 575; 
			that.mapPlanets["Jakku"][9].position.y = 75;
			that.mapPlanets["Jakku"][9].scale.set(0.18);
			that.mapPlanets["Jakku"][10].position.x = 625; 
			that.mapPlanets["Jakku"][10].position.y = 75;
			that.mapPlanets["Jakku"][10].scale.set(0.18);
			that.mapPlanets["Jakku"][11].position.x = 520; 
			that.mapPlanets["Jakku"][11].position.y = 70; 
			that.mapPlanets["Jakku"][12].position.x = 520; 
			that.mapPlanets["Jakku"][12].position.y = 70;
		},
		
		initMessage: function()
		{
			that.mapMessage = new Object();
			that.mapMessage["LastNews"] = ["Меня зовут R2D2, рад вас приветствовать.\n\nКорусант является основной целью Ситов.", "Меня зовут R3-S6, приветствую тебя мой повелитель. \n\nДжедаи хотят разрушить Звезду смерти и помешать нашим планам."];
			that.mapMessage["Coruscant"] = ["Корусант\nКорусант, так же известный как Центр Империи или Королева Ядра — сверкающая планета. Корусант тысячелетиями был политическим центром Галактики.\n\nВы должны защетить Корусант любой ценой иначе битва будет проиграна!", "Корусант\nКорусант, так же известный как Центр Империи или Королева Ядра — сверкающая планета. Корусант тысячелетиями был политическим центром Галактики.\n\nМой повелитель мы должны уничтожить Корусант чтобы победить!"];
			that.mapMessage["Totooine"] = ["Татуин\n\nДалекий от бдительных глаз Галактической Империи, Татуин стал пристанищем для различного рода авантюристов — контрабандистов, наёмников, охотников за головами. \nМесто рождения Энакина Скайуокера.", "Татуин\n\nДалекий от бдительных глаз Галактической Империи, Татуин стал пристанищем для различного рода авантюристов — контрабандистов, наёмников, охотников за головами. \nМесто рождения Энакина Скайуокера."];
			that.mapMessage["Naboo"] = ["Набу\n\nНабу населена двумя независимыми друг от друга обществами — гунганами, обитающими в подводных городах, и набуанцами - людьми. Родной мир Падме Амидалы Наберри и Джа Джа Бинкса, а также сенатора и будущего императора Палпатина.", "Набу\n\nНабу населена двумя независимыми друг от друга обществами — гунганами, обитающими в подводных городах, и набуанцами - людьми. Родной мир Падме Амидалы Наберри и Джа Джа Бинкса, а также сенатора и будущего императора Палпатина."];
			that.mapMessage["Endor"] = ["Эндор\n\nГазовый гигант, вращавшийся вокруг звезды Иблим во Внешнем Кольце. Галактическая Империя создала Запретный путепровод, чтобы быстро добираться до окрестностей планеты.", "Эндор\n\nГазовый гигант, вращавшийся вокруг звезды Иблим во Внешнем Кольце. Галактическая Империя создала Запретный путепровод, чтобы быстро добираться до окрестностей планеты."];
			that.mapMessage["Hoth"] = ["Хот\n\nПоверхность планеты - одна непрерывная корка льда и снега. \n\nХот не нанесен на большинство карт звездного неба, тем самым делая эту планету очень удобной для мятежников.", "Хот\n\nПоверхность планеты - одна непрерывная корка льда и снега. \n\nХот не нанесен на большинство карт звездного неба, тем самым делая эту планету очень удобной для мятежников."];
			that.mapMessage["Mustafar"] = ["Мустафар\n\nМаленький вулканический мир, где лава добывалась как ценный ресурс. Он также являлся последней столицей Конфедерации Независимых Систем.", "Мустафар\n\nМаленький вулканический мир, где лава добывалась как ценный ресурс. Он также являлся последней столицей Конфедерации Независимых Систем."];
			that.mapMessage["Dagobah"] = ["Дагоба\n\nДагоба — это суровая, влажная планета, практически полностью покрытая топями, перемежающимися с душными лесами.", "Дагоба\n\nДагоба — это суровая, влажная планета, практически полностью покрытая топями, перемежающимися с душными лесами."];
			that.mapMessage["Bespin"] = ["Беспин\n\nБеспин – это газовый гигант из системы Беспин сектора Аноат Внешнего Кольца. Планета являлась важным источником газа.", "Беспин\n\nБеспин – это газовый гигант из системы Беспин сектора Аноат Внешнего Кольца. Планета являлась важным источником газа."];
			that.mapMessage["Geonosis"] = ["Джеонозис\n\nРодная планета джеонозийцев, первая столица Конфедерации независимых систем и главный центр производства дроидов.", "Джеонозис\n\nРодная планета джеонозийцев, первая столица Конфедерации независимых систем и главный центр производства дроидов."];
			that.mapMessage["Alderaan"] = ["Альдераан\n\nАльдераан, родной дом для многих знаменитых героев, включая Лею Органу Соло, Бейла Органу и Улика Кель-Дрому. Известные по всей Галактике своей безупречной красотой, утончённой культурой.", "Альдераан\n\nАльдераан, родной дом для многих знаменитых героев, включая Лею Органу Соло, Бейла Органу и Улика Кель-Дрому. Известные по всей Галактике своей безупречной красотой, утончённой культурой."];
			that.mapMessage["Kamino"] = ["Камино\n\nКамино — водный мир, где была произведена армия клонов для Галактической Республики, позже ставшая имперским штурмовым корпусом, Каминоанский флот обороны.", "Камино\n\nКамино — водный мир, где была произведена армия клонов для Галактической Республики, позже ставшая имперским штурмовым корпусом, Каминоанский флот обороны."];
			that.mapMessage["DeathStar"] = ["Звезда смерти\n\nЗвезда Смерти супероружием шарообразной формы. \n\nНаша главная цель уничтожить Звезду Смерти и Дарт Вейдера. \nТолько так мы победим в войне с тёмной силой!", "Звезда смерти\n\nЗвезда Смерти супероружием шарообразной формы. \n\nМой повелитель мы должны уберечь Звезду Смерти от Джедаев, иначе битва будет проиграна."];
			that.mapMessage["Utapau"] = ["Утапау была населена двумя разумными видами: высокими, серокожими, медлительными, хрупковатыми на вид пау'анами, получившими прозвище «древний народ» за долгую продолжительность жизни, и коренастыми, низкорослыми утаями, прозванными «коротышками».", "Утапау была населена двумя разумными видами: высокими, серокожими, медлительными, хрупковатыми на вид пау'анами, получившими прозвище «древний народ» за долгую продолжительность жизни, и коренастыми, низкорослыми утаями, прозванными «коротышками»."];
			that.mapMessage["Saleucami"] = ["Салукемай\n\nСалукемай был тусклым, засушливым миром с разбросанными оазисами растений. Планета находилась на пути Талеского транзита, по которому поставлялись грузы по Перлемианскому торговому маршруту.", "Салукемай\n\nСалукемай был тусклым, засушливым миром с разбросанными оазисами растений. Планета находилась на пути Талеского транзита, по которому поставлялись грузы по Перлемианскому торговому маршруту."];
			that.mapMessage["Jakku"] = ["Джакку - представлял собой изолированный пустынный мир, который на севере пересекали Колёсные пути, а через всю планету шли горнодобывающие карьеры. В пустошах можно встретить отшельников, а также мусорщиков, которые перевозили своё добро на лаггабистах.", "Джакку - представлял собой изолированный пустынный мир, который на севере пересекали Колёсные пути, а через всю планету шли горнодобывающие карьеры. В пустошах можно встретить отшельников, а также мусорщиков, которые перевозили своё добро на лаггабистах."];
		},
		
		initPersonages: function()
		{
			that.personages = new Object();
			for (var key in personagesJson.data.Personages.personage)
			{
				that.personages[personagesJson.data.Personages.personage[key].id] = new that.Personage(personagesJson.data.Personages.personage[key].id, personagesJson.data.Personages.personage[key].name);
				that.personages[personagesJson.data.Personages.personage[key].id].life = personagesJson.data.Personages.personage[key].life;
				that.personages[personagesJson.data.Personages.personage[key].id].hitAttack1 = personagesJson.data.Personages.personage[key].hit1;
				that.personages[personagesJson.data.Personages.personage[key].id].hitAttack2 = personagesJson.data.Personages.personage[key].hit2;
				that.personages[personagesJson.data.Personages.personage[key].id].hitAttack3 = personagesJson.data.Personages.personage[key].hit3;
				that.personages[personagesJson.data.Personages.personage[key].id].hitAttack4 = personagesJson.data.Personages.personage[key].hit4;
				that.personages[personagesJson.data.Personages.personage[key].id].hitAttack5 = personagesJson.data.Personages.personage[key].hit5;
				that.personages[personagesJson.data.Personages.personage[key].id].hitDefense1 = personagesJson.data.Personages.personage[key].hit1;
				that.personages[personagesJson.data.Personages.personage[key].id].hitDefense2 = personagesJson.data.Personages.personage[key].hit2;
				that.personages[personagesJson.data.Personages.personage[key].id].hitDefense3 = personagesJson.data.Personages.personage[key].hit3;
				that.personages[personagesJson.data.Personages.personage[key].id].hitDefense4 = personagesJson.data.Personages.personage[key].hit4;
				that.personages[personagesJson.data.Personages.personage[key].id].hitDefense5 = personagesJson.data.Personages.personage[key].hit5;
				that.personages[personagesJson.data.Personages.personage[key].id].planet = "";
				that.personages[personagesJson.data.Personages.personage[key].id].status = personagesJson.data.Personages.personage[key].status;
				that.personages[personagesJson.data.Personages.personage[key].id].description = personagesJson.data.Personages.personage[key].description;
			}
		},
		
		initPlanets: function()
		{
			that.planets = new Object();
			for (var key in planetsJson.data.Planets.planet)
			{
				that.planets[planetsJson.data.Planets.planet[key].id] = new that.Planet(planetsJson.data.Planets.planet[key].id, planetsJson.data.Planets.planet[key].name);
				that.planets[planetsJson.data.Planets.planet[key].id].bluePersonage1 = planetsJson.data.Planets.planet[key].bluePersonage1;
				that.planets[planetsJson.data.Planets.planet[key].id].bluePersonage2 = planetsJson.data.Planets.planet[key].bluePersonage2;
				that.planets[planetsJson.data.Planets.planet[key].id].bluePersonage3 = planetsJson.data.Planets.planet[key].bluePersonage3;
				that.planets[planetsJson.data.Planets.planet[key].id].blueRewardPersonage1 = planetsJson.data.Planets.planet[key].bluePersonage1;
				that.planets[planetsJson.data.Planets.planet[key].id].blueRewardPersonage2 = planetsJson.data.Planets.planet[key].bluePersonage2;
				that.planets[planetsJson.data.Planets.planet[key].id].blueRewardPersonage3 = planetsJson.data.Planets.planet[key].bluePersonage3;
				
				that.planets[planetsJson.data.Planets.planet[key].id].redPersonage1 = planetsJson.data.Planets.planet[key].redPersonage1;
				that.planets[planetsJson.data.Planets.planet[key].id].redPersonage2 = planetsJson.data.Planets.planet[key].redPersonage2;
				that.planets[planetsJson.data.Planets.planet[key].id].redPersonage3 = planetsJson.data.Planets.planet[key].redPersonage3;
				that.planets[planetsJson.data.Planets.planet[key].id].redRewardPersonage1 = planetsJson.data.Planets.planet[key].redPersonage1;
				that.planets[planetsJson.data.Planets.planet[key].id].redRewardPersonage2 = planetsJson.data.Planets.planet[key].redPersonage2;
				that.planets[planetsJson.data.Planets.planet[key].id].redRewardPersonage3 = planetsJson.data.Planets.planet[key].redPersonage3;
				
				that.planets[planetsJson.data.Planets.planet[key].id].status = planetsJson.data.Planets.planet[key].status;
				that.planets[planetsJson.data.Planets.planet[key].id].description = planetsJson.data.Planets.planet[key].description;
			}
		},
		
		initCommandUser: function()
		{
			that.commandUser = new Object();
			if(dataSide === that.SIDE_JEDI)
			{
				that.commandUser["personage1"] = that.planets["Coruscant"].bluePersonage1;
				that.personages[that.planets["Coruscant"].bluePersonage1].status = that.USER_PERSONAGE_AVAILABLE;
				that.personages[that.planets["Coruscant"].bluePersonage1].command = true;
				that.commandUser["personage2"] = that.planets["Coruscant"].bluePersonage2;
				that.personages[that.planets["Coruscant"].bluePersonage2].status = that.USER_PERSONAGE_AVAILABLE;
				that.personages[that.planets["Coruscant"].bluePersonage2].command = true;
				that.commandUser["personage3"] = that.planets["Coruscant"].bluePersonage3;
				that.personages[that.planets["Coruscant"].bluePersonage3].status = that.USER_PERSONAGE_AVAILABLE;
				that.personages[that.planets["Coruscant"].bluePersonage3].command = true;
			}
			if(dataSide === that.SIDE_SITH)
			{
				that.commandUser["personage1"] = that.planets["DeathStar"].redPersonage1;
				that.personages[that.planets["DeathStar"].redPersonage1].status = that.USER_PERSONAGE_AVAILABLE;
				that.personages[that.planets["DeathStar"].redPersonage1].command = true;
				that.commandUser["personage2"] = that.planets["DeathStar"].redPersonage2;
				that.personages[that.planets["DeathStar"].redPersonage2].status = that.USER_PERSONAGE_AVAILABLE;
				that.personages[that.planets["DeathStar"].redPersonage2].command = true;
				that.commandUser["personage3"] = that.planets["DeathStar"].redPersonage3;
				that.personages[that.planets["DeathStar"].redPersonage3].status = that.USER_PERSONAGE_AVAILABLE;
				that.personages[that.planets["DeathStar"].redPersonage3].command = true;
			}
		},
		
		initCommandAI: function()
		{
			that.commandAI = new Object();
			if(dataSide === that.SIDE_JEDI)
			{
				that.commandAI["personage1"] = that.planets["DeathStar"].redPersonage1;
                                                                        that.personages[that.planets["DeathStar"].redPersonage1].status = that.AI_PERSONAGE_AVAILABLE;
				that.commandAI["personage2"] = that.planets["DeathStar"].redPersonage2;
                                                                        that.personages[that.planets["DeathStar"].redPersonage2].status = that.AI_PERSONAGE_AVAILABLE;
				that.commandAI["personage3"] = that.planets["DeathStar"].redPersonage3;
                                                                        that.personages[that.planets["DeathStar"].redPersonage3].status = that.AI_PERSONAGE_AVAILABLE;
			}
			if(dataSide === that.SIDE_SITH)
			{
				that.commandAI["personage1"] = that.planets["Coruscant"].bluePersonage1;
                                                                        that.personages[that.planets["Coruscant"].bluePersonage1].status = that.AI_PERSONAGE_AVAILABLE;
				that.commandAI["personage2"] = that.planets["Coruscant"].bluePersonage2;
                                                                        that.personages[that.planets["Coruscant"].bluePersonage2].status = that.AI_PERSONAGE_AVAILABLE;
				that.commandAI["personage3"] = that.planets["Coruscant"].bluePersonage3;
                                                                        that.personages[that.planets["Coruscant"].bluePersonage3].status = that.AI_PERSONAGE_AVAILABLE;
			}
		},
		
		randomIndex: function()
		{
			var indexRandom = Math.random() / 0.1;
			var index = Math.round(indexRandom);
			return index;
		},
		
		randomCharacteristic: function(valueArray)
		{
			var index = that.randomIndex();
			if (index >= 0 && index <= 3) return valueArray[0];
			if (index >= 4 && index <= 7) return valueArray[1];
			if (index >= 8 && index <= 10) return valueArray[2];
		},
		
		initLevels: function()
		{
			var index1 = 0;
			var index2 = 0;
			var planets = ["Coruscant", "Totooine", "Naboo", "Endor", "Hoth", "Mustafar", "Dagobah", "Bespin", "Geonosis", "Alderaan", "Kamino", "DeathStar", "Utapau", "Saleucami", "Jakku"];
    
			var levelsJson = new Object();
			for(var key in fieldLevelsJson)
			{
			   levelsJson[key] = fieldLevelsJson[key];
			}
		   
			that.levels = new Object();
			for(var i in planets)
			{
				do{
					index1 = that.randomIndex();
					if(index1 < 5) index1 = 1;
					else index1 = 2;
					index2 = that.randomIndex();
				} while(levelsJson["level_" + index1 + "_" + index2] === undefined)
				
				that.levels[planets[i]] = fieldLevelsJson["level_" + index1 + "_" + index2];
				delete levelsJson["level_" + index1 + "_" + index2];
			}
		},
		
		initCharacteristics: function()
		{
			    var characteristicsUser = new Object();
				characteristicsUser["planet-1"] = [2,3,4];
				characteristicsUser["planet-2"] = [3,4,5];
				characteristicsUser["planet-3"] = [4,5,6];
				characteristicsUser["planet-4"] = [5,6,7];
				characteristicsUser["planet-5"] = [6,7,8];
				characteristicsUser["planet-6"] = [7,8,9];
				characteristicsUser["planet-7"] = [8,9,10];
				characteristicsUser["planet-8"] = [9,10,11];
				characteristicsUser["planet-9"] = [10,11,12];
				characteristicsUser["planet-10"] = [11,12,13];
				characteristicsUser["planet-11"] = [12,13,14];
				characteristicsUser["planet-12"] = [13,14,15];
				characteristicsUser["planet-13"] = [14,15,16];    
				characteristicsUser["planet-14"] = [15,16,17];
				characteristicsUser["planet-15"] = [16,17,18]; 
				
				var characteristicsAI = new Object();
				characteristicsAI["planet-1"] = [2,3,4];
				characteristicsAI["planet-2"] = [3,4,5];
				characteristicsAI["planet-3"] = [4,5,6];
				characteristicsAI["planet-4"] = [5,6,7];
				characteristicsAI["planet-5"] = [6,7,8];
				characteristicsAI["planet-6"] = [7,8,9];
				characteristicsAI["planet-7"] = [8,9,10];
				characteristicsAI["planet-8"] = [9,10,11];
				characteristicsAI["planet-9"] = [10,11,12];
				characteristicsAI["planet-10"] = [11,12,13];
				characteristicsAI["planet-11"] = [12,13,14];
				characteristicsAI["planet-12"] = [13,14,15];
				characteristicsAI["planet-13"] = [14,15,16];    
				characteristicsAI["planet-14"] = [15,16,17];
				characteristicsAI["planet-15"] = [16,17,18];  

				if(dataSide === that.SIDE_JEDI)
				{
					for(var key in that.planets)
					{
						var bluePersonage = [];
						var blueRewardPersonage = [];
						var redPersonage = [];
						var redRewardPersonage = [];
						
						if(key === "Coruscant")
						{
							bluePersonage = characteristicsUser["planet-15"];       // моя защита от ИИ
							blueRewardPersonage = characteristicsUser["planet-1"];  // моя команда
							
							redPersonage = characteristicsAI["planet-1"];           // не имеет значения
							redRewardPersonage = characteristicsAI["planet-15"];    // союзники ИИ
						}else{
							if(key === "DeathStar")
							{
								bluePersonage = characteristicsUser["planet-1"];        // не имеет значения
								blueRewardPersonage = characteristicsUser["planet-15"]; // мои соющники

								redPersonage = characteristicsAI["planet-15"];          // защита ИИ от меня
								redRewardPersonage = characteristicsAI["planet-1"];     // не имеет значения

								delete characteristicsUser["planet-1"];
								delete characteristicsUser["planet-15"];
								delete characteristicsAI["planet-1"];
								delete characteristicsAI["planet-15"];
							}else{
								var count = Object.keys(characteristicsUser).length;
								var index;
								var resultUser;
								var resultAI;

								index = that.randomIndex();
								if(index > count) resultUser = index - count;
								else resultUser = count - index;
								if(resultUser >= count) resultUser = 0;
								
								index = that.randomIndex();
								if(index > count) resultAI = index - count;
								else resultAI = count - index;
								if(resultAI >= count) resultAI = 0;

								bluePersonage = characteristicsUser[Object.keys(characteristicsUser)[resultUser]];	// моя защита
								redPersonage = characteristicsAI[Object.keys(characteristicsAI)[resultAI]];	// защита ИИ
								
								blueRewardPersonage = characteristicsAI[Object.keys(characteristicsAI)[resultAI]]; 	// мои соющники = защита ИИ
								redRewardPersonage = characteristicsUser[Object.keys(characteristicsUser)[resultUser]];		// союзники ИИ = моя защита
								
								delete characteristicsUser[Object.keys(characteristicsUser)[resultUser]];
								delete characteristicsAI[Object.keys(characteristicsAI)[resultAI]];
							}
						}
						
						that.personages[that.planets[key].bluePersonage1].hitAttack1 = that.randomCharacteristic(bluePersonage);
						that.personages[that.planets[key].bluePersonage1].hitAttack2 = that.randomCharacteristic(bluePersonage);
						that.personages[that.planets[key].bluePersonage1].hitAttack3 = that.randomCharacteristic(bluePersonage);
						that.personages[that.planets[key].bluePersonage1].hitAttack4 = that.randomCharacteristic(bluePersonage);
						that.personages[that.planets[key].bluePersonage1].hitAttack5 = that.randomCharacteristic(bluePersonage);
						that.personages[that.planets[key].bluePersonage2].hitAttack1 = that.randomCharacteristic(bluePersonage);
						that.personages[that.planets[key].bluePersonage2].hitAttack2 = that.randomCharacteristic(bluePersonage);
						that.personages[that.planets[key].bluePersonage2].hitAttack3 = that.randomCharacteristic(bluePersonage);
						that.personages[that.planets[key].bluePersonage2].hitAttack4 = that.randomCharacteristic(bluePersonage);
						that.personages[that.planets[key].bluePersonage2].hitAttack5 = that.randomCharacteristic(bluePersonage);
						that.personages[that.planets[key].bluePersonage3].hitAttack1 = that.randomCharacteristic(bluePersonage);
						that.personages[that.planets[key].bluePersonage3].hitAttack2 = that.randomCharacteristic(bluePersonage);
						that.personages[that.planets[key].bluePersonage3].hitAttack3 = that.randomCharacteristic(bluePersonage);
						that.personages[that.planets[key].bluePersonage3].hitAttack4 = that.randomCharacteristic(bluePersonage);
						that.personages[that.planets[key].bluePersonage3].hitAttack5 = that.randomCharacteristic(bluePersonage);
						
						that.personages[that.planets[key].blueRewardPersonage1].hitDefense1 = that.randomCharacteristic(blueRewardPersonage);
						that.personages[that.planets[key].blueRewardPersonage1].hitDefense2 = that.randomCharacteristic(blueRewardPersonage);
						that.personages[that.planets[key].blueRewardPersonage1].hitDefense3 = that.randomCharacteristic(blueRewardPersonage);
						that.personages[that.planets[key].blueRewardPersonage1].hitDefense4 = that.randomCharacteristic(blueRewardPersonage);
						that.personages[that.planets[key].blueRewardPersonage1].hitDefense5 = that.randomCharacteristic(blueRewardPersonage);
						that.personages[that.planets[key].blueRewardPersonage2].hitDefense1 = that.randomCharacteristic(blueRewardPersonage);
						that.personages[that.planets[key].blueRewardPersonage2].hitDefense2 = that.randomCharacteristic(blueRewardPersonage);
						that.personages[that.planets[key].blueRewardPersonage2].hitDefense3 = that.randomCharacteristic(blueRewardPersonage);
						that.personages[that.planets[key].blueRewardPersonage2].hitDefense4 = that.randomCharacteristic(blueRewardPersonage);
						that.personages[that.planets[key].blueRewardPersonage2].hitDefense5 = that.randomCharacteristic(blueRewardPersonage);
						that.personages[that.planets[key].blueRewardPersonage3].hitDefense1 = that.randomCharacteristic(blueRewardPersonage);
						that.personages[that.planets[key].blueRewardPersonage3].hitDefense2 = that.randomCharacteristic(blueRewardPersonage);
						that.personages[that.planets[key].blueRewardPersonage3].hitDefense3 = that.randomCharacteristic(blueRewardPersonage);
						that.personages[that.planets[key].blueRewardPersonage3].hitDefense4 = that.randomCharacteristic(blueRewardPersonage);
						that.personages[that.planets[key].blueRewardPersonage3].hitDefense5 = that.randomCharacteristic(blueRewardPersonage);
						
						that.personages[that.planets[key].redPersonage1].hitAttack1 = that.randomCharacteristic(redPersonage);
						that.personages[that.planets[key].redPersonage1].hitAttack2 = that.randomCharacteristic(redPersonage);
						that.personages[that.planets[key].redPersonage1].hitAttack3 = that.randomCharacteristic(redPersonage);
						that.personages[that.planets[key].redPersonage1].hitAttack4 = that.randomCharacteristic(redPersonage);
						that.personages[that.planets[key].redPersonage1].hitAttack5 = that.randomCharacteristic(redPersonage);
						that.personages[that.planets[key].redPersonage2].hitAttack1 = that.randomCharacteristic(redPersonage);
						that.personages[that.planets[key].redPersonage2].hitAttack2 = that.randomCharacteristic(redPersonage);
						that.personages[that.planets[key].redPersonage2].hitAttack3 = that.randomCharacteristic(redPersonage);
						that.personages[that.planets[key].redPersonage2].hitAttack4 = that.randomCharacteristic(redPersonage);
						that.personages[that.planets[key].redPersonage2].hitAttack5 = that.randomCharacteristic(redPersonage);
						that.personages[that.planets[key].redPersonage3].hitAttack1 = that.randomCharacteristic(redPersonage);
						that.personages[that.planets[key].redPersonage3].hitAttack2 = that.randomCharacteristic(redPersonage);
						that.personages[that.planets[key].redPersonage3].hitAttack3 = that.randomCharacteristic(redPersonage);
						that.personages[that.planets[key].redPersonage3].hitAttack4 = that.randomCharacteristic(redPersonage);
						that.personages[that.planets[key].redPersonage3].hitAttack5 = that.randomCharacteristic(redPersonage);
						
						that.personages[that.planets[key].redRewardPersonage1].hitDefense1 = that.randomCharacteristic(redRewardPersonage);
						that.personages[that.planets[key].redRewardPersonage1].hitDefense2 = that.randomCharacteristic(redRewardPersonage);
						that.personages[that.planets[key].redRewardPersonage1].hitDefense3 = that.randomCharacteristic(redRewardPersonage);
						that.personages[that.planets[key].redRewardPersonage1].hitDefense4 = that.randomCharacteristic(redRewardPersonage);
						that.personages[that.planets[key].redRewardPersonage1].hitDefense5 = that.randomCharacteristic(redRewardPersonage);
						that.personages[that.planets[key].redRewardPersonage2].hitDefense1 = that.randomCharacteristic(redRewardPersonage);
						that.personages[that.planets[key].redRewardPersonage2].hitDefense2 = that.randomCharacteristic(redRewardPersonage);
						that.personages[that.planets[key].redRewardPersonage2].hitDefense3 = that.randomCharacteristic(redRewardPersonage);
						that.personages[that.planets[key].redRewardPersonage2].hitDefense4 = that.randomCharacteristic(redRewardPersonage);
						that.personages[that.planets[key].redRewardPersonage2].hitDefense5 = that.randomCharacteristic(redRewardPersonage);
						that.personages[that.planets[key].redRewardPersonage3].hitDefense1 = that.randomCharacteristic(redRewardPersonage);
						that.personages[that.planets[key].redRewardPersonage3].hitDefense2 = that.randomCharacteristic(redRewardPersonage);
						that.personages[that.planets[key].redRewardPersonage3].hitDefense3 = that.randomCharacteristic(redRewardPersonage);
						that.personages[that.planets[key].redRewardPersonage3].hitDefense4 = that.randomCharacteristic(redRewardPersonage);
						that.personages[that.planets[key].redRewardPersonage3].hitDefense5 = that.randomCharacteristic(redRewardPersonage);
						
					}
				}
				if(dataSide === that.SIDE_SITH)
				{
					for(var key in that.planets)
					{
						var redPersonage = [];
						var redRewardPersonage = [];
						var bluePersonage = [];
						var blueRewardPersonage = [];

						if(key === "DeathStar")
						{
							redPersonage = characteristicsUser["planet-15"];           // моя защита
							redRewardPersonage = characteristicsUser["planet-1"];    // моя команда
							
							bluePersonage = characteristicsAI["planet-1"];       // не имеет значения
							blueRewardPersonage = characteristicsAI["planet-15"];  // союзники ИИ

							delete characteristicsUser["planet-1"];
							delete characteristicsUser["planet-15"];
							delete characteristicsAI["planet-1"];
							delete characteristicsAI["planet-15"];
						}else{
							if(key === "Coruscant")
							{
								redPersonage = characteristicsUser["planet-1"];          // не имеет значения
								redRewardPersonage = characteristicsUser["planet-15"];     // мои соющники

								bluePersonage = characteristicsAI["planet-15"];          // защита ИИ
								blueRewardPersonage = characteristicsAI["planet-1"];     // не имеет значения
							}else{
								var count = Object.keys(characteristicsUser).length;
								var index;
								var resultUser;
								var resultAI;

								index = that.randomIndex();
								if(index > count) resultUser = index - count;
								else resultUser = count - index;
								if(resultUser >= count) resultUser = 0;
								
								index = that.randomIndex();
								if(index > count) resultAI = index - count;
								else resultAI = count - index;
								if(resultAI >= count) resultAI = 0;

								redPersonage = characteristicsUser[Object.keys(characteristicsUser)[resultUser]];	// моя защита
								bluePersonage = characteristicsAI[Object.keys(characteristicsAI)[resultAI]];	// защита ИИ
								
								redRewardPersonage = characteristicsAI[Object.keys(characteristicsAI)[resultAI]]; 	// мои соющники = защита ИИ
								blueRewardPersonage = characteristicsUser[Object.keys(characteristicsUser)[resultUser]];		// союзники ИИ = моя защита
								
								delete characteristicsUser[Object.keys(characteristicsUser)[resultUser]];
								delete characteristicsAI[Object.keys(characteristicsAI)[resultAI]];
							}
						}
						
						that.personages[that.planets[key].bluePersonage1].hitAttack1 = that.randomCharacteristic(bluePersonage);
						that.personages[that.planets[key].bluePersonage1].hitAttack2 = that.randomCharacteristic(bluePersonage);
						that.personages[that.planets[key].bluePersonage1].hitAttack3 = that.randomCharacteristic(bluePersonage);
						that.personages[that.planets[key].bluePersonage1].hitAttack4 = that.randomCharacteristic(bluePersonage);
						that.personages[that.planets[key].bluePersonage1].hitAttack5 = that.randomCharacteristic(bluePersonage);
						that.personages[that.planets[key].bluePersonage2].hitAttack1 = that.randomCharacteristic(bluePersonage);
						that.personages[that.planets[key].bluePersonage2].hitAttack2 = that.randomCharacteristic(bluePersonage);
						that.personages[that.planets[key].bluePersonage2].hitAttack3 = that.randomCharacteristic(bluePersonage);
						that.personages[that.planets[key].bluePersonage2].hitAttack4 = that.randomCharacteristic(bluePersonage);
						that.personages[that.planets[key].bluePersonage2].hitAttack5 = that.randomCharacteristic(bluePersonage);
						that.personages[that.planets[key].bluePersonage3].hitAttack1 = that.randomCharacteristic(bluePersonage);
						that.personages[that.planets[key].bluePersonage3].hitAttack2 = that.randomCharacteristic(bluePersonage);
						that.personages[that.planets[key].bluePersonage3].hitAttack3 = that.randomCharacteristic(bluePersonage);
						that.personages[that.planets[key].bluePersonage3].hitAttack4 = that.randomCharacteristic(bluePersonage);
						that.personages[that.planets[key].bluePersonage3].hitAttack5 = that.randomCharacteristic(bluePersonage);
						
						that.personages[that.planets[key].blueRewardPersonage1].hitDefense1 = that.randomCharacteristic(blueRewardPersonage);
						that.personages[that.planets[key].blueRewardPersonage1].hitDefense2 = that.randomCharacteristic(blueRewardPersonage);
						that.personages[that.planets[key].blueRewardPersonage1].hitDefense3 = that.randomCharacteristic(blueRewardPersonage);
						that.personages[that.planets[key].blueRewardPersonage1].hitDefense4 = that.randomCharacteristic(blueRewardPersonage);
						that.personages[that.planets[key].blueRewardPersonage1].hitDefense5 = that.randomCharacteristic(blueRewardPersonage);
						that.personages[that.planets[key].blueRewardPersonage2].hitDefense1 = that.randomCharacteristic(blueRewardPersonage);
						that.personages[that.planets[key].blueRewardPersonage2].hitDefense2 = that.randomCharacteristic(blueRewardPersonage);
						that.personages[that.planets[key].blueRewardPersonage2].hitDefense3 = that.randomCharacteristic(blueRewardPersonage);
						that.personages[that.planets[key].blueRewardPersonage2].hitDefense4 = that.randomCharacteristic(blueRewardPersonage);
						that.personages[that.planets[key].blueRewardPersonage2].hitDefense5 = that.randomCharacteristic(blueRewardPersonage);
						that.personages[that.planets[key].blueRewardPersonage3].hitDefense1 = that.randomCharacteristic(blueRewardPersonage);
						that.personages[that.planets[key].blueRewardPersonage3].hitDefense2 = that.randomCharacteristic(blueRewardPersonage);
						that.personages[that.planets[key].blueRewardPersonage3].hitDefense3 = that.randomCharacteristic(blueRewardPersonage);
						that.personages[that.planets[key].blueRewardPersonage3].hitDefense4 = that.randomCharacteristic(blueRewardPersonage);
						that.personages[that.planets[key].blueRewardPersonage3].hitDefense5 = that.randomCharacteristic(blueRewardPersonage);
						
						that.personages[that.planets[key].redPersonage1].hitAttack1 = that.randomCharacteristic(redPersonage);
						that.personages[that.planets[key].redPersonage1].hitAttack2 = that.randomCharacteristic(redPersonage);
						that.personages[that.planets[key].redPersonage1].hitAttack3 = that.randomCharacteristic(redPersonage);
						that.personages[that.planets[key].redPersonage1].hitAttack4 = that.randomCharacteristic(redPersonage);
						that.personages[that.planets[key].redPersonage1].hitAttack5 = that.randomCharacteristic(redPersonage);
						that.personages[that.planets[key].redPersonage2].hitAttack1 = that.randomCharacteristic(redPersonage);
						that.personages[that.planets[key].redPersonage2].hitAttack2 = that.randomCharacteristic(redPersonage);
						that.personages[that.planets[key].redPersonage2].hitAttack3 = that.randomCharacteristic(redPersonage);
						that.personages[that.planets[key].redPersonage2].hitAttack4 = that.randomCharacteristic(redPersonage);
						that.personages[that.planets[key].redPersonage2].hitAttack5 = that.randomCharacteristic(redPersonage);
						that.personages[that.planets[key].redPersonage3].hitAttack1 = that.randomCharacteristic(redPersonage);
						that.personages[that.planets[key].redPersonage3].hitAttack2 = that.randomCharacteristic(redPersonage);
						that.personages[that.planets[key].redPersonage3].hitAttack3 = that.randomCharacteristic(redPersonage);
						that.personages[that.planets[key].redPersonage3].hitAttack4 = that.randomCharacteristic(redPersonage);
						that.personages[that.planets[key].redPersonage3].hitAttack5 = that.randomCharacteristic(redPersonage);
						
						that.personages[that.planets[key].redRewardPersonage1].hitDefense1 = that.randomCharacteristic(redRewardPersonage);
						that.personages[that.planets[key].redRewardPersonage1].hitDefense2 = that.randomCharacteristic(redRewardPersonage);
						that.personages[that.planets[key].redRewardPersonage1].hitDefense3 = that.randomCharacteristic(redRewardPersonage);
						that.personages[that.planets[key].redRewardPersonage1].hitDefense4 = that.randomCharacteristic(redRewardPersonage);
						that.personages[that.planets[key].redRewardPersonage1].hitDefense5 = that.randomCharacteristic(redRewardPersonage);
						that.personages[that.planets[key].redRewardPersonage2].hitDefense1 = that.randomCharacteristic(redRewardPersonage);
						that.personages[that.planets[key].redRewardPersonage2].hitDefense2 = that.randomCharacteristic(redRewardPersonage);
						that.personages[that.planets[key].redRewardPersonage2].hitDefense3 = that.randomCharacteristic(redRewardPersonage);
						that.personages[that.planets[key].redRewardPersonage2].hitDefense4 = that.randomCharacteristic(redRewardPersonage);
						that.personages[that.planets[key].redRewardPersonage2].hitDefense5 = that.randomCharacteristic(redRewardPersonage);
						that.personages[that.planets[key].redRewardPersonage3].hitDefense1 = that.randomCharacteristic(redRewardPersonage);
						that.personages[that.planets[key].redRewardPersonage3].hitDefense2 = that.randomCharacteristic(redRewardPersonage);
						that.personages[that.planets[key].redRewardPersonage3].hitDefense3 = that.randomCharacteristic(redRewardPersonage);
						that.personages[that.planets[key].redRewardPersonage3].hitDefense4 = that.randomCharacteristic(redRewardPersonage);
						that.personages[that.planets[key].redRewardPersonage3].hitDefense5 = that.randomCharacteristic(redRewardPersonage);
					   
					}
				}
		},
                
                initGame: function()
		{
			that.initMap();
			that.initMessage();
			that.initPersonages();
			that.initPlanets();
			that.initCommandUser();
			that.initCommandAI();
			that.initLevels();
			that.initCharacteristics();
			
			that.userExperiencePoints = 0;					// Очки опыта
			that.userTotalPointsPlayerTournament = 0;	// Общие очки игрока за всю игру
			that.userlTotalPointsPlayerLevel = 0;          // Общие очки игрока за уровен
			that.userExperiencePointsAI = 0; 				// Очки опыта ИИ
			that.userTotalBattle = 0;                        	// Общее количество проведённых битв (связь с сообщениями R2D2)
		},
                
                aiGetPersonageInCommand: function(aiSide, aiPersonageIgore) // поиск доступного персонажа в команду ИИ (map.js)
                {
                    var persID = "";
                    var persPower = 0;
                    for(var planetID in that.planets) // просматриваем 15 планет
                    {
                        if(aiSide === that.SIDE_JEDI) //  если ИИ джедай
                        {
                            if(that.planets[planetID].status === that.USER_PLANET_QUEST_COMPLETE_JEDI) //  если планета имеет статус джедаев
                            {
                                var hitCountAI = 0; //  показатель силы персонажа
                                
                                //  если персонаж 1 выбран и он не должен быть проигнорирован
                                if(that.personages[that.planets[planetID].blueRewardPersonage1].status  ===  that.AI_PERSONAGE_AVAILABLE 
                                        && that.personages[that.planets[planetID].blueRewardPersonage1].id !== "luke_skywalker" 
                                        && that.personages[that.planets[planetID].blueRewardPersonage1].id !== aiPersonageIgore) 
                                {
                                    hitCountAI += that.personages[that.planets[planetID].blueRewardPersonage1].hitDefense1
                                        + that.personages[that.planets[planetID].blueRewardPersonage1].hitDefense2
                                        + that.personages[that.planets[planetID].blueRewardPersonage1].hitDefense3
                                        + that.personages[that.planets[planetID].blueRewardPersonage1].hitDefense4
                                        + that.personages[that.planets[planetID].blueRewardPersonage1].hitDefense5;
                                    hitCountAI /= 10;
                                    if(persPower < hitCountAI) //  если сила этого персонажа выше всех предыдущих
                                    {
                                        persID = that.planets[planetID].blueRewardPersonage1;
                                        persPower = hitCountAI;
                                    }
                                }
                                
                                hitCountAI = 0;
                                
                                //  если персонаж 2 выбран и он не должен быть проигнорирован
                                if(that.personages[that.planets[planetID].blueRewardPersonage2].status  ===  that.AI_PERSONAGE_AVAILABLE 
                                        && that.personages[that.planets[planetID].blueRewardPersonage2].id !== "luke_skywalker" 
                                        && that.personages[that.planets[planetID].blueRewardPersonage2].id !== aiPersonageIgore) 
                                {
                                    hitCountAI += that.personages[that.planets[planetID].blueRewardPersonage2].hitDefense1
                                        + that.personages[that.planets[planetID].blueRewardPersonage2].hitDefense2
                                        + that.personages[that.planets[planetID].blueRewardPersonage2].hitDefense3
                                        + that.personages[that.planets[planetID].blueRewardPersonage2].hitDefense4
                                        + that.personages[that.planets[planetID].blueRewardPersonage2].hitDefense5;
                                    hitCountAI /= 10;
                                    if(persPower < hitCountAI) //  если сила этого персонажа выше всех предыдущих
                                    {
                                        persID = that.planets[planetID].blueRewardPersonage2;
                                        persPower = hitCountAI;
                                    }
                                }
                                
                                hitCountAI = 0;
                                
                                //  если персонаж 3 выбран и он не должен быть проигнорирован
                                if(that.personages[that.planets[planetID].blueRewardPersonage3].status  ===  that.AI_PERSONAGE_AVAILABLE 
                                        && that.personages[that.planets[planetID].blueRewardPersonage3].id !== "luke_skywalker" 
                                        && that.personages[that.planets[planetID].blueRewardPersonage3].id !== aiPersonageIgore) 
                                {
                                    hitCountAI += that.personages[that.planets[planetID].blueRewardPersonage3].hitDefense1
                                        + that.personages[that.planets[planetID].blueRewardPersonage3].hitDefense2
                                        + that.personages[that.planets[planetID].blueRewardPersonage3].hitDefense3
                                        + that.personages[that.planets[planetID].blueRewardPersonage3].hitDefense4
                                        + that.personages[that.planets[planetID].blueRewardPersonage3].hitDefense5;
                                    hitCountAI /= 10;
                                    if(persPower < hitCountAI) //  если сила этого персонажа выше всех предыдущих
                                    {
                                        persID = that.planets[planetID].blueRewardPersonage3;
                                        persPower = hitCountAI;
                                    }
                                }
                            }
                        }
                        
                        if(aiSide === that.SIDE_SITH) // если ИИ ситхи
                        {
                            if(that.planets[planetID].status === that.USER_PLANET_QUEST_COMPLETE_SITH)
                            {
                                var hitCountAI = 0; //  показатель силы персонажа
                                
                                //  если персонаж 1 выбран и он не должен быть проигнорирован
                                if(that.personages[that.planets[planetID].redRewardPersonage1].status  ===  that.AI_PERSONAGE_AVAILABLE 
                                        && that.personages[that.planets[planetID].redRewardPersonage1].id !== "darth_vader" 
                                        && that.personages[that.planets[planetID].redRewardPersonage1].id !== aiPersonageIgore) 
                                {
                                    hitCountAI += that.personages[that.planets[planetID].redRewardPersonage1].hitDefense1
                                        + that.personages[that.planets[planetID].redRewardPersonage1].hitDefense2
                                        + that.personages[that.planets[planetID].redRewardPersonage1].hitDefense3
                                        + that.personages[that.planets[planetID].redRewardPersonage1].hitDefense4
                                        + that.personages[that.planets[planetID].redRewardPersonage1].hitDefense5;
                                    hitCountAI /= 10;
                                    if(persPower < hitCountAI) //  если сила этого персонажа выше всех предыдущих
                                    {
                                        persID = that.planets[planetID].redRewardPersonage1;
                                        persPower = hitCountAI;
                                    }
                                }
                                
                                hitCountAI = 0; //  показатель силы персонажа
                                
                                //  если персонаж 2 выбран и он не должен быть проигнорирован
                                if(that.personages[that.planets[planetID].redRewardPersonage2].status  ===  that.AI_PERSONAGE_AVAILABLE 
                                        && that.personages[that.planets[planetID].redRewardPersonage2].id !== "darth_vader" 
                                        && that.personages[that.planets[planetID].redRewardPersonage2].id !== aiPersonageIgore) 
                                {
                                    hitCountAI += that.personages[that.planets[planetID].redRewardPersonage2].hitDefense1
                                        + that.personages[that.planets[planetID].redRewardPersonage2].hitDefense2
                                        + that.personages[that.planets[planetID].redRewardPersonage2].hitDefense3
                                        + that.personages[that.planets[planetID].redRewardPersonage2].hitDefense4
                                        + that.personages[that.planets[planetID].redRewardPersonage2].hitDefense5;
                                    hitCountAI /= 10;
                                    if(persPower < hitCountAI) //  если сила этого персонажа выше всех предыдущих
                                    {
                                        persID = that.planets[planetID].redRewardPersonage2;
                                        persPower = hitCountAI;
                                    }
                                }
                                
                                hitCountAI = 0; //  показатель силы персонажа
                                
                                //  если персонаж 3 выбран и он не должен быть проигнорирован
                                if(that.personages[that.planets[planetID].redRewardPersonage3].status  ===  that.AI_PERSONAGE_AVAILABLE 
                                        && that.personages[that.planets[planetID].redRewardPersonage3].id !== "darth_vader" 
                                        && that.personages[that.planets[planetID].redRewardPersonage3].id !== aiPersonageIgore) 
                                {
                                    hitCountAI += that.personages[that.planets[planetID].redRewardPersonage3].hitDefense1
                                        + that.personages[that.planets[planetID].redRewardPersonage3].hitDefense2
                                        + that.personages[that.planets[planetID].redRewardPersonage3].hitDefense3
                                        + that.personages[that.planets[planetID].redRewardPersonage3].hitDefense4
                                        + that.personages[that.planets[planetID].redRewardPersonage3].hitDefense5;
                                    hitCountAI /= 10;
                                    if(persPower < hitCountAI) //  если сила этого персонажа выше всех предыдущих
                                    {
                                        persID = that.planets[planetID].redRewardPersonage3;
                                        persPower = hitCountAI;
                                    }
                                }
                            }
                        }
                    }
                    return persID; // возвращаем идентификатор самого сильного персонажа
                },
                
                aiUpgradeCommand: function(aiSide, aiPlanetID) // обновление команды ИИ (распределение очков опыта, поиск лучшего бойца из списка доступных) (victory.js, lost.js)
                {
                    // Выбираем персонажа на завоёванной планеты
                    if(aiSide === that.SIDE_JEDI) //  если ИИ джедай
                    {
                        var persID = "";
                        var persPower = 0;
                        var hitCountAI = 0; //  показатель силы персонажа
                                
                        //  если персонаж 1 не выбран ранее
                        if(that.personages[that.planets[aiPlanetID].blueRewardPersonage1].status  !==  that.AI_PERSONAGE_AVAILABLE)
                        {
                            hitCountAI += that.personages[that.planets[aiPlanetID].blueRewardPersonage1].hitDefense1
                                        + that.personages[that.planets[aiPlanetID].blueRewardPersonage1].hitDefense2
                                        + that.personages[that.planets[aiPlanetID].blueRewardPersonage1].hitDefense3
                                        + that.personages[that.planets[aiPlanetID].blueRewardPersonage1].hitDefense4
                                        + that.personages[that.planets[aiPlanetID].blueRewardPersonage1].hitDefense5;
                            hitCountAI /= 10;
                            if(persPower < hitCountAI) //  если сила этого персонажа выше всех предыдущих
                            {
                                persID = that.planets[aiPlanetID].blueRewardPersonage1;
                                persPower = hitCountAI;
                            }
                        }
                        hitCountAI = 0;
                        //  если персонаж 2 не выбран ранее
                        if(that.personages[that.planets[aiPlanetID].blueRewardPersonage2].status  !==  that.AI_PERSONAGE_AVAILABLE)
                        {
                            hitCountAI += that.personages[that.planets[aiPlanetID].blueRewardPersonage2].hitDefense1
                                        + that.personages[that.planets[aiPlanetID].blueRewardPersonage2].hitDefense2
                                        + that.personages[that.planets[aiPlanetID].blueRewardPersonage2].hitDefense3
                                        + that.personages[that.planets[aiPlanetID].blueRewardPersonage2].hitDefense4
                                        + that.personages[that.planets[aiPlanetID].blueRewardPersonage2].hitDefense5;
                            hitCountAI /= 10;
                            if(persPower < hitCountAI) //  если сила этого персонажа выше всех предыдущих
                            {
                                persID = that.planets[aiPlanetID].blueRewardPersonage2;
                                persPower = hitCountAI;
                            }
                        }
                        hitCountAI = 0;
                        //  если персонаж 3 не выбран ранее
                        if(that.personages[that.planets[aiPlanetID].blueRewardPersonage3].status  !==  that.AI_PERSONAGE_AVAILABLE)
                        {
                            hitCountAI += that.personages[that.planets[aiPlanetID].blueRewardPersonage3].hitDefense1
                                        + that.personages[that.planets[aiPlanetID].blueRewardPersonage3].hitDefense2
                                        + that.personages[that.planets[aiPlanetID].blueRewardPersonage3].hitDefense3
                                        + that.personages[that.planets[aiPlanetID].blueRewardPersonage3].hitDefense4
                                        + that.personages[that.planets[aiPlanetID].blueRewardPersonage3].hitDefense5;
                            hitCountAI /= 10;
                            if(persPower < hitCountAI) //  если сила этого персонажа выше всех предыдущих
                            {
                                persID = that.planets[aiPlanetID].blueRewardPersonage3;
                                persPower = hitCountAI;
                            }
                        }
                        hitCountAI = 0;
                        // присваиваем персонажу статус "выбран"
                        if(persID !== "" && persPower !== 0) that.personages[persID].status = that.AI_PERSONAGE_AVAILABLE;
                    }
                    
                    if(aiSide === that.SIDE_SITH) // если ИИ ситхи
                    {
                        var persID = "";
                        var persPower = 0;
                        var hitCountAI = 0; //  показатель силы персонажа
                                
                        //  если персонаж 1 не выбран ранее
                        if(that.personages[that.planets[aiPlanetID].redRewardPersonage1].status  !==  that.AI_PERSONAGE_AVAILABLE)
                        {
                            hitCountAI += that.personages[that.planets[aiPlanetID].redRewardPersonage1].hitDefense1
                                        + that.personages[that.planets[aiPlanetID].redRewardPersonage1].hitDefense2
                                        + that.personages[that.planets[aiPlanetID].redRewardPersonage1].hitDefense3
                                        + that.personages[that.planets[aiPlanetID].redRewardPersonage1].hitDefense4
                                        + that.personages[that.planets[aiPlanetID].redRewardPersonage1].hitDefense5;
                            hitCountAI /= 10;
                            if(persPower < hitCountAI) //  если сила этого персонажа выше всех предыдущих
                            {
                                persID = that.planets[aiPlanetID].redRewardPersonage1;
                                persPower = hitCountAI;
                            }
                        }
                        hitCountAI = 0;
                        //  если персонаж 2 не выбран ранее
                        if(that.personages[that.planets[aiPlanetID].redRewardPersonage2].status  !==  that.AI_PERSONAGE_AVAILABLE)
                        {
                            hitCountAI += that.personages[that.planets[aiPlanetID].redRewardPersonage2].hitDefense1
                                        + that.personages[that.planets[aiPlanetID].redRewardPersonage2].hitDefense2
                                        + that.personages[that.planets[aiPlanetID].redRewardPersonage2].hitDefense3
                                        + that.personages[that.planets[aiPlanetID].redRewardPersonage2].hitDefense4
                                        + that.personages[that.planets[aiPlanetID].redRewardPersonage2].hitDefense5;
                            hitCountAI /= 10;
                            if(persPower < hitCountAI) //  если сила этого персонажа выше всех предыдущих
                            {
                                persID = that.planets[aiPlanetID].redRewardPersonage2;
                                persPower = hitCountAI;
                            }
                        }
                        hitCountAI = 0;
                        //  если персонаж 3 не выбран ранее
                        if(that.personages[that.planets[aiPlanetID].redRewardPersonage3].status  !==  that.AI_PERSONAGE_AVAILABLE)
                        {
                            hitCountAI += that.personages[that.planets[aiPlanetID].redRewardPersonage3].hitDefense1
                                        + that.personages[that.planets[aiPlanetID].redRewardPersonage3].hitDefense2
                                        + that.personages[that.planets[aiPlanetID].redRewardPersonage3].hitDefense3
                                        + that.personages[that.planets[aiPlanetID].redRewardPersonage3].hitDefense4
                                        + that.personages[that.planets[aiPlanetID].redRewardPersonage3].hitDefense5;
                            hitCountAI /= 10;
                            if(persPower < hitCountAI) //  если сила этого персонажа выше всех предыдущих
                            {
                                persID = that.planets[aiPlanetID].redRewardPersonage3;
                                persPower = hitCountAI;
                            }
                        }
                        hitCountAI = 0;
                        // присваиваем персонажу статус "выбран"
                        if(persID !== "" && persPower !== 0) that.personages[persID].status = that.AI_PERSONAGE_AVAILABLE;
                    }
                    
                    // Распределяем очки опыта на главном персонаже
                    if(aiSide === that.SIDE_JEDI)
                    {
                        for(var i = 0; i < that.userExperiencePointsAI; i++)
                        {
                            var index = that.randomIndex();
                            if(index >= 0 && index < 2) that.personages["luke_skywalker"].hitDefense1++;
                            if(index >= 2 && index < 4) that.personages["luke_skywalker"].hitDefense2++;
                            if(index >= 4 && index < 6) that.personages["luke_skywalker"].hitDefense3++;
                            if(index >= 6 && index < 8) that.personages["luke_skywalker"].hitDefense4++;
                            if(index >= 8 && index <= 10) that.personages["luke_skywalker"].hitDefense5++;
                        }
                        that.userExperiencePointsAI = 0;
                    }
                    
                    if(aiSide === that.SIDE_SITH)
                    {
                        for(var i = 0; i < that.userExperiencePointsAI; i++)
                        {
                            var index = that.randomIndex();
                            if(index >= 0 && index < 2) that.personages["darth_vader"].hitDefense1++;
                            if(index >= 2 && index < 4) that.personages["darth_vader"].hitDefense2++;
                            if(index >= 4 && index < 6) that.personages["darth_vader"].hitDefense3++;
                            if(index >= 6 && index < 8) that.personages["darth_vader"].hitDefense4++;
                            if(index >= 8 && index <= 10) that.personages["darth_vader"].hitDefense5++;
                        }
                        that.userExperiencePointsAI = 0;
                    }
                    
                    // Проверяем доступность персонажей в команде ИИ
                    for(var key in that.commandAI)
                    {
                        for(var planetID in that.planets)
                        {
                            if( (aiSide === that.SIDE_SITH)
                            && (that.planets[planetID].redRewardPersonage1 === that.commandAI[key] || that.planets[planetID].redRewardPersonage2 === that.commandAI[key] || that.planets[planetID].redRewardPersonage3 === that.commandAI[key]) 
                            && (that.planets[planetID].status === that.USER_PLANET_QUEST_COMPLETE_JEDI)) 
                            {
                                that.personages[that.commandAI[key]].status = that.USER_PERSONAGE_NOT_AVAILABLE;
                            }
                            if( (aiSide === that.SIDE_JEDI)
                            && (that.planets[planetID].blueRewardPersonage1 === that.commandAI[key] || that.planets[planetID].blueRewardPersonage2 === that.commandAI[key] || that.planets[planetID].blueRewardPersonage3 === that.commandAI[key]) 
                            && (that.planets[planetID].status === that.USER_PLANET_QUEST_AWAITING || that.planets[planetID].status === that.USER_PLANET_QUEST_COMPLETE_SITH)) 
                            {
                                that.personages[that.commandAI[key]].status = that.USER_PERSONAGE_NOT_AVAILABLE;
                            }
                        }
                    }
                    
                    // Обновляем список персонажей в команде
                    if(aiSide === that.SIDE_JEDI)
                    {
                        for(var key in that.commandAI)
			{
                            if(key === "personage2") that.commandAI[key] = that.aiGetPersonageInCommand(that.SIDE_JEDI, that.commandAI["personage3"]);
                            if(key === "personage3") that.commandAI[key] = that.aiGetPersonageInCommand(that.SIDE_JEDI, that.commandAI["personage2"]);
                        }
                    }
                    
                    if(aiSide === that.SIDE_SITH)
                    {
                        for(var key in that.commandAI)
			{
                            if(key === "personage2") that.commandAI[key] = that.aiGetPersonageInCommand(that.SIDE_SITH, that.commandAI["personage3"]);
                            if(key === "personage3") that.commandAI[key] = that.aiGetPersonageInCommand(that.SIDE_SITH, that.commandAI["personage2"]);
                        }
                    }
                },
                
                aiRemovePersonageCommand: function(aiSide)
                {
                    // Проверяем доступность персонажей в команде ИИ
                    for(var key in that.commandAI)
                    {
                        for(var planetID in that.planets)
                        {
                            if( (aiSide === that.SIDE_SITH)
                            && (that.planets[planetID].redRewardPersonage1 === that.commandAI[key] || that.planets[planetID].redRewardPersonage2 === that.commandAI[key] || that.planets[planetID].redRewardPersonage3 === that.commandAI[key]) 
                            && (that.planets[planetID].status === that.USER_PLANET_QUEST_COMPLETE_JEDI)) 
                            {
                                that.personages[that.commandAI[key]].status = that.USER_PERSONAGE_NOT_AVAILABLE;
                            }
                            if( (aiSide === that.SIDE_JEDI)
                            && (that.planets[planetID].blueRewardPersonage1 === that.commandAI[key] || that.planets[planetID].blueRewardPersonage2 === that.commandAI[key] || that.planets[planetID].blueRewardPersonage3 === that.commandAI[key]) 
                            && (that.planets[planetID].status === that.USER_PLANET_QUEST_AWAITING || that.planets[planetID].status === that.USER_PLANET_QUEST_COMPLETE_SITH)) 
                            {
                                that.personages[that.commandAI[key]].status = that.USER_PERSONAGE_NOT_AVAILABLE;
                            }
                        }
                    }
                    // Обновляем список персонажей в команде
                    if(aiSide === that.SIDE_JEDI)
                    {
                        for(var key in that.commandAI)
			{
                            if(key === "personage2") that.commandAI[key] = that.aiGetPersonageInCommand(that.SIDE_JEDI, that.commandAI["personage3"]);
                            if(key === "personage3") that.commandAI[key] = that.aiGetPersonageInCommand(that.SIDE_JEDI, that.commandAI["personage2"]);
                        }
                    }
                    
                    if(aiSide === that.SIDE_SITH)
                    {
                        for(var key in that.commandAI)
			{
                            if(key === "personage2") that.commandAI[key] = that.aiGetPersonageInCommand(that.SIDE_SITH, that.commandAI["personage3"]);
                            if(key === "personage3") that.commandAI[key] = that.aiGetPersonageInCommand(that.SIDE_SITH, that.commandAI["personage2"]);
                        }
                    }
                },
                
                aiResultBattle: function() // расчёт результата сражения ИИ (victory.js, lost.js)
                {
                    var index = that.randomIndex();
                    if(index >= 0 && index < 7) return true; // ИИ победил
                    else return false; // ИИ проиграл
                }
		
	};
	return that;
};

/* == END FILE ========================================================== */

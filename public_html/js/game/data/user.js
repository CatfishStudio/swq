
/* == НАЧАЛО ФАЙЛА ========================================================= */

var userMapPlanets;     // карта планет (объект)
var userMapMessage;     // Сообщения на карте (объект)
//var userLevels;         // Уровни (объект)

var userCommandUser;    // команда пользователя (объект)
var userCommandAI;      // команда ИИ (объект)

var userPersonages;      // список персонажей в игре (объект)
var userPlanets;         // Прогресс игры в отношении планет (объект)

//var userExperiencePoints = 0;			// Очки опыта
//var userTotalPointsPlayerTournament = 0;	// Общие очки игрока за всю игру
//var userlTotalPointsPlayerLevel = 0;          // Общие очки игрока за уровен
//var userExperiencePointsAI = 0;		// Очки опыта ИИ
var userTotalBattle = 0;                        // Общее количество роведённых битв (связь с сообщениями R2D2)

var USER_PLANET_QUEST_AWAITING = "user_planet_quest_awaiting";
var USER_PLANET_QUEST_COMPLETE_JEDI = "user_planet_quest_complete_jedi";
var USER_PLANET_QUEST_COMPLETE_SITH = "user_planet_quest_complete_sith";

var UserPlanet = function(id, name)
{
    this.id = id;                       // идентификатор планеты
    this.name = name;                   // имя планеты
    this.bluePersonage1 = null;         // персонаж планеты
    this.bluePersonage2 = null;         // персонаж планеты
    this.bluePersonage3 = null;         // персонаж планеты
    this.blueRewardPersonage1 = null;   // союзник
    this.blueRewardPersonage2 = null;   // союзник
    this.blueRewardPersonage3 = null;   // союзник
    this.redPersonage1 = null;          // персонаж планеты
    this.redPersonage2 = null;          // персонаж планеты
    this.redPersonage3 = null;          // персонаж планеты
    this.redRewardPersonage1 = null;    // союзник
    this.redRewardPersonage2 = null;    // союзник
    this.redRewardPersonage3 = null;    // союзник
    
    this.status = USER_PLANET_QUEST_AWAITING;   // статус
    this.description = "";              // описнаие
};

var USER_PERSONAGE_AVAILABLE = "user_personage_available";
var USER_PERSONAGE_NOT_AVAILABLE = "user_personage_not_available";

var UserPersonage = function(id, name)
{
    this.id = id;                       // идентификатор персонажа
    this.name = name;                   // имя персонажа
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
    this.status = USER_PERSONAGE_NOT_AVAILABLE; // статус (выбран / не выбран)
    this.description = "";              // описание
};

/* == КОНЕЦ ФАЙЛА ========================================================== */

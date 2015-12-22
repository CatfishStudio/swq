
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
//var userlTotalPointsPlayerLevel = 0;            // Общие очки игрока за уровен
//var userExperiencePointsAI = 0;			// Очки опыта ИИ

var USER_PLANET_QUEST_AWAITING = "user_planet_quest_awaiting";
var USER_PLANET_QUEST_COMPLETE_JEDI = "user_planet_quest_complete_jedi";
var USER_PLANET_QUEST_COMPLETE_SITH = "user_planet_quest_complete_sith";

var UserPlanet = function(id, name)
{
    this.id = id;
    this.name = name;
    this.redPersonage1 = null;
    this.redPersonage2 = null;
    this.redPersonage3 = null;
    this.bluePersonage1 = null;
    this.bluePersonage2 = null;
    this.bluePersonage3 = null;
    this.status = USER_PLANET_QUEST_AWAITING;
    this.description = "";
};

var USER_PERSONAGE_AVAILABLE = "user_personage_available";
var USER_PERSONAGE_NOT_AVAILABLE = "user_personage_not_available";

var UserPersonage = function(id, name)
{
    this.id = id;
    this.name = name;
    this.life = 0;
    this.hit1 = 0;
    this.hit2 = 0;
    this.hit3 = 0;
    this.hit4 = 0;
    this.hit5 = 0;
    this.status = USER_PERSONAGE_NOT_AVAILABLE;
    this.description = "";
};

/* == КОНЕЦ ФАЙЛА ========================================================== */

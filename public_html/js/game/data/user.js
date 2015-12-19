
/* == НАЧАЛО ФАЙЛА ========================================================= */

var userMapPlanets;     // карта планет
var userMapMessage;     // Сообщения на карте
//var userLevels;         // Уровни

var userPersonages;      // список персонажей в игре
var userPlanets;        // Прогресс игры в отношении планет

var USER_PLANET_QUEST_AWAITING = "user_planet_quest_awaiting";
var USER_PLANET_QUEST_COMPLETE = "user_planet_quest_complete";

var UserPlanet = function(id, name)
{
    this.id = id;
    this.name = name;
    this.redPersonage1 = null;
    this.redPersonage2 = null;
    this.redPersonage3 = null;
    this.redReward1 = null;
    this.redReward2 = null;
    this.bluePersonage1 = null;
    this.bluePersonage2 = null;
    this.bluePersonage3 = null;
    this.blueReward1 = null;
    this.blueReward2 = null;
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

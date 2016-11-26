package swh.data 
{
	import flash.net.URLRequest;
	import flash.net.navigateToURL;
	import swh.data.Constants;
	import swh.data.Personage;
	import swh.data.Planet;
	import swh.xml.FileXML;
	import vk.api.serialization.json.JSON;
	/**
	 * ...
	 * @author Catfish Studio
	 */
	public class Data 
	{
		/* Constants */
		public static const STATUS_USER_PERSONAGE_NOT_AVAILABLE:String = "status_user_personage_not_available";
		public static const STATUS_USER_PERSONAGE_AVAILABLE:String = "status_user_personage_available";
		public static const STATUS_AI_PERSONAGE_NOT_AVAILABLE:String = "status_ai_personage_not_available";
		public static const STATUS_AI_PERSONAGE_AVAILABLE:String = "status_ai_personage_available";
		public static const STATUS_PLANET_QUEST_AWAITING:String = "status_planet_quest_awaiting";
		public static const STATUS_PLANET_QUEST_COMPLETE_JEDI:String = "status_planet_quest_complete_jedi";
		public static const STATUS_PLANET_QUEST_COMPLETE_SITH:String = "status_planet_quest_complete_sith";
		
		/* Errors */
		public static var errorSetData:Boolean = false;
		public static var errorGetData:Boolean = false;
		
		/* User data */
		public static var userLastMessage:String;
		public static var userSide:String = Constants.SIDE_JEDI;
		public static var userPoints:int = 0;
		public static var userCommand:Vector.<Personage>;
		public static var userData:String;		// для сервера (формат: json)
		
		/* AI data*/
		public static var aiSide:String = Constants.SIDE_SITH;
		public static var aiPoints:int = 0;
		public static var aiCommand:Vector.<Personage>;
		public static var aiData:String;		// для сервера (формат: json)
		
		public static var map:int = 0;			// индекс файла map_*.xml
		
		/* Game data (ассоциативные массивы)*/
		public static var personages:Array;
		public static var planets:Array;
		
		/* Utilits */
		public static function utilitRandomValue(min:int, max:int):int
		{
			var value:int = Math.random() * max | 0;
			if (value == 0) value = min;
			return value;
		}
		
		public static function utilitConsole(message:*):void
		{
			var url:String = "http://localhost/game/swh/console.php?console=" + String(message);
			navigateToURL(new URLRequest(url));
		}
		
		/* ПОСТРОЕНИЕ НОВОЙ ЛОГИКИ ///////////////////////////////////////////////////////////////////////////////// */
		public static function initialization():void
		{
			// message
			if (Data.userSide == Constants.SIDE_JEDI) Data.userLastMessage = "Меня зовут R2D2, рад вас приветствовать.\n\nКорусант является основной целью Ситов.";
			else Data.userLastMessage = "Меня зовут R3-S6, приветствую тебя мой повелитель. \n\nДжедаи хотят разрушить Звезду смерти и помешать нашим планам.";
			
			// personages
			Data.personages = new Array();
			var persFileXML:XML = FileXML.getFileXML(Assets.assetsDataContent.PersonagesFileXML);
			var pers:Personage;
			var n:int = persFileXML.personage.length();
			for (var i:int = 0; i < n; i++)
			{
				pers = new Personage();
				pers.id = persFileXML.personage[i].id;
				pers.name = persFileXML.personage[i].name;
				pers.status = persFileXML.personage[i].status;
				pers.description = persFileXML.personage[i].description;
				Data.personages[pers.id] = pers;
			}
			
			// planets
			Data.planets = new Array();
			var planetsFileXML:XML = FileXML.getFileXML(Assets.assetsDataContent.PlanetsFileXML);
			var planet:Planet;
			var m:int = planetsFileXML.planet.length();
			for (var j:int = 0; j < m; j++)
			{
				planet = new Planet();
				planet.id = planetsFileXML.planet[j].id;
				planet.name = planetsFileXML.planet[j].name;
				planet.personageSith1 = planetsFileXML.planet[j].personageSith1;
				(Data.personages[planet.personageSith1] as Personage).planetID = planet.id;
				planet.personageSith2 = planetsFileXML.planet[j].personageSith2;
				(Data.personages[planet.personageSith2] as Personage).planetID = planet.id;
				planet.personageSith3 = planetsFileXML.planet[j].personageSith3;
				(Data.personages[planet.personageSith3] as Personage).planetID = planet.id;
				planet.personageJedi1 = planetsFileXML.planet[j].personageJedi1;
				(Data.personages[planet.personageJedi1] as Personage).planetID = planet.id;
				planet.personageJedi2 = planetsFileXML.planet[j].personageJedi2;
				(Data.personages[planet.personageJedi2] as Personage).planetID = planet.id;
				planet.personageJedi3 = planetsFileXML.planet[j].personageJedi3;
				(Data.personages[planet.personageJedi3] as Personage).planetID = planet.id;
				planet.descriptionSith = planetsFileXML.planet[j].descriptionSith;
				planet.descriptionJedi = planetsFileXML.planet[j].descriptionJedi;
				planet.status = planetsFileXML.planet[j].status;
				planet.x = int(planetsFileXML.planet[j].x);
				planet.y = int(planetsFileXML.planet[j].y);
				planet.scale = Number(planetsFileXML.planet[j].scale);
				Data.planets[planet.id] = planet;
			}
		}
		
		public static function loadMapCharacteristics():void
		{
			var mapFileXML:XML = FileXML.getFileXML(Assets.assetsDataContent.Map1FileXML);
			var n:int = mapFileXML.planet.length();
			for (var i:int = 0; i < n; i++)
			{
				(Data.personages[mapFileXML.planet[i].personageJedi1.id] as Personage).hit1 = mapFileXML.planet[i].personageJedi1.hit1;
				(Data.personages[mapFileXML.planet[i].personageJedi1.id] as Personage).hit2 = mapFileXML.planet[i].personageJedi1.hit2;
				(Data.personages[mapFileXML.planet[i].personageJedi1.id] as Personage).hit3 = mapFileXML.planet[i].personageJedi1.hit3;
				(Data.personages[mapFileXML.planet[i].personageJedi1.id] as Personage).hit4 = mapFileXML.planet[i].personageJedi1.hit4;
				(Data.personages[mapFileXML.planet[i].personageJedi1.id] as Personage).hit5 = mapFileXML.planet[i].personageJedi1.hit5;
				(Data.personages[mapFileXML.planet[i].personageJedi1.id] as Personage).setLife();
				
				(Data.personages[mapFileXML.planet[i].personageJedi2.id] as Personage).hit1 = mapFileXML.planet[i].personageJedi2.hit1;
				(Data.personages[mapFileXML.planet[i].personageJedi2.id] as Personage).hit2 = mapFileXML.planet[i].personageJedi2.hit2;
				(Data.personages[mapFileXML.planet[i].personageJedi2.id] as Personage).hit3 = mapFileXML.planet[i].personageJedi2.hit3;
				(Data.personages[mapFileXML.planet[i].personageJedi2.id] as Personage).hit4 = mapFileXML.planet[i].personageJedi2.hit4;
				(Data.personages[mapFileXML.planet[i].personageJedi2.id] as Personage).hit5 = mapFileXML.planet[i].personageJedi2.hit5;
				(Data.personages[mapFileXML.planet[i].personageJedi2.id] as Personage).setLife();
				
				(Data.personages[mapFileXML.planet[i].personageJedi3.id] as Personage).hit1 = mapFileXML.planet[i].personageJedi3.hit1;
				(Data.personages[mapFileXML.planet[i].personageJedi3.id] as Personage).hit2 = mapFileXML.planet[i].personageJedi3.hit2;
				(Data.personages[mapFileXML.planet[i].personageJedi3.id] as Personage).hit3 = mapFileXML.planet[i].personageJedi3.hit3;
				(Data.personages[mapFileXML.planet[i].personageJedi3.id] as Personage).hit4 = mapFileXML.planet[i].personageJedi3.hit4;
				(Data.personages[mapFileXML.planet[i].personageJedi3.id] as Personage).hit5 = mapFileXML.planet[i].personageJedi3.hit5;
				(Data.personages[mapFileXML.planet[i].personageJedi3.id] as Personage).setLife();
				
				
				(Data.personages[mapFileXML.planet[i].personageSith1.id] as Personage).hit1 = mapFileXML.planet[i].personageSith1.hit1;
				(Data.personages[mapFileXML.planet[i].personageSith1.id] as Personage).hit2 = mapFileXML.planet[i].personageSith1.hit2;
				(Data.personages[mapFileXML.planet[i].personageSith1.id] as Personage).hit3 = mapFileXML.planet[i].personageSith1.hit3;
				(Data.personages[mapFileXML.planet[i].personageSith1.id] as Personage).hit4 = mapFileXML.planet[i].personageSith1.hit4;
				(Data.personages[mapFileXML.planet[i].personageSith1.id] as Personage).hit5 = mapFileXML.planet[i].personageSith1.hit5;
				(Data.personages[mapFileXML.planet[i].personageSith1.id] as Personage).setLife();
				
				(Data.personages[mapFileXML.planet[i].personageSith2.id] as Personage).hit1 = mapFileXML.planet[i].personageSith2.hit1;
				(Data.personages[mapFileXML.planet[i].personageSith2.id] as Personage).hit2 = mapFileXML.planet[i].personageSith2.hit2;
				(Data.personages[mapFileXML.planet[i].personageSith2.id] as Personage).hit3 = mapFileXML.planet[i].personageSith2.hit3;
				(Data.personages[mapFileXML.planet[i].personageSith2.id] as Personage).hit4 = mapFileXML.planet[i].personageSith2.hit4;
				(Data.personages[mapFileXML.planet[i].personageSith2.id] as Personage).hit5 = mapFileXML.planet[i].personageSith2.hit5;
				(Data.personages[mapFileXML.planet[i].personageSith2.id] as Personage).setLife();
				
				(Data.personages[mapFileXML.planet[i].personageSith3.id] as Personage).hit1 = mapFileXML.planet[i].personageSith3.hit1;
				(Data.personages[mapFileXML.planet[i].personageSith3.id] as Personage).hit2 = mapFileXML.planet[i].personageSith3.hit2;
				(Data.personages[mapFileXML.planet[i].personageSith3.id] as Personage).hit3 = mapFileXML.planet[i].personageSith3.hit3;
				(Data.personages[mapFileXML.planet[i].personageSith3.id] as Personage).hit4 = mapFileXML.planet[i].personageSith3.hit4;
				(Data.personages[mapFileXML.planet[i].personageSith3.id] as Personage).hit5 = mapFileXML.planet[i].personageSith3.hit5;
				(Data.personages[mapFileXML.planet[i].personageSith3.id] as Personage).setLife();
			}
		}
		
		public static function createNewCommands():void
		{
			Data.userCommand = new Vector.<Personage>();
			Data.aiCommand = new Vector.<Personage>();
			
			if (Data.userSide == Constants.SIDE_JEDI){
				(Data.personages[(Data.planets["coruscant"] as Planet).personageJedi1] as Personage).status = Data.STATUS_USER_PERSONAGE_AVAILABLE;
				(Data.personages[(Data.planets["coruscant"] as Planet).personageJedi2] as Personage).status = Data.STATUS_USER_PERSONAGE_AVAILABLE;
				(Data.personages[(Data.planets["coruscant"] as Planet).personageJedi3] as Personage).status = Data.STATUS_USER_PERSONAGE_AVAILABLE;
				Data.userCommand.push( Data.clonePersonage((Data.personages[(Data.planets["coruscant"] as Planet).personageJedi1] as Personage)) );
				Data.userCommand.push( Data.clonePersonage((Data.personages[(Data.planets["coruscant"] as Planet).personageJedi2] as Personage)) );
				Data.userCommand.push( Data.clonePersonage((Data.personages[(Data.planets["coruscant"] as Planet).personageJedi3] as Personage)) );
				
				(Data.personages[(Data.planets["deathstar"] as Planet).personageSith1] as Personage).status = Data.STATUS_AI_PERSONAGE_AVAILABLE;
				(Data.personages[(Data.planets["deathstar"] as Planet).personageSith2] as Personage).status = Data.STATUS_AI_PERSONAGE_AVAILABLE;
				(Data.personages[(Data.planets["deathstar"] as Planet).personageSith3] as Personage).status = Data.STATUS_AI_PERSONAGE_AVAILABLE;
				Data.aiCommand.push( Data.clonePersonage((Data.personages[(Data.planets["deathstar"] as Planet).personageSith1] as Personage)) );
				Data.aiCommand.push( Data.clonePersonage((Data.personages[(Data.planets["deathstar"] as Planet).personageSith2] as Personage)) );
				Data.aiCommand.push( Data.clonePersonage((Data.personages[(Data.planets["deathstar"] as Planet).personageSith3] as Personage)) );
			}
			if (Data.userSide == Constants.SIDE_SITH){
				(Data.personages[(Data.planets["deathstar"] as Planet).personageSith1] as Personage).status = Data.STATUS_USER_PERSONAGE_AVAILABLE;
				(Data.personages[(Data.planets["deathstar"] as Planet).personageSith2] as Personage).status = Data.STATUS_USER_PERSONAGE_AVAILABLE;
				(Data.personages[(Data.planets["deathstar"] as Planet).personageSith3] as Personage).status = Data.STATUS_USER_PERSONAGE_AVAILABLE;
				Data.userCommand.push( Data.clonePersonage((Data.personages[(Data.planets["deathstar"] as Planet).personageSith1] as Personage)) );
				Data.userCommand.push( Data.clonePersonage((Data.personages[(Data.planets["deathstar"] as Planet).personageSith2] as Personage)) );
				Data.userCommand.push( Data.clonePersonage((Data.personages[(Data.planets["deathstar"] as Planet).personageSith3] as Personage)) );
				
				
				(Data.personages[(Data.planets["coruscant"] as Planet).personageJedi1] as Personage).status = Data.STATUS_AI_PERSONAGE_AVAILABLE;
				(Data.personages[(Data.planets["coruscant"] as Planet).personageJedi2] as Personage).status = Data.STATUS_AI_PERSONAGE_AVAILABLE;
				(Data.personages[(Data.planets["coruscant"] as Planet).personageJedi3] as Personage).status = Data.STATUS_AI_PERSONAGE_AVAILABLE;
				Data.aiCommand.push( Data.clonePersonage((Data.personages[(Data.planets["coruscant"] as Planet).personageJedi1] as Personage)) );
				Data.aiCommand.push( Data.clonePersonage((Data.personages[(Data.planets["coruscant"] as Planet).personageJedi2] as Personage)) );
				Data.aiCommand.push( Data.clonePersonage((Data.personages[(Data.planets["coruscant"] as Planet).personageJedi3] as Personage)) );
			}
			
			Data.userCommand[0].hit1 = 4; Data.userCommand[0].hit2 = 3;	Data.userCommand[0].hit3 = 4; Data.userCommand[0].hit4 = 4;
			Data.userCommand[0].hit5 = 3; Data.userCommand[0].setLife(); Data.userCommand[0].inCommand = 1;
			Data.userCommand[1].hit1 = 4; Data.userCommand[1].hit2 = 3;	Data.userCommand[1].hit3 = 3; Data.userCommand[1].hit4 = 2;
			Data.userCommand[1].hit5 = 3; Data.userCommand[1].setLife(); Data.userCommand[1].inCommand = 2;
			Data.userCommand[2].hit1 = 2; Data.userCommand[2].hit2 = 3;	Data.userCommand[2].hit3 = 3; Data.userCommand[2].hit4 = 2;
			Data.userCommand[2].hit5 = 3; Data.userCommand[2].setLife(); Data.userCommand[2].inCommand = 3;
			
			Data.aiCommand[0].hit1 = 4; Data.aiCommand[0].hit2 = 3;	Data.aiCommand[0].hit3 = 4; Data.aiCommand[0].hit4 = 4;
			Data.aiCommand[0].hit5 = 3; Data.aiCommand[0].setLife(); Data.aiCommand[0].inCommand = 1;
			Data.aiCommand[1].hit1 = 4; Data.aiCommand[1].hit2 = 3;	Data.aiCommand[1].hit3 = 3; Data.aiCommand[1].hit4 = 2;
			Data.aiCommand[1].hit5 = 3; Data.aiCommand[1].setLife(); Data.aiCommand[1].inCommand = 2;
			Data.aiCommand[2].hit1 = 2; Data.aiCommand[2].hit2 = 3;	Data.aiCommand[2].hit3 = 3; Data.aiCommand[2].hit4 = 2;
			Data.aiCommand[2].hit5 = 3; Data.aiCommand[2].setLife(); Data.aiCommand[2].inCommand = 3;
		}
		
		public static function clonePersonage(pers:Personage):Personage
		{
			var _pers:Personage = new Personage();
			_pers.id = pers.id;
			_pers.name = pers.name;
			_pers.life = pers.life;
			_pers.hit1 = pers.hit1;
			_pers.hit2 = pers.hit2;
			_pers.hit3 = pers.hit3;
			_pers.hit4 = pers.hit4;
			_pers.hit5 = pers.hit5;
			_pers.inCommand = pers.inCommand;
			_pers.description = pers.description;
			_pers.status = pers.status;
			return _pers;
		}
		
		public static function createUserDataJSON():String
		{
			/* Формат данных
				[	{ "id":"1",	"character":[	{	"name":"Scorpion"	},	{	"name":"SubZero"	}	]	}	]
			*/
			
			var json:String = "[{";
			json += "\"map\":\"" + Data.map.toString() + "\",";
			json += "\"message\":\"" + Data.userLastMessage.toString() + "\",";
			json += "\"side\":\"" + Data.userSide.toString() + "\",";
			json += "\"points\":\"" + Data.userPoints.toString() + "\",";
			json += "\"command\":[";
			for (var i:int = 0; i < Data.userCommand.length; i++){
				json += "{";
				json += "\"id\":" + "\"" + Data.userCommand[i].id.toString() + "\","; 
				json += "\"name\":" + "\"" + Data.userCommand[i].name.toString() + "\",";
				json += "\"life\":" + "\"" + Data.userCommand[i].life.toString() + "\",";
				json += "\"hit1\":" + "\"" + Data.userCommand[i].hit1.toString() + "\",";
				json += "\"hit2\":" + "\"" + Data.userCommand[i].hit2.toString() + "\",";
				json += "\"hit3\":" + "\"" + Data.userCommand[i].hit3.toString() + "\",";
				json += "\"hit4\":" + "\"" + Data.userCommand[i].hit4.toString() + "\",";
				json += "\"hit5\":" + "\"" + Data.userCommand[i].hit5.toString() + "\",";
				json += "\"status\":" + "\"" + Data.userCommand[i].status.toString() + "\",";
				json += "\"incommand\":" + "\"" + Data.userCommand[i].inCommand.toString() + "\""; 
				if (i == (Data.userCommand.length - 1)) json += "}";
				else json += "},";
			}
			json += "]";
			json += "}]";
			//Data.utilitConsole(json);
			return json;
		}
		
		public static function createAIDataJSON():String
		{
			var json:String = "[{";
			json += "\"map\":\"" + Data.map.toString() + "\",";
			json += "\"message\":\"" + "\",";
			json += "\"side\":\"" + Data.aiSide.toString() + "\",";
			json += "\"points\":\"" + Data.aiPoints.toString() + "\",";
			json += "\"command\":[";
			for (var i:int = 0; i < Data.aiCommand.length; i++){
				json += "{";
				json += "\"id\":" + "\"" + Data.aiCommand[i].id.toString() + "\","; 
				json += "\"name\":" + "\"" + Data.aiCommand[i].name.toString() + "\",";
				json += "\"life\":" + "\"" + Data.aiCommand[i].life.toString() + "\",";
				json += "\"hit1\":" + "\"" + Data.aiCommand[i].hit1.toString() + "\",";
				json += "\"hit2\":" + "\"" + Data.aiCommand[i].hit2.toString() + "\",";
				json += "\"hit3\":" + "\"" + Data.aiCommand[i].hit3.toString() + "\",";
				json += "\"hit4\":" + "\"" + Data.aiCommand[i].hit4.toString() + "\",";
				json += "\"hit5\":" + "\"" + Data.aiCommand[i].hit5.toString() + "\",";
				json += "\"status\":" + "\"" + Data.aiCommand[i].status.toString() + "\",";
				json += "\"incommand\":" + "\"" + Data.aiCommand[i].inCommand.toString() + "\""; 
				if (i == (Data.aiCommand.length - 1)) json += "}";
				else json += "},";
			}
			json += "]";
			json += "}]";
			//Data.utilitConsole(json);
			return json;
		}
		
		/* //////////////////////////////////////////////////////////////////////////////////////////////////////// */
		
		
		/* ЧТЕНИЕ ДАННЫХ С СЕРВЕРА И ПОСТРОЕНИЕ ЛОГИКИ //////////////////////////////////////////////////////////// */
		public static function readUserDataJSON():void
		{
			var jsonData:Array = vk.api.serialization.json.JSON.decode(Data.userData);
			Data.userSide = jsonData[0].side;
			Data.userPoints = jsonData[0].points;
			Data.userLastMessage = jsonData[0].message;
			Data.map = jsonData[0].map;
		}
		
		public static function readAIDataJSON():void
		{
			var jsonData:Array = vk.api.serialization.json.JSON.decode(Data.aiData);
			Data.aiSide = jsonData[0].side;
			Data.aiPoints = jsonData[0].points;
		}
		
		public static function readUserCommandDataJSON():void
		{
			//(Data.personages["aayla_secura"] as Personage).name;
			//(Data.planets["jakku"] as Planet).name;
			var jsonData:Array = vk.api.serialization.json.JSON.decode(Data.userData);
			
			//Data.utilitConsole(jsonData[0].message);
			//Data.utilitConsole(jsonData[0].command[0].id);
			Data.userCommand = new Vector.<Personage>();
			var pers:Personage;
			for (var i:int = 0; i < jsonData[0].command.length; i++){
				pers = new Personage();
				pers.id = jsonData[0].command[i].id;
				pers.name = jsonData[0].command[i].name;
				pers.life = jsonData[0].command[i].life;
				pers.hit1 = jsonData[0].command[i].hit1;
				pers.hit2 = jsonData[0].command[i].hit2;
				pers.hit3 = jsonData[0].command[i].hit3;
				pers.hit4 = jsonData[0].command[i].hit4;
				pers.hit5 = jsonData[0].command[i].hit5;
				pers.status = jsonData[0].command[i].status;
				pers.inCommand = jsonData[0].command[i].incommand;
				pers.description = (Data.personages[pers.id] as Personage).description;
				Data.userCommand.push(pers);
			}
			
		}
		
		public static function readAICommandDataJSON():void
		{
			var jsonData:Array = vk.api.serialization.json.JSON.decode(Data.aiData);
			Data.aiCommand = new Vector.<Personage>();
			var pers:Personage;
			for (var i:int = 0; i < jsonData[0].command.length; i++){
				pers = new Personage();
				pers.id = jsonData[0].command[i].id;
				pers.name = jsonData[0].command[i].name;
				pers.life = jsonData[0].command[i].life;
				pers.hit1 = jsonData[0].command[i].hit1;
				pers.hit2 = jsonData[0].command[i].hit2;
				pers.hit3 = jsonData[0].command[i].hit3;
				pers.hit4 = jsonData[0].command[i].hit4;
				pers.hit5 = jsonData[0].command[i].hit5;
				pers.status = jsonData[0].command[i].status;
				pers.inCommand = jsonData[0].command[i].incommand;
				pers.description = (Data.personages[pers.id] as Personage).description;
				Data.aiCommand.push(pers);
			}
		}
		
		/* //////////////////////////////////////////////////////////////////////////////////////////////////////// */
		
		/* Проверяет планету персонажа команды (если планета завоёвана - персонаж доступен) */
		public static function checkPersonagePlanetAvailable(personagesID:String):Boolean
		{
			if(Data.userSide == Constants.SIDE_JEDI){
				if ((Data.planets[(Data.personages[personagesID] as Personage).planetID] as Planet).status == Data.STATUS_PLANET_QUEST_COMPLETE_JEDI){
					return true;
				}else{
					return false;
				}
			}
			if(Data.userSide == Constants.SIDE_SITH){
				if ((Data.planets[(Data.personages[personagesID] as Personage).planetID] as Planet).status == Data.STATUS_PLANET_QUEST_COMPLETE_SITH){
					return true;
				}else{
					return false;
				}
			}
			return false;
		}
	}

}
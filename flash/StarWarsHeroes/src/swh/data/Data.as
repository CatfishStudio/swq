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
		
		public static var planetsData:String;	// для сервера (формат: json)
		
		/* Game data */
		public static var personages:Array;
		public static var planets:Array;
		
		/* Utilits */
		public static function utilitRandomValue(min:int, max:int):int
		{
			return Math.random() * max | min;
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
			var persFileXML:XML = FileXML.getFileXML(Assets.assetsAtlasesContent.PersonagesFileXML);
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
			var planetsFileXML:XML = FileXML.getFileXML(Assets.assetsAtlasesContent.PlanetsFileXML);
			var planet:Planet;
			var m:int = planetsFileXML.planet.length();
			for (var j:int = 0; j < m; j++)
			{
				planet = new Planet();
				planet.id = planetsFileXML.planet[j].id;
				planet.name = planetsFileXML.planet[j].name;
				planet.personageSith1 = planetsFileXML.planet[j].personageSith1;
				planet.personageSith2 = planetsFileXML.planet[j].personageSith2;
				planet.personageSith3 = planetsFileXML.planet[j].personageSith3;
				planet.personageJedi1 = planetsFileXML.planet[j].personageJedi1;
				planet.personageJedi2 = planetsFileXML.planet[j].personageJedi2;
				planet.personageJedi3 = planetsFileXML.planet[j].personageJedi3;
				planet.descriptionSith = planetsFileXML.planet[j].descriptionSith;
				planet.descriptionJedi = planetsFileXML.planet[j].descriptionJedi;
				planet.status = planetsFileXML.planet[j].status;
				planet.x = int(planetsFileXML.planet[j].x);
				planet.y = int(planetsFileXML.planet[j].y);
				planet.scale = Number(planetsFileXML.planet[j].scale);
				Data.planets[planet.id] = planet;
			}
		}
		
		public static function createNewCharacteristics():void
		{
			var characteristicsJedi:Array = [
				[3, 4, 4],	[2, 2, 5],	[2, 3, 6],	[3, 3, 7],	[3, 4, 8],
				[4, 4, 9],	[4, 5, 10],	[5, 5, 11],	[5, 6, 12],	[6, 6, 13],				
				[6, 7, 14],	[7, 7, 15],	[7, 8, 16],	[8, 8, 17],	[8, 9, 18]
			];
			
			var characteristicsSith:Array = [
				[3, 4, 4],	[2, 2, 5],	[2, 3, 6],	[3, 3, 7],	[3, 4, 8],
				[4, 4, 9],	[4, 5, 10],	[5, 5, 11],	[5, 6, 12],	[6, 6, 13],				
				[6, 7, 14],	[7, 7, 15],	[7, 8, 16],	[8, 8, 17],	[8, 9, 18]
			];
			
			for each (var planet:Planet in Data.planets) 
			{ 
				var powersJedi:Array;
				var powersSith:Array;
				
				if (Data.userSide == Constants.SIDE_JEDI){
					if (planet.name == "coruscant"){
						powersJedi = characteristicsJedi.splice(characteristicsJedi.length - 1, 1); 	// моя защита против ИИ (с ними сражается ИИ)
						powersSith = characteristicsSith.splice(0, 1);									// защита ИИ против меня (с ними сражаюсь я)
					}else if (planet.name == "deathstar"){
						powersJedi = characteristicsJedi.splice(0, 1);									// моя защита против ИИ (с ними сражается ИИ)
						powersSith = characteristicsSith.splice(characteristicsSith.length - 1, 1);		// защита ИИ против меня (с ними сражаюсь я)
					}else{
						powersJedi = characteristicsJedi.splice(Data.utilitRandomValue(0, characteristicsJedi.length), 1);	// (с ними сражается ИИ)
						powersSith = characteristicsSith.splice(Data.utilitRandomValue(0, characteristicsSith.length), 1);	// (с ними сражаюсь я)
					}
				}
				
				if (Data.userSide == Constants.SIDE_SITH){
					if (planet.name == "deathstar"){
						powersSith = characteristicsSith.splice(characteristicsSith.length - 1, 1); 	// моя защита против ИИ (с ними сражается ИИ)
						powersJedi = characteristicsJedi.splice(0, 1);									// защита ИИ против меня (с ними сражаюсь я)
					}else if (planet.name == "coruscant"){
						powersSith = characteristicsSith.splice(0, 1);									// моя защита против ИИ (с ними сражается ИИ)
						powersJedi = characteristicsJedi.splice(characteristicsJedi.length - 1, 1);		// защита ИИ против меня (с ними сражаюсь я)
					}else{
						powersSith = characteristicsSith.splice(Data.utilitRandomValue(0, characteristicsSith.length), 1);	// (с ними сражается ИИ)
						powersJedi = characteristicsJedi.splice(Data.utilitRandomValue(0, characteristicsJedi.length), 1);	// (с ними сражаюсь я)
					}
				}
				
				(Data.personages[planet.personageJedi1] as Personage).setCharacteristics(powersJedi[0][0]);
				(Data.personages[planet.personageJedi2] as Personage).setCharacteristics(powersJedi[0][1]);
				(Data.personages[planet.personageJedi3] as Personage).setCharacteristics(powersJedi[0][2]);
				(Data.personages[planet.personageSith1] as Personage).setCharacteristics(powersSith[0][0]);
				(Data.personages[planet.personageSith2] as Personage).setCharacteristics(powersSith[0][1]);
				(Data.personages[planet.personageSith3] as Personage).setCharacteristics(powersSith[0][2]);
				
				(Data.planets[planet.id] as Planet).powersJedi.push(powersJedi[0][0]);
				(Data.planets[planet.id] as Planet).powersJedi.push(powersJedi[0][1]);
				(Data.planets[planet.id] as Planet).powersJedi.push(powersJedi[0][2]);
				(Data.planets[planet.id] as Planet).powersSith.push(powersSith[0][0]);
				(Data.planets[planet.id] as Planet).powersSith.push(powersSith[0][1]);
				(Data.planets[planet.id] as Planet).powersSith.push(powersSith[0][2]);
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
				Data.userCommand.push(Data.createNewCommandPers(Data.personages[(Data.planets["coruscant"] as Planet).personageJedi1], Data.personages[(Data.planets["coruscant"] as Planet).personageSith1], 1));
				Data.userCommand.push(Data.createNewCommandPers(Data.personages[(Data.planets["coruscant"] as Planet).personageJedi2], Data.personages[(Data.planets["coruscant"] as Planet).personageSith2], 2));
				Data.userCommand.push(Data.createNewCommandPers(Data.personages[(Data.planets["coruscant"] as Planet).personageJedi3], Data.personages[(Data.planets["coruscant"] as Planet).personageSith3], 3));
				
				(Data.personages[(Data.planets["deathstar"] as Planet).personageSith1] as Personage).status = Data.STATUS_AI_PERSONAGE_AVAILABLE;
				(Data.personages[(Data.planets["deathstar"] as Planet).personageSith2] as Personage).status = Data.STATUS_AI_PERSONAGE_AVAILABLE;
				(Data.personages[(Data.planets["deathstar"] as Planet).personageSith3] as Personage).status = Data.STATUS_AI_PERSONAGE_AVAILABLE;
				Data.aiCommand.push(Data.createNewCommandPers(Data.personages[(Data.planets["deathstar"] as Planet).personageSith1], Data.personages[(Data.planets["deathstar"] as Planet).personageJedi1], 1));
				Data.aiCommand.push(Data.createNewCommandPers(Data.personages[(Data.planets["deathstar"] as Planet).personageSith2], Data.personages[(Data.planets["deathstar"] as Planet).personageJedi2], 2));
				Data.aiCommand.push(Data.createNewCommandPers(Data.personages[(Data.planets["deathstar"] as Planet).personageSith3], Data.personages[(Data.planets["deathstar"] as Planet).personageJedi3], 3));
			}
						
			if (Data.userSide == Constants.SIDE_SITH){
				(Data.personages[(Data.planets["deathstar"] as Planet).personageSith1] as Personage).status = Data.STATUS_USER_PERSONAGE_AVAILABLE;
				(Data.personages[(Data.planets["deathstar"] as Planet).personageSith2] as Personage).status = Data.STATUS_USER_PERSONAGE_AVAILABLE;
				(Data.personages[(Data.planets["deathstar"] as Planet).personageSith3] as Personage).status = Data.STATUS_USER_PERSONAGE_AVAILABLE;
				Data.userCommand.push(Data.createNewCommandPers(Data.personages[(Data.planets["deathstar"] as Planet).personageSith1], Data.personages[(Data.planets["deathstar"] as Planet).personageJedi1], 1));
				Data.userCommand.push(Data.createNewCommandPers(Data.personages[(Data.planets["deathstar"] as Planet).personageSith2], Data.personages[(Data.planets["deathstar"] as Planet).personageJedi2], 2));
				Data.userCommand.push(Data.createNewCommandPers(Data.personages[(Data.planets["deathstar"] as Planet).personageSith3], Data.personages[(Data.planets["deathstar"] as Planet).personageJedi3], 3));
				
				(Data.personages[(Data.planets["coruscant"] as Planet).personageJedi1] as Personage).status = Data.STATUS_AI_PERSONAGE_AVAILABLE;
				(Data.personages[(Data.planets["coruscant"] as Planet).personageJedi2] as Personage).status = Data.STATUS_AI_PERSONAGE_AVAILABLE;
				(Data.personages[(Data.planets["coruscant"] as Planet).personageJedi3] as Personage).status = Data.STATUS_AI_PERSONAGE_AVAILABLE;
				Data.aiCommand.push(Data.createNewCommandPers(Data.personages[(Data.planets["coruscant"] as Planet).personageJedi1], Data.personages[(Data.planets["coruscant"] as Planet).personageSith1], 1));
				Data.aiCommand.push(Data.createNewCommandPers(Data.personages[(Data.planets["coruscant"] as Planet).personageJedi2], Data.personages[(Data.planets["coruscant"] as Planet).personageSith2], 2));
				Data.aiCommand.push(Data.createNewCommandPers(Data.personages[(Data.planets["coruscant"] as Planet).personageJedi3], Data.personages[(Data.planets["coruscant"] as Planet).personageSith3], 3));
			}
		}
		
		public static function createNewCommandPers(pers:Personage, persValues:Personage, positionIndex:int):Personage
		{
			var _pers:Personage = new Personage();
			_pers.id = pers.id;
			_pers.name = pers.name;
			_pers.life = persValues.life;	// берём показатель врага
			_pers.hit1 = persValues.hit1;	// берём показатель врага
			_pers.hit2 = persValues.hit2;	// берём показатель врага
			_pers.hit3 = persValues.hit3;	// берём показатель врага
			_pers.hit4 = persValues.hit4;	// берём показатель врага
			_pers.hit5 = persValues.hit5;	// берём показатель врага
			_pers.description = pers.description;
			_pers.status = pers.status;
			_pers.inCommand = positionIndex;
			return _pers;
		}
		
		public static function createUserDataJSON():String
		{
			/* Формат данных
				{	"ИмяГруппы": {	"ИмяМассива": [	{	"id": "0"	},	{	"id": "1"	},	{	"id": "2"	}]	}	}
				или 
				[	{ "id":"1",	"character":[	{	"name":"Scorpion"	},	{	"name":"SubZero"	}	]	}	]
			*/
			
			var json:String = "[{";
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
		
		public static function createPlanetsDataJSON():String
		{
			var count:int = 0;
			var json:String = "[{";
			json += "\"planets\":[";
			for each (var planet:Planet in Data.planets) 
			{
				json += "{";
				json += "\"id\":" + "\"" + planet.id.toString() + "\","; 
				json += "\"status\":" + "\"" + planet.status.toString() + "\",";
				json += "\"powersjedi\":[";
				for (var n:int = 0; n < planet.powersJedi.length; n++){
					json += "{";
					json += "\"value\":" + "\"" + String(planet.powersJedi[n]) + "\""; 
					if (n == (planet.powersJedi.length - 1)) json += "}";
					else json += "},";
				}
				json +=	"],"; 
				json += "\"powerssith\":[";
				for (var m:int = 0; m < planet.powersSith.length; m++){
					json += "{";
					json += "\"value\":" + "\"" + String(planet.powersSith[m]) + "\"";
					if (m == (planet.powersSith.length - 1)) json += "}";
					else json += "},";
				}
				json += "]";
				if (count < 14) json += "},";
				else json += "}";
				count++;
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
		}
		
		public static function readPlanetsDataJSON():void
		{
			//Data.utilitConsole(jsonData[0].planets[0].id);
			//Data.utilitConsole(jsonData[0].planets.length);
			var jsonData:Array = vk.api.serialization.json.JSON.decode(Data.planetsData);
			for (var i:int = 0; i < jsonData[0].planets.length; i++){
				(Data.planets[jsonData[0].planets[i].id] as Planet).status = jsonData[0].planets[i].status;
				(Data.planets[jsonData[0].planets[i].id] as Planet).powersJedi[0] = jsonData[0].planets[i].powersjedi[0];
				(Data.planets[jsonData[0].planets[i].id] as Planet).powersJedi[1] = jsonData[0].planets[i].powersjedi[1];
				(Data.planets[jsonData[0].planets[i].id] as Planet).powersJedi[2] = jsonData[0].planets[i].powersjedi[2];
				(Data.planets[jsonData[0].planets[i].id] as Planet).powersSith[0] = jsonData[0].planets[i].powerssith[0];
				(Data.planets[jsonData[0].planets[i].id] as Planet).powersSith[1] = jsonData[0].planets[i].powerssith[1];
				(Data.planets[jsonData[0].planets[i].id] as Planet).powersSith[2] = jsonData[0].planets[i].powerssith[2];
			}
			
			for each (var planet:Planet in Data.planets) 
			{ 
				(Data.personages[planet.personageJedi1] as Personage).setCharacteristics(planet.powersJedi[0]);
				(Data.personages[planet.personageJedi2] as Personage).setCharacteristics(planet.powersJedi[1]);
				(Data.personages[planet.personageJedi3] as Personage).setCharacteristics(planet.powersJedi[2]);
				(Data.personages[planet.personageSith1] as Personage).setCharacteristics(planet.powersSith[0]);
				(Data.personages[planet.personageSith2] as Personage).setCharacteristics(planet.powersSith[1]);
				(Data.personages[planet.personageSith3] as Personage).setCharacteristics(planet.powersSith[2]);
			}
			
		}
		
		public static function readUserCommandDataJSON():void
		{
			//(Data.personages["aayla_secura"] as Personage).name;
			//(Data.planets["jakku"] as Planet).name;
			var jsonData:Array = vk.api.serialization.json.JSON.decode(Data.userData);
			
			//Data.utilitConsole(jsonData[0].message);
			//Data.utilitConsole(jsonData[0].command[0].id);
			
		}
		
		public static function readAICommandDataJSON():void
		{
			var jsonData:Array = vk.api.serialization.json.JSON.decode(Data.aiData);
			//Data.utilitConsole(jsonData[0].message);
			//Data.utilitConsole(jsonData[0].command[0].id);
		}
		
		
		
		/* //////////////////////////////////////////////////////////////////////////////////////////////////////// */
	}

}
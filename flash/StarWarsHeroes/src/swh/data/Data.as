package swh.data 
{
	import swh.data.Constants;
	import swh.data.Personage;
	import swh.data.Planet;
	import swh.xml.FileXML;
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
		public static var userData:String;
		
		/* AI data*/
		public static var aiSide:String = Constants.SIDE_SITH;
		public static var aiPoints:int = 0;
		public static var aiCommand:Vector.<Personage>;
		public static var aiData:String;
		
		/* Game data */
		public static var personages:Array;
		public static var planets:Array;
		
		/* Utilits */
		public static function utilitRandomValue(min:int, max:int):int
		{
			return Math.random() * max | min;
		}
		
		/* ПОСТРОЕНИЕ НОВОЙ ЛОГИКИ ///////////////////////////////////////////////////////////////////////////////// */
		public static function initialization():void
		{
			// message
			if (Data.userSide == Constants.SIDE_JEDI) Data.userLastMessage = "Меня зовут R2D2, рад вас приветствовать.\n\nКорусант является основной целью Ситов.";
			else Data.userLastMessage = "Меня зовут R3-S6, приветствую тебя мой повелитель. \n\nДжедаи хотят разрушить Звезду смерти и помешать нашим планам.";
			
			// personages
			Data.personages = new Array();
			var persFileXML:XML = FileXML.getFileXML(Assets.assetsContent.PersonagesFileXML);
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
			var planetsFileXML:XML = FileXML.getFileXML(Assets.assetsContent.PlanetsFileXML);
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
			
			// characteristics
			Data.createNewCharacteristics();
			
			// commands
			Data.createNewCommands();
			
			// create json
			Data.userData = Data.createUserDataJSON();
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
				
				(Data.personages[planet.personageJedi1] as Personage).setCharacteristics(powersJedi[0]);
				(Data.personages[planet.personageJedi2] as Personage).setCharacteristics(powersJedi[1]);
				(Data.personages[planet.personageJedi3] as Personage).setCharacteristics(powersJedi[2]);
				(Data.personages[planet.personageSith1] as Personage).setCharacteristics(powersSith[0]);
				(Data.personages[planet.personageSith2] as Personage).setCharacteristics(powersSith[1]);
				(Data.personages[planet.personageSith3] as Personage).setCharacteristics(powersSith[2]);
				
				(Data.planets[planet.id] as Planet).powersJedi = powersJedi;
				(Data.planets[planet.id] as Planet).powersSith = powersSith;
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
			//(Data.personages["aayla_secura"] as Personage).name;
			//(Data.planets["jakku"] as Planet).name;
			
			var json:String = "[{\"id\":\"1\",\"character\":[{\"name\":\"Scorpion\"},{\"name\":\"SubZero\"}]}]";
			return json;
		}
		
		/* //////////////////////////////////////////////////////////////////////////////////////////////////////// */
		
		
		
		
		/* ЧТЕНИЕ ДАННЫХ С СЕРВЕРА И ПОСТРОЕНИЕ ЛОГИКИ //////////////////////////////////////////////////////////// */
		
		/* //////////////////////////////////////////////////////////////////////////////////////////////////////// */
	}

}
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
		public static const STATIS_USER_PERSONAGE_NOT_AVAILABLE:String = "status_user_personage_not_available";
		public static const STATIS_USER_PERSONAGE_AVAILABLE:String = "status_user_personage_available";
		public static const STATIS_AI_PERSONAGE_NOT_AVAILABLE:String = "status_ai_personage_not_available";
		public static const STATIS_AI_PERSONAGE_AVAILABLE:String = "status_ai_personage_available";
		public static const STATUS_PLANET_QUEST_AWAITING:String = "status_planet_quest_awaiting";
		public static const STATUS_PLANET_QUEST_COMPLETE_JEDI:String = "status_planet_quest_complete_jedi";
		public static const STATUS_PLANET_QUEST_COMPLETE_SITH:String = "status_planet_quest_complete_sith";
		
		/* Errors */
		public static var errorSetData:Boolean = false;
		public static var errorGetData:Boolean = false;
		
		/* User data */
		public static var userSide:String = Constants.SIDE_JEDI;
		public static var userPoints:int = 0;
		public static var userData:String;
		public static var userLastMessage:String;
		
		/* AI data*/
		public static var aiSide:String = Constants.SIDE_SITH;
		public static var aiPoints:int = 0;
		public static var aiData:String;
		
		/* Game data */
		public static var personages:Array;
		public static var planets:Array;
		
		
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
				planet.x = planetsFileXML.planet[j].x;
				planet.y = planetsFileXML.planet[j].y;
				planet.scale = planetsFileXML.planet[j].scale;
				Data.planets[planet.id] = planet;
			}
			
			// characteristics
			Data.setCharacteristics();
			
			// create json
			Data.userData = Data.createUserDataJSON();
		}
		
		public static function setCharacteristics():void
		{
			var characteristics:Array = [
				[3, 4, 4],	[2, 2, 5],	[2, 3, 6],	[3, 3, 7],	[3, 4, 8],
				[4, 4, 9],	[4, 5, 10],	[5, 5, 11],	[5, 6, 12],	[6, 6, 13],				
				[6, 7, 14],	[7, 7, 15],	[7, 8, 16],	[8, 8, 17],	[8, 9, 18]
			];
			
			
			for each (var planet:Planet in Data.planets) 
			{ 
				var powers:Array;
				if (planet.name == "coruscant" && Data.userSide == Constants.SIDE_JEDI){
					powers = characteristics.splice(0, 1);
					(Data.personages[planet.personageJedi1] as Personage).setCharacteristics(powers[0]);
					(Data.personages[planet.personageJedi2] as Personage).setCharacteristics(powers[1]);
					(Data.personages[planet.personageJedi3] as Personage).setCharacteristics(powers[2]);
					
				}else if (planet.name == "coruscant" && Data.userSide == Constants.SIDE_SITH){
					powers = characteristics.splice(characteristics.length-1, 1);
					(Data.personages[planet.personageJedi1] as Personage).setCharacteristics(powers[0]);
					(Data.personages[planet.personageJedi2] as Personage).setCharacteristics(powers[1]);
					(Data.personages[planet.personageJedi3] as Personage).setCharacteristics(powers[2]);
					
				}else if (planet.name == "deathstar" && Data.userSide == Constants.SIDE_SITH){
					powers = characteristics.splice(0, 1);
					(Data.personages[planet.personageSith1] as Personage).setCharacteristics(powers[0]);
					(Data.personages[planet.personageSith2] as Personage).setCharacteristics(powers[1]);
					(Data.personages[planet.personageSith3] as Personage).setCharacteristics(powers[2]);
					
				}else if (planet.name == "deathstar" && Data.userSide == Constants.SIDE_JEDI){
					powers = characteristics.splice(characteristics.length-1, 1);
					(Data.personages[planet.personageSith1] as Personage).setCharacteristics(powers[0]);
					(Data.personages[planet.personageSith2] as Personage).setCharacteristics(powers[1]);
					(Data.personages[planet.personageSith3] as Personage).setCharacteristics(powers[2]);
					
				}else{
					
				}
			} 
		}
		
		public static function createUserDataJSON():String
		{
			//(Data.personages["aayla_secura"] as Personage).name;
			//(Data.planets["jakku"] as Planet).name;
			
			var json:String = "[{\"id\":\"1\",\"character\":[{\"name\":\"Scorpion\"},{\"name\":\"SubZero\"}]}]";
			return json;
		}
	}

}
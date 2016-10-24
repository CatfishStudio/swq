package swh.data 
{
	import swh.data.Constants;
	import swh.data.Personage;
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
		public static var characteristics:Array;
		
		
		public static function initialization():void
		{
			// message
			if (Data.userSide = Constants.SIDE_JEDI) Data.userLastMessage = "Меня зовут R2D2, рад вас приветствовать.\n\nКорусант является основной целью Ситов.";
			else Data.userLastMessage = "Меня зовут R3-S6, приветствую тебя мой повелитель. \n\nДжедаи хотят разрушить Звезду смерти и помешать нашим планам.";
			
			// characteristics
			characteristics = new Array();
			characteristics["planet-1"] = [3, 4, 4];
			characteristics["planet-2"] = [2, 2, 5];
			characteristics["planet-3"] = [2, 3, 6];
			characteristics["planet-4"] = [3, 3, 7];
			characteristics["planet-5"] = [3, 4, 8];
			characteristics["planet-6"] = [4, 4, 9];
			characteristics["planet-7"] = [4, 5, 10];
			characteristics["planet-8"] = [5, 5, 11];
			characteristics["planet-9"] = [5, 6, 12];
			characteristics["planet-10"] = [6, 6, 13];
			characteristics["planet-11"] = [6, 7, 14];
			characteristics["planet-12"] = [7, 7, 15];
			characteristics["planet-13"] = [7, 8, 16];
			characteristics["planet-14"] = [8, 8, 17];
			characteristics["planet-15"] = [8, 9, 18];
			
			// personages
			personages = new Array();
			var persFileXML:XML = FileXML.getFileXML(Assets.assetsContent.PersonagesFileXML);
			var pers:Personage;
			var n:int = persFileXML.Personage.length();
			for (var i:int = 0; i < n; i++)
			{
				pers = new Personage();
				pers.id = persFileXML.Personage[i].id;
				pers.name = persFileXML.Personage[i].name;
				pers.status = persFileXML.Personage[i].status;
				pers.description = persFileXML.Personage[i].description;
				Data.personages[pers.id] = pers;
			}
			
			// planets
			
			Data.userData = Data.getUserDataJSON();
		}
		
		public static function getUserDataJSON():String
		{
			//(Data.personages["aayla_secura"] as Personage).name;
			var json:String = "[{\"id\":\"1\",\"character\":[{\"name\":\"Scorpion\"},{\"name\":\"SubZero\"}]}]";
			return json;
		}
	}

}
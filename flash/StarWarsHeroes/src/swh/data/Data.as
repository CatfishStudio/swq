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
		public static var errorSetData:Boolean = false;
		public static var errorGetData:Boolean = false;
		
		public static var userSide:String = Constants.SIDE_JEDI;
		public static var userData:String;
		public static var aiData:String;
		
		public static var personages:Vector.<Personage>;
		
		
		public static function initialization():void
		{
			personages = new Vector.<Personage>();
			
			var persFileXML:XML = FileXML.getFileXML(Assets.assetsContent.PersonagesFileXML);
			var pers:Personage;
			var n:int = persFileXML.Personage.length();
			for (var i:int = 0; i < n; i++)
			{
				pers = new Personage();
				pers.id = persFileXML.Personage[i].id;
				pers.name = persFileXML.Personage[i].name;
				pers.life = persFileXML.Personage[i].life;
				pers.hit1 = persFileXML.Personage[i].hit1;
				pers.hit2 = persFileXML.Personage[i].hit2;
				pers.hit3 = persFileXML.Personage[i].hit3;
				pers.hit4 = persFileXML.Personage[i].hit4;
				pers.hit5 = persFileXML.Personage[i].hit5;
				pers.status = persFileXML.Personage[i].status;
				pers.description = persFileXML.Personage[i].description;
				Data.personages.push(pers);
			}
			
			Data.userData = Data.getUserDataJSON();
		}
		
		public static function getUserDataJSON():String
		{
			//Data.personages[0].name;
			var json:String = "[{\"id\":\"1\",\"character\":[{\"name\":\"Scorpion\"},{\"name\":\"SubZero\"}]}]";
			return json;
		}
	}

}
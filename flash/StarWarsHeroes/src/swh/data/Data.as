package swh.data 
{
	import swh.data.Constants;
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
		
		public static function createUserDataJSON():String
		{
			var json:String = "[{\"id\":\"1\",\"character\":[{\"name\":\"Scorpion\"},{\"name\":\"SubZero\"}]}]";
			return json;
		}
	}

}
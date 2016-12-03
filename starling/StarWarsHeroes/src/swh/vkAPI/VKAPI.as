package swh.vkAPI 
{
	import vk.APIConnection;
	/**
	 * ...
	 * @author Catfish Studio
	 */
	public class VKAPI 
	{
	
		public static var vkConnection:APIConnection;
		
		public static function initVKAPI(flashVars: Object):void
		{
			//vkConnection = new APIConnection(flashVars);
			VKAPI.vkConnection = new APIConnection(flashVars);
		}
		
		/*
		public static function setData(_key:String, _value:String):void 
		{
			//VKAPI.vkConnection.api("storage.set", { key:"firstvar", value:"444"}, onSet, onESet);
			VKAPI.vkConnection.api("storage.set", { key:_key, value:_value}, VKAPI.onSet, VKAPI.onESet);
		}
		
		public static function getData(_key:String):void 
		{
			//VKAPI.vkConnection.api("storage.get", { key:"userTest" }, VKAPI.OnGet, VKAPI.OnEGet);
			VKAPI.vkConnection.api("storage.get", { key:_key }, VKAPI.OnGet, VKAPI.OnEGet);
		}
		
		private static function onSet (response:Object):void 
        {
            //textField.text = "метод set выполнен";
        }
        private static function onESet (response:Object):void 
        {
            //textField.text = response.error_msg;
			//textField.text = String(response)
        }
        private static function OnGet(response:Object):void 
        {
			Data.userTest = String(response);
            //textField.text = response[0]["response"];
			//textField.text = String(response)
        }
        private static function OnEGet(response:Object):void 
        {
			Data.userTest = String(response.error_msg);
            //textField.text = response.error_msg;
			//textField.text = String(response)
        }
		*/
	}

}
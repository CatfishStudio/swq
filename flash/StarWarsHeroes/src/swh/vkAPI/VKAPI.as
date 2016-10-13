package swh.vkAPI 
{
	import vk.APIConnection;
	
	/**
	 * ...
	 * @author Catfish Studio
	 */
	public class VKAPI 
	{
	
		public var vkConnection:APIConnection;
		
		public function VKAPI(flashVars: Object) 
		{
			vkConnection = new APIConnection(flashVars);
		}
		
		public function setData(key:String, value:String):void 
		{
			//vk.api("storage.set", { key:"firstvar", value:"444"}, onSet, onESet);
		}
		
		public function getData(key:String):void 
		{
			//vk.api("storage.get", { key:"firstvar" }, OnGet, OnEGet);
		}
		
		private function onSet (response:Object):void 
        {
            //textField.text = "метод set выполнен";
        }
        private function onESet (response:Object):void 
        {
            //textField.text = response.error_msg;
			//textField.text = String(response)
        }
        private function OnGet(response:Object):void 
        {
            //textField.text = response[0]["response"];
			//textField.text = String(response)
        }
        private function OnEGet(response:Object):void 
        {
            //textField.text = response.error_msg;
			//textField.text = String(response)
        }
	}

}
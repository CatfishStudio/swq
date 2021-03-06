package swh 
{
	import starling.display.Sprite;
	import starling.events.Event;
	import starling.display.Quad;
	
	import swh.events.Navigation;
	import swh.data.Constants;
	import swh.data.Assets;
	
	import swh.vkAPI.VKAPI;
	import swh.data.Data;
	import swh.menu.Menu;
	import swh.side.Side;
	import swh.settings.Settings;
	import swh.map.Map;
	
	/**
	 * ...
	 * @author Catfish Studio
	 */
	public class Game extends Sprite 
	{
		
		public function Game() 
		{
			super();
			addEventListener(Event.ADDED_TO_STAGE, onAddedToStage);
			addEventListener(Navigation.CHANGE_SCREEN, onChangeScreen);
		}
		
		private function onAddedToStage(e:Event):void 
		{
			removeEventListener(Event.ADDED_TO_STAGE, onAddedToStage);
			
			mask = new Quad(Constants.GAME_WINDOW_WIDTH, Constants.GAME_WINDOW_HEIGHT);
			
			getSaveGame(); // Загрузка сохранённых данных
		}
		
		/* MENU ---------------------------- */
		private function createMenu():void
		{
			if (getChildByName(Constants.MENU) == null) addChild(new Menu());
		}
		
		private function removeMenu():void
		{
			if (getChildByName(Constants.MENU) != null) removeChild(getChildByName(Constants.MENU));
		}
		/* -------------------------------- */
		
		/* SETTINGS ----------------------- */
		private function createSettings():void
		{
			if (getChildByName(Constants.SETTINGS) == null) addChild(new Settings());
		}
		
		private function removeSettings():void
		{
			if (getChildByName(Constants.SETTINGS) != null) removeChild(getChildByName(Constants.SETTINGS));
		}
		/* -------------------------------- */
		
		/* SIDE --------------------------- */
		private function createSide():void
		{
			if (getChildByName(Constants.SIDE) == null) addChild(new Side());
		}
		
		private function removeSide():void
		{
			if (getChildByName(Constants.SIDE) != null) removeChild(getChildByName(Constants.SIDE));
		}
		/* -------------------------------- */
		
		/* MAP ---------------------------- */
		private function createMap():void
		{
			if (getChildByName(Constants.MAP) == null) addChild(new Map());
		}
		
		private function removeMap():void
		{
			if (getChildByName(Constants.MAP) != null) removeChild(getChildByName(Constants.MAP));
		}
		/* -------------------------------- */
		
		
		private function onChangeScreen(event:Navigation):void 
		{
			switch(event.data.id)
			{
				case Constants.MENU_BUTTON_CONTINUE:
				{
					removeMenu();
					createMap();
					break;
				}
				case Constants.MENU_BUTTON_NEW_GAME:
				{
					removeMenu();
					createSide();
					break;
				}
				case Constants.MENU_BUTTON_SETTINGS:
				{
					createSettings();
					break;
				}
				case Constants.MENU_BUTTON_INVITE:
				{
					VKAPI.vkConnection.callMethod("showInviteBox");
					break;
				}
				case Constants.SETTINGS_BUTTON_CLOSE:
				{
					removeSettings();
					break;
				}
				case Constants.SIDE_CLOSE:
				{
					createNewGame();
					break;
				}
				case Constants.MAP_BUTTON_BACK_MENU:
				{
					removeMap();
					createMenu();
					break;
				}
				case Constants.MAP_BUTTON_INVITE:
				{
					VKAPI.vkConnection.callMethod("showInviteBox");
					break;
				}
				case Constants.MAP_BUTTON_COMMAND:
				{
					
					break;
				}
				case Constants.MAP_BUTTON_SETTINGS:
				{
					createSettings();
					break;
				}
				case Constants.MAP_START_BATTLE_BUTTON_START:
				{
					
					break;
				}
				case Constants.MAP_START_BATTLE_BUTTON_CANCEL:
				{
					var map:Map = (getChildByName(Constants.MAP) as Map);
					if (map != null) map.onBattleStartClose();
					break;
				}
				default:
				{
					break;
				}
			}
		}
		
		/* CREATE NEW SAVE GAME ============================================================= */
		private var dataSetComplete:int = 0;
		private function createNewGame():void
		{
			//VKAPI.vkConnection.api("storage.set", { key:"userTest", value:"TestGOOD"}, onDataSet, onDataErrorSet);
			//var json:String = "[{\"id\":\"1\",\"character\":[{\"name\":\"Scorpion\"},{\"name\":\"SubZero\"}]}]";
			Data.initialization();
			Data.loadMapCharacteristics();
			Data.createNewCommands();
			Data.userData = Data.createUserDataJSON();
			Data.aiData = Data.createAIDataJSON();
			try{
				VKAPI.vkConnection.api("storage.set", { key:"swhUserData", value:Data.userData}, onDataSet, onDataErrorSet);
				VKAPI.vkConnection.api("storage.set", { key:"swhAIData", value:Data.aiData}, onDataSet, onDataErrorSet);
			}catch (e:Error){
				Data.errorSetData = true;
				removeSide();
				createMap();
			}
			
		}
		private function onDataSet (response:Object):void 
        {
			dataSetComplete++;
			if(dataSetComplete == 2){
				removeSide();
				createMap();
			}
        }
        private function onDataErrorSet (response:Object):void 
        {
			Data.errorSetData = true;
			removeSide();
			createMap();
            //textField.text = response.error_msg;
			//textField.text = String(response)
			//Data.userTest = "ERROR";
        }
		/* ============================================================================ */
		
		/* READ SAVE GAME ============================================================= */
		private function getSaveGame():void
		{
			try{
				VKAPI.vkConnection.api("storage.get", { key:"swhUserData" }, OnGetUserData, OnEGet);
				VKAPI.vkConnection.api("storage.get", { key:"swhAIData" }, OnGetAIData, OnEGet);
				createMenu();
			}catch (e:Error){
				Data.errorGetData = true;
				createMenu();
			}
		}
		private function OnGetUserData(response:Object):void 
        {
			//var jsonData:Array = vk.api.serialization.json.JSON.decode(Data.userData);
			//jsonData[0].id
			Data.userData = String(response);
        }
		private function OnGetAIData(response:Object):void 
        {
			Data.aiData = String(response);
        }
		private function OnEGet(response:Object):void 
        {
			Data.errorGetData = true;
			createMenu();
        }
		
		/* ============================================================================ */
		
	}

}
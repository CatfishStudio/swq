package swh 
{
	import flash.display.Sprite;
	import flash.events.Event;
	
	
	import swh.vkAPI.VKAPI;
	import swh.data.Data;
	import swh.data.Constants;
	import swh.events.NavigationEvent;
	import swh.menu.Menu;
	import swh.settings.Settings;
	import swh.side.Side;
	import swh.map.Map;
	import swh.command.Command;
	/**
	 * ...
	 * @author Catfish Studio
	 */
	public class Game extends Sprite 
	{
		private var gameMask:Sprite;
		private var menu:Menu;
		private var settings:Settings;
		private var side:Side;
		private var map:Map;
		private var command:Command;
		
		public function Game() 
		{
			super();
			addEventListener(Event.ADDED_TO_STAGE, onAddedToStage);
		}
			
		private function onAddedToStage(e:Event):void 
		{
			removeEventListener(Event.ADDED_TO_STAGE, onAddedToStage);
			
			/* Маска -------------------------------------------------------------------------------- */
			gameMask = new Sprite();
			gameMask.graphics.beginFill(0x333333, 1);
			gameMask.graphics.drawRect(0, 0, Constants.GAME_WINDOW_WIDTH, Constants.GAME_WINDOW_HEIGHT);
			gameMask.x = 0; 
			gameMask.y = 0;
			gameMask.graphics.endFill();
			addChild(gameMask)
			mask = gameMask; // применение маски
			/*--------------------------------------------------------------------------------------- */
			
			/* Глобальное событие при выборе, смене окна */
			addEventListener(NavigationEvent.CHANGE_SCREEN, onChangeScreen);
			
			getSaveGame(); // Загрузка сохранённых данных
		}
		
		/* MENU ---------------------------- */
		private function createMenu():void
		{
			if(menu == null){
				menu = new Menu();
				addChild(menu);
			}
		}
		
		private function removeMenu():void
		{
			if(menu != null){
				removeChild(menu);
				menu = null;
			}
		}
		/* -------------------------------- */
		
		/* SETTINGS ----------------------- */
		private function createSettings():void
		{
			if(settings == null){
				settings = new Settings();
				addChild(settings);
			}
		}
		
		private function removeSettings():void
		{
			if(settings != null){
				removeChild(settings);
				settings = null;
			}
		}
		/* -------------------------------- */
		
		/* SIDE --------------------------- */
		private function createSide():void
		{
			if (side == null){
				side = new Side();
				addChild(side);
			}
		}
		
		private function removeSide():void
		{
			if (side != null){
				removeChild(side);
				side = null;
			}
		}
		/* -------------------------------- */
		
		/* MAP ---------------------------- */
		private function createMap():void
		{
			if (map == null){
				map = new Map();
				addChild(map);
			}
		}
		
		private function removeMap():void
		{
			if (map != null){
				removeChild(map);
				map = null;
			}
		}
		/* -------------------------------- */
		
		/* COMMAND ------------------------ */
		private function createCommand():void
		{
			if (command == null){
				command = new Command();
				addChild(command);
			}
		}
		
		private function removeCommand():void
		{
			if (command != null){
				removeChild(command);
				command = null;
			}
		}
		/* -------------------------------- */
		
		/* Событие: управление окнами игры ===================================================== */
		private function onChangeScreen(e:NavigationEvent):void 
		{
			switch(e.param.id)
			{
				case Constants.MENU_BUTTON_CONTINUE: 
					removeMenu();
					createMap();
					break;
				   
				case Constants.MENU_BUTTON_NEW_GAME: 
					removeMenu();
					createSide();
					break;
				   
				case Constants.MENU_BUTTON_SETTINGS:
					createSettings();
					break;
				   
				case Constants.MENU_BUTTON_INVITE:
					VKAPI.vkConnection.callMethod("showInviteBox");
					break;   
				
				case Constants.SETTINGS_BUTTON_CLOSE:
					removeSettings();
					break;
					
				case Constants.SIDE_CLOSE_SITH:
					Data.userSide = Constants.SIDE_SITH;
					Data.aiSide = Constants.SIDE_JEDI;
					createNewGame();
					break;
					
				case Constants.SIDE_CLOSE_JEDI:
					Data.userSide = Constants.SIDE_JEDI;
					Data.aiSide = Constants.SIDE_SITH;
					createNewGame();
					break;   
				
				case Constants.MAP_BUTTON_BACK_MENU:
					removeMap();
					createMenu();
					break;
				
				case Constants.MAP_BUTTON_INVITE:
					VKAPI.vkConnection.callMethod("showInviteBox");
					break;
				
				case Constants.MAP_BUTTON_COMMAND:
					removeMap();
					createCommand();
					break;
				
				case Constants.MAP_BUTTON_SETTINGS:
					createSettings();
					break;
				
				case Constants.MAP_START_BATTLE_BUTTON_START:
					
					break;
					
				case Constants.MAP_START_BATTLE_BUTTON_CANCEL:
					if (map != null) map.onBattleStartClose();
					break;
				
				case Constants.COMMAND_BUTTON_CLOSE:
					removeCommand();
					createMap();
					break;
					
				default:
					break;
			}
		}
		/* ================================================================================== */
		
		/* CREATE NEW SAVE GAME ============================================================= */
		private var dataSetComplete:int = 0;
		private function createNewGame():void
		{
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
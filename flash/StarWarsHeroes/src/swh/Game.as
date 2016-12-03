package swh 
{
	import flash.display.Sprite;
	import flash.events.Event;
	
	import swh.data.Constants;
	import swh.events.NavigationEvent;
	import swh.menu.Menu;
	/**
	 * ...
	 * @author Catfish Studio
	 */
	public class Game extends Sprite 
	{
		private var gameMask:Sprite = new Sprite();	// маска
		private var menu:Menu;
		
		public function Game() 
		{
			super();
			addEventListener(Event.ADDED_TO_STAGE, onAddedToStage);
		}
			
		private function onAddedToStage(e:Event):void 
		{
			removeEventListener(Event.ADDED_TO_STAGE, onAddedToStage);
			
			/* Маска -------------------------------------------------------------------------------- */
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
			
			/* Загрузка окна: главное меню игры */
			menu = new Menu();
			addChild(menu);
		}
		
		/* Событие: управление окнами игры */
		private function onChangeScreen(e:NavigationEvent):void 
		{
			switch(e.param.id)
			{
				case Constants.MENU_BUTTON_CONTINUE: 
					
					break;
				   
				case Constants.MENU_BUTTON_NEW_GAME: 
					
					break;
				   
				case Constants.MENU_BUTTON_SETTINGS:
					
					break;
				   
				case Constants.MENU_BUTTON_INVITE:
					
					break;   
					
				default:
					break;
			}
		}
		
		
		
	}

}
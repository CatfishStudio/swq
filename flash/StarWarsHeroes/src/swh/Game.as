package swh 
{
	import starling.display.Sprite;
	import starling.events.Event;
	import starling.display.Quad;
	
	import swh.events.Navigation;
	import swh.data.Constants;
	import swh.data.Assets;
	
	import swh.menu.Menu;
	import swh.side.Side;
	
	
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
			
			createMenu();
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
		
		/* SIDE ---------------------------- */
		private function createSide():void
		{
			if (getChildByName(Constants.SIDE) == null) addChild(new Side());
		}
		
		private function removeSide():void
		{
			if (getChildByName(Constants.SIDE) != null) removeChild(getChildByName(Constants.SIDE));
		}
		/* -------------------------------- */
		
		private function onChangeScreen(event:Navigation):void 
		{
			switch(event.data.id)
			{
				case Constants.MENU_BUTTON_NEW_GAME:
				{
					removeMenu();
					createSide();
					break;
				}
				default:
				{
					break;
				}
			}
		}
		
	}

}
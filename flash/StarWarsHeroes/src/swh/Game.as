package swh 
{
	import starling.display.Sprite;
	import starling.events.Event;
	import starling.display.Quad;
	
	import swh.events.Navigation;
	import swh.data.Constants;
	import swh.data.Assets;
	
	import swh.menu.Menu;
	
	
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
		}
		
		private function onAddedToStage(e:Event):void 
		{
			removeEventListener(Event.ADDED_TO_STAGE, onAddedToStage);
			addEventListener(Navigation.CHANGE_SCREEN, onChangeScreen);
			
			mask = new Quad(Constants.GAME_WINDOW_WIDTH, Constants.GAME_WINDOW_HEIGHT);
			
			createMenu();
		}
		
		private function createMenu():void
		{
			if (getChildByName(Constants.MENU) == null) addChild(new Menu());
		}
		
		private function removeMenu():void
		{
			if (getChildByName(Constants.MENU) != null) removeChild(getChildByName(Constants.MENU));
		}
		
		private function onChangeScreen(event:Navigation):void 
		{
			switch(event.data.id)
			{
				case Constants.MENU:
				{
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
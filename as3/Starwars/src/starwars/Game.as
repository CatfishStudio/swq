package starwars 
{
	import starling.events.Event;
	import starling.core.Starling;
	import starling.display.Sprite;
	
	import starwars.events.Navigation;
	import starwars.statics.Constants;
	import starwars.menu.Menu;
	
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
			
			Starling.current.showStats = true;
			
			menu();
		}
		
		private function onChangeScreen(event:Navigation):void 
		{
			switch(event.data.id)
			{
				case Constants.MENU_CLOSE:
				{
					menu();
					break;
				}
				
				default:
				{
					break;
				}

			}
		}
		
		private function windowsCloseAll():void
		{
			if (getChildByName(Constants.MENU) != null)	removeChild(getChildByName(Constants.MENU));
		}
		
		/* Меню */
		private function menu():void
		{
			if (getChildByName(Constants.MENU) != null)
			{
				removeChild(getChildByName(Constants.MENU));
			} else {
				windowsCloseAll();
				addChild(new Menu());
			}
		}
		
		
	}
}
package starwars 
{
	import starling.events.Event;
	import starling.core.Starling;
	import starling.display.Sprite;
	
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
			
			Starling.current.showStats = true;
			
			menu();
		}
		
		/* Меню */
		private function menu():void
		{
			if (getChildByName(Constants.MENU) != null)
			{
				removeChild(getChildByName(Constants.MENU));
			} else {
				//windowAllClose();
				addChild(new Menu());
			}
		}
	}
}
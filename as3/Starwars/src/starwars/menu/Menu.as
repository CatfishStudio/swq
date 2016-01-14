package starwars.menu 
{
	import flash.system.*;
	
	import starling.display.Sprite;
	import starling.events.Event;
	
	import starwars.statics.Constants;
	
	public class Menu extends Sprite 
	{
		
		public function Menu() 
		{
			super();
			addEventListener(Event.ADDED_TO_STAGE, onAddedToStage);
			addEventListener(Event.REMOVED_FROM_STAGE, onRemoveFromStage);
		}
		
		private function onAddedToStage(e:Event):void 
		{
			removeEventListener(Event.ADDED_TO_STAGE, onAddedToStage);
			name = Constants.MENU;
		}
		
		private function onRemoveFromStage(e:Event):void 
		{
			removeEventListener(Event.REMOVED_FROM_STAGE, onRemoveFromStage);
			
			while (this.numChildren)
			{
				this.removeChildren(0, -1, true);
			}
			this.removeFromParent(true);
			
			super.dispose();
			System.gc();
			trace("[X] Удалена сцена меню");
		}
		
	}

}
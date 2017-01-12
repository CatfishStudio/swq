package swh.command 
{
	import flash.display.Sprite;
	import flash.events.Event;
	import flash.events.MouseEvent;
	import flash.ui.Mouse;
	import flash.ui.MouseCursor;
	
	import swh.data.Data;
	import swh.data.Constants;
	/**
	 * ...
	 * @author Catfish Studio
	 */
	public class CommandPlusButton extends Sprite 
	{
		private var color:int;
		
		public function CommandPlusButton(_x:int, _y:int, _name:String) 
		{
			super();
			x = _x;
			y = _y;
			name = _name;
			addEventListener(Event.ADDED_TO_STAGE, onAddedToStage);
			addEventListener(Event.REMOVED_FROM_STAGE, onRemoveFromStage);
		}
		
		private function onAddedToStage(e:Event):void 
		{
			removeEventListener(Event.ADDED_TO_STAGE, onAddedToStage);
			addEventListener(MouseEvent.MOUSE_OUT, onMouseOutButton);
			addEventListener(MouseEvent.MOUSE_OVER, onMouseOverButton);
			
			if (Data.userSide == Constants.SIDE_JEDI) color = 0x0000FF;
			else if (Data.userSide == Constants.SIDE_SITH) color = 0x880000;
			
			graphics.lineStyle(1, color, 1);
			graphics.beginFill(color, 0.8);
			graphics.drawRect(0, 0, 15, 15);
			graphics.endFill();
			
			graphics.lineStyle(1, 0xFFFFFF, 1);
			graphics.beginFill(0xFFFFFF, 1);
			graphics.moveTo(7.5, 7.5);
			graphics.lineTo(7.5, (7.5)-5);
			graphics.moveTo(7.5, 7.5);
			graphics.lineTo(7.5, (7.5) + 5);
			graphics.moveTo(7.5, 7.5);
			graphics.lineTo((7.5) - 5, 7.5);
			graphics.moveTo(7.5, 7.5);
			graphics.lineTo((7.5) + 5, 7.5);
			graphics.endFill();
		}
		
		private function onRemoveFromStage(e:Event):void 
		{
			removeEventListener(Event.REMOVED_FROM_STAGE, onRemoveFromStage);
			removeEventListener(MouseEvent.MOUSE_OUT, onMouseOutButton);
			removeEventListener(MouseEvent.MOUSE_OVER, onMouseOverButton);
			
			while (this.numChildren > 0)
			{
				this.removeChildren(0);
			}
		}
		
		private function onMouseOutButton(e:MouseEvent):void 
		{
			Mouse.cursor = MouseCursor.AUTO;
		}
		
		private function onMouseOverButton(e:MouseEvent):void 
		{
			Mouse.cursor = MouseCursor.BUTTON;
		}
	}

}
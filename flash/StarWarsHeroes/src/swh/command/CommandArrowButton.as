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
	public class CommandArrowButton extends Sprite 
	{
		private var direction:String;
		private var color:int;
		
		public function CommandArrowButton(_x:int, _y:int, _name:String, _direction:String = 'lr') 
		{
			super();
			x = _x;
			y = _y;
			name = _name;
			direction = _direction;
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
			
			if (direction == 'lr') {
				graphics.lineStyle(1, color, 1);
				graphics.beginFill(color, 0.8);
				graphics.moveTo(25, 0);
				graphics.lineTo(0, -30);
				graphics.lineTo(0, 30);
				graphics.lineTo(25, 0);
				graphics.endFill();

			}else{
				graphics.lineStyle(1, color, 1);
				graphics.beginFill(color, 0.8);
				graphics.moveTo(0, 0);
				graphics.lineTo(25, -30);
				graphics.lineTo(25, 30);
				graphics.lineTo(0, 0);
				graphics.endFill();
			}
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
package swh.command 
{
	import flash.display.Sprite;
	import flash.display.Bitmap;
	import flash.display.BitmapData;
	import flash.events.Event;
	import flash.events.MouseEvent;
	import flash.ui.Mouse;
	import flash.ui.MouseCursor;
	
	import swh.data.Data;
	import swh.data.Constants;
	import swh.command.CommandLabel;
	import swh.command.CommandPlusButton;
	
	/**
	 * ...
	 * @author Catfish Studio
	 */
	public class CommandCharacterictic extends Sprite 
	{
		private var color:int;
		private var imageBitmap:Bitmap;
		private var labelTitle:CommandLabel;
		private var labelData:CommandLabel;
		public var buttonPlus:CommandPlusButton;
		
		public function CommandCharacterictic(_x:int, _y:int, _name:String) 
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
			
			if (Data.userSide == Constants.SIDE_JEDI) color = 0x0000FF;
			else if (Data.userSide == Constants.SIDE_SITH) color = 0x880000;
		}
		
		private function onRemoveFromStage(e:Event):void 
		{
			removeEventListener(Event.REMOVED_FROM_STAGE, onRemoveFromStage);
			
			
			if (imageBitmap != null){
				removeChild(imageBitmap);
				imageBitmap = null;
			}
			if (labelTitle != null){
				removeChild(labelTitle);
				labelTitle = null;
			}
			if (labelData != null){
				removeChild(labelData);
				labelData = null;
			}
			if (buttonPlus != null){
				removeChild(buttonPlus);
				buttonPlus.removeEventListener(MouseEvent.MOUSE_OUT, onMouseOutButton);
				buttonPlus.removeEventListener(MouseEvent.MOUSE_OVER, onMouseOverButton);
				buttonPlus = null;
			}
			
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
		
		public function createImabe(bitmapData:BitmapData, scale:Number):void
		{
			imageBitmap = new Bitmap(bitmapData);
			imageBitmap.x = 0;
			imageBitmap.y = 0;
			imageBitmap.scaleX = scale;
			imageBitmap.scaleY = scale;
			addChild(imageBitmap);
		}
		
		public function createTitle(text:String):void
		{
			var left:Number = 0;
			if (imageBitmap != null) left += imageBitmap.width;
			labelTitle = new CommandLabel(left, 0, 200, 50, "arial", 14, text);
			addChild(labelTitle);
		}
		
		public function updateTitle(text:String):void
		{
			labelTitle.setText(text);
		}
		
		public function createData(value:String):void
		{
			labelData = new CommandLabel(180, 0, 50, 50, "arial" , 14, value);
			addChild(labelData);
		}
		
		public function updateData(text:String):void
		{
			labelData.setText(text);
		}
		
		public function createButtonPlus():void
		{
			buttonPlus = new CommandPlusButton(225, 2, name);
			buttonPlus.addEventListener(MouseEvent.MOUSE_OUT, onMouseOutButton);
			buttonPlus.addEventListener(MouseEvent.MOUSE_OVER, onMouseOverButton);
			addChild(buttonPlus);
		}
	}

}
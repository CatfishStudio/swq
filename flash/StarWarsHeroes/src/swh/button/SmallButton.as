package swh.button 
{
	import flash.display.Sprite;
	import flash.events.Event;
	import flash.display.Bitmap;
	import flash.display.BitmapData;
	
	/**
	 * ...
	 * @author Catfish Studio
	 */
	public class SmallButton extends Sprite 
	{
		private var frameBitmap:Bitmap;
		
		public function SmallButton(_x:int, _y:int, _name:String, _bitmapData:BitmapData) 
		{
			super();
			x = _x;
			y = _y;
			name = _name;
			frameBitmap = new Bitmap(_bitmapData);
			addEventListener(Event.ADDED_TO_STAGE, onAddedToStage);
			addEventListener(Event.REMOVED_FROM_STAGE, onRemoveFromStage);
		}
		
		private function onAddedToStage(e:Event):void 
		{
			removeEventListener(Event.ADDED_TO_STAGE, onAddedToStage);
			
			addChild(frameBitmap);
		}
		
		private function onRemoveFromStage(e:Event):void 
		{
			removeEventListener(Event.REMOVED_FROM_STAGE, onRemoveFromStage);
			
			removeChild(frameBitmap);
			frameBitmap = null;
			
			while (this.numChildren > 0)
			{
				this.removeChildren(0);
			}
		}
	}

}
package swh.animation 
{
	import flash.display.MovieClip;
	import flash.events.Event;
	import flash.display.BitmapData;
	import flash.display.Bitmap;
	
	import swh.data.Atlas;
	import swh.data.Constants;
	/**
	 * ...
	 * @author Catfish Studio
	 */
	public class DarthVader extends MovieClip 
	{
		private var frames:Vector.<String>;
		private var count:int = 0;
		private var frameBitmap:Bitmap;
		private var fps:int = 0;
		
		public function DarthVader(_x:int, _y:int, _name:String) 
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
			
			frames = new Vector.<String>();
			frames.push("side_darth_vader_01.png");
			frames.push("side_darth_vader_02.png");
			frames.push("side_darth_vader_03.png");
			frames.push("side_darth_vader_04.png");
			frames.push("side_darth_vader_05.png");
			frames.push("side_darth_vader_06.png");
			frames.push("side_darth_vader_07.png");
			frames.push("side_darth_vader_08.png");
			frames.push("side_darth_vader_09.png");
			frames.push("side_darth_vader_10.png");
			frames.push("side_darth_vader_11.png");
			frames.push("side_darth_vader_12.png");
			frames.push("side_darth_vader_13.png");
			frames.push("side_darth_vader_14.png");
			frames.push("side_darth_vader_15.png");
			frames.push("side_darth_vader_16.png");
			
			frameBitmap = new Bitmap((Atlas.atlasAnimationsBitmapData[frames[count]] as BitmapData));
			if (frameBitmap.width < 303) frameBitmap.x = (303 - frameBitmap.width);
			else frameBitmap.x = 0;
			addChild(frameBitmap);
			
			addEventListener(Event.ENTER_FRAME, onEnterFrame);
			play();
		}
		
		private function onRemoveFromStage(e:Event):void 
		{
			removeEventListener(Event.REMOVED_FROM_STAGE, onRemoveFromStage);
			
			stop();
			removeEventListener(Event.ENTER_FRAME, onEnterFrame);
			removeChild(frameBitmap);
			frameBitmap = null;
			frames = null;
			
			while (this.numChildren > 0)
			{
				this.removeChildren(0);
			}
		}
		
		private function onEnterFrame(e:Event):void 
		{
			fps += 30;
			if (fps == 90) {
				count++;
				if (count == frames.length) count = 0;
				frameBitmap.bitmapData = (Atlas.atlasAnimationsBitmapData[frames[count]] as BitmapData);
				if (frameBitmap.width < 303) frameBitmap.x = (303 - frameBitmap.width);
				else frameBitmap.x = 0;
				fps = 0;
			}
		}
		
	}

}
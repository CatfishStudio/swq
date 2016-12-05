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
	public class LukeSkywalker extends MovieClip 
	{
		private var frames:Vector.<String>;
		private var count:int = 0;
		private var frameBitmap:Bitmap;
		private var fps:int = 0;
		
		public function LukeSkywalker(_x:int, _y:int, _name:String) 
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
			frames.push("side_luke_skywalker_01.png");
			frames.push("side_luke_skywalker_02.png");
			frames.push("side_luke_skywalker_03.png");
			frames.push("side_luke_skywalker_04.png");
			frames.push("side_luke_skywalker_05.png");
			frames.push("side_luke_skywalker_06.png");
			frames.push("side_luke_skywalker_07.png");
			frames.push("side_luke_skywalker_08.png");
			frames.push("side_luke_skywalker_09.png");
			frames.push("side_luke_skywalker_10.png");
			frames.push("side_luke_skywalker_11.png");
			frames.push("side_luke_skywalker_12.png");
			frames.push("side_luke_skywalker_13.png");
			frames.push("side_luke_skywalker_14.png");
			frames.push("side_luke_skywalker_15.png");
			frames.push("side_luke_skywalker_16.png");
			frames.push("side_luke_skywalker_17.png");
			frames.push("side_luke_skywalker_18.png");
			frames.push("side_luke_skywalker_19.png");
			frames.push("side_luke_skywalker_20.png");
			frames.push("side_luke_skywalker_21.png");			
			
			frameBitmap = new Bitmap((Atlas.atlasAnimationsBitmapData[frames[count]] as BitmapData));
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
			fps += 10;
			if (fps == 90) {
				count++;
				if (count == frames.length) count = 0;
				frameBitmap.bitmapData = (Atlas.atlasAnimationsBitmapData[frames[count]] as BitmapData);
				fps = 0;
			}
		}
		
	}

}
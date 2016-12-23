package swh.command 
{
	import flash.display.Sprite;
	import flash.events.Event;
	import flash.display.Bitmap;
	import flash.display.BitmapData;
	
	import com.gskinner.motion.GTween;
	import com.gskinner.motion.GTweener;
	import com.gskinner.motion.GTweenTimeline;
	import com.gskinner.motion.easing.Sine;
	
	import swh.data.Assets;
	import swh.data.Atlas;
	import swh.data.Constants;
	import swh.text.Label;
	/**
	 * ...
	 * @author Catfish Studio
	 */
	public class CommandDroid extends Sprite 
	{
		private var r2d2Bitmap:Bitmap;
		private var hologramBitmap:Bitmap;
		private var lineBitmap:Bitmap;
		private var labelBack:Label;
		private var labelFront:Label;
		
		private var lineTween:GTween;
		
		private var text:String;
		private var side:String;
		private var colorBack:int;
		private var colorFront:int;
		
		public function CommandDroid(_x:int, _y:int, _text:String, _side:String) 
		{
			super();
			x = _x;
			y = _y;
			text = _text;
			side = _side;
			addEventListener(Event.ADDED_TO_STAGE, onAddedToStage);
			addEventListener(Event.REMOVED_FROM_STAGE, onRemoveFromStage);
		}
		private function onAddedToStage(e:Event):void 
		{
			removeEventListener(Event.ADDED_TO_STAGE, onAddedToStage);
			
			if (side == Constants.SIDE_JEDI) {
				colorFront = 0xFFFFFF;
				colorBack = 0x0090F0;	
				createBlue();
			}else if (side == Constants.SIDE_SITH) {
				colorFront = 0xFFFFFF;
				colorBack = 0x880000;
				createRed();
			}
		}
		
		private function onRemoveFromStage(e:Event):void 
		{
			removeEventListener(Event.REMOVED_FROM_STAGE, onRemoveFromStage);
			
			if(lineTween != null) {
				lineTween.onComplete = null;
				lineTween.end();
				lineTween = null;
			}			
			if(labelBack != null) {
				removeChild(labelBack);
				labelBack = null;
			}
			if(labelFront != null) {
				removeChild(labelFront);
				labelFront = null;
			}
			if(r2d2Bitmap != null) {
				removeChild(r2d2Bitmap);
				r2d2Bitmap = null;
			}
			if(hologramBitmap != null) {
				removeChild(hologramBitmap);
				hologramBitmap = null;
			}
			if(lineBitmap != null) {
				removeChild(lineBitmap);
				lineBitmap = null;
			}
			
			while (this.numChildren)
			{
				this.removeChildren(0);
			}
		}
		
		private function createBlue():void
		{
			r2d2Bitmap = new Bitmap((Atlas.atlasTexturesBitmapData['r2d2_droid_blue_right.png'] as BitmapData));
			r2d2Bitmap.x = 200;
			r2d2Bitmap.y = 185;
			r2d2Bitmap.scaleX = 0.75;
			r2d2Bitmap.scaleY = 0.75;
			addChild(r2d2Bitmap);
			
			hologramBitmap = new Bitmap((Atlas.atlasTexturesBitmapData['droid_blue_hologram.png'] as BitmapData));
			hologramBitmap.x = 0;
			hologramBitmap.y = 0;
			addChild(hologramBitmap);
			
			labelBack = new Label(5, 5, 250, 500, "arial", 14, colorBack, text, false);
			addChild(labelBack);
			labelFront = new Label(4, 4, 250, 500, "arial", 14, colorFront, text, false);
			addChild(labelFront);
			
			lineBitmap = new Bitmap((Atlas.atlasTexturesBitmapData['droid_blue_hologram_line.png'] as BitmapData));
			lineBitmap.x = 0;
			lineBitmap.y = 0;
			addChild(lineBitmap);
			
			runLineTween();
		}
		
		private function createRed():void
		{
			r2d2Bitmap = new Bitmap((Atlas.atlasTexturesBitmapData['r2d2_droid_red_right.png'] as BitmapData));
			r2d2Bitmap.x = 200;
			r2d2Bitmap.y = 185;
			r2d2Bitmap.scaleX = 0.75;
			r2d2Bitmap.scaleY = 0.75;
			addChild(r2d2Bitmap);
			
			hologramBitmap = new Bitmap((Atlas.atlasTexturesBitmapData['droid_red_hologram.png'] as BitmapData));
			hologramBitmap.x = 0;
			hologramBitmap.y = 0;
			addChild(hologramBitmap);
			
			labelBack = new Label(5, 5, 250, 500, "arial", 14, colorBack, text, false);
			addChild(labelBack);
			labelFront = new Label(4, 4, 250, 500, "arial", 14, colorFront, text, false);
			addChild(labelFront);
			
			lineBitmap = new Bitmap((Atlas.atlasTexturesBitmapData['droid_red_hologram_line.png'] as BitmapData));
			lineBitmap.x = 0;
			lineBitmap.y = 0;
			addChild(lineBitmap);
			
			runLineTween();
		}
		
		private function runLineTween():void
		{
			lineTween = new GTween(lineBitmap, 2);
			lineTween.setValue("y", lineBitmap.y + 140);
			lineTween.ease = Sine.easeInOut;
			lineTween.timeScale = 1;
			lineTween.onComplete = onTweenLine;
		}
		
		private function onTweenLine(tween:GTween):void		
		{
			lineBitmap.x = 0;
			lineBitmap.y = 0;
			lineTween.setValue("y", lineBitmap.y + 140);
			lineTween.ease = Sine.easeInOut;
			lineTween.timeScale = 1;
			lineTween.onComplete = onTweenLine;
		}
		
		public function setText(_text:String):void
		{
			text = _text;
			labelBack.text = text;
			labelBack.htmlText = text;
			labelFront.text = text;
			labelFront.htmlText = text;
		}
		
		public function getText():String
		{
			return text;
		}
		
	}

}
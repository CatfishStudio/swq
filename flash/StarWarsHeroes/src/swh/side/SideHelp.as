package swh.side 
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
	public class SideHelp extends Sprite 
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
		
		public function SideHelp(_x:int, _y:int, _text:String, _side:String) 
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
			
			lineTween.onComplete = null;
			lineTween.end();
			lineTween = null;
			
			removeChild(labelBack);
			labelBack = null;
			removeChild(labelFront);
			labelFront = null;
			
			removeChild(r2d2Bitmap);
			r2d2Bitmap = null;
			removeChild(hologramBitmap);
			hologramBitmap = null;
			removeChild(lineBitmap);
			lineBitmap = null;
			
			while (this.numChildren)
			{
				this.removeChildren(0);
			}
		}
		
		private function createRed():void
		{
			r2d2Bitmap = new Bitmap((Atlas.atlasTexturesBitmapData['r2d2_droid_red_left.png'] as BitmapData));
			r2d2Bitmap.x = -20;
			r2d2Bitmap.y = 125;
			addChild(r2d2Bitmap);
			
			hologramBitmap = new Bitmap((Atlas.atlasTexturesBitmapData['hologram_side_red.png'] as BitmapData));
			hologramBitmap.x = 0;
			hologramBitmap.y = 0;
			addChild(hologramBitmap);
			
			labelBack = new Label(5, 5, 280, 100, "arial", 14, colorBack, text, false);
			addChild(labelBack);
			labelFront = new Label(4, 4, 280, 100, "arial", 14, colorFront, text, false);
			addChild(labelFront);
			
			lineBitmap = new Bitmap((Atlas.atlasTexturesBitmapData['hologram_side_line_red.png'] as BitmapData));
			lineBitmap.x = 2;
			lineBitmap.y = 0;
			addChild(lineBitmap);
			
			runLineTween();
		}
		
		private function createBlue():void
		{
			r2d2Bitmap = new Bitmap((Atlas.atlasTexturesBitmapData['r2d2_droid_blue_right.png'] as BitmapData));
			r2d2Bitmap.x = 190;
			r2d2Bitmap.y = 125;
			addChild(r2d2Bitmap);
			
			hologramBitmap = new Bitmap((Atlas.atlasTexturesBitmapData['hologram_side_blue.png'] as BitmapData));
			hologramBitmap.x = 0;
			hologramBitmap.y = 0;
			addChild(hologramBitmap);
			
			labelBack = new Label(5, 5, 280, 100, "arial", 14, colorBack, text, false);
			addChild(labelBack);
			labelFront = new Label(4, 4, 280, 100, "arial", 14, colorFront, text, false);
			addChild(labelFront);
			
			lineBitmap = new Bitmap((Atlas.atlasTexturesBitmapData['hologram_side_line_blue.png'] as BitmapData));
			lineBitmap.x = 2;
			lineBitmap.y = 0;
			addChild(lineBitmap);
			
			runLineTween();
		}
		
		private function runLineTween():void
		{
			lineTween = new GTween(lineBitmap, 2);
			lineTween.setValue("x", 2);
			lineTween.setValue("y", 85);
			lineTween.ease = Sine.easeInOut;
			lineTween.timeScale = 1;
			lineTween.onComplete = onTweenLine;
		}
		
		private function onTweenLine(tween:GTween):void		
		{
			lineBitmap.x = 2;
			lineBitmap.y = 0;
			lineTween.setValue("x", 2);
			lineTween.setValue("y", 85);
			lineTween.ease = Sine.easeInOut;
			lineTween.timeScale = 1;
			lineTween.onComplete = onTweenLine;
		}
	}

}
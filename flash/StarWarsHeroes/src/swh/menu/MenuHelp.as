package swh.menu 
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
	public class MenuHelp extends Sprite 
	{
		private var r2d2Bitmap:Bitmap;
		private var hologramBitmap:Bitmap;
		private var lineBitmap:Bitmap;
		private var labelBack:Label;
		private var labelFront:Label;
		
		private var lineTween:GTween;
		
		private var text:String;
		private var colorBack:int;
		private var colorFront:int;
		
		public function MenuHelp(_text:String, _colorFront:int, _colorBack:int) 
		{
			super();
			text = _text;
			colorFront = _colorFront;
			colorBack = _colorBack;
			addEventListener(Event.ADDED_TO_STAGE, onAddedToStage);
			addEventListener(Event.REMOVED_FROM_STAGE, onRemoveFromStage);
		}
		
		private function onAddedToStage(e:Event):void 
		{
			removeEventListener(Event.ADDED_TO_STAGE, onAddedToStage);
			name = Constants.MENU_HELP;			
			create();
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
		
		private function create():void
		{
			r2d2Bitmap = new Bitmap((Atlas.atlasTexturesBitmapData['r2d2_droid_blue_right.png'] as BitmapData));
			r2d2Bitmap.x = 135;
			r2d2Bitmap.y = 265;
			addChild(r2d2Bitmap);
			
			hologramBitmap = new Bitmap((Atlas.atlasTexturesBitmapData['hologram_menu.png'] as BitmapData));
			hologramBitmap.x = 0;
			hologramBitmap.y = 0;
			addChild(hologramBitmap);
			
			labelBack = new Label(5, 5, 200, 235, "arial", 14, colorBack, text, false);
			addChild(labelBack);
			labelFront = new Label(4, 4, 200, 235, "arial", 14, colorFront, text, false);
			addChild(labelFront);
			
			lineBitmap = new Bitmap((Atlas.atlasTexturesBitmapData['hologram__line_menu.png'] as BitmapData));
			lineBitmap.x = 2;
			lineBitmap.y = 0;
			addChild(lineBitmap);
			
			runLineTween();
		}
		
		private function runLineTween():void
		{
			lineTween = new GTween(lineBitmap, 2);
			lineTween.setValue("x", 2);
			lineTween.setValue("y", 225);
			lineTween.ease = Sine.easeInOut;
			lineTween.timeScale = 1;
			lineTween.onComplete = onTweenLine;
		}
		
		private function onTweenLine(tween:GTween):void		
		{
			lineBitmap.x = 2;
			lineBitmap.y = 0;
			lineTween.setValue("x", 2);
			lineTween.setValue("y", 225);
			lineTween.ease = Sine.easeInOut;
			lineTween.timeScale = 1;
			lineTween.onComplete = onTweenLine;
		}
	}

}
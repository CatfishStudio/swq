package swh.map 
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
	
	/**
	 * ...
	 * @author Catfish Studio
	 */
	public class MapTarget extends Sprite 
	{
		private var side:String;
		private var color:int;
		private var angle:Number;
		
		private var rotateTween:GTween;
		
		public function MapTarget(_x:int, _y:int, _side:String) 
		{
			super();
			x = _x;
			y = _y;
			side = _side;
			addEventListener(Event.ADDED_TO_STAGE, onAddedToStage);
			addEventListener(Event.REMOVED_FROM_STAGE, onRemoveFromStage);
		}
		
		private function onAddedToStage(e:Event):void 
		{
			removeEventListener(Event.ADDED_TO_STAGE, onAddedToStage);
			
			if (side == Constants.SIDE_JEDI) {
				color = 0x0000FF;
			}else if (side == Constants.SIDE_SITH) {
				color = 0xFF0000;
			}
			create();
		}
		
		private function onRemoveFromStage(e:Event):void 
		{
			removeEventListener(Event.REMOVED_FROM_STAGE, onRemoveFromStage);
			
			rotateTween.onComplete = null;
			rotateTween.end();
			rotateTween = null;
			
			while (this.numChildren)
			{
				this.removeChildren(0);
			}
		}
		
		private function create():void
		{
			graphics.lineStyle(2, color, 0.5);
			graphics.beginFill(color, 0.2);
			graphics.moveTo(0, -5);
			graphics.lineTo( -15, -55);
			graphics.lineTo(15, -55);
			graphics.lineTo(0, -5);
			graphics.endFill();
			
			graphics.lineStyle(2, color, 0.5);
			graphics.beginFill(color, 0.2);
			graphics.moveTo(0, 5);
			graphics.lineTo(-15, 55);
			graphics.lineTo(15, 55);
			graphics.lineTo(0, 5);
			graphics.endFill();
			
			graphics.lineStyle(2, color, 0.5);
			graphics.beginFill(color, 0.2);
			graphics.moveTo(-5, 0);
			graphics.lineTo(-55, -15);
			graphics.lineTo(-55, 15);
			graphics.lineTo(-5, 0);
			graphics.endFill();
			
			graphics.lineStyle(2, color, 0.5);
			graphics.beginFill(color, 0.2);
			graphics.moveTo(5, 0);
			graphics.lineTo(55, -15);
			graphics.lineTo(55, 15);
			graphics.lineTo(5, 0);
			graphics.endFill();
			
			runTween();
		}
		
		private function runTween():void
		{
			angle = 180;
			rotateTween = new GTween(this, 2);
			rotateTween.setValue("rotationZ", angle);
			rotateTween.timeScale = 1;
			rotateTween.onComplete = onTween;
		}
		
		private function onTween(tween:GTween):void		
		{
			angle += 180;
			rotateTween.setValue("rotationZ", angle);
			rotateTween.timeScale = 1;
			rotateTween.onComplete = onTween;
		}
		
	}

}
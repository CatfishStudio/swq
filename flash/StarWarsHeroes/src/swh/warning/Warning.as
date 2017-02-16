package swh.warning 
{
	import flash.display.Sprite;
	import flash.events.Event;
	import flash.display.Bitmap;
	import flash.display.BitmapData;
	import flash.events.MouseEvent;
	import flash.ui.Mouse;
	import flash.ui.MouseCursor;
	
	import com.gskinner.motion.GTween;
	import com.gskinner.motion.GTweener;
	import com.gskinner.motion.GTweenTimeline;
	import com.gskinner.motion.easing.Sine;
	
	import swh.data.Utilits;
	import swh.data.Constants;
	import swh.data.Data;
	import swh.data.Assets;
	import swh.data.Atlas;
	import swh.text.Label;
	import swh.button.Button;
	/**
	 * ...
	 * @author Catfish Studio
	 */
	public class Warning extends Sprite 
	{
		private var text:String;
		private var colorBack:uint;
		private var colorFront:uint;
		
		private var background:Sprite;
		private var windowBitmap:Bitmap;
		private var lineBitmap:Bitmap;
		private var labelBack:Label;
		private var labelFront:Label;
		private var closeButton:Button;
		
		private var lineTween:GTween;
		
		public function Warning() 
		{
			super();
			addEventListener(Event.ADDED_TO_STAGE, onAddedToStage);
			addEventListener(Event.REMOVED_FROM_STAGE, onRemoveFromStage);
		}
		
		private function onAddedToStage(e:Event):void 
		{
			removeEventListener(Event.ADDED_TO_STAGE, onAddedToStage);
			
			name = Constants.WARNING;
			init();
			createBackground();
			createWindow();
			createButtons();
		}
		
		private function onRemoveFromStage(e:Event):void 
		{
			removeEventListener(Event.REMOVED_FROM_STAGE, onRemoveFromStage);
			Mouse.cursor = MouseCursor.AUTO;
			
			lineTween.onComplete = null;
			lineTween.end();
			lineTween = null;
			
			removeChild(labelBack);
			labelBack = null;
			removeChild(labelFront);
			labelFront = null;
			
			removeChild(closeButton);
			closeButton = null;
			
			removeChild(windowBitmap);
			windowBitmap = null
			removeChild(lineBitmap);
			lineBitmap = null;
			
			removeChild(background);
			background = null;
			
			while (this.numChildren > 0)
			{
				this.removeChildren(0);
			}
		}
		
		private function init():void
		{
			text = "В Вашей команде нет не одного персонажа.\nВы не можите начать битву пока в команде\nне будет хотябы один персонаж!";
			if (Data.userSide == Constants.SIDE_JEDI){
				colorFront = 0xFFFFFF;
				colorBack = 0x0090F0;
			}
			if (Data.userSide == Constants.SIDE_SITH){
				colorFront = 0xFFFFFF;
				colorBack = 0x880000;
			}
		}
		
		private function createBackground():void
		{
			background = new Sprite();
			background.graphics.lineStyle(1, 0x000000, 1);
			background.graphics.beginFill(0x000000, 1);
			background.graphics.drawRect(0, 0, Constants.GAME_WINDOW_WIDTH, Constants.GAME_WINDOW_HEIGHT);
			background.graphics.endFill();
			background.x = 0; 
			background.y = 0;
			background.alpha = 0.4;
			this.addChild(background);
		}
		
		private function createWindow(): void
		{
			if (Data.userSide == Constants.SIDE_JEDI){
				lineBitmap = new Bitmap((Assets.assetsTexturesContent.settingsBlueLineBitmap as Bitmap).bitmapData);
				lineBitmap.x = (Constants.GAME_WINDOW_WIDTH / 2) - (lineBitmap.width / 2)
				lineBitmap.y = 240;
				addChild(lineBitmap);				
				
				windowBitmap = new Bitmap((Assets.assetsTexturesContent.messageBlueBgBitmap as Bitmap).bitmapData);
				windowBitmap.x = (Constants.GAME_WINDOW_WIDTH / 2) - (windowBitmap.width / 2);
				windowBitmap.y = (Constants.GAME_WINDOW_HEIGHT / 2) - (windowBitmap.height / 2);
				addChild(windowBitmap);
				
				runLineTween();
				
			} else if (Data.userSide == Constants.SIDE_SITH){
				lineBitmap = new Bitmap((Assets.assetsTexturesContent.settingsRedLineBitmap as Bitmap).bitmapData);
				lineBitmap.x = (Constants.GAME_WINDOW_WIDTH / 2) - (lineBitmap.width / 2)
				lineBitmap.y = 240;
				addChild(lineBitmap);	
				
				windowBitmap = new Bitmap((Assets.assetsTexturesContent.messageRedBgBitmap as Bitmap).bitmapData);
				windowBitmap.x = (Constants.GAME_WINDOW_WIDTH / 2) - (windowBitmap.width / 2);
				windowBitmap.y = (Constants.GAME_WINDOW_HEIGHT / 2) - (windowBitmap.height / 2);
				addChild(windowBitmap);
				
				runLineTween();
			}
			
			labelBack = new Label((windowBitmap.x + 5), (windowBitmap.y + 35), 350, 215, "arial", 14, colorBack, text, false);
			addChild(labelBack);
			labelFront = new Label((windowBitmap.x + 4), (windowBitmap.y + 34), 350, 215, "arial", 14, colorFront, text, false);
			addChild(labelFront);
		}
		
		private function runLineTween():void
		{
			lineTween = new GTween(lineBitmap, 2);
			lineTween.setValue("y", lineBitmap.y + 240);
			lineTween.ease = Sine.easeInOut;
			lineTween.timeScale = 1;
			lineTween.onComplete = onTweenLine;
		}
		
		private function onTweenLine(tween:GTween):void		
		{
			lineBitmap.y = 240;
			lineTween.setValue("y", lineBitmap.y + 240);
			lineTween.ease = Sine.easeInOut;
			lineTween.timeScale = 1;
			lineTween.onComplete = onTweenLine;
		}
		
		private function createButtons():void
		{
			closeButton = new Button((Constants.GAME_WINDOW_WIDTH / 2) - 100, (Constants.GAME_WINDOW_HEIGHT / 2) + 72, "ЗАКРЫТЬ", 60, 15, 16,  Constants.WARNING_BUTTON_CLOSE, Data.userSide);
			addChild(closeButton);
		}
		
	}

}
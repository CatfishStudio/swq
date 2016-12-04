package swh.settings 
{
	import flash.display.Sprite;
	import flash.events.Event;
	import flash.display.Bitmap;
	import flash.display.BitmapData;
	
	import com.gskinner.motion.GTween;
	import com.gskinner.motion.GTweener;
	import com.gskinner.motion.GTweenTimeline;
	import com.gskinner.motion.easing.Sine;
	
	import swh.data.Constants;
	import swh.data.Data;
	import swh.data.Assets;
	import swh.data.Atlas;
	import swh.Config;
	import swh.text.Label;
	import swh.button.Button;
	import swh.button.SmallButton;
	/**
	 * ...
	 * @author Catfish Studio
	 */
	public class Settings extends Sprite 
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
		private var soundSButton:SmallButton;
		private var musicSButton:SmallButton;
		private var infoSButton:SmallButton;
		
		private var lineTween:GTween;
		
		public function Settings() 
		{
			super();
			addEventListener(Event.ADDED_TO_STAGE, onAddedToStage);
			addEventListener(Event.REMOVED_FROM_STAGE, onRemoveFromStage);
		}
		
		private function onAddedToStage(e:Event):void 
		{
			removeEventListener(Event.ADDED_TO_STAGE, onAddedToStage);
			
			name = Constants.SETTINGS;
			init();
			createBackground();
			createWindow();
			createButtons();
		}
		
		private function onRemoveFromStage(e:Event):void 
		{
			removeEventListener(Event.REMOVED_FROM_STAGE, onRemoveFromStage);
			
			lineTween.end();
			lineTween = null;
			
			removeChild(labelBack);
			labelBack = null;
			removeChild(labelFront);
			labelFront = null;
			
			removeChild(closeButton);
			closeButton = null;
			removeChild(soundSButton);
			soundSButton = null;
			removeChild(musicSButton);
			musicSButton = null;
			removeChild(infoSButton);
			infoSButton = null;
			
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
			text = "Окно настроек позволяет включить или отключить в игре звуки и музыку.\n\n\n\n\n\nТакже вы можете посетить группу разработчика ВКонтакте, нажав на кнопку 'информация'.";
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
				
				windowBitmap = new Bitmap((Assets.assetsTexturesContent.settingsBlueBgBitmap as Bitmap).bitmapData);
				windowBitmap.x = (Constants.GAME_WINDOW_WIDTH / 2) - (windowBitmap.width / 2);
				windowBitmap.y = (Constants.GAME_WINDOW_HEIGHT / 2) - (windowBitmap.height / 2);
				addChild(windowBitmap);
				
				runLineTween();
				
			} else if (Data.userSide == Constants.SIDE_SITH){
				lineBitmap = new Bitmap((Assets.assetsTexturesContent.settingsRedLineBitmap as Bitmap).bitmapData);
				lineBitmap.x = (Constants.GAME_WINDOW_WIDTH / 2) - (lineBitmap.width / 2)
				lineBitmap.y = 240;
				addChild(lineBitmap);	
				
				windowBitmap = new Bitmap((Assets.assetsTexturesContent.settingsRedLineBitmap as Bitmap).bitmapData);
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
			if (Config.soundOn == true) soundSButton = new SmallButton((Constants.GAME_WINDOW_WIDTH / 2) - 125, (Constants.GAME_WINDOW_HEIGHT / 2) - 35, Constants.SETTINGS_BUTTON_SOUND, (Assets.assetsTexturesContent.soundOnBitmap as Bitmap).bitmapData);
			else soundSButton = new SmallButton((Constants.GAME_WINDOW_WIDTH / 2) - 125, (Constants.GAME_WINDOW_HEIGHT / 2) - 35, Constants.SETTINGS_BUTTON_SOUND, (Assets.assetsTexturesContent.soundOffBitmap as Bitmap).bitmapData);
			addChild(soundSButton);
			
			if (Config.musicOn == true) musicSButton = new SmallButton((Constants.GAME_WINDOW_WIDTH / 2) - 15, (Constants.GAME_WINDOW_HEIGHT / 2) - 35, Constants.SETTINGS_BUTTON_MUSIC, (Assets.assetsTexturesContent.musicOnBitmap as Bitmap).bitmapData);
			else  musicSButton = new SmallButton((Constants.GAME_WINDOW_WIDTH / 2) - 15, (Constants.GAME_WINDOW_HEIGHT / 2) - 35, Constants.SETTINGS_BUTTON_MUSIC, (Assets.assetsTexturesContent.musicOffBitmap as Bitmap).bitmapData);
			addChild(musicSButton);
			
			infoSButton = new SmallButton((Constants.GAME_WINDOW_WIDTH / 2) + 90, (Constants.GAME_WINDOW_HEIGHT / 2) - 37, Constants.SETTINGS_BUTTON_INFO, (Assets.assetsTexturesContent.informationBitmap as Bitmap).bitmapData);
			addChild(infoSButton);
			
			closeButton = new Button((Constants.GAME_WINDOW_WIDTH / 2) - 100, (Constants.GAME_WINDOW_HEIGHT / 2) + 72, "ЗАКРЫТЬ", 60, 15, 16,  Constants.SETTINGS_BUTTON_CLOSE);
			addChild(closeButton);
		}
	}

}
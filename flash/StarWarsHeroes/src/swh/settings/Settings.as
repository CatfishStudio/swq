package swh.settings 
{
	import flash.system.*;
	import flash.display.Bitmap;
	
	import starling.display.Sprite;
	import starling.events.Event;
	import starling.display.Image;
	import starling.display.Quad;
	import starling.textures.Texture;
	import starling.text.TextField;
	import starling.text.TextFormat;
	import starling.core.Starling;
	import starling.animation.Tween;
	
	import swh.data.Constants;
	import swh.data.Data;
	import swh.data.Assets;
	/**
	 * ...
	 * @author Catfish Studio
	 */
	public class Settings extends Sprite 
	{
		private var image:Image;
		private var quad:Quad;
		private var textField1:TextField;
		private var textField2:TextField;
		private var tweenLine:Tween;
		
		private var text:String;
		private var colorBack:uint;
		private var colorFront:uint;
		
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
			createQuad();
			createBackground();
			
			trace('[SETTINGS]: added to stage');
		}
		
		private function onRemoveFromStage(e:Event):void 
		{
			removeEventListener(Event.REMOVED_FROM_STAGE, onRemoveFromStage);
			
			while (this.numChildren)
			{
				this.removeChildren(0, -1, true);
			}
			this.removeFromParent(true);
			super.dispose();
			System.gc();
			trace('[SETTINGS]: removed from stage');
		}
		
		private function init():void
		{
			text = "Окно настроек позволяет включить или отключить в игре звуки и музыку.\n\n\n\n\nТакже вы можете посетить группу разработчика ВКонтакте, нажав на кнопку 'информация'.";
			if (Data.userSide == Constants.SIDE_JEDI){
				colorFront = 0xFFFFFF;
				colorBack = 0x0090F0;
			}
			if (Data.userSide == Constants.SIDE_SITH){
				colorFront = 0xFFFFFF;
				colorBack = 0x880000;
			}
		}
		
		private function createQuad():void
		{
			quad = new Quad(Constants.GAME_WINDOW_WIDTH, Constants.GAME_WINDOW_HEIGHT,  0x000000);
			quad.alpha = 0.5;
			quad.x = 0 - this.x;
			quad.y = 0 - this.y;
			this.addChild(quad);
		}
		
		private function createBackground():void
		{
			if (Data.userSide == Constants.SIDE_JEDI){
				image = new Image(Texture.fromBitmap(Assets.assetsContent.settingsBlueBgBitmap));
				image.name = 'settings_background';
				image.x = (Constants.GAME_WINDOW_WIDTH / 2) - (image.width / 2); 
				image.y = (Constants.GAME_WINDOW_HEIGHT / 2) - (image.height / 2);
				addChild(image);
			}
			if (Data.userSide == Constants.SIDE_SITH){
				image = new Image(Texture.fromBitmap(Assets.assetsContent.settingsRedBgBitmap));
				image.name = 'settings_background';
				image.x = (Constants.GAME_WINDOW_WIDTH / 2) - (image.width / 2); 
				image.y = (Constants.GAME_WINDOW_HEIGHT / 2) - (image.height / 2);
				addChild(image);
			}
		}
		
	}

}
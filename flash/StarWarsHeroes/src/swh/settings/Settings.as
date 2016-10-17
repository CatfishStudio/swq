package swh.settings 
{
	import flash.system.*;
	import flash.display.Bitmap;
	import starling.display.Button;
	
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
	import swh.Config;
	import swh.data.Data;
	import swh.data.Assets;
	import swh.events.Navigation;
	/**
	 * ...
	 * @author Catfish Studio
	 */
	public class Settings extends Sprite 
	{
		private var button:Button;
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
			addEventListener(Event.TRIGGERED, onButtonsClick);
			
			name = Constants.SETTINGS;
			init();
			createQuad();
			createBackground();
			createButtons();
			onTweenLine();
			
			trace('[SETTINGS]: added to stage');
		}
		
		private function onRemoveFromStage(e:Event):void 
		{
			removeEventListener(Event.REMOVED_FROM_STAGE, onRemoveFromStage);
			removeEventListener(Event.TRIGGERED, onButtonsClick);
			Starling.juggler.remove(tweenLine);
			tweenLine = null;
			
			if (button != null){
				removeChild(button);
				button.dispose();
				button = null;
			}
			
			if (image != null){
				removeChild(image);
				image.dispose();
				image = null;
			}
			
			if (quad != null){
				removeChild(quad);
				quad.dispose();
				quad = null;
			}
			
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
				image = new Image(Texture.fromBitmap(Assets.assetsContent.settingsBlueLineBitmap));
				image.name = 'hologram_line';
				image.x = (Constants.GAME_WINDOW_WIDTH / 2) - (image.width / 2); 
				image.y = 240;
				addChild(image);
				
				image = new Image(Texture.fromBitmap(Assets.assetsContent.settingsBlueBgBitmap));
				image.name = 'settings_background';
				image.x = (Constants.GAME_WINDOW_WIDTH / 2) - (image.width / 2); 
				image.y = (Constants.GAME_WINDOW_HEIGHT / 2) - (image.height / 2);
				addChild(image);
			}
			if (Data.userSide == Constants.SIDE_SITH){
				image = new Image(Texture.fromBitmap(Assets.assetsContent.settingsRedLineBitmap));
				image.name = 'hologram_line';
				image.x = (Constants.GAME_WINDOW_WIDTH / 2) - (image.width / 2); 
				image.y = 240;
				addChild(image);
				
				image = new Image(Texture.fromBitmap(Assets.assetsContent.settingsRedBgBitmap));
				image.name = 'settings_background';
				image.x = (Constants.GAME_WINDOW_WIDTH / 2) - (image.width / 2); 
				image.y = (Constants.GAME_WINDOW_HEIGHT / 2) - (image.height / 2);
				addChild(image);
			}
			
			
			var textFormat:TextFormat;
			textFormat = new TextFormat("Arial", 14, colorBack, "left", "center");
			textFormat.bold = true;
			textField1 = new TextField(350, 215, text, textFormat);
			textField1.x = (image.x + 5);
			textField1.y = image.y;
			addChild(textField1);
			
			textFormat = new TextFormat("Arial", 14, colorFront, "left", "center");
			textFormat.bold = true;
			textField2 = new TextField(350, 215, text, textFormat);
			textField2.x = (image.x + 5) - 1.5;
			textField2.y = image.y - 1;
			addChild(textField2);
		}
		
		private function onTweenLine():void
		{
			Starling.juggler.remove(tweenLine);
			image = (getChildByName('hologram_line') as Image);
			image.y = 240;
			tweenLine = new Tween(image, 2.0, "easeInOut");
			tweenLine.animate("y", image.y + 240);
			tweenLine.onComplete = onTweenLine;
			Starling.juggler.add(tweenLine);
		}
		
		private function createButtons():void
		{
			if (Config.soundOn == true) button = new Button(Texture.fromBitmap(Assets.assetsContent.soundOnBitmap));
			else button = new Button(Texture.fromBitmap(Assets.assetsContent.soundOffBitmap));
			button.name = Constants.SETTINGS_BUTTON_SOUND;
			button.x = (Constants.GAME_WINDOW_WIDTH / 2) - 125;
			button.y = (Constants.GAME_WINDOW_HEIGHT / 2) - 35;
			addChild(button);
			
			if (Config.musicOn == true) button = new Button(Texture.fromBitmap(Assets.assetsContent.musicOnBitmap));
			else button = new Button(Texture.fromBitmap(Assets.assetsContent.musicOffBitmap));
			button.name = Constants.SETTINGS_BUTTON_MUSIC;
			button.x = (Constants.GAME_WINDOW_WIDTH / 2) - 15;
			button.y = (Constants.GAME_WINDOW_HEIGHT / 2) - 35;
			addChild(button);
			
			button = new Button(Texture.fromBitmap(Assets.assetsContent.informationBitmap));
			button.name = Constants.SETTINGS_BUTTON_INFO;
			button.x = (Constants.GAME_WINDOW_WIDTH / 2) + 90;
			button.y = (Constants.GAME_WINDOW_HEIGHT / 2) - 35;
			addChild(button);
		}
		
		private function updateButtonSound():void 
		{
			button = Button(getChildByName(Constants.SETTINGS_BUTTON_SOUND));
			if (Config.soundOn == true) {
				Config.soundOn = false;
				button.upState = Texture.fromBitmap(Assets.assetsContent.soundOffBitmap)
			} else {
				Config.soundOn = true;
				button.upState = Texture.fromBitmap(Assets.assetsContent.soundOnBitmap);
			}
		}
		
		private function updateButtonMusic():void 
		{
			button = Button(getChildByName(Constants.SETTINGS_BUTTON_MUSIC));
			if (Config.musicOn == true) {
				Config.musicOn = false;
				button.upState = Texture.fromBitmap(Assets.assetsContent.musicOffBitmap)
			} else {
				Config.musicOn = true;
				button.upState = Texture.fromBitmap(Assets.assetsContent.musicOnBitmap);
			}
		}
		
		private function onButtonsClick(e:Event):void 
		{
			switch(Button(e.target).name){
				case Constants.SETTINGS_BUTTON_SOUND:
				{
					//Sounds.PlaySound(Sounds.Sound3);
					updateButtonSound();
					break;
				}
				case Constants.SETTINGS_BUTTON_MUSIC:
				{
					//Sounds.PlaySound(Sounds.Sound3);
					updateButtonMusic();
					break;
				}
				case Constants.SETTINGS_BUTTON_INFO:
				{
					
					break;
				}
				case Constants.SETTINGS_BUTTON_CLOSE:
				{
					//Sounds.PlaySound(Sounds.Sound4);
					dispatchEvent(new Navigation(Navigation.CHANGE_SCREEN, true, { id: Button(e.target).name }));
					break;
				}
				default:
				{
					break;
				}
			}
		}
		
	}

}
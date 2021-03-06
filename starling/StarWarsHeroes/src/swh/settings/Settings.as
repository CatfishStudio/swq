package swh.settings 
{
	import flash.system.*;
	import flash.display.Bitmap;
	import flash.net.URLRequest;
	import flash.net.navigateToURL;
	
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
	import swh.buttons.Buttons;
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
		private var buttonClose:Buttons;
		
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
			if (buttonClose != null){
				removeChild(buttonClose);
				buttonClose.dispose();
				buttonClose = null;
			}
			
			if (image != null){
				removeChild(image);
				image.dispose();
				image = null;
			}
			
			if (textField1 != null){
				removeChild(textField1);
				textField1.dispose();
				textField1 = null;
			}
			
			if (textField2 != null){
				removeChild(textField2);
				textField2.dispose();
				textField2 = null;
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
				image = new Image(Texture.fromBitmap(Assets.assetsTexturesContent.settingsBlueLineBitmap));
				image.name = 'hologram_line';
				image.x = (Constants.GAME_WINDOW_WIDTH / 2) - (image.width / 2); 
				image.y = 240;
				addChild(image);
				
				image = new Image(Texture.fromBitmap(Assets.assetsTexturesContent.settingsBlueBgBitmap));
				image.name = 'settings_background';
				image.x = (Constants.GAME_WINDOW_WIDTH / 2) - (image.width / 2); 
				image.y = (Constants.GAME_WINDOW_HEIGHT / 2) - (image.height / 2);
				addChild(image);
			}
			if (Data.userSide == Constants.SIDE_SITH){
				image = new Image(Texture.fromBitmap(Assets.assetsTexturesContent.settingsRedLineBitmap));
				image.name = 'hologram_line';
				image.x = (Constants.GAME_WINDOW_WIDTH / 2) - (image.width / 2); 
				image.y = 240;
				addChild(image);
				
				image = new Image(Texture.fromBitmap(Assets.assetsTexturesContent.settingsRedBgBitmap));
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
			if (Config.soundOn == true) button = new Button(Texture.fromBitmap(Assets.assetsTexturesContent.soundOnBitmap));
			else button = new Button(Texture.fromBitmap(Assets.assetsTexturesContent.soundOffBitmap));
			button.name = Constants.SETTINGS_BUTTON_SOUND;
			button.x = (Constants.GAME_WINDOW_WIDTH / 2) - 125;
			button.y = (Constants.GAME_WINDOW_HEIGHT / 2) - 35;
			addChild(button);
			
			if (Config.musicOn == true) button = new Button(Texture.fromBitmap(Assets.assetsTexturesContent.musicOnBitmap));
			else button = new Button(Texture.fromBitmap(Assets.assetsTexturesContent.musicOffBitmap));
			button.name = Constants.SETTINGS_BUTTON_MUSIC;
			button.x = (Constants.GAME_WINDOW_WIDTH / 2) - 15;
			button.y = (Constants.GAME_WINDOW_HEIGHT / 2) - 35;
			addChild(button);
			
			button = new Button(Texture.fromBitmap(Assets.assetsTexturesContent.informationBitmap));
			button.name = Constants.SETTINGS_BUTTON_INFO;
			button.x = (Constants.GAME_WINDOW_WIDTH / 2) + 90;
			button.y = (Constants.GAME_WINDOW_HEIGHT / 2) - 37;
			addChild(button);
			
			if (Data.userSide == Constants.SIDE_JEDI) buttonClose = new Buttons("ЗАКРЫТЬ", Assets.textureAtlasAnimation.getTextures('button_blue_'), 12, 14, 0xFFFFFF, 0x0090F0);
			else buttonClose = new Buttons("ЗАКРЫТЬ", Assets.textureAtlasAnimation.getTextures('button_red_'), 12, 14, 0xFFFFFF, 0x880000);
			buttonClose.name = Constants.SETTINGS_BUTTON_CLOSE;
			buttonClose.x = (Constants.GAME_WINDOW_WIDTH / 2) - 100;
			buttonClose.y = (Constants.GAME_WINDOW_HEIGHT / 2) + 72;
			addChild(buttonClose);
			
		}
		
		private function updateButtonSound():void 
		{
			button = Button(getChildByName(Constants.SETTINGS_BUTTON_SOUND));
			if (Config.soundOn == true) {
				Config.soundOn = false;
				button.upState = Texture.fromBitmap(Assets.assetsTexturesContent.soundOffBitmap)
			} else {
				Config.soundOn = true;
				button.upState = Texture.fromBitmap(Assets.assetsTexturesContent.soundOnBitmap);
			}
		}
		
		private function updateButtonMusic():void 
		{
			button = Button(getChildByName(Constants.SETTINGS_BUTTON_MUSIC));
			if (Config.musicOn == true) {
				Config.musicOn = false;
				button.upState = Texture.fromBitmap(Assets.assetsTexturesContent.musicOffBitmap)
			} else {
				Config.musicOn = true;
				button.upState = Texture.fromBitmap(Assets.assetsTexturesContent.musicOnBitmap);
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
					navigateToURL(new URLRequest(Config.info));
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
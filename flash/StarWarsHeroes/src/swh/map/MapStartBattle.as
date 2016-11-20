package swh.map 
{
	import flash.system.*;
	import starling.display.Sprite;
	import starling.display.Image;
	import starling.display.Quad;
	import starling.core.Starling;
	import starling.animation.Tween;
	import starling.events.Event;
	import starling.text.TextField;
	import starling.text.TextFormat;
	
	import swh.data.Constants;
	import swh.data.Assets;
	import swh.data.Data;
	import swh.buttons.Buttons;
	import swh.data.Planet;
	/**
	 * ...
	 * @author Catfish Studio
	 */
	public class MapStartBattle extends Sprite 
	{
		private var planet:Planet;
		private var posX:int;
		private var posY:int;
		private var colorBack:uint;
		private var colorFront:uint;
		
		private var image:Image;
		private var quad:Quad;
		private var button:Buttons;
		private var tweenLine:Tween;
		private var textField1:TextField;
		private var textField2:TextField;
		
		public function MapStartBattle(_planet:Planet) 
		{
			super();
			planet = _planet;
			addEventListener(Event.ADDED_TO_STAGE, onAddedToStage);
			addEventListener(Event.REMOVED_FROM_STAGE, onRemoveFromStage);
		}
		
		private function onAddedToStage(e:Event):void 
		{
			removeEventListener(Event.ADDED_TO_STAGE, onAddedToStage);
			
			name = Constants.MAP_START_BATTLE;
			init();
			createQuad();
			createBackground();
			createPersonages();
			createBorder();
			createText();
		}
		
		private function onRemoveFromStage(e:Event):void 
		{
			removeEventListener(Event.REMOVED_FROM_STAGE, onRemoveFromStage);
			Starling.juggler.remove(tweenLine);
			tweenLine = null;
			
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
		}
		
		private function init():void
		{
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
			quad.alpha = 0.2;
			quad.x = 0 - this.x;
			quad.y = 0 - this.y;
			this.addChild(quad);
		}
		
		private function createBackground():void
		{
			if (Data.userSide == Constants.SIDE_JEDI) {
				image = new Image(Assets.textureAtlas.getTexture('map_window_start_battle_blue_background.png'));
				image.name = 'background';
				posX = (Constants.GAME_WINDOW_WIDTH / 2) - (image.width / 2);
				posY = (Constants.GAME_WINDOW_HEIGHT / 2) - (image.height / 2 + 50);
				image.x = posX; 
				image.y = posY;
				image.alpha = 0.8;
				addChild(image);
			}
			if (Data.userSide == Constants.SIDE_SITH) {
				image = new Image(Assets.textureAtlas.getTexture('map_window_start_battle_red_background.png'));
				image.name = 'background';
				posX = (Constants.GAME_WINDOW_WIDTH / 2) - (image.width / 2);
				posY = (Constants.GAME_WINDOW_HEIGHT / 2) - (image.height / 2 + 50);
				image.x = posX; 
				image.y = posY;
				image.alpha = 0.8;
				addChild(image);
			}
		}
		
		private function createPersonages():void
		{
			if (Data.userSide == Constants.SIDE_JEDI) {
				image = new Image(Assets.getPersonageTexture(Data.userCommand[0].id));
				image.x = posX + 25; 
				image.y = posY + 15;
				image.scale = 0.5;
				addChild(image);
				
				image = new Image(Assets.getPersonageTexture(planet.personageSith1));
				image.x = posX + 300; 
				image.y = posY + 15;
				image.scale = 0.5;
				addChild(image);
			}
			if (Data.userSide == Constants.SIDE_SITH) {
				image = new Image(Assets.getPersonageTexture(Data.userCommand[0].id));
				image.x = posX + 25; 
				image.y = posY + 15;
				image.scale = 0.5;
				addChild(image);
				
				image = new Image(Assets.getPersonageTexture(planet.personageJedi1));
				image.x = posX + 300; 
				image.y = posY + 15;
				image.scale = 0.5;
				addChild(image);
			}
		}
		
		private function createBorder():void
		{
			if (Data.userSide == Constants.SIDE_JEDI) {
				image = new Image(Assets.textureAtlas.getTexture('map_window_start_battle_blue_border.png'));
				image.name = 'border';
				image.x = posX; 
				image.y = posY;
				image.alpha = 0.5;
				addChild(image);
			}
			if (Data.userSide == Constants.SIDE_SITH) {
				image = new Image(Assets.textureAtlas.getTexture('map_window_start_battle_red_border.png'));
				image.name = 'border';
				image.x = posX; 
				image.y = posY;
				image.alpha = 0.5;
				addChild(image);
			}
		}
		
		private function createText():void
		{
			var textFormat:TextFormat;
			textFormat = new TextFormat("Arial", 28, colorBack, "left", "top");
			textFormat.bold = true;
			textField1 = new TextField(100, 50, 'БИТВА', textFormat);
			textField1.x = (Constants.GAME_WINDOW_WIDTH / 2) - (textField1.width / 2);
			textField1.y = posY + 25;
			addChild(textField1);
			
			textFormat = new TextFormat("Arial", 28, colorFront, "left", "top");
			textFormat.bold = true;
			textField2 = new TextField(100, 50, 'БИТВА', textFormat);
			textField2.x = (Constants.GAME_WINDOW_WIDTH / 2) - (textField1.width / 2) - 1.5;
			textField2.y = posY + 25 - 1;
			addChild(textField2);
		}
		
	}

}
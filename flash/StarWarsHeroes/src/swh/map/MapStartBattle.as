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
	import swh.data.Personage;
	
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
		private var colorBlueText:uint;
		private var colorAddText:uint;
		
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
			onTweenLine();
			createText();
			createButtons();
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
				colorAddText = 0xC4DEFB;
			}
			if (Data.userSide == Constants.SIDE_SITH){
				colorFront = 0xFFFFFF;
				colorBack = 0x880000;
				colorAddText = 0xEDCDCB;
			}
		}
		
		private function createQuad():void
		{
			quad = new Quad(Constants.GAME_WINDOW_WIDTH, Constants.GAME_WINDOW_HEIGHT,  0x000000);
			quad.alpha = 0.05;
			quad.x = 0 - this.x;
			quad.y = 0 - this.y;
			this.addChild(quad);
		}
		
		private function createBackground():void
		{
			if (Data.userSide == Constants.SIDE_JEDI) {
				image = new Image(Assets.textureAtlas.getTexture('map_window_start_battle_blue_background.png'));
				posX = (Constants.GAME_WINDOW_WIDTH / 2) - (image.width / 2);
				posY = (Constants.GAME_WINDOW_HEIGHT / 2) - (image.height / 2 + 50);
				image.x = posX; 
				image.y = posY;
				image.alpha = 0.4;
				addChild(image);
			}
			if (Data.userSide == Constants.SIDE_SITH) {
				image = new Image(Assets.textureAtlas.getTexture('map_window_start_battle_red_background.png'));
				posX = (Constants.GAME_WINDOW_WIDTH / 2) - (image.width / 2);
				posY = (Constants.GAME_WINDOW_HEIGHT / 2) - (image.height / 2 + 50);
				image.x = posX; 
				image.y = posY;
				image.alpha = 0.3;
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
				image = new Image(Assets.textureAtlas.getTexture('map_window_start_battle_blue_lines.png'));
				image.x = posX; 
				image.y = posY;
				image.alpha = 0.3;
				addChild(image);
				
				image = new Image(Assets.textureAtlas.getTexture('map_window_start_battle_blue_border.png'));
				image.x = posX; 
				image.y = posY;
				addChild(image);
				
				image = new Image(Assets.textureAtlas.getTexture('map_window_start_battle_blue_line.png'));
				image.name = 'hologram_line';
				image.x = posX+15; 
				image.y = posY+18;
				image.alpha = 0.3;
				addChild(image);
			}
			if (Data.userSide == Constants.SIDE_SITH) {
				image = new Image(Assets.textureAtlas.getTexture('map_window_start_battle_red_lines.png'));
				image.x = posX; 
				image.y = posY;
				image.alpha = 0.3;
				addChild(image);
				
				image = new Image(Assets.textureAtlas.getTexture('map_window_start_battle_red_border.png'));
				image.x = posX; 
				image.y = posY;
				addChild(image);
				
				image = new Image(Assets.textureAtlas.getTexture('map_window_start_battle_red_line.png'));
				image.name = 'hologram_line';
				image.x = posX+15; 
				image.y = posY+18;
				image.alpha = 0.3;
				addChild(image);
			}
		}
		
		private function onTweenLine():void
		{
			Starling.juggler.remove(tweenLine);
			image = (getChildByName('hologram_line') as Image);
			image.y = posY+18;
			tweenLine = new Tween(image, 2.0, "easeInOut");
			tweenLine.animate("y", image.y + 225);
			tweenLine.onComplete = onTweenLine;
			Starling.juggler.add(tweenLine);
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
			textField2.x = (Constants.GAME_WINDOW_WIDTH / 2) - (textField1.width / 2) - 2.5;
			textField2.y = posY + 23;
			addChild(textField2);
			
			
			var userPers:Personage = null;
			var userPower:Number = 0;
			for (var i:int = 0; i < Data.userCommand.length; i++){
				if (Data.userCommand[i].status == Data.STATUS_USER_PERSONAGE_AVAILABLE && Data.userCommand[i].inCommand == 1){
					userPers = Data.userCommand[i];
				}
				if (Data.userCommand[i].status == Data.STATUS_USER_PERSONAGE_AVAILABLE){
					userPower += ((Data.userCommand[i].hit1 + Data.userCommand[i].hit2 + Data.userCommand[i].hit3 + Data.userCommand[i].hit4 + Data.userCommand[i].hit5) / 10);
				}
			}
			
			var aiPers1:Personage = null;
			var aiPers2:Personage = null;
			var aiPers3:Personage = null;
			if (Data.userSide == Constants.SIDE_JEDI){
				aiPers1 = (Data.personages[planet.personageSith1] as Personage);
				aiPers2 = (Data.personages[planet.personageSith2] as Personage);
				aiPers3 = (Data.personages[planet.personageSith3] as Personage);
			}else {
				aiPers1 = (Data.personages[planet.personageJedi1] as Personage);
				aiPers2 = (Data.personages[planet.personageJedi1] as Personage);
				aiPers3 = (Data.personages[planet.personageJedi1] as Personage);
			}
			
			textFormat = new TextFormat("Arial", 18, colorBack, "center", "center");
			textFormat.bold = true;
			textField1 = new TextField(250, 150, userPers.name + '\nVS\n' + aiPers1.name , textFormat);
			textField1.x = (Constants.GAME_WINDOW_WIDTH / 2) - (textField1.width / 2);
			textField1.y = posY + 25;
			addChild(textField1);
			
			textFormat = new TextFormat("Arial", 18, colorAddText, "center", "center");
			textFormat.bold = true;
			textField2 = new TextField(250, 150, userPers.name + '\nVS\n' + aiPers1.name , textFormat);
			textField2.x = (Constants.GAME_WINDOW_WIDTH / 2) - (textField1.width / 2) - 1.5;
			textField2.y = posY + 24;
			addChild(textField2);
			
			
			textFormat = new TextFormat("Arial", 18, colorBack, "left", "top");
			textFormat.bold = true;
			textField1 = new TextField(100, 50, 'Сила: ' + userPower.toString() , textFormat);
			textField1.x = (Constants.GAME_WINDOW_WIDTH / 2) - 185;
			textField1.y = posY + 201;
			addChild(textField1);
			
			textFormat = new TextFormat("Arial", 18, colorAddText, "left", "top");
			textFormat.bold = true;
			textField2 = new TextField(100, 50, 'Сила: ' + userPower.toString() , textFormat);
			textField2.x = (Constants.GAME_WINDOW_WIDTH / 2) - 186.5;
			textField2.y = posY + 200;
			addChild(textField2);
			
			var aiPower:Number = 0;			
			aiPower += ((aiPers1.hit1 + aiPers1.hit2 + aiPers1.hit3 + aiPers1.hit4 + aiPers1.hit5) / 10);
			aiPower += ((aiPers2.hit1 + aiPers2.hit2 + aiPers2.hit3 + aiPers2.hit4 + aiPers2.hit5) / 10);
			aiPower += ((aiPers3.hit1 + aiPers3.hit2 + aiPers3.hit3 + aiPers3.hit4 + aiPers3.hit5) / 10);
			
			textFormat = new TextFormat("Arial", 18, colorBack, "left", "top");
			textFormat.bold = true;
			textField1 = new TextField(100, 50, 'Сила: ' + aiPower.toString() , textFormat);
			textField1.x = (Constants.GAME_WINDOW_WIDTH / 2) + 100;
			textField1.y = posY + 201;
			addChild(textField1);
			
			textFormat = new TextFormat("Arial", 18, colorAddText, "left", "top");
			textFormat.bold = true;
			textField2 = new TextField(100, 50, 'Сила: ' + aiPower.toString() , textFormat);
			textField2.x = (Constants.GAME_WINDOW_WIDTH / 2) + 98.5;
			textField2.y = posY + 200;
			addChild(textField2);
		}
		
		private function createButtons():void
		{
			if (Data.userSide == Constants.SIDE_JEDI) {
				button = new Buttons("Начать", Assets.textureAtlasAnimation.getTextures('button_blue_'), 12, 20, 0xFFFFFF, 0x0090F0);
				button.name = Constants.MAP_START_BATTLE_BUTTON_START;
				addChild(button);
				button.scale = 0.8;
				button.x = (Constants.GAME_WINDOW_WIDTH / 2) - (button.width / 2);
				button.y = 345;
				
				
				button = new Buttons("Отмена", Assets.textureAtlasAnimation.getTextures('button_blue_'), 12, 20, 0xFFFFFF, 0x0090F0);
				button.name = Constants.MAP_START_BATTLE_BUTTON_CANCEL;
				addChild(button);
				button.scale = 0.8;
				button.x = (Constants.GAME_WINDOW_WIDTH / 2) - (button.width / 2);
				button.y = 390;
			}else{
				button = new Buttons("Начать", Assets.textureAtlasAnimation.getTextures('button_red_'), 12, 20, 0xFFFFFF, 0x880000);
				button.name = Constants.MAP_START_BATTLE_BUTTON_START;
				button.x = 85;
				button.y = 350;
				addChild(button);
				button.scale = 0.8;
				button.x = (Constants.GAME_WINDOW_WIDTH / 2) - (button.width / 2);
				button.y = 345;
				
				button = new Buttons("Отмена", Assets.textureAtlasAnimation.getTextures('button_red_'), 12, 20, 0xFFFFFF, 0x880000);
				button.name = Constants.MAP_START_BATTLE_BUTTON_CANCEL;
				button.x = 85;
				button.y = 450;
				addChild(button);
				button.scale = 0.8;
				button.x = (Constants.GAME_WINDOW_WIDTH / 2) - (button.width / 2);
				button.y = 390;
			}
		}
		
	}

}
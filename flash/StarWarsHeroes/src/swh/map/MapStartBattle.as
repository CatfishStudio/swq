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
	import swh.text.Label;
	import swh.text.LabelCenter;
	import swh.data.Data;
	import swh.data.Planet;
	import swh.data.Personage;
	import swh.button.Button;
	
	/**
	 * ...
	 * @author Catfish Studio
	 */
	public class MapStartBattle extends Sprite 
	{
		private var planet:Planet;
		private var interception:Boolean;
		private var posX:int;
		private var posY:int;
		private var colorBack:int;
		private var colorFront:int;
		private var colorBlueText:int;
		private var colorAddText:int;
		
		private var quad:Sprite;
		private var backgroundBitmap:Bitmap;
		private var persLeftBitmap:Bitmap;
		private var persRightBitmap:Bitmap;
		private var linesBitmap:Bitmap;
		private var borderBitmap:Bitmap;
		private var lineBitmap:Bitmap;
		private var lineTween:GTween;
		
		private var labelTitleBack:LabelCenter;
		private var labelTitleFront:LabelCenter;
		private var labelMasterBack:LabelCenter;
		private var labelMasterFront:LabelCenter;
		private var labelUserPowerBack:LabelCenter;
		private var labelUserPowerFront:LabelCenter;
		private var labelAIPowerBack:LabelCenter;
		private var labelAIPowerFront:LabelCenter;
		
		private var startButton:Button;
		private var cancelButton:Button;
		
		public function MapStartBattle(_planet:Planet, _interception:Boolean) 
		{
			super();
			planet = _planet;
			interception = _interception;
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
			createUserPersonage();
			createAIPersonage();
			createBorder();
			runLineTween();
			createText();
			createButtons();
		}
		
		private function onRemoveFromStage(e:Event):void 
		{
			removeEventListener(Event.REMOVED_FROM_STAGE, onRemoveFromStage);
			
			if(lineTween != null) {
				lineTween.onComplete = null;
				lineTween.end();
				lineTween = null;	
			}
			if(backgroundBitmap != null) {
				removeChild(backgroundBitmap);
				backgroundBitmap = null;
			}
			if(persLeftBitmap != null) {
				removeChild(persLeftBitmap);
				persLeftBitmap = null;
			}
			if(persRightBitmap != null) {
				removeChild(persRightBitmap);
				persRightBitmap = null;
			}
			if(linesBitmap != null) {
				removeChild(linesBitmap);
				linesBitmap = null;
			}
			if(borderBitmap != null) {
				removeChild(borderBitmap);
				borderBitmap = null;
			}
			if(lineBitmap != null) {
				removeChild(lineBitmap);
				lineBitmap = null;
			}
			if(labelTitleBack != null) {
				removeChild(labelTitleBack);
				labelTitleBack = null;
			}
			if(labelTitleFront != null) {
				removeChild(labelTitleFront);
				labelTitleFront = null;
			}
			if(labelMasterBack != null) {
				removeChild(labelMasterBack);
				labelMasterBack = null;
			}
			if(labelMasterFront != null) {
				removeChild(labelMasterFront);
				labelMasterFront = null;
			}
			if(labelUserPowerBack != null) {
				removeChild(labelUserPowerBack);
				labelUserPowerBack = null;
			}
			if(labelUserPowerFront != null) {
				removeChild(labelUserPowerFront);
				labelUserPowerFront = null;
			}
			if(labelAIPowerBack != null) {
				removeChild(labelAIPowerBack);
				labelUserPowerBack = null;
			}
			if(labelAIPowerFront != null) {
				removeChild(labelAIPowerFront);
				labelUserPowerFront = null;
			}
			if(cancelButton != null) {
				removeChild(cancelButton);
				cancelButton = null;
			}
			if(startButton != null) {
				removeChild(startButton);
				startButton = null;
			}
			if(quad != null) {
				removeChild(quad);
				quad = null;
			}
			
			while (this.numChildren)
			{
				this.removeChildren(0);
			}
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
			quad = new Sprite();
			quad.graphics.lineStyle(1, 0x000000, 1);
			quad.graphics.beginFill(0x000000, 1);
			quad.graphics.drawRect(0, 0, Constants.GAME_WINDOW_WIDTH, Constants.GAME_WINDOW_HEIGHT);
			quad.graphics.endFill();
			quad.x = 0; 
			quad.y = 0;
			quad.alpha = 0.05;
			this.addChild(quad);
		}
		
		private function createBackground():void
		{
			if (Data.userSide == Constants.SIDE_JEDI) {
				backgroundBitmap = new Bitmap((Atlas.atlasTexturesBitmapData['map_window_start_battle_blue_background.png'] as BitmapData));
				posX = (Constants.GAME_WINDOW_WIDTH / 2) - (backgroundBitmap.width / 2);
				posY = (Constants.GAME_WINDOW_HEIGHT / 2) - (backgroundBitmap.height / 2 + 50);
				backgroundBitmap.x = posX + 10; 
				backgroundBitmap.y = posY + 10;
				backgroundBitmap.alpha = 0.4;
				addChild(backgroundBitmap);
			} else if (Data.userSide == Constants.SIDE_SITH) {
				backgroundBitmap = new Bitmap((Atlas.atlasTexturesBitmapData['map_window_start_battle_red_background.png'] as BitmapData));
				posX = (Constants.GAME_WINDOW_WIDTH / 2) - (backgroundBitmap.width / 2);
				posY = (Constants.GAME_WINDOW_HEIGHT / 2) - (backgroundBitmap.height / 2 + 50);
				backgroundBitmap.x = posX + 10; 
				backgroundBitmap.y = posY + 10;
				backgroundBitmap.alpha = 0.3;
				addChild(backgroundBitmap);
			}
		}
		
		private function createUserPersonage():void
		{
			for (var i:int = 0; i < 3; i++){
				for (var j:int = 0; j < Data.userCommand.length; j++){
					if (Data.checkPersonagePlanetAvailable(Data.userCommand[j].id) == false) continue;
					if (Data.userCommand[j].inCommand == i && Data.userCommand[j].status == Data.STATUS_USER_PERSONAGE_AVAILABLE){
						persLeftBitmap = new Bitmap((Assets.getPersonageTexture(Data.userCommand[j].id) as Bitmap).bitmapData);
						persLeftBitmap.x = posX + 25; 
						persLeftBitmap.y = posY + 15;
						persLeftBitmap.scaleX = 0.5;
						persLeftBitmap.scaleY = 0.5;
						addChild(persLeftBitmap);
						return;
					}
				}			
			}
		}
		
		private function createAIPersonage():void
		{
			if (Data.userSide == Constants.SIDE_JEDI) {
				if (interception == false) persRightBitmap = new Bitmap((Assets.getPersonageTexture(planet.personageSith1, 'rl') as Bitmap).bitmapData);
				else persRightBitmap = new Bitmap((Assets.getPersonageTexture(Data.aiCommand[0].id, 'rl') as Bitmap).bitmapData);
				persRightBitmap.x = posX + 300; 
				persRightBitmap.y = posY + 15;
				persRightBitmap.scaleX = 0.5;
				persRightBitmap.scaleY = 0.5;
				addChild(persRightBitmap);
			}else if (Data.userSide == Constants.SIDE_SITH) {
				if (interception == false) persRightBitmap = new Bitmap((Assets.getPersonageTexture(planet.personageJedi1, 'rl') as Bitmap).bitmapData);
				else persRightBitmap = new Bitmap((Assets.getPersonageTexture(Data.aiCommand[0].id, 'rl') as Bitmap).bitmapData);
				persRightBitmap.x = posX + 300; 
				persRightBitmap.y = posY + 15;
				persRightBitmap.scaleX = 0.5;
				persRightBitmap.scaleY = 0.5;
				addChild(persRightBitmap);
			}
		}
		
		private function createBorder():void
		{
			if (Data.userSide == Constants.SIDE_JEDI) {
				linesBitmap = new Bitmap((Atlas.atlasTexturesBitmapData['map_window_start_battle_blue_lines.png'] as BitmapData));
				linesBitmap.x = posX + 10; 
				linesBitmap.y = posY + 10;
				linesBitmap.alpha = 0.3;
				addChild(linesBitmap);
				
				borderBitmap = new Bitmap((Atlas.atlasTexturesBitmapData['map_window_start_battle_blue_border.png'] as BitmapData));
				borderBitmap.x = posX; 
				borderBitmap.y = posY;
				addChild(borderBitmap);
				
				lineBitmap = new Bitmap((Atlas.atlasTexturesBitmapData['map_window_start_battle_blue_line.png'] as BitmapData));
				lineBitmap.x = posX+10; 
				lineBitmap.y = posY+10;
				lineBitmap.alpha = 0.3;
				addChild(lineBitmap);
				
			} else if (Data.userSide == Constants.SIDE_SITH) {
				linesBitmap = new Bitmap((Atlas.atlasTexturesBitmapData['map_window_start_battle_red_lines.png'] as BitmapData));
				linesBitmap.x = posX + 10; 
				linesBitmap.y = posY + 10;
				linesBitmap.alpha = 0.3;
				addChild(linesBitmap);
				
				borderBitmap = new Bitmap((Atlas.atlasTexturesBitmapData['map_window_start_battle_red_border.png'] as BitmapData));
				borderBitmap.x = posX; 
				borderBitmap.y = posY;
				addChild(borderBitmap);
				
				lineBitmap = new Bitmap((Atlas.atlasTexturesBitmapData['map_window_start_battle_red_line.png'] as BitmapData));
				lineBitmap.x = posX+10; 
				lineBitmap.y = posY+10;
				lineBitmap.alpha = 0.3;
				addChild(lineBitmap);
			}
		}
		
		private function runLineTween():void
		{
			lineTween = new GTween(lineBitmap, 2);
			lineTween.setValue("y", lineBitmap.y + 225);
			lineTween.ease = Sine.easeInOut;
			lineTween.timeScale = 1;
			lineTween.onComplete = onTweenLine;
		}
		
		private function onTweenLine(tween:GTween):void		
		{
			lineBitmap.x = posX+10; 
			lineBitmap.y = posY+10;
			lineTween.setValue("y", lineBitmap.y + 225);
			lineTween.ease = Sine.easeInOut;
			lineTween.timeScale = 1;
			lineTween.onComplete = onTweenLine;
		}
		
		private function createText():void
		{
			labelTitleBack = new LabelCenter(0, 0, 125, 50, "arial", 28, colorBack, 'БИТВА', false);
			labelTitleBack.x = 10 + (Constants.GAME_WINDOW_WIDTH / 2) - (labelTitleBack.width / 2);
			labelTitleBack.y = posY + 25;
			addChild(labelTitleBack);
			labelTitleFront = new LabelCenter(0, 0, 125, 50, "arial", 28, colorFront, 'БИТВА', false);
			labelTitleFront.x = 10 + (Constants.GAME_WINDOW_WIDTH / 2) - (labelTitleFront.width / 2) - 2.5;
			labelTitleFront.y = posY + 23;
			addChild(labelTitleFront);
			
			var userPers:Personage = null;
			var userPower:Number = 0;
			for (var i:int = 0; i < Data.userCommand.length; i++){
				if (Data.userCommand[i].status == Data.STATUS_USER_PERSONAGE_AVAILABLE && Data.userCommand[i].inCommand == 0 && userPers ==  null){
					userPers = Data.userCommand[i];
				}else if (Data.userCommand[i].status == Data.STATUS_USER_PERSONAGE_AVAILABLE && Data.userCommand[i].inCommand == 1 && userPers ==  null){
					userPers = Data.userCommand[i];
				}else if (Data.userCommand[i].status == Data.STATUS_USER_PERSONAGE_AVAILABLE && Data.userCommand[i].inCommand == 2 && userPers ==  null){
					userPers = Data.userCommand[i];
				}
				if (Data.userCommand[i].status == Data.STATUS_USER_PERSONAGE_AVAILABLE && Data.userCommand[i].inCommand != -1){
					userPower += Data.userCommand[i].hit1 + Data.userCommand[i].hit2 + Data.userCommand[i].hit3 + Data.userCommand[i].hit4 + Data.userCommand[i].hit5;
				}
			}
			userPower /= 10;
			
			var aiPers1:Personage = null;
			var aiPers2:Personage = null;
			var aiPers3:Personage = null;
			if(interception === false){
				if (Data.userSide == Constants.SIDE_JEDI){
					aiPers1 = (Data.personages[planet.personageSith1] as Personage);
					aiPers2 = (Data.personages[planet.personageSith2] as Personage);
					aiPers3 = (Data.personages[planet.personageSith3] as Personage);
				}else {
					aiPers1 = (Data.personages[planet.personageJedi1] as Personage);
					aiPers2 = (Data.personages[planet.personageJedi2] as Personage);
					aiPers3 = (Data.personages[planet.personageJedi3] as Personage);
				}
			}else{ // AI COMMAND
				aiPers1 = Data.aiCommand[0];
				aiPers2 = Data.aiCommand[1];
				aiPers3 = Data.aiCommand[2];
			}
			
			labelMasterBack = new LabelCenter(0, 0, 250, 150, "arial", 18, colorBack, userPers.name + '\nVS\n' + aiPers1.name, false);
			labelMasterBack.x = 10 + (Constants.GAME_WINDOW_WIDTH / 2) - (labelMasterBack.width / 2);
			labelMasterBack.y = posY + 75;
			addChild(labelMasterBack);
			labelMasterFront = new LabelCenter(0, 0, 250, 150, "arial", 18, colorFront, userPers.name + '\nVS\n' + aiPers1.name, false);
			labelMasterFront.x = 10 + (Constants.GAME_WINDOW_WIDTH / 2) - (labelMasterFront.width / 2) - 1.5;
			labelMasterFront.y = posY + 74;
			addChild(labelMasterFront);
			
			
			labelUserPowerBack = new LabelCenter(0, 0, 100, 50, "arial", 18, colorBack, 'Сила: ' + userPower.toString(), false);
			labelUserPowerBack.x = (Constants.GAME_WINDOW_WIDTH / 2) - 185;
			labelUserPowerBack.y = posY + 201;
			labelUserPowerBack.alpha = 0.6;
			addChild(labelUserPowerBack);
			labelUserPowerFront = new LabelCenter(0, 0, 100, 50, "arial", 18, colorFront, 'Сила: ' + userPower.toString(), false);
			labelUserPowerFront.x = (Constants.GAME_WINDOW_WIDTH / 2) - 186.5;
			labelUserPowerFront.y = posY + 200;
			labelUserPowerFront.alpha = 0.6;
			addChild(labelUserPowerFront);
			
			var aiPower:Number = 0;			
			aiPower += aiPers1.hit1 + aiPers1.hit2 + aiPers1.hit3 + aiPers1.hit4 + aiPers1.hit5;
			aiPower += aiPers2.hit1 + aiPers2.hit2 + aiPers2.hit3 + aiPers2.hit4 + aiPers2.hit5;
			aiPower += aiPers3.hit1 + aiPers3.hit2 + aiPers3.hit3 + aiPers3.hit4 + aiPers3.hit5;
			aiPower /= 10;
			
			labelAIPowerBack = new LabelCenter(0, 0, 100, 50, "arial", 18, colorBack, 'Сила: ' + aiPower.toString(), false);
			labelAIPowerBack.x = (Constants.GAME_WINDOW_WIDTH / 2) + 100;
			labelAIPowerBack.y = posY + 201;
			labelAIPowerBack.alpha = 0.6;
			addChild(labelAIPowerBack);
			labelAIPowerFront = new LabelCenter(0, 0, 100, 50, "arial", 18, colorFront, 'Сила: ' + aiPower.toString(), false);
			labelAIPowerFront.x = (Constants.GAME_WINDOW_WIDTH / 2) + 98.5;
			labelAIPowerFront.y = posY + 200;
			labelAIPowerFront.alpha = 0.6;
			addChild(labelAIPowerFront);
		}
		
		private function createButtons():void
		{
			startButton = new Button((Constants.GAME_WINDOW_WIDTH / 2) - 70 , 345, "Начать", 60, 10, 20,  Constants.MAP_START_BATTLE_BUTTON_START, Data.userSide);
			startButton.scaleX = 0.8;
			startButton.scaleY = 0.8;
			addChild(startButton);
			
			
			cancelButton = new Button((Constants.GAME_WINDOW_WIDTH / 2) - 70, 390, "Отмена", 60, 10, 20,  Constants.MAP_START_BATTLE_BUTTON_CANCEL, Data.userSide);
			cancelButton.scaleX = 0.8;
			cancelButton.scaleY = 0.8;
			addChild(cancelButton);
			
		}
		
	}

}
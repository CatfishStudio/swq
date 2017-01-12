package swh.command 
{
	import flash.display.Sprite;
	import flash.events.Event;
	import flash.display.Bitmap;
	import flash.display.BitmapData;
	import flash.ui.Mouse;
	import flash.ui.MouseCursor;
	import flash.events.MouseEvent;
	
	import com.gskinner.motion.GTween;
	import com.gskinner.motion.GTweener;
	import com.gskinner.motion.GTweenTimeline;
	import com.gskinner.motion.easing.Sine;
	
	import swh.data.Utilits;
	import swh.data.Data;
	import swh.data.Assets;
	import swh.data.Atlas;
	import swh.data.Constants;
	import swh.button.Button;
	import swh.button.SmallButton;
	import swh.data.Personage;
	import swh.command.CommandLabel;
	import swh.command.CommandText;
	import swh.command.CommandDroid;
	import swh.command.CommandIcons;
	import swh.command.CommandPanelIcons;
	import swh.command.CommandArrowButton;
	import swh.command.CommandPlusButton;
	
	/**
	 * ...
	 * @author Catfish Studio
	 */
	public class Command extends Sprite 
	{
		private var selectedPersonage:Personage;
		
		private var spaceBitmap:Bitmap;
		private var spaceTween:GTween;
		
		private var borderBitmap:Bitmap;
		private var bigBackgroundBitmap:Bitmap;
		private var bottomBackgroundBitmap:Bitmap;
		private var rightBackgroundBitmap:Bitmap;
		private var linesBitmap:Bitmap;
		private var persBitmap:Bitmap;
		
		private var labelPoints:CommandLabel;
		private var labelPersName:CommandLabel;
		private var labelTitleCharacteristics:CommandLabel;
		private var labelCharacteristics:CommandLabel;
		private var textPers:CommandText;
		
		private var crystal1Bitmap:Bitmap;
		private var crystal2Bitmap:Bitmap;
		private var crystal3Bitmap:Bitmap;
		private var crystal4Bitmap:Bitmap;
		private var crystal5Bitmap:Bitmap;
		
		private var lineBitmap:Bitmap;
		private var lineTween:GTween;
		
		private var closeButton:Button;
		private var removeButton:Button;
		private var addButton:Button;
		private var arrowLeftSButton:CommandArrowButton;
		private var arrowRightSButton:CommandArrowButton;
		private var plus1Button:CommandPlusButton;
		private var plus2Button:CommandPlusButton;
		private var plus3Button:CommandPlusButton;
		private var plus4Button:CommandPlusButton;
		private var plus5Button:CommandPlusButton;
		
		private var droid:CommandDroid;
		
		private var icon1:CommandIcons;
		private var icon2:CommandIcons;
		private var icon3:CommandIcons;
		
		private var panelIcons:CommandPanelIcons;
		
		public function Command() 
		{
			super();
			addEventListener(Event.ADDED_TO_STAGE, onAddedToStage);
			addEventListener(Event.REMOVED_FROM_STAGE, onRemoveFromStage);
		}
		
		public function CommandAddOrRemove(type:String):void
		{
			if (type == Constants.COMMAND_BUTTON_ADD){
				addPersInCommand();
			}else if (type == Constants.COMMAND_BUTTON_REMOVE){
				removePersInCommand();
			}
		}
		
		private function onAddedToStage(e:Event):void 
		{
			removeEventListener(Event.ADDED_TO_STAGE, onAddedToStage);
			name = Constants.COMMAND;
			
			Atlas.loadAtlasBitmapData(Assets.assetsAtlasesContent.CommandAtlas, Assets.assetsAtlasesContent.CommandAtlasXML, Atlas.TYPE_TEXTURES);
			Atlas.loadAtlasBitmapData(Assets.assetsAtlasesContent.ButtonsAtlas, Assets.assetsAtlasesContent.ButtonsAtlasXML, Atlas.TYPE_ANIMATION);
			
			createSpace();
			createBackground();
			createPers();
			createLines();
			createBorder();
			createText();
			createCrystalsAndButtons();
			createDroid();
			createInons();
			createPanelIcons();
			createButtons();
			if (icon1.persData != null) {
				showPersonageCharacteristics(icon1);
			}else if (icon2.persData != null){
				showPersonageCharacteristics(icon2);
			}else if (icon3.persData != null){
				showPersonageCharacteristics(icon3);
			}else{
				for (var i:int = 0; i < panelIcons.icons.length; i++) {
					if (panelIcons.icons[i].persData != null){
						showPersonageCharacteristics(panelIcons.icons[i]);
						break;
					}
				}
			}
		}
		
		private function onRemoveFromStage(e:Event):void 
		{
			removeEventListener(Event.REMOVED_FROM_STAGE, onRemoveFromStage);
			Mouse.cursor = MouseCursor.AUTO;
			
			Atlas.clearAtlases(Atlas.TYPE_TEXTURES);
			Atlas.clearAtlases(Atlas.TYPE_ANIMATION);
			
			if (spaceTween != null) {
				spaceTween.onComplete = null;
				spaceTween.end();
				spaceTween = null;
			}
			if(lineTween != null) {
				lineTween.onComplete = null;
				lineTween.end();
				lineTween = null;
			}
			if(lineBitmap != null) {
				removeChild(lineBitmap);
				lineBitmap;
			}
			if(closeButton != null) {
				removeChild(closeButton);
				closeButton = null;
			}
			if(removeButton != null) {
				removeChild(removeButton);
				removeButton = null;
			}
			if(addButton != null) {
				removeChild(addButton);
				addButton = null;
			}
			if (arrowLeftSButton != null) {
				arrowLeftSButton.removeEventListener(MouseEvent.CLICK, onArrowMouseClick);
				removeChild(arrowLeftSButton);
				arrowLeftSButton = null;
			}
			if (arrowRightSButton != null) {
				arrowRightSButton.removeEventListener(MouseEvent.CLICK, onArrowMouseClick);
				removeChild(arrowRightSButton);
				arrowRightSButton = null;
			}
			if (plus1Button != null) {
				plus1Button.removeEventListener(MouseEvent.CLICK, onPlusMouseClick);
				removeChild(plus1Button);
				plus1Button = null;
			}
			if (plus2Button != null) {
				plus2Button.removeEventListener(MouseEvent.CLICK, onPlusMouseClick);
				removeChild(plus2Button);
				plus2Button = null;
			}
			if (plus3Button != null) {
				plus3Button.removeEventListener(MouseEvent.CLICK, onPlusMouseClick);
				removeChild(plus3Button);
				plus3Button = null;
			}
			if (plus4Button != null) {
				plus4Button.removeEventListener(MouseEvent.CLICK, onPlusMouseClick);
				removeChild(plus4Button);
				plus4Button = null;
			}
			if (plus5Button != null) {
				plus5Button.removeEventListener(MouseEvent.CLICK, onPlusMouseClick);
				removeChild(plus5Button);
				plus5Button = null;
			}
			if(persBitmap != null) {
				removeChild(persBitmap);
				persBitmap = null;
			}
			if(crystal1Bitmap != null) {
				removeChild(crystal1Bitmap);
				crystal1Bitmap = null;
			}
			if(crystal2Bitmap != null) {
				removeChild(crystal2Bitmap);
				crystal2Bitmap = null;
			}
			if(crystal3Bitmap != null) {
				removeChild(crystal3Bitmap);
				crystal3Bitmap = null;
			}
			if(crystal4Bitmap != null) {
				removeChild(crystal4Bitmap);
				crystal4Bitmap = null;
			}
			if(crystal5Bitmap != null) {
				removeChild(crystal5Bitmap);
				crystal5Bitmap = null;
			}
			if(bigBackgroundBitmap != null) {
				removeChild(bigBackgroundBitmap);
				bigBackgroundBitmap = null;
			}
			if(bottomBackgroundBitmap != null) {
				removeChild(bottomBackgroundBitmap);
				bottomBackgroundBitmap = null;
			}
			if(rightBackgroundBitmap != null) {
				removeChild(rightBackgroundBitmap);
				rightBackgroundBitmap = null;
			}
			if(linesBitmap != null) {
				removeChild(linesBitmap);
				linesBitmap = null;
			}
			if(borderBitmap != null) {
				removeChild(borderBitmap);
				borderBitmap = null;			
			}
			if(spaceBitmap != null) {
				removeChild(spaceBitmap);
				spaceBitmap = null;
			}
			if(labelPoints != null) {
				removeChild(labelPoints);
				labelPoints = null;
			}
			if(labelPersName != null) {
				removeChild(labelPersName);
				labelPersName = null;
			}
			if(labelTitleCharacteristics != null) {
				removeChild(labelTitleCharacteristics);
				labelTitleCharacteristics = null;
			}
			if(labelCharacteristics != null) {
				removeChild(labelCharacteristics);
				labelCharacteristics = null;
			}
			if(textPers != null) {
				removeChild(textPers);
				textPers = null;
			}
			if(droid != null) {
				removeChild(droid);
				droid = null;
			}
			if (icon1 != null) {
				icon1.removeEventListener(MouseEvent.MOUSE_OUT, onIconMouseOut);
				icon1.removeEventListener(MouseEvent.MOUSE_OVER, onIconMouseOver);
				icon1.removeEventListener(MouseEvent.CLICK, onIconMouseClick);
				removeChild(icon1);
				icon1 = null;
			}
			if (icon2 != null) {
				icon2.removeEventListener(MouseEvent.MOUSE_OUT, onIconMouseOut);
				icon2.removeEventListener(MouseEvent.MOUSE_OVER, onIconMouseOver);
				icon2.removeEventListener(MouseEvent.CLICK, onIconMouseClick);
				removeChild(icon2);
				icon2 = null;
			}
			if (icon3 != null) {
				icon3.removeEventListener(MouseEvent.MOUSE_OUT, onIconMouseOut);
				icon3.removeEventListener(MouseEvent.MOUSE_OVER, onIconMouseOver);
				icon3.removeEventListener(MouseEvent.CLICK, onIconMouseClick);
				removeChild(icon3);
				icon3 = null;
			}
			if (panelIcons != null) {
				panelIcons.clearPanelEvents(MouseEvent.MOUSE_OUT, onIconMouseOut);
				panelIcons.clearPanelEvents(MouseEvent.MOUSE_OVER, onIconMouseOver);
				panelIcons.clearPanelEvents(MouseEvent.CLICK, onIconMouseClick);
				removeChild(panelIcons);
				panelIcons = null;
			}
			
			while (this.numChildren > 0)
			{
				this.removeChildren(0);
			}
		}

		private function createSpace():void
		{
			if (Data.userSide == Constants.SIDE_JEDI){
				spaceBitmap = new Bitmap((Assets.assetsTexturesContent.spaceBlueBitmap as Bitmap).bitmapData);
			} else if (Data.userSide == Constants.SIDE_SITH){
				spaceBitmap = new Bitmap((Assets.assetsTexturesContent.spaceRedBitmap as Bitmap).bitmapData);
			}
			spaceBitmap.x = -82; 
			spaceBitmap.y = -19;
			addChild(spaceBitmap);
			
			runSpaceTween();
		}
		
		private function runSpaceTween():void
		{
			spaceTween = new GTween(spaceBitmap, 0.1);
			//spaceTween.setValue("rotation", -1);
			spaceTween.ease = Sine.easeInOut;
			spaceTween.timeScale = 0.1;
			spaceTween.onComplete = onTweenSpace1;
			spaceTween.proxy.rotation += 1; 
		}
		
		private function onTweenSpace1(tween:GTween):void		
		{
			//spaceTween.setValue("rotation", 1);
			spaceTween.ease = Sine.easeInOut;
			spaceTween.timeScale = 0.1;
			spaceTween.proxy.rotation -= 1;
			spaceTween.onComplete = onTweenSpace2;
		}
		
		private function onTweenSpace2(tween:GTween):void		
		{
			//spaceTween.setValue("rotation", -1);
			spaceTween.ease = Sine.easeInOut;
			spaceTween.timeScale = 0.1;
			spaceTween.proxy.rotation += 1;
			spaceTween.onComplete = onTweenSpace1;
		}

		private function createBackground():void
		{
			if (Data.userSide == Constants.SIDE_JEDI){
				bigBackgroundBitmap = new Bitmap((Atlas.atlasTexturesBitmapData["command_blue_big_background.png"] as BitmapData));
				bottomBackgroundBitmap = new Bitmap((Atlas.atlasTexturesBitmapData["command_blue_bottom_background.png"] as BitmapData));
				rightBackgroundBitmap = new Bitmap((Atlas.atlasTexturesBitmapData["command_blue_right_background.png"] as BitmapData));
			} else if (Data.userSide == Constants.SIDE_SITH){
				bigBackgroundBitmap = new Bitmap((Atlas.atlasTexturesBitmapData["command_red_big_background.png"] as BitmapData));
				bottomBackgroundBitmap = new Bitmap((Atlas.atlasTexturesBitmapData["command_red_bottom_background.png"] as BitmapData));
				rightBackgroundBitmap = new Bitmap((Atlas.atlasTexturesBitmapData["command_red_right_background.png"] as BitmapData));
			}
			bigBackgroundBitmap.x = 22;
			bigBackgroundBitmap.y = 17;
			bigBackgroundBitmap.alpha = 0.2;
			addChild(bigBackgroundBitmap);
			
			bottomBackgroundBitmap.x = 22;
			bottomBackgroundBitmap.y = 600;
			bottomBackgroundBitmap.alpha = 0.2;
			addChild(bottomBackgroundBitmap);
			
			rightBackgroundBitmap.x = 655;
			rightBackgroundBitmap.y = 50;
			rightBackgroundBitmap.alpha = 0.2;
			addChild(rightBackgroundBitmap);
		}

		private function createPers():void
		{
			selectedPersonage = null;
			for (var i:int = 0; i < Data.userCommand.length; i++){
				
				if (Data.userCommand[i].inCommand >= 0){
					selectedPersonage = new Personage();
					selectedPersonage.description = Data.userCommand[i].description;
					selectedPersonage.hit1 = Data.userCommand[i].hit1;
					selectedPersonage.hit2 = Data.userCommand[i].hit2;
					selectedPersonage.hit3 = Data.userCommand[i].hit3;
					selectedPersonage.hit4 = Data.userCommand[i].hit4;
					selectedPersonage.hit5 = Data.userCommand[i].hit5;
					selectedPersonage.id = Data.userCommand[i].id;
					selectedPersonage.inCommand = Data.userCommand[i].inCommand;
					selectedPersonage.life = Data.userCommand[i].life;
					selectedPersonage.name = Data.userCommand[i].name;
					selectedPersonage.planetID = Data.userCommand[i].planetID;
					selectedPersonage.status = Data.userCommand[i].status;
					
					persBitmap = new Bitmap((Assets.getPersonageTexture(Data.userCommand[i].id) as Bitmap).bitmapData);
					persBitmap.x = 25;
					persBitmap.y = 50;
					addChild(persBitmap);
					break;
				}
			}
		}

		private function createLines():void
		{
			if (Data.userSide == Constants.SIDE_JEDI){
				linesBitmap = new Bitmap((Atlas.atlasTexturesBitmapData["command_blue_lines.png"] as BitmapData));
			} else if (Data.userSide == Constants.SIDE_SITH){
				linesBitmap = new Bitmap((Atlas.atlasTexturesBitmapData["command_red_lines.png"] as BitmapData));
			}
			linesBitmap.alpha = 0.2;
			linesBitmap.x = 22;
			linesBitmap.y = 17;
			addChild(linesBitmap);
		}

		private function createBorder():void
		{
			if (Data.userSide == Constants.SIDE_JEDI){
				borderBitmap = new Bitmap((Atlas.atlasTexturesBitmapData["command_blue_border.png"] as BitmapData));
				lineBitmap = new Bitmap((Atlas.atlasTexturesBitmapData["command_blue_big_line.png"] as BitmapData));
			} else if (Data.userSide == Constants.SIDE_SITH){
				borderBitmap = new Bitmap((Atlas.atlasTexturesBitmapData["command_red_border.png"] as BitmapData));
				lineBitmap = new Bitmap((Atlas.atlasTexturesBitmapData["command_red_big_line.png"] as BitmapData));
			}
			
			borderBitmap.x = 2;
			borderBitmap.y = 2;
			addChild(borderBitmap);
			
			lineBitmap.x = 22;
			lineBitmap.y = 20;
			lineBitmap.alpha = 0.3;
			addChild(lineBitmap);
			
			runLineTween();
		}
		
		private function runLineTween():void
		{
			lineTween = new GTween(lineBitmap, 2);
			lineTween.setValue("y", lineBitmap.y + 545);
			lineTween.ease = Sine.easeInOut;
			lineTween.timeScale = 1;
			lineTween.onComplete = onTweenLine;
		}
		
		private function onTweenLine(tween:GTween):void		
		{
			lineBitmap.y = 17;
			lineTween.setValue("y", lineBitmap.y + 545);
			lineTween.ease = Sine.easeInOut;
			lineTween.timeScale = 1;
			lineTween.onComplete = onTweenLine;
		}
		
		private function createText():void
		{
			labelPoints = new CommandLabel(650, 30, 250, 50, "arial", 14, "КОМАНДА. Очки опыта: " + Data.userPoints.toString());
			addChild(labelPoints);
			labelPersName = new CommandLabel(50, 30, 250, 50, "arial", 14, selectedPersonage.name);
			addChild(labelPersName);
			labelTitleCharacteristics = new CommandLabel(300, 80, 250, 250, "arial", 14, "Характеристики:" + "\n\n" 
																					+ "	Здоровье:" + "\n\n" 
																					+ "	Кристал ловкости:" + "\n\n" 
																					+ "	Кристал тьмы:" + "\n\n" 
																					+ "	Кристал жизни:" + "\n\n" 
																					+ "	Кристал света:" + "\n\n" 
																					+ "	Кристал интеллекта:");
			addChild(labelTitleCharacteristics);
			labelCharacteristics = new CommandLabel(475, 113, 250, 250, "arial" , 14, selectedPersonage.life.toString() + "\n\n" 
																					+ selectedPersonage.hit1.toString() + "\n\n"
																					+ selectedPersonage.hit2.toString() + "\n\n"
																					+ selectedPersonage.hit3.toString() + "\n\n"
																					+ selectedPersonage.hit4.toString() + "\n\n"
																					+ selectedPersonage.hit5.toString());
			addChild(labelCharacteristics);
			textPers = new CommandText(50, 300, 485, 5, "arial", 14, selectedPersonage.description);
			addChild(textPers);
			textPers.y = 550 - textPers.height;
		}
		
		private function createCrystalsAndButtons():void
		{
			crystal1Bitmap = new Bitmap((Atlas.atlasTexturesBitmapData["hit_1.png"] as BitmapData));
			crystal1Bitmap.x = 295;
			crystal1Bitmap.y = 140;
			crystal1Bitmap.scaleX = 0.3;
			crystal1Bitmap.scaleY = 0.3;
			addChild(crystal1Bitmap);
			
			crystal2Bitmap = new Bitmap((Atlas.atlasTexturesBitmapData["hit_2.png"] as BitmapData));
			crystal2Bitmap.x = 295;
			crystal2Bitmap.y = 170;
			crystal2Bitmap.scaleX = 0.3;
			crystal2Bitmap.scaleY = 0.3;
			addChild(crystal2Bitmap);
			
			crystal3Bitmap = new Bitmap((Atlas.atlasTexturesBitmapData["hit_3.png"] as BitmapData));
			crystal3Bitmap.x = 295;
			crystal3Bitmap.y = 205;
			crystal3Bitmap.scaleX = 0.3;
			crystal3Bitmap.scaleY = 0.3;
			addChild(crystal3Bitmap);
			
			crystal4Bitmap = new Bitmap((Atlas.atlasTexturesBitmapData["hit_4.png"] as BitmapData));
			crystal4Bitmap.x = 295;
			crystal4Bitmap.y = 240;
			crystal4Bitmap.scaleX = 0.3;
			crystal4Bitmap.scaleY = 0.3;
			addChild(crystal4Bitmap);
			
			crystal5Bitmap = new Bitmap((Atlas.atlasTexturesBitmapData["hit_5.png"] as BitmapData));
			crystal5Bitmap.x = 295;
			crystal5Bitmap.y = 270;
			crystal5Bitmap.scaleX = 0.3;
			crystal5Bitmap.scaleY = 0.3;
			addChild(crystal5Bitmap);
			
			plus1Button = new CommandPlusButton(510, 145, 'hit1');
			plus1Button.addEventListener(MouseEvent.CLICK, onPlusMouseClick);
			addChild(plus1Button);
			
			plus2Button = new CommandPlusButton(510, 178, 'hit2');
			plus2Button.addEventListener(MouseEvent.CLICK, onPlusMouseClick);
			addChild(plus2Button);
			
			plus3Button = new CommandPlusButton(510, 210, 'hit3');
			plus3Button.addEventListener(MouseEvent.CLICK, onPlusMouseClick);
			addChild(plus3Button);
			
			plus4Button = new CommandPlusButton(510, 245, 'hit4');
			plus4Button.addEventListener(MouseEvent.CLICK, onPlusMouseClick);
			addChild(plus4Button);
			
			plus5Button = new CommandPlusButton(510, 275, 'hit5');
			plus5Button.addEventListener(MouseEvent.CLICK, onPlusMouseClick);
			addChild(plus5Button);
		}
		
		private function onPlusMouseClick(e:MouseEvent):void 
		{
			
		}
		
		private function createDroid():void
		{
			droid = new CommandDroid(560, 360, "Это окно вашей команды.\n\nТут вы можите убирать и добавлять персонажей в команду.\n\nВы можите улучшать характеристики персонажей за счёт полученных очков опыта.", Data.userSide);
			addChild(droid);
		}
		
		private function createInons():void
		{
			icon1 = new CommandIcons('GlobalIcon');
			icon1.x = 690;
			icon1.y = 60;
			icon1.addEventListener(MouseEvent.MOUSE_OUT, onIconMouseOut);
			icon1.addEventListener(MouseEvent.MOUSE_OVER, onIconMouseOver);
			icon1.addEventListener(MouseEvent.CLICK, onIconMouseClick);
			addChild(icon1);
			
			icon2 = new CommandIcons('GlobalIcon');
			icon2.x = 690;
			icon2.y = 160;
			icon2.addEventListener(MouseEvent.MOUSE_OUT, onIconMouseOut);
			icon2.addEventListener(MouseEvent.MOUSE_OVER, onIconMouseOver);
			icon2.addEventListener(MouseEvent.CLICK, onIconMouseClick);
			addChild(icon2);
			
			icon3 = new CommandIcons('GlobalIcon');
			icon3.x = 690;
			icon3.y = 260;
			icon3.addEventListener(MouseEvent.MOUSE_OUT, onIconMouseOut);
			icon3.addEventListener(MouseEvent.MOUSE_OVER, onIconMouseOver);
			icon3.addEventListener(MouseEvent.CLICK, onIconMouseClick);
			addChild(icon3);
			
			for (var i:int = 0; i < Data.userCommand.length; i++){
				if (Data.checkPersonagePlanetAvailable(Data.userCommand[i].id) == false) continue;
				if (Data.userCommand[i].inCommand == 0)	icon1.setPers(Data.userCommand[i]);
				if (Data.userCommand[i].inCommand == 1)	icon2.setPers(Data.userCommand[i]);
				if (Data.userCommand[i].inCommand == 2)	icon3.setPers(Data.userCommand[i]);
			}
		}
		
		private function createPanelIcons():void
		{
			panelIcons = new CommandPanelIcons();
			panelIcons.x = 70;
			panelIcons.y = 612;
			addChild(panelIcons);
			
			var icon:CommandIcons;
			for (var i:int = 0; i < Data.userCommand.length; i++){
				icon = null;
				if (Data.checkPersonagePlanetAvailable(Data.userCommand[i].id) == false) continue;
				if (Data.userCommand[i].inCommand < 0 && Data.userCommand[i].status == Data.STATUS_USER_PERSONAGE_NOT_AVAILABLE){
					icon = new CommandIcons("Icon", Data.userCommand[i]);
					icon.addEventListener(MouseEvent.MOUSE_OUT, onIconMouseOut);
					icon.addEventListener(MouseEvent.MOUSE_OVER, onIconMouseOver);
					icon.addEventListener(MouseEvent.CLICK, onIconMouseClick);
					panelIcons.addPanelChild(icon);
				}
			}
			
			arrowLeftSButton = new CommandArrowButton(30, 655, 'arrowLeft', 'rl');
			arrowLeftSButton.addEventListener(MouseEvent.CLICK, onArrowMouseClick);
			addChild(arrowLeftSButton);
			
			arrowLeftSButton = new CommandArrowButton(515, 655, 'arrowRight', 'lr');
			arrowLeftSButton.addEventListener(MouseEvent.CLICK, onArrowMouseClick);
			addChild(arrowLeftSButton);
		}
		
		private function onArrowMouseClick(e:MouseEvent):void 
		{
			
		}
		
		private function onIconMouseOut(e:MouseEvent):void 
		{
			Mouse.cursor = MouseCursor.AUTO;
		}
		
		private function onIconMouseOver(e:MouseEvent):void 
		{
			Mouse.cursor = MouseCursor.BUTTON;
		}
		
		private function onIconMouseClick(e:MouseEvent):void 
		{
			showPersonageCharacteristics((e.target as CommandIcons));
		}
		
		private function createButtons():void
		{
			closeButton = new Button(650, 667, "ЗАКРЫТЬ", 60, 15, 16,  Constants.COMMAND_BUTTON_CLOSE, Data.userSide);
			addChild(closeButton);
			addButton = new Button(350, 25, "ДОБАВИТЬ В КОМАНДУ", 30, 15, 12, Constants.COMMAND_BUTTON_ADD, Data.userSide);
			addButton.visible = false;
			addChild(addButton);
			removeButton = new Button(350, 25, "УБРАТЬ ИЗ КОМАНДЫ", 30, 15, 12, Constants.COMMAND_BUTTON_REMOVE, Data.userSide);
			removeButton.visible = false;
			addChild(removeButton);
		}
		
		private function showButton(name:String):void
		{
			if (name == 'GlobalIcon'){
				addButton.visible = false;
				removeButton.visible = true;
			}else if (name == 'Icon'){
				removeButton.visible = false;
				addButton.visible = true;
			}
		}
		
		private function showPersonageCharacteristics(targetIcon:CommandIcons):void
		{
			if(targetIcon.persData != null){
				selectedPersonage = targetIcon.persData;
				labelPersName.setText(targetIcon.persData.name);
				labelCharacteristics.setText(targetIcon.persData.life.toString() + "\n\n" 
											+ targetIcon.persData.hit1.toString() + "\n\n"
											+ targetIcon.persData.hit2.toString() + "\n\n"
											+ targetIcon.persData.hit3.toString() + "\n\n"
											+ targetIcon.persData.hit4.toString() + "\n\n"
											+ targetIcon.persData.hit5.toString());
				textPers.setText(targetIcon.persData.description);
				textPers.y = 550 - textPers.height;
				persBitmap.bitmapData = (Assets.getPersonageTexture(targetIcon.persData.id) as Bitmap).bitmapData;
				
				icon1.selectOff();
				icon2.selectOff();
				icon3.selectOff();
				panelIcons.selectIconsOff();
				targetIcon.selectOn();
				
				showButton(targetIcon.name);
			}
		}
		
		private function addPersInCommand():void
		{
			for (var i:int = 0; i < Data.userCommand.length; i++){
				if (Data.checkPersonagePlanetAvailable(Data.userCommand[i].id) == false) continue;
				if (Data.userCommand[i].id == selectedPersonage.id){
					if (icon1.persData == null) Data.userCommand[i].inCommand = 0;
					else if (icon2.persData == null) Data.userCommand[i].inCommand = 1;
					else if (icon3.persData == null) Data.userCommand[i].inCommand = 2;
					Data.userCommand[i].status = Data.STATUS_USER_PERSONAGE_AVAILABLE;
					break;
				}
			}
			updateAllIcons();
		}
		
		private function removePersInCommand():void
		{
			for (var i:int = 0; i < Data.userCommand.length; i++){
				if (Data.checkPersonagePlanetAvailable(Data.userCommand[i].id) == false) continue;
				if (Data.userCommand[i].id == selectedPersonage.id){
					Data.userCommand[i].inCommand = -1;
					Data.userCommand[i].status = Data.STATUS_USER_PERSONAGE_NOT_AVAILABLE;
					break;
				}
			}
			updateAllIcons();
		}
		
		private function updateAllIcons():void
		{
			if (icon1 != null) {
				icon1.removeEventListener(MouseEvent.MOUSE_OUT, onIconMouseOut);
				icon1.removeEventListener(MouseEvent.MOUSE_OVER, onIconMouseOver);
				icon1.removeEventListener(MouseEvent.CLICK, onIconMouseClick);
				removeChild(icon1);
				icon1 = null;
			}
			if (icon2 != null) {
				icon2.removeEventListener(MouseEvent.MOUSE_OUT, onIconMouseOut);
				icon2.removeEventListener(MouseEvent.MOUSE_OVER, onIconMouseOver);
				icon2.removeEventListener(MouseEvent.CLICK, onIconMouseClick);
				removeChild(icon2);
				icon2 = null;
			}
			if (icon3 != null) {
				icon3.removeEventListener(MouseEvent.MOUSE_OUT, onIconMouseOut);
				icon3.removeEventListener(MouseEvent.MOUSE_OVER, onIconMouseOver);
				icon3.removeEventListener(MouseEvent.CLICK, onIconMouseClick);
				removeChild(icon3);
				icon3 = null;
			}
			if (panelIcons != null) {
				panelIcons.clearPanelEvents(MouseEvent.MOUSE_OUT, onIconMouseOut);
				panelIcons.clearPanelEvents(MouseEvent.MOUSE_OVER, onIconMouseOver);
				panelIcons.clearPanelEvents(MouseEvent.CLICK, onIconMouseClick);
				removeChild(panelIcons);
				panelIcons = null;
			}
			createInons();
			createPanelIcons();
			if (icon1.persData != null) {
				showPersonageCharacteristics(icon1);
			}else if (icon2.persData != null){
				showPersonageCharacteristics(icon2);
			}else if (icon3.persData != null){
				showPersonageCharacteristics(icon3);
			}else{
				for (var i:int = 0; i < panelIcons.icons.length; i++) {
					if (panelIcons.icons[i].persData != null){
						showPersonageCharacteristics(panelIcons.icons[i]);
						break;
					}
				}
			}
		}
	}

}
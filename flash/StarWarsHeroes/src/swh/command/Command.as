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
	import swh.command.CommandLabel;
	import swh.command.CommandText;
	import swh.command.CommandDroid;
	
	/**
	 * ...
	 * @author Catfish Studio
	 */
	public class Command extends Sprite 
	{
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
		private var droid:CommandDroid;
		
		public function Command() 
		{
			super();
			addEventListener(Event.ADDED_TO_STAGE, onAddedToStage);
			addEventListener(Event.REMOVED_FROM_STAGE, onRemoveFromStage);
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
			createCrystals();
			createButtons();
			createDroid();
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
			labelPersName = new CommandLabel(50, 30, 250, 50, "arial", 14, "Имя персонажа");
			addChild(labelPersName);
			labelTitleCharacteristics = new CommandLabel(300, 80, 250, 250, "arial", 14, "Характеристики:" + "\n\n" 
																					+ "	Здоровье:" + "\n\n" 
																					+ "	Кристал ловкости:" + "\n\n" 
																					+ "	Кристал тьмы:" + "\n\n" 
																					+ "	Кристал жизни:" + "\n\n" 
																					+ "	Кристал света:" + "\n\n" 
																					+ "	Кристал интеллекта:");
			addChild(labelTitleCharacteristics);
			labelCharacteristics = new CommandLabel(475, 113, 250, 250, "arial" , 14, "0" + "\n\n" 
																					+ "0" + "\n\n"
																					+ "0" + "\n\n"
																					+ "0" + "\n\n"
																					+ "0" + "\n\n"
																					+ "0");
			addChild(labelCharacteristics);
			textPers = new CommandText(50, 300, 485, 5, "arial", 14, "Текст\n sdfsd \n sdsds \n");
			addChild(textPers);
			textPers.y = 550 - textPers.height;
		}
		
		private function createCrystals():void
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
		}
		
		private function createButtons():void
		{
			closeButton = new Button(650, 667, "ЗАКРЫТЬ", 60, 15, 16,  Constants.COMMAND_BUTTON_CLOSE, Data.userSide);
			addChild(closeButton);
		}
		
		private function createDroid():void
		{
			droid = new CommandDroid(560, 360, "Это окно вашей команды.\n\nТут вы можите убирать и добавлять персонажей в команду.\n\nВы можите улучшать характеристики персонажей за счёт полученных очков опыта.", Data.userSide);
			addChild(droid);
		}
	}

}
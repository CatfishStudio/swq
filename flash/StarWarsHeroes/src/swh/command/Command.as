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
			spaceTween = new GTween(spaceBitmap, 10);
			spaceTween.setValue("rotation", -1);
			spaceTween.ease = Sine.easeInOut;
			spaceTween.timeScale = 1;
			spaceTween.onComplete = onTweenSpace1;
		}
		
		private function onTweenSpace1(tween:GTween):void		
		{
			spaceTween.setValue("rotation", 1);
			spaceTween.ease = Sine.easeInOut;
			spaceTween.timeScale = 1;
			spaceTween.onComplete = onTweenSpace2;
		}
		
		private function onTweenSpace2(tween:GTween):void		
		{
			spaceTween.setValue("rotation", -1);
			spaceTween.ease = Sine.easeInOut;
			spaceTween.timeScale = 1;
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
			labelPersName = new CommandLabel(50, 30, 250, 50, "arial", 14, "Люк");
			addChild(labelPersName);
		}
		
		private function createButtons():void
		{
			closeButton = new Button(650, 670, "ЗАКРЫТЬ", 60, 15, 16,  Constants.COMMAND_BUTTON_CLOSE, Data.userSide);
			addChild(closeButton);
		}
		
		private function createDroid():void
		{
			droid = new CommandDroid(560, 360, "Это окно вашей команды.\n\nТут вы можите убирать и добавлять персонажей в команду.\n\nВы можите улучшать характеристики персонажей за счёт полученных очков опыта.", Data.userSide);
			addChild(droid);
		}
	}

}
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
	import swh.text.Label;
	
	/**
	 * ...
	 * @author Catfish Studio
	 */
	public class Command extends Sprite 
	{
		private var spaceBitmap:Bitmap;
		private var borderBitmap:Bitmap;
		private var bigBackgroundBitmap:Bitmap;
		private var bottomBackgroundBitmap:Bitmap;
		private var rightBackgroundBitmap:Bitmap;
		private var linesBitmap:Bitmap;
		private var persBitmap:Bitmap;

		private var labelBack:Label;
		private var labelFront:Label;
		private var colorBack:int;
		private var colorFront:int;
		
		private var lineBitmap:Bitmap;
		private var lineTween:GTween;
		
		private var closeButton:Button;
		
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
			
			init();
			createSpace();
			createBackground();
			createPers();
			createLines();
			createBorder();
		}
		
		private function onRemoveFromStage(e:Event):void 
		{
			removeEventListener(Event.REMOVED_FROM_STAGE, onRemoveFromStage);
			Mouse.cursor = MouseCursor.AUTO;
			
			Atlas.clearAtlases(Atlas.TYPE_TEXTURES);
			Atlas.clearAtlases(Atlas.TYPE_ANIMATION);
			
			lineTween.onComplete = null;
			lineTween.end();
			lineTween = null;

			removeChild(lineBitmap);
			lineBitmap;

			removeChild(lineBitmap);
			lineBitmap = null;
			
			removeChild(closeButton);
			closeButton = null;

			removeChild(persBitmap);
			persBitmap = null;

			removeChild(bigBackgroundBitmap);
			bigBackgroundBitmap = null;

			removeChild(bottomBackgroundBitmap);
			bottomBackgroundBitmap = null;

			removeChild(rightBackgroundBitmap);
			rightBackgroundBitmap = null;
			
			removeChild(linesBitmap);
			linesBitmap = null;

			removeChild(borderBitmap);
			borderBitmap = null;			

			removeChild(spaceBitmap);
			spaceBitmap = null;

			removeChild(labelBack);
			labelBack = null;
			removeChild(labelFront);
			labelFront = null;
			
			while (this.numChildren > 0)
			{
				this.removeChildren(0);
			}
		}

		private function init():void
		{
			if (Data.userSide == Constants.SIDE_JEDI) {
				colorFront = 0xFFFFFF;
				colorBack = 0x0090F0;	
			}else if (Data.userSide == Constants.SIDE_SITH) {
				colorFront = 0xFFFFFF;
				colorBack = 0x880000;
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

		private function createText():void
		{
			labelBack = new Label(5, 5, 145, 500, "arial", 12, colorBack, "text", false);
			addChild(labelBack);
			labelFront = new Label(4, 4, 145, 500, "arial", 12, colorFront, "text", false);
			addChild(labelFront);
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
		}
	}

}
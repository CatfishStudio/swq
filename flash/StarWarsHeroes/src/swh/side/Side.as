package swh.side 
{
	import flash.display.Sprite;
	import flash.events.Event;
	import flash.display.Bitmap;
	import flash.display.BitmapData;
	import flash.ui.Mouse;
	import flash.ui.MouseCursor;
	
	import swh.data.Utilits;
	import swh.data.Data;
	import swh.data.Assets;
	import swh.data.Atlas;
	import swh.data.Constants;
	import swh.button.Button;
	import swh.animation.DarthVader;
	import swh.animation.LukeSkywalker;
	import swh.side.SideHelp;
	/**
	 * ...
	 * @author Catfish Studio
	 */
	public class Side extends Sprite 
	{
		private var backgroundBitmap:Bitmap;
		private var borderBitmap:Bitmap;
		private var dvAnim:DarthVader;
		private var lsAnim:LukeSkywalker;
		private var dvButton:Button;
		private var lsButton:Button;
		private var dvHelp:SideHelp;
		private var lsHelp:SideHelp;
		
		
		public function Side() 
		{
			super();
			addEventListener(Event.ADDED_TO_STAGE, onAddedToStage);
			addEventListener(Event.REMOVED_FROM_STAGE, onRemoveFromStage);
		}
		
		private function onAddedToStage(e:Event):void 
		{
			removeEventListener(Event.ADDED_TO_STAGE, onAddedToStage);
			name = Constants.SIDE;
			Atlas.loadAtlasBitmapData(Assets.assetsAtlasesContent.SideAtlas, Assets.assetsAtlasesContent.SideAtlasXML, Atlas.TYPE_TEXTURES);
			Atlas.loadAtlasBitmapData(Assets.assetsAtlasesContent.SideAnimAtlas, Assets.assetsAtlasesContent.SideAnimAtlasXML, Atlas.TYPE_ANIMATION);
			createBackground();
			createSides();
			createButtons();
			cheateHelp();
		}
		
		private function onRemoveFromStage(e:Event):void 
		{
			removeEventListener(Event.REMOVED_FROM_STAGE, onRemoveFromStage);
			Mouse.cursor = MouseCursor.AUTO;
			
			Atlas.clearAtlases(Atlas.TYPE_TEXTURES);
			Atlas.clearAtlases(Atlas.TYPE_ANIMATION);
			
			removeChild(dvHelp);
			dvHelp = null;
			
			removeChild(lsHelp);
			lsHelp = null;
			
			removeChild(dvButton);
			dvButton = null;
			
			removeChild(dvAnim);
			dvAnim = null;
			
			removeChild(lsButton);
			lsButton = null;
			
			removeChild(lsAnim);
			lsAnim = null;
			
			borderBitmap.bitmapData.dispose();
			removeChild(borderBitmap);
			borderBitmap = null;
			
			backgroundBitmap.bitmapData.dispose();
			removeChild(backgroundBitmap);
			backgroundBitmap = null;	
			
			while (this.numChildren > 0)
			{
				this.removeChildren(0);
			}
		}
		
		private function createBackground():void 
		{
			backgroundBitmap = new Bitmap((Atlas.atlasTexturesBitmapData['side_background.png'] as BitmapData));
			backgroundBitmap.x = 0;
			backgroundBitmap.y = 0;
			addChild(backgroundBitmap);
			
			borderBitmap = new Bitmap((Atlas.atlasTexturesBitmapData['side_border.png'] as BitmapData));
			borderBitmap.x = 0;
			borderBitmap.y = 0;
			addChild(borderBitmap);
		}
		
		private function createSides():void
		{
			dvAnim = new DarthVader(70, 25, Constants.SIDE_SITH);
			dvAnim.scaleX = 0.8;
			dvAnim.scaleY = 0.8;
			addChild(dvAnim);
			
			lsAnim = new LukeSkywalker((Constants.GAME_WINDOW_WIDTH - 300), 15, Constants.SIDE_JEDI);
			lsAnim.scaleX = 0.8;
			lsAnim.scaleY = 0.8;
			addChild(lsAnim);
		}
		
		private function createButtons():void
		{
			dvButton = new Button(125, 625, "ВЫБРАТЬ", 50, 15, 16, Constants.SIDE_CLOSE_SITH, Constants.SIDE_SITH);
			addChild(dvButton);
			
			lsButton = new Button(525, 625, "ВЫБРАТЬ", 50, 15, 16, Constants.SIDE_CLOSE_JEDI, Constants.SIDE_JEDI);
			addChild(lsButton);
		}
		
		private function cheateHelp():void
		{
			dvHelp = new SideHelp(45, (Constants.GAME_WINDOW_HEIGHT - 300),"Выберите тёмную сторону силы. \"Поддайся амбициям, почувствуй власть в своих руках.\" \n\nПройдите путь Дарт Вейдера!", Constants.SIDE_SITH);
			addChild(dvHelp);
			
			lsHelp = new SideHelp((Constants.GAME_WINDOW_WIDTH / 2) + 100, (Constants.GAME_WINDOW_HEIGHT - 300), "Выберите светлую сторону силы. \"Только покой ощутив, возмёшь контроль над желаниями своими\". \n\nПройдите путь Люка Скайуокера!", Constants.SIDE_JEDI);
			addChild(lsHelp);
		}
		
	}

}
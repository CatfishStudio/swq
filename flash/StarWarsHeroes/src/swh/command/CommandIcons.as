package swh.command 
{
	import flash.display.Sprite;
	import flash.events.Event;
	import flash.display.Bitmap;
	import flash.display.BitmapData;
	
	import swh.data.Assets;
	import swh.data.Atlas;
	import swh.data.Constants;
	import swh.data.Data;
	import swh.data.Personage;
	/**
	 * ...
	 * @author Catfish Studio
	 */
	public class CommandIcons extends Sprite 
	{
		private var backgroundBitmap:Bitmap;
		private var persBitmap:Bitmap;
		private var borderBitmap:Bitmap;
		private var borderSelectBitmap:Bitmap;
		
		public var persData:Personage;
		
		public function CommandIcons(_name:String, _persData:Personage = null) 
		{
			super();
			name = _name;
			persData = _persData;
			addEventListener(Event.ADDED_TO_STAGE, onAddedToStage);
			addEventListener(Event.REMOVED_FROM_STAGE, onRemoveFromStage);
		}
		
		private function onAddedToStage(e:Event):void 
		{
			removeEventListener(Event.ADDED_TO_STAGE, onAddedToStage);
			createBackground();
			createPers();
			createBorder();
		}
		
		private function onRemoveFromStage(e:Event):void 
		{
			removeEventListener(Event.REMOVED_FROM_STAGE, onRemoveFromStage);
			
			if (backgroundBitmap != null) {
				removeChild(backgroundBitmap);
				backgroundBitmap = null;
			}
			if (persBitmap != null) {
				removeChild(persBitmap);
				persBitmap = null;
			}
			if (borderBitmap != null) {
				removeChild(borderBitmap);
				borderBitmap = null;
			}
			if (borderSelectBitmap != null) {
				removeChild(borderSelectBitmap);
				borderSelectBitmap = null;
			}
			
			while (this.numChildren)
			{
				this.removeChildren(0);
			}
		}
		
		private function createBackground():void
		{
			if (Data.userSide == Constants.SIDE_JEDI){
				backgroundBitmap = new Bitmap((Atlas.atlasTexturesBitmapData['icon_blue_background.png'] as BitmapData));
			} else {
				backgroundBitmap = new Bitmap((Atlas.atlasTexturesBitmapData['icon_red_background.png'] as BitmapData));
			}
			backgroundBitmap.x = 0;
			backgroundBitmap.y = 0;
			backgroundBitmap.alpha = 0.2;
			addChild(backgroundBitmap);
		}
		
		private function createPers():void
		{
			if(persData != null) {
				persBitmap = new Bitmap((Atlas.atlasTexturesBitmapData[persData.id + '_icon.png'] as BitmapData));
				addChild(persBitmap);
				persBitmap.x = (width / 2) - (persBitmap.width / 2);
				persBitmap.y = (height / 2) - (persBitmap.height / 2);
			}			
		}
		
		private function createBorder():void
		{
			if (Data.userSide == Constants.SIDE_JEDI){
				borderBitmap = new Bitmap((Atlas.atlasTexturesBitmapData['icon_blue_border.png'] as BitmapData));
			} else {
				borderBitmap = new Bitmap((Atlas.atlasTexturesBitmapData['icon_red_border.png'] as BitmapData));
			}
			borderBitmap.x = 0;
			borderBitmap.y = 0;
			borderBitmap.alpha = 1;
			addChild(borderBitmap);
		}
		
		public function selectOn():void
		{
			selectOff();
			borderSelectBitmap = new Bitmap((Atlas.atlasTexturesBitmapData['icon_blue_selected.png'] as BitmapData));
			borderSelectBitmap.x = 0;
			borderSelectBitmap.y = 0;
			addChild(borderSelectBitmap);
		}
		
		public function selectOff():void
		{
			if (borderSelectBitmap != null) {
				removeChild(borderSelectBitmap);
				borderSelectBitmap = null;
			}
		}
		
		public function setPers(_persData:Personage):void
		{
			persData = _persData;
			
			if (backgroundBitmap != null) {
				removeChild(backgroundBitmap);
				backgroundBitmap = null;
			}
			if (persBitmap != null) {
				removeChild(persBitmap);
				persBitmap = null;
			}
			if (borderBitmap != null) {
				removeChild(borderBitmap);
				borderBitmap = null;
			}
			if (borderSelectBitmap != null) {
				removeChild(borderSelectBitmap);
				borderSelectBitmap = null;
			}
			
			createBackground();
			createPers();
			createBorder();
		}
		
		public function getPers():Personage
		{
			return persData;
		}
	}

}
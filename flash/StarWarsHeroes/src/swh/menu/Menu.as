package swh.menu 
{
	import flash.system.*;
	import flash.display.Sprite;
	import flash.events.Event;
	import flash.display.Bitmap;
	
	import swh.data.Assets;
	import swh.data.Atlas;
	/**
	 * ...
	 * @author Catfish Studio
	 */
	public class Menu extends Sprite 
	{
		public function Menu() 
		{
			super();
			addEventListener(Event.ADDED_TO_STAGE, onAddedToStage);
			addEventListener(Event.REMOVED_FROM_STAGE, onRemoveFromStage);
		}
		
		private function onAddedToStage(e:Event):void 
		{
			removeEventListener(Event.ADDED_TO_STAGE, onAddedToStage);
			createBackground();
		}
		
		private function onRemoveFromStage(e:Event):void 
		{
			removeEventListener(Event.REMOVED_FROM_STAGE, onRemoveFromStage);
			while (this.numChildren > 0)
			{
				this.removeChildren(0);
			}
			System.gc();
		}
		
		private function createBackground():void
		{
			//addChild(Assets.assetsTexturesContent.spaceBlueBitmap);
			
			//var bg:Bitmap = Atlas.getBitmapFromAtlas('menu_background.jpg', Assets.assetsAtlasesContent.MenuAtlas, Assets.assetsAtlasesContent.MenuAtlasXML);
			//addChild(bg);
			
			Atlas.loadAtlasBitmap(Assets.assetsAtlasesContent.MenuAtlas, Assets.assetsAtlasesContent.MenuAtlasXML);
			addChild(Atlas.atlasesBitmap['menu_background.jpg']);
		}
		
		
	}

}
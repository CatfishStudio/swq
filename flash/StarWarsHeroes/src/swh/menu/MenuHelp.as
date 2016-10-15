package swh.menu 
{
	import flash.system.*;
	import starling.display.Sprite;
	import starling.events.Event;
	import starling.display.Image;
	
	import swh.data.Constants;
	import swh.data.Assets;
	/**
	 * ...
	 * @author ...
	 */
	public class MenuHelp extends Sprite 
	{
		private var image:Image;
		public function MenuHelp() 
		{
			super();
			addEventListener(Event.ADDED_TO_STAGE, onAddedToStage);
			addEventListener(Event.REMOVED_FROM_STAGE, onRemoveFromStage);
		}
		
		private function onAddedToStage(e:Event):void 
		{
			removeEventListener(Event.ADDED_TO_STAGE, onAddedToStage);
			name = Constants.MENU_HELP;
			
			createBackground();

		}
		
		private function onRemoveFromStage(e:Event):void 
		{
			removeEventListener(Event.REMOVED_FROM_STAGE, onRemoveFromStage);
			if (image != null){
				removeChild(image);
				image.dispose();
				image = null;
			}
			while (this.numChildren)
			{
				this.removeChildren(0, -1, true);
			}
			this.removeFromParent(true);
			super.dispose();
			System.gc();
		}
		
		private function createBackground():void
		{
			image = new Image(Assets.textureAtlas.getTexture('r2d2_droid_blue_right.png'));
			image.name = 'r2d2_droid_blue_right';
			image.x = 150; image.y = 250;
			addChild(image);
			
			image = new Image(Assets.textureAtlas.getTexture('hologram_menu.png'));
			image.name = 'hologram_menu';
			image.x = 0; image.y = 0;
			addChild(image);
			
			image = new Image(Assets.textureAtlas.getTexture('hologram__line_menu.png'));
			image.name = 'hologram__line_menu';
			image.x = 0; image.y = 0;
			addChild(image);
		}
		
	}

}
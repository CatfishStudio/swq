package swh.menu 
{
	import flash.system.*;
	import flash.display.Bitmap;
	import starling.display.Sprite;
	import starling.events.Event;
	import starling.display.Image;
	
	import swh.data.Assets;
	import swh.data.Constants;
	/**
	 * ...
	 * @author Catfish Studio
	 */
	public class Menu extends Sprite 
	{
		private var image:Image;
		
		public function Menu() 
		{
			super();
			addEventListener(Event.ADDED_TO_STAGE, onAddedToStage);
			addEventListener(Event.REMOVED_FROM_STAGE, onRemoveFromStage);
			
		}
		
		private function onAddedToStage(e:Event):void 
		{
			removeEventListener(Event.ADDED_TO_STAGE, onAddedToStage);
			addEventListener(Event.TRIGGERED, onButtonsClick);
			
			name = Constants.MENU;
			Assets.setTextureAtlasFromBitmap(Assets.assetsContent.MenuAtlas, Assets.assetsContent.MenuAtlasXML);
			
			createBackground();
			//createButtons();
			
			trace('[MENU]: added to stage');
		}
		
		private function onRemoveFromStage(e:Event):void 
		{
			removeEventListener(Event.REMOVED_FROM_STAGE, onRemoveFromStage);
			Assets.disposeTextureAtlas();
			
			if (image != null){
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
			trace('[MENU]: removed from stage');
		}
		
		private function onButtonsClick(e:Event):void 
		{
			//dispatchEvent(new Navigation(Navigation.CHANGE_SCREEN, true, { id: Button(e.target).name }));
		}
		
		private function createBackground():void
		{
			image = new Image(Assets.textureAtlas.getTexture('menu_background.jpg'));
			image.name = 'menu_background';
			addChild(image);
			image = new Image(Assets.textureAtlas.getTexture('menu_deathstar.png'));
			image.name = 'menu_deathstar';
			addChild(image);
			image = new Image(Assets.textureAtlas.getTexture('menu_border.png'));
			image.name = 'menu_border';
			addChild(image);
		}
		
	}

}
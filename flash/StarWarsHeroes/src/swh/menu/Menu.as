package swh.menu 
{
	import flash.display.Sprite;
	import flash.events.Event;
	import flash.display.Bitmap;
	
	import com.greensock.TweenNano;
	
	import swh.data.Assets;
	import swh.data.Atlas;
	import swh.data.Constants;
	import swh.button.Button;
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
			name = Constants.MENU;
			
			Atlas.loadAtlasBitmap(Assets.assetsAtlasesContent.MenuAtlas, Assets.assetsAtlasesContent.MenuAtlasXML, Atlas.TYPE_TEXTURES);
			Atlas.loadAtlasBitmap(Assets.assetsAtlasesContent.ButtonsAtlas, Assets.assetsAtlasesContent.ButtonsAtlasXML, Atlas.TYPE_ANIMATION);
			
			createBackground();
			createButtons();
			//createHelp();
			//createMessage();
		}
		
		private function onRemoveFromStage(e:Event):void 
		{
			removeEventListener(Event.REMOVED_FROM_STAGE, onRemoveFromStage);
			while (this.numChildren > 0)
			{
				this.removeChildren(0);
			}
			Atlas.clearAtlases();
		}
		
		private function createBackground():void
		{
			//addChild(Assets.assetsTexturesContent.spaceBlueBitmap);
			
			(Atlas.atlasesTextureBitmap['menu_background.jpg'] as Bitmap).x = 0;
			(Atlas.atlasesTextureBitmap['menu_background.jpg'] as Bitmap).y = 0;
			addChild(Atlas.atlasesTextureBitmap['menu_background.jpg']);
			
			(Atlas.atlasesTextureBitmap['menu_deathstar.png'] as Bitmap).x = 300;
			(Atlas.atlasesTextureBitmap['menu_deathstar.png'] as Bitmap).y = 100;
			addChild(Atlas.atlasesTextureBitmap['menu_deathstar.png']);
			
			(Atlas.atlasesTextureBitmap['menu_ship_2.png'] as Bitmap).x = 900;
			(Atlas.atlasesTextureBitmap['menu_ship_2.png'] as Bitmap).y = 150;
			addChild(Atlas.atlasesTextureBitmap['menu_ship_2.png']);
			
			(Atlas.atlasesTextureBitmap['menu_ship_3.png'] as Bitmap).x = 50;
			(Atlas.atlasesTextureBitmap['menu_ship_3.png'] as Bitmap).y = 150;
			addChild(Atlas.atlasesTextureBitmap['menu_ship_3.png']);
			
			(Atlas.atlasesTextureBitmap['menu_ship_1.png'] as Bitmap).x = -375;
			(Atlas.atlasesTextureBitmap['menu_ship_1.png'] as Bitmap).y = 250;
			addChild(Atlas.atlasesTextureBitmap['menu_ship_1.png']);
			
			(Atlas.atlasesTextureBitmap['menu_border.png'] as Bitmap).x = 0;
			(Atlas.atlasesTextureBitmap['menu_border.png'] as Bitmap).y = 5;
			addChild(Atlas.atlasesTextureBitmap['menu_border.png']);
		}
		
		private function createButtons():void
		{
			addChild(new Button(85, 350, "НАЧАТЬ ИГРУ", 45, 15, 16,  Constants.MENU_BUTTON_NEW_GAME));
			addChild(new Button(85, 425, "НАСТРОЙКИ", 45, 15, 16,  Constants.MENU_BUTTON_SETTINGS));
			addChild(new Button(85, 500, "ПРИГЛАСИТЬ", 45, 15, 16,  Constants.MENU_BUTTON_INVITE));
		}
		
		private function createButtonContinue():void
		{
			addChild(new Button(85, 275, "ПРОДОЛЖИТЬ ИГРУ", 45, 15, 16,  Constants.MENU_BUTTON_CONTINUE));
		}
	}

}
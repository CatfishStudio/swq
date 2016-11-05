package swh.map 
{
	import flash.system.*;
	import starling.textures.Texture;
	
	import starling.events.Event;
	import starling.display.Sprite;
	import starling.display.Image;
	import starling.core.Starling;
	import starling.events.Touch;
	import starling.events.TouchEvent;
	import starling.events.TouchPhase;
	import starling.display.DisplayObject;
	
	import swh.events.Navigation;
	import swh.data.Constants;
	import swh.data.Assets;
	import swh.data.Data;
	import swh.map.Droid;
	/**
	 * ...
	 * @author Catfish Studio
	 */
	public class Map extends Sprite 
	{
		private var map:Image;
		private var mapMouseX:Number;		// позиция курсора
		private var mapMouseY:Number;		// позиция курсора
		private var mapMove:Boolean = false;	// флаг движения курсора (скрол карты)
		
		private var image:Image;
		private var droid:Droid;
		
		public function Map() 
		{
			super();
			addEventListener(Event.ADDED_TO_STAGE, onAddedToStage);
			addEventListener(Event.REMOVED_FROM_STAGE, onRemoveFromStage);
		}
		
		private function onAddedToStage(e:Event):void 
		{
			removeEventListener(Event.ADDED_TO_STAGE, onAddedToStage);
			name = Constants.MAP;
			Assets.setTextureAtlasFromBitmap(Assets.assetsAtlasesContent.MapAtlas, Assets.assetsAtlasesContent.MapAtlasXML);
			Assets.setTextureAtlasEmbeddedAsset(Assets.assetsAtlasesContent.ButtonsAtlas, Assets.assetsAtlasesContent.ButtonsAtlasXML);
			
			createSpace();
			createIcons();
			createBorder();
			createDroid();
			
			trace('[MAP]: added to stage');
		}
		
		private function onRemoveFromStage(e:Event):void 
		{
			removeEventListener(Event.REMOVED_FROM_STAGE, onRemoveFromStage);
			
			if (map != null){
				map.removeEventListener(TouchEvent.TOUCH, onMapTouch);
				removeChild(map);
				map.dispose();
				map = null;
			}
			
			if (image != null){
				removeChild(image);
				image.dispose();
				image = null;
			}
			
			if (droid != null){
				removeChild(droid);
				droid.dispose();
				droid = null;
			}
			
			Assets.disposeTextureAtlas();
			
			while (this.numChildren)
			{
				this.removeChildren(0, -1, true);
			}
			this.removeFromParent(true);
			super.dispose();
			System.gc();
			trace('[MAP]: removed from stage');
		}
		
		private function createSpace():void
		{
			if (Data.userSide == Constants.SIDE_JEDI) map = new Image(Texture.fromBitmap(Assets.assetsTexturesContent.spaceBlueBitmap));
			if (Data.userSide == Constants.SIDE_SITH) map = new Image(Texture.fromBitmap(Assets.assetsTexturesContent.spaceRedBitmap));
			map.name = 'map_background';
			map.x = -82; 
			map.y = -19;
			map.addEventListener(TouchEvent.TOUCH, onMapTouch);
			addChild(map);
		}

		/* Перемещение карты */
		private function onMapTouch(e:TouchEvent):void 
		{
			var touch:Touch = e.getTouch(stage);
			if(touch){
				if (touch.phase == TouchPhase.BEGAN)
				{
					mapMouseX = touch.globalX;
					mapMouseY = touch.globalY;
					mapMove = true;
				} 
				if (touch.phase == TouchPhase.ENDED)
				{
					mapMouseX = touch.globalX;
					mapMouseY = touch.globalY;
					mapMove = false;
				}
				if (touch.phase == TouchPhase.MOVED)
				{
					if (mapMove) {
						if (mapMouseX < touch.globalX) {
							if(map.x < -5) map.x += 5;
						}
						if (mapMouseX > touch.globalX) {
							if(map.x > -159) map.x -= 5;
						}
						if (mapMouseY < touch.globalY) {
							if(map.y < 0) map.y += 1;
						}
						if (mapMouseY > touch.globalY) {
							if(map.y > -10) map.y -= 5;
						}
						mapMouseX = touch.globalX;
						mapMouseY = touch.globalY;
					}
				}
			}
		}
		
		private function createIcons():void 
		{
			for (var i:int = 0; i < Data.userCommand.length; i++){
				image = new Image(Assets.textureAtlas.getTexture(Data.userCommand[i].id + "_icon.png"));
				image.name = Data.userCommand[i].id;
				image.x = 35 + (105 * i);
				image.y = 625;
				addChild(image);
			}
		}
		
		private function createBorder():void
		{
			if (Data.userSide == Constants.SIDE_JEDI) {
				image = new Image(Assets.textureAtlas.getTexture('map_blue_border_top.png'));
				image.name = 'map_border_top';
				image.x = 0; image.y = 0;
				addChild(image);
				
				image = new Image(Assets.textureAtlas.getTexture('map_blue_border_left.png'));
				image.name = 'map_border_left';
				image.x = 0; image.y = 10;
				addChild(image);
				
				image = new Image(Assets.textureAtlas.getTexture('map_blue_border_bottom.png'));
				image.name = 'map_border_bottom';
				image.x = 356; image.y = 715;
				addChild(image);
				
				image = new Image(Assets.textureAtlas.getTexture('map_blue_border_right.png'));
				image.name = 'map_border_right';
				image.x = 847; image.y = 14;
				addChild(image);
				
				image = new Image(Assets.textureAtlas.getTexture('map_blue_border_desktop.png'));
				image.name = 'map_border_desktop';
				image.x = 0; image.y = 598;
				addChild(image);
			}
			if (Data.userSide == Constants.SIDE_SITH) {
				image = new Image(Assets.textureAtlas.getTexture('map_red_border_top.png'));
				image.name = 'map_border_top';
				image.x = 0; image.y = 0;
				addChild(image);
				
				image = new Image(Assets.textureAtlas.getTexture('map_red_border_left.png'));
				image.name = 'map_border_left';
				image.x = 0; image.y = 10;
				addChild(image);
				
				image = new Image(Assets.textureAtlas.getTexture('map_red_border_bottom.png'));
				image.name = 'map_border_bottom';
				image.x = 356; image.y = 715;
				addChild(image);
				
				image = new Image(Assets.textureAtlas.getTexture('map_red_border_right.png'));
				image.name = 'map_border_right';
				image.x = 847; image.y = 14;
				addChild(image);
				
				image = new Image(Assets.textureAtlas.getTexture('map_red_border_desktop.png'));
				image.name = 'map_border_desktop';
				image.x = 0; image.y = 598;
				addChild(image);
			}
		}
		
		private function createDroid():void
		{
			if (Data.userSide == Constants.SIDE_JEDI) {
				droid = new Droid(Data.userLastMessage, 0xFFFFFF, 0x0090F0);
				droid.x = 700;
				droid.y = 235;
				addChild(droid);
			}
			if (Data.userSide == Constants.SIDE_SITH) {
				droid = new Droid(Data.userLastMessage, 0xFFFFFF, 0x880000);
				droid.x = 700;
				droid.y = 235;
				addChild(droid);
			}
		}
		
		
	}

}
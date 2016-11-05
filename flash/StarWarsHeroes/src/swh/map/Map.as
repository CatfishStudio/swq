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
			
			spaceCreate();
			
			trace('[MAP]: added to stage');
		}
		
		private function onRemoveFromStage(e:Event):void 
		{
			removeEventListener(Event.REMOVED_FROM_STAGE, onRemoveFromStage);
			
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
		
		private function spaceCreate():void
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
		
		
		
		
	}

}
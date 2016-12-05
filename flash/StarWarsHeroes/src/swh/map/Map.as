package swh.map 
{
	import flash.display.Sprite;
	import flash.events.Event;
	import flash.display.Bitmap;
	import flash.display.BitmapData;
	import flash.ui.Mouse;
	import flash.ui.MouseCursor;
	import flash.events.MouseEvent;
	
	import swh.data.Utilits;
	import swh.data.Data;
	import swh.data.Assets;
	import swh.data.Atlas;
	import swh.data.Constants;
	import swh.button.Button;
	/**
	 * ...
	 * @author Catfish Studio
	 */
	public class Map extends Sprite 
	{
		private var map:Sprite;
		private var mapMouseX:Number;			// позиция курсора
		private var mapMouseY:Number;			// позиция курсора
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
			Atlas.loadAtlasBitmapData(Assets.assetsAtlasesContent.MapAtlas, Assets.assetsAtlasesContent.MapAtlasXML, Atlas.TYPE_TEXTURES);
			Atlas.loadAtlasBitmapData(Assets.assetsAtlasesContent.ButtonsAtlas, Assets.assetsAtlasesContent.ButtonsAtlasXML, Atlas.TYPE_ANIMATION);
			
			createSpace();
		}
		
		private function onRemoveFromStage(e:Event):void 
		{
			removeEventListener(Event.REMOVED_FROM_STAGE, onRemoveFromStage);
			Mouse.cursor = MouseCursor.AUTO;
			
			Atlas.clearAtlases(Atlas.TYPE_TEXTURES);
			Atlas.clearAtlases(Atlas.TYPE_ANIMATION);
			
			while (this.numChildren > 0)
			{
				this.removeChildren(0);
			}
		}
		
		private function createSpace():void
		{
			var bitmap:Bitmap;
			map = new Sprite();			
			if (Data.userSide == Constants.SIDE_JEDI){
				bitmap = new Bitmap((Assets.assetsTexturesContent.spaceBlueBitmap as Bitmap).bitmapData);
			}else if (Data.userSide == Constants.SIDE_SITH){
				bitmap = new Bitmap((Assets.assetsTexturesContent.spaceRedBitmap as Bitmap).bitmapData);
			}
			bitmap.name = 'map';
			map.addChild(bitmap);
			map.x = -82;
			map.y = -12;
			map.addEventListener(MouseEvent.MOUSE_UP, onMouseUpMap);
			map.addEventListener(MouseEvent.MOUSE_DOWN, onMouseDownMap);
			map.addEventListener(MouseEvent.MOUSE_MOVE, onMouseMoveMap);
			map.addEventListener(MouseEvent.CLICK, onMouseClickMap);
			addChild(map);
		}
		
		private function onMouseUpMap(e:MouseEvent):void 
		{
			mapMove = false;
		}
		
		private function onMouseDownMap(e:MouseEvent):void 
		{
			mapMouseX = stage.mouseX;
			mapMouseY = stage.mouseY;
			mapMove = true;
		}
		
		private function onMouseMoveMap(e:MouseEvent):void 
		{
			if(mapMove == true){
				if(mapMouseX <= stage.mouseX){
					map.x += 5;
					mapMouseX = stage.mouseX;
					mapMouseY = stage.mouseY;
				}else{
					map.x -= 5;
					mapMouseX = stage.mouseX;
					mapMouseY = stage.mouseY;
				}
			}
		}
		
		private function onMouseClickMap(e:MouseEvent):void 
		{
			
		}
		
		
		
	}

}
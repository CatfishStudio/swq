package swh.map 
{
	import flash.system.*;
	import starling.textures.Texture;
	import swh.data.Planet;
	
	import starling.events.Event;
	import starling.display.Sprite;
	import starling.display.Image;
	import starling.core.Starling;
	import starling.events.Touch;
	import starling.events.TouchEvent;
	import starling.events.TouchPhase;
	import starling.display.DisplayObject;
	import starling.animation.Tween;
	
	import swh.events.Navigation;
	import swh.data.Constants;
	import swh.data.Assets;
	import swh.data.Data;
	import swh.map.MapDroid;
	import swh.buttons.Buttons;
	import swh.map.MapPlanet;
	import swh.map.MapStartBattle;
	/**
	 * ...
	 * @author Catfish Studio
	 */
	public class Map extends Sprite 
	{
		private var map:Sprite;
		private var mapMouseX:Number;		// позиция курсора
		private var mapMouseY:Number;		// позиция курсора
		private var mapMove:Boolean = false;	// флаг движения курсора (скрол карты)
		
		private var image:Image;
		private var droid:MapDroid;
		private var button:Buttons;
		private var mapPlanet:MapPlanet;
		private var tweenLine:Tween;
		private var battleStart:MapStartBattle;
		
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
			createPlanets();
			createIcons();
			createBorder();
			createDroid();
			createButtons();
			
			trace('[MAP]: added to stage');
		}
		
		private function onRemoveFromStage(e:Event):void 
		{
			removeEventListener(Event.REMOVED_FROM_STAGE, onRemoveFromStage);
			Starling.juggler.remove(tweenLine);
			tweenLine = null;
			
			while (map.numChildren)
			{
				map.removeChildren(0, -1, true);
			}
			
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
			
			if (button != null){
				removeChild(button);
				button.dispose();
				button = null;
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
			if (Data.userSide == Constants.SIDE_JEDI) image = new Image(Texture.fromBitmap(Assets.assetsTexturesContent.spaceBlueBitmap));
			if (Data.userSide == Constants.SIDE_SITH) image = new Image(Texture.fromBitmap(Assets.assetsTexturesContent.spaceRedBitmap));
			image.name = 'map';
			map = new Sprite();
			map.name = 'map_background';
			map.x = -82; 
			map.y = -19;
			map.addEventListener(TouchEvent.TOUCH, onMapTouch);
			map.addChild(image);
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
					
					if (String(e.target) == '[object Image]'){
						if ((e.target as Image).name != null && (e.target as Image).name != 'map'){
							battleStart = new MapStartBattle(Data.planets[(e.target as Image).name]);
							addChild(battleStart);
						}
					}
					
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
			if (String(e.target) == '[object Image]'){
				if ((e.target as Image).name == null || (e.target as Image).name == 'map') droid.setText(Data.userLastMessage);
				else if (Data.planets[(e.target as Image).name] == null) droid.setText(Data.userLastMessage);
				else droid.setText((Data.planets[(e.target as Image).name] as Planet).descriptionJedi);
			}

		}
		
		private function createPlanets():void
		{
			for each (var planet:Planet in Data.planets) 
			{ 
				mapPlanet = new MapPlanet((planet as Planet));
				mapPlanet.x = (planet as Planet).x;
				mapPlanet.y = (planet as Planet).y;
				map.addChild(mapPlanet);
			}
		}
		
		private function createIcons():void 
		{
			for (var i:int = 0; i < Data.userCommand.length; i++){
				if(Data.checkPersonagePlanetAvailable(Data.userCommand[i].id) == true && Data.userCommand[i].status == Data.STATUS_USER_PERSONAGE_AVAILABLE) {
					image = new Image(Assets.textureAtlas.getTexture(Data.userCommand[i].id + "_icon.png"));
					image.name = Data.userCommand[i].id;
					image.x = 35 + (105 * i);
					image.y = 625;
					addChild(image);
				}
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
				
				image = new Image(Assets.textureAtlas.getTexture('map_desktop_blue_line.png'));
				image.name = 'map_desktop_line';
				image.x = 14; image.y = 608;
				addChild(image);
				
				onTweenLine();
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
				
				image = new Image(Assets.textureAtlas.getTexture('map_desktop_red_line.png'));
				image.name = 'map_desktop_line';
				image.x = 14; image.y = 608;
				addChild(image);
				
				onTweenLine();
			}
		}
		
		private function onTweenLine():void
		{
			Starling.juggler.remove(tweenLine);
			image = (getChildByName('map_desktop_line') as Image);
			image.y = 608;
			tweenLine = new Tween(image, 2.0, "easeInOut");
			tweenLine.animate("y", image.y + 95);
			tweenLine.onComplete = onTweenLine;
			Starling.juggler.add(tweenLine);
		}
		
		private function createDroid():void
		{
			if (Data.userSide == Constants.SIDE_JEDI) {
				droid = new MapDroid(Data.userLastMessage, 0xFFFFFF, 0x0090F0);
				droid.x = 700;
				droid.y = 235;
				addChild(droid);
			}
			if (Data.userSide == Constants.SIDE_SITH) {
				droid = new MapDroid(Data.userLastMessage, 0xFFFFFF, 0x880000);
				droid.x = 700;
				droid.y = 235;
				addChild(droid);
			}
		}
		
		private function createButtons():void
		{
			if (Data.userSide == Constants.SIDE_JEDI) {
				button = new Buttons("НАЗАД В МЕНЮ", Assets.textureAtlasAnimation.getTextures('button_blue_'), 12, 14, 0xFFFFFF, 0x0090F0);
				button.name = Constants.MAP_BUTTON_BACK_MENU;
				button.x = 10;
				button.y = 10;
				addChild(button);
				
				button = new Buttons("ПРИГЛАСИТЬ", Assets.textureAtlasAnimation.getTextures('button_blue_'), 12, 14, 0xFFFFFF, 0x0090F0);
				button.name = Constants.MAP_BUTTON_INVITE;
				button.x = 10;
				button.y = 555;
				addChild(button);
				
				button = new Buttons("КОМАНДА", Assets.textureAtlasAnimation.getTextures('button_blue_'), 12, 14, 0xFFFFFF, 0x0090F0);
				button.name = Constants.MAP_BUTTON_COMMAND;
				button.x = 360;
				button.y = 670;
				addChild(button);
				
				button = new Buttons("НАСТРОЙКИ", Assets.textureAtlasAnimation.getTextures('button_blue_'), 12, 14, 0xFFFFFF, 0x0090F0);
				button.name = Constants.MAP_BUTTON_SETTINGS;
				button.x = 560;
				button.y = 670;
				addChild(button);
			}
			if (Data.userSide == Constants.SIDE_SITH) {
				button = new Buttons("НАЗАД В МЕНЮ", Assets.textureAtlasAnimation.getTextures('button_red_'), 12, 14, 0xFFFFFF, 0x880000);
				button.name = Constants.MAP_BUTTON_BACK_MENU;
				button.x = 10;
				button.y = 10;
				addChild(button);
				
				button = new Buttons("ПРИГЛАСИТЬ", Assets.textureAtlasAnimation.getTextures('button_red_'), 12, 14, 0xFFFFFF, 0x880000);
				button.name = Constants.MAP_BUTTON_INVITE;
				button.x = 10;
				button.y = 555;
				addChild(button);
				
				button = new Buttons("КОМАНДА", Assets.textureAtlasAnimation.getTextures('button_red_'), 12, 14, 0xFFFFFF, 0x880000);
				button.name = Constants.MAP_BUTTON_COMMAND;
				button.x = 360;
				button.y = 670;
				addChild(button);
				
				button = new Buttons("НАСТРОЙКИ", Assets.textureAtlasAnimation.getTextures('button_red_'), 12, 14, 0xFFFFFF, 0x880000);
				button.name = Constants.MAP_BUTTON_SETTINGS;
				button.x = 560;
				button.y = 670;
				addChild(button);
			}
		}
		
		
	}

}
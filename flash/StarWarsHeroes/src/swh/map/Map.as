package swh.map 
{
	import flash.display.Sprite;
	import flash.events.Event;
	import flash.display.Bitmap;
	import flash.display.BitmapData;
	import flash.ui.Mouse;
	import flash.ui.MouseCursor;
	import flash.events.MouseEvent;
	
	
	import com.gskinner.motion.GTween;
	import com.gskinner.motion.GTweener;
	import com.gskinner.motion.GTweenTimeline;
	import com.gskinner.motion.easing.Sine;
	
	import swh.data.Utilits;
	import swh.data.Data;
	import swh.data.Assets;
	import swh.data.Atlas;
	import swh.data.Constants;
	import swh.data.Planet;
	import swh.button.Button;
	import swh.map.MapDroid;
	import swh.map.MapPlanet;
	import swh.map.MapStartBattle;
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
		
		private var lineBitmap:Bitmap;
		private var lineTween:GTween;
		
		private var backmenuButton:Button;
		private var inviteButton:Button;
		private var commandButton:Button;
		private var settingsButton:Button;
		
		private var droid:MapDroid;
		
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
			Atlas.loadAtlasBitmapData(Assets.assetsAtlasesContent.MapAtlas, Assets.assetsAtlasesContent.MapAtlasXML, Atlas.TYPE_TEXTURES);
			Atlas.loadAtlasBitmapData(Assets.assetsAtlasesContent.ButtonsAtlas, Assets.assetsAtlasesContent.ButtonsAtlasXML, Atlas.TYPE_ANIMATION);
			
			updateCommands();
			targetSearch();
			
			createSpace();
			createPlanets();
			createIcons();
			createBorder();
			createDroid();
			createButtons();
		}
		
		private function onRemoveFromStage(e:Event):void 
		{
			removeEventListener(Event.REMOVED_FROM_STAGE, onRemoveFromStage);
			Mouse.cursor = MouseCursor.AUTO;
			
			Atlas.clearAtlases(Atlas.TYPE_TEXTURES);
			Atlas.clearAtlases(Atlas.TYPE_ANIMATION);
			
			lineTween.onComplete = null;
			lineTween.end();
			lineTween = null;
			
			lineBitmap.bitmapData.dispose();
			removeChild(lineBitmap);
			lineBitmap = null;
			
			removeChild(droid);
			droid = null;
			
			removeChild(backmenuButton);
			backmenuButton = null;
			removeChild(inviteButton);
			inviteButton = null;
			removeChild(commandButton);
			commandButton = null;
			removeChild(settingsButton);
			settingsButton = null;
			
			if (battleStart != null){
				removeChild(battleStart);
				battleStart = null;
			}
			
			var mapPlanet:MapPlanet; 
			for each (var planet:Planet in Data.planets) 
			{ 
				mapPlanet = (map.getChildByName(planet.id) as MapPlanet);
				mapPlanet.removeEventListener(MouseEvent.MOUSE_OUT, onPlanetMouseOut);
				mapPlanet.removeEventListener(MouseEvent.MOUSE_OVER, onPlanetMouseOver);
				mapPlanet.removeEventListener(MouseEvent.CLICK, onPlanetMouseClick);
				map.removeChild(mapPlanet);
				mapPlanet = null;
			}
			
			while (map.numChildren > 0) 
			{
				map.removeChildren(0);
			}
			map.removeEventListener(MouseEvent.MOUSE_UP, onMouseUpMap);
			map.removeEventListener(MouseEvent.MOUSE_DOWN, onMouseDownMap);
			map.removeEventListener(MouseEvent.MOUSE_MOVE, onMouseMoveMap);
			removeChild(map);
			map = null;
			
			while (this.numChildren > 0)
			{
				this.removeChildren(0);
			}
		}
		
		private function updateCommands():void
		{
			Data.updateUserCommand();
			Data.updateAICommand();
		}
		
		private function targetSearch():void
		{
			Data.aiSearchTargetID();
			Data.userSearchTarget();
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
					if (map.x > 0) map.x = 0;
				}else{
					map.x -= 5;
					if (map.x < -160) map.x = -160;
				}
				if (mapMouseY <= stage.mouseY){
					map.y += 1;
					if (map.y > 0) map.y = 0;
				}else{
					map.y -= 1;
					if (map.y < -25) map.y = -25;
				}
				mapMouseX = stage.mouseX;
				mapMouseY = stage.mouseY;
			}
		}
		
		private function createPlanets():void
		{
			var mapPlanet:MapPlanet;
			for each (var planet:Planet in Data.planets) 
			{ 
				mapPlanet = new MapPlanet((planet as Planet));
				mapPlanet.x = (planet as Planet).x;
				mapPlanet.y = (planet as Planet).y;
				mapPlanet.addEventListener(MouseEvent.MOUSE_OUT, onPlanetMouseOut);
				mapPlanet.addEventListener(MouseEvent.MOUSE_OVER, onPlanetMouseOver);
				mapPlanet.addEventListener(MouseEvent.CLICK, onPlanetMouseClick);
				map.addChild(mapPlanet);
				if (planet.id == Data.userTarget) mapPlanet.showTarget(Data.userSide);
				if (planet.id == Data.aiTarget) mapPlanet.showTarget(Data.aiSide);
			}
		}
		
		private function onPlanetMouseOut(e:MouseEvent):void 
		{
			Mouse.cursor = MouseCursor.AUTO;
			droid.setText(Data.userLastMessage);
		}
		
		private function onPlanetMouseOver(e:MouseEvent):void 
		{
			Mouse.cursor = MouseCursor.BUTTON;
			droid.setText((Data.planets[e.target.name] as Planet).descriptionJedi);
		}
		
		private function onPlanetMouseClick(e:MouseEvent):void 
		{
			battleStart = new MapStartBattle(Data.planets[e.target.name]);
			addChild(battleStart);
		}
		
		public function onBattleStartClose():void
		{
			if (battleStart != null) removeChild(battleStart);
		}
		
		private function createIcons():void 
		{
			var bitmap:Bitmap;
			for (var i:int = 0; i < 3; i++){
				for (var j:int = 0; j < Data.userCommand.length; j++){
					if (Data.userCommand[j].inCommand == i){
						if(Data.checkPersonagePlanetAvailable(Data.userCommand[j].id) == true && Data.userCommand[j].status == Data.STATUS_USER_PERSONAGE_AVAILABLE) {
							bitmap = new Bitmap((Atlas.atlasTexturesBitmapData[Data.userCommand[j].id + "_icon.png"] as BitmapData));
							bitmap.name = Data.userCommand[j].id;
							bitmap.x = 35 + (105 * i);
							bitmap.y = 625;
							addChild(bitmap);
						}
					}
				}
			}
			bitmap = null;
		}
		
		private function createBorder():void
		{
			var bitmap:Bitmap;
			if (Data.userSide == Constants.SIDE_JEDI) {
				bitmap = new Bitmap((Atlas.atlasTexturesBitmapData["map_blue_border_top.png"] as BitmapData));
				bitmap.name = 'map_border_top';
				bitmap.x = 0; bitmap.y = 0;
				addChild(bitmap);
				
				bitmap = new Bitmap((Atlas.atlasTexturesBitmapData["map_blue_border_left.png"] as BitmapData));
				bitmap.name = 'map_border_left';
				bitmap.x = 8; bitmap.y = 14;
				addChild(bitmap);
				
				bitmap = new Bitmap((Atlas.atlasTexturesBitmapData["map_blue_border_bottom.png"] as BitmapData));
				bitmap.name = 'map_border_bottom';
				bitmap.x = 355; bitmap.y = 715;
				addChild(bitmap);
				
				bitmap = new Bitmap((Atlas.atlasTexturesBitmapData["map_blue_border_right.png"] as BitmapData));
				bitmap.name = 'map_border_right';
				bitmap.x = 849; bitmap.y = 14;
				addChild(bitmap);
				
				bitmap = new Bitmap((Atlas.atlasTexturesBitmapData["map_blue_border_desktop.png"] as BitmapData));
				bitmap.name = 'map_border_desktop';
				bitmap.x = 3; bitmap.y = 598;
				addChild(bitmap);
				
				lineBitmap = new Bitmap((Atlas.atlasTexturesBitmapData["map_desktop_blue_line.png"] as BitmapData));
				lineBitmap.name = 'map_desktop_line';
				lineBitmap.x = 14; lineBitmap.y = 608;
				addChild(lineBitmap);
				runLineTween();
				
			}else if (Data.userSide == Constants.SIDE_SITH) {
				bitmap = new Bitmap((Atlas.atlasTexturesBitmapData["map_red_border_top.png"] as BitmapData));
				bitmap.name = 'map_border_top';
				bitmap.x = 0; bitmap.y = 0;
				addChild(bitmap);
				
				bitmap = new Bitmap((Atlas.atlasTexturesBitmapData["map_red_border_left.png"] as BitmapData));
				bitmap.name = 'map_border_left';
				bitmap.x = 8; bitmap.y = 14;
				addChild(bitmap);
				
				bitmap = new Bitmap((Atlas.atlasTexturesBitmapData["map_red_border_bottom.png"] as BitmapData));
				bitmap.name = 'map_border_bottom';
				bitmap.x = 355; bitmap.y = 715;
				addChild(bitmap);
				
				bitmap = new Bitmap((Atlas.atlasTexturesBitmapData["map_red_border_right.png"] as BitmapData));
				bitmap.name = 'map_border_right';
				bitmap.x = 849; bitmap.y = 14;
				addChild(bitmap);
				
				bitmap = new Bitmap((Atlas.atlasTexturesBitmapData["map_red_border_desktop.png"] as BitmapData));
				bitmap.name = 'map_border_desktop';
				bitmap.x = 3; bitmap.y = 598;
				addChild(bitmap);
				
				lineBitmap = new Bitmap((Atlas.atlasTexturesBitmapData["map_desktop_red_line.png"] as BitmapData));
				lineBitmap.name = 'map_desktop_line';
				lineBitmap.x = 14; lineBitmap.y = 608;
				addChild(lineBitmap);
				runLineTween();
			}
			bitmap = null;
		}
		
		private function runLineTween():void
		{
			lineTween = new GTween(lineBitmap, 2);
			lineTween.setValue("y", lineBitmap.y + 95);
			lineTween.ease = Sine.easeInOut;
			lineTween.timeScale = 1;
			lineTween.onComplete = onTweenLine;
		}
		
		private function onTweenLine(tween:GTween):void		
		{
			lineBitmap.y = 608;
			lineTween.setValue("y", lineBitmap.y + 95);
			lineTween.ease = Sine.easeInOut;
			lineTween.timeScale = 1;
			lineTween.onComplete = onTweenLine;
		}
		
		private function createDroid():void
		{
			droid = new MapDroid(700, 235, Data.userLastMessage, Data.userSide);
			addChild(droid);
		}
		
		private function createButtons():void
		{
			backmenuButton = new Button(10, 10, "НАЗАД В МЕНЮ", 40, 15, 16,  Constants.MAP_BUTTON_BACK_MENU, Data.userSide);
			addChild(backmenuButton);
			inviteButton = new Button(10, 555, "ПРИГЛАСИТЬ", 45, 15, 16,  Constants.MAP_BUTTON_INVITE, Data.userSide);
			addChild(inviteButton);
			commandButton = new Button(360, 670, "КОМАНДА", 50, 15, 16,  Constants.MAP_BUTTON_COMMAND, Data.userSide);
			addChild(commandButton);
			settingsButton = new Button(560, 670, "НАСТРОЙКИ", 45, 15, 16,  Constants.MAP_BUTTON_SETTINGS, Data.userSide);
			addChild(settingsButton);
		}
		
		
		
	}

}
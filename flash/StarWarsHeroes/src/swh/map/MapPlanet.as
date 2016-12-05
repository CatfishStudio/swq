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
	import swh.data.Personage;
	import swh.text.Label;
	/**
	 * ...
	 * @author Catfish Studio
	 */
	public class MapPlanet extends Sprite 
	{
		private var planet:Planet;
		private var colorBlueBack:int = 0x0090F0;
		private var colorBlueFront:int = 0xFFFFFF;
		private var colorRedBack:int = 0x880000;
		private var colorRedFront:int = 0xFFFFFF;
		private var power:Number = 0;
		
		private var markBitmap:Bitmap;
		private var planetBitmap:Bitmap;
		private var lightBitmap:Bitmap;
		private var titleBitmap:Bitmap;
		private var pers1Bitmap:Bitmap;
		private var pers2Bitmap:Bitmap;
		private var pers3Bitmap:Bitmap;
		
		private var labelTitleBack:Label;
		private var labelTitleFront:Label;
		private var labelMasterBack:Label;
		private var labelMasterFront:Label;
		private var labelPowerBack:Label;
		private var labelPowerFront:Label;
		
		public function MapPlanet(_planet:Planet) 
		{
			super();
			planet = _planet;
			addEventListener(Event.ADDED_TO_STAGE, onAddedToStage);
			addEventListener(Event.REMOVED_FROM_STAGE, onRemoveFromStage);
		}
		
		private function onAddedToStage(e:Event):void 
		{
			removeEventListener(Event.ADDED_TO_STAGE, onAddedToStage);
			name = planet.id;
			initPower();
			createMarks();
			createPlanet();
			createTitle();		
			createPersonages();
		}
		
		private function onRemoveFromStage(e:Event):void 
		{
			removeEventListener(Event.REMOVED_FROM_STAGE, onRemoveFromStage);
			Mouse.cursor = MouseCursor.AUTO;
			
			removeChild(labelTitleBack);
			labelTitleBack = null;
			removeChild(labelTitleFront);
			labelTitleFront = null;
			
			removeChild(labelMasterBack);
			labelMasterBack = null;
			removeChild(labelMasterFront);
			labelMasterFront = null;
			
			removeChild(labelPowerBack);
			labelPowerBack = null;
			removeChild(labelPowerFront);
			labelPowerFront = null;
			
			removeChild(pers1Bitmap);
			pers1Bitmap = null;
			removeChild(pers2Bitmap);
			pers2Bitmap = null;
			removeChild(pers3Bitmap);
			pers3Bitmap = null;
			
			removeChild(markBitmap);
			markBitmap = null;
			
			removeChild(planetBitmap);
			planetBitmap = null;
			
			removeChild(lightBitmap);
			lightBitmap = null;
			
			removeChild(titleBitmap);
			titleBitmap = null;
			
			while (this.numChildren > 0)
			{
				this.removeChildren(0);
			}
		}
		
		public function getPlanet():Planet
		{
			return planet;
		}
		
		private function initPower():void
		{
			if (Data.userSide == Constants.SIDE_JEDI){
				power += (Data.personages[planet.personageSith1] as Personage).hit1 + 
							(Data.personages[planet.personageSith1] as Personage).hit2 +
							(Data.personages[planet.personageSith1] as Personage).hit3 +
							(Data.personages[planet.personageSith1] as Personage).hit4 +
							(Data.personages[planet.personageSith1] as Personage).hit5;
				power += (Data.personages[planet.personageSith2] as Personage).hit1 + 
							(Data.personages[planet.personageSith2] as Personage).hit2 +
							(Data.personages[planet.personageSith2] as Personage).hit3 +
							(Data.personages[planet.personageSith2] as Personage).hit4 +
							(Data.personages[planet.personageSith2] as Personage).hit5;
				power += (Data.personages[planet.personageSith3] as Personage).hit1 + 
							(Data.personages[planet.personageSith3] as Personage).hit2 +
							(Data.personages[planet.personageSith3] as Personage).hit3 +
							(Data.personages[planet.personageSith3] as Personage).hit4 +
							(Data.personages[planet.personageSith3] as Personage).hit5;
			}
			if (Data.userSide == Constants.SIDE_SITH){
				power += (Data.personages[planet.personageJedi1] as Personage).hit1 + 
							(Data.personages[planet.personageJedi1] as Personage).hit2 +
							(Data.personages[planet.personageJedi1] as Personage).hit3 +
							(Data.personages[planet.personageJedi1] as Personage).hit4 +
							(Data.personages[planet.personageJedi1] as Personage).hit5;
				power += (Data.personages[planet.personageJedi2] as Personage).hit1 + 
							(Data.personages[planet.personageJedi2] as Personage).hit2 +
							(Data.personages[planet.personageJedi2] as Personage).hit3 +
							(Data.personages[planet.personageJedi2] as Personage).hit4 +
							(Data.personages[planet.personageJedi2] as Personage).hit5;
				power += (Data.personages[planet.personageJedi3] as Personage).hit1 + 
							(Data.personages[planet.personageJedi3] as Personage).hit2 +
							(Data.personages[planet.personageJedi3] as Personage).hit3 +
							(Data.personages[planet.personageJedi3] as Personage).hit4 +
							(Data.personages[planet.personageJedi3] as Personage).hit5;
			}
			power /= 10;
		}
		
		private function createMarks():void
		{
			if (planet.status == Data.STATUS_PLANET_QUEST_COMPLETE_JEDI){
				markBitmap = new Bitmap((Atlas.atlasTexturesBitmapData['map_mark_blue.png'] as BitmapData));
				markBitmap.x = -10;
				markBitmap.y = -10;
				addChild(markBitmap);
			}else if (planet.status == Data.STATUS_PLANET_QUEST_COMPLETE_SITH){
				markBitmap = new Bitmap((Atlas.atlasTexturesBitmapData['map_mark_red.png'] as BitmapData));
				markBitmap.x = -10;
				markBitmap.y = -10;
				addChild(markBitmap);
			}
		}
		
		private function createPlanet():void
		{
			planetBitmap = new Bitmap((Assets.getPlanetTexture(planet.id) as Bitmap).bitmapData);
			planetBitmap.name = planet.id;
			planetBitmap.x = 0; 
			planetBitmap.y = 0;
			planetBitmap.scaleX = planet.scale;
			planetBitmap.scaleY = planet.scale;
			addChild(planetBitmap);
			
			
			lightBitmap = new Bitmap((Assets.getPlanetTexture('planet_light') as Bitmap).bitmapData);
			lightBitmap.name = planet.id;
			lightBitmap.x = -4; 
			lightBitmap.y = -5.5;
			lightBitmap.scaleX = planet.scale + 0.01;
			lightBitmap.scaleY = planet.scale + 0.01;
			lightBitmap.alpha = 0.3;
			addChild(lightBitmap);
		}
		
		private function createTitle():void
		{
			titleBitmap = new Bitmap((Atlas.atlasTexturesBitmapData['map_planet_title.png'] as BitmapData));
			titleBitmap.x = 20; 
			titleBitmap.y = -10;
			titleBitmap.alpha = 0.8;
			addChild(titleBitmap);
			
			var colorBack:int;
			var colorFront:int;
			
			if (Data.userSide == Constants.SIDE_JEDI){
				if (planet.status == Data.STATUS_PLANET_QUEST_COMPLETE_JEDI || planet.status == Data.STATUS_PLANET_QUEST_AWAITING){
					colorBack = colorBlueBack
					colorFront = colorBlueFront;
				}else if(planet.status == Data.STATUS_PLANET_QUEST_COMPLETE_SITH){
					colorBack = colorRedBack;
					colorFront = colorRedFront;
				}
			}else if (Data.userSide == Constants.SIDE_SITH){
				if (planet.status == Data.STATUS_PLANET_QUEST_COMPLETE_SITH || planet.status == Data.STATUS_PLANET_QUEST_AWAITING){
					colorBack = colorRedBack;
					colorFront = colorRedFront;
				}else if(planet.status == Data.STATUS_PLANET_QUEST_COMPLETE_JEDI){
					colorBack = colorBlueBack;
					colorFront = colorBlueFront;
				}
			}
			
			labelTitleBack = new Label(40, -30, 200, 30, "arial", 14, colorBack, planet.name, false);
			addChild(labelTitleBack);
			labelTitleFront = new Label(39, -31, 200, 30, "arial", 14, colorFront, planet.name, false);
			addChild(labelTitleFront);
			
			if (planet.status == Data.STATUS_PLANET_QUEST_COMPLETE_JEDI){
				labelMasterBack = new Label(75, -5, 200, 30, "arial", 14, colorBlueBack, 'Орден Джедай', false);
				addChild(labelMasterBack);
				labelMasterFront = new Label(74, -6, 200, 30, "arial", 14, colorBlueFront, 'Орден Джедай', false);
				addChild(labelMasterFront);
				
			} else if (planet.status == Data.STATUS_PLANET_QUEST_COMPLETE_SITH){
				labelMasterBack = new Label(75, -5, 200, 30, "arial", 14, colorRedBack, 'Орден Ситов', false);
				addChild(labelMasterBack);
				labelMasterFront = new Label(74, -6, 200, 30, "arial", 14, colorRedFront, 'Орден Ситов', false);
				addChild(labelMasterFront);
			}
			
			if (planet.status == Data.STATUS_PLANET_QUEST_AWAITING){
				labelPowerBack = new Label( int(power.toString().length) * (-1), -10, 40, 30, "arial", 14, colorBack, power.toString(), false);
				addChild(labelPowerBack);
				labelPowerFront = new Label( int(power.toString().length) * (-1) -1, -11, 40, 30, "arial", 14, colorFront, power.toString(), false);
				addChild(labelPowerFront);
			}
		}
		
		private function createPersonages():void
		{
			if (Data.userSide == Constants.SIDE_JEDI && planet.status == Data.STATUS_PLANET_QUEST_AWAITING){
				pers1Bitmap = new Bitmap((Assets.getPersonageTexture(planet.personageSith1) as Bitmap).bitmapData);
				pers1Bitmap.x = 85; 
				pers1Bitmap.y = 0;
				pers1Bitmap.scaleX = 0.15;
				pers1Bitmap.scaleY = 0.15;
				addChild(pers1Bitmap);
				
				pers2Bitmap = new Bitmap((Assets.getPersonageTexture(planet.personageSith2) as Bitmap).bitmapData);
				pers2Bitmap.x = 125; 
				pers2Bitmap.y = 0;
				pers2Bitmap.scaleX = 0.15;
				pers2Bitmap.scaleY = 0.15;
				addChild(pers2Bitmap);
				
				pers3Bitmap = new Bitmap((Assets.getPersonageTexture(planet.personageSith3) as Bitmap).bitmapData);
				pers3Bitmap.x = 165; 
				pers3Bitmap.y = 0;
				pers3Bitmap.scaleX = 0.15;
				pers3Bitmap.scaleY = 0.15;
				addChild(pers3Bitmap);
				
			}else if (Data.userSide == Constants.SIDE_SITH && planet.status == Data.STATUS_PLANET_QUEST_AWAITING){
				
				pers1Bitmap = new Bitmap((Assets.getPersonageTexture(planet.personageJedi1) as Bitmap).bitmapData);
				pers1Bitmap.x = 85; 
				pers1Bitmap.y = 0;
				pers1Bitmap.scaleX = 0.15;
				pers1Bitmap.scaleY = 0.15;
				addChild(pers1Bitmap);
				
				pers2Bitmap = new Bitmap((Assets.getPersonageTexture(planet.personageJedi2) as Bitmap).bitmapData);
				pers2Bitmap.x = 125; 
				pers2Bitmap.y = 0;
				pers2Bitmap.scaleX = 0.15;
				pers2Bitmap.scaleY = 0.15;
				addChild(pers2Bitmap);
				
				pers3Bitmap = new Bitmap((Assets.getPersonageTexture(planet.personageJedi3) as Bitmap).bitmapData);
				pers3Bitmap.x = 165; 
				pers3Bitmap.y = 0;
				pers3Bitmap.scaleX = 0.15;
				pers3Bitmap.scaleY = 0.15;
				addChild(pers3Bitmap);
			}
			
		}
		
		

	}

}
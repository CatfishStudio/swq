package swh.map 
{
	import flash.system.*;
	import starling.textures.Texture;
	import starling.display.Sprite;
	import starling.events.Event;
	import starling.display.Sprite;
	import starling.display.Image;
	import starling.text.TextField;
	import starling.text.TextFormat;
	
	
	import swh.data.Planet;
	import swh.data.Constants;
	import swh.data.Assets;
	import swh.data.Data;
	import swh.data.Personage;
	/**
	 * ...
	 * @author ...
	 */
	public class MapPlanet extends Sprite 
	{
		private var planet:Planet;
		private var image:Image;
		private var textField1:TextField;
		private var textField2:TextField;
		private var text:String;
		private var colorBlueBack:uint = 0x0090F0;
		private var colorBlueFront:uint = 0xFFFFFF;
		private var colorRedBack:uint = 0x880000;
		private var colorRedFront:uint = 0xFFFFFF;
		private var power:Number = 0;
		
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
			
			if (image != null){
				removeChild(image);
				image.dispose();
				image = null;
			}
			
			if (textField1 != null){
				removeChild(textField1);
				textField1.dispose();
				textField1 = null;
			}
			
			if (textField2 != null){
				removeChild(textField2);
				textField2.dispose();
				textField2 = null;
			}
			
			while (this.numChildren)
			{
				this.removeChildren(0, -1, true);
			}
			this.removeFromParent(true);
			super.dispose();
			System.gc();
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
				image = new Image(Assets.textureAtlas.getTexture('map_mark_blue.png'));
				image.x = -10; image.y = -10;
				addChild(image);
			}
			if (planet.status == Data.STATUS_PLANET_QUEST_COMPLETE_SITH){
				image = new Image(Assets.textureAtlas.getTexture('map_mark_red.png'));
				image.x = -10; image.y = -10;
				addChild(image);
			}
		}
		
		private function createPlanet():void
		{
			image = new Image(Assets.getPlanetTexture(planet.id));
			image.name = planet.id;
			image.x = 0; image.y = 0;
			image.scale = planet.scale;
			addChild(image);
			
			image = new Image(Assets.getPlanetTexture('planet_light'));
			image.name = planet.id;
			image.x = -4; image.y = -5.5;
			image.scale = planet.scale + 0.01;
			image.alpha = 0.3;
			addChild(image);
		}
		
		private function createTitle():void
		{
			image = new Image(Assets.textureAtlas.getTexture('map_planet_title.png'));
			image.x = 20; image.y = -10;
			image.alpha = 0.8;
			addChild(image);
			
			var textFormatBack:TextFormat;
			var textFormatFront:TextFormat;
			
			if (Data.userSide == Constants.SIDE_JEDI){
				if (planet.status == Data.STATUS_PLANET_QUEST_COMPLETE_JEDI || planet.status == Data.STATUS_PLANET_QUEST_AWAITING){
					textFormatBack = new TextFormat("Arial", 14, colorBlueBack, "left", "center");
					textFormatFront = new TextFormat("Arial", 14, colorBlueFront, "left", "center");
				}else if(planet.status == Data.STATUS_PLANET_QUEST_COMPLETE_SITH){
					textFormatBack = new TextFormat("Arial", 14, colorRedBack, "left", "center");
					textFormatFront = new TextFormat("Arial", 14, colorRedFront, "left", "center");
				}
			}else if (Data.userSide == Constants.SIDE_SITH){
				if (planet.status == Data.STATUS_PLANET_QUEST_COMPLETE_SITH || planet.status == Data.STATUS_PLANET_QUEST_AWAITING){
					textFormatBack = new TextFormat("Arial", 14, colorRedBack, "left", "center");
					textFormatFront = new TextFormat("Arial", 14, colorRedFront, "left", "center");
				}else if(planet.status == Data.STATUS_PLANET_QUEST_COMPLETE_JEDI){
					textFormatBack = new TextFormat("Arial", 14, colorBlueBack, "left", "center");
					textFormatFront = new TextFormat("Arial", 14, colorBlueFront, "left", "center");
				}
			}
			textFormatBack.bold = true;
			textFormatFront.bold = true;
			
			textField1 = new TextField(200, 30, planet.name, textFormatBack);
			textField1.x = 40;
			textField1.y = -30;
			addChild(textField1);
			
			textField2 = new TextField(200, 30, planet.name, textFormatFront);
			textField2.x = 40 - 1.5;
			textField2.y = -31;
			addChild(textField2);
			
			if (planet.status == Data.STATUS_PLANET_QUEST_COMPLETE_JEDI){
				textField1 = new TextField(200, 30, 'Орден Джедай', textFormatBack);
				textField1.x = 75;
				textField1.y = -5;
				addChild(textField1);
				
				textField2 = new TextField(200, 30, 'Орден Джедай', textFormatFront);
				textField2.x = 75 - 1.5;
				textField2.y = -6;
				addChild(textField2);
			}
			
			if (planet.status == Data.STATUS_PLANET_QUEST_COMPLETE_SITH){
				textField1 = new TextField(200, 30, 'Орден Ситов', textFormatBack);
				textField1.x = 75;
				textField1.y = -5;
				addChild(textField1);
				
				textField2 = new TextField(200, 30, 'Орден Ситов', textFormatFront);
				textField2.x = 75 - 1.5;
				textField2.y = -6;
				addChild(textField2);
			}
			
			if (planet.status == Data.STATUS_PLANET_QUEST_AWAITING){
				textFormatBack.horizontalAlign = "right";
				textFormatFront.horizontalAlign = "right";
				textField1 = new TextField(40, 30, power.toString(), textFormatBack);
				textField1.x = -10;
				textField1.y = -10;
				addChild(textField1);
				
				textField2 = new TextField(40, 30, power.toString(), textFormatFront);
				textField2.x = -10 - 1.5;
				textField2.y = -11;
				addChild(textField2);
			}
		}
		
		private function createPersonages():void
		{
			if (Data.userSide == Constants.SIDE_JEDI && planet.status == Data.STATUS_PLANET_QUEST_AWAITING){
				image = new Image(Assets.getPersonageTexture(planet.personageSith1));
				image.x = 85; image.y = 0;
				image.scale = 0.15;
				addChild(image);
				
				image = new Image(Assets.getPersonageTexture(planet.personageSith2));
				image.x = 125; image.y = 0;
				image.scale = 0.15;
				addChild(image);
				
				image = new Image(Assets.getPersonageTexture(planet.personageSith3));
				image.x = 165; image.y = 0;
				image.scale = 0.15;
				addChild(image);
			}
			if (Data.userSide == Constants.SIDE_SITH && planet.status == Data.STATUS_PLANET_QUEST_AWAITING){
				image = new Image(Assets.getPersonageTexture(planet.personageJedi1));
				image.x = 85; image.y = 0;
				image.scale = 0.15;
				addChild(image);
				
				image = new Image(Assets.getPersonageTexture(planet.personageJedi2));
				image.x = 125; image.y = 0;
				image.scale = 0.15;
				addChild(image);
				
				image = new Image(Assets.getPersonageTexture(planet.personageJedi3));
				image.x = 165; image.y = 0;
				image.scale = 0.15;
				addChild(image);
				
			}
			
		}
		
		public function target():void
		{
			
		}
	}
}
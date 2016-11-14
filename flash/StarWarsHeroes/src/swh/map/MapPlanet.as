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
			image.x = 0; image.y = 0;
			image.scale = planet.scale;
			addChild(image);
			
			image = new Image(Assets.getPlanetTexture('planet_light'));
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
			
			var textFormat:TextFormat;
			if(Data.userSide == Constants.SIDE_JEDI){
				textFormat = new TextFormat("Arial", 14, colorBlueBack, "left", "center");
				textFormat.bold = true;
				textField1 = new TextField(150, 30, planet.name, textFormat);
				textField1.x = 40;
				textField1.y = -30;
				addChild(textField1);
				
				textFormat = new TextFormat("Arial", 14, colorBlueFront, "left", "center");
				textFormat.bold = true;
				textField2 = new TextField(150, 30, planet.name, textFormat);
				textField2.x = 40 - 1.5;
				textField2.y = -31;
				addChild(textField2);
			}
			
			if(Data.userSide == Constants.SIDE_SITH){
				textFormat = new TextFormat("Arial", 14, colorRedBack, "left", "center");
				textFormat.bold = true;
				textField1 = new TextField(150, 30, planet.name, textFormat);
				textField1.x = 40;
				textField1.y = -30;
				addChild(textField1);
				
				textFormat = new TextFormat("Arial", 14, colorRedFront, "left", "center");
				textFormat.bold = true;
				textField2 = new TextField(150, 30, planet.name, textFormat);
				textField2.x = 40 - 1.5;
				textField2.y = -31;
				addChild(textField2);
			}
			
			if (planet.status == Data.STATUS_PLANET_QUEST_COMPLETE_JEDI){
				textFormat = new TextFormat("Arial", 14, colorBlueBack, "left", "center");
				textFormat.bold = true;
				textField1 = new TextField(150, 30, 'Орден Джедай', textFormat);
				textField1.x = 75;
				textField1.y = -5;
				addChild(textField1);
				
				textFormat = new TextFormat("Arial", 14, colorBlueFront, "left", "center");
				textFormat.bold = true;
				textField2 = new TextField(150, 30, 'Орден Джедай', textFormat);
				textField2.x = 75 - 1.5;
				textField2.y = -6;
				addChild(textField2);
			}
			
			if (planet.status == Data.STATUS_PLANET_QUEST_COMPLETE_SITH){
				textFormat = new TextFormat("Arial", 14, colorRedBack, "left", "center");
				textFormat.bold = true;
				textField1 = new TextField(150, 30, 'Орден Ситов', textFormat);
				textField1.x = 75;
				textField1.y = -5;
				addChild(textField1);
				
				textFormat = new TextFormat("Arial", 14, colorRedFront, "left", "center");
				textFormat.bold = true;
				textField2 = new TextField(150, 30, 'Орден Ситов', textFormat);
				textField2.x = 75 - 1.5;
				textField2.y = -6;
				addChild(textField2);
			}
		}
		
		private function createPersonages():void
		{
			if (Data.userSide == Constants.SIDE_JEDI){
				image = new Image(Assets.getPersonageTexture(planet.personageSith1));
				image.x = 0; image.y = 0;
				image.scale = 0.15;
				addChild(image);
				
			}
			
			
		}
		
		
	}
}
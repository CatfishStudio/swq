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
		private var colorBack:uint;
		private var colorFront:uint;
		
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
			image = new Image(Assets.getPlanetTexture(planet.id));
			image.x = 0; image.y = 0;
			image.scale = planet.scale;
			addChild(image);
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
		
	}

}
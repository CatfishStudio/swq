package swh.map 
{
	import flash.system.*;
	import starling.textures.Texture;
	import starling.display.Sprite;
	import starling.events.Event;
	import starling.display.Sprite;
	import starling.display.Image;
	import starling.core.Starling;
	import starling.events.Touch;
	import starling.events.TouchEvent;
	import starling.events.TouchPhase;
	import starling.display.DisplayObject;
	import starling.text.TextField;
	import starling.text.TextFormat;
	import starling.animation.Tween;
	
	import swh.data.Constants;
	import swh.data.Assets;
	import swh.data.Data;
	/**
	 * ...
	 * @author Catfish Studio
	 */
	public class MapDroid extends Sprite 
	{
		private var image:Image;
		private var textField1:TextField;
		private var textField2:TextField;
		private var text:String;
		private var colorBack:uint;
		private var colorFront:uint;
		private var tweenLine:Tween;
		
		public function MapDroid(_text:String, _colorFront:uint, _colorBack:uint) 
		{
			super();
			text = _text;
			colorFront = _colorFront;
			colorBack = _colorBack;
			addEventListener(Event.ADDED_TO_STAGE, onAddedToStage);
			addEventListener(Event.REMOVED_FROM_STAGE, onRemoveFromStage);
		}
		
		private function onAddedToStage(e:Event):void 
		{
			removeEventListener(Event.ADDED_TO_STAGE, onAddedToStage);
			name = Constants.MAP_DROID;
			
			var textFormat:TextFormat;
			if (Data.userSide == Constants.SIDE_JEDI) {
				image = new Image(Assets.textureAtlas.getTexture('r2d2_droid_blue_right.png'));
				image.name = 'droid';
				image.x = 65; 
				image.y = 370;
				image.scale = 0.75;
				addChild(image);
				
				image = new Image(Assets.textureAtlas.getTexture('map_blue_hologram.png'));
				image.name = 'hologram';
				image.x = 0; 
				image.y = 0;
				addChild(image);
				
				textFormat = new TextFormat("Arial", 12, colorBack, "left", "top");
				textFormat.bold = true;
				textField1 = new TextField(145, 500, text, textFormat);
				textField1.x = 2;
				textField1.y = 0;
				addChild(textField1);
				
				textFormat = new TextFormat("Arial", 12, colorFront, "left", "top");
				textFormat.bold = true;
				textField2 = new TextField(145, 500, text, textFormat);
				textField2.x = 2 - 1.5;
				textField2.y = 0 - 1;
				addChild(textField2);
				
				image = new Image(Assets.textureAtlas.getTexture('map_blue_hologram_line.png'));
				image.name = 'hologram_line';
				image.x = 2; 
				image.y = 0;
				addChild(image);
			}
			if (Data.userSide == Constants.SIDE_SITH) {
				image = new Image(Assets.textureAtlas.getTexture('r2d2_droid_red_right.png'));
				image.name = 'droid';
				image.x = 65; 
				image.y = 370;
				image.scale = 0.75;
				addChild(image);
				
				image = new Image(Assets.textureAtlas.getTexture('map_red_hologram.png'));
				image.name = 'hologram';
				image.x = 0; 
				image.y = 0;
				addChild(image);
				
				textFormat = new TextFormat("Arial", 12, colorBack, "left", "top");
				textFormat.bold = true;
				textField1 = new TextField(145, 500, text, textFormat);
				textField1.x = 2;
				textField1.y = 0;
				addChild(textField1);
				
				textFormat = new TextFormat("Arial", 12, colorFront, "left", "top");
				textFormat.bold = true;
				textField2 = new TextField(145, 500, text, textFormat);
				textField2.x = 2 - 1.5;
				textField2.y = 0 - 1;
				addChild(textField2);
				
				image = new Image(Assets.textureAtlas.getTexture('map_red_hologram_line.png'));
				image.name = 'hologram_line';
				image.x = 2; 
				image.y = 0;
				addChild(image);
			}
			
			onTweenLine();
		}
		
		private function onRemoveFromStage(e:Event):void 
		{
			removeEventListener(Event.REMOVED_FROM_STAGE, onRemoveFromStage);
			Starling.juggler.remove(tweenLine);
			tweenLine = null;
			
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
			trace('[MAP]: removed from stage');
		}
		
		private function onTweenLine():void
		{
			Starling.juggler.remove(tweenLine);
			image = (getChildByName('hologram_line') as Image);
			image.y = 0;
			tweenLine = new Tween(image, 2.0, "easeInOut");
			tweenLine.animate("y", image.y + 208);
			tweenLine.onComplete = onTweenLine;
			Starling.juggler.add(tweenLine);
		}
		
		public function setText(_text:String):void
		{
			text = _text;
			
			var textFormat:TextFormat = new TextFormat("Arial", 12, colorBack, "left", "top");
			textFormat.bold = true;
			textField1 = new TextField(145, 500, text, textFormat);
			textField1.x = 2;
			textField1.y = 0;
			
			textField2 = new TextField(145, 500, text, textFormat);
			textField2.x = 2 - 1.5;
			textField2.y = 0 - 1;
		}
		
		public function getText():String
		{
			return text;
		}
	}

}
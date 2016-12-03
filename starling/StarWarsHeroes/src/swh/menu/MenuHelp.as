package swh.menu 
{
	import flash.system.*;
	import starling.display.Sprite;
	import starling.events.Event;
	import starling.display.Image;
	import starling.text.TextField;
	import starling.text.TextFormat;
	import starling.core.Starling;
	import starling.animation.Tween;
	
	import swh.data.Constants;
	import swh.data.Assets;
	/**
	 * ...
	 * @author ...
	 */
	public class MenuHelp extends Sprite 
	{
		private var image:Image;
		private var textField1:TextField;
		private var textField2:TextField;
		private var tweenLine:Tween;
		
		private var text:String;
		private var colorBack:uint;
		private var colorFront:uint;
		
		public function MenuHelp(_text:String, _colorFront:uint, _colorBack:uint) 
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
			name = Constants.MENU_HELP;
			
			create();
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
		}
		
		private function create():void
		{
			image = new Image(Assets.textureAtlas.getTexture('r2d2_droid_blue_right.png'));
			image.name = 'r2d2_droid_blue_right';
			image.x = 135; image.y = 265;
			addChild(image);
			
			image = new Image(Assets.textureAtlas.getTexture('hologram_menu.png'));
			image.name = 'hologram_menu';
			image.x = 0; image.y = 0;
			addChild(image);
			
			var textFormat:TextFormat = new TextFormat("Arial", 14, colorBack, "left", "center");
			textFormat.bold = true;
			textField1 = new TextField(200, 235, text, textFormat);
			textField1.x = 5;
			textField1.y = 5;
			addChild(textField1);
			
			textFormat = new TextFormat("Arial", 14, colorFront, "left", "center");
			textFormat.bold = true;
			textField2 = new TextField(200, 235, text, textFormat);
			textField2.x = 5 - 1.5;
			textField2.y = 5 - 1;
			addChild(textField2);
			
			image = new Image(Assets.textureAtlas.getTexture('hologram__line_menu.png'));
			image.name = 'hologram__line_menu';
			image.x = 2; image.y = 0;
			addChild(image);
		}
		
		private function onTweenLine():void
		{
			Starling.juggler.remove(tweenLine);
			image = (getChildByName('hologram__line_menu') as Image);
			image.x = 2; 
			image.y = 0;
			tweenLine = new Tween(image, 2.0, "easeInOut");
			tweenLine.animate("x", 2);
			tweenLine.animate("y", 225);
			tweenLine.onComplete = onTweenLine;
			Starling.juggler.add(tweenLine);
		}
		
	}

}
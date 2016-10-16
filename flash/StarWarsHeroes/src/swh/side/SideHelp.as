package swh.side 
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
	 * @author Catfish Studio
	 */
	public class SideHelp extends Sprite 
	{
		private var image:Image;
		private var textField1:TextField;
		private var textField2:TextField;
		private var tweenLine:Tween;
		
		private var text:String;
		private var colorBack:uint;
		private var colorFront:uint;
		private var side:String;
		
		public function SideHelp(_text:String, _colorFront:uint, _colorBack:uint, _side:String) 
		{
			super();
			text = _text;
			colorFront = _colorFront;
			colorBack = _colorBack;
			side = _side;
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
			var textFormat:TextFormat;
			if(side == Constants.SIDE_JEDI){
				image = new Image(Assets.textureAtlas.getTexture('r2d2_droid_blue_right.png'));
				image.name = 'r2d2_droid_blue_right';
				image.x = 190; image.y = 125;
				addChild(image);
				
				image = new Image(Assets.textureAtlas.getTexture('hologram_side_blue.png'));
				image.name = 'hologram_side_blue';
				image.x = 0; image.y = 0;
				addChild(image);
				
				textFormat = new TextFormat("Arial", 14, colorBack, "left", "center");
				textFormat.bold = true;
				textField1 = new TextField(280, 100, text, textFormat);
				textField1.x = 5;
				textField1.y = -10;
				addChild(textField1);
				
				textFormat = new TextFormat("Arial", 14, colorFront, "left", "center");
				textFormat.bold = true;
				textField2 = new TextField(280, 100, text, textFormat);
				textField2.x = 5 - 1.5;
				textField2.y = -11;
				addChild(textField2);
				
				image = new Image(Assets.textureAtlas.getTexture('hologram_side_line_blue.png'));
				image.name = 'hologram_side_line_blue';
				image.x = 0; image.y = 0;
				addChild(image);
			}
			
			if (side == Constants.SIDE_SITH){
				image = new Image(Assets.textureAtlas.getTexture('r2d2_droid_red_left.png'));
				image.name = 'r2d2_droid_red_left';
				image.x = -20; image.y = 125;
				addChild(image);
				
				image = new Image(Assets.textureAtlas.getTexture('hologram_side_red.png'));
				image.name = 'hologram_side_red';
				image.x = 0; image.y = 0;
				addChild(image);
				
				textFormat = new TextFormat("Arial", 14, colorBack, "left", "center");
				textFormat.bold = true;
				textField1 = new TextField(280, 100, text, textFormat);
				textField1.x = 5;
				textField1.y = -10;
				addChild(textField1);
				
				textFormat = new TextFormat("Arial", 14, colorFront, "left", "center");
				textFormat.bold = true;
				textField2 = new TextField(280, 100, text, textFormat);
				textField2.x = 5 - 1.5;
				textField2.y = -11;
				addChild(textField2);
				
				image = new Image(Assets.textureAtlas.getTexture('hologram_side_line_red.png'));
				image.name = 'hologram_side_line_red';
				image.x = 0; image.y = 0;
				addChild(image);
			}
		}
		
		private function onTweenLine():void
		{
			Starling.juggler.remove(tweenLine);
			if(side == Constants.SIDE_JEDI) image = (getChildByName('hologram_side_line_blue') as Image);
			if (side == Constants.SIDE_SITH) image = (getChildByName('hologram_side_line_red') as Image);
			image.x = 0; 
			image.y = 0;
			tweenLine = new Tween(image, 2.0, "easeInOut");
			tweenLine.animate("x", 0);
			tweenLine.animate("y", 85);
			tweenLine.onComplete = onTweenLine;
			Starling.juggler.add(tweenLine);
		}
		
	}

}
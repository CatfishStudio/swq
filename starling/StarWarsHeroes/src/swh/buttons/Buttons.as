package swh.buttons 
{
	import flash.system.*;
	import starling.display.Image;
	import starling.display.Sprite;
	import starling.display.MovieClip;
	import starling.textures.Texture;
	import starling.text.TextField;
	import starling.text.TextFormat;
	import starling.events.Event;
	import starling.events.Touch;
	import starling.events.TouchEvent;
	import starling.events.TouchPhase;
	import starling.core.Starling;
	import starling.display.DisplayObject;
	
	import swh.events.Navigation;
	/**
	 * ...
	 * @author Catfish Studio
	 */
	public class Buttons extends Sprite 
	{
		private var image:Image;
		private var button:MovieClip;
		private var textField1:TextField;
		private var textField2:TextField;
		private var text:String;
		private var textSize:int;
		private var textures:Vector.<Texture>;
		private var texture:Texture;
		private var fps:Number = 12;
		private var colorBack:uint;
		private var colorFront:uint;
		
		public function Buttons(_text:String, _textures:Vector.<Texture>, _fps:Number, _textSize:int, _colorFront:uint, _colorBack:uint) 
		{
			super();
			text = _text;
			textures = _textures;
			texture = _textures[0];
			fps = _fps;
			textSize = _textSize;
			colorFront = _colorFront;
			colorBack = _colorBack;
			
			addEventListener(Event.ADDED_TO_STAGE, onAddedToStage);
			addEventListener(Event.REMOVED_FROM_STAGE, onRemoveFromStage);
		}
		
		private function onAddedToStage(e:Event):void 
		{
			removeEventListener(Event.ADDED_TO_STAGE, onAddedToStage);
			
			image = new Image(texture);
			addChild(image);
			
			button = new MovieClip(textures, fps);
			button.removeFrameAt(0);
			button.stop(); 
			button.visible = false;
			addChild(button);
			Starling.juggler.add(button);
			
			this.width = button.width;
			this.height = button.height;
			
			var textFormat:TextFormat = new TextFormat("Arial", textSize, colorBack, "center", "center");
			textFormat.bold = true;
			textField1 = new TextField(200, 30, text, textFormat);
			textField1.x = (this.width / 2) - (textField1.width / 2);
			textField1.y = (this.height / 2) - (textField1.height / 2);
			addChild(textField1);
			
			textFormat = new TextFormat("Arial", textSize, colorFront, "center", "center");
			textFormat.bold = true;
			textField2 = new TextField(200, 30, text, textFormat);
			textField2.x = (this.width / 2) - (textField2.width / 2) - 1.5;
			textField2.y = (this.height / 2) - (textField2.height / 2) - 1;
			textField2.addEventListener(TouchEvent.TOUCH, onTouch);
			addChild(textField2);
		}
		
		private function onRemoveFromStage(e:Event):void 
		{
			removeEventListener(Event.REMOVED_FROM_STAGE, onRemoveFromStage);
			Starling.juggler.remove(button);
			if (button != null){
				removeChild(button);
				button.dispose();
				button = null;
			}
			if (textField1 != null){
				removeChild(textField1);
				textField1.dispose();
				textField1 = null;
			}
			if (textField2 != null){
				textField2.removeEventListener(TouchEvent.TOUCH, onTouch);
				removeChild(textField2);
				textField2.dispose();
				textField2 = null;
			}
			if (textures != null){
				for (var i:int = 0; i < textures.length; i++){
					textures[i].dispose();
				}
				textures = null;
			}
			while (this.numChildren) {
				this.removeChildren(0, -1, true);
			}
			this.removeFromParent(true);
			super.dispose();
			System.gc();
		}
		
		private var buttonPlay:Boolean = false;
		private function onTouch(e:TouchEvent):void 
		{
			if (e.getTouch(e.target as DisplayObject, TouchPhase.HOVER)){
				if (buttonPlay == false){
					buttonPlay = true;
					button.visible = true;
					button.play();
				}
			}else{
				button.stop();
				buttonPlay = false;
				button.visible = false;
			}
			if (e.getTouch(e.target as DisplayObject, TouchPhase.BEGAN)){
				// click 
				dispatchEvent(new Navigation(Navigation.CHANGE_SCREEN, true, { id: this.name }));
			}
		}
	}

}
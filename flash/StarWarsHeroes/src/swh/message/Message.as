package swh.message 
{
	import flash.system.*;
	
	import starling.display.Sprite;
	import starling.display.Quad;
	import starling.events.Event;
	import starling.text.TextField;
	import starling.text.TextFormat;
	
	import swh.data.Data;
	import swh.data.Constants;
	/**
	 * ...
	 * @author Catfish Studio
	 */
	public class Message extends Sprite 
	{
		private var quad:Quad;
		private var textField:TextField;
		private var text:String;
		
		public function Message(_text:String) 
		{
			super();
			text = _text;
			addEventListener(Event.ADDED_TO_STAGE, onAddedToStage);
			addEventListener(Event.REMOVED_FROM_STAGE, onRemoveFromStage);
		}
		
		private function onAddedToStage(e:Event):void 
		{
			removeEventListener(Event.ADDED_TO_STAGE, onAddedToStage);
			
			create();
		}
		
		private function onRemoveFromStage(e:Event):void 
		{
			removeEventListener(Event.REMOVED_FROM_STAGE, onRemoveFromStage);
			if(quad != null){
				removeChild(quad);
				quad.dispose();
				quad = null;
			}
			if(textField != null){
				removeChild(textField);
				textField.dispose();
				textField = null;
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
			if (Data.userSide == Constants.SIDE_JEDI) quad = new Quad(400, 50,  0x0080C0);
			else quad = new Quad(400, 50,  0xA63A24);
			quad.alpha = 0.4;
			quad.x = 0;
			quad.y = 0;
			addChild(quad);
			
			var textFormat:TextFormat;
			textFormat = new TextFormat("Arial", 14, 0xFFFFFF, "center", "center");
			textFormat.bold = true;
			textField = new TextField(400, 50, text, textFormat);
			textField.x = 0;
			textField.y = 0;
			addChild(textField);
		}
		
		public function setText(_text:String):void
		{
			text = _text;
			textField.text = text;
		}
		
	}

}
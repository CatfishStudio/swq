package swh.command 
{
	import flash.display.Sprite;
	import flash.events.Event;
	import flash.text.TextField;
	import flash.text.TextFieldType;
	import flash.text.TextFormat;
	import flash.text.TextFormatAlign;
	import flash.text.TextFieldAutoSize;
	import flash.text.AntiAliasType;
	import swh.data.Data;
	import swh.data.Constants;
	/**
	 * ...
	 * @author Catfish Studio
	 */
	public class CommandText extends Sprite
	{
		private var font:String;
		private var size:int;
		private var text:String;
		private var textWidth:int;
		private var textHeight:int;
		private var colorBack:int;
		private var colorFront:int;
		private var labelBack:TextField;
		private var labelFront:TextField;
		
		public function CommandText(_x:int, _y:int, _w:int, _h:int, _font:String, _size:int, _text:String) 
		{
			x = _x;
			y = _y;
			textWidth = _w;
			textHeight = _h;
			font = _font;
			size = _size;
			text = _text;
			addEventListener(Event.ADDED_TO_STAGE, onAddedToStage);
			addEventListener(Event.REMOVED_FROM_STAGE, onRemoveFromStage);
		}
		
		private function onAddedToStage(e:Event):void 
		{
			removeEventListener(Event.ADDED_TO_STAGE, onAddedToStage);
			if (Data.userSide == Constants.SIDE_JEDI) {
				colorFront = 0xFFFFFF;
				colorBack = 0x0090F0;	
			}else if (Data.userSide == Constants.SIDE_SITH) {
				colorFront = 0xFFFFFF;
				colorBack = 0x880000;
			}
			
			labelBack = new TextField();
			labelBack.text = text;
			labelBack.x = 1; 
			labelBack.y = 1;
			labelBack.width = textWidth; 
			labelBack.height = textHeight;
			labelBack.defaultTextFormat = new TextFormat(font, size, colorBack, true);
			labelBack.htmlText = text;
			labelBack.selectable = false;
			labelBack.multiline = true;
			labelBack.wordWrap = true;
			//labelBack.autoSize = TextFieldAutoSize.LEFT;
			addChild(labelBack);
			
			labelFront = new TextField();
			labelFront.text = text;
			labelFront.x = 0; 
			labelFront.y = 0;
			labelFront.width = textWidth; 
			labelFront.height = textHeight;
			labelFront.defaultTextFormat = new TextFormat(font, size, colorFront, true);
			labelFront.htmlText = text;
			labelFront.selectable = false;
			labelFront.multiline = true;
			labelFront.wordWrap = true;
			//labelFront.autoSize = TextFieldAutoSize.LEFT;
			addChild(labelFront);
		}
		
		private function onRemoveFromStage(e:Event):void 
		{
			removeEventListener(Event.REMOVED_FROM_STAGE, onRemoveFromStage);
			if (labelBack != null){
				removeChild(labelBack);
				labelBack = null;
			}
			if (labelFront != null){
				removeChild(labelFront);
				labelFront = null;
			}
			while (this.numChildren > 0)
			{
				this.removeChildren(0);
			}
		}
		
		public function getText():String
		{
			return text;
		}
		
		public function setText(value:String):void 
		{
			if (labelBack != null && labelFront != null){
				text = value;
				labelBack.text = text;
				labelBack.htmlText = text;
				labelFront.text = text;
				labelFront.htmlText = text;
			}
		}
		
	}

}
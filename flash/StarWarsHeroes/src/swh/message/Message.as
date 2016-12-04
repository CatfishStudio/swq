package swh.message 
{
	import flash.display.Sprite;
	import flash.events.Event;
	
	import swh.data.Data;
	import swh.data.Constants;
	import swh.text.Label;
	/**
	 * ...
	 * @author Catfish Studio
	 */
	public class Message extends Sprite 
	{
		private var text:String;
		private var labelBack:Label;
		private var labelFront:Label;
		
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
			
			removeChild(labelBack);
			labelBack = null;
			removeChild(labelFront);
			labelFront = null;
			
			while (this.numChildren)
			{
				this.removeChildren(0);
			}
		}
		
		private function create():void
		{
			var colorFront:int;
			var colorBack:int;
			if (Data.userSide == Constants.SIDE_JEDI){
				graphics.beginFill(0x0080C0, 0.4);
				graphics.drawRect(0, 0, 400, 50);
				graphics.endFill();
				
				colorFront = 0xFFFFFF;
				colorBack = 0x0090F0;
				labelBack = new Label(10, 5, 400, 50, "arial", 14, colorBack, text, false);
				addChild(labelBack);
				labelFront = new Label(9, 4, 400, 50, "arial", 14, colorFront, text, false);
				addChild(labelFront);
				
			}else if (Data.userSide == Constants.SIDE_SITH){
				graphics.beginFill(0xA63A24, 0.4);
				graphics.drawRect(0, 0, 400, 50);
				graphics.endFill();
				
				colorFront = 0xFFFFFF;
				colorBack = 0x880000;
				labelBack = new Label(10, 5, 400, 50, "arial", 14, colorBack, text, false);
				addChild(labelBack);
				labelFront = new Label(9, 4, 400, 50, "arial", 14, colorFront, text, false);
				addChild(labelFront);
			}
		}
		
		public function setText(_text:String):void
		{
			text = _text;
			labelBack.text = text;
			labelBack.htmlText = text;
			labelFront.text = text;
			labelFront.htmlText = text;
		}
	}

}
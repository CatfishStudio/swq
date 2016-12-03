package swh.button 
{
	import flash.display.MovieClip;
	import flash.events.Event;
	import flash.display.Bitmap;
	import flash.events.MouseEvent;
	import flash.ui.Mouse;
	import flash.ui.MouseCursor;
	
	import swh.data.Utilits;
	import swh.data.Atlas;
	import swh.data.Constants;
	import swh.data.Data;
	import swh.text.Label;
	import swh.events.NavigationEvent;
	
	/**
	 * ...
	 * @author Catfish Studio
	 */
	public class Button extends MovieClip 
	{
		private var blueFrames:Vector.<String>;
		private var redFrames:Vector.<String>;
		private var count:int = 0;
		private var text:String;
		private var textX:int = 0;
		private var textY:int = 0;
		private var textSize:int = 0;
		private var colorFront:int;
		private var colorBack:int;
		
		private var label:Label;
		
		public function Button(_x:int, _y:int, _text:String, _textX:int, _textY:int, _textSize:int, _name:String) 
		{
			super();
			x = _x;
			y = _y;
			name = _name;
			text = _text;
			textX = _textX;
			textY = _textY;
			textSize = _textSize;
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
			
			label = new Label(textX, textY, 200, 30, "arial", textSize, colorBack, text, false);
			addChild(label);
			label = new Label(textX+1, textY+1, 200, 30, "arial", textSize, colorFront, text, false);
			addChild(label);
			
			blueFrames = new Vector.<String>();
			blueFrames.push("button_blue_01.png");
			blueFrames.push("button_blue_02.png");
			blueFrames.push("button_blue_03.png");
			blueFrames.push("button_blue_04.png");
			blueFrames.push("button_blue_05.png");
			blueFrames.push("button_blue_06.png");
			blueFrames.push("button_blue_07.png");
			blueFrames.push("button_blue_08.png");
			blueFrames.push("button_blue_09.png");
			blueFrames.push("button_blue_10.png");
			blueFrames.push("button_blue_11.png");
			
			redFrames = new Vector.<String>();
			redFrames.push("button_red_01.png");
			redFrames.push("button_red_02.png");
			redFrames.push("button_red_03.png");
			redFrames.push("button_red_04.png");
			redFrames.push("button_red_05.png");
			redFrames.push("button_red_06.png");
			redFrames.push("button_red_07.png");
			redFrames.push("button_red_08.png");
			redFrames.push("button_red_09.png");
			redFrames.push("button_red_10.png");
			redFrames.push("button_red_11.png");
			
			if (Data.userSide == Constants.SIDE_JEDI) addChild(Atlas.atlasesAnimationBitmap[blueFrames[count]]);
			else if (Data.userSide == Constants.SIDE_SITH) addChild(Atlas.atlasesAnimationBitmap[redFrames[count]]);
			
			addEventListener(MouseEvent.MOUSE_OUT, onMouseOutButton);
			addEventListener(MouseEvent.MOUSE_OVER, onMouseOverButton);
			addEventListener(MouseEvent.MOUSE_DOWN, onMouseDownButton);
			addEventListener(MouseEvent.MOUSE_UP, onMouseUpButton);
			addEventListener(MouseEvent.CLICK, onMouseClickButton);
		}
		
		private function onRemoveFromStage(e:Event):void 
		{
			removeEventListener(Event.REMOVED_FROM_STAGE, onRemoveFromStage);
			removeEventListener(Event.ENTER_FRAME, onEnterFrame);
			stop();
			while (this.numChildren > 0)
			{
				this.removeChildren(0);
			}
		}
		
		private function onMouseUpButton(e:MouseEvent):void 
		{
			
		}
		
		private function onMouseDownButton(e:MouseEvent):void 
		{
			
		}
		
		private function onMouseOutButton(e:MouseEvent):void 
		{
			Mouse.cursor = MouseCursor.AUTO;
			removeEventListener(Event.ENTER_FRAME, onEnterFrame);
			stop();
			if (Data.userSide == Constants.SIDE_JEDI) removeChild(Atlas.atlasesAnimationBitmap[blueFrames[count]]);
			else if (Data.userSide == Constants.SIDE_SITH) removeChild(Atlas.atlasesAnimationBitmap[redFrames[count]]);
			count = 0;
			if (Data.userSide == Constants.SIDE_JEDI) addChild(Atlas.atlasesAnimationBitmap[blueFrames[count]]);
			else if (Data.userSide == Constants.SIDE_SITH) addChild(Atlas.atlasesAnimationBitmap[redFrames[count]]);
		}
		
		private function onMouseOverButton(e:MouseEvent):void 
		{
			Mouse.cursor = MouseCursor.BUTTON;
			addEventListener(Event.ENTER_FRAME, onEnterFrame);
			play();
		}
		
		private function onMouseClickButton(e:MouseEvent):void 
		{
			dispatchEvent(new NavigationEvent(NavigationEvent.CHANGE_SCREEN, { id: name }, true));
		}
		
		private function onEnterFrame(e:Event):void 
		{
			if (Data.userSide == Constants.SIDE_JEDI) removeChild(Atlas.atlasesAnimationBitmap[blueFrames[count]]);
			else if(Data.userSide == Constants.SIDE_SITH) removeChild(Atlas.atlasesAnimationBitmap[redFrames[count]]);
			
			count++;
			if (count == blueFrames.length) count = 1;
			if (Data.userSide == Constants.SIDE_JEDI) addChild(Atlas.atlasesAnimationBitmap[blueFrames[count]]);
			else if(Data.userSide == Constants.SIDE_SITH) addChild(Atlas.atlasesAnimationBitmap[redFrames[count]]);
		}
		
		
		
	}

}
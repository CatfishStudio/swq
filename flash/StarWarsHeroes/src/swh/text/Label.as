package swh.text
{
	import flash.text.TextField;
	import flash.text.TextFieldType;
	import flash.text.TextFormat;
	import flash.text.TextFieldAutoSize;
	
	public class Label extends TextField 
	{
		
		public function Label(_x:int, _y:int, _w:int, _h:int, _font:String, _size:int, _color:int, _text:String, _edit:Boolean) 
		{
			this.text = _text;
			this.x = _x; this.y = _y; // положение
			this.width = _w; this.height = _h; // размер
			this.defaultTextFormat = new TextFormat(_font, _size, _color, true); // формат
			this.htmlText = this.text;	// текст
			this.selectable = _edit; // запрет или разрешение выделения текста
			this.multiline = true;
			this.wordWrap = true;
			this.autoSize = TextFieldAutoSize.LEFT;
		}
		
	}

}
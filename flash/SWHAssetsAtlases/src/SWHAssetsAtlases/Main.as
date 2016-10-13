package SWHAssetsAtlases
{
	import flash.display.Bitmap;
	import flash.display.Sprite;
	import flash.events.Event;
	
	/**
	 * ...
	 * @author Catfish Studio
	 */
	public class Main extends Sprite 
	{
		[Embed(source = '../../assets/menu_atlas.png')]
		public var MenuAtlas:Class;
		[Embed(source = '../../assets/menu_atlas.xml', mimeType='application/octet-stream')]
		public var MenuAtlasXML:Class;
		
		[Embed(source = '../../assets/buttons_atlas.png')]
		public var ButtonsAtlas:Class;
		[Embed(source = '../../assets/buttons_atlas.xml', mimeType='application/octet-stream')]
		public var ButtonsAtlasXML:Class;
		
		[Embed(source = '../../assets/menu_atlas.png')]
		public var MenuAtlas2:Class;
		[Embed(source = '../../assets/menu_atlas.xml', mimeType='application/octet-stream')]
		public var MenuAtlasXML2:Class;
		
		public function Main() 
		{
			if (stage) init();
			else addEventListener(Event.ADDED_TO_STAGE, init);
		}
		
		private function init(e:Event = null):void 
		{
			removeEventListener(Event.ADDED_TO_STAGE, init);
			// entry point
			var bitmap:Bitmap = new ButtonsAtlas();
			addChild(bitmap);
		}
		
	}
	
}
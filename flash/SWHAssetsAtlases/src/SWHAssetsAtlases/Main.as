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
		/* Atlases ====================================================================================================== */
		[Embed(source = '../../assets/atlases/buttons_atlas.png')]
		public var ButtonsAtlas:Class;
		[Embed(source = '../../assets/atlases/buttons_atlas.xml', mimeType='application/octet-stream')]
		public var ButtonsAtlasXML:Class;
		
		[Embed(source = '../../assets/atlases/command_atlas.png')]
		public var CommandAtlas:Class;
		[Embed(source = '../../assets/atlases/command_atlas.xml', mimeType='application/octet-stream')]
		public var CommandAtlasXML:Class;		
		
		[Embed(source = '../../assets/atlases/luck_and_darth_anim_atlas.png')]
		public var SideAnimAtlas:Class;
		[Embed(source = '../../assets/atlases/luck_and_darth_anim_atlas.xml', mimeType='application/octet-stream')]
		public var SideAnimAtlasXML:Class;
		
		[Embed(source = '../../assets/atlases/map_atlas.png')]
		public var MapAtlas:Class;
		[Embed(source = '../../assets/atlases/map_atlas.xml', mimeType='application/octet-stream')]
		public var MapAtlasXML:Class;
		
		[Embed(source = '../../assets/atlases/menu_atlas.png')]
		public var MenuAtlas:Class;
		[Embed(source = '../../assets/atlases/menu_atlas.xml', mimeType='application/octet-stream')]
		public var MenuAtlasXML:Class;
		
		[Embed(source = '../../assets/atlases/side_atlas.png')]
		public var SideAtlas:Class;
		[Embed(source = '../../assets/atlases/side_atlas.xml', mimeType='application/octet-stream')]
		public var SideAtlasXML:Class;
		/* =============================================================================================================== */
		
		public function Main() 
		{
			if (stage) init();
			else addEventListener(Event.ADDED_TO_STAGE, init);
		}
		
		private function init(e:Event = null):void 
		{
			removeEventListener(Event.ADDED_TO_STAGE, init);
			// entry point
			/*
			var bitmap:Bitmap = new InformationImage();
			addChild(bitmap);
			*/
		}
		
	}
	
}
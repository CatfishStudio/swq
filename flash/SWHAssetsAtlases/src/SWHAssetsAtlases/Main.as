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
		
		
		/* Data ========================================================================================================== */
		[Embed(source = '../../assets/data/personages.xml', mimeType='application/octet-stream')]
		public var PersonagesFileXML:Class;
		
		[Embed(source = '../../assets/data/planets.xml', mimeType='application/octet-stream')]
		public var PlanetsFileXML:Class;
		
		[Embed(source = '../../assets/data/level_0_0.xml', mimeType='application/octet-stream')]
		public var Level00FileXML:Class;
		[Embed(source = '../../assets/data/level_0_1.xml', mimeType='application/octet-stream')]
		public var Level01FileXML:Class;
		[Embed(source = '../../assets/data/level_0_10.xml', mimeType='application/octet-stream')]
		public var Level010FileXML:Class;
		[Embed(source = '../../assets/data/level_0_2.xml', mimeType='application/octet-stream')]
		public var Level02FileXML:Class;
		[Embed(source = '../../assets/data/level_0_3.xml', mimeType='application/octet-stream')]
		public var Level03FileXML:Class;
		[Embed(source = '../../assets/data/level_0_4.xml', mimeType='application/octet-stream')]
		public var Level04FileXML:Class;
		[Embed(source = '../../assets/data/level_0_5.xml', mimeType='application/octet-stream')]
		public var Level05FileXML:Class;
		[Embed(source = '../../assets/data/level_0_6.xml', mimeType='application/octet-stream')]
		public var Level06FileXML:Class;
		[Embed(source = '../../assets/data/level_0_7.xml', mimeType='application/octet-stream')]
		public var Level07FileXML:Class;
		[Embed(source = '../../assets/data/level_0_8.xml', mimeType='application/octet-stream')]
		public var Level08FileXML:Class;
		[Embed(source = '../../assets/data/level_0_9.xml', mimeType='application/octet-stream')]
		public var Level09FileXML:Class;
		[Embed(source = '../../assets/data/level_1_0.xml', mimeType='application/octet-stream')]
		public var Level10FileXML:Class;
		[Embed(source = '../../assets/data/level_1_1.xml', mimeType='application/octet-stream')]
		public var Level11FileXML:Class;
		[Embed(source = '../../assets/data/level_1_2.xml', mimeType='application/octet-stream')]
		public var Level12FileXML:Class;
		[Embed(source = '../../assets/data/level_1_3.xml', mimeType='application/octet-stream')]
		public var Level13FileXML:Class;
		[Embed(source = '../../assets/data/level_1_4.xml', mimeType='application/octet-stream')]
		public var Level14FileXML:Class;
		[Embed(source = '../../assets/data/level_1_5.xml', mimeType='application/octet-stream')]
		public var Level15FileXML:Class;
		[Embed(source = '../../assets/data/level_1_6.xml', mimeType='application/octet-stream')]
		public var Level16FileXML:Class;
		[Embed(source = '../../assets/data/level_1_7.xml', mimeType='application/octet-stream')]
		public var Level17FileXML:Class;
		[Embed(source = '../../assets/data/level_1_8.xml', mimeType='application/octet-stream')]
		public var Level18FileXML:Class;
		[Embed(source = '../../assets/data/level_1_9.xml', mimeType='application/octet-stream')]
		public var Level19FileXML:Class;
		[Embed(source = '../../assets/data/level_2_0.xml', mimeType='application/octet-stream')]
		public var Level20FileXML:Class;
		[Embed(source = '../../assets/data/level_2_1.xml', mimeType='application/octet-stream')]
		public var Level21FileXML:Class;
		[Embed(source = '../../assets/data/level_2_2.xml', mimeType='application/octet-stream')]
		public var Level22FileXML:Class;
		[Embed(source = '../../assets/data/level_2_3.xml', mimeType='application/octet-stream')]
		public var Level23FileXML:Class;
		[Embed(source = '../../assets/data/level_2_4.xml', mimeType='application/octet-stream')]
		public var Level24FileXML:Class;
		[Embed(source = '../../assets/data/level_2_5.xml', mimeType='application/octet-stream')]
		public var Level25FileXML:Class;
		[Embed(source = '../../assets/data/level_2_6.xml', mimeType='application/octet-stream')]
		public var Level26FileXML:Class;
		[Embed(source = '../../assets/data/level_2_7.xml', mimeType='application/octet-stream')]
		public var Level27FileXML:Class;
		[Embed(source = '../../assets/data/level_2_8.xml', mimeType='application/octet-stream')]
		public var Level28FileXML:Class;
		[Embed(source = '../../assets/data/level_2_9.xml', mimeType='application/octet-stream')]
		public var Level29FileXML:Class;
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
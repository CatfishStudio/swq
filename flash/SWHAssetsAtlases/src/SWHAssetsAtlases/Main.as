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
		/* Atlases */
		[Embed(source = '../../assets/menu_atlas.png')]
		public var MenuAtlas:Class;
		[Embed(source = '../../assets/menu_atlas.xml', mimeType='application/octet-stream')]
		public var MenuAtlasXML:Class;
		
		[Embed(source = '../../assets/buttons_atlas.png')]
		public var ButtonsAtlas:Class;
		[Embed(source = '../../assets/buttons_atlas.xml', mimeType='application/octet-stream')]
		public var ButtonsAtlasXML:Class;
		
		[Embed(source = '../../assets/side_atlas.png')]
		public var SideAtlas:Class;
		[Embed(source = '../../assets/side_atlas.xml', mimeType='application/octet-stream')]
		public var SideAtlasXML:Class;
		
		[Embed(source = '../../assets/luck_and_darth_anim_atlas.png')]
		public var SideAnimAtlas:Class;
		[Embed(source = '../../assets/luck_and_darth_anim_atlas.xml', mimeType='application/octet-stream')]
		public var SideAnimAtlasXML:Class;
		
		/* Textures */
		[Embed(source = '../../assets/information.png')]
		public var InformationImage:Class;
		
		[Embed(source = '../../assets/music_on.png')]
		public var MusicOnImage:Class;
		
		[Embed(source = '../../assets/music_off.png')]
		public var MusicOffImage:Class;
		
		[Embed(source = '../../assets/sound_on.png')]
		public var SoundOnImage:Class;
		
		[Embed(source = '../../assets/sound_off.png')]
		public var SoundOffImage:Class;
		
		[Embed(source = '../../assets/settings_backroung_blue.png')]
		public var SettingsBlueBgImage:Class;
		
		[Embed(source = '../../assets/settings_backroung_red.png')]
		public var SettingsRedBgImage:Class;
		
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
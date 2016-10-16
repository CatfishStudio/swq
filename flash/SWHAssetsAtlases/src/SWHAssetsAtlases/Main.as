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
		public var informationBitmap:Bitmap = new InformationImage();
		
		[Embed(source = '../../assets/music_on.png')]
		public var MusicOnImage:Class;
		public var musicOnBitmap:Bitmap = new MusicOnImage();
		
		[Embed(source = '../../assets/music_off.png')]
		public var MusicOffImage:Class;
		public var musicOffBitmap:Bitmap = new MusicOffImage();
		
		[Embed(source = '../../assets/sound_on.png')]
		public var SoundOnImage:Class;
		public var soundOnBitmap:Bitmap = new SoundOnImage();
		
		[Embed(source = '../../assets/sound_off.png')]
		public var SoundOffImage:Class;
		public var soundOffBitmap:Bitmap = new SoundOffImage();
		
		[Embed(source = '../../assets/settings_backroung_blue.png')]
		public var SettingsBlueBgImage:Class;
		public var settingsBlueBgBitmap:Bitmap = new SettingsBlueBgImage();
		
		[Embed(source = '../../assets/settings_backroung_red.png')]
		public var SettingsRedBgImage:Class;
		public var settingsRedBgBitmap:Bitmap = new SettingsRedBgImage();
		
		[Embed(source = '../../assets/settings_line_blue.png')]
		public var SettingsBlueLineImage:Class;
		public var settingsBlueLineBitmap:Bitmap = new SettingsBlueLineImage();
		
		[Embed(source = '../../assets/settings_line_red.png')]
		public var SettingsRedLineImage:Class;
		public var settingsRedLineBitmap:Bitmap = new SettingsRedLineImage();
		
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
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
		
		
		/* Textures ====================================================================================================== */
		[Embed(source = '../../assets/textures/information.png')]
		public var InformationImage:Class;
		public var informationBitmap:Bitmap = new InformationImage();
		
		[Embed(source = '../../assets/textures/music_off.png')]
		public var MusicOffImage:Class;
		public var musicOffBitmap:Bitmap = new MusicOffImage();
		
		[Embed(source = '../../assets/textures/music_on.png')]
		public var MusicOnImage:Class;
		public var musicOnBitmap:Bitmap = new MusicOnImage();
		
		[Embed(source = '../../assets/textures/settings_backroung_blue.png')]
		public var SettingsBlueBgImage:Class;
		public var settingsBlueBgBitmap:Bitmap = new SettingsBlueBgImage();
		
		[Embed(source = '../../assets/textures/settings_backroung_red.png')]
		public var SettingsRedBgImage:Class;
		public var settingsRedBgBitmap:Bitmap = new SettingsRedBgImage();
		
		[Embed(source = '../../assets/textures/settings_line_blue.png')]
		public var SettingsBlueLineImage:Class;
		public var settingsBlueLineBitmap:Bitmap = new SettingsBlueLineImage();
		
		[Embed(source = '../../assets/textures/settings_line_red.png')]
		public var SettingsRedLineImage:Class;
		public var settingsRedLineBitmap:Bitmap = new SettingsRedLineImage();
		
		[Embed(source = '../../assets/textures/sound_off.png')]
		public var SoundOffImage:Class;
		public var soundOffBitmap:Bitmap = new SoundOffImage();
		
		[Embed(source = '../../assets/textures/sound_on.png')]
		public var SoundOnImage:Class;
		public var soundOnBitmap:Bitmap = new SoundOnImage();
				
		[Embed(source = '../../assets/textures/space_blue.jpg')]
		public var SpaceBlueImage:Class;
		public var spaceBlueBitmap:Bitmap = new SpaceBlueImage();
		
		[Embed(source = '../../assets/textures/space_red.jpg')]
		public var SpaceRedImage:Class;
		public var spaceRedBitmap:Bitmap = new SpaceRedImage();
		
		
		[Embed(source = '../../assets/textures/planets/alderaan.png')]
		public var AlderaanImage:Class;
		public var alderaanBitmap:Bitmap = new AlderaanImage();
		[Embed(source = '../../assets/textures/planets/alderaan_landscape.jpg')]
		public var AlderaanLandscapeImage:Class;
		public var alderaanLandscapeBitmap:Bitmap = new AlderaanLandscapeImage();
		
		[Embed(source = '../../assets/textures/planets/bespin.png')]
		public var BespinImage:Class;
		public var bespinBitmap:Bitmap = new BespinImage();
		[Embed(source = '../../assets/textures/planets/bespin_landscape.jpg')]
		public var BespinLandscapeImage:Class;
		public var bespinLandscapeBitmap:Bitmap = new BespinLandscapeImage();
		
		[Embed(source = '../../assets/textures/planets/coruscant.png')]
		public var CoruscantImage:Class;
		public var coruscantBitmap:Bitmap = new CoruscantImage();
		[Embed(source = '../../assets/textures/planets/coruscant_landscape.jpg')]
		public var CoruscantLandscapeImage:Class;
		public var coruscantLandscapeBitmap:Bitmap = new CoruscantLandscapeImage();
		
		[Embed(source = '../../assets/textures/planets/dagobah.png')]
		public var DagobahImage:Class;
		public var dagobahBitmap:Bitmap = new DagobahImage();
		[Embed(source = '../../assets/textures/planets/dagobah_landscape.jpg')]
		public var DagobahLandscapeImage:Class;
		public var dagobahLandscapeBitmap:Bitmap = new DagobahLandscapeImage();
		
		[Embed(source = '../../assets/textures/planets/deathstar.png')]
		public var DeathstarImage:Class;
		public var deathstarBitmap:Bitmap = new DeathstarImage();
		[Embed(source = '../../assets/textures/planets/deathstar_destroy.png')]
		public var DeathstarDestroyImage:Class;
		public var deathstarDestroyBitmap:Bitmap = new DeathstarDestroyImage();
		[Embed(source = '../../assets/textures/planets/deathstar_landscape.jpg')]
		public var DeathstarLandscapeImage:Class;
		public var deathstarLandscapeBitmap:Bitmap = new DeathstarLandscapeImage();
		
		[Embed(source = '../../assets/textures/planets/endor.png')]
		public var EndorImage:Class;
		public var endorBitmap:Bitmap = new EndorImage();
		[Embed(source = '../../assets/textures/planets/endor_landscape.jpg')]
		public var EndorLandscapeImage:Class;
		public var endorLandscapeBitmap:Bitmap = new EndorLandscapeImage();
		
		[Embed(source = '../../assets/textures/planets/geonosis.png')]
		public var GeonosisImage:Class;
		public var geonosisBitmap:Bitmap = new GeonosisImage();
		[Embed(source = '../../assets/textures/planets/geonosis_landscape.jpg')]
		public var GeonosisLandscapeImage:Class;
		public var geonosisLandscapeBitmap:Bitmap = new GeonosisLandscapeImage();
		
		[Embed(source = '../../assets/textures/planets/hoth.png')]
		public var HothImage:Class;
		public var hothBitmap:Bitmap = new HothImage();
		[Embed(source = '../../assets/textures/planets/hoth_landscape.jpg')]
		public var HothLandscapeImage:Class;
		public var hothLandscapeBitmap:Bitmap = new HothLandscapeImage();
		
		[Embed(source = '../../assets/textures/planets/jakku.png')]
		public var JakkuImage:Class;
		public var jakkuBitmap:Bitmap = new JakkuImage();
		[Embed(source = '../../assets/textures/planets/jakku_landscape.jpg')]
		public var JakkuLandscapeImage:Class;
		public var jakkuLandscapeBitmap:Bitmap = new JakkuLandscapeImage();
		
		[Embed(source = '../../assets/textures/planets/kamino.png')]
		public var KaminoImage:Class;
		public var kaminoBitmap:Bitmap = new KaminoImage();
		[Embed(source = '../../assets/textures/planets/kamino_landscape.jpg')]
		public var KaminoLandscapeImage:Class;
		public var kaminoLandscapeBitmap:Bitmap = new KaminoLandscapeImage();
		
		[Embed(source = '../../assets/textures/planets/mustafar.png')]
		public var MustafarImage:Class;
		public var mustafarBitmap:Bitmap = new MustafarImage();
		[Embed(source = '../../assets/textures/planets/mustafar_landscape.jpg')]
		public var MustafarLandscapeImage:Class;
		public var mustafarLandscapeBitmap:Bitmap = new MustafarLandscapeImage();
		
		[Embed(source = '../../assets/textures/planets/naboo.png')]
		public var NabooImage:Class;
		public var nabooBitmap:Bitmap = new NabooImage();
		[Embed(source = '../../assets/textures/planets/naboo_landscape.jpg')]
		public var NabooLandscapeImage:Class;
		public var nabooLandscapeBitmap:Bitmap = new NabooLandscapeImage();
		
		[Embed(source = '../../assets/textures/planets/planet_light.png')]
		public var PlanetLightImage:Class;
		public var planetLightBitmap:Bitmap = new PlanetLightImage();
		
		[Embed(source = '../../assets/textures/planets/saleucami.png')]
		public var SaleucamiImage:Class;
		public var saleucamiBitmap:Bitmap = new SaleucamiImage();
		[Embed(source = '../../assets/textures/planets/saleucami_landscape.jpg')]
		public var SaleucamiLandscapeImage:Class;
		public var saleucamiLandscapeBitmap:Bitmap = new SaleucamiLandscapeImage();
		
		[Embed(source = '../../assets/textures/planets/tatooine.png')]
		public var TatooineImage:Class;
		public var tatooineBitmap:Bitmap = new TatooineImage();
		[Embed(source = '../../assets/textures/planets/tatooine_landscape.jpg')]
		public var TatooineLandscapeImage:Class;
		public var tatooineLandscapeBitmap:Bitmap = new TatooineLandscapeImage();
		
		[Embed(source = '../../assets/textures/planets/utapau.png')]
		public var UtapauImage:Class;
		public var utapauBitmap:Bitmap = new UtapauImage();
		[Embed(source = '../../assets/textures/planets/utapau_landscape.jpg')]
		public var UtapauLandscapeImage:Class;
		public var utapauLandscapeBitmap:Bitmap = new UtapauLandscapeImage();
		
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
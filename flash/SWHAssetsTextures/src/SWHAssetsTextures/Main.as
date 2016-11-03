package SWHAssetsTextures
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
		
		
		[Embed(source = '../../assets/textures/personages/aayla_secura_lr.png')]
		public var AaylaSecuraLRImage:Class;
		public var aaylaSecuraLRBitmap:Bitmap = new AaylaSecuraLRImage();
		
		[Embed(source = '../../assets/textures/personages/aayla_secura_rl.png')]
		public var AaylaSecuraRLImage:Class;
		public var aaylaSecuraRLBitmap:Bitmap = new AaylaSecuraRLImage();
		
		[Embed(source = '../../assets/textures/personages/adigallia.png')]
		public var AdigalliaImage:Class;
		public var adigalliaBitmap:Bitmap = new AdigalliaImage();
		
		[Embed(source = '../../assets/textures/personages/admiral_ozzel.png')]
		public var AdmiralOzzelImage:Class;
		public var admiralOzzelBitmap:Bitmap = new AdmiralOzzelImage();
		
		[Embed(source = '../../assets/textures/personages/alliance_to_restore_the_republic.png')]
		public var AllianceToRestoreTheRepublicImage:Class;
		public var allianceToRestoreTheRepublicBitmap:Bitmap = new AllianceToRestoreTheRepublicImage();
		
		[Embed(source = '../../assets/textures/personages/anakin_skywalker.png')]
		public var AnakinSkywalkerImage:Class;
		public var anakinSkywalkerBitmap:Bitmap = new AnakinSkywalkerImage();
		
		[Embed(source = '../../assets/textures/personages/aurra_sing_lr.png')]
		public var AurraSingLRImage:Class;
		public var aurraSingLRBitmap:Bitmap = new AurraSingLRImage();
		
		[Embed(source = '../../assets/textures/personages/aurra_sing_rl.png')]
		public var AurraSingRLImage:Class;
		public var aurraSingRLBitmap:Bitmap = new AurraSingRLImage();
		
		[Embed(source = '../../assets/textures/personages/b1_battle_droid_lr.png')]
		public var B1BattleDroidLRImage:Class;
		public var b1BattleDroidLRBitmap:Bitmap = new B1BattleDroidLRImage();
		
		[Embed(source = '../../assets/textures/personages/b1_battle_droid_rl.png')]
		public var B1BattleDroidRLImage:Class;
		public var b1BattleDroidRLBitmap:Bitmap = new B1BattleDroidRLImage();
		
		[Embed(source = '../../assets/textures/personages/bail_organa.png')]
		public var BailOrganaImage:Class;
		public var bailOrganaBitmap:Bitmap = new BailOrganaImage();
		
		[Embed(source = '../../assets/textures/personages/barriss_offee.png')]
		public var BarrissOffeeImage:Class;
		public var barrissOffeeBitmap:Bitmap = new BarrissOffeeImage();
		
		[Embed(source = '../../assets/textures/personages/beru_lars.png')]
		public var BeruLarsImage:Class;
		public var beruLarsBitmap:Bitmap = new BeruLarsImage();
		
		[Embed(source = '../../assets/textures/personages/bib_fortuna.png')]
		public var BibFortunaImage:Class;
		public var bibFortunaBitmap:Bitmap = new BibFortunaImage();
		
		[Embed(source = '../../assets/textures/personages/boba_fett.png')]
		public var BobaFettImage:Class;
		public var bobaFettBitmap:Bitmap = new BobaFettImage();
		
		[Embed(source = '../../assets/textures/personages/boss_nass_lr.png')]
		public var BossNassLRImage:Class;
		public var bossNassLRBitmap:Bitmap = new BossNassLRImage();
		
		[Embed(source = '../../assets/textures/personages/boss_nass_rl.png')]
		public var BossNassRLImage:Class;
		public var bossNassRLBitmap:Bitmap = new BossNassRLImage();
		
		[Embed(source = '../../assets/textures/personages/c_3po_lr.png')]
		public var C3POLRImage:Class;
		public var c3POLRBitmap:Bitmap = new C3POLRImage();
		
		[Embed(source = '../../assets/textures/personages/c_3po_rl.png')]
		public var C3PORLImage:Class;
		public var c3PORLBitmap:Bitmap = new C3PORLImage();
		
		[Embed(source = '../../assets/textures/personages/capitan_panaka.png')]
		public var CapitanPanakaImage:Class;
		public var capitanPanakaBitmap:Bitmap = new CapitanPanakaImage();
		
		[Embed(source = '../../assets/textures/personages/chewbacca_lr.png')]
		public var ChewbaccaLRImage:Class;
		public var chewbaccaLRBitmap:Bitmap = new ChewbaccaLRImage();
		
		[Embed(source = '../../assets/textures/personages/chewbacca_rl.png')]
		public var ChewbaccaRLImage:Class;
		public var chewbaccaRLBitmap:Bitmap = new ChewbaccaRLImage();
		
		[Embed(source = '../../assets/textures/personages/clone_commander_bakara.png')]
		public var CloneCommanderCakaraImage:Class;
		public var cloneCommanderCakaraBitmap:Bitmap = new CloneCommanderCakaraImage();
		
		[Embed(source = '../../assets/textures/personages/clone_commander_cody_lr.png')]
		public var CloneCommanderCodyLRImage:Class;
		public var cloneCommanderCodyLRBitmap:Bitmap = new CloneCommanderCodyLRImage();
		
		[Embed(source = '../../assets/textures/personages/clone_commander_cody_rl.png')]
		public var CloneCommanderCodyRLImage:Class;
		public var cloneCommanderCodyRLBitmap:Bitmap = new CloneCommanderCodyRLImage();
		
		[Embed(source = '../../assets/textures/personages/clone_commander_neyo.png')]
		public var CloneCommanderNeyoImage:Class;
		public var cloneCommanderNeyoBitmap:Bitmap = new CloneCommanderNeyoImage();
		
		[Embed(source = '../../assets/textures/personages/clone_commander_rex.png')]
		public var CloneCommanderRexImage:Class;
		public var cloneCommanderRexBitmap:Bitmap = new CloneCommanderRexImage();
		
		[Embed(source = '../../assets/textures/personages/commander_jerjerrod_lr.png')]
		public var CommanderJerjerrodLRImage:Class;
		public var commanderJerjerrodLRBitmap:Bitmap = new CommanderJerjerrodLRImage();
		
		[Embed(source = '../../assets/textures/personages/commander_jerjerrod_rl.png')]
		public var CommanderJerjerrodRLImage:Class;
		public var commanderJerjerrodRLBitmap:Bitmap = new CommanderJerjerrodRLImage();
		
		[Embed(source = '../../assets/textures/personages/darth_maul.png')]
		public var DarthMaulImage:Class;
		public var darthMaulBitmap:Bitmap = new DarthMaulImage();
		
		[Embed(source = '../../assets/textures/personages/darth_sidious_lr.png')]
		public var DarthSidiousLRImage:Class;
		public var darthSidiousLRBitmap:Bitmap = new DarthSidiousLRImage();
		
		[Embed(source = '../../assets/textures/personages/darth_sidious_rl.png')]
		public var DarthSidiousRLImage:Class;
		public var darthSidiousRLBitmap:Bitmap = new DarthSidiousRLImage();
		
		[Embed(source = '../../assets/textures/personages/darth_vader.png')]
		public var DarthVaderImage:Class;
		public var darthVaderBitmap:Bitmap = new DarthVaderImage();
		
		[Embed(source = '../../assets/textures/personages/dooku_lr.png')]
		public var DookuLRImage:Class;
		public var dookuLRBitmap:Bitmap = new DookuLRImage();
		
		[Embed(source = '../../assets/textures/personages/dooku_rl.png')]
		public var DookuRLImage:Class;
		public var dookuRLBitmap:Bitmap = new DookuRLImage();
		
		[Embed(source = '../../assets/textures/personages/eeth_koth.png')]
		public var EethKothImage:Class;
		public var eethKothBitmap:Bitmap = new EethKothImage();
		
		[Embed(source = '../../assets/textures/personages/finn_lr.png')]
		public var FinnLRImage:Class;
		public var finnLRBitmap:Bitmap = new FinnLRImage();
		
		[Embed(source = '../../assets/textures/personages/finn_rl.png')]
		public var FinnRLImage:Class;
		public var finnRLBitmap:Bitmap = new FinnRLImage();
		
		[Embed(source = '../../assets/textures/personages/general_grievous.png')]
		public var GeneralGrievousImage:Class;
		public var generalGrievousBitmap:Bitmap = new GeneralGrievousImage();
		
		[Embed(source = '../../assets/textures/personages/general_madine_lr.png')]
		public var GeneralMadineLRImage:Class;
		public var generalMadineLRBitmap:Bitmap = new GeneralMadineLRImage();
		
		[Embed(source = '../../assets/textures/personages/general_madine_rl.png')]
		public var GeneralMadineRLImage:Class;
		public var generalMadineRLBitmap:Bitmap = new GeneralMadineRLImage();
		
		[Embed(source = '../../assets/textures/personages/han_solo_lr.png')]
		public var HanSoloLRImage:Class;
		public var hanSoloLRBitmap:Bitmap = new HanSoloLRImage();
		
		[Embed(source = '../../assets/textures/personages/han_solo_rl.png')]
		public var HanSoloRLImage:Class;
		public var hanSoloRLBitmap:Bitmap = new HanSoloRLImage();
		
		[Embed(source = '../../assets/textures/personages/jango_fett_lr.png')]
		public var JangoFettLRImage:Class;
		public var JangoFettLRBitmap:Bitmap = new JangoFettLRImage();
		
		[Embed(source = '../../assets/textures/personages/jango_fett_rl.png')]
		public var JangoFettRLImage:Class;
		public var JangoFettRLBitmap:Bitmap = new JangoFettRLImage();
		
		[Embed(source = '../../assets/textures/personages/jar_jar_binks.png')]
		public var JarJarBinksImage:Class;
		public var JarJarBinksBitmap:Bitmap = new JarJarBinksImage();
		
		[Embed(source = '../../assets/textures/personages/jawas.png')]
		public var JawasImage:Class;
		public var JawasBitmap:Bitmap = new JawasImage();
		
		[Embed(source = '../../assets/textures/personages/kapitan_antilles.png')]
		public var KapitanAntillesImage:Class;
		public var kapitanAntillesBitmap:Bitmap = new KapitanAntillesImage();
		
		[Embed(source = '../../assets/textures/personages/ki_adi_mundi.png')]
		public var KiAdiMundiImage:Class;
		public var kiAdiMundiBitmap:Bitmap = new KiAdiMundiImage();
		
		[Embed(source = '../../assets/textures/personages/kit_fisto.png')]
		public var KitFistoImage:Class;
		public var kitFistoBitmap:Bitmap = new KitFistoImage();
		
		[Embed(source = '../../assets/textures/personages/kylo_ren.png')]
		public var KyloRenImage:Class;
		public var kyloRenBitmap:Bitmap = new KyloRenImage();
		
		[Embed(source = '../../assets/textures/personages/lando_calrissian_lr.png')]
		public var LandoCalrissianLRImage:Class;
		public var landoCalrissianLRBitmap:Bitmap = new LandoCalrissianLRImage();
		
		[Embed(source = '../../assets/textures/personages/lando_calrissian_rl.png')]
		public var LandoCalrissianRLImage:Class;
		public var landoCalrissianRLBitmap:Bitmap = new LandoCalrissianRLImage();
		
		[Embed(source = '../../assets/textures/personages/leia_organa_lr.png')]
		public var LeiaOrganaLRImage:Class;
		public var LeiaOrganaLRBitmap:Bitmap = new LeiaOrganaLRImage();
		
		[Embed(source = '../../assets/textures/personages/leia_organa_rl.png')]
		public var LeiaOrganaRLImage:Class;
		public var LeiaOrganaRLBitmap:Bitmap = new LeiaOrganaRLImage();
		
		[Embed(source = '../../assets/textures/personages/luke_skywalker.png')]
		public var LukeSkywalkerImage:Class;
		public var lukeSkywalkerBitmap:Bitmap = new LukeSkywalkerImage();
		
		[Embed(source = '../../assets/textures/personages/mace_windu_lr.png')]
		public var MaceWinduLRImage:Class;
		public var maceWinduLRBitmap:Bitmap = new MaceWinduLRImage();
		
		[Embed(source = '../../assets/textures/personages/mace_windu_rl.png')]
		public var MaceWinduRLImage:Class;
		public var maceWinduRLBitmap:Bitmap = new MaceWinduRLImage();
		
		[Embed(source = '../../assets/textures/personages/mas_amedda.png')]
		public var MasAmeddaImage:Class;
		public var MasAmeddaBitmap:Bitmap = new MasAmeddaImage();
		
		[Embed(source = '../../assets/textures/personages/maximilian_veers.png')]
		public var MaximilianVeersImage:Class;
		public var maximilianVeersBitmap:Bitmap = new MaximilianVeersImage();
		
		[Embed(source = '../../assets/textures/personages/mon_motma_lr.png')]
		public var MonMotmaLRImage:Class;
		public var MonMotmaLRBitmap:Bitmap = new MonMotmaLRImage();
		
		[Embed(source = '../../assets/textures/personages/mon_motma_rl.png')]
		public var MonMotmaRLImage:Class;
		public var MonMotmaRLBitmap:Bitmap = new MonMotmaRLImage();
		
		[Embed(source = '../../assets/textures/personages/nute_gunray.png')]
		public var NuteGunrayImage:Class;
		public var NuteGunrayBitmap:Bitmap = new NuteGunrayImage();
		
		[Embed(source = '../../assets/textures/personages/obi_wan_kenobi.png')]
		public var ObiWanKenobiImage:Class;
		public var obiWanKenobiBitmap:Bitmap = new ObiWanKenobiImage();
		
		[Embed(source = '../../assets/textures/personages/owen_lars.png')]
		public var OwenLarsImage:Class;
		public var owenLarsBitmap:Bitmap = new OwenLarsImage();
		
		[Embed(source = '../../assets/textures/personages/padme_amidala.png')]
		public var PadmeAmidalaImage:Class;
		public var padmeAmidalaBitmap:Bitmap = new PadmeAmidalaImage();
		
		[Embed(source = '../../assets/textures/personages/palpatine.png')]
		public var PalpatineImage:Class;
		public var palpatineBitmap:Bitmap = new PalpatineImage();
		
		[Embed(source = '../../assets/textures/personages/phasma.png')]
		public var PhasmaImage:Class;
		public var phasmaBitmap:Bitmap = new PhasmaImage();
		
		[Embed(source = '../../assets/textures/personages/plo_koon.png')]
		public var PloKoonImage:Class;
		public var ploKoonBitmap:Bitmap = new PloKoonImage();
		
		[Embed(source = '../../assets/textures/personages/poe_dameron.png')]
		public var PoeDameronImage:Class;
		public var poeDameronBitmap:Bitmap = new PoeDameronImage();
		
		[Embed(source = '../../assets/textures/personages/poggle_the_lesser.png')]
		public var PoggleTheLesserImage:Class;
		public var poggleTheLesserBitmap:Bitmap = new PoggleTheLesserImage();
		
		[Embed(source = '../../assets/textures/personages/qui_gon_jinn_lr.png')]
		public var QuiGonJinnLRImage:Class;
		public var quiGonJinnLRBitmap:Bitmap = new QuiGonJinnLRImage();
		
		[Embed(source = '../../assets/textures/personages/qui_gon_jinn_rl.png')]
		public var QuiGonJinnRLImage:Class;
		public var quiGonJinnRLBitmap:Bitmap = new QuiGonJinnRLImage();
		
		[Embed(source = '../../assets/textures/personages/red_battle_droid_lr.png')]
		public var RedBattleDroidLRImage:Class;
		public var redBattleDroidLRBitmap:Bitmap = new RedBattleDroidLRImage();
		
		[Embed(source = '../../assets/textures/personages/red_battle_droid_rl.png')]
		public var RedBattleDroidRLImage:Class;
		public var redBattleDroidRLBitmap:Bitmap = new RedBattleDroidRLImage();
		
		[Embed(source = '../../assets/textures/personages/republic_clone_army.png')]
		public var RepublicCloneArmyImage:Class;
		public var republicCloneArmyBitmap:Bitmap = new RepublicCloneArmyImage();
		
		[Embed(source = '../../assets/textures/personages/rey.png')]
		public var ReyImage:Class;
		public var reyBitmap:Bitmap = new ReyImage();
		
		[Embed(source = '../../assets/textures/personages/royal_guards.png')]
		public var RoyalGuardsImage:Class;
		public var royalGuardsBitmap:Bitmap = new RoyalGuardsImage();
		
		[Embed(source = '../../assets/textures/personages/rune_haako_lr.png')]
		public var RuneHaakoLRImage:Class;
		public var runeHaakoLRBitmap:Bitmap = new RuneHaakoLRImage();
		
		[Embed(source = '../../assets/textures/personages/rune_haako_rl.png')]
		public var RuneHaakoRLImage:Class;
		public var runeHaakoRLBitmap:Bitmap = new RuneHaakoRLImage();
		
		[Embed(source = '../../assets/textures/personages/saesee_tiin_lr.png')]
		public var SaeseeTiinLRImage:Class;
		public var saeseeTiinLRBitmap:Bitmap = new SaeseeTiinLRImage();
		
		[Embed(source = '../../assets/textures/personages/saesee_tiin_rl.png')]
		public var SaeseeTiinRLImage:Class;
		public var saeseeTiinRLBitmap:Bitmap = new SaeseeTiinRLImage();
		
		[Embed(source = '../../assets/textures/personages/separatists.png')]
		public var SeparatistsImage:Class;
		public var separatistsBitmap:Bitmap = new SeparatistsImage();
		
		[Embed(source = '../../assets/textures/personages/shaak_ti.png')]
		public var ShaakTiImage:Class;
		public var shaakTiBitmap:Bitmap = new ShaakTiImage();
		
		[Embed(source = '../../assets/textures/personages/shmi_skywalker.png')]
		public var ShmiSkywalkerImage:Class;
		public var shmiSkywalkerBitmap:Bitmap = new ShmiSkywalkerImage();
		
		[Embed(source = '../../assets/textures/personages/sio_bibble.png')]
		public var SioBibbleImage:Class;
		public var sioBibbleBitmap:Bitmap = new SioBibbleImage();
		
		[Embed(source = '../../assets/textures/personages/stormtrooper.png')]
		public var StormtrooperImage:Class;
		public var stormtrooperBitmap:Bitmap = new StormtrooperImage();
		
		[Embed(source = '../../assets/textures/personages/stormtrooper_lr.png')]
		public var StormtrooperLRImage:Class;
		public var stormtrooperLRBitmap:Bitmap = new StormtrooperLRImage();
		
		[Embed(source = '../../assets/textures/personages/stormtrooper_rl.png')]
		public var StormtrooperRLImage:Class;
		public var stormtrooperRLBitmap:Bitmap = new StormtrooperRLImage();
		
		[Embed(source = '../../assets/textures/personages/stormtroopers.png')]
		public var StormtroopersImage:Class;
		public var stormtroopersBitmap:Bitmap = new StormtroopersImage();
		
		[Embed(source = '../../assets/textures/personages/tion_medon.png')]
		public var TionMedonImage:Class;
		public var tionMedonBitmap:Bitmap = new TionMedonImage();
		
		[Embed(source = '../../assets/textures/personages/trade_federation.png')]
		public var TradeFederationImage:Class;
		public var tradeFederationBitmap:Bitmap = new TradeFederationImage();
		
		[Embed(source = '../../assets/textures/personages/tusken.png')]
		public var TuskenImage:Class;
		public var tuskenBitmap:Bitmap = new TuskenImage();
		
		[Embed(source = '../../assets/textures/personages/wat_tambor_lr.png')]
		public var WatTamborLRImage:Class;
		public var watTamborLRBitmap:Bitmap = new WatTamborLRImage();
		
		[Embed(source = '../../assets/textures/personages/wat_tambor_rl.png')]
		public var WatTamborRLImage:Class;
		public var watTamborRLBitmap:Bitmap = new WatTamborRLImage();
		
		[Embed(source = '../../assets/textures/personages/watto.png')]
		public var WattoImage:Class;
		public var wattoBitmap:Bitmap = new WattoImage();
		
		[Embed(source = '../../assets/textures/personages/wicket_wysri_warrick.png')]
		public var WicketWysriWarrickImage:Class;
		public var wicketWysriWarrickBitmap:Bitmap = new WicketWysriWarrickImage();
		
		[Embed(source = '../../assets/textures/personages/yoda.png')]
		public var YodaImage:Class;
		public var yodaBitmap:Bitmap = new YodaImage();		
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
			//addChild(yodaBitmap);
		}
		
	}
	
}
package swh.data 
{
	import flash.display.Bitmap;
	import flash.utils.ByteArray;
	import starling.textures.Texture;
	import starling.textures.TextureAtlas;
	
	/**
	 * ...
	 * @author Catfish Studio
	 */
	public class Assets 
	{
		public static var assetsDataContent:*;
		public static var assetsAtlasesContent:*;
		public static var assetsTexturesContent:*;
		
		/* ATLASES --------------------------------------------------------------------------------------------- */
		
		public static var textureAtlas:TextureAtlas;
		public static var textureAtlasAnimation:TextureAtlas;
		
		/* for atlas textures */
		public static function setTextureAtlasFromBitmap(ClassAtlasSprite:Class, ClassAtlasSpritesXML:Class):void
		{
			var contentfile:ByteArray = new ClassAtlasSpritesXML();
			var contentstr:String = contentfile.readUTFBytes(contentfile.length);
			var xml:XML = new XML(contentstr);
			var bitmap:Bitmap = new ClassAtlasSprite();
			
			if (textureAtlas == null)
			{
				textureAtlas = new TextureAtlas(Texture.fromBitmap(bitmap), xml);
			}
			else
			{
				textureAtlas.dispose();
				textureAtlas = null;
				textureAtlas = new TextureAtlas(Texture.fromBitmap(bitmap), xml);
			}
			
			contentfile = null;
			contentstr = null;
			xml = null;
			bitmap = null;
			
			trace("[ATLASES] Загрузка Атласа: From Bitmap");
		}
		
		/* for atlas animation */
		public static function setTextureAtlasEmbeddedAsset(ClassAtlasSprite:Class, ClassAtlasSpritesXML:Class):void
		{
			var contentfile:ByteArray = new ClassAtlasSpritesXML();
			var contentstr:String = contentfile.readUTFBytes(contentfile.length);
			var xml:XML = new XML(contentstr);
			
			if (textureAtlasAnimation == null)
			{
				textureAtlasAnimation = new TextureAtlas(Texture.fromEmbeddedAsset(ClassAtlasSprite), xml);
			}
			else
			{
				textureAtlasAnimation.dispose();
				textureAtlasAnimation = null;
				textureAtlasAnimation = new TextureAtlas(Texture.fromEmbeddedAsset(ClassAtlasSprite), xml);
			}
			
			contentfile = null;
			contentstr = null;
			xml = null;
			
			trace("[ATLASES] Загрузка Атласа: From Animation");
		}
		
		/* clear atlases */
		public static function disposeTextureAtlas():void
		{
			if (textureAtlas != null)
			{
				textureAtlas.dispose();
				textureAtlas = null;
			}
			if (textureAtlasAnimation != null)
			{
				textureAtlasAnimation.dispose();
				textureAtlasAnimation = null;
			}
			trace("[ATLASES] Очистка: глобальных атласов");
		}
		
		/* ------------------------------------------------------------------------------------------------------ */
		
		/* Получение текстур по их ID */
		public static function getPlanetTexture(textureID:String):Texture
		{
			if (textureID == 'coruscant') return Texture.fromBitmap(Assets.assetsTexturesContent.coruscantBitmap);
			if (textureID == 'coruscant_landscape') return Texture.fromBitmap(Assets.assetsTexturesContent.coruscantLandscapeBitmap);
			if (textureID == 'deathstar') return Texture.fromBitmap(Assets.assetsTexturesContent.deathstarBitmap);
			if (textureID == 'deathstar_destroy') return Texture.fromBitmap(Assets.assetsTexturesContent.deathstarDestroyBitmap);
			if (textureID == 'deathstar_landscape') return Texture.fromBitmap(Assets.assetsTexturesContent.deathstarLandscapeBitmap);
			if (textureID == 'totooine') return Texture.fromBitmap(Assets.assetsTexturesContent.tatooineBitmap);
			if (textureID == 'totooine_landscape') return Texture.fromBitmap(Assets.assetsTexturesContent.tatooineLandscapeBitmap);
			if (textureID == 'naboo') return Texture.fromBitmap(Assets.assetsTexturesContent.nabooBitmap);
			if (textureID == 'naboo_landscape') return Texture.fromBitmap(Assets.assetsTexturesContent.nabooLandscapeBitmap);
			if (textureID == 'endor') return Texture.fromBitmap(Assets.assetsTexturesContent.endorBitmap);
			if (textureID == 'endor_landscape') return Texture.fromBitmap(Assets.assetsTexturesContent.endorLandscapeBitmap);
			if (textureID == 'hoth') return Texture.fromBitmap(Assets.assetsTexturesContent.hothBitmap);
			if (textureID == 'hoth_landscape') return Texture.fromBitmap(Assets.assetsTexturesContent.hothLandscapeBitmap);
			if (textureID == 'mustafar') return Texture.fromBitmap(Assets.assetsTexturesContent.mustafarBitmap);
			if (textureID == 'mustafar_landscape') return Texture.fromBitmap(Assets.assetsTexturesContent.mustafarLandscapeBitmap);
			if (textureID == 'dagobah') return Texture.fromBitmap(Assets.assetsTexturesContent.dagobahBitmap);
			if (textureID == 'dagobah_landscape') return Texture.fromBitmap(Assets.assetsTexturesContent.dagobahLandscapeBitmap);
			if (textureID == 'bespin') return Texture.fromBitmap(Assets.assetsTexturesContent.bespinBitmap);
			if (textureID == 'bespin_landscape') return Texture.fromBitmap(Assets.assetsTexturesContent.bespinLandscapeBitmap);
			if (textureID == 'geonosis') return Texture.fromBitmap(Assets.assetsTexturesContent.geonosisBitmap);
			if (textureID == 'geonosis_landscape') return Texture.fromBitmap(Assets.assetsTexturesContent.geonosisLandscapeBitmap);
			if (textureID == 'alderaan') return Texture.fromBitmap(Assets.assetsTexturesContent.alderaanBitmap);
			if (textureID == 'alderaan_landscape') return Texture.fromBitmap(Assets.assetsTexturesContent.alderaanLandscapeBitmap);
			if (textureID == 'kamino') return Texture.fromBitmap(Assets.assetsTexturesContent.kaminoBitmap);
			if (textureID == 'kamino_landscape') return Texture.fromBitmap(Assets.assetsTexturesContent.kaminoLandscapeBitmap);
			if (textureID == 'utapau') return Texture.fromBitmap(Assets.assetsTexturesContent.utapauBitmap);
			if (textureID == 'utapau_landscape') return Texture.fromBitmap(Assets.assetsTexturesContent.utapauLandscapeBitmap);
			if (textureID == 'saleucami') return Texture.fromBitmap(Assets.assetsTexturesContent.saleucamiBitmap);
			if (textureID == 'saleucami_landscape') return Texture.fromBitmap(Assets.assetsTexturesContent.saleucamiLandscapeBitmap);
			if (textureID == 'jakku') return Texture.fromBitmap(Assets.assetsTexturesContent.jakkuBitmap);
			if (textureID == 'jakku_landscape') return Texture.fromBitmap(Assets.assetsTexturesContent.jakkuLandscapeBitmap);
			
			if (textureID == 'planet_light') return Texture.fromBitmap(Assets.assetsTexturesContent.planetLightBitmap);
			return null;
		}
		
		public static function getPersonageTexture(textureID:String, side:String = 'lr'):Texture
		{
			if (textureID == 'aayla_secura' && side == 'lr') return Texture.fromBitmap(Assets.assetsTexturesContent.aaylaSecuraLRBitmap);
			if (textureID == 'aayla_secura' && side == 'rl') return Texture.fromBitmap(Assets.assetsTexturesContent.aaylaSecuraRLBitmap);
			if (textureID == 'adigallia') return Texture.fromBitmap(Assets.assetsTexturesContent.adigalliaBitmap);
			if (textureID == 'admiral_ozzel') return Texture.fromBitmap(Assets.assetsTexturesContent.admiralOzzelBitmap);
			if (textureID == 'alliance_to_restore_the_republic') return Texture.fromBitmap(Assets.assetsTexturesContent.allianceToRestoreTheRepublicBitmap);
			if (textureID == 'anakin_skywalker') return Texture.fromBitmap(Assets.assetsTexturesContent.anakinSkywalkerBitmap);
			if (textureID == 'aurra_sing' && side == 'lr') return Texture.fromBitmap(Assets.assetsTexturesContent.aurraSingLRBitmap);
			if (textureID == 'aurra_sing' && side == 'rl') return Texture.fromBitmap(Assets.assetsTexturesContent.aurraSingRLBitmap);
			if (textureID == 'b1_battle_droid' && side == 'lr') return Texture.fromBitmap(Assets.assetsTexturesContent.b1BattleDroidLRBitmap);
			if (textureID == 'b1_battle_droid' && side == 'rl') return Texture.fromBitmap(Assets.assetsTexturesContent.b1BattleDroidRLBitmap);
			if (textureID == 'b1_battle_droid_2' && side == 'lr') return Texture.fromBitmap(Assets.assetsTexturesContent.b1BattleDroidLRBitmap);
			if (textureID == 'b1_battle_droid_2' && side == 'rl') return Texture.fromBitmap(Assets.assetsTexturesContent.b1BattleDroidRLBitmap);
			if (textureID == 'b1_battle_droid_3' && side == 'lr') return Texture.fromBitmap(Assets.assetsTexturesContent.b1BattleDroidLRBitmap);
			if (textureID == 'b1_battle_droid_3' && side == 'rl') return Texture.fromBitmap(Assets.assetsTexturesContent.b1BattleDroidRLBitmap);
			if (textureID == 'bail_organa') return Texture.fromBitmap(Assets.assetsTexturesContent.bailOrganaBitmap);
			if (textureID == 'barriss_offee') return Texture.fromBitmap(Assets.assetsTexturesContent.barrissOffeeBitmap);
			if (textureID == 'beru_lars') return Texture.fromBitmap(Assets.assetsTexturesContent.beruLarsBitmap);
			if (textureID == 'bib_fortuna') return Texture.fromBitmap(Assets.assetsTexturesContent.bibFortunaBitmap);
			if (textureID == 'boba_fett') return Texture.fromBitmap(Assets.assetsTexturesContent.bobaFettBitmap);
			if (textureID == 'boss_nass' && side == 'lr') return Texture.fromBitmap(Assets.assetsTexturesContent.bossNassLRBitmap);
			if (textureID == 'boss_nass' && side == 'rl') return Texture.fromBitmap(Assets.assetsTexturesContent.bossNassRLBitmap);
			if (textureID == 'c_3po' && side == 'lr') return Texture.fromBitmap(Assets.assetsTexturesContent.c3POLRBitmap);
			if (textureID == 'c_3po' && side == 'rl') return Texture.fromBitmap(Assets.assetsTexturesContent.c3PORLBitmap);
			if (textureID == 'capitan_panaka') return Texture.fromBitmap(Assets.assetsTexturesContent.capitanPanakaBitmap);
			if (textureID == 'chewbacca' && side == 'lr') return Texture.fromBitmap(Assets.assetsTexturesContent.chewbaccaLRBitmap);
			if (textureID == 'chewbacca' && side == 'rl') return Texture.fromBitmap(Assets.assetsTexturesContent.chewbaccaRLBitmap);
			if (textureID == 'clone_commander_bakara') return Texture.fromBitmap(Assets.assetsTexturesContent.cloneCommanderCakaraBitmap);
			if (textureID == 'clone_commander_bakara_2') return Texture.fromBitmap(Assets.assetsTexturesContent.cloneCommanderCakaraBitmap);
			if (textureID == 'clone_commander_cody' && side == 'lr') return Texture.fromBitmap(Assets.assetsTexturesContent.cloneCommanderCodyLRBitmap);
			if (textureID == 'clone_commander_cody' && side == 'rl') return Texture.fromBitmap(Assets.assetsTexturesContent.cloneCommanderCodyRLBitmap);
			if (textureID == 'clone_commander_cody_2' && side == 'lr') return Texture.fromBitmap(Assets.assetsTexturesContent.cloneCommanderCodyLRBitmap);
			if (textureID == 'clone_commander_cody_2' && side == 'rl') return Texture.fromBitmap(Assets.assetsTexturesContent.cloneCommanderCodyRLBitmap);
			if (textureID == 'clone_commander_neyo') return Texture.fromBitmap(Assets.assetsTexturesContent.cloneCommanderNeyoBitmap);
			if (textureID == 'clone_commander_neyo_2') return Texture.fromBitmap(Assets.assetsTexturesContent.cloneCommanderNeyoBitmap);
			if (textureID == 'clone_commander_rex') return Texture.fromBitmap(Assets.assetsTexturesContent.cloneCommanderRexBitmap);
			if (textureID == 'clone_commander_rex_2') return Texture.fromBitmap(Assets.assetsTexturesContent.cloneCommanderRexBitmap);
			if (textureID == 'commander_jerjerrod' && side == 'lr') return Texture.fromBitmap(Assets.assetsTexturesContent.commanderJerjerrodLRBitmap);
			if (textureID == 'commander_jerjerrod' && side == 'rl') return Texture.fromBitmap(Assets.assetsTexturesContent.commanderJerjerrodRLBitmap);
			if (textureID == 'darth_maul') return Texture.fromBitmap(Assets.assetsTexturesContent.darthMaulBitmap);
			if (textureID == 'darth_sidious' && side == 'lr') return Texture.fromBitmap(Assets.assetsTexturesContent.darthSidiousLRBitmap);
			if (textureID == 'darth_sidious' && side == 'rl') return Texture.fromBitmap(Assets.assetsTexturesContent.darthSidiousRLBitmap);
			if (textureID == 'darth_vader') return Texture.fromBitmap(Assets.assetsTexturesContent.darthVaderBitmap);
			if (textureID == 'dooku' && side == 'lr') return Texture.fromBitmap(Assets.assetsTexturesContent.dookuLRBitmap);
			if (textureID == 'dooku' && side == 'rl') return Texture.fromBitmap(Assets.assetsTexturesContent.dookuRLBitmap);
			if (textureID == 'eeth_koth') return Texture.fromBitmap(Assets.assetsTexturesContent.eethKothBitmap);
			if (textureID == 'finn' && side == 'lr') return Texture.fromBitmap(Assets.assetsTexturesContent.finnLRBitmap);
			if (textureID == 'finn' && side == 'rl') return Texture.fromBitmap(Assets.assetsTexturesContent.finnRLBitmap);
			if (textureID == 'general_grievous') return Texture.fromBitmap(Assets.assetsTexturesContent.generalGrievousBitmap);
			if (textureID == 'general_grievous_2') return Texture.fromBitmap(Assets.assetsTexturesContent.generalGrievousBitmap);
			if (textureID == 'general_madine' && side == 'lr') return Texture.fromBitmap(Assets.assetsTexturesContent.generalMadineLRBitmap);
			if (textureID == 'general_madine' && side == 'rl') return Texture.fromBitmap(Assets.assetsTexturesContent.generalMadineRLBitmap);
			if (textureID == 'han_solo' && side == 'lr') return Texture.fromBitmap(Assets.assetsTexturesContent.hanSoloLRBitmap);
			if (textureID == 'han_solo' && side == 'rl') return Texture.fromBitmap(Assets.assetsTexturesContent.hanSoloRLBitmap);
			if (textureID == 'jango_fett' && side == 'lr') return Texture.fromBitmap(Assets.assetsTexturesContent.JangoFettLRBitmap);
			if (textureID == 'jango_fett' && side == 'rl') return Texture.fromBitmap(Assets.assetsTexturesContent.JangoFettRLBitmap);
			if (textureID == 'jar_jar_binks' && side == 'lr') return Texture.fromBitmap(Assets.assetsTexturesContent.JarJarBinksBitmap);
			if (textureID == 'jar_jar_binks' && side == 'rl') return Texture.fromBitmap(Assets.assetsTexturesContent.JarJarBinksBitmap);
			if (textureID == 'jawas') return Texture.fromBitmap(Assets.assetsTexturesContent.JawasBitmap);
			if (textureID == 'kapitan_antilles') return Texture.fromBitmap(Assets.assetsTexturesContent.kapitanAntillesBitmap);
			if (textureID == 'ki_adi_mundi') return Texture.fromBitmap(Assets.assetsTexturesContent.kiAdiMundiBitmap);
			if (textureID == 'kit_fisto') return Texture.fromBitmap(Assets.assetsTexturesContent.kitFistoBitmap);
			if (textureID == 'kylo_ren') return Texture.fromBitmap(Assets.assetsTexturesContent.kyloRenBitmap);
			if (textureID == 'lando_calrissian' && side == 'lr') return Texture.fromBitmap(Assets.assetsTexturesContent.landoCalrissianLRBitmap);
			if (textureID == 'lando_calrissian' && side == 'rl') return Texture.fromBitmap(Assets.assetsTexturesContent.landoCalrissianRLBitmap);
			if (textureID == 'leia_organa' && side == 'lr') return Texture.fromBitmap(Assets.assetsTexturesContent.LeiaOrganaLRBitmap);
			if (textureID == 'leia_organa' && side == 'rl') return Texture.fromBitmap(Assets.assetsTexturesContent.LeiaOrganaRLBitmap);
			if (textureID == 'luke_skywalker') return Texture.fromBitmap(Assets.assetsTexturesContent.lukeSkywalkerBitmap);
			if (textureID == 'mace_windu' && side == 'lr') return Texture.fromBitmap(Assets.assetsTexturesContent.maceWinduLRBitmap);
			if (textureID == 'mace_windu' && side == 'rl') return Texture.fromBitmap(Assets.assetsTexturesContent.maceWinduRLBitmap);
			if (textureID == 'mas_amedda') return Texture.fromBitmap(Assets.assetsTexturesContent.MasAmeddaBitmap);
			if (textureID == 'maximilian_veers') return Texture.fromBitmap(Assets.assetsTexturesContent.maximilianVeersBitmap);
			if (textureID == 'mon_motma' && side == 'lr') return Texture.fromBitmap(Assets.assetsTexturesContent.MonMotmaLRBitmap);
			if (textureID == 'mon_motma' && side == 'rl') return Texture.fromBitmap(Assets.assetsTexturesContent.MonMotmaRLBitmap);
			if (textureID == 'nute_gunray') return Texture.fromBitmap(Assets.assetsTexturesContent.NuteGunrayBitmap);
			if (textureID == 'obi_wan_kenobi') return Texture.fromBitmap(Assets.assetsTexturesContent.obiWanKenobiBitmap);
			if (textureID == 'owen_lars') return Texture.fromBitmap(Assets.assetsTexturesContent.owenLarsBitmap);
			if (textureID == 'padme_amidala') return Texture.fromBitmap(Assets.assetsTexturesContent.padmeAmidalaBitmap);
			if (textureID == 'palpatine') return Texture.fromBitmap(Assets.assetsTexturesContent.palpatineBitmap);
			if (textureID == 'phasma') return Texture.fromBitmap(Assets.assetsTexturesContent.phasmaBitmap);
			if (textureID == 'plo_koon') return Texture.fromBitmap(Assets.assetsTexturesContent.ploKoonBitmap);
			if (textureID == 'poe_dameron') return Texture.fromBitmap(Assets.assetsTexturesContent.poeDameronBitmap);
			if (textureID == 'poggle_the_lesser') return Texture.fromBitmap(Assets.assetsTexturesContent.poggleTheLesserBitmap);
			if (textureID == 'qui_gon_jinn' && side == 'lr') return Texture.fromBitmap(Assets.assetsTexturesContent.quiGonJinnLRBitmap);
			if (textureID == 'qui_gon_jinn' && side == 'rl') return Texture.fromBitmap(Assets.assetsTexturesContent.quiGonJinnRLBitmap);
			if (textureID == 'red_battle_droid' && side == 'lr') return Texture.fromBitmap(Assets.assetsTexturesContent.redBattleDroidLRBitmap);
			if (textureID == 'red_battle_droid' && side == 'rl') return Texture.fromBitmap(Assets.assetsTexturesContent.redBattleDroidRLBitmap);
			if (textureID == 'republic_clone_army') return Texture.fromBitmap(Assets.assetsTexturesContent.republicCloneArmyBitmap);
			if (textureID == 'republic_clone_army_2') return Texture.fromBitmap(Assets.assetsTexturesContent.republicCloneArmyBitmap);
			if (textureID == 'rey') return Texture.fromBitmap(Assets.assetsTexturesContent.reyBitmap);
			if (textureID == 'royal_guards') return Texture.fromBitmap(Assets.assetsTexturesContent.royalGuardsBitmap);
			if (textureID == 'rune_haako' && side == 'lr') return Texture.fromBitmap(Assets.assetsTexturesContent.runeHaakoLRBitmap);
			if (textureID == 'rune_haako' && side == 'rl') return Texture.fromBitmap(Assets.assetsTexturesContent.runeHaakoRLBitmap);
			if (textureID == 'saesee_tiin' && side == 'lr') return Texture.fromBitmap(Assets.assetsTexturesContent.saeseeTiinLRBitmap);
			if (textureID == 'saesee_tiin' && side == 'rl') return Texture.fromBitmap(Assets.assetsTexturesContent.saeseeTiinRLBitmap);
			if (textureID == 'separatists') return Texture.fromBitmap(Assets.assetsTexturesContent.separatistsBitmap);
			if (textureID == 'separatists_2') return Texture.fromBitmap(Assets.assetsTexturesContent.separatistsBitmap);
			if (textureID == 'shaak_ti') return Texture.fromBitmap(Assets.assetsTexturesContent.shaakTiBitmap);
			if (textureID == 'shmi_skywalker') return Texture.fromBitmap(Assets.assetsTexturesContent.shmiSkywalkerBitmap);
			if (textureID == 'sio_bibble') return Texture.fromBitmap(Assets.assetsTexturesContent.sioBibbleBitmap);
			if (textureID == 'stormtrooper_1') return Texture.fromBitmap(Assets.assetsTexturesContent.stormtrooperBitmap);
			if (textureID == 'stormtrooper_1_2' && side == 'lr') return Texture.fromBitmap(Assets.assetsTexturesContent.stormtrooperLRBitmap);
			if (textureID == 'stormtrooper_1_2' && side == 'rl') return Texture.fromBitmap(Assets.assetsTexturesContent.stormtrooperRLBitmap);
			if (textureID == 'stormtrooper_1_3' && side == 'lr') return Texture.fromBitmap(Assets.assetsTexturesContent.stormtrooperLRBitmap);
			if (textureID == 'stormtrooper_1_3' && side == 'rl') return Texture.fromBitmap(Assets.assetsTexturesContent.stormtrooperRLBitmap);
			if (textureID == 'stormtrooper_2') return Texture.fromBitmap(Assets.assetsTexturesContent.stormtrooperBitmap);
			if (textureID == 'stormtroopers') return Texture.fromBitmap(Assets.assetsTexturesContent.stormtroopersBitmap);
			if (textureID == 'stormtroopers_2') return Texture.fromBitmap(Assets.assetsTexturesContent.stormtroopersBitmap);
			if (textureID == 'stormtroopers_3') return Texture.fromBitmap(Assets.assetsTexturesContent.stormtroopersBitmap);
			if (textureID == 'tion_medon') return Texture.fromBitmap(Assets.assetsTexturesContent.tionMedonBitmap);
			if (textureID == 'trade_federation') return Texture.fromBitmap(Assets.assetsTexturesContent.tradeFederationBitmap);
			if (textureID == 'tusken') return Texture.fromBitmap(Assets.assetsTexturesContent.tuskenBitmap);
			if (textureID == 'tusken_2') return Texture.fromBitmap(Assets.assetsTexturesContent.tuskenBitmap);
			if (textureID == 'wat_tambor' && side == 'lr') return Texture.fromBitmap(Assets.assetsTexturesContent.watTamborLRBitmap);
			if (textureID == 'wat_tambor' && side == 'rl') return Texture.fromBitmap(Assets.assetsTexturesContent.watTamborRLBitmap);
			if (textureID == 'watto') return Texture.fromBitmap(Assets.assetsTexturesContent.wattoBitmap);
			if (textureID == 'wicket_wysri_warrick') return Texture.fromBitmap(Assets.assetsTexturesContent.wicketWysriWarrickBitmap);
			if (textureID == 'yoda') return Texture.fromBitmap(Assets.assetsTexturesContent.yodaBitmap);
			
			return null;
		}
	}

}
package swh.data 
{
	import flash.display.Bitmap;
	import flash.utils.ByteArray;
	
	/**
	 * ...
	 * @author Catfish Studio
	 * 
	 * КАК ИСПОЛЬЗОВАТЬ
	 * Данные
	 * 		Assets.assetsDataContent.nameVarFileXML
	 * Атласы
	 * 		Assets.assetsAtlasesContent.nameVarAtlas
	 * 		Assets.assetsAtlasesContent.nameVarAtlasXML
	 * Текстуры
	 * 		addChild(Assets.assetsTexturesContent.nameVarBitmap);
	 * 
	 */
	public class Assets 
	{
		public static var assetsDataContent:*;
		public static var assetsAtlasesContent:*;
		public static var assetsTexturesContent:*;
		
		/* Получение текстур по их ID */
		public static function getPlanetTexture(textureID:String):Bitmap
		{
			if (textureID == 'coruscant') return Assets.assetsTexturesContent.coruscantBitmap;
			if (textureID == 'coruscant_landscape') return Assets.assetsTexturesContent.coruscantLandscapeBitmap;
			if (textureID == 'deathstar') return Assets.assetsTexturesContent.deathstarBitmap;
			if (textureID == 'deathstar_destroy') return Assets.assetsTexturesContent.deathstarDestroyBitmap;
			if (textureID == 'deathstar_landscape') return Assets.assetsTexturesContent.deathstarLandscapeBitmap;
			if (textureID == 'totooine') return Assets.assetsTexturesContent.tatooineBitmap;
			if (textureID == 'totooine_landscape') return Assets.assetsTexturesContent.tatooineLandscapeBitmap;
			if (textureID == 'naboo') return Assets.assetsTexturesContent.nabooBitmap;
			if (textureID == 'naboo_landscape') return Assets.assetsTexturesContent.nabooLandscapeBitmap;
			if (textureID == 'endor') return Assets.assetsTexturesContent.endorBitmap;
			if (textureID == 'endor_landscape') return Assets.assetsTexturesContent.endorLandscapeBitmap;
			if (textureID == 'hoth') return Assets.assetsTexturesContent.hothBitmap;
			if (textureID == 'hoth_landscape') return Assets.assetsTexturesContent.hothLandscapeBitmap;
			if (textureID == 'mustafar') return Assets.assetsTexturesContent.mustafarBitmap;
			if (textureID == 'mustafar_landscape') return Assets.assetsTexturesContent.mustafarLandscapeBitmap;
			if (textureID == 'dagobah') return Assets.assetsTexturesContent.dagobahBitmap;
			if (textureID == 'dagobah_landscape') return Assets.assetsTexturesContent.dagobahLandscapeBitmap;
			if (textureID == 'bespin') return Assets.assetsTexturesContent.bespinBitmap;
			if (textureID == 'bespin_landscape') return Assets.assetsTexturesContent.bespinLandscapeBitmap;
			if (textureID == 'geonosis') return Assets.assetsTexturesContent.geonosisBitmap;
			if (textureID == 'geonosis_landscape') return Assets.assetsTexturesContent.geonosisLandscapeBitmap;
			if (textureID == 'alderaan') return Assets.assetsTexturesContent.alderaanBitmap;
			if (textureID == 'alderaan_landscape') return Assets.assetsTexturesContent.alderaanLandscapeBitmap;
			if (textureID == 'kamino') return Assets.assetsTexturesContent.kaminoBitmap;
			if (textureID == 'kamino_landscape') return Assets.assetsTexturesContent.kaminoLandscapeBitmap;
			if (textureID == 'utapau') return Assets.assetsTexturesContent.utapauBitmap;
			if (textureID == 'utapau_landscape') return Assets.assetsTexturesContent.utapauLandscapeBitmap;
			if (textureID == 'saleucami') return Assets.assetsTexturesContent.saleucamiBitmap;
			if (textureID == 'saleucami_landscape') return Assets.assetsTexturesContent.saleucamiLandscapeBitmap;
			if (textureID == 'jakku') return Assets.assetsTexturesContent.jakkuBitmap;
			if (textureID == 'jakku_landscape') return Assets.assetsTexturesContent.jakkuLandscapeBitmap;
			
			if (textureID == 'planet_light') return Assets.assetsTexturesContent.planetLightBitmap;
			return null;
		}
		
		public static function getPersonageTexture(textureID:String, side:String = 'lr'):Bitmap
		{
			if (textureID == 'aayla_secura' && side == 'lr') return Assets.assetsTexturesContent.aaylaSecuraLRBitmap;
			if (textureID == 'aayla_secura' && side == 'rl') return Assets.assetsTexturesContent.aaylaSecuraRLBitmap;
			if (textureID == 'adigallia') return Assets.assetsTexturesContent.adigalliaBitmap;
			if (textureID == 'admiral_ozzel') return Assets.assetsTexturesContent.admiralOzzelBitmap;
			if (textureID == 'alliance_to_restore_the_republic') return Assets.assetsTexturesContent.allianceToRestoreTheRepublicBitmap;
			if (textureID == 'anakin_skywalker') return Assets.assetsTexturesContent.anakinSkywalkerBitmap;
			if (textureID == 'aurra_sing' && side == 'lr') return Assets.assetsTexturesContent.aurraSingLRBitmap;
			if (textureID == 'aurra_sing' && side == 'rl') return Assets.assetsTexturesContent.aurraSingRLBitmap;
			if (textureID == 'b1_battle_droid' && side == 'lr') return Assets.assetsTexturesContent.b1BattleDroidLRBitmap;
			if (textureID == 'b1_battle_droid' && side == 'rl') return Assets.assetsTexturesContent.b1BattleDroidRLBitmap;
			if (textureID == 'b1_battle_droid_2' && side == 'lr') return Assets.assetsTexturesContent.b1BattleDroidLRBitmap;
			if (textureID == 'b1_battle_droid_2' && side == 'rl') return Assets.assetsTexturesContent.b1BattleDroidRLBitmap;
			if (textureID == 'b1_battle_droid_3' && side == 'lr') return Assets.assetsTexturesContent.b1BattleDroidLRBitmap;
			if (textureID == 'b1_battle_droid_3' && side == 'rl') return Assets.assetsTexturesContent.b1BattleDroidRLBitmap;
			if (textureID == 'bail_organa') return Assets.assetsTexturesContent.bailOrganaBitmap;
			if (textureID == 'barriss_offee') return Assets.assetsTexturesContent.barrissOffeeBitmap;
			if (textureID == 'beru_lars') return Assets.assetsTexturesContent.beruLarsBitmap;
			if (textureID == 'bib_fortuna') return Assets.assetsTexturesContent.bibFortunaBitmap;
			if (textureID == 'boba_fett') return Assets.assetsTexturesContent.bobaFettBitmap;
			if (textureID == 'boss_nass' && side == 'lr') return Assets.assetsTexturesContent.bossNassLRBitmap;
			if (textureID == 'boss_nass' && side == 'rl') return Assets.assetsTexturesContent.bossNassRLBitmap;
			if (textureID == 'c_3po' && side == 'lr') return Assets.assetsTexturesContent.c3POLRBitmap;
			if (textureID == 'c_3po' && side == 'rl') return Assets.assetsTexturesContent.c3PORLBitmap;
			if (textureID == 'capitan_panaka') return Assets.assetsTexturesContent.capitanPanakaBitmap;
			if (textureID == 'chewbacca' && side == 'lr') return Assets.assetsTexturesContent.chewbaccaLRBitmap;
			if (textureID == 'chewbacca' && side == 'rl') return Assets.assetsTexturesContent.chewbaccaRLBitmap;
			if (textureID == 'clone_commander_bakara') return Assets.assetsTexturesContent.cloneCommanderCakaraBitmap;
			if (textureID == 'clone_commander_bakara_2') return Assets.assetsTexturesContent.cloneCommanderCakaraBitmap;
			if (textureID == 'clone_commander_cody' && side == 'lr') return Assets.assetsTexturesContent.cloneCommanderCodyLRBitmap;
			if (textureID == 'clone_commander_cody' && side == 'rl') return Assets.assetsTexturesContent.cloneCommanderCodyRLBitmap;
			if (textureID == 'clone_commander_cody_2' && side == 'lr') return Assets.assetsTexturesContent.cloneCommanderCodyLRBitmap;
			if (textureID == 'clone_commander_cody_2' && side == 'rl') return Assets.assetsTexturesContent.cloneCommanderCodyRLBitmap;
			if (textureID == 'clone_commander_neyo') return Assets.assetsTexturesContent.cloneCommanderNeyoBitmap;
			if (textureID == 'clone_commander_neyo_2') return Assets.assetsTexturesContent.cloneCommanderNeyoBitmap;
			if (textureID == 'clone_commander_rex') return Assets.assetsTexturesContent.cloneCommanderRexBitmap;
			if (textureID == 'clone_commander_rex_2') return Assets.assetsTexturesContent.cloneCommanderRexBitmap;
			if (textureID == 'commander_jerjerrod' && side == 'lr') return Assets.assetsTexturesContent.commanderJerjerrodLRBitmap;
			if (textureID == 'commander_jerjerrod' && side == 'rl') return Assets.assetsTexturesContent.commanderJerjerrodRLBitmap;
			if (textureID == 'darth_maul') return Assets.assetsTexturesContent.darthMaulBitmap;
			if (textureID == 'darth_sidious' && side == 'lr') return Assets.assetsTexturesContent.darthSidiousLRBitmap;
			if (textureID == 'darth_sidious' && side == 'rl') return Assets.assetsTexturesContent.darthSidiousRLBitmap;
			if (textureID == 'darth_vader') return Assets.assetsTexturesContent.darthVaderBitmap;
			if (textureID == 'dooku' && side == 'lr') return Assets.assetsTexturesContent.dookuLRBitmap;
			if (textureID == 'dooku' && side == 'rl') return Assets.assetsTexturesContent.dookuRLBitmap;
			if (textureID == 'eeth_koth') return Assets.assetsTexturesContent.eethKothBitmap;
			if (textureID == 'finn' && side == 'lr') return Assets.assetsTexturesContent.finnLRBitmap;
			if (textureID == 'finn' && side == 'rl') return Assets.assetsTexturesContent.finnRLBitmap;
			if (textureID == 'general_grievous') return Assets.assetsTexturesContent.generalGrievousBitmap;
			if (textureID == 'general_grievous_2') return Assets.assetsTexturesContent.generalGrievousBitmap;
			if (textureID == 'general_madine' && side == 'lr') return Assets.assetsTexturesContent.generalMadineLRBitmap;
			if (textureID == 'general_madine' && side == 'rl') return Assets.assetsTexturesContent.generalMadineRLBitmap;
			if (textureID == 'han_solo' && side == 'lr') return Assets.assetsTexturesContent.hanSoloLRBitmap;
			if (textureID == 'han_solo' && side == 'rl') return Assets.assetsTexturesContent.hanSoloRLBitmap;
			if (textureID == 'jango_fett' && side == 'lr') return Assets.assetsTexturesContent.JangoFettLRBitmap;
			if (textureID == 'jango_fett' && side == 'rl') return Assets.assetsTexturesContent.JangoFettRLBitmap;
			if (textureID == 'jar_jar_binks' && side == 'lr') return Assets.assetsTexturesContent.JarJarBinksBitmap;
			if (textureID == 'jar_jar_binks' && side == 'rl') return Assets.assetsTexturesContent.JarJarBinksBitmap;
			if (textureID == 'jawas') return Assets.assetsTexturesContent.JawasBitmap;
			if (textureID == 'kapitan_antilles') return Assets.assetsTexturesContent.kapitanAntillesBitmap;
			if (textureID == 'ki_adi_mundi') return Assets.assetsTexturesContent.kiAdiMundiBitmap;
			if (textureID == 'kit_fisto') return Assets.assetsTexturesContent.kitFistoBitmap;
			if (textureID == 'kylo_ren') return Assets.assetsTexturesContent.kyloRenBitmap;
			if (textureID == 'lando_calrissian' && side == 'lr') return Assets.assetsTexturesContent.landoCalrissianLRBitmap;
			if (textureID == 'lando_calrissian' && side == 'rl') return Assets.assetsTexturesContent.landoCalrissianRLBitmap;
			if (textureID == 'leia_organa' && side == 'lr') return Assets.assetsTexturesContent.LeiaOrganaLRBitmap;
			if (textureID == 'leia_organa' && side == 'rl') return Assets.assetsTexturesContent.LeiaOrganaRLBitmap;
			if (textureID == 'luke_skywalker') return Assets.assetsTexturesContent.lukeSkywalkerBitmap;
			if (textureID == 'mace_windu' && side == 'lr') return Assets.assetsTexturesContent.maceWinduLRBitmap;
			if (textureID == 'mace_windu' && side == 'rl') return Assets.assetsTexturesContent.maceWinduRLBitmap;
			if (textureID == 'mas_amedda') return Assets.assetsTexturesContent.MasAmeddaBitmap;
			if (textureID == 'maximilian_veers') return Assets.assetsTexturesContent.maximilianVeersBitmap;
			if (textureID == 'mon_motma' && side == 'lr') return Assets.assetsTexturesContent.MonMotmaLRBitmap;
			if (textureID == 'mon_motma' && side == 'rl') return Assets.assetsTexturesContent.MonMotmaRLBitmap;
			if (textureID == 'nute_gunray') return Assets.assetsTexturesContent.NuteGunrayBitmap;
			if (textureID == 'obi_wan_kenobi') return Assets.assetsTexturesContent.obiWanKenobiBitmap;
			if (textureID == 'owen_lars') return Assets.assetsTexturesContent.owenLarsBitmap;
			if (textureID == 'padme_amidala') return Assets.assetsTexturesContent.padmeAmidalaBitmap;
			if (textureID == 'palpatine') return Assets.assetsTexturesContent.palpatineBitmap;
			if (textureID == 'phasma') return Assets.assetsTexturesContent.phasmaBitmap;
			if (textureID == 'plo_koon') return Assets.assetsTexturesContent.ploKoonBitmap;
			if (textureID == 'poe_dameron') return Assets.assetsTexturesContent.poeDameronBitmap;
			if (textureID == 'poggle_the_lesser') return Assets.assetsTexturesContent.poggleTheLesserBitmap;
			if (textureID == 'qui_gon_jinn' && side == 'lr') return Assets.assetsTexturesContent.quiGonJinnLRBitmap;
			if (textureID == 'qui_gon_jinn' && side == 'rl') return Assets.assetsTexturesContent.quiGonJinnRLBitmap;
			if (textureID == 'red_battle_droid' && side == 'lr') return Assets.assetsTexturesContent.redBattleDroidLRBitmap;
			if (textureID == 'red_battle_droid' && side == 'rl') return Assets.assetsTexturesContent.redBattleDroidRLBitmap;
			if (textureID == 'republic_clone_army') return Assets.assetsTexturesContent.republicCloneArmyBitmap;
			if (textureID == 'republic_clone_army_2') return Assets.assetsTexturesContent.republicCloneArmyBitmap;
			if (textureID == 'rey') return Assets.assetsTexturesContent.reyBitmap;
			if (textureID == 'royal_guards') return Assets.assetsTexturesContent.royalGuardsBitmap;
			if (textureID == 'rune_haako' && side == 'lr') return Assets.assetsTexturesContent.runeHaakoLRBitmap;
			if (textureID == 'rune_haako' && side == 'rl') return Assets.assetsTexturesContent.runeHaakoRLBitmap;
			if (textureID == 'saesee_tiin' && side == 'lr') return Assets.assetsTexturesContent.saeseeTiinLRBitmap;
			if (textureID == 'saesee_tiin' && side == 'rl') return Assets.assetsTexturesContent.saeseeTiinRLBitmap;
			if (textureID == 'separatists') return Assets.assetsTexturesContent.separatistsBitmap;
			if (textureID == 'separatists_2') return Assets.assetsTexturesContent.separatistsBitmap;
			if (textureID == 'shaak_ti') return Assets.assetsTexturesContent.shaakTiBitmap;
			if (textureID == 'shmi_skywalker') return Assets.assetsTexturesContent.shmiSkywalkerBitmap;
			if (textureID == 'sio_bibble') return Assets.assetsTexturesContent.sioBibbleBitmap;
			if (textureID == 'stormtrooper_1') return Assets.assetsTexturesContent.stormtrooperBitmap;
			if (textureID == 'stormtrooper_1_2' && side == 'lr') return Assets.assetsTexturesContent.stormtrooperLRBitmap;
			if (textureID == 'stormtrooper_1_2' && side == 'rl') return Assets.assetsTexturesContent.stormtrooperRLBitmap;
			if (textureID == 'stormtrooper_1_3' && side == 'lr') return Assets.assetsTexturesContent.stormtrooperLRBitmap;
			if (textureID == 'stormtrooper_1_3' && side == 'rl') return Assets.assetsTexturesContent.stormtrooperRLBitmap;
			if (textureID == 'stormtrooper_2') return Assets.assetsTexturesContent.stormtrooperBitmap;
			if (textureID == 'stormtroopers') return Assets.assetsTexturesContent.stormtroopersBitmap;
			if (textureID == 'stormtroopers_2') return Assets.assetsTexturesContent.stormtroopersBitmap;
			if (textureID == 'stormtroopers_3') return Assets.assetsTexturesContent.stormtroopersBitmap;
			if (textureID == 'tion_medon') return Assets.assetsTexturesContent.tionMedonBitmap;
			if (textureID == 'trade_federation') return Assets.assetsTexturesContent.tradeFederationBitmap;
			if (textureID == 'tusken') return Assets.assetsTexturesContent.tuskenBitmap;
			if (textureID == 'tusken_2') return Assets.assetsTexturesContent.tuskenBitmap;
			if (textureID == 'wat_tambor' && side == 'lr') return Assets.assetsTexturesContent.watTamborLRBitmap;
			if (textureID == 'wat_tambor' && side == 'rl') return Assets.assetsTexturesContent.watTamborRLBitmap;
			if (textureID == 'watto') return Assets.assetsTexturesContent.wattoBitmap;
			if (textureID == 'wicket_wysri_warrick') return Assets.assetsTexturesContent.wicketWysriWarrickBitmap;
			if (textureID == 'yoda') return Assets.assetsTexturesContent.yodaBitmap;
			
			return null;
		}
	}

}
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
	}

}
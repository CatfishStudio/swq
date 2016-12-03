package swh.data 
{
	import flash.display.Bitmap;
	import flash.display.BitmapData;
	import flash.geom.Point;
	import flash.geom.Rectangle; 
	
	import swh.xml.FileXML;
	import swh.data.Utilits;
	/**
	 * ...
	 * @author Catfish Studio
	 */
	public class Atlas 
	{
		public static var atlasesBitmap:Array;
		
		public static function createAtlasBitmap(_bitmap:Bitmap, _fullSizeWidth:int, _fullSizeHeight:int, _backSizeWidth:int,  _backSizeHeight:int,  _transparent:Boolean, _fillColor:uint, _rectX1:int, _rectY1:int, _rectX2:int, _rectY2:int, _ptX:int, _ptY:int):Bitmap
		{
			// полная картинка
			var imageBD:BitmapData = new BitmapData(_fullSizeWidth, _fullSizeHeight, _transparent, _fillColor);
			// размер выбраной картинки
			var canvasBD:BitmapData = new BitmapData(_backSizeWidth, _backSizeHeight, _transparent, _fillColor);
			//исходный размер
			var rect:Rectangle = new Rectangle(_rectX1, _rectY1, _rectX2, _rectY2);
			// начальная точка
			var pt:Point = new Point(_ptX, _ptY);  
			var bitmap:Bitmap;			
			imageBD = _bitmap.bitmapData;
			canvasBD.copyPixels(imageBD, rect, pt);
			bitmap = new Bitmap(canvasBD);			
			return bitmap;
		}

		public static function getBitmapFromAtlas(textureName:String, atlasImage:Class, atlasXML:Class):Bitmap
		{
			/* 
			 * Как использовать эту функцию
			 * var bg:Bitmap = Atlas.getBitmapFromAtlas('menu_background.jpg', Assets.assetsAtlasesContent.MenuAtlas, Assets.assetsAtlasesContent.MenuAtlasXML);
			 * addChild(bg);
			 * */			
			var resultBitmap:Bitmap;
			
			var bitmap:Bitmap = new atlasImage();
			var fullSizeWidth:int = bitmap.width;
			var fullSizeHeight:int = bitmap.height;
			var backSizeWidth:int = 0;				// xml
			var backSizeHeight:int = 0; 			// xml
			var transparent:Boolean = true;
			var fillColor:uint = 0x000000;
			var rectX1:int = 0;						// xml
			var rectY1:int = 0;						// xml
			var rectX2:int = 0;						// xml
			var rectY2:int = 0;						// xml
			var ptX:int = 0;
			var ptY:int = 0;
			
			var persFileXML:XML = FileXML.getFileXML(atlasXML);
			var n:int = persFileXML.SubTexture.length();				
			for (var i:int = 0; i < n; i++)
			{
				if (persFileXML.SubTexture[i].attribute("name") == textureName){
					backSizeWidth = persFileXML.SubTexture[i].attribute("frameWidth");
					backSizeHeight = persFileXML.SubTexture[i].attribute("frameHeight");
					rectX1 = persFileXML.SubTexture[i].attribute("x");
					rectY1 = persFileXML.SubTexture[i].attribute("y");
					rectX2 = persFileXML.SubTexture[i].attribute("x") + backSizeWidth;
					rectY2 = persFileXML.SubTexture[i].attribute("y") + backSizeHeight;
					resultBitmap = Atlas.createAtlasBitmap(bitmap, fullSizeWidth, fullSizeHeight, backSizeWidth, backSizeHeight, transparent, fillColor, rectX1, rectY1, rectX2, rectY2, ptX, ptY);
					break;
				}
			}
				
			return resultBitmap;
		}
		
		public static function loadAtlasBitmap(atlasImage:Class, atlasXML:Class):void
		{
			/*
			 * Как использовать эту функцию
			 * Atlas.loadAtlasBitmap(Assets.assetsAtlasesContent.MenuAtlas, Assets.assetsAtlasesContent.MenuAtlasXML);
			 * addChild(Atlas.atlasesBitmap['menu_background.jpg']);
			 * */
			var bitmap:Bitmap = new atlasImage();
			var fullSizeWidth:int = bitmap.width;
			var fullSizeHeight:int = bitmap.height;
			var backSizeWidth:int = 0;				// xml
			var backSizeHeight:int = 0; 			// xml
			var transparent:Boolean = true;
			var fillColor:uint = 0x000000;
			var rectX1:int = 0;						// xml
			var rectY1:int = 0;						// xml
			var rectX2:int = 0;						// xml
			var rectY2:int = 0;						// xml
			var ptX:int = 0;
			var ptY:int = 0;
			
			Atlas.atlasesBitmap = new Array();
			var persFileXML:XML = FileXML.getFileXML(atlasXML);
			var count:int = persFileXML.SubTexture.length();
			for (var i:int = 0; i < count; i++)
			{
				backSizeWidth = persFileXML.SubTexture[i].attribute("frameWidth");
				backSizeHeight = persFileXML.SubTexture[i].attribute("frameHeight");
				rectX1 = persFileXML.SubTexture[i].attribute("x");
				rectY1 = persFileXML.SubTexture[i].attribute("y");
				rectX2 = persFileXML.SubTexture[i].attribute("x") + backSizeWidth;
				rectY2 = persFileXML.SubTexture[i].attribute("y") + backSizeHeight;
				Atlas.atlasesBitmap[persFileXML.SubTexture[i].attribute("name")] = Atlas.createAtlasBitmap(bitmap, fullSizeWidth, fullSizeHeight, backSizeWidth, backSizeHeight, transparent, fillColor, rectX1, rectY1, rectX2, rectY2, ptX, ptY);
			}			
		}
		
	}

}
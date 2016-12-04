package swh.menu 
{
	import flash.display.Sprite;
	import flash.events.Event;
	import flash.display.Bitmap;
	import flash.display.BitmapData;
	
	import com.gskinner.motion.GTween;
	import com.gskinner.motion.GTweener;
	import com.gskinner.motion.GTweenTimeline;
	import com.gskinner.motion.easing.Sine;
	
	import swh.data.Utilits;
	import swh.data.Assets;
	import swh.data.Atlas;
	import swh.data.Constants;
	import swh.button.Button;
	/**
	 * ...
	 * @author Catfish Studio
	 */
	public class Menu extends Sprite 
	{
		private var starsBitmap:Bitmap;
		private var deathstarBitmap:Bitmap;
		private var ship1Bitmap:Bitmap;
		private var ship2Bitmap:Bitmap;
		private var ship3Bitmap:Bitmap;
		private var borderBitmap:Bitmap;
		private var continueButton:Button;
		private var newGameButton:Button;
		private var settingsButton:Button;
		private var invateButton:Button;
		
		private var starsTween:GTween;
		private var deathstarTween:GTween;
		private var ship1Tween:GTween;
		private var ship2Tween:GTween;
		private var ship3Tween:GTween;
		
		public function Menu() 
		{
			super();
			addEventListener(Event.ADDED_TO_STAGE, onAddedToStage);
			addEventListener(Event.REMOVED_FROM_STAGE, onRemoveFromStage);
		}
		
		private function onAddedToStage(e:Event):void 
		{
			removeEventListener(Event.ADDED_TO_STAGE, onAddedToStage);
			name = Constants.MENU;
			
			Atlas.loadAtlasBitmapData(Assets.assetsAtlasesContent.MenuAtlas, Assets.assetsAtlasesContent.MenuAtlasXML, Atlas.TYPE_TEXTURES);
			Atlas.loadAtlasBitmapData(Assets.assetsAtlasesContent.ButtonsAtlas, Assets.assetsAtlasesContent.ButtonsAtlasXML, Atlas.TYPE_ANIMATION);
			
			createBackground();
			createButtons();
			//createHelp();
			//createMessage();
		}
		
		private function onRemoveFromStage(e:Event):void 
		{
			removeEventListener(Event.REMOVED_FROM_STAGE, onRemoveFromStage);
			
			Atlas.clearAtlases(Atlas.TYPE_TEXTURES);
			Atlas.clearAtlases(Atlas.TYPE_ANIMATION);
			
			starsTween.paused = true;
			starsTween = null;
			deathstarTween.paused = true;
			deathstarTween = null;
			ship1Tween.paused = true;
			ship1Tween = null;
			ship2Tween.paused = true;
			ship2Tween = null;
			ship3Tween.paused = true;
			ship3Tween = null;
			
			removeChild(starsBitmap);
			starsBitmap = null;
			removeChild(deathstarBitmap);
			deathstarBitmap = null;
			removeChild(ship1Bitmap);
			ship1Bitmap = null;
			removeChild(ship2Bitmap);
			ship2Bitmap = null;
			removeChild(ship3Bitmap);
			ship3Bitmap = null;
			removeChild(borderBitmap);
			borderBitmap = null;
			
			removeChild(continueButton);
			continueButton = null;
			removeChild(newGameButton);
			newGameButton = null;
			removeChild(settingsButton);
			settingsButton = null;
			removeChild(invateButton);
			invateButton = null;
			
			while (this.numChildren > 0)
			{
				this.removeChildren(0);
			}
		}
		
		private function createBackground():void
		{
			starsBitmap = new Bitmap((Atlas.atlasTexturesBitmapData['menu_background.jpg'] as BitmapData));
			starsBitmap.x = 0;
			starsBitmap.y = 0;
			addChild(starsBitmap);
			
			deathstarBitmap = new Bitmap((Atlas.atlasTexturesBitmapData['menu_deathstar.png'] as BitmapData));
			deathstarBitmap.x = 300;
			deathstarBitmap.y = 100;
			addChild(deathstarBitmap);
			
			ship2Bitmap = new Bitmap((Atlas.atlasTexturesBitmapData['menu_ship_2.png'] as BitmapData));
			ship2Bitmap.x = 900;
			ship2Bitmap.y = 150;
			addChild(ship2Bitmap);
			
			ship3Bitmap = new Bitmap((Atlas.atlasTexturesBitmapData['menu_ship_3.png'] as BitmapData));
			ship3Bitmap.x = 50;
			ship3Bitmap.y = 150;
			addChild(ship3Bitmap);
			
			ship1Bitmap = new Bitmap((Atlas.atlasTexturesBitmapData['menu_ship_1.png'] as BitmapData));
			ship1Bitmap.x = -375;
			ship1Bitmap.y = 250;
			addChild(ship1Bitmap);
			
			borderBitmap = new Bitmap((Atlas.atlasTexturesBitmapData['menu_border.png'] as BitmapData));
			borderBitmap.x = 0;
			borderBitmap.y = 5;
			addChild(borderBitmap);
			
			runStarsTween();
			runDeadstarTween();
			runShip2Tween();
			runShip3Tween();
			runShip1Tween();
		}
		
		private function createButtons():void
		{
			newGameButton = new Button(85, 350, "НАЧАТЬ ИГРУ", 45, 15, 16,  Constants.MENU_BUTTON_NEW_GAME);
			addChild(newGameButton);
			settingsButton = new Button(85, 425, "НАСТРОЙКИ", 45, 15, 16,  Constants.MENU_BUTTON_SETTINGS);
			addChild(settingsButton);
			invateButton = new Button(85, 500, "ПРИГЛАСИТЬ", 45, 15, 16,  Constants.MENU_BUTTON_INVITE);
			addChild(invateButton);
		}
		
		private function createButtonContinue():void
		{
			continueButton = new Button(85, 275, "ПРОДОЛЖИТЬ ИГРУ", 45, 15, 16,  Constants.MENU_BUTTON_CONTINUE);
			addChild(continueButton);
		}
		
		private function runStarsTween():void
		{
			starsTween = new GTween(starsBitmap);
			starsTween.setValue("x", starsBitmap.x -50);
			starsTween.setValue("y", starsBitmap.y);
			starsTween.ease = Sine.easeInOut;
			starsTween.timeScale = 0.2;
			starsTween.onComplete = onTweenStars;
		}
		
		private function onTweenStars(tween:GTween):void		{
			
			if (tween.getValue("x") == -50 && tween.getValue("y") == 0){
				starsTween.setValue("x", tween.getValue("x"));
				starsTween.setValue("y", tween.getValue("y") - 50);
			}else if (tween.getValue("x") == -50 && tween.getValue("y") == -50){
				starsTween.setValue("x", tween.getValue("x") + 50);
				starsTween.setValue("y", tween.getValue("y"));
			}else if (tween.getValue("x") == 0 && tween.getValue("y") == -50){
				starsTween.setValue("x", tween.getValue("x"));
				starsTween.setValue("y", tween.getValue("y") + 50);
			}else if (tween.getValue("x") == 0 && tween.getValue("y") == 0){
				starsTween.setValue("x", tween.getValue("x") - 50);
				starsTween.setValue("y", tween.getValue("y"));
			}
			starsTween.ease = Sine.easeInOut;
			starsTween.timeScale = 0.2;
			starsTween.onComplete = onTweenStars;
		}
		
		private function runDeadstarTween():void
		{
			deathstarTween = new GTween(deathstarBitmap);
			deathstarTween.setValue("x", deathstarBitmap.x -100);
			deathstarTween.setValue("y", deathstarBitmap.y);
			deathstarTween.ease = Sine.easeInOut;
			deathstarTween.timeScale = 0.2;
			deathstarTween.onComplete = onTweenDeadstar;
		}
		
		private function onTweenDeadstar(tween:GTween):void
		{
			if (tween.getValue("x") == 200 && tween.getValue("y") == 100){
				deathstarTween.setValue("x", tween.getValue("x"));
				deathstarTween.setValue("y", tween.getValue("y") - 100);
			}else if (tween.getValue("x") == 200 && tween.getValue("y") == 0){
				deathstarTween.setValue("x", tween.getValue("x") + 100);
				deathstarTween.setValue("y", tween.getValue("y"));
			}else if (tween.getValue("x") == 300 && tween.getValue("y") == 0){
				deathstarTween.setValue("x", tween.getValue("x"));
				deathstarTween.setValue("y", tween.getValue("y") + 100);
			}else if (tween.getValue("x") == 300 && tween.getValue("y") == 100){
				deathstarTween.setValue("x", tween.getValue("x") - 100);
				deathstarTween.setValue("y", tween.getValue("y"));
			}
			deathstarTween.ease = Sine.easeInOut;
			deathstarTween.timeScale = 0.2;
			deathstarTween.onComplete = onTweenDeadstar;
		}
		
		private function runShip1Tween():void
		{
			ship1Tween = new GTween(ship1Bitmap);
			ship1Tween.setValue("x", 1000);
			ship1Tween.setValue("y", 1000);
			ship1Tween.ease = Sine.easeInOut;
			ship1Tween.timeScale = 0.2;
			ship1Tween.onComplete = onTweenShip1;
		}
		
		private function onTweenShip1(tween:GTween):void
		{
			ship1Bitmap.x = -375;
			ship1Bitmap.y = 250;
			ship1Tween.setValue("x", 1000);
			ship1Tween.setValue("y", 1000);
			ship1Tween.ease = Sine.easeInOut;
			ship1Tween.timeScale = 0.2;
			ship1Tween.onComplete = onTweenShip1;
		}
		
		private function runShip2Tween():void
		{
			ship2Tween = new GTween(ship2Bitmap);
			ship2Tween.setValue("x", -250);
			ship2Tween.setValue("y", 350);
			ship2Tween.ease = Sine.easeInOut;
			ship2Tween.timeScale = 0.2;
			ship2Tween.onComplete = onTweenShip2;
		}
		
		private function onTweenShip2(tween:GTween):void
		{
			ship2Bitmap.x = 900;
			ship2Bitmap.y = 150;
			ship2Tween.setValue("x", -250);
			ship2Tween.setValue("y", 350);
			ship2Tween.ease = Sine.easeInOut;
			ship2Tween.timeScale = 0.2;
			ship2Tween.onComplete = onTweenShip2;
		}
		
		private function runShip3Tween():void
		{
			ship3Tween = new GTween(ship3Bitmap);
			ship3Tween.setValue("x", ship3Bitmap.x - 150);
			ship3Tween.setValue("y", ship3Bitmap.y);
			ship3Tween.ease = Sine.easeInOut;
			ship3Tween.timeScale = 0.2;
			ship3Tween.onComplete = onTweenShip3;
		}
		
		private function onTweenShip3(tween:GTween):void
		{
			if (tween.getValue("x") == -100 && tween.getValue("y") == 150){
				ship3Tween.setValue("x", tween.getValue("x"));
				ship3Tween.setValue("y", tween.getValue("y") - 150);
			}else if (tween.getValue("x") == -100 && tween.getValue("y") == 0){
				ship3Tween.setValue("x", tween.getValue("x") + 150);
				ship3Tween.setValue("y", tween.getValue("y"));
			}else if (tween.getValue("x") == 50 && tween.getValue("y") == 00){
				ship3Tween.setValue("x", tween.getValue("x"));
				ship3Tween.setValue("y", tween.getValue("y") + 150);
			}else if (tween.getValue("x") == 50 && tween.getValue("y") == 150){
				ship3Tween.setValue("x", tween.getValue("x") - 150);
				ship3Tween.setValue("y", tween.getValue("y"));
			}
			ship3Tween.ease = Sine.easeInOut;
			ship3Tween.timeScale = 0.2;
			ship3Tween.onComplete = onTweenShip3;
		}
		
		
	}

}
package swh.menu 
{
	import flash.system.*;
	import flash.display.Bitmap;
	import starling.display.Sprite;
	import starling.events.Event;
	import starling.display.Image;
	import starling.animation.Tween;
	import starling.core.Starling;
	
	import swh.events.Navigation;
	import swh.data.Assets;
	import swh.data.Constants;
	import swh.buttons.Buttons;
	import swh.data.Data;
	import swh.vkAPI.VKAPI;
	import swh.message.Message;
	
	import vk.api.serialization.json.JSON;
	/**
	 * ...
	 * @author Catfish Studio
	 */
	public class Menu extends Sprite 
	{
		private var image:Image;
		private var tweenStars:Tween;
		private var tweenDeathstar:Tween;
		private var tweenShip1:Tween;
		private var tweenShip2:Tween;
		private var tweenShip3:Tween;
		private var button:Buttons;
		private var help:MenuHelp;
		private var message:Message;
		
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
			Assets.setTextureAtlasFromBitmap(Assets.assetsContent.MenuAtlas, Assets.assetsContent.MenuAtlasXML);
			Assets.setTextureAtlasEmbeddedAsset(Assets.assetsContent.ButtonsAtlas, Assets.assetsContent.ButtonsAtlasXML);
			
			createBackground();
			createButtons();
			createHelp();
			createMessage();
			
			if (Data.errorGetData === true){
				message.setText("Ошибка: Сервер ВКонтакте недоступен!\nСохранённые данные не удалось загрузить.");
			}else{
				if (Data.userData != "" && Data.aiData != "" && Data.planetsData != "") {
					Data.initialization();
					Data.readDataJSON();
					Data.readPlanetsDataJSON();
					Data.readUserDataJSON();
					Data.readAIDataJSON();
					message.setText("Сохранённых данных успешно загружены!\nВы можите продолжить игру.");
					createButtonContinue();
				} else{
					message.setText("Сохранённых данных нет.\nНачните новую игры.");
				}
			}
			
			trace('[MENU]: added to stage');
		}
		
		private function onRemoveFromStage(e:Event):void 
		{
			removeEventListener(Event.REMOVED_FROM_STAGE, onRemoveFromStage);
			
			Starling.juggler.remove(tweenStars);
			tweenStars = null;
			Starling.juggler.remove(tweenDeathstar);
			tweenDeathstar = null;
			Starling.juggler.remove(tweenShip1);
			tweenShip1 = null;
			Starling.juggler.remove(tweenShip2);
			tweenShip2 = null;
			Starling.juggler.remove(tweenShip3);
			tweenShip3 = null;
			
			if (image != null){
				removeChild(image);
				image.dispose();
				image = null;
			}
			
			if (button != null){
				removeChild(button);
				button.dispose();
				button = null;
			}
			
			if (help != null){
				removeChild(help);
				help.dispose();
				help = null;
			}
			
			if (message != null){
				removeChild(message);
				message.dispose();
				message = null;
			}
			
			Assets.disposeTextureAtlas();
			
			while (this.numChildren)
			{
				this.removeChildren(0, -1, true);
			}
			this.removeFromParent(true);
			super.dispose();
			System.gc();
			trace('[MENU]: removed from stage');
		}
		
		private function createBackground():void
		{
			image = new Image(Assets.textureAtlas.getTexture('menu_background.jpg'));
			image.name = 'menu_background';
			image.x = 0; image.y = 0;
			addChild(image);
			image = new Image(Assets.textureAtlas.getTexture('menu_deathstar.png'));
			image.name = 'menu_deathstar';
			image.x = 300; image.y = 100;
			addChild(image);
			image = new Image(Assets.textureAtlas.getTexture('menu_ship_2.png'));
			image.name = 'menu_ship_2';
			image.x = 900; image.y = 150;
			addChild(image);
			image = new Image(Assets.textureAtlas.getTexture('menu_ship_3.png'));
			image.name = 'menu_ship_3';
			image.x = 50; image.y = 150;
			addChild(image);
			image = new Image(Assets.textureAtlas.getTexture('menu_ship_1.png'));
			image.name = 'menu_ship_1';
			image.x = -375; image.y = 250;
			addChild(image);
			image = new Image(Assets.textureAtlas.getTexture('menu_border.png'));
			image.name = 'menu_border';
			image.x = 0; image.y = 0;
			addChild(image);
			
			onTweenStars();
			onTweenDeadstar();
			onTweenShip2();
			onTweenShip3();
			onTweenShip1();
		}
		
		private function onTweenStars(step:int = 0):void
		{
			Starling.juggler.remove(tweenStars);
			image = (getChildByName('menu_background') as Image);
			tweenStars = new Tween(image, 15.0, "easeInOut");
			switch(step){
				case 0:
					tweenStars.animate("x", image.x - 50);
					tweenStars.animate("y", image.y);
					tweenStars.onComplete = onTweenStars;
					tweenStars.onCompleteArgs = [1];
					Starling.juggler.add(tweenStars);
					break;
				case 1:
					tweenStars.animate("x", image.x);
					tweenStars.animate("y", image.y - 50);
					tweenStars.onComplete = onTweenStars;
					tweenStars.onCompleteArgs = [2];
					Starling.juggler.add(tweenStars);
					break;
				case 2:
					tweenStars.animate("x", image.x + 50);
					tweenStars.animate("y", image.y);
					tweenStars.onComplete = onTweenStars;
					tweenStars.onCompleteArgs = [3];
					Starling.juggler.add(tweenStars);
					break;
				case 3:
					tweenStars.animate("x", image.x);
					tweenStars.animate("y", image.y + 50);
					tweenStars.onComplete = onTweenStars;
					tweenStars.onCompleteArgs = [0];
					Starling.juggler.add(tweenStars);
					break;
			}
			//	tweenStars.moveTo( -50, 0);
		}
		
		private function onTweenDeadstar(step:int = 0):void
		{
			Starling.juggler.remove(tweenDeathstar);
			image = (getChildByName('menu_deathstar') as Image);
			tweenDeathstar = new Tween(image, 15.0, "easeInOut");
			switch(step){
				case 0:
					tweenDeathstar.animate("x", image.x - 100);
					tweenDeathstar.animate("y", image.y);
					tweenDeathstar.onComplete = onTweenDeadstar;
					tweenDeathstar.onCompleteArgs = [1];
					Starling.juggler.add(tweenDeathstar);
					break;
				case 1:
					tweenDeathstar.animate("x", image.x);
					tweenDeathstar.animate("y", image.y - 100);
					tweenDeathstar.onComplete = onTweenDeadstar;
					tweenDeathstar.onCompleteArgs = [2];
					Starling.juggler.add(tweenDeathstar);
					break;
				case 2:
					tweenDeathstar.animate("x", image.x + 100);
					tweenDeathstar.animate("y", image.y);
					tweenDeathstar.onComplete = onTweenDeadstar;
					tweenDeathstar.onCompleteArgs = [3];
					Starling.juggler.add(tweenDeathstar);
					break;
				case 3:
					tweenDeathstar.animate("x", image.x);
					tweenDeathstar.animate("y", image.y + 100);
					tweenDeathstar.onComplete = onTweenDeadstar;
					tweenDeathstar.onCompleteArgs = [0];
					Starling.juggler.add(tweenDeathstar);
					break;
			}
		}
		
		private function onTweenShip3(step:int = 0):void
		{
			Starling.juggler.remove(tweenShip3);
			image = (getChildByName('menu_ship_3') as Image);
			tweenShip3 = new Tween(image, 15.0, "easeInOut");
			switch(step){
				case 0:
					tweenShip3.animate("x", image.x - 150);
					tweenShip3.animate("y", image.y);
					tweenShip3.onComplete = onTweenShip3;
					tweenShip3.onCompleteArgs = [1];
					Starling.juggler.add(tweenShip3);
					break;
				case 1:
					tweenShip3.animate("x", image.x);
					tweenShip3.animate("y", image.y - 150);
					tweenShip3.onComplete = onTweenShip3;
					tweenShip3.onCompleteArgs = [2];
					Starling.juggler.add(tweenShip3);
					break;
				case 2:
					tweenShip3.animate("x", image.x + 150);
					tweenShip3.animate("y", image.y);
					tweenShip3.onComplete = onTweenShip3;
					tweenShip3.onCompleteArgs = [3];
					Starling.juggler.add(tweenShip3);
					break;
				case 3:
					tweenShip3.animate("x", image.x);
					tweenShip3.animate("y", image.y + 150);
					tweenShip3.onComplete = onTweenShip3;
					tweenShip3.onCompleteArgs = [0];
					Starling.juggler.add(tweenShip3);
					break;
			}
		}
		
		private function onTweenShip1():void
		{
			Starling.juggler.remove(tweenShip1);
			image = (getChildByName('menu_ship_1') as Image);
			image.x = -375; 
			image.y = 250;
			tweenShip1 = new Tween(image, 5.0, "easeInOut");
			tweenShip1.animate("x", 1000);
			tweenShip1.animate("y", 1000);
			tweenShip1.onComplete = onTweenShip1;
			Starling.juggler.add(tweenShip1);
		}
		
		private function onTweenShip2():void
		{
			Starling.juggler.remove(tweenShip2);
			image = (getChildByName('menu_ship_2') as Image);
			image.x = 900; 
			image.y = 150;
			tweenShip2 = new Tween(image, 5.0, "easeInOut");
			tweenShip2.animate("x", -250);
			tweenShip2.animate("y", 350);
			tweenShip2.onComplete = onTweenShip2;
			Starling.juggler.add(tweenShip2);
		}
		
		private function createButtons():void
		{
			
			button = new Buttons("НАЧАТЬ НОВУЮ ИГРУ", Assets.textureAtlasAnimation.getTextures('button_blue_'), 12, 0xFFFFFF, 0x0090F0);
			button.name = Constants.MENU_BUTTON_NEW_GAME;
			button.x = 85;
			button.y = 350;
			addChild(button);
			
			button = new Buttons("НАСТРОЙКИ", Assets.textureAtlasAnimation.getTextures('button_blue_'), 12, 0xFFFFFF, 0x0090F0);
			button.name = Constants.MENU_BUTTON_SETTINGS;
			button.x = 85;
			button.y = 425;
			addChild(button);
			
			button = new Buttons("ПРИГЛАСИТЬ", Assets.textureAtlasAnimation.getTextures('button_blue_'), 12, 0xFFFFFF, 0x0090F0);
			button.name = Constants.MENU_BUTTON_INVITE;
			button.x = 85;
			button.y = 500;
			addChild(button);
		}
		
		private function createButtonContinue():void
		{
			button = new Buttons("ПРОДОЛЖИТЬ ИГРУ", Assets.textureAtlasAnimation.getTextures('button_blue_'), 12, 0xFFFFFF, 0x0090F0);
			button.name = Constants.MENU_BUTTON_CONTINUE;
			button.x = 85;
			button.y = 275;
			addChild(button);
		}
		
		private function createHelp():void
		{
			help = new MenuHelp("Добро пожаловать на путь силы.\n\nВаши способности превышают способности обычных людей.\nВы тут потому что вы были избраны.\n\nНажмите кнопку \"Начать игры\"\n\nИ да пребудет с вами сила!", 0xFFFFFF, 0x0090F0);
			help.x = 570;
			help.y = 290;
			addChild(help);
		}
		
		private function createMessage():void
		{
			message = new Message("Поиск сохранённых данных...");
			message.x = (Constants.GAME_WINDOW_WIDTH / 2) - (message.width / 2);
			message.y = 25;
			addChild(message);
		}
		
		
	}

}
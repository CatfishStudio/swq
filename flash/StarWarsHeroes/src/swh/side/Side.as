package swh.side 
{
	import flash.system.*;
	
	import starling.display.Sprite;
	import starling.events.Event;
	import starling.display.Image;
	import starling.display.MovieClip;
	import starling.core.Starling;
	import starling.events.Touch;
	import starling.events.TouchEvent;
	import starling.events.TouchPhase;
	import starling.display.DisplayObject;
	
	import swh.events.Navigation;
	import swh.data.Constants;
	import swh.data.Assets;
	import swh.side.SideHelp;
	import swh.data.Data;
	import swh.vkAPI.VKAPI;
	import swh.message.Message;
	
	/**
	 * ...
	 * @author Catfish Studio
	 */
	public class Side extends Sprite 
	{
		private var image:Image;
		private var sideRed:MovieClip;
		private var sideBlue:MovieClip;
		private var sideHelpRed:SideHelp;
		private var sideHelpBlue:SideHelp;
		private var message:Message;
		
		public function Side() 
		{
			super();
			addEventListener(Event.ADDED_TO_STAGE, onAddedToStage);
			addEventListener(Event.REMOVED_FROM_STAGE, onRemoveFromStage);
		}
		
		private function onAddedToStage(e:Event):void 
		{
			removeEventListener(Event.ADDED_TO_STAGE, onAddedToStage);
			
			name = Constants.SIDE;
			Assets.setTextureAtlasFromBitmap(Assets.assetsContent.SideAtlas, Assets.assetsContent.SideAtlasXML);
			Assets.setTextureAtlasEmbeddedAsset(Assets.assetsContent.SideAnimAtlas, Assets.assetsContent.SideAnimAtlasXML);
			
			createBackground();
			createSides();
			
			if (Data.errorSetData) {
				message = new Message("Произошла ошибка сохранения данных. \nВаш прогресс не будет сохранён!");
				message.x = (Constants.GAME_WINDOW_WIDTH / 2) - (message.width / 2);
				message.y = 25;
				addChild(message);
			}
			
			trace('[SIDE]: added to stage');
		}
		
		private function onRemoveFromStage(e:Event):void 
		{
			removeEventListener(Event.REMOVED_FROM_STAGE, onRemoveFromStage);
			Starling.juggler.remove(sideRed);
			Starling.juggler.remove(sideBlue);
			
			if (image != null){
				removeChild(image);
				image.dispose();
				image = null;
			}
			
			if (sideRed != null){
				sideRed.removeEventListener(TouchEvent.TOUCH, onTouchRed);
				removeChild(sideRed);
				sideRed.dispose();
				sideRed = null;
			}
			
			if (sideBlue != null){
				sideBlue.removeEventListener(TouchEvent.TOUCH, onTouchBlue);
				removeChild(sideBlue);
				sideBlue.dispose();
				sideBlue = null;
			}
			
			if (sideHelpBlue != null){
				removeChild(sideHelpBlue);
				sideHelpBlue.dispose();
				sideHelpBlue = null;
			}
			
			if (sideHelpRed != null){
				removeChild(sideHelpRed);
				sideHelpRed.dispose();
				sideHelpRed = null;
			}
			
			Assets.disposeTextureAtlas();
			
			while (this.numChildren)
			{
				this.removeChildren(0, -1, true);
			}
			this.removeFromParent(true);
			super.dispose();
			System.gc();
			trace('[SIDE]: removed from stage');
		}
		
		private function createBackground():void
		{
			image = new Image(Assets.textureAtlas.getTexture('side_background.png'));
			image.name = 'side_background';
			image.x = 0; image.y = 0;
			addChild(image);
			
			image = new Image(Assets.textureAtlas.getTexture('side_border.png'));
			image.name = 'side_border';
			image.x = 0; image.y = 0;
			addChild(image);
		}
		
		private function createSides():void
		{
			sideRed = new MovieClip(Assets.textureAtlasAnimation.getTextures('side_darth_vader_'), 12);
			sideRed.name = Constants.SIDE_SITH;
			sideRed.x = 50;
			sideRed.y = 50;
			sideRed.addEventListener(TouchEvent.TOUCH, onTouchRed);
			sideRed.play();
			addChild(sideRed);
			Starling.juggler.add(sideRed);
			
			sideBlue = new MovieClip(Assets.textureAtlasAnimation.getTextures('side_luke_skywalker_'), 12);
			sideBlue.name = Constants.SIDE_JEDI;
			sideBlue.x = (Constants.GAME_WINDOW_WIDTH - sideBlue.width) - 50;
			sideBlue.y = 50;
			sideBlue.addEventListener(TouchEvent.TOUCH, onTouchBlue);
			sideBlue.play();
			addChild(sideBlue);
			Starling.juggler.add(sideBlue);
			
			sideHelpBlue = new SideHelp("\nВыберите светлую сторону силы. \"Только покой ощутив, возмёшь контроль над желаниями своими\". \n\nПройдите путь Люка Скайуокера!", 0xFFFFFF, 0x0090F0, Constants.SIDE_JEDI);
			sideHelpBlue.x = (Constants.GAME_WINDOW_WIDTH / 2) + 100;
			sideHelpBlue.y = (Constants.GAME_WINDOW_HEIGHT - 300);
			sideHelpBlue.visible = false;
			addChild(sideHelpBlue);
			
			sideHelpRed = new SideHelp("\nВыберите тёмную сторону силы. \"Поддайся амбициям, почувствуй власть в своих руках.\" \n\nПройдите путь Дарт Вейдера!", 0xFFFFFF, 0x880000, Constants.SIDE_SITH);
			sideHelpRed.x = 45;
			sideHelpRed.y = (Constants.GAME_WINDOW_HEIGHT - 300);
			sideHelpRed.visible = false;
			addChild(sideHelpRed);
		}
		
		private var sideRedPlay:Boolean = false;
		private var sideBluePlay:Boolean = false;
		private function onTouchRed(e:TouchEvent):void 
		{
			if (e.getTouch(e.target as DisplayObject, TouchPhase.HOVER)){
				if (sideRedPlay == false){
					sideBluePlay = false;
					sideHelpBlue.visible = false;
					sideRedPlay = true;
					sideHelpRed.visible = true;
				}
			}else{
				sideRedPlay = false;
				sideHelpRed.visible = false;
			}
			if (e.getTouch(e.target as DisplayObject, TouchPhase.BEGAN)){
				// click 
				dispatchEvent(new Navigation(Navigation.CHANGE_SCREEN, true, { id: Constants.SIDE_SITH }));
			}
		}
		
		private function onTouchBlue(e:TouchEvent):void 
		{
			if (e.getTouch(e.target as DisplayObject, TouchPhase.HOVER)){
				if (sideBluePlay == false){
					sideRedPlay = false;
					sideHelpRed.visible = false;
					sideBluePlay = true;
					sideHelpBlue.visible = true;
				}
			}else{
				sideBluePlay = false;
				sideHelpBlue.visible = false;
			}
			if (e.getTouch(e.target as DisplayObject, TouchPhase.BEGAN)){
				// click 
				dispatchEvent(new Navigation(Navigation.CHANGE_SCREEN, true, { id: Constants.SIDE_JEDI }));
			}
		}
		
	}

}
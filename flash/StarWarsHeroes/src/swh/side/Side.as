package swh.side 
{
	import flash.display.Sprite;
	import flash.events.Event;
	import flash.display.Bitmap;
	import flash.display.BitmapData;
	import flash.events.MouseEvent;
	import flash.ui.Mouse;
	import flash.ui.MouseCursor;
	
	import swh.data.Utilits;
	import swh.data.Data;
	import swh.data.Assets;
	import swh.data.Atlas;
	import swh.data.Constants;
	import swh.button.Button;
	import swh.animation.DarthVader;
	import swh.animation.LukeSkywalker;
	import swh.side.SideHelp;
	import swh.message.Message;
	import swh.events.NavigationEvent;
	
	/**
	 * ...
	 * @author Catfish Studio
	 */
	public class Side extends Sprite 
	{
		private var backgroundBitmap:Bitmap;
		private var borderBitmap:Bitmap;
		private var dvAnim:DarthVader;
		private var lsAnim:LukeSkywalker;
		private var dvHelp:SideHelp;
		private var lsHelp:SideHelp;
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
			Atlas.loadAtlasBitmapData(Assets.assetsAtlasesContent.SideAtlas, Assets.assetsAtlasesContent.SideAtlasXML, Atlas.TYPE_TEXTURES);
			Atlas.loadAtlasBitmapData(Assets.assetsAtlasesContent.SideAnimAtlas, Assets.assetsAtlasesContent.SideAnimAtlasXML, Atlas.TYPE_ANIMATION);
			createBackground();
			createSides();
			cheateHelp();
			
			if (Data.errorSetData || Data.errorGetData) {
				message = new Message("Сервер ВКонтакте недоступен. \nВаш прогресс не будет сохранён!", Constants.SIDE_SITH);
				
			}else{
				message = new Message("После выбора персонажа. \nНовые данные будут сохранены!", Constants.SIDE_JEDI);
			}
			message.x = (Constants.GAME_WINDOW_WIDTH / 2);
			message.y = 25;
			addChild(message);
			
		}
		
		private function onRemoveFromStage(e:Event):void 
		{
			removeEventListener(Event.REMOVED_FROM_STAGE, onRemoveFromStage);
			Mouse.cursor = MouseCursor.AUTO;
			
			Atlas.clearAtlases(Atlas.TYPE_TEXTURES);
			Atlas.clearAtlases(Atlas.TYPE_ANIMATION);
			
			if(message != null){
				removeChild(message);
				message = null;
			}
			
			removeChild(dvHelp);
			dvHelp = null;
			
			removeChild(lsHelp);
			lsHelp = null;
			
			dvAnim.removeEventListener(MouseEvent.MOUSE_OUT, onMouseOut);
			dvAnim.removeEventListener(MouseEvent.MOUSE_OVER, onMouseOver);
			dvAnim.removeEventListener(MouseEvent.CLICK, onMouseClick);
			removeChild(dvAnim);
			dvAnim = null;
			
			lsAnim.removeEventListener(MouseEvent.MOUSE_OUT, onMouseOut);
			lsAnim.removeEventListener(MouseEvent.MOUSE_OVER, onMouseOver);
			lsAnim.removeEventListener(MouseEvent.CLICK, onMouseClick);
			removeChild(lsAnim);
			lsAnim = null;
			
			borderBitmap.bitmapData.dispose();
			removeChild(borderBitmap);
			borderBitmap = null;
			
			backgroundBitmap.bitmapData.dispose();
			removeChild(backgroundBitmap);
			backgroundBitmap = null;	
			
			while (this.numChildren > 0)
			{
				this.removeChildren(0);
			}
		}
		
		private function createBackground():void 
		{
			backgroundBitmap = new Bitmap((Atlas.atlasTexturesBitmapData['side_background.png'] as BitmapData));
			backgroundBitmap.x = 0;
			backgroundBitmap.y = 0;
			addChild(backgroundBitmap);
			
			borderBitmap = new Bitmap((Atlas.atlasTexturesBitmapData['side_border.png'] as BitmapData));
			borderBitmap.x = 0;
			borderBitmap.y = 0;
			addChild(borderBitmap);
		}
		
		private function createSides():void
		{
			dvAnim = new DarthVader(50, 100, Constants.SIDE_CLOSE_SITH);
			dvAnim.addEventListener(MouseEvent.MOUSE_OUT, onMouseOut);
			dvAnim.addEventListener(MouseEvent.MOUSE_OVER, onMouseOver);
			dvAnim.addEventListener(MouseEvent.CLICK, onMouseClick);
			addChild(dvAnim);
			
			lsAnim = new LukeSkywalker((Constants.GAME_WINDOW_WIDTH - 325), 100, Constants.SIDE_CLOSE_JEDI);
			lsAnim.addEventListener(MouseEvent.MOUSE_OUT, onMouseOut);
			lsAnim.addEventListener(MouseEvent.MOUSE_OVER, onMouseOver);
			lsAnim.addEventListener(MouseEvent.CLICK, onMouseClick);
			addChild(lsAnim);
		}
		
		private function onMouseOut(e:MouseEvent):void 
		{
			Mouse.cursor = MouseCursor.AUTO;
			lsHelp.visible = false;
			dvHelp.visible = false;
		}
		
		private function onMouseOver(e:MouseEvent):void 
		{
			Mouse.cursor = MouseCursor.BUTTON;
			if (e.target.name == Constants.SIDE_CLOSE_JEDI){
				dvHelp.visible = false;
				lsHelp.visible = true;
			}else if (e.target.name == Constants.SIDE_CLOSE_SITH){
				lsHelp.visible = false;
				dvHelp.visible = true;
			}
		}
		
		private function onMouseClick(e:MouseEvent):void 
		{
			dispatchEvent(new NavigationEvent(NavigationEvent.CHANGE_SCREEN, { id: e.target.name }, true));
		}
		
		private function cheateHelp():void
		{
			dvHelp = new SideHelp(45, (Constants.GAME_WINDOW_HEIGHT - 285),"Выберите тёмную сторону силы. \"Поддайся амбициям, почувствуй власть в своих руках.\" \n\nПройдите путь Дарт Вейдера!", Constants.SIDE_SITH);
			dvHelp.visible = false;
			addChild(dvHelp);
			
			lsHelp = new SideHelp((Constants.GAME_WINDOW_WIDTH / 2) + 100, (Constants.GAME_WINDOW_HEIGHT - 285), "Выберите светлую сторону силы. \"Только покой ощутив, возмёшь контроль над желаниями своими\". \n\nПройдите путь Люка Скайуокера!", Constants.SIDE_JEDI);
			lsHelp.visible = false;
			addChild(lsHelp);
		}
		
	}

}
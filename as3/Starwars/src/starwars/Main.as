package starwars
{
	/**
	 * ...
	 * 2016 @author Catfish Studio
	 */
	
	import flash.display.Bitmap;
	import flash.display.BitmapData;
	
	import flash.display.StageDisplayState;
	import flash.display3D.Context3DRenderMode;
	import flash.display.Sprite;
	import flash.events.Event;
	import flash.display.StageAlign;
	import flash.display.StageScaleMode;
	import flash.geom.Rectangle;
	import vk.APIConnection;
	
	import starling.core.Starling;
	import starling.display.Stage;
	
	import starwars.vkAPI.VK;
	import starwars.statics.Constants;
	
	
	[SWF(width="860", height="730", frameRate="60", backgroundColor="#ffffff", allowFullscreen="true")]
	public class Main extends Sprite 
	{
		private var _starling:Starling;
		
		public function Main() 
		{
			if (stage) init();
			else addEventListener(Event.ADDED_TO_STAGE, init);
		}
		
		private function init(e:Event = null):void 
		{
			removeEventListener(Event.ADDED_TO_STAGE, init);
			
			vkInit();
			
			initializationStarling();
		}
		
		/* Иникиализация ВКонтакте */
		private function vkInit():void 
		{
			var flashVars: Object = stage.loaderInfo.parameters as Object;
			VK.vkConnection = new APIConnection(flashVars);
		}
		
		/* Инициализация Starling */
		private function initializationStarling():void
		{
			stage.align = StageAlign.TOP_LEFT;
			stage.scaleMode = StageScaleMode.NO_SCALE;
			stage.addEventListener (Event.RESIZE, resizeListenerFlash);
			_starling = new Starling(Game, stage, null, null, Context3DRenderMode.SOFTWARE);
			_starling.antiAliasing = 1;
			_starling.start();
		}
		
		private function resizeListenerFlash(event:Event):void
		{
			Starling.current.viewPort = new Rectangle (0, 0, stage.stageWidth, stage.stageHeight);
			_starling.stage.stageWidth = Constants.GAME_WINDOW_WIDTH;
			_starling.stage.stageHeight = Constants.GAME_WINDOW_HEIGHT;
		}
		
	}
	
}
package SWHMusicPart1
{
	import flash.display.Sprite;
	import flash.events.Event;
	
	/**
	 * ...
	 * @author Catfish Studio
	 */
	public class Main extends Sprite 
	{
		[Embed(source = '../../assets/battle_1.mp3')]
		public var Buttle1Music:Class;
		
		[Embed(source = '../../assets/battle_2.mp3')]
		public var Buttle2Music:Class;
		
		public function Main() 
		{
			if (stage) init();
			else addEventListener(Event.ADDED_TO_STAGE, init);
		}
		
		private function init(e:Event = null):void 
		{
			removeEventListener(Event.ADDED_TO_STAGE, init);
			// entry point
		}
		
	}
	
}
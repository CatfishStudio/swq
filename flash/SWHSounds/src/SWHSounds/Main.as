package SWHSounds
{
	import flash.display.Sprite;
	import flash.events.Event;
	
	/**
	 * ...
	 * @author Catfish Studio
	 */
	public class Main extends Sprite 
	{
		[Embed(source = '../../assets/click.mp3')]
		public var ClickSound:Class;
		
		[Embed(source = '../../assets/close.mp3')]
		public var CloseSound:Class;
		
		[Embed(source = '../../assets/hit1.MP3')]
		public var Hit1Sound:Class;
		
		[Embed(source = '../../assets/hit2.MP3')]
		public var Hit2Sound:Class;
		
		[Embed(source = '../../assets/hit3.MP3')]
		public var Hit3Sound:Class;
		
		[Embed(source = '../../assets/hit4.MP3')]
		public var Hit4Sound:Class;
		
		[Embed(source = '../../assets/hit5.MP3')]
		public var Hit5Sound:Class;
		
		[Embed(source = '../../assets/open.mp3')]
		public var OpenSound:Class;
		
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
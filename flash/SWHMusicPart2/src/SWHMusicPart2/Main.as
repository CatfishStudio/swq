package SWHMusicPart2
{
	import flash.display.Sprite;
	import flash.events.Event;
	
	/**
	 * ...
	 * @author Catfish Studio
	 */
	public class Main extends Sprite 
	{
		[Embed(source = '../../assets/begin_menu_end.mp3')]
		public var BeginMenuEndMusic:Class;
		
		[Embed(source = '../../assets/end.mp3')]
		public var EndMusic:Class;
		
		[Embed(source = '../../assets/star_wars_theme_song.mp3')]
		public var StarWarsThemeSongMusic:Class;
		
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
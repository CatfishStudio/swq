package starwars.statics 
{
	public class Resource 
	{
		
		/* Настройки игры ------------------*/
		public static var soundOn:Boolean = true;
		public static var musicOn:Boolean = true;
		public static var languageRus:Boolean = true;
		/* -------------------------------- */
		
		/* Текстуры ----------------------- */
		[Embed(source = '../assets/textures/stars.jpg')]
		public static var StarsTexture:Class;
		[Embed(source = '../assets/textures/starwars.png')]
		public static var StarwarsTexture:Class;
		[Embed(source = '../assets/textures/ship1.png')]
		public static var Ship1Texture:Class;
		[Embed(source = '../assets/textures/ship2.png')]
		public static var Ship2Texture:Class;
		[Embed(source = '../assets/textures/ship3.png')]
		public static var Ship3Texture:Class;
		
		[Embed(source = '../assets/textures/planets/deathstar.png')]
		public static var DeathstarTexture:Class;
		
		
		
	}

}
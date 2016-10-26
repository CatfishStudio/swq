package swh.data 
{
	/**
	 * ...
	 * @author Catfish Studio
	 */
	public class Personage 
	{
		public var id:String;
		public var name:String;
		public var life:int;
		public var hit1:int;
		public var hit2:int;
		public var hit3:int;
		public var hit4:int;
		public var hit5:int;
		public var status:String;
		public var description:String;
		public var inCommand:int;
		
		public function Personage() 
		{
			id = "";
			name = "";
			life = 0;
			hit1 = 0;
			hit2 = 0;
			hit3 = 0;
			hit4 = 0;
			hit5 = 0;
			status = "";
			description = "";
			inCommand = 0;
		}
		
		public function setCharacteristics(power:int):void
		{
			hit1 = getRandomValue(1, power);
			hit2 = getRandomValue(1, power);
			hit3 = getRandomValue(1, power);
			hit4 = getRandomValue(1, power);
			hit5 = getRandomValue(1, power);
			life = Math.round( (hit1 + hit2 + hit3 + hit4 + hit5) / 10 * 50);
		}
		
		private function getRandomValue(min:int, max:int):int
		{
			return Math.random() * max | min;
		}
		
	}

}
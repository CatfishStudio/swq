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
		public var life:String;
		public var hit1:String;
		public var hit2:String;
		public var hit3:String;
		public var hit4:String;
		public var hit5:String;
		public var status:String;
		public var description:String;
		
		public function Personage() 
		{
			id = "";
			name = "";
			life = "0";
			hit1 = "0";
			hit2 = "0";
			hit3 = "0";
			hit4 = "0";
			hit5 = "0";
			status = "";
			description = "";
		}
		
		public function setCharacteristics(power:int):void
		{
			hit1 = getRandomValue(1, power).toString();
			hit2 = getRandomValue(1, power).toString();
			hit3 = getRandomValue(1, power).toString();
			hit4 = getRandomValue(1, power).toString();
			hit5 = getRandomValue(1, power).toString();
			life = Math.round((int(hit1) + int(hit2) + int(hit3) + int(hit4) + int(hit5)) / 10 * 50).toString();
		}
		
		private function getRandomValue(min:int, max:int):int
		{
			return Math.random() * max | min;
		}
		
	}

}
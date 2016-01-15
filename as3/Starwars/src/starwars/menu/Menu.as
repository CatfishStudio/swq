package starwars.menu 
{
	import flash.system.*;
	import flash.display.Bitmap;
	
	import starling.display.Sprite;
	import starling.events.Event;
	import starling.display.Image;
	import starling.display.Quad;
	
	import starling.textures.Texture;
	import starling.animation.Tween;
	import starling.core.Starling;
	
	import starwars.events.Navigation;
	import starwars.statics.Constants;
	import starwars.statics.Resource;
	
	
	public class Menu extends Sprite 
	{
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
			background();
			border();
			tweenStars(0);
			tweenDeathstar(0);
			tweenShip3(0);
			tweenShip1();
			tweenShip2();
		}
		
		private function onRemoveFromStage(e:Event):void 
		{
			removeEventListener(Event.REMOVED_FROM_STAGE, onRemoveFromStage);
			
			while (this.numChildren)
			{
				this.removeChildren(0, -1, true);
			}
			this.removeFromParent(true);
			
			super.dispose();
			System.gc();
			trace("[X] Удалена сцена меню");
		}
		
		private function background():void
		{
			var starsBitmap:Bitmap = new Resource.StarsTexture;
			var starsImage:Image = new Image(Texture.fromBitmap(starsBitmap));
			starsImage.name = "StarsTexture";
			addChild(starsImage);
			starsBitmap = null;
			starsImage.dispose();
			starsImage = null;
			
			var deathstarBitmap:Bitmap = new Resource.DeathstarTexture;
			var deathstarImage:Image = new Image(Texture.fromBitmap(deathstarBitmap));
			deathstarImage.name = "DeathstarTexture";
			deathstarImage.x = 300;
			deathstarImage.y = 100;
			addChild(deathstarImage);
			deathstarBitmap = null;
			deathstarImage.dispose();
			deathstarImage = null;
			
			var ship2Bitmap:Bitmap = new Resource.Ship2Texture;
			var ship2Image:Image = new Image(Texture.fromBitmap(ship2Bitmap));
			ship2Image.name = "Ship2Texture";
			ship2Image.x = 900;
			ship2Image.y = 150;
			addChild(ship2Image);
			ship2Bitmap = null;
			ship2Image.dispose();
			ship2Image = null;
			
			var ship3Bitmap:Bitmap = new Resource.Ship3Texture;
			var ship3Image:Image = new Image(Texture.fromBitmap(ship3Bitmap));
			ship3Image.name = "Ship3Texture";
			ship3Image.x = 50;
			ship3Image.y = 150;
			addChild(ship3Image);
			ship3Bitmap = null;
			ship3Image.dispose();
			ship3Image = null;
			
			var ship1Bitmap:Bitmap = new Resource.Ship1Texture;
			var ship1Image:Image = new Image(Texture.fromBitmap(ship1Bitmap));
			ship1Image.name = "Ship1Texture";
			ship1Image.x = -375;
			ship1Image.y = 250;
			addChild(ship1Image);
			ship1Bitmap = null;
			ship1Image.dispose();
			ship1Image = null;
		}
		
		private function border():void
		{
			var quad:Quad;
			quad = new Quad(840, 710,  0x0000FF, true);
			quad.x = 10;
			quad.y = 10;
			quad.alpha = 0;
			addChild(quad);
		}
		
		private function tweenStars(index:int):void
		{
			var indexPosition:int = index;
			var positions: /* int */ Array = [];
			positions.push([-50, 0]);
			positions.push([-50, -50]);
			positions.push([0, 0]);
			
			var image:Image = (getChildByName("StarsTexture") as Image);
			var tween:Tween = new Tween(image, 25.0);
			tween.moveTo(positions[indexPosition][0], positions[indexPosition][1]);
			tween.onComplete = function():void 
			{ 
				Starling.juggler.removeTweens(tween);
				tween = null;
				if (indexPosition < 2) indexPosition++;
				else indexPosition = 0;
				tweenStars(indexPosition);
			};
			Starling.juggler.add(tween);
		}
		
		private function tweenDeathstar(index:int):void
		{
			var indexPosition:int = index;
			var positions: /* int */ Array = [];
			positions.push([200, 100]);
			positions.push([200, 0]);
			positions.push([300, 100]);
			
			var image:Image = (getChildByName("DeathstarTexture") as Image);
			var tween:Tween = new Tween(image, 25.0);
			tween.moveTo(positions[indexPosition][0], positions[indexPosition][1]);
			tween.onComplete = function():void 
			{ 
				Starling.juggler.removeTweens(tween);
				tween = null;
				if (indexPosition < 2) indexPosition++;
				else indexPosition = 0;
				tweenDeathstar(indexPosition);
			};
			Starling.juggler.add(tween);
		}
		
		private function tweenShip1():void
		{
			var image:Image = (getChildByName("Ship1Texture") as Image);
			image.x = -375;
			image.y = 250;
			var tween:Tween = new Tween(image, 5.0);
			tween.moveTo(1000, 1000);
			tween.onComplete = function():void 
			{ 
				Starling.juggler.removeTweens(tween);
				tween = null;
				tweenShip1();
			};
			Starling.juggler.add(tween);
		}
		
		private function tweenShip2():void
		{
			var image:Image = (getChildByName("Ship2Texture") as Image);
			image.x = 900;
			image.y = 150;
			var tween:Tween = new Tween(image, 5.0);
			tween.moveTo(-250, 350);
			tween.onComplete = function():void 
			{ 
				Starling.juggler.removeTweens(tween);
				tween = null;
				tweenShip2();
			};
			Starling.juggler.add(tween);
		}
		
		private function tweenShip3(index:int):void
		{
			var indexPosition:int = index;
			var positions: /* int */ Array = [];
			positions.push([-100, 150]);
			positions.push([-100, 0]);
			positions.push([50, 150]);
			
			var image:Image = (getChildByName("Ship3Texture") as Image);
			var tween:Tween = new Tween(image, 25.0);
			tween.moveTo(positions[indexPosition][0], positions[indexPosition][1]);
			tween.onComplete = function():void 
			{ 
				Starling.juggler.removeTweens(tween);
				tween = null;
				if (indexPosition < 2) indexPosition++;
				else indexPosition = 0;
				tweenShip3(indexPosition);
			};
			Starling.juggler.add(tween);
		}
		
	}

}
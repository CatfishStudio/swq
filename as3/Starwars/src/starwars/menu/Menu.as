package starwars.menu 
{
	import flash.system.*;
	import flash.display.Bitmap;
	
	import starling.display.Sprite;
	import starling.events.Event;
	import starling.display.Image;
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
			parallaxTween();
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
			var bitmap:Bitmap = new Resource.StarsTexture;
			var image:Image = new Image(Texture.fromBitmap(bitmap));
			image.name = "StarsTexture";
			addChild(image);
			
			bitmap = null;
			image.dispose();
			image = null;
		}
		
		private function parallaxTween():void
		{
			var stars:Image = (getChildByName("StarsTexture") as Image);
			var tween:Tween = new Tween(stars, 25.5);
			tween.moveTo(100, 100);
			tween.onComplete = function():void 
			{ 
				Starling.juggler.removeTweens(tween);
				tween = null;
			};
			Starling.juggler.add(tween);
		}
		
	}

}
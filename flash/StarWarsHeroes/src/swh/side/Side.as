package swh.side 
{
	import flash.system.*;
	
	import starling.display.Sprite;
	import starling.events.Event;
	import starling.display.Image;
	import starling.display.MovieClip;
	import starling.core.Starling;
	
	import swh.data.Constants;
	import swh.data.Assets;
	/**
	 * ...
	 * @author Catfish Studio
	 */
	public class Side extends Sprite 
	{
		private var image:Image;
		private var sideRed:MovieClip;
		private var sideBlue:MovieClip;
		
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
			Assets.setTextureAtlasFromBitmap(Assets.assetsContent.SideAtlas, Assets.assetsContent.SideAtlasXML);
			Assets.setTextureAtlasEmbeddedAsset(Assets.assetsContent.SideAnimAtlas, Assets.assetsContent.SideAnimAtlasXML);
			
			createBackground();
			createSides();
			
			trace('[SIDE]: added to stage');
		}
		
		private function onRemoveFromStage(e:Event):void 
		{
			removeEventListener(Event.REMOVED_FROM_STAGE, onRemoveFromStage);
			Starling.juggler.remove(sideRed);
			Starling.juggler.remove(sideBlue);
			
			if (image != null){
				removeChild(image);
				image.dispose();
				image = null;
			}
			
			if (sideRed != null){
				removeChild(sideRed);
				sideRed.dispose();
				sideRed = null;
			}
			
			if (sideBlue != null){
				removeChild(sideBlue);
				sideBlue.dispose();
				sideBlue = null;
			}
			
			Assets.disposeTextureAtlas();
			
			while (this.numChildren)
			{
				this.removeChildren(0, -1, true);
			}
			this.removeFromParent(true);
			super.dispose();
			System.gc();
			trace('[SIDE]: removed from stage');
		}
		
		private function createBackground():void
		{
			image = new Image(Assets.textureAtlas.getTexture('side_background.png'));
			image.name = 'side_background';
			image.x = 0; image.y = 0;
			addChild(image);
			
			image = new Image(Assets.textureAtlas.getTexture('side_border.png'));
			image.name = 'side_border';
			image.x = 0; image.y = 0;
			addChild(image);
		}
		
		private function createSides():void
		{
			sideRed = new MovieClip(Assets.textureAtlasAnimation.getTextures('side_darth_vader_'), 12);
			sideRed.name = 'side_darth_vader';
			sideRed.x = 50;
			sideRed.y = 50;
			sideRed.play();
			addChild(sideRed);
			Starling.juggler.add(sideRed);
			
			sideBlue = new MovieClip(Assets.textureAtlasAnimation.getTextures('side_luke_skywalker_'), 12);
			sideBlue.name = 'side_luke_skywalker';
			sideBlue.x = (Constants.GAME_WINDOW_WIDTH - sideBlue.width) - 50;
			sideBlue.y = 50;
			sideBlue.play();
			addChild(sideBlue);
			Starling.juggler.add(sideBlue);
		}
		
	}

}
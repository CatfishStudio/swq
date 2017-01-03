package swh.command 
{
	import flash.display.Sprite;
	import flash.events.Event;
	
	import swh.data.Constants;
	import swh.data.Data;
	import swh.command.CommandIcons;
	/**
	 * ...
	 * @author Catfish Studio
	 */
	public class CommandPanelIcons extends Sprite 
	{
		private var panelMask:Sprite;
		private var panel:Sprite;
		
		private var colorPanel:int;
		private var icons:Vector.<CommandIcons>;
		
		public function CommandPanelIcons() 
		{
			super();
			addEventListener(Event.ADDED_TO_STAGE, onAddedToStage);
			addEventListener(Event.REMOVED_FROM_STAGE, onRemoveFromStage);
		}
		
		private function onAddedToStage(e:Event):void 
		{
			removeEventListener(Event.ADDED_TO_STAGE, onAddedToStage);
			
			init();
			createMask();
			createPanel();
			
		}
		
		private function onRemoveFromStage(e:Event):void 
		{
			removeEventListener(Event.REMOVED_FROM_STAGE, onRemoveFromStage);
			while (this.numChildren)
			{
				this.removeChildren(0);
			}
		}
		
		private function init():void
		{
			icons = new Vector.<CommandIcons>();
			if (Data.userSide == Constants.SIDE_JEDI){
				colorPanel = 0x0000FF;
			}else{
				colorPanel = 0x880000;
			}
		}
		
		private function createMask():void
		{
			panelMask = new Sprite();
			panelMask.graphics.beginFill(0x333333, 1);
			panelMask.graphics.drawRect(0, 0, 435, 90);
			panelMask.graphics.endFill();
			panelMask.x = 0; 
			panelMask.y = 0;
			addChild(panelMask);
			mask = panelMask;
		}
		
		private function createPanel():void
		{
			panel = new Sprite();
			panel.graphics.beginFill(colorPanel, 0.2);
			panel.graphics.drawRect(0, 0, 435, 90);
			panel.graphics.endFill();
			panel.x = 0;
			panel.y = 0;
			addChild(panel)
		}
		
		public function addPanelChild(icon:CommandIcons):void
		{
			icons.push(icon);
			icons[icons.length - 1].x = 5 + (50 * (icons.length - 1) );
			icons[icons.length - 1].y = 5;
			panel.addChild(icon);
		}
		
		public function selectIconsOff():void
		{
			for (var i:int = 0; i < icons.length; i++) {
				icons[i].selectOff();
			}
		}
	}

}
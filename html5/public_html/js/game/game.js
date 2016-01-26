
/* == START FILE ========================================================= */

var Game = function(mainStage)
{
	var that = {
		config: {music:false, sound:true, language:"rus", side: "side_none", MAIN_WIDTH:860, MAIN_HEIGH:730},
		sound: null,
		timer: null,
		match: null,
		initialization: null,
		assets: null,
		menu: null,
		backmenu: null,
		settings: null,
		message: null,
		side: null,
		command: null,
		startbattle: null,
		level: null,
                victory: null,
                lost: null,
		
		vkInvite: function()
		{
			//VK.callMethod("showInviteBox");
		},
		
		loadAssets: function()
		{
			that.assets = Preloader(that);
			that.assets.load();
			mainStage.addChild(that.assets.show());
		},
		
		loadAssetsComplete: function()
		{
			that.sound = Sound(that);
			that.sound.soundPlayStarWarsThemeSong();
			mainStage.removeChild(that.assets.close());
			that.menuShow();
		},
		
		menuShow: function()
		{
			that.menu = Menu(that);
			that.menu.create();
			mainStage.addChild(that.menu.show());
		},
		
		menuStartGame: function()
		{
			mainStage.removeChild(that.menu.close());
			that.menu.destroy();
			that.menu = that.settings = null;
			that.sideShow();
		},
		
		settingsShow: function()
		{
			that.settings = Settings(that);
			that.settings.create();
			mainStage.addChild(that.settings.show());
		},
		
		settingsClose: function()
		{
			mainStage.removeChild(that.settings.close());
			that.settings.destroy();
			that.settings = null;
		},
		
		sideShow: function()
		{
			that.side = Side(that);
			that.side.create();
			mainStage.addChild(that.side.show());
		},
		
		sideClose: function()
		{
			that.initializationGame();
			mainStage.removeChild(that.side.close());
			that.side.destroy();
                        that.side = that.menu = that.settings = null;
			that.mapShow();
		},
		
		initializationGame: function()
		{
			that.initialization = null;
			that.initialization = Initialization(that.assets.getAsset("planetTextures"), that.assets.getAsset("heroesTextures"), that.assets.getAsset("personagesJson"), that.assets.getAsset("planetsJson"), that.assets.getAsset("fieldLevelsJson"), that.config.side);
			that.initialization.initGame();
		},
		
		mapShow: function()
		{
			that.map = Map(that);
			that.map.create();
			mainStage.addChild(that.map.show());
		},
		
		mapClose: function()
		{
			mainStage.removeChild(that.map.close());
			that.map.destroy();
			that.map = null;
		},
		
		backmenuShow: function()
		{
			that.backmenu = Backmenu(that);
			that.backmenu.create();
			mainStage.addChild(that.backmenu.show());
		},
		
		backmenuClose: function(back)
		{
			mainStage.removeChild(that.backmenu.close());
			that.backmenu.destroy();
			that.backmenu = null;
			if(back === true)
			{
				that.config.side = "side_none";
				that.mapClose();
				that.menuShow();
			}
		},
		
		commandShow: function()
		{
			that.mapClose();
			that.command = Command(that);
			that.command.create();
			mainStage.addChild(that.command.show());
		},
		
		commandClose: function()
		{
			mainStage.removeChild(that.command.close());
			that.command.destroy();
			that.command = null;
			that.mapShow();
		},
		
		messageShow: function(titleText, messageText)
		{
			that.message = Message(that);
			that.message.create(titleText, messageText);
			mainStage.addChild(that.message.show());
		},
		
		messageClose: function()
		{
			mainStage.removeChild(that.message.close());
			that.message.destroy();
			that.message = null;
		},
		
		startbattleShow: function(planetUserTargetID, planetAITargetID)
		{
			that.startbattle = StartBattle(that);
			that.startbattle.create(planetUserTargetID, planetAITargetID);
			mainStage.addChild(that.startbattle.show());
		},
		
		startbattleClose: function()
		{
			mainStage.removeChild(that.startbattle.close());
			that.startbattle.destroy();
			that.startbattle = null;
		},
		
		timerShow: function()
		{
			that.timer = Timer(that);
			that.timer.create();
			mainStage.addChild(that.timer.show());
		},
		
		timerClose: function()
		{
			mainStage.removeChild(that.timer.close());
			that.timer.destroy();
			that.timer = null;
		},
		
		matchShow: function(levelJSON)
		{
			that.match = Match3(that);
			that.match.createMatchField(levelJSON);
			mainStage.addChild(that.match.show());
		},
		
		matchClose: function()
		{
			mainStage.removeChild(that.match.close());
			that.match.destroy();
			that.match = null;
		},
		
		levelShow: function(planetID, intercept)
		{
			that.level = Level(that);
			that.level.levelCreate(planetID, intercept);
			mainStage.addChild(that.level.show());
			that.level.levelFieldCreate();
			that.timerShow();
		},
		
		levelClose: function()
		{
			that.timerClose();
                        that.matchClose();
                        mainStage.removeChild(that.level.close());
			that.level.destroy();
			that.level = null;
		},
                
                victoryShow: function(planetID, intercept)
                {
                        that.victory = Victory(that);
			that.victory.create(planetID, intercept);
			mainStage.addChild(that.victory.show());
                },
                
                victoryClose: function()
                {
                        mainStage.removeChild(that.victory.close());
			that.victory.destroy();
			that.victory = null;
                        that.levelClose();
                        that.mapShow();
                }
		
	};
	return that;
};



/* == END FILE ========================================================== */

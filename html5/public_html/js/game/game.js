
/* == START FILE ========================================================= */

var Game = function(mainStage)
{
	var that = {
		config: {music:true, sound:true, language:"rus", side: "side_none", MAIN_WIDTH:860, MAIN_HEIGH:730, stopAI: false},
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
                endGame: null,

		vkInvite: function()
		{
                    VK.callMethod("showInviteBox");
		},
                
                vkWallPost: function(planetID, intercept, personage)
                {
                    /*
                    if(intercept === false)
                    {
                        VK.api("wall.post", {message:'Star Wars Heroes. \nЯ победил в битве на планете ' + that.initialization.planets[planetID].name + '\n Набрал ' + that.initialization.userlTotalPointsPlayerLevel + ' очков в миссии. \nПолучил +3 очка опыта и нового союзника ' + personage + '.\nПрисоединяйтесь к игре https://vk.com/app5170657', attachments : 'photo-62618339_398688727'}); 
                    }else{
                        VK.api("wall.post", {message:'Star Wars Heroes. \nЯ победил соперника на планете ' + that.initialization.planets[planetID].name + '\n Набрал ' + that.initialization.userlTotalPointsPlayerLevel + ' очков в миссии и получил +3 очка опыта.\nПрисоединяйтесь к игре https://vk.com/app5170657', attachments : 'photo-62618339_398688727'}); 
                    }
                    */
                },
                
                vkWallPostEndGame: function(text)
                {
                    //VK.api("wall.post", {message: text + '.\nПрисоединяйтесь к игре https://vk.com/app5170657', attachments : 'photo-62618339_398688727'}); 
                },
		
		loadAssets: function()
		{
			that.assets = Preloader(that);
			that.assets.load();
			mainStage.addChild(that.assets.show());
		},
		
		loadAssetsComplete: function()
		{
                        mainStage.removeChild(that.assets.close());
			that.menuShow();
		},
		
		menuShow: function()
		{
                        that.sound = Sound(that);
                        that.sound.soundPlayStarWarsThemeSong();
                        
                        that.menu = Menu(that);
			that.menu.create();
			mainStage.addChild(that.menu.show());
		},
		
		menuStartGame: function()
		{
                        mainStage.removeChild(that.menu.close());
			that.menu.destroy();
			that.endGame = that.timer = that.match = that.initialization = that.menu = that.backmenu = that.settings = that.message = that.side = that.command = that.startbattle = that.level = that.victory = that.lost = null;
                        
			that.sideShow();
		},
		
		settingsShow: function(location)
		{
                        that.sound.soundPlayStarWarsWindowOpen();
                    
			that.settings = Settings(that, location);
			that.settings.create();
			mainStage.addChild(that.settings.show());
		},
		
		settingsClose: function()
		{
                        that.sound.soundPlayStarWarsWindowClose();
                        
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
                        that.sound.soundPlayStarWarsThemeSong();
                        
                        that.map = Map(that);
			that.map.create();
			mainStage.addChild(that.map.show());
		},
		
		mapClose: function()
		{
			mainStage.removeChild(that.map.close());
			that.map.destroy();
			that.map = that.settings = that.backmenu = that.message = that.startbattle = that.command = that.side = that.menu = null;
		},
		
		backmenuShow: function()
		{
                        that.sound.soundPlayStarWarsWindowOpen();
                        
			that.backmenu = Backmenu(that);
			that.backmenu.create();
			mainStage.addChild(that.backmenu.show());
		},
		
		backmenuClose: function(back)
		{
                        that.sound.soundPlayStarWarsWindowClose();
                        
			mainStage.removeChild(that.backmenu.close());
			that.backmenu.destroy();
			that.backmenu = null;
			if(back === true)
			{
				that.config.side = "side_none";
				if(that.map !== null) that.mapClose();
                                if(that.level !== null) that.levelClose();
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
                        that.sound.soundPlayStarWarsWindowOpen();
                        
			that.message = Message(that);
			that.message.create(titleText, messageText);
			mainStage.addChild(that.message.show());
		},
		
		messageClose: function()
		{
                        that.sound.soundPlayStarWarsWindowClose();
                        
			mainStage.removeChild(that.message.close());
			that.message.destroy();
			that.message = null;
		},
		
		startbattleShow: function(planetUserTargetID, planetAITargetID)
		{
                        that.sound.soundPlayStarWarsWindowOpen();
                        
			that.startbattle = StartBattle(that);
			that.startbattle.create(planetUserTargetID, planetAITargetID);
			mainStage.addChild(that.startbattle.show());
		},
		
		startbattleClose: function()
		{
                        that.sound.soundPlayStarWarsWindowClose();
                        
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
			that.timer = that.match = that.level = null;
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
		
		levelShow: function(planetID, intercept, aiPlanetID)
		{
                        that.sound.soundPlayStarWarsBattle();
                        
			that.level = Level(that);
			that.level.levelCreate(planetID, intercept, aiPlanetID);
			mainStage.addChild(that.level.show());
			that.level.levelFieldCreate();
			that.timerShow();
		},
		
		levelClose: function()
		{
			mainStage.removeChild(that.level.close());
			that.level.destroy();
                        that.level = that.backmenu = that.settings = that.victory = that.lost =  null;
			//that.level = that.timer = that.match = that.settings = that.backmenu = that.victory = that.lost = that.side = that.menu = null;
		},
                
                victoryShow: function(planetID, intercept, aiPlanetID)
                {
                        that.sound.soundPlayStarWarsWindowOpen();
                        
                        that.victory = Victory(that);
			that.victory.create(planetID, intercept, aiPlanetID);
			mainStage.addChild(that.victory.show());
                },
                
                victoryClose: function()
                {
                        that.sound.soundPlayStarWarsWindowClose();
                        
                        mainStage.removeChild(that.victory.close());
			that.victory.destroy();
			that.victory = null;
                        that.levelClose();
                        that.mapShow();
                },
                
                lostShow: function(planetID, intercept, aiPlanetID)
                {
                    that.sound.soundPlayStarWarsWindowOpen();
                    
                    that.lost = Lost(that);
                    that.lost.create(planetID, intercept, aiPlanetID);
                    mainStage.addChild(that.lost.show());
                },
                
                lostClose: function()
                {
                    that.sound.soundPlayStarWarsWindowClose();
                    
                    mainStage.removeChild(that.lost.close());
                    that.lost.destroy();
                    that.lost = null;
                    that.levelClose();
                    that.mapShow();
                },
                
                endGameShow: function(status)
                {
                    if(status === "win") that.sound.soundPlayStarWarsThemeSong();
                    if(status === "lost")
                    {
                        that.sound.soundStopStarWarsThemeSong();
                        that.sound.soundStopStarWarsBattle();
                        that.sound.soundPlayStarWarsThemeEnd();
                    }
                    
                    if(that.lost !== null)
                    {
                        mainStage.removeChild(that.lost.close());
                        that.lost.destroy();
                        that.lost = null;
                    }
                    
                    if(that.victory !== null)
                    {
                        mainStage.removeChild(that.victory.close());
                        that.victory.destroy();
                        that.victory = null;
                    }
                
                    if(that.level !== null)
                    {
                        mainStage.removeChild(that.level.close());
			that.level.destroy();
                        that.level = null;
                    }
                    if(that.map !== null)
                    {
                        mainStage.removeChild(that.map.close());
			that.map.destroy();
                        that.map = null;
                    }
                    
                    that.endGame = EndGame(that);
                    that.endGame.create(status);
                    mainStage.addChild(that.endGame.show());
                },
                
                endGameClose: function()
                {
                    that.sound.soundStopStarWarsThemeEnd();
                    
                    mainStage.removeChild(that.endGame.close());
                    that.endGame.destroy();
                    that.endGame = that.timer = that.match = that.initialization = that.menu = that.backmenu = that.settings = that.message = that.side = that.command = that.startbattle = that.level = that.victory = that.lost = null;
                    that.config.side = "side_none";
                    that.config.stopAI = false;
                    that.menuShow();
                }
		
        };
        return that;
};



/* == END FILE ========================================================== */

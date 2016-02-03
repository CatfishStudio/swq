
/* == START FILE ========================================================= */

var Sound = function(parent)
{
	var that = {
                indexBattleMusic: 1,
                themeSongPlay: false,
                themeBattlePlay: false,
                
		soundPlayStarWarsThemeSong: function()
		{
                        if(that.themeBattlePlay === true) that.soundStopStarWarsBattle();
                        
                        if(parent.config.music === true && that.themeSongPlay === false)
                        {
                            createjs.Sound.play("StarWarsThemeSong", {loop:-1});
                            that.themeSongPlay = true;
                        }
		},
		
		soundStopStarWarsThemeSong: function()
		{
			createjs.Sound.stop("StarWarsThemeSong");
                        that.themeSongPlay = false;
		},
                
                soundPlayStarWarsBattle: function()
		{
                        if(that.themeSongPlay === true) that.soundStopStarWarsThemeSong();
                        
			if(parent.config.music === true && that.themeBattlePlay === false)
                        {
                            if(that.indexBattleMusic === 1)
                            {
                                createjs.Sound.play("StarWarsBattle2", {loop:-1});
                                that.indexBattleMusic = 2;
                                that.themeBattlePlay = true;
                            }else{
                                createjs.Sound.play("StarWarsBattle1", {loop:-1});
                                that.indexBattleMusic = 1;
                                that.themeBattlePlay = true;
                            }
                        }
		},
		
		soundStopStarWarsBattle: function()
		{
                        if(that.indexBattleMusic === 1)
                        {
                            createjs.Sound.stop("StarWarsBattle1");
                            that.themeBattlePlay = false;
                        }else{
                            createjs.Sound.stop("StarWarsBattle2");
                            that.themeBattlePlay = false;
                        }
			
		},
                
                soundPlayStarWarsThemeEnd: function()
		{
                        if(parent.config.music === true)
                        {
                            createjs.Sound.play("StarWarsEnd", {loop:-1});
                        }
		},
                
                soundStopStarWarsThemeEnd: function()
		{
			createjs.Sound.stop("StarWarsEnd");
                },
                
                
                soundPlayStarWarsButtonClick: function()
                {
                        if(parent.config.sound === true) createjs.Sound.play("StarWarsButtonClick");
                },
                
                soundPlayStarWarsWindowOpen: function()
                {
                        if(parent.config.sound === true) createjs.Sound.play("StarWarsWindowOpen");
                },
                
                soundPlayStarWarsWindowClose: function()
                {
                        if(parent.config.sound === true) createjs.Sound.play("StarWarsWindowClose");
                },
                
                soundPlayStarWarsHit1: function()
                {
                        if(parent.config.sound === true) createjs.Sound.play("StarWarsHit1");
                },
                
                 soundPlayStarWarsHit2: function()
                {
                        if(parent.config.sound === true) createjs.Sound.play("StarWarsHit2");
                },
                
                 soundPlayStarWarsHit3: function()
                {
                        if(parent.config.sound === true) createjs.Sound.play("StarWarsHit3");
                },
                
                 soundPlayStarWarsHit4: function()
                {
                        if(parent.config.sound === true) createjs.Sound.play("StarWarsHit4");
                },
                
                 soundPlayStarWarsHit5: function()
                {
                        if(parent.config.sound === true) createjs.Sound.play("StarWarsHit5");
                }
                
		
	};
	return that;
};


/* == END FILE ========================================================== */

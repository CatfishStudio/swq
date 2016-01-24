
/* == START FILE ========================================================= */

var Sound = function(parent)
{
	var that = {
		soundPlayStarWarsThemeSong: function()
		{
			if(parent.config.music === true) createjs.Sound.play("StarWarsThemeSong", {loop:-1});
		},
		
		soundStopStarWarsThemeSong: function()
		{
			createjs.Sound.stop("StarWarsThemeSong");
		}
		
	};
	return that;
};


/* == END FILE ========================================================== */


/*
function soundload () 
{
    createjs.Sound.on("fileload", createjs.proxy(this.soundloadComplete, (this)));
    createjs.Sound.registerSound("assets/music/StarWarsThemeSong.mp3", "StarWarsThemeSong");
    console.log("SOUND LOAD!");
}

function soundloadComplete(event) 
{
     var instance = createjs.Sound.play("StarWarsThemeSong");  // play using id.  Could also use full source path or event.src.
     //instance.on("complete", createjs.proxy(this.handleComplete, this));
     //instance.volume = 0.5;
     console.log("SOUND OK!");
 }
 */

function soundPlayStarWarsThemeSong()
{
    if(music === true) createjs.Sound.play("StarWarsThemeSong");
}

function soundStopStarWarsThemeSong()
{
    createjs.Sound.stop("StarWarsThemeSong");
}
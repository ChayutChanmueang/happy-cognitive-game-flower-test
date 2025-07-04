ig.module( 
	'game.main' 
)
.requires(
	'impact.game',
	'impact.font',
	//'impact.debug.debug',
	//Load Plugins
	'plugins.director.director',
	'plugins.tween',
	'game.game-strings.string',
	//'plugins.fontfaceobserver',
	'game.Entity.settings',
	//Load Levels
	'game.levels.test',
	//Etc.
	'game.Entity.pointer',
)
.defines(function(){

MyGame = ig.Game.extend({
	
	// Load a font
	font: new ig.Font( 'media/04b03.font.png' ),
	
	
	init: function() {
		// Initialize your game here; bind keys etc.

		//Initialised Director Plugin
		
		this.director = new ig.Director(this,
			[LevelTest]
		)

		this.director.firstLevel();
		//ig.game.pointer = ig.game.spawnEntity(EntityPointer,0,0);
		ig.game.director = this.director;
		this.currentAspectRatio = window.innerWidth/window.innerHeight;
		this.oldAspectRatio = this.currentAspectRatio;
	},
	
	update: function() {
		// Update all entities and backgroundMaps
		this.parent();
		
		// Add your own, additional update code here

		console.log(this.currentAspectRatio);
		console.log(this.oldAspectRatio);
		console.log(window.innerWidth);
		console.log(window.innerHeight);
		if(Math.abs((window.innerWidth/window.innerHeight) - this.oldAspectRatio) > 0.2){
			resize();
			console.log("major aspect change");
			this.oldAspectRatio = window.innerWidth/window.innerHeight;
		}
	},
	
	draw: function() {
		// Draw all entities and backgroundMaps
		this.parent();
		
		
		// Add your own drawing code here
		//var x = ig.system.width/2,
		//	y = ig.system.height/2;
		
		//this.font.draw( 'It Not Works!', x, y, ig.Font.ALIGN.CENTER );
	}
});


// Start the Game with 60fps, a resolution of 320x240, scaled
// up by a factor of 2

//Handle Resize for Responsive
function resize(){

	//Get Current Window Size
	var scaleX = (window.innerWidth / _GAMESETTINGS.screenResolutionWidth) / _GAMESETTINGS.screenScale;
	var scaleY = (window.innerHeight / _GAMESETTINGS.screenResolutionHeight) / _GAMESETTINGS.screenScale;

	//Round down to int scale to avoid blur
	scaleX = Math.floor(scaleX*100)/100;
	if(scaleX < 1) scaleX = 1;
	scaleY = Math.floor(scaleY*100)/100;
	if(scaleY < 1) scaleY = 1;
	var minScale = Math.min(scaleX,scaleY);

	_GAMESETTINGS.midScreen.x = (ig.system.width/2);
	_GAMESETTINGS.midScreen.y = (ig.system.height/2);
	_GAMESETTINGS.screen.x = _GAMESETTINGS.midScreen.x - (_GAMESETTINGS.screenResolutionWidth/2);
	_GAMESETTINGS.screen.y = _GAMESETTINGS.midScreen.y - (_GAMESETTINGS.screenResolutionHeight/2);
	console.log("======");
	console.log(window.innerWidth);
	console.log(_GAMESETTINGS.screen.x);
	console.log(window.innerHeight);
	console.log(_GAMESETTINGS.screen.y);
	console.log("======");

	//Resize the system
	if(minScale < 1){
		ig.system.resize(_GAMESETTINGS.screenResolutionWidth * scaleX,_GAMESETTINGS.screenResolutionHeight * scaleY,minScale);
	}
	else{
		ig.system.resize(_GAMESETTINGS.screenResolutionWidth * scaleX,_GAMESETTINGS.screenResolutionHeight * scaleY,_GAMESETTINGS.screenScale);
	}
	//ig.system.resize(_GAMESETTINGS.screenResolutionWidth * scaleX,_GAMESETTINGS.screenResolutionHeight * scaleY,_GAMESETTINGS.screenScale);

	//Centering Canvas
	//const canvas = document.getElementById('canvas');
	//canvas.style.position = 'absolute';
	//canvas.style.left = ((window.innerWidth - canvas.offsetWidth) / 2) + 'px';
	//canvas.style.top = ((window.innerHeight - canvas.offsetHeight) / 2) + 'px';

	if(this.currentAspectRatio != window.innerWidth/window.innerHeight){
		this.oldAspectRatio = this.currentAspectRatio;
		this.currentAspectRatio = window.innerWidth/window.innerHeight;
	}

}

if(ig.ua.mobile){
	_GAMESETTINGS.screenScale = _GAMESETTINGS.defaultMobileScale;
}

ig.main( '#canvas', MyGame, _GAMESETTINGS.FPS, _GAMESETTINGS.screenResolutionWidth, _GAMESETTINGS.screenResolutionHeight, _GAMESETTINGS.screenScale );

//Listen to resize events
window.addEventListener('resize',resize);
window.addEventListener('orientationchange',resize);
window.addEventListener('load',resize);
document.addEventListener('fullscreenchange', resize);

});

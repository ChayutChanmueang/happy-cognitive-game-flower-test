ig.module( 
	'game.main' 
)
.requires(
	'impact.game',
	'impact.font',
	//'impact.debug.debug',
	//Load Plugins
	'plugins.director.director',
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
	},
	
	update: function() {
		// Update all entities and backgroundMaps
		this.parent();
		
		// Add your own, additional update code here
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

//Gameplay Screen Setting
var fps = 60;
var screenResolutionWidth = 430;
var screenResolutionHeight = 932;
var screenScale = 1;
ig.main( '#canvas', MyGame, fps, screenResolutionWidth, screenResolutionHeight, screenScale );

});

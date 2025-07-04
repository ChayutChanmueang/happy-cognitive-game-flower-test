ig.module(
	'impact.loader'
)
.requires(
	'impact.image',
	'impact.font',
	'impact.sound'
)
.defines(function(){ "use strict";

ig.Loader = ig.Class.extend({
	resources: [],
	
	gameClass: null,
	status: 0,
	done: false,
	
	_unloaded: [],
	_drawStatus: 0,
	_intervalId: 0,
	_loadCallbackBound: null,
	
	
	init: function( gameClass, resources ) {
		this.gameClass = gameClass;
		this.resources = resources;
		this.gameIsLoaded = false;
		this._loadCallbackBound = this._loadCallback.bind(this);
		
		for( var i = 0; i < this.resources.length; i++ ) {
			this._unloaded.push( this.resources[i].path );
		}
		//Initialised Fonts
		//var canvas = document.querySelector('canvas');
		//var NotoSansThai = new FontFace('NotoSansThai','url(media/fonts/notosansthai.ttf)')

		//NotoSansThai.load().then(function(font){
		//	document.fonts.add(NotoSansThai);
		//})

		/*while(!this.gameIsLoaded){
			if(document.fonts.check('30px NotoSansThai') && this.done){
				this.gameIsLoaded = true;
				console.log("load game");
				ig.system.setGame( this.gameClass );
			}
		}*/
	},

	update:function(){
		console.log(this.gameIsLoaded);
		console.log(this.done);
		console.log(document.fonts.check('30px NotoSansThai'));
		if(!this.gameIsLoaded){
			if(document.fonts.check('30px NotoSansThai') && this.done){
				this.gameIsLoaded = true;
				console.log("load game");
				ig.system.setGame( this.gameClass );
			}
		}
	},
	
	
	load: function() {
		ig.system.clear( '#000' );
		
		if( !this.resources.length ) {
			this.end();
			return;
		}

		for( var i = 0; i < this.resources.length; i++ ) {
			this.loadResource( this.resources[i] );
		}
		this._intervalId = setInterval( this.draw.bind(this), 16 );
	},
	
	
	loadResource: function( res ) {
		res.load( this._loadCallbackBound );
	},
	
	
	end: function() {
		if( this.done) { return; }
		
		this.done = true;
		console.log("load game");
		ig.system.setGame( this.gameClass );
	},
	
	
	draw: function() {
		this._drawStatus += (this.status - this._drawStatus)/5;
		var s = ig.system.scale;
		var w = ig.system.width * 0.6;
		var h = ig.system.height * 0.1;
		var x = ig.system.width * 0.5-w/2;
		var y = ig.system.height * 0.5-h/2;
		
		ig.system.context.fillStyle = '#000';
		ig.system.context.fillRect( 0, 0, 480, 320 );
		
		ig.system.context.fillStyle = '#fff';
		ig.system.context.fillRect( x*s, y*s, w*s, h*s );
		
		ig.system.context.fillStyle = '#000';
		ig.system.context.fillRect( x*s+s, y*s+s, w*s-s-s, h*s-s-s );
		
		ig.system.context.fillStyle = '#fff';
		ig.system.context.fillRect( x*s, y*s, w*s*this._drawStatus, h*s );
	},
	
	
	_loadCallback: function( path, status ) {
		if( status ) {
			this._unloaded.erase( path );
		}
		else {
			throw( 'Failed to load resource: ' + path );
		}
		
		this.status = 1 - (this._unloaded.length / this.resources.length);
		if( this._unloaded.length == 0 ) { // all done?
			
			setTimeout( this.end.bind(this), 250 );
		}
	}
});

});
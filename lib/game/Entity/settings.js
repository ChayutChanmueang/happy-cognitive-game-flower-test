var _GAMESETTINGS = {
	FPS: 60,
	screenResolutionWidth: 430,
	screenResolutionHeight: 932,
	screenScale:1,
    defaultDesktopScale:1,
    defaultMobileScale:2,

    screen:{x:0,y:0},
    midScreen:{x:0,y:0},
}

ig.module('game.Entity.settings')
    .requires(
        'impact.entity'
    )
    .defines(function () {

    });
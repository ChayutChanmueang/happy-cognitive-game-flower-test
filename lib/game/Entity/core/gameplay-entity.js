ig.module('game.Entity.core.gameplay-entity')
.requires(
    'impact.entity'
)
.defines(function(){
    EntityGameplayElement = ig.Entity.extend({
        init:function(x,y,settings){
            this.parent(x,y,settings);
            console.log(this.pos);
            this.setupResponsivePos();
        },
        update:function(){
            this.parent();
            this.updatePosition();
        },
        setupResponsivePos:function(){
            _GAMESETTINGS.screen.x = (ig.system.width/2) - (_GAMESETTINGS.screenResolutionWidth/2);
            _GAMESETTINGS.screen.y = (ig.system.height/2) - (_GAMESETTINGS.screenResolutionHeight/2);

            this.responsivePos = {x:0,y:0};
            
            this.responsivePos.x = this.pos.x - _GAMESETTINGS.screen.x;
            this.responsivePos.y = this.pos.y - _GAMESETTINGS.screen.y;

            console.log(this.responsivePos.x);
            console.log(this.responsivePos.y);
        },
        updatePosition:function(){
            this.pos.x = _GAMESETTINGS.screen.x + this.responsivePos.x;
            this.pos.y = _GAMESETTINGS.screen.y + this.responsivePos.y;
        }
    })
})
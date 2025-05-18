ig.module('game.Entity.ui.restart-button')
.requires(
    'game.Entity.ui.button'
)
.defines(function(){
    EntityRestartButton = EntityButton.extend({
        zIndex:101,
        init:function(x,y,settings){
            this.parent(x,y,settings);
        },
        onMouseRelease:function(){
            ig.game.director.reloadLevel();
        },
        draw:function(){
            this.parent();

            var ctx = ig.system.context;

            ctx.fillStyle = "white";
            ctx.font = "30px serif";
            ctx.fillText("Play Again", this.pos.x + (this.size.x/2) - 70, this.pos.y + (this.size.y/2) + 10);
        }
    })
})
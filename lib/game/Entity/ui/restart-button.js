ig.module('game.Entity.ui.restart-button')
.requires(
    'game.Entity.ui.button'
)
.defines(function(){
    EntityRestartButton = EntityButton.extend({
        zIndex:101,
        init:function(x,y,settings){
            this.parent(x,y,settings);
            this.text = _TEXTS.TH;
        },
        onMouseRelease:function(){
            ig.game.director.reloadLevel();
        },
        draw:function(){
            this.parent();

            var ctx = ig.system.context;

            ctx.fillStyle = "white";
            ctx.font = "30px NotoSansThai";
            ctx.textAlign = "center";
            ctx.fillText(this.text.PlayAgain, this.pos.x + (this.size.x/2), this.pos.y + (this.size.y/2) + 10);
        }
    })
})
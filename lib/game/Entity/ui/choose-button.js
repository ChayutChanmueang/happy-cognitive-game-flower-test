ig.module('game.Entity.ui.choose-button')
.requires(
    'game.Entity.ui.button'
)
.defines(function(){
    EntityChooseButton = EntityButton.extend({
        init:function(x,y,settings){
            this.parent(x,y,settings);
            this.value = settings.value;
        },
        onMouseRelease:function(){
            if(this.value == ig.gameplay.totalPotWithFlower){
                ig.gameplay.onCorrectAnswer();
            }
            else{
                ig.gameplay.onWrongAnswer();
            }
        },
        draw:function(){
            this.parent();

            var ctx = ig.system.context;

            ctx.fillStyle = "white";
            ctx.font = "30px serif";
            ctx.fillText(this.value, this.drawPos.x + (this.size.x/2) - 7, this.drawPos.y + (this.size.y/2) + 15);
        }
    })
})
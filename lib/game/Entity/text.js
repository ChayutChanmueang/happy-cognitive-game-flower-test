ig.module('game.Entity.text')
.requires(
    'impact.entity',
    'game.Entity.core.ui-entity',
)
.defines(function(){
    EntityText = EntityUIElement.extend({
        init:function(x,y,settings){
            this.parent(x,y,settings);
            this.textValue = settings.text;
            this.textSize = settings.size
        },
        update:function(){
            this.parent();
        },
        draw:function(){
            this.parent();
            var ctx = ig.system.context;

            ctx.fillStyle = "black";
            ctx.font = this.textSize+"px serif";
            ctx.fillText(this.textValue, this.drawPos.x, this.drawPos.y);
        }
    })
})
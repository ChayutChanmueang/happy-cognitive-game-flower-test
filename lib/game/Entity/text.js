ig.module('game.Entity.text')
.requires(
    'impact.entity',
)
.defines(function(){
    EntityText = ig.Entity.extend({
        init:function(x,y,settings){
            this.parent(x,y,settings);
            this.textValue = settings.text;
            this.textSize = settings.size
        },
        update:function(){
            this.parent();
        },
        draw:function(){
            var ctx = ig.system.context;

            ctx.fillStyle = "black";
            ctx.font = this.textSize+"px serif";
            ctx.fillText(this.textValue, this.pos.x, this.pos.y);
        }
    })
})
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
            this.textAlignment = settings.alignment;
        },
        update:function(){
            this.parent();
        },
        draw:function(){
            this.parent();
            var ctx = ig.system.context;

            ctx.fillStyle = "black";
            ctx.font = this.textSize * _GAMESETTINGS.screenScale +"px serif";
            ctx.textAlign = this.textAlignment;
            ctx.fillText(this.textValue, this.drawPos.x * _GAMESETTINGS.screenScale, this.drawPos.y * _GAMESETTINGS.screenScale);
        }
    })
})
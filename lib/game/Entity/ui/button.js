ig.module('game.Entity.ui.button')
.requires(
    'impact.entity',
    'game.Entity.core.ui-entity',
)
.defines(function(){
    EntityButton = EntityUIElement.extend({
        zIndex:1,
        size:{x:200,y:50},
        collides:ig.Entity.COLLIDES.NEVER,
		type:ig.Entity.TYPE.A,
        enable:true,
        isMouseOver:false,
        init:function(x,y,settings){
            this.parent(x,y,settings);
        },
        update:function(){
            this.parent();
            this.updatePos();
            if(ig.input.pressed('click')){
                if(this.isMouseOver && this.enable){
                    this.onMouseClick();
                }
            }
            else if(ig.input.released('click')){
                if(this.isMouseOver && this.enable){
                    this.onMouseRelease();
                }
            }
        },
        updatePos:function(){
            this.pos.x = this.drawPos.x;
            this.pos.y = this.drawPos.y;
        },
        over:function(){
            console.log("Mouse Over");
            if(this.enable){
                this.onMouseOver();
            }
        },
        leave:function(){
            console.log("Mouse Leave");
            if(this.enable){
                this.onMouseLeave();
            }
        },
        onMouseOver:function(){
            this.isMouseOver = true;
        },
        onMouseLeave:function(){
            this.isMouseOver = false;
        },
        onMouseClick:function(){

        },
        onMouseRelease:function(){

        },
        draw:function(){
            this.parent();
            var ctx = ig.system.context;

            ctx.fillStyle = "black";
            ctx.fillRect(this.drawPos.x * _GAMESETTINGS.screenScale,this.drawPos.y * _GAMESETTINGS.screenScale,this.size.x * _GAMESETTINGS.screenScale,this.size.y * _GAMESETTINGS.screenScale);

            /*ctx.fillStyle = "white";
            ctx.font = "50px serif";
            ctx.fillText("Hello world", this.pos.x, this.pos.y);*/
        }
    })
})
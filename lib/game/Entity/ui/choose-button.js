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
            ig.gameplay.choicesIsShown = false;
            if(!ig.game.tutorialShown){
                if(this.value == ig.gameplay.totalPotWithFlower){
                    ig.gameplay.onCorrectAnswer();
                }
                else{
                    ig.gameplay.onWrongAnswer();
                }
            }
            else{
                switch(ig.game.tutorialState){
                    case 7 :
                        if(this.value == ig.gameplay.totalPotWithFlower){
                            ig.gameplay.onCorrectAnswer();
                            ig.game.tutorialState++;
                            this.tween(null, 1, {
                                onComplete: function () {
                                    ig.game.tutorialState++;
                                }.bind(this)
                            }).start();
                        }
                        break;
                }
            }
        },
        draw:function(){
            this.parent();

            var ctx = ig.system.context;

            ctx.fillStyle = "white";
            ctx.font = 30  * _GAMESETTINGS.screenScale + "px NotoSansThai";
            ctx.textAlign = "center";
            ctx.fillText(this.value, (this.drawPos.x + (this.size.x/2)) * _GAMESETTINGS.screenScale, (this.drawPos.y + (this.size.y/2) + 12) * _GAMESETTINGS.screenScale);
        }
    })
})
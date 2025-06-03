ig.module('game.Entity.ui.gameover-panel')
.requires(
    'impact.entity',
    'game.Entity.ui.restart-button',
)
.defines(function(){
    EntityGameoverPanel = ig.Entity.extend({
        zIndex:100,
        init:function(x,y,settings){
            this.parent(x,y,settings);
            this.right = settings.correctRound;
            this.wrong = settings.wrongRound;
            this.restartButton = ig.game.spawnEntity(EntityRestartButton,(ig.system.width/2) - 100,(ig.system.height/2) + 150,{anchor:2});

            ig.game.sortEntitiesDeferred();
        },
        update:function(){

        },
        draw:function(){
            var ctx = ig.system.context;

            //Draw BG
            ctx.fillStyle = "#9da2ab";
            ctx.save();
            ctx.globalAlpha = 0.85;
            ctx.fillRect(0,0,ig.system.width,ig.system.height);
            ctx.restore();

            ctx.fillStyle = "black";
            ctx.font = "40px serif";
            ctx.textAlign = "center";
            ctx.fillText("Gameover", (ig.system.width/2), 100);
            ctx.fillText("Correct Answer : " + this.right, (ig.system.width/2), 300);
            ctx.fillText("Wrong Answer : " + this.wrong, (ig.system.width/2), 350);
        }
    })
})
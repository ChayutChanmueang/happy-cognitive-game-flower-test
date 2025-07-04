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
            this.text = _TEXTS.TH;

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
            ctx.fillRect(0,0,ig.system.width * _GAMESETTINGS.screenScale,ig.system.height * _GAMESETTINGS.screenScale);
            ctx.restore();

            ctx.fillStyle = "black";
            ctx.font = "40px NotoSansThai";
            ctx.textAlign = "center";
            ctx.fillText(this.text.Gameover, (ig.system.width/2)* _GAMESETTINGS.screenScale, 100 * _GAMESETTINGS.screenScale);
            ctx.fillText(this.text.CorrectAnswer + this.right, (ig.system.width/2)* _GAMESETTINGS.screenScale, 300 * _GAMESETTINGS.screenScale);
            ctx.fillText(this.text.WrongAnswer + this.wrong, (ig.system.width/2)* _GAMESETTINGS.screenScale, 350 * _GAMESETTINGS.screenScale);
        }
    })
})
ig.module('game.Entity.flower-pot')
.requires(
    'game.Entity.core.gameplay-entity'
)
.defines(function(){
    EntityFlowerPot = EntityGameplayElement.extend({
        zIndex:1,
        size:{x:140,y:228},
        potSprite: new ig.Image('media/graphics/sprites/gameplay/pot.png'),
        flowerSprite: new ig.Image('media/graphics/sprites/gameplay/flower.png'),
        haveFlower:false,
        showFlower:false,
        init:function(x,y,settings){
            this.parent(x,y,settings);
            this.offsetY = 164;
        },
        update:function(){
            this.parent();
        },
        randomHaveFlower:function(){
            this.showFlower = false;
            var randomChance = Math.random();
            //console.log(randomChance);

            if(randomChance > 0.5){
                this.haveFlower = true;
                ig.gameplay.potWithFlower++;
            }
            else{
                this.haveFlower = false;
            }
        },
        displayFlower:function(){
            if(this.haveFlower){
                this.showFlower = true;
                this.offsetY = 164;
                this.tween({offsetY:0},1).start();
            }
            else{
                this.showFlower = false;
            }
        },
        hideFlower:function(){
            if(this.haveFlower){
                this.showFlower = true;
                this.offsetY = 0;
                this.tween({offsetY:164},1,{
                    onComplete: function (){
                        this.showFlower = false;
                        if(ig.gameplay.randomRound >= 4 && !ig.gameplay.choicesIsShown){
                            ig.gameplay.showChoices();
                        }
                    }.bind(this)
                }).start();
            }
        },
        draw:function(){
            this.parent();
            if(this.showFlower){
                var ctx = ig.system.context;
                this.flowerSprite.draw(_GAMESETTINGS.screen.x + this.responsivePos.x + 6 ,_GAMESETTINGS.screen.y + this.responsivePos.y + this.offsetY);
                ctx.fillStyle = "white";
                ctx.fillRect(_GAMESETTINGS.screen.x + this.responsivePos.x ,_GAMESETTINGS.screen.y + this.responsivePos.y + 164 + 64,140,164);
            }
            this.potSprite.draw(_GAMESETTINGS.screen.x + this.responsivePos.x ,_GAMESETTINGS.screen.y + this.responsivePos.y + 164);
        }
    })
})
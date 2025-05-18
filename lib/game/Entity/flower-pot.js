ig.module('game.Entity.flower-pot')
.requires(
    'impact.entity'
)
.defines(function(){
    EntityFlowerPot = ig.Entity.extend({
        zIndex:1,
        size:{x:140,y:228},
        potSprite: new ig.Image('media/graphics/sprites/gameplay/pot.png'),
        flowerSprite: new ig.Image('media/graphics/sprites/gameplay/flower.png'),
        haveFlower:false,
        showFlower:false,
        init:function(x,y,settings){
            this.parent(x,y,settings);
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
            }
            else{
                this.showFlower = false;
            }
        },
        draw:function(){
            this.parent();
            if(this.showFlower)
            this.flowerSprite.draw(this.pos.x + 6,this.pos.y);
            this.potSprite.draw(this.pos.x,this.pos.y + 164);
        }
    })
})
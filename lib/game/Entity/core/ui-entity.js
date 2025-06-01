ig.module('game.Entity.core.ui-entity')
.requires(
    'impact.entity'
)
.defines(function(){
    EntityUIElement = ig.Entity.extend({
        init:function(x,y,settings){
            this.parent(x,y,settings);
            //Anchor Num Guide
            //-------------
            //I-7-I-8-I-9-I
            //-------------
            //I-4-I-5-I-6-I
            //-------------
            //I-1-I-2-I-3-I
            //-------------
            //Anchor Position Num based on Numpad number position (ex. 7 = Upper Left)
            this.anchor = settings.anchor;
            this.offset = {x:0,y:0};
            this.drawPos = {x:0,y:0};
            this.setupOffsetPos();
        },
        setupOffsetPos:function(){
            switch(this.anchor){
                case 1 :    //Lower Left
                    this.offset.x = this.pos.x;
                    this.offset.y = this.pos.y - ig.system.height;
                    break;
                case 2 :    //Lower Middle
                    this.offset.x = this.pos.x - (ig.system.width/2);
                    this.offset.y = this.pos.y - ig.system.height;
                    break;
                case 3 :    //Lower Right
                    this.offset.x = this.pos.x - ig.system.width;
                    this.offset.y = this.pos.y - ig.system.height;
                    break;
                case 4 :    //Middle Left
                    this.offset.x = this.pos.x;
                    this.offset.y = this.pos.y - (ig.system.height/2);
                    break;
                case 5 :    //Middle of Screen
                    this.offset.x = this.pos.x - (ig.system.width/2);
                    this.offset.y = this.pos.y - (ig.system.height/2);
                    break;
                case 6 :    //Middle Right
                    this.offset.x = this.pos.x - ig.system.width;
                    this.offset.y = this.pos.y - (ig.system.height/2);
                    break;
                case 7 :    //Upper Left
                    this.offset.x = this.pos.x;
                    this.offset.y = this.pos.y;
                    break;
                case 8 :    //Upper Middle
                    this.offset.x = this.pos.x - (ig.system.width/2);
                    this.offset.y = this.pos.y;
                    break;
                case 9 :    //Upper Right
                    this.offset.x = this.pos.x - ig.system.width;
                    this.offset.y = this.pos.y;
                    break;
            }
        },
        update:function(){
            this.parent();
        },
        draw:function(){
            this.parent();
            this.updateDrawPos();
        },
        updateDrawPos:function(){
            switch(this.anchor){
                case 1 :    //Lower Left
                    this.drawPos.x = this.offset.x;
                    this.drawPos.y = ig.system.height + this.offset.y;
                    break;
                case 2 :    //Lower Middle
                    this.drawPos.x = (ig.system.width/2) + this.offset.x;
                    this.drawPos.y = ig.system.height + this.offset.y;
                    break;
                case 3 :    //Lower Right
                    this.drawPos.x = ig.system.width + this.offset.x;
                    this.drawPos.y = ig.system.height + this.offset.y;
                    break;
                case 4 :    //Middle Left
                    this.drawPos.x = this.offset.x;
                    this.drawPos.y = (ig.system.height/2) + this.offset.y;
                    break;
                case 5 :    //Middle of Screen
                    this.drawPos.x = (ig.system.width/2) + this.offset.x;
                    this.drawPos.y = (ig.system.height/2) + this.offset.y;
                    break;
                case 6 :    //Middle Right
                    this.drawPos.x = ig.system.width + this.offset.x;
                    this.drawPos.y = (ig.system.height/2) + this.offset.y;
                    break;
                case 7 :    //Upper Left
                    this.drawPos.x = this.offset.x;
                    this.drawPos.y = this.offset.y;
                    break;
                case 8 :    //Upper Middle
                    this.drawPos.x = (ig.system.width/2) + this.offset.x;
                    this.drawPos.y = this.offset.y;
                    break;
                case 9 :    //Upper Right
                    this.drawPos.x = ig.system.width + this.offset.x;
                    this.drawPos.y = this.offset.y;
                    break;
            }
        },
    })
})
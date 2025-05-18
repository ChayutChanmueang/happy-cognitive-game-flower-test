ig.module('game.Entity.pointer')
.requires(
    'impact.entity',
)
.defines(function(){
    EntityPointer = ig.Entity.extend({
        checkAgainst: ig.Entity.TYPE.BOTH,
        
        size: {x:1,y:1},

        isPressed: false,
        isReleased: false,
        isHovering: false,

        hoveringItem: null,
        objectList: [],

        init:function(x,y,settings){
            this.parent(x,y,settings);
            ig.input.initMouse();
            ig.input.bind(ig.KEY.MOUSE1,'click');
        },
        check: function(other){
            this.objectList.push(other);
        },
        setPos:function(){
            this.pos.x = ig.input.mouse.x;
            this.pos.y = ig.input.mouse.y;
            //console.log(ig.input.mouse.x);
            //console.log(ig.input.mouse.y);
        },
        update:function(){
            this.parent();
            this.setPos();

            var targetObject = null;
            var topIndex = -1;

            //Find top object
            for(var i = 0; i < this.objectList.length ; i++){
                if(this.objectList[i].zIndex > topIndex){
                    topIndex = this.objectList[i].zIndex;
                    targetObject = this.objectList[i];
                }
            }

            if(targetObject != null){
                if(this.hoveringItem != null){
                    if(this.hoveringItem != targetObject){
                        if(typeof(this.hoveringItem.leave) == 'function'){
                            this.hoveringItem.leave();
                        }

                        if(typeof(targetObject.over) == 'function'){
                            targetObject.over();
                        }
                    }
                }
                else{
                    if(typeof(targetObject.over) == 'function'){
                        targetObject.over();
                    }
                }
                this.hoveringItem = targetObject;
                
                this.objectList = [];
            }
            else{
                if(this.hoveringItem != null && typeof(this.hoveringItem.leave) == 'function'){
                    this.hoveringItem.leave();
                    this.hoveringItem = null;
                }
            }
        }
    })
})
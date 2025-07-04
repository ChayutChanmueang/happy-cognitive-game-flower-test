ig.module(
    'plugins.fontloader'
)
.defines(function(){
    ig.FontLoader = ig.Class.extend({
        fonts:[{family : 'NotoSansThai', src : 'url(media/fonts/notosansthai.ttf)'}],
        load:function(){
            var canvas = document.querySelector('canvas');
            var loadFontComplete = true;
            for(var i = 0 ; i < this.fonts.length ; i++){
                var font = new FontFace(this.fonts[i].family,this.fonts[i].src)

                font.load().then(function(font){
                    document.fonts.add(font);
                })
            }
            for(var i = 0 ; i < this.fonts.length ; i++){
                if(!document.fonts.check('30px '+this.fonts[i].family)){
                    loadFontComplete = false;
                }
            }
            if(!loadFontComplete){
                console.warn('font missing');
            }
            this.onComplete();
        },
        onComplete:function(){

        }
    })
})
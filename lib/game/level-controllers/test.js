ig.module('game.level-controllers.test')
.requires(
    'impact.entity',
    'game.Entity.flower-pot',
    'game.Entity.ui.button',
    'game.Entity.ui.choose-button',
    'game.Entity.core.ui-entity',
    'game.Entity.ui.tutorial',
    'game.Entity.text',
    'game.Entity.ui.gameover-panel',
    'game.Entity.pointer',
)
.defines(function(){
    EntityLevelTest = ig.Entity.extend({
        zIndex:0,
        potWithFlower:0,
        totalPotWithFlower:0,
        randomRound:0,
        isShowingFlowers: false,
        buttons:[],
        alreadyDisplayChoice: false,
        currentRound:1,
        maxRound:5,
        correctRound:0,
        wrongRound:0,
        init: function(x,y,settings){
            this.parent(x,y,settings)
            ig.game.pointer = ig.game.spawnEntity(EntityPointer,0,0);
            ig.gameplay = this;
            ig.gameplay.debug = false;
            this.choicesIsShown = false;
            this.isShowingLastFlowers = false;

            this.flowers = [];
            var f1 = ig.game.spawnEntity(EntityFlowerPot,(ig.system.width/2) - ((128/2) * 3),(ig.system.height/2) - (164/2) - 40);
            var f5 = ig.game.spawnEntity(EntityFlowerPot,(ig.system.width/2) - (128/2) + ((128/2) * 2),(ig.system.height/2) - (164/2) - 40);
            var f2 = ig.game.spawnEntity(EntityFlowerPot,(ig.system.width/2) - ((128/2) * 2),(ig.system.height/2) - (164/2) - 20);
            var f4 = ig.game.spawnEntity(EntityFlowerPot,(ig.system.width/2) - (128/2) + (128/2),(ig.system.height/2) - (164/2) - 20);
            var f3 = ig.game.spawnEntity(EntityFlowerPot,(ig.system.width/2) - (128/2),(ig.system.height/2) - (164/2));
            this.flowers.push(f1);
            this.flowers.push(f2);
            this.flowers.push(f3);
            this.flowers.push(f4);
            this.flowers.push(f5);
            //this.tutorial = ig.game.spawnEntity(EntityTutorial,(ig.system.width/2) - 150,(ig.system.height/2) - 100,{anchor:5});
            //this.randomFlower();

            if(typeof(ig.game.tutorialShown) == "undefined"){
                ig.game.tutorialShown = true;
                ig.game.tutorialState = 0;
            }

            if(ig.game.tutorialShown){
                this.tutorial = ig.game.spawnEntity(EntityTutorial,(ig.system.width/2) - 200,(ig.system.height/2),{anchor:2});
                console.log(typeof(this.tutorial));
                console.log("spawn tutorial");
            }

            this.cooldownTimer = new ig.Timer(2);
        },
        update: function(){
            if(ig.game.tutorialShown){
                console.log(typeof(this.tutorial));
                if(typeof(this.tutorial) != 'undefined'){
                    this.handleTutorial();
                }
            }
            else{
                if(!this.alreadyDisplayChoice){
                    this.displayFlower();
                }
                //In case player choose answer
                if(typeof(this.roundCooldown) != 'undefined' && this.roundCooldown.delta() > 0 && this.alreadyDisplayChoice){
                    if(this.currentRound < this.maxRound){
                        this.beginNextRound();
                    }
                    for(var i = 0; i < this.flowers.length;i++){
                        this.flowers[i].showFlower = false;
                    }
                    this.answerIndication.kill();
                }
            }
        },
        handleTutorial:function(){
            switch(ig.game.tutorialState){
                case 2 :
                    if(this.currentStateTutorial != ig.game.tutorialState){
                        this.currentStateTutorial = ig.game.tutorialState;
                        this.potWithFlower = 0;
                        for(var i = 0; i < this.flowers.length; i++){
                            this.flowers[i].showFlower = false;
                            this.flowers[i].haveFlower = true;
                            this.flowers[i].displayFlower();
                            ig.gameplay.potWithFlower++;
                        }
                        this.totalPotWithFlower += this.potWithFlower;
                    }
                    break;
                case 3 :
                    if(this.currentStateTutorial != ig.game.tutorialState){
                        this.currentStateTutorial = ig.game.tutorialState;
                        for(var i = 0; i < this.flowers.length; i++){
                            this.flowers[i].hideFlower();
                        }
                    }
                    break;
                case 4 :
                    if(this.currentStateTutorial != ig.game.tutorialState){
                        this.currentStateTutorial = ig.game.tutorialState;
                        this.potWithFlower = 0;
                        for(var i = 0; i < this.flowers.length; i++){
                            this.flowers[i].haveFlower = false;
                        }
                        this.flowers[2].showFlower = false;
                        this.flowers[2].haveFlower = true;
                        this.flowers[2].displayFlower();
                        ig.gameplay.potWithFlower++;
                        this.totalPotWithFlower += this.potWithFlower;
                    }
                case 5 :
                    if(this.currentStateTutorial != ig.game.tutorialState){
                        this.currentStateTutorial = ig.game.tutorialState;
                        for(var i = 0; i < this.flowers.length; i++){
                            this.flowers[i].hideFlower();
                        }
                    }
                    break;
                case 6 :
                    if(this.currentStateTutorial != ig.game.tutorialState){
                        this.currentStateTutorial = ig.game.tutorialState;
                        ig.gameplay.showChoices();
                    }
                    break;
            }
        },
        randomFlower:function(){
            this.potWithFlower = 0;
            for(var i = 0; i < this.flowers.length; i++){
                this.flowers[i].randomHaveFlower();
                this.flowers[i].displayFlower();
                //console.log(this.potWithFlower);
            }
        },
        displayFlower:function(){
            //console.log(this.randomRound);
            console.log(this.totalPotWithFlower);
            if(this.randomRound < 4){
                if(this.cooldownTimer.delta() > 0){
                    if(!this.isShowingFlowers){
                        this.isShowingFlowers = true;
                        this.randomFlower();
                        this.totalPotWithFlower += this.potWithFlower;
                        this.randomRound++;
                        this.cooldownTimer.reset();
                    }
                    else{
                        this.isShowingFlowers = false;
                        for(var i = 0; i < this.flowers.length; i++){
                            this.flowers[i].hideFlower();
                        }
                        this.cooldownTimer.reset();
                    }
                }
            }
            else{
                if(this.cooldownTimer.delta() > 0){
                    this.isShowingFlowers = false;
                    if(!this.alreadyDisplayChoice && !this.isShowingLastFlowers){
                        this.isShowingLastFlowers = true;
                        for(var i = 0; i < this.flowers.length; i++){
                        this.flowers[i].hideFlower();
                        }
                    }
                }
            }
        },
        showChoices:function(){
            this.choicesIsShown = true;
            var correctChoiceIsOut = false;
            if(ig.ua.mobile){
                this.title = ig.game.spawnEntity(EntityText,(ig.system.width/2),(ig.system.height/2) + 200,
                {
                    anchor:2,
                    text:"How many flower did appear?",
                    size:"30",
                    alignment:"center"})
                }
            else{
                this.title = ig.game.spawnEntity(EntityText,(ig.system.width/2),(ig.system.height/2) + 250,
                {
                    anchor:2,
                    text:"How many flower did appear?",
                    size:"30",
                    alignment:"center"})
                }
            //spawn buttons here
            this.currentChoices = [];
            for(var i = 0; i < 2; i++){
                for(var j = 0; j < 2; j++){
                    var randomChance = Math.random();
                    var chanceOffset = 0;
                    var randomValue = 0;
                    if(i == 1 && j == 1 && !correctChoiceIsOut){
                        randomValue = this.totalPotWithFlower;
                        this.currentChoices.push(randomValue);
                        correctChoiceIsOut = true;
                    }
                    else{
                        if(randomChance < 0.4 + chanceOffset && !correctChoiceIsOut){
                            randomValue = this.totalPotWithFlower;
                            correctChoiceIsOut = true;
                            this.currentChoices.push(randomValue);
                        }
                        else{
                            randomValue = this.randomChoiceValue();
                            if(randomValue == this.totalPotWithFlower && correctChoiceIsOut){
                                console.log(randomValue);
                                randomValue += 1;
                                this.currentChoices.push(randomValue);
                            }
                            else if(randomValue == this.totalPotWithFlower && !correctChoiceIsOut){
                                correctChoiceIsOut = true;
                                this.currentChoices.push(randomValue);
                            }
                            else{
                                this.currentChoices.push(randomValue);
                            }
                            chanceOffset += 0.2;
                        }
                    }
                    if(ig.ua.mobile){
                        var button = ig.game.spawnEntity(EntityChooseButton,((ig.system.width/2) - 205) + (j * (200 + 10)) ,(ig.system.height/2) + 225 + (i * 75),{anchor:2,value:randomValue});
                    }
                    else{
                        var button = ig.game.spawnEntity(EntityChooseButton,((ig.system.width/2) - 205) + (j * (200 + 10)) ,(ig.system.height/2) + 300 + (i * 75),{anchor:2,value:randomValue});
                    }
                    console.log(button.enable);
                    button.enable = true;
                    this.buttons.push(button);
                }
            }

            this.alreadyDisplayChoice = true;
            console.log(this.buttons.length);
            this.roundCooldown = undefined;
        },
        randomChoiceValue:function(){
            var randomNumber = Math.random()*20;
            randomNumber = parseInt(randomNumber);
            if(randomNumber <= 0){
                randomNumber = 1;
            }
            if(this.currentChoices.length > 0){
                for(var i = 0; i < this.currentChoices.length; i++){
                    if(randomNumber == this.currentChoices[i]){
                        return this.randomChoiceValue();
                    }
                }
            }
            return randomNumber;
        },
        onCorrectAnswer:function(){
            console.log("Correct");
            this.answerIndication = ig.game.spawnEntity(EntityText,(ig.system.width/2),300,
                {
                    anchor:5,
                    text:"Nice !",
                    size:"30",
                    alignment:"center",
                    zIndex:99
                });
            this.correctRound++;
            if(this.currentRound < this.maxRound){
                this.roundCooldown = new ig.Timer(1);
            }
            else{
                this.gameoverScreen = ig.game.spawnEntity(EntityGameoverPanel,0,0,{correctRound:this.correctRound,wrongRound:this.wrongRound});
                for(var i = 0; i < this.buttons.length; i++){
                    this.buttons[i].enable = false;
                }
            }
            for(var i = 0; i < this.flowers.length;i++){
                this.flowers[i].showFlower = true;
                this.flowers[i].offsetY = 0;
            }
            console.log("==========");
        },
        onWrongAnswer:function(){
            console.log("Wrong");
            this.answerIndication = ig.game.spawnEntity(EntityText,(ig.system.width/2),300,
                {
                    anchor:5,
                    text:"Wrong !",
                    size:"30",
                    alignment:"center"
                });
            this.wrongRound++;
            if(this.currentRound < this.maxRound){
                this.roundCooldown = new ig.Timer(1);
            }
            else{
                this.gameoverScreen = ig.game.spawnEntity(EntityGameoverPanel,0,0,{correctRound:this.correctRound,wrongRound:this.wrongRound});
                for(var i = 0; i < this.buttons.length; i++){
                    this.buttons[i].enable = false;
                }
            }
            for(var i = 0; i < this.flowers.length;i++){
                this.flowers[i].showFlower = true;
                this.flowers[i].offsetY = 0;
            }
            console.log("==========");
        },
        beginNextRound:function(){
            this.isShowingLastFlowers = false;
            this.potWithFlower = 0;
            this.totalPotWithFlower = 0;
            this.randomRound = 0;
            this.alreadyDisplayChoice = false;
            this.cooldownTimer.reset();
            this.removeOldButtons();
            this.title.kill();
            this.currentRound++;
        },
        removeOldButtons:function(){
            for(var i = this.buttons.length-1; i > -1; i--){
                button = this.buttons[i];
                this.buttons.pop();
                button.kill();
            }
        },
        draw: function(){
            var ctx = ig.system.context;

            //Draw BG
            ctx.fillStyle = "white";
            ctx.fillRect(0,0,ig.system.width * _GAMESETTINGS.screenScale,ig.system.height * _GAMESETTINGS.screenScale);

            if(ig.gameplay.debug){
                //Draw Test
                ctx.fillStyle = "black";
                ctx.fillRect(_GAMESETTINGS.screen.x,_GAMESETTINGS.screen.y,430,50);

                ctx.fillStyle = "red";
                ctx.fillRect(_GAMESETTINGS.screen.x + 215 - 25,_GAMESETTINGS.screen.y,50,430);
            }

            ctx.fillStyle = "black";
            ctx.font = 40  * _GAMESETTINGS.screenScale + "px serif";
            ctx.textAlign = "center";
            if(ig.ua.mobile){
                ctx.fillText("Round", (ig.system.width/2) * _GAMESETTINGS.screenScale, 85 * _GAMESETTINGS.screenScale);

                ctx.font = 30  * _GAMESETTINGS.screenScale + "px serif";
                ctx.textAlign = "center";
                ctx.fillText(this.currentRound.toString()+"/"+this.maxRound, (ig.system.width/2) * _GAMESETTINGS.screenScale, 130 * _GAMESETTINGS.screenScale);
            }
            else{
                ctx.fillText("Round", (ig.system.width/2) * _GAMESETTINGS.screenScale, 75 * _GAMESETTINGS.screenScale);

                ctx.font = 30  * _GAMESETTINGS.screenScale + "px serif";
                ctx.textAlign = "center";
                ctx.fillText(this.currentRound.toString()+"/"+this.maxRound, (ig.system.width/2) * _GAMESETTINGS.screenScale, 120 * _GAMESETTINGS.screenScale);
            }

            //this.tutorial.draw();
        }
    })
})
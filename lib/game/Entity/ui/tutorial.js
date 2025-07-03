ig.module("game.Entity.ui.tutorial")
    .requires("impact.entity", "game.Entity.core.ui-entity", "game.Entity.text")
    .defines(function () {
        EntityTutorial = EntityUIElement.extend({
            size: { x: 400, y: 200 },
            zIndex: 100,
            isMovable: false,
            collides: ig.Entity.COLLIDES.NEVER,
            type: ig.Entity.TYPE.A,
            enable: true,
            init: function (x, y, settings) {
                this.parent(x, y, settings);

                console.log(this.anchor);
                console.log(this.pos);
                console.log("spawn tutorial");
                //this.tutorialText = "Testing1";
            },
            update: function () {
                this.parent();
                this.updatePos();
                //console.log(this.drawPos);
                if (ig.input.pressed("click")) {
                    if (this.isMouseOver && this.enable) {
                        this.onMouseClick();
                    }
                } else if (ig.input.released("click")) {
                    if (this.isMouseOver && this.enable) {
                        this.onMouseRelease();
                    }
                }
                switch (ig.game.tutorialState) {
                    case 0:
                        if (ig.game.currentTutorialState != ig.game.tutorialState) {
                            ig.game.currentTutorialState = ig.game.tutorialState;
                            this.tutorialText = "Today we will be learning on how to play.";
                        }
                        break;
                    case 1:
                        if (ig.game.currentTutorialState != ig.game.tutorialState) {
                            ig.game.currentTutorialState = ig.game.tutorialState;
                            this.tutorialText =
                                "You will notice that there is " +
                                ig.gameplay.flowers.length +
                                " pots.";
                            this.pos.y += 150;
                            this.setupOffsetPos();
                            this.addValue = 0;
                            this.tween({ addValue: 50 }, 0.5, {
                                loop: ig.Tween.Loop.Reverse,
                            }).start();
                        }
                        break;
                    case 2:
                        if (ig.game.currentTutorialState != ig.game.tutorialState) {
                            ig.game.currentTutorialState = ig.game.tutorialState;
                            this.tutorialText =
                                "There will be flower appear from the pots. Count the flowers.";
                            this.tween({ addValue: 50 }, 0.5, {
                                loop: ig.Tween.Loop.Reverse,
                            }).start();
                        }
                        if (ig.gameplay.flowers[0].currentHeight >= 164) {
                            if (
                                typeof this.displayingNumbers != "boolean" ||
                                !this.displayingNumbers
                            ) {
                                this.displayingNumbers = true;
                                this.currentDisplayNum = 1;
                                this.delay = new ig.Timer(0.5);
                            }
                            if (this.displayingNumbers) {
                                if (this.delay.delta() > 0) {
                                    if (this.currentDisplayNum < 5) {
                                        this.delay.reset();
                                        this.currentDisplayNum++;
                                    }
                                }
                            }
                        }
                        break;
                    case 3:
                        if (ig.game.currentTutorialState != ig.game.tutorialState) {
                            ig.game.currentTutorialState = ig.game.tutorialState;
                            this.tutorialText = "Flowers will go back into pot.";
                        }
                        break;
                    case 4:
                        if (ig.game.currentTutorialState != ig.game.tutorialState) {
                            ig.game.currentTutorialState = ig.game.tutorialState;
                            this.tutorialText =
                                "And you will see that the flower has appear again. Count from the last round.";
                            this.currentDisplayNum++;
                        }
                        break;
                    case 5:
                        if (ig.game.currentTutorialState != ig.game.tutorialState) {
                            ig.game.currentTutorialState = ig.game.tutorialState;
                            this.tutorialText = "After all of the flower have appear.";
                            this.pos.y -= 350;
                            this.setupOffsetPos();
                        }
                        break;
                    case 6:
                        if (ig.game.currentTutorialState != ig.game.tutorialState) {
                            ig.game.currentTutorialState = ig.game.tutorialState;
                            this.tutorialText =
                                "There will be numbers inside multiple boxes to choose.";
                        }
                        break;
                    case 7:
                        if (ig.game.currentTutorialState != ig.game.tutorialState) {
                            ig.game.currentTutorialState = ig.game.tutorialState;
                            this.tutorialText =
                                "The Correct Answer is " +
                                ig.gameplay.totalPotWithFlower +
                                ". Try select button with number " +
                                ig.gameplay.totalPotWithFlower +
                                "!";
                        }
                        break;
                    case 9:
                        if (ig.game.currentTutorialState != ig.game.tutorialState) {
                            ig.game.currentTutorialState = ig.game.tutorialState;
                            this.tutorialText = "You are now ready to play the actual game!";
                        }
                        break;
                    case 10:
                        if (ig.game.currentTutorialState != ig.game.tutorialState) {
                            ig.game.currentTutorialState = ig.game.tutorialState;
                            ig.game.tutorialShown = false;
                            ig.game.director.reloadLevel();
                        }
                        break;
                }
            },
            updatePos: function () {
                this.pos.x = this.drawPos.x;
                this.pos.y = this.drawPos.y;
            },
            over: function () {
                console.log("Mouse Over");
                if (this.enable) {
                    this.onMouseOver();
                }
            },
            leave: function () {
                console.log("Mouse Leave");
                if (this.enable) {
                    this.onMouseLeave();
                }
            },
            onMouseOver: function () {
                this.isMouseOver = true;
            },
            onMouseLeave: function () {
                this.isMouseOver = false;
            },
            onMouseClick: function () {
                this.isClick = true;
            },
            onMouseRelease: function () {
                if (this.isClick || ig.ua.mobile) {
                    console.log(ig.game.tutorialState);
                    if (ig.game.tutorialState != 7 && ig.game.tutorialState != 8) {
                        if (ig.game.tutorialState == 2) {
                            if (this.currentDisplayNum >= 5) {
                                ig.game.tutorialState++;
                            }
                        } else if (ig.game.tutorialState == 3) {
                            console.log(ig.gameplay.flowers[0].currentHeight);
                            if (ig.gameplay.flowers[0].currentHeight <= 5) {
                                ig.game.tutorialState++;
                            }
                        } else if (ig.game.tutorialState == 4) {
                            if (ig.gameplay.flowers[2].currentHeight >= 164) {
                                ig.game.tutorialState++;
                            }
                        } else if (ig.game.tutorialState == 5) {
                            if (ig.gameplay.flowers[2].currentHeight <= 5) {
                                ig.game.tutorialState++;
                            }
                        } else {
                            ig.game.tutorialState++;
                        }
                        this.isClick = false;
                    }
                }
            },
            draw: function () {
                this.parent();

                if (ig.game.tutorialState != 8) {
                    var ctx = ig.system.context;

                    ctx.save();

                    ctx.fillStyle = "#6B6B6B";
                    ctx.fillRect(
                        this.drawPos.x  * _GAMESETTINGS.screenScale,
                        this.drawPos.y * _GAMESETTINGS.screenScale,
                        this.size.x * _GAMESETTINGS.screenScale,
                        this.size.y * _GAMESETTINGS.screenScale
                    );
                    //console.log(this.drawPos);

                    ctx.restore();

                    ctx.save();

                    ctx.fillStyle = "black";
                    ctx.font = (30  * _GAMESETTINGS.screenScale) + "px serif";
                    ctx.textAlign = "center";
                    //ctx.fillText(this.tutorialText, this.drawPos.x + 10, this.drawPos.y + 30);
                    this.wrapText(
                        ctx,
                        this.tutorialText,
                        (this.drawPos.x + this.size.x / 2)  * _GAMESETTINGS.screenScale,
                        (this.drawPos.y + 30)  * _GAMESETTINGS.screenScale,
                        (this.size.x - 20)  * _GAMESETTINGS.screenScale,
                        (this.size.y - 30)  * _GAMESETTINGS.screenScale,
                        30  * _GAMESETTINGS.screenScale
                    );

                    this.drawArrows(ctx);

                    this.drawNumbers(ctx);

                    this.drawRedFrame(ctx);

                    if (ig.game.tutorialState != 7) {
                        ctx.textAlign = "right";
                        ctx.fillStyle = "#000000";
                        if (ig.game.tutorialState == 2) {
                            if (this.currentDisplayNum >= 5) {
                                ctx.fillText(
                                    "click to continue",
                                    (this.drawPos.x + this.size.x - 20) * _GAMESETTINGS.screenScale,
                                    (this.drawPos.y + this.size.y - 20) * _GAMESETTINGS.screenScale
                                );
                            }
                        } else if (ig.game.tutorialState == 3) {
                            console.log(ig.gameplay.flowers[0].currentHeight);
                            if (ig.gameplay.flowers[0].currentHeight <= 5) {
                                ctx.fillText(
                                    "click to continue",
                                    (this.drawPos.x + this.size.x - 20) * _GAMESETTINGS.screenScale,
                                    (this.drawPos.y + this.size.y - 20) * _GAMESETTINGS.screenScale
                                );
                            }
                        } else if (ig.game.tutorialState == 4) {
                            if (ig.gameplay.flowers[2].currentHeight >= 164) {
                                ctx.fillText(
                                    "click to continue",
                                    (this.drawPos.x + this.size.x - 20) * _GAMESETTINGS.screenScale,
                                    (this.drawPos.y + this.size.y - 20) * _GAMESETTINGS.screenScale
                                );
                            }
                        } else if (ig.game.tutorialState == 5) {
                            if (ig.gameplay.flowers[2].currentHeight <= 5) {
                                ctx.fillText(
                                    "click to continue",
                                    (this.drawPos.x + this.size.x - 20) * _GAMESETTINGS.screenScale,
                                    (this.drawPos.y + this.size.y - 20) * _GAMESETTINGS.screenScale
                                );
                            }
                        } else {
                            ctx.fillText(
                                "click to continue",
                                (this.drawPos.x + this.size.x - 20) * _GAMESETTINGS.screenScale,
                                (this.drawPos.y + this.size.y - 20) * _GAMESETTINGS.screenScale
                            );
                        }
                    }

                    ctx.restore();
                }
            },
            wrapText: function (ctx, text, x, y, maxWidth, maxHeight, lineHeight) {
                var words = text.split(" ");
                var line = "";
                var linesDrawn = 0;
                var currentHeight = 0;
                for (var n = 0; n < words.length; n++) {
                    var testLine = line + words[n] + " ";
                    var metrics = ctx.measureText(testLine);
                    var testWidth = metrics.width;
                    if (testWidth > maxWidth && n > 0) {
                        if (currentHeight + lineHeight > maxHeight) {
                            ctx.fillText("...", x, y);
                            return;
                        }
                        ctx.fillText(line, x, y);
                        line = words[n] + " ";
                        y += lineHeight;
                        currentHeight += lineHeight;
                        linesDrawn++;
                        //console.log("end line");
                    } else {
                        line = testLine;
                        //console.log("finish text")
                    }
                }
                if (currentHeight + lineHeight <= maxHeight) {
                    ctx.fillText(line, x, y);
                }
            },
            drawNumbers: function (ctx) {
                switch (ig.game.tutorialState) {
                    case 2:
                        for (var i = 0; i < this.currentDisplayNum; i++) {
                            ctx.fillText(
                                i + 1,
                                (ig.gameplay.flowers[i].pos.x + 146 / 2) * _GAMESETTINGS.screenScale,
                                (ig.gameplay.flowers[i].pos.y -
                                ig.gameplay.flowers[i].currentHeight) * _GAMESETTINGS.screenScale
                            );
                        }
                        break;
                    case 4:
                        if (ig.gameplay.flowers[2].currentHeight >= 164)
                            ctx.fillText(
                                this.currentDisplayNum,
                                (ig.gameplay.flowers[2].pos.x + 146 / 2) * _GAMESETTINGS.screenScale,
                                (ig.gameplay.flowers[2].pos.y -
                                ig.gameplay.flowers[2].currentHeight) * _GAMESETTINGS.screenScale
                            );
                        break;
                }
            },
            drawArrows: function (ctx) {
                //this.drawArrow(ctx, 150, 150, 120, 40, Math.PI/2, '#000');
                switch (ig.game.tutorialState) {
                    case 1:
                        for (var i = 0; i < ig.gameplay.flowers.length; i++) {
                            this.drawArrow(
                                ctx,
                                ig.gameplay.flowers[i].pos.x + 146 / 2,
                                ig.gameplay.flowers[i].pos.y + this.addValue,
                                120,
                                40,
                                Math.PI / 2,
                                "#000"
                            );
                        }
                        break;
                    case 2:
                        for (var i = 0; i < ig.gameplay.flowers.length; i++) {
                            this.drawArrow(
                                ctx,
                                ig.gameplay.flowers[i].pos.x + 146 / 2,
                                ig.gameplay.flowers[i].pos.y -
                                ig.gameplay.flowers[i].currentHeight +
                                this.addValue,
                                120,
                                40,
                                Math.PI / 2,
                                "#000"
                            );
                        }
                        break;
                    case 4:
                        this.drawArrow(
                            ctx,
                            ig.gameplay.flowers[2].pos.x + 146 / 2,
                            ig.gameplay.flowers[2].pos.y -
                            ig.gameplay.flowers[2].currentHeight +
                            this.addValue,
                            120,
                            40,
                            Math.PI / 2,
                            "#000"
                        );
                        break;
                }
            },
            drawArrow: function (
                ctx,
                posX,
                posY,
                sizeX,
                sizeY,
                angle = 0,
                color = "#fff"
            ) {
                ctx.save();

                // Move to arrow position and rotate
                ctx.translate(posX * _GAMESETTINGS.screenScale, posY * _GAMESETTINGS.screenScale);
                ctx.rotate(angle);

                ctx.fillStyle = color;

                // Draw arrow shaft + head pointing to the right by default
                ctx.beginPath();
                ctx.moveTo(0, (-sizeY / 4)  * _GAMESETTINGS.screenScale); // Top of shaft
                ctx.lineTo((sizeX - sizeY) * _GAMESETTINGS.screenScale, (-sizeY / 4) * _GAMESETTINGS.screenScale); // Shaft end
                ctx.lineTo((sizeX - sizeY) * _GAMESETTINGS.screenScale, (-sizeY / 2) * _GAMESETTINGS.screenScale); // Top of head
                ctx.lineTo(sizeX * _GAMESETTINGS.screenScale, 0); // Tip of head
                ctx.lineTo((sizeX - sizeY) * _GAMESETTINGS.screenScale, (sizeY / 2) * _GAMESETTINGS.screenScale); // Bottom of head
                ctx.lineTo((sizeX - sizeY) * _GAMESETTINGS.screenScale, (sizeY / 4) * _GAMESETTINGS.screenScale); // Bottom of shaft
                ctx.lineTo(0, (sizeY / 4) * _GAMESETTINGS.screenScale); // Back to base
                ctx.closePath();
                ctx.fill();

                ctx.restore();
            },
            drawRedFrame: function (ctx) {
                switch (ig.game.tutorialState) {
                    case 6:
                        if (typeof ig.gameplay.buttons[0] != "undefined") {
                            ctx.strokeStyle = "rgb(255, 0, 0)";
                            ctx.fillStyle = "rgb(255, 255, 255)";
                            ctx.lineWidth = 8 * _GAMESETTINGS.screenScale;
                            ctx.beginPath();
                            ctx.rect(
                                (ig.gameplay.buttons[0].drawPos.x - 15) * _GAMESETTINGS.screenScale,
                                (ig.gameplay.buttons[0].drawPos.y - 15) * _GAMESETTINGS.screenScale,
                                (ig.gameplay.buttons[3].drawPos.x +
                                ig.gameplay.buttons[3].size.x -
                                ig.gameplay.buttons[0].drawPos.x +
                                30) * _GAMESETTINGS.screenScale,
                                (ig.gameplay.buttons[3].drawPos.y +
                                ig.gameplay.buttons[3].size.y -
                                ig.gameplay.buttons[0].drawPos.y +
                                30) * _GAMESETTINGS.screenScale
                            );
                            ctx.stroke();
                            ctx.closePath();
                        }
                        break;
                    case 7:
                        for (var i = 0; i < ig.gameplay.buttons.length; i++) {
                            if (
                                ig.gameplay.buttons[i].value == ig.gameplay.totalPotWithFlower
                            ) {
                                ctx.strokeStyle = "rgb(255, 0, 0)";
                                ctx.fillStyle = "rgb(255, 255, 255)";
                                ctx.lineWidth = 5 * _GAMESETTINGS.screenScale;
                                ctx.beginPath();
                                ctx.rect(
                                    (ig.gameplay.buttons[i].drawPos.x - 5) * _GAMESETTINGS.screenScale,
                                    (ig.gameplay.buttons[i].drawPos.y - 5) * _GAMESETTINGS.screenScale,
                                    (ig.gameplay.buttons[i].size.x + 10) * _GAMESETTINGS.screenScale,
                                    (ig.gameplay.buttons[i].size.y + 10) * _GAMESETTINGS.screenScale
                                );
                                ctx.stroke();
                                ctx.closePath();
                            }
                        }
                        break;
                }
            },
        });
    });

var _TEXTS = {
    TH:{
        Rounds : "รอบที่",
        ChoicesTitle : "ดอกไม้ทั้งหมดโผล่มากี่ครั้ง",
        Correct : "เยี่ยม !!!",
        Wrong : "ผิด !!!",
        Tutorial : [
            "วันนี้จะสอนวิธีการเล่นกัน", //0
            "จะเห็นว่ามีกระถางอยู่ทั้งหมด ", //1
            " อัน", //1.5
            "จะมีดอกไม้โผล่ขึ้น ให้ทำการนับดอกไม้ที่ โผล่ออกมา", //2
            "ดอกไม้จะกลับไป ยังกระถางอีกครั้ง", //3
            "ตอนนี้จะเห็นว่า ดอกไม้โผล่ออกมาให้ นับต่อจากรอบที่แล้ว", //4
            "หลังจากกลับดอกไม้โผล่ออกมา ทั้งหมดแล้ว", //5
            "ภายในช่องจะมีตัวเลข ให้เลือกตอบ", //6
            "โดยคำตอบที่ถูกคือ ", //7
            " มาลองกดในช่องข้างล่างกัน", //7.5
            "พร้อมแล้วลองไป เล่นจริงกันเลย", //8
        ],
        TabToContinue : "แตะกล่องข้อความ",
        Gameover : "เกมจบแล้ว",
        CorrectAnswer : "ตอบถูก : ",
        WrongAnswer : "ตอบผิด : ",
        PlayAgain : "เล่นอีกครั้ง",
        
    },
    EN:{
        Rounds : "Round",
        ChoicesTitle : "How many flower did appear?",
        Correct : "Nice !",
        Wrong : "Wrong !",
        Tutorial : [
            "Today we will be learning on how to play.", //0
            "You will notice that there is ", //1
            " pots.", //1.5
            "There will be flower appear from the pots. Count the flowers.", //2
            "Flowers will go back into pot.", //3
            "And you will see that the flower has appear again. Count from the last round.", //4
            "After all of the flower have appear.", //5
            "There will be numbers inside multiple boxes to choose.", //6
            "The Correct Answer is ", //7
            ". Try select the button below", //7.5
            "You are now ready to play the actual game!", //8
        ],
        TabToContinue : "tab to continue",
        Gameover : "Gameover",
        CorrectAnswer : "Correct Answer : ",
        WrongAnswer : "Wrong Answer : ",
        PlayAgain : "Play Again",
    }
}

ig.module('game.game-strings.string')
    .requires(
        'impact.entity'
    )
    .defines(function () {

    });


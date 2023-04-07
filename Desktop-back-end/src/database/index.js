
let db = null;

function createDB() {
    const { JsonDB, Config } = require('node-json-db');
    const fs = require('fs');
    fs.copyFile("./src/database/realDataBase/realDataBaseQuestions.json", "./src/database/fakeDataBase/questions.json", (err) => { console.log(err); db = new JsonDB(new Config("./src/database/fakeDataBase/questions", true, false, '/')); });

}

async function getQuestions() {
    const category = [
        "Science",
        "Entertainment",
        "Art_History",
        "Sports",
        "Geography",
        "Languages"
    ];

    const questions = [];
    for (let i = 0; i < 20; i++) {
        const cat = Math.random() * 100;
        let cat2;

        if(cat<30){
            cat2 = 0;
        }
        if(cat>=30 && cat<53){
            cat2 = 1;
        }

        if(cat>=53 && cat<71){
            cat2 = 2;
        }

        if(cat>=71 && cat<80){
            cat2 = 3;
        }

        if(cat>=80 && cat<91){
            cat2 = 4;
        }

        if(cat>=91 && cat<100){
            cat2 = 5;
        }



        const count = await db.count(`/questions/${category[cat2] || category[0]}`);
        console.log(count)
        if (!count) { i--; continue; }
        const question = Math.floor(Math.random() * (count-1));
        const data = await db.getData(`/questions/${category[cat2] || category[0]}[${question < count ? question : 0}]/`);
        questions.push({...data, type:"Question"});
    }

    return questions;
}

module.exports = { createDB, getQuestions }
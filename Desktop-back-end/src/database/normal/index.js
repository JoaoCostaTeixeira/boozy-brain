let db = null;
let categoryPercentages = {};

const category = [
    "Science",
    "Entertainment",
    "Art_History",
    "Sports",
    "Geography",
    "Languages",
];

async function createDB() {
    const { JsonDB, Config } = require("node-json-db");

    db = new JsonDB(
        new Config("./src/database/normal/db", true, false, "/")
    );
    // Normal question consts assign
    let totalCount = 0;
    for (const cat of category) {
        const count = await db.count(`/questions/${cat}`);
        categoryPercentages[cat] = { count };
        totalCount += count;
    }
    for (const cat of category) {
        categoryPercentages[cat]["percentage"] =
            (categoryPercentages[cat].count / totalCount) * 100;
    }
}

// GET numQuestion questions from DB
async function getQuestions(numQuestions) {
    const questions = [];
    while (questions.length < numQuestions) {
        const cat = Math.random() * 100;
        let cat2;

        if (cat < categoryPercentages.Science.percentage) {
            cat2 = 0;
        } else if (
            cat <
            categoryPercentages.Science.percentage +
            categoryPercentages.Entertainment.percentage
        ) {
            cat2 = 1;
        } else if (
            cat <
            categoryPercentages.Science.percentage +
            categoryPercentages.Entertainment.percentage +
            categoryPercentages.Art_History.percentage
        ) {
            cat2 = 2;
        } else if (
            cat <
            categoryPercentages.Science.percentage +
            categoryPercentages.Entertainment.percentage +
            categoryPercentages.Art_History.percentage +
            categoryPercentages.Sports.percentage
        ) {
            cat2 = 3;
        } else if (
            cat <
            categoryPercentages.Science.percentage +
            categoryPercentages.Entertainment.percentage +
            categoryPercentages.Art_History.percentage +
            categoryPercentages.Sports +
            categoryPercentages.Geography.percentage
        ) {
            cat2 = 4;
        } else {
            cat2 = 5;
        }

        const { count } = categoryPercentages[category[cat2]];
        if (!count) {
            continue;
        }
        const question = Math.floor(Math.random() * count);
        const data = await db.getData(`/questions/${category[cat2]}[${question}]`);
        if (
            !questions.find(
                (question) => question["question_id"] === data["question_id"]
            )
        )
            questions.push({ ...data, type: "normal" });
    }

    return questions;
}


module.exports = { createDB, getQuestions };

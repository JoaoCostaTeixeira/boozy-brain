let db = null;
let total = 0;

async function createDB() {
    const { JsonDB, Config } = require("node-json-db");

    db = new JsonDB(
        new Config("./src/database/math/db", true, false, "/")
    );

    total = await db.count("/questions");

}

// GET numQuestion questions from DB
async function getQuestions(questions) {
  let data;
  let count = 0;
  while (count < 20) {
    count++;
    const question = Math.floor(Math.random() * total);
    data = await db.getData(`/questions[${question}]`);

    if (!questions.includes(data.question_id)) break;
  }

  return { ...data, subType: "Math", type: "random" };
}

module.exports = { createDB, getQuestions };

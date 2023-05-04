let db = null;

async function createDB() {
    const { JsonDB, Config } = require("node-json-db");

    db = new JsonDB(
        new Config("./src/database/math/db", true, false, "/")
    );

}

// GET numQuestion questions from DB
async function getQuestions(numQuestions) {
    const questions = [];
    return questions;
}


module.exports = { createDB, getQuestions };

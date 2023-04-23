let db = null;

// Normal questions
let categoryPercentages = {};
const category = [
  "Science",
  "Entertainment",
  "Art_History",
  "Sports",
  "Geography",
  "Languages",
];

const types = {
  Normal: {
    questions: 40,
    randomEvents: 15,
    drinkingEvents: 0,
  },
  Juiced: {
    questions: 40,
    randomEvents: 15,
    drinkingEvents: 20,
  },
  Warmup: {
    questions: 40,
    randomEvents: 15,
    drinkingEvents: 10,
  },
  Wasted: {
    questions: 40,
    randomEvents: 15,
    drinkingEvents: 50,
  },
};

// True or false consts
let trueOrFalseCount = 0;

async function createDB() {
  const { JsonDB, Config } = require("node-json-db");
  const fs = require("fs");
  fs.copyFile(
    "./src/database/realDataBase/realDataBaseQuestions.json",
    "./src/database/fakeDataBase/questions.json",
    async (err) => {
      if (err) {
        console.error(err);
      } else {
        db = new JsonDB(
          new Config("./src/database/fakeDataBase/questions", true, false, "/")
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

        trueOrFalseCount = await db.count(`/trueorfalse/`);
      }
    }
  );
}

async function generateGame2(type) {
  const config = types[type];

  const [normal, drink, random] = await Promise.all([
    getNormalQuestions(config.questions),
    getDrinkingTwists(config.drinkingEvents),
    getRandomEvent(config.randomEvents),
  ]);

  while (random.length) {
    const question = Math.floor(Math.random() * (normal.length - 1) + 1);
    if (
      normal[question].type !== "random" &&
      normal[question - 1].type !== "random"
    ) {
      normal.splice(question, 0, random.pop());
    }
  }

  /* while (drink.length) {
    const question = Math.floor(Math.random() * (normal.length - 1) + 1);

    if (
      normal[question].type !== "drinking" &&
      normal[question - 1].type !== "drinking"
    ) {
      normal.splice(question, 0, drink.pop());
    }
  }*/

  return normal;
}

async function getRandomEvent(numQuestions) {
  let questions = [];
  while (questions.length < numQuestions) {
    const alreadyIn = [];
    const questionsArray = [];
    while (alreadyIn.length < 5) {
      const question = Math.floor(Math.random() * trueOrFalseCount);
      if (!alreadyIn.includes(question)) {
        alreadyIn.push(question);
        const data = await db.getData(`/trueorfalse[${question}]`);
        questionsArray.push(data);
      }
    }
    questions.push({
      subType: "TrueOrFalse",
      questions: questionsArray,
      type: "random",
    });
  }
  return questions;
}

async function getDrinkingTwists(numQuestions) {
  const drinkingTwists = [
    { subType: "All drink" },
    { subType: "Only one drinks" },
    { subType: "Some drink" },
  ];

  let questions = [];
  while (questions.length < numQuestions) {
    const question = Math.floor(Math.random() * drinkingTwists.length);
    questions.push({ ...drinkingTwists[question], type: "drinking" });
  }

  return questions;
}
// GET numQuestion questions from DB
async function getNormalQuestions(numQuestions) {
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

module.exports = { createDB, getNormalQuestions, generateGame2 };

let db = null;
const normalQuestions = require("./normal");
const lyricQuestions = require("./lyrics");
const quoteQuestions = require("./quote");
const mathQuestions = require("./math");
const riddleQuestions = require("./riddle");

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

// Lyrics count
let lyricsCount = 0;

async function getRandomEvent2(numQuestions) {
  const types = ["lyric", "quote", "math", "riddle"];
  let questions = [];

  while (questions.length < numQuestions) {
    const type = Math.floor(Math.random() * types.length);

    switch (types[type]) {
      case "lyric":
        questions.push(
          await lyricQuestions.getQuestions(
            questions
              .filter((q) => q.subType === "CompleteTheLyrics")
              .map((q) => q.question_id)
          )
        );
        break;

      case "quote":
        questions.push(
          await quoteQuestions.getQuestions(
            questions
              .filter((q) => q.subType === "Quote")
              .map((q) => q.question_id)
          )
        );
        break;

      case "math":
        questions.push(
          await mathQuestions.getQuestions(
            questions
              .filter((q) => q.subType === "Math")
              .map((q) => q.question_id)
          )
        );
        break;

      case "riddle":
        questions.push(
          await riddleQuestions.getQuestions(
            questions
              .filter((q) => q.subType === "Riddle")
              .map((q) => q.question_id)
          )
        );
        break;
      default:
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
        break;
    }
  }
  return questions;
}

async function createDB2() {
  normalQuestions.createDB();
  lyricQuestions.createDB();
  quoteQuestions.createDB();
  mathQuestions.createDB();
  riddleQuestions.createDB();
}
async function generateGame3(type) {
  const config = types[type];
  const [normal, drink, random] = await Promise.all([
    normalQuestions.getQuestions(config.questions),
    getDrinkingTwists(config.drinkingEvents),
    getRandomEvent2(config.randomEvents),
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
  /*
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

  while (drink.length) {
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
        lyricsCount = await db.count(`/lyrics/`);
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

  while (drink.length) {
    const question = Math.floor(Math.random() * (normal.length - 1) + 1);

    if (
      normal[question].type !== "drinking" &&
      normal[question - 1].type !== "drinking"
    ) {
      normal.splice(question, 0, drink.pop());
    }
  }

  return normal;
}

async function getRandomEvent(numQuestions) {
  const types = ["trueorfalse", "lyric"];
  let questions = [];

  while (questions.length < numQuestions) {
    const type = Math.floor(Math.random() * 2);

    switch (types[type]) {
      case "lyric":
        const question = Math.floor(Math.random() * lyricsCount);
        const data = await db.getData(`/lyrics[${question}]`);
        console.log(data);
        if (
          !questions.find(
            (q) =>
              q.subType === "CompleteTheLyrics" &&
              q.question_id === data.question_id
          )
        ) {
          questions.push({
            ...data,
            subType: "CompleteTheLyrics",
            type: "random",
          });
        }
        break;

      default:
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
        break;
    }
  }
  return questions;
}

async function getDrinkingTwists(numQuestions) {
  const drinkingTwists = ["headstails"];

  let questions = [];
  while (questions.length < numQuestions) {
    const question = Math.floor(Math.random() * drinkingTwists.length);

    switch (drinkingTwists[question]) {
      default:
        const result = Math.floor(Math.random() * 3);

        questions.push({
          result: result,
          subType: "HeadsOrTails",
          type: "drinking",
        });
        break;
    }
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

module.exports = {
  createDB,
  getNormalQuestions,
  generateGame2,
  createDB2,
  generateGame3,
};

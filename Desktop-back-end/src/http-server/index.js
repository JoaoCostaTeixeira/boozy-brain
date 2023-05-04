function startHttpServer(getQuestions, getQuestions2) {
  const express = require("express");
  const app = express();
  const cors = require("cors");

  app.use(cors());
  // respond with "hello world" when a GET request is made to the homepage
  app.get("/", (req, res) => {
    res.sendFile("http://localhost:3000/");
  });

  app.get("/questions/:type", async (req, res) => {
    const { type } = req.params;
    const questions = await getQuestions(type);
    res.send(questions);
  });

  app.get("/questions2/:type", async (req, res) => {
    const { type } = req.params;
    const questions = await getQuestions2(type);
    res.send(questions);
  });

  app.get("/ip", (req, res) => {
    const { networkInterfaces } = require("os");
    const nets = networkInterfaces();
    const results = []; // Or just '{}', an empty object

    for (const name of Object.keys(nets)) {
      for (const net of nets[name]) {
        // Skip over non-IPv4 and internal (i.e. 127.0.0.1) addresses
        // 'IPv4' is in Node <= 17, from 18 it's a number 4 or 6
        const familyV4Value = typeof net.family === "string" ? "IPv4" : 4;
        if (net.family === familyV4Value && !net.internal) {
          results.push(net.address);
        }
      }
    }
    res.status(200).send(results[0] || "ERROR");
  });

  app.listen(3001, () => {
    console.log("Ready");
  });
}

module.exports = { startHttpServer };

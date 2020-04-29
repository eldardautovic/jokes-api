const express = require("express");
const router = express.Router();
const Jokes = require("../models/jokes");

//getting all the jokes!
router.get("/", async (req, res) => {
  try {
    const Joke = await Jokes.find();
    res.json(Joke);
  } catch (err) {
    res.status(500).json({ Error: err });
  }
});

//posting a new joke to the api
router.post("/", async (req, res) => {
  const newJoke = new Jokes({
    title: req.body.title,
    content: req.body.content,
  });

  try {
    const savedJoke = await newJoke.save();
    res.json(savedJoke);
  } catch (err) {
    req.status(400).json({ Error: err });
  }
});

//getting by the ID
router.get("/:jokeId", async (req, res) => {
  try {
    const jokeById = await Jokes.findById({ _id: req.params.jokeId });
    res.status(200).json(jokeById);
  } catch (err) {
    res.json({ Error: err });
  }
});

//exporting the router
module.exports = router;

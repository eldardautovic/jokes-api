const express = require("express");
const router = express.Router();
const Jokes = require("../models/jokes");
const jokeController = require("../controllers/jokeControll");
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
router.post(
  "/",
  jokeController.validate("createJoke"),
  jokeController.createJoke
);

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

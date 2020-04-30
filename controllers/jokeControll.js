const { body } = require("express-validator/check");
const { validationResult } = require("express-validator/check");
const Jokes = require("../models/jokes");
exports.validate = (method) => {
  switch (method) {
    case "createJoke": {
      return [
        body("title", "Title doesn't exist.").exists(),
        body("content", "Content can't be empty.").exists(),
      ];
    }
  }
};

exports.createJoke = async (req, res) => {
  try {
    const errors = validationResult(req); // Finds the validation errors in this request and wraps them in an object with handy functions

    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
      return;
    }
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
  } catch (err) {
    console.log(err);
    return res.json({ Error: err });
  }
};

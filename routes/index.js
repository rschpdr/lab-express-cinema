const express = require("express");
const router = express.Router();
const Movie = require("../models/Movie.model");

/* GET home page */
router.get("/index", (req, res, next) => res.render("index"));

// GET Movie List
router.get("/movies", async (req, res) => {
  try {
    const result = await Movie.find();

    res.render("movies", { movies: result });
  } catch (err) {
    console.error(err);
    throw new Error(err);
  }
});

// GET Movie detail
router.get("/movie/:id", async (req, res) => {
  console.log("PARAMS =>", req.params);

  try {
    const result = await Movie.findOne({ _id: req.params.id });

    res.render("movieDetail", result);
  } catch (err) {
    console.error(err);
    throw new Error(err);
  }
});

// GET Movie detail
router.get("/movie", async (req, res) => {
  console.log("PARAMS =>", req.params);

  try {
    const result = await Movie.findOne({ _id: req.params.id });

    res.render("movieDetail", result);
  } catch (err) {
    console.error(err);
    throw new Error(err);
  }
});

module.exports = router;

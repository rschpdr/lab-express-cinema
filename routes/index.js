const express = require("express");
const router = express.Router();
const Movie = require("../models/Movie.model");

/* GET home page */
router.get("/", (req, res, next) => res.render("index"));

// GET Movie List - cRud (read)
router.get("/movies", async (req, res) => {
  try {
    const result = await Movie.find();

    res.render("movies", { movies: result });
  } catch (err) {
    console.error(err);
    throw new Error(err);
  }
});

// GET Movie detail - cRud (read)
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

// GET Movie form - Crud (create)
router.get("/create-movie", (req, res) => res.render("movieForm"));

// POST Movie form - Crud (create)
router.post("/create-movie", (req, res) => {
  console.log(req.body);

  req.body.stars = req.body.stars.split(",");
  req.body.showtimes = req.body.showtimes.split(",");

  Movie.create(req.body)
    .then((result) => {
      console.log(result);
      res.redirect("/movies");
    })
    .catch((err) => console.error(err));
});

// GET Movie form - crUd (update)
router.get("/edit-movie/:id", async (req, res) => {
  try {
    const result = await Movie.findOne({ _id: req.params.id });

    result.stars = result.stars.join(", ");
    result.showtimes = result.showtimes.join(", ");

    res.render("movieEditForm", result);
  } catch (err) {
    console.error(err);
  }
});

// POST Movie form - crUd (update)
router.post("/edit-movie/:id", (req, res) => {
  req.body.stars = req.body.stars.split(",");
  req.body.showtimes = req.body.showtimes.split(",");

  Movie.updateOne({ _id: req.params.id }, { $set: req.body })
    .then((result) => {
      console.log(result);
      res.redirect("/movies");
    })
    .catch((err) => console.error(err));
});

// GET Movie form - cruD (delete)
router.get("/delete-movie/:id", async (req, res) => {
  try {
    const result = await Movie.deleteOne({ _id: req.params.id });
    console.log(result);
    res.redirect("/movies");
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;

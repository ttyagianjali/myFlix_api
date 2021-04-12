const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const uuid = require("uuid");

const app = express();
app.use(morgan("common"));
app.use(bodyParser.json());

let movies = [
  {
    title: "Harry Potter and the Sorcerer's Stone",
    author: "J.K. Rowling",
  },
  {
    title: "Lord of the Rings",
    author: "J.R.R. Tolkien",
  },
  {
    title: "Twilight",
    author: "Stephanie Meyer",
  },
];

// GET requests
app.get("/", (req, res) => {
  res.send("Welcome to myFlix App!");
});

//get a list of all movies
app.get("/movies", (req, res) => {
  res.send("Successful GET request returning all the movies");
});

//returning data on all the movies
app.get("/movies/:[title]", (req, res) => {
  res.send("Successful GET request returning data on all the movies");
});

//returning genre of a movie
app.get("/movies/:title/:genre", (req, res) => {
  res.send("Successful GET request returning genre of a movie");
});

//get info about director
app.get("/movies/:title/:director", (req, res) => {
  res.send("Successful GET request returning data on director of the movie");
});

//add a user
app.post("/users", (req, res) => {
  res.send(
    "Successful post request returning a message that a user has been added"
  );
});

//update a user
app.put("/users", (req, res) => {
  res.send(
    "Successful put request returning a message that a user has been updated"
  );
});

//add a movie to favourites
app.post("/users/:FavouriteMovies", (req, res) => {
  res.send(
    "Successful post request returning a message that a movie has been added to favourites"
  );
});

//delete a movie from favourites
app.delete("/users/:FavouriteMovies", (req, res) => {
  res.send(
    "Successful request returning a message that a movie has been deleted from favourites"
  );
});

//delete a user
app.delete("/users", (req, res) => {
  res.send(
    "Successful post request returning a message that a user has been deleted"
  );
});

app.use("/documentation", express.static("public"));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// listen for requests
app.listen(8080, () => {
  console.log("Your app is listening on port 8080.");
});

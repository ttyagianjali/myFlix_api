const mongoose = require("mongoose");
const Models = require("./models.js");

const Movies = Models.Movie;
const Users = Models.User;
const express = require("express");
const morgan = require("morgan");
const uuid = require("uuid");

const app = express();
const bodyParser = require("body-parser");
app.use(morgan("common"));
app.use(bodyParser.json());

mongoose.connect("mongodb://localhost:27017/movieManiaDb", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// GET requests
app.get("/", (req, res) => {
  res.send("Welcome to myFlix App!");
});

//get a list of all movies
app.get("/users", (req, res) => {
  Users.find()
    .then((users) => {
      res.status(201).json(users);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
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
/* We’ll expect JSON in this format
{
  ID: Integer,
  Username: String,
  Password: String,
  Email: String,
  Birthday: Date
}*/
app.post("/users", (req, res) => {
  Users.findOne({ Username: req.body.Username })
    .then((user) => {
      if (user) {
        return res.status(400).send(req.body.Username + "already exists");
      } else {
        Users.create({
          Username: req.body.Username,
          Password: req.body.Password,
          Email: req.body.Email,
          Birthday: req.body.Birthday,
        })
          .then((user) => {
            res.status(201).json(user);
          })
          .catch((error) => {
            console.error(error);
            res.status(500).send("Error: " + error);
          });
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error: " + error);
    });
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

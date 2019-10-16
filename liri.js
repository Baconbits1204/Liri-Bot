//Read and set any environment variables with the .env package.
require("dotenv").config();

//Require data from File System npm package
var fs = require("fs");

var keys = require("./keys.js");

// Requiring our Spotify function exported from spotify.js
var mySpotify = require("./spotify.js");
// Requiring our Movies function exported from omdb.js
var myMovies = require("./omdb.js");
// Requiring our COncert function exported from bandsInTown.js
var myConcert = require("./bandsInTown.js");

//Creates initial user command.
var userCommand = process.argv[2];
//Creates user input.
var userInput = process.argv.splice(3, process.argv.length).join(" ");

//Program conditions
switch (userCommand) {
  // help function to clarify commands used
  case "help":
    console.log(
      "Please type one of these commands\n" +
        "'concert-this': to search concerts for your favorite artist\n" +
        "'spotify-this-song': to search for a song\n" +
        "'movie-this': to search for a movie \n" +
        "'do-what-it-says': using command from log.txt \n"
    );
    break;
  case "concert-this":
    myConcert(userInput);
    break;
  case "spotify-this-song":
    mySpotify(userInput);
    break;
  case "movie-this":
    myMovies(userInput);
    break;
  case "do-what-it-says":
    doWhatItSays();
    break;
  //if anything else written
  default:
    console.log(
      "This is not a valid command, please type 'node liri.js help' for more information"
    );
}

function doWhatItSays() {
  fs.readFile("random.txt", "utf8", function(error, data) {
    //Return error if error occurs.
    if (error) {
      return console.log(error);
    }
    // Then split it by commas (to make it more readable)
    var dataArr = data.split(",");

    // Each command is represented. Because of the format in the txt file, remove the quotes to run these commands.
    if (dataArr[0] === "spotify-this-song") {
      var songcheck = dataArr[1].slice(1, -1);
      console.log("Song Check: " + songcheck);
      mySpotify(songcheck);
    } else if (dataArr[0] === "concert-this") {
      var venueName = dataArr[1].slice(1, -1);
      console.log("Venue Name: " + venueName);
      myConcert(venueName);
    } else if (dataArr[0] === "movie-this") {
      var movieName = dataArr[1].slice(1, -1);
      console.log("Movie Name: " + movieName);
      myMovies(movieName);
    }
  });
}

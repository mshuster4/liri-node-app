
require("dotenv").config();

var keys = require("./keys.js");

var axios = require("axios");

var moment = require("moment");

var Spotify = require("node-spotify-api");

var spotify = new Spotify(keys.spotify);

var omddKey = "cf9c461b"

var command = process.argv[2]; 

if (command === "concert-this") {
  findBand();
}
else if (command === "spotify-this-song") {
  findSong();
}
else if (command === "movie-this") {
  findMovie();
}
else if (command === "do-what-it-says") {
  findText();
}
else {
  console.log("Invalid command.  Try again")
}

function findBand() {

  var bandName = process.argv.slice(3).join(" ");
  var queryURL = "https://rest.bandsintown.com/artists/" + bandName + "/events?app_id=codingbootcamp"

    axios.get(queryURL).then(
      function(response) {

          for (var i = 0; i < response.data.length; i++) {

            var date = moment(response.data[i].datetime).format("MM/DD/YYYY")

            var venueObj = {
              name: response.data[i].venue.name,
              country: response.data[i].venue.country,
              state: response.data[i].venue.region,
              city: response.data[i].venue.city,
              date: date
            };

            console.log(venueObj);                       

          }
    
    });
}
      





/*
var omdbURL = "http://www.omdbapi.com/?t=" + movieName + "=&plot=short&apikey=" + omddKey

spotify
  .search({ type: 'track', query: 'Smile' })
  .then(function(response) {
    console.log(response);
  })
  .catch(function(err) {
    console.log(err);
  });

axios.get(omdbURL).then(
  function(response) {
    console.log(response.data);
  }
);
*/
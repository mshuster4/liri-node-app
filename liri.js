
require("dotenv").config();

var keys = require("./keys.js");

var axios = require("axios");

var Spotify = require("node-spotify-api");



var spotify = new Spotify(keys.spotify);

var omddKey = "cf9c461b"

var movieName = process.argv.slice(2); 

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

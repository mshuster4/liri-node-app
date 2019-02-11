
require("dotenv").config();

var axios = require("axios");

var omddKey = "cf9c461b"

var movieName = process.argv.slice(2); 

var omdbURL = "http://www.omdbapi.com/?t=" + movieName + "=&plot=short&apikey=" + omddKey

axios.get(omdbURL).then(
  function(response) {
    console.log(response.data);
  }
);

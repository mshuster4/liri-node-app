
require("dotenv").config();

var keys = require("./keys.js");

var axios = require("axios");

var moment = require("moment");

var Spotify = require("node-spotify-api");

var spotify = new Spotify(keys.spotify);

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

function findSong() {

    var song = process.argv.slice(3).join(" ");

    spotify.search({type: 'track', query: song, limit: 1}, function(err, data) {
      if (err) {
        return console.log('Error occured' + err);
      }
      
      for (var i = 0; i < data.tracks.items.length; i++) {

        var albumName = data.tracks.items[i].album.name
        var artistsArr = data.tracks.items[i].artists;

        artistsArr.forEach(function(item) {

            var artistsName = item.name; 
            var songURL = item.external_urls.spotify; 
            
             var songObj = {
                    artist: artistsName,
                    song: song,
                    link: songURL,
                    album: albumName
              };

             console.log(songObj)
          
        });
      
      }

  });

}

function findMovie() {

  var omddKey = "cf9c461b"

  var nodeArgs = process.argv
  var movieName = ""

  for (var i = 3; i < nodeArgs.length; i++) {

    if (i > 3 && i < nodeArgs.length) {
      movieName = movieName + "+" + nodeArgs[i];
    }
    else {
      movieName += nodeArgs[i];

    }

  }

  var omdbURL = "http://www.omdbapi.com/?t=" + movieName + "=&plot=short&apikey=" + omddKey

  axios.get(omdbURL).then(
    function(response) {

    var title = response.data.Title;
    var year = response.data.Year; 
    var imdbRating = response.data.Ratings[0].Value;
    var rottenTomRating = response.data.Ratings[1].Value;
    var country = response.data.Country;
    var language = response.data.Language;
    var plot = response.data.Plot;
    var actors = response.data.Actors;
    
    var movieObj = {
      title: title,
      year: year,
      imdbRating: imdbRating,
      rottenTomatoesRating: rottenTomRating,
      country: country,
      language: language,
      plot: plot,
      actors: actors
    };

    console.log(movieObj);

  });

}






      






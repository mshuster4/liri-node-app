
require("dotenv").config();

var keys = require("./keys.js");

var command = process.argv[2]; 

if (command === "concert-this") {
  var band = process.argv.slice(3).join(" ")
  findBand(band);
}
else if (command === "spotify-this-song") {
  var song = process.argv.slice(3).join(" ")
  findSong(song);
}
else if (command === "movie-this") {
  var movie = ""
  findMovie(movie);
}
else if (command === "do-what-it-says") {
  findText();
}
else {
  console.log("Invalid command.  Try again")
}

function findBand(band) {

  var axios = require("axios");
  var moment = require("moment");

  var queryURL = "https://rest.bandsintown.com/artists/" + band + "/events?app_id=codingbootcamp"

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


function findSong(song) {

    var Spotify = require("node-spotify-api");
    var spotify = new Spotify(keys.spotify);

    if (process.argv[2] !== "do-what-it-says" && process.argv[3] == undefined) {
        spotify.request('https://api.spotify.com/v1/tracks/3DYVWvPh3kGwPasp7yjahc')
        .then(function(data) {
          var theSignObj = {
              artist: data.album.artists[0].name,
              song: "The Sign",
              link: data.album.artists[0].external_urls.spotify,
              album: "Greatest Hits"
          };

          console.log(theSignObj); 
           
        })
    
    }

    else {

      spotify.search({type: 'track', query: song, limit: 1}, function(err, data) {
        if (err) {
          return console.log('Error occured' + err);
        }
        
        for (var i = 0; i < data.tracks.items.length; i++) {

          var artistsName = [];
          var songObj = {};
          var songURL = ""
          var albumName = data.tracks.items[i].album.name
          var artistsArr = data.tracks.items[i].artists;

          artistsArr.forEach(function(item) {

              artistsName.push(item.name); 
              songURL = item.external_urls.spotify; 
      
          });

          var songObj = {
                artists: artistsName,
                song: song,
                link: songURL,
                album: albumName
            };

          console.log(songObj);
        
        }

    });
  }

}

function findMovie(movie) {

  var axios = require("axios");
  var omddKey = "cf9c461b"

  var nodeArgs = process.argv

  for (var i = 3; i < nodeArgs.length; i++) {

    if (i > 3 && i < nodeArgs.length) {
      movie = movie + "+" + nodeArgs[i];
    }
    else {
      movie += nodeArgs[i];
    }

  }

  if (process.argv[2] !== "do-what-it-says" && process.argv[3] === undefined) {
    movie = "Mr+Nobody+"
  }

  var omdbURL = "http://www.omdbapi.com/?t=" + movie + "=&plot=short&apikey=" + omddKey

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

function findText() {

  var dataArr = [];

  var fs = require("fs");

  fs.readFile("random.txt", "utf8", function(error, data) {

    if (error) {
      return console.log(error);
    }

    dataArr = data.split(",");
    

    console.log(dataArr);

    for (var i = 0; i < dataArr.length; i++) {
     
      if (dataArr[i] == "spotify-this-song") {
       findSong(dataArr[i+1]);
      }
      else if (dataArr[i] == "movie-this") {
        findMovie(dataArr[i+1]);
        
      }
      else if (dataArr[i] == "concert-this") {
       findBand(dataArr[i+1]);
       
      }
        
    }

  });


}






      






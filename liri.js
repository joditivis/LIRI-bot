require("dotenv").config();

// require inquirer
const inquirer = require("inquirer");

// require file systems
const fs = require("fs");

// require axios
const axios = require("axios");

// require moment
const moment = require("moment");

// link keys.js file
const keys = require("./keys.js");

// initialize spotify
const Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);

var userInput = process.argv[2];
var searchResult = process.argv.slice(3).join(" ");


// inquirer.prompt([
//         {
//             type: "input",
//             name: "name",
//             message: "Hi! What's your name?"
//         },{
//             type: "confirm",
//             name: "ready",
//             message: "Cool name! I'm LIRI bot. I can help you search for concert locations, songs, and your favorite movie's information. Ready?"
//         }
//     ]).then


function liriCommand(userInput, searchResult) {
    switch (userInput) {
        case "spotify-this-song":
            spotifyThisSong();
            break;

        case "concert-this":
            concertThis();
            break;

        case "movie-this":
            movieThis();
            break;

        case "do-what-it-says":
            doThis();
    }
}
// calling liriCommand function
liriCommand(userInput, searchResult);


function spotifyThisSong() {
    // if search result isn't found, display value for The Sign
    if (!searchResult) {
        searchResult = "The Sign by Ace of Base"
    };

    // spotify search format
    spotify.search({ type: 'track', query: searchResult, limit: 1 }, function (error, data) {
        if (error) {
            return console.log('Error occurred: ' + error);
        }

        // collecting data within array
        var spotifyArr = data.tracks.items;

        for (i = 0; i < spotifyArr.length; i++) {
            console.log("\n-----------------------\n\nArtist: " + data.tracks.items[i].album.artists[0].name +
                "\nSong: " + data.tracks.items[i].name +
                "\nAlbum: " + data.tracks.items[i].album.name +
                "\nSpotify Link: " + data.tracks.items[i].external_urls.spotify + "\n\n-----------------------\n");
        };
    });
}

// function concertThis() {
//     if (!searchResult) {
//         searchResult = "Twenty One Pilots"
//     };

//     axios.get("https://rest.bandsintown.com/artists/" + searchResult + "/events?app_id=codingbootcamp").then(
//         function (response) {
//             // console.log(response);
//             console.log("------------------\n\nName of Venue: " + response.data.venue.name +
//                 "\nVenue Location: " + response.data.venue.address +
//                 "\nDate of Event: " + moment(response.data.datetime).format("MM/DD/YYYY, hh:00 A"));

//         });
// }

function movieThis() {
    if (!searchResult) {
        searchResult = "Mr Nobody";
    };
    // get OMDb API
    axios.get("http://www.omdbapi.com/?t=" + searchResult + "&y=&plot=short&apikey=trilogy").then(
        function (response) {
            console.log("-----------------------\n\nMovie Title: " + response.data.Title +
                "\nRelease Year: " + response.data.Year +
                "\nMovie Rated: " + response.data.Rated +
                "\nIMDb Rating: " + response.data.imdbRating +
                "\nProduced in: " + response.data.Country +
                "\nLanguage: " + response.data.Language +
                "\nPlot: " + response.data.Plot +
                "\nActors: " + response.data.Actors + "\n\n-----------------------")
        })
};

function doThis() {
    // using readfile method to access random.txt file
    fs.readFile("random.txt", "utf8", function(error, data) {
        if (error) {
            return console.log(error);           
        }
        // use .split to separate objects within our file 
        var dataArr = data.split(",");

        // taking objects from random.txt and passing as parameters 
        userInput = dataArr[0];
        searchResult = dataArr[1];

        // calling main function for new parameters
        liriCommand(userInput, searchResult);
    });
};
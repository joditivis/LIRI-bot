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
            doWhat(searchResult);

        // if input is left blank, return this message to user
        default:
        console.log("Please enter one of the following commands: 'concert-this', 'spotify-this-song', 'movie-this', 'do-what-it-says' followed by what you would like to search for.")
    }
}
// calling liriCommand function
liriCommand(userInput, searchResult);


function spotifyThisSong() {
    if (!searchResult) {
        searchResult = "The Sign by Ace of Base"
    };

    spotify.search({ type: 'track', query: searchResult, limit: 1 }, function (error, data) {
        if (error) {
            return console.log('Error occurred: ' + error);
        }

        var spotifyArr = data.tracks.items;

        for (i = 0; i < spotifyArr.length; i++) {
            console.log("-----------------------\n\nArtist: " + data.tracks.items[i].album.artists[0].name +
                "\nSong: " + data.tracks.items[i].name +
                "\nAlbum: " + data.tracks.items[i].album.name +
                "\nSpotify Link: " + data.tracks.items[i].external_urls.spotify + "\n\n-----------------------");
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
            // console.log(response);
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

function doWhat() {
    fs.readFile("random.txt", "utf8", function(error, data) {
        if (error) {
            return console.log(error);
        }
    console.log("\n-----------------------\n\n" + data + "\n\n-----------------------\n");
    })
};
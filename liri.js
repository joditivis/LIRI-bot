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
//         },
//         {
//             type: "confirm",
//             name: "ready",
//             message: "Cool name! I'm LIRI bot, and I can help you search for concert locations, songs, and your favorite movie's information. Ready?"
//         }
//         ]).then(function command() {
//     inquirer.prompt([
//         {
//             type: "command",
//             name: "search",
//             message: "To start, Please enter one of the following commands: 'concert-this', 'spotify-this-song', 'movie-this', or 'do-what-it-says' (to print something random). After one of those commands, type in whatever artist, song, or movie you're wanting me to generate information for!"
//         }
//     ])
// });


function liriCommand(userInput, searchResult) {
    switch (userInput) {
        case "concert-this":
            bandsInTown();
            break;

        case "spotify-this-song":
            spotifyThisSong();
            break;

        case "movieThis":
            movieThis();
            break;

        case "do-what-it-says":
            doWhat(searchResult);

        // if input is left blank, return this message to user
        default:
            console.log("Please enter one of the following commands: 'concert-this', 'spotify-this-song', 'movie-this', 'do-what-it-says' followed by what you would like to search for.")
    }
}
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
            console.log("------------------\n\nArtist: " + data.tracks.items[i].album.artists[0].name +
                "\nSong: " + data.tracks.items[i].name +
                "\nSpotify Link: " + data.tracks.items[i].external_urls.spotify +
                "\nAlbum: " + data.tracks.items[i].album.name + "\n\n------------------");

        };
    });
}

// liriCommand();


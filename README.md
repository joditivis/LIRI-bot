# LIRI-bot

**Link to video tutorial: https://drive.google.com/file/d/12s9xd9Zxx1_u6-vY0XevwukBueWPiOPx/view?usp=sharing**

## About LIRI-bot: 
LIRI is a command line node app that takes in search parameters for songs, 
bands in town, and movies, and returns the data associated with each search type.

When using the app, you must enter one of the commands listed below in your command line, followed by whatever information associated with that subject you would like it to return:
'spotify-this-song', 'concert-this', 'movie-this', 'do-what-it-says'

For search results, LIRI bot makes calls to the Bands in Town API, Spotify API, and OMDb API.

 ```
- Example input: node liri.js spotify-this-song africa

- Output: 
* Artist: TOTO
* Song: Africa
* Album: Toto IV
* Spotify Link: https://open.spotify.com/track/2374M0fQpWi3dLnB54qaLX
```


- If you would like to clone this repo, you will have to include your own .env file with your personal Spotify ID and Secret.
- The format of your .env file should be as follows:
```
# Spotify API keys

SPOTIFY_ID=<your spotify id>
SPOTIFY_SECRET=<your spotify secret>
```
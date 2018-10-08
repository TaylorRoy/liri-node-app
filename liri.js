require("dotenv").config();
var Spotify = require('node-spotify-api');
var request = require("request");
var fs = require("fs");
var keys = require("./keys");
var moment = require('moment');

var spotify = new Spotify(keys.spotify);
// console.log(spotify);
// console.log("ID: " + spotify.credentials.id);
// console.log("Secret: " + spotify.credentials.secret);

var nodeArray = process.argv;
// console.log("nodeArray = " + nodeArray);
// console.log("nodeArray[2] = " + nodeArray[2]);
// console.log("nodeArray[3] = " + nodeArray[3]);

// spotify API- song information
if (nodeArray[2] === "spotify-this-song") {

    if (nodeArray[3]) {
        var search = nodeArray[3].replace("-", "+")

        spotify.request('https://api.spotify.com/v1/search?q=' + search + "&offset=0&limit=20&type=track", function (error, response, body) {
            if (error) {
                console.log("spotify error");
            }

            else {
                console.log("-------------------------------------------");
                console.log("Track Name: " + JSON.stringify(response.tracks.items[0].name, null, 2));
                console.log("Artist: " + JSON.stringify(response.tracks.items[0].album.artists[0].name, null, 2));
                console.log("Album Name: " + JSON.stringify(response.tracks.items[0].album.name, null, 2));
                console.log("Preview URL: " + JSON.stringify(response.tracks.items[0].preview_url, null, 2));
                console.log("-------------------------------------------");
            }
        })
    }

    if (nodeArray[3] === undefined) {
        spotify.request("https://api.spotify.com/v1/search?q=album:the%20sign%20artist:ace%20of%20base&offset=0&limit=1&type=track", function (error, response, body) {
            console.log("-------------------------------------------");
            console.log("Track Name: " + JSON.stringify(response.tracks.items[0].name, null, 2));
            console.log("Artist: " + JSON.stringify(response.tracks.items[0].album.artists[0].name, null, 2));
            console.log("Album Name: " + JSON.stringify(response.tracks.items[0].album.name, null, 2));
            console.log("Preview URL: " + JSON.stringify(response.tracks.items[0].preview_url, null, 2));
            console.log("-------------------------------------------");
        })
    }
}



//bandsintown- concert information
//need to get specific info from body- venue, venue location, date(MM,DD,YYYY)
if (nodeArray[2] === "concert-this") {
    // console.log("concert-this is running")
    var concertSearch = nodeArray[3].replace("-", "%20");
    // console.log(concertSearch);

    request("https://rest.bandsintown.com/artists/" + concertSearch + "/events?app_id=codingbootcamp", function (error, response, body) {
        if (error) {
            console.log("bands in town error")
        }
        var date = JSON.parse(body)[0].datetime;
        var dateFormat = "YYYY/MM/DD";
        var convertedDate = moment(date, dateFormat);

        // console.log(response);
        // console.log(JSON.stringify(response));
        // console.log(JSON.parse(body));
        console.log("-------------------------------------------");
        console.log("Venue: " + JSON.parse(body)[0].venue.name);
        console.log("Location: " + JSON.parse(body)[0].venue.city)
        console.log("Region: " + JSON.parse(body)[0].venue.city);
        console.log("Date: " + moment(convertedDate).format("MM/DD/YYYY"));
        console.log("-------------------------------------------");
    })
}

//omdp- movie information
if (nodeArray[2] === "movie-this") {
    console.log("movie-this is running")
    if (nodeArray[3]) {

        var search = nodeArray[3].replace("-", "+")
        console.log(search);
        // Then run a request to the OMDB API with the movie specified
        request("http://www.omdbapi.com/?t=" + search + "s&y=&plot=short&apikey=trilogy", function (error, response, body) {

            if (error) {
                console.log("OMDB error")
            }
            // If the request is successful (i.e. if the response status code is 200)
            if (!error && response.statusCode === 200 && nodeArray[3] != undefined) {

                // Parse the body of the site and recover just the imdbRating
                // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
                // console.log(response);
                console.log("-------------------------------------------");
                console.log("Title: " + JSON.parse(body).Title);
                console.log("Year Released: " + JSON.parse(body).Year);
                console.log("Rated: " + JSON.parse(body).Rated);
                console.log("Actors: " + JSON.parse(body).Actors);
                console.log("Plot: " + JSON.parse(body).Plot);
                console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
                console.log("Language: " + JSON.parse(body).Language);
                console.log("Rotten Tomatoes: " + JSON.parse(body).Ratings[1].Value);
                console.log("-------------------------------------------");
            }

        })
    }
    if (nodeArray[3] === undefined) {
        request("http://www.omdbapi.com/?t=mr+nobody&y=&plot=short&apikey=trilogy", function (error, response, body) {
            // console.log(JSON.parse(body));
            console.log("-------------------------------------------");
            console.log("Title: " + JSON.parse(body).Title);
            console.log("Year Released: " + JSON.parse(body).Year);
            console.log("Rated: " + JSON.parse(body).Rated);
            console.log("Actors: " + JSON.parse(body).Actors);
            console.log("Plot: " + JSON.parse(body).Plot);
            console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
            console.log("Language: " + JSON.parse(body).Language);
            console.log("Rotten Tomatoes: " + JSON.parse(body).Ratings[1].Value);
            console.log("-------------------------------------------");
        })
    }
}

//read random.txt file
if (nodeArray[2] === "do-what-it-says") {
    console.log("do-what-it-says is running")
    fs.readFile("random.txt", "utf8", function (error, data) {
        // If an error was experienced we will log it.
        if (error) {
            console.log(error);
        }

        // console.log("bandArraY: " + data.split(","));
        var bandArray = data.split(",");
        var band = bandArray[1];
        // console.log("band: " + band);
        spotify.request('https://api.spotify.com/v1/search?q=' + bandArray[1] + "&offset=0&limit=1&type=track", function (error, response, body) {
            if (error) {
                console.log("do-what-it-says error");
            }
            else {
                console.log("-------------------------------------------");
                console.log("Track Name: " + JSON.stringify(response.tracks.items[0].name, null, 2));
                console.log("Artist: " + JSON.stringify(response.tracks.items[0].album.artists[0].name, null, 2));
                console.log("Album Name: " + JSON.stringify(response.tracks.items[0].album.name, null, 2));
                console.log("Preview URL: " + JSON.stringify(response.tracks.items[0].preview_url, null, 2));
                console.log("-------------------------------------------");
            }
        })
    })
}

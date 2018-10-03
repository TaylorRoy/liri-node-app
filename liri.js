require("dotenv").config();
var request = require("request");
var fs = require("fs");

//var spotify = new Spotify(keys.spotify);

var nodeArray = process.argv;
console.log("nodeArray = " + nodeArray);
console.log("nodeArray[2] = " + nodeArray[2]);
console.log("nodeArray[3] = " + nodeArray[3]);

// spotify API- song information
if (nodeArray[2] === "spotify-this-song") {
    console.log("spotify-this-song is running")
    fs.readFile(".env", "utf8", function (error, data) {
        // If an error was experienced we will log it.
        if (error) {
            console.log(error);
        }
        console.log(data);
        // curl -X "GET" "https://api.spotify.com/v1/search?type=songnamehere&limit=10" -H "Accept: application/json" -H "Content-Type: application/json" -H "Authorization: Bearer <OAuth Token here>"

    })
}

  

//bandsintown- concert information
//need to get specific info from body- venue, venue location, date(MM,DD,YYYY)
if (nodeArray[2] === "concert-this") {
    console.log("concert-this is running")
    var concertSearch = nodeArray[3].replace("-", "%20");
    console.log(concertSearch);

    request("https://rest.bandsintown.com/artists/" + concertSearch + "/events?app_id=codingbootcamp", function (error, response, body) {
        if (error) {
            console.log("bands in town = error")
        }
        // console.log(response);
        // console.log(JSON.stringify(response));
        console.log(JSON.parse(body));
        console.log("length: " + body.length);
    })

}

//omdp- movie information
if (nodeArray[2] === "movie-this") {
    console.log("movie-this is running")
    var search = nodeArray[3].replace("-", "+")
    console.log(search);
    // Then run a request to the OMDB API with the movie specified
    request("http://www.omdbapi.com/?t=" + search + "s&y=&plot=short&apikey=trilogy", function (error, response, body) {

        // If the request is successful (i.e. if the response status code is 200)
        if (!error && response.statusCode === 200 && nodeArray[3] != undefined) {

            // Parse the body of the site and recover just the imdbRating
            // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
            // console.log(response);
            console.log(JSON.parse(body));
            console.log("Title: " + JSON.parse(body).Title);
            console.log("Year Released: " + JSON.parse(body).Year);
            console.log("Rated: " + JSON.parse(body).Rated);
            console.log("Actors: " + JSON.parse(body).Actors);
            console.log("Plot: " + JSON.parse(body).Plot);
            console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
            console.log("Language: " + JSON.parse(body).Language);
           //console.log("Rotten Tomatoes: " + JSON.parse(body).Ratings[1].Value);
            // console.log("The movie's rating is: " + JSON.parse(body).Title);

        }
        if (nodeArray[3] === undefined) {
            request("http://www.omdbapi.com/?t=mr+nobody&y=&plot=short&apikey=trilogy", function (error, response, body) {
                // console.log(JSON.parse(body));
                console.log("Title: " + JSON.parse(body).Title);
                console.log("Year Released: " + JSON.parse(body).Year);
                console.log("Rated: " + JSON.parse(body).Rated);
                console.log("Actors: " + JSON.parse(body).Actors);
                console.log("Plot: " + JSON.parse(body).Plot);
                console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
                console.log("Language: " + JSON.parse(body).Language);
                console.log("Rotten Tomatoes: " + JSON.parse(body).Ratings[1].Value);
                

            });
        }
    })
}
    //read random.txt file
    if (nodeArray[2] === "do-what-it-says") { 
        console.log("do-what-it-says is running")
    fs.readFile("random.txt", "utf8", function (error, data) {
        // If an error was experienced we will log it.
        if (error) {
            console.log(error);
        }  
       
            console.log(data.split(","));
            var bandArray = data.split(",");
            var band = bandArray[1];
            console.log("band: " + band);
            request("https://rest.bandsintown.com/artists/" + band + "/events?app_id=codingbootcamp", function (error, response, body) {
        if (error) {
            console.log("bands in town = error")
        }
        console.log("WORKED!!!");
        //  console.log(response);
        // // console.log(JSON.stringify(response));
        // console.log(body);
        // console.log("length: " + body.length);
    })
    })
}

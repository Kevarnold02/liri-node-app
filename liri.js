// connection to keys.js file to get the api keys.
var apiKeys = require("./keys.js");
var twitter = require('twitter');
var spotify = require('spotify');
var request = require('request');
var fs = require('fs');


// console data
var userSelection = process.argv[2];
var infoFromUserInput = process.argv[3];

//switch function to check user input argument
function switchFunction(userSelection, infoFromUserInput){
  switch (userSelection) {
    case "my-tweets":
      TwitterCall();
      break;
    case "spotify-this-song":
      SpotifyCall(infoFromUserInput);
      break;
    case "movie-this":
      MovieCall(infoFromUserInput);
      break;
    case "do-what-it-says":
      WhatitSaysCall();
      break;
    default:
      userSelection = "No Command";
      infoFromUserInput = "no arguments";
      console.log("invalid command. Valid commands consist of: ");
  }
};
switchFunction(userSelection, infoFromUserInput);

//function for twitter callback
function TwitterCall() {
	infoFromUserInput = "Previous 20 tweets"

	var client = new twitter(apiKeys.twitterKeys);
	var params = {screen_name: 'kevarnold01', count: 20};
	client.get('statuses/user_timeline', params, function(error, tweets, respone){
		if (!error) {
			for (var k = 0; k < tweets.length; k++) {
				console.log(tweets[k].created_at + " : " + tweets[k].text);
			}
		}else {
			console.log(error);
		}
	});
}

function SpotifyCall(infoFromUserInput) {
	if (infoFromUserInput == undefined) {
		infoFromUserInput = "what/'s my age again";
	} else {
		infoFromUserInput = infoFromUserInput;
	}

	spotify.search({ type: 'track', query: infoFromUserInput, limit:1 },

	function(err, data) {
		if ( err ) {
			console.log('Warning! Error: ' + err);
			return;
		}
		console.log("Artist: " + data.tracks.items[0].artists[0].name);
		console.log("Album: " + data.tracks.items[0].album.name);
		console.log("Song Name: " + data.tracks.items[0].name);
		console.log("Preview This Song: " + data.tracks.items[0].preview_url);
	});
}





// if (userSelection == "my-tweets") {
// 	myTweets();
// } else if (userSelection == "spotify-this-song"){
// 	mySpotify(infoFromUserInput);
// } else if (userSelection == "movie-this") {
// 	omdb(infoFromUserInput);
// } else if (userSelection == "do-what-it-says") {
// 	doWhatItSays();
// }

// function myTweets() {
// 	var a = twitterKeys;
// 	var parameter = {}
// }

// switch(infoFromUserInput) {
//     case my-tweets:
//         console.log('tweet');
//         break;
//     case spotify-this-song:
//         console.log('spotify');
//         break;
//     case movie-this:
//         console.log('movie');
//         break;
//     case do-what-it-says:
//         console.log('do it');
//         break;
//     default:
//         console.log("default");
// };

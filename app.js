//var input = process.argv[2];
var fs = require('fs');
var request = require('request');
var prompt = require('prompt');
var filename = 'joke.txt';

prompt.start();
prompt.get('search_term', function(err, result) {
	if (result.search_term === 'leaderboard') {
		leaderBoard();
	} else {
		getJoke(result.search_term);
	}	
});

function getJoke(input) {
	request({headers:{"Accept":"text/plain", "search_term":"`${input}`"}, uri: 'https://icanhazdadjoke.com/'}, function(err, res, body) {
		//console.log(res);
		if(body) {
			console.log(body + '\n');
		
			fs.appendFile(filename, body + '\n', function(err) {
				if(err) {
					console.log(err);
				}
			});
		} else {
			console.log('There ia no jokes were found for that search term.');
		}
	});
}

function leaderBoard(){
	fs.readFile(filename, function(err, data) {
		if (err) {
			console.error(err);
		} else {
			var str = data.toString();
			var jokes = str.split('\n');
			var count = {};
			var max = 0;
			var result;
			jokes.forEach(joke  => {
				count[joke] = (count[joke] || 0) + 1;
				if (count[joke] > max) {
					max = count[joke];
					result = joke;
				}
			});
			console.log('The most popular joke:\n' + result);
		}
	});
}

require('../httprequire');

var
	async = httprequire('https://dl.dropboxusercontent.com/u/368535/async.js');
//	async = require('async');

async.each(
	[11,12,13],
	function(x,next){
		console.log("X: "+x);
		next();
	},
	function(err){
		console.log("end");
	}
);

require('../httprequire');

var
	start = new Date().getTime(),
	async = httprequire('http://dl.dropboxusercontent.com/u/368535/async.js');

console.log("First: ",(new Date().getTime()-start)+" ms");

start = new Date().getTime();
async = httprequire('http://dl.dropboxusercontent.com/u/368535/async.js');
console.log("Second: ",(new Date().getTime()-start)+" ms");

start = new Date().getTime();
async = httprequire('http://dl.dropboxusercontent.com/u/368535/async.js',true);
console.log("Third: ",(new Date().getTime()-start)+" ms");

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

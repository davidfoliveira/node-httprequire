require('../httprequire');

var start = new Date().getTime();

httprequire('http://dl.dropboxusercontent.com/u/368535/async.js',function(async_first){
	console.log("First: ",(new Date().getTime()-start)+" ms");

	start = new Date().getTime();
	httprequire('http://dl.dropboxusercontent.com/u/368535/async.js',function(async){
		console.log("Second: ",(new Date().getTime()-start)+" ms");

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
	});
});

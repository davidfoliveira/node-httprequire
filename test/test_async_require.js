require('../httprequire');

httprequire('http://dl.dropboxusercontent.com/u/368535/async.js',function(async){

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

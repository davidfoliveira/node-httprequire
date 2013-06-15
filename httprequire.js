// Object is empty ?

var _isEmpty = function(o) { return ((o == null) || (o instanceof Array && o.length == 0) || (typeof(o) == "object" && Object.keys(o).length == 0)) };


// Run remote code

var _eval = function(data) {

	var
		module = { exports: {} };

	(function(){
		var
			exports = {};

		try {
			eval(data);
		}
		catch(ex){
			throw new Error("Exception evaluating remote code '"+code+"'");
		}
		if ( !_isEmpty(exports) && _isEmpty(module.exports) )
			module.exports = exports;
	})();

	return module.exports;

};


// Syncronous require

var _syncRequire = function(url) {

	var
		httpsync = require('httpsync'),
		req = httpsync.get({url: url}),
		res = req.end(),
		data = res.data.toString();

	if ( !data ) {
		console.log("Got no data. Status was: "+res.status);
		return null;
	}

	// Eval the code

	return _eval(data);

};


// Asyncronous require

var _asyncRequire = function(url,handler) {

	var
		http = require('http'),
		data = '';

	http.get(url, function(res) {
		if ( res.statusCode != 200 )
			return handler(null);
		res.setEncoding('utf8');
		res.on('data', function(chunk){ data += chunk; });
		res.on('end', function(){
			return handler(_eval(data));
		});
	}).on('error',function(){handler(null);});

};


// Set global httprequire function

global.httprequire = function(url,handler) {

	return handler ? _asyncRequire(url,handler) : _syncRequire(url);

};

// Object is empty ?

var _isEmpty = function(o) { return ((o == null) || (o instanceof Array && o.length == 0) || (typeof(o) == "object" && Object.keys(o).length == 0)) };

var _cache = { };

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

var _syncRequire = function(url,force) {

	if ( !force && _cache[url] != null )
		return _cache[url];

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

	_cache[url] = _eval(data);
	return _cache[url];

};


// Asyncronous require

var _asyncRequire = function(url,force,handler) {

	if ( !force && _cache[url] != null )
		return handler(_cache[url]);

	var
		http = require('http'),
		data = '';

	http.get(url, function(res) {
		if ( res.statusCode != 200 )
			return handler(null);
		res.setEncoding('utf8');
		res.on('data', function(chunk){ data += chunk; });
		res.on('end', function(){
			_cache[url] = _eval(data);
			return handler(_cache[url]);
		});
	}).on('error',function(){handler(null);});

};


// Set global httprequire function

global.httprequire = function(url,force,handler) {

	if ( typeof force == "function" ) {
		handler = force;
		force = false;
	}

	return handler ? _asyncRequire(url,force,handler) : _syncRequire(url,force);

};

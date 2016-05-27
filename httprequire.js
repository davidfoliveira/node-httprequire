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
			throw new Error("Exception evaluating remote code '"+data+"'");
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
		res = require('urllib-sync').request(url);
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

	var request = require('request') ;
	request.get({url: url}, function(e, r, b) {
		if ( r.statusCode != 200)
			return handler(null) ;
		_cache[url] = _eval(b) ;
		return handler(_cache[url]) ;
	}) ;

};


// Set global httprequire function

global.httprequire = function(url,force,handler) {

	if ( typeof force == "function" ) {
		handler = force;
		force = false;
	}

	return handler ? _asyncRequire(url,force,handler) : _syncRequire(url,force);

};

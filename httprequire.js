var
	httpsync = require('httpsync'),
	_isEmpty = function(o) { return ((o == null) || (o instanceof Array && o.length == 0) || (typeof(o) == "object" && Object.keys(o).length == 0)) };


// Set global httprequire function

global.httprequire = function(url) {

	var
		req = httpsync.get({url: url}),
		res = req.end(),
		data = res.data.toString();

	if ( !data ) {
		console.log("Got no data. Status was: "+res.status);
		return null;
	}

	// Run remote code

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
		if ( !_isEmpty(exports) && isEmpty(module.exports) )
			module.exports = exports;
	})();

	return module.exports;

};

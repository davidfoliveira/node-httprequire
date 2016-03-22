# httprequire: A way to include remote node.js modules

[![Build Status](https://travis-ci.org/grantchiu011101/node-httprequire.svg?branch=master)](https://travis-ci.org/grantchiu011101/node-httprequire)

`httprequire` is a module that allows you to require other node.js modules that are accessible through http/https.


# Installing

	npm install httprequire --save


# Using

Just write this line on the top of your code:

	var httprequire = require('httprequire');

After that you can require remote modules using `httprequire()`:

	var
        async = httprequire('http://pz.org.pt/~david/projects/node/tmp/async.js');

If you prefer an asyncronous way of requiring a module:

	httprequire('http://pz.org.pt/~david/projects/node/tmp/async.js',function(async){
		// do something here
	});


# Cache

By default `httprequire()` will cache the results of `http.get()` and will use them if the same URL is required on the future. To bypass the cache, pass a `true` after the URL.

Example:

	async = httprequire('http://pz.org.pt/~david/projects/node/tmp/async.js',true);



changelog

0.1.0
* replace httpsync with urllib-sync
* add https support
* add http header 302 (http redirect) support

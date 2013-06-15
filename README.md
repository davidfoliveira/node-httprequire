# httprequire: A way to include remote node.js modules

`httprequire` is a module that allows you to require other node.js modules that are accessible through http. For syncronous HTTP GET's, it depends of `httpsync`, so unfortunately https is not supported by default.

# Installing

	npm install httprequire

# Using

Just write this line on the top of your code:

	require('httprequire');

After that you can require remote modules using `httprequire()`:

	var
	    async = httprequire('http://pz.org.pt/~david/projects/node/tmp/async.js');

If you preffer an asyncronous way of requiring a module:

	httprequire('http://pz.org.pt/~david/projects/node/tmp/async.js',function(async){
		// stuff
	});

# Dependences

This module depends of `httpsync` for performing syncronous http requests and completelly relies on node.js `global` variable and `module` structure. If on the future node.js changes the structure of these 2 variables, can eventually break `httprequire`.

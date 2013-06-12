# httprequire: A way to include remote node.js modules

`httprequire` is a module that allows you to require other node.js modules that are accessible through http. It depends of `httpsync`, so unfortunately https is not supported by default.

# Installing

	npm install httprequire

# Using

Just write this line on the top of your code:

	require('httprequire');

After that you can require remote modules using `httprequire()`:

	var
	    async = httprequire('http://pz.org.pt/~david/projects/node/tmp/async.js');

# Dependences

This module depends of `httpsync` for performic syncronous http requests and completelly relies on node.js `global` variable and `module` structure. If, on the future, node.js change the structure of these 2 variables, can eventually break `httprequire`.

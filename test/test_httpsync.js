var httpsync = require('httpsync');
var req = httpsync.get({ url : "http://cnodejs.org"});
var res = req.end();
console.log(res);

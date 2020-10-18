const fs = require('fs');
module.exports.log = function (msg, error) {
	var split = 0;
  for (var n = 0; n < msg.length; n++) {
		split += "=";
	}
	console.log('\x1b[33m%s\x1b[0m', split);
	if (error) {
		console.log('\x1b[31m%s\x1b[0m', msg);
	} else {
		console.log('\x1b[36m%s\x1b[0m', msg);
	}
	console.log('\x1b[33m%s\x1b[0m', split);
	fs.appendFileSync('log.txt', `${msg}\n`, 'utf8');
};
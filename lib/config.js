var request = require('request');

var apiUrl = 'https://leekwars.com/api';
var cookieJar = request.jar();

exports.apiUrl = apiUrl;
exports.cookieJar = cookieJar;

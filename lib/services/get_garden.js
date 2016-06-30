
var request = require('request');
var config = require('../config');


function get_garden(callback) {
    var reqOptions = {
        method  : 'GET',
        url     : config.apiUrl + '/garden/get/' + token,
        jar     : config.cookieJar
    };

    request(
        reqOptions,
        function( error, response, body ) {
            if (error) {
              return console.error('Request failed:', error);
            }
            var data = JSON.parse( body );
            callback(data);
        }
    );
}


module.exports = get_garden;

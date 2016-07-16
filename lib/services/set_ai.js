
var request = require('request');
var config = require('../config');


function set_ai(leekId, aiId, callback) {

    var reqOptions = {
        method  : 'POST',
        url     : config.apiUrl + '/leek/set-ai/',
        jar     : config.cookieJar,
        form    : {
            'token' : token,
            'leek_id': leekId,
            'ai_id': aiId
        }
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


module.exports = set_ai;

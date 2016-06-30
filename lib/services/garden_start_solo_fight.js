var request = require('request');
var config = require('../config');



function garden_start_solo_fight(leekId, targetId, callback)
{
    var reqOptions = {
        method  : 'POST',
        url     : config.apiUrl + '/garden/start-solo-fight',
        jar     : config.cookieJar,
        form    : {
            'token' : token,
            'leek_id': leekId,
            'target_id': targetId
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
};

module.exports = garden_start_solo_fight;

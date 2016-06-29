var request = require('request');
var config = require('../config');


function garden_start_farmer_fight(targetId, callback)
{
    var reqOptions = {
        method  : 'POST',
        url     : config.apiUrl + '/garden/start-farmer-fight',
        jar     : config.cookieJar,
        form    : {
            'token' : token,
            'target_id': targetId
        }
    };

    request(
        reqOptions,
        function( error, response, body ) {
            var data = JSON.parse( body );
            callback(data);
        }
    );
};


module.exports = garden_start_farmer_fight;

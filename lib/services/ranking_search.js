var request = require('request');
var config = require('../config');



function ranking_search(search, leeks, farmers, teams, callback)
{
    var reqOptions = {
        method  : 'GET',
        url     : config.apiUrl + '/ranking/search/' + search + '/' + leeks + '/' + farmers + '/' + teams,
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
};

module.exports = ranking_search;

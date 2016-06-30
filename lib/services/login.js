var fs      = require('fs');
var request = require('request');
var config = require('../config');

function login(callback) {
    getConnectWithLoginAndPassword('config.json', callback);
}


function readConfig( file ) {
    try {
        var data = fs.readFileSync( __dirname + '/../../config/' + file );

        user = JSON.parse( data.toString() );
    } catch( err ) {
        console.log( 'Error : ' + err );
        console.log( 'Fichier de config incorrecte.' );
        console.log( __dirname + '/../../config/' + file );

        process.exit();
    }
};


function getConnectWithLoginAndPassword( configFile, callback ) {

    readConfig( configFile );

    if ( !user.hasOwnProperty('username') && !user.hasOwnProperty('password') ) {
        var schema = {
            properties: {
                login: {
                    pattern: /^[a-zA-Z\s\-]+$/,
                    message: 'Login must be only letters, spaces, or dashes',
                    required: true,
                    description: 'login: '
                },
                password: {
                    hidden: true,
                    description: 'password: '
                }
            }
        };


        prompt.message = '>';
        prompt.delimiter = ' ';

        prompt.start();

        prompt.get(schema, function (err, result) {
            user.username = result.login;
            user.password = result.password;
            connect(callback);
        });
    } else if ( !user.hasOwnProperty('password') ) {
        var schema = {
            properties: {
                password: {
                    hidden: true,
                    description: 'password: '
                }
            }
        };

        prompt.message = '>';
        prompt.delimiter = ' ';

        prompt.start();

        prompt.get(schema, function (err, result) {
            user.password = result.password;
            connect(callback);
        });
    } else {
        connect(callback);
    }
}

function connect(callback) {
    var reqOptions = {
        method  : 'POST',
        url     : config.apiUrl + '/farmer/login-token',
        jar     : config.cookieJar,
        form    : {
            'login'    : user.username,
            'password' : user.password
        }
    };

    request(
        reqOptions,
        function( error, response, body ) {
            if (error) {
              return console.error('Request failed:', error);
            }

            var data = JSON.parse( body );


            if( data.success ) {
                token = data.token;
                callback(data);
            } else {
                console.log('Connexion error :(');
            }
        }
    );
}

module.exports = login;

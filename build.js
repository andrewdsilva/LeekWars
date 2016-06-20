/*
    @project   LeekWarsBuilder
    @author    Nathan Lopez
    @version   1.0
*/

/* Imports */
var fs      = require('fs');
var request = require('request');
var prompt  = require('prompt');
var path    = require('path');

/* Param */
var apiUrl = 'https://leekwars.com/api';
var iaName = process.argv[2];
var token;
var user = {username: '', password: ''};

/* Programme */

function readConfig( file ) {
    try {
        var data = fs.readFileSync( __dirname + '/config/' + file );

        user = JSON.parse( data.toString() );
    } catch( err ) {
        console.log( 'Error : ' + err );
        console.log( 'Fichier de config incorrecte.' );
        console.log( __dirname + '/config/' + file );

        process.exit();
    }
};

function getLoginAndPassword( configFile, callback ) {

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
            callback();
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
            callback();
        });
    } else {
        callback();
    }
}

function connect() {
    var reqOptions = {
        method  : 'POST',
        url     : apiUrl + '/farmer/login-token',
        form    : {
            'login'    : user.username,
            'password' : user.password
        }
    };

    request(
        reqOptions,
        function( error, response, body ) {
            var data = JSON.parse( body );

            if( data.success ) {
                console.log('Successful login!');

                token = data.token;

                getAis();
            } else {
                console.log('Connexion error :(');
            }
        }
    );
}

function getAis() {
    var reqOptions = {
        method  : 'GET',
        url     : apiUrl + '/ai/get-farmer-ais/' + token
    };

    request(
        reqOptions,
        function( error, response, body ) {
            var data = JSON.parse( body );

            var id = -1;
            for( var i = 0; i < data.ais.length; i++ ) {
                if( data.ais[i].name == iaName ) {
                    id = data.ais[i].id;
                }
            }

            var iaCode = getIaCode();

            if( id == -1 ) {
                createIa( iaCode );
            } else {
                updateIa( id, iaCode );
            }
        }
    );
}

function getIaCode() {
    var main = fs.readFileSync(__dirname + '/' + iaName).toString();
    var filePath = path.dirname(__dirname + '/' + iaName);
    var code = '';

    var file = main.split(/\r?\n/);
    var usefullLines = '';

    for (var i = 0; i < file.length; i++) {
        var dependency = file[i].match(/include\(\'([^\"]*)\'\)/);
        if (dependency && dependency.length > 1) {
            code += fs.readFileSync( filePath + '/' + dependency[1] ).toString() + '\n';
        } else {
            usefullLines += file[i] + '\n';
        }
    }

    code += usefullLines;

    return code;
}

function createIa( iaCode ) {
    var reqOptions = {
        method  : 'POST',
        url     : apiUrl + '/ai/new',
        form    : {
            'token' : token
        }
    };

    request(
        reqOptions,
        function( error, response, body ) {
            var data = JSON.parse( body );

            var id = data.ai.id;

            reqOptions = {
                method  : 'POST',
                url     : apiUrl + '/ai/rename',
                form    : {
                    'token'    : token,
                    'ai_id'    : id,
                    'new_name' : iaName
                }
            };

            request(
                reqOptions,
                function( error, response, body ) {
                    var data = JSON.parse( body );

                    console.log('Ia file created!');

                    updateIa( id, iaCode );
                }
            );
        }
    );
}

function updateIa( id, iaCode ) {
    reqOptions = {
        method  : 'POST',
        url     : apiUrl + '/ai/save',
        form    : {
            'token'    : token,
            'ai_id'    : id,
            'code'     : iaCode
        }
    };

    request(
        reqOptions,
        function( error, response, body ) {
            var data = JSON.parse( body );

            console.log('Ia updated!');
        }
    );
}

if( process.argv.length < 2 || !iaName ) process.exit();

getLoginAndPassword( 'config.json', connect );

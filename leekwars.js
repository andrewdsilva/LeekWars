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
var sprintf = require("sprintf-js").sprintf;
var readline = require('readline');

//Debug
var util    = require('util');

/* Param */
var apiUrl = 'https://leekwars.com/api';
var iaName = process.argv.length > 3 ? process.argv[3] : process.argv[2];
var iaFile = process.argv[2];
var token;
var userData;
var user = {username: '', password: ''};

require('yargs')
    .usage('$0 <cmd> [args]')
    .command('garden-solo <name>', 'Look for a solo garden fight for a leek', {}, function(argv){
      login(function(data) {
        getGarden(function(data){
            Object.keys(data.garden.leeks).forEach(function(key) {
                  value = data.garden.leeks[key]
                  if (value.name == argv.name)
                  {

                      var leekId = value.id;
                      var i = 1;

                      var oponents = data.garden.solo_enemies[leekId];
                      console.log("Choose your oponent:");
                      console.log("----------------------------------------");
                      console.log("\t          Name\tLevel\tTalent");
                      Object.keys(oponents).forEach(function(key) {
                            value = oponents[key]
                            console.log(i + "\t" + sprintf("%15s", value.name) + "\t" + value.level + "\t" + value.talent );
                            i++;
                        });
                      var rl = readline.createInterface(process.stdin, process.stdout);
                      rl.setPrompt('> ');
                      rl.prompt();
                      rl.on('line', function(line) {
                          if (line > 0 && line < i){
                            gardenStartSoloFight(leekId, oponents[line-1].id, function(data){
                              var fightId = data.fight;
                              console.log(require('util').inspect(data, { depth: null }));
                              getFight(fightId, function(data) {
                                if (data.fight["leeks" + data.fight.winner][0].name == argv.name)
                                {
                                  console.log("You won !");
                                }
                                else {


                                }
                              })
                            })
                            //OK, we've finished
                            rl.close();
                          }
                          else {
                              rl.prompt();
                          }

                        });

                  }
              })
        });
      });
    })
    .command('list <type>', 'List items', {}, function (argv) {
      switch (argv.type) {
        case "leeks":
          login(function(data) {
            console.log("Leeks for " + data.farmer.login);
            console.log('----------------------------')
            console.log("          Name\tLevel\tTalent\tCapital");
            Object.keys(data.farmer.leeks).forEach(function(key) {
                  value = data.farmer.leeks[key]
                  console.log(sprintf("%15s", value.name) + "\t" + value.level + "\t" + value.talent + "\t" + value.capital);
              })
          }

        );
        break;
        case "ais":
            login(function(data) {
                console.log("Ais for " + data.farmer.login);
                console.log('----------------------------')

                data.farmer.ais.forEach(function(value) {
                      console.log(value.name);
                  })
              }

            );
            break;
        default:
            console.log('Type must be (leeks|ais)')
      }
    })
    .help('help')
    .argv




/* Programme */

////////////////////////////////////////////////////////////////
// Login code
////////////////////////////////////////////////////////////////

function login(callback) {
    getConnectWithLoginAndPassword('config.json', callback);
}


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
                token = data.token;
                callback(data);
            } else {
                console.log('Connexion error :(');
            }
        }
    );
}

////////////////////////////////////////////////////////////////
// END Login code
////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////
// Commands
////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////
// get Garden
////////////////////////////////////////////////////////////////

function getGarden(callback) {
    var reqOptions = {
        method  : 'GET',
        url     : apiUrl + '/garden/get/' + token
    };

    request(
        reqOptions,
        function( error, response, body ) {
            var data = JSON.parse( body );
            callback(data);
        }
    );
}

function gardenStartSoloFight(leekId, targetId, callback)
{
  var reqOptions = {
      method  : 'POST',
      url     : apiUrl + '/garden/start-solo-fight',
      form    : {
          'token' : token,
          'leek_id': leekId,
          'target_id': targetId
      }
  };

  console.log(require('util').inspect(reqOptions, { depth: null }));

  request(
      reqOptions,
      function( error, response, body ) {
          var data = JSON.parse( body );
          callback(data);
      }
  );
}


////////////////////////////////////////////////////////////
// Get fight
/////////////////////////////////////////////////////////////

function getFight(fightId, callback) {
    var reqOptions = {
        method  : 'GET',
        url     : apiUrl + '/fight/get/' + fightId
    };

    request(
        reqOptions,
        function( error, response, body ) {
            var data = JSON.parse( body );
            callback(data);
        }
    );
}

////////////////////////////////////////////////////////////////
// END Commands
////////////////////////////////////////////////////////////////

/*
    @project   LeekWarsBuilder
    @author    Nathan Lopez
    @version   1.0
*/

/* Imports */
var prompt  = require('prompt');
var path    = require('path');
var sprintf = require("sprintf-js").sprintf;
var readline = require('readline');

//Debug
var util    = require('util');

//Local
//Todo: remove when not needed
var services = require('./lib/services');

var commands = require('./lib/commands');


/* Param */
var iaName = process.argv.length > 3 ? process.argv[3] : process.argv[2];
var iaFile = process.argv[2];
var token;
var userData;
var user = {username: '', password: ''};

require('yargs')
    .usage('$0 <cmd> [args]')
    .command('garden-solo <name>', 'Look for a solo garden fight for a leek', {}, function(argv){
      services.login(function(data) {
        services.get_garden(function(data){
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
                            services.garden_start_solo_fight(leekId, oponents[line-1].id, function(data){
                              var fightId = data.fight;
                              services.get_fight(fightId, function(data) {
                                if (data.fight.winner == -1)
                                {
                                  console.log("It's a draw !");
                                }
                                else if (data.fight["leeks" + data.fight.winner][0].name == argv.name)
                                {
                                  console.log("You won !");
                                }
                                else {
                                  console.log("You lost !");

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
    .command('garden-farmer', 'Look for a solo garden fight for a farmer', {}, function(argv){
      services.login(function(data) {
        services.get_garden(function(data){
          var oponents = data.garden.farmer_enemies;
          var i = 1;
          console.log("Choose your oponent:");
          console.log("----------------------------------------");
          console.log("\t          Name\tTalent");
          Object.keys(oponents).forEach(function(key) {
                value = oponents[key]
                console.log(i + "\t" + sprintf("%15s", value.name) + "\t" + value.talent );
                i++;
          });
          var rl = readline.createInterface(process.stdin, process.stdout);
          rl.setPrompt('> ');
          rl.prompt();
          rl.on('line', function(line) {
            if (line > 0 && line < i){
              services.garden_start_farmer_fight(oponents[line-1].id, function(data){
                var fightId = data.fight;
                services.get_fight(fightId, function(data) {
                  if (data.fight.winner == -1)
                  {
                    console.log("It's a draw !");
                  }
                  else if (data.fight["leeks" + data.fight.winner][0].name == argv.name)
                  {
                    console.log("You won !");
                  }
                  else {
                    console.log("You lost !");

                  }
                })
              });
              //OK, we've finished
              rl.close();
            }
            else {
                rl.prompt();
            }});
          });
      });
    })
    .command('list <type>', 'List items', {}, function (argv) {
      switch (argv.type) {
        case "leeks":
          commands.list_leeks();
        break;
        case "ais":
            commands.list_ais();
            break;
        default:
            console.log('Type must be (leeks|ais)')
      }
    })
    .help('help')
    .argv




/* Programme */

////////////////////////////////////////////////////////////////

function listLeeks(data) {
  console.log("Leeks for " + data.farmer.login);
  console.log('----------------------------')
  console.log("          Name\tLevel\tTalent\tCapital");
  Object.keys(data.farmer.leeks).forEach(function(key) {
        value = data.farmer.leeks[key]
        console.log(sprintf("%15s", value.name) + "\t" + value.level + "\t" + value.talent + "\t" + value.capital);
    })
}

function listAis(data) {
  console.log("Ais for " + data.farmer.login);
  console.log('----------------------------')

  data.farmer.ais.forEach(function(value) {
        console.log(value.name);
    })
}
// Commands
////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////
// END Commands
////////////////////////////////////////////////////////////////

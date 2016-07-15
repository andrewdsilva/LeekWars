#!/usr/bin/nodejs

/*
@project   LeekWarsBuilder
@author    Nathan Lopez
@version   1.0
*/

//Local
var commands = require('./lib/commands');

require('yargs')
    .usage('$0 <cmd> [args]')
    .command('garden-solo <name>', 'Look for a solo garden fight for a leek', {
                auto: {
                alias: 'a',
                describe: 'Automatically choose oponent',
                },
                number: {
                alias: 'n',
                describe: 'Number of fights',
                }
            },
        function(argv){
            commands.garden_start_solo_fight(argv);
        })
    .command('garden-farmer', 'Look for a solo garden fight for a farmer', {
                auto: {
                alias: 'a',
                describe: 'Automatically choose oponent',
                },
                number: {
                alias: 'n',
                describe: 'Number of fights',
                }
            }, function(argv){
        commands.garden_start_farmer_fight(argv);
    })
    .command('garden-team <name>', 'Look for a team garden fight for a composition', {
                auto: {
                alias: 'a',
                describe: 'Automatically choose oponent',
                },
                number: {
                alias: 'n',
                describe: 'Number of fights',
                }
            },
        function(argv){
            commands.garden_start_team_fight(argv);
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

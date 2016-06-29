#!/usr/bin/nodejs

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

require('yargs')
    .usage('$0 <cmd> [args]')
    .command('garden-solo <name>', 'Look for a solo garden fight for a leek', {}, function(argv){
        commands.garden_start_solo_fight(argv);
    })
    .command('garden-farmer', 'Look for a solo garden fight for a farmer', {}, function(argv){
        commands.garden_start_farmer_fight();
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

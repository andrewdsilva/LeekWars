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


/* Param */
var iaName = process.argv.length > 3 ? process.argv[3] : process.argv[2];
var iaFile = process.argv[2];
var token;
var userData;
var user = {username: '', password: ''};

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

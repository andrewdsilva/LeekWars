
var commands = {};

commands.list_leeks = require('./commands/list_leeks');
commands.list_ais = require('./commands/list_ais');
commands.set_ai = require('./commands/set_ai');
commands.ab_test = require('./commands/ab_test');
commands.garden_start_solo_fight = require('./commands/garden_start_solo_fight');
commands.garden_start_solo_challange = require('./commands/garden_start_solo_challange');
commands.garden_start_farmer_fight = require('./commands/garden_start_farmer_fight');
commands.garden_start_team_fight = require('./commands/garden_start_team_fight');

module.exports = commands;

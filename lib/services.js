

var services = {};

services.login = require('./services/login');
services.garden_start_farmer_fight = require('./services/garden_start_farmer_fight');
services.garden_start_solo_fight = require('./services/garden_start_solo_fight');
services.garden_start_solo_challange = require('./services/garden_start_solo_challange');
services.garden_start_team_fight = require('./services/garden_start_team_fight');
services.ranking_search = require('./services/ranking_search');
services.get_garden = require('./services/get_garden');
services.get_fight = require('./services/get_fight');

module.exports = services;

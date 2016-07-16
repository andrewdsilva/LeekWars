
var services = require("../services");
var sprintf = require("sprintf-js").sprintf;
var readline = require('readline');

function select_enemy_auto(compositionId, teamId, choices, callback)
{
    var chosen_composition = null;
    var chosen_composition_score = 10000000000000;//Inf
    Object.keys(choices).forEach(function(key) {
        value = choices[key]
        var score = value.talent;
        if (score < chosen_composition_score)
        {
            chosen_composition = value;
            chosen_composition_score = score;
        }
    });
    console.log("Chosen Composition" + sprintf("%15s", chosen_composition.team.name) + "\t" + chosen_composition.talent );
    launch_fight(compositionId, teamId, chosen_composition.id, callback);
}

function select_enemy_manuel(compositionId, teamId, choices, callback)
{
    var i = 1;
    console.log("Choose your oponent:");
    console.log("----------------------------------------");
    console.log("\t          Name\tLevel\tTalent");
    Object.keys(choices).forEach(function(key) {
        value = choices[key]
        console.log(i + "\t" + sprintf("%15s", value.team.name) + "\t" + value.talent );
        i++;
    });
    var rl = readline.createInterface(process.stdin, process.stdout);
    rl.setPrompt('> ');
    rl.prompt();
    rl.on('line', function(line) {
        if (line > 0 && line < i){
            launch_fight(compositionId, teamId, choices[line-1].id, callback);
            //OK, we've finished
            rl.close();
        }
        else {
            rl.prompt();
        }

    });

}

function get_fight_result(fightId, callback)
{
    services.get_fight(fightId, function(data) {
        if (data.fight.winner == -1)
        {
            get_fight_result(fightId, callback);
        }
        else {
            callback(data);
        }
    });
}

function launch_fight(compositionId, teamId, enemyId, callback)
{
    services.garden_start_team_fight(compositionId, enemyId, function(data){
        var fightId = data.fight;

        get_fight_result(fightId, function(data) {
            if (data.fight.winner == 0)
            {
                console.log("It's a draw !");
            }
            else if (data.fight["team" + data.fight.winner] == teamId)
            {
                console.log("You won !");
            }
            else {
                console.log("You lost !");

            }

            callback();
        })
    })
}

function start_team_fight(auto, name, callback)
{
    services.get_garden(function(data){
        Object.keys(data.garden.my_compositions).forEach(function(key) {
            value = data.garden.my_compositions[key]
            if (value.name == name)
            {
                if (value.fights == 0)
                {
                    console.log('No fights left');
                    return;
                }
                else{
                    console.log(value.fights + ' fights left');
                }
                var teamId = data.garden.my_team.id;
                var compositionId = value.id;
                var oponents = data.garden.enemies_compositions[compositionId];

                if (auto)
                {
                    select_enemy_auto(compositionId, teamId, oponents, callback);
                }
                else {
                    select_enemy_manuel(compositionId, teamId, oponents, callback);
                }

            }
        })
    });
}


function garden_start_team_fight(argv)
{
    services.login(function(data) {
        var num = argv.number;
        if (num < 1) {
            num = 1;
        }

        var count = 0;

        var callback = function() {
            count ++;
            if (count < num)
            {
                start_team_fight(argv.auto, argv.name, callback);
            }
        }

        start_team_fight(argv.auto, argv.name, callback);

    });
}

module.exports = garden_start_team_fight;

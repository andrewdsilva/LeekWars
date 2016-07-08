
var services = require("../services");
var sprintf = require("sprintf-js").sprintf;
var readline = require('readline');

function select_enemy_auto(compositionId, choices)
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
    launch_fight(compositionId, chosen_composition.id);
}

function select_enemy_manuel(compositionId, choices)
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
            launch_fight(compositionId, choices[line-1].id);
            //OK, we've finished
            rl.close();
        }
        else {
            rl.prompt();
        }

    });

}

function launch_fight(compositionId, enemyId)
{
    services.garden_start_team_fight(compositionId, enemyId, function(data){
        var fightId = data.fight;

        services.get_fight(fightId, function(data) {
            if (data.fight.winner == -1)
            {
                console.log("It's a draw !");
            }
            else if (data.fight["leeks" + data.fight.winner][0].id == compositionId)
            {
                console.log("You won !");
            }
            else {
                console.log("You lost !");

            }
        })
    })
}



function garden_start_team_fight(argv)
{
    services.login(function(data) {
        services.get_garden(function(data){
            Object.keys(data.garden.my_compositions).forEach(function(key) {
                value = data.garden.my_compositions[key]
                if (value.name == argv.name)
                {
                    if (value.fights == 0)
                    {
                        console.log('No fights left');
                        return;
                    }
                    else{
                        console.log(value.fights + ' fights left');
                    }
                    var compositionId = value.id;
                    var oponents = data.garden.enemies_compositions[compositionId];

                    if (argv.auto)
                    {
                        select_enemy_auto(compositionId, oponents);
                    }
                    else {
                        select_enemy_manuel(compositionId, oponents);
                    }

                }
            })
        });
    });
}

module.exports = garden_start_team_fight;

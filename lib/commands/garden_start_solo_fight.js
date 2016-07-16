
var services = require("../services");
var sprintf = require("sprintf-js").sprintf;
var readline = require('readline');

function select_enemy_auto(leekId, choices, callback)
{
    var chosen_leek = null;
    var chosen_leek_score = 10000000000000;//Inf
    Object.keys(choices).forEach(function(key) {
        value = choices[key]
        var score = value.level*100000 + value.talent;
        if (score < chosen_leek_score)
        {
            chosen_leek = value;
            chosen_leek_score = score;
        }
    });
    console.log("Chosen leek" + sprintf("%15s", chosen_leek.name) + "\t" + chosen_leek.level + "\t" + chosen_leek.talent );
    launch_fight(leekId, chosen_leek.id, callback);
}

function select_enemy_manuel(leekId, choices, callback)
{
    var i = 1;
    console.log("Choose your oponent:");
    console.log("----------------------------------------");
    console.log("\t          Name\tLevel\tTalent");
    Object.keys(choices).forEach(function(key) {
        value = choices[key]
        console.log(i + "\t" + sprintf("%15s", value.name) + "\t" + value.level + "\t" + value.talent );
        i++;
    });
    var rl = readline.createInterface(process.stdin, process.stdout);
    rl.setPrompt('> ');
    rl.prompt();
    rl.on('line', function(line) {
        if (line > 0 && line < i){
            launch_fight(leekId, choices[line-1].id, callback);
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


function launch_fight(leekId, enemyId, callback)
{
    services.garden_start_solo_fight(leekId, enemyId, function(data){
        var fightId = data.fight;

        get_fight_result(fightId, function(data) {
            if (data.fight.winner == 0)
            {
                console.log("It's a draw !");
            }
            else if (data.fight["leeks" + data.fight.winner][0].id == leekId)
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

function start_solo_fight(auto, name, callback)
{
    services.get_garden(function(data){
        Object.keys(data.garden.leeks).forEach(function(key) {
            value = data.garden.leeks[key]
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
                var leekId = value.id;
                var oponents = data.garden.solo_enemies[leekId];

                if (auto)
                {
                    select_enemy_auto(leekId, oponents, callback);
                }
                else {
                    select_enemy_manuel(leekId, oponents, callback);
                }

            }
        })
    });
}


function garden_start_solo_fight(argv)
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
                start_solo_fight(argv.auto, argv.name, callback);
            }
        }

        start_solo_fight(argv.auto, argv.name, callback);

        
    });
}

module.exports = garden_start_solo_fight;

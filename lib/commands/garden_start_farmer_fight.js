
var services = require("../services");
var sprintf = require("sprintf-js").sprintf;
var readline = require('readline');

function select_enemy_auto(choices, farmerId)
{
    var chosen_farmer = null;
    var chosen_farmer_score = 10000000000000;//Inf
    Object.keys(choices).forEach(function(key) {
        value = choices[key]
        var score =  value.talent;
        if (score < chosen_farmer_score)
        {
            chosen_farmer = value;
            chosen_farmer_score = score;
        }
    });
    console.log("Chosen farmer" + sprintf("%15s", chosen_farmer.name) + "\t" + chosen_farmer.talent );
    launch_fight(chosen_farmer.id, farmerId);
}

function select_enemy_manuel(choices, farmerId)
{
    var i = 1;
    console.log("Choose your oponent:");
    console.log("----------------------------------------");
    console.log("\t          Name\tTalent");
    Object.keys(choices).forEach(function(key) {
        value = choices[key]
        console.log(i + "\t" + sprintf("%15s", value.name) + "\t" + value.talent );
        i++;
    });
    var rl = readline.createInterface(process.stdin, process.stdout);
    rl.setPrompt('> ');
    rl.prompt();
    rl.on('line', function(line) {
        if (line > 0 && line < i){
            launch_fight(choices[line-1].id, farmerId);
            //OK, we've finished
            rl.close();
        }
        else {
            rl.prompt();
        }
    });
}

function launch_fight(enemyId, farmerId)
{
    services.garden_start_farmer_fight(enemyId,  function(data){
        var fightId = data.fight;
        services.get_fight(fightId, function(data) {
            console.log(require('util').inspect(data.fight.winner, { depth: null }));
            if (data.fight.winner = -1)
            {
                console.log("Fight not finished");
            }
            else if (data.fight.winner = 0)
            {
                console.log("It's a draw !");
            }
            else if (Object.keys(data.fight["farmers" + data.fight.winner])[0] == farmerId)
            {
                console.log("You won !");
            }
            else {
                console.log("You lost !");

            }
        })
    });
}

function garden_start_farmer_fight(argv)
{
    services.login(function(data) {
        services.get_garden(function(data){
            if (data.garden.farmer_fights == 0)
            {
                console.log('No fights left');
                return;
            }
            else{
                console.log(data.garden.farmer_fights + ' fights left');
            }
            var oponents = data.garden.farmer_enemies;
            var farmer_id = data.garden.my_farmer.id;
            if (argv.auto)

            {
                select_enemy_auto(oponents, farmer_id);
            }
            else {
                select_enemy_manuel(oponents, farmer_id);
            }

        });
    });
}

module.exports = garden_start_farmer_fight;

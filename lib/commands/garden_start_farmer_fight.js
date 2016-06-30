
var services = require("../services");
var sprintf = require("sprintf-js").sprintf;
var readline = require('readline');


function garden_start_farmer_fight()
{
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
}

module.exports = garden_start_farmer_fight;

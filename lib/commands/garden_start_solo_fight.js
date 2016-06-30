
var services = require("../services");
var sprintf = require("sprintf-js").sprintf;
var readline = require('readline');

function garden_start_solo_fight(argv)
{
    services.login(function(data) {
        services.get_garden(function(data){
            Object.keys(data.garden.leeks).forEach(function(key) {
                value = data.garden.leeks[key]
                if (value.name == argv.name)
                {

                    var leekId = value.id;
                    var i = 1;

                    var oponents = data.garden.solo_enemies[leekId];
                    console.log("Choose your oponent:");
                    console.log("----------------------------------------");
                    console.log("\t          Name\tLevel\tTalent");
                    Object.keys(oponents).forEach(function(key) {
                        value = oponents[key]
                        console.log(i + "\t" + sprintf("%15s", value.name) + "\t" + value.level + "\t" + value.talent );
                        i++;
                    });
                    var rl = readline.createInterface(process.stdin, process.stdout);
                    rl.setPrompt('> ');
                    rl.prompt();
                    rl.on('line', function(line) {
                        if (line > 0 && line < i){
                            services.garden_start_solo_fight(leekId, oponents[line-1].id, function(data){
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
                            })
                            //OK, we've finished
                            rl.close();
                        }
                        else {
                            rl.prompt();
                        }

                    });

                }
            })
        });
    });
}

module.exports = garden_start_solo_fight;

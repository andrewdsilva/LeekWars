
var services = require("../services");
var sprintf = require("sprintf-js").sprintf;
var readline = require('readline');


function get_challange_result(challangeId, callback)
{
    services.get_fight(challangeId, function(data) {
        if (data.fight.winner == -1)
        {
            get_challange_result(challangeId, callback);
        }
        else {
            callback(data);
        }
    });
}


function launch_challange(leekId, enemyId, callback)
{
    services.garden_start_solo_challange(leekId, enemyId, function(data){
        var challangeId = data.fight;

        get_challange_result(challangeId, function(data) {
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

function start_solo_challange(leek1, leek2, callback)
{
    var leek1_id;
    var leek2_id;

    services.ranking_search(leek1, true, false, false, function(data) {
        leek1_id = data.results[0].id;
        services.ranking_search(leek2, true, false, false, function(data) {
            leek2_id = data.results[0].id;
            launch_challange(leek1_id, leek2_id, callback);
        });
    });
}


function garden_start_solo_challange(argv)
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
                start_solo_challange(argv.leek1, argv.leek2, callback);
            }
        }

        start_solo_challange(argv.leek1, argv.leek2, callback);

        
    });
}

module.exports = garden_start_solo_challange;

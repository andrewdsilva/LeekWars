
var services = require("../services");
var commands = require("../commands");
var sprintf = require("sprintf-js").sprintf;


function get_ai(ai, callback) {
    services.login(function(data) {
        data.farmer.ais.forEach(function(value) {
            if (value.name == ai)
            {
                callback(value);
            }
        });
    });
}

function set_ai(leek_id, ai, callback)
{   
    get_ai(ai, function(value){
        services.set_ai(leek_id, value.id, callback);
    });
}


function handle_ais(leek_id, ai1, ai2, callback)
{
    var current_ai;

    //Get current leek ai
    services.get_leek(leek_id, function(data)
    {
        current_ai_id = data.leek.ai;

        //Set first ai
        set_ai(leek_id, ai1, function(){
            callback(ai1);
            //Set second ai
            set_ai(leek_id, ai2, function(){
                callback(ai2);
                //Reset ai
                services.set_ai(leek_id, current_ai_id, function(){});        
            });
        });
        
        
    });

}


function get_leek(name, data, callback)
{
    Object.keys(data.farmer.leeks).forEach(function(key) {
            value = data.farmer.leeks[key]
            if (value.name == name)
            {
                callback(value);
            }
        });
}

function launch_challange(leekId, enemyId, callback)
{
    services.garden_start_solo_challange(leekId, enemyId, function(data){
        var challangeId = data.fight;

        get_challange_result(challangeId, function(data) {
            var result;
            if (data.fight.winner == 0)
            {
                result = "draw";
            }
            else if (data.fight["leeks" + data.fight.winner][0].id == leekId)
            {
                result = "win";
            }
            else {
                result = "loss";

            }
            callback(result);
            
        })
    })
}

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


function handle_fight(leek_id, target, number,  callback)
{
    var num = number;
    if (num < 1) {
        num = 1;
    }

    var count = 0;
    var wins = 0;
    var losses = 0;
    var draws = 0;

    var count_callback = function(result) {
        count ++;
        if (result == "win")
        {
            wins ++;
        }
        else if (result == "loss")
        {
            losses ++;
        }
        else
        {
            draws ++;
        }
        if (count < num)
        {
            
            launch_challange(leek_id, target_id, count_callback);
        }
        else
        {
            callback(wins, draws, losses);
        }
    }
    //Get target leek
    services.ranking_search(target, true, false, false, function(data) {
        target_id = data.results[0].id;
        launch_challange(leek_id, target_id, count_callback);
    });
}

function ab_test(argv)
{
    services.login(function(data) {
        var leek_id;

        get_leek(argv.leek, data, function(leek) {
            handle_ais(leek.id, argv.ai1, argv.ai2, function (ai){
                handle_fight(leek.id, argv.target, argv.number, function(wins, draws, losses){
                    console.log("Ai: " + ai + " - wins : " + wins + " losses : " + losses + " draws : " + draws )
                });
            });
        });
        

    });

}

module.exports = ab_test;

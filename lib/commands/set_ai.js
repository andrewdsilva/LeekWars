
var services = require("../services");
var sprintf = require("sprintf-js").sprintf;


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

function get_ai(ai, data, callback) {
	data.farmer.ais.forEach(function(value) {
        if (value.name == ai)
        {
        	callback(value);
        }
    });
}


function set_ai(argv)
{
    services.login(function(data) {
        get_leek(argv.leek, data, function(leek) {
        	get_ai(argv.ai, data, function(ai) {
        		services.set_ai(leek.id, ai.id, function(data)
            	{
            		console.log("Success");
            	});
        	});
        });
    });
}

module.exports = set_ai;

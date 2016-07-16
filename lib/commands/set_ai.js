
var services = require("../services");
var sprintf = require("sprintf-js").sprintf;

function set_ai(argv)
{
    services.login(function(data) {
        var leek_id;
        var ai_id;
        Object.keys(data.farmer.leeks).forEach(function(key) {
            value = data.farmer.leeks[key]
            if (value.name == argv.leek)
            {
            	leek_id = key;
            	data.farmer.ais.forEach(function(value) {
            		if (value.name == argv.ai)
            		{
            			ai_id = value.id;

            			services.set_ai(leek_id, ai_id, function(data)
            				{
            					console.log("Success");
            				});
            		}
            	});
            }
        });
    }

);
}

module.exports = set_ai;

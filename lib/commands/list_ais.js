
var services = require("../services");
var sprintf = require("sprintf-js").sprintf;

function list_ais()
{
    services.login(function(data) {
        console.log("Ais for " + data.farmer.login);
        console.log('----------------------------')

        data.farmer.ais.forEach(function(value) {
            console.log(value.name);
        })
    }

);
}

module.exports = list_ais;

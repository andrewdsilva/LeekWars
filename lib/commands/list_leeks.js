
var services = require("../services");
var sprintf = require("sprintf-js").sprintf;

function list_leeks()
{
    services.login(function(data) {
        console.log("Leeks for " + data.farmer.login);
        console.log('----------------------------')
        console.log("          Name\tLevel\tTalent\tCapital");
        Object.keys(data.farmer.leeks).forEach(function(key) {
            value = data.farmer.leeks[key]
            console.log(sprintf("%15s", value.name) + "\t" + value.level + "\t" + value.talent + "\t" + value.capital);
        })
    });
}

module.exports = list_leeks;

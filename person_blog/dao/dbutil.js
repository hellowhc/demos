var mysql = require("mysql");

function servers (){
    var connection = mysql.createConnection({
        host:"127.0.0.1",
        port:"3306",
        user:'root',
        password:'520131hc',
        database:"school"
    });
    return connection;
}


module.exports.servers = servers;
var fs = require("fs");
var globalConfig = {};
var data = fs.readFileSync("./server.conf");

var gloArr = data.toString().trim().split("\r\n");

for (var i = 0; i < gloArr.length; i++) {
    var temp = gloArr[i].split("=");
    globalConfig[temp[0]] = temp[1];
}

module.exports = globalConfig;
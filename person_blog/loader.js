var fs = require("fs");
var gloConf = require("./conf");
var controllSet = [];
var pathMap = new Map();

var files = fs.readdirSync(gloConf["web_path"]);

for (var i = 0; i < files.length; i++) {
    var temp = require("./" + gloConf["web_path"] + "/" + files[i]);
    if (temp.path) {
        for (var [k, v] of temp.path) {
            if (pathMap.get(k) == null) {
                pathMap.set(k, v);
            } else {
                console.log("url 配置出错")
            }
        }
        controllSet.push(temp)
    }

}
module.exports = pathMap;

console.log(pathMap)
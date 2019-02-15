var path = new Map();
var utilTime = require("../util/timeUtil.js");
var everyDao = require("../dao/insertEvery.js");
let respUtil = require("../util/respUtil.js")
function editEveryDay(request,response) {
    request.on("data",function (data) {
        everyDao.insetEveyDay(data.toString(),utilTime.getTime(),function (result) {
            response.writeHead(200);
            response.write(respUtil.writeResult('success','添加成功',null))
            response.end();
        })
    })
}
path.set("/editEveryDay",editEveryDay);

function queryEveryDay(request,response){
    everyDao.queryByEveryDay(function (result) {
        response.writeHead(200);
        response.write(respUtil.writeResult('success','添加成功',result))
        response.end()
    })
}
path.set("/queryEveryDay",queryEveryDay)
module.exports.path= path